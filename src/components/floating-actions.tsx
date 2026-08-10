import { ArrowUp, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

import { WhatsAppLink } from "@/components/whatsapp-link";
import { SITE, WHATSAPP_MESSAGES } from "@/lib/site-content";

export function FloatingActions() {
  const [showWhatsapp, setShowWhatsapp] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowWhatsapp(true), 2000);
    const onScroll = () => setShowTop(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed right-4 bottom-20 z-40 flex flex-col items-end gap-3 md:bottom-6">
      {showTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Voltar ao topo"
          className="pointer-events-auto grid size-11 place-items-center rounded-full border border-border bg-card text-foreground shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-0.5"
        >
          <ArrowUp className="size-5" />
        </button>
      )}
      {showWhatsapp && (
        <WhatsAppLink
          message={WHATSAPP_MESSAGES.general}
          aria-label={`Falar com o ${SITE.name} pelo WhatsApp`}
          className="fade-rise pointer-events-auto grid size-14 place-items-center rounded-full bg-success text-primary-foreground shadow-[var(--shadow-lift)] transition-transform hover:-translate-y-0.5"
        >
          <MessageCircle className="size-7" aria-hidden="true" />
        </WhatsAppLink>
      )}
    </div>
  );
}
