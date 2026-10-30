import { createFileRoute, Link, useLocation } from "@tanstack/react-router";
import { Search, SlidersHorizontal, X, ArrowRight, ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { VehicleCard } from "@/components/vehicle/VehicleCard";
import { FilterPanel } from "@/components/search/VehicleFilters";
import { SelectedVehicleFilters } from "@/components/search/SelectedVehicleFilters";
import { ClassicSelect } from "@/components/ui/ClassicSelect";
import {
  matchingVehicles,
  vehicleSortOptions,
  suggestedVehicles,
  validateVehicleSearch,
  vehicleFilterChips,
  removeVehicleFilterChip,
  resetVehicleFilters,
  resolveVehicleSearch,
  vehicleBranchGroups,
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
  const active = vehicleFilterChips(value);
  const pageSize = 8;
  const pages = Math.max(1, Math.ceil(items.length / pageSize));
  const page = Math.min(pages, Math.max(1, Number(value.page) || 1));
  const shown = items.slice((page - 1) * pageSize, page * pageSize);
  const alternatives = suggestedVehicles(value);
  const recoveryChip =
    items.length === 0
      ? [...active]
          .reverse()
          .find((chip) => matchingVehicles(removeVehicleFilterChip(value, chip)).length > 0)
      : undefined;
  const update = (next: VehicleSearch) => {
    const clean = { ...next };
    delete clean.page;
    void navigate({ search: clean, replace: true, resetScroll: false });
  };
  const headingFilters = resolveVehicleSearch(value).search;
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

        <div className="ak-catalog-branch-row">
          <ClassicSelect
            label="Sucursală"
            value={value.branch || ""}
            placeholder="Toate"
            groups={vehicleBranchGroups()}
            onChange={(branch) => {
              const next = { ...value, branch };
              delete next.city;
              update(next);
            }}
          />
        </div>

        {headingFilters.condition === "rulat" && (
          <section className="ak-used-certification" aria-labelledby="used-certification-title">
            <div className="ak-used-certification-intro">
              <h2 id="used-certification-title">Autoturisme rulate certificate</h2>
            </div>
            <nav className="ak-used-certification-links" aria-label="Programe de certificare">
              <a href="https://www.autoklass.ro/search/filtre/mercedes-certified-da">
                <span>Mercedes-Benz Certified</span>
                <ArrowUpRight size={18} aria-hidden />
              </a>
              <div className="ak-used-certification-network">
                <strong>Das WeltAuto</strong>
                <span>
                  <a href="https://www.dasweltauto.ro/haendler/ploiesti/10267/s">
                    Ploiești <ArrowUpRight size={16} aria-hidden />
                  </a>
                  <a href="https://www.dasweltauto.ro/haendler/brasov/10272/s">
                    Brașov <ArrowUpRight size={16} aria-hidden />
                  </a>
                </span>
              </div>
            </nav>
          </section>
        )}

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
            {value.q && (
              <button
                type="button"
                className="ak-catalog-search-clear"
                aria-label="Șterge căutarea"
                onClick={() => {
                  const next = { ...value };
                  delete next.q;
                  update(next);
                  searchInput.current?.focus();
                }}
              >
                <X size={18} aria-hidden="true" />
              </button>
            )}
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
              <span className="ak-sort-visible" aria-hidden="true">
                Sortează
              </span>
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
        <SelectedVehicleFilters value={value} onChange={update} className="ak-listing-selected" />
        <div className="v3-row v3-rule pt-6">
          <p role="status">
            {items.length
              ? items.length === 1
                ? "1 mașină"
                : `${(page - 1) * pageSize + 1}–${Math.min(page * pageSize, items.length)} din ${items.length} mașini`
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
            {recoveryChip && (
              <button
                className="v3-button secondary"
                onClick={() => update(removeVehicleFilterChip(value, recoveryChip))}
              >
                Elimină {recoveryChip.label}
              </button>
            )}
            <button
              className="v3-button secondary"
              onClick={() => update(resetVehicleFilters(value))}
            >
              Resetează filtrele
            </button>
            {!!alternatives.length && (
              <div className="v3-cards">
                {alternatives.map((v) => (
                  <VehicleCard key={v.slug} vehicle={v} />
                ))}
              </div>
            )}
            {value.certified === "mercedes" && (
              <a
                className="v3-link"
                href="https://www.autoklass.ro/search/filtre/mercedes-certified-da"
              >
                Vezi stocul Mercedes-Benz Certified <ArrowUpRight size={16} aria-hidden />
              </a>
            )}
            {value.certified === "dwa" && (
              <div className="ak-certified-empty-links">
                <a className="v3-link" href="https://www.dasweltauto.ro/haendler/ploiesti/10267/s">
                  Das WeltAuto Ploiești <ArrowUpRight size={16} aria-hidden />
                </a>
                <a className="v3-link" href="https://www.dasweltauto.ro/haendler/brasov/10272/s">
                  Das WeltAuto Brașov <ArrowUpRight size={16} aria-hidden />
                </a>
              </div>
            )}
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
