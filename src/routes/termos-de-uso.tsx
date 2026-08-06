import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/termos-de-uso")({
  head: () => ({
    meta: [
      { title: "Termos de uso | Restaurante Fulô" },
      { name: "description", content: "Condições de uso do site do Restaurante Fulô." },
      { property: "og:title", content: "Termos de uso | Restaurante Fulô" },
      { property: "og:description", content: "Condições de uso do site do Restaurante Fulô." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="section-shell py-28 md:py-32">
      <div className="max-w-2xl">
        <h1 className="font-display text-4xl font-bold sm:text-5xl">Termos de uso</h1>
        <p className="mt-4 text-muted-foreground">Condições de uso do site do Restaurante Fulô.</p>
        <section className="mt-8">
          <h2 className="font-display text-2xl font-bold">Uso do site</h2>
          <p className="mt-3 text-muted-foreground">Este site apresenta informações institucionais do Restaurante Fulô e permite solicitar reservas e enviar mensagens. As informações podem ser atualizadas a qualquer momento.</p>
        </section>
        <section className="mt-8">
          <h2 className="font-display text-2xl font-bold">Responsabilidades</h2>
          <p className="mt-3 text-muted-foreground">Você se compromete a fornecer informações verdadeiras nos formulários. Solicitações com dados incorretos podem não ser atendidas.</p>
        </section>
        <section className="mt-8">
          <h2 className="font-display text-2xl font-bold">Conteúdo</h2>
          <p className="mt-3 text-muted-foreground">Textos, marca e imagens deste site pertencem ao Restaurante Fulô e não podem ser reproduzidos sem autorização.</p>
        </section>
      </div>
    </div>
  );
}
