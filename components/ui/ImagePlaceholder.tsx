import { Camera, User } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Kultivovaný placeholder pro fotografie, které v prototypu nejsou
 * k dispozici (reálné fotky Romany a nemovitostí nebylo možné z důvodu
 * nedostupnosti zdrojového webu v tomto prostředí získat).
 *
 * TODO: jakmile budou k dispozici reálné fotografie, nahraďte tuto
 * komponentu <Image /> z next/image se skutečným souborem z /public.
 */
export function ImagePlaceholder({
  label,
  variant = "photo",
  aspect = "aspect-[4/5]",
  className,
}: {
  label: string;
  variant?: "photo" | "portrait";
  aspect?: string;
  className?: string;
}) {
  const Icon = variant === "portrait" ? User : Camera;

  return (
    <div
      role="img"
      aria-label={label}
      data-placeholder="true"
      className={cn(
        "relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-line bg-gradient-to-br from-cream-soft via-cream to-bronze/10 text-stone",
        aspect,
        className,
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(166,119,79,0.14),transparent_55%)]" />
      <Icon className="relative h-9 w-9 text-bronze/50" strokeWidth={1.25} aria-hidden="true" />
      <span className="relative mt-3 max-w-[80%] text-center text-[11px] font-medium uppercase tracking-wide text-stone/70">
        Placeholder fotografie
      </span>
      <span className="sr-only">{label}</span>
    </div>
  );
}
