import { Container } from "@/components/ui/Container";

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="border-b border-line bg-cream-soft py-16 sm:py-20">
      <Container>
        {eyebrow && (
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.25em] text-bronze">
            {eyebrow}
          </span>
        )}
        <h1 className="max-w-2xl font-serif text-4xl leading-tight text-charcoal sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-xl text-base leading-relaxed text-stone sm:text-lg">
            {description}
          </p>
        )}
      </Container>
    </section>
  );
}
