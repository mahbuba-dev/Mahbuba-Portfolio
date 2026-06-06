"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { SkillIcon } from "./skill-icon";

const SKILLS = [
  "Next.js",
  "React",
  "TypeScript",
  "JavaScript",
  "Tailwind CSS",
  "ShadCN UI",
  "Node.js",
  "Express.js",
  "PostgreSQL",
  "Prisma ORM",
  "MongoDB",
  "Zod",
  "Redux",
  "Framer Motion",
  "Docker",
  "Git",
  "HTML",
  "CSS",
];

const ICON_ACCENT: Record<string, string> = {
  "Next.js": "bg-slate-100/90 dark:bg-slate-700/55 ring-1 ring-slate-300/70 dark:ring-slate-400/30 text-slate-900 dark:text-slate-100",
  React: "bg-slate-100 dark:bg-cyan-500/26 ring-1 ring-cyan-300 dark:ring-cyan-300/52",
  TypeScript: "bg-blue-100/85 dark:bg-blue-500/28 ring-1 ring-blue-300/70 dark:ring-blue-300/52",
  JavaScript: "bg-neutral-100 dark:bg-yellow-500/26 ring-1 ring-yellow-400/80 dark:ring-yellow-300/56",
  "Tailwind CSS": "bg-sky-100/85 dark:bg-sky-500/28 ring-1 ring-sky-300/70 dark:ring-sky-300/52",
  "ShadCN UI": "bg-zinc-100/90 dark:bg-zinc-600/30 ring-1 ring-zinc-300/70 dark:ring-zinc-400/28 text-zinc-900 dark:text-zinc-100",
  "Node.js": "bg-lime-100/85 dark:bg-lime-500/24 ring-1 ring-lime-300/70 dark:ring-lime-300/52",
  "Express.js": "bg-slate-100/90 dark:bg-slate-600/28 ring-1 ring-slate-300/70 dark:ring-slate-400/28 text-slate-900 dark:text-slate-100",
  PostgreSQL: "bg-indigo-100/85 dark:bg-indigo-500/26 ring-1 ring-indigo-300/70 dark:ring-indigo-300/52",
  "Prisma ORM": "bg-slate-100/92 dark:bg-slate-500/24 ring-1 ring-slate-300/75 dark:ring-slate-300/34 text-slate-900 dark:text-slate-100",
  MongoDB: "bg-emerald-100/85 dark:bg-emerald-500/24 ring-1 ring-emerald-300/70 dark:ring-emerald-300/52",
  Zod: "bg-blue-100/85 dark:bg-blue-500/28 ring-1 ring-blue-300/70 dark:ring-blue-300/52",
  Redux: "bg-violet-100/85 dark:bg-violet-500/26 ring-1 ring-violet-300/70 dark:ring-violet-300/52",
  "Framer Motion": "bg-blue-100/85 dark:bg-blue-500/28 ring-1 ring-blue-300/70 dark:ring-blue-300/52",
  Docker: "bg-sky-100/85 dark:bg-sky-500/28 ring-1 ring-sky-300/70 dark:ring-sky-300/52",
  Git: "bg-orange-100/88 dark:bg-orange-500/28 ring-1 ring-orange-300/70 dark:ring-orange-300/52",
  HTML: "bg-orange-100/88 dark:bg-orange-500/30 ring-1 ring-orange-300/70 dark:ring-orange-300/54",
  CSS: "bg-blue-100/88 dark:bg-blue-500/28 ring-1 ring-blue-300/70 dark:ring-blue-300/52",
};

