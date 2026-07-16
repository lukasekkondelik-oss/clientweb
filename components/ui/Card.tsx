import { cn } from "@/lib/utils";

export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-line bg-white/60 p-6 shadow-[0_1px_2px_rgba(28,27,25,0.04)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
