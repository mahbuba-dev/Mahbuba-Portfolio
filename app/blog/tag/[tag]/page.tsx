import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getAllTags, getPostsByTag, tagToSlug } from "@/lib/posts";

type RouteParams = { tag: string };

export async function generateStaticParams(): Promise<RouteParams[]> {
  return getAllTags().map(({ tag }) => ({ tag: tagToSlug(tag) }));
}

function findOriginalTag(slug: string): string | null {
  const match = getAllTags().find(({ tag }) => tagToSlug(tag) === slug);
  return match?.tag ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { tag } = await params;
  const original = findOriginalTag(tag);
  if (!original) return { title: "Tag not found" };
  return {
    title: `Posts tagged "${original}"`,
    description: `All blog posts tagged ${original} by Mahbuba Akter.`,
  };
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function TagPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { tag } = await params;
  const original = findOriginalTag(tag);
  if (!original) notFound();
  const posts = getPostsByTag(original);

  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> All posts
      </Link>

      <div className="mt-8 max-w-2xl">
        <p className="text-xs font-medium uppercase tracking-widest text-indigo-400">
          Tag
        </p>
        <h1 className="mt-3 break-words text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
          #{original}
        </h1>
        <p className="mt-4 text-muted-foreground">
          {posts.length} {posts.length === 1 ? "post" : "posts"} tagged with
          #{original}.
        </p>
      </div>

      <ul className="mt-12 grid gap-4">
        {posts.map((post) => (
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
              </div>
              <ArrowUpRight className="hidden h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground sm:block" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}