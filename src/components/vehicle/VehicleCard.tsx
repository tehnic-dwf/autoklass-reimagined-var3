import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { type Vehicle, formatPrice, formatKm } from "@/data/vehicles";
import { shortTitle, availabilityOf } from "@/lib/vehicle-search";
import { FavoriteButton } from "./FavoriteButton";
export function VehicleCard({ vehicle: v }: { vehicle: Vehicle }) {
  return (
    <article className="v3-car">
      <div className="v3-car-image">
        <Link to="/autoturisme/$slug" params={{ slug: v.slug }} aria-label={`Vezi ${v.title}`}>
          <img src={v.image} alt={v.title} loading="lazy" />
        </Link>
        <FavoriteButton slug={v.slug} className="absolute right-4 top-4 bg-white" />
      </div>
      <div className="v3-car-body">
        <p className="v3-small v3-muted">
          {v.condition === "nou" ? "Autoturism nou" : "Autoturism rulat"} · {v.year}
        </p>
        <Link to="/autoturisme/$slug" params={{ slug: v.slug }}>
          <h3>{shortTitle(v)}</h3>
        </Link>
        <div className="v3-car-specs">
          <span>
            {v.fuel}
            {v.hybrid ? " · hibrid" : ""}
          </span>
          <span>{v.powerHp} CP</span>
          <span>{v.gearbox}</span>
          {v.km !== null && <span>{formatKm(v.km)}</span>}
        </div>
        <p className="v3-price">{formatPrice(v.priceEur)} €</p>
        <p className="v3-small v3-muted mt-1">
          TVA inclus · {v.vat === "deductibil" ? "deductibil" : "nedeductibil"}
        </p>
        <div className="v3-row mt-6">
          <div className="v3-small v3-muted">
            <p>{v.branch}</p>
            <p>{availabilityOf(v)}</p>
          </div>
          <Link
            className="v3-icon"
            to="/autoturisme/$slug"
            params={{ slug: v.slug }}
            aria-label={`Detalii ${v.title}`}
          >
            <ArrowUpRight size={22} strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </article>
  );
}
