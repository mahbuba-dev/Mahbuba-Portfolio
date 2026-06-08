"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { getAllPosts } from "@/lib/posts";
import { motion } from "framer-motion";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function LatestPosts(): React.ReactElement | null {
  const posts = getAllPosts().slice(0, 3);

  if (!posts || posts.length === 0) return null;

  const [featured, ...rest] = posts;

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section
      id="writing"
      className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 md:px-7"
    >
      {/* background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-1/3 -z-10 h-72 w-72 rounded-full bg-gradient-to-br from-indigo-400/15 via-sky-400/10 to-cyan-400/15 blur-3xl"
      />

      {/* HEADER */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={sectionVariants}
        className="md:ml-2 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end "
      >
        <motion.div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-transparent bg-gradient-to-r from-indigo-500 via-sky-500 to-cyan-500 bg-clip-text dark:from-indigo-300 dark:via-sky-300 dark:to-cyan-300">
            Writing
          </p>

          <h2 className="mt-3 lg:text-4xl font-semibold tracking-tight sm:text-3xl text-black dark:text-white ">
            From the{" "}
            <span className="text-transparent bg-gradient-to-r from-indigo-500 via-sky-500 to-cyan-500 bg-clip-text dark:from-indigo-300 dark:via-sky-300 dark:to-cyan-300">
              blog
            </span>
            .
          </h2>

          <p className="mt-3 text-muted-foreground">
            Short, practical notes on what I&apos;m building and learning.
          </p>
        </motion.div>

        <Link
          href="/blog"
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-foreground/80 backdrop-blur-xl transition hover:border-indigo-400/50 hover:bg-white/20 dark:bg-white/5"
        >
          All posts
          <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>

      {/* GRID */}
      <motion.div
        className="mt-12 grid gap-5 lg:grid-cols-12"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.08,
            },
          },
        }}
      >

        {/* FEATURED */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 32, scale: 0.96 },
            show: {
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              },
            },
          }}
          whileHover={{ y: -8, scale: 1.01 }}
          transition={{ type: "spring", stiffness: 130, damping: 18 }}
          className="lg:col-span-7 lg:row-span-2"
        >
        <Link
          href={`/blog/${featured.slug}`}
          className="group relative isolate overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-7 backdrop-blur-xl transition hover:-translate-y-1 hover:border-indigo-400/50 hover:shadow-2xl hover:shadow-indigo-500/10 sm:p-9 lg:col-span-7 lg:row-span-2 dark:bg-white/5"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-gradient-to-br from-indigo-400/30 via-sky-400/20 to-cyan-400/30 blur-3xl"
          />

          {/* TAGS */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-full bg-gradient-to-r from-indigo-500/20 via-sky-500/20 to-cyan-500/20 px-3 py-1 font-semibold uppercase tracking-widest text-indigo-700 ring-1 ring-white/20 dark:text-indigo-200">
              Featured
            </span>

            {featured.tags.slice(0, 2).map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-foreground/80 dark:bg-white/5"
              >
                #{t}
              </span>
            ))}
          </div>

          <h3 className="mt-5 text-2xl font-semibold leading-tight sm:text-3xl lg:text-3xl text-black dark:text-white">
            {featured.title}
          </h3>

          <p className="mt-3 text-base text-muted-foreground">
            {featured.description}
          </p>

          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <time dateTime={featured.date}>
                {formatDate(featured.date)}
              </time>
              <span>·</span>
              <span>{featured.readingTime}</span>
            </div>

            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 via-sky-500 to-cyan-500 text-white shadow-lg transition group-hover:rotate-12 group-hover:scale-110">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </Link>
        </motion.div>

        {/* REST POSTS */}
        {rest.map((post, idx) => (
          <motion.div
            key={post.slug}
            variants={{
              hidden: { opacity: 0, y: 28, scale: 0.97 },
              show: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  duration: 0.65,
                  ease: [0.16, 1, 0.3, 1],
                },
              },
            }}
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 135, damping: 17 }}
            className="lg:col-span-5"
          >
          <Link
            href={`/blog/${post.slug}`}
            className="group relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-xl transition hover:-translate-y-1 hover:border-indigo-400/50 hover:shadow-xl hover:shadow-indigo-500/10 lg:col-span-5 dark:bg-white/5"
          >
            <span className="font-mono text-[11px] font-semibold tracking-widest text-muted-foreground">
              0{idx + 2}
            </span>

            <h3 className="mt-2 text-lg font-semibold group-hover:text-indigo-600 dark:group-hover:text-indigo-300 text-black dark:text-white">
              {post.title}
            </h3>

            <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
              {post.description}
            </p>

            <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <time dateTime={post.date}>
                  {formatDate(post.date)}
                </time>
                <span>·</span>
                <span>{post.readingTime}</span>
              </div>

              <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}