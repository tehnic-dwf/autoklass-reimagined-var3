# Design Review: căutare, meniu și fișa auto

**Verdict:** NOT DONE pentru validarea completă a produsului (7/10, 5/7 criterii Jobs). Corecțiile cerute în această rundă sunt implementate și verificate în browser; testarea pe telefon fizic și auditul tuturor stărilor de eroare nu fac parte din dovezile acestei runde.

**The One Thing:** utilizatorul găsește mașina sau serviciul dorit și ajunge la solicitarea de contact.

**Keeps its promise?** Da pentru interacțiunile verificate: CTA-ul căutării deschide catalogul, intervalul de preț se extinde, meniul grupează destinațiile și se închide cu Escape, Sucursale este link direct. Fișa mașinii există fără link sau fișier PDF public.

**Cut list:** CTA pe jumătate de rând pe mobil, plus detașat de etichetă, linii verticale și separatoare duble în meniu, lista mixtă de mărci și servicii, duplicatele Contact/Sucursale/Comparație din submeniuri, descărcarea PDF neoficială.

**Fix list:** pentru o validare a întregului produs, următoarele verificări sunt pe dispozitiv fizic și pe stările de eroare/zero rezultate. Nu s-au adăugat animații sau scroll personalizat într-un formular și un meniu utilitar.

**Back of the fence:** verificarea TypeScript și ESLint a trecut. Browserul a confirmat lipsa depășirilor orizontale la căutare (360, 390, 430, 1280 px) și în meniu (360, 430 px). La 390 px, CTA-ul mobil și formularul au aceeași lățime: 342 px. Nu există link PDF în pagina GLC 200; zona „Fișa mașinii / Specificații și dotări” este prezentă.

## Refactoring UI

8/10 (6/8 criterii). Ierarhia, lizibilitatea fără culoare, spațiul dintre grupuri, lungimea textelor, contrastul principal și lipsa umbrelor decorative sunt potrivite componentelor. Limite pentru 10/10: etichetele formularului încă au greutate similară valorilor; CSS-ul moștenit folosește mai multe scări de spațiere. Acest scor este o evaluare vizuală locală, nu certificare WCAG.

## Top Design

6/10 pentru aceste componente utilitare: tipografie 6, compoziție 6, interacțiuni 5, culoare 6, detalii 7 (medie ponderată 5,95). Nu sunt evaluate ca experiență editorială Awwwards. Prioritatea cerută este claritatea, fără animații care întârzie căutarea. LCP și CLS nu au fost măsurate în această rundă.

## Web Interface Guidelines

Nu au fost identificate încălcări noi în controalele modificate. Dialogul păstrează focus management și Escape; acordeoanele folosesc details/summary; destinațiile folosesc linkuri reale; iconurile decorative au aria-hidden; țintele de interacțiune au minimum 44 px. Fișa statică nu are rol de buton, săgeată sau acțiune fictivă.

Capturi: output/playwright/search-spacing.png, menu-spacing.png, menu-groups.png, product-sheet-no-pdf.png. Captura menu-groups precede mutarea autoutilitarelor la sfârșitul listei de mărci; ordinea finală a fost verificată în browser separat.

Modificările sunt locale. Nu s-a făcut commit, push sau publicare.
