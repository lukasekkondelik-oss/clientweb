import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "dark",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em]",
            tone === "dark" ? "text-bronze" : "text-bronze-soft",
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "font-serif text-3xl leading-tight sm:text-4xl lg:text-[2.75rem]",
          tone === "dark" ? "text-charcoal" : "text-cream",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed sm:text-lg",
            tone === "dark" ? "text-stone" : "text-cream/75",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
