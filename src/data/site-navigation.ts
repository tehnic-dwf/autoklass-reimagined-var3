type NavigationItemBase = {
  label: string;
  section?: string;
  footer?: boolean;
};

export type SiteNavItem = NavigationItemBase &
  (
    | {
        kind: "internal";
        to:
          | "/"
          | "/autoturisme"
          | "/service/tarife"
          | "/service/programare"
          | "/comparatie"
          | "/contact";
        search?: { condition?: "nou" | "rulat"; brand?: string };
        hash?: string;
      }
    | { kind: "external"; href: string }
  );

export type SiteNavGroup = {
  id: "autovehicule" | "service" | "mobilitate" | "piese" | "autoklass";
  label: string;
  description: string;
  items: SiteNavItem[];
};

const LIVE = "https://www.autoklass.ro";
const PARTS = "https://piese.autoklass.ro";

/** Core V3 journeys remain local; the rest of the inventory links to the live sites. */
export const primaryNavigation: SiteNavItem[] = [
  {
    kind: "internal",
    label: "Autoturisme noi",
    to: "/autoturisme",
    search: { condition: "nou" },
    section: "Alege o mașină",
    footer: true,
  },
  {
    kind: "internal",
    label: "Autoturisme rulate",
    to: "/autoturisme",
    search: { condition: "rulat" },
    section: "Alege o mașină",
    footer: true,
  },
  {
    kind: "internal",
    label: "Tarife service",
    to: "/service/tarife",
    section: "Vizita în service",
    footer: true,
  },
];

export const serviceAppointment: SiteNavItem = {
  kind: "internal",
  label: "Programare service",
  to: "/service/programare",
  section: "Vizita în service",
  footer: true,
};

