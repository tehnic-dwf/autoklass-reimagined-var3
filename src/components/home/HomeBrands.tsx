import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import mercedes from "@/assets/brands/mercedes.png";
import audi from "@/assets/brands/audi.png";
import volkswagen from "@/assets/brands/volkswagen.png";
import honda from "@/assets/brands/honda.png";
import ford from "@/assets/brands/ford.webp";
import autoklass from "@/assets/autoklass-logo.png";
import campaignPhoto from "@/assets/showroom-poster.jpg";
import xpeng from "@/assets/brands/xpeng.png";
import { vehicles } from "@/data/vehicles";
import { VehicleCard } from "@/components/vehicle/VehicleCard";
import { OfferRail } from "./OfferRail";
import { autoOfferSelections, serviceOffers } from "@/data/home-offers";
const brands = [
  ["Mercedes-Benz", mercedes],
  ["Audi", audi],
  ["Volkswagen", volkswagen],
  ["Honda", honda],
  ["XPENG", xpeng],
] as const;
const dwaLogo =
  "https://cdn.contentspeed.ro/autoklass.websales.ro/cs-content/cs-photos/wysiwyg/26857a86a2f8b9c8174c43655bfc195a1754293563.jpeg";
export function HomeBrands() {
  return (
    <section className="v3-wrap v3-section ak-brands" aria-labelledby="brands-title">
      <h2 id="brands-title">Centru autorizat de vânzări.</h2>
      <nav aria-label="Mărci reprezentate oficial" className="ak-brand-grid ak-authorized-brands">
        {brands.map(([brand, logo]) => (
          <Link key={brand} to="/autoturisme" search={{ brand }}>
            <span>
              <img src={logo} alt="" width={100} height={72} loading="lazy" />
            </span>
            <span>{brand}</span>
          </Link>
        ))}
        <div className="ak-brand-upcoming">
          <span className="ak-ford-wordmark">
            <img src={ford} alt="Ford" width={384} height={144} loading="lazy" />
          </span>
          <span>În curând</span>
        </div>
      </nav>
      <section className="ak-used-brands" aria-labelledby="used-brands-title">
        <h3 id="used-brands-title">Autovehicule rulate</h3>
        <div className="ak-used-destinations">
          <Link to="/autoturisme" search={{ condition: "rulat" }} className="ak-used-stock">
            <img src={autoklass} alt="Autoklass" width={128} height={32} loading="lazy" />
            <span>
              Toate mărcile <ArrowRight size={18} aria-hidden />
            </span>
          </Link>
          <div className="ak-used-network">
            <img src={dwaLogo} alt="Das WeltAuto" width={140} height={56} loading="lazy" />
            <nav aria-label="Locații Das WeltAuto">
              <a href="https://www.dasweltauto.ro/haendler/ploiesti/10267/s">
                Ploiești <ArrowUpRight size={16} aria-hidden />
              </a>
              <a href="https://www.dasweltauto.ro/haendler/brasov/10272/s">
                Brașov <ArrowUpRight size={16} aria-hidden />
              </a>
            </nav>
          </div>
        </div>
      </section>
    </section>
  );
}
export function HomeOffers() {
  return (
    <>
      {autoOfferSelections.map((collection) => (
        <OfferRail
          key={collection.id}
          title={collection.title}
          sectionId={`oferte-${collection.id}`}
          intro={
            collection.id === "vanzari" ? (
              <div className="ak-sales-intro">
                <a
                  className="ak-sales-campaign"
                  href="https://www.autoklass.ro/articole/ofertele-verii-suv.html"
                >
                  <img
                    src="https://cdn.contentspeed.ro/autoklass.websales.ro/cs-content/cs-photos/wysiwyg/69bf1a02836c9fb877da5f83b3d2e7001784549291.jpg"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = campaignPhoto;
                    }}
                    alt=""
                    width={800}
                    height={450}
                    loading="lazy"
                  />
                  <div>
                    <span className="ak-campaign-eyebrow">
                      Modele participante: GLB · GLC · GLE
                    </span>
                    <strong>Mercedes-Benz SUV</strong>
                    <p>
                      Avantaj client de până la <b>14.520 €</b> și 3 revizii incluse.
                    </p>
                    <small>Livrare până la 30.09.2026</small>
                    <span className="ak-campaign-link">
                      Descoperă campania <ArrowUpRight size={18} aria-hidden />
                    </span>
                  </div>
                </a>
                <h3 className="ak-stock-offers-title">Mașini cu preț redus</h3>
              </div>
            ) : undefined
          }
          action={
            <Link className="v3-link" to="/autoturisme" search={collection.search}>
              Toate ofertele <ArrowRight size={18} aria-hidden />
            </Link>
          }
        >
          {collection.slugs.flatMap((slug) => {
            const vehicle = vehicles.find(
              (v) =>
                v.slug === slug && !v.reserved && !!v.listPriceEur && v.listPriceEur > v.priceEur,
            );
            return vehicle ? [<VehicleCard key={slug} vehicle={vehicle} compact offerBadge />] : [];
          })}
        </OfferRail>
      ))}
    </>
  );
}
export function HomeServiceOffers() {
  return (
    <OfferRail
      title="Oferte service"
      sectionId="oferte-service"
      action={
        <Link className="v3-link" to="/service/programare">
          Programare service <ArrowRight size={18} aria-hidden />
        </Link>
      }
    >
      {serviceOffers.map((offer) => (
        <article key={offer.href} className="ak-service-promo">
          <a href={offer.href}>
            <div className="ak-service-promo-copy">
              <h3>{offer.title}</h3>
              <div className="ak-service-benefit">
                <strong>{offer.benefit}</strong>
                <span>{offer.benefitLabel}</span>
              </div>
              <p>{offer.description}</p>
              <small>{offer.terms}</small>
              <span className="v3-link">
                Vezi oferta <ArrowUpRight size={18} aria-hidden />
              </span>
            </div>
          </a>
        </article>
      ))}
    </OfferRail>
  );
}
