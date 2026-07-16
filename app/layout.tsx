import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { TopBar } from "@/components/layout/TopBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StickyMobileCTA } from "@/components/layout/StickyMobileCTA";
import { CookieConsent } from "@/components/forms/CookieConsent";
import { DemoModeBar } from "@/components/layout/DemoModeBar";
import { buildMetadata, personJsonLd, realEstateAgentJsonLd } from "@/lib/seo";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Romana Trefná | Realitní makléřka Praha a Středočeský kraj",
    description:
      "Prodej, pronájem a ocenění nemovitostí v Praze a Středočeském kraji. 21 let zkušeností, osobní přístup a kompletní realitní servis.",
    path: "/",
  }),
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.romanareality.cz"),
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = [realEstateAgentJsonLd(), personJsonLd()];

  return (
    <html
      lang="cs"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-cream text-charcoal">
        {jsonLd.map((entry, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(entry) }}
          />
        ))}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-bronze focus:px-4 focus:py-2 focus:text-cream"
        >
          Přeskočit na hlavní obsah
        </a>
        <TopBar />
        <Navbar />
        <main id="main-content" className="flex-1 pb-16 sm:pb-0">
          {children}
        </main>
        <Footer />
        <StickyMobileCTA />
        <CookieConsent />
        <DemoModeBar />
      </body>
    </html>
  );
}
