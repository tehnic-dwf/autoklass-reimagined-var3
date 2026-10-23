import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, LocateFixed, MapPin, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import {
  serviceItems,
  serviceRates,
  serviceName,
  branchName,
  ratePrice,
  rateUnit,
} from "@/data/service-prices";
import { formatPrice } from "@/data/vehicles";
import { normalized } from "@/data/demo-vehicle";
import { suggestServiceBranch } from "@/lib/service-branch-suggestion";
import { ClassicSelect } from "@/components/ui/ClassicSelect";
import "@/service-mobile.css";

export const Route = createFileRoute("/service/tarife")({
  head: () => ({ meta: [{ title: "Servicii și tarife | Autoklass" }] }),
  component: Tariffs,
});
function Tariffs() {
  const [branch, setBranch] = useState("");
  const [proposedBranch, setProposedBranch] = useState("");
  const [locationStatus, setLocationStatus] = useState<"idle" | "locating" | "error" | "far">(
    "idle",
  );
  const [service, setService] = useState("");
  const [query, setQuery] = useState("");
  useEffect(() => {
    if (!navigator.permissions?.query || !navigator.geolocation) return;
    let active = true;
    navigator.permissions
      .query({ name: "geolocation" })
      .then((permission) => {
        if (active && permission.state === "granted") proposeFromLocation();
      })
      .catch(() => undefined);
    return () => {
      active = false;
    };
  }, []);
  const proposeFromLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus("error");
      return;
    }
    setLocationStatus("locating");
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const suggestion = suggestServiceBranch(coords.latitude, coords.longitude);
        setProposedBranch(suggestion || "");
        setLocationStatus(suggestion ? "idle" : "far");
      },
      () => setLocationStatus("error"),
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 },
    );
  };
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
              Alege sucursala și vezi tarifele pentru manoperă sau ITP. Costul final al lucrărilor
              se stabilește în deviz.
            </p>
            <Link className="v3-button service-primary" to="/service/programare">
              Programare service <ArrowRight size={20} aria-hidden />
            </Link>
          </div>
        </section>
        <section
          className="v3-wrap v3-section service-tariff-content"
          aria-labelledby="tariff-heading"
        >
          <section className="service-branch-choice" aria-labelledby="branch-choice-heading">
            <div className="service-branch-copy">
              <h2 id="branch-choice-heading">Alege sucursala</h2>
              <p>Alege sucursala pentru a vedea tarifele.</p>
            </div>
            <div className="service-branch-controls">
              <ClassicSelect
                label="Oraș și sucursală"
                value={branch}
                placeholder="Selectează sucursala"
                groups={[
                  {
                    label: "București",
                    options: [
                      { value: "sud", label: "Autoklass Sud" },
                      { value: "pipera", label: "Autoklass Pipera" },
                      { value: "chitila", label: "Autoklass Chitila" },
                    ],
                  },
                  {
                    label: "Alte orașe",
                    options: [
                      { value: "constanta", label: "Constanța" },
                      { value: "ploiesti", label: "Ploiești" },
                      { value: "sibiu", label: "Sibiu" },
                      { value: "timisoara", label: "Timișoara" },
                      { value: "cluj", label: "Cluj" },
                    ],
                  },
                ]}
                onChange={(next) => {
                  setBranch(next);
                  setProposedBranch("");
                  setLocationStatus("idle");
                }}
              />
              <button
                type="button"
                className="service-location-button"
                onClick={proposeFromLocation}
                disabled={locationStatus === "locating"}
              >
                <LocateFixed size={18} aria-hidden />
                {locationStatus === "locating"
                  ? "Căutăm o sucursală apropiată…"
                  : "Folosește locația mea"}
              </button>
            </div>
            {proposedBranch && (
              <div className="service-branch-suggestion" role="status">
                <MapPin size={20} aria-hidden />
                <div>
                  <span>Am găsit o sucursală în apropiere</span>
                  <strong>{branchName(proposedBranch)}</strong>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setBranch(proposedBranch);
                    setProposedBranch("");
                  }}
                >
                  Vezi tarifele <ArrowRight size={17} aria-hidden />
                </button>
              </div>
            )}
            {locationStatus === "error" && (
              <p className="service-location-message" role="status">
                Nu am putut folosi locația. Poți alege sucursala din listă.
              </p>
            )}
            {locationStatus === "far" && (
              <p className="service-location-message" role="status">
                Nu am identificat o sucursală cu tarife publicate în apropiere. Alege una din listă.
              </p>
            )}
          </section>
          {branch && (
            <>
              <h2 id="tariff-heading">Tarife pentru {branchName(branch)}</h2>
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
                      const price = branch ? ratePrice(rate, branch) : undefined;
                      return (
                        <article key={rate.id} className="service-rate">
                          <h3>{rate.title}</h3>
                          <p className="service-rate-description">{rate.description}</p>
                          <p className="service-rate-price">
                            {typeof price === "number" ? (
                              <>
                                {formatPrice(price)}
                                <span> {rateUnit(rate)}</span>
                              </>
                            ) : (
                              <span className="service-rate-unavailable">
                                {branch ? "Tarif la cerere" : "Alege sucursala"}
                              </span>
                            )}
                          </p>
                          {branch && typeof price !== "number" && (
                            <p className="service-rate-missing">
                              Nu avem un tarif publicat pentru această categorie la{" "}
                              {branchName(branch)}.
                            </p>
                          )}
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
                            search={{
                              service: service || rate.serviceIds[0],
                              rate: rate.id,
                              ...(branch ? { branch } : {}),
                            }}
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
                  <h3>
                    {service === "roti" ? "Un tarif pentru roțile tale" : "Nu am găsit un tarif"}
                  </h3>
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
                  Alege serviciul și ziua preferată. Echipa service te contactează pentru
                  confirmare.
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
                Tarife cu TVA inclus. Pentru modelele V și X sau servicii care nu apar aici, costul
                se confirmă individual.
              </p>
            </>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
