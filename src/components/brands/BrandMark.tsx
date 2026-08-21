/**
 * Mărci grafice desenate ca SVG monocrom (fără fișiere de logo încărcate),
 * pentru secțiunea „Mărci reprezentate oficial”.
 */

type Props = { brand: string; className?: string };

function MercedesStar({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" aria-hidden>
      <circle cx="24" cy="24" r="21" stroke="currentColor" strokeWidth="2" />
      <path d="M24 24V5M24 24 7.6 33.5M24 24l16.4 9.5" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function SmartMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" aria-hidden>
      <circle cx="17" cy="24" r="13" stroke="currentColor" strokeWidth="2" />
      <path d="M35 14v20M30 24h10" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function HondaMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" aria-hidden>
      <path d="M6 10h6v10h24V10h6v28h-6V27H12v11H6z" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function VwMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" aria-hidden>
      <circle cx="24" cy="24" r="21" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 14l7 20 5-13 5 13 7-20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AudiMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 32" className={className} fill="none" aria-hidden>
      {[11, 24, 37, 50].map((cx) => (
        <circle key={cx} cx={cx} cy="16" r="9" stroke="currentColor" strokeWidth="2" />
      ))}
    </svg>
  );
}

function XpengMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" aria-hidden>
      <path
        d="M8 10l14 14-14 14M40 10L26 24l14 14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function BrandMark({ brand, className = "h-9 w-auto" }: Props) {
  switch (brand.toLowerCase()) {
    case "mercedes-benz":
      return <MercedesStar className={className} />;
    case "smart":
      return <SmartMark className={className} />;
    case "honda":
      return <HondaMark className={className} />;
    case "volkswagen":
      return <VwMark className={className} />;
    case "audi":
      return <AudiMark className={className} />;
    case "xpeng":
      return <XpengMark className={className} />;
    default:
      return null;
  }
}
