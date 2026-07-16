import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { processSteps } from "@/data/process";

export function ProcessTimeline() {
  return (
    <section className="bg-cream py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Jak probíhá prodej"
          title="Osm kroků od konzultace po předání klíčů"
          description="Každý krok vedu osobně, abyste vždy věděli, co se bude dít dál."
        />

        <ol className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((item, index) => (
            <Reveal key={item.step} delay={(index % 4) * 0.05}>
              <li className="relative border-t-2 border-bronze/30 pt-5">
                <span className="font-serif text-3xl text-bronze">
                  {String(item.step).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-serif text-lg text-charcoal">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone">{item.description}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
