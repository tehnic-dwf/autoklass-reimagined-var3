# Review local: marci, rezervare si campanii

Scope: homepage (marci + corectarea bannerului la tableta), CTA secundar pe ambele pagini de produs, doua landing page-uri demonstrative. Nimic publicat pe GitHub.

## Implementare

- Marci: doua coloane pe mobil, carduri cu min-height 104px, camp de logo de 44px, gap 8px. Ford ramane „In curand”. Autoklass si Das WeltAuto sunt reunite intr-un singur panou, cu randuri compacte; linkurile catre orase raman de minimum 44px inaltime. La 320px ele trec firesc sub sigla.
- Produs: „Rezerva”, 44px inaltime, contur gri, sub CTA-ul albastru de aproximativ 52px. Formular separat ca intentie, cu validare si revenirea focusului pe buton la inchidere. Nu se blocheaza stocul, nu se proceseaza plati si nu se trimit date.
- Campanii: header simplificat, beneficiu/CTA in prima zona, fotografie oficiala, identificarea distribuitorului, beneficii scurte, modele comparabile, pasii solicitarii, FAQ, formular si conditii. Selectarea unui model il precompleteaza in formular. Actiunile pastreaza un singur obiectiv, solicitarea unei oferte.
- Start-Up este identificata explicit drept campanie incheiata la 30.09.2026. Preturile sunt cele publicate cu TVA inclus. Nu am transformat ratele promotionale din sursa intr-o promisiune actuala.
- Winter separa avantajul maxim GLS de beneficiile celorlalte modele. Conditiile de service au perioada publicata 01.09–31.12.2026. Nu am generalizat dobanda GLE/GLS la toate modelele.
- Imaginile provin din campaniile oficiale, optimizate WebP (aproximativ 588 KB pentru cele 10 imagini). Model images lazy-loaded, hero prioritizat. Rutele sunt incluse in prerender si verificarea build-ului Pages.

## Surse si decizii

[NN/g: How Users Read on the Web](https://www.nngroup.com/articles/how-users-read-on-the-web/): titluri descriptive, continut scanabil, o idee pe bloc, informatia principala la inceput. Aplicat in structura si textele scurte.

[CXL: How to Build a High-Converting Landing Page](https://cxl.com/blog/how-to-build-a-high-converting-landing-page/): obiectiv unic, beneficiu clar, CTA vizibil, explicatii relevante inainte de formular si validare ulterioara prin teste. Acestea sunt principii folosite in prototip, nu rezultate CRO masurate.

[Start-Up oficial](https://www.autoklass.ro/articole/mercedes-benz-start-up-editions.html) si [Winter oficial](https://www.autoklass.ro/articole/suv-winter-edition.html): continut si imagini verificate la 01.10.2026. Termenii completi raman accesibili prin linkurile din pagini.

Biblioteca locala BMW/Tesla: fotografie auto, ierarhie simpla, CTA albastru, suprafete neutre. Pastrate fonturile si culorile proiectului. Recomandarea automata UI UX Pro Max pentru sticla/aur/fonturi noi nu a fost aplicata, fiind nepotrivita pentru continuitatea ceruta.

## Findings rezolvate

| Severitate | Locatie | Inainte | Dupa | Principiu |
| --- | --- | --- | --- | --- |
| MEDIUM | src/client-refinement.css:864 | Carduri de 152px+, blocuri separate inalte pentru rulate | Carduri 104px+, panou compact cu doua randuri | Densitate, proximitate si proportii |
| MEDIUM | src/client-refinement.css:227 | Bannerul impingea pagina la 852px intr-un viewport de 768px | Grid cu coloane minmax(0,1fr), fotografie limitata la coloana | Adaptabilitate fara ascunderea overflow-ului |
| MEDIUM | src/routes/autoturisme.$slug.tsx:296 | Lipsea actiunea ceruta de client | Rezerva outlined sub actiunea principala | Ierarhie vizuala si actiune secundara clara |
| MEDIUM | src/components/campaign/CampaignLanding.tsx:59 | Nu existau pagini locale de campanie | Structura reutilizabila pentru doua exemple, formular contextual | Mesaj, ierarhie si continuitatea intentiei |

## Verificari efectuate

- TypeScript, ESLint pe fisierele TS/TSX modificate, git diff --check: pass.
- npm run build:pages: pass; ambele campanii prerandate cu H1, fara render abortat.
- Chromium: campanii la 320/390/430/768/1280px fara overflow orizontal; homepage verificat la aceleasi latimi, inclusiv corectia la 768px.
- Inspectie vizuala capturi: marci 320/390px, CTA produs 390px, campanii hero/model/form 390px, Start-Up hero 1280px.
- Marci si Winter la 390px, toate fonturile dublate: fara overflow orizontal. Aceasta este o verificare de redimensionare a textului, nu un test de zoom nativ Safari.
- Axe: zero incalcari automate pe marci, ambele campanii (WCAG A/AA) si dialogul de rezervare. Nu echivaleaza cu audit complet de accesibilitate.
- Rezerva: deschidere, validare (4 campuri), Escape si focus restore pe nou/rulat; succes demonstrativ verificat.
- Campanii: selectare model, focus, validare cu primul camp invalid, eroare simulata cu ?demo=error, date pastrate si retry cu succes pe ambele pagini.
- Hover/active/focus si reduced motion inspectate in CSS; fara animatii de scroll necesare.

Not verified: Safari pe iPhone real, RTL, screen reader real, zoom nativ 200%, performanta pe retea mobila fizica, efect CRO masurat. Formularele nu au backend; nu se expediaza lead-uri.

Refactoring UI: evaluare interna 8/10 pentru scope (ierarhie si densitate corectate; validarea pe dispozitiv fizic ramane). Top-design: 7/10, directie coerenta de prototip, fara pretentia unei validari externe.

Approve pentru review local, limitat la verificarile de mai sus. Nu reprezinta aprobare pentru lansarea comerciala a ofertelor sau pentru un backend de rezervari.
