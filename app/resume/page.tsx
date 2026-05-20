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
  { name: "English", level: "Full Professional", bar: 5 },
  { name: "Bangla", level: "Native/ Bilingual", bar: 5 },
];

export default function ResumePage() {
  return (
    <div className="mx-auto max-w-2xl bg-white print:bg-white rounded-lg shadow-lg p-6 mt-8 mb-8 border border-gray-300 print:shadow-none print:border-black">
      {/* Print Button */}
      <div className="flex justify-end print:hidden mb-2">
        <PrintButton />
      </div>

      {/* HEADER */}
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-wide">{CONTACT.name}</h1>
        <div className="mt-1 text-sm">{CONTACT.address} | {CONTACT.phone}</div>
        <div className="mt-1 text-sm">
          <a href={`mailto:${CONTACT.email}`} className="text-blue-700 underline hover:text-blue-900">{CONTACT.email}</a>
        </div>
        <div className="mt-1 flex justify-center gap-4 text-blue-700 text-sm">
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
        <div className="text-sm leading-relaxed">{SUMMARY}</div>
      </Section>

      {/* SKILLS */}
      <Section title="SKILLS">
        <ul className="text-sm grid grid-cols-1 gap-1">
          {SKILLS.map((s) => (
            <li key={s.label}><span className="font-semibold">{s.label}</span> {s.value}</li>
          ))}
        </ul>
      </Section>

      {/* CERTIFICATIONS */}
      <Section title="CERTIFICATIONS">
        <ul className="list-disc pl-5 text-sm">
          {CERTIFICATIONS.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </Section>

      {/* PROJECTS */}
      <Section title="PROJECTS">
        <div className="space-y-6">
          {PROJECTS.map((p) => (
            <div key={p.name}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="font-semibold text-sm">{p.name}</div>
                <div className="flex gap-2 mt-1 sm:mt-0">
                  <a href={p.client} target="_blank" className="text-blue-700 underline font-medium hover:text-blue-900">Client</a>
                  <span>|</span>
                  <a href={p.server} target="_blank" className="text-blue-700 underline font-medium hover:text-blue-900">Server</a>
                  <span>|</span>
                  <a href={p.live} target="_blank" className="text-blue-700 underline font-medium hover:text-blue-900">Live</a>
                </div>
              </div>
              <div className="text-xs mt-1 italic">{p.features[0]}</div>
              <div className="text-xs mt-1">Tech Stack: {p.stack}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* SOFT SKILLS */}
      <Section title="SOFT SKILLS">
        <div className="text-sm">
          {SOFT_SKILLS.join(" · ")}
        </div>
      </Section>

      {/* LANGUAGES */}
      <Section title="LANGUAGES">
        <div className="grid grid-cols-1 gap-2 text-sm">
          {LANGUAGES.map((lang) => (
            <div key={lang.name} className="flex items-center gap-2">
              <span className="w-24 font-medium">{lang.name}:</span>
              <span className="flex-1 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`inline-block h-2 w-7 rounded-full ${i < lang.bar ? 'bg-black' : 'bg-gray-300'}`}></span>
                ))}
              </span>
              <span className="ml-2 text-xs text-gray-600">{lang.level}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Footer */}
      <hr className="my-4 border-black" />
      <div className="text-center text-xs text-gray-500 mt-2">
        © {new Date().getFullYear()} Mahbuba Akter
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-5">
      <div className="flex items-center gap-2 mb-1">
        <span className="flex-1 border-t border-black" />
        <span className="font-bold text-xs tracking-widest text-black whitespace-nowrap">{title}</span>
        <span className="flex-1 border-t border-black" />
      </div>
      {children}
    </section>
  );
}
