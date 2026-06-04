import { NextResponse } from "next/server";
import OpenAI from "openai";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const MODEL = process.env.OPENAI_MODEL ?? "gpt-4.1-mini";
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 20;

type RateLimitState = {
  count: number;
  resetAt: number;
};

const rateLimitStore: Map<string, RateLimitState> =
  (globalThis as { __recruiterChatRateLimit?: Map<string, RateLimitState> })
    .__recruiterChatRateLimit ?? new Map<string, RateLimitState>();

if (!(globalThis as { __recruiterChatRateLimit?: Map<string, RateLimitState> }).__recruiterChatRateLimit) {
  (globalThis as { __recruiterChatRateLimit?: Map<string, RateLimitState> }).__recruiterChatRateLimit = rateLimitStore;
}

const SYSTEM_PROMPT = `You are a recruiter assistant for Mahbuba Akter's portfolio website.

Goal:
- Help recruiters quickly understand Mahbuba's profile, projects, strengths, and fit.
- Keep answers concise, practical, and honest.

Candidate profile context:
- Name: Mahbuba Akter
- Role: Full Stack Developer
- Focus: scalable, user-focused web applications
- Core stack: Next.js, TypeScript, Node.js, Express.js, Prisma, MongoDB, PostgreSQL
- Other tools: React, Tailwind CSS, Docker, Redux, Zod, Framer Motion
- Project domains: consultation platform, eCommerce, mentorship platform

Behavior rules:
- If user asks for contact or next step, encourage using the Contact section on the site.
- If information is unknown, explicitly say it is not available instead of inventing details.
- Avoid long marketing language; sound professional and recruiter-friendly.
`;

function normalizeMessages(input: unknown): ChatMessage[] {
  if (!Array.isArray(input)) return [];

  return input
    .filter((m): m is { role: unknown; content: unknown } => Boolean(m))
    .map<ChatMessage>((m) => ({
      role: m.role === "assistant" ? "assistant" : "user",
      content: typeof m.content === "string" ? m.content.slice(0, 2500) : "",
    }))
    .filter((m) => m.content.trim().length > 0)
    .slice(-12);
}

function getClientIp(req: Request): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (!forwardedFor) return "unknown";
  return forwardedFor.split(",")[0]?.trim() || "unknown";
}

function checkRateLimit(clientIp: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const state = rateLimitStore.get(clientIp);

  if (!state || now > state.resetAt) {
    rateLimitStore.set(clientIp, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return { allowed: true };
  }

  if (state.count >= RATE_LIMIT_MAX_REQUESTS) {
    return {
      allowed: false,
      retryAfter: Math.max(1, Math.ceil((state.resetAt - now) / 1000)),
    };
  }

  state.count += 1;
  rateLimitStore.set(clientIp, state);
  return { allowed: true };
}

export async function POST(req: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        {
          error:
            "OPENAI_API_KEY is not configured. Add it to .env.local and restart the dev server.",
        },
        { status: 500 },
      );
    }

    const clientIp = getClientIp(req);
    const rateLimit = checkRateLimit(clientIp);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: `Too many requests. Please retry in ${rateLimit.retryAfter}s.`,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateLimit.retryAfter ?? 60),
          },
        },
      );
    }

    const body = (await req.json()) as { messages?: unknown; stream?: boolean };
    const messages = normalizeMessages(body.messages);
    const shouldStream = body.stream !== false;

    if (messages.length === 0) {
      return NextResponse.json(
        { error: "Please send at least one message." },
        { status: 400 },
      );
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    if (shouldStream) {
      const completion = await client.chat.completions.create({
        model: MODEL,
        temperature: 0.4,
        stream: true,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages.map((m) => ({ role: m.role, content: m.content })),
        ],
      });

      const encoder = new TextEncoder();
      const stream = new ReadableStream<Uint8Array>({
        async start(controller) {
          try {
            for await (const chunk of completion) {
              const token = chunk.choices[0]?.delta?.content;
              if (!token) continue;
              controller.enqueue(encoder.encode(token));
            }
          } catch {
            controller.enqueue(encoder.encode("\n[Streaming interrupted]\n"));
          } finally {
            controller.close();
          }
        },
      });

      return new Response(stream, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "no-store",
        },
      });
    }

    const completion = await client.chat.completions.create({
      model: MODEL,
      temperature: 0.4,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages.map((m) => ({ role: m.role, content: m.content })),
      ],
    });

    const answer = completion.choices[0]?.message?.content?.trim();

    if (!answer) {
      return NextResponse.json(
        { error: "No response generated." },
        { status: 502 },
      );
    }

    return NextResponse.json({ answer });
  } catch {
    return NextResponse.json(
      { error: "Failed to generate chat response." },
      { status: 500 },
    );
  }
}
