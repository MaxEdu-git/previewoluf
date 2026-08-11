import { createFileRoute } from "@tanstack/react-router";
import {
  Baby,
  CalendarDays,
  Camera,
  Clock,
  MapPin,
  MessageCircle,
  Music,
  ShoppingBag,
  Tv,
  Users,
  UtensilsCrossed,
  Wine,
} from "lucide-react";
import { useState } from "react";

import { ContactForm } from "@/components/contact-form";
import { HeroCarousel } from "@/components/hero-carousel";
import { SpecialtyMenuDialog } from "@/components/japanese-menu-dialog";

import { NavLink } from "@/components/nav-link";
import { WhatsAppLink } from "@/components/whatsapp-link";
import { SPECIALTY_MENUS } from "@/lib/specialty-menus";
import { Button } from "@/components/ui/button";
import {
  ABOUT_PARAGRAPHS,
  DIFFERENTIALS,
  OPENING_HOURS,
  OWNER_MESSAGE,
  SITE,
  SPECIALTIES,
  WHATSAPP_MESSAGES,
} from "@/lib/site-content";

const TITLE = "Restaurante Fulô em Camaçari | Moquecas, Sushi, Massas e Frutos do Mar";
const DESCRIPTION =
  "Conheça o Restaurante Fulô em Camaçari. Moquecas, culinária japonesa, massas, frutos do mar, música ao vivo, espaço kids e ambiente familiar.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Fulô — Sabores que abraçam, momentos que ficam" },
      {
        property: "og:description",
        content: "Culinária baiana, japonesa, massas e frutos do mar em Camaçari.",
      },
    ],
  }),
  component: Home,
});

const ICONS = { music: Music, baby: Baby, camera: Camera, users: Users, wine: Wine, tv: Tv };

