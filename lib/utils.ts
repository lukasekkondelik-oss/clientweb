import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price?: number) {
  if (!price) return null;
  return new Intl.NumberFormat("cs-CZ", {
    style: "currency",
    currency: "CZK",
    maximumFractionDigits: 0,
  }).format(price);
}

export const propertyTypeLabels: Record<string, string> = {
  byt: "Byt",
  "rodinny-dum": "Rodinný dům",
  pozemek: "Pozemek",
  "rekreacni-objekt": "Rekreační objekt",
  "komercni-nemovitost": "Komerční nemovitost",
  "jina-nemovitost": "Jiná nemovitost",
};

export const propertyStatusLabels: Record<string, string> = {
  "v-nabidce": "V nabídce",
  rezervovano: "Rezervováno",
  prodano: "Prodáno",
  pronajato: "Pronajato",
};
