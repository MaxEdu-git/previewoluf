import { CalendarDays, Home, MessageSquare, ShoppingBag, UtensilsCrossed } from "lucide-react";

import { NavLink } from "@/components/nav-link";

const ITEMS = [
  { label: "Início", href: "/#inicio", Icon: Home },
  { label: "Cardápio", href: "/#cardapio", Icon: UtensilsCrossed },
  { label: "Reservar", href: "/reservas", Icon: CalendarDays },
  { label: "Pedidos", href: "/pedidos", Icon: ShoppingBag },
  { label: "Contato", href: "/#contato", Icon: MessageSquare },
];

export function MobileBottomNav() {
  return (
    <nav
      aria-label="Navegação rápida"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur-md md:hidden"
    >
      <ul className="grid grid-cols-5">
        {ITEMS.map(({ label, href, Icon }) => (
          <li key={href}>
            <NavLink
              href={href}
              className="flex min-h-14 flex-col items-center justify-center gap-1 px-1 py-2 text-[0.6875rem] font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <Icon className="size-5" aria-hidden="true" />
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
