import { PROJECTS } from "@/app/data/projects-data";
import { notFound } from "next/navigation";
import ClientGallery from "@/app/components/project-gallery-client";

type Props = {
  params: Promise<{ slug: string }>;
};

const slugify = (title: string) =>
  title
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export default async function ProjectDetailsPage({ params }: Props) {
  const { slug } = await params;

  const project = PROJECTS.find((p) => slugify(p.title) === slug);

  if (!project) return notFound();

  const Icon = project.icon;

  
  return (
    <main className="min-h-screen px-6 py-16 transition-colors relative overflow-hidden">
      {/* subtle full-bleed blue glassy background */}
      <div className="absolute inset-0 -z-20 " />
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="w-full h-full " />
      </div>

      <div className="mx-auto max-w-5xl space-y-10">

        {/* HEADER */}
        <div className="flex items-start gap-4">
          <div className="h-14 w-14 rounded-2xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center">
            <Icon className="h-6 w-6" />
          </div>

          <div>
            <h1 className="text-4xl font-bold text-black dark:text-white">
              {project.title}
            </h1>
            <p className="text-blue-600 dark:text-blue-400 mt-1">
              {project.tagline}
            </p>
          </div>
        </div>

        {/* IMAGE GALLERY (framed, sliding) */}
        <div>
          {/* Client-side carousel */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          {/* ProjectGalleryClient handles its own auto-slide, controls and frame styling */}
          {/* Import as client component */}
          <ClientGallery images={project.images} />
        </div>

        {/* OVERVIEW */}
        <div className="rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
          <h2 className="text-lg font-semibold text-black dark:text-white mb-3">
            Overview
          </h2>

          <p className="text-gray-600 dark:text-zinc-300 leading-relaxed whitespace-pre-line">
            {project.longDescription}
          </p>
        </div>

        {/* CORE FEATURES */}
        <div className="rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
          <h2 className="text-lg font-semibold text-black dark:text-white mb-4">
            Core Features
          </h2>

          <ul className="space-y-2 text-sm text-gray-600 dark:text-zinc-300">
            {project.features.map((f) => (
              <li key={f} className="flex gap-2">
                <span className="text-green-500">✔</span>
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* DETAILED FEATURES */}
        <div className="rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
          <h2 className="text-lg font-semibold text-black dark:text-white mb-4">
            Detailed Features
          </h2>

          <ul className="space-y-2 text-sm text-gray-600 dark:text-zinc-300">
            {project.detailsFeatures?.map((f) => (
              <li key={f} className="flex gap-2">
                <span className="text-blue-500">▹</span>
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* STACK */}
        <div className="rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
          <h2 className="text-lg font-semibold text-black dark:text-white mb-4">
            Tech Stack
          </h2>

          <div className="flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <span
                key={s}
                className="text-xs px-3 py-1 rounded-full bg-gray-100 dark:bg-zinc-800 text-black dark:text-white"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* LINKS */}
        <div className="flex gap-4 pt-4">
          <a
            href={project.github}
            className="px-5 py-2 rounded-xl border border-gray-300 dark:border-zinc-700 text-sm text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition"
          >
            GitHub
          </a>

          <a
            href={project.demo}
            className="px-5 py-2 rounded-xl bg-blue-600 text-white text-sm hover:bg-blue-700 transition"
          >
            Live Demo
          </a>
        </div>

      </div>
    </main>
  );
}