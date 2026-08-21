import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Check,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import detaliuGrila from "@/assets/detaliu-grila.jpg";
import heroGrila from "@/assets/hero-grila.jpg";
import interiorAmbiental from "@/assets/interior-lumina-ambientala.jpg";
import { DemoNotice } from "@/components/DemoNotice";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { FavoriteButton } from "@/components/vehicle/FavoriteButton";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contact } from "@/data/company";
import {
  formatKm,
  formatPrice,
  gallerySize,
  getVehicle,
  vehicles,
  type Vehicle,
} from "@/data/vehicles";

export const Route = createFileRoute("/autoturisme/$slug")({
  loader: ({ params }) => {
    const vehicle = getVehicle(params.slug);
    if (!vehicle) throw notFound();
    return { vehicle };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Mașină indisponibilă — Autoklass" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { vehicle } = loaderData;
    const title = `${vehicle.title} — ${formatPrice(vehicle.priceEur)} € | Autoklass`;
    const description = `${vehicle.title}, ${vehicle.powerHp} CP, ${
      vehicle.km === null ? "nou" : formatKm(vehicle.km)
    }, disponibil la ${vehicle.branch}. Rezervă un test drive sau cere să fii sunat — răspuns în maximum 2 ore lucrătoare.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "product" },
        { property: "og:image", content: gallerySize(vehicle.image) },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: gallerySize(vehicle.image) },
      ],
    };
  },
  component: VehicleDetailPage,
});

type ActionMode = "test-drive" | "consultant";

/** Afișarea formularului diferă peste/sub `lg`, deci avem nevoie de breakpoint în JS. */
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  return isDesktop;
}

/**
 * Galerie sobră: exemplarul real din stoc primul, apoi imaginile de prezentare
 * (marcate ca atare, ca să nu pară că sunt tot mașina din anunț).
 */
function VehicleGallery({ vehicle }: { vehicle: Vehicle }) {
  const shots = [
    {
      src: gallerySize(vehicle.image),
      alt: vehicle.title,
      label: "Mașina din stoc",
      caption: `${vehicle.title}, exact mașina din stocul de la ${vehicle.branch}.`,
    },
    {
      src: heroGrila,
      alt: "Imagine de prezentare: Mercedes-Benz văzut frontal",
      label: "Prezentare: față",
      caption: "Imagine de prezentare — grila și privirea farurilor.",
    },
    {
      src: interiorAmbiental,
      alt: "Imagine de prezentare: interior Mercedes-Benz seara",
      label: "Prezentare: interior",
      caption: "Imagine de prezentare — habitaclul după apus.",
    },
    {
      src: detaliuGrila,
      alt: "Imagine de prezentare: detaliu grilă și stea Mercedes-Benz",
      label: "Prezentare: detaliu",
      caption: "Imagine de prezentare — cromul grilei și steaua.",
    },
  ];

  const [active, setActive] = useState(0);
  const shot = shots[active]!;

  return (
    <div>
      <div className="overflow-hidden rounded-sm bg-muted ring-1 ring-border/60">
        <img
          key={shot.src}
          src={shot.src}
          alt={shot.alt}
          className="aspect-[16/10] w-full object-cover transition-opacity duration-150"
        />
      </div>
      <p className="mt-3 text-xs text-muted-foreground">{shot.caption}</p>

      <div className="mt-4 grid grid-cols-4 gap-3">
        {shots.map((item, index) => (
          <button
            key={item.label}
            type="button"
            onClick={() => setActive(index)}
            aria-pressed={index === active}
            aria-label={item.label}
            className={`press min-h-11 overflow-hidden rounded-sm border-2 bg-muted text-left ${
              index === active ? "border-foreground" : "border-transparent"
            }`}
          >
            <img
              src={item.src}
              alt=""
              loading="lazy"
              className="aspect-[16/10] w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

function VehicleDetailPage() {
  const { vehicle } = Route.useLoaderData();
  const [mode, setMode] = useState<ActionMode | null>(null);
  const [sent, setSent] = useState<ActionMode | null>(null);
  const isDesktop = useIsDesktop();

  // Reținem exact butonul care a deschis formularul, ca focusul să revină acolo.
  const panelTestDriveRef = useRef<HTMLButtonElement | null>(null);
  const panelCallbackRef = useRef<HTMLButtonElement | null>(null);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);

  const similar = vehicles
    .filter((item) => item.slug !== vehicle.slug && item.bodyType === vehicle.bodyType)
    .slice(0, 3);

  const openMode = (next: ActionMode, trigger: React.RefObject<HTMLButtonElement | null>) => {
    lastTrigger.current = trigger.current;
    setMode(next);
    setSent(null);
  };

  const restoreFocus = () => {
    const target = lastTrigger.current;
    if (target) requestAnimationFrame(() => target.focus());
  };

  const closeForm = () => {
    setMode(null);
    setSent(null);
    restoreFocus();
  };

  const priceMeta = [
    vehicle.vat === "deductibil" ? "TVA deductibil" : "TVA nedeductibil",
    vehicle.listPriceEur ? `preț de listă ${formatPrice(vehicle.listPriceEur)} €` : null,
    vehicle.hybrid ? "hibrid" : null,
    vehicle.reserved ? "rezervat" : null,
  ].filter(Boolean) as string[];

  const decisionOptions = (
    <>
      <div className="mt-6 space-y-3">
        {/* 1. Rezervi online — singura acțiune care duce la o tranzacție */}
        <Button asChild size="lg" className="press w-full">
          <Link to="/rezervare/$slug" params={{ slug: vehicle.slug }}>
            Rezervă online
          </Link>
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          Avans {formatPrice(500)} €, se scade din preț. Îl primești înapoi dacă te răzgândești.
        </p>

        {/* 2. O conduci întâi */}
        <Button
          ref={panelTestDriveRef}
          variant="outline"
          size="lg"
          className="press w-full"
          onClick={() => openMode("test-drive", panelTestDriveRef)}
        >
          Rezervă un test drive
        </Button>

        {/* 3. Vorbești cu un om */}
        <div className="grid grid-cols-2 gap-3">
          <Button asChild variant="outline" className="press">
            <a href={contact.phoneHref}>
              <Phone className="size-4" aria-hidden />
              Sună
            </a>
          </Button>
          <Button asChild variant="outline" className="press">
            <a href={contact.whatsappHref} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="size-4" aria-hidden />
              WhatsApp
            </a>
          </Button>
        </div>
        <Button
          ref={panelCallbackRef}
          variant="ghost"
          className="press w-full"
          onClick={() => openMode("consultant", panelCallbackRef)}
        >
          Sau lasă-ne numărul tău
        </Button>
      </div>

      <p className="mt-5 flex items-start gap-3 text-xs text-muted-foreground">
        <BadgeCheck className="mt-0.5 size-5 shrink-0 text-trust" strokeWidth={2} aria-hidden />
        Un consultant îți răspunde în maximum 2 ore lucrătoare, cu nume și număr direct.
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-x-6 border-t border-border/70 pt-4">
        <FavoriteButton
          slug={vehicle.slug}
          withLabel
          className="justify-start bg-transparent px-0 text-muted-foreground ring-0"
        />
        <Link
          to="/comparatie"
          className="group flex min-h-12 items-center gap-1.5 text-sm font-bold text-muted-foreground transition-colors hover:text-foreground"
        >
          Mașinile salvate
          <ArrowRight
            className="size-4 transition-transform group-hover:translate-x-0.5"
            strokeWidth={2}
            aria-hidden
          />
        </Link>
      </div>
    </>
  );

  const leadForm = mode ? (
    <LeadForm
      mode={mode}
      sent={sent === mode}
      onSubmit={() => setSent(mode)}
      onClose={closeForm}
      branch={vehicle.branch}
      backLabel="Înapoi la opțiuni"
      autoFocusFirst
    />
  ) : null;

  return (
    <div className="min-h-screen bg-background pb-36 lg:pb-0">
      <SiteHeader />

      <main className="mx-auto w-full max-w-7xl px-6 py-8 md:px-8 md:py-12 lg:px-10">
        <Link
          to="/autoturisme"
          className="inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground"
        >
          <ArrowLeft className="size-5" strokeWidth={1.5} aria-hidden />
          Înapoi la stoc
        </Link>

        <div className="mt-4 grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <div>
            <VehicleGallery vehicle={vehicle} />

            {/* Rezumatul rămâne pe mobil sub galerie; pe desktop e în panoul de decizie. */}
            <div className="mt-8 lg:hidden">
              <Badge variant={vehicle.condition === "nou" ? "default" : "secondary"}>
                {vehicle.condition === "nou" ? "Mașină nouă" : "Rulat verificat"}
              </Badge>

              <h1 className="mt-5 text-3xl md:text-4xl">{vehicle.title}</h1>

              <p className="mt-5 font-display text-4xl tabular-nums">
                {formatPrice(vehicle.priceEur)} €
              </p>
              <p className="mt-2 text-xs text-muted-foreground">{priceMeta.join(" · ")}</p>
              {vehicle.availability ? (
                <p className="mt-1 text-xs text-accent">{vehicle.availability}</p>
              ) : null}
            </div>

            <SpecTable vehicle={vehicle} />

            <div className="mt-12 border-t border-border/70 pt-8">
              <h2 className="flex items-center gap-2 text-lg">
                <ShieldCheck className="size-5 text-trust" strokeWidth={2} aria-hidden />
                Ce e verificat înainte să ajungă la tine
              </h2>
              <ul className="mt-5 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
                {[
                  "Kilometraj verificat și confirmat în documente",
                  "Istoric de service în rețeaua autorizată",
                  "Verificare tehnică pe 100+ puncte de control",
                  "Garanție inclusă, fără costuri ascunse",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <Check
                      className="mt-1 size-5 shrink-0 text-trust"
                      strokeWidth={2}
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                to="/verificare-masini-rulate"
                className="group mt-6 inline-flex min-h-11 items-center gap-1.5 text-sm font-bold text-accent"
              >
                Vezi toată lista de verificări
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                  strokeWidth={2}
                  aria-hidden
                />
              </Link>
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-sm bg-card p-6 ring-1 ring-border/60">
              {/* Antetul deciziei: stare, model, preț, TVA, sucursală */}
              <div className="hidden lg:block">
                <span className="inline-flex rounded-sm bg-secondary px-2.5 py-1 text-xs font-bold">
                  {vehicle.condition === "nou" ? "Nou" : "Rulat verificat"}
                </span>
                <h1 className="mt-4 text-2xl leading-snug">{vehicle.title}</h1>
                <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <p className="font-display text-3xl leading-none tabular-nums">
                    {formatPrice(vehicle.priceEur)} €
                  </p>
                  {vehicle.listPriceEur && vehicle.listPriceEur > vehicle.priceEur ? (
                    <p className="text-sm tabular-nums text-muted-foreground line-through">
                      {formatPrice(vehicle.listPriceEur)} €
                    </p>
                  ) : null}
                </div>
                <p className="mt-1.5 text-xs text-muted-foreground">
                  Atât plătești, cu TVA {vehicle.vat === "deductibil" ? "deductibil" : "inclus"}
                </p>
                {vehicle.availability ? (
                  <p className="mt-1 text-xs text-accent">{vehicle.availability}</p>
                ) : null}
                <div className="mt-4 border-t border-border/70 pt-4" />
              </div>

              <p className="flex items-start gap-3 text-sm">
                <MapPin
                  className="mt-0.5 size-5 shrink-0 text-muted-foreground"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <span>
                  Poți vedea mașina la <strong>{vehicle.branch}</strong>
                </span>
              </p>

              {/* Pe desktop formularul înlocuiește conținutul cardului, în loc să apară dedesubt */}
              {isDesktop && mode ? leadForm : decisionOptions}
            </div>
          </aside>
        </div>

        {similar.length > 0 ? (
          <section className="mt-16 border-t border-border/70 pt-10">
            <h2 className="text-2xl">Alternative similare din stoc</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((item) => (
                <Link
                  key={item.slug}
                  to="/autoturisme/$slug"
                  params={{ slug: item.slug }}
                  className="flex gap-4 rounded-sm bg-card p-4 ring-1 ring-border/60 transition-shadow hover:ring-foreground/25"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="size-24 shrink-0 rounded-sm object-cover"
                  />
                  <span className="min-w-0 text-sm">
                    <span className="block">{item.title}</span>
                    <span className="mt-2 block font-display text-xl tabular-nums">
                      {formatPrice(item.priceEur)} €
                    </span>
                    <span className="mt-1 block text-xs text-muted-foreground">
                      {item.km === null ? "nou" : formatKm(item.km)}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </main>

      <SiteFooter />

      {/* Dock de conversie al mașinii: vizibil până la lg (inclusiv 768px) */}
      {/* Bară de acțiuni, aceeași construcție ca pe restul site-ului:
          lățime plină, hairline sus, aceeași ordine [telefon][WhatsApp][CTA]. */}
      <div className="pb-safe fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card px-4 pt-3 lg:hidden">
        <div className="flex items-baseline justify-between gap-3 pb-2.5">
          <p className="font-display text-xl leading-none tabular-nums">
            {formatPrice(vehicle.priceEur)} €
          </p>
          <p className="truncate text-xs text-muted-foreground">
            {vehicle.vat === "deductibil" ? "TVA deductibil" : "TVA inclus"} ·{" "}
            {vehicle.branch.replace("Autoklass ", "")}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={contact.phoneHref}
            aria-label={`Sună acum la ${contact.phone}`}
            className="press flex size-12 shrink-0 items-center justify-center rounded-sm border border-border text-foreground"
          >
            <Phone className="size-5" strokeWidth={1.5} aria-hidden />
          </a>
          <a
            href={contact.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Scrie pe WhatsApp"
            className="press flex size-12 shrink-0 items-center justify-center rounded-sm border border-border text-foreground"
          >
            <MessageCircle className="size-5" strokeWidth={1.5} aria-hidden />
          </a>
          <Button asChild className="press h-12 flex-1">
            <Link to="/rezervare/$slug" params={{ slug: vehicle.slug }}>
              Rezervă online
            </Link>
          </Button>
        </div>
      </div>

      {/* Sub lg: același formular, în bottom sheet accesibil */}
      <DialogPrimitive.Root
        open={!isDesktop && mode !== null}
        onOpenChange={(next) => {
          if (!next) closeForm();
        }}
      >
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-[60] bg-primary/60 lg:hidden" />
          <DialogPrimitive.Content
            aria-label={mode === "consultant" ? "Cere să fii sunat" : "Rezervă un test drive"}
            onCloseAutoFocus={(event) => {
              event.preventDefault();
              lastTrigger.current?.focus();
            }}
            className="pb-safe fixed inset-x-0 bottom-0 z-[70] max-h-[92svh] overflow-y-auto rounded-t-lg border-t border-border bg-card px-5 pt-5 lg:hidden"
          >
            <div className="flex items-start justify-between gap-4">
              <DialogPrimitive.Title className="text-lg">
                {mode === "consultant" ? "Cere să fii sunat" : "Rezervă un test drive"}
              </DialogPrimitive.Title>
              <DialogPrimitive.Close
                aria-label="Închide"
                className="flex size-11 shrink-0 items-center justify-center rounded-sm border border-border"
              >
                <X className="size-5" strokeWidth={1.5} aria-hidden />
              </DialogPrimitive.Close>
            </div>
            {mode ? (
              <LeadForm
                mode={mode}
                sent={sent === mode}
                onSubmit={() => setSent(mode)}
                onClose={closeForm}
                branch={vehicle.branch}
                backLabel="Închide"
                bare
                autoFocusFirst
              />
            ) : null}
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </div>
  );
}

function SpecTable({ vehicle }: { vehicle: Vehicle }) {
  const specs = [
    { label: "Combustibil", value: vehicle.fuel },
    { label: "Putere", value: `${vehicle.powerHp} CP` },
    { label: "Cutie de viteze", value: vehicle.gearbox },
    { label: "Tracțiune", value: vehicle.drive },
    {
      label: "Kilometraj",
      value: vehicle.km === null ? "0 km (nou)" : formatKm(vehicle.km),
    },
    {
      label: "Prima înmatriculare",
      value: `${vehicle.registrationMonth} ${vehicle.year}`,
    },
    { label: "Capacitate cilindrică", value: `${vehicle.engineCc} cm³` },
    { label: "Sucursală", value: vehicle.branch },
  ];

  return (
    <div className="mt-12 border-t border-border/70 pt-8">
      <h2 className="text-lg">Date tehnice</h2>
      <dl className="mt-6 grid grid-cols-2 gap-x-8 gap-y-7 sm:grid-cols-3">
        {specs.map((spec) => (
          <div key={spec.label} className="min-w-0">
            <dt className="text-xs text-muted-foreground">{spec.label}</dt>
            <dd className="mt-1.5 text-sm font-bold tabular-nums">{spec.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function LeadForm({
  mode,
  sent,
  onSubmit,
  onClose,
  branch,
  backLabel,
  bare = false,
  autoFocusFirst = false,
}: {
  mode: ActionMode;
  sent: boolean;
  onSubmit: () => void;
  onClose: () => void;
  branch: string;
  backLabel: string;
  bare?: boolean;
  autoFocusFirst?: boolean;
}) {
  if (sent) {
    return (
      <div className={bare ? "py-5" : "mt-6 border-t border-border/70 pt-6"}>
        <h3 className="flex items-center gap-2 text-base">
          <Check className="size-5 text-trust" strokeWidth={2} aria-hidden />
          Cererea a plecat.
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Te contactează un consultant de la {branch} în maximum 2 ore lucrătoare. Dacă preferi
          acum, sună la{" "}
          <a href={contact.phoneHref} className="font-bold text-foreground">
            {contact.phone}
          </a>
          .
        </p>
        <DemoNotice className="mt-4 bg-secondary" />
        <Button variant="outline" className="press mt-4 w-full" onClick={onClose}>
          {backLabel}
        </Button>
      </div>
    );
  }

  return (
    <form
      className={bare ? "py-5" : "mt-6 border-t border-border pt-6"}
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      {bare ? null : (
        <h3 className="text-base">
          {mode === "test-drive" ? "Rezervă un test drive" : "Cere să fii sunat"}
        </h3>
      )}
      <p className={bare ? "text-sm text-muted-foreground" : "mt-1 text-sm text-muted-foreground"}>
        {mode === "test-drive"
          ? "Spune-ne când poți veni. Pregătim mașina și actele înainte să ajungi."
          : "Îți răspundem la întrebări despre preț, finanțare sau istoricul mașinii."}
      </p>

      <div className="mt-4 space-y-3">
        <div>
          <Label htmlFor="lead-name">Nume</Label>
          <Input
            id="lead-name"
            required
            className="mt-1 rounded-sm"
            autoComplete="name"
            autoFocus={autoFocusFirst}
          />
        </div>
        <div>
          <Label htmlFor="lead-phone">Telefon</Label>
          <Input
            id="lead-phone"
            type="tel"
            required
            className="mt-1 rounded-sm"
            autoComplete="tel"
            inputMode="tel"
          />
        </div>
        {mode === "test-drive" ? (
          <div>
            <Label htmlFor="lead-date">Când preferi</Label>
            <Input id="lead-date" type="date" required className="mt-1 rounded-sm" />
          </div>
        ) : (
          <div>
            <Label htmlFor="lead-message">Ce vrei să afli</Label>
            <Textarea id="lead-message" rows={3} className="mt-1 rounded-sm" />
          </div>
        )}
      </div>

      <Button type="submit" className="press mt-5 w-full" size="lg">
        Trimite cererea
      </Button>
      <Button type="button" variant="ghost" className="mt-1 w-full" onClick={onClose}>
        {backLabel}
      </Button>
    </form>
  );
}
