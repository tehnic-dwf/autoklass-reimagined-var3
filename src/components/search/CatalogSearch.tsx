import { Link } from "@tanstack/react-router";
import { ArrowRight, Search, X } from "lucide-react";
import { useEffect, useRef, useState, type RefObject } from "react";
import { formatPrice } from "@/data/vehicles";
import {
  matchingVehicles,
  suggestSearchCorrection,
  type VehicleSearch,
} from "@/lib/vehicle-search";

export function CatalogSearch({
  value,
  onSearch,
  onCommit,
  inputRef,
}: {
  value: VehicleSearch;
  onSearch: (query: string) => void;
  onCommit?: () => void;
  inputRef: RefObject<HTMLInputElement | null>;
}) {
  const [draft, setDraft] = useState(value.q || "");
  const [expanded, setExpanded] = useState(false);
  const rootRef = useRef<HTMLFormElement>(null);

  useEffect(() => setDraft(value.q || ""), [value.q]);
  useEffect(() => {
    if (!expanded) return;
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) {
        setExpanded(false);
      }
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, [expanded]);

  const query = draft.trim();
  const showSuggestions = expanded && query.length >= 2;
  const matches = showSuggestions ? matchingVehicles({ ...value, q: query }) : [];
  const correction =
    showSuggestions && matches.length === 0 ? suggestSearchCorrection(query, value) : null;
  const correctedCount = correction ? matchingVehicles({ ...value, q: correction }).length : 0;
  const commit = (next: string) => {
    setDraft(next);
    setExpanded(false);
    onSearch(next.trim());
    onCommit?.();
    inputRef.current?.blur();
  };

  return (
    <form
      ref={rootRef}
      id="catalog-search"
      className="ak-catalog-search"
      role="search"
      onSubmit={(event) => {
        event.preventDefault();
        commit(draft);
      }}
    >
      <label htmlFor="catalog-search-input">Caută în stoc</label>
      <div className="ak-catalog-search-control">
        <Search size={20} aria-hidden="true" />
        <input
          ref={inputRef}
          id="catalog-search-input"
          type="search"
          name="q"
          autoComplete="off"
          placeholder="Ex. GLC, Audi, electric"
          value={draft}
          aria-controls={showSuggestions ? "catalog-search-suggestions" : undefined}
          aria-expanded={showSuggestions}
          onFocus={() => setExpanded(true)}
          onChange={(event) => {
            setDraft(event.target.value);
            setExpanded(true);
          }}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setExpanded(false);
              inputRef.current?.blur();
            }
          }}
        />
        {draft && (
          <button
            type="button"
            className="ak-catalog-search-clear"
            aria-label="Șterge căutarea"
            onClick={() => {
              setDraft("");
              setExpanded(false);
              onSearch("");
              inputRef.current?.focus();
            }}
          >
            <X size={18} aria-hidden="true" />
          </button>
        )}
        <button type="submit" className="ak-catalog-search-submit">
          Caută <ArrowRight size={17} aria-hidden="true" />
        </button>
      </div>
      {showSuggestions && (
        <div
          id="catalog-search-suggestions"
          className="ak-catalog-suggestions"
          aria-label="Sugestii de căutare"
        >
          {correction && (
            <button
              type="button"
              className="ak-suggestion-correction"
              onClick={() => commit(correction)}
            >
              <span>
                Ai vrut să cauți <strong>{correction}</strong>?
              </span>
              <small>
                {correctedCount} {correctedCount === 1 ? "mașină" : "mașini"}
              </small>
            </button>
          )}
          <button type="button" className="ak-suggestion-all" onClick={() => commit(query)}>
            <span>Caută „{query}”</span>
            <small>
              {matches.length} {matches.length === 1 ? "mașină" : "mașini"}
            </small>
          </button>
          {matches.length > 0 ? (
            <>
              <p className="ak-suggestion-label">Mașini potrivite</p>
              {matches.slice(0, 3).map((vehicle) => (
                <Link
                  key={vehicle.slug}
                  to="/autoturisme/$slug"
                  params={{ slug: vehicle.slug }}
                  className="ak-suggestion-vehicle"
                  onClick={() => setExpanded(false)}
                >
                  <img src={vehicle.image} alt="" width={72} height={54} loading="lazy" />
                  <span>
                    <small className="ak-suggestion-brand">{vehicle.brand}</small>
                    <strong>
                      {(vehicle.title.startsWith(`${vehicle.brand} `)
                        ? vehicle.title.slice(vehicle.brand.length + 1)
                        : vehicle.title
                      ).replace("GLC SUV GLC", "GLC")}
                    </strong>
                    <small>
                      {vehicle.condition === "nou" ? "Nou" : "Rulat"} · {vehicle.year}
                    </small>
                  </span>
                  <b>{formatPrice(vehicle.priceEur)} €</b>
                </Link>
              ))}
            </>
          ) : (
            <p className="ak-suggestion-empty">
              {correction
                ? "Poți alege sugestia de mai sus sau modifica termenul."
                : "Nicio potrivire cu filtrele actuale. Încearcă un termen mai scurt sau ajustează filtrele."}
            </p>
          )}
        </div>
      )}
    </form>
  );
}
