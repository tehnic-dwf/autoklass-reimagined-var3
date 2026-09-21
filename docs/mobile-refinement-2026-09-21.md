# Autoklass V3 — revizie mobil, 21 septembrie 2026

Implementare locală. Nu s-a făcut commit, push sau publicare.

## Cerințe și verificare

| Cerință | Implementare / dovadă |
| --- | --- |
| Cinci mărci cu logo | Fișierele atașate sunt folosite în secțiunea dedicată. Toate cele cinci linkuri duc în catalogul local cu marca selectată. |
| Video fără control vizibil | Autoplay, muted, loop, playsInline. Redarea în viewport și absența controalelor au fost verificate în browser. |
| Oferte pe homepage | Selecție de mașini cu preț redus, link spre filtrul de oferte, oferta Pick-up Service cu link la condițiile oficiale. |
| Filtre comune | Homepage și panoul catalogului folosesc aceleași componente: buget, marcă, stare, model, an, kilometraj, motorizare, caroserie, apoi criterii secundare. Intervalele sunt selectabile; nu există câmpuri numerice libere. |
| Search | Sugestii de modele, interpretarea unor expresii uzuale în română (ex. „Mercedes GLC rulat sub 60k”), variante apropiate când nu există rezultate exacte. Nu este un motor AI semantic general. |
| Filtrare dinamică | Modelele depind de marcă; combustibilul, caroseria, transmisia, tracțiunea, culoarea și sucursala depind de mașinile compatibile. |
| Catalog sticky | Căutarea, filtrele și sortarea rămân la top: 0 pe mobil. Headerul principal se derulează cu pagina. |
| Numărătoare și paginare | 8 mașini/pagină, interval afișat din total, pagini numerotate. Preț crescător/descrescător, kilometraj și an fabricație. |
| Meniu | Mașini și Service au acțiuni directe vizibile; restul serviciilor sunt grupate în secțiuni extensibile. Header: căutare auto, programare service, meniu. |
| Produs exemplu | `/autoturisme/mercedes-benz-glc-200-4matic-vu149616`. Nume, preț/TVA, sucursală și specificații esențiale înaintea galeriei pe mobil. |
| Finanțare | Leasing 1.050,29 €/lună și rată 1.060,46 €/lună, conform fișei sursă. Fără avans, dobândă sau durată inventate. Solicitarea ofertei rămâne CTA-ul principal. |
| Echipare completă | 102 poziții codificate din descrierea sursă, repartizate fără omisiuni în grupuri tematice, plus dotările generale. Căutare după denumire sau cod. 26 date tehnice/de identificare și 14 fotografii. |
| Locație | Hartă pentru Autoklass București Sud, Splaiul Unirii 166 A, plus indicații de orientare. |
| Alternative produs | Până la patru mașini din aceeași categorie de caroserie, ordonate după apropierea de preț. |
| Lead | Cele patru câmpuri rămân precompletate. Trimiterea și confirmarea locală au fost testate. Formularul rămâne un prototip, fără expedierea unui lead real. |

## Marcaje

- Nou: marcaj compact, fond cărbune și text alb.
- Rulat: același format, fond alb și text închis.
- Reducere: diferența în euro pe fond verde pal; prețul anterior tăiat stă lângă prețul actual. Nu există cronometre sau urgență inventată.

## Date și limite cunoscute

Catalogul local conține 23 de exemplare. Au fost adăugate Audi A5/A7 și Volkswagen Golf/Touareg din fișele publice. Trei înregistrări vechi cu fotografii 404 au fost eliminate. Fotografii verificate pentru toate cele 26 de intrări înainte de eliminare: cele 23 păstrate au răspuns HTTP 200.

Nu sunt inventate valori de autonomie, încărcare DC sau data publicării anunțurilor. Filtrele electrice avansate sunt prevăzute în modelul de date și apar când există valori verificate; sortarea după vechimea anunțului nu este expusă fără această informație. Valorile de culoare și certificare se folosesc numai acolo unde sunt cunoscute. Kilometrajul absent nu este înlocuit cu 0 km.

Fișa GLC repetă 2.510 kg pentru masa maximă și sarcina utilă. Prototipul afișează masa maximă, iar pentru sarcina utilă cere confirmarea din CIV. Nu am tratat valoarea contradictorie drept sarcină utilă verificată.

## Surse

- [GLC VU149616](https://www.autoklass.ro/vanzari-auto/mercedes-benz-glc-200-4matic-vu149616.html), verificat 21.09.2026.
- [Homepage și oferte](https://www.autoklass.ro/), [sucursale](https://www.autoklass.ro/sucursale).
- [Audi A5](https://www.autoklass.ro/vanzari-auto/audia5limuzina40tdi-a-2026-0152324-ro.html), [Audi A7](https://www.autoklass.ro/vanzari-auto/audi-a7-a7-sportback-nn011329.html).
- [Volkswagen Golf](https://www.autoklass.ro/vanzari-auto/volkswagengolfprime1.5tsidsgphev-v-2026-0507644-ro.html), [Touareg](https://www.autoklass.ro/vanzari-auto/volkswagen-touareg-3-0-v6-ld022520.html).

## Validare

- TypeScript, ESLint pe fișierele rundei și build static Pages local: trecute.
- Homepage, catalog, produs și programare service la 360 / 390 / 430 px: fără depășire orizontală.
- Logo Volkswagen → Noi → Golf; Rulate → Touareg: trecut.
- Homepage → buget → Volkswagen nou → catalog: același număr de rezultate.
- Interval 40.000–60.000 € + Audi rulat: A7 afișat.
- Pagina 2: 8 rezultate; bara catalogului rămâne sticky la top: 0 după scroll.
- „Mercedes GLC rulat sub 60k”: rezultat; „GLC sub 5k”: alternative și resetare.
- Formular precompletat → confirmare; căutare dotare U35; hartă și patru modele similare: trecute.
- Capturi de referință: `output/playwright/final-menu.png`, `final-brands.png`, `current-product-top.png`, `current-filters.png`.
