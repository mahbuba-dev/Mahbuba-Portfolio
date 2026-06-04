"use client";

import * as React from "react";
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiShadcnui,
  SiReactquery,
  SiAxios,
  SiNodedotjs,
  SiExpress,
  SiJsonwebtokens,
  SiZod,
  SiMongodb,
  SiPostgresql,
  SiPrisma,
  SiFirebase,
  SiGithub,
  SiDocker,
  SiOpenai,
  SiRedux,
  SiFramer,
} from "react-icons/si";
import { LuShieldCheck, LuLink, LuBrain, LuLightbulb } from "react-icons/lu";

export type SkillIconProps = {
  name: string;
  className?: string;
};

type IconEntry = {
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string;
};

const ICONS: Record<string, IconEntry> = {
    Redux: { Icon: SiRedux, color: "#764ABC" },
    "Framer Motion": { Icon: SiFramer, color: "#0055FF" },
  HTML: { Icon: SiHtml5, color: "#E34F26" },
  CSS: { Icon: SiCss, color: "#1572B6" },
  JavaScript: { Icon: SiJavascript, color: "#B38F00" },
  TypeScript: { Icon: SiTypescript, color: "#3178C6" },
  React: { Icon: SiReact, color: "#0891B2" },
  "Next.js": { Icon: SiNextdotjs, color: "currentColor" },
  "Tailwind CSS": { Icon: SiTailwindcss, color: "#38BDF8" },
  "ShadCN UI": { Icon: SiShadcnui, color: "currentColor" },
  "React Query": { Icon: SiReactquery, color: "#FF4154" },
  "TanStack Query": { Icon: SiReactquery, color: "#FF4154" },
  Axios: { Icon: SiAxios, color: "#5A29E4" },
  "Node.js": { Icon: SiNodedotjs, color: "#5FA04E" },
  "Express.js": { Icon: SiExpress, color: "currentColor" },
  "REST APIs": { Icon: LuLink, color: "#10B981" },
  Zod: { Icon: SiZod, color: "#3068B7" },
  "Better Auth": { Icon: LuShieldCheck, color: "#A855F7" },
  JWT: { Icon: SiJsonwebtokens, color: "#D63AFF" },
  RAG: { Icon: SiOpenai, color: "#10A37F" },
  MongoDB: { Icon: SiMongodb, color: "#47A248" },
  PostgreSQL: { Icon: SiPostgresql, color: "#4169E1" },
  "Prisma ORM": { Icon: SiPrisma, color: "currentColor" },
  Firebase: { Icon: SiFirebase, color: "#FFCA28" },
  Git: { Icon: SiGithub, color: "currentColor" },
  Docker: { Icon: SiDocker, color: "#2496ED" },
  "Problem Solving (JS)": { Icon: LuBrain, color: "#F472B6" },
  "Critical Thinker": { Icon: LuLightbulb, color: "#FBBF24" },
};

export function SkillIcon({ name, className }: SkillIconProps) {
  const entry = ICONS[name];
  if (!entry) return null;
  const { Icon, color } = entry;
  return (
    <Icon
      className={className}
      style={color === "currentColor" ? undefined : { color }}
    />
  );
}
