import { useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, SlidersHorizontal } from "lucide-react";
import { BasicFilters, FilterPanel } from "./VehicleFilters";
import { matchingVehicles, activeFilters, type VehicleSearch } from "@/lib/vehicle-search";
export function HomeSearch() {
  const [value, setValue] = useState<VehicleSearch>({});
  const [open, setOpen] = useState(false);
  const filterTrigger = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();
  const count = matchingVehicles(value).length;
  const extra = activeFilters(value).filter(
    ([key]) => !["condition", "brand", "maxPrice"].includes(key),
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
            void navigate({ to: "/autoturisme", search: value });
          }}
        >
          <BasicFilters value={value} onChange={setValue} />
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
            <button className="v3-button" type="submit">
              <span aria-live="polite">
                Vezi {count} {count === 1 ? "mașină" : "mașini"}
              </span>
              <ArrowRight size={20} aria-hidden />
            </button>
          </div>
        </form>
        <FilterPanel
          value={value}
          onChange={setValue}
          open={open}
          onOpenChange={setOpen}
          returnFocus={filterTrigger}
          onApply={() => void navigate({ to: "/autoturisme", search: value })}
        />
      </div>
    </section>
  );
}
