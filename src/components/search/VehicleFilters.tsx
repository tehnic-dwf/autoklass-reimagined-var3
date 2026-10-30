import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Search, X } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { ClassicSelect } from "@/components/ui/ClassicSelect";
import { SelectedVehicleFilters } from "./SelectedVehicleFilters";
import { vehicles } from "@/data/vehicles";
import {
  modelOf,
  macroColorOf,
  vehicleBranchGroups,
  unique,
  matchingVehicles,
  suggestedVehicles,
  removeVehicleFilterChip,
  resetVehicleFilters,
  vehicleFilterChips,
  type SearchKey,
  type VehicleSearch,
} from "@/lib/vehicle-search";
type Props = { value: VehicleSearch; onChange: (value: VehicleSearch) => void };

const equipmentGroups = [
  {
    name: "Confort și interior",
    options: [
      "Scaune față încălzite",
      "Trapă panoramică",
      "Volan încălzit",
      "Iluminare ambientală",
      "Scaune față reglabile electric",
      "Banchetă spate rabatabilă",
      "Climatizare",
    ],
  },
  {
    name: "Siguranță și asistență",
    options: [
      "Cameră 360°",
      "Monitorizarea unghiului mort",
      "Recunoașterea semnelor de circulație",
      "Asistent activ la frânare",
      "Asistent activ pentru menținerea benzii",
      "Monitorizarea presiunii în anvelope",
      "Faruri DIGITAL LIGHT",
    ],
  },
  {
    name: "Multimedia și conectivitate",
    options: [
      "Apple CarPlay",
      "Android Auto",
      "Navigație",
      "Încărcare wireless pentru telefon",
      "Sistem multimedia MBUX",
      "Radio digital",
      "Pachet USB",
    ],
  },
] as const;

const popularEquipment = [
  "Cameră 360°",
  "Scaune față încălzite",
  "Apple CarPlay",
  "Trapă panoramică",
  "Navigație",
  "Faruri DIGITAL LIGHT",
];
const equipmentOptionCount = equipmentGroups.reduce(
  (count, group) => count + group.options.length,
  0,
);

