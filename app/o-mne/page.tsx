import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/sections/PageHeader";
import { TrustReasonsSection } from "@/components/sections/TrustReasonsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { buildMetadata, breadcrumbJsonLd, personJsonLd } from "@/lib/seo";
import { agent } from "@/data/agent";

export const metadata: Metadata = buildMetadata({
  title: "O mně | Romana Trefná – realitní makléřka",
  description:
    "21 let zkušeností, osobní přístup a odpovědnost za celý proces prodeje, koupě i pronájmu nemovitostí v Praze a Středočeském kraji.",
  path: "/o-mne",
});

export default function AboutPage() {
  const breadcrumb = breadcrumbJsonLd([
    { name: "Domů", path: "/" },
    { name: "O mně", path: "/o-mne" },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }} />

      <PageHeader eyebrow="O mně" title={`${agent.name} – realitní makléřka`} />

      <section className="bg-cream py-16 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <ImagePlaceholder
            label={agent.photo.alt}
            variant="portrait"
            aspect="aspect-[3/4]"
            className="mx-auto w-full max-w-sm lg:max-w-none"
          />

          <div>
            <p className="text-lg leading-relaxed text-charcoal sm:text-xl">{agent.introFirstPerson}</p>
            <p className="mt-5 text-base leading-relaxed text-stone">
              Věnuji se realitám {agent.experienceYears} let – prodeji, koupi i pronájmu bytů,
              rodinných domů a pozemků v Praze a Středočeském kraji. Ke každé zakázce přistupuji
              osobně, od prvního odhadu ceny až po předání nemovitosti novému majiteli.
            </p>

            <h2 className="mt-10 font-serif text-2xl text-charcoal">Co ode mě můžete čekat</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {agent.verifiedFacts.map((fact) => (
                <li key={fact} className="flex items-start gap-2.5 text-sm text-charcoal/85">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-bronze" />
                  {fact}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/oceneni" size="md">
                Zjistit hodnotu nemovitosti
              </Button>
              <Button href="/kontakt#rezervace" size="md" variant="secondary">
                Domluvit konzultaci
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <TrustReasonsSection />
      <TestimonialsSection />
      <FinalCta />
    </>
  );
}
