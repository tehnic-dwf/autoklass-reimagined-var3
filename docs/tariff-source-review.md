# Verificare sursă tarife AutoKlass

Sursă furnizată de utilizator: `/Users/gigi/Downloads/Decizia 2177 - Tarife service toate sucursalele din 15 aprilie 2026.docx.pdf`. Cele 4 pagini au fost extrase și verificate vizual la 14 septembrie 2026. Data de 15 aprilie 2026 provine din numele fișierului; paginile nu afișează o dată a intrării în vigoare. Nu s-a verificat dacă documentul a fost înlocuit ulterior.

## Interpretarea datelor

- Toate tarifele pentru clienți din tabelele de mai jos sunt în lei, cu TVA inclus. PDF-ul nu precizează procentul TVA. Excepția din sursă este tariful intern de 125 lei/oră fără TVA, care nu trebuie afișat clienților.
- Celula goală, semnul `-` și sucursala absentă dintr-un tabel nu reprezintă tarif zero și nu demonstrează indisponibilitatea serviciului. În interfață: „Tarif la cerere” sau „Tarif nepublicat”. Nu completa automat din altă sucursală.
- Pagina 1 se intitulează „TARIFE ORA TEHNICA MANOPERA IN SERVICE”. Rândurile de manoperă se pot afișa în lei/oră. Unele rânduri pentru servicii delimitate apar sub același antet fără unitate proprie; vezi ambiguitățile de mai jos.
- PDF-ul nu oferă prețuri totale pentru revizia A/B, piese, consumabile sau durate normate pentru revizii. Tariful orar nu este prețul reviziei.

## Manoperă Mercedes-Benz, pagina 1

Ordinea exactă a coloanelor în sursă: Sud, Pipera, Chitila, Constanta, Ploiesti, Sibiu, Timis., Cluj. „Timis.” corespunde denumirii „TIMISOARA” utilizate pe celelalte pagini. Tabelul următor normalizează doar diacriticele și denumirea Timișoara.

| Categoria și modelele din sursă | Sud | Pipera | Chitila | Constanța | Ploiești | Sibiu | Timișoara | Cluj |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| ≤ 5 ani: A, B, C, CLA, GLA, GLB, GLC, E | 500 | 500 | 480 | 480 | 480 | 450 | 450 | 500 |
| ≤ 5 ani: CLS, S/S Coupe, SL, AMG GT, GLE, GLS, G, modelele AMG | 600 | 600 | 580 | 580 | 580 | 550 | 550 | 580 |
| Autovehicule electrice 100% | 800 | 800 | 800 | 800 | 800 | 800 | 800 | 800 |
| > 5 ani: toate modelele | 450 | 450 | 450 | 450 | 450 | 450 | 450 | 450 |
| Diagnoză, lucrări electrice și reparații agregate, indiferent de vechime, toate modelele | 650 | 650 | 650 | 650 | 650 | 650 | 650 | 650 |
| Modele V, X (categoria TRAPO în sursă) | 550 | 550 | 550 | 550 | 550 | 550 | 550 | 500 |

Valorile sunt tarife de manoperă în lei/oră cu TVA. Pragul de 5 ani este inclus în prima categorie. Rândul „> 5 ani: toate modelele” se suprapune semantic cu rândul electric; sursa nu precizează prioritatea pentru un electric mai vechi de 5 ani. Nu inventa această regulă într-un calculator. AMG este menționat explicit în categoria superioară; nu clasifica automat un C AMG doar pe baza clasei C. V și X au rând separat și nu intră în tariful standard pentru turisme.

Alte valori utile, identice în toate cele 8 sucursale:

| Rândul din sursă | Lei cu TVA | Unitatea și limita interpretării |
|---|---:|---|
| Reparații tinichigerie, vopsitorie la auto avariate, toate modelele, plata client | 500 | Lei/oră, sub antetul de manoperă |
| Reparație și sudură în AL, toate modelele | 750 | Lei/oră, sub antetul de manoperă |
| Diagnoză electronică fără reparație în AutoKlass | 1.000 | Nu are unitate proprie; antetul paginii este orar. Confirmă înainte de prezentarea ca preț fix pe operațiune |
| Verificare tehnică completă în vederea achiziției | 2.500 | Include testare electronică, mecanică, inspecție vizuală TV, demontare scuturi și carenaje, rezultat diagnoză; durată estimată 4h. Nu are unitate proprie. Nu înmulți automat cu 4 și nu afirma preț total confirmat |
| Măsurare caroserie NAJA / Car Bench Evolution(TM) | 2.000 | Nu are unitate proprie; aceeași ambiguitate între antetul orar și serviciul delimitat |
| Preluare de la domiciliu și returnare | 200 | Nu are unitate proprie și nu precizează limite geografice sau kilometri incluși |

## ITP pentru turisme, pagina 2

Lei cu TVA, pe inspecție sau pe revenirea indicată, nu pe oră. Sunt publicate valori doar pentru cele 5 sucursale de mai jos. Pipera, Ploiești și Cluj nu apar în acest tabel.

| Sucursala | Inspecție MAS și MAS CAT | Inspecție MAC și 4 X 4 | Revenire siguranță | Revenire poluare | Revenire altele |
|---|---:|---:|---:|---:|---:|
| Chitila | 200 | 200 | 70 | 60 | 50 |
| Constanța | 140 | 170 | 50 | 35 | 25 |
| Timișoara, subcontractat | 297 | 297 | 70 | 57 | 45 |
| Sud | 240 | 240 | 50 | 40 | 40 |
| Sibiu | 200 | 200 | 70 | 60 | 50 |

