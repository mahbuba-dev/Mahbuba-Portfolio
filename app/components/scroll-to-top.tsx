"use client";

import * as React from "react";
import { ArrowUp } from "lucide-react";

/**
 * Floating "back to top" button.
 * Fades in once the user scrolls past 480px.
 */
export function ScrollToTop() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={scrollTop}
      className={`fixed bottom-6 left-4 z-40 grid h-8 w-8 place-items-center rounded-full text-white shadow-xl shadow-blue-500/30 ring-1 ring-white/30 transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--brand-cyan) sm:left-auto sm:bottom-24 sm:right-6 ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-2 pointer-events-none"
      }`}
    >
      <span
        aria-hidden
        className="absolute inset-0 rounded-full bg-brand-gradient"
      />
      <span
        aria-hidden
        className="absolute inset-0 -z-10 rounded-full bg-brand-gradient blur-md opacity-70"
      />
      <ArrowUp className="relative h-3 w-3" />
    </button>
  );
}
