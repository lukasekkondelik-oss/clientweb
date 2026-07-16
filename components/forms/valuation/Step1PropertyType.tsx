"use client";

import { Controller, useFormContext } from "react-hook-form";
import { RadioCards } from "@/components/forms/ui/RadioCards";
import { FieldError } from "@/components/forms/ui/FormField";
import { propertyTypeOptions } from "@/lib/validation";
import type { ValuationFormValues } from "@/lib/validation";

export function Step1PropertyType() {
  const {
    control,
    formState: { errors },
  } = useFormContext<ValuationFormValues>();

  return (
    <div>
      <h3 className="font-serif text-2xl text-charcoal">Jakou nemovitost oceňujeme?</h3>
      <p className="mt-2 text-sm text-stone">Vyberte typ nemovitosti, který nejlépe odpovídá vaší situaci.</p>

      <div className="mt-6">
        <Controller
          name="propertyType"
          control={control}
          render={({ field }) => (
            <RadioCards
              name="Typ nemovitosti"
              options={propertyTypeOptions}
              value={field.value}
              onChange={field.onChange}
              columns={3}
            />
          )}
        />
        <FieldError id="propertyType-error" message={errors.propertyType?.message} />
      </div>
    </div>
  );
}
