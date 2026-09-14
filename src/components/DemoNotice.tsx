export function DemoNotice({ className = "" }: { className?: string }) {
  return (
    <p className={`v3-notice ${className}`}>
      Prototip de design. Formularul poate fi testat, dar datele nu sunt trimise către Autoklass.
    </p>
  );
}
