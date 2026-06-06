import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, ArrowUpRight, Sparkles } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./brand-icons";

const NAV = [
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Projects", href: "/#projects" },
  { label: "Blog", href: "/blog" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/#contact" },
];

const SOCIALS = [
  { label: "Email", href: "mailto:mahbubaislam7010@gmail.com", icon: Mail },
  { label: "GitHub", href: "https://github.com/", icon: GithubIcon },
  { label: "LinkedIn", href: "https://linkedin.com/", icon: LinkedinIcon },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative isolate mt-8 overflow-hidden border-t border-white/15 sm:mt-12 dark:border-white/10">
      {/* gradient wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-70"
        style={{
          background:
            "radial-gradient(60% 80% at 20% 0%, color-mix(in oklab, var(--brand-purple) 22%, transparent), transparent 70%), radial-gradient(50% 70% at 80% 100%, color-mix(in oklab, var(--brand-cyan) 22%, transparent), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-brand-gradient opacity-80"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-background/40 backdrop-blur-2xl"
      />

      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link
          href="/"
          className="group flex items-center gap-3 text-sm font-semibold tracking-tight"
        >
          <span className="relative grid h-9.5 w-9.5 shrink-0 place-items-center overflow-hidden rounded-full bg-white ring-1 ring-black/10 shadow-md shadow-blue-500/20 dark:bg-white dark:ring-white/40">
            <Image
              src="/img/my logo.png"
              alt="Mahbuba Akter logo"
              width={55}
              height={55}
              priority
              className="relative h-9.5 w-9.5 object-contain"
            />
          </span>

          
        </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Building modern, scalable, real-time web apps with Next.js,
              Node.js, and Prisma — with a sharp eye for design.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/40 px-3 py-1 text-xs text-muted-foreground backdrop-blur dark:bg-white/5">
              <MapPin className="h-3.5 w-3.5" style={{ color: "var(--brand-cyan)" }} />
              New York · Open to internships
            </div>
          </div>

          {/* Nav */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-foreground/70">
              Explore
            </h3>
            <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className="group inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <span>{n.label}</span>
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / CTA */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-foreground/70">
              Get in touch
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <Link
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel={s.href.startsWith("http") ? "noreferrer" : undefined}
                    className="group inline-flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand-gradient text-white ring-1 ring-white/30 shadow-sm">
                      <s.icon className="h-3.5 w-3.5" />
                    </span>
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href="/#contact"
              className="mt-5 inline-flex h-10 items-center gap-2 rounded-full bg-brand-gradient px-4 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 ring-1 ring-white/30 transition-transform hover:scale-[1.03]"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Hire me
            </Link>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-white/15 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center dark:border-white/10">
          <p>© {year} Mahbuba Akter. All rights reserved.</p>
          <p className="inline-flex items-center gap-1.5">
            Built with
            <span className="text-brand-gradient font-semibold">Next.js</span>
            ·
            <span className="text-brand-gradient font-semibold">Tailwind</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
