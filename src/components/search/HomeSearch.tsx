import { useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, SlidersHorizontal } from "lucide-react";
import { BasicFilters, ConditionTabs, FilterPanel } from "./VehicleFilters";
import { matchingVehicles, activeFilters, type VehicleSearch } from "@/lib/vehicle-search";
export function HomeSearch() {
  const [value, setValue] = useState<VehicleSearch>({});
  const [open, setOpen] = useState(false);
  const filterTrigger = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();
  const count = matchingVehicles(value).length;
  return (
    <section id="cauta-masina" className="v3 v3-search v3-section" style={{ minHeight: 0 }}>
      <div className="v3-wrap">
        <p className="v3-kicker">Următoarea ta mașină</p>
        <h2>Începe cu ce contează pentru tine.</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void navigate({ to: "/autoturisme", search: value });
          }}
        >
          <ConditionTabs value={value} onChange={setValue} />
          <BasicFilters value={value} onChange={setValue} />
          {value.minPrice && value.maxPrice && Number(value.minPrice) > Number(value.maxPrice) && (
            <p role="alert" className="v3-error mt-4">
              Prețul minim trebuie să fie mai mic decât cel maxim.
            </p>
          )}
          <div className="v3-search-footer">
            <button
              type="button"
              className="v3-link"
              ref={filterTrigger}
              onClick={() => setOpen(true)}
            >
              <SlidersHorizontal size={18} />
              Toate filtrele
              {activeFilters(value).length > 0 ? ` (${activeFilters(value).length})` : ""}
            </button>
            <button className="v3-button" type="submit">
              Vezi {count} {count === 1 ? "mașină" : "mașini"}
              <ArrowRight size={18} />
            </button>
          </div>
          <p className="v3-small v3-muted mt-6">
            Selecție demonstrativă de 18 autoturisme Mercedes-Benz.
          </p>
        </form>
        <FilterPanel
          value={value}
          onChange={setValue}
          open={open}
          onOpenChange={setOpen}
          returnFocus={filterTrigger}
        />
      </div>
    </section>
  );
}
