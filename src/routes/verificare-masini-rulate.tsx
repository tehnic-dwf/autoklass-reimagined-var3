import { createFileRoute, Link } from "@tanstack/react-router";
import { BadgeCheck, FileText, Phone, RotateCcw, ShieldCheck, Wrench } from "lucide-react";

import { MobileStickyBar } from "@/components/layout/MobileStickyBar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { contact } from "@/data/company";

export const Route = createFileRoute("/verificare-masini-rulate")({
  head: () => ({
    meta: [
      { title: "Cum verificăm mașinile rulate — 100+ puncte | Autoklass" },
      {
        name: "description",
        content:
          "Ce verificăm punct cu punct la o mașină rulată: istoric service, kilometraj, structură, uzură, plus garanție și dreptul de retur.",
      },
      {
        property: "og:title",
        content: "Cum verificăm mașinile rulate — 100+ puncte | Autoklass",
      },
      {
        property: "og:description",
        content:
          "Istoric, kilometraj, structură, uzură — verificate și scrise negru pe alb, cu garanție și retur.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: InspectionPage,
});

const groups = [
  {
    icon: FileText,
    title: "Istoric și documente",
    items: [
      "Istoric de service verificat în sistemul oficial Mercedes-Benz",
      "Kilometraj confirmat prin înregistrările din service",
      "Verificare dosare daună și reparații structurale anterioare",
      "Verificare gaj, leasing, restricții de înmatriculare",
      "Carte de identitate, talon, chei și numărul de proprietari",
    ],
  },
  {
    icon: Wrench,
    title: "Mecanică și electronică",
    items: [
      "Diagnoză completă pe calculatoarele de bord (fără erori active ascunse)",
      "Motor, cutie, tracțiune: probe la rece, la cald și în rulare",
      "Sistem de frânare, direcție, suspensie, rulmenți",
      "Sistem de climatizare, electronică de confort și asistență",
      "Baterie de tracțiune (pentru hibride și electrice) — stare reală",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Caroserie și interior",
    items: [
      "Măsurarea grosimii vopselei pe fiecare element",
      "Verificarea geometriei și a punctelor de sudură din fabrică",
      "Anvelope: uzură, vechime, potrivire pe axe",
      "Interior: uzură scaune, volan, pedale — corelată cu kilometrajul",
      "Curățare și igienizare completă înainte de livrare",
    ],
  },
];

const guarantees = [
  {
    icon: BadgeCheck,
    title: "Garanție scrisă",
    body: "Fiecare mașină rulată pleacă cu garanție. Perioada exactă e trecută în oferta ta, nu se negociază verbal.",
  },
  {
    icon: RotateCcw,
    title: "Drept de retur",
    body: "Dacă mașina nu corespunde cu ce ți-am prezentat, o aducem înapoi și corectăm situația. Îți spunem condițiile înainte să semnezi.",
  },
  {
    icon: FileText,
    title: "Raport la cerere",
    body: "Îți trimitem raportul de verificare pentru mașina care te interesează, înainte de test drive.",
  },
];

const faq = [
  {
    q: "Pot să văd raportul înainte să vin la showroom?",
    a: "Da. Ceri raportul pentru mașina care te interesează și îl primești pe e-mail sau WhatsApp, împreună cu pozele reale ale exemplarului.",
  },
  {
    q: "Ce se întâmplă dacă găsiți ceva la verificare?",
    a: "Ori reparăm înainte de vânzare, ori scriem explicit în raport ce nu e perfect și ajustăm prețul. Nu vindem mașini cu probleme nedeclarate.",
  },
  {
    q: "Pot veni cu mecanicul meu?",
    a: "Da. Poți programa o verificare împreună cu un mecanic ales de tine, în sucursala unde se află mașina.",
  },
  {
    q: "Mașinile rulate au istoric complet la Mercedes?",
    a: "Majoritatea da, fiind mașini din rețeaua noastră. Unde istoricul are goluri, o spunem direct în raport.",
  },
];

function InspectionPage() {
  return (
    <div className="min-h-screen bg-background pb-24 md:pb-0">
      <SiteHeader />

      <main>
        <section className="bg-primary text-primary-foreground">
          <div className="mx-auto w-full max-w-4xl px-6 py-12 md:px-8 md:py-20 lg:px-10">
            <p className="eyebrow text-primary-foreground/70">Mașini rulate verificate</p>
            <h1 className="mt-3 text-2xl leading-[1.05] tracking-[-0.01em] md:text-4xl">
              Ce verificăm, punct cu punct, înainte să punem o mașină în stoc.
            </h1>
            <p className="mt-5 max-w-[52ch] text-pretty text-primary-foreground/85">
              Peste 100 de puncte de control, istoric confirmat în sistemul oficial și raport pe
              care îl primești înainte de test drive. Fără „a fost a unui domn bătrân”.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" variant="secondary">
                <Link to="/autoturisme">Vezi mașinile rulate</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <a href={contact.phoneHref}>
                  <Phone className="mr-1 size-4" aria-hidden />
                  Cere un raport
                </a>
              </Button>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-4xl px-6 py-12 md:px-8 md:py-20 lg:px-10">
          <div className="grid gap-4 md:grid-cols-3">
            {groups.map((group, groupIndex) => (
              <div
                key={group.title}
                className="rounded-sm bg-card p-6 ring-1 ring-border/60 transition-shadow hover:ring-foreground/25"
              >
                <div className="flex items-start justify-between gap-3">
                  <group.icon className="size-5 text-accent" strokeWidth={1.5} aria-hidden />
                  <span className="font-display text-xs tabular-nums text-muted-foreground">
                    {String(groupIndex + 1).padStart(2, "0")}
                  </span>
                </div>
                <h2 className="mt-3 text-base">{group.title}</h2>
                <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <BadgeCheck
                        className="mt-0.5 size-4 shrink-0 text-trust"
                        strokeWidth={1.5}
                        aria-hidden
                      />
                      <span className="text-pretty">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-secondary py-12 md:py-20 lg:py-28">
          <div className="mx-auto w-full max-w-4xl px-6 md:px-8 lg:px-10">
            <h2 className="text-xl md:text-2xl">Ce primești în scris</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {guarantees.map((item) => (
                <div key={item.title} className="rounded-sm bg-card p-5 ring-1 ring-border/60">
                  <item.icon className="size-5 text-trust" strokeWidth={1.5} aria-hidden />
                  <h3 className="mt-3 text-base">{item.title}</h3>
                  <p className="mt-1.5 text-sm text-pretty text-muted-foreground">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-3xl px-6 py-12 md:px-8 md:py-20 lg:px-10">
          <h2 className="text-xl md:text-2xl">Întrebări frecvente</h2>
          <Accordion type="single" collapsible className="mt-6">
            {faq.map((item, index) => (
              <AccordionItem key={item.q} value={`check-${index}`}>
                <AccordionTrigger className="text-left">{item.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </main>

      <SiteFooter />

      <MobileStickyBar
        ctaLabel="Vezi mașinile rulate"
        ctaShortLabel="Vezi mașinile"
        ctaTo="/autoturisme"
      />
    </div>
  );
}
