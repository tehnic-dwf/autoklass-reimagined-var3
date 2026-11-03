import { createFileRoute, Link } from "@tanstack/react-router";
import * as Dialog from "@radix-ui/react-dialog";
import { Search, SlidersHorizontal, ArrowRight, ArrowUpRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { VehicleCard } from "@/components/vehicle/VehicleCard";
import { FilterPanel } from "@/components/search/VehicleFilters";
import { CatalogSearch } from "@/components/search/CatalogSearch";
import { SelectedVehicleFilters } from "@/components/search/SelectedVehicleFilters";
import { suggestSearchCorrection } from "@/lib/vehicle-search";
import {
  matchingVehicles,
  vehicleSortOptions,
  suggestedVehicles,
  validateVehicleSearch,
  vehicleFilterChips,
  removeVehicleFilterChip,
  resetVehicleFilters,
  resolveVehicleSearch,
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
  const [searchOpen, setSearchOpen] = useState(
    () => typeof window !== "undefined" && window.location.hash === "#catalog-search",
  );
  const searchInput = useRef<HTMLInputElement>(null);
  const filterTrigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const openFromHash = () => {
      if (window.location.hash === "#catalog-search") setSearchOpen(true);
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);
  const { slugs } = useFavorites();
  const items = matchingVehicles(value);
  const active = vehicleFilterChips(value);
  const pageSize = 8;
  const pages = Math.max(1, Math.ceil(items.length / pageSize));
  const page = Math.min(pages, Math.max(1, Number(value.page) || 1));
  const shown = items.slice((page - 1) * pageSize, page * pageSize);
  const alternatives = suggestedVehicles(value);
  const correction = value.q && items.length === 0 ? suggestSearchCorrection(value.q, value) : null;
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
      <SiteHeader catalog onSearch={() => setSearchOpen(true)} />
      <Dialog.Root open={searchOpen} onOpenChange={setSearchOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="ak-catalog-search-overlay" />
          <Dialog.Content
            className="v3 ak-catalog-search-dialog"
            onOpenAutoFocus={(event) => {
              event.preventDefault();
              searchInput.current?.focus();
            }}
          >
            <div className="ak-catalog-search-dialog-head">
              <Dialog.Title>Caută în stoc</Dialog.Title>
              <Dialog.Close aria-label="Închide căutarea">
                <X size={22} aria-hidden="true" />
              </Dialog.Close>
            </div>
            <Dialog.Description className="sr-only">
              Caută după marcă, model sau alte caracteristici ale mașinii.
            </Dialog.Description>
            <CatalogSearch
              value={value}
              inputRef={searchInput}
              onSearch={(query) => update({ ...value, q: query })}
              onCommit={() => setSearchOpen(false)}
            />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      <main id="main-content" className="v3-wrap v3-section ak-listing">
        <h1>{listingTitle}</h1>

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

        <SelectedVehicleFilters value={value} onChange={update} className="ak-listing-selected" />
        <div className="ak-listing-toolbar">
          <button
            className="v3-button secondary"
            aria-haspopup="dialog"
            ref={filterTrigger}
            onClick={() => setOpen(true)}
          >
            <SlidersHorizontal size={18} />
            Filtre{active.length ? ` (${active.length})` : ""}
          </button>
          <label className="v3-field ak-catalog-sort-field">
            <span>Sortează</span>
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
            {correction && (
              <button
                type="button"
                className="ak-search-correction"
                onClick={() => update({ ...value, q: correction })}
              >
                Ai vrut să cauți „{correction}”? <ArrowRight size={17} aria-hidden="true" />
              </button>
            )}
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
