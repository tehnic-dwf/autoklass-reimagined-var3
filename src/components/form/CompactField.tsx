import { Check } from "lucide-react";

/**
 * Câmp compact, folosit în toate fluxurile lungi (rezervare, programare).
 * Eticheta stă în interiorul chenarului, deasupra valorii, ca să rămână
 * vizibilă după completare — un placeholder singur dispare exact când omul are
 * nevoie de el. Bifa confirmă discret că e completat.
 */
export function CompactField({
  id,
  label,
  hint,
  error,
  value,
  onChange,
  type = "text",
  autoComplete,
  inputMode,
  placeholder,
  required = true,
  multiline = false,
}: {
  id: string;
  label: string;
  hint?: string | undefined;
  error?: string | undefined;
  value: string;
  onChange: (next: string) => void;
  type?: string | undefined;
  autoComplete?: string | undefined;
  inputMode?: "text" | "tel" | "email" | "numeric" | undefined;
  placeholder?: string | undefined;
  required?: boolean;
  multiline?: boolean;
}) {
  const filled = value.trim().length > 0;
  const valid = filled && !error;

  const shell = error
    ? "relative rounded-sm border border-destructive bg-card px-4 pb-2 pt-2 transition-colors focus-within:ring-2 focus-within:ring-destructive"
    : "relative rounded-sm border border-input bg-card px-4 pb-2 pt-2 transition-colors focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/25";

  const control =
    "w-full bg-transparent text-base outline-none placeholder:text-muted-foreground/70";

  return (
    <div>
      <div className={shell}>
        <label
          htmlFor={id}
          className={
            error
              ? "block text-xs font-bold text-destructive"
              : "block text-xs font-bold text-muted-foreground"
          }
        >
          {label}
          {required ? <span aria-hidden> *</span> : null}
        </label>

        {multiline ? (
          <textarea
            id={id}
            value={value}
            placeholder={placeholder}
            rows={3}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
            onChange={(event) => onChange(event.target.value)}
            className={`${control} mt-1 resize-y`}
          />
        ) : (
          <input
            id={id}
            type={type}
            value={value}
            placeholder={placeholder}
            autoComplete={autoComplete}
            inputMode={inputMode}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
            onChange={(event) => onChange(event.target.value)}
            className={`${control} h-7 pr-7`}
          />
        )}

        {valid && !multiline ? (
          <Check
            className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-trust"
            strokeWidth={2.5}
            aria-hidden
          />
        ) : null}
      </div>

      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs text-destructive">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-muted-foreground">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
