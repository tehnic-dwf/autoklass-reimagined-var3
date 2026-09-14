import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Search } from "lucide-react";
import { useState } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import {
  serviceItems,
  serviceBranches,
  serviceRates,
  tariffEffectiveDate,
  branchName,
  serviceName,
  ratePrice,
  rateUnit,
} from "@/data/service-prices";
import { formatPrice } from "@/data/vehicles";
import { normalized } from "@/data/demo-vehicle";
export const Route = createFileRoute("/service/tarife")({
  head: () => ({ meta: [{ title: "Servicii și tarife | Autoklass" }] }),
  component: Tariffs,
});
function Tariffs() {
  const [branch, setBranch] = useState("pipera");
  const [service, setService] = useState("");
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState("");
  const groups = [...new Set(serviceRates.map((rate) => rate.group))];
  const items = serviceRates.filter(
    (rate) =>
      (!service || rate.serviceIds.includes(service)) &&
      (!group || rate.group === group) &&
      normalized(
        [rate.title, rate.description, rate.group, ...rate.serviceIds.map(serviceName)].join(" "),
      ).includes(normalized(query)),
  );
  const selectedService = serviceItems.find((item) => item.id === service);
  return (
    <div className="v3">
      <SiteHeader />
      <main id="main-content">
        <section className="bg-[#f4f5f5]">
          <div className="v3-wrap v3-section">
            <p className="v3-kicker">Service Mercedes-Benz</p>
            <h1>Tariful potrivit mașinii tale.</h1>
            <p className="v3-intro">
              Consultă manopera pe oră și tarifele ITP pentru sucursala ta. Costul unei lucrări se
              estimează după mașină, timpul necesar și piese.
            </p>
            <div className="v3-grid mt-8 max-w-3xl">
              <label className="v3-field">
                <span>Alege sucursala</span>
                <select value={branch} onChange={(e) => setBranch(e.target.value)}>
                  {serviceBranches.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="v3-field">
                <span>Serviciul dorit</span>
                <select
                  value={service}
                  onChange={(e) => {
                    setService(e.target.value);
                    setGroup("");
                  }}
                >
                  <option value="">Toate serviciile</option>
                  {serviceItems.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.title}
                    </option>
                  ))}
                </select>
              </label>
              <label className="v3-field">
                <span>Categorie tarifară</span>
                <select value={group} onChange={(e) => setGroup(e.target.value)}>
                  <option value="">Toate categoriile</option>
                  {groups.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </label>
              <label className="v3-field">
                <span>Caută un model sau serviciu</span>
                <input
                  type="search"
                  placeholder="GLC, revizie, frâne, ITP…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </label>
            </div>
            <p className="v3-notice mt-8">
              Tarife din {tariffEffectiveDate}, cu TVA inclus. Alege categoria după model și
              vechime. Tariful orar nu reprezintă costul complet al unei revizii sau reparații.
            </p>
          </div>
        </section>
        <section className="v3-wrap v3-section" aria-labelledby="tariff-heading">
          <div className="v3-row mb-8">
            <div>
              <h2 id="tariff-heading">{selectedService?.title || "Manoperă și inspecții"}</h2>
              {selectedService && <p className="v3-intro">{selectedService.description}</p>}
            </div>
            {selectedService && (
              <Link
                className="v3-button secondary"
                to="/service/programare"
                search={{ branch, service, intent: "estimate" }}
              >
                Solicită estimare <ArrowRight size={18} />
              </Link>
            )}
          </div>
          <p className="v3-small v3-muted mb-4" role="status">
            {items.length} categorii tarifare · {branchName(branch)}
          </p>
          {items.map((rate) => {
            const price = ratePrice(rate, branch);
            return (
              <article key={rate.id} className="v3-tariff">
                <div>
                  <p className="v3-kicker">{rate.group}</p>
                  <h3>{rate.title}</h3>
                  <p className="v3-muted max-w-prose">{rate.description}</p>
                  <details className="v3-disclosure mt-4 max-w-prose">
                    <summary>Condițiile tarifului</summary>
                    <div className="v3-small v3-muted">
                      {rate.note}
                      {rate.unit === "hour" &&
                        " Numărul de ore, piesele și consumabilele se stabilesc separat în deviz."}
                      {rate.unit === "inspection" &&
                        branch === "timisoara" &&
                        " La Timișoara, ITP-ul este subcontractat."}
                    </div>
                  </details>
                </div>
                <div className="sm:min-w-52">
                  <p className="v3-price">
                    {price !== undefined
                      ? `${formatPrice(price)} ${rateUnit(rate)}`
                      : "Tarif la cerere"}
                  </p>
                  <p className="v3-small v3-muted mt-2">
                    {price !== undefined
                      ? "TVA inclus"
                      : "Valoare nepublicată pentru această sucursală"}
                  </p>
                  <Link
                    className="v3-link mt-4"
                    to="/service/programare"
                    search={{
                      branch,
                      service: service || rate.serviceIds[0],
                      rate: rate.id,
                      intent: "estimate",
                    }}
                  >
                    Solicită estimare <ArrowRight size={18} />
                  </Link>
                </div>
              </article>
            );
          })}
          {!items.length && (
            <div className="v3-empty">
              <Search size={32} className="mx-auto mb-6" />
              <h3>
                {service === "roti"
                  ? "Estimare pentru roțile tale."
                  : "Nicio categorie pentru această selecție."}
              </h3>
              <p>
                {service === "roti"
                  ? "Tariful depinde de operațiune și de dimensiunea jantelor. Include aceste detalii în solicitare."
                  : "Schimbă filtrele sau solicită o estimare pentru mașina ta."}
              </p>
              <Link
                className="v3-button"
                to="/service/programare"
                search={{ branch, ...(service ? { service } : {}), intent: "estimate" }}
              >
                Solicită estimare <ArrowRight size={18} />
              </Link>
              <div>
                <button
                  className="v3-link mt-4"
                  onClick={() => {
                    setQuery("");
                    setGroup("");
                    setService("");
                  }}
                >
                  Vezi toate categoriile
                </button>
              </div>
            </div>
          )}
          <div className="v3-grid bg-[#f4f5f5] p-6 mt-12">
            <div>
              <h3>Ai nevoie de o programare?</h3>
              <p className="v3-intro">
                Alege serviciul și intervalul preferat. Echipa service va confirma disponibilitatea.
              </p>
            </div>
            <div className="flex items-center sm:justify-end">
              <Link
                className="v3-button"
                to="/service/programare"
                search={{ branch, ...(service ? { service } : {}), intent: "appointment" }}
              >
                Solicită programare <ArrowRight size={18} />
              </Link>
            </div>
          </div>
          <p className="v3-small v3-muted mt-8">
            Selecție din lista de tarife Autoklass din {tariffEffectiveDate}, pentru autoturisme
            Mercedes-Benz. Devizul final se stabilește după evaluarea mașinii. Pentru modelele V și
            X sau alte servicii, solicită o estimare individuală.
          </p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
