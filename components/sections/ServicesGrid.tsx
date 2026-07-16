import {
  Building2,
  Home,
  Trees,
  KeyRound,
  Calculator,
  SearchCheck,
  Scale,
  Users2,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { services, type Service } from "@/data/services";

const iconMap: Record<Service["icon"], LucideIcon> = {
  building: Building2,
  home: Home,
  land: Trees,
  key: KeyRound,
  calculator: Calculator,
  search: SearchCheck,
  scale: Scale,
  users: Users2,
};

export function ServicesGrid() {
  return (
    <section className="bg-cream-soft py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Služby"
          title="Kompletní realitní servis na jednom místě"
          description="Od prvního odhadu po předání klíčů – vše, co k bezpečnému obchodu potřebujete."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon];
            return (
              <Reveal key={service.slug} delay={(index % 4) * 0.05}>
                <div className="h-full rounded-2xl border border-line bg-white p-6">
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-bronze/10 text-bronze">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="font-serif text-lg text-charcoal">{service.title}</h3>
                  <p className="mt-2 text-sm font-medium leading-relaxed text-bronze">
                    {service.resultForClient}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-stone">{service.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
