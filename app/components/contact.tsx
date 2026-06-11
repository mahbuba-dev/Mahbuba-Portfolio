"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Mail, Send, Loader2, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { GithubIcon, LinkedinIcon } from "./brand-icons";
import { BurstEffect, type BurstHandle } from "./burst-effect";

type Status = "idle" | "loading" | "success" | "warning" | "error";

export function Contact() {
  const [status, setStatus] = React.useState<Status>("idle");
  const [error, setError] = React.useState<string | null>(null);
  const [warning, setWarning] = React.useState<string | null>(null);
  const burstRef = React.useRef<BurstHandle>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget; // ✅ cache before async boundary
    burstRef.current?.trigger();

    setStatus("loading");
    setError(null);
    setWarning(null);

    const fd = new FormData(form);

    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      message: String(fd.get("message") ?? ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await res.json()) as {
        ok?: boolean;
        delivered?: boolean;
        error?: string;
      };

      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? "Failed to send");
      }

      // Logged but not actually emailed (dev mode, no API key).
      if (data.delivered === false) {
        setStatus("warning");
        setWarning(
          data.error ??
            "Message received but email is not configured on the server.",
        );
        form.reset();
        return;
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <section id="contact" className="scroll-mt-24 pt-5 pb-2 sm:pb-4">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <p className="bg-linear-to-r from-indigo-500 via-sky-500 to-cyan-500 bg-clip-text text-xs font-semibold uppercase tracking-widest text-transparent dark:from-indigo-300 dark:via-sky-300 dark:to-cyan-300">
              Contact
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-3xl">
              Let&apos;s build{" "}
              <span className="bg-linear-to-r from-indigo-500 via-sky-500 to-cyan-500 bg-clip-text text-transparent dark:from-indigo-300 dark:via-sky-300 dark:to-cyan-300">
                something together.
              </span>
            </h2>

          

         <ul className="mt-8 grid gap-3 rounded-[32px]   p-1 shadow-[0_24px_80px_-48px_rgba(56,189,248,0.24)] backdrop-blur-2xl dark:border-slate-700/40 dark:bg-slate-950/20 text-sm">

  {/* EMAIL */}
  <li>
    <Link
      href="mailto:mahbubaislam7010@gmail.com"
      className="group flex items-center gap-3 rounded-[24px] border border-white/20 bg-white/10 px-3 py-2 backdrop-blur-2xl shadow-[0_16px_32px_-18px_rgba(56,189,248,0.25)] transition-all hover:border-cyan-300/50 hover:bg-white/20 dark:border-slate-600/40 dark:bg-slate-950/20 dark:hover:bg-slate-900/30"
    >
      <span className="grid h-7 w-7 place-items-center rounded-md bg-linear-to-br from-indigo-500 via-sky-500 to-cyan-500 text-white shadow-md ring-1 ring-white/30">
        <Mail className="h-3.5 w-3.5" />
      </span>

      <span className="text-foreground/90 group-hover:text-foreground truncate">
        mahbubaislam7010@gmail.com
      </span>
    </Link>
  </li>

  {/* GITHUB + LINKEDIN ROW */}
  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

    {/* GITHUB */}
    <li>
      <Link
        href="https://github.com/"
        target="_blank"
        className="group flex items-center gap-3 rounded-[24px] border border-white/20 bg-white/10 px-3 py-2 backdrop-blur-2xl shadow-[0_16px_32px_-18px_rgba(56,189,248,0.22)] transition-all hover:border-cyan-300/50 hover:bg-white/20 dark:border-slate-600/40 dark:bg-slate-950/20 dark:hover:bg-slate-900/30"
      >
        <span className="grid h-7 w-7 place-items-center rounded-md bg-linear-to-br from-slate-200 via-slate-100 to-white text-slate-900 shadow-md ring-1 ring-white/30 dark:from-slate-700 dark:via-slate-600 dark:to-slate-500 dark:text-white">
          <GithubIcon className="h-3.5 w-3.5" />
        </span>

        <span className="text-foreground/90 group-hover:text-foreground">
          GitHub
        </span>
      </Link>
    </li>

    {/* LINKEDIN */}
    <li>
      <Link
        href="https://linkedin.com/"
        target="_blank"
        className="group flex items-center gap-3 rounded-[24px] border border-white/20 bg-white/10 px-3 py-2 backdrop-blur-2xl shadow-[0_16px_32px_-18px_rgba(56,189,248,0.22)] transition-all hover:border-cyan-300/50 hover:bg-white/20 dark:border-slate-600/40 dark:bg-slate-950/20 dark:hover:bg-slate-900/30"
      >
        <span className="grid h-7 w-7 place-items-center rounded-md bg-linear-to-br from-sky-400 via-blue-500 to-indigo-500 text-white shadow-md ring-1 ring-white/30">
          <LinkedinIcon className="h-3.5 w-3.5" />
        </span>

        <span className="text-foreground/90 group-hover:text-foreground">
          LinkedIn
        </span>
      </Link>
    </li>

  </div>

</ul>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.05 }}
            onSubmit={onSubmit}
            className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-6 shadow-lg shadow-black/10 backdrop-blur-xl backdrop-saturate-150 sm:p-8 dark:bg-white/5 dark:shadow-black/40"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-px -z-10 rounded-2xl bg-linear-to-br from-indigo-400/20 via-sky-400/10 to-cyan-400/20 opacity-60"
            />

            <div className="grid gap-4">
              <div className="grid gap-1.5">
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <Input id="name" name="name" required minLength={2} placeholder="Jane Doe" />
              </div>

              <div className="grid gap-1.5">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input id="email" name="email" type="email" required placeholder="you@company.com" />
              </div>

              <div className="grid gap-1.5">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  minLength={10}
                  rows={5}
                  placeholder="Tell me a little about your team or role..."
                />
              </div>

              <div className="relative inline-flex">
                <Button
                  type="submit"
                  disabled={status === "loading"}
                  className="relative mt-2 overflow-visible bg-brand-gradient text-white shadow-lg shadow-blue-500/30 ring-1 ring-white/20"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Sending
                    </>
                  ) : status === "success" ? (
                    <>
                      <CheckCircle2 className="h-4 w-4" /> Message sent
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" /> Send message
                    </>
                  )}
                </Button>
                <BurstEffect ref={burstRef} />
              </div>

              {status === "error" && (
                <p className="text-sm text-red-500">{error}</p>
              )}
              {status === "warning" && warning && (
                <p className="text-sm text-amber-600 dark:text-amber-300">
                  {warning}
                </p>
              )}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}