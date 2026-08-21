import { Link, createFileRoute } from "@tanstack/react-router";
import {
  Activity,
  ArrowLeft,
  Check,
  CircleDot,
  ChevronDown,
  CircleHelp,
  Disc,
  Phone,
  Snowflake,
  Wrench,
} from "lucide-react";
import { useRef, useState } from "react";

import { CompactField } from "@/components/form/CompactField";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Button } from "@/components/ui/button";
import { branches, contact } from "@/data/company";

export const Route = createFileRoute("/service/programare")({
  head: () => ({
    meta: [
      { title: "Programare service Mercedes-Benz — confirmare în 2 ore | Autoklass" },
      {
        name: "description",
        content:
          "Spui ce face mașina, ce mașină e și cum te găsim. Un consultant te sună în maximum două ore lucrătoare cu ora confirmată și estimarea de cost.",
      },
    ],
  }),
  component: BookingPage,
});

const services = [
  {
    id: "revizie",
    title: "Revizie periodică",
    hint: "Schimb ulei, filtre, verificare completă",
    estimate: "de la 1.100 lei",
    icon: Wrench,
  },
  {
    id: "frane",
    title: "Frâne și suspensie",
    hint: "Plăcuțe, discuri, zgomote la rulare",
    estimate: "estimare după diagnoză",
    icon: Disc,
  },
  {
    id: "diagnoza",
    title: "Diagnoză electronică",
    hint: "Martor aprins, erori, senzori",
    estimate: "de la 350 lei",
    icon: Activity,
  },
  {
    id: "climatizare",
    title: "Climatizare",
    hint: "Încărcare freon, igienizare",
    estimate: "de la 450 lei",
    icon: Snowflake,
  },
  {
    id: "anvelope",
    title: "Anvelope și geometrie",
    hint: "Schimb sezonier, echilibrare",
    estimate: "de la 250 lei",
    icon: CircleDot,
  },
  {
    id: "altceva",
    title: "Altceva / nu știu exact",
    hint: "Descrii problema, o clarificăm noi la telefon",
    estimate: "stabilim împreună",
    icon: CircleHelp,
  },
] as const;

const brandOptions = ["Mercedes-Benz", "Honda", "Altă marcă"];
const timeSlots = ["08:00 – 10:00", "10:00 – 12:00", "12:00 – 14:00", "14:00 – 17:00"];
const stepLabels = ["Lucrarea", "Mașina", "Datele tale"];

type FieldKey =
  "brand" | "model" | "year" | "plate" | "km" | "name" | "phone" | "email" | "date" | "notes";

type Fields = Record<FieldKey, string>;
type Errors = Partial<Record<FieldKey, string>>;

/** Opțiune tapabilă cu titlu și explicație — folosită pentru lucrare, marcă, sucursală. */
function Choice({
  active,
  onClick,
  title,
  hint,
  meta,
  icon: Icon,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  hint?: string;
  meta?: string;
  icon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={
        active
          ? "press flex min-h-16 w-full items-start gap-3 rounded-sm bg-primary p-4 text-left text-primary-foreground"
          : "press flex min-h-16 w-full items-start gap-3 rounded-sm border border-border bg-card p-4 text-left transition-colors hover:bg-muted"
      }
    >
      {Icon ? <Icon className="mt-0.5 size-5 shrink-0" strokeWidth={1.5} /> : null}
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-bold leading-snug">{title}</span>
        {hint ? (
          <span
            className={
              active
                ? "mt-1 block text-xs text-primary-foreground/70"
                : "mt-1 block text-xs text-muted-foreground"
            }
          >
            {hint}
          </span>
        ) : null}
        {meta ? (
          <span
            className={
              active
                ? "mt-2 block text-xs font-bold text-primary-foreground/85"
                : "mt-2 block text-xs font-bold"
            }
          >
            {meta}
          </span>
        ) : null}
      </span>
      {active ? <Check className="mt-0.5 size-5 shrink-0" strokeWidth={2.5} aria-hidden /> : null}
    </button>
  );
}

