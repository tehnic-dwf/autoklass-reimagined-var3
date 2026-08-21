/**
 * Date reale de pe autoklass.ro (august 2026): sucursale, contact, asiguratori,
 * FAQ dosar daună. Textele sunt preluate din paginile publice.
 */

export const contact = {
  phone: "0317 133 333",
  phoneHref: "tel:+40317133333",
  /** Canal alternativ P1: recenziile arată 9,1% „telefon fără răspuns”. */
  whatsapp: "0317 133 333",
  whatsappHref: "https://wa.me/40317133333",
  email: "office@autoklass.ro",
  serviceEmail: "contact@autoklass.ro",
  legalName: "Autoklass Center S.R.L.",
  cui: "RO15134434",
  regCom: "J2003000627408",
};

export type Branch = {
  name: string;
  address: string;
  city: string;
  hasService: boolean;
};

export const branches: Branch[] = [
  {
    name: "Autoklass Chitila",
    address: "Șos. Banatului nr. 2-4, Chitila",
    city: "București",
    hasService: true,
  },
  {
    name: "Autoklass Pipera",
    address: "Șos. București Nord nr. 18, Voluntari",
    city: "București",
    hasService: true,
  },
  {
    name: "Autoklass București Sud",
    address: "Șos. Berceni nr. 104, Popești-Leordeni",
    city: "București",
    hasService: true,
  },
  {
    name: "Autoklass Cluj-Napoca",
    address: "Calea Turzii nr. 235, Cluj-Napoca",
    city: "Cluj-Napoca",
    hasService: true,
  },
  {
    name: "Autoklass Constanța",
    address: "Bd. Aurel Vlaicu nr. 133, Constanța",
    city: "Constanța",
    hasService: true,
  },
  {
    name: "Autoklass Ploiești",
    address: "Str. Ștrandului nr. 61 A, Ploiești",
    city: "Ploiești",
    hasService: true,
  },
  {
    name: "Autoklass Sibiu",
    address: "Șos. Alba-Iulia nr. 69, Sibiu",
    city: "Sibiu",
    hasService: true,
  },
  {
    name: "Autoklass Brașov",
    address: "Calea Brașovului nr. 2A, Ghimbav",
    city: "Brașov",
    hasService: true,
  },
  {
    name: "Autoklass Timișoara",
    address: "Str. Miresei nr. 5, Timișoara",
    city: "Timișoara",
    hasService: true,
  },
];

export type BrandAuthorization = {
  brand: string;
  since: number | null;
  note: string;
  /** Cifră plauzibilă de prototip, nu date reale de stoc. */
  stockCount: number;
};

export const brandAuthorizations: BrandAuthorization[] = [
  {
    brand: "Mercedes-Benz",
    since: 2001,
    note: "Autoturisme, AMG și vehicule comerciale",
    stockCount: 428,
  },
  {
    brand: "smart",
    since: 2008,
    note: "Vânzări și service autorizat",
    stockCount: 34,
  },
  {
    brand: "Honda",
    since: 2011,
    note: "Vânzări și service autorizat",
    stockCount: 61,
  },
  {
    brand: "Volkswagen",
    since: null,
    note: "Reprezentanță autorizată în grupul Autoklass",
    stockCount: 87,
  },
  {
    brand: "Audi",
    since: null,
    note: "Reprezentanță autorizată în grupul Autoklass",
    stockCount: 52,
  },
  {
    brand: "XPENG",
    since: null,
    note: "Reprezentanță autorizată în grupul Autoklass",
    stockCount: 19,
  },
];

/** Cifre din raportul de analiză Autoklass (stoc Mercedes-Benz, august 2026). */
export const stockFacts = {
  totalMercedes: 1172,
  newMercedes: 419,
  usedMercedes: 753,
  yearsOnMarket: 25,
  branchCount: branches.length,
};

export const insurers = [
  {
    name: "Groupama",
    detail:
      "Gestionăm frecvent daune Groupama și ne ocupăm complet de dosar, de la constatare până la aprobare.",
  },
  {
    name: "Allianz-Țiriac",
    detail:
      "Experiență solidă pe dosarele Allianz-Țiriac, cu comunicare directă și procese rapide.",
  },
  {
    name: "Omniasig",
    detail: "Administrăm eficient daunele Omniasig, cu timpi de așteptare reduși.",
  },
  {
    name: "Asirom",
    detail: "Ne ocupăm de daunele Asirom cu suport complet pe tot parcursul dosarului.",
  },
  {
    name: "Generali",
    detail: "Soluționăm rapid orice dosar Generali, cu transparență totală pe fiecare etapă.",
  },
  {
    name: "UNIQA",
    detail: "Simplificăm întregul proces pentru daunele UNIQA, preluând toate formalitățile.",
  },
];

export const damageFaq = [
  {
    q: "În cât timp trebuie să anunț dauna auto?",
    a: "De regulă, în maximum 24–48 de ore de la incident, în funcție de asigurator.",
  },
  {
    q: "Ce documente sunt necesare pentru dosarul de daună?",
    a: "Ai nevoie de constatare amiabilă sau proces-verbal, talon, permis, CI și polița RCA/CASCO.",
  },
  {
    q: "Pot face constatarea fără să merg la poliție?",
    a: "Da, dacă accidentul este ușor și există constatare amiabilă semnată de ambele părți.",
  },
  {
    q: "Cât durează deschiderea și aprobarea dosarului?",
    a: "Deschiderea dosarului se face în câteva ore. Aprobarea depinde de asigurator și se obține de obicei în câteva zile.",
  },
  {
    q: "Primesc mașină la schimb pe RCA?",
    a: "Da, beneficiezi de mașină de schimb pe durata reparației, în limita disponibilității flotei.",
  },
  {
    q: "Ce este decontarea directă?",
    a: "Procedura prin care propriul tău asigurator plătește reparația, chiar dacă vinovat este alt șofer. Primești despăgubirea mai rapid.",
  },
  {
    q: "Pot alege orice service pentru reparație?",
    a: "Da, ai dreptul legal să alegi service-ul unde îți repari mașina.",
  },
  {
    q: "Cât durează reparația mașinii?",
    a: "Depinde de daună și de piese, dar în general între câteva zile și 1-2 săptămâni.",
  },
];
