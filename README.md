# Autoklass V3

Prototip de redesign pornit din V2: homepage, navigație, căutare, comparație, fișă Mercedes-Benz GLC, cerere ofertă și solicitări service.

- [Deschide prototipul](https://tehnic-dwf.github.io/autoklass-reimagined-var3/)
- [Brief și clarificări](docs/brief.md)
- [Decizii de design, surse și măsurare CRO](docs/design-decisions.md)
- [Inventarul meniului](docs/navigation-map.md)
- [Criterii și căutare live → V3](docs/search-matrix.md)
- [Tarife din documentul clientului](docs/tariff-source-review.md)
- [Verificări](docs/verification.md)

Formularele sunt demonstrative și nu trimit lead-uri. Catalogul include 18 exemple din V2; fișa GLC este exemplul detaliat. Tarifele de manoperă provin din documentul clientului, aplicabil din 15 aprilie 2026. Nu reprezintă costul complet al unei reparații. Linkurile ↗ deschid pagini reale Autoklass/parteneri.

## Local

Node.js 22+ și npm:

```sh
npm ci
npm run dev
```

```sh
npx tsc --noEmit
npm run build:pages
```

GitHub Actions construiește și publică la fiecare push pe `main`. Vite folosește baza `/autoklass-reimagined-var3/` pentru Pages; build-ul produce pagini statice și fallback `404.html`.

## Scenarii de evaluare

- Homepage → noi, model GLC, preț maxim 80.000 EUR → rezultate și sortare.
- GLC 200 4MATIC → Contactează-ne → cele patru câmpuri → succes demo.
- Adaugă două mașini în comparație și activează „Doar diferențele”.
- Tarife → sucursală și categorie → estimare; verifică păstrarea contextului.
- Programare service → fără VIN la îndemână → preferință de zi/interval → succes demo fără rezervare.
- Adaugă `?demo=error` la URL-ul fișei sau formularului service: prima încercare eșuează, următoarea reușește fără pierderea datelor.
- Listarea acceptă `?demo=error` și `?demo=loading` pentru examinarea stărilor. Reîncercarea păstrează filtrele.

Nu introduce date personale reale în demo. Originalul PDF și fișierele locale de lucru nu sunt publicate.
