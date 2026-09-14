import { Link } from "@tanstack/react-router";
import type { SiteNavItem } from "@/data/site-navigation";

type NavigationLinkProps = {
  item: SiteNavItem;
  className?: string;
  onClick?: () => void;
};

export function NavigationLink({ item, className, onClick }: NavigationLinkProps) {
  if (item.kind === "external") {
    return (
      <a href={item.href} className={className} onClick={onClick}>
        <span>{item.label}</span>
        <span aria-hidden="true" className="shrink-0">
          ↗
        </span>
        <span className="sr-only">
          {`, pe site-ul ${new URL(item.href).hostname}, în aceeași filă`}
        </span>
      </a>
    );
  }

  return (
    <Link
      to={item.to}
      {...(item.search ? { search: item.search } : {})}
      {...(item.hash ? { hash: item.hash } : {})}
      className={className}
      onClick={onClick}
    >
      {item.label}
    </Link>
  );
}
