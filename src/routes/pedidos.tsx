import { createFileRoute } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { WhatsAppLink } from "@/components/whatsapp-link";
import { SITE, WHATSAPP_MESSAGES } from "@/lib/site-content";

export const Route = createFileRoute("/pedidos")({
  head: () => ({
    meta: [
      { title: "Pedidos | Restaurante Fulô em Camaçari" },
      {
        name: "description",
        content:
          "Faça seu pedido no Restaurante Fulô em Camaçari pelo WhatsApp. O pedido online pelo site chega em breve.",
      },
      { property: "og:title", content: "Pedidos do Restaurante Fulô" },
      {
        property: "og:description",
        content: "Peça moquecas, sushi, massas e frutos do mar pelo WhatsApp do Fulô.",
      },
    ],
  }),
  component: PedidosPage,
});

function PedidosPage() {
  return (
    <div className="section-shell py-28 md:py-32">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold tracking-[0.16em] uppercase text-coral">Pedidos</p>
        <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Pedir no Fulô</h1>
        <p className="mt-4 text-muted-foreground">
          O pedido online pelo site será disponibilizado assim que o cardápio digital for cadastrado.
          Até então, nosso atendimento pelo WhatsApp cuida do seu pedido.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg" className="min-h-12 rounded-full px-7">
            <WhatsAppLink message={WHATSAPP_MESSAGES.order}>Pedir pelo WhatsApp</WhatsAppLink>
          </Button>
        </div>
        <p className="mt-8 text-sm text-muted-foreground">
          Retirada no restaurante: {SITE.address.formatted}
        </p>
      </div>
    </div>
  );
}
