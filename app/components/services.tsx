"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Code2,
  LayoutGrid,
  Database,
  Rocket,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";

type Service = {
  icon: LucideIcon;
  title: string;
  blurb: string;
  bullets: string[];
};

const SERVICES: Service[] = [
  {
    icon: LayoutGrid,
    title: "Frontend Engineering",
    blurb:
      "Pixel-perfect, responsive and accessible UIs built with modern React ecosystem.",
    bullets: [
      "Next.js · React · TypeScript",
      "Tailwind · ShadCN UI",
      "Framer Motion UI polish",
    ],
  },
  {
    icon: Code2,
    title: "Full-Stack Development",
    blurb:
      "Scalable backend systems with authentication, APIs and clean architecture.",
    bullets: ["REST APIs · JWT · OAuth", "Node.js · Express", "Role-based systems"],
  },
  {
    icon: Database,
    title: "Database & System Design",
    blurb:
      "Optimized relational & NoSQL database structures with production-ready design.",
    bullets: ["PostgreSQL · MongoDB", "Prisma ORM", "Indexing & migrations"],
  },
  {
    icon: Rocket,
    title: "Deployment & Performance",
    blurb:
      "Fast, SEO-optimized and production-ready applications with CI/CD pipelines.",
    bullets: ["Vercel · CI/CD", "Lighthouse 95+", "SEO · Performance tuning"],
  },
];

export function Services() {
  return (
    <section
      id="services"
      className="relative scroll-mt-24 py-8"
    >
      <div className="mx-auto max-w-300 px-4 sm:px-6 lg:px-10">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          className="max-w-2xl"
        >
          <span className="inline-flex items-center rounded-full border border-white/20 bg-white/60 px-4 py-1 text-sm font-semibold backdrop-blur dark:bg-white/10">
            <span className="text-brand-gradient">Services</span>
          </span>

          <h2 className="mt-4 text-2xl sm:text-3xl font-semibold tracking-tight">
            What I can <span className="text-brand-gradient">build</span>
          </h2>

          <p className="mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Production-ready applications with clean architecture, scalable backend
            systems and modern UI engineering.
          </p>
        </motion.div>

        {/* GRID — STRICT 4 RESPONSIVE SYSTEM */}
        <div
          className="
            mt-10 grid gap-6
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-2
            xl:grid-cols-4
            2xl:grid-cols-4
            auto-rows-fr
          "
        >
          {SERVICES.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="
                group relative flex h-full flex-col
                rounded-2xl border border-white/10
                bg-white/70 p-6 backdrop-blur-xl
                shadow-[0_8px_30px_-14px_rgba(0,0,0,0.2)]
                transition-all duration-300
                hover:-translate-y-1 hover:shadow-xl
                dark:bg-white/5
              "
            >
              {/* subtle glow (controlled) */}
              <span
                aria-hidden
                className="pointer-events-none absolute -top-14 -right-14 h-32 w-32 rounded-full opacity-15 blur-2xl"
                style={{
                  background:
                    "linear-gradient(135deg, var(--brand-purple), var(--brand-blue), var(--brand-cyan))",
                }}
              />

              {/* icon */}
              <div className="flex items-center justify-between">
                <span className="icon-halo h-11 w-11 text-white">
                  <s.icon className="h-5 w-5" />
                </span>

                <span className="text-[10px] font-mono text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              {/* title */}
              <h3 className="mt-5 text-lg font-semibold">
                {s.title}
              </h3>

              {/* description */}
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                {s.blurb}
              </p>

              {/* bullets */}
              <ul className="mt-4 space-y-2 text-xs text-foreground/80">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-gradient" />
                    {b}
                  </li>
                ))}
              </ul>

              {/* footer */}
              
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}