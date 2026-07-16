import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { trustReasons } from "@/data/trustReasons";

export function TrustReasonsSection() {
  return (
    <section className="bg-ink py-20 text-cream sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Proč se mnou"
          title="Důvody, proč mi klienti důvěřují"
          tone="light"
        />

        <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {trustReasons.map((reason, index) => (
            <Reveal key={reason.title} delay={index * 0.06}>
              <span className="font-serif text-4xl text-bronze-soft">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-serif text-xl text-cream">{reason.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-cream/70">{reason.description}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
