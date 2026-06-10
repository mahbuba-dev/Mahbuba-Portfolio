import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, getAllTags, tagToSlug } from "@/lib/posts";
import { BlogSearch } from "@/app/components/blog-search";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles and notes on full-stack development, real-time systems, and modern web UI by Mahbuba Akter.",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="grid gap-8">
        <div className="">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-indigo-300/80">
              Blog
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
              Writing about the things I&apos;m building.
            </h1>
            <p className="mt-4 text-sm text-slate-300">
              Short, practical posts on full-stack development, real-time systems,
              and modern web UI.
            </p>
          </div>

          {tags.length > 0 && (
            <div className="mt-8">
              <div className="flex flex-wrap gap-2">
                {tags.map(({ tag, count }) => (
                  <Link
                    key={tag}
                    href={`/blog/tag/${tagToSlug(tag)}`}
                    className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-3 py-1.5 text-[11px] font-semibold text-slate-300 transition hover:border-indigo-400/40 hover:bg-indigo-500/10 hover:text-indigo-200"
                  >
                    <span>#{tag}</span>
                    <span className="text-slate-400">{count}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl shadow-slate-950/10">
          {posts.length === 0 ? (
            <div className="text-xs rounded-2xl border border-dashed border-border/60 p-10 text-center text-muted-foreground">
              No posts yet — check back soon.
            </div>
          ) : (
            <BlogSearch posts={posts} />
          )}
        </div>
      </div>
    </section>
  );
}