import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { LatestPostsClient } from "./latest-posts-client";
import type { PostMeta } from "@/lib/posts";

function formatDate(iso: string): string {
	return new Date(iso).toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});
}

export function LatestPosts(): React.ReactElement | null {
	const posts = getAllPosts().slice(0, 3) as PostMeta[];

	if (!posts || posts.length === 0) return null;

	const clientPosts = posts.map((p) => ({
		slug: p.slug,
		title: p.title,
		description: p.description,
		tags: p.tags,
		readingTime: p.readingTime,
		formattedDate: formatDate(p.date),
	}));

	return <LatestPostsClient posts={clientPosts} />;
}