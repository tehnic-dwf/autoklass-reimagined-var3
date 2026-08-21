import { createFileRoute } from "@tanstack/react-router";

import { OutOfScope } from "@/components/OutOfScope";

export const Route = createFileRoute("/in-afara-scopului")({
  head: () => ({
    meta: [
      { title: "Secțiune documentată, în afara prototipului | Autoklass" },
      {
        name: "description",
        content:
          "Secțiune păstrată în navigație pentru arhitectura completă a site-ului, dar neconstruită în runda curentă de prototip.",
      },
      { property: "og:title", content: "Secțiune în afara prototipului" },
      {
        property: "og:description",
        content:
          "Navigația reflectă structura completă autoklass.ro; această secțiune nu face parte din ecranele prototipate.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <OutOfScope
      title="O secțiune care există în meniu, dar nu și în acest prototip."
      persona="Cineva care explorează meniul complet, așa cum arată azi site-ul: caută o categorie secundară — piese, finanțare, blog, despre noi. Nu vrea să dea peste un link mort, ci să înțeleagă că zona există în arhitectură și unde poate merge în schimb."
      notes={[
        "Structura de navigație rămâne cea reală: categoriile principale nu se simplifică, doar fluxurile-cheie sunt prototipate.",
        "Fiecare grup din meniu duce către cel puțin un ecran real, ca vizitatorul să nu rămână în gol.",
        "La construcția completă, fiecare secțiune primește propriul ton: informativ pentru piese și finanțare, editorial pentru blog, factual pentru sucursale și cariere.",
        "Până atunci, telefonul, WhatsApp-ul și programarea service rămân disponibile din orice pagină.",
      ]}
    />
  ),
});
