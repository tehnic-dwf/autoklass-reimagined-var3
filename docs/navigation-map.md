# V3 navigation map

The shared inventory is `src/data/site-navigation.ts`. `SiteHeader`, `SiteFooter` and the home service groups use the same labels and destinations. The full menu contains 42 destinations in five groups. The footer uses a compact selection from each group; the full inventory stays available through the labelled **Meniu** control at every viewport size.

The two primary journeys remain local: find a car and request a service appointment. Desktop exposes new cars, used cars and service prices beside **Meniu**. The menu puts those three links and the service appointment link before the grouped inventory. Search and saved-car comparison remain available in the header.

## Local destinations

| Intention | V3 destination |
| --- | --- |
| New cars | `/autoturisme?condition=nou` |
| Used cars | `/autoturisme?condition=rulat` |
| Service prices | `/service/tarife` |
| Service appointment request | `/service/programare` |
| Saved-car comparison | `/comparatie` |
| Offer request process | `/#cum-soliciti-oferta` |

The purchase explanation points to the V3 offer process. It does not send visitors into the live reservation and payment process.

## Live destinations by intention

Relative destinations below use `https://www.autoklass.ro`. These routes come from the live Autoklass inventory inspected on 14 September 2026. They open in the same tab. Every external link shows ↗ and includes a screen-reader hint naming its destination domain and same-tab behavior.

| Group | Label | Live destination |
| --- | --- | --- |
| Autovehicule | Mercedes-Benz | `/autoturisme-noi-mercedes` |
| Autovehicule | Autoutilitare Mercedes-Benz | `/autoutilitare-noi-mercedes` |
| Autovehicule | Audi | `https://ploiesti.autoklass.ro/` |
| Autovehicule | Volkswagen | `https://www.brasov.autoklass.ro/marci/volkswagen` |
| Autovehicule | XPENG | `/search/filtre/marca-xpeng` |
| Autovehicule | Honda | `/autoturisme-noi-honda` |
| Autovehicule | Mercedes-Benz Certified | `/search/filtre/mercedes-certified-da` |
| Autovehicule | Campanii și oferte auto | `/campanii` |
| Autovehicule | Buy-back și trade-in | `/articole/cumparam.html` |
| Autovehicule | Comandă personalizată | `/articole/comanda-personalizata.html` |
| Service & daune | Gestionarea daunelor | `/articole/gestionarea-daunelor.html` |
| Service & daune | Vopsitorie | `/articole/servicii-vopsitorie.html` |
| Service & daune | Servicii și oferte sezoniere | `/servicii-sezoniere` |
| Service & daune | Anvelope și roți complete | `/articole/anvelope-roti-complete.html` |
| Service & daune | Garanție extinsă | `/garantie-extinsa` |
| Service & daune | Scanner 3D | `/servicii/exclusiv-scanner-3d` |
| Service & daune | Predare chei · Key Drop-off Box | `/articole/key-drop-off-box.html` |
| Autovehicule | Programare test drive | `/articole/programare-test-drive.html` |
| Mobilitate | Închirieri auto · Axis Rent | `https://axisrent.ro/` |
| Mobilitate | Preluare și livrare · Pick-up Service | `/articole/pick-up-service.html` |
| Mobilitate | Asistență rutieră · Mobilo | `/articole/mobilo.html` |
| Mobilitate | Asistență autoutilitare · MobiloVan | `/articole/mobilo-van.html` |
| Piese și accesorii | Piese originale și aftermarket | `https://piese.autoklass.ro` |
| Piese și accesorii | Accesorii de colecție | `https://piese.autoklass.ro/accesorii-de-colectie` |
| Piese și accesorii | Accesorii interior și exterior | `https://piese.autoklass.ro/accesorii-interior-exterior` |
| Piese și accesorii | Jante și anvelope | `https://piese.autoklass.ro/jante-anvelope` |
| Piese și accesorii | Întreținere și cosmetică auto | `https://piese.autoklass.ro/intretinere-cosmetica` |
| Piese și accesorii | Ulei de motor | `https://piese.autoklass.ro/ulei-motor` |
| Piese și accesorii | Filtre | `https://piese.autoklass.ro/filtre` |
| Autoklass | Sucursale | `/sucursale` |
| Autoklass | Despre Autoklass | `/articole/despre-noi.html` |
| Autoklass | Contact | `/articole/contact.html` |
| Autoklass | Responsabilitate socială | `/articole/corporate-social-responsibility.html` |
| Autoklass | Parteneriate | `/articole/parteneriate.html` |
| Autoklass | Cariere | `/formular-angajare` |
| Autoklass | Noutăți | `/stiri` |

The exact [vopsitorie destination](https://www.autoklass.ro/articole/servicii-vopsitorie.html) and [anvelope destination](https://www.autoklass.ro/articole/anvelope-roti-complete.html) were additionally followed from the [live homepage](https://www.autoklass.ro/). Vopsitorie does not use the unverified `/articole/servicii-de-vopsitorie.html` variant.

## Interaction and source honesty

The menu uses Radix Dialog for modal focus containment, Escape dismissal and return of focus to its trigger. Its body scrolls independently with overscroll containment. It fills the mobile viewport, with a 480px side panel above 640px. Native `details` and `summary` expose group expansion to keyboard and screen-reader users. All controls and links have a minimum 44px touch target. Header and footer use white keyboard outlines on their dark backgrounds.

The footer states that the V3 catalog is demonstrative and that its forms do not transmit requests to Autoklass. No menu item points to an out-of-scope placeholder, phone CTA, WhatsApp CTA, reservation or payment flow. No unverified stock counts, review scores, response times or historical claims are added.
