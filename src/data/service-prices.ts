/**
 * Tarife orientative de service. Cifrele care apar public pe autoklass.ro
 * (pick-up 295 lei, vopsitorie de la 1.000 lei) și estimările deja folosite în
 * fluxul de programare. Restul rândurilor sunt marcate ca „după diagnoză” —
 * nu inventăm prețuri.
 */

export type PriceRow = {
  label: string;
  detail: string;
  /** Preț de intrare, în lei. `null` = se stabilește după verificare. */
  from: number | null;
  /** Cât stă mașina la noi. */
  duration: string;
};

export type PriceGroup = {
  id: string;
  title: string;
  /** Eticheta scurtă, pentru filtrele de pe pagină. */
  short: string;
  intro: string;
  rows: PriceRow[];
};

export const priceGroups: PriceGroup[] = [
  {
    id: "revizii",
    short: "Revizii",
    title: "Revizii și întreținere",
    intro: "Manoperă și verificare completă. Piesele și uleiul se adaugă separat, după model.",
    rows: [
      {
        label: "Revizie periodică",
        detail: "Schimb ulei, filtre, verificare pe 30 de puncte",
        from: 1100,
        duration: "3–4 ore",
      },
      {
        label: "Schimb filtru polen și habitaclu",
        detail: "Inclus în revizie, dacă e programat împreună",
        from: 250,
        duration: "sub o oră",
      },
      {
        label: "Climatizare",
        detail: "Încărcare freon și igienizare",
        from: 450,
        duration: "2 ore",
      },
    ],
  },
  {
    id: "mecanica",
    short: "Mecanică",
    title: "Mecanică și diagnoză",
    intro: "La lucrările fără preț fix, întâi diagnosticăm și abia apoi îți trimitem devizul.",
    rows: [
      {
        label: "Diagnoză electronică",
        detail: "Martor aprins, erori, senzori",
        from: 350,
        duration: "1–2 ore",
      },
      {
        label: "Frâne și suspensie",
        detail: "Plăcuțe, discuri, zgomote la rulare",
        from: null,
        duration: "3–6 ore",
      },
      {
        label: "Distribuție și ambreiaj",
        detail: "Se stabilește după verificarea mașinii",
        from: null,
        duration: "1–2 zile",
      },
    ],
  },
  {
    id: "roti",
    short: "Roți",
    title: "Anvelope și roți",
    intro: "Montaj în service autorizat, cu echilibrare și verificarea presiunii.",
    rows: [
      {
        label: "Schimb sezonier",
        detail: "Patru roți, montaj și echilibrare",
        from: 250,
        duration: "1 oră",
      },
      {
        label: "Geometrie",
        detail: "Reglaj pe standul de aliniere",
        from: 350,
        duration: "1–2 ore",
      },
      {
        label: "Hotel anvelope",
        detail: "Depozitarea setului dat jos, un sezon",
        from: 200,
        duration: "—",
      },
    ],
  },
  {
    id: "caroserie",
    short: "Caroserie",
    title: "Vopsitorie și tinichigerie",
    intro: "Reparăm punctual, în nuanța din fabrică. Estimarea o primești din poze.",
    rows: [
      {
        label: "Vopsire element",
        detail: "Un element, în nuanța originală",
        from: 1000,
        duration: "2–3 zile",
      },
      {
        label: "Retuș zgârieturi",
        detail: "Fără vopsire completă, unde se poate",
        from: null,
        duration: "1 zi",
      },
      {
        label: "Dosar de daună",
        detail: "Constatare, deviz și relația cu asigurătorul",
        from: null,
        duration: "—",
      },
    ],
  },
  {
    id: "mobilitate",
    short: "Mobilitate",
    title: "Cât timp mașina e la noi",
    intro: "Ca să nu rămâi pe jos cât durează lucrarea.",
    rows: [
      {
        label: "Preluare și livrare",
        detail: "Venim după mașină și ți-o aducem înapoi",
        from: 295,
        duration: "—",
      },
      {
        label: "Mașină de schimb",
        detail: "La cerere, în limita flotei disponibile",
        from: null,
        duration: "—",
      },
    ],
  },
];
