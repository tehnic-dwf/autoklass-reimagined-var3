import { Link } from "@tanstack/react-router";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  ChevronDown,
  Heart,
  Menu,
  MessageCircle,
  Phone,
  Search,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import logoUrl from "@/assets/autoklass-logo.png";
import { Button } from "@/components/ui/button";
import { contact } from "@/data/company";
import { navigation, type NavGroup, type NavLink } from "@/data/navigation";
import { cn } from "@/lib/utils";

const OUT = "/in-afara-scopului";

function groupSections(items: NavLink[]): Array<[string, NavLink[]]> {
  const out: Array<[string, NavLink[]]> = [];
  for (const item of items) {
    const key = item.section ?? "";
    const last = out[out.length - 1];
    if (last && last[0] === key) last[1].push(item);
    else out.push([key, [item]]);
  }
  return out;
}

function DesktopGroup({
  group,
  open,
  onOpen,
  onClose,
}: {
  group: NavGroup;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (openTimer.current) clearTimeout(openTimer.current);
    closeTimer.current = null;
    openTimer.current = null;
  };

  if (!group.items) {
    return (
      <Link
        to={group.to!}
        {...(group.hash ? { hash: group.hash } : {})}
        className="flex min-h-11 items-center whitespace-nowrap border-b-2 border-transparent px-3 text-sm tracking-[0.01em] text-primary-foreground/75 transition-colors hover:text-primary-foreground xl:px-4"
        activeProps={{ className: "border-primary-foreground/80 text-primary-foreground" }}
      >
        {group.label}
      </Link>
    );
  }

  const sections = groupSections(group.items);

  return (
    <div
      onMouseEnter={() => {
        // Hover deschide doar după o intenție clară, ca primul click să nu închidă.
        clearTimers();
        openTimer.current = setTimeout(onOpen, 260);
      }}
      onMouseLeave={() => {
        clearTimers();
        closeTimer.current = setTimeout(onClose, 140);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={() => {
          clearTimers();
          if (open) onClose();
          else onOpen();
        }}
        className={cn(
          "flex min-h-11 items-center gap-1.5 whitespace-nowrap border-b-2 px-2 text-sm tracking-[0.01em] transition-colors",
          open
            ? "border-primary-foreground/80 text-primary-foreground"
            : "border-transparent text-primary-foreground/75 hover:text-primary-foreground",
        )}
      >
        {group.label}
        <ChevronDown
          className={cn("size-4 transition-transform", open && "rotate-180")}
          strokeWidth={1.5}
          aria-hidden
        />
      </button>

      {open ? (
        <div className="absolute inset-x-0 top-full z-50 border-t border-border/70 bg-card text-foreground shadow-panel">
          <div className="mx-auto w-full max-w-7xl px-10 py-10">
            <div
              className={cn(
                "grid gap-x-12 gap-y-10",
                sections.length > 2
                  ? "md:grid-cols-3"
                  : sections.length === 2
                    ? "md:grid-cols-2"
                    : "md:grid-cols-1",
              )}
            >
              {sections.map(([section, items]) => (
                <div key={section}>
                  {section ? (
                    <p className="eyebrow mb-4 border-b border-border/70 pb-2">{section}</p>
                  ) : null}
                  <ul>
                    {items.map((item) => (
                      <li key={`${item.label}-${item.to}`}>
                        <Link
                          to={item.to}
                          {...(item.hash ? { hash: item.hash } : {})}
                          onClick={onClose}
                          className="flex min-h-11 flex-col justify-center rounded-sm px-3 py-2 transition-colors hover:bg-muted"
                        >
                          <span className="block text-sm font-bold">{item.label}</span>
                          {item.hint ? (
                            <span className="mt-0.5 block text-xs text-muted-foreground">
                              {item.hint}
                            </span>
                          ) : null}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function MobileGroup({
  group,
  open,
  onToggle,
  onNavigate,
}: {
  group: NavGroup;
  open: boolean;
  onToggle: () => void;
  onNavigate: () => void;
}) {
  if (!group.items) {
    return (
      <li className="border-b border-primary-foreground/12">
        <Link
          to={group.to!}
          {...(group.hash ? { hash: group.hash } : {})}
          onClick={onNavigate}
          className="flex min-h-16 items-center px-6 text-lg"
        >
          {group.label}
        </Link>
      </li>
    );
  }

  return (
    <li className="border-b border-primary-foreground/12">
      <button
        type="button"
        aria-expanded={open}
        onClick={onToggle}
        className="flex min-h-16 w-full items-center justify-between gap-4 px-6 text-left text-lg"
      >
        {group.label}
        <ChevronDown
          className={cn(
            "size-5 shrink-0 text-primary-foreground/60 transition-transform",
            open && "rotate-180",
          )}
          strokeWidth={1.5}
          aria-hidden
        />
      </button>

      <div
        className="nav-collapse"
        data-open={open ? "true" : "false"}
        aria-hidden={!open}
        {...(open ? {} : { inert: true })}
      >
        <div className="overflow-hidden bg-primary-foreground/[0.06]">
          <div className="px-6 py-4">
            {groupSections(group.items).map(([section, items]) => (
              <div key={section} className="mb-6 last:mb-0">
                {section ? (
                  <p className="eyebrow mb-2 text-primary-foreground/60">{section}</p>
                ) : null}
                <ul>
                  {items.map((item: NavLink) => (
                    <li key={`${item.label}-${item.to}`}>
                      <Link
                        to={item.to}
                        {...(item.hash ? { hash: item.hash } : {})}
                        onClick={onNavigate}
                        tabIndex={open ? undefined : -1}
                        className="flex min-h-12 flex-col justify-center rounded-sm py-2.5 transition-colors hover:bg-primary-foreground/10"
                      >
                        <span className="text-sm font-bold">{item.label}</span>
                        {item.hint ? (
                          <span className="text-xs text-primary-foreground/60">{item.hint}</span>
                        ) : null}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </li>
  );
}

function ActionIcon({
  to,
  label,
  icon: Icon,
}: {
  to: string;
  label: string;
  icon: React.ElementType;
}) {
  return (
    <Link
      to={to}
      className="flex size-11 items-center justify-center rounded-sm text-primary-foreground/75 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground"
      aria-label={label}
      title={label}
    >
      <Icon className="size-5" strokeWidth={1.5} aria-hidden />
    </Link>
  );
}

const extraGroup: NavGroup = {
  label: "Autoklass",
  items: [
    { label: "Mașini salvate și comparație", to: "/comparatie" },
    { label: "Autentificare", to: OUT },
    { label: "Coșul meu", to: OUT },
    { label: "Contact", to: OUT },
    { label: "Despre noi", to: OUT },
    { label: "Blog", to: OUT },
  ],
};

export function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [desktopGroup, setDesktopGroup] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  // Varianta suprapusă (doar homepage): transparent peste hero, grafit după scroll.
  useEffect(() => {
    if (!overlay) return;
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [overlay]);

  // Escape închide mega-panelul de desktop.
  useEffect(() => {
    if (!desktopGroup) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDesktopGroup(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [desktopGroup]);

  useEffect(() => {
    if (!open) setOpenGroup(null);
  }, [open]);

  const heroState = overlay && !scrolled && !desktopGroup;

  return (
    <header
      className={cn(
        // Două stări curate: transparentă peste hero, solidă cu hairline la scroll.
        // Fără stare intermediară cu blur — tranziția e doar pe culoare de fundal.
        "sticky top-0 z-50 text-primary-foreground transition-colors duration-300",
        heroState
          ? "header-overlay-scrim border-b border-transparent bg-transparent"
          : "border-b border-border/70 bg-primary",
      )}
    >
      {/* Desktop: un singur rând de 80px, mega-panel ancorat la header */}
      <div className="relative hidden lg:block">
        <div className="mx-auto flex h-20 w-full max-w-7xl items-center gap-3 px-6 md:px-8 lg:px-10">
          <Link
            to="/"
            className="flex min-h-11 shrink-0 items-center"
            aria-label="Autoklass — acasă"
          >
            <img src={logoUrl} alt="Autoklass" className="h-6 w-auto" />
          </Link>

          <nav className="flex min-w-0 flex-1 items-center gap-1" aria-label="Navigație principală">
            {navigation.map((group) => (
              <DesktopGroup
                key={group.label}
                group={group}
                open={desktopGroup === group.label}
                onOpen={() => setDesktopGroup(group.label)}
                onClose={() =>
                  setDesktopGroup((current) => (current === group.label ? null : current))
                }
              />
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-0.5">
            <ActionIcon to="/autoturisme" label="Caută în stoc" icon={Search} />
            <span className="hidden xl:flex">
              <ActionIcon to="/comparatie" label="Mașini salvate" icon={Heart} />
            </span>
            <span className="hidden 2xl:flex">
              <ActionIcon to={OUT} label="Autentificare" icon={User} />
            </span>
            <span className="hidden 2xl:flex">
              <ActionIcon to={OUT} label="Coșul meu" icon={ShoppingCart} />
            </span>
            <Button
              asChild
              variant={heroState ? "outline" : "secondary"}
              size="sm"
              className={cn(
                "press ml-2 px-4 2xl:hidden",
                heroState &&
                  "border-primary-foreground/45 bg-transparent text-primary-foreground hover:bg-primary-foreground/[0.08] hover:text-primary-foreground",
              )}
            >
              <Link to="/service/programare">Programare</Link>
            </Button>
            <Button
              asChild
              variant={heroState ? "outline" : "secondary"}
              className={cn(
                "press ml-4 hidden 2xl:inline-flex",
                heroState &&
                  "border-primary-foreground/45 bg-transparent text-primary-foreground hover:bg-primary-foreground/[0.08] hover:text-primary-foreground",
              )}
            >
              <Link to="/service/programare">Programare service</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile: un singur nivel de 64px */}
      <div className="flex h-16 w-full items-center justify-between gap-3 px-6 md:px-8 lg:hidden">
        <Link to="/" className="flex min-h-11 items-center" aria-label="Autoklass — acasă">
          <img src={logoUrl} alt="Autoklass" className="h-7 w-auto" />
        </Link>

        <div className="flex items-center gap-1">
          <a
            href={contact.phoneHref}
            aria-label={`Sună la ${contact.phone}`}
            className="flex size-12 items-center justify-center rounded-sm text-primary-foreground"
          >
            <Phone className="size-5" strokeWidth={1.5} aria-hidden />
          </a>

          <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
            <DialogPrimitive.Trigger
              className="flex size-12 items-center justify-center rounded-sm text-primary-foreground"
              aria-label="Deschide meniul"
            >
              <Menu className="size-6" strokeWidth={1.5} aria-hidden />
            </DialogPrimitive.Trigger>

            <DialogPrimitive.Portal>
              <DialogPrimitive.Overlay className="fixed inset-0 z-[60] bg-primary/60 lg:hidden" />
              <DialogPrimitive.Content
                aria-label="Meniu"
                className="fixed inset-0 z-[70] flex flex-col bg-primary text-primary-foreground lg:hidden"
              >
                <DialogPrimitive.Title className="sr-only">Meniu Autoklass</DialogPrimitive.Title>
                <div className="pt-safe shrink-0 border-b border-primary-foreground/15">
                  <div className="flex h-16 items-center justify-between px-6">
                    <img src={logoUrl} alt="Autoklass" className="h-7 w-auto" />
                    <DialogPrimitive.Close
                      className="flex size-12 items-center justify-center rounded-sm text-primary-foreground"
                      aria-label="Închide meniul"
                    >
                      <X className="size-6" strokeWidth={1.5} aria-hidden />
                    </DialogPrimitive.Close>
                  </div>
                </div>

                <div className="pb-safe-lg flex-1 overflow-y-auto">
                  <div className="px-6">
                    <Link
                      to="/autoturisme"
                      onClick={() => setOpen(false)}
                      className="my-6 flex min-h-12 items-center gap-3 rounded-sm border border-primary-foreground/25 px-4 text-sm text-primary-foreground/80"
                    >
                      <Search className="size-5 shrink-0" strokeWidth={1.5} aria-hidden />
                      Caută în stoc: noi și rulate
                    </Link>
                  </div>

                  <ul className="border-t border-primary-foreground/12">
                    {[...navigation, extraGroup].map((group) => (
                      <MobileGroup
                        key={group.label}
                        group={group}
                        open={openGroup === group.label}
                        onToggle={() =>
                          setOpenGroup((current) => (current === group.label ? null : group.label))
                        }
                        onNavigate={() => setOpen(false)}
                      />
                    ))}
                  </ul>

                  {/* Acțiuni de contact grupate jos, deasupra safe-area — mereu la îndemână */}
                  <div className="mt-10 px-6">
                    <Link
                      to="/service/programare"
                      onClick={() => setOpen(false)}
                      className="press flex min-h-13 items-center justify-center rounded-sm bg-primary-foreground px-4 text-sm font-bold text-primary"
                    >
                      Programare service
                    </Link>
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      <a
                        href={contact.phoneHref}
                        onClick={() => setOpen(false)}
                        className="press flex min-h-12 items-center justify-center gap-2 rounded-sm border border-primary-foreground/25 text-sm"
                      >
                        <Phone className="size-5" strokeWidth={1.5} aria-hidden />
                        Sună
                      </a>
                      <a
                        href={contact.whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setOpen(false)}
                        className="press flex min-h-12 items-center justify-center gap-2 rounded-sm border border-primary-foreground/25 text-sm"
                      >
                        <MessageCircle className="size-5" strokeWidth={1.5} aria-hidden />
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
          </DialogPrimitive.Root>
        </div>
      </div>
    </header>
  );
}
