import Link from "next/link";
import { ArrowUpRight, Home, Calculator, Key, Search, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const needs = [
  {
    title: "Chci prodat nemovitost",
    description:
      "Od ocenění přes přípravu prezentace až po smlouvy a předání. Provedu vás celým prodejem.",
    href: "/prodej-nemovitosti",
    icon: Home,
    size: "lg" as const,
  },
  {
    title: "Chci znát hodnotu nemovitosti",
    description: "Zjistěte orientační tržní cenu své nemovitosti – zdarma a bez závazku.",
    href: "/oceneni",
    icon: Calculator,
    size: "lg" as const,
  },
  {
    title: "Chci pronajmout nemovitost",
    description: "Najdu spolehlivého nájemníka a nastavím jasné podmínky nájmu.",
    href: "/sluzby",
    icon: Key,
    size: "sm" as const,
  },
  {
    title: "Chci koupit nemovitost",
    description: "Pomůžu s výběrem, prověřením i vyjednáním podmínek koupě.",
    href: "/sluzby",
    icon: Search,
    size: "sm" as const,
  },
  {
    title: "Potřebuji realitní konzultaci",
    description: "Nevíte, jak dál? Nezávazně probereme vaši situaci.",
    href: "/kontakt",
    icon: MessageCircle,
    size: "sm" as const,
  },
];

export function NeedsRouter() {
  return (
    <section className="bg-cream py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Rozcestník"
          title="S čím vám pomůžu"
          description="Vyberte, co aktuálně řešíte. Provedu vás dalším krokem."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {needs.map((need, index) => {
            const Icon = need.icon;
            const spanClass =
              need.size === "lg" ? "lg:col-span-3" : "lg:col-span-2";

            return (
              <Reveal key={need.title} delay={index * 0.05} className={spanClass}>
                <Link
                  href={need.href}
                  className={cn(
                    "group flex h-full flex-col justify-between rounded-2xl border border-line bg-white/50 p-6 transition-colors duration-300 hover:border-bronze/50 hover:bg-white sm:p-7",
                    need.size === "lg" && "sm:p-8",
                  )}
                >
                  <div>
                    <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-full bg-bronze/10 text-bronze">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3
                      className={cn(
                        "font-serif text-charcoal",
                        need.size === "lg" ? "text-2xl" : "text-xl",
                      )}
                    >
                      {need.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-stone">{need.description}</p>
                  </div>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-bronze">
                    Zjistit více
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
