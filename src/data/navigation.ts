/**
 * Arhitectura de navigație: 4 grupuri, organizate pe intenție (nu pe
 * departamentele interne ale dealerului):
 *   1. Autovehicule  — tot ce ține de cumpărare (stoc, mărci, încredere)
 *   2. Service & daune — tot ce ține de reparație
 *   3. Servicii — finanțare, test drive, mobilitate
 *   4. Piese și accesorii
 *
 * `section` = subtitlu de coloană în dropdown-ul de desktop / grupare în burger.
 * `prototyped: true` = ecran construit în runda curentă.
 */

export type NavLink = {
  label: string;
  to: string;
  hash?: string;
  hint?: string;
  /** Subtitlu de coloană în dropdown. */
  section?: string;
  /** Ecran construit în prototip (evidențiat vizual în meniu). */
  prototyped?: boolean;
};

export type NavGroup = {
  label: string;
  /** Link direct când grupul nu are copii. */
  to?: string;
  hash?: string;
  prototyped?: boolean;
  items?: NavLink[];
};

const OUT = "/in-afara-scopului";

export const navigation: NavGroup[] = [
  {
    label: "Autovehicule",
    items: [
      // ── Stoc ────────────────────────────────────────────────
      {
        section: "Stoc",
        label: "Tot stocul: noi și rulate",
        to: "/autoturisme",
        hint: "listă unificată, același ecran",
        prototyped: true,
      },
      {
        section: "Stoc",
        label: "Mașini noi",
        to: "/autoturisme",
        prototyped: true,
      },
      {
        section: "Stoc",
        label: "Mașini rulate",
        to: "/autoturisme",
        prototyped: true,
      },

      {
        section: "Stoc",
        label: "Disponibile imediat",
        to: "/autoturisme",
        hint: "fără timp de așteptare",
        prototyped: true,
      },
      { section: "Stoc", label: "Campanii și oferte", to: OUT },

      // ── Mărci ───────────────────────────────────────────────
      {
        section: "Mărci",
        label: "Mercedes-Benz",
        to: "/autoturisme",
        hint: "428 în stoc",
        prototyped: true,
      },
      { section: "Mărci", label: "smart", to: OUT },
      { section: "Mărci", label: "Honda", to: OUT },
      { section: "Mărci", label: "Volkswagen · Audi", to: OUT },
      { section: "Mărci", label: "XPENG (electrice)", to: OUT },
      { section: "Mărci", label: "Vehicule comerciale", to: OUT },

      // ── Înainte să cumperi ──────────────────────────────────
      {
        section: "Înainte să cumperi",
        label: "Cum verificăm rulatele",
        to: "/verificare-masini-rulate",
        hint: "100+ puncte de control",
        prototyped: true,
      },
      {
        section: "Înainte să cumperi",
        label: "Compară mașinile salvate",
        to: "/comparatie",
        hint: "fără grabă, fără presiune",
        prototyped: true,
      },
      {
        section: "Înainte să cumperi",
        label: "Cum funcționează procesul",
        to: "/",
        hash: "cum-functioneaza",
        hint: "5 pași, fără surprize",
        prototyped: true,
      },
      {
        section: "Înainte să cumperi",
        label: "Îți cumpărăm mașina",
        to: "/buy-back",
        hint: "evaluare cu interval de preț",
      },
    ],
  },
  {
    label: "Service & daune",
    items: [
      {
        section: "Programează",
        label: "Găsește o sucursală",
        to: "/sucursale",
        hint: "după oraș și după ce ai nevoie",
        prototyped: true,
      },
      {
        section: "Programează",
        label: "Tarife service",
        to: "/service/tarife",
        hint: "cât costă și cât durează",
        prototyped: true,
      },
      {
        section: "Programează",
        label: "Programare service",
        to: "/service/programare",
        hint: "confirmare în max. 2 ore",
        prototyped: true,
      },
      {
        section: "Programează",
        label: "Service urgent",
        to: "/service/urgent",
        hint: "telefon direct, azi",
      },
      {
        section: "Daune",
        label: "Dosar daună",
        to: "/service/dosar-daune",
        hint: "decontare directă",
        prototyped: true,
      },
      { section: "Daune", label: "Tinichigerie și vopsitorie", to: OUT },
      { section: "Lucrări", label: "Revizii și pachete fixe", to: OUT },
      { section: "Lucrări", label: "Garanție și verificări", to: OUT },
    ],
  },
  {
    label: "Servicii",
    items: [
      {
        label: "Test drive",
        to: "/autoturisme",
        hint: "din pagina mașinii",
        prototyped: true,
      },
      { label: "Finanțare și leasing", to: OUT },
      { label: "Asigurări", to: OUT },
      { label: "Pick-up & delivery", to: OUT },
      { label: "Mașină de schimb", to: OUT },
      { label: "Închirieri auto", to: OUT },
    ],
  },
  {
    label: "Piese și accesorii",
    items: [
      { label: "Piese originale", to: OUT },
      { label: "Accesorii și personalizare", to: OUT },
      { label: "Anvelope și hotel anvelope", to: OUT },
    ],
  },
];
