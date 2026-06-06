"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Mail,
  Phone,
  User,
  MessageCircle,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { GithubIcon, LinkedinIcon } from "./brand-icons";

const PORTRAIT_SRC = "/img/about-img-mahbuba.jpg";

const FACTS = [
  { icon: User, label: "Name", value: "Mahbuba Akter" },
  { icon: MapPin, label: "Location", value: "New York, USA" },
  { icon: Mail, label: "Email", value: "mahbubaislam7010@gmail.com" },
  { icon: Phone, label: "Status", value: "Internships / Full-time" },
];

const SOCIALS = [
  { Icon: GithubIcon, label: "GitHub", href: "https://github.com/" },
  { Icon: LinkedinIcon, label: "LinkedIn", href: "https://linkedin.com/" },
  { Icon: MessageCircle, label: "Chat", href: "https://twitter.com/" },
  { Icon: Mail, label: "Email", href: "mailto:mahbubaislam7010@gmail.com" },
];

export function About() {
  return (
    <section
      id="about"
      className="relative scroll-mt-24 lg:px-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-14 lg:py-15"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[420px_minmax(0,1fr)] items-start gap-10 lg:gap-16">

        {/* LEFT COLUMN — IMAGE + SOCIALS + FACTS */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center max-w-105 w-full lg:items-center md:items-start gap-4 md:gap-8 lg:gap-5"
        >
          {/* IMAGE */}
          <div className="relative w-full max-w-sm mx-auto">
            <div className="absolute inset-0 -z-10">
              <div className="absolute -left-8 top-8 h-32 w-32 rounded-full blur-3xl bg-blue-500/20" />
              <div className="absolute -right-8 bottom-8 h-32 w-32 rounded-full blur-3xl bg-cyan-400/20" />
            </div>

            <div className="relative overflow-hidden rounded-[1.8rem] p-0.5 shadow-lg">
              <span
                className="absolute inset-0 rounded-[1.8rem]"
                style={{
                  background:
                    "linear-gradient(135deg, #2563eb, #0ea5e9, #22d3ee)",
                }}
              />

              <div className="relative rounded-[1.6rem] overflow-hidden bg-background">
                <Image
                  src={PORTRAIT_SRC}
                  alt="Mahbuba Akter"
                  width={500}
                  height={320}
                  className="h-60 w-full object-cover rounded-[1.6rem] sm:h-70 md:h-80"
                  priority
                />
              </div>
            </div>
          </div>

         
          {/* FACTS MOVED UNDER IMAGE (BALANCES HEIGHT) */}
      <dl className="
        grid grid-cols-1 sm:grid-cols-2
  gap-x-8 gap-y-4
  w-full max-w-sm 
  rounded-xl border border-white/10 bg-white/60 p-4 
  backdrop-blur dark:bg-white/5
">
  {FACTS.map((f) => (
    <div key={f.label} className="flex items-start gap-4">
      
      {/* SMALLER ICON */}
      <span className="
        grid h-6 w-6 place-items-center 
        rounded-full 
        bg-linear-to-r from-blue-500 to-cyan-400
        text-white
      ">
        <f.icon className="h-3 w-3" />
      </span>

      {/* SMALLER TEXT */}
      <div className="min-w-0">
        <dt className="text-[10px] uppercase tracking-widest text-muted-foreground sm:text-[11px]">
          {f.label}
        </dt>
        <dd className="text-[11px] font-medium sm:text-xs">
          {f.value}
        </dd>
      </div>

    </div>
  ))}
</dl>

           {/* SOCIAL ICONS */}
          <div className="flex justify-center items-center md:justify-start gap-3 text-center mx-auto">
            {SOCIALS.map((s) => (
              <Link
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="relative grid h-7 w-7 place-items-center rounded-full transition hover:scale-105"
              >
                <span className="absolute inset-0 rounded-full bg-linear-to-r from-blue-500 to-cyan-400" />
                <span className="absolute inset-0.5 rounded-full bg-background" />
                <s.Icon className="relative h-3 w-3" />
              </Link>
            ))}
          </div>

        </motion.div>

        {/* RIGHT COLUMN — ABOUT TEXT + CTA */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl lg:pl-0"
        >
          <span className="inline-flex items-center rounded-full border border-white/20 bg-white/60 px-3 py-1 text-xs font-semibold backdrop-blur dark:bg-white/10">
            About Me
          </span>

          <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
            Full Stack Developer.
          </h2>

          <p className="mt-4 text-xs sm:text-sm leading-relaxed text-muted-foreground">
         I’m a Full Stack Developer experienced in building modern web applications using Next.js, Node.js, and databases.
I focus on creating scalable, high-performance, and user-centric products with a strong emphasis on user experience, clean architecture, and real-world usability.

          </p>

          <p className="mt-3 text-xs sm:text-sm leading-relaxed text-muted-foreground">
            {/* I enjoy transforming ideas into clean, production-ready systems with thoughtful UI and robust backend architecture.
            I focus on performance, structure, and real-world usability. */}
          I prioritize system design to craft scalable, maintainable, and production-ready applications that perform reliably at production scale.
I enjoy working across both frontend and backend to turn complex ideas into simple, intuitive user experiences.
I care about writing clean, maintainable code that can grow with real-world demands.
I always try to explore new technologies to stay updated and improve my development approach.
          </p>

          {/* CTA BUTTONS */}
          <div className="mt-6 flex items-center gap-3 flex-wrap">
            <Button
              asChild
              size="sm"
              variant="outline"
              className="rounded-full"
            >
              <Link href="#contact" className="flex items-center gap-2">
                Contact <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>

            <Button
              asChild
              size="sm"
              className="rounded-full bg-brand-gradient text-white shadow-md shadow-blue-500/25"
            >
              <Link href="#projects" className="flex items-center gap-2">
                View Projects <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
