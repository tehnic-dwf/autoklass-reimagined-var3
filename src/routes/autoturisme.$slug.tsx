import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import * as Dialog from "@radix-ui/react-dialog";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CalendarDays,
  Fuel,
  Gauge,
  Settings2,
  Armchair,
  Sun,
  Camera,
  Lightbulb,
  Wind,
  Navigation,
  ChevronLeft,
  ChevronRight,
  FileText,
  Expand,
  MapPin,
  UserRound,
  X,
} from "lucide-react";
import { useRef, useState } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { FavoriteButton } from "@/components/vehicle/FavoriteButton";
import { OfferDialog } from "@/components/vehicle/OfferDialog";
import { VehicleCard } from "@/components/vehicle/VehicleCard";
import { vehicles, getVehicle, formatPrice, formatKm, gallerySize } from "@/data/vehicles";
import { demoSlug, normalized } from "@/data/demo-vehicle";
import { glcDetails, completeEquipmentGroups } from "@/data/product-details";
import { availabilityOf, shortTitle } from "@/lib/vehicle-search";
import "@/product-mobile.css";

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
  const touchStart = useRef<number | null>(null);
  const photos = detailed ? glcDetails.photos : [gallerySize(v.image)];
  const selected = photos[photo] || photos[0]!;
  const changePhoto = (offset: number) =>
    setPhoto((current) => (current + offset + photos.length) % photos.length);
  const contact = (e: React.MouseEvent<HTMLButtonElement>) => {
    opener.current = e.currentTarget;
    setOpen(true);
  };
  const groups = detailed
    ? completeEquipmentGroups
    : v.equipment
      ? [{ name: "Dotările mașinii", items: v.equipment }]
      : [];
  const filtered = groups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => normalized(item).includes(normalized(query))),
    }))
    .filter((group) => group.items.length);
  const count = filtered.reduce((sum, group) => sum + group.items.length, 0);
  const facts = [
    ["An fabricație", String(v.year)],
    ["Combustibil", detailed ? "Benzină · mild hybrid" : v.fuel],
    ["Putere", `${v.powerHp} CP`],
    ["Cutie de viteze", v.gearbox],
  ];
  const specs = detailed
    ? glcDetails.specs
    : [
        ...facts,
        ["Caroserie", v.bodyType],
        ["Kilometraj", v.km === null ? "Necomunicat" : formatKm(v.km)],
        [
          "Tracțiune",
          v.drive === "AWD"
            ? "Integrală"
            : v.drive === "FWD"
              ? "Față"
              : v.drive === "RWD"
                ? "Spate"
                : "Necomunicată",
        ],
        ...(v.engineCc ? [["Cilindree", `${formatPrice(v.engineCc)} cm³`]] : []),
      ];
  const similar = vehicles
    .filter((item) => item.slug !== v.slug && !item.reserved && item.bodyType === v.bodyType)
    .sort((a, b) => Math.abs(a.priceEur - v.priceEur) - Math.abs(b.priceEur - v.priceEur))
    .slice(0, 4);
  const factIcons = [CalendarDays, Fuel, Gauge, Settings2];
  const highlightIcons = [Armchair, Sun, Camera, Lightbulb, Wind, Navigation];
  return (
    <div className="v3 ak-product pb-24 lg:pb-0">
      <SiteHeader />
      <main id="main-content">
        <div className="v3-wrap ak-product-back">
          <Link
            to="/autoturisme"
            className="v3-link"
            onClick={(e) => {
              if (window.history.length > 1 && window.history.state?.__TSR_index > 0) {
                e.preventDefault();
                window.history.back();
              }
            }}
          >
            <ArrowLeft size={18} /> Înapoi la mașini
          </Link>
          <FavoriteButton slug={v.slug} />
        </div>
        <div className="v3-wrap ak-product-layout">
          <section className="ak-product-gallery" aria-label="Fotografiile mașinii">
            <div
              className="ak-product-image"
              onTouchStart={(e) => {
                touchStart.current = e.changedTouches[0]?.clientX ?? null;
              }}
              onTouchEnd={(e) => {
                const x = e.changedTouches[0]?.clientX;
                if (
                  touchStart.current !== null &&
                  x !== undefined &&
                  Math.abs(x - touchStart.current) > 48
                )
                  changePhoto(x < touchStart.current ? 1 : -1);
                touchStart.current = null;
              }}
            >
              <img
                src={selected}
                alt={`${v.title}, fotografia ${photo + 1}`}
                width={1200}
                height={900}
                fetchPriority="high"
              />
              {photos.length > 1 && (
                <>
                  <button
                    className="ak-gallery-arrow previous"
                    aria-label="Fotografia anterioară"
                    onClick={() => changePhoto(-1)}
                  >
                    <ChevronLeft size={22} />
                  </button>
                  <button
                    className="ak-gallery-arrow next"
                    aria-label="Fotografia următoare"
                    onClick={() => changePhoto(1)}
                  >
                    <ChevronRight size={22} />
                  </button>
                </>
              )}
              <span className="ak-photo-count" aria-live="polite">
                {photo + 1} / {photos.length}
              </span>
              <button
                className="ak-gallery-expand"
                ref={galleryOpener}
                aria-label="Mărește fotografia"
                onClick={() => setExpanded(true)}
              >
                <Expand size={19} />
              </button>
            </div>
            {photos.length > 1 && (
              <div className="ak-photo-thumbs" aria-label="Alege fotografia">
                {photos.map((src, i) => (
                  <button
                    key={src}
                    aria-label={`Fotografia ${i + 1}`}
                    aria-pressed={photo === i}
                    onClick={() => setPhoto(i)}
                  >
                    <img
                      src={src.replace(
                        "/autoklass.websales.ro/",
                        "/slir/w160-h120/autoklass.websales.ro/",
                      )}
                      alt=""
                      width={80}
                      height={60}
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            )}
          </section>
          <section className="ak-product-summary" aria-labelledby="vehicle-title">
            <p className="ak-product-eyebrow">
              {v.brand} <span>·</span>{" "}
              {v.condition === "nou" ? "Autoturism nou" : "Autoturism rulat"}
            </p>
            <h1 id="vehicle-title">{shortTitle(v)}</h1>
            <p className="ak-product-trim">
              {detailed
                ? "AMG Line Premium · SUV · 2026"
                : `${v.bodyType} · ${v.year}${v.km !== null ? ` · ${formatKm(v.km)}` : ""}`}
            </p>
            <div className="ak-product-price">
              {detailed && <del className="ak-old-price">78.789 €</del>}
              <strong>{formatPrice(v.priceEur)} €</strong>
              <span>TVA inclus{v.vat === "deductibil" ? " · deductibil" : ""}</span>
            </div>
            <p className="ak-product-location">
              <MapPin size={18} /> {v.branch}
            </p>
            <div className="ak-offer-box">
              <ConsultantBlock detailed={detailed} />
              <button className="v3-button ak-offer-button" onClick={contact}>
                Solicită ofertă <ArrowRight size={20} />
              </button>
              <p>Consultantul confirmă disponibilitatea și termenul de livrare.</p>
            </div>
            <dl className="ak-product-facts">
              {facts.map(([label, value], i) => (
                <div key={label}>
                  <dt>
                    {(() => {
                      const Icon = factIcons[i]!;
                      return <Icon size={18} strokeWidth={1.4} aria-hidden />;
                    })()}
                    {label}
                  </dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
            {detailed && (
              <div className="ak-product-download">
                <FileText size={20} aria-hidden />
                <span>
                  Fișa mașinii <small>Specificații și dotări</small>
                </span>
              </div>
            )}
          </section>
          <div className="ak-product-content">
            {detailed && (
              <section className="ak-product-section" id="finantare">
                <h2>Opțiuni de finanțare.</h2>
                <div className="ak-finance-options">
                  <div>
                    <span>Leasing</span>
                    <strong>1.050,29 €</strong>
                    <small>/ lună</small>
                  </div>
                  <div>
                    <span>Rată</span>
                    <strong>1.060,46 €</strong>
                    <small>/ lună</small>
                  </div>
                </div>
                <p>
                  Valorile lunare sunt orientative. Avansul, durata, dobânda și costul total se
                  confirmă în oferta personalizată.
                </p>
                <button className="v3-button mt-6" onClick={contact}>
                  Solicită ofertă <ArrowRight size={18} />
                </button>
                <details className="ak-product-disclosure">
                  <summary>Detalii despre preț</summary>
                  <div className="ak-product-answer">
                    <p>
                      Preț anterior: 78.789 €. Cel mai scăzut preț în ultimele 30 de zile: 75.480 €.
                    </p>
                    <p>Prețul în lei se calculează la cursul valutar din ziua curentă.</p>
                  </div>
                </details>
              </section>
            )}

            {detailed && (
              <section className="ak-product-section">
                <p className="ak-section-label">Echiparea acestui exemplar</p>
                <h2>
                  Confortul pe care
                  <br />
                  îl simți zi de zi.
                </h2>
                <p>
                  Scaune climatizate, lumină naturală prin trapa panoramică și asistență la parcare
                  cu vedere la 360°. Acest GLC combină echiparea AMG Line Premium cu tracțiunea
                  integrală 4MATIC.
                </p>
                <ul className="ak-product-highlights">
                  {glcDetails.highlights.map((item, i) => (
                    <li key={item}>
                      {(() => {
                        const Icon = highlightIcons[i]!;
                        return <Icon size={24} strokeWidth={1.3} aria-hidden />;
                      })()}
                      {item}
                    </li>
                  ))}
                </ul>
                <img
                  className="ak-product-detail-image"
                  src={photos[6]}
                  alt="Mercedes-Benz GLC 200 4MATIC, detaliu al exemplarului"
                  width={1200}
                  height={900}
                  loading="lazy"
                />
              </section>
            )}
            {!!groups.length && (
              <section className="ak-product-section" id="dotari">
                <h2>Dotări, în detaliu.</h2>
                <label className="v3-field ak-equipment-search">
                  <span>Caută o dotare</span>
                  <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="De exemplu: scaune, cameră, CarPlay"
                  />
                </label>
                {query && (
                  <p className="ak-search-count" role="status">
                    {count} {count === 1 ? "rezultat" : "rezultate"}
                  </p>
                )}
                {filtered.map((group, i) => (
                  <details
                    key={query + group.name}
                    className="ak-product-disclosure"
                    open={!!query || i === 0}
                  >
                    <summary>
                      {group.name}
                      <span>{group.items.length}</span>
                    </summary>
                    <ul>
                      {group.items.map((item) => (
                        <li key={item}>
                          <Check size={17} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </details>
                ))}
                {!count && (
                  <p className="ak-search-count">
                    Nicio dotare găsită.{" "}
                    <button className="v3-link" onClick={() => setQuery("")}>
                      Șterge căutarea
                    </button>
                  </p>
                )}
              </section>
            )}
            <section className="ak-product-section" id="specificatii">
              <h2>Date tehnice.</h2>
              <dl className="ak-product-specs">
                {specs.map(([name, value]) => (
                  <div key={name}>
                    <dt>{name}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
              {detailed && (
                <p className="ak-product-footnote">
                  Valorile de consum și emisii sunt măsurate conform WLTP. Pot varia în condiții
                  reale de utilizare.
                </p>
              )}
            </section>
            {detailed && (
              <section className="ak-product-section">
                <h2>Vezi mașina în showroom.</h2>
                <h3>Autoklass București Sud</h3>
                <p>Splaiul Unirii 166 A, București</p>
                <iframe
                  className="ak-product-map"
                  title="Harta Autoklass București Sud"
                  src="https://maps.google.com/maps?q=Autoklass%20Bucuresti%20Sud%20Splaiul%20Unirii%20166A&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <a
                  className="v3-link"
                  href="https://www.google.com/maps/dir/?api=1&destination=Autoklass+Bucuresti+Sud+Splaiul+Unirii+166A"
                  target="_blank"
                  rel="noreferrer"
                >
                  Indicații de orientare <ArrowRight size={18} />
                </a>
              </section>
            )}
            <section className="ak-product-section">
              <h2>
                Următorul pas,
                <br />
                cu un consultant.
              </h2>
              <ol className="ak-buying-steps">
                <li>
                  <span>1</span>
                  <div>
                    <h3>Solicită oferta</h3>
                    <p>Completezi numele, prenumele, e-mailul și telefonul.</p>
                  </div>
                </li>
                <li>
                  <span>2</span>
                  <div>
                    <h3>Discuți toate detaliile</h3>
                    <p>Consultantul îți confirmă echiparea, prețul final și disponibilitatea.</p>
                  </div>
                </li>
                <li>
                  <span>3</span>
                  <div>
                    <h3>Alegi cum mergi mai departe</h3>
                    <p>Stabiliți împreună vizionarea și detaliile achiziției.</p>
                  </div>
                </li>
              </ol>
              <details className="ak-product-disclosure">
                <summary>Livrare și garanție</summary>
                <div className="ak-product-answer">
                  <p>{availabilityOf(v)}. Termenul de livrare se confirmă pentru acest exemplar.</p>
                  <p>
                    {detailed
                      ? "Mașina este listată cu garanție de vânzător. Durata și condițiile exacte sunt incluse în ofertă."
                      : "Condițiile de garanție se confirmă în oferta consultantului."}
                  </p>
                </div>
              </details>
            </section>
          </div>
          {!!similar.length && (
            <section className="ak-similar ak-product-section">
              <h2>Merită să le compari.</h2>
              <div className="v3-cards v3-home-cars">
                {similar.map((item) => (
                  <VehicleCard key={item.slug} vehicle={item} compact />
                ))}
              </div>
              <Link className="v3-link mt-6" to="/autoturisme" search={{ body: v.bodyType }}>
                Vezi toate modelele similare <ArrowRight size={18} />
              </Link>
            </section>
          )}
        </div>
      </main>
      <SiteFooter />
      <div className="v3-sticky ak-product-sticky">
        <div>
          <strong>{formatPrice(v.priceEur)} €</strong>
          <span>TVA inclus</span>
        </div>
        <button className="v3-button" onClick={contact}>
          Solicită ofertă
          <ArrowRight size={18} />
        </button>
      </div>
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
            className="v3 v3-panel ak-gallery-modal"
            aria-describedby={undefined}
            onCloseAutoFocus={(event) => {
              event.preventDefault();
              galleryOpener.current?.focus();
            }}
          >
            <div className="v3-panel-head">
              <Dialog.Title>Fotografiile mașinii</Dialog.Title>
              <Dialog.Close className="v3-icon" aria-label="Închide galeria">
                <X />
              </Dialog.Close>
            </div>
            <div className="v3-panel-body">
              <img
                src={selected}
                alt={`${v.title}, fotografia ${photo + 1}`}
                width={1400}
                height={1000}
              />
              <div className="ak-gallery-controls">
                <button
                  className="v3-icon"
                  aria-label="Imaginea anterioară"
                  onClick={() => changePhoto(-1)}
                >
                  <ChevronLeft />
                </button>
                <span aria-live="polite">
                  {photo + 1} / {photos.length}
                </span>
                <button
                  className="v3-icon"
                  aria-label="Imaginea următoare"
                  onClick={() => changePhoto(1)}
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
function ConsultantBlock({ detailed }: { detailed: boolean }) {
  return (
    <div className="ak-product-consultant">
      {detailed ? (
        <img
          src={glcDetails.consultant.photo}
          alt={glcDetails.consultant.name}
          width={56}
          height={56}
        />
      ) : (
        <span className="ak-consultant-fallback">
          <UserRound size={26} />
        </span>
      )}
      <div>
        <strong>{detailed ? glcDetails.consultant.name : "Consultantul tău Autoklass"}</strong>
        <span>{detailed ? glcDetails.consultant.role : "Detalii despre mașină și ofertă"}</span>
      </div>
    </div>
  );
}
