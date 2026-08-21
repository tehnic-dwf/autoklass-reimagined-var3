import { Play } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Player „lite” local: înainte de click nu există niciun iframe în DOM.
 * După click se montează iframe-ul privacy-enhanced (youtube-nocookie).
 * Fără autoplay înainte de acțiunea explicită a utilizatorului.
 */
export function LiteYouTube({
  videoId,
  title,
  posterSrc,
  posterAlt,
  caption,
  playLabel,
  className,
}: {
  videoId: string;
  title: string;
  posterSrc: string;
  posterAlt: string;
  caption?: string;
  playLabel: string;
  className?: string;
}) {
  const [active, setActive] = useState(false);
  // Dacă imaginea poster nu se încarcă, renunțăm la ea și centrăm butonul
  // de play pe un fundal neutru, ca zona să rămână utilizabilă.
  const [posterFailed, setPosterFailed] = useState(false);

  return (
    <div className={cn("overflow-hidden rounded-lg bg-primary", className)}>
      <div className="relative aspect-video w-full">
        {active ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=0`}
            title={title}
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen

            className="absolute inset-0 size-full border-0"
          />
        ) : (
          <button
            type="button"
            onClick={() => setActive(true)}
            aria-label={playLabel}
            className={cn(
              "press group absolute inset-0 flex overflow-hidden p-5 text-left text-primary-foreground md:p-8",
              posterFailed ? "items-center justify-center" : "items-end justify-start",
            )}
          >
            {posterFailed ? null : (
              <>
                <img
                  src={posterSrc}
                  alt={posterAlt}
                  loading="lazy"
                  onError={() => setPosterFailed(true)}
                  className="absolute inset-0 size-full scale-100 object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.03]"
                />
                <span className="hero-copy-scrim absolute inset-0" aria-hidden />
              </>
            )}
            <span
              className={cn(
                "relative flex items-center gap-3.5",
                posterFailed ? "flex-col text-center" : undefined,
              )}
            >
              <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary-foreground text-primary ring-1 ring-black/5 md:size-16">
                <Play className="size-5 translate-x-px" strokeWidth={1.75} aria-hidden />
              </span>
              <span>
                <span className="block text-sm font-bold">{playLabel}</span>
                {caption ? (
                  <span className="mt-0.5 block text-xs tabular-nums text-primary-foreground/75">
                    {caption}
                  </span>
                ) : null}
              </span>
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
