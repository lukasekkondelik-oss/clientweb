import { Testimonial } from "@/types/testimonial";

/**
 * `verified: true` = doslovná citace z ověřeného zdroje (aktuální web
 * klientky). Jméno autora a typ zakázky nebylo v podkladech pro prototyp
 * k dispozici, proto je označeno jako TODO – doplnit před spuštěním.
 *
 * `verified: false` položky jsou zjevně označené ukázkové reference pro
 * účely prezentace prototypu a musí být před spuštěním nahrazeny reálnými
 * referencemi z webu klientky.
 */
export const testimonials: Testimonial[] = [
  {
    id: "chladna-hlava",
    quote:
      "Profesionální přístup a schopnost řešit neočekávané problémy. Vždy zachovala chladnou hlavu. Vždy perfektně připravená. Po této zkušenosti už zůstane mým makléřem.",
    author: "Klient/ka Romany Reality",
    context: "TODO: doplnit jméno autora a typ zakázky z aktuálního webu.",
    verified: true,
    featured: true,
  },
  {
    id: "demo-1",
    quote:
      "[Ukázková reference – nahradit reálnou] Rychlá komunikace a jasně nastavené kroky od začátku do konce prodeje.",
    author: "Ukázkový klient",
    context: "Demo reference – prodej bytu",
    verified: false,
  },
  {
    id: "demo-2",
    quote:
      "[Ukázková reference – nahradit reálnou] Ocenila jsem, že jsme přesně věděli, co se bude dít dál, a všechny dokumenty byly připravené s předstihem.",
    author: "Ukázkový klient",
    context: "Demo reference – prodej rodinného domu",
    verified: false,
  },
  {
    id: "demo-3",
    quote:
      "[Ukázková reference – nahradit reálnou] Dohodnuté podmínky byly dodrženy přesně tak, jak jsme si na začátku řekli.",
    author: "Ukázkový klient",
    context: "Demo reference – vypořádání dědictví",
    verified: false,
  },
];
