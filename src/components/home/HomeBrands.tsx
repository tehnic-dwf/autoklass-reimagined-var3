import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import mercedes from "@/assets/brands/mercedes.png";
import audi from "@/assets/brands/audi.png";
import volkswagen from "@/assets/brands/volkswagen.png";
import honda from "@/assets/brands/honda.png";
import xpeng from "@/assets/brands/xpeng.png";
import { vehicles } from "@/data/vehicles";
import { VehicleCard } from "@/components/vehicle/VehicleCard";
export function HomeBrands() {
  return (
    <section className="v3-wrap v3-section ak-brands" aria-labelledby="brands-title">
      <h2 id="brands-title">Mărcile Autoklass.</h2>
      <nav aria-label="Alege marca" className="ak-brand-grid">
        {(
          [
            ["Mercedes-Benz", mercedes],
            ["Audi", audi],
            ["Volkswagen", volkswagen],
            ["Honda", honda],
            ["XPENG", xpeng],
          ] as const
        ).map(([brand, logo]) => (
          <Link key={brand} to="/autoturisme" search={{ brand }}>
            <span>
              <img src={logo} alt="" width={100} height={72} loading="lazy" />
            </span>
            <span>{brand}</span>
          </Link>
        ))}
      </nav>
    </section>
  );
}
export function HomeOffers() {
  const offers = vehicles
    .filter((v) => v.listPriceEur && v.listPriceEur > v.priceEur && !v.reserved)
    .slice(0, 4);
  return (
    <section className="ak-offers v3-section" aria-labelledby="offers-title">
      <div className="v3-wrap">
        <div className="v3-row">
          <h2 id="offers-title">Oferte auto.</h2>
          <Link className="v3-link" to="/autoturisme" search={{ offer: "yes" }}>
            Vezi toate <ArrowRight size={18} />
          </Link>
        </div>
        <div className="v3-cards v3-home-cars">
          {offers.map((v) => (
            <VehicleCard key={v.slug} vehicle={v} compact />
          ))}
        </div>
        <div className="ak-service-offer">
          <div>
            <h3>Pick-up service</h3>
            <p>Preluare și livrare · 295 lei, TVA inclus</p>
          </div>
          <a className="v3-link" href="https://www.autoklass.ro/articole/pick-up-service.html">
            Vezi condițiile <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
