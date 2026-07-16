"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CheckCircle2, AlertTriangle, Loader2, CalendarCheck } from "lucide-react";
import { FieldLabel, FieldError, inputClasses } from "@/components/forms/ui/FormField";
import { Button } from "@/components/ui/Button";
import { viewingFormSchema, type ViewingFormValues } from "@/lib/validation";
import { submitViewingLead } from "@/lib/leads";
import { isDemoMode } from "@/lib/demo";

type Status = "idle" | "submitting" | "success" | "error";

export function ViewingForm({ property }: { property: { slug: string; title: string } }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ViewingFormValues>({
    resolver: zodResolver(viewingFormSchema),
    mode: "onTouched",
    defaultValues: { name: "", phone: "", email: "", preferredDate: "", note: "", consent: false, company: "" },
  });

  useEffect(() => {
    if (!isDemoMode()) return;
    const handler = (event: Event) => {
      const custom = event as CustomEvent<{ result: "success" | "error" }>;
      setOpen(true);
      if (custom.detail?.result === "success") setStatus("success");
      else {
        setErrorMessage("Demo: ukázka chybového stavu odeslání formuláře.");
        setStatus("error");
      }
    };
    window.addEventListener("demo:force-result", handler);
    return () => window.removeEventListener("demo:force-result", handler);
  }, []);

  const onSubmit = async (values: ViewingFormValues) => {
    if (values.company) return;
    setStatus("submitting");
    setErrorMessage("");
    const result = await submitViewingLead(values, property);
    if (result.ok) setStatus("success");
    else {
      setStatus("error");
      setErrorMessage(result.message);
    }
  };

  if (!open) {
    return (
      <Button size="lg" onClick={() => setOpen(true)} className="w-full sm:w-auto">
        Domluvit prohlídku
      </Button>
    );
  }

  if (status === "success") {
    return (
      <div className="rounded-3xl border border-line bg-white p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-600" aria-hidden="true" />
        <h3 className="mt-4 font-serif text-2xl text-charcoal">Poptávka prohlídky odeslána</h3>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-stone">
          Děkuji, ozvu se vám s návrhem termínu prohlídky nemovitosti „{property.title}“.
        </p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center">
        <AlertTriangle className="mx-auto h-10 w-10 text-red-600" aria-hidden="true" />
        <h3 className="mt-4 font-serif text-2xl text-charcoal">Nepodařilo se odeslat</h3>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-stone">
          {errorMessage || "Zkuste to prosím znovu, nebo mě kontaktujte přímo telefonicky."}
        </p>
        <Button size="md" className="mt-6" onClick={() => setStatus("idle")}>
          Zkusit znovu
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 rounded-3xl border border-line bg-white p-6 sm:p-8"
      noValidate
    >
      <div className="flex items-center gap-2 text-bronze">
        <CalendarCheck className="h-5 w-5" aria-hidden="true" />
        <p className="text-sm font-medium">Prohlídka: {property.title}</p>
      </div>

      <div>
        <FieldLabel htmlFor="viewing-name">Jméno a příjmení</FieldLabel>
        <input
          id="viewing-name"
          type="text"
          autoComplete="name"
          className={inputClasses(!!errors.name)}
          aria-invalid={!!errors.name}
          {...register("name")}
        />
        <FieldError id="viewing-name-error" message={errors.name?.message} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <FieldLabel htmlFor="viewing-phone">Telefon</FieldLabel>
          <input
            id="viewing-phone"
            type="tel"
            autoComplete="tel"
            className={inputClasses(!!errors.phone)}
            aria-invalid={!!errors.phone}
            {...register("phone")}
          />
          <FieldError id="viewing-phone-error" message={errors.phone?.message} />
        </div>
        <div>
          <FieldLabel htmlFor="viewing-email">E-mail</FieldLabel>
          <input
            id="viewing-email"
            type="email"
            autoComplete="email"
            className={inputClasses(!!errors.email)}
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          <FieldError id="viewing-email-error" message={errors.email?.message} />
        </div>
      </div>

      <div>
        <FieldLabel htmlFor="viewing-date" optional>
          Preferovaný termín
        </FieldLabel>
        <input id="viewing-date" type="text" placeholder="např. tento týden odpoledne" className={inputClasses()} {...register("preferredDate")} />
      </div>

      <div>
        <FieldLabel htmlFor="viewing-note" optional>
          Poznámka
        </FieldLabel>
        <textarea id="viewing-note" rows={3} className={inputClasses()} {...register("note")} />
      </div>

      <div className="hidden" aria-hidden="true">
        <label htmlFor="viewing-company">Nevyplňujte toto pole</label>
        <input id="viewing-company" type="text" tabIndex={-1} autoComplete="off" {...register("company")} />
      </div>

      <div>
        <label className="flex items-start gap-3 text-sm text-charcoal">
          <input
            type="checkbox"
            className="mt-0.5 h-4 w-4 rounded border-line accent-bronze"
            aria-invalid={!!errors.consent}
            {...register("consent")}
          />
          <span>
            Souhlasím se zpracováním osobních údajů za účelem domluvení prohlídky. Více v{" "}
            <Link href="/zasady-ochrany-osobnich-udaju" className="text-bronze underline underline-offset-2">
              zásadách ochrany osobních údajů
            </Link>
            .
          </span>
        </label>
        <FieldError id="viewing-consent-error" message={errors.consent?.message} />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button type="submit" size="md" disabled={status === "submitting"}>
          {status === "submitting" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Odesílám…
            </>
          ) : (
            "Odeslat poptávku prohlídky"
          )}
        </Button>
        <Button type="button" variant="ghost" size="md" onClick={() => setOpen(false)}>
          Zrušit
        </Button>
      </div>
    </form>
  );
}
