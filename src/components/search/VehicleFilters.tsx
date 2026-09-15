import { useId } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
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
      {[
        ["", "Toate"],
        ["nou", "Noi"],
        ["rulat", "Rulate"],
      ].map(([key, label]) => (
        <button
          type="button"
          key={label}
          aria-pressed={(value.condition || "") === key}
          onClick={() => {
            const next = { ...value };
            if (key) next.condition = key;
            else delete next.condition;
            if (key === "nou")
              for (const k of ["minYear", "maxYear", "minKm", "maxKm"] as const) delete next[k];
            onChange(next);
          }}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
export function BasicFilters({ value, onChange }: Props) {
  const id = useId();
  const set = (key: SearchKey, v: string) => {
    const next = { ...value };
    if (v) next[key] = v;
    else delete next[key];
    if (key === "brand") delete next.model;
    onChange(next);
  };
  const models = unique(
    vehicles.filter((v) => !value.brand || v.brand === value.brand).map(modelOf),
  );
  return (
    <div className="v3-search-fields">
      <label className="v3-field" htmlFor={`${id}-brand`}>
        <span>Marcă</span>
        <select
          id={`${id}-brand`}
          name="brand"
          value={value.brand || ""}
          onChange={(e) => set("brand", e.target.value)}
        >
          <option value="">Toate mărcile</option>
          {unique(vehicles.map((v) => v.brand)).map((v) => (
            <option key={v}>{v}</option>
          ))}
        </select>
      </label>
      <label className="v3-field" htmlFor={`${id}-model`}>
        <span>Model</span>
        <select
          id={`${id}-model`}
          name="model"
          value={value.model || ""}
          onChange={(e) => set("model", e.target.value)}
        >
          <option value="">Toate modelele</option>
          {models.map((v) => (
            <option key={v}>{v}</option>
          ))}
        </select>
      </label>
      <label className="v3-field" htmlFor={`${id}-min`}>
        <span>Preț de la (€)</span>
        <input
          id={`${id}-min`}
          name="minPrice"
          type="number"
          inputMode="numeric"
          min="0"
          placeholder="Fără minim"
          value={value.minPrice || ""}
          onChange={(e) => set("minPrice", e.target.value)}
        />
      </label>
      <label className="v3-field" htmlFor={`${id}-max`}>
        <span>Preț până la (€)</span>
        <input
          id={`${id}-max`}
          name="maxPrice"
          type="number"
          inputMode="numeric"
          min="0"
          placeholder="Fără maxim"
          value={value.maxPrice || ""}
          onChange={(e) => set("maxPrice", e.target.value)}
        />
      </label>
    </div>
  );
}
export function AdvancedFilters({ value, onChange }: Props) {
  const id = useId();
  const set = (key: SearchKey, v: string) => {
    const next = { ...value };
    if (v) next[key] = v;
    else delete next[key];
    onChange(next);
  };
  const select = (key: SearchKey, label: string, options: string[] | [string, string][]) => (
    <label className="v3-field">
      <span>{label}</span>
      <select name={key} value={value[key] || ""} onChange={(e) => set(key, e.target.value)}>
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
  const number = (key: SearchKey, label: string) => (
    <label className="v3-field">
      <span>{label}</span>
      <input
        name={key}
        type="number"
        min="0"
        inputMode="numeric"
        value={value[key] || ""}
        onChange={(e) => set(key, e.target.value)}
        placeholder="Fără limită"
      />
    </label>
  );
  return (
    <div className="mt-8">
      <details className="v3-disclosure" open>
        <summary>Tipul mașinii</summary>
        <div className="v3-grid">
          {select("body", "Caroserie", unique(vehicles.map((v) => v.bodyType)))}
          {select("fuel", "Combustibil", ["Benzină", "Diesel", "Hibrid", "Electric"])}
          {select("gearbox", "Transmisie", ["Automată", "Manuală"])}
          {select("drive", "Tracțiune", [
            ["AWD", "Integrală (AWD)"],
            ["FWD", "Față (FWD)"],
            ["RWD", "Spate (RWD)"],
          ])}
        </div>
      </details>
      <details className="v3-disclosure" open={Boolean(value.equipment)}>
        <summary>Dotări</summary>
        <div>
          <label className="v3-field" htmlFor={`${id}-equipment`}>
            <span>Caută dotări</span>
            <input
              id={`${id}-equipment`}
              type="search"
              name="equipment"
              autoComplete="off"
              placeholder="De exemplu: LED, trapă"
              value={value.equipment || ""}
              onChange={(e) => set("equipment", e.target.value)}
            />
          </label>
        </div>
      </details>
      {value.condition !== "nou" && (
        <details
          className="v3-disclosure"
          open={Boolean(value.minYear || value.maxYear || value.maxKm || value.minKm)}
        >
          <summary>An și kilometraj</summary>
          <div className="v3-grid">
            {number("minYear", "An de la")}
            {number("maxYear", "An până la")}
            {number("minKm", "Kilometraj de la")}
            {number("maxKm", "Kilometraj până la")}
          </div>
        </details>
      )}
      <details className="v3-disclosure">
        <summary>Putere și cilindree</summary>
        <div className="v3-grid">
          {number("minPower", "Putere de la (CP)")}
          {number("maxPower", "Putere până la (CP)")}
          {number("minEngine", "Cilindree de la (cm³)")}
          {number("maxEngine", "Cilindree până la (cm³)")}
        </div>
      </details>
      <details
        className="v3-disclosure"
        open={Boolean(value.branch || value.availability || value.vat)}
      >
        <summary>Disponibilitate și sucursală</summary>
        <div className="v3-stack">
          {select("branch", "Sucursală", unique(vehicles.map((v) => v.branch)))}
          {select("availability", "Disponibilitate", [
            ["immediate", "Livrare imediată"],
            ["stock", "În stoc"],
            ["unknown", "De confirmat"],
          ])}
          {select("vat", "Regim TVA", [
            ["deductibil", "Deductibil"],
            ["nedeductibil", "Nedeductibil"],
          ])}
          <p className="v3-small v3-muted">
            „În stoc” nu înseamnă automat livrare imediată. Termenul se confirmă pentru fiecare
            mașină.
          </p>
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
}: Props & {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  returnFocus: React.RefObject<HTMLButtonElement | null>;
}) {
  const count = matchingVehicles(value).length;
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="v3-shell-overlay" />
        <Dialog.Content
          className="v3 v3-panel"
          aria-describedby={undefined}
          onCloseAutoFocus={(event) => {
            event.preventDefault();
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
            <ConditionTabs value={value} onChange={onChange} />
            <BasicFilters value={value} onChange={onChange} />
            <AdvancedFilters value={value} onChange={onChange} />
            <button className="v3-link mt-4" onClick={() => onChange({})}>
              Resetează toate filtrele
            </button>
          </div>
          <div className="v3-panel-foot">
            <Dialog.Close className="v3-button">
              Vezi {count} {count === 1 ? "mașină" : "mașini"}
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
