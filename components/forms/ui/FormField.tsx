import { cn } from "@/lib/utils";

export function FieldLabel({
  htmlFor,
  children,
  optional,
}: {
  htmlFor: string;
  children: React.ReactNode;
  optional?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-charcoal">
      {children}
      {optional && <span className="ml-1.5 font-normal text-stone-light">(volitelné)</span>}
    </label>
  );
}

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-sm text-red-700">
      {message}
    </p>
  );
}

export const inputClasses = (hasError?: boolean) =>
  cn(
    "w-full rounded-xl border bg-white px-4 py-3 text-sm text-charcoal placeholder:text-stone-light focus:outline-none focus:ring-2 focus:ring-bronze/40",
    hasError ? "border-red-400" : "border-line focus:border-bronze",
  );
