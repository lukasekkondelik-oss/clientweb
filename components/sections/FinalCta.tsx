import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { contact } from "@/data/contact";

export function FinalCta() {
  return (
    <section className="bg-cream-soft py-20 sm:py-28">
      <Container className="text-center">
        <Reveal>
          <h2 className="mx-auto max-w-2xl font-serif text-3xl leading-tight text-charcoal sm:text-4xl">
            Přemýšlíte o prodeji? První krok můžete udělat nezávazně.
          </h2>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/oceneni" size="lg">
              Zjistit hodnotu nemovitosti
            </Button>
            <Button href="/kontakt#rezervace" size="lg" variant="secondary">
              Rezervovat konzultaci
            </Button>
            <Button href={contact.phoneHref} size="lg" variant="ghost">
              Zavolat Romaně
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
