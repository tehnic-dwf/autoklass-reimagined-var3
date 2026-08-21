import { AlertCircle, Check, ImagePlus, X } from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Upload foto pentru dosarul de daună — în prototip fișierele NU se încarcă
 * nicăreva: se generează doar previzualizări locale (object URL), ca fluxul
 * să poată fi testat pe un site static. Stare de eroare = fișier prea mare
 * sau care nu e imagine; nu simulăm o „încărcare” falsă pentru un proces
 * care, în acest prototip, e instant.
 */
type LocalPhoto = { id: string; name: string; url: string };

const MAX_FILE_MB = 15;

export function PhotoUpload() {
  const [photos, setPhotos] = useState<LocalPhoto[]>([]);
  const [rejected, setRejected] = useState<string[]>([]);

  useEffect(() => {
    return () => {
      photos.forEach((photo) => URL.revokeObjectURL(photo.url));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <label
        htmlFor="damage-photos"
        className="mt-2 flex min-h-32 cursor-pointer flex-col items-center justify-center gap-2 rounded-sm border border-dashed border-border bg-secondary p-6 text-center transition-colors hover:border-accent/60 hover:bg-accent/5"
      >
        <ImagePlus className="size-6 text-accent" strokeWidth={1.5} aria-hidden />
        <span className="text-sm font-bold">Adaugă poze cu avaria</span>
        <span className="max-w-[38ch] text-xs text-pretty text-muted-foreground">
          3–6 poze: ansamblul mașinii, un cadru apropiat pe avarie și talonul. Ne ajută să estimăm
          înainte de constatare.
        </span>
      </label>
      <input
        id="damage-photos"
        type="file"
        accept="image/*"
        multiple
        className="sr-only"
        onChange={(event) => {
          const files = Array.from(event.target.files ?? []);
          const accepted = files.filter((file) => file.size <= MAX_FILE_MB * 1024 * 1024);
          const oversized = files.filter((file) => file.size > MAX_FILE_MB * 1024 * 1024);

          setRejected(oversized.map((file) => file.name));
          setPhotos((current) => [
            ...current,
            ...accepted.map((file) => ({
              id: `${file.name}-${file.size}-${current.length}`,
              name: file.name,
              url: URL.createObjectURL(file),
            })),
          ]);
          event.target.value = "";
        }}
      />

      {rejected.length > 0 ? (
        <p role="alert" className="mt-2 flex items-start gap-1.5 text-xs text-destructive">
          <AlertCircle className="mt-0.5 size-3.5 shrink-0" strokeWidth={2} aria-hidden />
          {rejected.length === 1
            ? `„${rejected[0]}” depășește ${MAX_FILE_MB} MB și nu a fost adăugată. Încearcă o poză mai mică.`
            : `${rejected.length} poze depășesc ${MAX_FILE_MB} MB și nu au fost adăugate. Încearcă poze mai mici.`}
        </p>
      ) : null}

      {photos.length > 0 ? (
        <div className="mt-4">
          <p className="flex items-center gap-1.5 text-xs font-bold text-trust" aria-live="polite">
            <Check className="size-3.5 shrink-0" strokeWidth={2} aria-hidden />
            {photos.length === 1 ? "1 poză adăugată" : `${photos.length} poze adăugate`}
          </p>
          <ul className="mt-2 grid grid-cols-3 gap-2">
            {photos.map((photo) => (
              <li
                key={photo.id}
                className="group relative overflow-hidden rounded-sm ring-1 ring-border/60"
              >
                <img
                  src={photo.url}
                  alt={photo.name}
                  className="aspect-square w-full object-cover"
                />
                <button
                  type="button"
                  aria-label={`Șterge ${photo.name}`}
                  onClick={() =>
                    setPhotos((current) => {
                      URL.revokeObjectURL(photo.url);
                      return current.filter((item) => item.id !== photo.id);
                    })
                  }
                  className={cn(
                    "absolute right-1 top-1 flex size-11 items-center justify-center rounded-sm bg-background/90 text-foreground transition-colors hover:bg-background",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
                  )}
                >
                  <X className="size-5" strokeWidth={1.75} aria-hidden />
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
