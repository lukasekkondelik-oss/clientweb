"use client";

import { useState } from "react";
import { FlaskConical, X } from "lucide-react";
import { isDemoMode } from "@/lib/demo";
import { cn } from "@/lib/utils";

/**
 * Viditelné pouze při NEXT_PUBLIC_DEMO_MODE=true – slouží k prezentaci
 * prototypu klientce (např. rychlé vyvolání success/error stavu formuláře).
 * Na produkčním webu (proměnná nenastavena) se vůbec nevykresluje.
 */
export function DemoModeBar() {
  const [open, setOpen] = useState(false);

  if (!isDemoMode()) return null;

  const trigger = (result: "success" | "error") => {
    window.dispatchEvent(new CustomEvent("demo:force-result", { detail: { result } }));
  };

  return (
    <div className="fixed bottom-20 left-3 z-40 sm:bottom-4">
      {open ? (
        <div className="w-64 rounded-xl border border-bronze/30 bg-ink p-4 text-cream shadow-xl">
          <div className="mb-3 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-bronze-soft">
              <FlaskConical className="h-3.5 w-3.5" /> Demo režim
            </span>
            <button aria-label="Zavřít demo panel" onClick={() => setOpen(false)}>
              <X className="h-4 w-4" />
            </button>
          </div>
          <p className="mb-3 text-xs text-cream/70">
            Nástroj pro prezentaci prototypu. Simuluje stavy formuláře ocenění bez odeslání dat.
          </p>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => trigger("success")}
              className="rounded-full bg-bronze px-3 py-1.5 text-xs font-medium text-cream"
            >
              Simulovat úspěch formuláře
            </button>
            <button
              onClick={() => trigger("error")}
              className="rounded-full border border-cream/30 px-3 py-1.5 text-xs font-medium text-cream"
            >
              Simulovat chybu formuláře
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className={cn(
            "inline-flex items-center gap-2 rounded-full border border-bronze/40 bg-ink px-3.5 py-2 text-xs font-medium text-cream shadow-lg",
          )}
        >
          <FlaskConical className="h-3.5 w-3.5 text-bronze-soft" />
          Demo režim
        </button>
      )}
    </div>
  );
}
