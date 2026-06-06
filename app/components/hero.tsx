"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Briefcase, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import "./hero-animated-outline.css";

const PORTRAIT_SRC = "/img/mahbuba-professional-img.png";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden min-h-[40vh] max-w-7xl mx-auto flex items-center px-2 pb-4 pt-2 sm:px-0 sm:pb-8 lg:px-10 lg:pt-4">
      <ShapeField />

      {/* background fades */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-b from-background/0 via-background/30 to-background"
      />
      <div
        aria-hidden
        className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-[0.05]"
      />

      {/* container */}
      <div className="mx-auto grid max-w-6xl gap-4 px-4 sm:px-6 md:grid-cols-[1fr_auto] md:items-center md:gap-5 lg:gap-10">

        {/* LEFT */}
        <div className="order-2 flex flex-col items-center text-center md:order-1 md:items-start md:text-left">

          {/* greeting */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="inline-flex items-center gap-1 rounded-full border border-white/25 bg-white/60 px-4 py-1 text-sm font-semibold text-foreground shadow-sm backdrop-blur-md dark:bg-white/10">
              Hey <span className="animate-wave">👋</span>
            </span>
          </motion.div>

          {/* name */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="font-display mt-2 text-3xl font-bold leading-[1.08] tracking-[-0.03em] sm:text-4xl md:text-4xl"
          >
            I&apos;m{" "}
            <span className="text-brand-gradient animate-gradient-x">
              Mahbuba Akter
            </span>
          </motion.h1>

          {/* subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-2 text-sm sm:text-base font-semibold text-foreground/90"
          >
            Full Stack Developer.
          </motion.p>

          {/* tech stack */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-1.5 text-xs sm:text-sm text-muted-foreground"
          >
            Next.js • React • TypeScript • Node.js • Prisma • PostgreSQL • MongoDB
          </motion.p>

          {/* description (REDUCED) */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-3 max-w-2xl text-xs sm:text-sm leading-relaxed text-muted-foreground"
          >
            I specialize in building clean, scalable, and production-ready web applications using modern technologies. I focus on performance, user experience, and maintainable architecture.
          </motion.p>

          {/* badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-blue-400 bg-blue-100 px-3 py-1 text-xs text-muted-foreground dark:bg-black"
          >
            <Briefcase className="h-3.5 w-3.5 text-brand-cyan" />
            Open to junior full-stack internships
          </motion.div>

          {/* buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 flex flex-col items-center gap-3 sm:flex-row md:items-start"
          >

             <Button asChild variant="outline" size="lg" className="rounded-full">
              <Link href="/resume" className="flex items-center gap-2">
                <Download className="h-3.5 w-3.5" />
                Download Resume
              </Link>
                         </Button>


          

        <Button
          asChild
          size="lg"
          className="animated-border px-7 py-2 bg-white text-neutral-900 dark:bg-background dark:text-white border-2 border-transparent rounded-full font-semibold shadow-md relative overflow-visible"
        >
          <Link href="#contact" className="relative flex items-center gap-2 z-10">
            <span className="absolute inset-0 -z-10 rounded-full bg-cyan-400/25 blur-xl pointer-events-none" />
            <Mail className="h-4 w-4 text-neutral-900" />
            <span className="text-neutral-900 drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)]">Let&apos;s Work Together</span>
          </Link>
        </Button>
          </motion.div>
        </div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="order-1 relative mx-auto md:order-2 md:mx-0"
        >
          <PortraitBlob src={PORTRAIT_SRC} />
        </motion.div>
      </div>
    </section>
  );
}

/* unchanged portrait + shapes (kept clean) */
function PortraitBlob({ src }: { src: string }) {
  return (
    <div className="relative flex h-64 w-48 items-center justify-center sm:h-72 sm:w-56 md:h-96 md:w-72 lg:w-[20rem]">

      {/* BACKGROUND FLOATING GLOW ORBS */}
      <motion.div
        className="absolute inset-0 -z-10"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute top-10 left-6 h-32 w-32 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute bottom-10 right-6 h-32 w-32 rounded-full bg-cyan-400/20 blur-3xl" />
      </motion.div>

      {/* FLOATING MICRO PARTICLES (NOW VISIBLE) */}
      <div className="absolute inset-0 -z-5">
        <motion.span
          className="absolute top-8 left-10 h-2 w-2 rounded-full bg-blue-400/70"
          animate={{ y: [0, -15, 0], x: [0, 8, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.span
          className="absolute bottom-16 right-12 h-1.5 w-1.5 rounded-full bg-cyan-300/70"
          animate={{ y: [0, -18, 0], x: [0, -6, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <motion.span
          className="absolute top-1/2 left-2 h-1 w-1 rounded-full bg-purple-400/60"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 3.5, repeat: Infinity }}
        />
      </div>

      {/* IMAGE CARD */}
      <motion.div
        whileHover={{ scale: 1.03, rotate: 0.5 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="relative z-10 overflow-hidden rounded-[2rem] p-0.5 shadow-2xl"
      >
        {/* animated border glow */}
        <div className="absolute inset-0 bg-brand-gradient animate-gradient-x opacity-80" />

        {/* image container */}
        <div className="relative rounded-[1.85rem] overflow-hidden bg-background">
          <Image
            src={src}
            alt="Mahbuba Akter"
            width={420}
            height={420}
            className="h-64 w-52 sm:h-72 sm:w-60 md:h-80 md:w-64 object-cover"
            priority
          />

          {/* soft overlay shine */}
          <motion.div
            className="absolute inset-0 bg-white/10"
            animate={{ opacity: [0.05, 0.15, 0.05] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </div>
      </motion.div>

      {/* GLOW UNDER IMAGE */}
      <motion.div
        className="absolute -bottom-6 h-6 w-40 rounded-full bg-blue-400/30 blur-xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </div>
  );
}
function ShapeField() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" />
  );
}