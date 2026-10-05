# Rezervare și revenire la solicitarea unei oferte

Implementare locală, fără publicare. Plata de 500 € este o simulare; nu se colectează carduri, nu se trimit solicitări și nu se blochează stocul.

## Modificări

- Rezervare în doi pași: date de contact/facturare, apoi verificare și plată.
- Alternativă „Vrei întâi o ofertă?” înaintea formularului pe mobil și în coloana laterală pe desktop. Include consultantul și fotografia disponibilă pentru GLC; celelalte mașini folosesc un avatar neutru, fără atribuirea fotografiei altei persoane.
- Formularul existent de ofertă primește datele din rezervare. Editările sunt păstrate și la închiderea modalului, inclusiv înainte de plată.
- Date demonstrative precompletate pentru persoană fizică și firmă. Acordul rămâne nebifat.
- Confirmări distincte pentru ofertă și rezervare: nume, mașină, date de contact, sumă simulată unde se aplică, consultant și pașii următori.
- Protecție pentru date modificate la părăsirea paginii. Datele demo nemodificate nu declanșează avertismentul.
- Fotografiile indisponibile primesc un substituent neutru. CDN-ul fotografiei Audi a returnat o eroare de certificat în browserul de test.

## Revizuire UI, layout și accesibilitate

| Severitate | Locație | Înainte | După | Principiu și efect |
| --- | --- | --- | --- | --- |
| Medium | src/components/reservation/ReservationCheckout.tsx | Rezervarea avea doar continuare spre plată | Alternativă contextuală către ofertă, cu date păstrate | Ieșire clară pentru vizitatorii nehotărâți |
| Medium | src/reservation.css | Titlurile globale suprascriau dimensiunile din checkout | Stiluri limitate la rezervare | Ierarhie compactă, butonul alternativ rămâne secundar |
| Medium | src/reservation.css | Dialogul de plată moștenea înălțimea întregii pagini | Înălțime dictată de conținut și scroll limitat | Acțiuni accesibile fără goluri mari |
| Medium | src/components/reservation/ReservationCheckout.tsx | Confirmarea reutiliza sumarul dinainte de plată | Rezumat separat al rezultatului și următorilor pași | Confirmarea răspunde la ce a făcut utilizatorul |
| Low | src/lib/reservation.ts | Date inițiale goale | Date demo explicite, editabile | Parcurgere rapidă în prezentare |

## Verificări

- TypeScript și ESLint: fără erori.
- Build static GitHub Pages: reușit; nu s-a făcut push/deploy.
- Chromium: 320, 390, 430, 768 și 1280 px, fără scroll orizontal.
- Mărire CSS 200% la 1280 px și oglindire RTL la 320 px: fără depășiri. Mărirea CSS 200% la 390 px produce o suprafață efectivă sub 320 px și depășiri; nu echivalează cu validarea zoomului nativ.
- Verificate PF, firmă, email invalid cu focus pe câmp, acord nebifat, simulare eroare de plată și reîncercare.
- Datele trec din rezervare în ofertă și înapoi; ambele confirmări primesc numele și emailul editate.
- Escape restabilește focusul; Space, Tab și Enter permit confirmarea acordului și deschiderea plății. Titlul confirmării primește focusul.
- Axe 4.10.3: zero încălcări pe formular, modalul de ofertă și confirmarea rezervării.
- Not verified: VoiceOver, Safari pe iPhone real, zoom nativ, redarea animațiilor la 10%, pseudo-localizare extinsă. Integrarea procesatorului de plăți și trimiterea către CRM nu fac parte din prototip.

Approve pentru suprafețele și verificările enumerate; nu reprezintă validarea unei integrări de plăți reale.

## Condiții de rezervare

Sursa verificată pentru suma de 500 €, plata în lei și condițiile publicate: https://www.autoklass.ro/articole/faq.html. Rezervarea cu plată cerută ulterior înlocuiește varianta de simplă solicitare descrisă în raportul de campanii din 1 octombrie.
