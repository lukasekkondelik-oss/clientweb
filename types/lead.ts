export type PreferredContact = "telefon" | "e-mail";

export interface ValuationLeadPayload {
  leadSource: "website";
  leadType: "property_valuation";
  name: string;
  phone: string;
  email: string;
  preferredContact: string;
  preferredContactTime: string;
  propertyType: string;
  city: string;
  street: string;
  postalCode: string;
  disposition: string;
  usableArea: string;
  landArea: string;
  propertyCondition: string;
  ownership: string;
  clientSituation: string;
  saleTimeline: string;
  note: string;
  consent: boolean;
  pageUrl: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  createdAt: string;
}

export interface ContactLeadPayload {
  leadSource: "website";
  leadType: "general_contact";
  name: string;
  phone: string;
  email: string;
  message: string;
  consent: boolean;
  pageUrl: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  createdAt: string;
}

export interface ViewingLeadPayload {
  leadSource: "website";
  leadType: "viewing_request";
  name: string;
  phone: string;
  email: string;
  propertySlug: string;
  propertyTitle: string;
  preferredDate: string;
  note: string;
  consent: boolean;
  pageUrl: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  createdAt: string;
}

export interface LeadApiResponse {
  ok: boolean;
  message: string;
}
