import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const STATUSES = ["pending", "confirmed", "cancelled", "completed", "no_show"] as const;

export const getMyAccess = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId);
    if (error) throw new Error("Não foi possível verificar suas permissões.");
    return { roles: (data ?? []).map((r) => r.role) };
  });

export const listReservations = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) =>
    z
      .object({
        date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
        status: z.enum(STATUSES).optional(),
        search: z.string().trim().max(80).optional(),
      })
      .parse(input ?? {}),
  )
  .handler(async ({ data, context }) => {
    let query = context.supabase
      .from("reservations")
      .select("*")
      .order("reservation_date", { ascending: true })
      .order("reservation_time", { ascending: true })
      .limit(300);

    if (data.date) query = query.eq("reservation_date", data.date);
    if (data.status) query = query.eq("status", data.status);
    if (data.search) {
      query = query.or(
        `customer_name.ilike.%${data.search}%,customer_phone.ilike.%${data.search}%,protocol.ilike.%${data.search}%`,
      );
    }

    const { data: rows, error } = await query;
    if (error) throw new Error("Não foi possível carregar as reservas.");
    return rows ?? [];
  });

export const updateReservation = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) =>
    z
      .object({
        id: z.string().uuid(),
        status: z.enum(STATUSES).optional(),
        internalNotes: z.string().trim().max(1000).optional(),
        reservationDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
        reservationTime: z.string().regex(/^\d{2}:\d{2}$/).optional(),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    const patch: {
      status?: (typeof STATUSES)[number];
      internal_notes?: string;
      reservation_date?: string;
      reservation_time?: string;
    } = {};
    if (data.status) patch.status = data.status;
    if (data.internalNotes !== undefined) patch.internal_notes = data.internalNotes;
    if (data.reservationDate) patch.reservation_date = data.reservationDate;
    if (data.reservationTime) patch.reservation_time = data.reservationTime;

    const { error } = await context.supabase.from("reservations").update(patch).eq("id", data.id);
    if (error) throw new Error("Não foi possível atualizar a reserva.");
    return { ok: true };
  });

export const listContactMessages = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200);
    if (error) throw new Error("Não foi possível carregar as mensagens.");
    return data ?? [];
  });

export const getSiteSettings = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase.from("site_settings").select("*").limit(1);
    if (error) throw new Error("Não foi possível carregar as configurações.");
    return data?.[0] ?? null;
  });

export const updateSiteSettings = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) =>
    z
      .object({
        id: z.string().uuid(),
        phone: z.string().trim().max(30).optional(),
        whatsapp: z.string().trim().max(30).optional(),
        email: z.string().trim().max(255).optional(),
        address: z.string().trim().max(300).optional(),
        ifood_url: z.string().trim().url().max(500).optional().or(z.literal("")),
        instagram_url: z.string().trim().url().max(500).optional().or(z.literal("")),
        reservation_capacity_per_slot: z.coerce.number().int().min(1).max(500).optional(),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    const { id, ...rest } = data;
    const patch = Object.fromEntries(
      Object.entries(rest).filter(([, value]) => value !== undefined),
    );
    const { error } = await context.supabase
      .from("site_settings")
      .update({ ...patch, updated_by: context.userId })
      .eq("id", id);
    if (error) throw new Error("Não foi possível salvar as configurações.");
    return { ok: true };
  });
