/** Model source: Mercedes-Benz Romania GLC SUV X254 overview, checked 2026-09-11.
 * Stock sample: V2's June 2026 GLC 200 entry, NOT a live offer.
 * Official model photos (2025 media) are illustrative, not this inventory vehicle.
 * 'demo' equipment is an explicitly illustrative selection, never actual fitment.
 */
export const demoSlug = "mercedes-benz-glc-200-4matic-vu149616";
export const modelSource =
  "https://www.mercedes-benz.ro/passengercars/models/suv/glc/overview.html";
export const normalized = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
export type EquipmentItem = {
  name: string;
  group: string;
  status: "series" | "demo" | "optional";
  aliases: string;
  detail: string;
};
export const equipment: EquipmentItem[] = [
  {
    name: "Transmisie 9G-TRONIC",
    group: "Tehnică",
    status: "series",
    aliases: "automata cutie 9 trepte",
    detail: "Transmisie automată cu 9 trepte, conform datelor modelului.",
  },
  {
    name: "Tracțiune integrală 4MATIC",
    group: "Tehnică",
    status: "series",
    aliases: "AWD integrala",
    detail: "Tracțiunea versiunii GLC 200 4MATIC.",
  },
  {
    name: "DIGITAL LIGHT",
    group: "Siguranță și asistență",
    status: "optional",
    aliases: "LED faruri lumini",
    detail: "Sistem de iluminare adaptiv.",
  },
  {
    name: "Scaune față multicontur",
    group: "Confort și interior",
    status: "optional",
    aliases: "scaun masaj suport lombar",
    detail: "Suport lombar reglabil și funcții de masaj.",
  },
  {
    name: "Pachet tehnic AIRMATIC",
    group: "Tehnică",
    status: "optional",
    aliases: "suspensie pneumatica directie spate",
    detail: "Suspensie pneumatică pentru adaptarea confortului la drum.",
  },
  {
    name: "Pachet AIR-BALANCE",
    group: "Confort și interior",
    status: "optional",
    aliases: "parfum filtrare aer ionizare",
    detail:
      "Opțiune prezentată pentru model; disponibilitatea se confirmă pentru configurația aleasă.",
  },
];
export const officialImages = [
  {
    src: "https://www.mercedes-benz.ro/content/dam/hq/passengercars/cars/glc/glc-suv-x254-fl-pi/overview/spa-highlights/02-2025/images/mercedes-benz-glc-suv-x254-spa-highlights-cockpit-2400x2400-02-2025.jpg?im=Resize,width=1200",
    label: "Interior GLC",
    kind: "Interior",
  },
  {
    src: "https://www.mercedes-benz.ro/content/dam/hq/passengercars/cars/glc/glc-suv-x254-fl-pi/overview/spa-highlights/02-2025/images/mercedes-benz-glc-suv-x254-spa-highlights-exterior-2400x2400-02-2025.jpg?im=Resize,width=1200",
    label: "Exterior GLC",
    kind: "Exterior",
  },
  {
    src: "https://media.oneweb.mercedes-benz.com/images/static/v1/26141/b/93/8b09c6a1b126a082c76b1452bb4e8f922f4fa.jpg",
    label: "Detaliu DIGITAL LIGHT",
    kind: "Detalii",
  },
];
export type Consultant = { name: string; role: string; photo: string };
export const assignedConsultant: Consultant | null = null;
