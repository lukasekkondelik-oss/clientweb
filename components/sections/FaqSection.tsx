import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";
import { faqItems } from "@/data/faq";

export function FaqSection() {
  return (
    <section id="faq" className="scroll-mt-24 bg-cream py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow="Časté dotazy" title="Odpovědi na nejčastější otázky" />
        <div className="mt-12">
          <Accordion items={faqItems} />
        </div>
      </Container>
    </section>
  );
}
