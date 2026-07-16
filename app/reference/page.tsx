import type { Metadata } from "next";
import { Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { PageHeader } from "@/components/sections/PageHeader";
import { FinalCta } from "@/components/sections/FinalCta";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { testimonials } from "@/data/testimonials";

export const metadata: Metadata = buildMetadata({
  title: "Reference | Romana Trefná – realitní makléřka",
  description: "Zkušenosti klientů s prodejem, koupí a pronájmem nemovitostí s Romanou Trefnou.",
  path: "/reference",
});

export default function TestimonialsPage() {
  const breadcrumb = breadcrumbJsonLd([
    { name: "Domů", path: "/" },
    { name: "Reference", path: "/reference" },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <PageHeader
        eyebrow="Reference"
        title="Co říkají klienti"
        description="Reference jsou důležitým důkazem toho, jak spolupráce probíhá. Ověřené reference jsou označené, ukázkové reference slouží pro účely tohoto prototypu a budou nahrazeny reálnými."
      />

      <section className="bg-cream py-16 sm:py-20">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="flex h-full flex-col rounded-2xl border border-line bg-white p-6">
                <Quote className="h-6 w-6 text-bronze" aria-hidden="true" />
                <p className="mt-4 flex-1 text-sm leading-relaxed text-charcoal/85">
                  „{testimonial.quote}“
                </p>
                <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
                  <div>
                    <p className="text-sm font-medium text-charcoal">{testimonial.author}</p>
                    <p className="text-xs text-stone">{testimonial.context}</p>
                  </div>
                  <Badge tone={testimonial.verified ? "success" : "neutral"}>
                    {testimonial.verified ? "Ověřeno" : "Ukázka"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <FinalCta />
    </>
  );
}
