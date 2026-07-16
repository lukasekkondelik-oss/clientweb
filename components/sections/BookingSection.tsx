import { Phone, Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { CalEmbed } from "@/components/sections/CalEmbed";
import { contact } from "@/data/contact";

export function BookingSection() {
  return (
    <section id="rezervace" className="scroll-mt-24 bg-ink py-20 text-cream sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <Reveal>
          <SectionHeading
            eyebrow="Konzultace"
            title="Pojďme nezávazně probrat vaši nemovitost"
            description="Vyberte si způsob, který vám vyhovuje. Ozvu se osobně."
            tone="light"
          />

          <div className="mt-8 flex flex-col gap-3">
            <a
              href={contact.phoneHref}
              className="flex items-center gap-3 rounded-xl border border-cream/15 px-5 py-4 text-sm font-medium text-cream hover:border-bronze-soft"
            >
              <Phone className="h-4 w-4 text-bronze-soft" aria-hidden="true" />
              Zavolat na {contact.phone}
            </a>
            <a
              href={contact.emailHref}
              className="flex items-center gap-3 rounded-xl border border-cream/15 px-5 py-4 text-sm font-medium text-cream hover:border-bronze-soft"
            >
              <Mail className="h-4 w-4 text-bronze-soft" aria-hidden="true" />
              Napsat na {contact.email}
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <CalEmbed />
        </Reveal>
      </Container>
    </section>
  );
}
