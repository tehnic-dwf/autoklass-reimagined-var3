import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

export function OfferRail({
  title,
  children,
  action,
  sectionId,
  intro,
}: {
  title: string;
  children: ReactNode;
  action?: ReactNode;
  sectionId?: string;
  intro?: ReactNode;
}) {
  const id = useId();
  const rail = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ start: true, end: false });
  const update = () => {
    const el = rail.current;
    if (el)
      setPosition({
        start: el.scrollLeft < 2,
        end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2,
      });
  };
  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    const refresh = () =>
      setPosition({
        start: el.scrollLeft < 2,
        end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2,
      });
    const observer = new ResizeObserver(refresh);
    observer.observe(el);
    refresh();
    return () => observer.disconnect();
  }, []);
  const move = (direction: number) => {
    const el = rail.current;
    if (el)
      el.scrollBy({
        left:
          direction *
          ((el.firstElementChild?.clientWidth || el.clientWidth) +
            (parseFloat(getComputedStyle(el).columnGap) || 24)),
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
      });
  };
  return (
    <section id={sectionId} className="ak-offer-section v3-section" aria-labelledby={id}>
      <div className="v3-wrap">
        <div className="v3-row">
          <h2 id={id}>{title}</h2>
          {action}
        </div>
        {intro}
        <div ref={rail} onScroll={update} className="ak-offer-rail" id={`${id}-rail`}>
          {children}
        </div>
        <div className="v3-rail-controls">
          <button
            className="v3-icon"
            aria-label={`${title}: ofertele precedente`}
            aria-controls={`${id}-rail`}
            disabled={position.start}
            onClick={() => move(-1)}
          >
            <ArrowLeft aria-hidden />
          </button>
          <button
            className="v3-icon"
            aria-label={`${title}: ofertele următoare`}
            aria-controls={`${id}-rail`}
            disabled={position.end}
            onClick={() => move(1)}
          >
            <ArrowRight aria-hidden />
          </button>
        </div>
      </div>
    </section>
  );
}
