"use client";

import { useFormContext } from "react-hook-form";
import { FieldLabel, inputClasses } from "@/components/forms/ui/FormField";
import type { ValuationFormValues } from "@/lib/validation";

const conditionOptions = [
  "Novostavba / po rekonstrukci",
  "Velmi dobrý stav",
  "Dobrý stav",
  "Potřebuje částečnou rekonstrukci",
  "Před rekonstrukcí",
];

const ownershipOptions = ["Osobní vlastnictví", "Družstevní vlastnictví", "Jiné / nejsem si jistý/á"];

type FieldKey =
  | "disposition"
  | "usableArea"
  | "landArea"
  | "propertyCondition"
  | "ownership"
  | "floor"
  | "hasElevator";

const fieldsByType: Record<string, FieldKey[]> = {
  byt: ["disposition", "usableArea", "floor", "hasElevator", "propertyCondition", "ownership"],
  "rodinny-dum": ["disposition", "usableArea", "landArea", "propertyCondition", "ownership"],
  pozemek: ["landArea", "ownership"],
  "rekreacni-objekt": ["disposition", "usableArea", "landArea", "propertyCondition", "ownership"],
  "komercni-nemovitost": ["usableArea", "propertyCondition", "ownership"],
  "jina-nemovitost": ["usableArea", "propertyCondition", "ownership"],
};

export function Step3Parameters() {
  const {
    register,
    watch,
  } = useFormContext<ValuationFormValues>();

  const propertyType = watch("propertyType");
  const visibleFields = fieldsByType[propertyType] ?? [];
  const show = (field: FieldKey) => visibleFields.includes(field);

  return (
    <div>
      <h3 className="font-serif text-2xl text-charcoal">Parametry nemovitosti</h3>
      <p className="mt-2 text-sm text-stone">
        Zobrazená pole odpovídají typu nemovitosti, který jste vybrali v prvním kroku. Vše je
        volitelné – čím více informací, tím přesnější bude orientační odhad.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {show("disposition") && (
          <div>
            <FieldLabel htmlFor="disposition" optional>
              Dispozice
            </FieldLabel>
            <input
              id="disposition"
              type="text"
              placeholder="např. 3+1"
              className={inputClasses()}
              {...register("disposition")}
            />
          </div>
        )}

        {show("usableArea") && (
          <div>
            <FieldLabel htmlFor="usableArea" optional>
              Užitná plocha (m²)
            </FieldLabel>
            <input
              id="usableArea"
              type="text"
              inputMode="numeric"
              placeholder="např. 85"
              className={inputClasses()}
              {...register("usableArea")}
            />
          </div>
        )}

        {show("landArea") && (
          <div>
            <FieldLabel htmlFor="landArea" optional>
              Plocha pozemku (m²)
            </FieldLabel>
            <input
              id="landArea"
              type="text"
              inputMode="numeric"
              placeholder="např. 650"
              className={inputClasses()}
              {...register("landArea")}
            />
          </div>
        )}

        {show("floor") && (
          <div>
            <FieldLabel htmlFor="floor" optional>
              Patro
            </FieldLabel>
            <input
              id="floor"
              type="text"
              placeholder="např. 3. patro ze 6"
              className={inputClasses()}
              {...register("floor")}
            />
          </div>
        )}

        {show("hasElevator") && (
          <div>
            <FieldLabel htmlFor="hasElevator" optional>
              Výtah v domě
            </FieldLabel>
            <select id="hasElevator" className={inputClasses()} {...register("hasElevator")}>
              <option value="">Nevím / neuvádět</option>
              <option value="ano">Ano</option>
              <option value="ne">Ne</option>
            </select>
          </div>
        )}

        {show("propertyCondition") && (
          <div>
            <FieldLabel htmlFor="propertyCondition" optional>
              Stav nemovitosti
            </FieldLabel>
            <select id="propertyCondition" className={inputClasses()} {...register("propertyCondition")}>
              <option value="">Vyberte stav</option>
              {conditionOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}

        {show("ownership") && (
          <div>
            <FieldLabel htmlFor="ownership" optional>
              Vlastnictví
            </FieldLabel>
            <select id="ownership" className={inputClasses()} {...register("ownership")}>
              <option value="">Vyberte typ vlastnictví</option>
              {ownershipOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="mt-5">
        <FieldLabel htmlFor="additionalInfo" optional>
          Doplňující informace
        </FieldLabel>
        <textarea
          id="additionalInfo"
          rows={3}
          placeholder="Cokoliv dalšího, co by mělo ocenění zohlednit."
          className={inputClasses()}
          {...register("additionalInfo")}
        />
      </div>
    </div>
  );
}
