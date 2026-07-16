"use client";

import { useFormContext } from "react-hook-form";
import { FieldLabel, FieldError, inputClasses } from "@/components/forms/ui/FormField";
import type { ValuationFormValues } from "@/lib/validation";

export function Step2Location() {
  const {
    register,
    formState: { errors },
  } = useFormContext<ValuationFormValues>();

  return (
    <div>
      <h3 className="font-serif text-2xl text-charcoal">Kde se nemovitost nachází?</h3>
      <p className="mt-2 text-sm text-stone">Stačí orientační lokalita, detaily doplníme společně.</p>

      <div className="mt-6 space-y-5">
        <div>
          <FieldLabel htmlFor="city">Město nebo obec</FieldLabel>
          <input
            id="city"
            type="text"
            placeholder="např. Praha"
            className={inputClasses(!!errors.city)}
            aria-invalid={!!errors.city}
            aria-describedby={errors.city ? "city-error" : undefined}
            {...register("city")}
          />
          <FieldError id="city-error" message={errors.city?.message} />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <FieldLabel htmlFor="street" optional>
              Ulice
            </FieldLabel>
            <input
              id="street"
              type="text"
              placeholder="např. Vinohradská"
              className={inputClasses()}
              {...register("street")}
            />
          </div>
          <div>
            <FieldLabel htmlFor="postalCode" optional>
              PSČ
            </FieldLabel>
            <input
              id="postalCode"
              type="text"
              placeholder="např. 120 00"
              className={inputClasses()}
              {...register("postalCode")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
