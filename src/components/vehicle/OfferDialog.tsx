import "@/product-mobile.css";
import "@/offer-confirmation.css";
import * as Dialog from "@radix-ui/react-dialog";
import { CheckCircle2, X, ArrowRight, UserRound } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ContactFields } from "@/components/prototype/ContactFields";
import { glcDetails } from "@/data/product-details";
import { usedDetails } from "@/data/used-product-details";
import { testContact, validateContact, type ContactValues } from "@/lib/contact-validation";
import { type Vehicle, formatPrice } from "@/data/vehicles";
export function OfferDialog({
  vehicle,
  open,
  onOpenChange,
  opener,
  simulateError = false,
  requestKind = "offer",
  initialContact = testContact,
  onContactChange,
  onSuccess,
}: {
  vehicle: Vehicle;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  opener: React.RefObject<HTMLButtonElement | null>;
  simulateError?: boolean;
  requestKind?: "offer" | "report";
  initialContact?: ContactValues;
  onContactChange?: (value: ContactValues) => void;
  onSuccess?: (value: ContactValues) => void;
}) {
  const [value, setValue] = useState<ContactValues>(initialContact);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactValues, string>>>({});
  const [state, setState] = useState<"idle" | "sending" | "error" | "done">("idle");
  const [reference, setReference] = useState("");
  const attempts = useRef(0);
  const successHeading = useRef<HTMLHeadingElement>(null);
  const isGlc = vehicle.slug === "mercedes-benz-glc-200-4matic-vu149616";
  const consultantName = isGlc
    ? glcDetails.consultant.name
    : vehicle.slug === usedDetails.slug
      ? usedDetails.consultant
      : "Consultant Autoklass";
  useEffect(() => {
    if (state === "done") successHeading.current?.focus();
  }, [state]);
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const next = validateContact(value);
    setErrors(next);
    if (Object.keys(next).length) {
      form.querySelector<HTMLInputElement>(`[name="${Object.keys(next)[0]}"]`)?.focus();
      return;
    }
    setState("sending");
    await new Promise((resolve) => setTimeout(resolve, 500));
    if ((simulateError && attempts.current++ === 0) || !navigator.onLine) setState("error");
    else {
      // The final implementation should use the reference returned by the lead API.
      setReference(`AK-OF-${crypto.randomUUID().slice(0, 8).toUpperCase()}`);
      setState("done");
      onSuccess?.(value);
    }
  };
  return (
    <Dialog.Root
      open={open}
      onOpenChange={(nextOpen) => {
        if (state === "sending") return;
        onOpenChange(nextOpen);
        if (!nextOpen) {
          setState("idle");
          setReference("");
        }
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="v3-shell-overlay" />
        <Dialog.Content
          className="v3 v3-panel ak-offer-dialog"
          aria-describedby="offer-description"
          onCloseAutoFocus={(e) => {
            e.preventDefault();
            opener.current?.focus();
          }}
        >
          <div className="v3-panel-head">
            <Dialog.Title>
              {state === "done"
                ? "Confirmarea solicitării"
                : requestKind === "report"
                  ? "Solicită raportul carVertical"
                  : "Solicită ofertă"}
            </Dialog.Title>
            <Dialog.Close
              className="v3-icon"
              aria-label="Închide formularul"
              disabled={state === "sending"}
            >
              <X size={22} />
            </Dialog.Close>
          </div>
          <div className="v3-panel-body">
            {state === "done" ? (
              requestKind === "report" ? (
                <div className="offer-confirmation" role="status">
                  <CheckCircle2 className="offer-confirmation-icon" size={34} strokeWidth={1.75} />
                  <p className="offer-confirmation-kicker">Solicitare trimisă</p>
                  <h2 ref={successHeading} tabIndex={-1}>
                    Am primit cererea pentru raport.
                  </h2>
                  <Dialog.Description id="offer-description">
                    Un consultant verifică raportul carVertical și te contactează folosind datele
                    completate.
                  </Dialog.Description>
                  <div className="offer-confirmation-car">
                    <img src={vehicle.image} alt="" width={104} height={78} />
                    <div>
                      <span>Raport solicitat pentru</span>
                      <strong>{vehicle.title}</strong>
                    </div>
                  </div>
                  <dl className="offer-confirmation-details">
                    <div>
                      <dt>Email de contact</dt>
                      <dd>{value.email}</dd>
                    </div>
                  </dl>
                  <p className="offer-confirmation-help">
                    Ai o întrebare? <Link to="/contact">Contactează-ne</Link>.
                  </p>
                </div>
              ) : (
                <div className="offer-confirmation" role="status">
                  <CheckCircle2 className="offer-confirmation-icon" size={34} strokeWidth={1.75} />
                  <p className="offer-confirmation-kicker">Solicitare trimisă</p>
                  <h2 ref={successHeading} tabIndex={-1}>
                    Am primit solicitarea ta, {value.firstName}.
                  </h2>
                  <Dialog.Description id="offer-description">
                    Am preluat cererea pentru mașina de mai jos. Vei primi confirmarea la adresa de
                    email completată.
                  </Dialog.Description>

                  <div className="offer-confirmation-car">
                    <img src={vehicle.image} alt="" width={104} height={78} />
                    <div>
                      <span>Mașina pentru care ai cerut oferta</span>
                      <strong>{vehicle.title}</strong>
                    </div>
                  </div>

                  <dl className="offer-confirmation-details">
                    <div>
                      <dt>Număr solicitare</dt>
                      <dd>{reference}</dd>
                    </div>
                    <div>
                      <dt>Email de confirmare</dt>
                      <dd>{value.email}</dd>
                    </div>
                  </dl>

                  <div className="offer-confirmation-next">
                    <h3>Ce urmează?</h3>
                    <p>
                      Consultantul verifică solicitarea și te contactează folosind datele
                      completate.
                    </p>
                    <div className="offer-confirmation-consultant">
                      {isGlc ? (
                        <img src={glcDetails.consultant.photo} alt="" width={48} height={48} />
                      ) : (
                        <span className="offer-confirmation-avatar">
                          <UserRound size={24} aria-hidden />
                        </span>
                      )}
                      <div>
                        <strong>{consultantName}</strong>
                        <span>Consultant vânzări · {vehicle.branch}</span>
                      </div>
                    </div>
                  </div>
                  <p className="offer-confirmation-help">
                    Ai o întrebare? <Link to="/contact">Contactează-ne</Link> și menționează numărul
                    solicitării.
                  </p>
                </div>
              )
            ) : (
              <form id="offer-form" className="mt-6" noValidate onSubmit={submit}>
                <Dialog.Description id="offer-description" className="v3-offer-vehicle">
                  <img src={vehicle.image} alt="" width={120} height={90} />
                  <span>
                    <strong>{vehicle.title}</strong>
                    <span>{formatPrice(vehicle.priceEur)} € · TVA inclus</span>
                  </span>
                </Dialog.Description>
                <p className="v3-muted mb-6">
                  {requestKind === "report"
                    ? "Soliciți raportul carVertical pentru această mașină."
                    : "Consultantul te contactează pentru oferta acestei mașini."}
                </p>
                <ContactFields
                  value={value}
                  onChange={(next) => {
                    setValue(next);
                    onContactChange?.(next);
                  }}
                  errors={errors}
                  prefix="offer"
                />
                {state === "error" && (
                  <p role="alert" className="v3-error mt-6">
                    Solicitarea nu a putut fi trimisă. Datele au rămas completate. Încearcă din nou.
                  </p>
                )}
                <p className="v3-small v3-muted mt-6">
                  Datele tale sunt folosite pentru a răspunde solicitării.{" "}
                  <a
                    className="underline underline-offset-4"
                    href="https://www.autoklass.ro/articole/politica-confidentialitate.html"
                  >
                    Confidențialitate
                  </a>
                </p>
              </form>
            )}
          </div>
          <div className="v3-panel-foot">
            {state === "done" ? (
              <Dialog.Close className="v3-button">
                Înapoi la mașină <ArrowRight size={18} aria-hidden />
              </Dialog.Close>
            ) : (
              <button
                type="submit"
                form="offer-form"
                className="v3-button"
                disabled={state === "sending"}
              >
                {state === "sending"
                  ? "Se trimite…"
                  : requestKind === "report"
                    ? "Trimite solicitarea"
                    : "Solicită ofertă"}
                {state !== "sending" && <ArrowRight size={18} />}
              </button>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
