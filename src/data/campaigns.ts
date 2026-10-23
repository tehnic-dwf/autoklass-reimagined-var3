import startHero from "@/assets/campaigns/start-hero.webp";
import startA from "@/assets/campaigns/start-a.webp";
import startGla from "@/assets/campaigns/start-gla.webp";
import startC from "@/assets/campaigns/start-c.webp";
import winterHero from "@/assets/campaigns/winter-hero.webp";
import winterGla from "@/assets/campaigns/winter-gla.webp";
import winterGlb from "@/assets/campaigns/winter-glb.webp";
import winterGlc from "@/assets/campaigns/winter-glc.webp";
import winterGle from "@/assets/campaigns/winter-gle.webp";
import winterGls from "@/assets/campaigns/winter-gls.webp";

export type Campaign = {
  slug: string;
  name: string;
  headline: string;
  intro: string;
  hero: string;
  heroAlt: string;
  notice: string;
  modelIntro: string;
  source: string;
  period: string;
  benefits: { title: string; text: string }[];
  models: {
    name: string;
    image: string;
    description: string;
    amount: string;
    amountLabel: string;
    detail: string;
  }[];
  faqs: { question: string; answer: string }[];
};
export const campaigns: Record<string, Campaign> = {
  "mercedes-benz-start-up-editions": {
    slug: "mercedes-benz-start-up-editions",
    name: "Start-Up Editions",
    headline: "Un Mercedes-Benz. Trei moduri de a-l alege.",
    intro:
      "Clasa A, GLA sau Clasa C. Descoperă echipările Start-Up Edition și alege modelul potrivit pentru tine.",
    hero: startHero,
    heroAlt: "Interior Mercedes-Benz, cu instrumentar digital și iluminare ambientală",
    notice: "Oferta publicată s-a încheiat la 30.09.2026.",
    period: "24 iulie – 30 septembrie 2026",
    modelIntro:
      "Compară prețurile și echipările. Valorile de mai jos sunt cele ale campaniei încheiate, cu TVA inclus.",
    source: "https://www.autoklass.ro/articole/mercedes-benz-start-up-editions.html",
    benefits: [
      { title: "Confort", text: "Scaune față încălzite pe cele trei modele." },
      { title: "Conectivitate", text: "Integrare smartphone pe Clasa A și GLA." },
      { title: "Parcare", text: "PARKTRONIC în echiparea fiecărui model." },
      { title: "Finanțare", text: "Leasing Agility, cu o calculație individuală." },
    ],
    models: [
      {
        name: "Clasa A 180",
        image: startA,
        description: "Compactă, pentru ritmul orașului.",
        amount: "36.357,16 €",
        amountLabel: "Preț în campanie · TVA inclus",
        detail: "Progressive Advanced · 7G-DCT",
      },
      {
        name: "GLA 180",
        image: startGla,
        description: "Format SUV, pentru fiecare zi.",
        amount: "42.954,41 €",
        amountLabel: "Preț în campanie · TVA inclus",
        detail: "Progressive Advanced · Haion EASY-PACK",
      },
      {
        name: "Clasa C 180",
        image: startC,
        description: "O berlină pentru drumuri lungi.",
        amount: "45.227,32 €",
        amountLabel: "Preț în campanie · TVA inclus",
        detail: "Avantgarde Advanced Plus · 9G-TRONIC",
      },
    ],
    faqs: [
      {
        question: "Mai este valabilă această campanie?",
        answer:
          "Perioada publicată s-a încheiat la 30 septembrie 2026. Pentru ofertele disponibile acum, discută cu un consultant Autoklass.",
      },
      {
        question: "Pot solicita o variantă de finanțare?",
        answer:
          "Da. Consultantul poate verifica o calculație Agility pentru modelul ales. Rata, avansul, durata și costurile se confirmă în oferta individuală.",
      },
      {
        question: "Mașina din fotografie este cea disponibilă?",
        answer:
          "Imaginile sunt de prezentare. Configurația și disponibilitatea se verifică pentru fiecare autovehicul.",
      },
    ],
  },
  "suv-winter-edition": {
    slug: "suv-winter-edition",
    name: "SUV Winter Edition",
    headline: "Următorul tău SUV. Cu avantaje pentru iarnă.",
    intro:
      "Avantaj financiar de până la 8.470 € cu TVA inclus, pentru GLS, și un pachet de servicii pentru modelele participante.",
    hero: winterHero,
    heroAlt: "Mercedes-Benz GLS, GLE și GLC într-un peisaj montan de iarnă",
    notice: "Beneficiile depind de model și de echipare.",
    period: "1 septembrie – 31 decembrie 2026 (pachetul de service)",
    modelIntro:
      "Cinci modele, avantaje diferite. Sumele includ TVA și se aplică edițiilor menționate.",
    source: "https://www.autoklass.ro/articole/suv-winter-edition.html",
    benefits: [
      { title: "2 revizii", text: "Incluse în contractul de service." },
      { title: "Până la 48 luni", text: "Garanție extinsă, în limita a 200.000 km." },
      { title: "14% avantaj", text: "Pentru roți complete de iarnă compatibile." },
      { title: "2 ani", text: "Asigurare anvelope, plus hotel și montaj incluse." },
    ],
    models: [
      {
        name: "GLA",
        image: winterGla,
        description: "SUV compact.",
        amount: "Până la 5.699 €",
        amountLabel: "Avantaj financiar · TVA inclus",
        detail: "Start-Up: 5.699 € · Drive Me / Sport Design: 3.933 €",
      },
      {
        name: "GLB",
        image: winterGlb,
        description: "Spațiu și versatilitate.",
        amount: "1.452 €",
        amountLabel: "Avantaj financiar · TVA inclus",
        detail: "Model participant: X248",
      },
      {
        name: "GLC SUV / Coupé",
        image: winterGlc,
        description: "Confort în fiecare călătorie.",
        amount: "5.445 €",
        amountLabel: "Avantaj financiar · TVA inclus",
        detail: "Drive Me sau Sport Design · X/C254",
      },
      {
        name: "GLE SUV / Coupé",
        image: winterGle,
        description: "Spațiu pentru planuri mari.",
        amount: "6.665 €",
        amountLabel: "Avantaj financiar · TVA inclus",
        detail: "Sport Design · V/C167 pre-facelift",
      },
      {
        name: "GLS",
        image: winterGls,
        description: "Confort la scară mare.",
        amount: "8.470 €",
        amountLabel: "Avantaj financiar · TVA inclus",
        detail: "X167 pre-facelift",
      },
    ],
    faqs: [
      {
        question: "Ce modele sunt eligibile?",
        answer:
          "GLA, GLB, GLC, GLE și GLS, în versiunile indicate mai sus. Consultantul verifică eligibilitatea configurației alese.",
      },
      {
        question: "Ce trebuie verificat pentru roțile de iarnă?",
        answer: "Compatibilitatea cu modelul și dimensiunea roților, precum și stocul disponibil.",
      },
      {
        question: "Pot primi și o ofertă de finanțare?",
        answer:
          "Poți cere o calculație individuală. Condițiile diferă în funcție de model și necesită aprobarea finanțatorului.",
      },
    ],
  },
};