/** Inventory checked against Autoklass navigation and homepage on 14 September 2026. */
export const siteNavigation: SiteNavGroup[] = [
  {
    id: "autovehicule",
    label: "Mașini",
    description: "Mărci, oferte, buy-back și test drive.",
    items: [
      ...primaryNavigation.filter((item) => item.kind === "internal" && item.to === "/autoturisme"),
      {
        kind: "internal",
        label: "Compară mașinile salvate",
        to: "/comparatie",
        section: "Alege o mașină",
      },
      {
        kind: "internal",
        label: "Mercedes-Benz",
        to: "/autoturisme",
        search: { brand: "Mercedes-Benz" },
        section: "Mărci și vehicule comerciale",
      },
      {
        kind: "external",
        label: "Autoutilitare Mercedes-Benz",
        href: `${LIVE}/autoutilitare-noi-mercedes`,
        section: "Mărci și vehicule comerciale",
        footer: true,
      },
      {
        kind: "internal",
        label: "Audi",
        to: "/autoturisme",
        search: { brand: "Audi" },
        section: "Mărci și vehicule comerciale",
      },
      {
        kind: "internal",
        label: "Volkswagen",
        to: "/autoturisme",
        search: { brand: "Volkswagen" },
        section: "Mărci și vehicule comerciale",
      },
      {
        kind: "internal",
        label: "XPENG",
        to: "/autoturisme",
        search: { brand: "XPENG" },
        section: "Mărci și vehicule comerciale",
      },
      {
        kind: "internal",
        label: "Honda",
        to: "/autoturisme",
        search: { brand: "Honda" },
        section: "Mărci și vehicule comerciale",
      },
      {
        kind: "external",
        label: "Mercedes-Benz Certified",
        href: `${LIVE}/search/filtre/mercedes-certified-da`,
        section: "Oferte și achiziție",
      },
      {
        kind: "external",
        label: "Campanii și oferte auto",
        href: `${LIVE}/campanii`,
        section: "Oferte și achiziție",
        footer: true,
      },
      {
        kind: "external",
        label: "Buy-back și trade-in",
        href: `${LIVE}/articole/cumparam.html`,
        section: "Oferte și achiziție",
      },
      {
        kind: "external",
        label: "Programare test drive",
        href: `${LIVE}/articole/programare-test-drive.html`,
        section: "Înainte să cumperi",
      },
      {
        kind: "external",
        label: "Comandă personalizată",
        href: `${LIVE}/articole/comanda-personalizata.html`,
        section: "Oferte și achiziție",
      },
      {
        kind: "internal",
        label: "Cum soliciți o ofertă",
        to: "/",
        hash: "cauta-masina",
        section: "Oferte și achiziție",
      },
    ],
  },
  {
    id: "service",
    label: "Service & daune",
    description: "Tarife, programări, daune și garanție.",
    items: [
      ...primaryNavigation.filter(
        (item) => item.kind === "internal" && item.to === "/service/tarife",
      ),
      serviceAppointment,
      {
        kind: "external",
        label: "Gestionarea daunelor",
        href: `${LIVE}/articole/gestionarea-daunelor.html`,
        section: "Reparații și întreținere",
        footer: true,
      },
      {
        kind: "external",
        label: "Vopsitorie",
        href: `${LIVE}/articole/servicii-vopsitorie.html`,
        section: "Reparații și întreținere",
      },
      {
        kind: "external",
        label: "Servicii și oferte sezoniere",
        href: `${LIVE}/servicii-sezoniere`,
        section: "Reparații și întreținere",
        footer: true,
      },
      {
        kind: "external",
        label: "Anvelope și roți complete",
        href: `${LIVE}/articole/anvelope-roti-complete.html`,
        section: "Reparații și întreținere",
      },
      {
        kind: "external",
        label: "Garanție extinsă",
        href: `${LIVE}/garantie-extinsa`,
        section: "Garanție și verificări",
      },
      {
        kind: "external",
        label: "Scanner 3D",
        href: `${LIVE}/servicii/exclusiv-scanner-3d`,
        section: "Garanție și verificări",
      },
      {
        kind: "external",
        label: "Predare chei · Key Drop-off Box",
        href: `${LIVE}/articole/key-drop-off-box.html`,
        section: "Vizita în service",
      },
    ],
  },
  {
    id: "mobilitate",
    label: "Închirieri și asistență rutieră",
    description: "Pick-up, închirieri și asistență rutieră.",
    items: [
      {
        kind: "external",
        label: "Închirieri auto · Axis Rent",
        href: "https://axisrent.ro/",
        footer: true,
      },
      {
        kind: "external",
        label: "Preluare și livrare · Pick-up Service",
        href: `${LIVE}/articole/pick-up-service.html`,
        footer: true,
      },
      {
        kind: "external",
        label: "Asistență rutieră · Mobilo",
        href: `${LIVE}/articole/mobilo.html`,
        footer: true,
      },
      {
        kind: "external",
        label: "Asistență autoutilitare · MobiloVan",
        href: `${LIVE}/articole/mobilo-van.html`,
      },
    ],
  },
  {
    id: "piese",
    label: "Piese și accesorii",
    description: "Piese, jante, anvelope și accesorii.",
    items: [
      {
        kind: "external",
        label: "Piese originale și aftermarket",
        href: PARTS,
        footer: true,
      },
      {
        kind: "external",
        label: "Accesorii de colecție",
        href: `${PARTS}/accesorii-de-colectie`,
        footer: true,
      },
      {
        kind: "external",
        label: "Accesorii interior și exterior",
        href: `${PARTS}/accesorii-interior-exterior`,
        footer: true,
      },
      {
        kind: "external",
        label: "Jante și anvelope",
        href: `${PARTS}/jante-anvelope`,
        footer: true,
      },
      {
        kind: "external",
        label: "Întreținere și cosmetică auto",
        href: `${PARTS}/intretinere-cosmetica`,
      },
      { kind: "external", label: "Ulei de motor", href: `${PARTS}/ulei-motor` },
      { kind: "external", label: "Filtre", href: `${PARTS}/filtre` },
    ],
  },
  {
    id: "autoklass",
    label: "Autoklass",
    description: "Sucursale, contact și informații despre companie.",
    items: [
      { kind: "external", label: "Sucursale", href: `${LIVE}/sucursale`, footer: true },
      {
        kind: "external",
        label: "Despre Autoklass",
        href: `${LIVE}/articole/despre-noi.html`,
        footer: true,
      },
      {
        kind: "internal",
        label: "Contact",
        to: "/contact",
        footer: true,
      },
      {
        kind: "external",
        label: "Responsabilitate socială",
        href: `${LIVE}/articole/corporate-social-responsibility.html`,
      },
      {
        kind: "external",
        label: "Parteneriate",
        href: `${LIVE}/articole/parteneriate.html`,
      },
      { kind: "external", label: "Cariere", href: `${LIVE}/formular-angajare` },
      { kind: "external", label: "Noutăți", href: `${LIVE}/stiri`, footer: true },
    ],
  },
];
