import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/PageHeader";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { buildMetadata, breadcrumbJsonLd, servicesJsonLd } from "@/lib/seo";
import { services } from "@/data/services";

export const metadata: Metadata = buildMetadata({
  title: "Služby | Romana Trefná – realitní makléřka",
  description:
    "Prodej bytu, domu i pozemku, pronájem, ocenění nemovitosti, pomoc s koupí i právní a administrativní servis. Vše na jednom místě.",
  path: "/sluzby",
});

export default function ServicesPage() {
  const breadcrumb = breadcrumbJsonLd([
    { name: "Domů", path: "/" },
    { name: "Služby", path: "/sluzby" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd(services)) }}
      />
      <PageHeader
        eyebrow="Služby"
        title="Kompletní realitní servis na jednom místě"
        description="Od ocenění přes prodej, pronájem a koupi až po právní a administrativní servis."
      />
      <ServicesGrid />
      <FaqSection />
      <FinalCta />
    </>
  );
}