const ICON_VISIBILITY: Record<string, string> = {
  React: "dark:filter-[contrast(1.45)_saturate(1.6)_brightness(1.3)] dark:drop-shadow-[0_0_8px_rgba(80,220,255,0.32)]",
  TypeScript: "dark:filter-[contrast(1.38)_saturate(1.5)_brightness(1.28)] dark:drop-shadow-[0_0_8px_rgba(88,149,255,0.3)]",
  JavaScript: "dark:filter-[contrast(1.45)_saturate(1.65)_brightness(1.35)] dark:drop-shadow-[0_0_8px_rgba(255,230,96,0.34)]",
  "Tailwind CSS": "dark:filter-[contrast(1.4)_saturate(1.55)_brightness(1.3)] dark:drop-shadow-[0_0_8px_rgba(86,225,255,0.3)]",
  "Node.js": "dark:filter-[contrast(1.4)_saturate(1.5)_brightness(1.3)] dark:drop-shadow-[0_0_8px_rgba(126,214,95,0.3)]",
  PostgreSQL: "dark:filter-[contrast(1.4)_saturate(1.55)_brightness(1.28)] dark:drop-shadow-[0_0_8px_rgba(111,146,255,0.3)]",
  MongoDB: "dark:filter-[contrast(1.38)_saturate(1.5)_brightness(1.3)] dark:drop-shadow-[0_0_8px_rgba(120,214,132,0.28)]",
  Zod: "dark:filter-[contrast(1.4)_saturate(1.55)_brightness(1.3)] dark:drop-shadow-[0_0_8px_rgba(92,152,255,0.3)]",
  Redux: "dark:filter-[contrast(1.42)_saturate(1.55)_brightness(1.3)] dark:drop-shadow-[0_0_8px_rgba(170,126,255,0.3)]",
  "Framer Motion": "dark:filter-[contrast(1.42)_saturate(1.6)_brightness(1.32)] dark:drop-shadow-[0_0_8px_rgba(100,149,255,0.32)]",
  Docker: "dark:filter-[contrast(1.42)_saturate(1.58)_brightness(1.32)] dark:drop-shadow-[0_0_8px_rgba(98,183,255,0.32)]",
  Git: "dark:filter-[contrast(1.4)_saturate(1.58)_brightness(1.3)] dark:drop-shadow-[0_0_8px_rgba(255,140,94,0.32)]",
  HTML: "dark:filter-[contrast(1.42)_saturate(1.62)_brightness(1.32)] dark:drop-shadow-[0_0_8px_rgba(255,134,84,0.34)]",
  CSS: "dark:filter-[contrast(1.4)_saturate(1.58)_brightness(1.3)] dark:drop-shadow-[0_0_8px_rgba(89,166,255,0.32)]",
};

export function Skills() {
  return (
    <section id="skills" className="relative scroll-mt-24 py-16 w-full">
      <div className="mx-auto max-w-300 px-4 sm:px-6 lg:px-10">
        {/* Heading */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-left">
            <span className="text-neutral-900 dark:text-white">Skills&nbsp;</span>
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 via-cyan-400 to-sky-400">& Technologies</span>
          </h2>
          <p className="text-neutral-600 dark:text-white/70 mt-3 text-base text-left">
            Tools and frameworks I use to build scalable and modern web applications.
          </p>
        </div>
        <div>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.045,
                  delayChildren: 0.05,
                },
              },
            }}
            className="grid grid-cols-2 gap-0 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-9 lg:gap-5"
            style={{ gridAutoFlow: "column" }}
          >
            {SKILLS.map((item, i) => (
              <motion.div
                key={item}
                variants={{
                  hidden: { opacity: 0, y: 14, scale: 0.96 },
                  show: { opacity: 1, y: 0, scale: 1 },
                }}
                transition={{ duration: 0.34, ease: "easeOut" }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="flex flex-col items-center justify-center rounded-2xl border border-neutral-200 dark:border-white/10 bg-white/80 dark:bg-[#181f2a] backdrop-blur-xl shadow-xl py-3 px-3 min-w-26.25 transition-all duration-300 hover:shadow-2xl text-center group"
                style={{ position: "relative", overflow: "hidden" }}
              >
                <motion.span
                  animate={{ y: [0, -1.5, 0] }}
                  transition={{
                    duration: 2.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: (i % 6) * 0.12,
                  }}
                  className={`relative flex items-center justify-center h-14 w-14 mb-2 rounded-xl shadow-md group-hover:scale-110 transition-transform duration-200 ${ICON_ACCENT[item] ?? "bg-neutral-100 dark:bg-[#232b3a]"}`}
                >
                  <SkillIcon
                    name={item}
                    className={`h-8 w-8 filter-[contrast(1.15)_saturate(1.2)] ${ICON_VISIBILITY[item] ?? "dark:filter-[contrast(1.35)_saturate(1.45)_brightness(1.24)] dark:drop-shadow-[0_0_6px_rgba(255,255,255,0.2)]"}`}
                  />
                </motion.span>
                <p className="text-neutral-900 dark:text-white text-[12px] font-bold leading-tight wrap-break-word drop-shadow-sm">
                  {item}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}