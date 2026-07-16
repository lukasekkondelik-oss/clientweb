import { cn } from "@/lib/utils";

const toneClasses = {
  bronze: "bg-bronze/10 text-bronze border-bronze/20",
  charcoal: "bg-charcoal text-cream border-charcoal",
  cream: "bg-cream text-charcoal border-line",
  success: "bg-emerald-50 text-emerald-700 border-emerald-200",
  neutral: "bg-stone-light/10 text-stone border-stone-light/30",
  warning: "bg-amber-50 text-amber-800 border-amber-200",
};

export function Badge({
  children,
  tone = "bronze",
  className,
}: {
  children: React.ReactNode;
  tone?: keyof typeof toneClasses;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium tracking-wide",
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
