# Autoklass V3 — revizia pentru mobil, 18 septembrie 2026

Modificări locale, fără commit sau publicare. Evaluarea vizează mobilul, conform cererii; desktopul nu a fost auditat în această rundă.

## Structură și decizii

- Homepage: video și cele două acțiuni principale; acces imediat la tarife, daune, buy-back, piese, test drive, pick-up; căutare după stare, marcă și bugete predefinite; caroserii și mărci; selecții de mașini; dovadă de autorizare; service și sucursale. Au fost eliminate scurtăturile duplicate și secțiunea generică în trei pași.
- Buget: opțiuni de 25.000, 40.000, 60.000 EUR sau orice buget, cu TVA inclus. Opțiunile sunt filtre funcționale, nu oferte sau categorii de produse inventate. În filtrarea detaliată, prețurile se aleg din liste. Model, caroserie, combustibil, transmisie, kilometraj și anul rămân disponibile prin dezvăluire progresivă.
- Catalog: rezultatele ajung mai repede în ecran; filtre detaliate în panou, criterii active vizibile, eliminare individuală și resetare.
- Produsul demonstrativ GLC 200 4MATIC VU149616: 14 fotografii ale exemplarului, echipare verificată în patru grupuri, specificații, consultantul real Alexandru Soare cu portret, locația corectată la București Sud, PDF secundar și CTA unic „Solicită ofertă”. PDF-ul este o sinteză generată din fișa publică, nu un document original al producătorului; precizarea apare în PDF. Atașamentul acestui brief este o imagine a zonei de consultant, nu fișa PDF originală a mașinii.
- Service: un singur flux cu două etape, intervalul orientativ afișat contextual. Manopera este în lei/oră, ITP în lei/inspecție; nu am inventat durate, piese sau totaluri ale lucrărilor. Devizul final se stabilește după verificare.
- Tarife: intervale agregate din lista de tarife furnizată; fără separare/selectare pe sucursală. Valorile identice rămân sume fixe, fără interval artificial.
- Font Manrope găzduit local pentru mobil, paleta Autoklass păstrată, titlu editorial în hero, margini de 24 px, butoane de minimum 44–52 px, etichete persistente și numere de preț proeminente.

## Surse și raționament

- [Homepage Autoklass](https://www.autoklass.ro/): portofoliu, servicii și autorizări; structura folosește oferta existentă.
- [Fișa exactă a GLC-ului](https://www.autoklass.ro/vanzari-auto/mercedes-benz-glc-200-4matic-vu149616.html): fotografii, preț, echipare, consultant și sucursală. Datele sunt o fotografie a informației publice la data verificării, nu un feed live.
- [Carwow](https://www.carwow.co.uk/): acces după buget și tip de mașină. Am adaptat organizarea, fără a copia designul sau promisiunile sale comerciale. Oferta individuală Carwow și exemplul Casa Auto nu au putut fi citite cu instrumentul web; nu am atribuit informații neverificate acestora.
- [Cercetarea Autotrader despre căutarea pe categorii](https://plc.autotrader.co.uk/news-views/press-releases/new-category-search-from-autotrader-to-help-car-buyers-navigate-complex-market/): justifică păstrarea explorării pe tip de vehicul pentru cei care nu cunosc marca/modelul.
- [Baymard: filtrarea mobilă](https://baymard.com/mcommerce-usability/benchmark/mobile-page-types/filtering-options): filtre accesibile, criterii aplicate și control asupra resetării.
- [Web Interface Guidelines](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md): etichete, focus, stări, contrast, dimensiuni și comportament mobil.
- Fișierul de tarife oferit anterior: Decizia 2177, 15 aprilie 2026. Intervalele sunt min/max ale valorilor publicate, excluzând sucursalele fără valoare.
- Referințe locale `awesome-design-md-main/design-md`: BMW (ierarhie informațională, fotografie și ritm), Tesla (imagini dominante și acțiuni puține), Apple (tipografie clară și separarea informației în grupuri). Culorile și fonturile proprietare ale acestor mărci nu au fost copiate.

## Audit și limitele concluziilor

Scoruri euristice interne, nu rezultate ale unor teste cu clienți: Refactoring UI 9/10 (lipsește auditul exhaustiv de contrast pentru fiecare cadru video); UX Heuristics 9/10 (orientarea este verificată prin parcursuri, încă nu prin utilizatori); Top Design 7/10 (tipografie și compoziție coerente, dar fotografia de stoc are calitate variabilă); CRO 6/10 (fără analytics, interviuri sau A/B test nu se poate afirma o creștere de conversie).

Întrebări de conversie tratate în pagină: cât costă → preț/TVA; ce include → echipare și fișă; cu cine discut → consultant; ce urmează → ofertă și confirmarea livrării; cât costă service-ul → unități și intervale explicite, apoi deviz după verificare. Acestea sunt ipoteze de lucru motivate de brief și de informațiile disponibile, nu obiecții atribuite unor interviuri inexistente.

Hooked UX: cumpărarea unei mașini și service-ul sunt utilizări episodice. Am aplicat reducerea efortului și păstrarea comparației, fără mecanici de dependență, notificări sau recompense artificiale. Scorul unei bucle de obicei nu se aplică acestui proiect.

### Design Review: Autoklass mobil

**Verdict:** NOT DONE pentru publicare comercială (7/10); disponibil pentru revizia locală solicitată.
**The One Thing:** vizitatorul găsește o mașină sau solicită service fără să descifreze organizarea companiei.
**Keeps its promise?** Da pentru parcursurile demonstrative verificate; lead-urile sunt simulate.
**Cut list:** flux separat de estimare, selector sucursală la tarife, inputuri libere de preț, scurtături repetitive, text generic despre cumpărare.
**Fix list:** validare cu vizitatori reali, conectarea formularelor și stocului, confirmarea clientului pentru conținut și condiții înainte de producție.
**Back of the fence:** starea fără rezultate, resetarea, confirmările și PDF-ul au fost verificate; nu pretind audit complet WCAG sau performanță de producție.

## Dovezi de verificare

- TypeScript și ESLint pe fișierele modificate: trecute.
- Build static local: trecut, fără publicare.
- Homepage, catalog, produs, tarife și service: 360 / 390 / 430 px, fără scroll orizontal (15 combinații).
- Buget 40.000 EUR: 7 rezultate, toate prețurile <= 40.000 EUR.
- Ofertă: formular precompletat, CTA consecvent, confirmare afișată.
- Service: selectare ITP, interval 140–297, ambele etape și confirmarea solicitării.
- Tarife: zero selectoare de sucursală, ITP 140–297 și 170–297 lei/inspecție.
- PDF: răspuns HTTP 200, 3 pagini, identitate/preț/consultant verificate; corectat caracterul CO2 la export.
- Capturi în `output/playwright/`, PDF în `public/documents/`.
