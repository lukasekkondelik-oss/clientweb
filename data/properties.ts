import { Property } from "@/types/property";

/**
 * Názvy a lokality vycházejí z příkladů nabídek uvedených klientkou v zadání
 * projektu. Přesné ceny, patra, stav a popisné texty nebyly k dispozici
 * (web klientky nebylo možné v tomto prostředí ověřit), proto jsou tyto
 * položky označeny `isDemoData: true` a v UI se zobrazují s příslušným
 * upozorněním. Před spuštěním produkčního webu je nutné všechny hodnoty
 * nahradit ověřenými údaji, případně napojit na reálný zdroj dat.
 */
export const properties: Property[] = [
  {
    slug: "byt-5-1-praha-smichov",
    title: "Prodej bytu 5+1, Praha – Smíchov",
    type: "byt",
    offer: "prodej",
    status: "v-nabidce",
    city: "Praha",
    district: "Smíchov",
    disposition: "5+1",
    usableArea: 168,
    price: undefined,
    priceNote: "Cena na vyžádání",
    isDemoData: true,
    description: [
      "Prostorný byt 5+1 v žádané lokalitě Prahy 5 – Smíchov, vhodný pro rodinu i jako investice.",
      "Přesné parametry, dispozice pokojů a aktuální stav budou upřesněny při zveřejnění ostrého inzerátu.",
    ],
    parameters: [
      { label: "Dispozice", value: "5+1" },
      { label: "Užitná plocha", value: "168 m²" },
      { label: "Lokalita", value: "Praha – Smíchov" },
      { label: "Vlastnictví", value: "Ukázkový údaj – doplnit" },
      { label: "Stav", value: "Ukázkový údaj – doplnit" },
    ],
    images: [
      { alt: "Obývací pokoj bytu 5+1 na Smíchově (ukázkový snímek)", isPlaceholder: true },
      { alt: "Kuchyň bytu 5+1 na Smíchově (ukázkový snímek)", isPlaceholder: true },
      { alt: "Ložnice bytu 5+1 na Smíchově (ukázkový snímek)", isPlaceholder: true },
    ],
  },
  {
    slug: "vicegeneracni-dum-zelizy",
    title: "Vícegenerační dům, Želízy",
    type: "rodinny-dum",
    offer: "prodej",
    status: "v-nabidce",
    city: "Želízy",
    district: "okres Mělník",
    disposition: undefined,
    usableArea: undefined,
    price: undefined,
    priceNote: "Cena na vyžádání",
    isDemoData: true,
    description: [
      "Vícegenerační dům v obci Želízy na Mělnicku, vhodný pro bydlení více rodin nebo generací pod jednou střechou.",
      "Podrobný popis dispozic a technického stavu bude doplněn při zveřejnění ostrého inzerátu.",
    ],
    parameters: [
      { label: "Typ", value: "Vícegenerační dům" },
      { label: "Lokalita", value: "Želízy, okres Mělník" },
      { label: "Užitná plocha", value: "Ukázkový údaj – doplnit" },
      { label: "Plocha pozemku", value: "Ukázkový údaj – doplnit" },
    ],
    images: [
      { alt: "Exteriér vícegeneračního domu v Želízech (ukázkový snímek)", isPlaceholder: true },
      { alt: "Zahrada u vícegeneračního domu v Želízech (ukázkový snímek)", isPlaceholder: true },
    ],
  },
  {
    slug: "rodinny-dum-rozmital-pod-tremsinem",
    title: "Rodinný dům, Rožmitál pod Třemšínem",
    type: "rodinny-dum",
    offer: "prodej",
    status: "v-nabidce",
    city: "Rožmitál pod Třemšínem",
    district: undefined,
    disposition: undefined,
    usableArea: undefined,
    price: undefined,
    priceNote: "Cena na vyžádání",
    isDemoData: true,
    description: [
      "Rodinný dům v Rožmitále pod Třemšínem, klidná lokalita se snadnou dostupností občanské vybavenosti.",
      "Podrobný popis dispozic, pozemku a technického stavu bude doplněn při zveřejnění ostrého inzerátu.",
    ],
    parameters: [
      { label: "Typ", value: "Rodinný dům" },
      { label: "Lokalita", value: "Rožmitál pod Třemšínem" },
      { label: "Užitná plocha", value: "Ukázkový údaj – doplnit" },
      { label: "Plocha pozemku", value: "Ukázkový údaj – doplnit" },
    ],
    images: [
      { alt: "Exteriér rodinného domu v Rožmitále pod Třemšínem (ukázkový snímek)", isPlaceholder: true },
    ],
  },
  {
    slug: "prodano-byt-praha-4-demo",
    title: "Prodej bytu 3+kk, Praha 4 (dokončený obchod)",
    type: "byt",
    offer: "prodej",
    status: "prodano",
    city: "Praha",
    district: "Praha 4",
    disposition: "3+kk",
    usableArea: undefined,
    price: undefined,
    priceNote: "Prodáno",
    isDemoData: true,
    description: [
      "Ukázka dokončeného obchodu pro účely prototypu – demonstruje, jak bude sekce prodaných nemovitostí vypadat v ostrém provozu.",
    ],
    parameters: [
      { label: "Dispozice", value: "3+kk" },
      { label: "Lokalita", value: "Praha 4" },
      { label: "Stav", value: "Prodáno" },
    ],
    images: [
      { alt: "Ukázkový snímek prodané nemovitosti v Praze 4", isPlaceholder: true },
    ],
  },
];

export function getPropertyBySlug(slug: string) {
  return properties.find((property) => property.slug === slug);
}

export function getAvailableProperties() {
  return properties.filter((property) => property.status !== "prodano" && property.status !== "pronajato");
}

export function getSoldProperties() {
  return properties.filter((property) => property.status === "prodano" || property.status === "pronajato");
}
