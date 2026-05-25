"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "../../components/ui/button";
import "./projects-gradient-underline.css";
import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";
import {
  Zap,
  Package,
  GraduationCap,
} from "lucide-react";

/* =======================
   ✅ SAFE SLUG FUNCTION
======================= */
const slugify = (title: string) =>
  title
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
export type Project = {
  title: string;
  tagline: string;
  description: string;
  longDescription?: string;
  features: string[];
  detailsFeatures?: string[];
  stack: string[];
  github?: string;
  demo: string;
  icon: LucideIcon;
  badge?: { label: string; icon: LucideIcon };
  client?: string;
  server?: string;
};

export const PROJECTS: Project[] = [
  {
    title: "Consultdge",
    tagline: "Chat, notifications, live sessions, AI",
    description:
      "All-in-one consultation platform with real-time chat, AI features, video sessions, and scalable backend architecture.",
    longDescription: `
Consultdge is a full-stack consultation platform built to connect users with experts in real time.

Key Features:
- Real-time chat system using Socket.io
- AI-powered assistance for instant answers
- Video call integration for live consultations
- Scalable backend architecture with Node.js
- Secure authentication and role-based access

This project focuses on combining AI + human expertise in a single platform.
  `,
    features: [
      "Real-time chat system",
      "AI integration",
      "Live session support"
    ],
    detailsFeatures: [
      "Real-time chat system using Socket.io",
      "AI-powered assistant for smart suggestions",
      "Live video session support (1:1 & group calls)",
      "Secure authentication (JWT-based login system)",
      "Role-based access control (Admin, User, Mentor)",
      "Notification system for live updates",
      "Scalable backend architecture with Node.js",
      "Responsive UI for all devices",
      "Session scheduling system",
      "User profile management",
      "Message history & persistence",
      "Error handling & rate limiting for API security",
    ],
    stack: ["Next.js", "Node.js", "Socket.io", "Prisma"],
    client: "https://github.com/mahbuba-dev/consultedge-frontend.git",
    server: "https://github.com/mahbuba-dev/ConsultEdge-Backend.git",
    demo: "https://consultedge-frontend.vercel.app/",
    icon: Zap,
  },

  {
    title: "Nexora",
    tagline: "Modern full-stack eCommerce platform",
    description:
      "Scalable eCommerce system with cart, authentication, admin dashboard, and optimized UX for real-world usage.",
     longDescription: `
Nexora is a modern AI-powered multi-seller e-commerce platform built with a scalable full-stack architecture.

It allows sellers to create and manage their own storefronts while providing customers with a smart, personalized shopping experience powered by AI.

The platform integrates intelligent product recommendations, real-time notifications, secure authentication, and a smooth checkout system to simulate a real-world production-grade marketplace.

Nexora focuses on combining AI + e-commerce to improve product discovery, seller onboarding, and overall user experience.

Key goal: build a scalable SaaS-level marketplace with modular architecture and AI-driven features.
`,
      features: ["Product filtering system", "Cart & checkout flow", "Admin dashboard"],
    detailsFeatures: [
  "Product filtering system with AI recommendations",
  "Cart & checkout flow with real-time updates",
  "Admin dashboard for managing products and orders",
  "Secure authentication and user management",
  "Real-time notifications for order status",
  "Scalable backend architecture with Node.js",
  "Responsive UI for all devices",
  "Integration with payment gateways",
  "Error handling and logging",
],
      stack: ["Next.js", "TypeScript", "Node.js", "MongoDB"],
   client: "https://github.com/mahbuba-dev/Nexora-Frontend.git",
    server: "https://github.com/mahbuba-dev/Nexora-Backend.git",
    demo: "https://nexora-frontend-nine.vercel.app/",
    icon: Package,
  },

  {
    title: "MentorHub",
    tagline: "Role-based learning platform",
    description:
      "A mentorship platform connecting students and teachers with role-based access and structured learning flow.",
    longDescription: `
MentorHub is a structured mentorship platform connecting mentors and learners through role-based dashboards and guided learning paths.

Key Features:
- Role-based access control for mentors and learners
- Dashboard for tracking progress and managing sessions
- Structured learning paths and resources
- Secure authentication and user management
- Real-time notifications and updates

This project focuses on providing a comprehensive mentorship experience with clear roles and responsibilities.
  `,
    features: ["Role-based system", "Teacher dashboard", "Student learning system"],
    detailsFeatures: [
  "Role-based access control for mentors and learners",
  "Dashboard for tracking progress and managing sessions",
  "Structured learning paths and resources",
  "Secure authentication and user management",
  "Real-time notifications and updates",
],
    stack: ["Next.js", "Prisma", "MongoDB"],
    client: "https://github.com/mahbuba-dev/consultedge-frontend.git",
    server: "https://github.com/mahbuba-dev/Nexora-Frontend.git",
    demo: "https://nexora-frontend-nine.vercel.app/",
     icon: GraduationCap,
  },
];

