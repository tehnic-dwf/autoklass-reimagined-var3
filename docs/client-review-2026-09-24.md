# Client review: local V3 refinement

Implemented from the user's clarified call notes. Local only; no GitHub upload.

## Requirement audit

| Requirement | Current evidence |
| --- | --- |
| Remove duplicated hero authorization line | `routes/index.tsx`: line below the two CTAs removed; short subheading retained. |
| Sales and service offer carousels | `HomeOffers` and `HomeServiceOffers` use `OfferRail`; arrow controls, swipe/scroll, disabled end states, reduced-motion behavior. Marketing selections are ordered data in `data/home-offers.ts`, not a CMS integration. |
| More spacious brand area, names, three per row | `ak-authorized-brands`: 3 columns, visible names, 5 existing brands. Structure accepts future entries without inventing Ford/Asian groupings. |
| Separate used inventory and authorized brands | “Centre autorizate de vânzări” and “Autovehicule rulate”; all used inventory includes BMW as well as represented brands. |
| Das WeltAuto links and logos | Verified Ploiești 10267 and Brașov 10272 destinations from the live homepage. |
| Graphic body categories | `BodyIcon`: distinct SUV, sedan, coupe and hatchback outlines replace photos. Existing category filters preserved. |
| State before brand | DOM and visual order: budget → state → brand → model. Brand/model options respond to state; invalid model selection is cleared. |
| User-facing location filter | Optional “Oraș” in advanced filters; maps București branches to a city. Existing branch URL parameters remain compatible. No GPS or assumed user location. |
| Card and PDP technical information | Shared `VehicleFacts`: power, fuel, transmission, displacement, CO₂, drive; mileage additionally for used cars. Year appears once in the introductory line. Icons have text equivalents. |
| Essential PDP facts above photos | Verified six facts above gallery on new example; seven on used. Price/one leasing row/offer/consultant grouped after gallery on mobile. |
| One leasing type | Removed paired Leasing/Rată section; existing sourced illustrative leasing amounts in a compact row for both detailed examples. No invented calculator or finance terms. |
| VIN required, first, no bypass | Step one starts with mandatory VIN; format check, make/model selects, manual fallback for unknown valid VIN. Mileage optional. |
| VIN identification | Local prototype record W1NKM5BB1VU149616 fills Mercedes-Benz / GLC / year metadata. No real VIN API is connected; production needs Autoklass endpoint. |
| Standard versus installed optional equipment | Per-item status UI supports Standard / Opțional inclus / Tip de confirmat. Read-only list; all installed items included in displayed vehicle price. **Incomplete data: exact full build-sheet classification requested from user.** Only 9G-TRONIC and two optional features had classification in the existing official-model reference. Other equipment is not guessed. |
| Copy cleanup | Removed duplicate hero line, repeated year in facts, duplicated equipment aliases, generic PDP technical repetition, redundant service estimate text and secondary credit rate. Pricing/availability caveats retained where necessary. |
| Delivery terminology | Latest note ends “toate mașinile lor” without a rule or promised interval. No invented supplier/dealer classification or deadline; existing source states preserved. Needs client definition before changing labels. |

## Source checks

- https://www.autoklass.ro/ — brand destinations, live service campaigns, 24 September 2026.
- https://www.dasweltauto.ro/haendler/ploiesti/10267/s
- https://www.dasweltauto.ro/haendler/brasov/10272/s
- https://www.autoklass.ro/articole/pick-up-service.html
- https://www.autoklass.ro/articole/anvelope-roti-complete.html
- https://www.autoklass.ro/articole/servicii-vopsitorie.html
- https://www.autoklass.ro/vanzari-auto/mercedes-benz-glc-200-4matic-vu149616.html — 1,999 cm³, 185 g/km, AWD, installed equipment.
- https://www.autoklass.ro/vanzari-auto/audi-a7-a7-sportback-nn011329.html — 1,984 cm³, 32 g/km, AWD.
- https://www.autoklass.ro/vanzari-auto/bmw-seria-5-530e-xdrive-0cd61150.html — BMW used example, 23,740 EUR, 96,134 km, 1,998 cm³, 131 g/km, AWD; no emissions test-cycle assumption added.
- CO₂ values copied only from exact stock pages that returned data. Unavailable values display “De confirmat”; electric cars explicitly say “la evacuare”.
- https://www.mobile.de/ and https://www.mobile.de/auto/ — browsing/model taxonomy reference, not a copied visual design or claimed user study.
- Vercel Web Interface Guidelines fetched 24 September; semantic controls, accessible names, focus, reduced motion, no overflow checked.

## Verification

- TypeScript and targeted ESLint pass.
- GitHub Pages static build passed on 25 September; no deployment. A final branch-specific tariff correction subsequently passed TypeScript/ESLint and browser checks: GLC Pipera 500 lei/hour, GLC Sibiu 450, AMG Sibiu 550.
- 360, 430 and 1280 px: homepage, listing, new PDP, used PDP, service form all without horizontal page overflow.
- Homepage state → BMW → Seria 5 gives the BMW-only listing. Advanced city select offers Sibiu for that inventory.
- Service: empty VIN blocks; known VIN populates make/model; unknown valid VIN clears stale values and allows manual model selection; submission with prefilled contact fields reaches confirmation.
- Equipment search “DIGITAL LIGHT” returns one installed-optional row. New PDP has one leasing presentation and facts before gallery.
- Screens inspected: brand layout, sales carousel, new PDP first screen, equipment result, VIN identification/error recovery.

## Design review

Refactoring UI: **9/10 (7/8 checks)** for affected components. Hierarchy, grayscale, spacing between groups, secondary labels, text width, contrast and appropriate depth pass. Remaining inherited spacing values outside the constrained scale prevent 10/10.

Top Design: **6.6/10** for this functional prototype: typography 7, composition 7, interaction 4, palette 7, detail 8 (weighted rubric). A 10 requires a separately commissioned editorial asset treatment and measured performance/interaction polish; additional decorative motion was not added to these conversion forms.

Data still needed: full factory equipment classification, exact delivery-state definitions and the production VIN API. These are not silently approximated by the prototype.
