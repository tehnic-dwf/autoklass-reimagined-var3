import { vehicles, type Vehicle } from "@/data/vehicles";
import { demoSlug, normalized } from "@/data/demo-vehicle";
import { glcDetails } from "@/data/product-details";
export const vehicleSortOptions = [
  { value: "recommended", label: "Recomandate" },
  { value: "price-asc", label: "Preț: mic → mare" },
  { value: "price-desc", label: "Preț: mare → mic" },
  { value: "km-asc", label: "Kilometraj mic" },
  { value: "year-desc", label: "An recent" },
  { value: "power-desc", label: "Putere mare" },
] as const;

// Show the breadth of the matching inventory before repeating a brand.
// Reserved vehicles remain visible, after vehicles that can still be enquired about.
function recommendedVehicles(source: Vehicle[]) {
  return [false, true].flatMap((reserved) => {
    const groups = new Map<string, Vehicle[]>();
    for (const vehicle of source.filter((v) => Boolean(v.reserved) === reserved)) {
      const key = vehicle.brand;
      const group = groups.get(key) || [];
      group.push(vehicle);
      groups.set(key, group);
    }
    const result: Vehicle[] = [];
    const queues = [...groups.values()];
    for (let index = 0; queues.some((group) => index < group.length); index++) {
      for (const group of queues) {
        const vehicle = group[index];
        if (vehicle) result.push(vehicle);
      }
    }
    return result;
  });
}

export const searchKeys = [
  "demo",
  "offer",
  "certified",
  "color",
  "minRange",
  "minCharge",
  "page",
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
  if (result.sort && !vehicleSortOptions.some((option) => option.value === result.sort))
    delete result.sort;
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
  s = { ...s, ...interpretQuery(s.q || "") };
  const min = (key: SearchKey, value: number | null) =>
    !s[key] || (value !== null && value >= Number(s[key]));
  const max = (key: SearchKey, value: number | null) =>
    !s[key] || (value !== null && value <= Number(s[key]));
  const results = source.filter((v) => {
    if (
      s.q &&
      !normalized(s.q)
        .split(/\s+/)
        .every((term) =>
          normalized(v.title + " " + v.slug + " " + v.bodyType + " " + v.fuel).includes(term),
        )
    )
      return false;
    if (s.offer && !(v.listPriceEur && v.listPriceEur > v.priceEur)) return false;
    if (s.certified && !v.certified) return false;
    if (s.color && v.color !== s.color) return false;
    if (!min("minRange", v.rangeKm ?? null) || !min("minCharge", v.chargeKw ?? null)) return false;
    if (s.condition && v.condition !== s.condition) return false;
    if (s.brand && v.brand !== s.brand) return false;
    if (s.model && modelOf(v) !== s.model) return false;
    if (s.fuel && (s.fuel === "Hibrid" ? !v.hybrid : v.fuel !== s.fuel || !!v.hybrid)) return false;
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
      !min("minYear", v.year) ||
      !max("maxYear", v.year) ||
      !min("minKm", v.km) ||
      !max("maxKm", v.km)
    )
      return false;
    if (s.equipment) {
      const terms = normalized(s.equipment).split(/[ ,]+/).filter(Boolean);
      const installed =
        v.slug === demoSlug
          ? [...glcDetails.groups.flatMap((group) => group.items), ...glcDetails.fullEquipment]
          : v.equipment || [];
      if (!terms.every((t) => installed.some((name) => normalized(name).includes(t)))) return false;
    }
    return true;
  });
  if (s.sort === "price-asc") results.sort((a, b) => a.priceEur - b.priceEur);
  else if (s.sort === "price-desc") results.sort((a, b) => b.priceEur - a.priceEur);
  else if (s.sort === "km-asc") results.sort((a, b) => (a.km ?? Infinity) - (b.km ?? Infinity));
  else if (s.sort === "year-desc") results.sort((a, b) => b.year - a.year);
  else if (s.sort === "power-desc") results.sort((a, b) => b.powerHp - a.powerHp);
  else return recommendedVehicles(results);
  return results;
}
export const filterLabels: Record<SearchKey, string> = {
  demo: "Scenariu",
  page: "Pagină",
  offer: "Ofertă",
  certified: "Certificare",
  color: "Culoare",
  minRange: "Autonomie minimă",
  minCharge: "Încărcare DC minimă",
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
  Object.entries(s).filter(
    ([key, value]) => key !== "sort" && key !== "page" && key !== "demo" && value,
  ) as [SearchKey, string][];

export function interpretQuery(input: string): VehicleSearch {
  let q = normalized(input);
  const result: VehicleSearch = {};
  const budget = q.match(
    /(?:sub|maxim|pana la)\s*(\d{1,3}(?:[. ,]\d{3})+|\d+(?:[.,]\d+)?)\s*(k|mii)?(?:\s*(?:euro|eur|€))?/,
  );
  if (budget) {
    const amount = budget[2]
      ? Number(budget[1]!.replace(",", ".")) * 1000
      : Number(budget[1]!.replace(/[. ,](?=\d{3}(?:\D|$))/g, "").replace(",", "."));
    result.maxPrice = String(amount);
    q = q.replace(budget[0], "");
  }
  for (const [pattern, key, val] of [
    [/\b(?:rulat[ae]?|uzat[ae]?|second hand)\b/, "condition", "rulat"],
    [/\b(?:nou[ae]?|noi)\b/, "condition", "nou"],
    [/\b(?:electric[ae]?|electrice)\b/, "fuel", "Electric"],
    [/\b(?:hibrid[ae]?|hybrid)\b/, "fuel", "Hibrid"],
    [/\bdiesel\b/, "fuel", "Diesel"],
    [/\bbenzina\b/, "fuel", "Benzină"],
  ] as [RegExp, SearchKey, string][]) {
    if (pattern.test(q)) {
      result[key] = val;
      q = q.replace(pattern, "");
    }
  }
  result.q = q.replace(/\s+/g, " ").trim();
  return result;
}
export function suggestedVehicles(s: VehicleSearch) {
  const parsed = { ...s, ...interpretQuery(s.q || "") };
  const relaxed: VehicleSearch = {};
  if (s.brand) relaxed.brand = s.brand;
  if (s.model) relaxed.model = s.model;
  const queryMatches = parsed.q ? matchingVehicles({ ...relaxed, q: parsed.q }) : [];
  const pool = queryMatches.length ? queryMatches : matchingVehicles(relaxed);
  return pool
    .filter((v) => !v.reserved)
    .sort(
      (a, b) =>
        Math.abs(a.priceEur - Number(parsed.maxPrice || a.priceEur)) -
        Math.abs(b.priceEur - Number(parsed.maxPrice || b.priceEur)),
    )
    .slice(0, 4);
}
