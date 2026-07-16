export interface TrustReason {
  title: string;
  description: string;
}

/**
 * 3–5 nejsilnějších, ověřených argumentů – bez vymyšlených čísel a garancí.
 */
export const trustReasons: TrustReason[] = [
  {
    title: "21 let zkušeností v realitách",
    description:
      "Za dvě dekády praxe jsem řešila širokou škálu situací – od jednoduchého prodeje bytu po komplikované případy s dědictvím či nejasným vlastnictvím. Vím, co může nastat, a umím se na to připravit dopředu.",
  },
  {
    title: "Osobní vedení celé zakázky",
    description:
      "Nepředávám vás týmu ani asistentům. Od první konzultace až po předání nemovitosti jednáte se mnou osobně a víte, na koho se kdykoliv obrátit.",
  },
  {
    title: "Kompletní právní a administrativní servis",
    description:
      "Zajišťuji přípravu smluv, komunikaci s úřady i koordinaci celého procesu tak, abyste se nemuseli orientovat v paragrafech a formulářích sami.",
  },
  {
    title: "Profesionální prezentace nemovitosti",
    description:
      "Profesionální fotografie, video a inzerce na známých realitních portálech pomáhají oslovit skutečně relevantní zájemce, ne jen nahodilé prohlídky.",
  },
  {
    title: "Férová provize a lidská komunikace",
    description:
      "Provizi nastavujeme transparentně předem a v průběhu prodeje víte, co se děje a proč. Bez tlaku, s prostorem na vaše otázky.",
  },
];
