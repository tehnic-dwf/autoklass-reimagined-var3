import type { VehicleSearch } from "@/lib/vehicle-search";
import { salesOfferSlugs } from "./sales-offers";
// Editorial selections: marketing can add rails and choose the exact vehicle order here.
export const autoOfferSelections: {
  id: string;
  title: string;
  search: VehicleSearch;
  slugs: string[];
}[] = [
  {
    id: "vanzari",
    title: "Oferte vânzări",
    search: { offer: "yes" },
    slugs: [...salesOfferSlugs],
  },
];
// Public Autoklass campaigns checked 2026-09-25. Preserve scope and expiry per campaign.
export const serviceOffers = [
  {
    title: "Service Timișoara",
    benefit: "−25%",
    benefitLabel: "la manoperă",
    description: "Reduceri și la ulei și piese, în funcție de intervalul programării.",
    terms: "Până la 30 septembrie 2026 · conform condițiilor campaniei",
    href: "https://www.autoklass.ro/articole/oferta-service-timisoara.html",
  },
  {
    title: "Verificare Honda",
    benefit: "Gratuit",
    benefitLabel: "verificare în 20 de puncte",
    description: "20% reducere la piese de întreținere și 10% la manoperă.",
    terms: "Pentru modelele Honda · vezi condițiile ofertei",
    href: "https://www.autoklass.ro/articole/verificare-gratuita-honda.html",
  },
  {
    title: "Pick-up service",
    benefit: "295 lei",
    benefitLabel: "TVA inclus",
    description: "Preluăm și livrăm mașina pentru vizita în service.",
    terms: "Serviciu suplimentar · se adaugă la factura de service",
    href: "https://www.autoklass.ro/articole/pick-up-service.html",
  },
];
