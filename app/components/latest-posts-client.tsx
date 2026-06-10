"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { PostMeta } from "@/lib/posts";

type ClientPost = {
	slug: string;
	title: string;
	description: string;
	tags: string[];
	readingTime: string;
	formattedDate: string;
};

export function LatestPostsClient({
	posts,
}: {
	posts: ClientPost[];
}): React.ReactElement {
	const featured = posts[0];
	const secondary = posts.slice(1);

	return (
		<section id="blog" className="py-7 max-[380px]:py-4">
			<div className="mx-auto max-w-7xl px-3 sm:px-5 md:px-8 max-[380px]:px-2">
				<div className="w-full rounded-[32px] bg-transparent shadow-none backdrop-blur-xl">
					<div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
				<div>
					<p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-sky-500/90">
						Writing
					</p>
					<h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-950 sm:text-2xl dark:text-white">
						From the blog.
					</h2>
					<p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
						Short, practical notes on what I&apos;m building and learning.
					</p>
				</div>
				<Link
					href="/blog"
					className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-sky-200/80 px-3 py-2 text-sm font-semibold text-slate-950 transition hover:border-cyan-400/60 hover:bg-sky-300/90 hover:text-slate-950 dark:border-cyan-400/20 dark:bg-white/10 dark:text-white dark:hover:bg-cyan-500/15"
				>
					All posts
					<ArrowRight className="h-4 w-4" />
				</Link>
			</div>

			<div className="grid gap-3 lg:grid-cols-[1.05fr_0.95fr]">
				{featured && (
					<Link
						href={`/blog/${featured.slug}`}
						className="group relative overflow-hidden rounded-[22px] border border-slate-200/70 bg-white/90 p-3 shadow-[0_24px_74px_-40px_rgba(56,189,248,0.24)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-0.5 hover:border-slate-300/70 hover:bg-white/95 dark:border-slate-700/30 dark:bg-slate-900/55 dark:hover:bg-slate-900/65"
					>
						<h3 className="text-lg font-semibold tracking-tight text-slate-950 dark:text-white">
							{featured.title}
						</h3>
						<p className="mt-2 text-xs leading-5 text-slate-600 dark:text-slate-300 line-clamp-2">
							{featured.description}
						</p>
						<div className="mt-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
							<p className="text-xs text-slate-500 dark:text-slate-400">
								{featured.formattedDate} • {featured.readingTime}
							</p>
							<div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-sky-400 text-white transition group-hover:scale-105">
								<ArrowRight className="h-4 w-4" />
							</div>
						</div>
					</Link>
				)}

				<div className="grid gap-3">
					{secondary.map((item, index) => (
						<Link
							key={item.slug}
							href={`/blog/${item.slug}`}
							className="group relative overflow-hidden rounded-[20px] border border-slate-200/70 bg-white/85 p-2.5 shadow-[0_14px_32px_-18px_rgba(56,189,248,0.20)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-0.5 hover:border-slate-300/60 hover:bg-white/95 dark:border-slate-700/30 dark:bg-slate-900/50 dark:hover:bg-slate-900/60"
						>
							<div className="flex items-center gap-2 text-xs text-slate-400">
								<span className="font-semibold text-sky-300/90">0{index + 2}</span>
								<span className="h-px flex-1 bg-white/10" />
							</div>
							<h3 className="mt-2 text-xs font-semibold text-slate-950 dark:text-white">
								{item.title}
							</h3>
							<p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-600 dark:text-slate-400">
								{item.description}
							</p>
							<div className="mt-2 flex flex-col gap-1 text-xs text-slate-500 dark:text-slate-400 sm:flex-row sm:items-center sm:justify-between">
								<span>{item.formattedDate}</span>
								<span>{item.readingTime}</span>
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
		</div>
	</section>
	);
}
