import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  buildSlots,
  createReservation,
  reservationSchema,
  RESERVATION_RULES,
} from "@/lib/reservations.functions";
import { OCCASIONS, SITE, whatsappLink } from "@/lib/site-content";

function toIsoDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function ReservationForm() {
  const submit = useServerFn(createReservation);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [date, setDate] = useState("");
  const [success, setSuccess] = useState<{ protocol: string } | null>(null);

  const { minDate, maxDate } = useMemo(() => {
    const now = new Date();
    const max = new Date(now.getTime() + RESERVATION_RULES.maximumAdvanceDays * 86_400_000);
    return { minDate: toIsoDate(now), maxDate: toIsoDate(max) };
  }, []);

  const isMonday = useMemo(() => {
    if (!date) return false;
    const [y, m, d] = date.split("-").map(Number);
    return new Date(Date.UTC(y!, (m ?? 1) - 1, d ?? 1)).getUTCDay() === 1;
  }, [date]);

  const mutation = useMutation({
    mutationFn: (values: Record<string, unknown>) => submit({ data: values as never }),
    onSuccess: (data) => {
      setSuccess({ protocol: data.protocol });
      toast.success("Solicitação de reserva enviada!");
    },
    onError: (error: Error) => toast.error(error.message),
  });

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const values = {
      customerName: String(form.get("customerName") ?? ""),
      customerPhone: String(form.get("customerPhone") ?? ""),
      customerEmail: String(form.get("customerEmail") ?? ""),
      reservationDate: String(form.get("reservationDate") ?? ""),
      reservationTime: String(form.get("reservationTime") ?? ""),
      guestCount: Number(form.get("guestCount") ?? 0),
      occasion: String(form.get("occasion") ?? ""),
      needsKidsArea: form.get("needsKidsArea") === "on",
      accessibilityNeeds: String(form.get("accessibilityNeeds") ?? ""),
      notes: String(form.get("notes") ?? ""),
      privacyConsent: form.get("privacyConsent") === "on",
    };

    const parsed = reservationSchema.safeParse(values);
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

  if (success) {
    return (
      <div className="surface-card p-6 sm:p-8">
        <h3 className="font-display text-2xl font-bold">Recebemos sua solicitação</h3>
        <p className="mt-3 text-muted-foreground">
          A reserva será confirmada após a análise da equipe do Fulô. Guarde seu protocolo:
        </p>
        <p className="mt-4 rounded-xl bg-muted px-4 py-3 font-mono text-lg font-semibold">
          {success.protocol}
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          O envio do formulário não representa confirmação automática da mesa.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild className="min-h-11 rounded-full">
            <a
              href={whatsappLink(
                `Olá! Fiz uma solicitação de reserva no site (protocolo ${success.protocol}) e gostaria de confirmar.`,
              )}
              target="_blank"
              rel="noreferrer"
            >
              Confirmar pelo WhatsApp
            </a>
          </Button>
          <Button
            variant="outline"
            className="min-h-11 rounded-full"
            onClick={() => setSuccess(null)}
          >
            Fazer nova reserva
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="surface-card grid gap-5 p-6 sm:p-8" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nome completo" name="customerName" error={errors["customerName"]} required>
          <Input
            id="customerName"
            name="customerName"
            autoComplete="name"
            maxLength={100}
            required
            className="min-h-11"
          />
        </Field>

        <Field label="WhatsApp" name="customerPhone" error={errors["customerPhone"]} required>
          <Input
            id="customerPhone"
            name="customerPhone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="(71) 90000-0000"
            required
            className="min-h-11"
          />
        </Field>

        <Field label="E-mail (opcional)" name="customerEmail" error={errors["customerEmail"]}>
          <Input
            id="customerEmail"
            name="customerEmail"
            type="email"
            inputMode="email"
            autoComplete="email"
            className="min-h-11"
          />
        </Field>

        <Field label="Quantidade de pessoas" name="guestCount" error={errors["guestCount"]} required>
          <Input
            id="guestCount"
            name="guestCount"
            type="number"
            inputMode="numeric"
            min={1}
            max={30}
            defaultValue={2}
            required
            className="min-h-11"
          />
        </Field>

        <Field label="Data" name="reservationDate" error={errors["reservationDate"]} required>
          <Input
            id="reservationDate"
            name="reservationDate"
            type="date"
            min={minDate}
            max={maxDate}
            value={date}
            onChange={(event) => setDate(event.target.value)}
            required
            className="min-h-11"
          />
          {isMonday && (
            <p role="alert" className="mt-1.5 text-sm font-medium text-warning">
              Não abrimos às segundas-feiras. Escolha outro dia.
            </p>
          )}
        </Field>

        <Field label="Horário" name="reservationTime" error={errors["reservationTime"]} required>
          <select
            id="reservationTime"
            name="reservationTime"
            required
            defaultValue=""
            className="min-h-11 w-full rounded-md border border-input bg-background px-3 text-base"
          >
            <option value="" disabled>
              Selecione um horário
            </option>
            {buildSlots().map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Ocasião (opcional)" name="occasion" error={errors["occasion"]}>
          <select
            id="occasion"
            name="occasion"
            defaultValue=""
            className="min-h-11 w-full rounded-md border border-input bg-background px-3 text-base"
          >
            <option value="">Não informar</option>
            {OCCASIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        <Field
          label="Necessidade de acessibilidade (opcional)"
          name="accessibilityNeeds"
          error={errors["accessibilityNeeds"]}
        >
          <Input
            id="accessibilityNeeds"
            name="accessibilityNeeds"
            maxLength={200}
            className="min-h-11"
          />
        </Field>
      </div>

      <Field label="Observações (opcional)" name="notes" error={errors["notes"]}>
        <Textarea id="notes" name="notes" maxLength={500} rows={3} />
      </Field>

      <label className="flex items-start gap-3 text-sm">
        <Checkbox id="needsKidsArea" name="needsKidsArea" className="mt-0.5" />
        <span>Gostaria de ficar próximo ao espaço kids?</span>
      </label>

      <div>
        <label className="flex items-start gap-3 text-sm">
          <Checkbox id="privacyConsent" name="privacyConsent" className="mt-0.5" required />
          <span>
            Concordo com o uso dos meus dados para o atendimento desta reserva, conforme a{" "}
            <a href="/politica-de-privacidade" className="font-medium underline">
              política de privacidade
            </a>
            .
          </span>
        </label>
        {errors["privacyConsent"] && (
          <p role="alert" className="mt-1.5 text-sm font-medium text-destructive">
            {errors["privacyConsent"]}
          </p>
        )}
      </div>

      <p className="rounded-xl bg-muted px-4 py-3 text-sm text-muted-foreground">
        O envio do formulário não representa confirmação automática da mesa. Nossa equipe entra em
        contato pelo WhatsApp {SITE.phoneDisplay}.
      </p>

      <Button
        type="submit"
        size="lg"
        disabled={mutation.isPending}
        className="min-h-12 rounded-full"
      >
        {mutation.isPending ? "Enviando..." : "Solicitar reserva"}
      </Button>
    </form>
  );
}

function Field({
  label,
  name,
  error,
  required,
  children,
}: {
  label: string;
  name: string;
  error?: string | undefined;
  required?: boolean | undefined;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={name} className="text-sm font-medium">
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </Label>
      {children}
      {error && (
        <p role="alert" className="text-sm font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
