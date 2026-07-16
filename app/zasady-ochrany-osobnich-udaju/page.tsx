import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/sections/PageHeader";
import { buildMetadata } from "@/lib/seo";
import { contact } from "@/data/contact";

export const metadata: Metadata = buildMetadata({
  title: "Zásady ochrany osobních údajů | Romana Trefná",
  description: "Informace o zpracování osobních údajů návštěvníků a klientů webu Romana Reality.",
  path: "/zasady-ochrany-osobnich-udaju",
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHeader eyebrow="Právní informace" title="Zásady ochrany osobních údajů" />

      <section className="bg-cream py-16 sm:py-20">
        <Container className="max-w-3xl space-y-8 text-base leading-relaxed text-stone">
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
            Toto je prototypová verze textu zásad ochrany osobních údajů pro účely prezentace
            webu. Před spuštěním produkčního webu je nutné text nechat zkontrolovat a doplnit
            právníkem / pověřencem pro ochranu osobních údajů (GDPR) tak, aby odpovídal reálnému
            zpracování dat u konkrétního správce.
          </div>

          <div>
            <h2 className="font-serif text-2xl text-charcoal">Správce osobních údajů</h2>
            <p className="mt-3">
              Správcem osobních údajů je {contact.name}, {contact.brand}, kontaktní e-mail{" "}
              <a href={contact.emailHref} className="text-bronze underline underline-offset-2">
                {contact.email}
              </a>
              , telefon {contact.phone}. Identifikační údaje (IČO, sídlo) budou doplněny před
              spuštěním produkčního webu.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-charcoal">Jaké údaje zpracováváme</h2>
            <p className="mt-3">
              V souvislosti s poptávkou ocenění nemovitosti, kontaktním formulářem nebo poptávkou
              prohlídky zpracováváme zejména jméno, telefon, e-mail, informace o nemovitosti a
              obsah vaší zprávy. Tyto údaje slouží výhradně k vyřízení vaší poptávky a související
              komunikaci.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-charcoal">Účel a právní základ zpracování</h2>
            <p className="mt-3">
              Údaje zpracováváme na základě vašeho souhlasu uděleného při odeslání formuláře, a to
              za účelem vypracování odhadu ceny nemovitosti, domluvení konzultace či prohlídky a
              další komunikace související s vaší poptávkou.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-charcoal">Předávání údajů třetím stranám</h2>
            <p className="mt-3">
              Pro zpracování poptávek plánujeme využívat nástroje pro správu klientských vztahů
              (CRM) a automatizační nástroje pro interní zpracování leadů. Údaje nejsou předávány
              třetím stranám pro marketingové účely bez vašeho výslovného souhlasu.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-charcoal">Doba uchování údajů</h2>
            <p className="mt-3">
              Údaje uchováváme po dobu nezbytnou k vyřízení vaší poptávky a případné navazující
              spolupráce, nejdéle však po dobu stanovenou obecně závaznými právními předpisy.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-charcoal">Vaše práva</h2>
            <p className="mt-3">
              Máte právo na přístup k osobním údajům, jejich opravu či výmaz, omezení zpracování,
              přenositelnost a právo vznést námitku proti zpracování. Svá práva můžete uplatnit na
              kontaktním e-mailu výše.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-charcoal">Cookies</h2>
            <p className="mt-3">
              Web používá nezbytné cookies pro základní fungování a volitelně analytické cookies,
              které v tomto prototypu nejsou aktivní. Nastavení cookies můžete kdykoliv upravit
              v patičce webu.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
