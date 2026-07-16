import type { Metadata } from "next";
import { contact } from "@/data/contact";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://www.romanareality.cz";

export const siteName = `${contact.name} | ${contact.brand}`;

interface BuildMetadataArgs {
  title: string;
  description: string;
  path: string;
}

/**
 * Open Graph / Twitter obrázek se generuje automaticky přes soubory
 * app/opengraph-image.tsx a app/twitter-image.tsx (Next.js file convention),
 * proto se zde needeklaruje explicitně – Next.js jej k metadatům připojí sám.
 */
export function buildMetadata({ title, description, path }: BuildMetadataArgs): Metadata {
  const url = `${siteUrl}${path}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName,
      locale: "cs_CZ",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function realEstateAgentJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: contact.name,
    alternateName: contact.brand,
    url: siteUrl,
    telephone: contact.phone,
    email: contact.email,
    areaServed: contact.region,
    address: {
      "@type": "PostalAddress",
      addressRegion: "Praha a Středočeský kraj",
      addressCountry: "CZ",
    },
  };
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: contact.brand,
    telephone: contact.phone,
    email: contact.email,
    url: siteUrl,
    areaServed: contact.region,
  };
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: contact.name,
    jobTitle: "Realitní makléřka",
    worksFor: {
      "@type": "Organization",
      name: contact.brand,
    },
    telephone: contact.phone,
    email: contact.email,
    url: `${siteUrl}/o-mne`,
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function servicesJsonLd(items: { title: string; description: string }[]) {
  return items.map((item) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: item.title,
    description: item.description,
    provider: {
      "@type": "RealEstateAgent",
      name: contact.name,
    },
    areaServed: contact.region,
  }));
}
