/**
 * Servicii și campanii, preluate de pe autoklass.ro (august 2026).
 * Prețurile și termenele sunt cele publicate public de Autoklass; unde nu
 * există preț afișat, câmpul lipsește — nu inventăm cifre.
 */

export type ServiceCard = {
  slug: string;
  title: string;
  /** Ce câștigă omul, nu ce facem noi. */
  body: string;
  /** Preț de intrare, exact cum e comunicat public. */
  price?: string;
  icon: "wrench" | "shield" | "truck" | "brush" | "disc" | "tag";
  to: "/service/programare" | "/service/dosar-daune" | "/buy-back" | "/autoturisme";
};

/** Ordinea e dictată de marjă: întâi service și daune, apoi restul. */
export const services: ServiceCard[] = [
  {
    slug: "revizie",
    title: "Revizie și reparații",
    body: "Afli ora și costul înainte să lași cheia. Dacă apare ceva în plus, te sunăm întâi.",
    icon: "wrench",
    to: "/service/programare",
  },
  {
    slug: "daune",
    title: "Dosar de daună",
    body: "Vorbim noi cu asigurătorul. Tu aduci mașina și primești una de schimb.",
    icon: "shield",
    to: "/service/dosar-daune",
  },
  {
    slug: "pickup",
    title: "Preluare și livrare",
    body: "Venim după mașină de unde ești și ți-o aducem înapoi. Nu îți iei liber.",
    price: "295 lei",
    icon: "truck",
    to: "/service/programare",
  },
  {
    slug: "vopsitorie",
    title: "Vopsitorie",
    body: "Reparăm doar zona lovită, în nuanța din fabrică. Nu schimbăm elementul degeaba.",
    price: "de la 1.000 lei",
    icon: "brush",
    to: "/service/programare",
  },
  {
    slug: "anvelope",
    title: "Anvelope și roți",
    body: "Montăm, echilibrăm și îți ținem noi setul pe care îl dai jos până la sezonul următor.",
    icon: "disc",
    to: "/service/programare",
  },
  {
    slug: "buyback",
    title: "Evaluarea mașinii tale",
    body: "Îți spunem cât face, în scris. Gratuit, chiar dacă nu cumperi altceva de la noi.",
    icon: "tag",
    to: "/buy-back",
  },
];

export type Campaign = {
  slug: string;
  title: string;
  body: string;
  cta: string;
  to: "/autoturisme" | "/service/programare" | "/buy-back";
  /** Până când e valabilă, exact cum e comunicat public. */
  until?: string;
  /** Numele fișierului din `src/assets/campaigns/`. */
  image: string;
};

export const campaigns: Campaign[] = [
  {
    slug: "pickup",
    title: "Îți luăm mașina de unde ești.",
    body: "O preluăm, o ducem în service și ți-o aducem înapoi. Tu nu îți iei liber.",
    cta: "Cere preluarea",
    to: "/service/programare",
    until: "30 noiembrie 2026",
    image: "pickup.jpg",
  },
  {
    slug: "vopsitorie",
    title: "O zgârietură nu trebuie să coste cât o bară nouă.",
    body: "Reparăm punctual, în nuanța din fabrică, în vopsitoria autorizată.",
    cta: "Cere o estimare",
    to: "/service/programare",
    until: "31 decembrie 2026",
    image: "vopsitorie.jpg",
  },
  {
    slug: "anvelope",
    title: "Schimbi anvelopele o dată și uiți de ele un sezon.",
    body: "Montaj, echilibrare și depozitare pentru setul pe care îl dai jos.",
    cta: "Vezi oferta",
    to: "/service/programare",
    until: "31 decembrie 2026",
    image: "anvelope.jpg",
  },
  {
    slug: "stoc",
    title: "Mașini pe care le poți lua luna asta.",
    body: "Sunt în showroom acum. Fără comandă la fabrică și fără listă de așteptare.",
    cta: "Vezi mașinile",
    to: "/autoturisme",
    image: "stoc.jpg",
  },
];

/** Ce anume se rezolvă la fiecare sucursală — folosit de pagina /sucursale. */
export type BranchNeed = "vanzari" | "service" | "daune" | "vopsitorie";

export const branchNeeds: Record<BranchNeed, { label: string; hint: string }> = {
  vanzari: { label: "Vreau să văd o mașină", hint: "Showroom cu stoc și test drive" },
  service: { label: "Revizie sau reparație", hint: "Service autorizat" },
  daune: { label: "Am o daună", hint: "Constatare și dosar" },
  vopsitorie: { label: "Vopsitorie și tinichigerie", hint: "Vopsitorie autorizată" },
};

/** Ce servicii are fiecare sucursală, după numele din `company.ts`. */
export const branchServices: Record<string, BranchNeed[]> = {
  "Autoklass Chitila": ["vanzari", "service", "daune", "vopsitorie"],
  "Autoklass Pipera": ["vanzari", "service", "daune"],
  "Autoklass București Sud": ["vanzari", "service", "daune", "vopsitorie"],
  "Autoklass Cluj-Napoca": ["vanzari", "service", "daune"],
  "Autoklass Constanța": ["vanzari", "service"],
  "Autoklass Ploiești": ["vanzari", "service", "daune"],
  "Autoklass Sibiu": ["vanzari", "service", "daune", "vopsitorie"],
  "Autoklass Brașov": ["vanzari", "service", "daune"],
  "Autoklass Timișoara": ["vanzari", "service", "daune"],
};