function Home() {
  const [openSpecialty, setOpenSpecialty] = useState<string | null>(null);
  const activeMenu = openSpecialty ? SPECIALTY_MENUS[openSpecialty] : null;

  return (
    <>
      {activeMenu && (
        <SpecialtyMenuDialog
          open
          onOpenChange={(next) => {
            if (!next) setOpenSpecialty(null);
          }}
          title={activeMenu.title}
          products={activeMenu.products}
        />
      )}
      <HeroCarousel />



      {/* Ações rápidas */}
      <section aria-label="Ações rápidas" className="border-b border-border bg-card">
        <div className="section-shell grid grid-cols-2 gap-3 py-6 sm:grid-cols-4">
          <QuickAction href="/reservas" icon={<CalendarDays className="size-5" />} label="Reservar" />
          <QuickAction
            whatsappMessage={WHATSAPP_MESSAGES.general}
            icon={<MessageCircle className="size-5" />}
            label="WhatsApp"
          />
          <QuickAction href="/pedidos" icon={<ShoppingBag className="size-5" />} label="Pedidos" />
          <QuickAction
            href={SITE.mapsSearchUrl}
            external
            icon={<MapPin className="size-5" />}
            label="Como chegar"
          />
        </div>
      </section>

      {/* Sobre */}
      <section id="sobre" className="section-shell py-16 md:py-24">
        <div className="grid items-start gap-10 md:grid-cols-2 md:gap-14">
          <div>
            <Eyebrow>Sobre nós</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
              A Nossa Casa, a Sua História
            </h2>
            <div className="mt-6 space-y-4 text-muted-foreground">
              {ABOUT_PARAGRAPHS.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="surface-card p-6 sm:p-8">
            <h3 className="font-display text-2xl font-bold">{OWNER_MESSAGE.title}</h3>
            <p className="mt-4 text-muted-foreground">{OWNER_MESSAGE.content}</p>
            <p className="mt-5 font-display text-lg font-semibold text-coral">
              {OWNER_MESSAGE.signature}
            </p>
            <p className="mt-6 text-sm text-muted-foreground">{SITE.since}</p>
          </div>
        </div>
      </section>

      {/* Especialidades / Cardápio demonstrativo */}
      <section id="especialidades" className="bg-muted py-16 md:py-24">
        <div id="cardapio" className="section-shell">
          <Eyebrow>Cardápio</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
            Nossas especialidades
          </h2>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Toque em “Culinária japonesa” para ver fotos, valores e composições dos pratos.
          </p>

          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SPECIALTIES.map((item) => {
              const isAvailable = item.title === "Culinária japonesa";

              if (!isAvailable) {
                return (
                  <li
                    key={item.title}
                    className="surface-card flex size-full flex-col p-6 opacity-90"
                  >
                    <span className="grid size-11 place-items-center rounded-xl bg-muted text-muted-foreground">
                      <UtensilsCrossed className="size-5" aria-hidden="true" />
                    </span>
                    <div className="mt-4 flex items-center gap-2">
                      <h3 className="font-display text-xl font-bold">{item.title}</h3>
                      <span className="rounded-full border border-border px-2 py-0.5 text-[0.6875rem] font-semibold tracking-wide text-muted-foreground uppercase">
                        Em breve
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                    <p className="mt-3 text-xs text-muted-foreground">
                      Esta categoria poderá compor o cardápio digital completo da versão oficial.
                    </p>
                  </li>
                );
              }

              return (
                <li key={item.title}>
                  <button
                    type="button"
                    onClick={() => setOpenSpecialty(item.title)}
                    aria-label={`Ver produtos de ${item.title}`}
                    className="surface-card surface-card-hover group flex size-full flex-col p-6 text-left focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
                  >
                    <span className="gradient-warm grid size-11 place-items-center rounded-xl text-primary-foreground transition-transform duration-300 group-hover:scale-105">
                      <UtensilsCrossed className="size-5" aria-hidden="true" />
                    </span>

                    <div className="mt-4 flex items-center gap-2">
                      <h3 className="font-display text-xl font-bold">{item.title}</h3>
                      <span className="rounded-full bg-coral px-2 py-0.5 text-[0.6875rem] font-semibold tracking-wide text-coral-foreground uppercase">
                        Ver pratos
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </section>


      {/* Diferenciais */}
      <section id="diferenciais" className="section-shell py-16 md:py-24">
        <Eyebrow>Diferenciais</Eyebrow>
        <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Muito além do prato</h2>
        <p className="mt-3 max-w-xl text-muted-foreground">
          Um espaço preparado para transformar encontros em boas lembranças.
        </p>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {DIFFERENTIALS.map((item) => {
            const Icon = ICONS[item.icon as keyof typeof ICONS] ?? Music;
            return (
              <li key={item.title} className="surface-card surface-card-hover p-6">
                <span className="grid size-11 place-items-center rounded-xl bg-coral text-coral-foreground">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-display text-xl font-bold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Cardápio digital completo (versão final) */}
      <section className="bg-secondary py-16 text-secondary-foreground md:py-24">
        <div className="section-shell max-w-2xl text-center">
          <Eyebrow className="text-primary">Versão final</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
            Cardápio digital completo
          </h2>
          <p className="mt-4 opacity-90">
            A demonstração acima mostra a culinária japonesa. Na versão oficial, todas as categorias
            entram no cardápio digital completo, com fotos, valores e composições atualizáveis pela
            equipe.
          </p>
          <Button asChild size="lg" className="mt-8 min-h-12 rounded-full px-7">
            <WhatsAppLink message={WHATSAPP_MESSAGES.menu}>Falar sobre a versão final</WhatsAppLink>
          </Button>
        </div>
      </section>


      {/* Reservas + Pedidos */}
      <section id="reservas" className="section-shell grid gap-6 py-16 md:grid-cols-2 md:py-24">
        <div className="surface-card flex flex-col justify-between gap-6 p-6 sm:p-8">
          <div>
            <Eyebrow>Reservas</Eyebrow>
            <h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl">
              Garanta sua mesa no Fulô
            </h2>
            <p className="mt-3 text-muted-foreground">
              Solicite sua reserva pelo site. A confirmação é feita pela nossa equipe — o envio do
              formulário não representa confirmação automática da mesa.
            </p>
          </div>
          <Button asChild size="lg" className="min-h-12 w-fit rounded-full px-7">
            <NavLink href="/reservas">Solicitar reserva</NavLink>
          </Button>
        </div>

        <div id="pedidos" className="surface-card flex flex-col justify-between gap-6 p-6 sm:p-8">
          <div>
            <Eyebrow>Pedidos</Eyebrow>
            <h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl">Peça pelo WhatsApp</h2>
            <p className="mt-3 text-muted-foreground">
              O pedido online pelo site será disponibilizado assim que o cardápio digital for
              cadastrado.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="min-h-12 rounded-full px-7">
              <WhatsAppLink message={WHATSAPP_MESSAGES.order}>Pedir pelo WhatsApp</WhatsAppLink>
            </Button>
            <Button asChild size="lg" variant="outline" className="min-h-12 rounded-full px-7">
              <NavLink href="/pedidos">Ver detalhes</NavLink>
            </Button>
          </div>
        </div>
      </section>

      {/* Horários + Localização */}
      <section id="localizacao" className="bg-muted py-16 md:py-24">
        <div className="section-shell grid gap-8 md:grid-cols-2">
          <div>
            <Eyebrow>Horários</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Quando visitar</h2>
            <ul className="surface-card mt-6 divide-y divide-border">
              {OPENING_HOURS.map((row) => (
                <li key={row.day} className="flex items-center justify-between gap-4 px-5 py-3">
                  <span className="flex items-center gap-2 font-medium">
                    <Clock className="size-4 text-muted-foreground" aria-hidden="true" />
                    {row.day}
                  </span>
                  <span className={row.closed ? "text-sm font-semibold text-warning" : "text-sm"}>
                    {row.hours}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted-foreground">
              Horários especiais em feriados são informados nos nossos canais.
            </p>
          </div>

          <div>
            <Eyebrow>Localização</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Como chegar</h2>
            <p className="mt-4 text-muted-foreground">{SITE.address.formatted}</p>
            <div className="mt-6 overflow-hidden rounded-2xl border border-border">
              <iframe
                title="Mapa com a localização do Restaurante Fulô"
                src={SITE.mapsEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="aspect-[4/3] w-full"
              />
            </div>
            <Button asChild variant="outline" className="mt-5 min-h-11 rounded-full">
              <a href={SITE.mapsSearchUrl} target="_blank" rel="noreferrer">
                Abrir no Google Maps
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Contato */}
      <section id="contato" className="section-shell py-16 md:py-24">
        <div className="grid gap-10 md:grid-cols-[1fr_1.2fr]">
          <div>
            <Eyebrow>Contato</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Fale com o Fulô</h2>
            <p className="mt-4 text-muted-foreground">
              Dúvidas, eventos ou grupos grandes? Envie sua mensagem ou fale direto no WhatsApp.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              <li>
                <span className="font-medium">WhatsApp: </span>
                <WhatsAppLink
                  message={WHATSAPP_MESSAGES.general}
                  className="underline underline-offset-4"
                >
                  {SITE.phoneDisplay}
                </WhatsAppLink>
              </li>
              <li>
                <span className="font-medium">E-mail: </span>
                <a href={`mailto:${SITE.email}`} className="underline underline-offset-4">
                  {SITE.email}
                </a>
              </li>
              <li>
                <span className="font-medium">Instagram: </span>
                <a
                  href={SITE.instagram.url}
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-4"
                >
                  {SITE.instagram.handle}
                </a>
              </li>
            </ul>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}

function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p
      className={`text-xs font-semibold tracking-[0.16em] uppercase text-coral ${className ?? ""}`}
    >
      {children}
    </p>
  );
}

function QuickAction({
  href,
  label,
  icon,
  external,
  whatsappMessage,
}: {
  href?: string;
  label: string;
  icon: React.ReactNode;
  external?: boolean;
  whatsappMessage?: string;
}) {
  const className =
    "surface-card surface-card-hover flex min-h-14 items-center justify-center gap-2 px-3 py-3 text-sm font-semibold";
  if (whatsappMessage) {
    return (
      <WhatsAppLink message={whatsappMessage} className={className}>
        <span className="text-coral">{icon}</span>
        {label}
      </WhatsAppLink>
    );
  }
  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        <span className="text-coral">{icon}</span>
        {label}
      </a>
    );
  }
  return (
    <NavLink href={href!} className={className}>
      <span className="text-coral">{icon}</span>
      {label}
    </NavLink>
  );
}
