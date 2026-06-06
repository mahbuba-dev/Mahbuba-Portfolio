"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import { CommandPaletteTrigger } from "./command-palette";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Projects", href: "/#projects" },
];

const MORE_LINKS = [
  { label: "Skills", href: "/#skills" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];

export function Navbar() {
  const pathname = usePathname();

  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [moreOpen, setMoreOpen] = React.useState(false);
  const [activeHash, setActiveHash] = React.useState("");

  // ✅ Scroll effect
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ✅ Scroll spy (safe)
  React.useEffect(() => {
    if (pathname !== "/") return;

    const sections = ["about", "services", "projects", "skills", "contact"]
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          setActiveHash(`#${visible[0].target.id}`);
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0.2 }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  function isActive(href: string) {
    if (href.startsWith("/#")) {
      return pathname === "/" && activeHash === href;
    }
    return pathname === href;
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 backdrop-blur-xl transition-all",
        "bg-white/10 dark:bg-black/20 border-b border-white/10",
        scrolled && "bg-white/25 dark:bg-black/40"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-3 sm:px-6 max-[380px]:h-14 max-[380px]:px-2">

        {/* LOGO */}
        <Link href="/" className="flex items-center mt-1 justify-center">
          <div className="h-9 w-9 overflow-hidden bg-blue-100 rounded-full ring-1 ring-white/20 flex flex-col justify-center items-center">
            <Image
              src="/img/my logo.png"
              alt="logo"
              width={40}
              height={40}
              className="text-center"
            />
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <ul className="hidden md:flex items-center gap-1">

          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "px-3 py-2 text-sm rounded-md transition-all relative",
                  isActive(link.href)
                    ? "text-foreground"
                    : "text-foreground/70 hover:text-foreground"
                )}
              >
                {link.label}

                {/* glow underline */}
                <span
                  className={cn(
                    "absolute left-2 right-2 -bottom-1 h-0.5 rounded-full bg-linear-to-r from-indigo-500 to-cyan-400 transition-transform duration-300",
                    isActive(link.href)
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  )}
                />
              </Link>
            </li>
          ))}

          {/* MORE DROPDOWN */}
          <li
            className="relative"
            onMouseEnter={() => setMoreOpen(true)}
            onMouseLeave={() => setMoreOpen(false)}
          >
            <button className="px-3 py-2 text-sm text-foreground/70 hover:text-foreground rounded-md">
              More
            </button>

            {/* dropdown */}
            <div
              className={cn(
                "absolute right-0 mt-2 w-44 rounded-xl border border-white/10 bg-white/20 dark:bg-black/40 backdrop-blur-xl shadow-xl overflow-hidden transition-all duration-200",
                moreOpen
                  ? "opacity-100 translate-y-0 visible"
                  : "opacity-0 -translate-y-2 invisible pointer-events-none"
              )}
            >
              {MORE_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMoreOpen(false)}
                  className="block px-3 py-2 text-sm hover:bg-white/20 dark:hover:bg-white/10 transition"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </li>
        </ul>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-2 max-[380px]:gap-1">
          <div className="max-[380px]:hidden">
            <CommandPaletteTrigger />
          </div>
          <ThemeToggle />

          {/* MOBILE BUTTON */}
          <Button
            variant="ghost"
            size="icon-sm"
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div
        className={cn(
          "md:hidden overflow-hidden border-t border-white/10 bg-white/10 dark:bg-black/40 transition-all duration-300",
          mobileOpen ? "max-h-96 py-3" : "max-h-0"
        )}
      >
        <div className="px-4 flex flex-col gap-2">

          {[...NAV_LINKS, ...MORE_LINKS].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2 rounded-md text-sm hover:bg-white/20 transition"
            >
              {link.label}
            </Link>
          ))}

        </div>
      </div>
    </header>
  );
}