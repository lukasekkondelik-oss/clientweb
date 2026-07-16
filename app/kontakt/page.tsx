import type { Metadata } from "next";
import { Phone, Mail, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/sections/PageHeader";
import { ContactForm } from "@/components/forms/ContactForm";
import { BookingSection } from "@/components/sections/BookingSection";
import { buildMetadata, breadcrumbJsonLd, localBusinessJsonLd } from "@/lib/seo";
import { contact } from "@/data/contact";

export const metadata: Metadata = buildMetadata({
  title: "Kontakt | Romana Trefná – realitní makléřka",
  description:
    "Kontaktujte Romanu Trefnou – realitní makléřku pro Prahu a Středočeský kraj. Telefon, e-mail i online rezervace konzultace.",
  path: "/kontakt",
});

export default function ContactPage() {
  const breadcrumb = breadcrumbJsonLd([
    { name: "Domů", path: "/" },
    { name: "Kontakt", path: "/kontakt" },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }}
      />

      <PageHeader
        eyebrow="Kontakt"
        title="Napište nebo zavolejte"
        description="Nejrychlejší odpověď dostanete telefonicky. Ráda vám ale odpovím i na e-mail nebo přes formulář."
      />

      <section className="bg-cream py-16 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-4">
            <a
              href={contact.phoneHref}
              className="flex items-center gap-3 rounded-2xl border border-line bg-white px-5 py-4 text-charcoal hover:border-bronze/50"
            >
              <Phone className="h-5 w-5 text-bronze" aria-hidden="true" />
              <span>
                <span className="block text-xs text-stone">Telefon</span>
                <span className="font-medium">{contact.phone}</span>
              </span>
            </a>
            <a
              href={contact.emailHref}
              className="flex items-center gap-3 rounded-2xl border border-line bg-white px-5 py-4 text-charcoal hover:border-bronze/50"
            >
              <Mail className="h-5 w-5 text-bronze" aria-hidden="true" />
              <span>
                <span className="block text-xs text-stone">E-mail</span>
                <span className="font-medium">{contact.email}</span>
              </span>
            </a>
            <div className="flex items-center gap-3 rounded-2xl border border-line bg-white px-5 py-4 text-charcoal">
              <MapPin className="h-5 w-5 text-bronze" aria-hidden="true" />
              <span>
                <span className="block text-xs text-stone">Působnost</span>
                <span className="font-medium">{contact.region}</span>
              </span>
            </div>
          </div>

          <ContactForm />
        </Container>
      </section>

      <BookingSection />
    </>
  );
}
