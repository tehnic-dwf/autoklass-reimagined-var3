import { Heart } from "lucide-react";

import { useFavorites } from "@/lib/favorites";
import { cn } from "@/lib/utils";

/**
 * Salvarea unei mașini reduce presiunea deciziei imediate: poți compara
 * liniștit mai târziu, fără cont și fără urgență artificială.
 */
export function FavoriteButton({
  slug,
  className,
  withLabel = false,
}: {
  slug: string;
  className?: string;
  withLabel?: boolean;
}) {
  const { has, toggle, ready } = useFavorites();
  const active = ready && has(slug);

  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={active ? "Scoate din lista salvată" : "Salvează pentru comparație"}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        toggle(slug);
      }}
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-card/90 px-3 text-sm text-muted-foreground ring-1 ring-border/60 transition-colors hover:text-foreground hover:ring-foreground/30",
        withLabel ? "min-w-11" : "size-11 px-0",
        active && "ring-accent text-accent hover:text-accent",
        className,
      )}
    >
      <Heart className={cn("size-5 shrink-0", active && "fill-current")} aria-hidden />
      {withLabel ? (active ? "Salvată" : "Salvează pentru comparație") : null}
    </button>
  );
}
