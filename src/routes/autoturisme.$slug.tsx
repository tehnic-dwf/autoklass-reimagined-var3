import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import * as Dialog from "@radix-ui/react-dialog";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Armchair,
  Sun,
  Camera,
  Lightbulb,
  Wind,
  Navigation,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Sparkles,
  History,
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
import { VehicleFacts } from "@/components/vehicle/VehicleFacts";
import { VehicleCard } from "@/components/vehicle/VehicleCard";
import { vehicles, getVehicle, formatPrice, gallerySize } from "@/data/vehicles";
import { demoSlug, normalized } from "@/data/demo-vehicle";
import { usedDetails } from "@/data/used-product-details";
import { glcDetails, completeEquipmentGroups, equipmentKind } from "@/data/product-details";
import { groupEquipmentByPurpose } from "@/lib/equipment-groups";
import { availabilityOf, shortTitle } from "@/lib/vehicle-search";
import carVerticalLogo from "@/assets/carvertical.svg";
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
  const usedExample = v.slug === usedDetails.slug;
  const isUsed = v.condition === "rulat";
  const [requestKind, setRequestKind] = useState<"offer" | "report">("offer");
  const [open, setOpen] = useState(false);
  const [photo, setPhoto] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [query, setQuery] = useState("");
  const opener = useRef<HTMLButtonElement>(null);
  const galleryOpener = useRef<HTMLButtonElement>(null);
  const touchStart = useRef<number | null>(null);
  const photos = detailed
    ? glcDetails.photos
    : usedExample
      ? usedDetails.photos
      : [gallerySize(v.image)];
  const selected = photos[photo] || photos[0]!;
  const changePhoto = (offset: number) =>
    setPhoto((current) => (current + offset + photos.length) % photos.length);
  const contact = (e: React.MouseEvent<HTMLButtonElement>) => {
    setRequestKind("offer");
    opener.current = e.currentTarget;
    setOpen(true);
  };
  const groups = detailed
    ? completeEquipmentGroups
    : usedExample
      ? usedDetails.groups
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
  const specs = detailed
    ? glcDetails.specs.filter(
        ([label]) =>
          ![
            "Stare",
            "Fabricație",
            "Cilindree",
            "Transmisie",
            "Tracțiune",
            "Motorizare",
            "Putere",
            "Emisii CO₂ WLTP",
            "Echipare de bază",
            "Kilometraj",
          ].includes(label!),
      )
    : usedExample
      ? [
          ...usedDetails.specs.filter(
            ([name]) => !["Motorizare", "Putere totală", "Tracțiune", "Cilindree"].includes(name!),
          ),
        ]
      : [
          ...(v.color ? [["Culoare", v.color]] : []),
          ...(v.rangeKm ? [["Autonomie electrică", `${v.rangeKm} km`]] : []),
          ...(v.chargeKw ? [["Încărcare DC", `${v.chargeKw} kW`]] : []),
        ];
  const similar = vehicles
    .filter((item) => item.slug !== v.slug && !item.reserved && item.bodyType === v.bodyType)
    .sort((a, b) => Math.abs(a.priceEur - v.priceEur) - Math.abs(b.priceEur - v.priceEur))
    .slice(0, 4);
  const highlightIcons = [Armchair, Sun, Camera, Lightbulb, Wind, Navigation];
  return (
    <div className={"v3 ak-product ak-reviewed-product pb-24 lg:pb-0"}>
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
            </div>
            <div className="ak-gallery-toolbar">
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
                <Expand size={19} aria-hidden />
              </button>
              <div className="ak-gallery-save">
                <FavoriteButton slug={v.slug} withLabel />
              </div>
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
            <div
              className={`ak-product-eyebrow ak-condition-banner ${isUsed ? "is-used" : "is-new"}`}
            >
              <strong>
                {isUsed ? <History size={16} aria-hidden /> : <Sparkles size={16} aria-hidden />}
                {isUsed ? "Autoturism rulat" : "Autoturism nou"}
              </strong>
              <span>{v.brand}</span>
            </div>
            <h1 id="vehicle-title">{shortTitle(v)}</h1>
            <p className="ak-product-trim">
              {detailed
                ? "AMG Line Premium · SUV"
                : usedExample
                  ? "Sportback · hibrid plug-in"
                  : v.bodyType}{" "}
              · <span className="ak-product-year">{v.year}</span>
            </p>
            <div className="ak-purchase-panel">
              <div className="ak-product-price">
                <strong>{formatPrice(v.priceEur)} €</strong>
                <span>
                  TVA inclus
                  {v.vat === "deductibil"
                    ? " · deductibil"
                    : v.vat === "nedeductibil"
                      ? " · nedeductibil"
                      : ""}
                </span>
                {(detailed || usedExample) && v.listPriceEur && v.listPriceEur > v.priceEur && (
                  <div className="ak-price-saving">
                    <del className="ak-old-price">{formatPrice(v.listPriceEur)} €</del>
                    <span>Economisești {formatPrice(v.listPriceEur - v.priceEur)} €</span>
                  </div>
                )}
              </div>
              {(detailed || usedExample) && (
                <details className="ak-finance-disclosure">
                  <summary>
                    <span className="ak-finance-main">
                      <span className="ak-finance-label">Leasing orientativ</span>
                      <span className="ak-finance-rate">
                        <b>{usedExample ? "661,39" : "1.050,29"} €</b>
                        <small>/ lună</small>
                      </span>
                    </span>
                    <span className="ak-finance-conditions-link">
                      Condiții <ChevronDown size={16} aria-hidden />
                    </span>
                  </summary>
                  <div>
                    <p>
                      Avansul, durata, dobânda și costul total se confirmă în oferta personalizată.
                    </p>
                    <p>
                      Prețul include dotările instalate. Plata în lei se calculează la cursul
                      aplicabil din ziua plății, confirmat în ofertă.
                    </p>
                  </div>
                </details>
              )}
              <div className="ak-offer-box">
                <button className="v3-button ak-offer-button" onClick={contact}>
                  Solicită ofertă <ArrowRight size={20} aria-hidden />
                </button>
                <div className="ak-contact-details">
                  <ConsultantBlock detailed={detailed} usedExample={usedExample} />
                  <div className="ak-vehicle-location">
                    <span>
                      <small>Locația mașinii</small>
                      <strong>{v.branch}</strong>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <VehicleFacts vehicle={v} />
            {detailed && (
              <div className="ak-product-download">
                <FileText size={20} aria-hidden />
                <span>
                  Fișa mașinii <small>Specificații și dotări</small>
                </span>
              </div>
            )}
            {isUsed && (
              <section
                className="ak-product-download ak-history-report"
                aria-labelledby="history-report-title"
              >
                <div>
                  <h2 id="history-report-title">Istoricul mașinii</h2>
                  <img
                    className="ak-carvertical-logo"
                    src={carVerticalLogo}
                    alt="carVertical"
                    width={173}
                    height={32}
                  />
                </div>
                <button type="button" className="v3-link" onClick={() => setReportOpen(true)}>
                  Vezi raportul <ArrowRight size={16} aria-hidden />
                </button>
              </section>
            )}
          </section>
          <div className="ak-product-content">
            {usedExample && (
              <>
                <section className="ak-product-section" id="istoric">
                  <h2>Istoric și stare.</h2>
                  <dl className="ak-product-specs">
                    <div>
                      <dt>Prima înmatriculare</dt>
                      <dd>{usedDetails.firstRegistration}</dd>
                    </div>
                    <div>
                      <dt>Importat</dt>
                      <dd>Nu, conform fișei vânzătorului</dd>
                    </div>
                    <div>
                      <dt>Documente</dt>
                      <dd>CIV și manual de utilizare</dd>
                    </div>
                    <div>
                      <dt>Garanție</dt>
                      <dd>Garanție de vânzător; durata și acoperirea se confirmă în ofertă</dd>
                    </div>
                  </dl>
                  <details className="ak-product-disclosure">
                    <summary>Revizii, daune și proprietari</summary>
                    <div className="ak-product-answer">
                      <p>
                        Istoricul reviziilor, intervențiile anterioare și numărul de proprietari nu
                        sunt precizate în fișa publică. Cere documentele de service și raportul de
                        istoric înainte de achiziție.
                      </p>
                    </div>
                  </details>
                  <details className="ak-product-disclosure">
                    <summary>Baterie și încărcare</summary>
                    <div className="ak-product-answer">
                      <p>
                        Fișa menționează cabluri de încărcare pentru priză și stații publice. Starea
                        de sănătate a bateriei (SoH), autonomia actuală și garanția rămasă a
                        bateriei se confirmă separat.
                      </p>
                    </div>
                  </details>
                </section>
                <section className="ak-product-section">
                  <h2>Confort pentru fiecare drum.</h2>
                  <ul className="ak-product-highlights">
                    {[
                      "Scaune față încălzite",
                      "Climatizare cu 4 zone",
                      "Cameră pentru mersul înapoi",
                      "Audi virtual cockpit",
                    ].map((item) => (
                      <li key={item}>
                        <Check size={22} aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <img
                    className="ak-product-detail-image"
                    src={photos[5]}
                    alt="Audi A7, detaliu al exemplarului rulat"
                    width={1200}
                    height={900}
                    loading="lazy"
                  />
                </section>
              </>
            )}

            {detailed && (
              <section className="ak-product-section">
                <h2>Dotări remarcabile.</h2>
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
                <h2>Dotările acestei mașini.</h2>
                <p className="ak-equipment-intro">
                  Toate dotările afișate sunt instalate pe această mașină și incluse în preț.
                </p>
                <label className="v3-field ak-equipment-search">
                  <span>Caută o dotare</span>
                  <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="De exemplu: scaune, cameră, CarPlay"
                  />
                </label>
                <p className="ak-search-count" role="status">
                  {query ? `${count} ${count === 1 ? "rezultat" : "rezultate"}` : ""}
                </p>
                {filtered.map((group) => (
                  <details
                    key={query + group.name}
                    className="ak-product-disclosure"
                    open={!!query}
                  >
                    <summary>
                      {group.name}
                      <span>{group.items.length}</span>
                    </summary>
                    <div className="ak-equipment-group">
                      {groupEquipmentByPurpose(group.items).map((topic) => (
                        <div className="ak-equipment-topic" key={topic.name}>
                          <h3>{topic.name}</h3>
                          <ul>
                            {topic.items.map((item) => (
                              <li
                                key={item}
                                className={`ak-equipment-row${detailed ? " has-kind" : ""}`}
                              >
                                <span>{item.replace(/^[A-Z0-9]{3} - /, "")}</span>
                                {detailed && (
                                  <span className={`ak-equipment-kind ${equipmentKind(item)}`}>
                                    {equipmentKind(item) === "optional"
                                      ? "Opțional inclus"
                                      : "Standard"}
                                  </span>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
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
            {specs.length > 0 && (
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
            )}
            {usedExample && (
              <section className="ak-product-section">
                <h2>Vezi mașina la Autoklass Sibiu.</h2>
                <p>
                  Discută cu consultantul despre vizionare, test drive și verificarea documentelor.
                </p>
                <a
                  className="v3-link"
                  href="https://www.google.com/maps/search/?api=1&query=Autoklass+Sibiu"
                  target="_blank"
                  rel="noreferrer"
                >
                  Indicații de orientare <ArrowRight size={18} aria-hidden />
                </a>
              </section>
            )}
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
              <h2>Cum soliciți oferta.</h2>
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
        key={`${v.slug}-${requestKind}`}
        requestKind={requestKind}
        vehicle={v}
        open={open}
        onOpenChange={setOpen}
        opener={opener}
        simulateError={demo === "error"}
      />
      <Dialog.Root open={reportOpen} onOpenChange={setReportOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="v3-shell-overlay" />
          <Dialog.Content className="v3 v3-panel" aria-describedby="report-preview-description">
            <div className="v3-panel-head">
              <Dialog.Title>Raport carVertical</Dialog.Title>
              <Dialog.Close className="v3-icon" aria-label="Închide raportul">
                <X />
              </Dialog.Close>
            </div>
            <div className="v3-panel-body">
              <img src={carVerticalLogo} alt="carVertical" width={173} height={32} />
              <p id="report-preview-description">
                Previzualizare demonstrativă. Raportul real al mașinii va fi conectat aici.
              </p>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
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
function ConsultantBlock({ detailed, usedExample }: { detailed: boolean; usedExample: boolean }) {
  return (
    <div className="ak-product-consultant">
      {detailed || usedExample ? (
        <img
          src={glcDetails.consultant.photo}
          alt={usedExample ? "Consultant Autoklass" : glcDetails.consultant.name}
          width={56}
          height={56}
        />
      ) : (
        <span className="ak-consultant-fallback">
          <UserRound size={26} />
        </span>
      )}
      <div>
        <strong>
          {detailed
            ? glcDetails.consultant.name
            : usedExample
              ? usedDetails.consultant
              : "Consultantul tău Autoklass"}
        </strong>
        <span>
          {detailed
            ? "Consultant vânzări"
            : usedExample
              ? "Consultant vânzări"
              : "Detalii despre mașină și ofertă"}
        </span>
      </div>
    </div>
  );
}
