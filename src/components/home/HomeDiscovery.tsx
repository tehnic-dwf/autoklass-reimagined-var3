import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowLeft, Building2, Users, Route, Zap } from "lucide-react";
import { useRef } from "react";
import { matchingVehicles, type VehicleSearch } from "@/lib/vehicle-search";
import suv from "@/assets/discovery/suv.webp";
import sedan from "@/assets/discovery/sedan.webp";
import coupe from "@/assets/discovery/coupe.webp";
import compact from "@/assets/discovery/compact.webp";

const bodies: { name: string; image: string; search: VehicleSearch }[] = [
  { name: "SUV", image: suv, search: { body: "SUV" } },
  { name: "Limuzine", image: sedan, search: { body: "Limuzină" } },
  { name: "Coupé", image: coupe, search: { body: "Coupe" } },
  { name: "Compacte", image: compact, search: { body: "Hatchback" } },
];
const needs = [
  {
    name: "Pentru oraș",
    image: compact,
    icon: Building2,
    tone: "city",
    criteria: ["Compacte", "Până la 40.000 €"],
    search: { body: "Hatchback", maxPrice: "40000" },
  },
  {
    name: "Pentru familie",
    image: suv,
    icon: Users,
    tone: "family",
    criteria: ["SUV", "Până la 60.000 €"],
    search: { body: "SUV", maxPrice: "60000" },
  },
  {
    name: "Drumuri lungi",
    image: sedan,
    icon: Route,
    tone: "travel",
    criteria: ["Diesel", "Cutie automată"],
    search: { fuel: "Diesel", gearbox: "Automată" },
  },
  {
    name: "Treci la electric",
    image: suv,
    icon: Zap,
    tone: "electric",
    criteria: ["100% electrice"],
    search: { fuel: "Electric" },
  },
] satisfies {
  name: string;
  image: string;
  icon: typeof Users;
  tone: string;
  criteria: string[];
  search: VehicleSearch;
}[];

function resultLabel(search: VehicleSearch) {
  const count = matchingVehicles(search).length;
  return `${count} ${count === 1 ? "mașină" : "mașini"}`;
}

export function HomeBodyCategories() {
  return (
    <section className="v3-wrap v3-section ak-body-discovery" aria-labelledby="discover-title">
      <div className="ak-discovery-heading">
        <h2 id="discover-title">Alege caroseria.</h2>
        <Link className="v3-link" to="/autoturisme">
          Toate mașinile <ArrowRight size={18} aria-hidden />
        </Link>
      </div>
      <div className="ak-body-grid">
        {bodies.map((body) => (
          <Link className="ak-body-tile" key={body.name} to="/autoturisme" search={body.search}>
            <img src={body.image} alt="" width={600} height={400} loading="lazy" />
            <span className="ak-body-name">{body.name}</span>
            <span className="ak-body-count">{resultLabel(body.search)}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function HomeNeedsCategories() {
  const rail = useRef<HTMLDivElement>(null);
  const move = (direction: number) => {
    const element = rail.current;
    if (!element) return;
    element.scrollBy({
      left: direction * ((element.firstElementChild?.clientWidth || element.clientWidth) + 16),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  };
  return (
    <section className="v3-wrap v3-section ak-needs-discovery" aria-labelledby="needs-title">
      <div className="ak-discovery-heading">
        <h2 id="needs-title">Alege după nevoile tale.</h2>
        <p>Pornește de la o selecție. Ajustează filtrele după tine.</p>
      </div>
      <div className="ak-needs-rail" ref={rail}>
        {needs.map(({ name, image, icon: Icon, tone, criteria, search }) => (
          <Link className={`ak-need-card ${tone}`} key={name} to="/autoturisme" search={search}>
            <div className="ak-need-visual">
              <Icon size={24} strokeWidth={1.5} aria-hidden />
              <img src={image} alt="" width={600} height={400} loading="lazy" />
            </div>
            <div className="ak-need-copy">
              <h3>{name}</h3>
              <ul aria-label="Criteriile selecției">
                {criteria.map((criterion) => (
                  <li key={criterion}>{criterion}</li>
                ))}
              </ul>
              <span className="ak-need-link">
                Vezi {resultLabel(search)} <ArrowRight size={18} aria-hidden />
              </span>
            </div>
          </Link>
        ))}
      </div>
      <div className="ak-discovery-controls">
        <button className="v3-icon" aria-label="Selecțiile precedente" onClick={() => move(-1)}>
          <ArrowLeft aria-hidden />
        </button>
        <button className="v3-icon" aria-label="Selecțiile următoare" onClick={() => move(1)}>
          <ArrowRight aria-hidden />
        </button>
      </div>
    </section>
  );
}
