import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/sections/PageHeader";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { TrustReasonsSection } from "@/components/sections/TrustReasonsSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { agent } from "@/data/agent";

export const metadata: Metadata = buildMetadata({
  title: "Prodej nemovitosti | Romana Trefná",
  description:
    "Osobní vedení celým prodejem bytu, domu či pozemku – ocenění, prezentace, jednání se zájemci i smlouvy. 21 let zkušeností v realitách.",
  path: "/prodej-nemovitosti",
});

export default function SellPropertyPage() {
  const breadcrumb = breadcrumbJsonLd([
    { name: "Domů", path: "/" },
    { name: "Prodej nemovitosti", path: "/prodej-nemovitosti" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <PageHeader
        eyebrow="Prodej nemovitosti"
        title="Prodej, který zvládnete s klidnou hlavou"
        description="Ať prodáváte byt, dům, pozemek nebo řešíte dědictví – provedu vás celým procesem osobně, od prvního odhadu až po předání klíčů."
      />

      <section className="bg-cream py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-serif text-2xl text-charcoal sm:text-3xl">
              Proč mít prodej pod kontrolou od začátku
            </h2>
            <p className="mt-4 text-base leading-relaxed text-stone">
              Špatně stanovená cena, chybějící dokumentace nebo nejasné vlastnické vztahy dokážou
              prodej výrazně prodloužit a zkomplikovat. Díky {agent.experienceYears} letům praxe
              vím, na co se předem zaměřit, abyste tato rizika minimalizovali.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button href="/oceneni" size="md">
                Zjistit hodnotu nemovitosti
              </Button>
              <Button href="/kontakt#rezervace" size="md" variant="secondary">
                Domluvit konzultaci
              </Button>
            </div>
          </div>
          <ul className="space-y-3 rounded-2xl border border-line bg-white p-6">
            {agent.verifiedFacts.slice(0, 8).map((fact) => (
              <li key={fact} className="flex items-start gap-2.5 text-sm text-charcoal/85">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-bronze" />
                {fact}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <ProcessTimeline />
      <TrustReasonsSection />
      <FinalCta />
    </>
  );
}
