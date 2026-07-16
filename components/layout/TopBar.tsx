import { Phone, Mail, MapPin } from "lucide-react";
import { contact } from "@/data/contact";

export function TopBar() {
  return (
    <div className="hidden bg-ink text-cream/80 sm:block">
      <div className="container-page flex h-9 items-center justify-between text-xs">
        <span className="tracking-wide">
          {contact.experienceYears} let zkušeností s prodejem nemovitostí
        </span>
        <div className="flex items-center gap-5">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-bronze-soft" aria-hidden="true" />
            {contact.region}
          </span>
          <a href={contact.phoneHref} className="inline-flex items-center gap-1.5 hover:text-cream">
            <Phone className="h-3.5 w-3.5 text-bronze-soft" aria-hidden="true" />
            {contact.phone}
          </a>
          <a href={contact.emailHref} className="inline-flex items-center gap-1.5 hover:text-cream">
            <Mail className="h-3.5 w-3.5 text-bronze-soft" aria-hidden="true" />
            {contact.email}
          </a>
        </div>
      </div>
    </div>
  );
}
