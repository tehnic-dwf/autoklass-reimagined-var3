import { vehicles } from "./vehicles";
// Local prototype lookup. Production needs the client's VIN identification service.
export const vinVehicles: Record<
  string,
  { brand: string; model: string; year: number; fuel: string }
> = {
  W1NKM5BB1VU149616: { brand: "Mercedes-Benz", model: "GLC", year: 2026, fuel: "Benzină" },
};
export const serviceModels: Record<string, string[]> = {
  "Mercedes-Benz": [
    "Clasa A",
    "Clasa B",
    "Clasa C",
    "CLA",
    "CLE",
    "CLS",
    "Clasa E",
    "Clasa S",
    "GLA",
    "GLB",
    "GLC",
    "GLE",
    "GLS",
    "Clasa G",
    "SL",
    "AMG GT",
    "AMG (toate modelele)",
    "EQA",
    "EQB",
    "EQC",
    "EQE",
    "EQS",
    "Clasa V",
    "Clasa X",
    "Vito",
    "Sprinter",
    "Alt model",
  ],
  ...Object.fromEntries(
    ["Audi", "Volkswagen", "Honda", "XPENG"].map((brand) => [
      brand,
      [
        ...new Set(
          vehicles
            .filter((v) => v.brand === brand)
            .map((v) => v.model || v.title.replace(`${brand} `, "")),
        ),
      ].concat("Alt model"),
    ]),
  ),
};
export function eligibleServiceRateIds(
  brand: string,
  model: string,
  identified?: (typeof vinVehicles)[string],
) {
  if (brand !== "Mercedes-Benz") return [];
  if (["Clasa V", "Clasa X", "Vito", "Sprinter", "Alt model"].includes(model)) return [];
  if (model.startsWith("EQ")) return ["electric"];
  if (model === "AMG (toate modelele)" || model === "AMG GT") return ["premium-under-five"];
  if (identified && new Date().getFullYear() - identified.year > 5) return ["over-five"];
  const premium = [
    "CLS",
    "Clasa S",
    "SL",
    "AMG GT",
    "AMG (toate modelele)",
    "GLE",
    "GLS",
    "Clasa G",
  ].includes(model);
  const standard = [
    "Clasa A",
    "Clasa B",
    "Clasa C",
    "CLA",
    "GLA",
    "GLB",
    "GLC",
    "Clasa E",
  ].includes(model);
  if (!premium && !standard) return [];
  return [
    premium ? "premium-under-five" : "standard-under-five",
    ...(!identified ? ["over-five"] : []),
  ];
}
