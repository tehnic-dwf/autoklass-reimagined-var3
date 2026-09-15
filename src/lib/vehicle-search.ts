import { vehicles, type Vehicle } from "@/data/vehicles";
import { demoSlug, equipment, normalized } from "@/data/demo-vehicle";
export const searchKeys = [
  "demo",
  "q",
  "condition",
  "brand",
  "model",
  "minPrice",
  "maxPrice",
  "fuel",
  "body",
  "branch",
  "gearbox",
  "drive",
  "minYear",
  "maxYear",
  "minKm",
  "maxKm",
  "minPower",
  "maxPower",
  "minEngine",
  "maxEngine",
  "equipment",
  "availability",
  "vat",
  "sort",
] as const;
export type SearchKey = (typeof searchKeys)[number];
export type VehicleSearch = Partial<Record<SearchKey, string>>;
export function validateVehicleSearch(raw: Record<string, unknown>): VehicleSearch {
  const result: VehicleSearch = {};
  for (const key of searchKeys) {
    const v = raw[key];
    if ((typeof v === "string" || typeof v === "number") && String(v).trim())
      result[key] = String(v).slice(0, 160);
  }
  return result;
}
export function modelOf(v: Vehicle) {
  return (
    v.model ??
    v.title.match(/Clasa [A-Z]|GLA|GLC|GLE|CLE/)?.[0] ??
    (v.title.includes(" C ") ? "Clasa C" : "Clasa E")
  );
}
export const availabilityOf = (v: Vehicle) =>
  v.reserved ? "Indisponibil" : v.availability || "Disponibilitate de confirmat";
export const shortTitle = (v: Vehicle) =>
  v.title
    .replace(/^Mercedes-Benz /, "")
    .replace(/^Mercedes-AMG /, "AMG ")
    .replace("GLC SUV GLC", "GLC")
    .replace(/Clasa ([A-Z]) \1 /, "Clasa $1 ");
export const unique = (values: string[]) =>
  [...new Set(values)].sort((a, b) => a.localeCompare(b, "ro"));
export function matchingVehicles(s: VehicleSearch, source = vehicles) {
  const min = (key: SearchKey, value: number | null) =>
    !s[key] || (value !== null && value >= Number(s[key]));
  const max = (key: SearchKey, value: number | null) =>
    !s[key] || (value !== null && value <= Number(s[key]));
  const results = source.filter((v) => {
    if (s.q && !normalized(v.title + " " + v.slug + " " + v.bodyType).includes(normalized(s.q)))
      return false;
    if (s.condition && v.condition !== s.condition) return false;
    if (s.brand && v.brand !== s.brand) return false;
    if (s.model && modelOf(v) !== s.model) return false;
    if (s.fuel && (s.fuel === "Hibrid" ? !v.hybrid : v.fuel !== s.fuel)) return false;
    if (s.body && v.bodyType !== s.body && !(s.body === "Limuzină" && v.bodyType === "Sedan"))
      return false;
    if (s.branch && v.branch !== s.branch) return false;
    if (s.gearbox && v.gearbox !== s.gearbox) return false;
    if (s.drive && v.drive !== s.drive) return false;
    if (s.vat && v.vat !== s.vat) return false;
    if (
      s.availability &&
      !(s.availability === "unknown"
        ? !v.availability && !v.reserved
        : s.availability === "immediate"
          ? v.availability === "Livrare imediată"
          : v.availability === "În stoc")
    )
      return false;
    if (
      !min("minPrice", v.priceEur) ||
      !max("maxPrice", v.priceEur) ||
      !min("minPower", v.powerHp) ||
      !max("maxPower", v.powerHp) ||
      !min("minEngine", v.engineCc) ||
      !max("maxEngine", v.engineCc)
    )
      return false;
    if (
      s.condition !== "nou" &&
      (!min("minYear", v.year) ||
        !max("maxYear", v.year) ||
        !min("minKm", v.km) ||
        !max("maxKm", v.km))
    )
      return false;
    if (s.equipment) {
      const terms = normalized(s.equipment).split(/[ ,]+/).filter(Boolean);
      const installed =
        v.slug === demoSlug
          ? equipment.filter((e) => e.status === "series").map((e) => e.name + " " + e.aliases)
          : v.equipment || [];
      if (!terms.every((t) => installed.some((name) => normalized(name).includes(t)))) return false;
    }
    return true;
  });
  if (s.sort === "price-asc") results.sort((a, b) => a.priceEur - b.priceEur);
  else if (s.sort === "price-desc") results.sort((a, b) => b.priceEur - a.priceEur);
  else results.sort((a, b) => Number(b.slug === demoSlug) - Number(a.slug === demoSlug));
  return results;
}
export const filterLabels: Record<SearchKey, string> = {
  demo: "Scenariu",
  q: "Căutare",
  condition: "Stare",
  brand: "Marcă",
  model: "Model",
  minPrice: "Preț de la",
  maxPrice: "Preț până la",
  fuel: "Combustibil",
  body: "Caroserie",
  branch: "Sucursală",
  gearbox: "Transmisie",
  drive: "Tracțiune",
  minYear: "An de la",
  maxYear: "An până la",
  minKm: "Km de la",
  maxKm: "Km până la",
  minPower: "CP de la",
  maxPower: "CP până la",
  minEngine: "cm³ de la",
  maxEngine: "cm³ până la",
  equipment: "Dotări",
  availability: "Disponibilitate",
  vat: "TVA",
  sort: "Sortare",
};
export const activeFilters = (s: VehicleSearch) =>
  Object.entries(s).filter(([key, value]) => key !== "sort" && key !== "demo" && value) as [
    SearchKey,
    string,
  ][];
