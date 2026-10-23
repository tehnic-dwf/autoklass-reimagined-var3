import type { Vehicle } from "./vehicles";

// Editorial selection for the sales-offer rail. A reduced price alone does not
// mean that a vehicle participates in an Autoklass sales offer.
export const salesOfferSlugs = [
  "mercedes-benz-glc-200-4matic-vu149616",
  "mercedes-benz-glc-220-d-4matic-coupe-tf644939",
  "mercedes-benz-glc-300-e-4matic-coupe-vf646152",
  "mercedes-amg-gle-53-4matic-tb534181",
  "mercedes-benz-clasa-a-200-limuzina-pj413906",
  "mercedes-benz-clasa-a-180-d-1n258044",
  "mercedes-benz-e-300-e-4matic-va311764",
] as const;

const salesOfferSet = new Set<string>(salesOfferSlugs);

export const isSalesOffer = (vehicle: Vehicle) =>
  !vehicle.reserved && salesOfferSet.has(vehicle.slug);
