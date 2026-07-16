import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ValuationWizard } from "@/components/forms/ValuationWizard";

export function ValuationSection() {
  return (
    <section id="oceneni" className="scroll-mt-24 bg-cream py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Ocenění zdarma"
          title="Zjistěte, jakou hodnotu má dnes vaše nemovitost"
          description="Zadejte několik základních informací. Osobně situaci posoudím a ozvu se vám s orientačním odhadem a doporučením dalšího postupu."
          align="center"
          className="mx-auto"
        />

        <Reveal className="mx-auto mt-12 max-w-3xl" delay={0.1}>
          <ValuationWizard />
        </Reveal>
      </Container>
    </section>
  );
}
