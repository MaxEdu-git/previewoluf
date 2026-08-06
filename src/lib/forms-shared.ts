import { z } from "zod";

/** Regras de disponibilidade (usadas no cliente e no servidor). */
export const RESERVATION_RULES = {
  closedWeekday: 1, // segunda-feira
  openingTime: "11:00",
  lastReservationTime: "21:00",
  slotIntervalMinutes: 30,
  minimumAdvanceMinutes: 60,
  maximumAdvanceDays: 60,
  defaultCapacityPerSlot: 30,
} as const;

export function buildSlots() {
  const slots: string[] = [];
  const [openH] = RESERVATION_RULES.openingTime.split(":").map(Number);
  const [lastH] = RESERVATION_RULES.lastReservationTime.split(":").map(Number);
  for (let minutes = (openH ?? 11) * 60; minutes <= (lastH ?? 21) * 60; minutes += 30) {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
  }
  return slots;
}

export const dateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Data inválida");

export const reservationSchema = z.object({
  customerName: z.string().trim().min(3, "Informe seu nome completo").max(100),
  customerPhone: z
    .string()
    .trim()
    .min(10, "Informe um WhatsApp válido")
    .max(20)
    .regex(/^[\d\s()+-]+$/, "Informe apenas números"),
  customerEmail: z.string().trim().email("E-mail inválido").max(255).optional().or(z.literal("")),
  reservationDate: dateSchema,
  reservationTime: z.string().regex(/^\d{2}:\d{2}$/, "Horário inválido"),
  guestCount: z.coerce.number().int().min(1, "Mínimo de 1 pessoa").max(30, "Máximo de 30 pessoas"),
  occasion: z.string().trim().max(60).optional().or(z.literal("")),
  needsKidsArea: z.boolean().default(false),
  accessibilityNeeds: z.string().trim().max(200).optional().or(z.literal("")),
  notes: z.string().trim().max(500).optional().or(z.literal("")),
  privacyConsent: z.literal(true, {
    errorMap: () => ({ message: "É necessário concordar com o uso dos dados" }),
  }),
});

export type ReservationInput = z.input<typeof reservationSchema>;

export const contactSchema = z.object({
  name: z.string().trim().min(3, "Informe seu nome").max(100),
  phone: z
    .string()
    .trim()
    .max(20)
    .regex(/^[\d\s()+-]*$/, "Informe apenas números")
    .optional()
    .or(z.literal("")),
  email: z.string().trim().email("E-mail inválido").max(255).optional().or(z.literal("")),
  subject: z.string().trim().max(120).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Escreva sua mensagem").max(1000),
  consent: z.literal(true, {
    errorMap: () => ({ message: "É necessário concordar com o uso dos dados" }),
  }),
});

export type ContactInput = z.input<typeof contactSchema>;
