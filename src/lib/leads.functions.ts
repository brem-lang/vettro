import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader, getRequestIP } from "@tanstack/react-start/server";
import { z } from "zod";
import { signupInputSchema } from "@/lib/signups.functions";
import { PHONE_COUNTRIES, checkPhone } from "@/lib/phone";
import { checkEmail } from "@/lib/email";

// Can the email's domain receive mail (MX, or A as the RFC 5321 fallback)?
// Only a definite "no such domain / no records" rejects; timeouts and DNS
// errors let the lead through so real visitors are never blocked.
const mailDomainCache = new Map<string, boolean>();
async function domainReceivesMail(email: string) {
  const domain = email.slice(email.lastIndexOf("@") + 1);
  const cached = mailDomainCache.get(domain);
  if (cached !== undefined) return cached;
  const dns = await import("node:dns/promises");
  const lookup = async (type: "MX" | "A") => {
    try {
      const records = await (type === "MX" ? dns.resolveMx(domain) : dns.resolve4(domain));
      return records.length > 0;
    } catch (err) {
      const code = (err as { code?: string }).code;
      return code === "ENOTFOUND" || code === "ENODATA" ? false : null; // null = unknown
    }
  };
  const timeout = new Promise<null>((resolve) => setTimeout(() => resolve(null), 3000));
  const mx = await Promise.race([lookup("MX"), timeout]);
  const result = mx !== false || (await Promise.race([lookup("A"), timeout])) !== false;
  if (mailDomainCache.size > 5000) mailDomainCache.clear();
  mailDomainCache.set(domain, result);
  return result;
}

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

// Lead country from the visitor's IP (Cloudflare's CF-IPCountry header; the
// site only accepts traffic through Cloudflare, which sets it): Italy → IT,
// Spain → ES, anywhere else or unknown → LEAD_COUNTRY_FALLBACK (default GB).
function leadCountry() {
  const code = (getRequestHeader("cf-ipcountry") ?? "").toUpperCase();
  if (code === "IT" || code === "ES") return code;
  const fallback = process.env["LEAD_COUNTRY_FALLBACK"] ?? "";
  return /^[A-Z]{2}$/.test(fallback) ? fallback : "GB";
}

// Cloudflare sets cf-connecting-ip itself, so prefer it over the
// client-controllable X-Forwarded-For chain.
function clientIp() {
  return getRequestHeader("cf-connecting-ip") ?? getRequestIP({ xForwardedFor: true }) ?? "";
}

// click_id comes from the landing link (?click_id=...). Malformed tracking
// values are dropped instead of rejecting the lead.
const CLICK_ID_RE = /^[A-Za-z0-9._-]{1,128}$/;
const leadInputSchema = signupInputSchema.extend({
  clickId: z
    .string()
    .optional()
    .transform((v) => (v && CLICK_ID_RE.test(v) ? v : "")),
  // Prefix the visitor picked next to the phone field (used when they type a
  // number without +39 / +34 / +44).
  phoneCountry: z.enum(PHONE_COUNTRIES).catch("IT"),
});

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => leadInputSchema.parse(data))
  .handler(async ({ data }) => {
    const baseUrl = process.env["LEAD_API_URL"];
    const apiKey = process.env["LEAD_API_KEY"];
    if (!baseUrl || !apiKey) {
      console.error("submitLead: LEAD_API_URL or LEAD_API_KEY is not configured");
      throw new Error("Registrazione non riuscita");
    }
    const apiUrl = new URL(baseUrl);
    const apiOrigin = apiUrl.origin;

    // Same IT/ES/GB mobile rules as the form; the browser checks first, this
    // stops anything that skipped it.
    const phone = checkPhone(data.phone, data.phoneCountry);
    if (!phone.ok) {
      console.warn(`submitLead: phone rejected reason=${phone.reason}`); // reason only, never the number
      return { ok: false as const, reason: "phone" as const, phoneReason: phone.reason };
    }

    // Typos are only suggested in the browser (the visitor may confirm); here
    // format, throwaway, fake and domains that can't receive mail are rejected.
    const emailCheck = checkEmail(data.email);
    if (!emailCheck.ok && emailCheck.reason !== "typo") {
      console.warn(`submitLead: email rejected reason=${emailCheck.reason}`); // reason only, never the address
      return { ok: false as const, reason: "email" as const, emailReason: emailCheck.reason };
    }
    const email = data.email.trim().toLowerCase();
    if (!(await domainReceivesMail(email))) {
      console.warn("submitLead: email rejected reason=domain");
      return { ok: false as const, reason: "email" as const, emailReason: "domain" as const };
    }

    const countryCode = leadCountry();
    // One log line per lead, no key and no personal data.
    const sent = `sent country_code=${countryCode} click_id=${data.clickId || "-"}`;

    let res: Response;
    try {
      res = await fetch(`${apiOrigin}/functions/v1/submit-lead-nullypto`, {
        method: "POST",
        headers: { "Api-Key": apiKey, "Content-Type": "application/json" },
        body: JSON.stringify({
          firstname: data.name,
          lastname: data.lastName,
          email,
          mobile: phone.e164,
          country_code: countryCode,
          ip_address: clientIp(),
          click_id: data.clickId,
          funnel: process.env["LEAD_FUNNEL"] ?? "crypto-v1",
          offer_name: "vettro",
        }),
        signal: AbortSignal.timeout(30_000),
      });
    } catch (err) {
      console.error(`submitLead: ${sent} → request failed`, (err as Error).name);
      throw new Error("Registrazione non riuscita");
    }

    const body: unknown = await res.json().catch(() => null);
    // The lead API answers 409 when it already has a lead with this IP, email
    // or phone; tell the visitor instead of showing a generic failure.
    if (res.status === 409) {
      console.warn(`submitLead: ${sent} → rejected status=409 (duplicate)`);
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
      console.error(`submitLead: ${sent} → rejected`, {
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

    console.log(`submitLead: ${sent} → accepted lead_id=${parsed.data.lead_id ?? "-"}`);
    return { ok: true as const, autologinUrl: autologin.toString() };
  });
