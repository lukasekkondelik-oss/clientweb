import { z } from "zod";

export const propertyTypeOptions = [
  { value: "byt", label: "Byt" },
  { value: "rodinny-dum", label: "Rodinný dům" },
  { value: "pozemek", label: "Pozemek" },
  { value: "rekreacni-objekt", label: "Rekreační objekt" },
  { value: "komercni-nemovitost", label: "Komerční nemovitost" },
  { value: "jina-nemovitost", label: "Jiná nemovitost" },
] as const;

export const clientSituationOptions = [
  { value: "co-nejdrive", label: "Chci prodat co nejdříve" },
  { value: "behem-mesicu", label: "Prodej plánuji během několika měsíců" },
  { value: "zvazuji", label: "Prodej zatím pouze zvažuji" },
  { value: "jen-hodnota", label: "Potřebuji pouze zjistit hodnotu" },
  { value: "dedictvi", label: "Řeším dědictví" },
  { value: "vyporadani", label: "Řeším vypořádání majetku" },
  { value: "jina-situace", label: "Jiná situace" },
] as const;

export const preferredContactOptions = [
  { value: "telefon", label: "Telefonicky" },
  { value: "e-mail", label: "E-mailem" },
] as const;

export const preferredTimeOptions = [
  { value: "dopoledne", label: "Dopoledne" },
  { value: "odpoledne", label: "Odpoledne" },
  { value: "vecer", label: "Večer" },
  { value: "kdykoliv", label: "Kdykoliv" },
] as const;

const propertyTypeValues = propertyTypeOptions.map((o) => o.value) as [string, ...string[]];
const clientSituationValues = clientSituationOptions.map((o) => o.value) as [string, ...string[]];

/** Pole formuláře podle jednotlivých kroků – používá se pro validaci "Next" tlačítkem (RHF trigger). */
export const valuationStepFields: Record<1 | 2 | 3 | 4 | 5, string[]> = {
  1: ["propertyType"],
  2: ["city", "street", "postalCode"],
  3: [
    "disposition",
    "usableArea",
    "landArea",
    "propertyCondition",
    "ownership",
    "floor",
    "hasElevator",
    "additionalInfo",
  ],
  4: ["clientSituation"],
  5: ["name", "phone", "email", "preferredContact", "preferredContactTime", "note", "consent"],
};

export const valuationFormSchema = z
  .object({
    propertyType: z.enum(propertyTypeValues, "Vyberte prosím typ nemovitosti."),
    city: z.string().trim().min(2, "Uveďte prosím město nebo obec."),
    street: z.string().trim().optional(),
    postalCode: z.string().trim().optional(),
    disposition: z.string().trim().optional(),
    usableArea: z.string().trim().optional(),
    landArea: z.string().trim().optional(),
    propertyCondition: z.string().trim().optional(),
    ownership: z.string().trim().optional(),
    floor: z.string().trim().optional(),
    hasElevator: z.string().trim().optional(),
    additionalInfo: z.string().trim().optional(),
    clientSituation: z.enum(clientSituationValues, "Vyberte prosím vaši aktuální situaci."),
    name: z.string().trim().min(2, "Uveďte prosím vaše jméno."),
    phone: z.string().trim().optional(),
    email: z.string().trim().optional(),
    preferredContact: z.string().trim().min(1, "Vyberte preferovaný způsob kontaktu."),
    preferredContactTime: z.string().trim().optional(),
    note: z.string().trim().optional(),
    consent: z.boolean(),
    // Honeypot – skryté pole, lidský návštěvník ho nikdy nevyplní.
    company: z.string().trim().max(0).optional(),
  })
  .superRefine((data, ctx) => {
    const phoneOk = !!data.phone && data.phone.replace(/\s+/g, "").length >= 9;
    const emailOk = !!data.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);

    if (!phoneOk && !emailOk) {
      ctx.addIssue({
        code: "custom",
        path: ["phone"],
        message: "Uveďte prosím telefon nebo e-mail, abychom se vám mohli ozvat.",
      });
    }
    if (data.email && !emailOk) {
      ctx.addIssue({
        code: "custom",
        path: ["email"],
        message: "Zadejte prosím platný e-mail.",
      });
    }
    if (!data.consent) {
      ctx.addIssue({
        code: "custom",
        path: ["consent"],
        message: "Pro odeslání je nutné potvrdit souhlas se zpracováním údajů.",
      });
    }
  });

export type ValuationFormValues = z.infer<typeof valuationFormSchema>;

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Uveďte prosím vaše jméno."),
  phone: z.string().trim().optional(),
  email: z.string().trim().email("Zadejte prosím platný e-mail."),
  message: z.string().trim().min(5, "Napište prosím pár slov k vaší poptávce."),
  consent: z.boolean(),
  company: z.string().trim().max(0).optional(),
}).superRefine((data, ctx) => {
  if (!data.consent) {
    ctx.addIssue({
      code: "custom",
      path: ["consent"],
      message: "Pro odeslání je nutné potvrdit souhlas se zpracováním údajů.",
    });
  }
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const viewingFormSchema = z.object({
  name: z.string().trim().min(2, "Uveďte prosím vaše jméno."),
  phone: z.string().trim().min(9, "Zadejte prosím platné telefonní číslo."),
  email: z.string().trim().email("Zadejte prosím platný e-mail."),
  preferredDate: z.string().trim().optional(),
  note: z.string().trim().optional(),
  consent: z.boolean(),
  company: z.string().trim().max(0).optional(),
}).superRefine((data, ctx) => {
  if (!data.consent) {
    ctx.addIssue({
      code: "custom",
      path: ["consent"],
      message: "Pro odeslání je nutné potvrdit souhlas se zpracováním údajů.",
    });
  }
});

export type ViewingFormValues = z.infer<typeof viewingFormSchema>;
