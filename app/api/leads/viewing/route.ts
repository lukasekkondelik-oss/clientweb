import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { forwardLead, isRateLimited } from "@/lib/leads-server";

const payloadSchema = z.object({
  leadSource: z.literal("website"),
  leadType: z.literal("viewing_request"),
  name: z.string().trim().min(2),
  phone: z.string().trim().min(9),
  email: z.string().trim().email(),
  propertySlug: z.string().trim().min(1),
  propertyTitle: z.string().trim().min(1),
  preferredDate: z.string().trim(),
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
    return NextResponse.json(
      { ok: false, message: "Zkontrolujte prosím vyplněné údaje a souhlas se zpracováním." },
      { status: 422 },
    );
  }

  const result = await forwardLead(
    process.env.VIEWING_WEBHOOK_URL || process.env.RAYNET_WEBHOOK_URL,
    parsed.data,
    "viewing_request",
  );

  return NextResponse.json(
    { ok: true, message: "Poptávka prohlídky byla odeslána.", forwarded: result.forwarded },
    { status: 200 },
  );
}
