"use client";

import { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { CheckCircle2, AlertTriangle, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Button } from "@/components/ui/Button";
import { Step1PropertyType } from "@/components/forms/valuation/Step1PropertyType";
import { Step2Location } from "@/components/forms/valuation/Step2Location";
import { Step3Parameters } from "@/components/forms/valuation/Step3Parameters";
import { Step4Situation } from "@/components/forms/valuation/Step4Situation";
import { Step5Contact } from "@/components/forms/valuation/Step5Contact";
import { valuationFormSchema, valuationStepFields, type ValuationFormValues } from "@/lib/validation";
import { submitValuationLead } from "@/lib/leads";
import { isDemoMode } from "@/lib/demo";

const TOTAL_STEPS = 5;

type Status = "idle" | "submitting" | "success" | "error";

export function ValuationWizard() {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const focusRef = useRef<HTMLDivElement>(null);

  const methods = useForm<ValuationFormValues>({
    resolver: zodResolver(valuationFormSchema),
    mode: "onTouched",
    defaultValues: {
      propertyType: "",
      city: "",
      street: "",
      postalCode: "",
      disposition: "",
      usableArea: "",
      landArea: "",
      propertyCondition: "",
      ownership: "",
      floor: "",
      hasElevator: "",
      additionalInfo: "",
      clientSituation: "",
      name: "",
      phone: "",
      email: "",
      preferredContact: "telefon",
      preferredContactTime: "",
      note: "",
      consent: false,
      company: "",
    },
  });

  const { trigger, handleSubmit } = methods;

  useEffect(() => {
    focusRef.current?.focus();
  }, [step, status]);

  useEffect(() => {
    if (!isDemoMode()) return;
    const handler = (event: Event) => {
      const custom = event as CustomEvent<{ result: "success" | "error" }>;
      setStep(TOTAL_STEPS);
      if (custom.detail?.result === "success") {
        setStatus("success");
      } else {
        setErrorMessage("Demo: ukázka chybového stavu odeslání formuláře.");
        setStatus("error");
      }
    };
    window.addEventListener("demo:force-result", handler);
    return () => window.removeEventListener("demo:force-result", handler);
  }, []);

  const goNext = async () => {
    const fields = valuationStepFields[step as 1 | 2 | 3 | 4 | 5];
    const valid = await trigger(fields as (keyof ValuationFormValues)[]);
    if (valid && step < TOTAL_STEPS) setStep((s) => s + 1);
  };

  const goBack = () => {
    if (step > 1) setStep((s) => s - 1);
  };

  const onSubmit = async (values: ValuationFormValues) => {
    if (values.company) return; // honeypot triggered – tichý no-op
    setStatus("submitting");
    setErrorMessage("");
    const result = await submitValuationLead(values);
    if (result.ok) {
      setStatus("success");
    } else {
      setStatus("error");
      setErrorMessage(result.message);
    }
  };

  if (status === "success") {
    return (
      <div ref={focusRef} tabIndex={-1} className="rounded-3xl border border-line bg-white p-8 text-center sm:p-12">
        <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-600" aria-hidden="true" />
        <h3 className="mt-5 font-serif text-2xl text-charcoal sm:text-3xl">Děkuji</h3>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-stone">
          Informace o vaší nemovitosti jsem obdržela. Ozvu se vám co nejdříve a společně
          probereme její hodnotu i možné další kroky.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/kontakt#rezervace" size="md">
            Rovnou rezervovat konzultaci
          </Button>
          <Button
            variant="secondary"
            size="md"
            onClick={() => {
              methods.reset();
              setStep(1);
              setStatus("idle");
            }}
          >
            Vyplnit další odhad
          </Button>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div ref={focusRef} tabIndex={-1} className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center sm:p-12">
        <AlertTriangle className="mx-auto h-12 w-12 text-red-600" aria-hidden="true" />
        <h3 className="mt-5 font-serif text-2xl text-charcoal">Něco se nepovedlo</h3>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-stone">
          {errorMessage || "Odeslání formuláře se nezdařilo. Zkuste to prosím znovu, nebo mě kontaktujte přímo telefonicky či e-mailem."}
        </p>
        <div className="mt-8">
          <Button size="md" onClick={() => setStatus("idle")}>
            Zkusit znovu
          </Button>
        </div>
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-3xl border border-line bg-white p-6 sm:p-10"
        noValidate
      >
        <ProgressBar step={step} totalSteps={TOTAL_STEPS} />

        <div ref={focusRef} tabIndex={-1} className="mt-8 outline-none">
          {step === 1 && <Step1PropertyType />}
          {step === 2 && <Step2Location />}
          {step === 3 && <Step3Parameters />}
          {step === 4 && <Step4Situation />}
          {step === 5 && <Step5Contact />}
        </div>

        <div className="mt-10 flex items-center justify-between border-t border-line pt-6">
          <Button
            type="button"
            variant="ghost"
            size="md"
            onClick={goBack}
            className={step === 1 ? "invisible" : ""}
          >
            <ChevronLeft className="h-4 w-4" /> Zpět
          </Button>

          {step < TOTAL_STEPS ? (
            <Button type="button" size="md" onClick={goNext}>
              Pokračovat <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button type="submit" size="md" disabled={status === "submitting"}>
              {status === "submitting" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Odesílám…
                </>
              ) : (
                "Odeslat poptávku ocenění"
              )}
            </Button>
          )}
        </div>
      </form>
    </FormProvider>
  );
}
