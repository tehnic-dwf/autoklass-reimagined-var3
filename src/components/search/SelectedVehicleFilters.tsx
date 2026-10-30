import { X } from "lucide-react";
import {
  removeVehicleFilterChip,
  resetVehicleFilters,
  vehicleFilterChips,
  type VehicleSearch,
} from "@/lib/vehicle-search";

type Props = {
  value: VehicleSearch;
  onChange: (value: VehicleSearch) => void;
  className?: string;
};

export function SelectedVehicleFilters({ value, onChange, className = "" }: Props) {
  const chips = vehicleFilterChips(value);
  if (!chips.length) return null;

  return (
    <section className={`ak-selected-filters ${className}`} aria-label="Filtre selectate">
      <div className="ak-selected-filters-head">
        <strong>
          Filtre selectate <span>({chips.length})</span>
        </strong>
        <button type="button" onClick={() => onChange(resetVehicleFilters(value))}>
          Șterge toate
        </button>
      </div>
      <div className="ak-selected-filters-list">
        {chips.map((chip) => (
          <button
            type="button"
            className="ak-selected-filter-chip"
            key={chip.id}
            aria-label={`Elimină ${chip.label}`}
            onClick={() => onChange(removeVehicleFilterChip(value, chip))}
          >
            <span>{chip.label}</span>
            <X size={14} aria-hidden="true" />
          </button>
        ))}
      </div>
    </section>
  );
}
