import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createContactMessage } from "@/lib/contact.functions";
import { contactSchema } from "@/lib/forms-shared";

export function ContactForm() {
  const submit = useServerFn(createContactMessage);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const mutation = useMutation({
    mutationFn: (values: Record<string, unknown>) => submit({ data: values as never }),
    onSuccess: () => {
      setSent(true);
      toast.success("Mensagem enviada. A equipe do Fulô responderá assim que possível.");
    },
    onError: (error: Error) => toast.error(error.message),
  });

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const values = {
      name: String(form.get("name") ?? ""),
      phone: String(form.get("phone") ?? ""),
      email: String(form.get("email") ?? ""),
      subject: String(form.get("subject") ?? ""),
      message: String(form.get("message") ?? ""),
      consent: form.get("consent") === "on",
    };
    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      toast.error("Revise os campos destacados.");
      return;
    }
    setErrors({});
    mutation.mutate(parsed.data);
  }

  if (sent) {
    return (
      <div className="surface-card p-6 sm:p-8">
        <h3 className="font-display text-2xl font-bold">Mensagem enviada</h3>
        <p className="mt-3 text-muted-foreground">
          A equipe do Fulô responderá assim que possível. Obrigado pelo contato!
        </p>
        <Button
          variant="outline"
          className="mt-6 min-h-11 rounded-full"
          onClick={() => setSent(false)}
        >
          Enviar outra mensagem
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="surface-card grid gap-5 p-6 sm:p-8" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="name">Nome *</Label>
          <Input id="name" name="name" autoComplete="name" required className="min-h-11" />
          {errors["name"] && <Err>{errors["name"]}</Err>}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="phone">Telefone (opcional)</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            className="min-h-11"
          />
          {errors["phone"] && <Err>{errors["phone"]}</Err>}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">E-mail (opcional)</Label>
          <Input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            className="min-h-11"
          />
          {errors["email"] && <Err>{errors["email"]}</Err>}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="subject">Assunto (opcional)</Label>
          <Input id="subject" name="subject" maxLength={120} className="min-h-11" />
          {errors["subject"] && <Err>{errors["subject"]}</Err>}
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="message">Mensagem *</Label>
        <Textarea id="message" name="message" rows={4} maxLength={1000} required />
        {errors["message"] && <Err>{errors["message"]}</Err>}
      </div>

      <div>
        <label className="flex items-start gap-3 text-sm">
          <Checkbox id="consent" name="consent" className="mt-0.5" required />
          <span>Concordo com o uso dos meus dados para resposta a este contato.</span>
        </label>
        {errors["consent"] && <Err>{errors["consent"]}</Err>}
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={mutation.isPending}
        className="min-h-12 rounded-full"
      >
        {mutation.isPending ? "Enviando..." : "Enviar mensagem"}
      </Button>
    </form>
  );
}

function Err({ children }: { children: React.ReactNode }) {
  return (
    <p role="alert" className="text-sm font-medium text-destructive">
      {children}
    </p>
  );
}
