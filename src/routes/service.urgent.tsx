import { createFileRoute } from "@tanstack/react-router";

import { OutOfScope } from "@/components/OutOfScope";

export const Route = createFileRoute("/service/urgent")({
  head: () => ({
    meta: [
      { title: "Service auto urgent — flux documentat | Autoklass" },
      {
        name: "description",
        content:
          "Flux pentru reparații neprogramate: contact telefonic imediat, diagnoză rapidă și estimare de cost înainte de orice lucrare.",
      },
      { property: "og:title", content: "Service auto urgent — flux documentat" },
      {
        property: "og:description",
        content:
          "Persona stresată, fără cunoștințe tehnice: prioritate pe telefon, nu pe formular.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <OutOfScope
      title="Service auto urgent (reparație neprogramată)"
      persona="Cineva cu o problemă neașteptată — bec aprins în bord, zgomot suspect —, stresat și fără cunoștințe tehnice, care se teme să fie tratat ca „țintă ușoară”. Vrea un om la telefon, nu un formular de completat. Tonul diferă de Programare Service: mai puține cuvinte, mai direct, fără jargon tehnic."
      notes={[
        "Număr de telefon proeminent, apelabil dintr-un tap, sus pe ecran — înaintea oricărui formular.",
        "Trei întrebări de triaj („poți conduce mașina?”, „ce vezi în bord?”, „de când?”), fiecare cu răspunsul clar despre ce urmează.",
        "Promisiune explicită: diagnoza și estimarea de cost vin înainte de orice intervenție, nu după.",
        "Opțiune de tractare sau ridicare de la fața locului, plus disponibilitatea mașinii de schimb, cu termen concret.",
        "Fără urgentare artificială și fără costuri ascunse: prețul diagnozei e afișat de la primul ecran.",
      ]}
    />
  ),
});
