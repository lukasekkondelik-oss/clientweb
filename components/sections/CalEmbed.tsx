import { CalendarClock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { contact } from "@/data/contact";

/**
 * Jakmile bude vyplněná NEXT_PUBLIC_CALCOM_URL, komponenta automaticky
 * zobrazí funkční Cal.com embed – bez úprav této sekce.
 */
export function CalEmbed() {
  const calcomUrl = process.env.NEXT_PUBLIC_CALCOM_URL;

  if (calcomUrl) {
    return (
      <div className="overflow-hidden rounded-2xl border border-cream/15 bg-white">
        <iframe
          src={calcomUrl}
          title="Rezervace konzultace přes Cal.com"
          className="h-[720px] w-full"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-cream/25 bg-cream/[0.04] p-10 text-center">
      <CalendarClock className="h-9 w-9 text-bronze-soft" aria-hidden="true" />
      <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/70">
        Online rezervace bude dostupná po spuštění webu. Zatím mě prosím kontaktujte telefonicky
        nebo e-mailem – termín konzultace domluvíme osobně.
      </p>
      <Button href={contact.phoneHref} variant="outline-light" size="md" className="mt-6">
        Zavolat {contact.phone}
      </Button>
    </div>
  );
}
