import Link from "next/link";
import { MapPin, ArrowUpRight } from "lucide-react";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Badge } from "@/components/ui/Badge";
import { formatPrice, propertyTypeLabels, propertyStatusLabels } from "@/lib/utils";
import type { Property } from "@/types/property";

const statusTone = {
  "v-nabidce": "bronze",
  rezervovano: "warning",
  prodano: "neutral",
  pronajato: "neutral",
} as const;

export function PropertyCard({ property }: { property: Property }) {
  const price = formatPrice(property.price);

  return (
    <Link
      href={`/nemovitosti/${property.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition-shadow duration-300 hover:shadow-[0_12px_32px_rgba(28,27,25,0.08)]"
    >
      <div className="relative">
        <ImagePlaceholder
          label={property.images[0]?.alt ?? property.title}
          aspect="aspect-[4/3]"
          className="rounded-none rounded-t-2xl"
        />
        <div className="absolute left-3 top-3 flex gap-2">
          <Badge tone={statusTone[property.status]}>{propertyStatusLabels[property.status]}</Badge>
          {property.isDemoData && <Badge tone="neutral">Ukázková data</Badge>}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <span className="text-xs font-medium uppercase tracking-wide text-bronze">
          {propertyTypeLabels[property.type]}
        </span>
        <h3 className="mt-1.5 font-serif text-lg text-charcoal">{property.title}</h3>
        <p className="mt-1.5 inline-flex items-center gap-1.5 text-sm text-stone">
          <MapPin className="h-3.5 w-3.5 text-bronze" aria-hidden="true" />
          {property.city}
          {property.district ? `, ${property.district}` : ""}
        </p>

        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-stone">
          {property.disposition && <span>{property.disposition}</span>}
          {property.usableArea && <span>{property.usableArea} m²</span>}
        </div>

        <div className="mt-auto flex items-center justify-between pt-5">
          <span className="font-serif text-lg text-charcoal">
            {price ?? property.priceNote ?? "Cena na vyžádání"}
          </span>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-bronze">
            Detail
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
