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

export function Skills() {
  return (
    <section id="skills" className="relative scroll-mt-24 py-16 w-full">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-10">
        {/* Heading */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-left">
            <span className="text-neutral-900 dark:text-white">Skills&nbsp;</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-400 to-sky-400">& Technologies</span>
          </h2>
          <p className="text-neutral-600 dark:text-white/70 mt-3 text-base text-left">
            Tools and frameworks I use to build scalable and modern web applications.
          </p>
        </div>
        <div>
          <div
            className="grid grid-rows-2 grid-cols-9 gap-5"
            style={{gridAutoFlow: 'column'}}
          >
            {SKILLS.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.025 }}
                className="flex flex-col items-center justify-center rounded-2xl border border-neutral-200 dark:border-white/10 bg-white/80 dark:bg-[#181f2a] backdrop-blur-xl shadow-xl py-3 px-3 min-w-[105px] transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl text-center group"
                style={{ position: 'relative', overflow: 'hidden' }}
              >
                <span className="relative flex items-center justify-center h-12 w-12 mb-2 rounded-xl bg-neutral-100 dark:bg-[#232b3a] shadow-md group-hover:scale-105 transition-transform duration-200">
                  <SkillIcon
                    name={item}
                    className="h-7 w-7 drop-shadow-[0_1px_2px_rgba(0,0,0,0.10)] dark:drop-shadow-[0_1px_2px_rgba(255,255,255,0.18)]"
                  />
                  <span className="absolute inset-0 rounded-xl pointer-events-none" style={{boxShadow:'0 0 16px 2px #6366f133'}}></span>
                </span>
                <p className="text-neutral-900 dark:text-white text-[12px] font-semibold leading-tight break-words drop-shadow-sm">
                  {item}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}