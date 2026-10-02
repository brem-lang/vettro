import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader, getRequestIP } from "@tanstack/react-start/server";
import { z } from "zod";
import { signupInputSchema } from "@/lib/signups.functions";

const leadResponseSchema = z.object({
  success: z.literal(true),
  autologin_url: z.string().url(),
  lead_id: z.string().optional(),
});

// Hosts the browser may be sent to after a lead is accepted: the lead API's
// own host plus any extra hosts listed in LEAD_AUTOLOGIN_HOSTS (comma-separated).
function allowedAutologinHosts(apiHost: string) {
  const extra = (process.env["LEAD_AUTOLOGIN_HOSTS"] ?? "")
    .split(",")
    .map((h) => h.trim().toLowerCase())
    .filter(Boolean);
  return new Set([apiHost.toLowerCase(), ...extra]);
}

// Italian numbers without an international prefix get +39; everything else
// is reduced to "+" followed by digits, as the lead API expects.
function toE164(phone: string) {
  const trimmed = phone.trim();
  const digits = trimmed.replace(/\D/g, "");
  if (trimmed.startsWith("+")) return `+${digits}`;
  if (digits.startsWith("00")) return `+${digits.slice(2)}`;
  return `+39${digits}`;
}

// Cloudflare sets cf-connecting-ip itself, so prefer it over the
// client-controllable X-Forwarded-For chain.
function clientIp() {
  return getRequestHeader("cf-connecting-ip") ?? getRequestIP({ xForwardedFor: true }) ?? "";
}

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => signupInputSchema.parse(data))
  .handler(async ({ data }) => {
    const baseUrl = process.env["LEAD_API_URL"];
    const apiKey = process.env["LEAD_API_KEY"];
    if (!baseUrl || !apiKey) {
      console.error("submitLead: LEAD_API_URL or LEAD_API_KEY is not configured");
      throw new Error("Registrazione non riuscita");
    }
    const apiUrl = new URL(baseUrl);
    const apiOrigin = apiUrl.origin;
    const clickId = crypto.randomUUID();

    let res: Response;
    try {
      res = await fetch(`${apiOrigin}/functions/v1/submit-lead-nullypto`, {
        method: "POST",
        headers: { "Api-Key": apiKey, "Content-Type": "application/json" },
        body: JSON.stringify({
          firstname: data.name,
          lastname: data.lastName,
          email: data.email,
          mobile: toE164(data.phone),
          country_code: "IT",
          ip_address: clientIp(),
          click_id: clickId,
          funnel: process.env["LEAD_FUNNEL"] ?? "crypto-v1",
        }),
        signal: AbortSignal.timeout(10_000),
      });
    } catch (err) {
      console.error("submitLead: request failed", (err as Error).name);
      throw new Error("Registrazione non riuscita");
    }

    const body: unknown = await res.json().catch(() => null);
    // The lead API answers 409 when it already has a lead with this IP, email
    // or phone; tell the visitor instead of showing a generic failure.
    if (res.status === 409) {
      return { ok: false as const, reason: "duplicate" as const };
    }
    const parsed = leadResponseSchema.safeParse(body);
    if (!res.ok || !parsed.success) {
      // Log the API's own message and which fields it rejected, never the lead data.
      const fields = (key: "message" | "errors") =>
        body && typeof body === "object" && key in body
          ? (body as Record<string, unknown>)[key]
          : undefined;
      const apiErrors = fields("errors");
      console.error("submitLead: lead API rejected the lead", {
        status: res.status,
        apiMessage: fields("message"),
        apiErrorFields: apiErrors && typeof apiErrors === "object" ? Object.keys(apiErrors) : [],
        invalidResponseFields: parsed.success
          ? []
          : parsed.error.issues.map((i) => i.path.join(".")),
      });
      throw new Error("Registrazione non riuscita");
    }

    // Only redirect over HTTPS to an allow-listed host, so a tampered or
    // misconfigured response can't turn this into an open redirect.
    const autologin = new URL(parsed.data.autologin_url);
    if (
      autologin.protocol !== "https:" ||
      !allowedAutologinHosts(apiUrl.host).has(autologin.host.toLowerCase())
    ) {
      console.error(
        `submitLead: autologin_url host "${autologin.host}" is not allowed; add it to LEAD_AUTOLOGIN_HOSTS`,
      );
      throw new Error("Registrazione non riuscita");
    }

    return { ok: true as const, autologinUrl: autologin.toString() };
  });
