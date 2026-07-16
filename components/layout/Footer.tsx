"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, ExternalLink } from "lucide-react";
import { contact } from "@/data/contact";
import { footerLinks } from "@/data/navigation";
import { Container } from "@/components/ui/Container";

export function Footer() {
  const year = new Date().getFullYear();
  const hasSocial = contact.social.facebook || contact.social.instagram || contact.social.linkedin;

  return (
    <footer className="bg-ink pb-24 pt-16 text-cream/80 sm:pb-16">
      <Container className="grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <p className="font-serif text-2xl text-cream">Romana Reality</p>
          <p className="mt-1 text-sm text-bronze-soft">{contact.name}</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/70">
            Osobní a zkušený realitní servis v Praze a Středočeském kraji – prodej, koupě,
            pronájem i ocenění nemovitostí.
          </p>
          {hasSocial ? (
            <div className="mt-6 flex flex-wrap items-center gap-4">
              {contact.social.facebook && (
                <a href={contact.social.facebook} className="inline-flex items-center gap-1.5 text-sm text-cream/70 hover:text-bronze-soft">
                  Facebook <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              )}
              {contact.social.instagram && (
                <a href={contact.social.instagram} className="inline-flex items-center gap-1.5 text-sm text-cream/70 hover:text-bronze-soft">
                  Instagram <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              )}
              {contact.social.linkedin && (
                <a href={contact.social.linkedin} className="inline-flex items-center gap-1.5 text-sm text-cream/70 hover:text-bronze-soft">
                  LinkedIn <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              )}
            </div>
          ) : (
            <p className="mt-6 text-xs text-cream/40">
              Sociální sítě: odkazy doplňte v data/contact.ts
            </p>
          )}
        </div>

        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-cream/50">
            Stránky
          </p>
          <ul className="space-y-2.5 text-sm">
            {footerLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-cream/75 hover:text-bronze-soft">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <button
                type="button"
                className="text-left text-cream/75 hover:text-bronze-soft"
                onClick={() => {
                  window.dispatchEvent(new Event("open-cookie-settings"));
                }}
              >
                Nastavení cookies
              </button>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-cream/50">
            Kontakt
          </p>
          <ul className="space-y-3 text-sm">
            <li>
              <a href={contact.phoneHref} className="inline-flex items-center gap-2 text-cream/75 hover:text-bronze-soft">
                <Phone className="h-4 w-4 text-bronze-soft" aria-hidden="true" />
                {contact.phone}
              </a>
            </li>
            <li>
              <a href={contact.emailHref} className="inline-flex items-center gap-2 text-cream/75 hover:text-bronze-soft">
                <Mail className="h-4 w-4 text-bronze-soft" aria-hidden="true" />
                {contact.email}
              </a>
            </li>
            <li className="inline-flex items-start gap-2 text-cream/75">
              <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-bronze-soft" aria-hidden="true" />
              {contact.region}
            </li>
          </ul>
        </div>
      </Container>

      <Container className="mt-14 flex flex-col gap-3 border-t border-cream/10 pt-6 text-xs text-cream/45 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {contact.brand} — {contact.name}. Všechna práva vyhrazena.
        </p>
        <p className="text-cream/35">
          IČO: placeholder — doplnit před spuštěním produkčního webu.
        </p>
      </Container>
    </footer>
  );
}
