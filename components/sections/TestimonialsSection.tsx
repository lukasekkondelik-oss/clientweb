import { Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { testimonials } from "@/data/testimonials";

export function TestimonialsSection() {
  const featured = testimonials.find((t) => t.featured) ?? testimonials[0];
  const rest = testimonials.filter((t) => t.id !== featured.id);

  return (
    <section className="bg-ink py-20 text-cream sm:py-28">
      <Container>
        <SectionHeading eyebrow="Reference" title="Co říkají klienti" tone="light" />

        <Reveal className="mt-12">
          <div className="relative rounded-3xl border border-cream/15 bg-cream/[0.04] p-8 sm:p-12">
            <Quote className="h-9 w-9 text-bronze-soft" aria-hidden="true" />
            <p className="mt-6 max-w-3xl font-serif text-2xl leading-snug text-cream sm:text-3xl">
              „{featured.quote}“
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <p className="text-sm font-medium text-cream/80">{featured.author}</p>
              <Badge tone={featured.verified ? "success" : "neutral"}>
                {featured.verified ? "Ověřená reference" : "Ukázková reference"}
              </Badge>
            </div>
            {!featured.verified && (
              <p className="mt-2 text-xs text-cream/40">{featured.context}</p>
            )}
          </div>
        </Reveal>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((testimonial, index) => (
            <Reveal key={testimonial.id} delay={index * 0.06}>
              <div className="h-full rounded-2xl border border-cream/10 bg-cream/[0.03] p-6">
                <p className="text-sm leading-relaxed text-cream/80">„{testimonial.quote}“</p>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-xs font-medium text-cream/60">{testimonial.author}</p>
                  <Badge tone={testimonial.verified ? "success" : "neutral"}>
                    {testimonial.verified ? "Ověřeno" : "Ukázka"}
                  </Badge>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
