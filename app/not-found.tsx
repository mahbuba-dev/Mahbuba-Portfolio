import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="mx-auto grid min-h-[70dvh] max-w-3xl place-items-center px-4 py-20 text-center sm:px-6">
      <div>
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-linear-to-br from-indigo-500/20 to-purple-500/20 ring-1 ring-indigo-400/30">
          <Compass className="h-5 w-5 text-indigo-300" />
        </div>
        <p className="mt-6 text-xs font-medium uppercase tracking-widest text-indigo-400">
          404
        </p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
          Page not found
        </h1>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          The page you&apos;re looking for moved, was renamed, or never existed.
        </p>
        <div className="mt-6 flex justify-center gap-2">
          <Button asChild>
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Back home
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/blog">Read the blog</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
