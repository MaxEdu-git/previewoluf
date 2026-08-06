import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

/**
 * Links do site: âncoras da home (/#secao) usam <a>, rotas usam <Link>.
 */
export function NavLink({
  href,
  className,
  children,
  onClick,
  "aria-label": ariaLabel,
}: {
  href: string;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  "aria-label"?: string;
}) {
  if (href.includes("#")) {
    return (
      <a href={href} className={className} onClick={onClick} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }
  return (
    <Link to={href} className={className} onClick={onClick} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
