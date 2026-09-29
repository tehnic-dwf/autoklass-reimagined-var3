# Review mobil, 25 septembrie 2026

## Scope si acoperire

Homepage (oferte, caroserii, marci), meniul, cardurile din listing, blocul comercial si dotarile paginilor de masina noua/rulata. React 19, TanStack Router, CSS existente + `client-refinement.css`, Radix Dialog. Conventii: `AGENTS.md`, `docs/design-decisions.md`, `docs/mobile-redesign-2026-09-18.md`. Ultima iteratie vizuala se aplica la maximum 767 px. Nu este un audit complet al site-ului sau al formularului de service.

Referinte locale consultate: `awesome-design-md-main/design-md/bmw/DESIGN.md` si `tesla/DESIGN.md`: fotografie auto, ierarhie discreta, actiuni albastre si suprafete simple. Au fost adaptate la fonturile si componentele Autoklass, fara introducerea unui sistem nou de animatie.

| Domeniu       | Dovezi inspectate                                                                             | Rezultat                                                                         |
| ------------- | --------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Accessibility | Butoane native, dialog, focus la deschidere/inchidere, tastatura, pauza video, reduced-motion | Corectii aplicate; limitele verificarii sunt enumerate mai jos                   |
| Layout        | Capturi la 390 px; reflow pe 4 rute la 320, 390, 430 px                                       | Fara overflow orizontal; ordinea comerciala si spatierea revizuite               |
| Writing       | Denumirile ofertelor, finantare, tractiune, dotari, destinatiile linkurilor                   | Campania si reducerile de stoc sunt separate explicit                            |
| Typography    | Headings, pret, rata, nume de marci, date tehnice                                             | Ierarhie 13–16 px metadate, 20–30 px titluri, 40 px pret                         |
| Colors        | Culori calculate din valorile CSS, CTA si badge confirmate prin computed styles               | CTA 6,76:1; reducere 7,44:1; text secundar leasing 5,67:1                        |
| UI            | Capturi homepage, marci, oferte service, meniu si PDP; stare salvat, disclosure, dialog       | Tratament comun al suprafetelor si actiunilor; fotografii in locul pictogramelor |

## Constatari si rezolvare

| Severitate       | Domeniu       | Locatie                                    | Inainte                                                        | Dupa                                                                                 | Motiv                                                       |
| ---------------- | ------------- | ------------------------------------------ | -------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ----------------------------------------------------------- |
| HIGH, rezolvat   | Writing       | `src/components/home/HomeBrands.tsx:81`    | Campanie SUV imediat deasupra unor masini cu reduceri diferite | Campanie cu link propriu; carusel separat „Masini cu pret redus”                     | Nu afirma eligibilitate comerciala neverificata             |
| HIGH, rezolvat   | Accessibility | `src/routes/index.tsx`                     | Video autoplay fara pauza vizibila                             | Control numit si oprire la reduced-motion                                            | Utilizatorul controleaza miscarea                           |
| HIGH, rezolvat   | Writing       | `src/lib/vehicle-search.ts:71`             | Bugetul din URL-ul cu ghilimele putea deveni NaN               | Normalizare si validare numerica                                                     | Linkul furnizat afiseaza rezultatele corecte sub 40.000 EUR |
| MEDIUM, rezolvat | Layout        | `src/components/home/HomeVehicles.tsx:106` | Caroserii voluminoase cu pictograme improvizate                | Patru fotografii de stoc intr-un rand compact                                        | Mai putin spatiu pentru o decizie secundara                 |
| MEDIUM, rezolvat | UI            | `src/components/home/HomeBrands.tsx:44`    | Sigle in casete, Ford tipografic, rulate fara grupare clara    | Grila optica fara casete, logo Ford furnizat, Autoklass/Das WeltAuto grupate separat | Destinatiile sunt distincte si usor de comparat             |
| MEDIUM, rezolvat | Layout        | `src/components/layout/SiteHeader.tsx:126` | Oferte si actiuni de footer alaturate                      | O singura coloana pentru oferte, navigatie si actiunile din footer                        | Ordine verticala consecventa, conform feedbackului clientului          |
| MEDIUM, rezolvat | Layout        | `src/routes/autoturisme.$slug.tsx:251`     | Pret, leasing, consultant si locatie fragmentate               | Un bloc comercial; rata vizibila si conditii expandabile                             | Apropierea informatiei de actiunea „Solicita oferta”        |
| MEDIUM, rezolvat | UI            | `src/routes/autoturisme.$slug.tsx:228`     | Inima concura cu navigatia inapoi                              | Salvare cu text langa galerie; CTA albastru si reducere albastru deschis             | Prioritati si actiuni mai clare                             |
| MEDIUM, rezolvat | Writing       | `src/components/vehicle/VehicleFacts.tsx`  | „Fata” izolata si tractiune repetata in PDP                    | „Tractiune fata” pe card; „Integrala” sub eticheta Tractiune in PDP                  | Aceeasi informatie, adaptata contextului                    |
| MEDIUM, rezolvat | Layout        | `src/routes/autoturisme.$slug.tsx:446`     | Explicatie lunga a etichetelor si liste deschise               | Grupe expandabile, cautare, badge Standard / Optional inclus                         | Lista poate fi parcursa fara blocuri explicative redundante |

