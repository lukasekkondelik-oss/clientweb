"use client";

import { Controller, useFormContext } from "react-hook-form";
import { RadioCards } from "@/components/forms/ui/RadioCards";
import { FieldError } from "@/components/forms/ui/FormField";
import { clientSituationOptions } from "@/lib/validation";
import type { ValuationFormValues } from "@/lib/validation";

export function Step4Situation() {
  const {
    control,
    formState: { errors },
  } = useFormContext<ValuationFormValues>();

  return (
    <div>
      <h3 className="font-serif text-2xl text-charcoal">Jaká je vaše aktuální situace?</h3>
      <p className="mt-2 text-sm text-stone">Pomůže mi to navrhnout další krok, který dává smysl.</p>

      <div className="mt-6">
        <Controller
          name="clientSituation"
          control={control}
          render={({ field }) => (
            <RadioCards
              name="Situace majitele"
              options={clientSituationOptions}
              value={field.value}
              onChange={field.onChange}
              columns={2}
            />
          )}
        />
        <FieldError id="clientSituation-error" message={errors.clientSituation?.message} />
      </div>
    </div>
  );
}
