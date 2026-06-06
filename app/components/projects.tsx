"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../../components/ui/button";
import "./projects-gradient-underline.css";
import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";
import {
  Zap,
  Package,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  Code2,
  ServerCog,
  Globe,
  FileText,
  ArrowUpRight,
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
  previewVideo?: string;
  previewPoster?: string;
  screenshots?: string[];
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
    screenshots: [
      "/img-consultedge/consultedge-home.png",
      "/img-consultedge/consultedge-dashboard.png",
      "/img-consultedge/consultedge-admin-dashboard.png",
      "/img-consultedge/consultedge-admin-dashboard-2.png",
      "/img-consultedge/consultedge-ai.png",
      "/img-consultedge/consultedge-book.png",
      "/img-consultedge/consultedge-video-call.png",
      "/img-consultedge/consultedge-message.png",
      "/img-consultedge/consultedge-notification.png",
      "/img-consultedge/consultedge-payment.png",
      "/img-consultedge/consultedge-client-feedback.png",
      "/img-consultedge/consultedge-expert-schdule.png",
      "/img-consultedge/apply-as-expert-consultedge.png",
    ],
    previewVideo: "/videos/consultedge-preview.webm",
    previewPoster: "/img-consultedge/consultedge-home.png",
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
    screenshots: ["/nexora-screenshot.png", "/nexora-2.png", "/nexora-3.png"],
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
    screenshots: ["/img/consultedge-img-1.png"],
    client: "https://github.com/mahbuba-dev/consultedge-frontend.git",
    server: "https://github.com/mahbuba-dev/Nexora-Frontend.git",
    demo: "https://nexora-frontend-nine.vercel.app/",
     icon: GraduationCap,
  },
];

