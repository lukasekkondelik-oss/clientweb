import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { forwardLead, isRateLimited } from "@/lib/leads-server";

const payloadSchema = z.object({
  leadSource: z.literal("website"),
  leadType: z.literal("property_valuation"),
  name: z.string().trim().min(2),
  phone: z.string().trim(),
  email: z.string().trim(),
  preferredContact: z.string().trim(),
  preferredContactTime: z.string().trim(),
  propertyType: z.string().trim().min(1),
  city: z.string().trim().min(2),
  street: z.string().trim(),
  postalCode: z.string().trim(),
  disposition: z.string().trim(),
  usableArea: z.string().trim(),
  landArea: z.string().trim(),
  propertyCondition: z.string().trim(),
  ownership: z.string().trim(),
  clientSituation: z.string().trim().min(1),
  saleTimeline: z.string().trim(),
  note: z.string().trim(),
  consent: z.literal(true),
  pageUrl: z.string().trim(),
  utmSource: z.string().trim(),
  utmMedium: z.string().trim(),
  utmCampaign: z.string().trim(),
  createdAt: z.string().trim(),
});

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, message: "Příliš mnoho požadavků. Zkuste to prosím za chvíli." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Neplatný formát požadavku." }, { status: 400 });
  }

  const parsed = payloadSchema.safeParse(body);
  if (!parsed.success) {
    const phoneOrEmail = typeof body === "object" && body !== null ? (body as Record<string, unknown>) : {};
    const hasPhoneOrEmail = Boolean(phoneOrEmail.phone) || Boolean(phoneOrEmail.email);
    return NextResponse.json(
      {
        ok: false,
        message: hasPhoneOrEmail
          ? "Formulář obsahuje neplatné údaje. Zkontrolujte prosím vyplněná pole."
          : "Uveďte prosím telefon nebo e-mail a potvrďte souhlas se zpracováním údajů.",
      },
      { status: 422 },
    );
  }

  const result = await forwardLead(
    process.env.VALUATION_WEBHOOK_URL || process.env.RAYNET_WEBHOOK_URL,
    parsed.data,
    "property_valuation",
  );

  return NextResponse.json(
    {
      ok: true,
      message: "Poptávka ocenění byla přijata.",
      forwarded: result.forwarded,
    },
    { status: 200 },
  );
}
