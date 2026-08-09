import { useEffect } from "react";

/**
 * Garante que links externos (WhatsApp, Google Maps, Instagram) abram em uma
 * nova aba de nível superior. Dentro de pré-visualizações em iframe, o WhatsApp
 * bloqueia o carregamento (api.whatsapp.com recusa ser exibido em iframe),
 * então interceptamos o clique e abrimos fora do iframe.
 */
const EXTERNAL_HOSTS = ["wa.me", "api.whatsapp.com", "web.whatsapp.com"];

export function ExternalLinkGuard() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey) return;
      const anchor = (event.target as HTMLElement | null)?.closest?.("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || !/^https?:\/\//i.test(href)) return;

      let host = "";
      try {
        host = new URL(href).hostname.replace(/^www\./, "");
      } catch {
        return;
      }
      if (!EXTERNAL_HOSTS.includes(host)) return;

      event.preventDefault();
      window.open(href, "_blank", "noopener,noreferrer");
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
