import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// ⚠️ À COMPLÉTER : ID du segment "InOneShot Newsletter" dans le compte Resend.
// Laisser vide tant qu'il n'est pas créé : le contact sera simplement ajouté sans segment.
const NEWSLETTER_SEGMENT_ID = "";

export const subscribeNewsletter = createServerFn({ method: "POST" })
  .validator(z.object({ email: z.string().trim().email().max(254) }))
  .handler(async ({ data }) => {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY is not set");
      return { ok: false as const };
    }

    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    const { error } = await resend.contacts.create({
      email: data.email,
      unsubscribed: false,
      ...(NEWSLETTER_SEGMENT_ID ? { segments: [{ id: NEWSLETTER_SEGMENT_ID }] } : {}),
    });

    if (error) {
      // Déjà inscrit : on renvoie un succès (pas d'info divulguée, pas d'erreur affichée)
      if (/already exists/i.test(error.message)) {
        return { ok: true as const };
      }
      console.error("Resend contacts.create failed:", error.name, error.message);
      return { ok: false as const };
    }

    return { ok: true as const };
  });
