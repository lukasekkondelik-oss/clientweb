import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { forwardLead, isRateLimited } from "@/lib/leads-server";

const payloadSchema = z.object({
  leadSource: z.literal("website"),
  leadType: z.literal("general_contact"),
  name: z.string().trim().min(2),
  phone: z.string().trim(),
  email: z.string().trim().email(),
  message: z.string().trim().min(5),
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
    process.env.CONTACT_WEBHOOK_URL || process.env.RAYNET_WEBHOOK_URL,
    parsed.data,
    "general_contact",
  );

  return NextResponse.json(
    { ok: true, message: "Zpráva byla odeslána.", forwarded: result.forwarded },
    { status: 200 },
  );
}
