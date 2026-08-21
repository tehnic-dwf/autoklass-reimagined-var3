# Autoklass.ro — prototip parțial mobile-first (6 ecrane)

Prototip de lead generation, în limba română cu diacritice, construit strict pe recomandările din Capitolele 3–5 ale raportului UX/CRO și pe anexa de audit mobil. Fără urgency fals, fără GDPR, fără nume reale de consultanți.

## Pasul 0 — Extragere assets reale de pe autoklass.ro (înainte de orice cod)

Extrag, prin scraping, de pe site-ul live:

- Logo din header (`https://www.autoklass.ro/`)
- Paletă de culori și font-family din CSS-ul paginii principale (header, butoane, footer)
- Minim 5–6 imagini reale de mașini din `/search/filtre/stare-rulat` și `/search/filtre/marca-mercedes-benz`
- Structură și copy din `/articole/programare-service.html` și `/articole/gestionarea-daunelor.html`
- Structura unei pagini `/vanzari-auto/...` pentru layout-ul de detaliu
- Iconițe de contact din header/footer

Logo-ul și imaginile intră ca pointeri Lovable Assets; culorile și fontul devin tokenuri semantice în `src/styles.css` (oklch). Dacă extragerea eșuează pe un element, mă opresc și cer assetul, fără înlocuitor inventat.

## Sistem vizual

- Paleta și fontul exact din Pasul 0 (dark gray/black, silver, accent discret), fără variantă „inspirată de Mercedes”.
- Design pornit literal de la 375px, apoi extins spre desktop.
- Tokenuri semantice în `src/styles.css`, zero culori hardcodate în componente. Shadcn UI + Lucide.
- Ierarhie de z-index: meniu burger și modaluri deasupra widget-urilor flotante; widget-urile se ascund când meniul e deschis.

## Ecran 1 — Homepage (`/`)

- Hero cu un singur banner, CTA principal „Vezi mașinile disponibile →” și CTA secundar discret „Cum funcționează procesul, pas cu pas”.
- Search bar restrâns pe mobil („Ce mașină cauți?”), preț de pornire sub el când există filtru activ, quick filters: SUV, Sub 20.000 €, Electrice, Hybrid — duc în categoria cu filtre pre-aplicate.
- Grid branduri: logo + „X mașini în stoc” (număr marcat clar ca placeholder în cod) + „Autorizat [brand] din [an]”.
- „Cum cumpăr online” în 3 pași, cu linia de încredere dedesubt: „Prețul final, comunicat înainte să începem orice lucrare.”
- Două carduri de servicii cu contrast ridicat: „Programează o revizie sau reparație” → Service, „Ai avut un accident?” → Dosar Daune.
- Sticky navigation dinamic pe mobil: CTA „Test Drive” pe ecranele de achiziție, „Programare Service” pe cele de after-sales.

## Ecran 2 — Meniu burger

```text
Autoturisme            → categoria unificată
Service auto
  → Programare Service
  → Dosar Daune
Despre noi             (vizibil, fără pagină)
Blog                   (vizibil, fără pagină)
```

Jos, fix: telefon vizibil, email, iconiță chat — fără suprapunere de widget-uri peste numărul de telefon.

## Ecran 3 — Pagină de categorie (`/autoturisme`)

- O singură listă filtrabilă; „Nou / Rulat” este filtru, nu navigare separată. Filtre sus: Marcă, Stare, Preț (interval), Combustibil.
- Card: imagine reală, marcă + model, an, kilometraj (dacă rulat), preț, maxim 1–2 badge-uri justificate de date („Nou 2026”, „Hibrid”).
- Pe cardurile de rulate, sub preț: „Vezi raportul de verificare tehnică”.
- Click pe card → pagina de produs.

## Ecran 4 — Pagină de produs (`/autoturisme/:slug`)