## Verificare

Trecute:

- `npx tsc --noEmit` si ESLint pe componentele/logica modificate.
- `npm run build:pages`, cu prerandare si postbuild. Prima incercare in sandbox a esuat la deschiderea serverului local (EPERM); executia autorizata a reusit.
- Playwright, viewport 320/390/430, homepage + listing filtrat + GLC nou + Audi A7 rulat: document.scrollWidth egal cu viewport-ul la toate cele 12 combinatii.
- Linkul exact cu `maxPrice=%2240000%22`: 5 rezultate, 23.980/31.890/37.980/35.500/35.900 EUR; fara NaN.
- Meniu: Enter deschide, Escape inchide si restaureaza focusul; focus ring 2 px, #1262a6 pe alb, 6,32:1.
- Meniu → Oferte service: ancora ajunge la 88 px sub partea de sus, libera de header.
- Leasing: deschidere cu Enter. Solicitare oferta: deschidere cu Enter; Tab ramane in dialog; Escape restaureaza focusul pe CTA.
- Formularul pastreaza cele patru valori precompletate de test.
- Salvare masina: aria-pressed se schimba; starea initiala a fost restaurata dupa test.
- Cautare dotare DIGITAL LIGHT: un rezultat, Optional inclus.
- Reduced-motion opreste videoclipul; pauza vizibila functioneaza.
- Imaginile celor 6 marci si Das WeltAuto au incarcat cu naturalWidth > 0.
- Fara erori JavaScript in scenariul functional final. Un avertisment de hidratare pentru atributul style al inputului a aparut in timpul HMR; nu s-a repetat la verificarile ulterioare.

Neverificate: VoiceOver/NVDA, audit automat axe, zoom nativ 200%, RTL, Safari/iOS real, performanta Core Web Vitals. Reflow la 320 px nu este prezentat drept substitut pentru aceste verificari. Nu s-a trimis niciun lead real.

## Date si surse

- Campanie SUV: https://www.autoklass.ro/articole/ofertele-verii-suv.html (termen 30.09.2026, modele participante). Imaginea este preluata din aceasta pagina, cu fallback la fotografia locala.
- Service Timisoara: https://www.autoklass.ro/articole/oferta-service-timisoara.html (25% manopera, termen 30.09.2026).
- Honda: https://www.autoklass.ro/articole/verificare-gratuita-honda.html.
- Pick-up: https://www.autoklass.ro/articole/pick-up-service.html.
- Campania SUV nu certifica automat participarea fiecarui VIN din carusel. Badge-ul Oferta marcheaza regula de pret redus din datele prototipului.
- Conform instructiunii explicite din 25 septembrie, valorile CO2 lipsa, doua valori de tractiune si clasificarea standard/optional sunt exemple de prototip. Campurile completate sunt marcate `prototypeFields` in date; clasificarea este izolata in `prototypeOptionalCodes`. Necesita inlocuire/validare in implementarea de productie.
- Ford este prezentat „In curand”, pe baza notitelor clientului. Celelalte marci noi nu au fost inventate; asteptam denumirile.

