import { useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, SlidersHorizontal } from "lucide-react";
import { BasicFilters, FilterPanel } from "./VehicleFilters";
import { SelectedVehicleFilters } from "./SelectedVehicleFilters";
import {
  matchingVehicles,
  validateVehicleSearch,
  vehicleFilterChips,
  type VehicleSearch,
} from "@/lib/vehicle-search";

const homeSearchKey = "autoklass-home-search";

export function HomeSearch() {
  const [value, setValue] = useState<VehicleSearch>({});
  const [open, setOpen] = useState(false);
  const filterTrigger = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(homeSearchKey);
      if (!stored) return;
      const parsed: unknown = JSON.parse(stored);
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        setValue(validateVehicleSearch(parsed as Record<string, unknown>));
      }
    } catch {
      // Search still works when browser storage is unavailable.
    }
  }, []);

  const updateValue = (next: VehicleSearch) => {
    setValue(next);
    try {
      sessionStorage.setItem(homeSearchKey, JSON.stringify(next));
    } catch {
      // Search still works when browser storage is unavailable.
    }
  };
  const showResults = (next: VehicleSearch) => {
    updateValue(next);
    void navigate({ to: "/autoturisme", search: next });
  };
  const count = matchingVehicles(value).length;
  const extra = vehicleFilterChips(value).filter(
    (chip) => !["condition", "brand", "model", "branch", "price"].includes(chip.id),
  );
  return (
    <section
      id="cauta-masina"
      className="v3 v3-search v3-section ak-search"
      style={{ minHeight: 0 }}
    >
      <div className="v3-wrap">
        <h2>Caută o mașină.</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            showResults(value);
          }}
        >
          <BasicFilters value={value} onChange={updateValue} />
          <div className="ak-search-actions">
            <button
              type="button"
              className="ak-more-filters"
              ref={filterTrigger}
              onClick={() => setOpen(true)}
              aria-haspopup="dialog"
            >
              <SlidersHorizontal size={20} aria-hidden />
              <span>Alte filtre{extra.length ? ` (${extra.length})` : ""}</span>
            </button>
            <SelectedVehicleFilters
              value={value}
              onChange={updateValue}
              className="ak-home-selected"
            />
            {count === 0 && vehicleFilterChips(value).length > 0 && (
              <p className="ak-home-no-results" role="status">
                Nicio mașină cu aceste filtre. Elimină un criteriu de mai sus sau modifică selecția.
              </p>
            )}
            <button
              className="v3-button"
              type={count ? "submit" : "button"}
              onClick={count ? undefined : () => setOpen(true)}
            >
              <span aria-live="polite">
                {count
                  ? `Vezi ${count} ${count === 1 ? "mașină" : "mașini"}`
                  : "Ajustează filtrele"}
              </span>
              <ArrowRight size={20} aria-hidden />
            </button>
          </div>
        </form>
        <FilterPanel
          value={value}
          onChange={updateValue}
          open={open}
          onOpenChange={setOpen}
          returnFocus={filterTrigger}
          onApply={showResults}
        />
      </div>
    </section>
  );
}
