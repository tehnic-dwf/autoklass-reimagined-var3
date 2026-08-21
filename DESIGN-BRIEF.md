# Autoklass — Brief de rafinare UI/UX + copy (v2)

Referințe: **mercedes-benz.ro** (rigoare, scară tipografică amplă, imagine care respiră,
CTA-uri sobre) și **aesop.com** (reținere, spațiu alb generos, ton uman și consultativ,
experiență calmă de programare / localizare magazin).

## REGULI ABSOLUTE (nu se încalcă)

1. **Nu schimba structura sau flow-ul.** Aceleași rute, aceleași secțiuni, în aceeași ordine,
   aceleași câmpuri de formular, aceiași pași, aceleași componente. Nu adăuga/șterge secțiuni.
   Nu adăuga rute. Nu schimba forma datelor din `src/data/*`.
2. **Nu schimba culorile.** Valorile din `:root` și `.dark` din `src/styles.css` (background,
   foreground, primary, accent, trust, destructive, silver, graphite…) rămân EXACT cum sunt —
   fac parte din brandingul Autoklass. Poți folosi opacități/`color-mix` pe tokenurile existente,
   dar nu introduci hue-uri noi.
3. **Nu schimba fonturile.** MBCorpoTitle (display) + MBCorpoText (text) rămân.
4. **Nu inventa cifre sau promisiuni.** Datele factuale existente (2 ore lucrătoare, 9 sucursale,
   100+ puncte de control, prețuri, TVA, ani de autorizare) se păstrează ca atare.
5. **Română corectă, cu diacritice** (ș, ț, ă, î, â). Ghilimele românești „…”.
6. **Editezi DOAR fișierele din scope-ul tău.** Dacă un fix ar cere alt fișier, îl raportezi, nu îl faci.

## Direcția vizuală

### Tipografie
- Mai mult **contrast de scară**: titlurile de secțiune pot merge până la `text-4xl`/`text-5xl` pe
  desktop, cu `leading` strâns (0.98–1.06) și `tracking-[-0.01em]` pe display.
- Corp de text: `max-w-[62ch]` pe paragrafele lungi (măsură Aesop). Nimic sub 14px.
- `eyebrow` rămâne 14px, dar folosește-l consecvent: o singură etichetă per secțiune, sus.
- Prețuri, cifre, KM: `font-display tabular-nums`.
- **Punctuație consecventă în titluri**: titlurile-afirmație primesc punct final; titlurile-întrebare
  semnul întrebării; etichetele scurte, nimic. Nu amesteca în aceeași pagină.

### Spațiu și ritm (cel mai mare câștig vizual)
- Gutter pagină: `px-6` mobil, `md:px-8`, `lg:px-10` (acum e `px-5`, prea strâns).
- Ritm vertical mai generos: secțiuni `py-16` mobil → `md:py-24` → `lg:py-32`.
  Aesop respiră; acum totul e comprimat la `py-12`.
- Spațiu între eyebrow → titlu → paragraf → CTA: 12 / 20 / 32px, nu totul la 16.
- **Redu zgomotul de linii**: nu fiecare secțiune are nevoie de `border-t`. Alternanța de fundal
  (background ↔ secondary ↔ primary) separă suficient. Păstrează hairline-urile doar unde
  structurează o listă (intents, pași, FAQ, tabel).
- Linii hairline: `border-border/70` în loc de `border-border` plin.

### Suprafețe
- Carduri: fără bordură grea. `bg-card` + `ring-1 ring-border/60`, `rounded-sm`, fără umbră
  în repaus; la hover ridici discret contrastul bordurii, nu adaugi umbre.
- Imagini: `rounded-sm`, `object-cover`, zoom la hover max `scale-[1.03]`, 600ms, easing calm.
- Zero glassmorphism, zero gradiente decorative, zero umbre colorate. Doar `shadow-panel`
  pe elemente cu adevărat flotante (dock mobil, meniu).

### Butoane și acțiuni (upgrade important)
- Solid (`default`): fundal `primary`, `tracking-[0.01em]`, padding orizontal mai generos
  (`px-7`/`px-8`), înălțime 48px mobil / 46px desktop, tranziție doar pe culoare.
- `outline`: `border-foreground/25`, hover → fundal `foreground/[0.06]`, nu `muted` plin.
- Link-acțiune (patternul MB/Aesop): text bold + săgeată care translatează 2–3px la hover.
  Folosește-l pentru „Vezi stocul”, „Programează” etc. în liste, în loc de text simplu colorat.
- Toate acțiunile păstrează clasa `press` și `focus-visible` vizibil.

### Mobil (prioritate)
- Ținte de atingere ≥ 44px, ideal 48px. Spațiere ≥ 8px între ținte adiacente.
- Rail-urile cu `snap-rail`: cardul următor trebuie să se „iveasca” (peek) — lățime `w-[82vw]`
  și gutter corect, ca utilizatorul să înțeleagă că se poate derula.
- Titlurile hero pe mobil: `clamp()` care nu depășește 3 rânduri pe 360px lățime.
- Formulare: input min 48px, label deasupra, erori sub câmp, `inputMode`/`autoComplete` corecte.
- Nimic nu trebuie să treacă sub bara sticky: `pb-28` pe containerul paginii unde e cazul.
- Fără hover-only: orice info accesibilă la hover trebuie accesibilă și la tap.

## Tonul copy-ului (RO)

Aesop = **calm, uman, consultativ, concret**. Mercedes = **sobru, precis, fără hype**.

- Vorbește la persoana a II-a, direct, fără exclamări, fără superlative („cea mai bună”, „unic”).
- Preferă verificabilul în locul adjectivului: nu „servicii premium”, ci „mașină de schimb pe
  durata reparației”.
- Elimină umplutura corporate („soluții”, „experiență de neuitat”, „partenerul tău de încredere”).
- Titlurile spun un lucru, nu trei. Paragraful de sub titlu explică *ce urmează să facă omul*.
- Microcopy util în loc de generic: „Confirmăm ora în maximum 2 ore lucrătoare” > „Trimite”.
- Stările goale, erorile și confirmările sunt scrise ca de la om la om, cu următorul pas clar.
- Etichetele de buton încep cu verb și spun rezultatul: „Vezi mașinile disponibile”,
  „Cere evaluarea”, „Confirmă programarea”.

## Accesibilitate (se păstrează, nu se degradează)
- Contrast ≥ 4.5:1 pentru text, ≥ 3:1 pentru elemente UI. Verifică textul pe `primary` și pe imagini.
- `aria-expanded`, `aria-controls`, `role`, `inert` existente rămân.
- `:focus-visible` vizibil pe fond deschis ȘI închis.
- Respectă `prefers-reduced-motion` (deja gestionat global).

## Verificare
- TypeScript trebuie să compileze. Nu introduce importuri nefolosite (eslint).
- Nu importa librării noi.
- Clasele Tailwind v4 folosite trebuie să existe (proiectul e Tailwind v4 cu `@theme`).
