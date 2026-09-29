import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { type Vehicle, formatPrice } from "@/data/vehicles";
import { shortTitle } from "@/lib/vehicle-search";
import { VehicleFacts } from "./VehicleFacts";
import { FavoriteButton } from "./FavoriteButton";
export function VehicleCard({
  vehicle: v,
  compact = false,
  offerBadge = false,
}: {
  vehicle: Vehicle;
  compact?: boolean;
  offerBadge?: boolean;
}) {
  return (
    <article className="v3-car">
      <div className="v3-car-image">
        <Link to="/autoturisme/$slug" params={{ slug: v.slug }} aria-label={`Vezi ${v.title}`}>
          <img src={v.image} alt={v.title} width={800} height={600} loading="lazy" />
        </Link>
        <span className={`v3-car-condition ak-badge ${v.condition}`}>
          {v.condition === "nou" ? "Nou" : "Rulat"}
        </span>
        {!!v.listPriceEur && v.listPriceEur > v.priceEur && (
          <span className="ak-discount-badge">
            {offerBadge ? "Ofertă · " : ""}−{formatPrice(v.listPriceEur - v.priceEur)} €
          </span>
        )}
        <FavoriteButton slug={v.slug} className="absolute right-3 top-3 bg-white" />
      </div>
      <div className="v3-car-body">
        <p className="v3-car-brand">
          {v.brand}
          <span className="ak-card-year">{v.year}</span>
        </p>
        <Link to="/autoturisme/$slug" params={{ slug: v.slug }}>
          <h3>{shortTitle(v).replace(`${v.brand} `, "")}</h3>
        </Link>
        <VehicleFacts vehicle={v} compact />
        <div className="v3-car-price-row">
          <div>
            {!!v.listPriceEur && v.listPriceEur > v.priceEur && (
              <del className="ak-old-price">{formatPrice(v.listPriceEur)} €</del>
            )}
            <p className="v3-price">{formatPrice(v.priceEur)} €</p>
            {!compact && (
              <p className="v3-small v3-muted">
                TVA inclus{v.vat === "deductibil" ? ", deductibil" : ""}
              </p>
            )}
          </div>
          <Link
            className="v3-card-details"
            to="/autoturisme/$slug"
            params={{ slug: v.slug }}
            aria-label={`Detalii ${v.title}`}
          >
            Detalii <ArrowUpRight size={18} strokeWidth={1.5} aria-hidden />
          </Link>
        </div>
        {!compact && (
          <p className="v3-car-location">
            {v.branch}
            {v.reserved ? " · Indisponibil" : v.availability ? ` · ${v.availability}` : ""}
          </p>
        )}
      </div>
    </article>
  );
}
