import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center bg-cream py-20">
      <Container className="text-center">
        <span className="font-serif text-6xl text-bronze">404</span>
        <h1 className="mt-4 font-serif text-3xl text-charcoal sm:text-4xl">
          Tato stránka nebyla nalezena
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-stone">
          Odkaz může být neplatný nebo se stránka přesunula. Zkuste se vrátit na hlavní stránku
          nebo se podívat na aktuální nabídku nemovitostí.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/" size="md">
            Zpět na hlavní stránku
          </Button>
          <Button href="/nemovitosti" size="md" variant="secondary">
            Zobrazit nemovitosti
          </Button>
        </div>
      </Container>
    </section>
  );
}
