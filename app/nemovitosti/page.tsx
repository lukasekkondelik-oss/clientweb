import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/sections/PageHeader";
import { PropertyCard } from "@/components/sections/PropertyCard";
import { FinalCta } from "@/components/sections/FinalCta";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { getAvailableProperties, getSoldProperties } from "@/data/properties";

export const metadata: Metadata = buildMetadata({
  title: "Nabídka nemovitostí | Romana Trefná",
  description:
    "Aktuální nabídka bytů, domů a pozemků k prodeji i pronájmu v Praze a Středočeském kraji.",
  path: "/nemovitosti",
});

export default function PropertiesPage() {
  const available = getAvailableProperties();
  const sold = getSoldProperties();
  const breadcrumb = breadcrumbJsonLd([
    { name: "Domů", path: "/" },
    { name: "Nemovitosti", path: "/nemovitosti" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <PageHeader
        eyebrow="Nemovitosti"
        title="Aktuální nabídka a dokončené obchody"
        description="Přehled nemovitostí, kterým se aktuálně věnuji, i ukázka dříve dokončených prodejů."
      />

      <section className="bg-cream py-16 sm:py-20">
        <Container>
          <h2 className="font-serif text-2xl text-charcoal">V nabídce</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {available.map((property) => (
              <PropertyCard key={property.slug} property={property} />
            ))}
          </div>

          {sold.length > 0 && (
            <div className="mt-16 border-t border-line pt-10">
              <h2 className="font-serif text-2xl text-charcoal">Dokončené obchody</h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {sold.map((property) => (
                  <PropertyCard key={property.slug} property={property} />
                ))}
              </div>
            </div>
          )}
        </Container>
      </section>

      <FinalCta />
    </>
  );
}
