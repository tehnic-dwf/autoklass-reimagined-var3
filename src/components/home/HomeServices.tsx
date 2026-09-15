import { ArrowUpRight } from "lucide-react";
const services = [
  [
    "Test drive",
    "Descoperă cum se simte la volan.",
    "https://www.autoklass.ro/articole/programare-test-drive.html",
  ],
  [
    "Buy-back",
    "O evaluare pentru mașina ta actuală.",
    "https://www.autoklass.ro/articole/cumparam.html",
  ],
  [
    "Gestionarea daunelor",
    "Sprijin pentru constatare și reparații.",
    "https://www.autoklass.ro/articole/gestionarea-daunelor.html",
  ],
  ["Piese și accesorii", "Tot ce ai nevoie pentru mașina ta.", "https://piese.autoklass.ro/"],
  [
    "Pick-up service",
    "Preluarea și livrarea mașinii tale.",
    "https://www.autoklass.ro/articole/pick-up-service.html",
  ],
  ["Închirieri auto", "Mobilitate prin Axis Rent.", "https://axisrent.ro/"],
];
export function HomeServices() {
  return (
    <section id="servicii-autoklass" className="v3-wrap v3-section">
      <h2>Mai mult decât o mașină.</h2>
      <div className="v3-service-links">
        {services.map(([title, description, href]) => (
          <a href={href} key={title}>
            <div>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
            <ArrowUpRight size={24} aria-hidden />
          </a>
        ))}
      </div>
    </section>
  );
}
