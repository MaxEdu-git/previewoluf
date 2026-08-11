import { Instagram, Mail, MapPin, Phone } from "lucide-react";

import { FuloLogo } from "@/components/fulo-logo";
import { NavLink } from "@/components/nav-link";
import { OPENING_HOURS, SITE } from "@/lib/site-content";

export function SiteFooter() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="section-shell grid gap-10 py-14 md:grid-cols-3">
        <div>
          <div className="flex min-w-0 items-center gap-3">
            <FuloLogo className="h-12 w-12 shrink-0" />
            <div className="min-w-0">
              <p className="font-display text-xl font-bold">{SITE.name}</p>
              <p className="text-sm opacity-85">{SITE.subtitle}</p>
            </div>
          </div>
          <p className="mt-4 text-sm opacity-90">{SITE.since}</p>
        </div>

        <div>
          <h2 className="font-display text-lg font-bold">Contato</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <span>{SITE.address.formatted}</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="size-4 shrink-0" aria-hidden="true" />
              <a href={`tel:+${SITE.whatsapp}`} className="underline-offset-4 hover:underline">
                {SITE.phoneDisplay}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="size-4 shrink-0" aria-hidden="true" />
              <a href={`mailto:${SITE.email}`} className="underline-offset-4 hover:underline">
                {SITE.email}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Instagram className="size-4 shrink-0" aria-hidden="true" />
              <a
                href={SITE.instagram.url}
                target="_blank"
                rel="noreferrer"
                className="underline-offset-4 hover:underline"
              >
                {SITE.instagram.handle}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-display text-lg font-bold">Horários</h2>
          <ul className="mt-4 space-y-1.5 text-sm">
            {OPENING_HOURS.map((row) => (
              <li key={row.day} className="flex justify-between gap-4">
                <span>{row.day}</span>
                <span className="opacity-90">{row.hours}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-secondary-foreground/20">
        <div className="section-shell flex flex-col gap-3 py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p className="opacity-85">
            © {new Date().getFullYear()} {SITE.name}. Todos os direitos reservados.
          </p>
          <p className="opacity-70">Prévia de proposta digital — funcionalidades ilustrativas.</p>
          <nav className="flex flex-wrap gap-4" aria-label="Links legais">
            <NavLink href="/politica-de-privacidade" className="underline-offset-4 hover:underline">
              Política de privacidade
            </NavLink>
            <NavLink href="/politica-de-reservas" className="underline-offset-4 hover:underline">
              Política de reservas
            </NavLink>
            <NavLink href="/termos-de-uso" className="underline-offset-4 hover:underline">
              Termos de uso
            </NavLink>
          </nav>
        </div>
      </div>
    </footer>
  );
}
