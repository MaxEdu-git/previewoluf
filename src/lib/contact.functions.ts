import { createServerFn } from "@tanstack/react-start";

import { contactSchema } from "@/lib/forms-shared";

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
