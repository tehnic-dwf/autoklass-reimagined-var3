import { Link } from "@tanstack/react-router";
import { Mail, Phone } from "lucide-react";

import logoUrl from "@/assets/autoklass-logo.png";
import { branches, contact } from "@/data/company";

const OUT = "/in-afara-scopului";

const columns: Array<{
  title: string;
  links: Array<{ label: string; to: string; hash?: string }>;
}> = [
  {
    title: "Cumpără",
    links: [
      { label: "Stoc: noi și rulate", to: "/autoturisme" },
      { label: "Cum verificăm rulatele", to: "/verificare-masini-rulate" },
      { label: "Mașini salvate și comparație", to: "/comparatie" },
      { label: "Cum cumpăr?", to: "/", hash: "cum-functioneaza" },
      { label: "Îți cumpărăm mașina", to: "/buy-back" },
    ],
  },
  {
    title: "Service",
    links: [
      { label: "Programare service", to: "/service/programare" },
      { label: "Tarife service", to: "/service/tarife" },
      { label: "Service urgent", to: "/service/urgent" },
      { label: "Dosar daună", to: "/service/dosar-daune" },
      { label: "Piese și accesorii", to: OUT },
    ],
  },
  {
    title: "Autoklass",
    links: [
      { label: "Găsește o sucursală", to: "/sucursale" },
      { label: "Despre noi", to: OUT },
      { label: "Cariere", to: OUT },
      { label: "Blog", to: OUT },
      { label: "Contact", to: OUT },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto w-full max-w-7xl px-6 py-20 md:px-8 md:py-28 lg:px-10">
        <div className="grid gap-14 md:grid-cols-[1.2fr_repeat(3,1fr)] md:gap-12">
          {/* Blocul de contact e cel mai proeminent — primul lucru citit pe mobil */}
          <div>
            <Link
              to="/"
              className="inline-flex min-h-11 items-center"
              aria-label="Autoklass — acasă"
            >
              <img src={logoUrl} alt="Autoklass" className="h-8 w-auto" />
            </Link>
            <div className="mt-7 space-y-2">
              <a
                href={contact.phoneHref}
                className="flex min-h-11 items-center gap-3 font-display text-xl tabular-nums"
              >
                <Phone className="size-5 shrink-0" aria-hidden />
                {contact.phone}
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="flex min-h-11 items-center gap-3 text-sm text-primary-foreground/70"
              >
                <Mail className="size-5 shrink-0" aria-hidden />
                {contact.email}
              </a>
            </div>
            <p className="mt-6 max-w-[32ch] text-xs text-primary-foreground/55">
              {branches.length} sucursale în România:{" "}
              {branches.map((branch) => branch.name.replace("Autoklass ", "")).join(", ")}.
            </p>
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <p className="eyebrow text-primary-foreground/50">{column.title}</p>
              <ul className="mt-4 text-sm">
                {column.links.map((link) => (
                  <li key={`${column.title}-${link.label}`}>
                    <Link
                      to={link.to}
                      {...(link.hash ? { hash: link.hash } : {})}
                      className="flex min-h-11 items-center text-primary-foreground/75 transition-colors hover:text-primary-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-primary-foreground/15 pt-8 text-xs text-primary-foreground/55 md:flex-row md:justify-between">
          <p>
            {contact.legalName} · CUI {contact.cui}
          </p>
          <p>Prototip de redesign pe baza datelor publice Autoklass, august 2026.</p>
        </div>
      </div>
    </footer>
  );
}
