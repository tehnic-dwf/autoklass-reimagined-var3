import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, ArrowRight, X } from "lucide-react";
import { useState } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { formatKm, formatPrice, vehicles, type Vehicle } from "@/data/vehicles";
import { availabilityOf, shortTitle } from "@/lib/vehicle-search";
import { demoSlug, equipment } from "@/data/demo-vehicle";
import { useFavorites } from "@/lib/favorites";
export const Route = createFileRoute("/comparatie")({
  head: () => ({ meta: [{ title: "Compară mașini | Autoklass" }] }),
  component: ComparePage,
});
const rows: { label: string; value: (v: Vehicle) => string }[] = [
  { label: "Preț cu TVA", value: (v) => `${formatPrice(v.priceEur)} €` },
  { label: "Regim TVA", value: (v) => (v.vat === "deductibil" ? "Deductibil" : "Nedeductibil") },
  { label: "Stare", value: (v) => (v.condition === "nou" ? "Nouă" : "Rulată") },
  { label: "An", value: (v) => String(v.year) },
  { label: "Kilometraj", value: (v) => (v.km === null ? "Necomunicat" : formatKm(v.km)) },
  { label: "Combustibil", value: (v) => v.fuel + (v.hybrid ? " · hibrid" : "") },
  { label: "Putere motor", value: (v) => `${v.powerHp} CP` },
  { label: "Transmisie", value: (v) => v.gearbox },
  { label: "Tracțiune", value: (v) => v.drive },
  { label: "Caroserie", value: (v) => v.bodyType },
  { label: "Sucursală", value: (v) => v.branch },
  { label: "Disponibilitate", value: availabilityOf },
  {
    label: "Dotări în exemplu",
    value: (v) =>
      v.slug === demoSlug
        ? equipment
            .filter((e) => e.status === "demo")
            .map((e) => e.name)
            .join("; ")
        : "Date necomunicate",
  },
];
function ComparePage() {
  const { slugs, ready, remove } = useFavorites();
  const [picks, setPicks] = useState<string[] | null>(null);
  const [differences, setDifferences] = useState(false);
  const saved = slugs
    .map((s) => vehicles.find((v) => v.slug === s))
    .filter((v): v is Vehicle => Boolean(v));
  const chosen = (picks ?? slugs.slice(0, 3)).filter((s) => slugs.includes(s));
  const selected = saved.filter((v) => chosen.includes(v.slug));
  const toggle = (slug: string) =>
    setPicks(
      chosen.includes(slug)
        ? chosen.filter((s) => s !== slug)
        : chosen.length < 3
          ? [...chosen, slug]
          : chosen,
    );
  return (
    <div className="v3">
      <SiteHeader />
      <main id="main-content" className="v3-wrap v3-section">
        <p className="v3-kicker">Mașinile tale</p>
        <h1>Compară ce contează.</h1>
        <p className="v3-intro">
          Până la trei mașini, cu aceleași criterii, una lângă alta. Selecția rămâne salvată în
          acest browser.
        </p>
        {!ready ? (
          <p role="status" className="mt-8">
            Se încarcă mașinile salvate…
          </p>
        ) : saved.length === 0 ? (
          <div className="v3-empty">
            <Heart size={32} strokeWidth={1} className="mx-auto mb-6" />
            <h2>Lista ta începe cu o mașină.</h2>
            <p className="v3-muted">
              Apasă inima de pe un card pentru a salva mașina și a o compara aici.
            </p>
            <Link to="/autoturisme" className="v3-button">
              Explorează mașinile <ArrowRight size={18} />
            </Link>
          </div>
        ) : (
          <>
            <div className="my-8">
              <p className="v3-small v3-muted mb-4">Alege 2 sau 3 mașini din lista salvată.</p>
              <div className="v3-stack">
                {saved.map((v) => (
                  <div className="v3-row v3-rule pt-4" key={v.slug}>
                    <label className="v3-check flex-1">
                      <input
                        type="checkbox"
                        checked={chosen.includes(v.slug)}
                        disabled={!chosen.includes(v.slug) && chosen.length >= 3}
                        onChange={() => toggle(v.slug)}
                      />
                      <span>
                        {shortTitle(v)}{" "}
                        <span className="v3-muted">· {formatPrice(v.priceEur)} €</span>
                      </span>
                    </label>
                    <button
                      className="v3-icon"
                      aria-label={`Elimină ${v.title}`}
                      onClick={() => {
                        remove(v.slug);
                        setPicks(chosen.filter((s) => s !== v.slug));
                      }}
                    >
                      <X size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="v3-row">
              <label className="v3-check">
                <input
                  type="checkbox"
                  checked={differences}
                  onChange={(e) => setDifferences(e.target.checked)}
                />
                Arată doar diferențele
              </label>
              <Link to="/autoturisme" className="v3-link">
                Adaugă o mașină <ArrowRight size={16} />
              </Link>
            </div>
            {selected.length < 2 && (
              <p role="status" className="v3-notice my-6">
                {selected.length === 0
                  ? "Selectează două mașini pentru comparație."
                  : "Mai adaugă o mașină ca să vezi diferențele."}
              </p>
            )}
            {selected.length > 0 && (
              <>
                <p className="v3-small v3-muted mt-6 lg:hidden">
                  Derulează tabelul orizontal pentru a vedea toate mașinile →
                </p>
                <div
                  className="v3-table-scroll"
                  role="region"
                  aria-label="Tabel comparație mașini"
                  tabIndex={0}
                >
                  <table className="v3-compare">
                    <caption className="sr-only">Comparație între mașinile selectate</caption>
                    <thead>
                      <tr>
                        <th scope="col">Caracteristică</th>
                        {selected.map((v) => (
                          <th scope="col" key={v.slug}>
                            <img src={v.image} alt={v.title} />
                            <h2>{shortTitle(v)}</h2>
                            <Link
                              className="v3-link"
                              to="/autoturisme/$slug"
                              params={{ slug: v.slug }}
                            >
                              Vezi mașina <ArrowRight size={16} />
                            </Link>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((row) => {
                        const vals = selected.map(row.value);
                        const differs = new Set(vals).size > 1;
                        if (differences && !differs) return null;
                        return (
                          <tr key={row.label} className={differs ? "different" : ""}>
                            <th scope="row">{row.label}</th>
                            {vals.map((val, i) => (
                              <td key={selected[i]!.slug}>{val}</td>
                            ))}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                {differences && selected.length < 2 && (
                  <p className="v3-muted">
                    Diferențele se afișează după selectarea a cel puțin două mașini.
                  </p>
                )}
              </>
            )}
            <p className="v3-notice mt-8">
              Prețuri de catalog demonstrative. „Date necomunicate” nu înseamnă că o dotare
              lipsește.
            </p>
          </>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
