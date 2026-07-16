import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapPin, Phone, Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Badge } from "@/components/ui/Badge";
import { ViewingForm } from "@/components/forms/ViewingForm";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { formatPrice, propertyTypeLabels, propertyStatusLabels } from "@/lib/utils";
import { properties, getPropertyBySlug } from "@/data/properties";
import { contact } from "@/data/contact";

export function generateStaticParams() {
  return properties.map((property) => ({ slug: property.slug }));
}

type PageParams = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: PageParams }): Promise<Metadata> {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) return buildMetadata({ title: "Nemovitost nenalezena", description: "", path: "/nemovitosti" });

  return buildMetadata({
    title: `${property.title} | Romana Trefná`,
    description: property.description[0] ?? property.title,
    path: `/nemovitosti/${property.slug}`,
  });
}

const statusTone = {
  "v-nabidce": "bronze",
  rezervovano: "warning",
  prodano: "neutral",
  pronajato: "neutral",
} as const;

export default async function PropertyDetailPage({ params }: { params: PageParams }) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) notFound();

  const price = formatPrice(property.price);
  const breadcrumb = breadcrumbJsonLd([
    { name: "Domů", path: "/" },
    { name: "Nemovitosti", path: "/nemovitosti" },
    { name: property.title, path: `/nemovitosti/${property.slug}` },
  ]);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Offer",
    name: property.title,
    priceCurrency: "CZK",
    price: property.price ?? undefined,
    availability:
      property.status === "v-nabidce"
        ? "https://schema.org/InStock"
        : "https://schema.org/SoldOut",
    areaServed: property.city,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />

      <section className="border-b border-line bg-cream-soft py-10 sm:py-14">
        <Container>
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone={statusTone[property.status]}>{propertyStatusLabels[property.status]}</Badge>
            <Badge tone="bronze">{propertyTypeLabels[property.type]}</Badge>
            {property.isDemoData && <Badge tone="neutral">Ukázková data pro prototyp</Badge>}
          </div>
          <h1 className="mt-4 max-w-2xl font-serif text-3xl leading-tight text-charcoal sm:text-4xl">
            {property.title}
          </h1>
          <p className="mt-2 inline-flex items-center gap-1.5 text-stone">
            <MapPin className="h-4 w-4 text-bronze" aria-hidden="true" />
            {property.city}
            {property.district ? `, ${property.district}` : ""}
          </p>
        </Container>
      </section>

      <section className="bg-cream py-12 sm:py-16">
        <Container className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {property.images.map((image, index) => (
                <ImagePlaceholder
                  key={index}
                  label={image.alt}
                  aspect="aspect-[4/3]"
                  className={index === 0 ? "col-span-2 sm:col-span-2 sm:row-span-2 aspect-[4/3] sm:aspect-square" : undefined}
                />
              ))}
            </div>

            <div className="mt-10">
              <h2 className="font-serif text-2xl text-charcoal">Popis nemovitosti</h2>
              {property.isDemoData && (
                <p className="mt-2 text-xs font-medium text-amber-700">
                  Popis a parametry jsou v tomto prototypu ukázkové a před spuštěním produkčního
                  webu je nutné je nahradit ověřenými údaji.
                </p>
              )}
              <div className="mt-4 space-y-4 text-base leading-relaxed text-stone">
                {property.description.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="mt-10">
              <h2 className="font-serif text-2xl text-charcoal">Parametry</h2>
              <dl className="mt-4 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                {property.parameters.map((param) => (
                  <div key={param.label} className="flex justify-between border-b border-line py-2 text-sm">
                    <dt className="text-stone">{param.label}</dt>
                    <dd className="font-medium text-charcoal">{param.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-10">
              <h2 className="font-serif text-2xl text-charcoal">Lokalita</h2>
              <div className="mt-4 flex h-64 items-center justify-center rounded-2xl border border-dashed border-line bg-cream-soft text-sm text-stone">
                Mapový placeholder – po spuštění webu doplnit interaktivní mapu lokality.
              </div>
            </div>
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-line bg-white p-6">
              <p className="font-serif text-3xl text-charcoal">
                {price ?? property.priceNote ?? "Cena na vyžádání"}
              </p>
              <div className="mt-6 space-y-3 border-t border-line pt-6">
                <p className="text-sm font-medium text-charcoal">Kontakt na makléřku</p>
                <a href={contact.phoneHref} className="flex items-center gap-2 text-sm text-stone hover:text-bronze">
                  <Phone className="h-4 w-4 text-bronze" aria-hidden="true" />
                  {contact.phone}
                </a>
                <a href={contact.emailHref} className="flex items-center gap-2 text-sm text-stone hover:text-bronze">
                  <Mail className="h-4 w-4 text-bronze" aria-hidden="true" />
                  {contact.email}
                </a>
              </div>
              <div className="mt-6">
                <ViewingForm property={{ slug: property.slug, title: property.title }} />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
