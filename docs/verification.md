# Verificări V3

Ultima verificare locală: 14 septembrie 2026. Browser Chrome și browserul integrat Codex. Date folosite în formulare: exclusiv exemple demonstrative; fără transmitere către Autoklass.

## Verificat

- TypeScript: `npx tsc --noEmit --pretty false`, trecut.
- ESLint pe toate componentele/rutele noi sau rescrise din fluxurile V3, trecut. Verificarea nu pretinde că toate paginile istorice V2 au fost refăcute.
- `git diff --check`, trecut.
- `npm run build:pages`, trecut, cu prerender și `404.html`/`.nojekyll` generate.
- Homepage → Noi → GLC → maximum 80.000 EUR: 2 rezultate; selecțiile sunt transferate în URL.
- Sortare descrescătoare: 74.779 EUR înainte de 69.714 EUR. Întoarcerea din fișă păstrează criteriile și sortarea.
- Dotări: LED găsește DIGITAL LIGHT în fișa demo; căutarea „trapa” dă zero rezultate, fără a inventa echiparea. Resetul restabilește cele 18 mașini.
- Panoul de filtre se închide cu Escape; focusul revine la butonul care l-a deschis.
- Starea de eroare a catalogului păstrează modelul GLC la reîncercare. Starea de încărcare afișează schelete și text de stare.
- Comparație: adăugare/eliminare, maximum trei mașini, diferențe și valori necomunicate. Test interactiv cu două mașini pe 13 septembrie.
- Fișa GLC: imagini încărcate, titlu înaintea galeriei pe mobil, CTA unic de ofertă, fără linkuri telefon/WhatsApp/rezervare în corpul fișei.
- Ofertă: exact patru câmpuri, validări inline, focus pe primul câmp invalid; eroare simulată → reîncercare → succes fără recompletare. Închiderea readuce focusul la CTA.
- Service: tariful standard Pipera 500 lei/oră → Sibiu 450 lei/oră. Estimarea preia sucursala, serviciul și categoria tarifară.
- VIN invalid împiedică pasul următor; alternativa fără VIN/km permite continuarea și explică limita estimării.
- Programare: revenire între pași fără pierderea contactelor; eroare simulată și reîncercare. Confirmarea nu pretinde că s-a rezervat un interval.
- Remediere găsită la test: data preferată putea fi pierdută la interacțiunea cu alt câmp. Preluarea evenimentului `input` pentru data nativă păstrează acum 5 octombrie 2026 după revenire între pași și în confirmare.
- Meniu: deschidere, grupa Mobilitate, destinații reale și închidere cu revenirea focusului. Meniu etichetat vizibil și pe desktop.
- Homepage, listare, GLC, tarife, solicitare service și comparație: fără depășire orizontală a documentului la 360, 390 și 430 px, 18 verificări. Rezultatele sunt în `output/review/responsive-checks.json`.
- Inspecție vizuală a hero-ului, meniului, listării, fișei, formularului și tarifelor pe mobil; homepage și selecția auto pe desktop 1440 px. Capturi în `output/review/`.

## Limitele verificării

Nu au fost testate pe telefoane fizice tastatura iOS/Android, cititorul de ecran sau mărirea textului la 200%. Verificarea lățimii nu substituie un audit complet WCAG. Nu au fost trimise solicitări reale, testate integrări CRM sau confirmări din calendar. Pagini secundare marcate ↗ sunt destinații existente; ele nu fac parte din redesignul local al formularelor.

Nu există un rezultat A/B sau o măsurare a creșterii conversiei. Planul de evaluare CRO este în `design-decisions.md`.