Taximetrie/transport alternativ: rând separat „Autoturism MAS si MAC CAT taximetrie si/sau transport alternativ de persoane”, exclusiv Constanța: inspecție 120, revenire siguranță 50, poluare 30, altele 25. Pentru hibrid sau electric, documentul nu explică încadrarea. Nu atribui automat o categorie ITP pe baza etichetei electrice.

## Spălătorie și cosmetizare pentru turisme, pagina 3

Lei cu TVA pe serviciul descris; tabelul nu este orar. Ordinea coloanelor diferă de pagina 1. Cluj nu apare. `nepublicat` reprezintă celulă goală.

| Serviciul | Sud | Chitila | Pipera | Ploiești | Constanța | Sibiu | Timișoara |
|---|---:|---:|---:|---:|---:|---:|---:|
| Spălat exterior PKW | 45 | 40 | 50 | 40 | 40 | 35 | 35 |
| Spălat interior PKW | 40 | 40 | 40 | 40 | 35 | 30 | 35 |
| Spălat motor PKW | nepublicat | 20 | nepublicat | 50 | 50 | nepublicat | 35 |
| Cosmetizare interior: A, B, C, CLA, GLA, GLB | 1.000 | nepublicat | 1.200 | 600 | 600 | nepublicat | nepublicat |
| Cosmetizare interior: CLS, E, G, GLC, GLE, GLS, S, SL, SLC, AMG GT | 1.400 | nepublicat | 1.400 | 600 | 600 | nepublicat | nepublicat |

Polish și tratamente exterior pentru autovehicul sub 3,5 t: doar Constanța publică 800 lei. Curățat set de 4 jante, autovehicul sub 5 t: doar Constanța publică 60 lei. Nu aplica gruparea de modele de la manoperă la cosmetizare: E și GLC se află în grupa a doua pentru cosmetizare.

## Anvelope, pagina 4

Lei cu TVA pentru operațiunea descrisă; hotelul are unitatea explicită 6 luni/sezon. Sursa nu precizează numărul de roți pentru tariful operațiunilor, deci evită o etichetă inventată „/roată” sau „/set de 4”. Numai Sud, Pipera, Chitila și Timișoara apar în tabel.

| Serviciul | Sud | Pipera | Chitila | Timișoara |
|---|---:|---:|---:|---:|
| Schimb anvelope, jante ≤ 18 | 450 | 500 | 500 | 325 |
| Schimb anvelope, jante > 18 | 550 | 600 | 600 | 500 |
| Schimb roți complete | 290 | 330 | 350 | 250 |
| Hotel anvelope, 6 luni | 440 | 500 | 500 | - |

Schimbul anvelopelor include demontat/montat roți, înlocuit anvelope și echilibrat roți. Schimbul roților complete include demontat/montat, calibrare presiune și echilibrare dacă este necesar. Nota acordă reducere de 30% la serviciile de roți clienților care cumpără anvelope sau roți complete de la Autoklass Timișoara. Reducerea este condiționată; nu o aplica implicit tuturor clienților.

## Service 24, pagina 4

- Tractare PKW Chitila: 250 lei în București și Ilfov; în afara acestora, 2,5 lei/km.
- Tractare Sibiu: 4,67 lei/km; aceeași celulă menționează 476 lei pentru deplasare de maximum 50 km. Sursa nu explică relația dintre aceste două valori, deci nu calcula automat un total.
- Tractare Timișoara: 5 lei/km, 300 lei în oraș.
- Deplasare: Sud 20 lei/km, Chitila 15 lei/km, Ploiești 16 lei/km, Constanța 12 lei/km, Sibiu 14,28 lei/km, Timișoara 10 lei/km.

Tractarea și deplasarea sunt categorii distincte. Toate aceste valori includ TVA. Nu sunt precizate kilometrii dus/întors, condițiile de cumul sau eventuale costuri suplimentare. Pipera și Cluj nu apar în tabelul Service 24.

## Subset implementat în prototip

`src/data/service-prices.ts` separă serviciile solicitate de categoriile tarifare. Interfața afișează pentru toate cele 8 sucursale cele 4 categorii de manoperă pentru turisme (modele standard ≤ 5 ani, modele superioare/AMG ≤ 5 ani, > 5 ani, 100% electrice), diagnoza/lucrările electrice/reparațiile agregate și tinichigeria/vopsitoria cu plata clientului. Toate sunt etichetate `lei/oră`, cu TVA inclus. Categoria pentru un electric mai vechi de 5 ani se confirmă în service; nu există atribuire automată.

Sunt incluse și tarifele inspecției ITP inițiale pentru categoriile MAS/MAS CAT și MAC/4 X 4, etichetate `lei/inspecție`. Pipera, Ploiești și Cluj păstrează tariful absent și afișează „Tarif la cerere”. Timișoara este identificată ca inspecție subcontractată. Data afișată este 15 aprilie 2026, conform numelui documentului furnizat.

Filtrarea folosește sucursala, serviciul dorit, grupul tarifar și căutarea. Legătura către estimare păstrează sucursala, serviciul și categoria tarifară. Formularul afișează categoria și unitatea în ambele etape și în confirmarea demo; schimbarea serviciului elimină categoria anterioară. Datele nu se transmit unui backend.

Au fost omise prețurile cu unitate ambiguă (diagnoză fără reparație, verificare înainte de achiziție, măsurare caroserie, preluare/returnare), tarifele interne, TRAPO/V/X, ITP pentru taxi/transport alternativ și reveniri, spălătoria, Service 24 și serviciile de anvelope. Solicitarea pentru roți rămâne disponibilă, cu detalii opționale despre dimensiune și operațiune. Nu au fost inventate prețuri de revizie A/B, pachete, piese sau manoperă completă pe operațiune.
