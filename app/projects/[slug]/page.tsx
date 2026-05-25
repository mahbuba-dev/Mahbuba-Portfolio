import { PROJECTS } from "@/app/data/projects-data";
import { notFound } from "next/navigation";

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
    <main className="min-h-screen px-6 py-16 bg-white dark:bg-black transition-colors">
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

        {/* IMAGE GALLERY */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {project.images.map((img, i) => (
            <div
              key={i}
              className="flex items-center justify-center aspect-[4/3] rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-md overflow-hidden"
              style={{ minHeight: '180px', minWidth: '0' }}
            >
              {img ? (
                <img
                  src={img}
                  alt={`Screenshot ${i + 1}`}
                  className="object-cover w-full h-full transition-transform duration-200 hover:scale-105 rounded-xl"
                  style={{ maxHeight: '240px', maxWidth: '100%' }}
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-gray-400 text-xs bg-gray-50 dark:bg-zinc-800">
                  No image
                </div>
              )}
            </div>
          ))}
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