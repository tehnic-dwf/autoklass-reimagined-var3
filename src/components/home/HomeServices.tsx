import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  FileText,
  ShieldCheck,
  Repeat2,
  Package,
  Truck,
  CarFront,
} from "lucide-react";
export function HomeServices() {
  const services = [
    {
      title: "Daune auto",
      icon: ShieldCheck,
      href: "https://www.autoklass.ro/articole/gestionarea-daunelor.html",
    },
    { title: "Buy-back", icon: Repeat2, href: "https://www.autoklass.ro/articole/cumparam.html" },
    { title: "Piese și accesorii", icon: Package, href: "https://piese.autoklass.ro/" },
    {
      title: "Test drive",
      icon: CarFront,
      href: "https://www.autoklass.ro/articole/programare-test-drive.html",
    },
    {
      title: "Pick-up service",
      icon: Truck,
      href: "https://www.autoklass.ro/articole/pick-up-service.html",
    },
  ];
  return (
    <section id="servicii-autoklass" className="ak-wayfinding v3-wrap">
      <h2>Cu ce te mai putem ajuta?</h2>
      <nav aria-label="Servicii Autoklass" className="ak-service-grid">
        <Link to="/service/tarife">
          <FileText size={22} strokeWidth={1.5} aria-hidden />
          <span>Tarife service</span>
          <ArrowRight size={16} aria-hidden />
        </Link>
        {services.map(({ title, icon: Icon, href }) => (
          <a key={title} href={href}>
            <Icon size={22} strokeWidth={1.5} aria-hidden />
            <span>{title}</span>
            <ArrowUpRight size={16} aria-hidden />
          </a>
        ))}
      </nav>
    </section>
  );
}
