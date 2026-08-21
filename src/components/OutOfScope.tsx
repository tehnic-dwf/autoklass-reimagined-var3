import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Button } from "@/components/ui/button";

type OutOfScopeProps = {
  title: string;
  persona: string;
  notes: string[];
};

export function OutOfScope({ title, persona, notes }: OutOfScopeProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="bg-primary py-16 text-primary-foreground md:py-24">
          <div className="mx-auto w-full max-w-3xl px-6 md:px-8">
            <p className="eyebrow text-primary-foreground/60">Secțiune neconstruită</p>
            <h1 className="mt-4 text-3xl leading-[1.05] tracking-[-0.01em] md:text-4xl">{title}</h1>
            <p className="mt-5 max-w-[58ch] text-base text-primary-foreground/80">
              Ai dat peste un link real dintr-un meniu real — doar că ecranul din spatele lui nu e
              încă unul dintre cele 6 construite în acest prototip. L-am lăsat vizibil ca să vezi
              arhitectura completă a site-ului, nu doar porțiunea gata.
            </p>
          </div>
        </section>

        <section className="mx-auto w-full max-w-3xl px-6 py-16 md:px-8 md:py-24">
          <p className="eyebrow">Cine ajunge aici</p>
          <p className="mt-4 max-w-[62ch] text-base text-muted-foreground">{persona}</p>

          <p className="eyebrow mt-12">Ce urmează să construim</p>
          <ul className="mt-4 divide-y divide-border border-y border-border">
            {notes.map((note, index) => (
              <li key={note} className="flex gap-4 py-5">
                <span className="font-display text-sm text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="max-w-[58ch] text-base text-muted-foreground">{note}</span>
              </li>
            ))}
          </ul>

          <Button asChild variant="outline" className="mt-10">
            <Link to="/">
              <ArrowLeft className="size-4" aria-hidden />
              Înapoi la prima pagină
            </Link>
          </Button>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
