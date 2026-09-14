/** Customer tariffs transcribed from the user-provided AutoKlass decision 2177,
 * file dated 15 April 2026. See docs/tariff-source-review.md for page mappings.
 * Service intents are separate from rates: hourly labour is not a job total.
 */
export const tariffEffectiveDate = "15 aprilie 2026";
export const serviceBranches = [
  { id: "sud", name: "Autoklass Sud" },
  { id: "pipera", name: "Autoklass Pipera" },
  { id: "chitila", name: "Autoklass Chitila" },
  { id: "constanta", name: "Autoklass Constanța" },
  { id: "ploiesti", name: "Autoklass Ploiești" },
  { id: "sibiu", name: "Autoklass Sibiu" },
  { id: "timisoara", name: "Autoklass Timișoara" },
  { id: "cluj", name: "Autoklass Cluj" },
] as const;
export type ServiceBranchId = (typeof serviceBranches)[number]["id"];
export type ServiceItem = {
  id: string;
  title: string;
  description: string;
};
export const serviceItems: ServiceItem[] = [
  {
    id: "revizie",
    title: "Revizie periodică",
    description: "Lucrările, piesele și consumabilele se stabilesc după VIN și kilometraj.",
  },
  {
    id: "climatizare",
    title: "Climatizare",
    description: "Descrie problema pentru o estimare a lucrărilor necesare.",
  },
  {
    id: "diagnoza",
    title: "Diagnoză și lucrări electrice",
    description: "Identificarea problemei și stabilirea intervenției necesare.",
  },
  {
    id: "frane",
    title: "Verificare sistem de frânare",
    description: "Verificarea frânelor; eventualele piese și reparații se estimează separat.",
  },
  {
    id: "roti",
    title: "Roți și anvelope",
    description: "Precizează dacă dorești schimb de anvelope sau schimb de roți complete.",
  },
  {
    id: "geometrie",
    title: "Geometrie direcție",
    description: "Solicită o estimare pentru măsurarea și reglarea geometriei roților.",
  },
  {
    id: "caroserie",
    title: "Caroserie și vopsitorie",
    description: "Lucrările și materialele necesare se stabilesc după evaluarea mașinii.",
  },
  {
    id: "itp",
    title: "Inspecție tehnică periodică (ITP)",
    description: "Alege categoria mașinii. La Timișoara, inspecția este subcontractată.",
  },
];

export type ServiceRate = {
  id: string;
  title: string;
  group: string;
  description: string;
  note?: string;
  unit: "hour" | "inspection";
  serviceIds: [string, ...string[]];
  prices: Partial<Record<ServiceBranchId, number>>;
};
const everyBranch = (value: number): Record<ServiceBranchId, number> => ({
  sud: value,
  pipera: value,
  chitila: value,
  constanta: value,
  ploiesti: value,
  sibiu: value,
  timisoara: value,
  cluj: value,
});
const maintenanceServices: ServiceRate["serviceIds"] = [
  "revizie",
  "climatizare",
  "frane",
  "geometrie",
];
export const serviceRates: ServiceRate[] = [
  {
    id: "standard-under-five",
    title: "A, B, C, CLA, GLA, GLB, GLC, E",
    group: "Manoperă",
    description: "Autoturisme cu vechime de până la 5 ani inclusiv.",
    note: "Modelele AMG au categorie separată. Pentru vehicule 100% electrice, consultă tariful dedicat.",
    unit: "hour",
    serviceIds: maintenanceServices,
    prices: {
      sud: 500,
      pipera: 500,
      chitila: 480,
      constanta: 480,
      ploiesti: 480,
      sibiu: 450,
      timisoara: 450,
      cluj: 500,
    },
  },
  {
    id: "premium-under-five",
    title: "CLS, S / S Coupé, SL, AMG GT, GLE, GLS, G și AMG",
    group: "Manoperă",
    description: "Autoturisme cu vechime de până la 5 ani inclusiv; toate modelele AMG.",
    note: "Pentru vehicule 100% electrice, consultă tariful dedicat.",
    unit: "hour",
    serviceIds: maintenanceServices,
    prices: {
      sud: 600,
      pipera: 600,
      chitila: 580,
      constanta: 580,
      ploiesti: 580,
      sibiu: 550,
      timisoara: 550,
      cluj: 580,
    },
  },
  {
    id: "over-five",
    title: "Autoturisme mai vechi de 5 ani",
    group: "Manoperă",
    description: "Toate modelele de turisme, conform categoriei de vechime din lista de tarife.",
    note: "Pentru un vehicul 100% electric mai vechi de 5 ani, echipa service confirmă categoria aplicabilă.",
    unit: "hour",
    serviceIds: maintenanceServices,
    prices: everyBranch(450),
  },
  {
    id: "electric",
    title: "Autoturisme 100% electrice",
    group: "Manoperă",
    description: "Tarif dedicat manoperei pentru vehicule complet electrice.",
    note: "Pentru un vehicul mai vechi de 5 ani, echipa service confirmă categoria aplicabilă.",
    unit: "hour",
    serviceIds: maintenanceServices,
    prices: everyBranch(800),
  },
  {
    id: "diagnostics",
    title: "Diagnoză, lucrări electrice și reparații agregate",
    group: "Diagnoză",
    description: "Toate modelele de turisme, indiferent de vechime.",
    note: "Pentru diagnoza electronică fără reparație în Autoklass, solicită o estimare separată.",
    unit: "hour",
    serviceIds: ["diagnoza"],
    prices: everyBranch(650),
  },
  {
    id: "bodywork",
    title: "Tinichigerie și vopsitorie",
    group: "Caroserie",
    description: "Reparații la autoturisme avariate, cu plata de către client. Toate modelele.",
    note: "Piesele, materialele și numărul de ore se stabilesc în deviz.",
    unit: "hour",
    serviceIds: ["caroserie"],
    prices: everyBranch(500),
  },
  {
    id: "itp-mas",
    title: "ITP autoturism MAS și MAS CAT",
    group: "ITP",
    description: "Inspecția inițială pentru categoria MAS / MAS CAT din lista de tarife.",
    note: "Revenirile și vehiculele de taximetrie sau transport alternativ au tarife separate. Categoria se confirmă după datele mașinii.",
    unit: "inspection",
    serviceIds: ["itp"],
    prices: { sud: 240, chitila: 200, constanta: 140, sibiu: 200, timisoara: 297 },
  },
  {
    id: "itp-mac",
    title: "ITP autoturism MAC și 4 × 4",
    group: "ITP",
    description: "Inspecția inițială pentru categoria MAC / 4 × 4 din lista de tarife.",
    note: "Revenirile și vehiculele de taximetrie sau transport alternativ au tarife separate. Categoria se confirmă după datele mașinii.",
    unit: "inspection",
    serviceIds: ["itp"],
    prices: { sud: 240, chitila: 200, constanta: 170, sibiu: 200, timisoara: 297 },
  },
];
export const serviceName = (id: string) =>
  serviceItems.find((s) => s.id === id)?.title || "Alt serviciu";
export const branchName = (id: string) =>
  serviceBranches.find((s) => s.id === id)?.name || "Sucursală de ales";
export const ratePrice = (rate: ServiceRate, branch: string) =>
  rate.prices[branch as ServiceBranchId];
export const rateUnit = (rate: ServiceRate) => (rate.unit === "hour" ? "lei/oră" : "lei/inspecție");
