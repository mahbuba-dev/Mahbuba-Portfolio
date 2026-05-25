// --- FULL REDESIGN FOR PRINT/SCREEN ---
import { PrintButton } from "./print-button";
import Link from "next/link";

const CONTACT = {
  name: "MAHBUBA AKTER",
  address: "Queens, NY 11428",
  phone: "917-878-8707",
  email: "mahbubakter.2807@gmail.com",
  linkedin: "https://www.linkedin.com/in/mahbuba-akter-020157211/",
  portfolio: "https://mahbuba-portfolio.vercel.app/",
  github: "https://github.com/mahbuba-dev",
};

const SUMMARY =
  "Full-Stack Web Developer skilled in building scalable, user-focused applications with modern technologies, clean UI/UX, and AI-powered features. Passionate about writing efficient, maintainable, production-ready code.";

const SKILLS = [
  {
    label: "Frontend:",
    value: "JavaScript, TypeScript, React, Next.js",
  },
  {
    label: "Backend:",
    value: "Node.js, Express.js, Prisma",
  },
  {
    label: "Database:",
    value: "PostgreSQL, MongoDB, Mongoose",
  },
  {
    label: "Tools:",
    value: "Git, GitHub, VS Code, Postman, Docker",
  },
  {
    label: "Other:",
    value: "Golang (Basic)",
  },
];

const CERTIFICATIONS = [
  "Complete Web Development Course",
  "Next Level Web Development",
];

const PROJECTS = [
  {
    name: "CONSULTEDGE — Expert Consultation SaaS Platform (AI-Powered)",
    features: [
      "Role-based dashboard, Real-time chat + video calls, payments, reviews, AI chatbot, notifications",
    ],
    stack: "Next.js, TypeScript, Node.js, Prisma, PostgreSQL",
    client: "https://github.com/mahbuba-dev/consultedge-frontend.git",
    server: "https://github.com/mahbuba-dev/ConsultEdge-Backend.git",
    live: "https://consultedge-frontend.vercel.app/",
  },
  {
    name: "NEXORA — AI-Powered Multi-Vendor Marketplace",
    features: [
      "Multi-vendor system with AI store builder, AI Chatbot, filtering, orders, payment, and product management system",
    ],
    stack: "Next.js, TypeScript, Node.js, Express.js, Prisma",
    client: "https://github.com/mahbuba-dev/consultedge-frontend.git",
    server: "https://github.com/mahbuba-dev/Nexora-Frontend.git",
    live: "https://nexora-frontend-nine.vercel.app/",
  },
];

const SOFT_SKILLS = [
  "Time Management",
  "Problem Solver",
  "User-Centric Mindset",
];

const LANGUAGES = [
  { name: "English", level: "Professional", bar: 5 },
  { name: "Bangla", level: "Native", bar: 5 },
];

export default function ResumePage() {
  return (
    <div className="mx-auto max-w-2xl bg-white print:bg-white rounded-lg shadow-lg px-4 pt-3 pb-8 mt-2 mb-10 border border-gray-300 print:shadow-none print:border-black text-[13px] sm:text-[14px]">
      {/* Print Button */}
      <div className="flex justify-end print:hidden mb-2">
        <PrintButton />
      </div>

      {/* HEADER */}
      <div className="flex flex-col items-center text-center">
        <h1 className="text-xl sm:text-2xl font-bold tracking-wide mb-1">{CONTACT.name}</h1>
        <div className="text-xs sm:text-sm">{CONTACT.address} | {CONTACT.phone}</div>
        <div className="mt-1 text-xs sm:text-sm">
          <a href={`mailto:${CONTACT.email}`} className="text-blue-700 underline hover:text-blue-900">{CONTACT.email}</a>
        </div>
        <div className="mt-1 flex flex-wrap justify-center gap-2 text-blue-700 text-xs sm:text-sm">
          <a href={CONTACT.linkedin} target="_blank" className="underline hover:text-blue-900">LinkedIn</a>
          <span className="text-gray-400">·</span>
          <a href={CONTACT.portfolio} target="_blank" className="underline hover:text-blue-900">Portfolio</a>
          <span className="text-gray-400">·</span>
          <a href={CONTACT.github} target="_blank" className="underline hover:text-blue-900">Github</a>
        </div>
      </div>

      {/* Horizontal line */}
      <hr className="my-4 border-black" />

      {/* SUMMARY */}
      <Section title="SUMMARY">
        <div className="text-xs sm:text-sm leading-relaxed">{SUMMARY}</div>
      </Section>

      {/* SKILLS */}
      <Section title="SKILLS">
        <ul className="text-xs sm:text-sm grid grid-cols-1 gap-1">
          {SKILLS.map((s) => (
            <li key={s.label}><span className="font-semibold">{s.label}</span> {s.value}</li>
          ))}
        </ul>
      </Section>

      {/* CERTIFICATIONS */}
      <Section title="CERTIFICATIONS">
        <ul className="list-disc pl-5 text-xs sm:text-sm">
          {CERTIFICATIONS.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </Section>

      {/* PROJECTS */}
      <Section title="PROJECTS">
        <div className="space-y-4">
          {PROJECTS.map((p) => (
            <div key={p.name}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <div className="font-semibold text-xs sm:text-sm">{p.name}</div>
                <div className="flex flex-wrap gap-2 mt-1 sm:mt-0 justify-end">
                  <a href={p.client} target="_blank" className="text-blue-700 underline font-medium hover:text-blue-900">Client</a>
                  <span>|</span>
                  <a href={p.server} target="_blank" className="text-blue-700 underline font-medium hover:text-blue-900">Server</a>
                  <span>|</span>
                  <a href={p.live} target="_blank" className="text-blue-700 underline font-medium hover:text-blue-900">Live</a>
                </div>
              </div>
              <div className="text-[11px] mt-1 italic">{p.features[0]}</div>
              <div className="text-[11px] mt-1">Tech Stack: {p.stack}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* SOFT SKILLS */}
      <Section title="SOFT SKILLS">
        <div className="text-xs sm:text-sm">
          {SOFT_SKILLS.join(" · ")}
        </div>
      </Section>

      {/* LANGUAGES */}
      <Section title="LANGUAGES">
        <div className="grid grid-cols-1 gap-2 text-xs sm:text-sm">
          {LANGUAGES.map((lang) => (
            <div key={lang.name} className="flex items-center gap-2">
              <span className="w-20 sm:w-24 font-medium">{lang.name}:</span>
              <span className="flex-1 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`inline-block h-1.5 w-5 sm:h-2 sm:w-7 rounded-full ${i < lang.bar ? 'bg-black' : 'bg-gray-300'}`}></span>
                ))}
              </span>
              <span className="ml-2 text-[10px] sm:text-xs text-gray-600">{lang.level}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Footer */}
      <hr className="my-4 border-black" />
      <div className="text-center text-[10px] sm:text-xs text-gray-500 mt-2">
        © {new Date().getFullYear()} Mahbuba Akter
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-4">
      <div className="flex items-center gap-2 mb-1">
        <span className="flex-1 border-t border-black" />
        <span className="font-bold text-[11px] sm:text-xs tracking-widest text-black whitespace-nowrap uppercase">{title}</span>
        <span className="flex-1 border-t border-black" />
      </div>
      {children}
    </section>
  );
}
