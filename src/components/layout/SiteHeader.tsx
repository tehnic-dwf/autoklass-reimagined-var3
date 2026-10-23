import { Link } from "@tanstack/react-router";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, Search, Heart, X, ArrowRight, MapPin, UserRound } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
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
  const [utilityVisible, setUtilityVisible] = useState(true);
  const { slugs } = useFavorites();
  useEffect(() => {
    let previousY = window.scrollY;
    const update = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 24);
      if (currentY < 80 || currentY < previousY - 4) setUtilityVisible(true);
      else if (currentY > previousY + 4) setUtilityVisible(false);
      previousY = currentY;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  const closeMenu = () => setOpen(false);
  return (
    <header
      className={`ak-site-header ${catalog ? "ak-catalog-header" : ""} ${utilityVisible ? "" : "ak-utility-hidden"} sticky top-0 z-50 text-white transition-colors [&_a:focus-visible]:outline-white! [&_button:focus-visible]:outline-white! ${overlay && !scrolled ? "header-overlay-scrim bg-transparent" : "bg-[#202326]"}`}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:bg-white focus:p-4 focus:text-black"
      >
        Sari la conținut
      </a>
      <nav className="ak-utility-bar" aria-label="Alte servicii Autoklass">
        <div className="ak-utility-inner">
          <a href="https://piese.autoklass.ro/">
            Piese auto <span aria-hidden="true">↗</span>
          </a>
          <a href="https://axisrent.ro/">
            Închirieri auto <span aria-hidden="true">↗</span>
          </a>
        </div>
      </nav>
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
          <Link to="/contact" aria-label="Contact Autoklass" className="v3-header-contact">
            <span>Contact</span>
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
                  <Dialog.Title>Meniu</Dialog.Title>
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
                        !/Campanii|Oferte service|Promoții service/i.test(item.label) &&
                        !(item.kind === "internal" && item.to === "/comparatie"),
                    );
                    const vehicleLinks = moreLinks
                      .filter((item) => item.section === "Mărci și vehicule comerciale")
                      .sort(
                        (a, b) => Number(a.kind === "external") - Number(b.kind === "external"),
                      );
                    const purchaseLinks = moreLinks.filter((item) => !vehicleLinks.includes(item));
                    return primary ? (
                      <Fragment key={group.id}>
                        <section className="ak-menu-primary">
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
                            <Link
                              to="/"
                              hash={group.id === "service" ? "oferte-service" : "oferte-vanzari"}
                              onClick={closeMenu}
                              className="ak-menu-offer-link"
                            >
                              {group.id === "service" ? "Oferte service" : "Oferte vânzări"}
                              <ArrowRight size={18} aria-hidden />
                            </Link>
                          </div>
                          {group.id === "autovehicule" ? (
                            <details className="v3-disclosure">
                              <summary>Mărci și servicii de achiziție</summary>
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
                        {group.id === "service" && (
                          <a
                            className="ak-menu-branches"
                            href="https://www.autoklass.ro/sucursale"
                            onClick={closeMenu}
                          >
                            <MapPin size={20} aria-hidden />
                            <span>Sucursale</span>
                            <ArrowRight size={18} aria-hidden />
                          </a>
                        )}
                      </Fragment>
                    ) : (
                      <Fragment key={group.id}>
                        {group.id === "mobilitate" && (
                          <p className="ak-menu-more-title">Mai multe</p>
                        )}
                        <details className="v3-disclosure">
                          <summary>{group.label}</summary>
                          <MenuLinks items={moreLinks} onClick={closeMenu} />
                        </details>
                      </Fragment>
                    );
                  })}
                </nav>
                <nav className="v3-panel-foot ak-menu-footer" aria-label="Cont și liste">
                  <Link
                    className="ak-menu-personal-link"
                    to="/comparatie"
                    onClick={closeMenu}
                    aria-label={`Mașini salvate (${slugs.length})`}
                  >
                    <span className="ak-menu-personal-icon">
                      <Heart size={18} strokeWidth={1.5} aria-hidden="true" />
                    </span>
                    <span className="ak-menu-personal-text">Mașini salvate</span>
                    <span className="ak-menu-saved-count" aria-hidden="true">
                      {slugs.length}
                    </span>
                    <ArrowRight className="ak-menu-personal-arrow" size={17} aria-hidden="true" />
                  </Link>
                  <a
                    className="ak-menu-personal-link"
                    href="https://www.autoklass.ro/auth"
                    onClick={closeMenu}
                  >
                    <span className="ak-menu-personal-icon">
                      <UserRound size={18} strokeWidth={1.5} aria-hidden="true" />
                    </span>
                    <span className="ak-menu-personal-text">Contul meu</span>
                    <ArrowRight className="ak-menu-personal-arrow" size={17} aria-hidden="true" />
                  </a>
                </nav>
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
