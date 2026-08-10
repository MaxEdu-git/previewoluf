import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronDown, ImageIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { type SpecialtyProduct } from "@/lib/specialty-menus";
import { WhatsAppLink } from "@/components/whatsapp-link";
import { WHATSAPP_MESSAGES } from "@/lib/site-content";

export function SpecialtyMenuDialog({
  open,
  onOpenChange,
  title,
  products,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  products: SpecialtyProduct[];
}) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        onOpenChange(next);
        if (!next) setExpanded(null);
      }}
    >
      <DialogContent className="max-h-[88svh] gap-0 overflow-y-auto p-0 sm:max-w-2xl">
        <DialogHeader className="space-y-2 border-b border-border p-6 pb-5 text-left">
          <DialogTitle className="font-display text-2xl font-bold">{title}</DialogTitle>
          <DialogDescription>
            Toque em um produto para ver o valor e a descrição completa.
          </DialogDescription>
        </DialogHeader>

        <ul className="grid gap-4 p-6 sm:grid-cols-2">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              expanded={expanded === product.id}
              onToggle={() => setExpanded((current) => (current === product.id ? null : product.id))}
            />
          ))}
        </ul>


        <div className="border-t border-border p-6 pt-5">
          <Button asChild size="lg" className="min-h-12 w-full rounded-full">
            <a href={whatsappLink(WHATSAPP_MESSAGES.menu)} target="_blank" rel="noreferrer">
              Consultar pelo WhatsApp
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ProductCard({
  product,
  expanded,
  onToggle,
}: {
  product: SpecialtyProduct;
  expanded: boolean;
  onToggle: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const name = product.name.trim() || "Nome do produto";
  const price = product.price.trim();
  const description = product.description.trim() || "Descrição do produto.";

  return (
    <li>
      <motion.div
        layout={!reduceMotion}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="surface-card overflow-hidden"
      >
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={expanded}
          className="flex w-full flex-col gap-4 p-4 text-left"
        >
          <motion.div
            layout={!reduceMotion}
            className="relative w-full overflow-hidden rounded-xl bg-muted"
            style={{ aspectRatio: expanded ? "4 / 3" : "16 / 10" }}
          >
            {product.image ? (
              <img
                src={product.image}
                alt={product.name || "Produto da culinária japonesa do Restaurante Fulô"}
                loading="lazy"
                className="size-full object-cover"
              />
            ) : (
              <span className="grid size-full place-items-center text-muted-foreground">
                <ImageIcon className="size-7" aria-hidden="true" />
              </span>
            )}
          </motion.div>

          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 space-y-1">
              <h3 className="font-display text-lg leading-tight font-bold">{name}</h3>
              <p
                className={
                  price ? "text-sm font-semibold text-coral" : "text-sm text-muted-foreground"
                }
              >
                {price || "Valor a definir"}
              </p>
            </div>
            <ChevronDown
              className={`mt-1 size-5 shrink-0 text-muted-foreground transition-transform duration-300 ${
                expanded ? "rotate-180" : ""
              }`}
              aria-hidden="true"
            />
          </div>

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                key="description"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden text-sm leading-relaxed text-muted-foreground"
              >
                {description.split("\n").map((line, i) => {
                  if (i === 0 && line.startsWith("Composição do Prato")) {
                    return (
                      <p key={i} className="mb-2 block font-bold text-foreground">
                        {line.endsWith(":") ? line : `${line}:`}
                      </p>
                    );
                  }
                  return (
                    <p key={i} className={line.trim() ? "block" : "h-2"}>
                      {line}
                    </p>
                  );
                })}
              </motion.div>

            )}
          </AnimatePresence>
        </button>
      </motion.div>
    </li>
  );
}
