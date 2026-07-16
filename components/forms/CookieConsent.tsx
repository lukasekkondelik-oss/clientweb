"use client";

import { useEffect, useState } from "react";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "rr_cookie_consent";

interface ConsentState {
  necessary: true;
  analytics: boolean;
}

function readConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ConsentState) : null;
  } catch {
    return null;
  }
}

function saveConsent(state: ConsentState) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  // Připraveno pro budoucí napojení reálné analytiky – zatím se nic
  // nespouští, jen se ukládá volba návštěvníka.
  window.dispatchEvent(new CustomEvent("cookie-consent-updated", { detail: state }));
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    // Souhlas z localStorage lze bezpečně přečíst až po mountu na klientovi
    // (SSR ho nemá k dispozici) – proto banner výchozí stav neukazuje a stav
    // dopočítá až zde, aby nedošlo k hydration mismatch.
    const existing = readConsent();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!existing) setVisible(true);
    else setAnalytics(existing.analytics);

    const openSettings = () => {
      setShowDetails(true);
      setVisible(true);
    };
    window.addEventListener("open-cookie-settings", openSettings);
    return () => window.removeEventListener("open-cookie-settings", openSettings);
  }, []);

  if (!visible) return null;

  const acceptAll = () => {
    saveConsent({ necessary: true, analytics: true });
    setVisible(false);
  };

  const rejectOptional = () => {
    saveConsent({ necessary: true, analytics: false });
    setVisible(false);
  };

  const confirmCustom = () => {
    saveConsent({ necessary: true, analytics });
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Nastavení cookies"
      className="fixed inset-x-0 bottom-16 z-50 px-3 pb-3 sm:bottom-0 sm:px-4 sm:pb-4"
    >
      <div className="mx-auto max-w-3xl rounded-2xl border border-line bg-cream shadow-[0_8px_30px_rgba(28,27,25,0.14)]">
        <div className="flex flex-col gap-4 p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <Cookie className="mt-0.5 h-5 w-5 flex-shrink-0 text-bronze" aria-hidden="true" />
            <div>
              <p className="font-serif text-lg text-charcoal">Používáme cookies</p>
              <p className="mt-1 text-sm leading-relaxed text-stone">
                Nezbytné cookies zajišťují základní fungování webu. Analytické cookies nám do
                budoucna pomohou pochopit, jak web návštěvníci používají. Analytika není v tomto
                prototypu aktivní.
              </p>
            </div>
          </div>

          {showDetails && (
            <div className="rounded-xl border border-line bg-white/60 p-4">
              <label className="flex items-start gap-3 text-sm">
                <input
                  type="checkbox"
                  checked
                  disabled
                  className="mt-0.5 h-4 w-4 rounded border-line accent-bronze"
                />
                <span>
                  <span className="font-medium text-charcoal">Nezbytné cookies</span>
                  <span className="block text-stone">Vždy aktivní – nutné pro fungování webu.</span>
                </span>
              </label>
              <label className="mt-3 flex items-start gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(event) => setAnalytics(event.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-line accent-bronze"
                />
                <span>
                  <span className="font-medium text-charcoal">Analytické cookies</span>
                  <span className="block text-stone">
                    Pomáhají vyhodnocovat návštěvnost webu (v prototypu neaktivní).
                  </span>
                </span>
              </label>
            </div>
          )}

          <div className={cn("flex flex-col gap-2 sm:flex-row sm:justify-end")}>
            {!showDetails && (
              <Button variant="ghost" size="md" onClick={() => setShowDetails(true)}>
                Nastavení
              </Button>
            )}
            {showDetails ? (
              <Button variant="secondary" size="md" onClick={confirmCustom}>
                Uložit nastavení
              </Button>
            ) : (
              <Button variant="secondary" size="md" onClick={rejectOptional}>
                Odmítnout volitelné
              </Button>
            )}
            <Button variant="primary" size="md" onClick={acceptAll}>
              Přijmout vše
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
