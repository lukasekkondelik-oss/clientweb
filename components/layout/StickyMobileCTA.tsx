import { Phone, Calculator } from "lucide-react";
import Link from "next/link";
import { contact } from "@/data/contact";

export function StickyMobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex border-t border-line bg-cream/95 backdrop-blur-md shadow-[0_-2px_12px_rgba(28,27,25,0.08)] sm:hidden">
      <a
        href={contact.phoneHref}
        className="flex flex-1 items-center justify-center gap-2 border-r border-line py-3.5 text-sm font-semibold text-charcoal"
      >
        <Phone className="h-4 w-4 text-bronze" aria-hidden="true" />
        Zavolat
      </a>
      <Link
        href="/oceneni"
        className="flex flex-1 items-center justify-center gap-2 bg-bronze py-3.5 text-sm font-semibold text-cream"
      >
        <Calculator className="h-4 w-4" aria-hidden="true" />
        Odhad zdarma
      </Link>
    </div>
  );
}
