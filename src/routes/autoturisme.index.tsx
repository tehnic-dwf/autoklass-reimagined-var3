import { createFileRoute } from "@tanstack/react-router";
import { Filter, ShieldCheck, X } from "lucide-react";
import { useMemo, useState } from "react";

import { MobileStickyBar } from "@/components/layout/MobileStickyBar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { VehicleCard } from "@/components/vehicle/VehicleCard";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { branches } from "@/data/company";
import { formatPrice, vehicles } from "@/data/vehicles";

export const Route = createFileRoute("/autoturisme/")({
  head: () => ({
    meta: [
      { title: "Mașini Mercedes-Benz noi și rulate — stocul Autoklass" },
      {
        name: "description",
        content:
          "Mașini noi și rulate, verificate, în aceeași listă — cu preț final, regim de TVA și sucursala afișate pentru fiecare. Filtrezi după buget, combustibil, caroserie sau sucursală.",
      },
      {
        property: "og:title",
        content: "Mașini Mercedes-Benz noi și rulate — stocul Autoklass",
      },
      {
        property: "og:description",
        content:
          "Mașini noi și rulate în aceeași listă, cu preț final vizibil. Un consultant îți răspunde în maximum 2 ore lucrătoare.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ListingPage,
});

type ConditionFilter = "toate" | "nou" | "rulat";

const maxPrice = 130000;

function ListingPage() {
  const [condition, setCondition] = useState<ConditionFilter>("toate");
  const [fuels, setFuels] = useState<string[]>([]);
  const [bodies, setBodies] = useState<string[]>([]);
  const [branch, setBranch] = useState<string>("toate");
  const [budget, setBudget] = useState<number>(maxPrice);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(
    () =>
      vehicles.filter((vehicle) => {
        if (condition !== "toate" && vehicle.condition !== condition) return false;
        if (fuels.length > 0 && !fuels.includes(vehicle.fuel)) return false;
        if (bodies.length > 0 && !bodies.includes(vehicle.bodyType)) return false;
        if (branch !== "toate" && vehicle.branch !== branch) return false;
        if (vehicle.priceEur > budget) return false;
        return true;
      }),
    [condition, fuels, bodies, branch, budget],
  );

  const activeCount =
    (condition !== "toate" ? 1 : 0) +
    fuels.length +
    bodies.length +
    (branch !== "toate" ? 1 : 0) +
    (budget < maxPrice ? 1 : 0);

  const resetAll = () => {
    setCondition("toate");
    setFuels([]);
    setBodies([]);
    setBranch("toate");
    setBudget(maxPrice);
  };

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-0">
      <SiteHeader />

      <main className="mx-auto w-full max-w-7xl px-6 py-12 md:px-8 md:py-20 lg:px-10">
        <p className="eyebrow">Stoc unificat</p>
        <h1 className="mt-3 text-3xl md:text-5xl">Autoturisme noi și rulate</h1>
        <p className="mt-5 max-w-2xl text-base text-muted-foreground">
          Aceeași listă pentru mașini noi și rulate, ca să le compari direct. Prețul afișat este cel
          de vânzare, cu regimul de TVA precizat pe fiecare mașină.
        </p>

        <p className="mt-6 flex max-w-2xl items-start gap-3 text-sm text-muted-foreground">
          <ShieldCheck className="mt-0.5 size-5 shrink-0 text-trust" aria-hidden />
          Mașinile rulate au kilometraj verificat și istoric de service în rețeaua autorizată.
        </p>

        {/* Selector principal: nou / rulat / toate — vizibil fără a deschide filtrele.
           Ținte de 48px, spațiere generoasă, ca bara să fie ușor de folosit cu degetul. */}
        <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-border/70 pt-8">
          <ToggleGroup
            type="single"
            size="lg"
            value={condition}
            onValueChange={(value) => value && setCondition(value as ConditionFilter)}
            className="flex-wrap gap-2"
          >
            <ToggleGroupItem value="toate" variant="outline">
              Toate ({vehicles.length})
            </ToggleGroupItem>
            <ToggleGroupItem value="nou" variant="outline">
              Noi ({vehicles.filter((v) => v.condition === "nou").length})
            </ToggleGroupItem>
            <ToggleGroupItem value="rulat" variant="outline">
              Rulate ({vehicles.filter((v) => v.condition === "rulat").length})
            </ToggleGroupItem>
          </ToggleGroup>

          <Button
            variant="outline"
            size="lg"
            onClick={() => setFiltersOpen((value) => !value)}
            aria-expanded={filtersOpen}
            aria-controls="panou-filtre"
          >
            <Filter className="size-4" aria-hidden />
            {filtersOpen ? "Ascunde filtrele" : "Filtrează"}
            {activeCount > 0 ? ` (${activeCount})` : ""}
          </Button>

          {activeCount > 0 ? (
            <Button variant="ghost" size="lg" onClick={resetAll}>
              <X className="size-4" aria-hidden />
              Șterge filtrele
            </Button>
          ) : null}
        </div>

        {filtersOpen ? (
          <div
            id="panou-filtre"
            className="mt-6 grid gap-8 rounded-sm bg-card p-6 ring-1 ring-border/60 sm:p-8 md:grid-cols-3"
          >
            <div>
              <Label className="text-sm font-bold">Buget maxim</Label>
              <p className="mt-2 text-sm text-muted-foreground">până la {formatPrice(budget)} €</p>
              <Slider
                className="mt-5"
                min={20000}
                max={maxPrice}
                step={1000}
                value={[budget]}
                onValueChange={([value]) => setBudget(value ?? maxPrice)}
              />
            </div>

            <div>
              <Label className="text-sm font-bold">Combustibil</Label>
              <ToggleGroup
                type="multiple"
                size="lg"
                value={fuels}
                onValueChange={setFuels}
                className="mt-4 flex-wrap justify-start gap-2"
              >
                {["Benzină", "Diesel"].map((fuel) => (
                  <ToggleGroupItem key={fuel} value={fuel} variant="outline">
                    {fuel}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>

              <Label className="mt-6 block text-sm font-bold">Caroserie</Label>
              <ToggleGroup
                type="multiple"
                size="lg"
                value={bodies}
                onValueChange={setBodies}
                className="mt-4 flex-wrap justify-start gap-2"
              >
                {["Limuzină", "Sedan", "SUV", "Coupe"].map((body) => (
                  <ToggleGroupItem key={body} value={body} variant="outline">
                    {body}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>

            <div>
              <Label className="text-sm font-bold">Sucursală</Label>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button
                  variant={branch === "toate" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setBranch("toate")}
                >
                  Toate
                </Button>
                {branches.map((item) => (
                  <Button
                    key={item.name}
                    variant={branch === item.name ? "default" : "outline"}
                    size="sm"
                    onClick={() => setBranch(item.name)}
                  >
                    {item.name.replace("Autoklass ", "")}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        <p className="mt-10 text-sm text-muted-foreground" aria-live="polite">
          {filtered.length} {filtered.length === 1 ? "mașină corespunde" : "mașini corespund"}{" "}
          filtrelor tale, din {vehicles.length} în stoc
        </p>

        {filtered.length === 0 ? (
          <div className="mt-6 rounded-sm bg-secondary p-10 text-center ring-1 ring-border/60">
            <p className="text-lg">Nicio mașină nu corespunde acestor filtre.</p>
            <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
              Lărgește bugetul sau alege altă sucursală — putem aduce mașina și din altă locație.
            </p>
            <Button className="mt-6" onClick={resetAll}>
              Șterge filtrele
            </Button>
          </div>
        ) : (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {filtered.map((vehicle) => (
              <VehicleCard key={vehicle.slug} vehicle={vehicle} />
            ))}
          </div>
        )}
      </main>

      <SiteFooter />

      <MobileStickyBar
        ctaLabel="Rezervă un test drive"
        ctaShortLabel="Test drive"
        ctaTo="/service/programare"
      />
    </div>
  );
}
