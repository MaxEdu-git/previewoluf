import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/politica-de-privacidade")({
  head: () => ({
    meta: [
      { title: "Política de privacidade | Restaurante Fulô" },
      { name: "description", content: "Como o Restaurante Fulô coleta, usa e protege seus dados pessoais." },
      { property: "og:title", content: "Política de privacidade | Restaurante Fulô" },
      { property: "og:description", content: "Como o Restaurante Fulô coleta, usa e protege seus dados pessoais." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="section-shell py-28 md:py-32">
      <div className="max-w-2xl">
        <h1 className="font-display text-4xl font-bold sm:text-5xl">Política de privacidade</h1>
        <p className="mt-4 text-muted-foreground">Como o Restaurante Fulô coleta, usa e protege seus dados pessoais.</p>
        <section className="mt-8">
          <h2 className="font-display text-2xl font-bold">Dados que coletamos</h2>
          <p className="mt-3 text-muted-foreground">Coletamos apenas os dados necessários para atender solicitações de reserva e mensagens de contato: nome, WhatsApp, e-mail (opcional), data, horário, número de pessoas, ocasião e observações.</p>
        </section>
        <section className="mt-8">
          <h2 className="font-display text-2xl font-bold">Finalidade</h2>
          <p className="mt-3 text-muted-foreground">Os dados são usados exclusivamente para organizar o atendimento, confirmar reservas e responder mensagens. Não usamos esses dados para marketing sem consentimento separado e não os compartilhamos com anunciantes.</p>
        </section>
        <section className="mt-8">
          <h2 className="font-display text-2xl font-bold">Retenção</h2>
          <p className="mt-3 text-muted-foreground">Registros de reservas são mantidos por até 12 meses e mensagens de contato por até 6 meses.</p>
        </section>
        <section className="mt-8">
          <h2 className="font-display text-2xl font-bold">Seus direitos</h2>
          <p className="mt-3 text-muted-foreground">Você pode solicitar acesso, correção ou exclusão dos seus dados pelo e-mail de contato do restaurante.</p>
        </section>
      </div>
    </div>
  );
}
