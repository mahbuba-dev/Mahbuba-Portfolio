"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Send, X } from "lucide-react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const STORAGE_KEY = "recruiter-chat-history-v1";
const MAX_STORED_MESSAGES = 30;

const QUICK_PROMPTS = [
  "What are Mahbuba's strongest skills for this role?",
  "Summarize her top 2 projects for a recruiter.",
  "Is she more frontend, backend, or full-stack?",
  "What is the best way to contact her?",
];

const FLOAT_TEXTS = [
  "Meet Mahbuba's AI Assistant",
  "Ask about skills, projects, and real impact",
  "Get a quick profile summary in seconds",
  "Explore role fit with smart answers",
];

const STARTER_MESSAGE: ChatMessage = {
  role: "assistant",
  content:
    "Hi, I am Mahbuba's AI assistant. Ask me about her skills, projects, experience, or role fit.",
};

export function RecruiterChatbot() {
  const [open, setOpen] = React.useState(false);
  const [teaserIndex, setTeaserIndex] = React.useState(0);
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [messages, setMessages] = React.useState<ChatMessage[]>([STARTER_MESSAGE]);
  const listRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (!saved) return;

      const parsed = JSON.parse(saved) as unknown;
      if (!Array.isArray(parsed)) return;

      const restored = parsed
        .filter((m): m is { role: unknown; content: unknown } => Boolean(m))
        .map<ChatMessage>((m) => ({
          role: m.role === "assistant" ? "assistant" : "user",
          content: typeof m.content === "string" ? m.content : "",
        }))
        .filter((m) => m.content.trim().length > 0)
        .slice(-MAX_STORED_MESSAGES);

      if (restored.length > 0) {
        setMessages(restored);
      }
    } catch {
      // Ignore storage read/parse errors and continue with starter message.
    }
  }, []);

  React.useEffect(() => {
    try {
      const toStore = messages.slice(-MAX_STORED_MESSAGES);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
    } catch {
      // Ignore storage write errors (quota/private mode).
    }
  }, [messages]);

  React.useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, loading]);

  React.useEffect(() => {
    if (open) return;
    const intervalId = window.setInterval(() => {
      setTeaserIndex((prev) => (prev + 1) % FLOAT_TEXTS.length);
    }, 2600);
    return () => window.clearInterval(intervalId);
  }, [open]);

  async function sendMessage(content: string) {
    const value = content.trim();
    if (!value || loading) return;

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: value }];
    setMessages([...nextMessages, { role: "assistant", content: "" }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/recruiter-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages, stream: true }),
      });

      if (!res.ok) {
        let errorMessage = "Sorry, I could not process that. Please try again.";
        try {
          const data = (await res.json()) as { error?: string };
          if (data.error) errorMessage = data.error;
        } catch {
          // Ignore json parse failures on error path.
        }

        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = { role: "assistant", content: errorMessage };
          return copy;
        });
        return;
      }

      if (!res.body) {
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = {
            role: "assistant",
            content: "No response body received.",
          };
          return copy;
        });
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let answer = "";

      while (true) {
        const { done, value: chunk } = await reader.read();
        if (done) break;

        answer += decoder.decode(chunk, { stream: true });
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = { role: "assistant", content: answer };
          return copy;
        });
      }

      if (answer.trim().length === 0) {
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = {
            role: "assistant",
            content: "No response generated. Please try again.",
          };
          return copy;
        });
      }
    } catch {
      setMessages((prev) => {
        const copy = [...prev];
        copy[copy.length - 1] = {
          role: "assistant",
          content: "Network error. Please try again in a moment.",
        };
        return copy;
      });
    } finally {
      setLoading(false);
    }
  }

  async function onSend(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await sendMessage(input);
  }

  return (
    <div className="pointer-events-none fixed bottom-3 right-3 z-90 sm:bottom-4 sm:right-4">
      {open && (
        <div className="pointer-events-auto mb-3 flex h-[min(78vh,620px)] w-[min(92vw,390px)] flex-col overflow-hidden rounded-2xl border border-slate-300/70 bg-white shadow-2xl dark:border-white/10 dark:bg-[#111827]">
          <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-white/10">
            <div className="flex items-center gap-2">
              <span className="relative grid h-8 w-8 place-items-center rounded-full bg-slate-900 shadow-inner ring-1 ring-cyan-300/25">
                <span className="grid h-6.5 w-6.5 place-items-center rounded-full bg-[linear-gradient(135deg,var(--brand-blue),var(--brand-cyan),var(--brand-aqua))] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]">
                  <Bot className="h-3.5 w-3.5" strokeWidth={2.2} />
                </span>
                <span className="absolute -bottom-0.5 -right-0.5 rounded-full border border-white/35 bg-cyan-400 px-1 text-[8px] font-bold leading-3 text-slate-900 dark:border-slate-900/35">
                  AI
                </span>
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Mahbuba's AI Assistant</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Powered by OpenAI</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-white/10 dark:hover:text-slate-200"
              aria-label="Close recruiter chat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div ref={listRef} className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m, idx) => (
              <div
                key={`${m.role}-${idx}`}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-800 dark:bg-white/10 dark:text-slate-100"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="text-xs text-slate-500 dark:text-slate-400">Streaming response...</div>
            )}
          </div>

          <div className="border-t border-slate-200 px-3 py-2 dark:border-white/10">
            <div className="flex gap-2 overflow-x-auto whitespace-nowrap pb-1">
              {QUICK_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => void sendMessage(prompt)}
                  disabled={loading}
                  className="shrink-0 rounded-full border border-slate-300 bg-slate-50 px-2.5 py-1 text-[11px] text-slate-600 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-cyan-300/40 dark:hover:bg-cyan-400/10 dark:hover:text-cyan-200"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={onSend} className="border-t border-slate-200 p-3 dark:border-white/10">
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about skills, projects, experience..."
                className="h-10 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm outline-none ring-blue-500/20 placeholder:text-slate-400 focus:ring-4 dark:border-white/10 dark:bg-[#0f172a] dark:text-slate-100"
              />
              <button
                type="submit"
                disabled={loading || input.trim().length === 0}
                className="grid h-10 w-10 place-items-center rounded-xl bg-blue-600 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      )}

      {!open && (
        <div className="pointer-events-none mb-2 hidden justify-end sm:flex">
          <AnimatePresence mode="wait">
            <motion.div
              key={teaserIndex}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.28 }}
              className="max-w-62.5 rounded-2xl border border-cyan-300/25 bg-slate-900/90 px-3 py-2 text-[11px] font-medium text-cyan-100 shadow-lg shadow-cyan-500/20 backdrop-blur"
            >
              {FLOAT_TEXTS[teaserIndex]}
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      <motion.button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        whileHover={{ y: -2, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="pointer-events-auto relative ml-auto flex h-10 w-10 items-center justify-center rounded-full border border-cyan-300/30 bg-slate-900/90 text-white shadow-xl shadow-cyan-500/30 backdrop-blur sm:h-12 sm:w-auto sm:gap-1.5 sm:justify-start sm:pl-1 sm:pr-3"
        aria-label="Open Mahbuba AI assistant"
      >
        <span className="relative grid h-8 w-8 place-items-center rounded-full bg-slate-900 ring-2 ring-cyan-300/45 shadow-md shadow-cyan-400/40 sm:h-9 sm:w-9">
          <span className="grid h-6.5 w-6.5 place-items-center rounded-full bg-[linear-gradient(135deg,var(--brand-blue),var(--brand-cyan),var(--brand-aqua))] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]">
            <Bot className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={2.4} />
          </span>
          <span className="absolute -bottom-0.5 -right-0.5 grid h-4 w-4 place-items-center rounded-full border border-white/35 bg-cyan-400 text-[8px] font-bold text-slate-900 dark:border-slate-900/35">
            AI
          </span>
        </span>
        <span className="hidden text-[13px] font-semibold tracking-tight text-cyan-50 sm:inline">Mahbuba's AI</span>
        <span className="absolute -right-1 -top-1 hidden rounded-full border border-cyan-200/30 bg-cyan-400 px-1.5 py-0.5 text-[10px] font-semibold text-slate-900 sm:block">
          LIVE
        </span>
      </motion.button>
    </div>
  );
}
