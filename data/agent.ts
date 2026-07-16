/**
 * Ověřená fakta o Romaně Trefné – vycházejí výhradně z podkladů dodaných
 * klientkou / ze zadání projektu. Žádná čísla, ocenění ani výsledky nejsou
 * dopočítávány ani odhadovány.
 */
export const agent = {
  name: "Romana Trefná",
  role: "Realitní makléřka",
  brand: "Romana Reality",
  region: "Praha a Středočeský kraj",
  experienceYears: 21,
  photo: {
    isPlaceholder: true,
    alt: "Romana Trefná, realitní makléřka",
    note: "TODO: nahradit reálnou portrétní fotografií Romany Trefné.",
  },
  verifiedFacts: [
    "21 let zkušeností v oblasti realit",
    "Profesionální servis při koupi, prodeji i pronájmu nemovitostí",
    "Odhad ceny nemovitosti a první konzultace zdarma",
    "Kompletní právní servis",
    "Příprava smluv a dokumentace",
    "Komunikace s úřady",
    "Profesionální fotografie a video nemovitosti",
    "Inzerce na známých realitních portálech",
    "Osobní a lidský přístup ke každému klientovi",
    "Férová provize",
    "Časová flexibilita",
    "Pomoc klientovi i po dokončení obchodu",
  ],
  introFirstPerson:
    "Každá nemovitost i každý klient mají jinou situaci. Proto ke každému obchodu přistupuji osobně. Mým cílem není pouze nemovitost nabídnout, ale bezpečně vás provést celým procesem a najít řešení, které vám bude dávat smysl.",
} as const;
