import { createFileRoute } from "@tanstack/react-router";

import { OutOfScope } from "@/components/OutOfScope";

export const Route = createFileRoute("/buy-back")({
  head: () => ({
    meta: [
      { title: "Îți cumpărăm mașina — flux documentat | Autoklass" },
      {
        name: "description",
        content:
          "Flux buy-back: proces explicat în pași, evaluare cu interval de preț și ofertă asumată, fără formular lung la început.",
      },
      { property: "og:title", content: "Îți cumpărăm mașina — flux documentat" },
      {
        property: "og:description",
        content:
          "Cel mai slab construit flux de pe site-ul actual: formular lung, fără explicație de proces.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <OutOfScope
      title="Îți cumpărăm mașina (buy-back)"
      persona="Proprietar care vrea să știe cât ia pe mașină și cât durează, înainte să dea date personale. Pe site-ul actual, acest flux e cel mai slab construit: formular lung, fără explicație de proces — spre deosebire de Dosar Daune, care are 3 pași expliciți. A fost exclus explicit din runda curentă de scope."
      notes={[
        "Proces explicat înaintea oricărui câmp, în 3 pași: trimiți datele mașinii → evaluare la sucursală → ofertă scrisă, valabilă un număr de zile.",
        "Formular scurt la primul pas — marcă, model, an, kilometraj, telefon. Restul detaliilor abia după evaluare.",
        "Interval de preț estimativ comunicat înainte de vizită, cu explicația factorilor care îl mișcă în sus sau în jos.",
        "Variantă „buy-back în contul unei mașini din stoc”, cu diferența de plată calculată transparent, vizibil pentru client.",
        "Termen asumat pentru fiecare etapă: în cât timp vine oferta și în cât timp se face plata.",
      ]}
    />
  ),
});
