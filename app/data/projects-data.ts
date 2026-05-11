import { GraduationCap, Package, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Project = {
  title: string;
  tagline: string;
  description: string;
  longDescription?: string;
  features: string[];
  detailsFeatures?: string[];
  stack: string[];
  github: string;
  demo: string;
  icon: LucideIcon;
  badge?: { label: string; icon: LucideIcon };
   images: string[]
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
    github: "#",
    demo: "#",
    icon: Zap,
    images: ["/consultedge-1.png", "/consultedge-2.png", "/consultedge-3.png"]
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
    github: "#",
    demo: "#",
    icon: Package,
    images: ["/nexora-screenshot.png", "/nexora-2.png", "/nexora-3.png"]
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
    github: "#",
    demo: "#",
    icon: GraduationCap,
    images: ["/img/mentorhub-img-1.png", "/img/mentorhub-img-2.png", "/img/mentorhub-img-3.png"]
  },
];