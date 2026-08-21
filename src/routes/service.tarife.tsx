import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Phone, Search, X } from "lucide-react";
import { useMemo, useState } from "react";

import { MobileStickyBar } from "@/components/layout/MobileStickyBar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Button } from "@/components/ui/button";
import { contact } from "@/data/company";
import { priceGroups } from "@/data/service-prices";

export const Route = createFileRoute("/service/tarife")({
  head: () => ({
    meta: [
      { title: "Tarife service Autoklass — cât costă și cât durează" },
      {
        name: "description",
        content:
          "Tarifele de intrare și durata estimată pentru revizii, diagnoză, frâne, anvelope și vopsitorie. Unde nu există preț fix, spunem de ce și cum ajungem la deviz.",
      },
    ],
  }),
  component: ServicePricesPage,
});

const lei = new Intl.NumberFormat("ro-RO");

/* Cele trei întrebări care apar înainte de orice programare, după datele
   clientului: cât costă, cât durează, ce se întâmplă dacă apare ceva în plus. */
const answers = [
  {
    q: "De ce scrie „de la”?",
    a: "Tariful acoperă manopera. Piesele și consumabilele diferă de la model la model, așa că suma finală o afli în deviz, înainte să începem.",
  },
  {
    q: "Ce se întâmplă dacă găsiți altceva?",
    a: "Te sunăm și îți spunem ce am găsit, cât costă și cât durează. Nu atingem nimic până nu aprobi tu.",
  },
  {
    q: "Când aflu suma exactă?",
    a: "La revizii și lucrările cu preț de intrare, la confirmarea programării. La restul, după diagnoză — de obicei în aceeași zi.",
  },
];

