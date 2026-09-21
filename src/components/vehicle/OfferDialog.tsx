import "@/product-mobile.css";
import * as Dialog from "@radix-ui/react-dialog";
import { CheckCircle2, X, ArrowRight } from "lucide-react";
import { useRef, useState } from "react";
import { ContactFields } from "@/components/prototype/ContactFields";
import { testContact, validateContact, type ContactValues } from "@/lib/contact-validation";
import { type Vehicle, formatPrice } from "@/data/vehicles";
export function OfferDialog({
  vehicle,
  open,
  onOpenChange,
  opener,
  simulateError = false,
}: {
  vehicle: Vehicle;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  opener: React.RefObject<HTMLButtonElement | null>;
  simulateError?: boolean;
}) {
  const [value, setValue] = useState<ContactValues>(testContact);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactValues, string>>>({});
  const [state, setState] = useState<"idle" | "sending" | "error" | "done">("idle");
  const attempts = useRef(0);
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
    else setState("done");
  };
  return (
    <Dialog.Root open={open} onOpenChange={(v) => state !== "sending" && onOpenChange(v)}>
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
            <Dialog.Title>Solicită ofertă</Dialog.Title>
            <Dialog.Close
              className="v3-icon"
              aria-label="Închide formularul"
              disabled={state === "sending"}
            >
              <X size={22} />
            </Dialog.Close>
          </div>
          <div className="v3-panel-body">
            <Dialog.Description id="offer-description" className="v3-offer-vehicle">
              <img src={vehicle.image} alt="" width={120} height={90} />
              <span>
                <strong>{vehicle.title}</strong>
                <span>{formatPrice(vehicle.priceEur)} € · TVA inclus</span>
              </span>
            </Dialog.Description>
            {state === "done" ? (
              <div className="v3-success" role="status">
                <CheckCircle2 size={40} strokeWidth={1.5} />
                <h2>Mulțumim pentru solicitare.</h2>
                <p>Un consultant te va contacta pentru oferta mașinii alese.</p>

                <Dialog.Close className="v3-button mt-6">Înapoi la mașină</Dialog.Close>
              </div>
            ) : (
              <form id="offer-form" className="mt-6" noValidate onSubmit={submit}>
                <p className="v3-muted mb-6">
                  Consultantul te contactează pentru oferta acestei mașini.
                </p>
                <ContactFields value={value} onChange={setValue} errors={errors} prefix="offer" />
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
          {state !== "done" && (
            <div className="v3-panel-foot">
              <button
                type="submit"
                form="offer-form"
                className="v3-button"
                disabled={state === "sending"}
              >
                {state === "sending" ? "Se trimite…" : "Solicită ofertă"}
                {state !== "sending" && <ArrowRight size={18} />}
              </button>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
