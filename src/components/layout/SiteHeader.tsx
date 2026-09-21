import { Link } from "@tanstack/react-router";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, Search, Heart, X, ArrowRight, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import logo from "@/assets/autoklass-logo.png";
import { primaryNavigation, siteNavigation, type SiteNavItem } from "@/data/site-navigation";
import { NavigationLink } from "@/components/layout/NavigationLink";
import { useFavorites } from "@/lib/favorites";

function MenuLinks({ items, onClick }: { items: SiteNavItem[]; onClick: () => void }) {
  return (
    <ul className="ak-menu-links">
      {items.map((item) => (
        <li key={item.label}>
          <NavigationLink item={item} onClick={onClick} className="ak-menu-link" />
        </li>
      ))}
    </ul>
  );
}

export function SiteHeader({
  overlay = false,
  catalog = false,
  onSearch,
}: {
  overlay?: boolean;
  catalog?: boolean;
  onSearch?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { slugs } = useFavorites();
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  const closeMenu = () => setOpen(false);
  return (
    <header
      className={`ak-site-header ${catalog ? "ak-catalog-header" : ""} sticky top-0 z-50 text-white transition-colors [&_a:focus-visible]:outline-white! [&_button:focus-visible]:outline-white! ${overlay && !scrolled ? "header-overlay-scrim bg-transparent" : "bg-[#202326]"}`}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:bg-white focus:p-4 focus:text-black"
      >
        Sari la conținut
      </a>
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-2 px-4 sm:px-6 lg:min-h-20 lg:px-10">
        <Link to="/" aria-label="Autoklass, acasă" className="flex min-h-11 shrink-0 items-center">
          <img src={logo} alt="Autoklass" className="h-auto w-24 sm:w-28 lg:w-32" />
        </Link>
        <nav className="hidden gap-5 text-[14px] lg:flex" aria-label="Navigație principală">
          {primaryNavigation.map((item) => (
            <NavigationLink
              key={item.label}
              item={item}
              className="inline-flex min-h-11 items-center whitespace-nowrap underline-offset-4 hover:underline"
            />
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <Link to="/service/programare" className="v3-header-appointment">
            Programare service <ArrowRight size={16} aria-hidden />
          </Link>
          {onSearch ? (
            <button
              type="button"
              aria-label="Caută o mașină"
              className="flex size-11 items-center justify-center lg:hidden"
              onClick={onSearch}
            >
              <Search size={20} strokeWidth={1.5} aria-hidden />
            </button>
          ) : (
            <Link
              to="/autoturisme"
              hash="catalog-search"
              aria-label="Caută o mașină"
              className="flex size-11 items-center justify-center lg:hidden"
            >
              <Search size={20} strokeWidth={1.5} aria-hidden />
            </Link>
          )}
          <Link
            to="/comparatie"
            aria-label={`Mașini salvate pentru comparație (${slugs.length})`}
            className="relative flex size-11 items-center justify-center"
          >
            <Heart size={20} strokeWidth={1.5} aria-hidden="true" />
            {slugs.length > 0 && (
              <span aria-hidden="true" className="absolute right-0 top-0 text-[12px]">
                {slugs.length}
              </span>
            )}
          </Link>
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger
              aria-label="Meniu Autoklass"
              className="ml-1 inline-flex min-h-11 items-center justify-center gap-2 px-2 text-[14px] sm:text-[16px]"
            >
              <Menu size={20} strokeWidth={1.5} aria-hidden="true" />
              <span>Meniu</span>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="v3-shell-overlay" />
              <Dialog.Content
                className="v3 v3-panel ak-menu-panel"
                aria-describedby="site-menu-description"
              >
                <div className="v3-panel-head">
                  <Dialog.Title>Meniu Autoklass</Dialog.Title>
                  <Dialog.Close className="v3-icon" aria-label="Închide meniul">
                    <X size={22} aria-hidden="true" />
                  </Dialog.Close>
                </div>
                <nav
                  className="v3-panel-body ak-menu-navigation"
                  aria-label="Toate categoriile Autoklass"
                >
                  <Dialog.Description id="site-menu-description" className="sr-only">
                    Mașini, service și celelalte servicii Autoklass.
                  </Dialog.Description>
                  <a
                    className="ak-menu-branches"
                    href="https://www.autoklass.ro/sucursale"
                    onClick={closeMenu}
                  >
                    <MapPin size={20} aria-hidden />
                    <span>Sucursale</span>
                    <ArrowRight size={18} aria-hidden />
                  </a>
                  {siteNavigation.map((group) => {
                    const primary = group.id === "autovehicule" || group.id === "service";
                    const mainLinks = group.items.filter(
                      (item) =>
                        item.kind === "internal" &&
                        (group.id === "autovehicule"
                          ? item.to === "/autoturisme" && item.search?.condition
                          : item.to === "/service/programare" || item.to === "/service/tarife"),
                    );
                    const moreLinks = group.items.filter(
                      (item) =>
                        !mainLinks.includes(item) &&
                        item.label !== "Sucursale" &&
                        !(
                          item.kind === "internal" &&
                          (item.to === "/comparatie" || item.to === "/contact")
                        ),
                    );
                    const vehicleLinks = moreLinks
                      .filter((item) => item.section === "Mărci și vehicule comerciale")
                      .sort(
                        (a, b) => Number(a.kind === "external") - Number(b.kind === "external"),
                      );
                    const purchaseLinks = moreLinks.filter((item) => !vehicleLinks.includes(item));
                    return primary ? (
                      <section className="ak-menu-primary" key={group.id}>
                        <h2>{group.id === "service" ? "Service" : group.label}</h2>
                        <div>
                          {mainLinks.map((item) => (
                            <NavigationLink
                              key={item.label}
                              item={item}
                              onClick={closeMenu}
                              className="ak-menu-main-link"
                            />
                          ))}
                        </div>
                        {group.id === "autovehicule" ? (
                          <details className="v3-disclosure">
                            <summary>Mărci și oferte</summary>
                            <div className="ak-menu-subgroups">
                              <h3>Mărci și autoutilitare</h3>
                              <MenuLinks items={vehicleLinks} onClick={closeMenu} />
                              <h3>Servicii de achiziție</h3>
                              <MenuLinks items={purchaseLinks} onClick={closeMenu} />
                            </div>
                          </details>
                        ) : (
                          <details className="v3-disclosure">
                            <summary>Servicii și garanții</summary>
                            <MenuLinks items={moreLinks} onClick={closeMenu} />
                          </details>
                        )}
                      </section>
                    ) : (
                      <details key={group.id} className="v3-disclosure">
                        <summary>{group.label}</summary>
                        <MenuLinks items={moreLinks} onClick={closeMenu} />
                      </details>
                    );
                  })}
                </nav>
                <div className="v3-panel-foot ak-menu-footer">
                  <Link className="v3-button" to="/contact" onClick={closeMenu}>
                    Contactează-ne <ArrowRight size={18} aria-hidden />
                  </Link>
                  <Link className="v3-link" to="/comparatie" onClick={closeMenu}>
                    <Heart size={18} strokeWidth={1.5} aria-hidden="true" />
                    Mașini salvate ({slugs.length})
                  </Link>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
      <nav className="v3-mobile-primary" aria-label="Acțiuni principale">
        <Link to="/autoturisme">
          <Search size={18} aria-hidden /> Caută mașini
        </Link>
        <Link to="/service/programare">
          Programare service <ArrowRight size={18} aria-hidden />
        </Link>
      </nav>
    </header>
  );
}
