import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import {
  getAdjacentPosts,
  getAllPosts,
  getPostBySlug,
  getRelatedPosts,
  tagToSlug,
} from "@/lib/posts";
import { extractToc, markdownToHtml } from "@/lib/markdown";
import { TableOfContents } from "@/app/components/toc";
import { PostNav, RelatedPosts } from "@/app/components/post-nav";
import { MdxRenderer } from "@/app/components/mdx-renderer";
import { PostStats } from "@/app/components/post-stats";

type RouteParams = { slug: string };

export async function generateStaticParams(): Promise<RouteParams[]> {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const html =
    post.format === "mdx" ? null : await markdownToHtml(post.content);
  const toc = extractToc(post.content);
  const { previous, next } = getAdjacentPosts(post.slug);
  const related = getRelatedPosts(post.slug);

  const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://mahbuba.dev";
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Person", name: "Mahbuba Akter", url: SITE_URL },
    keywords: post.tags.join(", "),
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    image: `${SITE_URL}/blog/${post.slug}/opengraph-image`,
  };

  return (
    <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:px-6 sm:py-16 xl:grid-cols-[minmax(0,1fr)_220px] xl:gap-12">
      <article className="mx-auto w-full min-w-0 max-w-3xl xl:mx-0">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> All posts
        </Link>

        <header className="mt-8">
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden>·</span>
            <span>{post.readingTime}</span>
          </div>
          <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            {post.title}
          </h1>
          <p className="mt-3 text-base text-muted-foreground sm:text-lg">{post.description}</p>
          {post.tags.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-1.5">
              {post.tags.map((t) => (
                <li key={t}>
                  <Link
                    href={`/blog/tag/${tagToSlug(t)}`}
                    className="inline-block rounded-md border border-border/60 bg-background/60 px-2 py-0.5 text-[11px] text-muted-foreground transition-colors hover:border-indigo-400/40 hover:text-indigo-300"
                  >
                    #{t}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <PostStats slug={post.slug} />
        </header>

        {post.format === "mdx" ? (
          <div className="prose prose-sm sm:prose-base prose-zinc dark:prose-invert mt-10 max-w-none break-words prose-headings:scroll-mt-24 prose-pre:overflow-x-auto prose-pre:rounded-xl prose-pre:border prose-pre:border-border/60 prose-pre:bg-zinc-950/80 prose-img:rounded-xl prose-code:break-words prose-code:before:hidden prose-code:after:hidden">
            <MdxRenderer source={post.content} />
          </div>
        ) : (
          <div
            className="prose prose-sm sm:prose-base prose-zinc dark:prose-invert mt-10 max-w-none break-words prose-headings:scroll-mt-24 prose-pre:overflow-x-auto prose-pre:rounded-xl prose-pre:border prose-pre:border-border/60 prose-pre:bg-zinc-950/80 prose-img:rounded-xl prose-code:break-words prose-code:before:hidden prose-code:after:hidden"
            dangerouslySetInnerHTML={{ __html: html ?? "" }}
          />
        )}

        <PostNav previous={previous} next={next} />
        <RelatedPosts posts={related} />
      </article>

      <aside>
        <TableOfContents items={toc} />
      </aside>
    </div>
  );
}