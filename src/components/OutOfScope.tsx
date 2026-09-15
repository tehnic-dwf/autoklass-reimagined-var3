import { Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
export function OutOfScope({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <div className="v3">
      <SiteHeader />
      <main id="main-content" className="v3-wrap v3-section">
        <h1>{title}</h1>
        <p className="v3-intro">{description}</p>
        <a className="v3-button mt-8" href={href}>
          Vezi detaliile <span aria-hidden>↗</span>
        </a>
        <div>
          <Link to="/" className="v3-link mt-6">
            Înapoi la prima pagină
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
