# Design Review: meniu, căutare și contact

**Verdict:** NOT DONE pentru validarea întregului produs, 7/10 după criteriile Jobs (5/7). Cerințele acestei runde sunt implementate și verificate; lipsesc testarea pe telefon fizic și auditul tuturor stărilor întregului site, care depășesc această rundă.

**The One Thing:** utilizatorul ajunge rapid la mașina sau serviciul dorit și poate formula o solicitare de contact.

**Keeps its promise?** Da în prototip: căutarea din header deschide catalogul cu câmpul focalizat; în catalog păstrează marca, query-ul și sortarea. Meniul închis pe subcategorii încape integral la înălțimea 844 px, la lățimi 360/390/430/1280. Formularul validează subiectul și acceptă alegerea opțională a sucursalei.

**Cut list:** un nivel repetitiv din meniul mașinilor, spațiu redundant între linkurile principale, opțiunea implicită ambiguă „Ordonează”, prioritizarea automată a mașinii demo.

**Fix list:** verificare viitoare pe telefon fizic și măsurarea conversiilor în producție. Nu se afirmă o creștere măsurată a lead-urilor. Scor local Refactoring UI: 8/10 (6/8: rămân scările de spațiere moștenite și greutatea etichetelor). Top Design: 6/10 pentru componente utilitare; nu se urmăresc animații editoriale în meniu și formular.

**Back of the fence:** submit indisponibil până la inițializarea interacțiunilor, pentru a evita trimiterea nativă accidentală a câmpurilor în URL. Eroarea subiectului păstrează numele accesibil și mută focusul pe câmp. Safe area este păstrată în footer-ul meniului. Formularul rămâne simulare locală, fără integrare CRM nouă.

## Decizii și surse

- Căutarea globală de mașini are o destinație consecventă: catalogul, cu input vizibil și focus. Oferă rezultate, filtre și sortare în același context. Alegerea este o ipoteză CRO a proiectului, nu rezultatul unui A/B test.
- Implicit „Recomandate”: alternare între mărcile care respectă filtrele; mașinile rezervate la final. Fără scor de popularitate sau personalizare inventate. Primele cinci rezultate ale inventarului curent conțin cinci mărci. [Baymard: default sort](https://baymard.com/research-articles/default-sort-type) susține prezentarea diversității catalogului; implementarea pentru Autoklass este alegerea noastră.
- Sortări: Recomandate, Preț mic → mare, Preț mare → mic, Kilometraj mic, An recent, Putere mare. Kilometrajul necunoscut ajunge la final. Anul este anul fabricației, nu data publicării. Nu există opțiuni „Cele mai noi anunțuri” sau „Livrare imediată” fără datele necesare. [Baymard: category-specific sorting](https://baymard.com/research-articles/category-specific-sorting).
- Cele 15 destinații de contact sunt transcrise din [lista live Autoklass](https://www.autoklass.ro/sucursale), verificată la 21 septembrie 2026. Sunt distincte de lista mai restrânsă din documentul tarifelor de service. Sucursala este opțională, implicit „Fără preferință”. Subiectul este editabil și precompletat pentru testare.
- Textul intervalului: „Alege un interval de preț”.

## Dovezi

- TypeScript, ESLint și build:pages: trecute pe versiunea finală.
- Browser: intrare din header cu input focalizat; păstrarea query-ului Audi; păstrarea brand=Audi și sort=price-desc; selectarea noii sortări după putere.
- Toate cele cinci sortări numerice verificate pe întregul inventar. Verificate: kilometraj necunoscut la final, lipsa mutației inventarului, fallback pentru sortare invalidă, 23 rezultate și rezervate la final în Recomandate.
- Contact: subiect gol/spații respins cu focus și eroare; succes cu sucursală aleasă și fără sucursală; subiectul și sucursala apar în confirmare; validarea nu adaugă date în URL.
- Meniu: la 360/390/430, scrollHeight = clientHeight = 634 px; la 1280, ambele 646 px. Fără depășire orizontală. Listele extinse rămân scrollabile, footer-ul accesibil, Escape închide dialogul.
- Capturi: menu-compact-final.png, header-search-final.png, contact-subject-branch.png, search-price-interval-final.png, catalog-sort-final.png în output/playwright.
- Web Interface Guidelines: controalele modificate au etichete, focus, ținte de minimum 44 px și semantică nativă; nu au fost identificate încălcări noi după corectarea etichetei erorii de subiect.

Toate schimbările sunt locale. Niciun commit, push sau deploy.
