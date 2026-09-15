import type { ContactValues } from "@/lib/contact-validation";
export function ContactFields({
  value,
  onChange,
  errors,
  prefix = "contact",
}: {
  value: ContactValues;
  onChange: (v: ContactValues) => void;
  errors: Partial<Record<keyof ContactValues, string>>;
  prefix?: string;
}) {
  return (
    <div className="v3-contact-fields">
      {[
        { key: "lastName", label: "Nume", auto: "family-name", type: "text" },
        { key: "firstName", label: "Prenume", auto: "given-name", type: "text" },
        { key: "email", label: "Email", auto: "email", type: "email" },
        { key: "phone", label: "Telefon", auto: "tel", type: "tel" },
      ].map((f) => {
        const key = f.key as keyof ContactValues;
        const id = `${prefix}-${key}`;
        return (
          <label className="v3-field" key={key} htmlFor={id}>
            <span id={`${id}-label`}>{f.label}</span>
            <input
              id={id}
              aria-labelledby={`${id}-label`}
              name={key}
              type={f.type}
              spellCheck={key === "email" ? false : undefined}
              autoComplete={f.auto}
              required
              maxLength={key === "phone" ? 25 : 100}
              value={value[key]}
              aria-invalid={Boolean(errors[key])}
              aria-describedby={errors[key] ? `${id}-error` : undefined}
              onInput={(e) => onChange({ ...value, [key]: e.currentTarget.value })}
              onChange={(e) => onChange({ ...value, [key]: e.target.value })}
            />
            {errors[key] && (
              <span className="v3-error" id={`${id}-error`}>
                {errors[key]}
              </span>
            )}
          </label>
        );
      })}
    </div>
  );
}