export function Projects() {
  const items = PROJECTS.slice(0, 3);

  return (
    <section id="projects" className="py-7">
      <div className="mx-auto max-w-7xl px-5 md:px-8">

        {/* HEADER */}
        <div className="mb-12 text-left mt-5 ml-3">
          <h2 className="text-3xl font-bold ">
            Selected <span className="text-blue-500">Projects</span>
          </h2>
          <p className="mt-2 text-muted-foreground">
            A collection of real-world full-stack applications.
          </p>
        </div>

        {/* GRID */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const Icon = project.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="rounded-2xl border bg-white/70 dark:bg-white/5 p-6 shadow-sm hover:shadow-lg transition"
    >
      {/* ICON */}
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-lg bg-black/5 dark:bg-white/10 flex items-center justify-center">
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="font-semibold">{project.title}</h3>
      </div>

      {/* TAGLINE */}
      <p className="mt-2 text-sm text-blue-500">{project.tagline}</p>

      {/* DESCRIPTION */}
      <p className="mt-2 text-sm text-muted-foreground">
        {project.description}
      </p>

      {/* FEATURES */}
      <ul className="mt-3 space-y-1 text-xs text-muted-foreground">
        {project.features.map((f) => (
          <li key={f}>• {f}</li>
        ))}
      </ul>

      {/* STACK */}
      <div className="mt-4 flex flex-wrap gap-2">
        {project.stack.map((s) => (
          <span
            key={s}
            className="text-[10px] px-2 py-1 rounded bg-black/5 dark:bg-white/10"
          >
            {s}
          </span>
        ))}
      </div>

      {/* BUTTONS */}
      <div className="mt-5 flex justify-between items-center border-t pt-4">
        {/* Left: Main action buttons */}
        <div className="flex gap-2">
          {project.client && (
            <a href={project.client} target="_blank" rel="noopener noreferrer">
              <Button variant="link" size="sm" className="text-blue-600 hover:text-blue-800 px-2">
                <span className="gradient-underline-text">Client</span>
              </Button>
            </a>
          )}
          {project.server && (
            <a href={project.server} target="_blank" rel="noopener noreferrer">
              <Button variant="link" size="sm" className="text-blue-600 hover:text-blue-800 px-2">
                <span className="gradient-underline-text">Server</span>
              </Button>
            </a>
          )}
          {project.github && !project.client && !project.server && (
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              <Button variant="link" size="sm" className="text-blue-600 hover:text-blue-800 px-2">
                <span className="gradient-underline-text">GitHub</span>
              </Button>
            </a>
          )}
          <a href={project.demo} target="_blank" rel="noopener noreferrer">
            <Button variant="link" size="sm" className="text-blue-600 hover:text-blue-800 px-2">
              <span className="gradient-underline-text">Live</span>
            </Button>
          </a>
        </div>
        {/* Right: Details button */}
        <Link href={`/projects/${slugify(project.title)}`}>
          <Button
            variant="outline"
            size="sm"
            className="ml-2 font-semibold border-2 border-transparent px-4 py-1.5 transition-all details-gradient-border"
          >
            Details
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}