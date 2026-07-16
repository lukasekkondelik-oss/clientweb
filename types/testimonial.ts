export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  context: string;
  /**
   * true = převzato doslovně z ověřeného zdroje (současný web klientky).
   * false = ukázková/demo reference pro účely prototypu, musí být nahrazena
   * reálnou referencí před spuštěním produkčního webu.
   */
  verified: boolean;
  featured?: boolean;
}
