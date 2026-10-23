import { useEffect, useState, type RefObject } from "react";

export function MobileRailProgress({
  rail,
  count,
}: {
  rail: RefObject<HTMLDivElement | null>;
  count: number;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const element = rail.current;
    if (!element || count < 2) return;

    const update = () => {
      const first = element.firstElementChild as HTMLElement | null;
      if (!first) return;
      const gap = parseFloat(getComputedStyle(element).columnGap) || 0;
      const step = first.getBoundingClientRect().width + gap;
      setIndex(Math.min(count - 1, Math.max(0, Math.round(element.scrollLeft / step))));
    };

    const observer = new ResizeObserver(update);
    observer.observe(element);
    element.addEventListener("scroll", update, { passive: true });
    update();
    return () => {
      observer.disconnect();
      element.removeEventListener("scroll", update);
    };
  }, [rail, count]);

  if (count < 2) return null;

  return (
    <div className="ak-mobile-rail-progress" aria-label={`Cardul ${index + 1} din ${count}`}>
      <span className="ak-mobile-rail-track" aria-hidden="true">
        <span style={{ width: `${100 / count}%`, transform: `translateX(${index * 100}%)` }} />
      </span>
      <span aria-hidden="true">
        {index + 1} / {count}
      </span>
    </div>
  );
}
