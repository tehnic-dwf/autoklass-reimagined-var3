import { createFileRoute } from "@tanstack/react-router";
import { Check, ClipboardCheck, Car, FileText, Phone, ShieldCheck, Wrench } from "lucide-react";
import { useState } from "react";

import { PhotoUpload } from "@/components/damage/PhotoUpload";
import { DemoNotice } from "@/components/DemoNotice";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { branches, contact, damageFaq, insurers } from "@/data/company";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/service/dosar-daune")({
  head: () => ({
    meta: [
      { title: "Dosar daună auto — constatare și mașină de schimb | Autoklass" },
      {
        name: "description",
        content:
          "Deschidem dosarul de daună în câteva ore, ne ocupăm de formalitățile cu asiguratorul și îți rezervăm mașina de schimb pe durata reparației.",
      },
      {
        property: "og:title",
        content: "Dosar daună auto — constatare și mașină de schimb | Autoklass",
      },
      {
        property: "og:description",
        content:
          "Groupama, Allianz-Țiriac, Omniasig, Asirom, Generali, UNIQA. Decontare directă și comunicare pe fiecare etapă.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DamageFilePage,
});

const steps = [
  {
    icon: Phone,
    title: "1. Ne spui ce s-a întâmplat",
    body: "Completezi formularul sau ne suni. Îți spunem exact ce documente pregătești.",
    duration: "5 minute",
  },
  {
    icon: ClipboardCheck,
    title: "2. Facem constatarea",
    body: "Programăm constatarea la sucursală și deschidem dosarul la asigurator.",
    duration: "în câteva ore",
  },
  {
    icon: Car,
    title: "3. Primești mașină de schimb",
    body: "Îți rezervăm o mașină pe durata reparației, în limita disponibilității flotei.",
    duration: "la preluarea mașinii",
  },
  {
    icon: Wrench,
    title: "4. Reparăm și te ținem la curent",
    body: "Primești actualizări la aprobarea dosarului, la comanda pieselor și la predare.",
    duration: "de regulă 3 zile – 2 săptămâni",
  },
];

const documents = [
  "Constatare amiabilă sau proces-verbal de la poliție",
  "Talon (certificat de înmatriculare)",
  "Permis de conducere",
  "Carte de identitate",
  "Polița RCA sau CASCO",
];

function DamageFilePage() {
  const [insurer, setInsurer] = useState<string | null>(null);
  const [branch, setBranch] = useState<string | null>(null);
  const [needsCar, setNeedsCar] = useState(true);
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen bg-background pb-28 md:pb-0">
      <SiteHeader />

      <main>
        <section className="bg-primary text-primary-foreground">
          <div className="mx-auto w-full max-w-4xl px-6 py-12 md:px-8 md:py-20 lg:px-10">
            <p className="eyebrow text-primary-foreground/70">Dosar daună auto</p>
            <h1 className="mt-3 text-2xl leading-[1.05] tracking-[-0.01em] md:text-4xl">
              Ne ocupăm noi de dosarul de daună.
            </h1>
            <p className="mt-5 max-w-[52ch] text-pretty text-primary-foreground/85">
              Ai avut un accident? Deschidem dosarul în câteva ore, comunicăm direct cu asiguratorul
              și îți rezervăm mașina de schimb. Tu nu alergi între birouri.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" variant="secondary">
                <a href="#formular-daune">Deschide dosarul de daună</a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <a href={contact.phoneHref}>
                  <Phone className="mr-1 size-4" aria-hidden />
                  {contact.phone}
                </a>
              </Button>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-4xl px-6 py-12 md:px-8 md:py-20 lg:px-10">
          <h2 className="text-xl md:text-2xl">Cum se desfășoară, pas cu pas</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {steps.map((step) => (
              <div
                key={step.title}
                className="rounded-sm bg-card p-5 ring-1 ring-border/60 transition-shadow hover:ring-foreground/25"
              >
                <step.icon className="size-5 text-accent" strokeWidth={1.5} aria-hidden />
                <h3 className="mt-3 text-base">{step.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{step.body}</p>
                <p className="mt-2 font-display text-xs font-bold tabular-nums text-trust">
                  {step.duration}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-secondary py-12 md:py-20 lg:py-28">
          <div className="mx-auto w-full max-w-4xl px-6 md:px-8 lg:px-10">
            <h2 className="text-xl md:text-2xl">Ce documente pregătești</h2>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {documents.map((document) => (
                <li
                  key={document}
                  className="flex items-start gap-2 rounded-sm bg-card p-3 text-sm ring-1 ring-border/60"
                >
                  <FileText
                    className="mt-0.5 size-4 shrink-0 text-accent"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                  {document}
                </li>
              ))}
            </ul>
            <p className="mt-5 flex max-w-[62ch] gap-2 text-sm text-muted-foreground">
              <ShieldCheck
                className="mt-0.5 size-4 shrink-0 text-trust"
                strokeWidth={1.5}
                aria-hidden
              />
              Dauna se anunță în maximum 24–48 de ore de la incident, în funcție de asigurator. Dacă
              nu ai toate documentele, deschide oricum dosarul — te ghidăm noi.
            </p>
          </div>
        </section>

        <section
          id="formular-daune"
          className="mx-auto w-full max-w-2xl px-6 py-12 md:px-8 md:py-20 lg:px-10"
        >
          {sent ? (
            <div
              className="rounded-sm bg-trust/8 p-6 ring-1 ring-trust/25 md:p-8"
              role="status"
              aria-live="polite"
            >
              <Check className="size-10 text-trust" strokeWidth={2} aria-hidden />
              <h2 className="mt-4 text-2xl">Dosarul tău a intrat în lucru.</h2>
              <p className="mt-3 max-w-[52ch] text-pretty text-muted-foreground">
                Un coordonator daune te contactează în maximum 2 ore lucrătoare pentru programarea
                constatării{needsCar ? " și confirmarea mașinii de schimb" : ""}.
              </p>
              <dl className="mt-5 divide-y divide-border/70 border-y border-border/70 text-sm">
                <div className="flex justify-between gap-4 py-3">
                  <dt className="text-muted-foreground">Asigurator</dt>
                  <dd className="text-right font-bold">{insurer ?? "de stabilit"}</dd>
                </div>
                <div className="flex justify-between gap-4 py-3">
                  <dt className="text-muted-foreground">Sucursală</dt>
                  <dd className="text-right font-bold">{branch ?? "de stabilit"}</dd>
                </div>
              </dl>
              <DemoNotice className="mt-5 bg-card" />
              <Button asChild variant="outline" className="mt-6">
                <a href={contact.phoneHref}>
                  <Phone className="mr-1 size-4" aria-hidden />
                  Sună {contact.phone}
                </a>
              </Button>
            </div>
          ) : (
            <form
              className="rounded-sm bg-card p-6 ring-1 ring-border/60 md:p-8"
              onSubmit={(event) => {
                event.preventDefault();
                setSent(true);
              }}
            >
              <h2 className="text-xl">Deschide dosarul de daună</h2>
              <p className="mt-2 max-w-[52ch] text-sm text-muted-foreground">
                4 câmpuri obligatorii. Restul detaliilor le clarificăm la telefon.
              </p>

              <div className="mt-6 space-y-4">
                <div>
                  <Label htmlFor="damage-name">Nume</Label>
                  <Input id="damage-name" required autoComplete="name" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="damage-phone">Telefon</Label>
                  <Input
                    id="damage-phone"
                    type="tel"
                    inputMode="tel"
                    required
                    autoComplete="tel"
                    className="mt-2"
                  />
                  <p className="mt-1.5 text-xs text-muted-foreground">
                    Te sunăm pe acest număr pentru programarea constatării.
                  </p>
                </div>
                <div>
                  <Label htmlFor="damage-plate">Număr de înmatriculare</Label>
                  <Input id="damage-plate" required placeholder="B 123 ABC" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="damage-details">Ce s-a întâmplat</Label>
                  <Textarea
                    id="damage-details"
                    rows={3}
                    required
                    placeholder="Ex: lovit în parcare, aripă dreapta față"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label className="block text-sm font-bold">Poze cu avaria</Label>
                  <PhotoUpload />
                </div>
              </div>

              <DemoNotice className="mt-5" />

              <Label className="mt-6 block text-sm font-bold">Asigurator</Label>
              <p className="mt-1 text-xs text-muted-foreground">
                Ne ajută să știm cine decontează. Nu ești sigur? Alege „Altul / nu știu”.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {insurers.map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setInsurer(item.name)}
                    aria-pressed={insurer === item.name}
                    className={cn(
                      "inline-flex min-h-12 items-center rounded-sm border px-3.5 text-sm transition-colors",
                      insurer === item.name
                        ? "border-accent bg-accent/5 font-bold"
                        : "border-border hover:border-accent/50",
                    )}
                  >
                    {insurer === item.name ? (
                      <Check
                        className="mr-1.5 size-4 shrink-0 text-accent"
                        strokeWidth={2}
                        aria-hidden
                      />
                    ) : null}
                    {item.name}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setInsurer("Alt asigurator")}
                  aria-pressed={insurer === "Alt asigurator"}
                  className={cn(
                    "inline-flex min-h-12 items-center rounded-sm border px-3.5 text-sm transition-colors",
                    insurer === "Alt asigurator"
                      ? "border-accent bg-accent/5 font-bold"
                      : "border-border hover:border-accent/50",
                  )}
                >
                  {insurer === "Alt asigurator" ? (
                    <Check
                      className="mr-1.5 size-4 shrink-0 text-accent"
                      strokeWidth={2}
                      aria-hidden
                    />
                  ) : null}
                  Altul / nu știu
                </button>
              </div>
              {insurer && insurer !== "Alt asigurator" ? (
                <p className="mt-2 text-sm text-muted-foreground">
                  {insurers.find((item) => item.name === insurer)?.detail}
                </p>
              ) : null}

              <Label className="mt-6 block text-sm font-bold">Unde vrei să faci constatarea</Label>
              <div className="mt-3 flex flex-wrap gap-2">
                {branches.map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setBranch(item.name)}
                    aria-pressed={branch === item.name}
                    className={cn(
                      "inline-flex min-h-12 items-center rounded-sm border px-3.5 text-sm transition-colors",
                      branch === item.name
                        ? "border-accent bg-accent/5 font-bold"
                        : "border-border hover:border-accent/50",
                    )}
                  >
                    {branch === item.name ? (
                      <Check
                        className="mr-1.5 size-4 shrink-0 text-accent"
                        strokeWidth={2}
                        aria-hidden
                      />
                    ) : null}
                    {item.name.replace("Autoklass ", "")}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setNeedsCar((value) => !value)}
                aria-pressed={needsCar}
                className={cn(
                  "mt-6 flex min-h-12 w-full items-start gap-3 rounded-sm border p-4 text-left transition-colors",
                  needsCar ? "border-accent bg-accent/5" : "border-border hover:border-accent/50",
                )}
              >
                <Car className="mt-0.5 size-4 shrink-0 text-accent" strokeWidth={1.5} aria-hidden />
                <span>
                  <span className="block text-sm font-bold">Rezervă-mi mașină de schimb</span>
                  <span className="block text-sm text-muted-foreground">
                    În limita disponibilității flotei, conform condițiilor asiguratorului.
                  </span>
                </span>
              </button>

              <Button type="submit" size="lg" className="mt-6 w-full">
                Trimite dosarul
              </Button>
              <p className="mt-2 text-center text-xs text-muted-foreground">
                Te contactăm în maximum 2 ore lucrătoare.
              </p>
            </form>
          )}
        </section>

        <section className="border-t border-border/70 bg-card py-12 md:py-20 lg:py-28">
          <div className="mx-auto w-full max-w-3xl px-6 md:px-8 lg:px-10">
            <h2 className="text-xl md:text-2xl">Întrebări frecvente</h2>
            <Accordion type="single" collapsible className="mt-6">
              {damageFaq.map((item, index) => (
                <AccordionItem key={item.q} value={`faq-${index}`}>
                  <AccordionTrigger className="text-left">{item.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>

      <SiteFooter />

      <div className="pb-safe fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-border/70 bg-background/95 px-3 pt-3 shadow-panel backdrop-blur md:hidden">
        <Button asChild variant="outline">
          <a href={contact.phoneHref}>
            <Phone className="mr-1 size-4" aria-hidden />
            Sună
          </a>
        </Button>
        <Button asChild>
          <a href="#formular-daune">Deschide dosarul</a>
        </Button>
      </div>
    </div>
  );
}
