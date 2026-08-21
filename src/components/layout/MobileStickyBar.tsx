import { Link } from "@tanstack/react-router";
import { MessageCircle, Phone } from "lucide-react";
import { useEffect, useState } from "react";

import { contact } from "@/data/company";
import { cn } from "@/lib/utils";

/**
 * Bară de acțiuni fixată jos, pe mobil. E o bară pe toată lățimea, nu un dock
 * plutitor: plutitorul acoperea textul și arăta înghesuit sub 380px.
 *
 * `triggerId` o ține ascunsă cât timp elementul respectiv e în ecran (pe
 * homepage: cât se vede hero-ul). Fără `triggerId` bara e vizibilă mereu —
 * așa se comportă pe paginile interioare.
 *
 * Fiecare pagină îi dă acțiunea principală care are sens acolo.
 */
export function MobileStickyBar({
  triggerId,
  ctaLabel = "Programare service",
  ctaShortLabel,
  ctaTo = "/service/programare",
  className,
}: {
  triggerId?: string;
  ctaLabel?: string;
  ctaShortLabel?: string;
  ctaTo?: "/service/programare" | "/autoturisme" | "/buy-back" | "/sucursale";
  className?: string;
}) {
  const [visible, setVisible] = useState(!triggerId);

  useEffect(() => {
    if (!triggerId) {
      setVisible(true);
      return;
    }

    const update = () => {
      const target = document.getElementById(triggerId);
      // Dacă ancora lipsește, bara rămâne utilă: o arătăm, nu o ascundem.
      setVisible(target ? target.getBoundingClientRect().bottom < 0 : true);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [triggerId]);

  return (
    <nav
      aria-label="Acțiuni rapide"
      className={cn(
        "pb-safe fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card px-4 pt-3 transition-transform duration-300 md:hidden",
        visible ? "translate-y-0" : "translate-y-full",
        className,
      )}
      {...(visible ? {} : { inert: true })}
    >
      <div className="flex items-center gap-2">
        <a
          href={contact.phoneHref}
          aria-label={`Sună la ${contact.phone}`}
          className="press flex size-12 shrink-0 items-center justify-center rounded-sm border border-border text-foreground"
        >
          <Phone className="size-5" strokeWidth={1.5} aria-hidden />
        </a>
        <a
          href={contact.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Scrie pe WhatsApp"
          className="press flex size-12 shrink-0 items-center justify-center rounded-sm border border-border text-foreground"
        >
          <MessageCircle className="size-5" strokeWidth={1.5} aria-hidden />
        </a>
        <Link
          to={ctaTo}
          className="press flex h-12 flex-1 items-center justify-center whitespace-nowrap rounded-sm bg-primary px-4 text-sm font-bold text-primary-foreground"
        >
          <span className={ctaShortLabel ? "min-[380px]:hidden" : ""}>
            {ctaShortLabel ?? ctaLabel}
          </span>
          {ctaShortLabel ? <span className="hidden min-[380px]:inline">{ctaLabel}</span> : null}
        </Link>
      </div>
    </nav>
  );
}
