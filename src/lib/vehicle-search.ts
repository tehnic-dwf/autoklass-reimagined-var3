import { vehicles, type Vehicle } from "@/data/vehicles";
import { isSalesOffer } from "@/data/sales-offers";
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
  "city",
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
    if ((typeof v === "string" || typeof v === "number") && String(v).trim()) {
      const value = String(v)
        .trim()
        .slice(0, key === "equipment" ? 1200 : 160);
      if (/^(min|max)(Price|Year|Km|Power|Engine|Range|Charge)$/.test(key) || key === "page") {
        const numeric = value.replace(/^["']|["']$/g, "");
        if (/^\d+(\.\d+)?$/.test(numeric) && Number.isFinite(Number(numeric)))
          result[key] = String(Number(numeric));
      } else result[key] = value;
    }
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
export const cityOf = (v: Vehicle) => {
  if (/București|Bucuresti|Pipera|Sud/.test(v.branch)) return "București";
  return v.branch.replace(/^Autoklass\s+/, "");
};
export const macroColorOf = (color?: string) => {
  const raw = normalized(color || "");
  if (!raw) return "";
  if (/\b(albastru|albastra|albastre|blue)\b/.test(raw)) return "Albastru";
  if (/\b(verde|green)\b/.test(raw)) return "Verde";
  if (/\b(rosu|rosie|red)\b/.test(raw)) return "Roșu";
  if (/\b(maro|brown)\b/.test(raw)) return "Maro";
  if (/\b(alb|alba|white)\b/.test(raw)) return "Alb";
  if (/\b(negru|neagra|black)\b/.test(raw)) return "Negru";
  if (/\b(gri|argintiu|argintie|silver|grey|gray)\b/.test(raw)) return "Gri / Argintiu";
  return "Altă culoare";
};
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

const searchAliases: Record<string, string> = {
  vw: "volkswagen",
  mb: "mercedes",
  merc: "mercedes",
  mercedesbenz: "mercedes",
  phev: "hibrid",
  hybrid: "hibrid",
  "4x4": "integrala",
};

const searchStopWords = new Set([
  "masina",
  "masini",
  "auto",
  "autoturism",
  "autoturisme",
  "vehicul",
  "vehicule",
  "caut",
  "vreau",
  "un",
  "o",
  "de",
  "cu",
  "in",
  "pentru",
]);

const searchTerms = (query: string) =>
  normalized(query)
    .split(/[^a-z0-9]+/)
    .filter(Boolean)
    .filter((term) => !searchStopWords.has(term))
    .map((term) => searchAliases[term] || term);

const vehicleSearchText = (vehicle: Vehicle) =>
  normalized(
    [
      vehicle.title,
      vehicle.slug,
      vehicle.brand,
      modelOf(vehicle),
      vehicle.bodyType,
      vehicle.fuel,
      vehicle.hybrid ? "hibrid phev plug-in" : "",
      vehicle.gearbox,
      vehicle.drive === "AWD" ? "integrala 4x4" : vehicle.drive,
      vehicle.branch,
    ].join(" "),
  );

const searchRelevance = (vehicle: Vehicle, query: string) => {
  const title = normalized(vehicle.title);
  const brand = normalized(vehicle.brand);
  const model = normalized(modelOf(vehicle));
  const terms = searchTerms(query);
  return terms.reduce(
    (score, term) =>
      score +
      (brand === term ? 8 : brand.startsWith(term) ? 5 : 0) +
      (model === term ? 8 : model.startsWith(term) ? 5 : 0) +
      (title.startsWith(term) ? 4 : title.includes(` ${term}`) ? 2 : 0),
    title.includes(normalized(query)) ? 12 : 0,
  );
};

// Only suggest a correction when it produces matches. The original query stays editable.
export function suggestSearchCorrection(query: string, filters: VehicleSearch = {}) {
  const dictionary = new Map<string, string>();
  for (const vehicle of vehicles) {
    for (const word of [vehicle.brand, modelOf(vehicle), vehicle.title, vehicle.bodyType]
      .join(" ")
      .split(/[^\p{L}\p{N}]+/u)) {
      const key = normalized(word);
      if (key.length >= 3 && !dictionary.has(key)) dictionary.set(key, word);
    }
  }
  const editDistance = (left: string, right: string) => {
    if (Math.abs(left.length - right.length) > 2) return 3;
    const rows = Array.from({ length: left.length + 1 }, (_, row) =>
      Array.from({ length: right.length + 1 }, (_, column) =>
        row === 0 ? column : column === 0 ? row : 0,
      ),
    );
    for (let row = 1; row <= left.length; row++) {
      for (let column = 1; column <= right.length; column++) {
        rows[row]![column] = Math.min(
          rows[row - 1]![column]! + 1,
          rows[row]![column - 1]! + 1,
          rows[row - 1]![column - 1]! + (left[row - 1] === right[column - 1] ? 0 : 1),
        );
        if (
          row > 1 &&
          column > 1 &&
          left[row - 1] === right[column - 2] &&
          left[row - 2] === right[column - 1]
        ) {
          rows[row]![column] = Math.min(rows[row]![column]!, rows[row - 2]![column - 2]! + 1);
        }
      }
    }
    return rows[left.length]![right.length]!;
  };
  let changed = false;
  const corrected = query.replace(/[\p{L}\p{N}]+/gu, (word) => {
    const key = normalized(word);
    if (key.length < 3 || dictionary.has(key) || searchAliases[key]) return word;
    const threshold = key.length >= 7 ? 2 : 1;
    let best: string | undefined;
    let distance = threshold + 1;
    for (const [candidate, display] of dictionary) {
      if (candidate[0] !== key[0]) continue;
      const current = editDistance(key, candidate);
      if (current < distance) {
        best = display;
        distance = current;
      }
    }
    if (!best || distance > threshold) return word;
    changed = true;
    return best;
  });
  if (!changed || !matchingVehicles({ ...filters, q: corrected }).length) return null;
  return corrected;
}
export function vehicleBranchGroups() {
  const branches = unique(vehicles.map((vehicle) => vehicle.branch));
  return [
    {
      label: "București și Ilfov",
      options: branches.filter((branch) => /București|Chitila|Pipera/.test(branch)),
    },
    ...unique(vehicles.map(cityOf))
      .filter((city) => city !== "București" && city !== "Chitila")
      .map((city) => ({
        label: city,
        options: branches.filter((branch) =>
          vehicles.some((vehicle) => vehicle.branch === branch && cityOf(vehicle) === city),
        ),
      })),
  ].map((group) => ({
    label: group.label,
    options: group.options.map((branch) => ({ value: branch, label: branch })),
  }));
}
export function matchingVehicles(s: VehicleSearch, source = vehicles) {
  const resolved = resolveVehicleSearch(s);
  if (resolved.conflict) return [];
  s = resolved.search;
  const queryTerms = s.q ? searchTerms(s.q) : [];
  const min = (key: SearchKey, value: number | null) =>
    !s[key] || (value !== null && value >= Number(s[key]));
  const max = (key: SearchKey, value: number | null) =>
    !s[key] || (value !== null && value <= Number(s[key]));
  const results = source.filter((v) => {
    if (queryTerms.length && !queryTerms.every((term) => vehicleSearchText(v).includes(term)))
      return false;
    if (s.offer && !isSalesOffer(v)) return false;
    if (s.certified === "dwa" && v.certification !== "Das WeltAuto") return false;
    if (
      s.certified &&
      s.certified !== "dwa" &&
      !(v.certification === "Mercedes-Benz Certified" || v.certified)
    )
      return false;
    if (s.color && macroColorOf(v.color) !== s.color) return false;
    if (!min("minRange", v.rangeKm ?? null) || !min("minCharge", v.chargeKw ?? null)) return false;
    if (s.condition && v.condition !== s.condition) return false;
    if (s.brand && v.brand !== s.brand) return false;
    if (s.model && modelOf(v) !== s.model) return false;
    if (s.fuel && (s.fuel === "Hibrid" ? !v.hybrid : v.fuel !== s.fuel || !!v.hybrid)) return false;
    if (s.body && v.bodyType !== s.body && !(s.body === "Limuzină" && v.bodyType === "Sedan"))
      return false;
    if (s.branch && v.branch !== s.branch) return false;
    if (s.city && cityOf(v) !== s.city) return false;
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
      const terms = s.equipment
        .split(",")
        .map((term) => normalized(term.trim()))
        .filter(Boolean);
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
  else if (queryTerms.length)
    results.sort(
      (a, b) =>
        Number(Boolean(a.reserved)) - Number(Boolean(b.reserved)) ||
        searchRelevance(b, s.q!) - searchRelevance(a, s.q!) ||
        a.priceEur - b.priceEur,
    );
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
  city: "Oraș",
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

export type VehicleFilterChip = { id: string; label: string; keys: SearchKey[] };

export function vehicleFilterChips(s: VehicleSearch): VehicleFilterChip[] {
  const chips: VehicleFilterChip[] = [];
  const add = (id: string, label: string, keys: SearchKey[]) => chips.push({ id, label, keys });
  const number = (value: string, group = true) =>
    group ? Number(value).toLocaleString("ro-RO") : String(Number(value));
  const range = (
    id: string,
    min: SearchKey,
    max: SearchKey,
    label: string,
    unit = "",
    group = true,
  ) => {
    const low = s[min];
    const high = s[max];
    if (!low && !high) return;
    const suffix = unit ? ` ${unit}` : "";
    const text =
      low && high
        ? `${number(low, group)}–${number(high, group)}${suffix}`
        : low
          ? `de la ${number(low, group)}${suffix}`
          : `până la ${number(high!, group)}${suffix}`;
    add(id, `${label}: ${text}`, [min, max]);
  };

  if (s.q) add("q", `Căutare: ${s.q}`, ["q"]);
  range("price", "minPrice", "maxPrice", "Preț", "€");
  if (s.condition)
    add("condition", `Stare: ${s.condition === "nou" ? "Noi" : "Rulate"}`, ["condition"]);
  if (s.brand) add("brand", `Marcă: ${s.brand}`, ["brand", "model"]);
  if (s.model) add("model", `Model: ${s.model}`, ["model"]);
  if (s.branch) add("branch", `Sucursală: ${s.branch}`, ["branch"]);
  if (s.city) add("city", `Oraș: ${s.city}`, ["city"]);
  if (s.fuel) add("fuel", `Motorizare: ${s.fuel}`, ["fuel"]);
  if (s.body) add("body", `Caroserie: ${s.body}`, ["body"]);
  range("year", "minYear", "maxYear", "An", "", false);
  range("km", "minKm", "maxKm", "Kilometraj", "km");
  if (s.gearbox) add("gearbox", `Transmisie: ${s.gearbox}`, ["gearbox"]);
  if (s.drive)
    add(
      "drive",
      `Tracțiune: ${{ AWD: "Integrală", FWD: "Față", RWD: "Spate" }[s.drive] || s.drive}`,
      ["drive"],
    );
  if (s.color) add("color", `Culoare: ${s.color}`, ["color"]);
  if (s.certified)
    add(
      "certified",
      `Certificare: ${s.certified === "dwa" ? "Das WeltAuto" : "Mercedes-Benz Certified"}`,
      ["certified"],
    );
  for (const term of (s.equipment || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean))
    add(`equipment-${term}`, term, ["equipment"]);
  range("power", "minPower", "maxPower", "Putere", "CP");
  range("engine", "minEngine", "maxEngine", "Cilindree", "cm³");
  if (s.minRange) add("minRange", `Autonomie: de la ${number(s.minRange)} km`, ["minRange"]);
  if (s.minCharge) add("minCharge", `Încărcare DC: de la ${number(s.minCharge)} kW`, ["minCharge"]);
  if (s.availability)
    add(
      "availability",
      `Disponibilitate: ${
        { immediate: "Livrare imediată", stock: "În stoc", unknown: "De confirmat" }[
          s.availability
        ] || s.availability
      }`,
      ["availability"],
    );
  if (s.vat) add("vat", `TVA: ${s.vat}`, ["vat"]);
  if (s.offer) add("offer", "Cu preț redus", ["offer"]);
  return chips;
}

export function removeVehicleFilterChip(s: VehicleSearch, chip: VehicleFilterChip): VehicleSearch {
  const next = { ...s };
  if (chip.id.startsWith("equipment-")) {
    next.equipment = (next.equipment || "")
      .split(",")
      .filter((term) => term.trim() !== chip.id.slice("equipment-".length))
      .join(",");
  } else for (const key of chip.keys) delete next[key];
  delete next.page;
  return next;
}

export const resetVehicleFilters = (s: VehicleSearch): VehicleSearch =>
  s.sort ? { sort: s.sort } : {};

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
    [/\b(?:rulat[ae]?|uzat[ae]?|second[ -]hand|sh)\b/, "condition", "rulat"],
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
export function resolveVehicleSearch(s: VehicleSearch): {
  search: VehicleSearch;
  conflict: boolean;
} {
  const parsed = interpretQuery(s.q || "");
  const conflict = (["condition", "fuel"] as const).some((key) =>
    Boolean(parsed[key] && s[key] && parsed[key] !== s[key]),
  );
  const search = { ...parsed, ...s, q: parsed.q || "" };
  if (parsed.maxPrice && s.maxPrice)
    search.maxPrice = String(Math.min(Number(parsed.maxPrice), Number(s.maxPrice)));
  return { search, conflict };
}
export function suggestedVehicles(s: VehicleSearch) {
  const parsed = resolveVehicleSearch(s).search;
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
