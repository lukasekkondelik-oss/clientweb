export interface Service {
  slug: string;
  title: string;
  resultForClient: string;
  description: string;
  icon:
    | "building"
    | "home"
    | "land"
    | "key"
    | "calculator"
    | "search"
    | "scale"
    | "users";
}

export const services: Service[] = [
  {
    slug: "prodej-bytu",
    title: "Prodej bytu",
    icon: "building",
    resultForClient: "Prodáte za odpovídající cenu a bez zbytečných komplikací.",
    description:
      "Od stanovení reálné hodnoty přes přípravu prezentace až po vyjednávání s kupujícími a bezpečné předání. Řeším i byty v osobním i družstevním vlastnictví.",
  },
  {
    slug: "prodej-rodinneho-domu",
    title: "Prodej rodinného domu",
    icon: "home",
    resultForClient: "Získáte klidný průběh prodeje i u nemovitostí se specifickou historií.",
    description:
      "Rodinné domy mají často složitější vlastnickou i technickou historii. Prověřím podklady, navrhnu prodejní strategii a provedu vás jednáním se zájemci.",
  },
  {
    slug: "prodej-pozemku",
    title: "Prodej pozemku",
    icon: "land",
    resultForClient: "Máte jistotu, že je pozemek správně oceněný a právně v pořádku.",
    description:
      "Prověřím územní a majetkové souvislosti pozemku a připravím podklady tak, aby prodej proběhl bez nečekaných zádrhelů.",
  },
  {
    slug: "pronajem-nemovitosti",
    title: "Pronájem nemovitosti",
    icon: "key",
    resultForClient: "Najdete spolehlivého nájemníka a máte nastavené jasné podmínky.",
    description:
      "Pomůžu s nastavením nájemní ceny, prezentací nemovitosti, výběrem nájemníka i přípravou nájemní smlouvy.",
  },
  {
    slug: "oceneni-nemovitosti",
    title: "Ocenění nemovitosti",
    icon: "calculator",
    resultForClient: "Budete znát reálnou tržní hodnotu své nemovitosti – zdarma a bez závazku.",
    description:
      "Na základě lokality, stavu a parametrů nemovitosti připravím orientační odhad ceny a doporučím, jak dál postupovat.",
  },
  {
    slug: "pomoc-s-koupi",
    title: "Pomoc s koupí",
    icon: "search",
    resultForClient: "Vyberete nemovitost s jistotou, že jste neprošli nic podstatného.",
    description:
      "Pomohu s vyhledáním vhodných nemovitostí, prověřením podkladů i vyjednáváním o ceně a podmínkách koupě.",
  },
  {
    slug: "pravni-a-administrativni-servis",
    title: "Právní a administrativní servis",
    icon: "scale",
    resultForClient: "Máte jistotu, že smlouvy i proces odpovídají aktuální legislativě.",
    description:
      "Příprava smluv, návrh na vklad do katastru nemovitostí, úschova kupní ceny a komunikace s úřady – vše koordinuji za vás.",
  },
  {
    slug: "realitni-konzultace",
    title: "Realitní konzultace",
    icon: "users",
    resultForClient: "Získáte jasno v tom, jaký další krok dává v vaší situaci smysl.",
    description:
      "Nevíte, jestli prodat, pronajmout nebo počkat? Nezávazně probereme vaši situaci a možnosti bez tlaku na rozhodnutí.",
  },
];
