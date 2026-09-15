import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, SlidersHorizontal, X, ArrowRight } from "lucide-react";
import { useRef, useState } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { VehicleCard } from "@/components/vehicle/VehicleCard";
import { BasicFilters, ConditionTabs, FilterPanel } from "@/components/search/VehicleFilters";
import {
  matchingVehicles,
  validateVehicleSearch,
  activeFilters,
  filterLabels,
  type VehicleSearch,
} from "@/lib/vehicle-search";
import { useFavorites } from "@/lib/favorites";
export const Route = createFileRoute("/autoturisme/")({
  validateSearch: validateVehicleSearch,
  head: () => ({ meta: [{ title: "Autoturisme noi și rulate | Autoklass" }] }),
  component: Listing,
});
function Listing() {
  const value = Route.useSearch();
  const navigate = Route.useNavigate();
  const [open, setOpen] = useState(false);
  const filterTrigger = useRef<HTMLButtonElement>(null);
  const { slugs } = useFavorites();
  const items = matchingVehicles(value);
  const active = activeFilters(value);
  const update = (next: VehicleSearch) =>
    void navigate({ search: next, replace: true, resetScroll: false });
  return (
    <div className="v3">
      <SiteHeader />
      <main id="main-content" className="v3-wrap v3-section">
        <h1>
          {value.condition === "nou"
            ? "Autoturisme noi"
            : value.condition === "rulat"
              ? "Autoturisme rulate"
              : "Autoturisme noi și rulate"}
        </h1>

        <form className="relative my-8 max-w-xl" onSubmit={(e) => e.preventDefault()}>
          <label className="v3-field">
            <span>Caută o mașină</span>
            <input
              type="search"
              placeholder="Marcă, model sau versiune…"
              name="q"
              autoComplete="off"
              value={value.q || ""}
              onChange={(e) => update({ ...value, q: e.target.value })}
            />
          </label>
        </form>
        <ConditionTabs value={value} onChange={update} />
        <BasicFilters value={value} onChange={update} />
        <div className="v3-row py-6">
          <button
            className="v3-button secondary"
            aria-haspopup="dialog"
            ref={filterTrigger}
            onClick={() => setOpen(true)}
          >
            <SlidersHorizontal size={18} />
            Toate filtrele{active.length ? ` (${active.length})` : ""}
          </button>
          <label className="v3-field flex-1 sm:flex-none">
            <span className="sr-only">Sortează mașinile</span>
            <select
              aria-label="Sortează mașinile"
              value={value.sort || ""}
              onChange={(e) => update({ ...value, sort: e.target.value })}
            >
              <option value="">Selecția Autoklass</option>
              <option value="price-asc">Preț crescător</option>
              <option value="price-desc">Preț descrescător</option>
            </select>
          </label>
        </div>
        {active.length > 0 && (
          <div className="flex flex-wrap gap-2 pb-6" aria-label="Filtre active">
            {active.map(([key, v]) => (
              <button
                className="v3-chip"
                key={key}
                aria-label={`Elimină ${filterLabels[key]}: ${v}`}
                onClick={() => {
                  const next = { ...value };
                  delete next[key];
                  if (key === "brand") delete next.model;
                  update(next);
                }}
              >
                {filterLabels[key]}:{" "}
                {(
                  {
                    nou: "Noi",
                    rulat: "Rulate",
                    unknown: "De confirmat",
                    immediate: "Livrare imediată",
                    stock: "În stoc",
                  } as Record<string, string>
                )[v] || v}
                <X size={14} />
              </button>
            ))}
            <button className="v3-link px-2 text-[14px]" onClick={() => update({})}>
              Resetează
            </button>
          </div>
        )}
        <div className="v3-row v3-rule pt-6">
          <p role="status">
            {items.length} {items.length === 1 ? "mașină" : "mașini"}
          </p>
          <Link className="v3-link v3-small" to="/comparatie">
            Compară{slugs.length ? ` (${slugs.length})` : ""}
            <ArrowRight size={16} />
          </Link>
        </div>
        {value.demo === "loading" ? (
          <div className="v3-empty" role="status" aria-busy="true">
            <p>Se încarcă mașinile…</p>
            <div className="v3-grid mt-6" aria-hidden="true">
              <div className="h-48 bg-neutral-200" />
              <div className="h-48 bg-neutral-200" />
            </div>
          </div>
        ) : value.demo === "error" ? (
          <div className="v3-empty" role="alert">
            <h2>Catalogul nu poate fi afișat.</h2>
            <p>Filtrele tale sunt păstrate. Încearcă din nou.</p>
            <button
              className="v3-button"
              onClick={() => {
                const next = { ...value };
                delete next.demo;
                update(next);
              }}
            >
              Încearcă din nou
            </button>
          </div>
        ) : items.length === 0 ? (
          <div className="v3-empty">
            <Search className="mx-auto mb-6" size={32} strokeWidth={1} />
            <h2>Nicio mașină pentru aceste filtre.</h2>
            <p className="v3-muted">Încearcă un buget mai mare sau elimină un criteriu.</p>
            <button className="v3-button secondary" onClick={() => update({})}>
              Resetează filtrele
            </button>
          </div>
        ) : (
          <div className="v3-cards">
            {items.map((v) => (
              <VehicleCard key={v.slug} vehicle={v} />
            ))}
          </div>
        )}
        <FilterPanel
          value={value}
          onChange={update}
          open={open}
          onOpenChange={setOpen}
          returnFocus={filterTrigger}
        />
      </main>
      <SiteFooter />
    </div>
  );
}
