import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ContactFields } from "@/components/prototype/ContactFields";
import { testContact, validateContact, type ContactValues } from "@/lib/contact-validation";
import { contactBranches } from "@/data/contact-branches";
export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact | Autoklass" }] }),
  component: ContactPage,
});
function ContactPage() {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const [value, setValue] = useState<ContactValues>(testContact);
  const [subject, setSubject] = useState("Solicitare informații");
  const [branch, setBranch] = useState("");
  const [errors, setErrors] = useState<Partial<Record<keyof ContactValues | "subject", string>>>(
    {},
  );
  const [done, setDone] = useState(false);
  const success = useRef<HTMLHeadingElement>(null);
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next: Partial<Record<keyof ContactValues | "subject", string>> = validateContact(value);
    if (!subject.trim()) next.subject = "Completează subiectul solicitării.";
    setErrors(next);
    if (Object.keys(next).length) {
      event.currentTarget
        .querySelector<HTMLInputElement>(`[name="${Object.keys(next)[0]}"]`)
        ?.focus();
      return;
    }
    setDone(true);
    requestAnimationFrame(() => success.current?.focus());
  };
  return (
    <div className="v3">
      <SiteHeader />
      <main id="main-content" className="v3-wrap v3-section ak-contact-page">
        {done ? (
          <div className="v3-success" role="status">
            <CheckCircle2 size={40} strokeWidth={1.5} aria-hidden />
            <h1 tabIndex={-1} ref={success}>
              Mulțumim pentru solicitare.
            </h1>
            <p>Un consultant te va contacta pentru a discuta detaliile.</p>
            <dl className="ak-contact-recap">
              <div>
                <dt>Subiect</dt>
                <dd>{subject.trim()}</dd>
              </div>
              {branch && (
                <div>
                  <dt>Sucursală preferată</dt>
                  <dd>{branch}</dd>
                </div>
              )}
            </dl>
            <Link className="v3-button mt-6" to="/">
              Înapoi la homepage
            </Link>
          </div>
        ) : (
          <>
            <h1>Contactează-ne.</h1>
            <p className="v3-intro">Lasă-ne datele tale și discută cu un consultant Autoklass.</p>
            <form noValidate onSubmit={submit}>
              <ContactFields value={value} onChange={setValue} errors={errors} />
              <div className="ak-contact-request">
                <label className="v3-field" htmlFor="contact-subject">
                  <span id="contact-subject-label">Subiect</span>
                  <input
                    id="contact-subject"
                    aria-labelledby="contact-subject-label"
                    name="subject"
                    required
                    maxLength={160}
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    aria-invalid={Boolean(errors.subject)}
                    aria-describedby={errors.subject ? "subject-error" : undefined}
                  />
                  {errors.subject && (
                    <span className="v3-error" id="subject-error">
                      {errors.subject}
                    </span>
                  )}
                </label>
                <label className="v3-field" htmlFor="contact-branch">
                  <span>Sucursală (opțional)</span>
                  <select
                    id="contact-branch"
                    name="branch"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                  >
                    <option value="">Fără preferință</option>
                    {contactBranches.map((name) => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <p className="v3-small v3-muted mt-6">
                Folosim datele pentru a răspunde solicitării tale.{" "}
                <a
                  className="v3-link"
                  href="https://www.autoklass.ro/articole/politica-confidentialitate.html"
                >
                  Confidențialitate
                </a>
              </p>
              <button type="submit" className="v3-button mt-6" disabled={!ready}>
                Trimite solicitarea <ArrowRight size={18} aria-hidden />
              </button>
            </form>
          </>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
