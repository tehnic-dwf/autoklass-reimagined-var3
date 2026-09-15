import { Link } from "@tanstack/react-router";
import logo from "@/assets/autoklass-logo.png";
import { siteNavigation } from "@/data/site-navigation";
import { NavigationLink } from "@/components/layout/NavigationLink";

export function SiteFooter() {
  return (
    <footer className="bg-[#202326] text-white [&_a:focus-visible]:outline-white!">
      <div className="v3-wrap py-12">
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
          <Link to="/" aria-label="Autoklass, acasă" className="inline-flex min-h-11 items-center">
            <img src={logo} alt="Autoklass" className="h-7 w-auto" />
          </Link>
        </div>
        <nav
          className="my-8 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-5"
          aria-label="Navigație în subsol"
        >
          {siteNavigation.map((group) => (
            <section key={group.id} aria-labelledby={`footer-${group.id}`}>
              <h2
                id={`footer-${group.id}`}
                className="mb-3 text-[16px]! font-bold! tracking-normal!"
              >
                {group.label}
              </h2>
              <ul>
                {group.items
                  .filter((item) => item.footer)
                  .map((item) => (
                    <li key={item.label}>
                      <NavigationLink
                        item={item}
                        className="inline-flex min-h-11 items-center gap-2 py-2 text-[14px] text-[#c6c9cc] underline-offset-4 hover:underline"
                      />
                    </li>
                  ))}
              </ul>
            </section>
          ))}
        </nav>
        <p className="border-t border-white/20 pt-6 text-[14px] text-[#c6c9cc]">
          © Autoklass. Toate drepturile rezervate.
        </p>
      </div>
    </footer>
  );
}
