import { Link, useBlocker } from "@tanstack/react-router";
import * as Dialog from "@radix-ui/react-dialog";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock3,
  ChevronDown,
  CreditCard,
  Car,
  LoaderCircle,
  UserRound,
  Mail,
  X,
} from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { ContactFields } from "@/components/prototype/ContactFields";
import { glcDetails } from "@/data/product-details";
import { branches } from "@/data/company";
import { formatPrice, type Vehicle } from "@/data/vehicles";
import {
  initialReservation,
  RESERVATION_DEPOSIT,
  validateReservation,
  type ReservationErrors,
  type ReservationValues,
} from "@/lib/reservation";
import logo from "@/assets/autoklass-logo.png";
import "@/reservation.css";

const faqUrl = "https://www.autoklass.ro/faq";
const termsUrl = "https://www.autoklass.ro/articole/termeni-si-conditii.html";
function ReservationCarImage({ vehicle }: { vehicle: Vehicle }) {
  const [failed, setFailed] = useState(false);
  return failed ? (
    <span className="res-car-placeholder" aria-hidden>
      <Car size={28} strokeWidth={1.5} />
    </span>
  ) : (
    <img src={vehicle.image} alt="" width="96" height="72" onError={() => setFailed(true)} />
  );
}
const deposit = `${formatPrice(RESERVATION_DEPOSIT)} €`;
export function ReservationCheckout({
  vehicle,
  simulateError = false,
}: {
  vehicle: Vehicle;
  simulateError?: boolean;
}) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const [values, setValues] = useState(() => initialReservation(vehicle.branch));
  const [errors, setErrors] = useState<ReservationErrors>({});
  const [step, setStep] = useState<0 | 1>(0);
  const [agreed, setAgreed] = useState(false);
  const [termsError, setTermsError] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [payment, setPayment] = useState<"idle" | "processing" | "error" | "done">("idle");
  const isGlc = vehicle.slug === "mercedes-benz-glc-200-4matic-vu149616";
  const consultantName = isGlc ? glcDetails.consultant.name : "Consultant Autoklass";
  const completed = payment === "done";
  const attempts = useRef(0);
  const form = useRef<HTMLFormElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const paymentTrigger = useRef<HTMLButtonElement>(null);
  const successHeading = useRef<HTMLHeadingElement>(null);
  const dirty = JSON.stringify(values) !== JSON.stringify(initialReservation(vehicle.branch));
  useBlocker({
    shouldBlockFn: () =>
      dirty &&
      !completed &&
      !window.confirm("Părăsești rezervarea? Datele completate se vor pierde."),
    enableBeforeUnload: dirty && !completed,
  });
  const go = (next: 0 | 1) => {
    setStep(next);
    requestAnimationFrame(() => {
      heading.current?.focus();
      heading.current?.scrollIntoView({ block: "start", behavior: "instant" });
    });
  };
  const update = (key: keyof ReservationValues, value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    setAgreed(false);
  };
  const next = (e: FormEvent) => {
    e.preventDefault();
    const issues = validateReservation(values);
    setErrors(issues);
    const first = Object.keys(issues)[0];
    if (first) {
      requestAnimationFrame(() =>
        form.current?.querySelector<HTMLInputElement>(`[name="${first}"]`)?.focus(),
      );
      return;
    }
    go(1);
  };
  const openPayment = (e: FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      setTermsError(true);
      document.getElementById("reservation-terms")?.focus();
      return;
    }
    setTermsError(false);
    setPayment("idle");
    setPaymentOpen(true);
  };
  const pay = async () => {
    if (payment === "processing") return;
    setPayment("processing");
    await new Promise((r) => setTimeout(r, 700));
    if (!navigator.onLine || (simulateError && attempts.current++ === 0)) {
      setPayment("error");
      return;
    }
    setPayment("done");
    setPaymentOpen(false);
    requestAnimationFrame(() => {
      successHeading.current?.focus();
      window.scrollTo({ top: 0, behavior: "instant" });
    });
  };
  const consultant = (
    <div className="res-consultant">
      {isGlc ? (
        <img src={glcDetails.consultant.photo} alt="" width="48" height="48" />
      ) : (
        <span className="res-consultant-avatar">
          <UserRound size={24} aria-hidden />
        </span>
      )}
      <div>
        <strong>{consultantName}</strong>
        <span>Consultant vânzări · {vehicle.branch}</span>
      </div>
    </div>
  );
  const field = (key: "company" | "cui" | "address" | "city", label: string, auto: string) => (
    <label className="v3-field" htmlFor={`res-${key}`}>
      <span>{label}</span>
      <input
        id={`res-${key}`}
        name={key}
        value={values[key]}
        onChange={(e) => update(key, e.target.value)}
        autoComplete={auto}
        required
        maxLength={key === "address" ? 200 : 100}
        aria-invalid={Boolean(errors[key])}
        aria-describedby={errors[key] ? `res-${key}-error` : undefined}
      />
      {errors[key] && (
        <span className="v3-error" id={`res-${key}-error`}>
          {errors[key]}
        </span>
      )}
    </label>
  );
  const summary = (
    <aside className="res-summary" aria-label="Mașina și suma de rezervare">
      <div className="res-car">
        <ReservationCarImage vehicle={vehicle} />
        <div>
          <strong>{vehicle.title}</strong>
          <span>{vehicle.branch}</span>
        </div>
      </div>
      <div className="res-deposit">
        <div>
          <span>Taxă de rezervare</span>
          <small>Se scade din prețul mașinii</small>
        </div>
        <strong>{deposit}</strong>
      </div>
      <p className="res-currency">TVA inclus · plata în lei, la cursul zilei</p>
      <details>
        <summary>
          Prețul total și condițiile <ChevronDown size={16} aria-hidden />
        </summary>
        <dl>
          <div>
            <dt>Prețul mașinii, TVA inclus</dt>
            <dd>{formatPrice(vehicle.priceEur)} €</dd>
          </div>
          <div>
            <dt>Diferență după rezervare</dt>
            <dd>{formatPrice(vehicle.priceEur - RESERVATION_DEPOSIT)} €</dd>
          </div>
        </dl>
        <p>
          Conform informațiilor publicate, finalizarea achiziției se face în maximum 7 zile
          calendaristice. Rambursarea taxei se solicită separat și se efectuează în maximum 30 de
          zile.
        </p>
        <a href={termsUrl} target="_blank" rel="noreferrer">
          Condițiile Autoklass (filă nouă)
        </a>
      </details>
    </aside>
  );
  return (
    <div className="v3 ak-reservation">
      <a className="res-skip" href="#reservation-main">
        Mergi la formular
      </a>
      <header className="res-header">
        <div className="res-wrap">
          <Link to="/autoturisme/$slug" params={{ slug: vehicle.slug }}>
            <ArrowLeft size={18} aria-hidden />
            Înapoi la mașină
          </Link>
          <img src={logo} alt="Autoklass" width="120" height="28" />
        </div>
      </header>
      <main id="reservation-main" className="res-wrap">
        {vehicle.reserved ? (
          <section className="res-unavailable">
            <h1>Mașina este deja rezervată.</h1>
            <p>Alege un alt autovehicul disponibil.</p>
            <Link to="/autoturisme" className="res-primary">
              Vezi mașinile
            </Link>
          </section>
        ) : completed ? (
          <section className="res-success">
            <span className="res-success-icon">
              <Clock3 size={28} aria-hidden />
            </span>
            <p className="res-eyebrow">Rezervare în curs de confirmare</p>
            <h1 ref={successHeading} tabIndex={-1}>
              Mulțumim, {values.firstName}.
            </h1>
            <p>
              Datele rezervării sunt pregătite. Rezervarea se confirmă după autorizarea plății și
              verificarea disponibilității mașinii.
            </p>
            <div className="res-receipt">
              <div className="res-car">
                <ReservationCarImage vehicle={vehicle} />
                <div>
                  <strong>{vehicle.title}</strong>
                  <span>{vehicle.branch}</span>
                </div>
              </div>
              <dl>
                <div>
                  <dt>Taxă de rezervare</dt>
                  <dd>{deposit}</dd>
                </div>
                <div>
                  <dt>Status plată</dt>
                  <dd>În așteptarea confirmării</dd>
                </div>
                <div>
                  <dt>Preluare preferată</dt>
                  <dd>{values.branch}</dd>
                </div>
                <div>
                  <dt>Email de contact</dt>
                  <dd>{values.email}</dd>
                </div>
              </dl>
            </div>
            <h2>Ce urmează</h2>
            <ol className="res-next-steps">
              <li>
                <Mail size={20} aria-hidden />
                <div>
                  <strong>Confirmarea rezervării</strong>
                  <p>
                    După confirmarea plății și a disponibilității, detaliile rezervării și
                    documentul de plată sunt trimise la adresa completată.
                  </p>
                </div>
              </li>
              <li>
                <UserRound size={20} aria-hidden />
                <div>
                  <strong>Discuția cu un consultant</strong>
                  <p>Stabiliți detaliile achiziției și preluării mașinii.</p>
                </div>
              </li>
            </ol>
            {consultant}
            <a className="res-terms-link" href={termsUrl}>
              Condiții, anulare și rambursare
            </a>
            <Link to="/autoturisme/$slug" params={{ slug: vehicle.slug }} className="res-primary">
              Înapoi la mașină <ArrowRight size={18} aria-hidden />
            </Link>
          </section>
        ) : (
          <>
            <div className="res-title">
              <p className="res-eyebrow">Rezervare online</p>
              <h1>Rezervă mașina cu {deposit}.</h1>
              <p>Completezi datele, le verifici și continui la plată.</p>
            </div>
            <div className="res-layout">
              {summary}
              <div className="res-content">
                <ol className="res-steps" aria-label="Pașii rezervării">
                  {["Datele tale", "Verificare și plată"].map((name, i) => (
                    <li key={name} aria-current={step === i ? "step" : undefined}>
                      <span>{step > i ? <Check size={14} aria-hidden /> : i + 1}</span>
                      {name}
                    </li>
                  ))}
                </ol>
                <h2 className="res-step-title" ref={heading} tabIndex={-1}>
                  {step === 0 ? "Date de contact și facturare" : "Verifică înainte de plată"}
                </h2>
                {step === 0 ? (
                  <form ref={form} onSubmit={next} noValidate>
                    <fieldset className="res-form-fields" disabled={!ready}>
                      <p className="res-help">Verifică datele de contact înainte de a continua.</p>
                      <ContactFields
                        value={values}
                        onChange={(next) => {
                          setValues((v) => ({ ...v, ...next }));
                          setAgreed(false);
                        }}
                        errors={errors}
                        prefix="reservation"
                      />
                      <fieldset className="res-billing">
                        <legend>Factura se emite pentru</legend>
                        <div className="res-entity">
                          {[
                            { value: "person", name: "Persoană fizică" },
                            { value: "company", name: "Firmă" },
                          ].map((o) => (
                            <label key={o.value}>
                              <input
                                type="radio"
                                name="entity"
                                value={o.value}
                                checked={values.entity === o.value}
                                onChange={() => update("entity", o.value)}
                              />
                              <span>{o.name}</span>
                            </label>
                          ))}
                        </div>
                        {values.entity === "company" && (
                          <div className="res-company">
                            {field("company", "Denumirea firmei", "organization")}
                            {field("cui", "CUI", "off")}
                          </div>
                        )}
                        {field("address", "Adresă de facturare", "street-address")}
                        {field("city", "Localitate", "address-level2")}
                      </fieldset>
                      <label className="v3-field res-branch" htmlFor="res-branch">
                        <span>Sucursala preferată pentru preluare</span>
                        <select
                          id="res-branch"
                          name="branch"
                          value={values.branch}
                          onChange={(e) => update("branch", e.target.value)}
                        >
                          {Array.from(
                            new Set([vehicle.branch, ...branches.map((b) => b.name)]),
                          ).map((b) => (
                            <option key={b}>{b}</option>
                          ))}
                        </select>
                        <small>Disponibilitatea preluării se confirmă cu un consultant.</small>
                      </label>
                      <p className="res-privacy">
                        Datele sunt folosite pentru rezervare și facturare.{" "}
                        <a
                          href="https://www.autoklass.ro/articole/politica-confidentialitate.html"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Confidențialitate (filă nouă)
                        </a>
                      </p>
                      <button className="res-primary" type="submit">
                        Verifică datele <ArrowRight size={18} aria-hidden />
                      </button>
                    </fieldset>
                  </form>
                ) : (
                  <form onSubmit={openPayment} noValidate>
                    <div className="res-review">
                      <div className="res-review-head">
                        <h3>Datele rezervării</h3>
                        <button type="button" onClick={() => go(0)}>
                          Modifică datele
                        </button>
                      </div>
                      <dl>
                        <div>
                          <dt>Contact</dt>
                          <dd>
                            {values.firstName} {values.lastName}
                            <br />
                            {values.email}
                            <br />
                            {values.phone}
                          </dd>
                        </div>
                        <div>
                          <dt>Facturare</dt>
                          <dd>
                            {values.entity === "company" ? (
                              <>
                                {values.company} · {values.cui}
                                <br />
                              </>
                            ) : null}
                            {values.address}, {values.city}
                          </dd>
                        </div>
                        <div>
                          <dt>Preluare preferată</dt>
                          <dd>{values.branch}</dd>
                        </div>
                      </dl>
                    </div>
                    <div className="res-payment-info">
                      <CreditCard size={24} aria-hidden />
                      <div>
                        <h3>Plată cu cardul</h3>
                        <p>
                          {deposit}. Dacă plata se face în lei, suma exactă va fi afișată înainte de
                          autorizare.
                        </p>
                        <small>Datele cardului se introduc în pagina securizată de plată.</small>
                      </div>
                    </div>
                    <label className="res-terms" htmlFor="reservation-terms">
                      <input
                        id="reservation-terms"
                        type="checkbox"
                        checked={agreed}
                        onChange={(e) => {
                          setAgreed(e.target.checked);
                          setTermsError(false);
                        }}
                        aria-invalid={termsError}
                        aria-describedby={termsError ? "res-terms-error" : undefined}
                      />
                      <span>Am verificat datele și sunt de acord cu condițiile rezervării.</span>
                    </label>
                    <a className="res-terms-link" href={termsUrl} target="_blank" rel="noreferrer">
                      Citește condițiile Autoklass (filă nouă)
                    </a>
                    {termsError && (
                      <p className="v3-error" id="res-terms-error" role="alert">
                        Confirmă datele și condițiile înainte de a continua.
                      </p>
                    )}
                    <button ref={paymentTrigger} className="res-primary" type="submit">
                      Continuă la plată · {deposit}
                      <ArrowRight size={18} aria-hidden />
                    </button>
                    <button type="button" className="res-back" onClick={() => go(0)}>
                      <ArrowLeft size={16} aria-hidden />
                      Înapoi la date
                    </button>
                  </form>
                )}
              </div>
            </div>
          </>
        )}
      </main>
      <footer className="res-legal-footer res-wrap">
        <span>Autoklass Center S.R.L.</span>
        <nav aria-label="Ajutor pentru rezervare">
          <a href={termsUrl}>Condiții și anulare</a>
          <a href={faqUrl}>Întrebări frecvente</a>
          <Link to="/contact">Contact</Link>
        </nav>
      </footer>
      <Dialog.Root
        open={paymentOpen}
        onOpenChange={(open) => {
          if (payment !== "processing") setPaymentOpen(open);
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="res-overlay" />
          <Dialog.Content
            className="v3 res-payment-dialog"
            aria-describedby="res-payment-description"
            onCloseAutoFocus={(e) => {
              e.preventDefault();
              if (payment === "done") successHeading.current?.focus();
              else paymentTrigger.current?.focus();
            }}
          >
            <div className="res-dialog-head">
              <Dialog.Title>Plată cu cardul</Dialog.Title>
              <Dialog.Close
                className="res-close"
                aria-label="Închide plata"
                disabled={payment === "processing"}
              >
                <X size={22} />
              </Dialog.Close>
            </div>
            <p className="res-eyebrow">Taxă de rezervare</p>
            <strong className="res-payment-amount">{deposit}</strong>
            <p className="res-payment-car">{vehicle.title}</p>
            <Dialog.Description id="res-payment-description">
              Suma se scade din prețul mașinii. Rezervarea se confirmă după autorizarea plății și
              verificarea disponibilității.
            </Dialog.Description>
            <div
              className="res-payment-status"
              data-state={payment}
              role="status"
              aria-live="polite"
            >
              {payment === "processing"
                ? "Se verifică solicitarea…"
                : payment === "error"
                  ? "Nu am putut continua spre plată. Încearcă din nou sau revino la datele rezervării."
                  : ""}
            </div>
            <button className="res-primary" onClick={pay} disabled={payment === "processing"}>
              {payment === "processing" ? (
                <LoaderCircle className="res-spinner" size={18} aria-hidden />
              ) : (
                <CreditCard size={18} aria-hidden />
              )}
              {payment === "error" ? "Încearcă din nou" : `Continuă către plata de ${deposit}`}
            </button>
            <Dialog.Close className="res-back" disabled={payment === "processing"}>
              Anulează plata
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
