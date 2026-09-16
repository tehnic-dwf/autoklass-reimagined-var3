import { Link } from "@tanstack/react-router";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, Search, Heart, X, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import logo from "@/assets/autoklass-logo.png";
import { primaryNavigation, serviceAppointment, siteNavigation } from "@/data/site-navigation";
import { NavigationLink } from "@/components/layout/NavigationLink";
import { useFavorites } from "@/lib/favorites";

export function SiteHeader({ overlay = false }: { overlay?: boolean }) {
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
      className={`sticky top-0 z-50 text-white transition-colors [&_a:focus-visible]:outline-white! [&_button:focus-visible]:outline-white! ${overlay && !scrolled ? "header-overlay-scrim bg-transparent" : "bg-[#202326]"}`}
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
          <Link
            to="/autoturisme"
            aria-label="Caută o mașină"
            className="flex size-11 items-center justify-center lg:hidden"
          >
            <Search size={20} strokeWidth={1.5} aria-hidden="true" />
          </Link>
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
            <Dialog.Trigger className="ml-1 inline-flex min-h-11 items-center justify-center gap-2 px-2 text-[14px] sm:text-[16px]">
              <Menu size={20} strokeWidth={1.5} aria-hidden="true" />
              <span>Meniu</span>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="v3-shell-overlay" />
              <Dialog.Content className="v3 v3-panel" aria-describedby="site-menu-description">
                <div className="v3-panel-head">
                  <Dialog.Title>Meniu Autoklass</Dialog.Title>
                  <Dialog.Close className="v3-icon" aria-label="Închide meniul">
                    <X size={22} aria-hidden="true" />
                  </Dialog.Close>
                </div>
                <nav className="v3-panel-body" aria-label="Toate categoriile Autoklass">
                  <div className="mb-6 flex flex-col items-start gap-1">
                    {primaryNavigation.map((item) => (
                      <NavigationLink
                        key={item.label}
                        item={item}
                        className="v3-link"
                        onClick={closeMenu}
                      />
                    ))}
                    <NavigationLink
                      item={serviceAppointment}
                      className="v3-button mt-3 w-full"
                      onClick={closeMenu}
                    />
                  </div>
                  <Dialog.Description
                    id="site-menu-description"
                    className="mb-5 text-[14px] text-[#5d6268]"
                  >
                    Toate mărcile și serviciile Autoklass.
                  </Dialog.Description>
                  {siteNavigation.map((group) => (
                    <details key={group.id} className="v3-disclosure">
                      <summary>{group.label}</summary>
                      <div>
                        {[...new Set(group.items.map((item) => item.section))].map((section) => (
                          <div key={section ?? group.id} className="mb-4 last:mb-0">
                            {section && (
                              <p className="mb-2 text-[13px] text-[#5d6268]">{section}</p>
                            )}
                            <ul>
                              {group.items
                                .filter((item) => item.section === section)
                                .map((item) => (
                                  <li key={item.label}>
                                    <NavigationLink
                                      item={item}
                                      onClick={closeMenu}
                                      className="v3-link w-full justify-between py-2 pr-1"
                                    />
                                  </li>
                                ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </details>
                  ))}
                </nav>
                <div className="v3-panel-foot">
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
