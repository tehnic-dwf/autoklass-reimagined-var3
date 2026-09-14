import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import * as Dialog from "@radix-ui/react-dialog";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Expand,
  UserRound,
  X,
} from "lucide-react";
import { useRef, useState } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { FavoriteButton } from "@/components/vehicle/FavoriteButton";
import { OfferDialog } from "@/components/vehicle/OfferDialog";
import { getVehicle, formatPrice, formatKm, gallerySize } from "@/data/vehicles";
import {
  demoSlug,
  equipment,
  officialImages,
  modelSource,
  normalized,
  assignedConsultant,
} from "@/data/demo-vehicle";
import { availabilityOf, shortTitle } from "@/lib/vehicle-search";
export const Route = createFileRoute("/autoturisme/$slug")({
  validateSearch: (s: Record<string, unknown>): { demo?: string } =>
    s["demo"] === "error" ? { demo: "error" } : {},
  loader: ({ params }) => {
    const v = getVehicle(params.slug);
    if (!v) throw notFound();
    return v;
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData?.title || "Autoturism"} | Autoklass` }],
  }),
  component: VehiclePage,
});
function VehiclePage() {
  const v = Route.useLoaderData();
  const { demo } = Route.useSearch();
  const detailed = v.slug === demoSlug;
  const [open, setOpen] = useState(false);
  const [photo, setPhoto] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [query, setQuery] = useState("");
  const opener = useRef<HTMLButtonElement>(null);
  const galleryOpener = useRef<HTMLButtonElement>(null);
  const photos = [
    { src: gallerySize(v.image), label: v.title, kind: "Exterior" },
    ...(detailed ? officialImages : []),
  ];
  const selected = photos[photo] || photos[0]!;
  const contact = (e: React.MouseEvent<HTMLButtonElement>) => {
    opener.current = e.currentTarget;
    setOpen(true);
  };
  const found = equipment.filter((e) =>
    normalized(e.name + " " + e.aliases + " " + e.group).includes(normalized(query)),
  );
  const facts = [
    ["Combustibil", v.fuel + (detailed ? " · mild hybrid" : v.hybrid ? " · hibrid" : "")],
    ["Putere motor", `${v.powerHp} CP`],
    ["Transmisie", detailed ? "9G-TRONIC" : v.gearbox],
    ["Tracțiune", v.drive === "AWD" ? "Integrală" : v.drive],
    ["An fabricație", String(v.year)],
    ["Kilometraj", v.km === null ? "Necomunicat" : formatKm(v.km)],
  ];
  return (
    <div className="v3 pb-24 lg:pb-0">
      <SiteHeader />
      <main id="main-content">
        <div className="v3-wrap py-6">
          <Link
            to="/autoturisme"
            className="v3-link v3-small"
            onClick={(e) => {
              if (window.history.length > 1 && window.history.state?.__TSR_index > 0) {
                e.preventDefault();
                window.history.back();
              }
            }}
          >
            <ArrowLeft size={16} />
            Înapoi la mașini
          </Link>
        </div>
        <div className="v3-wrap">
          <div className="v3-pdp-top">
            <div className="v3-pdp-title">
              {" "}
              <p className="v3-kicker">
                Mercedes-Benz · {v.condition === "nou" ? "Autoturism nou" : "Autoturism rulat"}
              </p>
              <h1>{shortTitle(v)}</h1>
              <p className="v3-intro">
                {detailed ? "SUV · GLC 200 4MATIC · 2026" : `${v.bodyType} · ${v.year}`}
              </p>
            </div>
            <div className="v3-pdp-gallery">
              <div className="v3-gallery">
                <img src={selected.src} alt={selected.label} />
                <button
                  className="v3-icon absolute bottom-4 right-4 bg-white"
                  ref={galleryOpener}
                  aria-label="Mărește fotografia"
                  onClick={() => setExpanded(true)}
                >
                  <Expand size={20} />
                </button>
                {photos.length > 1 && (
                  <div className="v3-row absolute inset-x-4 top-1/2">
                    <button
                      className="v3-icon bg-white"
                      aria-label="Fotografia anterioară"
                      onClick={() => setPhoto((photo + photos.length - 1) % photos.length)}
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      className="v3-icon bg-white"
                      aria-label="Fotografia următoare"
                      onClick={() => setPhoto((photo + 1) % photos.length)}
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                )}
              </div>
              {photos.length > 1 && (
                <div className="v3-thumbs">
                  {photos.map((p, i) => (
                    <button
                      key={p.src}
                      aria-label={`${p.kind}: ${p.label}`}
                      aria-pressed={photo === i}
                      onClick={() => setPhoto(i)}
                    >
                      <img src={p.src} alt="" />
                    </button>
                  ))}
                </div>
              )}
              <p className="v3-small v3-muted mt-2 mb-8">
                {detailed
                  ? "Fotografii ilustrative. Echiparea poate diferi."
                  : "Fotografie din catalogul demonstrativ."}
              </p>
            </div>
            <div>
              <div className="mt-8">
                <p className="v3-price" style={{ fontSize: 40 }}>
                  {formatPrice(v.priceEur)} €
                </p>
                <p className="v3-small v3-muted mt-2">
                  TVA inclus · {v.vat === "deductibil" ? "deductibil" : "nedeductibil"}
                </p>
                <p className="v3-small v3-muted mt-4">
                  {availabilityOf(v)}
                  <br />
                  {v.branch}
                </p>
              </div>
              <dl className="v3-specs">
                {facts.slice(0, 4).map(([name, value]) => (
                  <div key={name}>
                    <dt>{name}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
              <button className="v3-button w-full" onClick={contact}>
                Contactează-ne <ArrowRight size={18} />
              </button>
              <ConsultantBlock />
              <p className="v3-small v3-muted mt-6">
                Preț din exemplul de catalog V2 (august 2026). Oferta și termenul de livrare se
                confirmă pentru mașina aleasă.
              </p>
            </div>
          </div>
          <div className="v3-pdp-content">
            <section className="v3-section">
              <div className="v3-row">
                <h2>O privire de ansamblu.</h2>
                <FavoriteButton slug={v.slug} withLabel />
              </div>
              <p className="v3-intro">
                {detailed
                  ? "Un SUV cu cinci locuri, transmisie automată și sistem mild hybrid. Informațiile tehnice de mai jos descriu modelul GLC 200 4MATIC pentru piața din România."
                  : "Datele disponibile în exemplul de catalog sunt prezentate mai jos. Informațiile suplimentare vor fi completate de Autoklass."}
              </p>
              <dl className="mt-8">
                {facts.slice(4).map(([name, value]) => (
                  <div className="v3-data-row" key={name}>
                    <dt>{name}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
                <div className="v3-data-row">
                  <dt>Cilindree</dt>
                  <dd>{formatPrice(v.engineCc)} cm³</dd>
                </div>
                {detailed &&
                  [
                    ["Cuplu motor", "320 Nm"],
                    ["Locuri", "5"],
                    ["Portbagaj", "620 l"],
                    ["Accelerație 0–100 km/h", "7,8 s"],
                    ["Consum mixt WLTP", "7 l/100 km"],
                  ].map(([name, value]) => (
                    <div className="v3-data-row" key={name}>
                      <dt>{name}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
              </dl>
              {detailed && (
                <p className="v3-small v3-muted mt-6">
                  Date de model consultate la 11 septembrie 2026. Consumul real diferă în funcție de
                  condițiile de utilizare și configurație.{" "}
                  <a
                    className="underline underline-offset-4"
                    href={modelSource}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Sursa Mercedes-Benz
                  </a>
                </p>
              )}
            </section>
            {detailed && (
              <section className="v3-rule v3-section">
                <p className="v3-kicker">Echipare</p>
                <h2>Detaliile fac diferența.</h2>
                <p className="v3-intro">
                  Dotări de serie și o selecție demonstrativă de opțiuni. Această configurație nu
                  confirmă echiparea unui exemplar Autoklass.
                </p>
                <label className="v3-field my-8">
                  <span>Caută în dotări</span>
                  <input
                    type="search"
                    placeholder="De exemplu: LED, masaj, suspensie"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </label>
                <p role="status" className="v3-small v3-muted mb-6">
                  {found.length} {found.length === 1 ? "dotare" : "dotări"}
                </p>
                {["Tehnică", "Siguranță și asistență", "Confort și interior"].map((group) => {
                  const list = found.filter((e) => e.group === group);
                  return list.length ? (
                    <details className="v3-disclosure" open key={group}>
                      <summary>{group}</summary>
                      <div>
                        {list.map((e) => (
                          <div className="py-4" key={e.name}>
                            <div className="v3-row">
                              <p>{e.name}</p>
                              <span className="v3-small v3-muted">
                                {e.status === "series"
                                  ? "De serie"
                                  : e.status === "demo"
                                    ? "Inclusă în exemplu"
                                    : "Opțiune disponibilă"}
                              </span>
                            </div>
                            <p className="v3-small v3-muted mt-2">{e.detail}</p>
                          </div>
                        ))}
                      </div>
                    </details>
                  ) : null;
                })}
                {!found.length && (
                  <div className="v3-empty">
                    <p>Nicio dotare pentru „{query}”.</p>
                    <button className="v3-link" onClick={() => setQuery("")}>
                      Șterge căutarea
                    </button>
                  </div>
                )}
              </section>
            )}
            <section className="v3-rule py-8">
              <details className="v3-disclosure">
                <summary>Disponibilitate și garanție</summary>
                <div className="v3-stack">
                  <p>
                    Disponibilitatea și condițiile de garanție nu sunt confirmate în acest prototip.
                    Consultantul le va preciza în ofertă.
                  </p>
                  <p>
                    O mașină „în stoc” nu are automat livrare imediată. Termenul exact se stabilește
                    pentru exemplarul ales.
                  </p>
                </div>
              </details>
              {v.condition === "rulat" && (
                <p className="v3-small v3-muted mt-6">
                  Raportul de istoric nu a fost furnizat pentru acest exemplu.
                </p>
              )}
              <Link to="/comparatie" className="v3-link mt-6">
                Vezi comparația <ArrowRight size={18} />
              </Link>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
      {
        <div className="v3-sticky">
          <div>
            <p className="v3-price">{formatPrice(v.priceEur)} €</p>
            <p className="v3-small v3-muted">TVA inclus</p>
          </div>
          <button className="v3-button" onClick={contact}>
            Contactează-ne
          </button>
        </div>
      }
      <OfferDialog
        vehicle={v}
        open={open}
        onOpenChange={setOpen}
        opener={opener}
        simulateError={demo === "error"}
      />
      <Dialog.Root open={expanded} onOpenChange={setExpanded}>
        <Dialog.Portal>
          <Dialog.Overlay className="v3-shell-overlay" />
          <Dialog.Content
            className="v3 v3-panel"
            aria-describedby={undefined}
            onCloseAutoFocus={(event) => {
              event.preventDefault();
              galleryOpener.current?.focus();
            }}
          >
            <div className="v3-panel-head">
              <Dialog.Title>{selected.kind}</Dialog.Title>
              <Dialog.Close className="v3-icon" aria-label="Închide galeria">
                <X />
              </Dialog.Close>
            </div>
            <div className="v3-panel-body flex flex-col justify-center">
              <img src={selected.src} alt={selected.label} className="w-full" />
              <p className="v3-small v3-muted mt-4">
                Imagine ilustrativă · {photo + 1} / {photos.length}
              </p>
              <div className="v3-row mt-6">
                <button
                  className="v3-button secondary"
                  onClick={() => setPhoto((photo + photos.length - 1) % photos.length)}
                  aria-label="Imaginea anterioară"
                >
                  <ChevronLeft />
                </button>
                <button
                  className="v3-button secondary"
                  onClick={() => setPhoto((photo + 1) % photos.length)}
                  aria-label="Imaginea următoare"
                >
                  <ChevronRight />
                </button>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
function ConsultantBlock() {
  const consultant = assignedConsultant;
  return (
    <div className="mt-6 flex items-center gap-4">
      {consultant ? (
        <img
          src={consultant.photo}
          alt={consultant.name}
          className="size-12 rounded-full object-cover"
        />
      ) : (
        <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#f4f5f5]">
          <UserRound size={22} strokeWidth={1.5} />
        </div>
      )}
      <div>
        <p>{consultant?.name || "Consultantul tău Autoklass"}</p>
        <p className="v3-small v3-muted">
          {consultant?.role || "Numele și fotografia vor fi preluate din sistem."}
        </p>
      </div>
    </div>
  );
}
