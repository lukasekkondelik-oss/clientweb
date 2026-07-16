export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: "Úvodní konzultace",
    description:
      "Probereme vaši situaci, cíle a časový rámec. Zjistíte, co prodej obnáší a co bude potřeba připravit.",
  },
  {
    step: 2,
    title: "Ocenění nemovitosti",
    description:
      "Posoudím lokalitu, stav a parametry nemovitosti a navrhnu reálnou prodejní cenu podloženou aktuální situací na trhu.",
  },
  {
    step: 3,
    title: "Příprava prodejní strategie",
    description:
      "Domluvíme si postup, časový plán a způsob komunikace tak, aby prodej odpovídal vaší situaci a preferencím.",
  },
  {
    step: 4,
    title: "Profesionální prezentace",
    description:
      "Zajistím profesionální fotografie, video a podklady, díky kterým nemovitost osloví relevantní zájemce.",
  },
  {
    step: 5,
    title: "Inzerce a komunikace se zájemci",
    description:
      "Nemovitost inzeruji na známých realitních portálech a veškerou komunikaci se zájemci vyřizuji za vás.",
  },
  {
    step: 6,
    title: "Prohlídky a vyjednávání",
    description:
      "Prohlídky organizuji a vedu osobně, včetně vyjednávání o ceně a podmínkách s vážnými zájemci.",
  },
  {
    step: 7,
    title: "Smlouvy a právní servis",
    description:
      "Připravím kupní smlouvu, návrh na vklad do katastru a zajistím úschovu kupní ceny i další potřebnou dokumentaci.",
  },
  {
    step: 8,
    title: "Bezpečné předání nemovitosti",
    description:
      "Předání nemovitosti dokumentuji protokolem a jsem k dispozici i po dokončení obchodu, pokud cokoliv potřebujete doladit.",
  },
];
