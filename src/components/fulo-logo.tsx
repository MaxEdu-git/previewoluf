import { cn } from "@/lib/utils";

/**
 * Marca provisória em tipografia e cores do Fulô.
 * Substituir pelo arquivo oficial da logo assim que ele for enviado.
 */
export function FuloLogo({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "gradient-warm grid place-items-center rounded-2xl font-display text-xl font-black text-primary-foreground",
        className,
      )}
    >
      F
    </span>
  );
}
