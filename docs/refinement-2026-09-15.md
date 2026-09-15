# Refinement local, 15 septembrie 2026

Modificările acestei runde rămân locale. Publicarea pe GitHub necesită instrucțiunea ulterioară a utilizatorului.

## Direcție vizuală și criterii

Esență: încredere. Contrast vizual: hero cinematografic întunecat și suprafețe calme de showroom. Moment distinctiv: video-ul și tipografia Mercedes din hero, păstrate la cererea utilizatorului. Ambiție tehnică: interacțiuni directe, responsive, cu media oprită în afara viewport-ului și respectarea reduced-motion. Nu sunt necesare biblioteci suplimentare de animație.

Skill-uri aplicate: ui-ux-pro-max, web-design-guidelines, top-design. Cele două interogări ale generatorului de design au recomandat o direcție prea axată pe mișcare pentru acest site de lead generation. Nu am adoptat automat fonturile, roșul sau animațiile sugerate. Am folosit regulile generale de accesibilitate și interacțiune și am extins identitatea existentă apreciată de utilizator.

Evaluare vizuală orientativă, nu rezultat de user testing: circa 6/10 înainte, circa 7/10 după. Pentru nivelul 9–10 din rubrica Top Design ar fi necesară o direcție fotografică mai uniformă între mărci, materiale originale coerente și validare suplimentară a performanței. Scopul acestei runde este claritatea și consistența conversiei, fără a forța efecte de portofoliu într-un catalog auto.

## 1. Homepage

Ordine: hero cu cele două acțiuni principale; căutare; legături rapide la servicii; categorii auto vizuale și mărci; șase mașini din segmente diferite; sprijin pentru cumpărare; service; servicii secundare; sucursale.

Selecțiile Noi, Rulate, Electrice, Hibride și Sub 40.000 € schimbă mașinile afișate și au link spre listarea completă filtrată. Pe mobil, selecția se poate parcurge prin scroll și două butoane. Nu se rotește automat. Categorii: SUV, Limuzine (inclusiv datele normalizate ca Sedan), Coupé, Compacte. Acces la Audi, Volkswagen și autoutilitare prin destinațiile lor existente.

Rațiunea CRO: arătăm varietatea gamei și scurtăm drumul către o listare relevantă. Este o ipoteză de design, nu o promisiune de creștere măsurată a conversiei. Principiile de descoperire din cercetarea Baymard se aplică aici căutării produsului; fluxul comercial rămâne solicitarea de ofertă.

## 2. Listare, produs, ofertă

22 de mașini din trei mărci în catalogul local. Filtrele de bază sunt vizibile în listare; cele detaliate folosesc panoul existent. Marca controlează modelele disponibile. Cardurile păstrează imaginea, marca, modelul, anul, motorizarea, kilometrajul sau puterea, prețul și acțiunile utile.

Contactează-ne este CTA-ul principal, imediat după preț în pagina de produs. Formularul Solicită ofertă are exact Nume, Prenume, Email, Telefon. Identitatea consultantului nu este inventată. Opțiunile de model neverificate pe exemplarul GLC sunt prezentate ca opțiuni, nu ca echipare montată. Căutarea dotărilor include doar dotările documentate; Honda Civic oferă un caz suplimentar real pentru LED, Bluetooth și scaune încălzite.

## 3. Programare service

Două etape: mașină/serviciu și contact/preferință de programare. Informația tarifară detaliată este restrânsă; valoarea preselectată din pagina Tarife se păstrează. Programarea și estimarea sunt separate prin controale clare. Succesul nu pretinde că un interval este deja confirmat.

Date locale de test: Andrei Popescu, andrei.popescu@example.com, 0700000000; VIN fictiv WDD00000000000000, 35.000 km, Pipera, revizie. Ziua preferată este precompletată la șapte zile după deschiderea paginii, avansată până la prima zi lucrătoare dacă e weekend.

Formularele simulează trimiterea locală. Nu trimit lead-uri. Textele pentru evaluarea prototipului au fost scoase din UI la cererea utilizatorului; această limitare rămâne documentată aici și explicată în mesajul de livrare.

## Surse pentru extinderea catalogului

Date și imagini din paginile publice Autoklass, verificate în această rundă; sunt copii locale pentru testare, fără sincronizare live:
- https://www.autoklass.ro/vanzari-auto/honda-civic-5d-honda-civic-5d-hu025350.html
- https://www.autoklass.ro/vanzari-auto/honda-zr-v-2-0-e-hev-advance-r2012298.html
- https://www.autoklass.ro/vanzari-auto/xpeng-new-g6-awd-performance-sb179466.html
- https://www.autoklass.ro/vanzari-auto/xpeng-new-g9-rwd-standard-range-sd091009.html
- https://www.autoklass.ro/ pentru portofoliu și servicii
- https://baymard.com/research/homepage-and-category-usability
- https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md

## Verificări

- TypeScript și ESLint pe fișierele modificate.
- Build local Vite/Nitro.
- Cele șase pagini principale: homepage, listare, produs, programare, tarife, comparație, la 360, 430 și 1440 px: fără overflow orizontal și fără textele de prototip căutate.
- Homepage: Electrice afișează G6 și G9; Compacte deschide listarea Hatchback.
- Listare: Honda -> Civic / ZR-V -> Civic -> un rezultat; produs și întoarcere la filtre.
- Ofertă mobil: patru câmpuri precompletate; golirea numelui din tastatură afișează eroarea și mută focusul; eroarea de trimitere simulată păstrează datele; reîncercarea ajunge la succes.
- Service: pas 1 -> pas 2 -> înapoi -> pas 2 păstrează datele; confirmarea include 22 septembrie 2026 și Dimineața în testul din 15 septembrie.

Aceste verificări nu reprezintă certificare WCAG, audit Lighthouse sau studiu de conversie cu utilizatori reali.
