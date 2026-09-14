import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { useRef, useState } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ContactFields } from "@/components/prototype/ContactFields";
import { emptyContact, validateContact, type ContactValues } from "@/lib/contact-validation";
import {
  serviceBranches,
  serviceItems,
  serviceRates,
  branchName,
  serviceName,
  ratePrice,
  rateUnit,
  tariffEffectiveDate,
} from "@/data/service-prices";
import { formatPrice } from "@/data/vehicles";
type ServiceSearch = {
  branch?: string;
  service?: string;
  rate?: string;
  intent?: string;
  demo?: string;
};
export const Route = createFileRoute("/service/programare")({
  validateSearch: (s: Record<string, unknown>): ServiceSearch => {
    const out: ServiceSearch = {};
    for (const key of ["branch", "service", "rate", "intent", "demo"] as const)
      if (typeof s[key] === "string") out[key] = s[key] as string;
    return out;
  },
  head: () => ({ meta: [{ title: "Solicitare service | Autoklass" }] }),
  component: ServiceRequest,
});
function ServiceRequest() {
  const search = Route.useSearch();
  const [intent, setIntent] = useState(search.intent === "estimate" ? "estimate" : "appointment");
  const [branch, setBranch] = useState(
    serviceBranches.some((b) => b.id === search.branch) ? search.branch! : "",
  );
  const [service, setService] = useState(
    serviceItems.some((s) => s.id === search.service) ? search.service! : "",
  );
  const [rate, setRate] = useState(
    serviceRates.some(
      (item) => item.id === search.rate && item.serviceIds.includes(search.service || ""),
    )
      ? search.rate!
      : "",
  );
  const availableRates = serviceRates.filter((item) => item.serviceIds.includes(service));
  const selectedRate = availableRates.find((item) => item.id === rate);
  const selectedPrice = selectedRate ? ratePrice(selectedRate, branch) : undefined;
  const rateSummary = selectedRate ? (
    <div className="v3-notice" aria-live="polite">
      <p>Categorie tarifară: {selectedRate.title}</p>
      <p>{selectedRate.description}</p>
      <p>
        {selectedPrice !== undefined
          ? `${formatPrice(selectedPrice)} ${rateUnit(selectedRate)} · TVA inclus`
          : branch
            ? "Tarif nepublicat pentru sucursala aleasă"
            : "Alege o sucursală pentru a vedea tariful"}
      </p>
      <p>
        {selectedRate.unit === "hour"
          ? "Referință pentru manoperă. Costul lucrării, orele și piesele se estimează separat."
          : "Tarif pentru inspecția inițială; categoria se confirmă după datele mașinii."}
        {selectedRate.unit === "inspection" &&
          branch === "timisoara" &&
          " ITP subcontractat la Timișoara."}
      </p>
      <p>Lista de tarife din {tariffEffectiveDate}.</p>
    </div>
  ) : null;
  const [vin, setVin] = useState("");
  const [km, setKm] = useState("");
  const [unknown, setUnknown] = useState(false);
  const [problem, setProblem] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [contact, setContact] = useState<ContactValues>(emptyContact);
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "error" | "done">("idle");
  const attempts = useRef(0);
  const heading = useRef<HTMLHeadingElement>(null);
  const form = useRef<HTMLFormElement>(null);
  const title = intent === "estimate" ? "Solicită o estimare." : "Solicită o programare.";
  const day = new Date();
  const minDate = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, "0")}-${String(day.getDate()).padStart(2, "0")}`;
  const next = (n: number) => {
    setStep(n);
    setErrors({});
    requestAnimationFrame(() => {
      heading.current?.focus();
      heading.current?.scrollIntoView({ block: "start" });
    });
  };
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (step === 1) {
      if (!branch) errs["branch"] = "Alege o sucursală.";
      if (!service) errs["service"] = "Alege un serviciu.";
      if (service === "other" && !problem.trim())
        errs["problem"] = "Descrie pe scurt ce ai observat.";
      if (!unknown) {
        if (!/^[A-HJ-NPR-Z0-9]{17}$/.test(vin.trim()))
          errs["vin"] = "VIN-ul are 17 caractere, fără I, O și Q.";
        if (!/^\d+$/.test(km) || Number(km) > 2000000)
          errs["km"] = "Introdu kilometrajul în cifre.";
      }
    } else {
      Object.assign(errs, validateContact(contact));
      if (intent === "appointment" && date && date < minDate) errs["date"] = "Alege o zi viitoare.";
    }
    setErrors(errs);
    if (Object.keys(errs).length) {
      form.current
        ?.querySelector<HTMLInputElement | HTMLSelectElement>(`[name="${Object.keys(errs)[0]}"]`)
        ?.focus();
      return;
    }
    if (step === 1) {
      next(2);
      return;
    }
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 500));
    if ((search.demo === "error" && attempts.current++ === 0) || !navigator.onLine)
      setStatus("error");
    else {
      setStatus("done");
      requestAnimationFrame(() => heading.current?.focus());
    }
  };
  const err = (name: string) =>
    errors[name] ? (
      <span id={`service-${name}-error`} className="v3-error">
        {errors[name]}
      </span>
    ) : null;
  const a11y = (name: string) => ({
    name,
    "aria-label": (
      {
        branch: "Sucursală",
        service: "Serviciu",
        problem: "Ce ai observat la mașină?",
        vin: "VIN (serie de șasiu)",
        km: "Kilometraj actual (km)",
        date: "Zi preferată (opțional)",
      } as Record<string, string>
    )[name],
    "aria-invalid": Boolean(errors[name]),
    "aria-describedby": errors[name] ? `service-${name}-error` : undefined,
  });
  return (
    <div className="v3">
      <SiteHeader />
      <main id="main-content" className="v3-wrap v3-section">
        <div className="v3-form">
          <Link to="/service/tarife" className="v3-link v3-small mb-8">
            <ArrowLeft size={16} />
            Servicii și tarife
          </Link>
          <p className="v3-kicker">Service Autoklass</p>
          <h1 ref={heading} tabIndex={-1} style={{ scrollMarginTop: 96 }}>
            {status === "done" ? "Solicitarea ta, înregistrată în demo." : title}
          </h1>
          {status === "done" ? (
            <div className="v3-success" role="status">
              <CheckCircle2 size={40} />
              <p>
                {serviceName(service)} · {branchName(branch)}
              </p>
              {rateSummary}
              <p>
                {intent === "appointment"
                  ? "Ziua și intervalul sunt preferințe. În fluxul propus, echipa service va reveni pentru confirmare."
                  : "În fluxul propus, echipa service va reveni cu informații pentru mașina ta. Devizul final se stabilește în service."}
              </p>
              {intent === "appointment" && (
                <p>
                  Preferință:{" "}
                  {date
                    ? new Date(`${date}T12:00:00`).toLocaleDateString("ro-RO", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : "zi de stabilit"}
                  {time ? ` · ${time}` : ""}.
                </p>
              )}
              <p className="v3-notice">
                Test demonstrativ. Nicio solicitare nu a fost transmisă și niciun interval nu a fost
                rezervat.
              </p>
              <Link className="v3-button mt-6" to="/service/tarife">
                Înapoi la servicii
              </Link>
            </div>
          ) : (
            <>
              <p className="v3-intro">
                {intent === "estimate"
                  ? "O estimare pornește de la mașina ta și de la lucrarea necesară."
                  : "Spune-ne ce ai nevoie și când ai prefera să vii."}
              </p>
              <div className="v3-step mt-8" aria-label={`Pasul ${step} din 2`}>
                <span className="active" />
                <span className={step === 2 ? "active" : ""} />
              </div>
              <p className="v3-small v3-muted">
                Pasul {step} din 2 · {step === 1 ? "Mașina și serviciul" : "Datele tale de contact"}
              </p>
              <form ref={form} noValidate onSubmit={submit}>
                <div className="v3-stack">
                  {step === 1 ? (
                    <>
                      <label className="v3-field">
                        <span>Cu ce te putem ajuta?</span>
                        <select value={intent} onChange={(e) => setIntent(e.target.value)}>
                          <option value="appointment">Solicitare de programare</option>
                          <option value="estimate">Estimare de cost</option>
                        </select>
                      </label>
                      <label className="v3-field">
                        <span>Sucursală</span>
                        <select
                          {...a11y("branch")}
                          value={branch}
                          onChange={(e) => setBranch(e.target.value)}
                          required
                        >
                          <option value="">Alege sucursala</option>
                          {serviceBranches.map((b) => (
                            <option value={b.id} key={b.id}>
                              {b.name}
                            </option>
                          ))}
                        </select>
                        {err("branch")}
                      </label>
                      <label className="v3-field">
                        <span>Serviciu</span>
                        <select
                          {...a11y("service")}
                          value={service}
                          onChange={(e) => {
                            setService(e.target.value);
                            setRate("");
                          }}
                          required
                        >
                          <option value="">Alege serviciul</option>
                          {serviceItems.map((s) => (
                            <option key={s.id} value={s.id}>
                              {s.title}
                            </option>
                          ))}
                          <option value="other">Altă problemă / nu sunt sigur</option>
                        </select>
                        {err("service")}
                      </label>
                      {availableRates.length > 0 && (
                        <label className="v3-field">
                          <span>Categoria tarifară (opțional)</span>
                          <select value={rate} onChange={(e) => setRate(e.target.value)}>
                            <option value="">Categoria se va confirma în service</option>
                            {availableRates.map((item) => (
                              <option key={item.id} value={item.id}>
                                {item.title}
                                {item.id.endsWith("under-five") ? " · până la 5 ani inclusiv" : ""}
                              </option>
                            ))}
                          </select>
                        </label>
                      )}
                      {rateSummary}
                      <label className="v3-field">
                        <span>
                          {service === "other"
                            ? "Ce ai observat la mașină?"
                            : "Detalii despre lucrare (opțional)"}
                        </span>
                        <textarea
                          {...a11y("problem")}
                          aria-label={
                            service === "other"
                              ? "Ce ai observat la mașină?"
                              : "Detalii despre lucrare (opțional)"
                          }
                          placeholder={
                            service === "roti"
                              ? "Dimensiunea jantelor; schimb de anvelope sau roți complete…"
                              : undefined
                          }
                          rows={3}
                          value={problem}
                          maxLength={1500}
                          onChange={(e) => setProblem(e.target.value)}
                          required={service === "other"}
                        />
                        {err("problem")}
                      </label>
                      <label className="v3-check">
                        <input
                          type="checkbox"
                          checked={unknown}
                          onChange={(e) => setUnknown(e.target.checked)}
                        />
                        Nu am VIN-ul sau kilometrajul la îndemână
                      </label>
                      {unknown ? (
                        <p className="v3-notice">
                          Poți continua cu o solicitare de contact. Pentru o estimare adaptată
                          mașinii, echipa va avea nevoie ulterior de VIN și kilometraj.
                        </p>
                      ) : (
                        <>
                          <label className="v3-field">
                            <span>VIN (serie de șasiu)</span>
                            <input
                              {...a11y("vin")}
                              value={vin}
                              onChange={(e) => setVin(e.target.value.toUpperCase())}
                              maxLength={17}
                              autoCapitalize="characters"
                              spellCheck={false}
                              required
                            />
                            {err("vin")}
                            <small className="v3-small v3-muted">
                              17 caractere, în talon la rubrica E. Ne ajută să identificăm exact
                              mașina și piesele.
                            </small>
                          </label>
                          <label className="v3-field">
                            <span>Kilometraj actual (km)</span>
                            <input
                              {...a11y("km")}
                              type="text"
                              inputMode="numeric"
                              value={km}
                              onChange={(e) => setKm(e.target.value)}
                              required
                            />
                            {err("km")}
                          </label>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="v3-notice">
                        {serviceName(service)}
                        <br />
                        {branchName(branch)}
                        <br />
                        {unknown
                          ? "Datele mașinii vor fi completate ulterior."
                          : `${vin} · ${km} km`}
                      </div>
                      {rateSummary}
                      {problem.trim() && <p className="v3-small v3-muted">Detalii: {problem}</p>}
                      {intent === "appointment" && (
                        <>
                          <label className="v3-field">
                            <span>Zi preferată (opțional)</span>
                            <input
                              {...a11y("date")}
                              type="date"
                              min={minDate}
                              value={date}
                              onInput={(e) => setDate(e.currentTarget.value)}
                              onChange={(e) => setDate(e.target.value)}
                            />
                            {err("date")}
                          </label>
                          <label className="v3-field">
                            <span>Interval preferat (opțional)</span>
                            <select value={time} onChange={(e) => setTime(e.target.value)}>
                              <option value="">Fără preferință</option>
                              <option>Dimineața</option>
                              <option>După-amiaza</option>
                            </select>
                          </label>
                          <p className="v3-small v3-muted">
                            Disponibilitatea se confirmă ulterior. Alegerea unei preferințe nu
                            rezervă un interval.
                          </p>
                        </>
                      )}
                      <ContactFields
                        value={contact}
                        onChange={setContact}
                        errors={errors}
                        prefix="service"
                      />
                    </>
                  )}
                </div>
                {status === "error" && (
                  <p role="alert" className="v3-error mt-6">
                    Solicitarea nu a putut fi trimisă. Datele au rămas completate. Încearcă din nou.
                  </p>
                )}
                <p className="v3-notice mt-8">
                  Prototip: datele nu se trimit către Autoklass. Devizul final se stabilește după
                  evaluarea în service.
                </p>
                <div className="v3-row mt-8">
                  {step === 2 && (
                    <button
                      type="button"
                      className="v3-link"
                      disabled={status === "sending"}
                      onClick={() => next(1)}
                    >
                      <ArrowLeft size={16} />
                      Înapoi
                    </button>
                  )}
                  <button
                    className="v3-button flex-1"
                    type="submit"
                    disabled={status === "sending"}
                  >
                    {status === "sending"
                      ? "Se trimite…"
                      : step === 1
                        ? "Continuă"
                        : intent === "estimate"
                          ? "Solicită estimare"
                          : "Solicită programare"}
                    <ArrowRight size={18} />
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
