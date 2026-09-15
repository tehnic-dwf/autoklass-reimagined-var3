import { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { vehicles } from "@/data/vehicles";
import { matchingVehicles, type VehicleSearch } from "@/lib/vehicle-search";
import { VehicleCard } from "@/components/vehicle/VehicleCard";

const categories = [
  { label: "SUV", search: { body: "SUV" }, slug: "mercedes-benz-glc-200-4matic-vu149616" },
  {
    label: "Limuzine",
    search: { body: "Limuzină" },
    slug: "mercedes-benz-clasa-a-200-limuzina-pj413906",
  },
  {
    label: "Coupé",
    search: { body: "Coupe" },
    slug: "mercedes-benz-glc-220-d-4matic-coupe-tf644939",
  },
  { label: "Compacte", search: { body: "Hatchback" }, slug: "honda-civic-5d-hu025350" },
];
const collections: { label: string; search: VehicleSearch }[] = [
  { label: "Selecția Autoklass", search: {} },
  { label: "Noi", search: { condition: "nou" } },
  { label: "Rulate", search: { condition: "rulat" } },
  { label: "Electrice", search: { fuel: "Electric" } },
  { label: "Hibride", search: { fuel: "Hibrid" } },
  { label: "Sub 40.000 €", search: { maxPrice: "40000" } },
];
const featured = [
  "mercedes-benz-glc-200-4matic-vu149616",
  "xpeng-g6-awd-performance-sb179466",
  "honda-civic-5d-hu025350",
  "mercedes-benz-clasa-a-200-limuzina-pj413906",
  "mercedes-benz-glc-220-d-4matic-coupe-tf644939",
  "honda-zr-v-advance-r2012298",
];

export function HomeVehicles() {
  const [selected, setSelected] = useState(0);
  const rail = useRef<HTMLDivElement>(null);
  const collection = collections[selected]!;
  const move = (direction: number) => {
    const element = rail.current;
    if (element)
      element.scrollBy({
        left: direction * ((element.firstElementChild?.clientWidth || element.clientWidth) + 24),
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
  };
  const matches = matchingVehicles(collection.search).filter((v) => !v.reserved);
  const displayed =
    selected === 0
      ? featured.flatMap((slug) => vehicles.filter((v) => v.slug === slug))
      : matches.slice(0, 6);
  return (
    <>
      <nav className="v3-shortcuts v3-wrap" aria-label="Servicii rapide">
        <Link to="/service/programare">
          Programare service <ArrowRight size={18} aria-hidden />
        </Link>
        <Link to="/service/tarife">
          Tarife service <ArrowRight size={18} aria-hidden />
        </Link>
        <a href="https://www.autoklass.ro/articole/cumparam.html">
          Evaluare buy-back <ArrowRight size={18} aria-hidden />
        </a>
        <a href="#servicii-autoklass">
          Toate serviciile <ArrowRight size={18} aria-hidden />
        </a>
      </nav>
      <section className="v3-wrap v3-section v3-discover" aria-labelledby="discover-title">
        <div className="v3-row">
          <h2 id="discover-title">Ce îți place să conduci?</h2>
          <Link className="v3-link" to="/autoturisme">
            Toate mașinile <ArrowRight size={18} aria-hidden />
          </Link>
        </div>
        <div className="v3-category-grid">
          {categories.map((category) => {
            const vehicle = vehicles.find((v) => v.slug === category.slug)!;
            return (
              <Link
                key={category.label}
                to="/autoturisme"
                search={category.search}
                className="v3-category"
              >
                <div>
                  <img src={vehicle.image} alt="" width={800} height={600} loading="lazy" />
                </div>
                <span>
                  {category.label}
                  <ArrowRight size={22} aria-hidden />
                </span>
              </Link>
            );
          })}
        </div>
        <nav className="v3-brands" aria-label="Mărci auto">
          {["Mercedes-Benz", "Honda", "XPENG"].map((brand) => (
            <Link key={brand} to="/autoturisme" search={{ brand }}>
              {brand}
            </Link>
          ))}
          <a href="https://ploiesti.autoklass.ro/">
            Audi <span aria-hidden>↗</span>
          </a>
          <a href="https://www.brasov.autoklass.ro/marci/volkswagen">
            Volkswagen <span aria-hidden>↗</span>
          </a>
          <a href="https://www.autoklass.ro/autoutilitare-noi-mercedes">
            Autoutilitare <span aria-hidden>↗</span>
          </a>
        </nav>
      </section>
      <section className="v3-inventory" aria-labelledby="inventory-title">
        <div className="v3-wrap v3-section">
          <div className="v3-row">
            <h2 id="inventory-title">Următoarea ta mașină, aici.</h2>
            <span className="v3-muted">Prețuri cu TVA inclus</span>
          </div>
          <div className="v3-collection-tabs" role="group" aria-label="Selecții de mașini">
            {collections.map((item, index) => (
              <button
                key={item.label}
                type="button"
                aria-pressed={selected === index}
                onClick={() => {
                  setSelected(index);
                  rail.current?.scrollTo({ left: 0, behavior: "instant" });
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div ref={rail} className="v3-cards v3-home-cars" aria-live="polite">
            {displayed.map((vehicle) => (
              <VehicleCard key={vehicle.slug} vehicle={vehicle} compact />
            ))}
          </div>
          <div className="v3-rail-controls">
            <button className="v3-icon" aria-label="Mașinile precedente" onClick={() => move(-1)}>
              <ArrowLeft aria-hidden />
            </button>
            <button className="v3-icon" aria-label="Mașinile următoare" onClick={() => move(1)}>
              <ArrowRight aria-hidden />
            </button>
          </div>
          <div className="v3-collection-end">
            <Link className="v3-button secondary" to="/autoturisme" search={collection.search}>
              Vezi toate mașinile ({matchingVehicles(collection.search).length}){" "}
              <ArrowRight size={18} aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
