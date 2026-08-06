import { Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";
import { NAV_ITEMS, SITE } from "@/lib/site-content";
import { FuloLogo } from "@/components/fulo-logo";
import { NavLink } from "@/components/nav-link";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        scrolled
          ? "border-b border-border bg-background/95 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="section-shell grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-3">
        <NavLink
          href="/"
          className="flex min-w-0 items-center gap-3"
          aria-label={`${SITE.name} — página inicial`}
        >
          <FuloLogo className="h-11 w-11 shrink-0" />
          <span className="min-w-0">
            <span
              className={cn(
                "block truncate font-display text-lg leading-tight font-bold",
                scrolled ? "text-foreground" : "text-overlay-foreground",
              )}
            >
              {SITE.name}
            </span>
            <span
              className={cn(
                "hidden truncate text-xs sm:block",
                scrolled ? "text-muted-foreground" : "text-overlay-foreground/80",
              )}
            >
              {SITE.subtitle}
            </span>
          </span>
        </NavLink>

        <div className="flex items-center gap-2">
          <nav className="hidden items-center gap-1 xl:flex" aria-label="Navegação principal">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-3 py-2 text-sm font-medium transition-colors",
                  scrolled
                    ? "text-foreground hover:bg-accent"
                    : "text-overlay-foreground hover:bg-overlay-foreground/15",
                )}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <button
            type="button"
            onClick={toggle}
            aria-label={theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro"}
            className={cn(
              "hidden size-11 place-items-center rounded-full transition-colors md:grid",
              scrolled
                ? "text-foreground hover:bg-accent"
                : "text-overlay-foreground hover:bg-overlay-foreground/15",
            )}
          >
            {theme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
          </button>

          <Button asChild size="lg" className="hidden min-h-11 rounded-full sm:inline-flex">
            <NavLink href="/reservas">Reservar mesa</NavLink>
          </Button>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Abrir menu"
            aria-expanded={open}
            className={cn(
              "grid size-11 place-items-center rounded-full transition-colors xl:hidden",
              scrolled
                ? "text-foreground hover:bg-accent"
                : "text-overlay-foreground hover:bg-overlay-foreground/15",
            )}
          >
            <Menu className="size-6" />
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 xl:hidden">
          <button
            type="button"
            aria-label="Fechar menu"
            className="absolute inset-0 bg-overlay/70"
            onClick={() => setOpen(false)}
          />
          <div className="fade-rise absolute inset-y-0 right-0 flex w-[min(20rem,88vw)] flex-col gap-2 overflow-y-auto bg-background p-5 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="font-display text-lg font-bold">Menu</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Fechar menu"
                className="grid size-11 place-items-center rounded-full hover:bg-accent"
              >
                <X className="size-5" />
              </button>
            </div>

            <nav className="mt-2 flex flex-col" aria-label="Navegação móvel">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="min-h-12 rounded-xl px-3 py-3 text-base font-medium hover:bg-accent"
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <Button asChild size="lg" className="mt-2 min-h-12 rounded-full">
              <NavLink href="/reservas" onClick={() => setOpen(false)}>
                Reservar mesa
              </NavLink>
            </Button>

            <button
              type="button"
              onClick={toggle}
              className="mt-2 flex min-h-12 items-center gap-3 rounded-xl px-3 text-base font-medium hover:bg-accent"
            >
              {theme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
              {theme === "dark" ? "Tema claro" : "Tema escuro"}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
