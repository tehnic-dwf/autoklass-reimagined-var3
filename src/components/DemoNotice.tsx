import { Info } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Prototipul e demonstrativ: formularele nu trimit nimic nicăieri.
 * Marcăm asta explicit ca nimeni să nu creadă că a depus o cerere reală.
 */
export function DemoNotice({ className }: { className?: string }) {
  return (
    <p
      className={cn(
        "flex gap-3 rounded-sm border border-border bg-secondary p-4 text-xs text-muted-foreground",
        className,
      )}
    >
      <Info className="mt-0.5 size-4 shrink-0" aria-hidden />

      <span>
        <strong>Acesta e un prototip.</strong> Ce completezi aici rămâne în browserul tău — nu
        ajunge la Autoklass și nu pornește nicio comandă reală. Pentru o solicitare care chiar
        ajunge la dealer, sună la numărul afișat pe pagină.
      </span>
    </p>
  );
}
