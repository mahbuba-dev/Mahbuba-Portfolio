"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function ProjectGalleryClient({
  images,
}: {
  images: string[];
}): React.ReactElement {
  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    if (!images || images.length <= 1) return;
    const id = window.setInterval(() => {
      setActive((s) => (s + 1) % images.length);
    }, 3500);
    return () => window.clearInterval(id);
  }, [images]);

  const goPrev = () => setActive((s) => (s - 1 + images.length) % images.length);
  const goNext = () => setActive((s) => (s + 1) % images.length);

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="relative overflow-hidden rounded-2xl border border-sky-300/12 bg-sky-900/10 p-2 backdrop-blur-md">
        <div className="relative h-[230px] sm:h-[280px] md:h-[320px]">
          <AnimatePresence initial={false} mode="wait">
            {images.map((src, i) =>
              i === active ? (
                <motion.div
                  key={src}
                  initial={{ x: 60, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -60, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={src}
                    alt={`project screenshot ${i + 1}`}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover rounded-xl"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-[conic-gradient(at_20%_10%,rgba(56,189,248,0.08),rgba(124,58,237,0.06),rgba(14,165,233,0.05))] mix-blend-overlay rounded-xl" />
                </motion.div>
              ) : null
            )}
          </AnimatePresence>

          {/* Controls */}
          {images.length > 1 && (
            <>
              <button
                onClick={goPrev}
                aria-label="Previous"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 grid h-10 w-10 place-items-center rounded-full bg-black/50 text-white backdrop-blur-sm hover:bg-black/60 transition"
              >
                ‹
              </button>
              <button
                onClick={goNext}
                aria-label="Next"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 grid h-10 w-10 place-items-center rounded-full bg-black/50 text-white backdrop-blur-sm hover:bg-black/60 transition"
              >
                ›
              </button>
            </>
          )}
        </div>

        {/* dots */}
        {images.length > 1 && (
          <div className="mt-3 flex items-center justify-center gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Go to ${i + 1}`}
                className={`h-2.5 rounded-full transition-all ${
                  i === active ? "w-6 bg-cyan-400" : "w-2.5 bg-white/40"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