export function Projects() {
  const items = PROJECTS.slice(0, 2);

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
        <div className="grid gap-6 lg:grid-cols-2">
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
  const screenshots = project.screenshots ?? [];
  const hasVideoPreview = Boolean(project.previewVideo);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const videoType = React.useMemo(() => {
    if (!project.previewVideo) return undefined;

    const lower = project.previewVideo.toLowerCase();
    if (lower.endsWith(".webm")) return "video/webm";
    if (lower.endsWith(".mp4")) return "video/mp4";

    return undefined;
  }, [project.previewVideo]);
  const mediaItems = React.useMemo(() => {
    const items: Array<{
      kind: "video" | "image";
      src: string;
      type?: string;
    }> = [];

    if (project.previewVideo) {
      items.push({ kind: "video", src: project.previewVideo, type: videoType });
    }

    screenshots.forEach((src) => {
      items.push({ kind: "image", src });
    });

    return items;
  }, [project.previewVideo, screenshots, videoType]);
  const hasMedia = mediaItems.length > 0;
  const hasMultipleMedia = mediaItems.length > 1;
  const activeMedia = mediaItems[activeIndex];

  React.useEffect(() => {
    if (!hasMultipleMedia) return;

    const intervalId = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % mediaItems.length);
    }, 3000);

    return () => window.clearInterval(intervalId);
  }, [hasMultipleMedia, mediaItems.length]);

  React.useEffect(() => {
    if (activeIndex < mediaItems.length) return;
    setActiveIndex(0);
  }, [activeIndex, mediaItems.length]);

  const goNext = () => {
    if (!hasMultipleMedia) return;
    setActiveIndex((prev) => (prev + 1) % mediaItems.length);
  };

  const goPrev = () => {
    if (!hasMultipleMedia) return;
    setActiveIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="rounded-2xl border bg-white/70 dark:bg-white/5 p-6 shadow-sm hover:shadow-lg transition"
    >
      <div className="mb-5">
        <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-slate-100 dark:border-white/10 dark:bg-slate-900/70 p-3">
          <div className="relative aspect-16/10 overflow-hidden rounded-xl bg-white/70 dark:bg-slate-800/70">
            {hasMedia && activeMedia?.kind === "video" ? (
              <video
                key={activeMedia.src}
                className="h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={project.previewPoster ?? screenshots[0]}
              >
                <source src={activeMedia.src} type={activeMedia.type} />
              </video>
            ) : hasMedia && activeMedia?.kind === "image" ? (
              <Image
                src={activeMedia.src}
                alt={`${project.title} preview ${activeIndex + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 grid place-items-center text-sm text-muted-foreground">
                Screenshot coming soon
              </div>
            )}

            {hasMultipleMedia && (
              <>
                <button
                  type="button"
                  aria-label="Previous preview"
                  onClick={goPrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-black/65 text-white transition hover:bg-black/80"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  aria-label="Next preview"
                  onClick={goNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-black/65 text-white transition hover:bg-black/80"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
          </div>
        </div>

        {hasMultipleMedia && (
          <div className="mt-3 flex items-center justify-center gap-2">
            {mediaItems.map((item, dotIndex) => (
              <button
                key={`${project.title}-dot-${dotIndex}`}
                type="button"
                aria-label={`Go to ${item.kind} ${dotIndex + 1}`}
                onClick={() => setActiveIndex(dotIndex)}
                className={`h-2.5 rounded-full transition-all ${
                  dotIndex === activeIndex
                    ? "w-7 bg-emerald-500"
                    : "w-2.5 bg-slate-300 dark:bg-slate-500"
                }`}
              />
            ))}
          </div>
        )}
      </div>

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

      {/* ACTION BAR */}
      <div className="mt-6 rounded-xl border border-black/10 bg-black/2 p-3 dark:border-white/10 dark:bg-white/3">
        <div className="flex flex-wrap items-center gap-1.5 sm:justify-between sm:flex-nowrap">
            {project.client && (
              <a href={project.client} target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  size="sm"
                  className="group relative overflow-hidden h-7 whitespace-nowrap rounded-full border-blue-500/25 bg-blue-500/5 px-2 text-[10px] font-medium text-blue-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-500/10 hover:text-blue-800 hover:shadow-md hover:shadow-blue-500/20 dark:text-blue-300 dark:hover:text-blue-200 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:h-[1.5px] after:w-0 after:-translate-x-1/2 after:bg-linear-to-r after:from-blue-400 after:to-cyan-400 after:transition-all after:duration-300 hover:after:w-[72%]"
                >
                  <Code2 className="h-2.5 w-2.5 transition-transform duration-300 group-hover:scale-110" /> Frontend Repo
                </Button>
              </a>
            )}

            {project.server && (
              <a href={project.server} target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  size="sm"
                  className="group relative overflow-hidden h-7 whitespace-nowrap rounded-full border-indigo-500/25 bg-indigo-500/5 px-2 text-[10px] font-medium text-indigo-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-500/10 hover:text-indigo-800 hover:shadow-md hover:shadow-indigo-500/20 dark:text-indigo-300 dark:hover:text-indigo-200 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:h-[1.5px] after:w-0 after:-translate-x-1/2 after:bg-linear-to-r after:from-indigo-400 after:to-sky-400 after:transition-all after:duration-300 hover:after:w-[72%]"
                >
                  <ServerCog className="h-2.5 w-2.5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" /> Backend Repo
                </Button>
              </a>
            )}

            {project.github && !project.client && !project.server && (
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  size="sm"
                  className="group relative overflow-hidden h-7 whitespace-nowrap rounded-full border-slate-500/25 bg-slate-500/5 px-2 text-[10px] font-medium text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-500/10 hover:text-slate-900 hover:shadow-md hover:shadow-slate-500/20 dark:text-slate-300 dark:hover:text-slate-100 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:h-[1.5px] after:w-0 after:-translate-x-1/2 after:bg-linear-to-r after:from-slate-300 after:to-slate-100 after:transition-all after:duration-300 hover:after:w-[72%]"
                >
                  <Code2 className="h-2.5 w-2.5 transition-transform duration-300 group-hover:scale-110" /> Source
                </Button>
              </a>
            )}

            <a href={project.demo} target="_blank" rel="noopener noreferrer">
              <Button
                size="sm"
                className="group relative overflow-hidden h-7 whitespace-nowrap rounded-full bg-linear-to-r from-blue-600 via-cyan-500 to-teal-500 px-2 text-[10px] font-semibold text-white shadow-md shadow-cyan-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-lg hover:shadow-cyan-400/35 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:h-[1.5px] after:w-0 after:-translate-x-1/2 after:bg-linear-to-r after:from-white/80 after:to-cyan-100 after:transition-all after:duration-300 hover:after:w-[78%]"
              >
                <Globe className="h-2.5 w-2.5 transition-transform duration-300 group-hover:scale-110" /> Live Product
                <ArrowUpRight className="h-2.5 w-2.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Button>
            </a>

            <Link href={`/projects/${slugify(project.title)}`}>
              <Button
                variant="outline"
                size="sm"
                className="group relative overflow-hidden h-7 whitespace-nowrap rounded-full border-black/15 bg-white/80 px-2 text-[10px] font-semibold text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-md hover:shadow-slate-500/20 dark:border-white/15 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:h-[1.5px] after:w-0 after:-translate-x-1/2 after:bg-linear-to-r after:from-slate-400 after:to-slate-700 dark:after:from-slate-300 dark:after:to-slate-100 after:transition-all after:duration-300 hover:after:w-[72%]"
              >
                <FileText className="h-2.5 w-2.5 transition-transform duration-300 group-hover:scale-110" /> Case Study
              </Button>
            </Link>
        </div>
      </div>
    </motion.div>
  );
}