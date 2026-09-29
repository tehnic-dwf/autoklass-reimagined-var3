# PDP mobil: densitate, galerie si dotari

Scope: pagina de produs, exemplele GLC nou si Audi A7 rulat, 320/390/430 px. React, TanStack Router, CSS existente, Radix Dialog. Conventii existente: docs/design-decisions.md si docs/mobile-redesign-2026-09-18.md. Nu este un review complet al site-ului.

| Domeniu | Dovezi | Rezultat |
| --- | --- | --- |
| Accessibility | Controale native, nume accesibile, aria-pressed, Enter/Escape, focus restaurat | Verificarile descrise trecute |
| Layout | Capturi la 390 px, reflow pe ambele exemple la 320/390/430 px | Fara overflow, toate controalele galeriei sub imagine |
| Writing | Etichetele grupelor de echipare, titluri si text redundant | Doua subgrupe explicite, fara badge repetat la fiecare dotare |
| Typography | Titluri de sectiune 24 px, liste 15 px, control 44 px | Text lizibil, randuri care se pot imparti |
| Colors | Paleta albastra si gri existenta | Diferenta dintre echipari indicata si prin text, nu doar culoare |
| UI | Galerie libera, toolbar unic, categorii expandabile | Capturi inspectate, interactiuni pastrate |

| Severitate | Domeniu | Locatie | Inainte | Dupa | De ce |
| --- | --- | --- | --- | --- | --- |
| MEDIUM, rezolvat | Layout | src/routes/autoturisme.$slug.tsx:171; src/client-refinement.css:1419 | Cinci elemente suprapuse pe imagine si rand suplimentar de miniaturi | Toolbar de 60 px sub fotografie; miniaturile ascunse pe mobil | Fotografia ramane libera, fara pierderea navigarii sau maririi |
| MEDIUM, rezolvat | Layout | src/client-refinement.css:755; src/client-refinement.css:1469 | Date tehnice inaintea fotografiei; sectiuni cu padding de 48 px | Galerie imediat dupa titlu; datele dupa oferta; sectiuni de 24 px | Utilizatorul vede exemplarul si pretul mai devreme |
| MEDIUM, rezolvat | Writing | src/routes/autoturisme.$slug.tsx:467 | Standard / Optional inclus repetat langa fiecare rand, ingustand textul | Subgrupe „Optionale incluse in pret” si „Echipare standard” in fiecare categorie | Sens explicit, lista foloseste intreaga latime |
| LOW, rezolvat | UI | src/routes/autoturisme.$slug.tsx:409; src/client-refinement.css:1476 | Introducere promotionala, liste verticale si fotografii repetate | Titlu scurt, highlights pe doua coloane; fotografiile raman in galerie | Reduce lungimea fara eliminarea specificatiilor |

Verificari trecute:
- npx tsc --noEmit; npx eslint 'src/routes/autoturisme.$slug.tsx'.
- Playwright: ambele exemple la 320/390/430 px, fara overflow; toate butoanele galeriei minimum 44 x 44 px, sub imagine.
- Urmatoarea fotografie schimba contorul la 2 / 14. Enter deschide galeria; Escape inchide si restaureaza focusul pe controlul de marire.
- Salvarea a fost activata si dezactivata; aria-pressed reflecta starea.
- Cautare DIGITAL LIGHT: un rezultat in „Optionale incluse in pret”. Cautare fara rezultate: mesaj si actiunea de stergere functionale.
- CTA deschide formularul; Escape il inchide. Niciun lead trimis.
- Capturi inspectate: /tmp/ak-compact-product-top.png si /tmp/ak-equipment-groups.png.

Not verified: VoiceOver/NVDA, axe, zoom nativ 200%, forced-colors, RTL, Safari/iOS real, Core Web Vitals. Nu s-au introdus stari loading/error noi. Nu s-au schimbat clasificarile demonstrative ale dotarilor.

UI Pro Max: cautarea pentru densitate nu a furnizat un rezultat specific util; decizia de compactare se bazeaza pe principiile de grupare si ierarhie din Refactoring UI si Better Layout, nu pe o recomandare de baza de date.

Refactoring UI: 9/10 pentru suprafetele inspectate; scala existenta pastreaza cateva intervale de 12/20 px. Pentru 10/10, uniformizarea lor trebuie verificata in toate sectiunile. Top-design: 6,6/10, evaluare anterioara pastrata; acest pas optimizeaza un flux comercial, nu reface directia foto, identitatea sau motion-ul. Scorul nu reprezinta o masurare a conversiei.

Approve pentru suprafetele si verificarile enumerate.

## Revizie finala: alinierea statutului dotarilor

Scope restrans: lista dotarilor si subtitlurile sale. Gruparea dupa functie este pastrata, iar fiecare dotare are statutul propriu. Separarea anterioara in doua liste standard/optional este inlocuita.

| Severitate | Domeniu | Locatie | Inainte | Dupa | Motiv |
| --- | --- | --- | --- | --- | --- |
| MEDIUM, rezolvat | Layout | src/client-refinement.css, regula .ak-equipment-row.has-kind | Flex-wrap muta etichetele alternativ la dreapta sau dedesubt | Grid, coloana de statut de 104 px, aliniere la inceputul randului | Pozitie predictibila pentru scanarea statutului |
| MEDIUM, rezolvat | Typography | src/client-refinement.css, regula .ak-equipment-topic > h3 | Stilul global suprascria marimea subtitlului | Selector specific, 15 px / 600, sub nivelul categoriei | Restabileste ierarhia |

Verificat vizual in browser; la 320/390/430 px toate cele 37 de etichete din categoria deschisa au aceeasi coordonata orizontala, latime 104 px si text integral. Subtitlu calculat 15 px. Fara overflow orizontal. Modificare CSS; continutul, cautarea si semantica nativa sunt pastrate. Accessibility: reflow si text vizibil verificate; Layout, Typography si UI: randurile inspectate in captura /tmp/ak-equipment-aligned.png; Writing si Colors: aceleasi etichete si perechi de culori existente. Nu s-au adaugat interactiuni sau animatii.

Not verified pentru aceasta revizie: screen reader, axe, zoom nativ 200%, RTL, forced-colors. Scoruri de referinta pastrate: Refactoring UI 9/10 (scala de spatiere existenta ramane de uniformizat), Top-design 6,6/10 (directia foto si identitatea vizuala nu sunt refacute de aceasta corectie).

Approve pentru lista si latimile inspectate.
