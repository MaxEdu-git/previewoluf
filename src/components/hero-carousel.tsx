import { Pause, Play } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/nav-link";
import { WhatsAppLink } from "@/components/whatsapp-link";
import { HERO_SLIDES, SITE, WHATSAPP_MESSAGES } from "@/lib/site-content";
import { cn } from "@/lib/utils";

const INTERVAL = 6500;

/**
 * Painéis de fundo provisórios (sem fotos falsas de pratos).
 * Substituir por <img> das fotos oficiais do restaurante quando chegarem.
 */
const BACKDROPS = [
  "bg-[radial-gradient(circle_at_25%_20%,var(--color-coral),transparent_55%),linear-gradient(140deg,var(--color-overlay),var(--color-secondary))]",
  "bg-[radial-gradient(circle_at_75%_25%,var(--color-primary),transparent_55%),linear-gradient(140deg,var(--color-secondary),var(--color-overlay))]",
  "bg-[radial-gradient(circle_at_50%_80%,var(--color-primary),transparent_55%),linear-gradient(160deg,var(--color-overlay),var(--color-coral))]",
];

export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion.current) setPlaying(false);
  }, []);

  useEffect(() => {
    if (!playing) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % HERO_SLIDES.length), INTERVAL);
    return () => clearInterval(timer);
  }, [playing]);

  const goTo = useCallback((next: number) => {
    setIndex(next);
    setPlaying(false);
  }, []);

  const slide = HERO_SLIDES[index]!;

  return (
    <section
      id="inicio"
      aria-label="Boas-vindas"
      className="relative flex min-h-[88svh] items-end overflow-hidden md:min-h-screen"
    >
      {BACKDROPS.map((backdrop, i) => (
        <div
          key={i}
          aria-hidden="true"
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            backdrop,
            i === index ? "opacity-100" : "opacity-0",
          )}
        />
      ))}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[image:var(--gradient-hero)]"
        style={{ backgroundImage: "var(--gradient-hero)" }}
      />

      <div className="section-shell relative z-10 pt-28 pb-24 text-overlay-foreground md:pb-28">
        <div key={index} className="fade-rise max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.16em] uppercase text-primary">
            {slide.eyebrow}
          </p>
          <h1 className="mt-4 font-display text-4xl leading-[1.1] font-bold sm:text-5xl md:text-6xl">
            {slide.title}
          </h1>
          <p className="mt-5 max-w-xl text-base opacity-95 sm:text-lg">{slide.subtitle}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="min-h-12 rounded-full px-7">
              <NavLink href="/reservas">Reservar mesa</NavLink>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="min-h-12 rounded-full border-overlay-foreground/50 bg-transparent px-7 text-overlay-foreground hover:bg-overlay-foreground/15 hover:text-overlay-foreground"
            >
              <WhatsAppLink
                message={WHATSAPP_MESSAGES.order}
                aria-label={`Pedir pelo WhatsApp do ${SITE.name}`}
              >
                Pedir agora
              </WhatsAppLink>
            </Button>
          </div>
        </div>

        <div className="mt-10 flex items-center gap-3">
          <div className="flex gap-2" role="tablist" aria-label="Escolher destaque">
            {HERO_SLIDES.map((item, i) => (
              <button
                key={item.title}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Destaque ${i + 1}: ${item.eyebrow}`}
                onClick={() => goTo(i)}
                className={cn(
                  "h-2.5 rounded-full transition-all",
                  i === index
                    ? "w-10 bg-primary"
                    : "w-2.5 bg-overlay-foreground/50 hover:bg-overlay-foreground/80",
                )}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? "Pausar apresentação" : "Retomar apresentação"}
            className="grid size-11 place-items-center rounded-full text-overlay-foreground hover:bg-overlay-foreground/15"
          >
            {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
          </button>
        </div>
      </div>
    </section>
  );
}
