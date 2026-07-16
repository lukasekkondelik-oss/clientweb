import { ShieldCheck, Scale, UserCheck, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { agent } from "@/data/agent";

const trustPoints = [
  { icon: BadgeCheck, label: `${agent.experienceYears} let zkušeností` },
  { icon: ShieldCheck, label: "Odhad zdarma" },
  { icon: Scale, label: "Kompletní právní servis" },
  { icon: UserCheck, label: "Osobní vedení celého procesu" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-cream">
      <Container className="grid gap-12 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:py-20">
        <div className="animate-fade-up">
          <span className="mb-5 inline-block text-xs font-semibold uppercase tracking-[0.25em] text-bronze">
            Realitní makléřka · {agent.region}
          </span>
          <h1 className="max-w-xl font-serif text-4xl leading-[1.08] text-charcoal sm:text-5xl lg:text-6xl">
            Prodej nemovitosti, který zvládnete s klidnou hlavou.
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-stone sm:text-lg">
            Už {agent.experienceYears} let osobně provázím klienty prodejem, koupí i pronájmem
            nemovitostí. Od prvního odhadu až po smlouvy a bezpečné předání.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/oceneni" size="lg">
              Zjistit hodnotu nemovitosti
            </Button>
            <Button href="/kontakt" size="lg" variant="secondary">
              Domluvit konzultaci
            </Button>
          </div>

          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-8 sm:grid-cols-4 sm:gap-x-4">
            {trustPoints.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-start gap-2.5">
                <Icon className="mt-0.5 h-4 w-4 flex-shrink-0 text-bronze" aria-hidden="true" />
                <dt className="sr-only">Důvěryhodný bod</dt>
                <dd className="text-sm font-medium leading-snug text-charcoal/85">{label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <ImagePlaceholder
            label={agent.photo.alt}
            variant="portrait"
            aspect="aspect-[4/5]"
            className="w-full"
          />
          <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-line bg-white/95 px-5 py-4 shadow-lg backdrop-blur sm:block">
            <p className="font-serif text-2xl text-charcoal">{agent.experienceYears}</p>
            <p className="text-xs text-stone">let v realitách</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
