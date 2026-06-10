"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, Search, X } from "lucide-react";
import type { PostMeta } from "@/lib/posts";

function tagToSlug(tag: string): string {
  return tag.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function scorePost(post: PostMeta, query: string): number {
  if (!query) return 1;
  const q = query.toLowerCase().trim();
  if (!q) return 1;
  const title = post.title.toLowerCase();
  const desc = post.description.toLowerCase();
  const tags = post.tags.map((t) => t.toLowerCase());

  if (title.includes(q)) return 4;
  if (tags.some((t) => t.includes(q))) return 3;
  if (desc.includes(q)) return 2;
  // token-level fallback
  const tokens = q.split(/\s+/).filter(Boolean);
  if (tokens.length > 1 && tokens.every((tok) =>
    title.includes(tok) || desc.includes(tok) || tags.some((t) => t.includes(tok)),
  )) {
    return 1;
  }
  return 0;
}

export function BlogSearch({
  posts,
}: {
  posts: PostMeta[];
}): React.ReactElement {
  const [query, setQuery] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Cmd/Ctrl+K to focus
  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
      }
      if (e.key === "Escape" && document.activeElement === inputRef.current) {
        setQuery("");
        inputRef.current?.blur();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const filtered = React.useMemo(() => {
    return posts
      .map((p) => ({ post: p, score: scorePost(p, query) }))
      .filter((x) => x.score > 0)
      .sort((a, b) =>
        b.score - a.score || (a.post.date < b.post.date ? 1 : -1),
      )
      .map((x) => x.post);
  }, [posts, query]);

  return (
    <div className="mt-12">
      <div className="relative">
        <Search
          aria-hidden
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        />
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search posts by title, tag, or description…"
          aria-label="Search posts"
          className="w-full rounded-2xl border border-border/60 bg-card/60 py-3 pl-10 pr-20 text-sm backdrop-blur outline-none transition-colors placeholder:text-muted-foreground focus:border-indigo-400/40 focus:ring-2 focus:ring-indigo-400/20"
        />
        {query ? (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground transition-colors hover:bg-background/60 hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        ) : (
          <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 select-none rounded border border-border/60 bg-background/60 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:inline-flex">
            ⌘K
          </kbd>
        )}
      </div>

      <p
        className="mt-3 text-xs text-muted-foreground"
        aria-live="polite"
        role="status"
      >
        {query
          ? `${filtered.length} ${filtered.length === 1 ? "result" : "results"} for “${query}”`
          : `${posts.length} posts`}
      </p>

      <ul className="mt-6 grid gap-4">
        {filtered.length === 0 && (
          <li className="rounded-2xl border border-dashed border-border/60 p-10 text-center text-sm text-muted-foreground">
            No posts match “{query}”.
          </li>
        )}
        {filtered.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="group flex flex-col justify-between gap-4 rounded-2xl border border-border/60 bg-card/60 p-4 backdrop-blur transition-all hover:-translate-y-0.5 hover:border-indigo-400/40 hover:shadow-xl hover:shadow-indigo-500/5 sm:flex-row sm:items-center sm:p-5"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span aria-hidden>·</span>
                  <span>{post.readingTime}</span>
                </div>
                <h2 className="mt-1 text-base font-semibold tracking-tight group-hover:text-indigo-300 sm:truncate sm:text-lg">
                  {post.title}
                </h2>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                  {post.description}
                </p>
                {post.tags.length > 0 && (
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {post.tags.map((t) => {
                      const matches =
                        query &&
                        t.toLowerCase().includes(query.toLowerCase().trim());
                      return (
                        <li
                          key={t}
                          className={
                            "rounded-md border px-2 py-0.5 text-[11px] transition-colors " +
                            (matches
                              ? "border-indigo-400/50 bg-indigo-500/10 text-indigo-300"
                              : "border-border/60 bg-background/60 text-muted-foreground")
                          }
                          data-tag={tagToSlug(t)}
                        >
                          #{t}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
              <ArrowUpRight className="hidden h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground sm:block" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}