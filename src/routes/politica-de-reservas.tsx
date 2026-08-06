import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/politica-de-reservas")({
  head: () => ({
    meta: [
      { title: "Política de reservas | Restaurante Fulô" },
      { name: "description", content: "Regras de reserva de mesas no Restaurante Fulô em Camaçari." },
      { property: "og:title", content: "Política de reservas | Restaurante Fulô" },
      { property: "og:description", content: "Regras de reserva de mesas no Restaurante Fulô em Camaçari." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="section-shell py-28 md:py-32">
      <div className="max-w-2xl">
        <h1 className="font-display text-4xl font-bold sm:text-5xl">Política de reservas</h1>
        <p className="mt-4 text-muted-foreground">Regras de reserva de mesas no Restaurante Fulô em Camaçari.</p>
        <section className="mt-8">
          <h2 className="font-display text-2xl font-bold">Confirmação</h2>
          <p className="mt-3 text-muted-foreground">O envio do formulário não representa confirmação automática da mesa. Toda solicitação passa por análise da equipe, que confirma pelo WhatsApp ou e-mail informado.</p>
        </section>
        <section className="mt-8">
          <h2 className="font-display text-2xl font-bold">Prazos</h2>
          <p className="mt-3 text-muted-foreground">Reservas devem ser solicitadas com no mínimo 1 hora de antecedência e no máximo 60 dias. Não abrimos às segundas-feiras; últimas reservas às 21:00.</p>
        </section>
        <section className="mt-8">
          <h2 className="font-display text-2xl font-bold">Tolerância e cancelamento</h2>
          <p className="mt-3 text-muted-foreground">Pedimos aviso com antecedência em caso de cancelamento, para liberar a mesa a outros clientes. Guarde o protocolo recebido ao enviar a solicitação.</p>
        </section>
      </div>
    </div>
  );
}
