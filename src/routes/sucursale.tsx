import { Link, createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone } from "lucide-react";
import { useMemo, useState } from "react";

import { MobileStickyBar } from "@/components/layout/MobileStickyBar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Button } from "@/components/ui/button";
import { branches, contact } from "@/data/company";
import { branchNeeds, branchServices, type BranchNeed } from "@/data/offers";

export const Route = createFileRoute("/sucursale")({
  head: () => ({
    meta: [
      { title: "Sucursale Autoklass — găsește showroomul și service-ul de lângă tine" },
      {
        name: "description",
        content:
          "Cele 9 sucursale Autoklass, cu adresă, telefon și ce se rezolvă la fiecare: vânzări, service autorizat, dosar de daună și vopsitorie.",
      },
    ],
  }),
  component: BranchesPage,
});

const cities = ["Toate orașele", ...Array.from(new Set(branches.map((b) => b.city)))];

function BranchesPage() {
  const [city, setCity] = useState(cities[0]);
  const [need, setNeed] = useState<BranchNeed | null>(null);

  const results = useMemo(
    () =>
      branches.filter((branch) => {
        const cityOk = city === cities[0] || branch.city === city;
        const needOk = !need || (branchServices[branch.name] ?? []).includes(need);
        return cityOk && needOk;
      }),
    [city, need],
  );

  const mapsHref = (address: string) =>
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Autoklass ${address}`)}`;

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-0">
      <SiteHeader />

      <main className="mx-auto w-full max-w-7xl px-6 py-12 md:px-8 md:py-16 lg:px-10 lg:py-20">
        <h1 className="max-w-[18ch] text-4xl md:text-5xl">Găsește sucursala de lângă tine.</h1>
        <p className="mt-5 max-w-[56ch] text-base text-muted-foreground">
          Spune-ne în ce oraș ești și cu ce ai nevoie de ajutor. Îți arătăm doar sucursalele care
          chiar rezolvă lucrul acela.
        </p>

        {/* Pasul 1: orașul */}
        <div className="mt-10">
          <h2 className="text-lg">În ce oraș ești?</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {cities.map((option) => {
              const active = option === city;
              return (
                <button
                  key={option}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setCity(option)}
                  className={
                    active
                      ? "press flex h-12 items-center rounded-sm bg-primary px-5 text-sm font-bold text-primary-foreground"
                      : "press flex h-12 items-center rounded-sm border border-border px-5 text-sm hover:bg-muted"
                  }
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        {/* Pasul 2: nevoia */}
        <div className="mt-10">
          <h2 className="text-lg">Cu ce te ajutăm acolo?</h2>
          <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {(Object.keys(branchNeeds) as BranchNeed[]).map((key) => {
              const active = need === key;
              return (
                <button
                  key={key}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setNeed(active ? null : key)}
                  className={
                    active
                      ? "press rounded-sm bg-primary p-4 text-left text-primary-foreground"
                      : "press rounded-sm border border-border p-4 text-left hover:bg-muted"
                  }
                >
                  <span className="block text-sm font-bold">{branchNeeds[key].label}</span>
                  <span
                    className={
                      active
                        ? "mt-1 block text-xs text-primary-foreground/70"
                        : "mt-1 block text-xs text-muted-foreground"
                    }
                  >
                    {branchNeeds[key].hint}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <p className="mt-10 border-t border-border/70 pt-6 text-sm text-muted-foreground">
          {results.length === 1
            ? "O sucursală se potrivește"
            : `${results.length} sucursale se potrivesc`}
          {need ? ` pentru „${branchNeeds[need].label.toLowerCase()}”` : ""}
          {city === cities[0] ? "" : ` în ${city}`}.
        </p>

        {results.length === 0 ? (
          <div className="mt-6 rounded-sm bg-secondary p-8">
            <h3 className="text-xl">Nu avem încă sucursală care să facă asta aici.</h3>
            <p className="mt-3 max-w-[52ch] text-sm text-muted-foreground">
              Sună-ne și îți spunem care e cea mai apropiată sucursală care te poate ajuta, sau
              venim noi după mașină cu serviciul de preluare.
            </p>
            <Button asChild size="lg" className="press mt-6 w-full sm:w-auto">
              <a href={contact.phoneHref}>Sună la {contact.phone}</a>
            </Button>
          </div>
        ) : (
          <ul className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {results.map((branch) => {
              const offered = branchServices[branch.name] ?? [];
              return (
                <li
                  key={branch.name}
                  className="flex flex-col rounded-sm bg-card p-6 ring-1 ring-border/60"
                >
                  <h3 className="text-xl">{branch.name.replace("Autoklass ", "")}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{branch.address}</p>

                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {offered.map((item) => (
                      <li
                        key={item}
                        className="rounded-sm bg-secondary px-2.5 py-1 text-xs text-muted-foreground"
                      >
                        {branchNeeds[item].hint}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-col gap-2 pt-2">
                    <Button asChild className="press w-full">
                      <Link to="/service/programare">Programează o vizită</Link>
                    </Button>
                    <div className="flex gap-2">
                      <Button asChild variant="outline" className="press flex-1">
                        <a href={contact.phoneHref}>
                          <Phone className="size-4" aria-hidden />
                          Sună
                        </a>
                      </Button>
                      <Button asChild variant="outline" className="press flex-1">
                        <a
                          href={mapsHref(branch.address)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MapPin className="size-4" aria-hidden />
                          Hartă
                        </a>
                      </Button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </main>

      <SiteFooter />

      <MobileStickyBar ctaLabel="Programează o vizită" ctaTo="/service/programare" />
    </div>
  );
}
