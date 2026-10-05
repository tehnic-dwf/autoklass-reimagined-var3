import { Link, useBlocker } from "@tanstack/react-router";
import * as Dialog from "@radix-ui/react-dialog";
import {
  ArrowLeft,
  ArrowRight,
  Check,
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
import { OfferDialog } from "@/components/vehicle/OfferDialog";
import { glcDetails } from "@/data/product-details";
import { type ContactValues } from "@/lib/contact-validation";
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

const faqUrl = "https://www.autoklass.ro/articole/faq.html";
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
  const [offerOpen, setOfferOpen] = useState(false);
  const [offerSession, setOfferSession] = useState(0);
  const [offerDone, setOfferDone] = useState(false);
  const offerTrigger = useRef<HTMLButtonElement>(null);
  const isGlc = vehicle.slug === "mercedes-benz-glc-200-4matic-vu149616";
  const consultantName = isGlc ? glcDetails.consultant.name : "Consultant Autoklass";
  const completed = payment === "done" || offerDone;
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
  const updateContact = (contact: ContactValues) => {
    setValues((current) => ({ ...current, ...contact }));
    setAgreed(false);
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
  const alternative = (
    <aside className="res-alternative" aria-labelledby="res-alternative-title">
      <h2 id="res-alternative-title">Vrei întâi o ofertă?</h2>
      <p>Discută cu un consultant, fără rezervare și fără plată.</p>
      {consultant}
      <button
        ref={offerTrigger}
        type="button"
        className="res-outline"
        onClick={() => {
          setOfferSession((current) => current + 1);
          setOfferOpen(true);
        }}
      >
        Solicită ofertă <ArrowRight size={18} aria-hidden />
      </button>
    </aside>
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
        <a href={faqUrl} target="_blank" rel="noreferrer">
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
              <Check size={28} aria-hidden />
            </span>
            <p className="res-eyebrow">
              {offerDone ? "Solicitare de ofertă · Demo" : "Rezervare finalizată · Demo"}
            </p>
            <h1 ref={successHeading} tabIndex={-1}>
              Mulțumim, {values.firstName}.
            </h1>
            <p>
              {offerDone
                ? "Ai ales să discuți oferta cu un consultant. Nu ai rezervat mașina și nu ai nimic de plătit."
                : "Ai încheiat pașii rezervării. Mai jos găsești mașina aleasă și detaliile confirmării."}
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
                  <dt>{offerDone ? "Tipul solicitării" : "Plată simulată"}</dt>
                  <dd>{offerDone ? "Ofertă personalizată" : deposit}</dd>
                </div>
                {!offerDone && (
                  <div>
                    <dt>Preluare preferată</dt>
                    <dd>{values.branch}</dd>
                  </div>
                )}
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
                  <strong>Confirmarea pe email</strong>
                  <p>
                    În varianta finală, primești{" "}
                    {offerDone
                      ? "detaliile solicitării"
                      : "confirmarea rezervării și documentul plății"}{" "}
                    la adresa completată.
                  </p>
                </div>
              </li>
              <li>
                <UserRound size={20} aria-hidden />
                <div>
                  <strong>Discuția cu un consultant</strong>
                  <p>
                    {offerDone
                      ? "Clarificați oferta, finanțarea și întrebările despre mașină."
                      : "Stabiliți detaliile achiziției și preluării mașinii."}
                  </p>
                </div>
              </li>
            </ol>
            {consultant}
            <p className="res-success-demo">
              Acesta este un prototip:{" "}
              {offerDone
                ? "solicitarea nu a fost trimisă."
                : "plata de 500 € a fost simulată, iar mașina nu a fost blocată în stoc."}{" "}
              Nu s-au trimis emailuri.
            </p>
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
              <div className="res-sidebar">
                {summary}
                {alternative}
              </div>
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
                      <p className="res-help">
                        Date demo precompletate. Le poți modifica pentru a testa formularul.
                      </p>
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
                      <p className="res-demo">
                        Prototip · nu se trimit date și nu se fac plăți reale.
                      </p>
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
                          {deposit}, echivalent în lei la cursul zilei. În fluxul final, suma exactă
                          în lei se afișează înainte de autorizarea plății.
                        </p>
                        <small>În acest prototip nu introduci date de card.</small>
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
                    <a className="res-terms-link" href={faqUrl} target="_blank" rel="noreferrer">
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
                    <p className="res-demo">Urmează simularea plății. Nu se retrag bani.</p>
                  </form>
                )}
              </div>
            </div>
          </>
        )}
      </main>
      <OfferDialog
        key={offerSession}
        vehicle={vehicle}
        open={offerOpen}
        onOpenChange={setOfferOpen}
        opener={offerTrigger}
        initialContact={values}
        onContactChange={updateContact}
        onSuccess={() => {
          setOfferOpen(false);
          setOfferDone(true);
          requestAnimationFrame(() => {
            successHeading.current?.focus();
            window.scrollTo({ top: 0, behavior: "instant" });
          });
        }}
      />
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
            <p className="res-eyebrow">Simulare pentru prototip</p>
            <strong className="res-payment-amount">{deposit}</strong>
            <p className="res-payment-car">{vehicle.title}</p>
            <Dialog.Description id="res-payment-description">
              Acesta este pasul de plată demonstrativ. Nu este conectat la un procesator și nu
              colectează date de card.
            </Dialog.Description>
            <div
              className="res-payment-status"
              data-state={payment}
              role="status"
              aria-live="polite"
            >
              {payment === "processing"
                ? "Se verifică plata demonstrativă…"
                : payment === "error"
                  ? "Plata demonstrativă nu a reușit. Nu ai fost taxat. Încearcă din nou sau revino la rezervare."
                  : ""}
            </div>
            <button className="res-primary" onClick={pay} disabled={payment === "processing"}>
              {payment === "processing" ? (
                <LoaderCircle className="res-spinner" size={18} aria-hidden />
              ) : (
                <CreditCard size={18} aria-hidden />
              )}
              {payment === "error" ? "Reîncearcă plata simulată" : `Simulează plata de ${deposit}`}
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
