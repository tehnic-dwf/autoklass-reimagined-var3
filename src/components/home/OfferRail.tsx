import { Children, useId, useRef, type ReactNode } from "react";
import { MobileRailProgress } from "./MobileRailProgress";

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
  return (
    <section id={sectionId} className="ak-offer-section v3-section" aria-labelledby={id}>
      <div className="v3-wrap">
        <div className="v3-row">
          <h2 id={id}>{title}</h2>
          {action}
        </div>
        {intro}
        <div
          ref={rail}
          className="ak-offer-rail"
          aria-label={`${title}: glisează pentru mai multe`}
        >
          {children}
        </div>
        <MobileRailProgress rail={rail} count={Children.count(children)} />
      </div>
    </section>
  );
}