function BookingPage() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [service, setService] = useState<string | null>(null);
  const [branch, setBranch] = useState<string | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [fields, setFields] = useState<Fields>({
    brand: "Mercedes-Benz",
    model: "",
    year: "",
    plate: "",
    km: "",
    name: "",
    phone: "",
    email: "",
    date: "",
    notes: "",
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

  const chosenService = services.find((item) => item.id === service);
  const chosenBranch = branches.find((item) => item.name === branch);

  const validate = (which: number): Errors => {
    const next: Errors = {};
    if (which === 1) {
      if (!fields.model.trim()) next.model = "Scrie modelul, ca să pregătim piesele potrivite.";
      if (!/^\d{4}$/.test(fields.year)) next.year = "Anul are patru cifre, de exemplu 2019.";
      if (!fields.plate.trim()) next.plate = "Avem nevoie de numărul de înmatriculare.";
    }
    if (which === 2) {
      if (!fields.name.trim()) next.name = "Scrie-ne numele tău.";
      if (!/^[0-9+\s().-]{9,}$/.test(fields.phone))
        next.phone = "Pe acest număr te sunăm în două ore — verifică-l.";
      if (fields.email.trim() && !/^\S+@\S+\.\S+$/.test(fields.email))
        next.email = "Verifică adresa de e-mail.";
    }
    return next;
  };

  const goTo = (which: number) => {
    setStep(which);
    requestAnimationFrame(() => headingRef.current?.focus());
  };

  const next = () => {
    const found = validate(step);
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    if (step < 2) goTo(step + 1);
    else setDone(true);
  };

  const blocked = (step === 0 && !service) || (step === 1 && !branch);

  if (done) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <main className="mx-auto w-full max-w-2xl px-6 py-16 md:px-8 md:py-24">
          <span className="flex size-14 items-center justify-center rounded-full bg-trust text-trust-foreground">
            <Check className="size-7" strokeWidth={2} aria-hidden />
          </span>
          <h1 className="mt-8 text-3xl md:text-4xl">Am primit cererea. Urmează un telefon.</h1>
          <p className="mt-5 max-w-[52ch] text-base text-muted-foreground">
            Un consultant de la {branch?.replace("Autoklass ", "")} te sună la {fields.phone} în
            maximum două ore lucrătoare, îți confirmă ora și îți spune cât costă lucrarea.
          </p>

          <dl className="mt-10 space-y-3 rounded-sm bg-secondary p-6 text-sm">
            {[
              ["Lucrare", chosenService?.title ?? "-"],
              ["Mașina", `${fields.brand} ${fields.model} · ${fields.year} · ${fields.plate}`],
              ["Sucursala", branch?.replace("Autoklass ", "") ?? "-"],
              [
                "Când ai vrea",
                `${fields.date || "dată de confirmat"} · ${slot ?? "orice interval"}`,
              ],
            ].map(([label, value]) => (
              <div key={label} className="flex flex-wrap justify-between gap-x-6 gap-y-1">
                <dt className="text-muted-foreground">{label}</dt>
                <dd className="text-right">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" variant="outline" className="press">
              <a href={contact.phoneHref}>
                <Phone className="size-4" aria-hidden />
                {contact.phone}
              </a>
            </Button>
            <Button asChild size="lg" variant="ghost" className="press">
              <Link to="/service/tarife">Vezi tarifele</Link>
            </Button>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-28 lg:pb-0">
      <SiteHeader />

      <main className="mx-auto w-full max-w-6xl px-6 py-10 md:px-8 md:py-14 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
          <div>
            <ol className="flex gap-2" aria-label="Pașii programării">
              {stepLabels.map((label, index) => (
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
                  </span>
                </li>
              ))}
            </ol>

            <h1 ref={headingRef} tabIndex={-1} className="mt-10 text-3xl outline-none md:text-4xl">
              {step === 0
                ? "Ce trebuie rezolvat?"
                : step === 1
                  ? "Despre ce mașină vorbim?"
                  : "Cum te găsim?"}
            </h1>
            <p className="mt-4 max-w-[54ch] text-base text-muted-foreground">
              {step === 0
                ? "Alege ce se apropie cel mai mult. Dacă nu știi exact, e în regulă — clarificăm la telefon."
                : step === 1
                  ? "Cu datele astea pregătim piesele și îți dăm o estimare mai apropiată de realitate."
                  : "Te sunăm în maximum două ore lucrătoare, cu ora confirmată și estimarea de cost."}
            </p>

            {/* Pasul 1 — lucrarea */}
            {step === 0 ? (
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {services.map((item) => (
                  <Choice
                    key={item.id}
                    active={service === item.id}
                    onClick={() => setService(item.id)}
                    title={item.title}
                    hint={item.hint}
                    meta={item.estimate}
                    icon={item.icon}
                  />
                ))}
              </div>
            ) : null}

            {/* Pasul 2 — mașina și unde o aduci */}
            {step === 1 ? (
              <div className="mt-8 space-y-7">
                <fieldset>
                  <legend className="text-sm font-bold">Marca</legend>
                  <div className="mt-3 grid gap-2 sm:grid-cols-3">
                    {brandOptions.map((option) => (
                      <Choice
                        key={option}
                        active={fields.brand === option}
                        onClick={() => set("brand")(option)}
                        title={option}
                      />
                    ))}
                  </div>
                </fieldset>

                <div className="grid gap-3 sm:grid-cols-2">
                  <CompactField
                    id="model"
                    label="Model"
                    placeholder="C 220 d"
                    value={fields.model}
                    onChange={set("model")}
                    error={errors.model}
                  />
                  <CompactField
                    id="year"
                    label="An de fabricație"
                    inputMode="numeric"
                    placeholder="2019"
                    value={fields.year}
                    onChange={set("year")}
                    error={errors.year}
                  />
                  <CompactField
                    id="plate"
                    label="Număr de înmatriculare"
                    placeholder="B 123 ABC"
                    value={fields.plate}
                    onChange={set("plate")}
                    error={errors.plate}
                  />
                  <CompactField
                    id="km"
                    label="Kilometraj"
                    inputMode="numeric"
                    placeholder="120000"
                    required={false}
                    hint="Opțional, dar ne ajută la estimare."
                    value={fields.km}
                    onChange={set("km")}
                  />
                </div>

                <div>
                  <label htmlFor="branch" className="text-sm font-bold">
                    Alege sucursala
                  </label>
                  <div className="relative mt-3">
                    <select
                      id="branch"
                      value={branch ?? ""}
                      onChange={(event) => setBranch(event.target.value || null)}
                      className="h-14 w-full appearance-none rounded-sm border border-input bg-card px-4 pr-11 text-base outline-none focus:border-ring focus:ring-2 focus:ring-ring/25"
                    >
                      <option value="">Selectează unde aduci mașina</option>
                      {branches.map((item) => (
                        <option key={item.name} value={item.name}>
                          {item.name.replace("Autoklass ", "")} — {item.city}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
                      strokeWidth={1.5}
                      aria-hidden
                    />
                  </div>
                  {chosenBranch ? (
                    <p className="mt-2 text-xs text-muted-foreground">{chosenBranch.address}</p>
                  ) : null}
                </div>
              </div>
            ) : null}

            {/* Pasul 3 — omul, când și mesajul */}
            {step === 2 ? (
              <div className="mt-8 space-y-7">
                <div className="grid gap-3 sm:grid-cols-2">
                  <CompactField
                    id="name"
                    label="Nume și prenume"
                    autoComplete="name"
                    value={fields.name}
                    onChange={set("name")}
                    error={errors.name}
                  />
                  <CompactField
                    id="phone"
                    label="Telefon"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="07xx xxx xxx"
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
                    required={false}
                    hint="Opțional. Acolo trimitem confirmarea scrisă."
                    value={fields.email}
                    onChange={set("email")}
                    error={errors.email}
                  />
                  <CompactField
                    id="date"
                    label="Data preferată"
                    type="date"
                    required={false}
                    value={fields.date}
                    onChange={set("date")}
                  />
                </div>

                <div>
                  <p className="text-sm font-bold">Intervalul care îți convine</p>
                  <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {timeSlots.map((item) => (
                      <Choice
                        key={item}
                        active={slot === item}
                        onClick={() => setSlot(slot === item ? null : item)}
                        title={item}
                      />
                    ))}
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Opțional. Dacă nu alegi, îți propunem noi prima oră liberă.
                  </p>
                </div>

                <CompactField
                  id="notes"
                  label="Mai e ceva ce ar trebui să știm?"
                  multiline
                  required={false}
                  placeholder="Ce zgomot face, de când, dacă s-a aprins vreun martor…"
                  value={fields.notes}
                  onChange={set("notes")}
                />
              </div>
            ) : null}

            <div className="mt-10 hidden items-center gap-4 lg:flex">
              {step > 0 ? (
                <Button variant="outline" className="press" onClick={() => goTo(step - 1)}>
                  <ArrowLeft className="size-4" aria-hidden />
                  Înapoi
                </Button>
              ) : null}
              <Button size="lg" className="press" onClick={next} disabled={blocked}>
                {step === 2 ? "Trimite cererea" : "Continuă"}
              </Button>
            </div>
          </div>

          {/* Rezumat lipit: ce ai ales până acum + ce se întâmplă după */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-sm bg-card p-6 ring-1 ring-border/60">
              <h2 className="text-lg">Programarea ta</h2>
              <dl className="mt-4 space-y-3 text-sm">
                {[
                  ["Lucrare", chosenService?.title ?? "—"],
                  [
                    "Mașina",
                    fields.model ? `${fields.brand} ${fields.model}`.trim() : fields.brand,
                  ],
                  ["Sucursala", branch?.replace("Autoklass ", "") ?? "—"],
                ].map(([label, value]) => (
                  <div key={label} className="flex flex-wrap justify-between gap-x-4 gap-y-1">
                    <dt className="text-muted-foreground">{label}</dt>
                    <dd className="text-right">{value}</dd>
                  </div>
                ))}
              </dl>
              {chosenService ? (
                <p className="mt-4 border-t border-border/70 pt-4 text-sm">
                  <span className="text-muted-foreground">Estimare de intrare: </span>
                  <span className="font-bold">{chosenService.estimate}</span>
                </p>
              ) : null}
              <Link
                to="/service/tarife"
                className="mt-3 inline-flex min-h-11 items-center text-sm font-bold underline underline-offset-4"
              >
                Vezi toate tarifele
              </Link>
            </div>

            <ul className="mt-5 space-y-2 text-xs text-muted-foreground">
              {[
                "Te sunăm în maximum 2 ore lucrătoare.",
                "Primești estimarea înainte de orice intervenție.",
                "Nu atingem nimic până nu aprobi tu devizul.",
              ].map((line) => (
                <li key={line} className="flex items-start gap-2">
                  <Check
                    className="mt-0.5 size-4 shrink-0 text-trust"
                    strokeWidth={2.5}
                    aria-hidden
                  />
                  {line}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </main>

      <SiteFooter />

      {/* Bara de jos pe mobil, aceeași construcție ca pe restul site-ului */}
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
          <Button className="press h-12 flex-1" onClick={next} disabled={blocked}>
            {step === 2 ? "Trimite cererea" : "Continuă"}
          </Button>
        </div>
      </div>
    </div>
  );
}
