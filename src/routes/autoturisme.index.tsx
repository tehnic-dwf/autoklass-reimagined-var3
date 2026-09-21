import { createFileRoute, Link, useLocation } from "@tanstack/react-router";
import { Search, SlidersHorizontal, X, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { VehicleCard } from "@/components/vehicle/VehicleCard";
import { FilterPanel } from "@/components/search/VehicleFilters";
import {
  matchingVehicles,
  vehicleSortOptions,
  suggestedVehicles,
  validateVehicleSearch,
  activeFilters,
  filterLabels,
  interpretQuery,
  type VehicleSearch,
} from "@/lib/vehicle-search";
import { vehicles } from "@/data/vehicles";
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
  const searchHash = useLocation({ select: (location) => location.hash });
  const [searchOpen, setSearchOpen] = useState(Boolean(value.q) || searchHash === "catalog-search");
  const searchInput = useRef<HTMLInputElement>(null);
  const searchTrigger = useRef<HTMLButtonElement>(null);
  const filterTrigger = useRef<HTMLButtonElement>(null);
  const revealSearch = () => {
    setSearchOpen(true);
    requestAnimationFrame(() => {
      searchInput.current?.focus({ preventScroll: true });
      searchInput.current?.scrollIntoView({ block: "center" });
    });
  };
  useEffect(() => {
    if (searchHash === "catalog-search") revealSearch();
  }, [searchHash]);
  const { slugs } = useFavorites();
  const items = matchingVehicles(value);
  const active = activeFilters(value);
  const pageSize = 8;
  const pages = Math.max(1, Math.ceil(items.length / pageSize));
  const page = Math.min(pages, Math.max(1, Number(value.page) || 1));
  const shown = items.slice((page - 1) * pageSize, page * pageSize);
  const alternatives = suggestedVehicles(value);
  const update = (next: VehicleSearch) => {
    const clean = { ...next };
    delete clean.page;
    void navigate({ search: clean, replace: true, resetScroll: false });
  };
  const headingFilters = { ...value, ...interpretQuery(value.q || "") };
  const listingTitle = [
    headingFilters.body || "Autoturisme",
    headingFilters.condition === "nou"
      ? "noi"
      : headingFilters.condition === "rulat"
        ? "rulate"
        : "",
    headingFilters.brand?.replace("Mercedes-Benz", "Mercedes‑Benz"),
    headingFilters.model,
    headingFilters.fuel
      ? { Diesel: "diesel", Benzină: "pe benzină", Electric: "electrice", Hibrid: "hibride" }[
          headingFilters.fuel
        ] || headingFilters.fuel
      : "",
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <div className="v3">
      <SiteHeader catalog onSearch={revealSearch} />
      <main id="main-content" className="v3-wrap v3-section ak-listing">
        <h1>{listingTitle}</h1>

        <div className="ak-catalog-controls">
          <form
            id="catalog-search"
            className={`relative my-8 max-w-xl ak-catalog-search ${searchOpen ? "is-open" : ""}`}
            onSubmit={(e) => {
              e.preventDefault();
              searchInput.current?.blur();
            }}
          >
            <label className="v3-field">
              <span>Caută o mașină</span>
              <input
                ref={searchInput}
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    setSearchOpen(false);
                    searchTrigger.current?.focus();
                  }
                }}
                type="search"
                placeholder="Ex. GLC rulat sub 60k"
                list="vehicle-suggestions"
                name="q"
                autoComplete="off"
                value={value.q || ""}
                onChange={(e) => update({ ...value, q: e.target.value })}
              />
            </label>
            <datalist id="vehicle-suggestions">
              {vehicles
                .filter((v) => !value.brand || v.brand === value.brand)
                .map((v) => (
                  <option key={v.slug} value={v.title} />
                ))}
            </datalist>
          </form>
          <div className="v3-row py-6 ak-listing-toolbar">
            <button
              type="button"
              className="v3-button secondary ak-search-toggle"
              ref={searchTrigger}
              aria-label={searchOpen ? "Închide căutarea" : "Deschide căutarea"}
              aria-expanded={searchOpen}
              aria-controls="catalog-search"
              onClick={() => {
                const next = !searchOpen;
                setSearchOpen(next);
                if (next) requestAnimationFrame(() => searchInput.current?.focus());
              }}
            >
              <Search size={18} aria-hidden />
              <span>Caută</span>
            </button>
            <button
              className="v3-button secondary"
              aria-haspopup="dialog"
              ref={filterTrigger}
              onClick={() => setOpen(true)}
            >
              <SlidersHorizontal size={18} />
              Filtre{active.length ? ` (${active.length})` : ""}
            </button>
            <label className="v3-field flex-1 sm:flex-none">
              <span className="sr-only">Sortează mașinile</span>
              <select
                aria-label="Sortează mașinile"
                value={value.sort || "recommended"}
                onChange={(e) => update({ ...value, sort: e.target.value })}
              >
                {vehicleSortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
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
                )[v] ||
                  (["minPrice", "maxPrice"].includes(key)
                    ? `${Number(v).toLocaleString("ro-RO")} €`
                    : v)}
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
            {items.length
              ? `${(page - 1) * pageSize + 1}–${Math.min(page * pageSize, items.length)} din ${items.length} mașini`
              : "0 mașini"}
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
            <p className="v3-muted">
              {alternatives.length
                ? "Alte opțiuni, cu criterii diferite:"
                : "Alege altă marcă sau vezi toate mașinile."}
            </p>
            {!!alternatives.length && (
              <div className="v3-cards">
                {alternatives.map((v) => (
                  <VehicleCard key={v.slug} vehicle={v} />
                ))}
              </div>
            )}
            <button className="v3-button secondary" onClick={() => update({})}>
              Resetează filtrele
            </button>
          </div>
        ) : (
          <div className="v3-cards">
            {shown.map((v) => (
              <VehicleCard key={v.slug} vehicle={v} />
            ))}
          </div>
        )}
        {pages > 1 && (
          <nav className="ak-pagination" aria-label="Paginile catalogului">
            {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                aria-current={n === page ? "page" : undefined}
                aria-label={`Pagina ${n}`}
                onClick={() => {
                  void navigate({
                    search: { ...value, page: String(n) },
                    replace: true,
                    resetScroll: false,
                  });
                  document
                    .querySelector(".ak-catalog-controls")
                    ?.scrollIntoView({ block: "start" });
                }}
              >
                {n}
              </button>
            ))}
          </nav>
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
