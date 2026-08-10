import { forwardRef, type AnchorHTMLAttributes, type MouseEvent } from "react";

import { whatsappLink } from "@/lib/site-content";

/**
 * Link único para o WhatsApp.
 *
 * Mantém o `href` oficial do wa.me (acessível, funciona sem JavaScript e
 * preserva o clique com Ctrl/Cmd), mas força a abertura em uma aba de nível
 * superior. Dentro de pré-visualizações incorporadas, o WhatsApp recusa ser
 * carregado no iframe, o que aparece como "bloqueado" para o usuário.
 */
type WhatsAppLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  message: string;
};

export function openWhatsApp(href: string) {
  // Sem "noopener" na lista de features: com ela o navegador devolve null e não
  // é possível saber se a aba abriu. A referência é limpa em seguida.
  const opened = window.open(href, "_blank");
  if (opened) {
    try {
      opened.opener = null;
    } catch {
      // Alguns navegadores não permitem; a aba já está aberta.
    }
    return;
  }
  // Sem permissão para nova aba: navega a janela de nível mais alto possível.
  try {
    (window.top ?? window).location.href = href;
  } catch {
    window.location.href = href;
  }
}

export const WhatsAppLink = forwardRef<HTMLAnchorElement, WhatsAppLinkProps>(
  function WhatsAppLink({ message, onClick, ...props }, ref) {
    const href = whatsappLink(message);

    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
      onClick?.(event);
      if (event.defaultPrevented) return;
      // Deixa o navegador cuidar de clique do meio, Ctrl/Cmd e Shift.
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }
      event.preventDefault();
      openWhatsApp(href);
    };

    return (
      <a
        {...props}
        ref={ref}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
      />
    );
  },
);
