export type PropertyType =
  | "byt"
  | "rodinny-dum"
  | "pozemek"
  | "rekreacni-objekt"
  | "komercni-nemovitost"
  | "jina-nemovitost";

export type PropertyStatus = "v-nabidce" | "rezervovano" | "prodano" | "pronajato";

export type PropertyOffer = "prodej" | "pronajem";

export interface PropertyImage {
  /** Alt text describing the photo for accessibility. */
  alt: string;
  /** True until a real photo from the client is dropped into /public. */
  isPlaceholder: boolean;
}

export interface Property {
  slug: string;
  title: string;
  type: PropertyType;
  offer: PropertyOffer;
  status: PropertyStatus;
  city: string;
  district?: string;
  disposition?: string;
  usableArea?: number;
  landArea?: number;
  /** Price in CZK, undefined = "cena na vyžádání". */
  price?: number;
  priceNote?: string;
  description: string[];
  parameters: { label: string; value: string }[];
  images: PropertyImage[];
  /**
   * True when price/area/description were not verifiably confirmed on the
   * current live site and are shown for prototype/demo purposes only.
   */
  isDemoData: boolean;
}
