import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowDown, Check, ChevronDown, ShieldCheck } from "lucide-react";
import { useRef, useState } from "react";
import logo from "@/assets/autoklass-logo.png";
import type { Campaign } from "@/data/campaigns";
import { ContactFields } from "@/components/prototype/ContactFields";
import { emptyContact, validateContact, type ContactValues } from "@/lib/contact-validation";
import "@/campaign.css";
import "@/flow-confirmation.css";

export function CampaignLanding({ campaign }: { campaign: Campaign }) {
  const [model, setModel] = useState("");
  const [values, setValues] = useState<ContactValues>(emptyContact);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactValues, string>>>({});
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const attempted = useRef(false);
  const selectModel = (name: string) => {
    setModel(name);
    document
      .getElementById("camp-contact")
      ?.scrollIntoView({ behavior: "instant", block: "start" });
    document.getElementById("campaign-lastName")?.focus({ preventScroll: true });
  };
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next = validateContact(values);
    setErrors(next);
    const first = Object.keys(next)[0];
    if (first) {
      formRef.current?.querySelector<HTMLInputElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setState("sending");
    await new Promise((r) => setTimeout(r, 400));
    const fail =
      !navigator.onLine ||
      (new URLSearchParams(location.search).get("demo") === "error" && !attempted.current);
    attempted.current = true;
    setState(fail ? "error" : "done");
    requestAnimationFrame(() => statusRef.current?.focus());
  };
  return (
    <div className="v3 ak-campaign-page">
      <a className="camp-skip" href="#camp-main">
        Mergi la conținut
      </a>
      <header className="camp-header">
        <div className="camp-wrap">
          <Link to="/" aria-label="Autoklass, pagina principală">
            <img src={logo} alt="Autoklass" width="142" height="32" />
          </Link>
          <a href="#camp-contact">
            Solicită ofertă <ArrowRight size={17} aria-hidden />
          </a>
        </div>
      </header>
      <main id="camp-main">
        <section className="camp-hero" aria-labelledby="camp-title">
          <div className="camp-hero-copy camp-wrap">
            <p className="camp-eyebrow">Mercedes-Benz · {campaign.name}</p>
            <h1 id="camp-title">{campaign.headline}</h1>
            <p className="camp-intro">{campaign.intro}</p>
            <div className="camp-hero-actions">
              <a className="camp-primary" href="#camp-contact">
                Solicită oferta ta <ArrowRight size={19} aria-hidden />
              </a>
              <a className="camp-text-link" href="#camp-models">
                Vezi modelele <ArrowDown size={17} aria-hidden />
              </a>
            </div>
            <p className="camp-notice">{campaign.notice}</p>
          </div>
          <img
            className="camp-hero-image"
            src={campaign.hero}
            alt={campaign.heroAlt}
            width="1600"
            height="710"
            fetchPriority="high"
          />
        </section>
        <div className="camp-trust camp-wrap">
          <ShieldCheck size={20} aria-hidden />
          <p>
            Autoklass <span>· Centru autorizat de vânzări Mercedes-Benz</span>
          </p>
        </div>
        <section className="camp-section camp-wrap" aria-labelledby="camp-benefits-title">
          <p className="camp-eyebrow">Ce include oferta</p>
          <h2 id="camp-benefits-title">Avantajele, pe scurt.</h2>
          <div className="camp-benefits">
            {campaign.benefits.map((b) => (
              <div key={b.title}>
                <Check size={18} aria-hidden />
                <h3>{b.title}</h3>
                <p>{b.text}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="camp-model-section" id="camp-models" aria-labelledby="camp-model-title">
          <div className="camp-wrap camp-section">
            <p className="camp-eyebrow">Modele participante</p>
            <h2 id="camp-model-title">Care ți se potrivește?</h2>
            <p className="camp-section-intro">{campaign.modelIntro}</p>
            <div className="camp-models">
              {campaign.models.map((m) => (
                <article className="camp-model" key={m.name}>
                  <img
                    src={m.image}
                    alt={`Mercedes-Benz ${m.name}`}
                    width="720"
                    height="480"
                    loading="lazy"
                  />
                  <div className="camp-model-copy">
                    <h3>{m.name}</h3>
                    <p>{m.description}</p>
                    <div className="camp-model-price">
                      <strong>{m.amount}</strong>
                      <span>{m.amountLabel}</span>
                    </div>
                    <p className="camp-model-detail">{m.detail}</p>
                    <button
                      className="camp-outline"
                      aria-label={`Solicită ofertă pentru ${m.name}`}
                      onClick={() => selectModel(m.name)}
                    >
                      Solicită ofertă <ArrowRight size={18} aria-hidden />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="camp-section camp-wrap camp-next" aria-labelledby="camp-next-title">
          <div>
            <p className="camp-eyebrow">Consiliere Autoklass</p>
            <h2 id="camp-next-title">
              De la modelul preferat
              <br />
              la oferta ta.
            </h2>
          </div>
          <ol>
            <li>
              <span>01</span>
              <div>
                <h3>Ne spui ce îți dorești</h3>
                <p>Alegi modelul sau ceri ajutor pentru alegere.</p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <h3>Verificăm opțiunile</h3>
                <p>Consultantul confirmă configurația, disponibilitatea și condițiile.</p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <h3>Primești oferta individuală</h3>
                <p>Analizezi prețul și, dacă dorești, varianta de finanțare.</p>
              </div>
            </li>
          </ol>
        </section>
        <section className="camp-faq camp-section camp-wrap" aria-labelledby="camp-faq-title">
          <h2 id="camp-faq-title">Înainte să alegi.</h2>
          {campaign.faqs.map((f) => (
            <details key={f.question}>
              <summary>
                {f.question}
                <ChevronDown size={18} aria-hidden />
              </summary>
              <p>{f.answer}</p>
            </details>
          ))}
        </section>
        <section
          className="camp-contact-section"
          id="camp-contact"
          aria-labelledby="camp-contact-title"
        >
          <div className="camp-wrap camp-section camp-contact-grid">
            <div>
              <p className="camp-eyebrow">Oferta ta personalizată</p>
              <h2 id="camp-contact-title">
                {state === "done" ? (
                  "Poți compara în continuare modelele."
                ) : (
                  <>
                    Hai să găsim
                    <br />
                    varianta potrivită.
                  </>
                )}
              </h2>
              {state !== "done" && (
                <>
                  <p>Lasă datele de contact și modelul care te interesează.</p>
                  <p className="camp-contact-note">
                    Solicitarea unei oferte nu rezervă un autovehicul și nu presupune o achiziție.
                  </p>
                </>
              )}
            </div>
            {state === "done" ? (
              <div
                className="camp-success flow-confirmation"
                ref={statusRef}
                role="status"
                tabIndex={-1}
              >
                <Check size={32} aria-hidden />
                <p className="flow-confirmation-status">Solicitare trimisă</p>
                <h3>Am primit cererea ta de ofertă.</h3>
                <p>
                  Un consultant verifică opțiunile și te contactează folosind datele completate.
                </p>
                <dl className="flow-confirmation-details">
                  <div>
                    <dt>Campanie</dt>
                    <dd>{campaign.name}</dd>
                  </div>
                  <div>
                    <dt>Model</dt>
                    <dd>{model || "Doresc o recomandare"}</dd>
                  </div>
                  <div>
                    <dt>Email de contact</dt>
                    <dd>{values.email}</dd>
                  </div>
                </dl>
                <a className="camp-outline" href="#camp-models">
                  Vezi modelele
                </a>
              </div>
            ) : (
              <form ref={formRef} onSubmit={submit} noValidate>
                <label className="v3-field" htmlFor="camp-model-select">
                  <span>Modelul dorit</span>
                  <select
                    id="camp-model-select"
                    name="model"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                  >
                    <option value="">Aș dori o recomandare</option>
                    {campaign.models.map((m) => (
                      <option key={m.name}>{m.name}</option>
                    ))}
                  </select>
                </label>
                <ContactFields
                  prefix="campaign"
                  value={values}
                  onChange={setValues}
                  errors={errors}
                />
                <p className="camp-form-note">
                  Toate datele de contact sunt necesare. Sunt folosite pentru a răspunde
                  solicitării.{" "}
                  <a href="https://www.autoklass.ro/articole/politica-confidentialitate.html">
                    Confidențialitate
                  </a>
                </p>
                {state === "error" && (
                  <div ref={statusRef} tabIndex={-1} role="alert" className="v3-error">
                    Solicitarea nu a putut fi trimisă. Datele au rămas completate; poți încerca din
                    nou.
                  </div>
                )}
                <button type="submit" className="camp-primary" disabled={state === "sending"}>
                  {state === "sending" ? "Se procesează…" : "Solicită ofertă"}
                  <ArrowRight size={19} aria-hidden />
                </button>
              </form>
            )}
          </div>
        </section>
        <section className="camp-terms camp-wrap" aria-labelledby="camp-terms-title">
          <h2 id="camp-terms-title">Condițiile campaniei</h2>
          <p>
            {campaign.period}. Disponibilitatea, configurațiile și condițiile comerciale se confirmă
            cu Autoklass. Fotografiile sunt de prezentare.
          </p>
          <a href={campaign.source}>
            Consultă campania și condițiile publicate de Autoklass{" "}
            <ArrowRight size={16} aria-hidden />
          </a>
        </section>
      </main>
      <footer className="camp-footer camp-wrap">
        <Link to="/">Autoklass</Link>
        <a href="https://www.autoklass.ro/articole/termeni-si-conditii.html">Termeni și condiții</a>
      </footer>
    </div>
  );
}
