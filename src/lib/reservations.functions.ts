import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import {
  buildSlots,
  dateSchema,
  RESERVATION_RULES,
  reservationSchema,
} from "@/lib/forms-shared";

/** Horários indisponíveis para uma data (bloqueios do painel + lotação). */
export const getAvailability = createServerFn({ method: "GET" })
  .inputValidator((input) => z.object({ date: dateSchema }).parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const [{ data: blocks }, { data: settings }, { data: existing }] = await Promise.all([
      supabaseAdmin.from("reservation_blocks").select("*").eq("date", data.date),
      supabaseAdmin.from("site_settings").select("reservation_capacity_per_slot").limit(1),
      supabaseAdmin
        .from("reservations")
        .select("reservation_time, guest_count, status")
        .eq("reservation_date", data.date)
        .in("status", ["pending", "confirmed"]),
    ]);

    const capacity =
      settings?.[0]?.reservation_capacity_per_slot ?? RESERVATION_RULES.defaultCapacityPerSlot;

    const fullDay = (blocks ?? []).some((b) => b.is_full_day);
    if (fullDay) return { available: [] as string[], capacity, fullDay: true };

    const used = new Map<string, number>();
    for (const row of existing ?? []) {
      const key = String(row.reservation_time).slice(0, 5);
      used.set(key, (used.get(key) ?? 0) + row.guest_count);
    }

    const available = buildSlots().filter((slot) => {
      const blocked = (blocks ?? []).some((b) => {
        if (b.is_full_day) return true;
        const start = b.start_time ? String(b.start_time).slice(0, 5) : "00:00";
        const end = b.end_time ? String(b.end_time).slice(0, 5) : "23:59";
        return slot >= start && slot <= end;
      });
      if (blocked) return false;
      return (used.get(slot) ?? 0) < capacity;
    });

    return { available, capacity, fullDay: false };
  });

export const createReservation = createServerFn({ method: "POST" })
  .inputValidator((input) => reservationSchema.parse(input))
  .handler(async ({ data }) => {
    const requested = new Date(`${data.reservationDate}T${data.reservationTime}:00-03:00`);
    const now = new Date();

    if (Number.isNaN(requested.getTime())) throw new Error("Data ou horário inválidos.");
    if (requested.getTime() - now.getTime() < RESERVATION_RULES.minimumAdvanceMinutes * 60_000) {
      throw new Error("As reservas precisam ser feitas com pelo menos 1 hora de antecedência.");
    }
    const maxDate = new Date(now.getTime() + RESERVATION_RULES.maximumAdvanceDays * 86_400_000);
    if (requested > maxDate) {
      throw new Error("Só aceitamos reservas com até 60 dias de antecedência.");
    }

    const [y, m, d] = data.reservationDate.split("-").map(Number);
    const weekday = new Date(Date.UTC(y!, (m ?? 1) - 1, d ?? 1)).getUTCDay();
    if (weekday === RESERVATION_RULES.closedWeekday) {
      throw new Error("Não abrimos às segundas-feiras. Escolha outro dia.");
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: blocks } = await supabaseAdmin
      .from("reservation_blocks")
      .select("*")
      .eq("date", data.reservationDate);

    const isBlocked = (blocks ?? []).some((b) => {
      if (b.is_full_day) return true;
      const start = b.start_time ? String(b.start_time).slice(0, 5) : "00:00";
      const end = b.end_time ? String(b.end_time).slice(0, 5) : "23:59";
      return data.reservationTime >= start && data.reservationTime <= end;
    });
    if (isBlocked) throw new Error("Este horário não está disponível. Escolha outro horário.");

    const [{ data: settings }, { data: existing }] = await Promise.all([
      supabaseAdmin.from("site_settings").select("reservation_capacity_per_slot").limit(1),
      supabaseAdmin
        .from("reservations")
        .select("guest_count")
        .eq("reservation_date", data.reservationDate)
        .eq("reservation_time", data.reservationTime)
        .in("status", ["pending", "confirmed"]),
    ]);

    const capacity =
      settings?.[0]?.reservation_capacity_per_slot ?? RESERVATION_RULES.defaultCapacityPerSlot;
    const booked = (existing ?? []).reduce((sum, r) => sum + r.guest_count, 0);
    if (booked + data.guestCount > capacity) {
      throw new Error("Este horário já está lotado. Por favor, escolha outro horário.");
    }

    const protocol = `FL-${data.reservationDate.replaceAll("-", "").slice(2)}-${Math.random()
      .toString(36)
      .slice(2, 6)
      .toUpperCase()}`;

    const { data: inserted, error } = await supabaseAdmin
      .from("reservations")
      .insert({
        protocol,
        customer_name: data.customerName,
        customer_phone: data.customerPhone,
        customer_email: data.customerEmail || null,
        reservation_date: data.reservationDate,
        reservation_time: data.reservationTime,
        guest_count: data.guestCount,
        occasion: data.occasion || null,
        needs_kids_area: data.needsKidsArea,
        accessibility_needs: data.accessibilityNeeds || null,
        notes: data.notes || null,
        privacy_consent: data.privacyConsent,
      })
      .select("protocol, reservation_date, reservation_time, guest_count")
      .single();

    if (error) {
      console.error("[reservas] falha ao registrar", error);
      throw new Error("Não foi possível registrar sua reserva. Tente novamente.");
    }

    return inserted;
  });
