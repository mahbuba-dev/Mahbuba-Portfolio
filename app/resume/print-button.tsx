"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex h-8 sm:h-9 items-center gap-1.5 rounded-md border border-border/60 bg-background/40 px-2 sm:px-3 text-[11px] sm:text-xs font-medium text-foreground transition-colors hover:bg-muted"
    >
      <Printer className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
      Print / Save PDF
    </button>
  );
}
