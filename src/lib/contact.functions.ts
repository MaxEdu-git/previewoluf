import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

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

export const createContactMessage = createServerFn({ method: "POST" })
  .inputValidator((input) => contactSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("contact_messages").insert({
      name: data.name,
      phone: data.phone || null,
      email: data.email || null,
      subject: data.subject || null,
      message: data.message,
    });
    if (error) {
      console.error("[contato] falha ao registrar", error);
      throw new Error("Não foi possível enviar sua mensagem. Tente novamente.");
    }
    return { ok: true };
  });
