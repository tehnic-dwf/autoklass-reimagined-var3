import * as Dialog from "@radix-ui/react-dialog";
import { CheckCircle2, X, ArrowRight } from "lucide-react";
import { useRef, useState } from "react";
import { ContactFields } from "@/components/prototype/ContactFields";
import { emptyContact, validateContact, type ContactValues } from "@/lib/contact-validation";
import { type Vehicle } from "@/data/vehicles";
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
  const [value, setValue] = useState<ContactValues>(emptyContact);
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
          className="v3 v3-panel"
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
            <Dialog.Description id="offer-description" className="v3-muted v3-small">
              Pentru {vehicle.title}
            </Dialog.Description>
            {state === "done" ? (
              <div className="v3-success" role="status">
                <CheckCircle2 size={40} strokeWidth={1.5} />
                <h2>Solicitarea a fost înregistrată în demo.</h2>
                <p>
                  În varianta conectată, consultantul va reveni folosind datele tale de contact.
                </p>
                <p className="v3-notice">
                  Acesta este un test. Datele nu au fost trimise către Autoklass.
                </p>
                <Dialog.Close className="v3-button mt-6">Înapoi la mașină</Dialog.Close>
              </div>
            ) : (
              <form id="offer-form" className="mt-8" noValidate onSubmit={submit}>
                <p className="v3-small v3-muted mb-6">Toate cele patru câmpuri sunt obligatorii.</p>
                <ContactFields value={value} onChange={setValue} errors={errors} prefix="offer" />
                {state === "error" && (
                  <p role="alert" className="v3-error mt-6">
                    Solicitarea nu a putut fi trimisă. Datele au rămas completate. Încearcă din nou.
                  </p>
                )}
                <p className="v3-notice mt-8">
                  Prototip de design. Formularul poate fi testat, dar datele nu sunt trimise către
                  Autoklass.
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