function ServicePricesPage() {
  const [open, setOpen] = useState<number | null>(0);
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState<string | null>(null);

  // Căutarea trece prin denumire și descriere; filtrul de categorie taie
  // restul. Grupurile rămase goale dispar, ca lista să nu aibă găuri.
  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return priceGroups
      .filter((item) => !group || item.id === group)
      .map((item) => ({
        ...item,
        rows: q
          ? item.rows.filter((row) => `${row.label} ${row.detail}`.toLowerCase().includes(q))
          : item.rows,
      }))
      .filter((item) => item.rows.length > 0);
  }, [query, group]);

  const total = visible.reduce((sum, item) => sum + item.rows.length, 0);

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-0">
      <SiteHeader />

      <main>
        <section className="mx-auto w-full max-w-7xl px-6 py-12 md:px-8 md:py-16 lg:px-10 lg:py-20">
          <h1 className="max-w-[20ch] text-4xl md:text-5xl">
            Cât costă și cât durează, înainte să lași cheia.
          </h1>
          <p className="mt-5 max-w-[58ch] text-base text-muted-foreground">
            Tarifele de mai jos sunt cele de intrare, pentru manoperă în service autorizat. Unde
            lucrarea nu poate fi estimată din birou, scriem asta pe față și îți trimitem devizul
            după verificare.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="press">
              <Link to="/service/programare">Programează service</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="press">
              <a href={contact.phoneHref}>
                <Phone className="size-4" aria-hidden />
                {contact.phone}
              </a>
            </Button>
          </div>
        </section>

        {/* Tabelele de tarife: pe mobil rânduri, pe desktop trei coloane
            aliniate — lucrare, durată, preț de intrare. */}
        <section className="border-t border-border/70 bg-secondary py-12 md:py-16 lg:py-20">
          <div className="mx-auto w-full max-w-7xl px-6 md:px-8 lg:px-10">
            {/* Căutare + categorii, într-o singură bandă lipită sus. Etichetele
                sunt scurte ca să încapă pe două rânduri, fără scroll lateral. */}
            <div className="sticky top-16 z-30 -mx-6 -mt-12 mb-8 border-b border-border/70 bg-secondary px-6 py-4 md:-mx-8 md:-mt-16 md:px-8 lg:-mt-20">
              <div className="mx-auto w-full max-w-7xl lg:px-0">
                <div className="relative">
                  <Search
                    className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                  <input
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Caută o lucrare"
                    aria-label="Caută în lista de tarife"
                    className="h-13 w-full rounded-sm border border-input bg-card pl-12 pr-12 text-base outline-none focus:border-ring focus:ring-2 focus:ring-ring/25"
                  />
                  {query ? (
                    <button
                      type="button"
                      onClick={() => setQuery("")}
                      aria-label="Șterge căutarea"
                      className="absolute right-2 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-sm text-muted-foreground hover:bg-muted"
                    >
                      <X className="size-5" strokeWidth={1.5} aria-hidden />
                    </button>
                  ) : null}
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {[{ id: null, short: "Toate" }, ...priceGroups].map((item) => {
                    const active = group === item.id;
                    return (
                      <button
                        key={item.short}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setGroup(active ? null : item.id)}
                        className={
                          active
                            ? "press flex h-10 items-center rounded-full bg-primary px-4 text-sm font-bold text-primary-foreground"
                            : "press flex h-10 items-center rounded-full border border-border bg-card px-4 text-sm hover:bg-muted"
                        }
                      >
                        {item.short}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <p aria-live="polite" className="text-sm text-muted-foreground">
              {total === 1 ? "O lucrare găsită" : `${total} lucrări`}
              {query ? ` pentru „${query}”` : ""}
            </p>

            {total === 0 ? (
              <div className="mt-6 rounded-sm bg-card p-8 ring-1 ring-border/60">
                <h2 className="text-xl">Nu găsim lucrarea asta în listă.</h2>
                <p className="mt-3 max-w-[52ch] text-sm text-muted-foreground">
                  Nu înseamnă că nu o facem — lista de mai sus acoperă lucrările cerute cel mai des.
                  Descrie-ne problema în formularul de programare și îți trimitem estimarea.
                </p>
                <Button asChild size="lg" className="press mt-6 w-full sm:w-auto">
                  <Link to="/service/programare">Descrie problema</Link>
                </Button>
              </div>
            ) : null}

            <div className="mt-8 space-y-14">
              {visible.map((group) => (
                <div key={group.id}>
                  <h2 className="text-2xl md:text-3xl">{group.title}</h2>
                  <p className="mt-3 max-w-[62ch] text-sm text-muted-foreground">{group.intro}</p>

                  <ul className="mt-7 border-t border-border/70">
                    {group.rows.map((row) => (
                      <li
                        key={row.label}
                        className="grid gap-x-8 gap-y-2 border-b border-border/70 py-5 md:grid-cols-[minmax(0,1fr)_8rem_10rem] md:items-baseline"
                      >
                        <div className="min-w-0">
                          <p className="text-lg leading-snug">{row.label}</p>
                          <p className="mt-1 text-sm text-muted-foreground">{row.detail}</p>
                        </div>
                        <p className="text-sm text-muted-foreground md:text-right">
                          <span className="md:hidden">Durată: </span>
                          {row.duration}
                        </p>
                        <p className="md:text-right">
                          {row.from === null ? (
                            <span className="text-sm text-muted-foreground">după diagnoză</span>
                          ) : (
                            <>
                              <span className="text-sm text-muted-foreground">de la </span>
                              <span className="font-display text-xl tabular-nums">
                                {lei.format(row.from)} lei
                              </span>
                            </>
                          )}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <p className="mt-14 max-w-[62ch] text-xs text-muted-foreground">
              Tarifele sunt orientative, valabile pentru autoturisme Mercedes-Benz în rețeaua
              autorizată Autoklass. Suma finală o primești în deviz, înainte de începerea lucrării.
            </p>
          </div>
        </section>

        {/* Întrebările care rămân după ce omul citește tarifele */}
        <section className="mx-auto w-full max-w-7xl px-6 py-12 md:px-8 md:py-16 lg:grid lg:grid-cols-2 lg:gap-20 lg:px-10 lg:py-20">
          <div>
            <h2 className="text-3xl md:text-4xl">Ce ne întreabă lumea despre costuri</h2>
            <div className="mt-8 border-t border-border/70">
              {answers.map((item, index) => {
                const expanded = open === index;
                return (
                  <div key={item.q} className="border-b border-border/70">
                    <h3>
                      <button
                        type="button"
                        aria-expanded={expanded}
                        aria-controls={`tarif-panel-${index}`}
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
                      id={`tarif-panel-${index}`}
                      role="region"
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
          </div>

          <div className="mt-12 lg:sticky lg:top-28 lg:mt-0 lg:self-start">
            <div className="rounded-sm bg-primary p-7 text-primary-foreground md:p-10">
              <h2 className="text-2xl md:text-3xl">
                Spune-ne ce face mașina și îți trimitem estimarea.
              </h2>
              <p className="mt-4 max-w-[46ch] text-base text-primary-foreground/80">
                Alegi lucrarea și sucursala în trei pași. Un consultant te sună în maximum două ore
                lucrătoare cu ora confirmată și cu estimarea de cost.
              </p>
              <Button asChild size="lg" variant="secondary" className="press mt-7 w-full sm:w-auto">
                <Link to="/service/programare">
                  Programează service
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />

      <MobileStickyBar ctaLabel="Programează service" ctaTo="/service/programare" />
    </div>
  );
}
