import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ValuationWizard } from "@/components/forms/ValuationWizard";
import { PageHeader } from "@/components/sections/PageHeader";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Ocenění nemovitosti zdarma | Romana Trefná",
  description:
    "Zjistěte orientační tržní hodnotu bytu, domu, pozemku či jiné nemovitosti. Ocenění i první konzultace jsou zdarma a bez závazku.",
  path: "/oceneni",
});

export default function ValuationPage() {
  const breadcrumb = breadcrumbJsonLd([
    { name: "Domů", path: "/" },
    { name: "Ocenění nemovitosti", path: "/oceneni" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <PageHeader
        eyebrow="Ocenění zdarma"
        title="Zjistěte, jakou hodnotu má dnes vaše nemovitost"
        description="Zadejte několik základních informací. Osobně situaci posoudím a ozvu se vám s orientačním odhadem a doporučením dalšího postupu."
      />
      <section className="bg-cream py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <ValuationWizard />
          </div>
        </Container>
      </section>
    </>
  );
}
