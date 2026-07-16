import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { PropertyCard } from "@/components/sections/PropertyCard";
import { getAvailableProperties, getSoldProperties } from "@/data/properties";

export function PropertiesShowcase() {
  const available = getAvailableProperties();
  const sold = getSoldProperties();

  return (
    <section className="bg-cream py-20 sm:py-28">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Aktuální nabídka"
            title="Nemovitosti, kterým právě věnuji pozornost"
          />
          <Button href="/nemovitosti" variant="secondary" size="md" className="self-start sm:self-auto">
            Zobrazit všechny nemovitosti
          </Button>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {available.map((property, index) => (
            <Reveal key={property.slug} delay={index * 0.06}>
              <PropertyCard property={property} />
            </Reveal>
          ))}
        </div>

        {sold.length > 0 && (
          <div className="mt-16 border-t border-line pt-10">
            <p className="text-sm font-medium uppercase tracking-wide text-stone">
              Dokončené obchody – ukázka z praxe
            </p>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sold.map((property) => (
                <PropertyCard key={property.slug} property={property} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
