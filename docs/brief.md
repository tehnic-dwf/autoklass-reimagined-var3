# Autoklass V3: brief pentru etapa a doua de redesign

Actualizat cu clarificările beneficiarului din 14 septembrie 2026. Implementarea se face într-o copie V3 separată; V2 rămâne reperul inițial.

## 1. Misiunea ta și baza de lucru

Acționează ca UX strategist și product designer, cu capacitatea de a implementa soluțiile în proiectul existent. Îmbunătățește experiența mobilă a celor două fluxuri definite mai jos, pornind de la criteriile de decizie ale utilizatorului, structura informației și comportamentul interfeței.

Baza de lucru este [autoklass-reimagined-var2 din GitHub](https://github.com/tehnic-dwf/autoklass-reimagined-var2). [Autoklass.ro](https://www.autoklass.ro/) este site-ul live și sursa de referință pentru brand, ofertă și procesele comerciale actuale. Verifică informațiile înainte de a le prelua: faptul că un element există pe site-ul live nu înseamnă că trebuie păstrată aceeași experiență în redesign.

Livrabilul acestei etape este designul și prototipul interactiv mobil în proiectul existent. Realizează o singură fișă de produs demonstrativă, suficient de completă pentru evaluarea designului, alături de căutare, listări, comparație și fluxul service. Citește instrucțiunile proiectului și păstrează funcționalitățile utile. Integrările de producție, redesignul desktop și completarea întregului catalog nu fac parte din această etapă.

## 2. Rezultatul urmărit

Utilizatorul trebuie să poată parcurge două trasee clare:

1. Caută o mașină → restrânge opțiunile → compară → înțelege mașina aleasă → apasă „Contactează-ne” → completează formularul „Solicită ofertă” → trimite solicitarea.
2. Găsește serviciul potrivit → înțelege tariful orientativ pentru sucursala aleasă → solicită o estimare sau o programare → înțelege ce urmează după trimitere.

Obiectivele sunt reducerea efortului de căutare și înțelegere, creșterea lead-urilor primite de Sales prin formularul de solicitare ofertă, creșterea solicitărilor relevante către service și o prezentare vizuală simplă, coerentă și premium. Pentru fluxul mașinii, conversia urmărită ulterior în producție este trimiterea cu succes a formularului. În această etapă demonstrăm parcursul și stările interfeței.

Prioritizează în această ordine: corectitudinea informațiilor și promisiunilor, finalizarea parcursurilor, claritatea informației, apoi rafinarea vizuală. Toate fac parte din livrabil.

## 3. Decizii confirmate, date demonstrative și ipoteze

Aplică următoarele decizii confirmate de beneficiar:

- Singura acțiune comercială din fișa mașinii este „Contactează-ne”. Ea deschide direct formularul „Solicită ofertă”, cu patru câmpuri obligatorii: nume, prenume, email și telefon.
- Consultantul afișat se actualizează automat din sistem, în funcție de persoana alocată proiectului. Interfața trebuie să folosească această informație dinamică; nu proiecta o alegere manuală a consultantului.
- Rezervările sunt rare și sunt excluse din designul acestei etape. Fluxul de contact nu include WhatsApp, apel telefonic sau alegerea canalului.
- Primul ecran din homepage-ul V2, inclusiv video-ul, este reperul vizual apreciat de beneficiar. Păstrează această direcție și video-ul. Restul interfeței V2 este perceput ca având un aspect ieftin și necesită o refacere vizuală, nu doar mici ajustări cosmetice.
- Motorul de căutare auto existent pe site-ul live lipsește din V2 și trebuie integrat în prototip, cu o experiență mobilă îmbunătățită. Analiza căutării live și corespondența ei cu soluția V2 sunt livrabile obligatorii.
- Căutarea din homepage, listările și fișa folosesc aceleași criterii și denumiri. Filtrarea este instant, cu sortare după preț, comparație și căutare după dotări.
- Separarea noi/rulate a fost inspirată de organizarea site-ului Mercedes-Benz. Nu există o cerință impusă de Mercedes-Benz. Soluția Autoklass se argumentează prin nevoile utilizatorilor.
- Fișa demonstrativă privește o singură mașină. Clientul nu a furnizat date; folosește informații publice verificabile, preferabil de pe site-ul oficial Mercedes-Benz.
- Pagina de tarife service este diferențiată pe sucursală. Clientul a furnizat Decizia 2177 cu tarife aplicabile din 15 aprilie 2026. Folosește tarifele documentate și unitățile lor exacte; nu transforma tarifele de manoperă/oră în costuri totale pentru revizii. Rândurile ambigue și costurile necomunicate rămân la cerere. Vechea autorizare a prețurilor fictive este înlocuită de această sursă pentru rândurile disponibile.
- Estimarea service folosește VIN-ul și kilometrajul; devizul final se stabilește în service.
- PDF-ul din fișa mașinii, oferta personalizată cu discount și calculatorul de leasing sunt în afara etapei. Nu le proiecta și nu solicita reguli pentru ele acum.
- Etapa este dedicată mobilului și păstrează identitatea cromatică Autoklass.

Păstrează explicit următoarele ipoteze și limite:

- „Livrare imediată” înseamnă că mașina poate fi livrată imediat. Beneficiarul presupune că mașina este la Autoklass; locația nu este confirmată.
- Pentru „în stoc”, beneficiarul presupune că mașina poate fi la furnizor și că livrarea durează. Nu prezenta „stoc la furnizor” drept definiție confirmată și nu inventa termene.
- După solicitarea service, presupunerea de lucru este că utilizatorul va fi contactat pentru confirmarea zilei și orei. Procesul exact nu este cunoscut; nu proiecta o confirmare automată a unui interval rezervat.
- Nu există încă date validate despre prioritățile cumpărătorilor Autoklass. Criteriile de alegere și organizarea lor trebuie cercetate și propuse, fără a prezenta concluziile drept rezultate ale unei cercetări cu clienții Autoklass.

În documentarea prototipului, separă deciziile beneficiarului, informațiile preluate din surse, datele fictive și ipotezele de UX. Lipsa datelor finale nu blochează designul. Pentru o regulă comercială nouă, care nu poate fi dedusă din informațiile de mai sus, cere clarificare înainte să o tratezi ca fapt.

## 4. Începe cu criteriile de alegere a mașinii

Înainte să redesenezi căutarea, listările sau fișa, stabilește modelul comun de informații care le va susține.

Avem indicii că utilizatorii aleg și pe baza unor criterii tehnice, dar nu avem încă lista validată de Autoklass. Oferta acoperă atât segmentul premium, de exemplu Mercedes-Benz, cât și opțiuni cu alte niveluri de buget, inclusiv Honda și mașini rulate. Aceste informații nu sunt suficiente pentru a inventa profiluri demografice sau priorități validate.

Examinează datele din proiect, informațiile de pe site-ul live și surse relevante despre alegerea unei mașini. Compară abordările competitorilor. Citează sursele și distinge observațiile, ipotezele și recomandările. Existența unui filtru pe un alt site nu dovedește singură că este prioritar pentru clienții Autoklass.

Folosește ca punct de plecare, de validat:

| Grup de criterii       | Exemple de analizat                                                         |
| ---------------------- | --------------------------------------------------------------------------- |
| Buget și ofertă        | Preț total, regim TVA, nouă/rulată                                          |
| Identitatea mașinii    | Marcă, model, versiune, caroserie                                           |
| Motorizare             | Combustibil, transmisie, putere, tracțiune                                  |
| Utilizare              | Spațiu, număr de locuri, consum; autonomie și încărcare unde sunt relevante |
| Echipare               | Siguranță, asistență, confort, conectivitate; LED, trapă, scaune ventilate  |
| Disponibilitate        | Sucursală, stoc, termen de livrare confirmat                                |
| Particularități rulate | An, kilometraj, istoric, stare și garanție documentată                      |

Livrează o matrice în care fiecare criteriu are: relevanță pentru noi/rulate, prioritate, sursă de date și locul în interfață: căutare inițială, filtre avansate, card, fișă sau comparație. Alege un set restrâns pentru intrarea în căutare și justifică selecția.

Această matrice devine baza comună pentru cele trei suprafețe. Documentează separat informațiile folosite în exemplul demonstrativ și câmpurile care vor trebui alimentate ulterior de Autoklass.

## 5. Fluxul mașină: căutare, listări și comparație

### Integrarea și îmbunătățirea căutării live în homepage-ul V2

Aceasta este o cerință centrală a etapei. Site-ul live are deja o căutare auto complexă, indicată de beneficiar, care lipsește din V2. Reconstruiește experiența ei în V2 și îmbunătățește-o pe mobil. Un buton către listare sau o bară de text generică nu îndeplinește această cerință.

Înainte de proiectare, inspectează efectiv căutarea de pe site-ul live în browser, inclusiv comportamentul pe mobil. Inventariază câmpurile, opțiunile, dependențele dintre selecții, modul de lansare a căutării, resetarea și pagina de rezultate. Documentează ce ai putut verifica. Dacă un comportament nu poate fi accesat, marchează-l ca neverificat; nu îl deduce din memorie sau dintr-un alt site.

Livrează un tabel scurt „funcție sau criteriu din live → tratament în V2 → motivul schimbării”. Fiecare funcție relevantă din live trebuie păstrată, simplificată sau mutată explicit într-o zonă avansată; orice eliminare trebuie argumentată prin nevoile utilizatorului. Completează această bază cu matricea criteriilor de alegere din secțiunea 4.

Integrează modulul de căutare la începutul homepage-ului, în legătură clară cu primul ecran. Păstrează video-ul și caracterul aerisit al hero-ului; nu muta hero-ul sub un formular amplu. Poziționarea imediat sub hero este o variantă de analizat; alege soluția care face căutarea ușor de descoperit fără să acopere video-ul cu un formular dens. Nu trimite utilizatorul printr-un meniu dificil de găsit și nu împinge căutarea după blocuri editoriale sau promoționale.

Afișează direct criteriile prioritare și permite accesul la criteriile suplimentare printr-un control explicit. Simplificarea privește ordinea, gruparea și interacțiunea, fără pierderea nejustificată a capacităților utile din live. Căutarea conduce la listarea corespunzătoare și transferă toate selecțiile utilizatorului.

Modulul, filtrele din categorie și sortarea folosesc aceeași logică și aceleași date. În această etapă, demonstrează funcționarea lor în prototip; conectarea la inventarul live sau la alte servicii de producție rămâne în afara scopului stabilit.

Oferă intrări clare pentru intențiile „mașină nouă” și „mașină rulată”. Analizează dacă sunt mai potrivite pagini distincte sau o listare comună cu starea preselectată. Păstrează vizibilă diferența dintre categorii, indiferent de soluția tehnică. Orice intrare din meniu sau homepage trebuie să deschidă rezultatele corespunzătoare etichetei sale. Justifică recomandarea prin nevoile utilizatorilor și oferta Autoklass; nu invoca obligații impuse de Mercedes-Benz.

### Listări și pagini de categorie

- Actualizează rezultatele și numărul lor la schimbarea filtrelor, fără reîncărcarea completă a paginii și fără a pierde selecțiile.
- Pe mobil, panoul de filtre poate avea „Vezi X mașini” pentru închidere și revenire la rezultate; selecțiile se aplică pe măsură ce sunt făcute.
- Arată filtrele active și permite eliminarea individuală și resetarea integrală.
- Oferă „Preț crescător” și „Preț descrescător”. Bugetul este un filtru separat. Folosește prețul total și nu introduce rate sau simulări de finanțare în această etapă.
- Adaptează filtrele la categoria aleasă. De exemplu, anul și kilometrajul pot avea o prioritate diferită la rulate.
- Permite căutarea după dotări prezente pe exemplarul respectiv. Gestionează denumirile uzuale și sinonimele documentate, fără rezultate bazate doar pe dotări posibile ale modelului.
- Păstrează filtrele și poziția în listă când utilizatorul revine din fișa mașinii.
- Include stări pentru încărcare, eroare și zero rezultate. La zero rezultate, oferă o cale de ajustare a filtrelor.

Cardurile prezintă consecvent fotografia, identitatea mașinii, prețul, caracteristicile prioritare și disponibilitatea. Informațiile de pe card trebuie să coincidă cu fișa.

Folosește clasele, bugetele și echipările ca posibile intrări de explorare, dacă oferta le susține. [Carwow](https://www.carwow.co.uk/) este referința principală pentru structurarea explorării după buget și tip de mașină. Adaptează principiile la Autoklass și la mobil.

### Comparația

Păstrează și îmbunătățește funcția existentă. Utilizatorul poate adăuga și elimina mașini din listare sau fișă și poate compara aceleași criterii, în aceeași ordine și aceleași unități.

Propune o limită și un mod de afișare care funcționează pe mobil. Fă diferențele ușor de observat. Datele lipsă sunt marcate ca indisponibile; lipsa unei informații despre o dotare nu înseamnă automat că dotarea lipsește.

## 6. Fluxul mașină: o fișă de produs demonstrativă

Pagina trebuie să ajute utilizatorul să înțeleagă mașina prezentată, să găsească răspunsurile la criteriile sale de alegere și să solicite o ofertă.

Alege o singură mașină Mercedes-Benz pentru exemplu. Documentează modelul, versiunea, anul și piața la care se referă datele, pornind de la surse publice, preferabil oficiale. Păstrează linkurile și data consultării în notele livrabilului. Fișa este o demonstrație de design; informațiile de model nu dovedesc existența unui exemplar în stocul Autoklass.

### Ierarhia conținutului

Organizează pagina în următoarea logică, ajustând ordinea pe baza matricei de criterii:

1. Identificarea exemplarului: marcă, model, versiune, nouă/rulată.
2. Galerie foto utilă, preț, disponibilitate și caracteristicile decisive.
3. Acțiunea „Contactează-ne”, cu acces direct la formular, și consultantul asociat.
4. Dotări grupate și ușor de căutat.
5. Specificații tehnice și informații documentate despre garanție, dacă sunt disponibile pentru exemplul ales.
6. Acces secundar la comparație.

Informațiile decisive trebuie să fie vizibile fără deschiderea mai multor acordeoane. Secțiunile lungi pot folosi acordeoane cu denumiri explicite.

### Acțiunea comercială, formularul și consultantul

În fișă rămâne un singur tip de acțiune comercială: „Contactează-ne”. La apăsare, utilizatorul ajunge direct la formularul de contact, fără un ecran intermediar de alegere a canalului. Elimină din acest parcurs butoanele „Rezervă”, „Consultant”, „Doresc să fiu contactat”, „WhatsApp”, „Sună” și orice altă acțiune comercială concurentă. Nu le reintroduce în formular, în bara fixă sau în butoane flotante. Dacă există o bară fixă pe mobil, ea repetă „Contactează-ne” și deschide același formular.

În același bloc, imediat sub acțiune, afișează fotografia, numele și rolul consultantului. Aceste date se actualizează automat din sistem, în funcție de consultantul alocat proiectului. Nu adăuga un selector pentru utilizator și nu presupune o regulă suplimentară de alocare după marcă sau sucursală. Blocul nu conține butoane sau linkuri de contact direct. Pentru prototip, dacă nu există datele persoanei, folosește un substituent explicit, fără a atribui unui angajat real o alocare neverificată; conectarea la sistem va fi făcută ulterior.

Formularul este o cerere de ofertă și are titlul „Solicită ofertă”. Include exact patru câmpuri de contact obligatorii: „Nume”, „Prenume”, „Email” și „Telefon”. Numele și prenumele sunt câmpuri separate. Nu adăuga mesaj, VIN, sucursală sau alegerea consultantului. Formularul păstrează automat referința mașinii și arată pentru ce mașină se solicită oferta; utilizatorul nu trebuie să recopieze modelul sau adresa paginii. Numărul de telefon este colectat pentru contactarea ulterioară de către Sales, fără un CTA de apel în interfață.

Proiectează stările de completare, validare, trimitere, eroare și succes. Păstrează datele completate dacă trimiterea eșuează. Butonul final este „Solicită ofertă”; CTA-ul din fișă rămâne „Contactează-ne”. Ecranul de succes prezintă confirmarea cererii și continuarea prin consultant, fără a promite un timp de răspuns. În prototip, această stare este demonstrativă, nu dovada transmiterii unui lead real.

Galeria și comparația rămân instrumente de informare, cu un tratament vizual discret. Păstrează formularul concentrat pe completare și trimitere, fără promovarea altor trasee.

Denumirea de lucru pentru acest traseu este „găsirea mașinii și solicitarea unei oferte”. Rezervarea rar utilizată nu se proiectează în această etapă. Nu adăuga pași de rezervare, avans sau plată înainte ori după formular și nu condiționa designul de clarificarea lor.

### Dotări și fotografii pentru exemplul ales

Grupează dotările după sensul lor pentru utilizator: de exemplu siguranță și asistență, confort, multimedia și conectivitate, exterior și interior. Permite căutarea în lista de dotări.

Distinge dotările de serie de echipamentele opționale, pe baza surselor pentru versiunea aleasă. Dacă sursa descrie doar opțiuni disponibile pentru model, prezintă-le ca atare; nu afirma că sunt instalate pe un exemplar Autoklass. Pentru o configurație demonstrativă documentată, explică ce echipamente fac parte din configurația prezentată. O opțiune deja inclusă în acea configurație nu se prezintă drept achiziție suplimentară necesară.

Folosește fotografii publice ale modelului ales, preferabil oficiale, cu acces ușor la interior, exterior și detalii. Verifică dacă imaginile corespund versiunii prezentate; când sunt ilustrative, indică acest lucru discret în galerie. Corelează fotografiile cu dotările numai când asocierea este susținută de sursă. Nu amesteca specificații, echipări sau fotografii ale unor ani și versiuni diferite fără explicație.

[Casa Auto](https://casaauto.ro/) rămâne referința indicată în notițele de call pentru gruparea dotărilor, căutare și legătura cu fotografiile. Verifică paginile exacte înainte de a atribui aceste funcții referinței.

### Corectitudinea informațiilor

Tratează distinct starea mașinii (nouă/rulată), situația stocului și termenul de livrare. „În stoc” nu declanșează automat eticheta „livrare imediată”, iar o valoare lipsă nu înseamnă implicit „în stoc”. Poți propune formulări care explică diferența fără a afirma unde se află mașina sau în câte zile ajunge. Sensul operațional exact rămâne de confirmat; nu blochează proiectarea celor două stări.

Datele publice despre un model nu confirmă prețul, disponibilitatea, VIN-ul sau garanția unui exemplar Autoklass. Pentru preț, folosește o valoare publicată și documentează ce reprezintă, fără a o atribui drept ofertă Autoklass. Pentru informațiile comerciale lipsă, folosește un substituent explicit sau o stare „de confirmat”.

Raportul de istoric al vehiculului nu apare la mașinile noi. La rulate, se afișează doar când există un raport sau o informație verificabilă. Verificările de pregătire pentru livrare, dacă există, trebuie denumite separat.

## 7. Fluxul service: informații, tarife și solicitări

### Structura

Separă clar prezentarea serviciilor și tarifelor de campaniile sezoniere. Ofertele sezoniere rămân conținut comercial cu propriile condiții și valabilitate; pagina de tarife oferă vederea de ansamblu asupra serviciilor.

Utilizatorul poate intra direct în programare, dacă știe ce dorește. Consultarea tarifelor sau cererea de estimare nu devin pași obligatorii pentru orice programare.

### Pagina de tarife

Extinde pagina existentă astfel încât utilizatorul să aleagă sucursala și să vadă o listă de servicii și tarife. Pentru prototip, creează servicii și prețuri fictive, plauzibile și diferențiate între cel puțin două sucursale. Clientul le va înlocui ulterior; nu aștepta lista finală pentru a demonstra designul.

Pentru fiecare serviciu afișează denumirea clară, ce include, prețul „de la”, moneda și statutul TVA ales pentru exemplul demonstrativ. Păstrează aceste date într-o structură centralizată, ușor de înlocuit. Identifică explicit în prezentarea prototipului faptul că serviciile, asocierile pe sucursală și prețurile sunt fictive, fără a le prezenta drept ofertă aprobată Autoklass.

Explică lângă preț că este orientativ și că poate varia în funcție de mașină și intervenție. Dacă tariful nu este disponibil pentru sucursala aleasă, oferă solicitarea unei estimări, fără a prelua implicit prețul altei sucursale.

Din contextul serviciului, utilizatorul poate solicita o programare sau o estimare personalizată. Propune o organizare simplă în același flux service, păstrând automat serviciul și sucursala. Două formulare sau sisteme separate nu reprezintă o decizie confirmată de client.

### Estimarea și programarea

Cererea de estimare include VIN, kilometraj, serviciul sau problema descrisă, sucursala și datele necesare de contact. Explică pe scurt unde găsește utilizatorul VIN-ul și de ce este solicitat. Pentru cine nu are datele la îndemână, definește o cale de contact care nu promite aceeași precizie a estimării.

În solicitarea de programare, propune o ordine a câmpurilor care urmărește: mașina și serviciul, sucursala, data sau intervalul preferat, datele de contact. Refolosește informațiile deja completate. Asocierile din datele fictive pot demonstra comportamentul interfeței, dar nu constituie reguli reale de eligibilitate. Nu deduce restricții comerciale din lipsa datelor.

Folosește ca ipoteză de proiectare contactarea ulterioară a utilizatorului pentru confirmarea zilei și orei. Prezintă data și ora drept preferințe, fără a sugera existența unui calendar cu disponibilitate în timp real. Ecranul de succes confirmă solicitarea și explică pasul presupus de confirmare ulterioară. În notele livrabilului, marchează acest proces ca ipoteză de validat înainte de implementarea în producție.

Asigură validări lângă câmpuri, păstrarea datelor la revenirea între pași, stare de trimitere, eroare și confirmare. Devizul final se stabilește în service, după evaluarea mașinii.

### Obiectivul privind recenziile

Autoklass urmărește o notă Google peste 4,5. Redesignul poate susține acest obiectiv prin tarife mai clare, așteptări corecte și un proces de programare mai ușor. Rezultatul depinde și de experiența efectivă în service.

Păstrează această țintă ca obiectiv de business separat de acceptarea interfeței. Definirea măsurării și un eventual sistem de colectare a recenziilor vor fi tratate separat, fără a bloca designul actual.

## 8. Direcția vizuală și comportamentul pe mobil

Construiește un UI web familiar, aerisit și ușor de folosit. Obține aspectul premium prin fotografii, tipografie, aliniere și consecvență. Folosește convenții cunoscute pentru căutare, filtre, galerii și formulare. Fiecare element trebuie să ajute utilizatorul să înțeleagă o mașină sau să finalizeze o solicitare.

### Reperul vizual aprobat din V2

Beneficiarul apreciază primul ecran al homepage-ului V2 pentru aspectul curat, premium și pentru video. Acesta este reperul vizual principal al proiectului. Păstrează video-ul existent și direcția compoziției; modifică punctual doar ce este necesar pentru integrarea căutării și folosirea corectă pe mobil.

Inspectează acest ecran și extrage concret ce funcționează: ierarhia, densitatea conținutului, spațiul liber, tratamentul textului și relația cu imaginile în mișcare. Folosește aceste observații pentru a construi o familie coerentă de componente în restul site-ului. Nu presupune că trebuie repetate un video sau un hero de mari dimensiuni în fiecare pagină.

Restul V2 nu este un reper vizual aprobat. Beneficiarul îl percepe ca având un aspect ieftin, fără să fi identificat cauzele în detaliu. Analizează și arată cauzele vizibile înainte de a le corecta; nu inventa preferințe suplimentare ale beneficiarului. Poți reutiliza structura tehnică și comportamentele utile, dar cardurile, filtrele, fișa și formularele trebuie aduse la nivelul de coerență al primului ecran.

### Principiile și sursele lor

| Referință                                                                                                                              | Aplicare în proiect                                                                                                                                                                                                               |
| -------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Apple Human Interface Guidelines: Design principles](https://developer.apple.com/design/human-interface-guidelines/design-principles) | Familiaritate, consecvență, ierarhie și concentrare pe sarcina principală. Le aplicăm contextului web mobil; componentele native Apple și efectele lor vizuale nu sunt un model obligatoriu pentru Autoklass.                     |
| [Jakob Nielsen: 10 usability heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/)                                   | Filtrele și formularul își arată starea; utilizatorul poate reveni sau corecta; denumirile rămân consecvente; informația relevantă rămâne vizibilă.                                                                               |
| [W3C: WCAG 2.2](https://www.w3.org/WAI/WCAG22/quickref/)                                                                               | Verificări de contrast, etichetare, tastatură, focus, redimensionarea textului și folosire fără gesturi obligatorii. Verifică cerințele aplicabile direct în standard; un scor intern al unui skill nu certifică accesibilitatea. |

Deciziile și limitele din acest brief au prioritate față de exemplele sau preferințele estetice dintr-un skill. Nu înlocui paleta Autoklass cu paleta exemplificată de un skill.

### Exemple vizuale cu rol precis

Înainte de construirea ecranelor, documentează maximum trei repere vizuale mobile. Primul este obligatoriu: primul ecran al homepage-ului V2, împreună cu video-ul său. Pentru fiecare reper, notează pagina exactă, componenta observată și ideea preluată. AI-ul poate realiza capturile și selecta exemplele externe; nu este necesar ca beneficiarul să le furnizeze.

- Din V2, documentează hero-ul apreciat de beneficiar și regulile vizuale care pot fi continuate în restul interfeței. Verifică video-ul în funcțiune, deoarece o captură statică nu îi arată comportamentul. Site-ul live rămâne sursa pentru logo și culorile brandului.
- Din Carwow, selectează o captură relevantă pentru căutare sau filtrare pe mobil. Preia organizarea alegerii după buget ori categorie, adaptată la oferta Autoklass.
- Din Casa Auto, verifică o fișă de mașină și selectează un exemplu util de organizare a dotărilor. Dacă pagina nu susține exemplul din notițe, spune acest lucru și alege o altă referință verificabilă pentru aceeași problemă.

Linkurile generale și eticheta „premium” nu înlocuiesc aceste explicații. Referințele stabilesc ce problemă rezolvă o componentă; nu cer copierea unui site întreg.

### Reguli de compoziție și componente

Stabilește un set restrâns de valori pentru tipografie, spațiere, culori, colțuri și umbre, apoi refolosește-l în toate ecranele. Reutilizează logica utilă a componentelor existente și refă prezentarea lor pornind de la reperul vizual aprobat. Ca bază de proiect, folosește spațieri de 4, 8, 16, 24, 32 și 48 px; elementele din același grup stau mai aproape decât grupurile între ele.

Folosește identitatea tipografică disponibilă și păstrează o scară scurtă de dimensiuni. Pornește de la 16 px pentru textul curent și valorile din formular, cu titluri de 24–32 px, ajustate după conținut. Acestea sunt valori de pornire pentru proiect, nu reguli atribuite Apple. Ierarhia trebuie să rămână clară și în tonuri de gri, prin poziție, dimensiune și greutate.

Pe mobil, așază formularul într-o coloană, cu etichete persistente deasupra câmpurilor. Activează completarea automată și tastatura potrivită pentru email și telefon. Afișează erorile lângă câmpuri, după interacțiunea relevantă sau la trimitere; păstrează datele introduse.

Păstrează aceeași prezentare a prețului și a datelor mașinii în card, fișă și comparație. Aliniază textul informativ la stânga. Folosește pictograme din aceeași familie și etichete text pentru acțiunile al căror sens nu este evident.

În fișă, „Contactează-ne” trebuie recunoscut imediat drept acțiunea comercială. Evită butoane concurente, bannere promoționale lângă formular, texte esențiale foarte palide și blocuri decorative care împing informațiile utile în jos. Umbrele, colțurile și animațiile trebuie să aibă un rol consecvent. Nu adăuga efecte de sticlă, parallax sau animații ample doar pentru a sugera un aspect premium.

Video-ul existent din hero face parte din direcția cerută de beneficiar. Păstrează-l și verifică lizibilitatea textului, comenzile necesare și alternativa vizuală când redarea nu este disponibilă. Căutarea trebuie să poată fi folosită independent de încărcarea sau redarea video-ului.

Textele sunt în română, cu diacritice. Informațiile principale rămân vizibile; detaliile ample pot fi în secțiuni extensibile. Acordeoanele, panourile de filtre și galeria au controale de deschidere și închidere explicite.

### Verificarea designului

Testează la lățimi de 360, 390 și 430 px. Include nume lungi de modele, filtre multiple, zero rezultate, formular incomplet și tastatura deschisă.

- Textul curent are un contrast de minimum 4,5:1. Componentele și semnalele vizuale necesare identificării lor respectă cerința aplicabilă de contrast de 3:1. Verifică valorile efectiv folosite. [Contrast text](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html), [contrast componente](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html).
- Pentru butoane și controale independente, ținta proiectului este o suprafață tactilă de minimum 44 × 44 px CSS. Pictograma poate fi mai mică decât zona apăsabilă. Aceasta este ținta proiectului, nu pragul minim WCAG 2.2 AA, care este de 24 × 24 px CSS și are excepții. [Dimensiunea țintelor](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html).
- Textul poate fi mărit la 200%; conținutul și acțiunile rămân accesibile. Pagina nu produce scroll orizontal accidental; un tabel de comparație poate avea o zonă de derulare locală, semnalizată clar.
- Etichetele sunt asociate câmpurilor, focusul este vizibil și ordinea lui urmărește fluxul. Panourile pot fi închise, iar focusul revine la controlul care le-a deschis.
- Barele fixe, tastatura și mesajele de consimțământ nu acoperă câmpuri, erori sau butonul de trimitere.
- Gesturile au alternative vizibile. Feedbackul nu depinde doar de culoare sau animație; respectă preferința pentru reducerea mișcării.
- Confirmă vizual în browser și testează acțiunile. Raportează probleme concrete și limitările verificării; nu considera un scor „10/10” dovadă că designul funcționează pentru utilizatori.

## 9. Ordinea de lucru și livrabilele

1. Verifică versiunea curentă din GitHub și cele două fluxuri de pe site-ul live. Documentează în mod special hero-ul V2 aprobat și funcțiile căutării live care trebuie aduse în V2. Inventariază ce există, ce funcționează doar demonstrativ, ce trebuie corectat și ce lipsește. Leagă fiecare constatare de o pagină sau componentă verificabilă.
2. Livrează matricea criteriilor de alegere și recomandarea pentru noi/rulate, disponibilitate și terminologie. Arată sursele și ipotezele.
3. Alege mașina pentru fișa demonstrativă și documentează sursele. Pregătește datele fictive pentru pagina de tarife service. Definește traseele, ierarhia informației, câmpurile și comportamentele înainte de rafinarea vizuală.
4. Fixează regulile vizuale pornind de la hero-ul V2 și referințele din secțiunea 8. Construiește întâi integrarea căutării în homepage, păstrând video-ul, apoi fișa mașinii și formularul „Solicită ofertă”, la 390 px. Verifică dacă cele trei suprafețe aparțin aceleiași direcții vizuale și dacă traseul poate fi parcurs.
5. Construiește restul prototipului în var 2: listările, comparația, tarifele și solicitările de service. Folosește aceleași componente și reguli vizuale. Refolosește datele existente pentru listări și comparație, fără a extinde cerința la fișe complete pentru toate mașinile.
6. Verifică parcursurile la cele trei lățimi mobile și livrează capturi ale ecranelor și stărilor principale, rezultatele verificărilor, sursele și lista datelor fictive. Corectează problemele găsite într-o trecere organizată, apoi confirmă corecțiile. Notează separat informațiile de înlocuit și ipotezele de validat înainte de producție.

Pentru fiecare schimbare, explică problema rezolvată și comportamentul rezultat. Livrează interacțiuni demonstrabile, inclusiv stările formularelor, fără a construi integrări de producție în această etapă. Identifică prototipul și confirmările simulate ca atare în prezentarea livrabilului. Nu raporta interacțiunile de test drept lead-uri primite de Autoklass sau programări reale.

## 10. Criterii de acceptare

Lucrarea se verifică în prototip prin scenarii cu date controlate. Folosește datele existente pentru listările noi/rulate și comparație, o singură fișă detaliată pentru mașina aleasă și servicii fictive pentru cel puțin două sucursale. Include și stări cu date incomplete.

| Scenariu                                  | Rezultat verificabil                                                                                                                                                                                                             |
| ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Hero și direcție vizuală                  | Video-ul și direcția primului ecran V2 sunt păstrate. Căutarea rămâne ușor de descoperit și utilizat; restul componentelor urmează reguli vizuale derivate din reperul aprobat.                                                  |
| Căutare live → V2                         | Există un modul auto funcțional în prototip și o corespondență documentată cu funcțiile live. Un simplu link spre listare nu este suficient.                                                                                     |
| Căutare și intrări de categorie           | Criteriile din homepage se transferă în listare și rămân editabile; intrările Noi/Rulate afișează categoria selectată.                                                                                                           |
| Filtrare și sortare                       | Rezultatele și numărul lor se actualizează corect; resetarea funcționează; ordinea prețurilor respectă sortarea aleasă.                                                                                                          |
| Căutare după dotări                       | Exemplul documentat demonstrează căutarea; opțiunile doar disponibile pentru un model nu sunt tratate automat ca instalate pe mașinile listate.                                                                                  |
| Listare → fișă → înapoi                   | Mașina și datele coincid; revenirea păstrează filtrele și poziția.                                                                                                                                                               |
| Comparație                                | Mașinile pot fi adăugate și eliminate; criteriile sunt aliniate, iar datele lipsă sunt explicite.                                                                                                                                |
| Acces la contact din fișă                 | „Contactează-ne” deschide direct formularul „Solicită ofertă” pentru mașina aleasă; bara fixă are aceeași destinație.                                                                                                            |
| Fără acțiuni concurente în fluxul mașinii | Fișa, blocul consultantului și formularul nu oferă rezervare, WhatsApp, apel telefonic sau un selector de canale de contact.                                                                                                     |
| Formular de ofertă                        | Are patru câmpuri de contact obligatorii: nume, prenume, email, telefon. Referința mașinii se preia automat; validarea, eroarea și succesul pot fi demonstrate.                                                                  |
| Consultant                                | Blocul este alimentat de datele consultantului alocat proiectului, fără selector manual; eventuala lipsă a datelor reale este explicită în prototip.                                                                             |
| Fișă demonstrativă                        | Există o singură fișă completă, cu surse pentru modelul și versiunea alese; conținutul de model nu este prezentat drept dovadă de stoc Autoklass.                                                                                |
| Dotări și disponibilitate                 | Dotările de serie, opțiunile disponibile și echipamentele configurației demonstrative sunt diferențiate conform surselor; informația necunoscută rămâne explicită. Stocul nu generează automat o promisiune de livrare imediată. |
| Mașină nouă                               | Nu apare un raport de istoric al vehiculului.                                                                                                                                                                                    |
| Limitele etapei                           | Fișa nu include PDF, ofertă personalizată cu discount sau calculator de leasing.                                                                                                                                                 |
| Tarife pe sucursală                       | Schimbarea sucursalei actualizează serviciile și prețurile demonstrative; datele fictive sunt identificate în prezentarea prototipului și se pot înlocui centralizat.                                                            |
| Estimare service                          | VIN-ul, kilometrajul, serviciul și sucursala sunt preluate corect; caracterul orientativ este explicit.                                                                                                                          |
| Programare service                        | Se păstrează datele între pași; ziua și ora sunt preferințe. Finalul demonstrează primirea unei solicitări, fără a confirma rezervarea unui interval.                                                                            |
| Erori și date lipsă                       | Interfața permite continuarea fără pierderea datelor; substituenții, datele fictive autorizate și ipotezele nu sunt raportate ca informații reale.                                                                               |
| Mobil                                     | La cele trei lățimi, niciun element nu împiedică citirea informațiilor sau finalizarea acțiunilor.                                                                                                                               |

Ulterior, în producție, măsoară numărul de lead-uri primite prin formularul de ofertă și proporția sesiunilor cu trimitere reușită din totalul sesiunilor care au vizitat o fișă de mașină. Deschiderea formularului, începerea completării, erorile și abandonul ajută la identificarea blocajelor. Clicurile pe „Contactează-ne” nu sunt lead-uri. Aceste măsurători nu sunt condiții pentru finalizarea prototipului. Pentru service, măsurarea finalizării se va face separat.

## Anexă: context verificat la rescrierea brief-ului

Verificare contextuală realizată la 11 septembrie 2026, pe cod și pe conținutul public accesibil. Baza locală corespundea ramurii `main` din GitHub, commit `dfabb8c5801f24e897f04d2c81d3165aff9b97db`. Revalidează situația când începi implementarea.

- Var 2 are deja o listare comună cu selecție Toate/Noi/Rulate, filtre aplicate în browser și comparație cu selecție păstrată local. Brief-ul cere evaluarea și completarea lor.
- Căutarea complexă din homepage lipsește. Beneficiarul a precizat explicit că motorul de căutare live trebuie adus în V2 și îmbunătățit. Inventarul exact al funcțiilor sale trebuie verificat în browser înainte de proiectare. Intrările din meniu pentru mașini noi, rulate și disponibile imediat duc în V2 la aceeași listare fără prefiltrare.
- Beneficiarul a indicat primul ecran al homepage-ului V2 și video-ul ca reper vizual apreciat. Restul designului V2 nu este considerat la același nivel de calitate.
- Pagina de tarife `/service/tarife` există, dar nu diferențiază prețurile pe sucursală. Unele valori sunt descrise în sursă ca estimări din prototip. Beneficiarul a autorizat ulterior utilizarea unor servicii și prețuri fictive pentru design. Nu prelua promisiunile existente despre timpul de răspuns sau costul exact drept reguli confirmate.
- Fișa are mai multe acțiuni comerciale concurente. Modelul actual de date nu oferă dotări structurate, galerie reală cu mai multe fotografii per exemplar sau consultant asociat. Fișa demonstrativă se va documenta din surse publice, iar blocul consultantului va reprezenta datele furnizate ulterior de sistem.
- Blocul de istoric/verificare este afișat și la mașini noi și trebuie corectat. PDF-ul, oferta cu discount și leasingul au fost excluse explicit din etapa actuală.
- Formularul service din var 2 are pași de completare, kilometraj opțional și nu are VIN. Finalizarea lui este simulată în interfață. Fluxul de rezervare auto existent nu face parte din designul acestei etape.
- Datele statice conțin 18 mașini Mercedes-Benz; nu reprezintă întregul portofoliu Autoklass. Proiectul folosește React și TanStack Start. Puncte de intrare în cod: [listare](https://github.com/tehnic-dwf/autoklass-reimagined-var2/blob/dfabb8c5801f24e897f04d2c81d3165aff9b97db/src/routes/autoturisme.index.tsx), [datele mașinilor](https://github.com/tehnic-dwf/autoklass-reimagined-var2/blob/dfabb8c5801f24e897f04d2c81d3165aff9b97db/src/data/vehicles.ts), [tarife service](https://github.com/tehnic-dwf/autoklass-reimagined-var2/blob/dfabb8c5801f24e897f04d2c81d3165aff9b97db/src/data/service-prices.ts) și [programare service](https://github.com/tehnic-dwf/autoklass-reimagined-var2/blob/dfabb8c5801f24e897f04d2c81d3165aff9b97db/src/routes/service.programare.tsx).
- [Pagina live de programare service](https://www.autoklass.ro/articole/programare-service.html) include date despre mașină, VIN și contact. Conținutul paginii nu dovedește singur funcționarea integrărilor.

Aceste observații orientează execuția. Ele nu reprezintă o cercetare validată cu utilizatori sau un audit complet al interfeței mobile.

## Clarificare de homepage și meniu, 14 septembrie 2026

Homepage-ul trebuie să orienteze și vizitatorii aflați la prima interacțiune cu Autoklass. Păstrează cele două intrări prioritare (căutare mașină și solicitare service), dar arată devreme și oferta secundară: buy-back, test drive, daune, preluare/livrare, mobilitate, piese și accesorii. Nu ascunde toate aceste servicii în footer. Grupează-le după intenția utilizatorului, cu denumiri concrete și acces progresiv la lista completă.

Restructurează și meniul întregului site, pe baza inventarului live: categorii noi/rulate, mărci, utilitare, oferte, service/daune, mobilitate, piese/accesorii și informații Autoklass. Folosește aceeași sursă de navigație în homepage, meniu și footer pentru a evita diferențele de denumiri. Pentru fluxurile secundare neprototipate, trimite la destinații live verificate, marcate clar, fără a construi pași sau reguli comerciale inventate.

Construiește încrederea separat pentru cumpărare și pentru service. Folosește statutul de dealer/service autorizat, condiții clare, informații comerciale transparente și pașii următori explicați. Recenziile, ratingurile, timpii de răspuns și garanțiile trebuie documentate înainte să fie publicate. În lipsa lor, nu inventa dovezi sociale. Documentează raționamentul CRO și ce trebuie măsurat ulterior; un design conform principiilor generale nu dovedește o îmbunătățire de conversie.

Tarifele clientului susțin un subset util pe pagina service, fără a bloca etapa în transcrierea întregii decizii. Păstrează explicit sucursala, categoria mașinii/lucrarea, unitatea de tarifare și TVA. Nu publica PDF-ul original ca parte a demonstrației și nu îl introduce în fișa mașinii.
