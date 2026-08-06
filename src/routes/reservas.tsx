import { createFileRoute } from "@tanstack/react-router";

import { ReservationForm } from "@/components/reservation-form";
import { OPENING_HOURS, SITE } from "@/lib/site-content";

export const Route = createFileRoute("/reservas")({
  head: () => ({
    meta: [
      { title: "Reservas | Restaurante Fulô em Camaçari" },
      {
        name: "description",
        content:
          "Solicite sua reserva no Restaurante Fulô em Camaçari. Escolha data, horário e número de pessoas; a confirmação é feita pela nossa equipe.",
      },
      { property: "og:title", content: "Reservar mesa no Restaurante Fulô" },
      {
        property: "og:description",
        content: "Solicite sua mesa em Camaçari: moquecas, sushi, massas e frutos do mar.",
      },
    ],
  }),
  component: ReservasPage,
});

function ReservasPage() {
  return (
    <div className="section-shell py-28 md:py-32">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold tracking-[0.16em] uppercase text-coral">Reservas</p>
        <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Reserve sua mesa</h1>
        <p className="mt-4 text-muted-foreground">
          Abrimos de terça a domingo, {OPENING_HOURS[1]!.hours}. Últimas reservas às 21:00. Dúvidas?
          Fale com a gente no WhatsApp {SITE.phoneDisplay}.
        </p>
      </div>
      <div className="mt-10 max-w-3xl">
        <ReservationForm />
      </div>
    </div>
  );
}
