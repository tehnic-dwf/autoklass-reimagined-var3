# Autoklass V3 — decizii de design și limite

Actualizat: 14 septembrie 2026. V3 pornește din V2, commit `dfabb8c5801f24e897f04d2c81d3165aff9b97db`. V2 nu este modificat.

## Homepage și persuasiune

Hero-ul păstrează video-ul, fonturile Mercedes-Benz și compoziția apreciată din V2. Cele două intrări sunt căutarea unei mașini și solicitarea unei programări service. Căutarea cu filtre apare imediat după hero. Urmează un index al serviciilor, înaintea selecției de mașini, ca vizitatorii noi să vadă oferta mai largă fără să parcurgă pagina până la footer.

Indexul și meniul folosesc aceeași sursă de date și patru grupe comerciale: autovehicule, service și daune, mobilitate, piese și accesorii. Descrierile numesc servicii concrete; detaliile se deschid la cerere. Informațiile despre companie au un grup separat în meniu. Pe desktop, intrările pentru mașini și service rămân vizibile alături de butonul etichetat „Meniu”.

Pentru cumpărare, încrederea este construită prin statutul verificabil de dealer autorizat, prețul total, date explicite despre echipare/disponibilitate și explicarea celor trei pași ai cererii de ofertă. Pentru service, prin statutul de service autorizat, tarife pe sucursală cu unitate și TVA explicite, condițiile serviciului de preluare/livrare și accesul la sucursale. Datele lipsă nu sunt înlocuite cu promisiuni.

Principiile de persuasiune aplicate sunt autoritatea documentabilă, reducerea incertitudinii și pașii graduali (căutare → comparație → cerere). Nu există dovezi furnizate pentru recenzii, ratinguri sau rate de satisfacție, așa că nu apar testimoniale inventate. Nu folosim presiune de timp sau raritate artificială. „CRO ready” descrie o ipoteză pregătită pentru evaluare; prototipul nu dovedește o creștere a conversiei.

Surse de principii, consultate la 14 septembrie 2026:

- [NN/g: Top 10 Guidelines for Homepage Usability](https://www.nngroup.com/articles/top-ten-guidelines-for-homepage-usability/): intrări clare pentru sarcinile principale și informații corporate grupate.
- [NN/g: Trustworthiness in Web Design](https://www.nngroup.com/articles/trustworthy-design/): organizare, aspect profesional și conținut transparent.
- [Baymard: Homepage & Category Navigation](https://baymard.com/research/homepage-and-category-usability): găsirea produselor și ierarhia categoriilor.

Acestea sunt principii generale, nu cercetare cu utilizatorii Autoklass. Alegerea ordinii finale trebuie validată cu cumpărători și clienți service.

## Sistem vizual

Suprafețe albe și gri foarte deschis, text grafit, fonturile existente Mercedes-Benz. Spațiere pe o scară de 8 px, delimitări subțiri, fără umbre decorative pe fiecare bloc. Titluri de 30–32 px pe mobil, text de 16 px, etichete secundare de 14 px. Controale de minimum 44 px și câmpuri de 52 px. Albastrul este rezervat focusului/accentelor funcționale. Video-ul are control de pauză și respectă preferința de mișcare redusă.

Referințe vizuale/structurale:

1. V2, primul ecran: compoziție, video, tipografie. Păstrat, cu simplificarea mesajelor comerciale neverificate.
2. [Carwow, tipuri de mașini rulate](https://www.carwow.co.uk/car-types/used): explorare după buget, caroserie și criterii tehnice, consultat 11 septembrie.
3. [Mercedes-Benz GLC](https://www.mercedes-benz.ro/passengercars/models/suv/glc/overview.html): gruparea datelor și imaginilor de model. Nu reprezintă o obligație de brand impusă proiectului.

Casa Auto a fost indicat în brief, dar pagina relevantă nu a putut fi verificată. Nu îi atribuim funcții observate pe alte site-uri.

## Date și surse

- [Autoklass live](https://www.autoklass.ro/), meniu și servicii inspectate în browser la 14 septembrie 2026. Inventarul și gruparea sunt în `navigation-map.md`.
- [Grupul Autoklass](https://www.autoklass.ro/articole/grupul-autoklass.html) și homepage-ul live susțin statutul de dealer/service autorizat și oferta buy-back. Nu preluăm cifre de sucursale/angajați sau data unică de autorizare: pagina istorică are formulări diferite între locații.
- [Pick-up service](https://www.autoklass.ro/articole/pick-up-service.html): existența serviciului și link către condiții. Nu amestecăm o promoție de pe site cu tarifele de bază din document.
- Tarife: documentul clientului, Decizia 2177, aplicabil din 15 aprilie 2026. Extragerea vizual verificată, unitățile și selecția implementată sunt în `tariff-source-review.md`. PDF-ul original nu este publicat în repository.
- Fișa detaliată: Mercedes-Benz GLC 200 4MATIC, model X254, piața România. Sursa oficială consultată la 11 septembrie 2026. Fotografiile oficiale din 2025 sunt ilustrative, nu fotografii ale exemplarului Autoklass.
- Catalogul de 18 mașini și prețurile sale sunt moștenite din V2. GLC-ul ales are în acel catalog anul 2026 și prețul 69.714 EUR; aceasta nu este o ofertă live verificată. Interfața îl prezintă ca exemplu demonstrativ.
- DIGITAL LIGHT și scaunele multicontur sunt alegeri pentru configurația demonstrativă. AIRMATIC și AIR-BALANCE sunt opțiuni de model, excluse din căutarea echipărilor instalate. Garanția exemplarului și identitatea consultantului nu au fost furnizate.

## Conversii de măsurat în implementarea de producție

Propunere, fără instalarea vreunui tracker în acest prototip:

| Moment                         | Parametri fără date personale                      | Utilitate                                               |
| ------------------------------ | -------------------------------------------------- | ------------------------------------------------------- |
| Căutare lansată                | sursă homepage/listare, categorie, număr rezultate | Succesul intrării în catalog                            |
| Zero rezultate                 | tipurile filtrelor active                          | Identificarea blocajelor                                |
| Fișă vizualizată               | ID mașină, sursă listare/comparație                | Trecerea de la căutare la evaluare                      |
| Formular ofertă deschis        | ID mașină                                          | Intenție de contact                                     |
| Lead ofertă acceptat de server | ID mașină, ID anonim eveniment                     | Conversia principală, doar după confirmarea backendului |
| Solicitare service acceptată   | sucursală, serviciu, estimare/programare           | Conversia service, separat de vânzări                   |
| Serviciu secundar accesat      | ID serviciu, poziție homepage/meniu/footer         | Găsirea ofertei secundare                               |

Nu trimite nume, telefon, email sau VIN în analytics. Nu număra stările de succes demonstrative drept lead-uri. Validarea recomandată: 5–8 teste de sarcină cu oameni care caută o mașină, service sau un serviciu secundar; apoi comparație controlată cu V2, măsurând lead-uri valide, nu doar clickuri.

## În afara prototipului

Nu există backend pentru lead-uri, alocare reală de consultant, inventar live sau rezervare de intervale. În formulare, succesul este explicit demonstrativ; erorile pot fi simulate cu `?demo=error`. Legăturile secundare marcate ↗ duc la paginile reale existente, fără a construi fluxuri comerciale neverificate. Nicio rezervare, plată, integrare WhatsApp, calculator de leasing sau PDF în fișa mașinii.