## Scor si verdict

Refactoring UI: 9/10 (7 din 8 verificari). Ierarhie, grayscale, spatiu, etichete secundare, latime text, contrast si profunzime trec in suprafetele inspectate. Scala de spatiere inca include pasii 12/20 px mosteniti; uniformizarea ei este diferenta fata de 10/10.

Top-design: 6,6/10 (tipografie 7, compozitie 7, interactiune 5, culoare 7, detalii 7). Un prototip comercial clar; nu este prezentat ca o executie Awwwards. Pentru 10/10 ar fi necesare directie foto proprie, asseturi uniforme, verificare de performanta si detalii de brand originale; animatia ornamentala nu este necesara acestui flux.

Approve pentru suprafetele si verificarile descrise. Nu reprezinta certificare completa WCAG sau aprobare pentru publicarea datelor demonstrative.

## Revizie dupa feedback, 28 septembrie

- Meniu: ofertele si actiunile din footer sunt pe randuri separate, la toate latimile mobile.
- Campanie SUV: „Modele participante” este langa GLB / GLC / GLE; termenul de livrare ramane separat.
- PDP: pretul curent apare primul; pretul anterior si economia sunt grupate sub TVA. Leasingul are o rata secundara vizibila si conditii expandabile. Fondul gri grupeaza blocul comercial; consultantul si locatia sunt intr-un card alb comun sub CTA albastru.
- TypeScript si ESLint pe fisierele TSX modificate: trecute dupa revizie. Build-ul Pages de mai sus precede aceasta ultima revizie.
- Reverificare 28 septembrie: PDP fara overflow la 320/390/430 px; conditii leasing accesibile cu Enter; CTA deschide formularul, Escape il inchide. Ofertele din meniu au aceeasi latime si sunt pe randuri consecutive. Capturi inspectate la 390 px. Fara exceptii JavaScript in acest scenariu.

## Salvare compacta pe PDP, 28 septembrie

Scope: exclusiv controlul de salvare din galeria PDP mobile, comun masinilor noi si rulate. Accesibilitate, layout, copy, tipografie, culoare si polish inspectate pentru acest control; nu reprezinta o reevaluare a paginii complete.

| Severitate | Domeniu | Locatie | Inainte | Dupa | Motiv |
| --- | --- | --- | --- | --- | --- |
| MEDIUM, rezolvat | Layout | src/client-refinement.css:1182; src/components/vehicle/FavoriteButton.tsx:41 | Rand separat sub galerie pentru o actiune secundara | Inima intr-un buton alb de 44 x 44 px, in coltul fotografiei, cu inset de 16 px | Elimina inaltimea dedicata fara a micsora tinta tactila |

Verificat in browser la 320/390/430 px: fara overflow, tinta 44 x 44 px in interiorul imaginii, nume accesibil „Salveaza pentru comparatie”; Enter salveaza, Space elimina, aria-pressed se actualizeaza, pictograma umpluta indica selectia. Starea initiala a fost restaurata. Focus vizibil pe suprafata alba; capturile au fost inspectate. ESLint pe FavoriteButton.tsx a trecut. Textul vizibil ramane pe desktop.

Not verified: screen reader real, axe, zoom nativ 200%, RTL, forced-colors. Nu exista stari loading/error noi. Scorurile paginii din evaluarea precedenta raman 9/10 Refactoring UI si 6,6/10 Top-design, cu limitarile documentate; aceasta ajustare izolata nu justifica rescoringul paginii.

Approve pentru controlul si verificarile descrise.
