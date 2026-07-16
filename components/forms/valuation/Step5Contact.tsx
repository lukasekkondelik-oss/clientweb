"use client";

import Link from "next/link";
import { Controller, useFormContext } from "react-hook-form";
import { FieldLabel, FieldError, inputClasses } from "@/components/forms/ui/FormField";
import { RadioCards } from "@/components/forms/ui/RadioCards";
import { preferredContactOptions, preferredTimeOptions } from "@/lib/validation";
import type { ValuationFormValues } from "@/lib/validation";

export function Step5Contact() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<ValuationFormValues>();

  return (
    <div>
      <h3 className="font-serif text-2xl text-charcoal">Kam vám mám poslat odpověď?</h3>
      <p className="mt-2 text-sm text-stone">
        Stačí telefon nebo e-mail – ozvu se vám osobně s orientačním odhadem.
      </p>

      <div className="mt-6 space-y-5">
        <div>
          <FieldLabel htmlFor="name">Jméno a příjmení</FieldLabel>
          <input
            id="name"
            type="text"
            autoComplete="name"
            className={inputClasses(!!errors.name)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            {...register("name")}
          />
          <FieldError id="name-error" message={errors.name?.message} />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <FieldLabel htmlFor="phone" optional>
              Telefon
            </FieldLabel>
            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              placeholder="+420 xxx xxx xxx"
              className={inputClasses(!!errors.phone)}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              {...register("phone")}
            />
            <FieldError id="phone-error" message={errors.phone?.message} />
          </div>
          <div>
            <FieldLabel htmlFor="email" optional>
              E-mail
            </FieldLabel>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="vas@email.cz"
              className={inputClasses(!!errors.email)}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              {...register("email")}
            />
            <FieldError id="email-error" message={errors.email?.message} />
          </div>
        </div>

        <div>
          <FieldLabel htmlFor="preferredContact">Preferovaný způsob kontaktu</FieldLabel>
          <Controller
            name="preferredContact"
            control={control}
            render={({ field }) => (
              <RadioCards
                name="Preferovaný způsob kontaktu"
                options={preferredContactOptions}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <FieldError id="preferredContact-error" message={errors.preferredContact?.message} />
        </div>

        <div>
          <FieldLabel htmlFor="preferredContactTime" optional>
            Preferovaný čas kontaktování
          </FieldLabel>
          <select
            id="preferredContactTime"
            className={inputClasses()}
            {...register("preferredContactTime")}
          >
            <option value="">Nezáleží</option>
            {preferredTimeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <FieldLabel htmlFor="note" optional>
            Poznámka
          </FieldLabel>
          <textarea
            id="note"
            rows={3}
            placeholder="Cokoliv, co bych měla vědět předem."
            className={inputClasses()}
            {...register("note")}
          />
        </div>

        {/* Honeypot pole – skryté před lidmi, boti ho typicky vyplní. */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="company">Nevyplňujte toto pole</label>
          <input
            id="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("company")}
          />
        </div>

        <div>
          <label className="flex items-start gap-3 text-sm text-charcoal">
            <input
              type="checkbox"
              className="mt-0.5 h-4 w-4 rounded border-line accent-bronze"
              aria-invalid={!!errors.consent}
              aria-describedby={errors.consent ? "consent-error" : undefined}
              {...register("consent")}
            />
            <span>
              Souhlasím se zpracováním osobních údajů za účelem vypracování odhadu a kontaktování
              v souvislosti s touto poptávkou. Více v{" "}
              <Link href="/zasady-ochrany-osobnich-udaju" className="text-bronze underline underline-offset-2">
                zásadách ochrany osobních údajů
              </Link>
              .
            </span>
          </label>
          <FieldError id="consent-error" message={errors.consent?.message} />
        </div>
      </div>
    </div>
  );
}
