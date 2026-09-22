import { useId } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, Check, ChevronDown } from "lucide-react";
import { vehicles } from "@/data/vehicles";
import {
  modelOf,
  unique,
  matchingVehicles,
  type SearchKey,
  type VehicleSearch,
} from "@/lib/vehicle-search";
type Props = { value: VehicleSearch; onChange: (value: VehicleSearch) => void };
export function ConditionTabs({ value, onChange }: Props) {
  return (
    <div className="v3-tabs" aria-label="Starea mașinii">
      {(
        [
          ["", "Toate"],
          ["nou", "Noi"],
          ["rulat", "Rulate"],
        ] as const
      ).map(([key, label]) => (
        <button
          type="button"
          key={label}
          aria-pressed={(value.condition || "") === key}
          onClick={() => {
            const next = { ...value, condition: key };
            if (key === "nou") {
              delete next.minKm;
              delete next.maxKm;
            }
            onChange(next);
          }}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
const budgets = [
  ["25000", "25.000 €"],
  ["40000", "40.000 €"],
  ["60000", "60.000 €"],
  ["", "Orice buget"],
] as const;
export function BudgetFilter({ value, onChange }: Props) {
  return (
    <fieldset className="ak-budget">
      <legend>Buget maxim</legend>
      <div>
        {budgets.map(([max, label]) => (
          <button
            type="button"
            key={label}
            aria-pressed={!value.minPrice && (value.maxPrice || "") === max}
            onClick={() => {
              const next = { ...value, maxPrice: max };
              delete next.minPrice;
              onChange(next);
            }}
          >
            <strong>{label}</strong>
            {!value.minPrice && (value.maxPrice || "") === max && <Check size={16} aria-hidden />}
          </button>
        ))}
      </div>
      <details className="ak-budget-interval" open={Boolean(value.minPrice)}>
        <summary>
          <span>Alege alt interval de preț</span>
          <ChevronDown size={18} aria-hidden="true" />
        </summary>
        <label className="v3-field">
          <span className="sr-only">Interval de preț</span>
          <select
            aria-label="Interval de preț"
            value={`${value.minPrice || ""}:${value.maxPrice || ""}`}
            onChange={(e) => {
              const [min = "", max = ""] = e.target.value.split(":");
              onChange({ ...value, minPrice: min, maxPrice: max });
            }}
          >
            <option value=":">Orice buget</option>
            {[
              [":25000", "Maximum 25.000 €"],
              [":40000", "Maximum 40.000 €"],
              [":60000", "Maximum 60.000 €"],
              ["25000:40000", "25.000–40.000 €"],
              ["40000:60000", "40.000–60.000 €"],
              ["60000:80000", "60.000–80.000 €"],
              ["80000:100000", "80.000–100.000 €"],
              ["100000:", "Peste 100.000 €"],
            ].map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </details>
      <p>Prețuri cu TVA inclus</p>
    </fieldset>
  );
}
export function BasicFilters({ value, onChange }: Props) {
  const id = useId();
  return (
    <div className="ak-basic-filters">
      <BudgetFilter value={value} onChange={onChange} />
      <div className="v3-search-fields">
        <label className="v3-field ak-brand-field">
          <span>Marcă</span>
          <select
            aria-label="Marcă"
            name="brand"
            value={value.brand || ""}
            onChange={(e) => {
              const next = { ...value, brand: e.target.value };
              for (const key of [
                "model",
                "fuel",
                "body",
                "gearbox",
                "drive",
                "branch",
                "color",
                "equipment",
              ] as const)
                delete next[key];
              onChange(next);
            }}
          >
            <option value="">Toate mărcile</option>
            {["Mercedes-Benz", "Audi", "Volkswagen", "Honda", "XPENG"].map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </label>
        <label className="v3-field ak-model-field" htmlFor={`${id}-model`}>
          <span>Model</span>
          <select
            id={`${id}-model`}
            aria-label="Model"
            name="model"
            disabled={!value.brand}
            value={value.model || ""}
            onChange={(e) => onChange({ ...value, model: e.target.value })}
          >
            <option value="">{value.brand ? "Toate modelele" : "Alege marca"}</option>
            {unique(
              vehicles.filter((v) => !value.brand || v.brand === value.brand).map(modelOf),
            ).map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
        </label>
        <fieldset className="ak-condition-field">
          <legend className="ak-filter-label">Stare</legend>
          <ConditionTabs value={value} onChange={onChange} />
        </fieldset>
      </div>
    </div>
  );
}
export function AdvancedFilters({ value, onChange }: Props) {
  const set = (key: SearchKey, v: string) => onChange({ ...value, [key]: v });
  const candidates = (key: SearchKey) => {
    const next = { ...value };
    delete next[key];
    delete next.q;
    return matchingVehicles(next);
  };
  const select = (key: SearchKey, label: string, options: string[] | string[][]) => (
    <label className="v3-field">
      <span>{label}</span>
      <select
        aria-label={label}
        name={key}
        value={value[key] || ""}
        onChange={(e) => set(key, e.target.value)}
      >
        <option value="">Toate</option>
        {options.map((o) => {
          const [val, text] = Array.isArray(o) ? o : [o, o];
          return (
            <option key={val} value={val}>
              {text}
            </option>
          );
        })}
      </select>
    </label>
  );
  const range = (low: SearchKey, high: SearchKey, label: string, options: string[][]) => (
    <label className="v3-field">
      <span>{label}</span>
      <select
        aria-label={label}
        name={low}
        value={`${value[low] || ""}:${value[high] || ""}`}
        onChange={(e) => {
          const [min, max] = e.target.value.split(":");
          onChange({ ...value, [low]: min, [high]: max });
        }}
      >
        <option value=":">Orice interval</option>
        {options.map(([key, text]) => (
          <option key={key} value={key}>
            {text}
          </option>
        ))}
      </select>
    </label>
  );
  return (
    <div className="ak-advanced-filters">
      <div className="v3-grid">
        {range("minYear", "maxYear", "An fabricație", [
          ["2025:", "2025 sau mai recent"],
          ["2022:2024", "2022–2024"],
          ["2019:2021", "2019–2021"],
          [":2018", "2018 sau anterior"],
        ])}
        {value.condition !== "nou" &&
          range("minKm", "maxKm", "Kilometraj", [
            [":25000", "Sub 25.000 km"],
            ["25000:50000", "25.000–50.000 km"],
            ["50000:100000", "50.000–100.000 km"],
            ["100000:", "Peste 100.000 km"],
          ])}
        {select(
          "fuel",
          "Motorizare",
          unique(candidates("fuel").map((v) => (v.hybrid ? "Hibrid" : v.fuel))),
        )}
        {select("body", "Caroserie", unique(candidates("body").map((v) => v.bodyType)))}
      </div>
      <details
        className="v3-disclosure"
        open={Boolean(
          value.gearbox || value.drive || value.color || value.certified || value.equipment,
        )}
      >
        <summary>Echipare și confort</summary>
        <div className="v3-grid">
          {select("gearbox", "Transmisie", unique(candidates("gearbox").map((v) => v.gearbox)))}
          {select(
            "drive",
            "Tracțiune",
            unique(
              candidates("drive")
                .map((v) => v.drive)
                .filter(Boolean),
            ).map((v) => [
              v,
              ({ AWD: "Integrală", FWD: "Față", RWD: "Spate" } as Record<string, string>)[v] || v,
            ]),
          )}
          {select(
            "color",
            "Culoare",
            unique(candidates("color").flatMap((v) => (v.color ? [v.color] : []))),
          )}
          {select("certified", "Certificare", [["yes", "Mercedes-Benz Certified"]])}
          {select(
            "equipment",
            "Dotare esențială",
            ["Cameră", "Scaune", "CarPlay", "Panoramic", "Navigație", "LED"].filter(
              (term) => matchingVehicles({ ...value, equipment: term }).length > 0,
            ),
          )}
        </div>
      </details>
      <details
        className="v3-disclosure"
        open={Boolean(
          value.minPower ||
          value.maxPower ||
          value.minEngine ||
          value.maxEngine ||
          value.minRange ||
          value.minCharge,
        )}
      >
        <summary>Performanță și autonomie</summary>
        <div className="v3-grid">
          {range("minPower", "maxPower", "Putere", [
            [":150", "Maximum 150 CP"],
            ["150:250", "150–250 CP"],
            ["250:400", "250–400 CP"],
            ["400:", "Peste 400 CP"],
          ])}
          {value.fuel !== "Electric" &&
            range("minEngine", "maxEngine", "Cilindree", [
              [":1600", "Maximum 1.600 cm³"],
              ["1600:2000", "1.600–2.000 cm³"],
              ["2000:", "Peste 2.000 cm³"],
            ])}
          {candidates("minRange").some((v) => v.rangeKm) && (
            <>
              {select("minRange", "Autonomie WLTP", [
                ["400", "Cel puțin 400 km"],
                ["500", "Cel puțin 500 km"],
                ["600", "Cel puțin 600 km"],
              ])}
              {select("minCharge", "Încărcare DC", [
                ["150", "Cel puțin 150 kW"],
                ["250", "Cel puțin 250 kW"],
              ])}
            </>
          )}
        </div>
      </details>
      <details
        className="v3-disclosure"
        open={Boolean(value.branch || value.availability || value.vat || value.offer)}
      >
        <summary>Locație și disponibilitate</summary>
        <div className="v3-grid">
          {select("branch", "Sucursală", unique(candidates("branch").map((v) => v.branch)))}
          {select("availability", "Disponibilitate", [
            ["immediate", "Livrare imediată"],
            ["stock", "În stoc"],
            ["unknown", "De confirmat"],
          ])}
          {select("vat", "TVA", [
            ["deductibil", "Deductibil"],
            ["nedeductibil", "Nedeductibil"],
          ])}
          {select("offer", "Oferte", [["yes", "Cu preț redus"]])}
        </div>
      </details>
    </div>
  );
}
export function FilterPanel({
  value,
  onChange,
  open,
  onOpenChange,
  returnFocus,
  onApply,
}: Props & {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  returnFocus: React.RefObject<HTMLButtonElement | null>;
  onApply?: () => void;
}) {
  const count = matchingVehicles(value).length;
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="v3-shell-overlay" />
        <Dialog.Content
          className="v3 v3-panel"
          aria-describedby={undefined}
          onCloseAutoFocus={(e) => {
            e.preventDefault();
            returnFocus.current?.focus();
          }}
        >
          <div className="v3-panel-head">
            <Dialog.Title>Filtrează mașinile</Dialog.Title>
            <Dialog.Close className="v3-icon" aria-label="Închide filtrele">
              <X size={22} />
            </Dialog.Close>
          </div>
          <div className="v3-panel-body">
            <BasicFilters value={value} onChange={onChange} />
            <AdvancedFilters value={value} onChange={onChange} />
            <button className="v3-link mt-4" onClick={() => onChange({})}>
              Resetează toate filtrele
            </button>
          </div>
          <div className="v3-panel-foot">
            <Dialog.Close className="v3-button" onClick={onApply}>
              {count ? `Vezi ${count} ${count === 1 ? "mașină" : "mașini"}` : "Vezi alternative"}
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
