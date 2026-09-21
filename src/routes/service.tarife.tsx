import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Search } from "lucide-react";
import { useState } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import {
  serviceItems,
  serviceRates,
  tariffEffectiveDate,
  serviceName,
  rateRange,
  rateUnit,
} from "@/data/service-prices";
import { formatPrice } from "@/data/vehicles";
import { normalized } from "@/data/demo-vehicle";
import "@/service-mobile.css";

export const Route = createFileRoute("/service/tarife")({
  head: () => ({ meta: [{ title: "Servicii și tarife | Autoklass" }] }),
  component: Tariffs,
});
function Tariffs() {
  const [service, setService] = useState("");
  const [query, setQuery] = useState("");
  const items = serviceRates.filter(
    (rate) =>
      (!service || rate.serviceIds.includes(service)) &&
      normalized(
        [rate.title, rate.description, rate.group, ...rate.serviceIds.map(serviceName)].join(" "),
      ).includes(normalized(query)),
  );
  const groups = [...new Set(items.map((rate) => rate.group))];
  return (
    <div className="v3 service-redesign service-tariffs">
      <SiteHeader />
      <main id="main-content">
        <section className="service-tariff-hero">
          <div className="v3-wrap v3-section">
            <p className="v3-kicker">Service Autoklass</p>
            <h1 className="service-page-title">Tarife service</h1>
            <p className="v3-intro">
              Intervale de preț pentru manoperă și ITP. Devizul final se stabilește după verificarea
              mașinii.
            </p>
            <Link className="v3-button service-primary" to="/service/programare">
              Programare service <ArrowRight size={20} aria-hidden />
            </Link>
            <p className="service-tariff-date">TVA inclus · Tarife din {tariffEffectiveDate}</p>
          </div>
        </section>
        <section
          className="v3-wrap v3-section service-tariff-content"
          aria-labelledby="tariff-heading"
        >
          <h2 id="tariff-heading">Găsește tariful tău</h2>
          <div className="service-tariff-filters">
            <label className="v3-field">
              <span>Serviciul dorit</span>
              <select value={service} onChange={(e) => setService(e.target.value)}>
                <option value="">Toate serviciile</option>
                {serviceItems.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.title}
                  </option>
                ))}
              </select>
            </label>
            <label className="v3-field">
              <span>Caută după model sau serviciu</span>
              <input
                type="search"
                placeholder="De exemplu: GLC, frâne, ITP"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>
          </div>
          <p className="service-results" role="status">
            {items.length} categorii tarifare
          </p>
          {groups.map((group) => (
            <section key={group} className="service-rate-group" aria-label={group}>
              <h2>{group}</h2>
              {items
                .filter((rate) => rate.group === group)
                .map((rate) => {
                  const range = rateRange([rate]);
                  return (
                    <article key={rate.id} className="service-rate">
                      <h3>{rate.title}</h3>
                      <p className="service-rate-description">{rate.description}</p>
                      <p className="service-rate-price">
                        {range ? (
                          <>
                            {formatPrice(range.min)}
                            {range.max !== range.min ? `–${formatPrice(range.max)}` : ""}
                            <span> {rateUnit(rate)}</span>
                          </>
                        ) : (
                          "Tarif la cerere"
                        )}
                      </p>
                      <details className="service-rate-conditions">
                        <summary>Ce include tariful</summary>
                        <p>
                          {rate.note}{" "}
                          {rate.unit === "hour"
                            ? "Tariful este pentru o oră de manoperă. Numărul de ore, piesele și consumabilele se stabilesc separat în deviz."
                            : "Tarifele afișate sunt pentru inspecția inițială. Disponibilitatea și categoria aplicabilă se confirmă la programare."}
                        </p>
                      </details>
                      <Link
                        className="v3-link service-rate-action"
                        to="/service/programare"
                        search={{ service: service || rate.serviceIds[0], rate: rate.id }}
                      >
                        Solicită programare <ArrowRight size={18} aria-hidden />
                      </Link>
                    </article>
                  );
                })}
            </section>
          ))}
          {!items.length && (
            <div className="service-empty">
              <Search size={28} aria-hidden />
              <h3>{service === "roti" ? "Un tarif pentru roțile tale" : "Nu am găsit un tarif"}</h3>
              <p>
                {service === "roti"
                  ? "Costul depinde de operațiune și de dimensiunea jantelor. Spune-ne ce ai nevoie în formularul de programare."
                  : "Încearcă alt model sau serviciu. Poți cere detalii și prin formularul de programare."}
              </p>
              <Link
                className="v3-button"
                to="/service/programare"
                search={service ? { service } : {}}
              >
                Programare service <ArrowRight size={18} aria-hidden />
              </Link>
              <button
                className="v3-link"
                onClick={() => {
                  setQuery("");
                  setService("");
                }}
              >
                Resetează filtrele
              </button>
            </div>
          )}
          <div className="service-tariff-close">
            <h2>Mașina ta, pe mâini bune.</h2>
            <p>
              Alege serviciul și ziua preferată. Echipa service te contactează pentru confirmare.
            </p>
            <Link
              className="v3-button"
              to="/service/programare"
              search={service ? { service } : {}}
            >
              Programare service <ArrowRight size={20} aria-hidden />
            </Link>
          </div>
          <p className="service-source-note">
            Intervalele reunesc tarifele publicate în rețeaua Autoklass. Pentru modelele V și X sau
            servicii care nu apar aici, costul se confirmă individual.
          </p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
