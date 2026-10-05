# Marci: revizie mobila, 1 octombrie 2026

## Scope si acoperire

Exclusiv sectiunea de marci din homepage, inclusiv Autoklass / Das WeltAuto. React, TanStack Router, CSS si tokenurile existente. Conventii consultate: AGENTS.md si docs/design-decisions.md. Cerinta: doua marci pe rand, sigle mai mari, contrast si lizibilitate imbunatatite; local, fara publicare.

| Domeniu | Dovezi inspectate | Rezultat |
| --- | --- | --- |
| Accessibility | Linkuri native, arbore accesibil, Tab prin 8 linkuri, focus, axe-core 4.10.3 | Fara incalcari automate; contrastul cerut manual de axe a fost masurat separat |
| Layout | 320/375/390/430px, emulare iPhone 13 cu DPR 3 si touch, text dublat la 320px | Fara overflow sau text taiat in sectiune |
| Writing | Denumiri marci, Ford In curand, destinatii Autoklass / Das WeltAuto | Terminologie pastrata; Ford are nume vizibil si logo decorativ |
| Typography | Titlu, etichete, wrapping si text dublat | Nume 16px/600, status 14px/400 |
| Colors | Perechi calculate din culorile efectiv randate | Text marci 14,47:1; status 5,64:1; linkuri 6,20:1 |
| UI | Capturi normale si DPR3, dimensiuni optice, imagini incarcate | Grila coerenta, aceleasi suprafete, zone de rulate distincte |

## Constatari si rezolvare

| Severitate | Domeniu | Locatie | Inainte | Dupa | Motiv |
| --- | --- | --- | --- | --- | --- |
| MEDIUM | Typography | src/client-refinement.css:854 | Nume 12–13px si trei marci pe rand | Doua coloane, nume 16px | Lizibilitate la dimensiunea reala a telefonului |
| MEDIUM | UI | src/client-refinement.css:894 | Sigle de 28–43px, padding intern diferit in fisiere | Dimensiuni optice individuale si campuri comune | Echilibru intre sigle, fara deformarea proportiilor |
| MEDIUM | Layout | src/client-refinement.css:976 | Rulate in randuri mici, grupate strans | Doua suprafete separate, linkuri de minimum 44px | Destinatii mai clare si tinte tactile distincte |
| HIGH, rezolvat | Layout | src/client-refinement.css:934 | La testul cu text dublat, numele lungi depaseau celula; locatiile ramaneau inghesuite | Wrapping pentru nume, linkuri de locatie cu flex-wrap si baza in em | Reflow la marirea textului |
| LOW | UI | src/components/home/HomeBrands.tsx:3 | Aproximativ 661KB pentru cele sase sigle | Aproximativ 107KB WebP, rezolutie suficienta pentru DPR3 | Mai putine date de incarcat pe mobil |

## Verificari

- Playwright CLI, Chromium: toate cele patru latimi fara overflow; nume 16px; toate cele opt imagini incarcate.
- Emulare iPhone 13 in Chrome: 390 CSS px, DPR3, touch activ; captura inspectata. Aceasta nu este Safari real.
- Text dublat prin stiluri in sectiune la 320px: fara overflow si fara etichete care depasesc tinta.
- Tab: toate cele opt linkuri au outline solid 2px si tinta de minimum 44px. Numele si destinatiile sunt prezente in arborele accesibil. Ford nu este un link indisponibil.
- axe-core, WCAG 2 A/AA, 2.1 AA si 2.2 AA, scope .ak-brands: zero violations. color-contrast a ramas incomplete; perechile au fost masurate manual din computed styles. Accentul #075ca8 are 6,20:1 pe #f4f5f6; pe alb 6,77:1.
- Viewport: width=device-width, initial-scale=1, fara limitarea zoomului.
- ESLint, TypeScript si git diff --check.

Not verified: Safari/iPhone fizic, VoiceOver, zoom nativ de browser 200%, RTL, Core Web Vitals. WebKit Playwright a fost instalat, dar a esuat la lansare cu Bus error 10; nu se considera verificare Safari. Testul cu text dublat nu inlocuieste zoomul nativ.

Referinta: https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md, consultata la 1 octombrie. UI/UX Pro Max: touch spacing, touch friendly si contrast readability; recomandari aplicate strict sectiunii.

Refactoring UI: 9/10 (7/8), diferenta pana la 10 fiind scara mostenita de valori de spatiere din sectiune. Top-design: 6,6/10 (tipografie 7, compozitie 7, interactiuni 4, culoare 7, detalii 8); este un selector comercial, fara directie editoriala originala sau performanta masurata care sa sustina un scor Awwwards. Nu s-a adaugat miscare decorativa.

Approve pentru scope-ul si verificarile descrise.

## Corectie dupa capturile utilizatorului

Scope: alinierea siglelor si cardul Das WeltAuto; aceasta revizie inlocuieste asezarea flex-wrap a locatiilor descrisa mai sus.

| Severitate | Locatie | Inainte | Dupa | Motiv |
| --- | --- | --- | --- | --- |
| MEDIUM | src/client-refinement.css:885 | Imagini de 84–96px intr-un camp de 72px, prea aproape de nume | Camp flex de 80px, imagini limitate la inaltimea lui, gap 16px | Continutul ramane in zona lui; numele pastreaza aceeasi aliniere |
| MEDIUM | src/client-refinement.css:1009 | Grid cu justify-content mostenit, coloana ingusta; sageti departate de nume | Coloana explicita minmax(0,1fr), doua randuri de 44px cu sageti langa text | Latime stabila si gruparea fiecarei destinatii cu pictograma sa |
| LOW | src/client-refinement.css:983 | La wrapping, linkul Autoklass era impins spre dreapta de auto margin | Fara auto margin; continutul continua pe aceeasi margine | Aliniere la latimi inguste |

Verificat in browser: 320/390/430px fara overflow, fara text taiat si fara sigle care depasesc campul imaginii; locatii cu minimum 44px; text dublat la 320px fara depasiri; oglindire RTL fara overflow. Capturi inspectate pentru ambele zone la 390px. git diff --check trecut. Nu s-au introdus animatii sau interactiuni noi.

Not verified: zoom nativ 200%, Safari/iPhone fizic, screen reader si audit complet RTL al intregii pagini. Testul de text dublat nu este zoom nativ.

Approve pentru aceste corectii locale.

## Revizie ulterioara: compactare ceruta de client

Valorile din iteratiile de mai sus sunt istorice. Varianta actuala foloseste carduri de minimum 104px, campuri de logo de 44px si gap 8px. Autoklass / Das WeltAuto sunt din nou in acelasi panou compact. Verificarile actualizate sunt in [review-ul consolidat](./campaigns-and-compact-brands-2026-10-01.md).
