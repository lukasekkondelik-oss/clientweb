import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function RadioCards({
  name,
  options,
  value,
  onChange,
  columns = 2,
}: {
  name: string;
  options: readonly { value: string; label: string }[];
  value: string | undefined;
  onChange: (value: string) => void;
  columns?: 2 | 3;
}) {
  return (
    <div
      role="radiogroup"
      aria-label={name}
      className={cn("grid gap-3", columns === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2")}
    >
      {options.map((option) => {
        const isSelected = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onChange(option.value)}
            className={cn(
              "flex items-center justify-between gap-3 rounded-xl border px-4 py-3.5 text-left text-sm font-medium transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-bronze/40",
              isSelected
                ? "border-bronze bg-bronze/8 text-charcoal"
                : "border-line bg-white text-charcoal/80 hover:border-bronze/40",
            )}
          >
            {option.label}
            <span
              className={cn(
                "flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border",
                isSelected ? "border-bronze bg-bronze text-cream" : "border-line",
              )}
            >
              {isSelected && <Check className="h-3.5 w-3.5" />}
            </span>
          </button>
        );
      })}
    </div>
  );
}
