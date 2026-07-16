import { Container } from "@/components/ui/Container";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { agent } from "@/data/agent";

export function AboutRomana() {
  return (
    <section className="bg-cream-soft py-20 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
        <Reveal className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <ImagePlaceholder
            label={agent.photo.alt}
            variant="portrait"
            aspect="aspect-[3/4]"
            className="w-full"
          />
        </Reveal>

        <Reveal delay={0.1}>
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.25em] text-bronze">
            O mně
          </span>
          <h2 className="max-w-xl font-serif text-3xl leading-tight text-charcoal sm:text-4xl">
            {agent.experienceYears} let zkušeností, které stavím na osobním přístupu
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-stone sm:text-lg">
            {agent.introFirstPerson}
          </p>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-stone">
            Věnuji se prodeji, koupi i pronájmu nemovitostí v Praze a Středočeském kraji –
            od prvního odhadu ceny až po předání klíčů novému majiteli.
          </p>
          <div className="mt-8">
            <Button href="/o-mne" variant="secondary" size="md">
              Poznejte můj přístup
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
