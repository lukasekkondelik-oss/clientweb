import { Hero } from "@/components/sections/Hero";
import { NeedsRouter } from "@/components/sections/NeedsRouter";
import { TrustReasonsSection } from "@/components/sections/TrustReasonsSection";
import { AboutRomana } from "@/components/sections/AboutRomana";
import { ValuationSection } from "@/components/sections/ValuationSection";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { PropertiesShowcase } from "@/components/sections/PropertiesShowcase";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { BookingSection } from "@/components/sections/BookingSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { faqJsonLd } from "@/lib/seo";
import { faqItems } from "@/data/faq";

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqItems)) }}
      />
      <Hero />
      <NeedsRouter />
      <TrustReasonsSection />
      <AboutRomana />
      <ValuationSection />
      <ProcessTimeline />
      <ServicesGrid />
      <PropertiesShowcase />
      <TestimonialsSection />
      <BookingSection />
      <FaqSection />
      <FinalCta />
    </>
  );
}