- Galerie foto cu imagini reale, specificații (an, km, combustibil, transmisie, putere).
- Preț cu notă mică: „Preț final, fără costuri ascunse.”
- Pentru rulate: secțiune „Istoric verificat” cu link către raport (document placeholder).
- Două acțiuni vizibile fără scroll excesiv:
  1. „Programează test drive” → formular scurt (Nume, Telefon, Email, Sucursală, Data preferată), cu „Fără nicio obligație de cumpărare.” bold deasupra formularului.
  2. „Vorbește cu un consultant” → bloc cu 2–3 consultanți (foto placeholder, `[Nume Consultant]`, specializare tip „Consultant Mercedes-Benz”), text „Suntem aici și dacă vrei doar să afli mai multe — nu e nevoie să fii decis să cumperi azi.” + câmp de contact minim (telefon sau email) și mesaj opțional.

## Ecran 5 — Programare Service (`/service/programare`) — prioritate maximă

- Pas 1 pe mobil: maxim 4 câmpuri simultan — Nume, Telefon, „Ce te interesează?”, Sucursala. Pas 2 expandabil: marcă/model auto, mesaj.
- „Ce te interesează?” cu opțiuni predefinite: Revizie periodică / Diagnoză / Reparație / Estimare preț.
- Sub selector: „Prețul final se comunică înainte de a începe orice lucrare suplimentară față de pachetul standard.”
- Checkbox „Pick-up service”.
- SLA bold lângă butonul de trimitere, fără scroll suplimentar: „Te contactăm în maxim 2 ore, în programul nostru de lucru.”
- Selector de sucursală tip dropdown/radio, nu stivă de fotografii; footer minimalist pe această pagină.

## Ecran 6 — Dosar Daune (`/service/dosar-daune`)

- Telefon proeminent sus (placeholder).
- Proces în 3 pași înaintea formularului: ne contactezi sau vii la noi → constatare și dosar → ridici mașina reparată.
- FAQ scurt (4–5 întrebări): cât durează, ce documente sunt necesare, primesc mașină la schimb, „pot vedea/fotografia piesele înlocuite?”.
- Formular final scurt: Nume, Telefon, Tip daună (RCA/CASCO), mesaj opțional. Footer minimalist.

## Copy și micro-copy

- Toate textele în română cu diacritice, inclusiv erori și placeholder-uri.
- Ton diferențiat: premium = informativ și fără presiune; preț-sensibil = preț rapid și transparent; after-sales = timp, cost, proces.
- Validare la blur/submit, cu mesaj explicativ sub câmp („Introduceți codul din 17 caractere”), nu doar pictogramă roșie.
- CTA cu beneficiu, niciodată „Trimite”.
- Interzis: countdown, „X persoane vizualizează”, „ultimele 3 unități”, „test drive GRATUIT”, badge de stoc fără date reale.

## Tracking simulat

- Helper unic `trackEvent` cu `form_start` / `form_submit` și `form_name` distinct: `test_drive`, `contact_consultant`, `programare_service`, `dosar_daune` — un singur nume de eveniment per acțiune.
- `module_click` cu `data-module` pe search bar, carduri de mașină, butoanele de test drive și consultant.
- Fără GA4 real; evenimentele se logează în consolă în prototip.

## Detalii tehnice

- TanStack Start, rute pe fișiere: `src/routes/index.tsx`, `autoturisme.tsx`, `autoturisme.$slug.tsx`, `service.programare.tsx`, `service.dosar-daune.tsx`.
- Date demo tipate în `src/data/` (vehicule, sucursale, consultanți, servicii), ușor de înlocuit cu feed real.
- Formulare cu react-hook-form + zod, limite de lungime, encodare corectă pe link-urile de contact.
- `head()` propriu per rută (titlu, descriere, og), H1 unic, alt text, lazy loading pe galerii.
- Fără backend, fără auth, fără plăți, fără GDPR.

## Ce NU construim

Blog, buy-back, pagini de sucursală, pagini de model individuale, checkout. Link-urile „Despre noi” și „Blog” rămân vizibile fără pagină.
