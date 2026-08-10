# Ajustar abertura do WhatsApp sem bloqueio no preview

## Objetivo
Fazer todos os botões do WhatsApp abrirem corretamente com o número **(71) 99340-3335**, tanto no site publicado quanto na pré-visualização incorporada.

## Diagnóstico confirmado
- Todos os botões usam o link oficial `wa.me` com o número internacional `5571993403335`.
- O próprio WhatsApp redireciona esse endereço para `api.whatsapp.com` e reconhece o número, exibindo a página “Share on WhatsApp”.
- Portanto, o número não é a causa; o erro ocorre quando esse redirecionamento tenta permanecer no contexto incorporado da pré-visualização.
- Já existe uma interceptação global, mas ela depende de `window.open` e não cobre de forma suficientemente robusta todos os modos de acionamento/contextos de preview.

## Implementação
1. Centralizar a abertura do WhatsApp em um componente/link reutilizável, preservando o `href` oficial para acessibilidade e funcionamento sem JavaScript.
2. No clique, abrir o destino de forma síncrona em uma aba externa de nível superior, sem permitir navegação dentro do iframe.
3. Aplicar o componente a todos os pontos atuais: hero, cardápio, pedidos, formulário de reserva, diálogo japonês e ações flutuantes.
4. Manter o telefone do rodapé como ligação telefônica (`tel:`), separado dos botões de WhatsApp.
5. Remover a interceptação global antiga após migrar os links, evitando comportamentos duplicados.

## Validação
- Conferir que todos os links geram `5571993403335` e mantêm suas mensagens pré-preenchidas.
- Testar clique por mouse e teclado na pré-visualização.
- Confirmar que nenhum clique navega o iframe para `api.whatsapp.com`.
- Confirmar abertura em nova aba no desktop e encaminhamento para o aplicativo/página oficial em celular.

## Detalhes técnicos
O `wa.me` continuará sendo a URL pública canônica. O ajuste será somente na forma como o navegador abre o link, pois trocar diretamente para `api.whatsapp.com` não elimina o bloqueio e usar apenas o protocolo `whatsapp://` prejudicaria dispositivos sem o aplicativo instalado.
