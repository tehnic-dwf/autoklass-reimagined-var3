# Compactare mobil — 21 septembrie 2026

- Cele cinci logo-uri sunt pe un singur rând, cu suprafețe de apăsare de minimum 44 px și nume accesibile.
- Search-ul homepage are bugete compacte, marcă și model alăturate, stare și acțiuni pe rânduri separate. Înălțime măsurată la 360 px: 518 px. Componentele comune compactează și filtrele catalogului; anul/kilometrajul și motorizarea/caroseria sunt alăturate.
- Modelul este dezactivat până la alegerea mărcii. Schimbarea/eliminarea mărcii resetează modelul; verificat și în panoul de filtre.
- Meniul are sublinkuri pentru Mașini și Service, apoi servicii suplimentare. „Mobilitate” este înlocuit cu „Închirieri și asistență rutieră”, cu aceleași servicii în interior. Butonul Contactează-ne rămâne vizibil în footerul meniului.
- `/contact` folosește formularul existent cu nume, prenume, email și telefon, precompletat pentru testare. Validarea și confirmarea sunt locale; nu se expediază date.
- Headerul mobil conține logo, căutare și meniu. Este sticky pe paginile obișnuite; pe catalog se derulează, iar controalele catalogului rămân sticky.
- Bara catalogului are căutare, filtre și sortare pe același rând (65 px cu căutarea închisă). Căutarea se extinde la apăsare și se închide cu butonul sau Escape. Starea Noi/Rulate se schimbă doar în filtre; titlul reflectă starea, marca, modelul, caroseria și motorizarea selectate.
- Tarifele care numesc modele includ explicit Mercedes-Benz. Antetul paginii spune Service Autoklass. Documentul primit nu conține tarife Honda; nu am adăugat asemenea valori.

Verificări: TypeScript, ESLint pe fișierele modificate, build static cu `/contact`; browser la 360/390/430 px pentru homepage, catalog, contact, tarife și produs (15 combinații fără overflow). Verificate: marcă → model, resetare model, căutare expansibilă și Escape, titlu „Autoturisme noi Mercedes-Benz diesel”, menu → contact → confirmare. Header sticky și excepția catalogului confirmate la toate cele trei lățimi.

Capturi: `output/playwright/compact-search-final.png`, `compact-catalog-final.png`, `compact-menu.png`, `compact-contact.png`. Nu s-a publicat pe GitHub.