const normalizeEquipment = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("ro-RO");

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
const budgetIntervals = [
  [":25000", "Maximum 25.000 €"],
  [":40000", "Maximum 40.000 €"],
  [":60000", "Maximum 60.000 €"],
  ["25000:40000", "25.000–40.000 €"],
  ["40000:60000", "40.000–60.000 €"],
  ["60000:80000", "60.000–80.000 €"],
  ["80000:100000", "80.000–100.000 €"],
  ["100000:", "Peste 100.000 €"],
] as const;
export function BudgetFilter({ value, onChange }: Props) {
  const selectedRange = `${value.minPrice || ""}:${value.maxPrice || ""}`;
  const customRange =
    (value.minPrice || value.maxPrice) &&
    !budgetIntervals.some(([range]) => range === selectedRange);
  const formatted = (amount: string | undefined) =>
    amount ? Number(amount).toLocaleString("ro-RO") : "";
  return (
    <fieldset className="ak-budget">
      <legend>
        Buget maxim <span className="ak-budget-tax">TVA inclus</span>
      </legend>
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
      <details className="ak-budget-interval" open={Boolean(value.minPrice || customRange)}>
        <summary>
          <span>Interval de preț</span>
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
            {budgetIntervals.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
            {customRange && (
              <option value={selectedRange}>
                {value.minPrice && value.maxPrice
                  ? `${formatted(value.minPrice)}–${formatted(value.maxPrice)} €`
                  : value.minPrice
                    ? `De la ${formatted(value.minPrice)} €`
                    : `Maximum ${formatted(value.maxPrice)} €`}
              </option>
            )}
          </select>
        </label>
      </details>
    </fieldset>
  );
}
export function BasicFilters({ value, onChange }: Props) {
  return (
    <div className="ak-basic-filters">
      <BudgetFilter value={value} onChange={onChange} />
      <div className="v3-search-fields">
        <fieldset className="ak-condition-field">
          <legend className="ak-filter-label">Stare</legend>
          <ConditionTabs value={value} onChange={onChange} />
        </fieldset>
        <ClassicSelect
          className="ak-brand-field"
          label="Marcă"
          value={value.brand || ""}
          placeholder="Toate mărcile"
          options={unique([
            ...vehicles
              .filter((v) => !value.condition || v.condition === value.condition)
              .map((v) => v.brand),
            ...(value.brand ? [value.brand] : []),
          ]).map((brand) => ({ value: brand, label: brand }))}
          onChange={(brand) => {
            const next = { ...value, brand };
            delete next.model;
            onChange(next);
          }}
        />
        <ClassicSelect
          className="ak-model-field"
          label="Model"
          value={value.model || ""}
          placeholder={value.brand ? "Toate modelele" : "Alege marca"}
          disabled={!value.brand}
          options={unique([
            ...vehicles
              .filter(
                (v) =>
                  (!value.brand || v.brand === value.brand) &&
                  (!value.condition || v.condition === value.condition),
              )
              .map(modelOf),
            ...(value.model ? [value.model] : []),
          ]).map((model) => ({ value: model, label: model }))}
          onChange={(model) => onChange({ ...value, model })}
        />
        <ClassicSelect
          className="ak-branch-field"
          label="Sucursală"
          value={value.branch || ""}
          placeholder="Toate"
          groups={vehicleBranchGroups()}
          onChange={(branch) => {
            const next = { ...value, branch };
            delete next.city;
            onChange(next);
          }}
        />
      </div>
    </div>
  );
}
export function AdvancedFilters({ value, onChange }: Props) {
  const selectedEquipment = (value.equipment || "").split(",").filter(Boolean);
  const [showAllEquipment, setShowAllEquipment] = useState(() =>
    selectedEquipment.some((term) => !popularEquipment.includes(term)),
  );
  const [equipmentQuery, setEquipmentQuery] = useState("");
  const visibleEquipmentGroups = showAllEquipment
    ? equipmentGroups
        .map((group) => ({
          ...group,
          options: group.options.filter((option) =>
            normalizeEquipment(option).includes(normalizeEquipment(equipmentQuery.trim())),
          ),
        }))
        .filter((group) => group.options.length > 0)
    : [{ name: "Cele mai căutate", options: popularEquipment }];
  const set = (key: SearchKey, v: string) => onChange({ ...value, [key]: v });
  const toggleEquipment = (term: string, checked: boolean) => {
    const terms = checked
      ? [...selectedEquipment, term]
      : selectedEquipment.filter((item) => item !== term);
    set("equipment", terms.join(","));
  };
  const candidates = (key: SearchKey) => {
    const next = { ...value };
    delete next[key];
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
        {[
          ...options,
          ...(value[key] && !options.some((o) => (Array.isArray(o) ? o[0] : o) === value[key])
            ? [value[key]!]
            : []),
        ].map((o) => {
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
        {value[low] || value[high]
          ? !options.some(([key]) => key === `${value[low] || ""}:${value[high] || ""}`) && (
              <option value={`${value[low] || ""}:${value[high] || ""}`}>
                {value[low] && value[high]
                  ? `${value[low]}–${value[high]}`
                  : value[low]
                    ? `De la ${value[low]}`
                    : `Până la ${value[high]}`}
              </option>
            )
          : null}
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
        <summary>Caracteristici și dotări</summary>
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
            unique([
              ...candidates("color").flatMap((v) => (v.color ? [macroColorOf(v.color)] : [])),
              ...(value.color ? [value.color] : []),
            ]),
          )}
          {select("certified", "Certificare", [
            ["mercedes", "Mercedes-Benz Certified"],
            ["dwa", "Das WeltAuto"],
          ])}
          <fieldset className="ak-equipment-field">
            <legend>
              Dotări{selectedEquipment.length ? ` (${selectedEquipment.length})` : ""}
            </legend>
            <p className="ak-equipment-hint">Poți alege mai multe dotări pentru aceeași mașină.</p>
            {showAllEquipment && (
              <label className="ak-filter-equipment-search">
                <span className="sr-only">Caută o dotare</span>
                <Search size={18} aria-hidden="true" />
                <input
                  type="search"
                  value={equipmentQuery}
                  onChange={(event) => setEquipmentQuery(event.target.value)}
                  placeholder="Caută o dotare"
                />
              </label>
            )}
            <div className="ak-equipment-groups">
              {visibleEquipmentGroups.map((group) => (
                <div className="ak-equipment-group-filter" key={group.name}>
                  <p className="ak-equipment-group-title">{group.name}</p>
                  <div className="ak-equipment-options">
                    {group.options.map((term) => (
                      <label key={term} className="ak-equipment-option">
                        <input
                          type="checkbox"
                          checked={selectedEquipment.includes(term)}
                          onChange={(event) => toggleEquipment(term, event.target.checked)}
                        />
                        <span>{term}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {showAllEquipment && visibleEquipmentGroups.length === 0 && (
              <p className="ak-equipment-no-match" role="status">
                Nicio dotare găsită. Încearcă alt termen.
              </p>
            )}
            <button
              type="button"
              className="ak-equipment-toggle"
              aria-expanded={showAllEquipment}
              onClick={() => {
                setShowAllEquipment((current) => !current);
                setEquipmentQuery("");
              }}
            >
              {showAllEquipment
                ? "Arată mai puține"
                : `Vezi toate cele ${equipmentOptionCount} de dotări`}
              <ChevronDown size={17} aria-hidden="true" />
            </button>
          </fieldset>
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
          {range("minEngine", "maxEngine", "Cilindree", [
            [":1600", "Maximum 1.600 cm³"],
            ["1600:2000", "1.600–2.000 cm³"],
            ["2000:", "Peste 2.000 cm³"],
          ])}
          {(candidates("minRange").some((v) => v.rangeKm) || value.minRange || value.minCharge) && (
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
        open={Boolean(value.availability || value.vat || value.offer)}
      >
        <summary>Locație și disponibilitate</summary>
        <div className="v3-grid">
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
  onApply?: ((value: VehicleSearch) => void) | undefined;
}) {
  const draftRef = useRef(value);
  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      const changed = Object.keys({ ...value, ...draftRef.current }).some(
        (key) => value[key as SearchKey] !== draftRef.current[key as SearchKey],
      );
      if (changed) onChange(draftRef.current);
    }
    onOpenChange(nextOpen);
  };
  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="v3-shell-overlay" />
        {open && (
          <FilterPanelContent
            value={value}
            draftRef={draftRef}
            returnFocus={returnFocus}
            onApply={onApply}
          />
        )}
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function FilterPanelContent({
  value,
  draftRef,
  returnFocus,
  onApply,
}: {
  value: VehicleSearch;
  draftRef: React.MutableRefObject<VehicleSearch>;
  returnFocus: React.RefObject<HTMLButtonElement | null>;
  onApply?: ((value: VehicleSearch) => void) | undefined;
}) {
  const [draft, setDraftState] = useState(value);
  useEffect(() => {
    draftRef.current = draft;
  }, [draft, draftRef]);
  const setDraft = (next: VehicleSearch) => {
    draftRef.current = next;
    setDraftState(next);
  };
  const count = matchingVehicles(draft).length;
  const hasAlternatives = count === 0 && suggestedVehicles(draft).length > 0;
  const selectedChips = vehicleFilterChips(draft);
  const selectedCount = selectedChips.length;
  const recoveryChip =
    count === 0
      ? [...selectedChips]
          .reverse()
          .find((chip) => matchingVehicles(removeVehicleFilterChip(draft, chip)).length > 0)
      : undefined;
  return (
    <Dialog.Content
      className="v3 v3-panel"
      aria-describedby={undefined}
      onCloseAutoFocus={(event) => {
        event.preventDefault();
        returnFocus.current?.focus();
      }}
    >
      <div className="v3-panel-head">
        <div className="ak-filter-panel-title">
          <Dialog.Title>Filtre</Dialog.Title>
        </div>
        <Dialog.Close className="v3-icon" aria-label="Închide filtrele">
          <X size={22} />
        </Dialog.Close>
      </div>
      <div className="v3-panel-body">
        <SelectedVehicleFilters value={draft} onChange={setDraft} className="ak-panel-selected" />
        <BasicFilters value={draft} onChange={setDraft} />
        <AdvancedFilters value={draft} onChange={setDraft} />
      </div>
      <div className="v3-panel-foot">
        {count === 0 && selectedCount > 0 && (
          <div className="ak-filter-panel-zero" role="status">
            <p>Nicio mașină cu aceste filtre.</p>
            {recoveryChip && (
              <button
                type="button"
                onClick={() => setDraft(removeVehicleFilterChip(draft, recoveryChip))}
              >
                Elimină {recoveryChip.label}
              </button>
            )}
            {!recoveryChip && (
              <button type="button" onClick={() => setDraft(resetVehicleFilters(draft))}>
                Șterge filtrele
              </button>
            )}
          </div>
        )}
        <Dialog.Close
          type="button"
          className="v3-button"
          onClick={() => {
            const next = count || hasAlternatives ? draft : resetVehicleFilters(draft);
            draftRef.current = next;
            onApply?.(next);
          }}
        >
          <span aria-live="polite">
            {count
              ? `Vezi ${count} ${count === 1 ? "mașină" : "mașini"}`
              : hasAlternatives
                ? "Vezi variante similare"
                : "Vezi toate mașinile"}
          </span>
        </Dialog.Close>
      </div>
    </Dialog.Content>
  );
}
