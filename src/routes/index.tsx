import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  CircleDot,
  MapPin,
  PaintBucket,
  ShieldCheck,
  Tag,
  Truck,
  Wrench,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import serviceConsultant from "@/assets/service-consultant.jpg";
import showroomPoster from "@/assets/showroom-poster.jpg";
import showroomVideo from "@/assets/showroom.mp4";
// Imaginile de campanie: înlocuiește fișierele din `src/assets/campaigns/`
// păstrând numele, iar secțiunea se actualizează singură.
const campaignImages = import.meta.glob("@/assets/campaigns/*.jpg", {
  eager: true,
  import: "default",
}) as Record<string, string>;
const campaignImage = (file: string) =>
  Object.entries(campaignImages).find(([key]) => key.endsWith(`/${file}`))?.[1] ?? "";

const serviceIcons = {
  wrench: Wrench,
  shield: ShieldCheck,
  truck: Truck,
  brush: PaintBucket,
  disc: CircleDot,
  tag: Tag,
} as const;
import { MobileStickyBar } from "@/components/layout/MobileStickyBar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { branches, stockFacts } from "@/data/company";
import { campaigns, services } from "@/data/offers";
import { formatKm, formatPrice, vehicles, type Vehicle } from "@/data/vehicles";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Autoklass — Mercedes-Benz noi și rulate, service autorizat în 9 orașe" },
      {
        name: "description",
        content:
          "Peste 1.170 de Mercedes-Benz noi și rulate, în 9 showroomuri. Rezervi un test drive sau o oră la service în câteva minute, iar la service afli cât durează și cât costă înainte să lași cheia.",
      },
      {
        property: "og:title",
        content: "Autoklass — Mercedes-Benz noi și rulate, service autorizat în 9 orașe",
      },
      {
        property: "og:description",
        content:
          "Test drive fără obligații, consultanți care te caută în două ore și service care îți spune costul înainte să lași cheia.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

/* Bară de acces rapid. Ordinea nu e întâmplătoare: service-ul și dauna aduc
   marja mare, așa că stau primele, imediat sub hero. */
const quickLinks = [
  { label: "Programare service", to: "/service/programare" as const },
  { label: "Tarife service", to: "/service/tarife" as const },
  { label: "Dosar de daună", to: "/service/dosar-daune" as const },
  { label: "Mașini în stoc", to: "/autoturisme" as const },
  { label: "Evaluare mașina ta", to: "/buy-back" as const },
];

const reassurances = [
  {
    label: "Fără surprize la casă",
    body: "La service afli cât durează și cât costă înainte să lași cheia. Dacă apare ceva în plus, te sunăm și decizi tu.",
  },
  {
    label: "Răspuns în două ore",
    body: "Un consultant cu nume și număr direct, nu un formular care se pierde undeva.",
  },
  {
    label: "Fără presiune",
    body: "Test drive-ul și oferta nu te obligă la nimic. Poți pleca oricând.",
  },
];

const steps = [
  "Alegi mașina",
  "Vorbești cu un consultant",
  "Vii la test drive",
  "Primești oferta în scris",
  "Iei cheia",
];

const faq = [
  {
    q: "Prețul de pe site e prețul final?",
    a: "Da. Include regimul de TVA scris pe fiecare mașină. Dacă apare vreun cost în plus, îl afli înainte să semnezi ceva.",
  },
  {
    q: "Pot să conduc mașina fără să o cumpăr?",
    a: "Da. Test drive-ul nu te obligă la nimic și nu îți cerem un avans ca să îl faci.",
  },
  {
    q: "Cât pot rezolva online?",
    a: "Ora la service, dosarul de daună, evaluarea mașinii tale și rezervarea unui test drive le începi de aici. Actele și predarea se fac la sucursală.",
  },
  {
    q: "Ce verificați la o mașină rulată?",
    a: "Kilometrajul, istoricul de service din rețeaua autorizată, structura și piesele de uzură. Raportul îl primești înainte să te hotărăști.",
  },
];

function FaqList() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mt-8 border-t border-border/70">
      {faq.map((item, index) => {
        const expanded = open === index;
        return (
          <div key={item.q} className="border-b border-border/70">
            <h3>
              <button
                type="button"
                aria-expanded={expanded}
                aria-controls={`faq-panel-${index}`}
                id={`faq-trigger-${index}`}
                onClick={() => setOpen(expanded ? null : index)}
                className="flex min-h-16 w-full items-center justify-between gap-6 py-5 text-left text-lg"
              >
                {item.q}
                <span
                  aria-hidden
                  className="shrink-0 font-sans text-2xl leading-none text-muted-foreground"
                >
                  {expanded ? "–" : "+"}
                </span>
              </button>
            </h3>
            <div
              className="nav-collapse"
              data-open={expanded ? "true" : "false"}
              id={`faq-panel-${index}`}
              role="region"
              aria-labelledby={`faq-trigger-${index}`}
              aria-hidden={!expanded}
              {...(expanded ? {} : { inert: true })}
            >
              <p className="max-w-[58ch] overflow-hidden pb-6 text-sm text-muted-foreground">
                {item.a}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* Card de mașină pentru rafturile de pe homepage: raport de imagine fix
   (sursele au proporții diferite) și prețul spus complet — cât costă, ce
   include, cât scazi față de prețul de listă. */
function VehicleTile({ vehicle }: { vehicle: Vehicle }) {
  const saving =
    vehicle.listPriceEur && vehicle.listPriceEur > vehicle.priceEur
      ? vehicle.listPriceEur - vehicle.priceEur
      : null;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-sm bg-card ring-1 ring-border/60">
      <Link
        to="/autoturisme/$slug"
        params={{ slug: vehicle.slug }}
        className="group block focus-visible:outline-none"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <img
            src={vehicle.image}
            alt={vehicle.title}
            loading="lazy"
            className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <span className="absolute left-3 top-3 rounded-sm bg-card/95 px-2.5 py-1 text-xs font-bold ring-1 ring-border/60">
            {vehicle.condition === "nou" ? "Nou" : "Rulat verificat"}
          </span>
        </div>

        <div className="px-5 pt-5">
          <h3 className="text-lg leading-snug group-hover:underline">{vehicle.title}</h3>

          <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <p className="font-display text-2xl leading-none tabular-nums">
              {formatPrice(vehicle.priceEur)} €
            </p>
            {saving && vehicle.listPriceEur ? (
              <p className="text-sm tabular-nums text-muted-foreground line-through">
                {formatPrice(vehicle.listPriceEur)} €
              </p>
            ) : null}
          </div>
          <p className="mt-1.5 text-xs text-muted-foreground">
            Atât plătești, cu TVA {vehicle.vat === "deductibil" ? "deductibil" : "inclus"}
          </p>

          <p className="mt-3 text-xs text-muted-foreground">
            {[
              vehicle.km === null || vehicle.km === 0 ? "0 km" : formatKm(vehicle.km),
              `${vehicle.powerHp} CP`,
              vehicle.fuel,
              vehicle.branch.replace("Autoklass ", ""),
            ].join(" · ")}
          </p>
        </div>
      </Link>

      <div className="mt-auto p-5 pt-6">
        <Button asChild className="press w-full">
          <Link to="/rezervare/$slug" params={{ slug: vehicle.slug }}>
            Rezervă online
          </Link>
        </Button>
      </div>
    </article>
  );
}

function HomePage() {
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Safari/iOS refuză uneori autoplay-ul declarativ; cerem explicit redarea și
  // ignorăm respingerea (rămâne posterul, un cadru din același film).
  useEffect(() => {
    heroVideoRef.current?.play().catch(() => {});
    videoRef.current?.play().catch(() => {});
  }, []);

  // Un singur raft: mașinile cu cea mai mare reducere față de prețul de listă,
  // completat cu restul stocului dacă nu sunt destule.
  const shown = useMemo(() => {
    const free = vehicles.filter((v) => !v.reserved);
    const discount = (v: Vehicle) => (v.listPriceEur ?? v.priceEur) - v.priceEur;
    return [...free].sort((a, b) => discount(b) - discount(a)).slice(0, 6);
  }, []);

  const facts = [
    { value: formatPrice(stockFacts.totalMercedes), label: "mașini în stoc" },
    { value: String(stockFacts.branchCount), label: "sucursale cu service" },
    { value: "2h", label: "până îți răspundem" },
  ];

  // Vopsitoria deschide raftul: e cea mai concretă promisiune din listă.
  const orderedCampaigns = [
    ...campaigns.filter((c) => c.slug === "vopsitorie"),
    ...campaigns.filter((c) => c.slug !== "vopsitorie"),
  ];

  const cityList = branches.map((b) => b.city).filter((c, i, a) => a.indexOf(c) === i);

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-0">
      <SiteHeader overlay />

      <main>
        {/* 1. Hero */}
        <section
          id="acasa-hero"
          className="relative isolate -mt-16 overflow-hidden bg-primary text-primary-foreground lg:-mt-20"
        >
          <div className="hero-media absolute inset-0 overflow-hidden" aria-hidden>
            <video
              ref={heroVideoRef}
              className="size-full object-cover"
              style={{ transform: "scale(1.32)", transformOrigin: "50% 100%" }}
              src={showroomVideo}
              poster={showroomPoster}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />
          </div>
          <div className="hero-copy-scrim absolute inset-0 bg-primary/10" aria-hidden />

          <div className="relative mx-auto flex min-h-[86svh] w-full max-w-7xl flex-col justify-end px-6 pb-12 pt-28 md:px-8 md:pb-16 lg:px-10">
            <h1
              className="hero-rise font-display"
              style={{
                animationDelay: "120ms",
                fontSize: "clamp(2.6rem, 7vw, 6rem)",
                lineHeight: 0.98,
                maxWidth: "14ch",
              }}
            >
              Un Mercedes-Benz nu se alege dintr-o poză.
            </h1>

            <p
              className="hero-rise mt-6 text-pretty text-base text-primary-foreground/85"
              style={{ animationDelay: "220ms", maxWidth: "44ch" }}
            >
              Peste {formatPrice(stockFacts.totalMercedes)} de mașini noi și rulate, în{" "}
              {stockFacts.branchCount} showroomuri. Alege una și îți pregătim cheia pentru ziua în
              care poți veni.
            </p>

            <div
              className="hero-rise mt-8 flex flex-col gap-3 sm:flex-row"
              style={{ animationDelay: "320ms" }}
            >
              <Button asChild size="lg" variant="secondary" className="press">
                <Link to="/autoturisme">Vezi mașinile disponibile</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="press border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <Link to="/service/programare">Programare service</Link>
              </Button>
            </div>

            <p
              className="hero-rise mt-8 text-xs text-primary-foreground/65"
              style={{ animationDelay: "400ms" }}
            >
              Dealer autorizat Mercedes-Benz din 2001
            </p>
          </div>
        </section>

        {/* Cifre + acces rapid, într-o singură bandă */}
        <section aria-label="Autoklass în cifre" className="border-b border-border/70">
          <div className="mx-auto w-full max-w-7xl px-6 md:px-8 lg:px-10">
            <dl className="grid grid-cols-3 divide-x divide-border/70 py-6 md:py-7">
              {facts.map((fact, i) => (
                <div key={fact.label} className={i === 0 ? "pr-4" : "px-4 last:pr-0"}>
                  <dd className="font-display text-3xl leading-none tabular-nums md:text-4xl">
                    {fact.value}
                  </dd>
                  <dt className="mt-2 text-xs text-muted-foreground">{fact.label}</dt>
                </div>
              ))}
            </dl>
            <nav aria-label="Acces rapid" className="grid border-t border-border/70 lg:grid-cols-5">
              {quickLinks.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className="group relative isolate flex min-h-[5.5rem] items-center justify-between gap-4 overflow-hidden border-b border-border/70 px-1 lg:min-h-[7.5rem] lg:border-b-0 lg:border-r lg:px-6 lg:last:border-r-0"
                >
                  {/* Umplere care intră dinspre stânga, ca o cursă de vopsea. */}
                  <span
                    aria-hidden
                    className="absolute inset-0 -z-10 origin-left scale-x-0 bg-foreground transition-transform duration-[520ms] ease-[cubic-bezier(0.16,0.84,0.24,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
                  />
                  <span className="font-display text-xl leading-tight transition-colors duration-300 group-hover:text-background lg:text-2xl">
                    {item.label}
                  </span>
                  <ArrowUpRight
                    className="size-5 shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-background"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                </Link>
              ))}
            </nav>
          </div>
        </section>

        {/* 2. Oferte și noutăți — imagine plină, text peste, fără etichete mici */}
        <section className="border-b border-border/70 py-14 md:py-20">
          <div className="mx-auto w-full max-w-7xl px-6 md:px-8 lg:px-10">
            <Reveal>
              <h2 className="text-3xl md:text-4xl">Oferte și noutăți</h2>
            </Reveal>

            <div className="snap-rail -mx-6 mt-8 gap-4 px-6 pb-2 md:-mx-8 md:px-8 lg:mx-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0">
              {orderedCampaigns.map((campaign) => (
                <Link
                  key={campaign.slug}
                  to={campaign.to}
                  className="snap-card group relative isolate flex aspect-[4/5] w-[78vw] max-w-sm flex-col justify-end overflow-hidden rounded-sm bg-primary text-primary-foreground lg:w-auto lg:max-w-none"
                >
                  <img
                    src={campaignImage(campaign.image)}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="hero-copy-scrim absolute inset-0" aria-hidden />

                  <div className="relative p-6">
                    <h3 className="text-pretty font-display text-2xl leading-tight">
                      {campaign.title}
                    </h3>
                    <p className="mt-3 text-sm text-primary-foreground/80">{campaign.body}</p>
                    <span className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-bold">
                      {campaign.cta}
                      <ArrowRight
                        className="size-4 transition-transform group-hover:translate-x-1"
                        aria-hidden
                      />
                    </span>
                    {campaign.until ? (
                      <span className="mt-1 block text-xs text-primary-foreground/60">
                        până pe {campaign.until}
                      </span>
                    ) : null}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Stocul, ca la un magazin: liste comutabile */}
        <section className="border-b border-border/70 bg-secondary py-14 md:py-20 lg:py-28">
          <div className="mx-auto w-full max-w-7xl px-6 md:px-8 lg:px-10">
            <Reveal className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
              <div className="max-w-2xl">
                <h2 className="text-3xl md:text-4xl">Mașini disponibile acum</h2>
                <p className="mt-4 max-w-[54ch] text-base text-muted-foreground">
                  Toate sunt în showroom acum. Alege una și îți rezervăm cheia pentru un test drive.
                </p>
              </div>
              <Link
                to="/autoturisme"
                className="group hidden min-h-11 items-center gap-2 text-sm font-bold md:inline-flex"
              >
                Toate cele {vehicles.length} mașini
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-1"
                  aria-hidden
                />
              </Link>
            </Reveal>

            <div className="snap-rail -mx-6 mt-6 gap-4 px-6 pb-2 md:-mx-8 md:px-8 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-0">
              {shown.map((vehicle) => (
                <div
                  key={vehicle.slug}
                  className="snap-card w-[80vw] max-w-sm lg:w-auto lg:max-w-none"
                >
                  <VehicleTile vehicle={vehicle} />
                </div>
              ))}
            </div>

            <Button asChild variant="outline" className="press mt-8 w-full md:hidden">
              <Link to="/autoturisme">Toate cele {vehicles.length} mașini</Link>
            </Button>
          </div>
        </section>

        {/* 4. Servicii — partea cu marja cea mai mare, tratată la fel de serios
             ca stocul: același tip de raft, aceeași ierarhie de butoane. */}
        <section className="border-b border-border/70 py-14 md:py-20 lg:py-28">
          <div className="mx-auto w-full max-w-7xl px-6 md:px-8 lg:px-10">
            <Reveal className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
              <div className="max-w-2xl">
                <h2 className="text-3xl md:text-4xl">
                  Mașina rămâne a ta mult după ce ai cumpărat-o.
                </h2>
                <p className="mt-4 max-w-[54ch] text-base text-muted-foreground">
                  Întreținere, daune, vopsitorie și piese, în rețeaua autorizată. Îți spunem cât
                  durează și cât costă înainte să lași cheia, nu când vii după ea.
                </p>
              </div>
              <Link
                to="/service/programare"
                className="group hidden min-h-11 items-center gap-2 text-sm font-bold md:inline-flex"
              >
                Programează online
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-1"
                  aria-hidden
                />
              </Link>
            </Reveal>

            <div className="snap-rail -mx-6 mt-8 gap-4 px-6 pb-2 md:-mx-8 md:px-8 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-0">
              {services.map((service) => {
                const Icon = serviceIcons[service.icon];
                return (
                  <article
                    key={service.slug}
                    className="snap-card flex w-[78vw] max-w-sm flex-col rounded-sm bg-card p-6 ring-1 ring-border/60 lg:w-auto lg:max-w-none"
                  >
                    <span className="flex size-11 items-center justify-center rounded-sm bg-secondary">
                      <Icon className="size-5" strokeWidth={1.5} aria-hidden />
                    </span>
                    <h3 className="mt-5 text-xl leading-snug">{service.title}</h3>
                    <p className="mt-3 text-sm text-muted-foreground">{service.body}</p>
                    {service.price ? (
                      <p className="mt-4 inline-flex w-fit rounded-sm bg-secondary px-3 py-1.5 font-display text-lg tabular-nums">
                        {service.price}
                      </p>
                    ) : null}
                    <div className="mt-auto pt-6">
                      <Button asChild variant="outline" className="press w-full">
                        <Link to={service.to}>Programează</Link>
                      </Button>
                    </div>
                  </article>
                );
              })}
            </div>

            <Button asChild className="press mt-8 w-full md:hidden">
              <Link to="/service/programare">Programează online</Link>
            </Button>
          </div>
        </section>

        {/* 5. Test drive */}
        <section className="relative isolate overflow-hidden bg-primary text-primary-foreground">
          {/* Scalat și ancorat jos: sursa are subtitrări arse în banda de sus. */}
          <div className="absolute inset-0 overflow-hidden" aria-hidden>
            <video
              ref={videoRef}
              className="size-full object-cover opacity-70"
              style={{ transform: "scale(1.32)", transformOrigin: "50% 100%" }}
              src={showroomVideo}
              poster={showroomPoster}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
            <div className="hero-copy-scrim absolute inset-0" />
          </div>

          <div className="relative mx-auto flex min-h-[32rem] w-full max-w-7xl flex-col justify-end px-6 py-14 md:min-h-[36rem] md:px-8 md:py-20 lg:min-h-[40rem] lg:px-10 lg:py-28">
            <Reveal className="max-w-[34ch]">
              <h2 className="text-3xl md:text-5xl">
                Nicio fișă tehnică nu îți spune cum se conduce.
              </h2>
              <p className="mt-5 max-w-[46ch] text-base text-primary-foreground/85">
                Alegi mașina, ziua și sucursala. Îți spunem tot ce știm despre ea, inclusiv ce ar
                putea să nu îți convină.
              </p>
              <Button asChild size="lg" variant="secondary" className="press mt-8 w-full sm:w-auto">
                <Link to="/autoturisme">Rezervă un test drive</Link>
              </Button>
            </Reveal>
          </div>
        </section>

        {/* 6. Cum decurge + ce te liniștește */}
        <section id="cum-functioneaza" className="scroll-mt-24 py-14 md:py-20 lg:py-28">
          <div className="mx-auto w-full max-w-7xl px-6 md:px-8 lg:px-10">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-20">
              <Reveal>
                <h2 className="text-3xl md:text-4xl">Cum decurge, de la listă la cheie.</h2>
                <ol className="mt-8 border-t border-border/70">
                  {steps.map((step, index) => (
                    <li
                      key={step}
                      className="grid grid-cols-[2.5rem_minmax(0,1fr)] items-baseline gap-x-5 border-b border-border/70 py-5"
                    >
                      <span className="font-display text-lg tabular-nums text-muted-foreground">
                        0{index + 1}
                      </span>
                      <h3 className="text-xl leading-snug md:text-2xl">{step}</h3>
                    </li>
                  ))}
                </ol>
              </Reveal>

              <Reveal delay={80} className="lg:pt-14">
                <div className="overflow-hidden rounded-sm bg-primary text-primary-foreground">
                  <img
                    src={serviceConsultant}
                    alt=""
                    loading="lazy"
                    className="h-44 w-full object-cover md:h-56"
                  />
                  <dl className="divide-y divide-primary-foreground/15 p-7 md:p-9">
                    {reassurances.map((item) => (
                      <div key={item.label} className="py-5 first:pt-0 last:pb-0">
                        <dt className="font-display text-xl md:text-2xl">{item.label}</dt>
                        <dd className="mt-2 max-w-[44ch] text-sm text-primary-foreground/75">
                          {item.body}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 7. Găsește sucursala */}
        <section
          id="sucursale"
          className="scroll-mt-24 border-y border-border/70 bg-secondary py-14 md:py-20"
        >
          <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 md:px-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-16 lg:px-10">
            <Reveal>
              <h2 className="text-3xl md:text-4xl">Unde ne găsești</h2>
              <p className="mt-4 max-w-[54ch] text-base text-muted-foreground">
                {stockFacts.branchCount} sucursale în {cityList.length} orașe. Spune-ne unde ești și
                cu ce ai nevoie de ajutor, iar noi îți arătăm doar sucursalele care rezolvă exact
                acel lucru.
              </p>
              <p className="mt-4 text-sm text-muted-foreground">{cityList.join(" · ")}</p>
            </Reveal>
            <Reveal delay={60}>
              <Button asChild size="lg" className="press w-full lg:w-auto">
                <Link to="/sucursale">
                  <MapPin className="size-4" aria-hidden />
                  Găsește sucursala
                </Link>
              </Button>
            </Reveal>
          </div>
        </section>

        {/* 8. Întrebări + închidere */}
        <section className="mx-auto w-full max-w-7xl px-6 py-14 md:px-8 md:py-20 lg:px-10 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <h2 className="text-3xl md:text-4xl">Ce ne întreabă lumea</h2>
              <FaqList />
            </Reveal>

            <Reveal delay={80} className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-sm bg-secondary p-7 md:p-10">
                <h2 className="text-2xl md:text-3xl">Începe de unde îți e mai ușor.</h2>
                <p className="mt-4 max-w-[46ch] text-base text-muted-foreground">
                  Rezervi acum un test drive sau o oră la service, online. Dacă preferi să vorbești
                  cu cineva, te sunăm noi în maximum două ore lucrătoare.
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Button asChild size="lg" className="press">
                    <Link to="/autoturisme">Rezervă un test drive</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="press">
                    <Link to="/service/programare">Programare service</Link>
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter />

      <MobileStickyBar
        triggerId="acasa-hero"
        ctaLabel="Vezi mașinile disponibile"
        ctaShortLabel="Vezi mașinile"
        ctaTo="/autoturisme"
      />
    </div>
  );
}
