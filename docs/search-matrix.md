# Căutare: observații și criterii comune

Site live inspectat la 11 septembrie 2026, viewport mobil 390 px. Termenul `GLC` din căutarea globală duce la `/search/GLC`. Au fost observate 626 rezultate; filtrarea pe Mercedes-Benz a dus la 613 și a actualizat URL-ul. Aceste cifre descriu momentul verificării, nu inventarul V3.

| Live                                                         | V3                                                                     | Motiv / limită                                                                  |
| ------------------------------------------------------------ | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Căutare globală de text                                      | Căutare model în listare; formular structurat imediat după hero        | Intrare directă pe criteriile de alegere                                        |
| Stare noi/rulate                                             | Taburi + intrări prefiltrate din meniu                                 | Intenții distincte, aceeași logică de catalog                                   |
| Marcă, model                                                 | Câmpuri inițiale; modelul se resetează la schimbarea mărcii            | Împiedică combinații incompatibile; dependența exactă live nu a fost verificată |
| Preț min/max                                                 | Câmpuri inițiale; sortare separată crescător/descrescător              | Bugetul filtrează, sortarea ordonează                                           |
| Caroserie, combustibil, transmisie, CP, tracțiune, cilindree | Filtre avansate                                                        | Păstrează puterea de restrângere fără un formular inițial lung                  |
| An, kilometraj                                               | Filtre avansate pentru rulate/toate; eliminate când se selectează noi  | Evită criterii irelevante în intrarea pentru noi                                |
| Sucursală                                                    | Filtru avansat și informație pe card/fișă                              | Localizare consecventă                                                          |
| 28 opțiuni de echipare                                       | Căutare cu sinonime în dotările configurației demonstrative            | Nu pretinde echipări pentru mașinile fără date                                  |
| Culoare exterior/interior                                    | Semnalate ca nealimentate în demo                                      | V2 nu conține aceste date; de adăugat cu inventarul real                        |
| Mercedes-Benz Certified                                      | Link către categoria live în meniu; fără filtru fictiv în catalogul V3 | Nu există certificare per exemplar în datele demo                               |
| Autoturism/autoutilitară                                     | Prototipul listează autoturisme; utilitarele au link dedicat în meniu  | Nu inventăm catalog comercial                                                   |
| Sortare „Relevanță”, 12/pagină                               | Sortare preț + selecție inițială stabilă; toate cele 18 mașini demo    | Opțiunile exacte ale sortării live nu au fost deschise/verificate               |
| Filtre active și reset                                       | Chipuri cu eliminare individuală, reset complet, număr instant         | Feedback imediat                                                                |
| Descărcare listă                                             | Exclusă                                                                | Etapa nu include PDF sau export                                                 |
| Disponibilitate                                              | Filtru distinct „În stoc”/„Livrare imediată”/„De confirmat”            | Lipsa informației nu înseamnă stoc                                              |

## Priorități de lucru, de validat cu utilizatori

P1 = criteriu inițial; P2 = restrângere/evaluare; P3 = verificare în fișă. Aceste priorități sunt ipoteze de proiectare.

| Criteriu                                        | Noi / rulate                | Prioritate | Sursă                                      | Suprafețe                                     |
| ----------------------------------------------- | --------------------------- | ---------- | ------------------------------------------ | --------------------------------------------- |
| Stare, marcă, model, preț total                 | Ambele                      | P1         | Catalog V2 demonstrativ                    | Homepage, filtre, card, fișă, comparație      |
| Caroserie, motor, transmisie, tracțiune, putere | Ambele                      | P2         | V2; completări oficiale doar GLC           | Filtre avansate, card, fișă, comparație       |
| An și kilometraj                                | Rulate; an și la fișele noi | P2         | V2; lipsa km rămâne explicită              | Filtre, card, fișă, comparație                |
| Disponibilitate și sucursală                    | Ambele                      | P2         | V2, de confirmat comercial                 | Filtre, card, fișă                            |
| Regim TVA                                       | Ambele                      | P2         | V2                                         | Filtre, preț în card/fișă                     |
| Dotări instalate, sinonime                      | Ambele                      | P2         | Configurație GLC demonstrativă explicită   | Filtre, căutare în fișă                       |
| Locuri, portbagaj, consum                       | Ambele                      | P3         | Sursa Mercedes-Benz pentru modelul GLC     | Fișa demonstrativă                            |
| Autonomie/încărcare                             | Electrice/PHEV              | P3         | Lipsă pentru exemplul detaliat mild-hybrid | De alimentat în fișele relevante              |
| Garanție, istoric, stare documentată            | Istoric numai rulate        | P3         | Nefurnizate                                | Mesaj explicit în fișă; fără istoric inventat |

Motorul din `src/lib/vehicle-search.ts` este comun homepage-ului și listării. Filtrele stau în URL. Comparația are maximum trei mașini și opțiunea „Doar diferențele”. Datele absente se afișează ca necomunicate, nu ca zero sau echipare absentă.
