"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CheckCircle2, AlertTriangle, Loader2 } from "lucide-react";
import { FieldLabel, FieldError, inputClasses } from "@/components/forms/ui/FormField";
import { Button } from "@/components/ui/Button";
import { contactFormSchema, type ContactFormValues } from "@/lib/validation";
import { submitContactLead } from "@/lib/leads";
import { isDemoMode } from "@/lib/demo";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    mode: "onTouched",
    defaultValues: { name: "", phone: "", email: "", message: "", consent: false, company: "" },
  });

  useEffect(() => {
    if (!isDemoMode()) return;
    const handler = (event: Event) => {
      const custom = event as CustomEvent<{ result: "success" | "error" }>;
      if (custom.detail?.result === "success") setStatus("success");
      else {
        setErrorMessage("Demo: ukázka chybového stavu odeslání formuláře.");
        setStatus("error");
      }
    };
    window.addEventListener("demo:force-result", handler);
    return () => window.removeEventListener("demo:force-result", handler);
  }, []);

  const onSubmit = async (values: ContactFormValues) => {
    if (values.company) return;
    setStatus("submitting");
    setErrorMessage("");
    const result = await submitContactLead(values);
    if (result.ok) {
      setStatus("success");
    } else {
      setStatus("error");
      setErrorMessage(result.message);
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-3xl border border-line bg-white p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-600" aria-hidden="true" />
        <h3 className="mt-4 font-serif text-2xl text-charcoal">Zpráva odeslána</h3>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-stone">
          Děkuji za zprávu. Ozvu se vám co nejdříve.
        </p>
        <Button
          variant="secondary"
          size="md"
          className="mt-6"
          onClick={() => {
            reset();
            setStatus("idle");
          }}
        >
          Odeslat další zprávu
        </Button>
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 rounded-3xl border border-line bg-white p-6 sm:p-8" noValidate>
      <div>
        <FieldLabel htmlFor="contact-name">Jméno a příjmení</FieldLabel>
        <input
          id="contact-name"
          type="text"
          autoComplete="name"
          className={inputClasses(!!errors.name)}
          aria-invalid={!!errors.name}
          {...register("name")}
        />
        <FieldError id="contact-name-error" message={errors.name?.message} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <FieldLabel htmlFor="contact-phone" optional>
            Telefon
          </FieldLabel>
          <input
            id="contact-phone"
            type="tel"
            autoComplete="tel"
            className={inputClasses()}
            {...register("phone")}
          />
        </div>
        <div>
          <FieldLabel htmlFor="contact-email">E-mail</FieldLabel>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            className={inputClasses(!!errors.email)}
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          <FieldError id="contact-email-error" message={errors.email?.message} />
        </div>
      </div>

      <div>
        <FieldLabel htmlFor="contact-message">Zpráva</FieldLabel>
        <textarea
          id="contact-message"
          rows={4}
          className={inputClasses(!!errors.message)}
          aria-invalid={!!errors.message}
          {...register("message")}
        />
        <FieldError id="contact-message-error" message={errors.message?.message} />
      </div>

      <div className="hidden" aria-hidden="true">
        <label htmlFor="contact-company">Nevyplňujte toto pole</label>
        <input id="contact-company" type="text" tabIndex={-1} autoComplete="off" {...register("company")} />
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
            Souhlasím se zpracováním osobních údajů za účelem vyřízení mé poptávky. Více v{" "}
            <Link href="/zasady-ochrany-osobnich-udaju" className="text-bronze underline underline-offset-2">
              zásadách ochrany osobních údajů
            </Link>
            .
          </span>
        </label>
        <FieldError id="contact-consent-error" message={errors.consent?.message} />
      </div>

      <Button type="submit" size="md" disabled={status === "submitting"} className="w-full sm:w-auto">
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Odesílám…
          </>
        ) : (
          "Odeslat zprávu"
        )}
      </Button>
    </form>
  );
}
