import { captureUtmParams, getPageUrl } from "@/lib/utm";
import type { ContactFormValues, ValuationFormValues, ViewingFormValues } from "@/lib/validation";
import type {
  ContactLeadPayload,
  LeadApiResponse,
  ValuationLeadPayload,
  ViewingLeadPayload,
} from "@/types/lead";

async function postLead<T>(endpoint: string, payload: T): Promise<LeadApiResponse> {
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = (await response.json().catch(() => null)) as LeadApiResponse | null;

    if (!response.ok) {
      return {
        ok: false,
        message: data?.message ?? "Odeslání se nezdařilo. Zkuste to prosím znovu.",
      };
    }

    return data ?? { ok: true, message: "Odesláno." };
  } catch {
    return {
      ok: false,
      message: "Nepodařilo se spojit se serverem. Zkontrolujte prosím připojení a zkuste to znovu.",
    };
  }
}

export async function submitValuationLead(values: ValuationFormValues): Promise<LeadApiResponse> {
  const utm = captureUtmParams();
  const payload: ValuationLeadPayload = {
    leadSource: "website",
    leadType: "property_valuation",
    name: values.name,
    phone: values.phone ?? "",
    email: values.email ?? "",
    preferredContact: values.preferredContact,
    preferredContactTime: values.preferredContactTime ?? "",
    propertyType: values.propertyType,
    city: values.city,
    street: values.street ?? "",
    postalCode: values.postalCode ?? "",
    disposition: values.disposition ?? "",
    usableArea: values.usableArea ?? "",
    landArea: values.landArea ?? "",
    propertyCondition: values.propertyCondition ?? "",
    ownership: values.ownership ?? "",
    clientSituation: values.clientSituation,
    saleTimeline: values.clientSituation,
    note: [values.additionalInfo, values.note].filter(Boolean).join(" | "),
    consent: values.consent,
    pageUrl: getPageUrl(),
    utmSource: utm.utmSource,
    utmMedium: utm.utmMedium,
    utmCampaign: utm.utmCampaign,
    createdAt: new Date().toISOString(),
  };

  return postLead("/api/leads/valuation", payload);
}

export async function submitContactLead(values: ContactFormValues): Promise<LeadApiResponse> {
  const utm = captureUtmParams();
  const payload: ContactLeadPayload = {
    leadSource: "website",
    leadType: "general_contact",
    name: values.name,
    phone: values.phone ?? "",
    email: values.email,
    message: values.message,
    consent: values.consent,
    pageUrl: getPageUrl(),
    utmSource: utm.utmSource,
    utmMedium: utm.utmMedium,
    utmCampaign: utm.utmCampaign,
    createdAt: new Date().toISOString(),
  };

  return postLead("/api/leads/contact", payload);
}

export async function submitViewingLead(
  values: ViewingFormValues,
  property: { slug: string; title: string },
): Promise<LeadApiResponse> {
  const utm = captureUtmParams();
  const payload: ViewingLeadPayload = {
    leadSource: "website",
    leadType: "viewing_request",
    name: values.name,
    phone: values.phone,
    email: values.email,
    propertySlug: property.slug,
    propertyTitle: property.title,
    preferredDate: values.preferredDate ?? "",
    note: values.note ?? "",
    consent: values.consent,
    pageUrl: getPageUrl(),
    utmSource: utm.utmSource,
    utmMedium: utm.utmMedium,
    utmCampaign: utm.utmCampaign,
    createdAt: new Date().toISOString(),
  };

  return postLead("/api/leads/viewing", payload);
}
