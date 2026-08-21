import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft, Check, ChevronDown, Lock, Phone } from "lucide-react";
import { useMemo, useRef, useState } from "react";

import logoUrl from "@/assets/autoklass-logo.png";
import { CompactField } from "@/components/form/CompactField";
import { Button } from "@/components/ui/button";
import { branches, contact } from "@/data/company";
import { formatKm, formatPrice, getVehicle, type Vehicle } from "@/data/vehicles";

/** Avansul unic de rezervare, așa cum e comunicat public de Autoklass. */
const DEPOSIT_EUR = 500;

export const Route = createFileRoute("/rezervare/$slug")({
  loader: ({ params }) => {
    const vehicle = getVehicle(params.slug);
    if (!vehicle) throw notFound();
    return { vehicle };
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData
          ? `Rezervare ${loaderData.vehicle.title} — Autoklass`
          : "Rezervare — Autoklass",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ReservationPage,
});

type FieldKey =
  | "firstName"
  | "lastName"
  | "phone"
  | "email"
  | "entity"
  | "company"
  | "cui"
  | "address"
  | "city"
  | "branch";

type Fields = Record<FieldKey, string>;
type Errors = Partial<Record<FieldKey, string>>;

const steps = ["Datele tale", "Facturare", "Confirmare"] as const;

/* Rezumatul comenzii. Pe desktop stă lipit lângă formular, pe mobil se
   deschide dintr-un rând compact — regula de bază la un checkout: omul poate
   verifica oricând ce cumpără, fără să piardă pasul la care e. */
function Summary({ vehicle, open }: { vehicle: Vehicle; open?: boolean }) {
  const rest = vehicle.priceEur - DEPOSIT_EUR;

  return (
    <div className={open ? "block" : "hidden lg:block"}>
      <div className="flex gap-4">
        <img
          src={vehicle.image}
          alt=""
          className="size-24 shrink-0 rounded-sm object-cover"
          loading="lazy"
        />
        <div className="min-w-0">
          <p className="text-sm leading-snug">{vehicle.title}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {[
              vehicle.km === null || vehicle.km === 0 ? "0 km" : formatKm(vehicle.km),
              `${vehicle.powerHp} CP`,
              vehicle.fuel,
            ].join(" · ")}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {vehicle.branch.replace("Autoklass ", "")}
          </p>
        </div>
      </div>

      <dl className="mt-6 space-y-3 border-t border-border/70 pt-5 text-sm">
        <div className="flex items-baseline justify-between gap-4">
          <dt className="text-muted-foreground">Mașina</dt>
          <dd className="tabular-nums">{formatPrice(vehicle.priceEur)} €</dd>
        </div>
        <div className="flex items-baseline justify-between gap-4">
          <dt className="text-muted-foreground">
            TVA {vehicle.vat === "deductibil" ? "deductibil" : "inclus"}
          </dt>
          <dd className="text-muted-foreground">în preț</dd>
        </div>
        <div className="flex items-baseline justify-between gap-4 border-t border-border/70 pt-4">
          <dt className="font-bold">Plătești acum</dt>
          <dd className="font-display text-2xl tabular-nums">{formatPrice(DEPOSIT_EUR)} €</dd>
        </div>
        <div className="flex items-baseline justify-between gap-4">
          <dt className="text-muted-foreground">Rest la predare</dt>
          <dd className="tabular-nums text-muted-foreground">{formatPrice(rest)} €</dd>
        </div>
      </dl>

      <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
        Avansul se scade din prețul mașinii. Dacă te răzgândești până la semnarea contractului, îl
        primești integral înapoi.
      </p>
    </div>
  );
}

function ReservationPage() {
  const { vehicle } = Route.useLoaderData();
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [fields, setFields] = useState<Fields>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    entity: "fizica",
    company: "",
    cui: "",
    address: "",
    city: "",
    branch: vehicle.branch,
  });
  const [errors, setErrors] = useState<Errors>({});
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  const set = (key: FieldKey) => (next: string) => {
    setFields((current) => ({ ...current, [key]: next }));
    setErrors((current) => {
      if (!current[key]) return current;
      const { [key]: _removed, ...rest } = current;
      return rest;
    });
  };

  const validate = (which: number): Errors => {
    const next: Errors = {};
    if (which === 0) {
      if (!fields.firstName.trim())
        next.firstName = "Scrie prenumele, ca să știm cum ți ne adresăm.";
      if (!fields.lastName.trim()) next.lastName = "Scrie numele de familie.";
      if (!/^[0-9+\s().-]{9,}$/.test(fields.phone))
        next.phone = "Avem nevoie de un număr valid — pe el te sunăm în două ore.";
      if (!/^\S+@\S+\.\S+$/.test(fields.email))
        next.email = "Verifică adresa de e-mail. Acolo trimitem confirmarea.";
    }
    if (which === 1) {
      if (!fields.address.trim()) next.address = "Scrie adresa de facturare.";
      if (!fields.city.trim()) next.city = "Scrie localitatea.";
      if (fields.entity === "juridica") {
        if (!fields.company.trim()) next.company = "Scrie denumirea firmei.";
        if (!fields.cui.trim()) next.cui = "Scrie CUI-ul firmei.";
      }
    }
    return next;
  };

  const goTo = (which: number) => {
    setStep(which);
    setSummaryOpen(false);
    requestAnimationFrame(() => headingRef.current?.focus());
  };

  const next = () => {
    const found = validate(step);
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    if (step < 2) goTo(step + 1);
    else setDone(true);
  };

  const summaryCard = useMemo(() => <Summary vehicle={vehicle} open />, [vehicle]);

  if (done) {
    return (
      <div className="min-h-screen bg-background">
        <CheckoutHeader />
        <main className="mx-auto w-full max-w-2xl px-6 py-16 md:px-8 md:py-24">
          <span className="flex size-14 items-center justify-center rounded-full bg-trust text-trust-foreground">
            <Check className="size-7" strokeWidth={2} aria-hidden />
          </span>
          <h1 className="mt-8 text-3xl md:text-4xl">Mașina e a ta pentru următoarele 5 zile.</h1>
          <p className="mt-5 max-w-[52ch] text-base text-muted-foreground">
            Am oprit-o din stoc pe numele tău. Un consultant de la{" "}
            {vehicle.branch.replace("Autoklass ", "")} te sună în maximum două ore lucrătoare, la{" "}
            {fields.phone}, ca să stabiliți predarea și actele.
          </p>

          <ol className="mt-10 border-t border-border/70">
            {[
              "Primești pe e-mail confirmarea și chitanța pentru avans.",
              "Te sunăm în două ore, cu nume și număr direct.",
              "Stabilim ziua predării și ce acte aduci.",
              "Vii la sucursală, verifici mașina, semnezi și pleci cu ea.",
            ].map((line, index) => (
              <li
                key={line}
                className="grid grid-cols-[2.5rem_minmax(0,1fr)] items-baseline gap-x-5 border-b border-border/70 py-5"
              >
                <span className="font-display text-lg tabular-nums text-muted-foreground">
                  0{index + 1}
                </span>
                <p className="text-base">{line}</p>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="press">
              <Link to="/autoturisme">Vezi mașinile disponibile</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="press">
              <a href={contact.phoneHref}>
                <Phone className="size-4" aria-hidden />
                {contact.phone}
              </a>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-28 lg:pb-0">
      <CheckoutHeader slug={vehicle.slug} />

      {/* O singură bandă sub antet, în loc de trei suprapuse: ce rezervi,
          cât plătești acum și garanțiile — toate într-un bloc. */}
      <div className="border-b border-border/70 bg-secondary lg:hidden">
        <div className="mx-auto w-full max-w-3xl px-6">
          <button
            type="button"
            aria-expanded={summaryOpen}
            aria-controls="rezumat-mobil"
            onClick={() => setSummaryOpen((open) => !open)}
            className="flex w-full items-center gap-3 py-3 text-left"
          >
            <img
              src={vehicle.image}
              alt=""
              className="size-12 shrink-0 rounded-sm object-cover"
              loading="lazy"
            />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-bold">{vehicle.title}</span>
              <span className="mt-0.5 block text-xs text-muted-foreground">
                {summaryOpen ? "Ascunde detaliile" : "Vezi detaliile rezervării"}
              </span>
            </span>
            <span className="shrink-0 text-right">
              <span className="block font-display text-xl leading-none tabular-nums">
                {formatPrice(DEPOSIT_EUR)} €
              </span>
              <span className="mt-1 block text-xs text-muted-foreground">acum</span>
            </span>
            <ChevronDown
              className={
                summaryOpen
                  ? "size-5 shrink-0 rotate-180 text-muted-foreground transition-transform"
                  : "size-5 shrink-0 text-muted-foreground transition-transform"
              }
              strokeWidth={1.5}
              aria-hidden
            />
          </button>

          <div id="rezumat-mobil" hidden={!summaryOpen} className="pb-6">
            {summaryOpen ? summaryCard : null}
          </div>

          <ul className="flex flex-wrap gap-x-5 gap-y-1.5 border-t border-border/70 py-3 text-xs text-muted-foreground">
            {["Avans returnabil", "Plată la bancă", "Te sunăm în 2 ore"].map((item) => (
              <li key={item} className="flex items-center gap-1.5">
                <Check className="size-3.5 shrink-0 text-trust" strokeWidth={3} aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <main className="mx-auto w-full max-w-6xl px-6 py-10 md:px-8 md:py-14 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16">
          <div>
            {/* Progres: 3 pași, stare curentă anunțată și pentru cititoarele de ecran */}
            <ol className="flex gap-2" aria-label="Pașii rezervării">
              {steps.map((label, index) => {
                const state = index < step ? "gata" : index === step ? "curent" : "urmează";
                return (
                  <li key={label} className="min-w-0 flex-1">
                    <span
                      aria-current={index === step ? "step" : undefined}
                      className={
                        index <= step
                          ? "block h-1 rounded-full bg-foreground"
                          : "block h-1 rounded-full bg-border"
                      }
                    />
                    <span
                      className={
                        index === step
                          ? "mt-3 block truncate text-sm font-bold"
                          : "mt-3 block truncate text-sm text-muted-foreground"
                      }
                    >
                      {index + 1}. {label}
                      <span className="sr-only"> — {state}</span>
                    </span>
                  </li>
                );
              })}
            </ol>

            <h1 ref={headingRef} tabIndex={-1} className="mt-10 text-3xl outline-none md:text-4xl">
              {step === 0
                ? "Cum te găsim?"
                : step === 1
                  ? "Pe cine trecem pe factură?"
                  : "Verifică și confirmă."}
            </h1>
            <p className="mt-4 max-w-[54ch] text-base text-muted-foreground">
              {step === 0
                ? "Avem nevoie de un nume și un număr ca să oprim mașina din stoc și să te sunăm."
                : step === 1
                  ? "Datele merg pe factura de avans. Le poți corecta oricând până la semnarea contractului."
                  : "Nimic nu se plătește până nu apeși butonul de mai jos."}
            </p>

            {/* Pasul 1 */}
            {step === 0 ? (
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <CompactField
                  id="firstName"
                  label="Prenume"
                  value={fields.firstName}
                  onChange={set("firstName")}
                  error={errors.firstName}
                  autoComplete="given-name"
                />
                <CompactField
                  id="lastName"
                  label="Nume"
                  value={fields.lastName}
                  onChange={set("lastName")}
                  error={errors.lastName}
                  autoComplete="family-name"
                />
                <CompactField
                  id="phone"
                  label="Telefon"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="07xx xxx xxx"
                  hint="Pe acest număr te sunăm în maximum două ore lucrătoare."
                  value={fields.phone}
                  onChange={set("phone")}
                  error={errors.phone}
                />
                <CompactField
                  id="email"
                  label="E-mail"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  hint="Aici primești confirmarea și chitanța."
                  value={fields.email}
                  onChange={set("email")}
                  error={errors.email}
                />
              </div>
            ) : null}

            {/* Pasul 2 */}
            {step === 1 ? (
              <div className="mt-8 space-y-7">
                <fieldset>
                  <legend className="text-sm font-bold">Cumperi ca</legend>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {[
                      { value: "fizica", label: "Persoană fizică" },
                      { value: "juridica", label: "Firmă" },
                    ].map((option) => {
                      const active = fields.entity === option.value;
                      return (
                        <button
                          key={option.value}
                          type="button"
                          aria-pressed={active}
                          onClick={() => set("entity")(option.value)}
                          className={
                            active
                              ? "press flex min-h-14 items-center rounded-sm bg-primary px-5 text-sm font-bold text-primary-foreground"
                              : "press flex min-h-14 items-center rounded-sm border border-border px-5 text-sm hover:bg-muted"
                          }
                        >
                          {option.label}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                {fields.entity === "juridica" ? (
                  <div className="grid gap-3 sm:grid-cols-2">
                    <CompactField
                      id="company"
                      label="Denumirea firmei"
                      value={fields.company}
                      onChange={set("company")}
                      error={errors.company}
                      autoComplete="organization"
                    />
                    <CompactField
                      id="cui"
                      label="CUI"
                      value={fields.cui}
                      onChange={set("cui")}
                      error={errors.cui}
                    />
                  </div>
                ) : null}

                <div className="grid gap-3 sm:grid-cols-2">
                  <CompactField
                    id="address"
                    label="Adresă de facturare"
                    value={fields.address}
                    onChange={set("address")}
                    error={errors.address}
                    autoComplete="street-address"
                  />
                  <CompactField
                    id="city"
                    label="Localitate"
                    value={fields.city}
                    onChange={set("city")}
                    error={errors.city}
                    autoComplete="address-level2"
                  />
                </div>

                <div>
                  <p className="text-sm font-bold">De unde ridici mașina</p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Mașina e acum la {vehicle.branch.replace("Autoklass ", "")}. O putem muta la
                    altă sucursală, fără cost.
                  </p>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {branches.map((branch) => {
                      const active = fields.branch === branch.name;
                      return (
                        <button
                          key={branch.name}
                          type="button"
                          aria-pressed={active}
                          onClick={() => set("branch")(branch.name)}
                          className={
                            active
                              ? "press rounded-sm bg-primary p-4 text-left text-primary-foreground"
                              : "press rounded-sm border border-border p-4 text-left hover:bg-muted"
                          }
                        >
                          <span className="block text-sm font-bold">
                            {branch.name.replace("Autoklass ", "")}
                          </span>
                          <span
                            className={
                              active
                                ? "mt-1 block text-xs text-primary-foreground/70"
                                : "mt-1 block text-xs text-muted-foreground"
                            }
                          >
                            {branch.address}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : null}

            {/* Pasul 3 */}
            {step === 2 ? (
              <div className="mt-8 space-y-7">
                <div className="rounded-sm bg-secondary p-6">
                  <dl className="space-y-4 text-sm">
                    {[
                      {
                        t: "Datele tale",
                        v: `${fields.firstName} ${fields.lastName} · ${fields.phone} · ${fields.email}`,
                        to: 0,
                      },
                      {
                        t: "Factura",
                        v: [
                          fields.entity === "juridica"
                            ? `${fields.company} · CUI ${fields.cui}`
                            : "Persoană fizică",
                          fields.address,
                          fields.city,
                        ]
                          .filter(Boolean)
                          .join(" · "),
                        to: 1,
                      },
                      {
                        t: "Ridici de la",
                        v: fields.branch.replace("Autoklass ", ""),
                        to: 1,
                      },
                    ].map((row) => (
                      <div
                        key={row.t}
                        className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1"
                      >
                        <dt className="text-muted-foreground">{row.t}</dt>
                        <dd className="min-w-0 flex-1 text-right">{row.v}</dd>
                        <button
                          type="button"
                          onClick={() => goTo(row.to)}
                          className="shrink-0 text-xs font-bold underline underline-offset-4"
                        >
                          modifică
                        </button>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className="rounded-sm bg-primary p-6 text-primary-foreground md:p-8">
                  <h2 className="font-display text-2xl">
                    Plătești acum {formatPrice(DEPOSIT_EUR)} €, atât.
                  </h2>
                  <p className="mt-3 max-w-[48ch] text-sm text-primary-foreground/80">
                    E avansul unic de rezervare. Se scade din prețul mașinii, iar dacă te
                    răzgândești până la semnarea contractului îl primești integral înapoi. Restul se
                    achită la predare, cu factura în față.
                  </p>
                  <p className="mt-5 flex items-center gap-2 text-xs text-primary-foreground/60">
                    <Lock className="size-4" strokeWidth={1.5} aria-hidden />
                    Plata se face pe pagina securizată a băncii. Autoklass nu vede datele cardului.
                  </p>
                </div>

                <p className="text-xs leading-relaxed text-muted-foreground">
                  Apăsând butonul de mai jos ești de acord cu termenii de rezervare și confirmi că
                  datele de facturare sunt corecte.
                </p>
              </div>
            ) : null}

            {/* Navigație între pași — pe desktop; pe mobil e în bara de jos */}
            <div className="mt-10 hidden items-center gap-4 lg:flex">
              {step > 0 ? (
                <Button variant="outline" className="press" onClick={() => goTo(step - 1)}>
                  <ArrowLeft className="size-4" aria-hidden />
                  Înapoi
                </Button>
              ) : null}
              <Button size="lg" className="press" onClick={next}>
                {step === 2 ? `Confirmă și plătește ${formatPrice(DEPOSIT_EUR)} €` : "Continuă"}
              </Button>
            </div>
          </div>

          <aside className="lg:sticky lg:top-10 lg:self-start">
            <div className="rounded-sm bg-card p-6 ring-1 ring-border/60">
              <h2 className="text-lg">Ce rezervi</h2>
              <div className="mt-5">
                <Summary vehicle={vehicle} />
              </div>
            </div>
            <div className="mt-4 rounded-sm bg-secondary p-5">
              <p className="text-sm">
                Rezervarea o preia un consultant de la{" "}
                <strong>{vehicle.branch.replace("Autoklass ", "")}</strong>. Dacă vrei să întrebi
                ceva înainte să plătești, sună — chiar răspunde cineva.
              </p>
              <a
                href={contact.phoneHref}
                className="mt-3 flex min-h-11 items-center gap-2 font-display text-lg tabular-nums"
              >
                <Phone className="size-4 shrink-0" strokeWidth={1.5} aria-hidden />
                {contact.phone}
              </a>
              <p className="mt-1 text-xs text-muted-foreground">L–V 8:00–17:00 · S 8:00–15:00</p>
            </div>
          </aside>
        </div>
      </main>

      {/* Bara de jos pe mobil: aceeași construcție ca pe restul site-ului */}
      <div className="pb-safe fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card px-4 pt-3 lg:hidden">
        <div className="flex items-center gap-2">
          {step > 0 ? (
            <Button
              variant="outline"
              className="press size-12 shrink-0 p-0"
              aria-label="Pasul anterior"
              onClick={() => goTo(step - 1)}
            >
              <ArrowLeft className="size-5" aria-hidden />
            </Button>
          ) : null}
          <Button className="press h-12 flex-1" onClick={next}>
            {step === 2 ? `Confirmă și plătește ${formatPrice(DEPOSIT_EUR)} €` : "Continuă"}
          </Button>
        </div>
      </div>
    </div>
  );
}

/* Antet redus: la checkout scoatem navigația, ca să nu existe ieșiri
   accidentale. Rămâne o singură cale înapoi, la mașină. */
function CheckoutHeader({ slug }: { slug?: string }) {
  return (
    <header className="border-b border-border/70">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-6 md:px-8 lg:px-10">
        {slug ? (
          <Link
            to="/autoturisme/$slug"
            params={{ slug }}
            className="group flex min-h-11 items-center gap-2 text-sm"
          >
            <ArrowLeft
              className="size-4 transition-transform group-hover:-translate-x-0.5"
              aria-hidden
            />
            Înapoi la mașină
          </Link>
        ) : (
          <Link to="/" className="flex min-h-11 items-center" aria-label="Autoklass — acasă">
            <img src={logoUrl} alt="Autoklass" className="h-6 w-auto invert" />
          </Link>
        )}
        <p className="flex items-center gap-2 text-xs text-muted-foreground">
          <Lock className="size-4" strokeWidth={1.5} aria-hidden />
          Rezervare securizată
        </p>
      </div>
    </header>
  );
}
