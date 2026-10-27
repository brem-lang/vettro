// Mobile phone check for the lead form (IT / ES / GB numbers only). Runs in the
// browser for instant feedback and again on the server before the lead is sent.
// Same rules as the static sites' phone-check.js / phone-check.php — keep in sync.

export const PHONE_COUNTRIES = ["IT", "ES", "GB"] as const;
export type PhoneCountry = (typeof PHONE_COUNTRIES)[number];
export type PhoneReason = "letters" | "country" | "short" | "long" | "landline" | "invalid";
export type PhoneResult =
  { ok: true; e164: string; country: PhoneCountry } | { ok: false; reason: PhoneReason };

export const DIAL_CODES: Record<PhoneCountry, string> = { IT: "39", ES: "34", GB: "44" };
const BY_DIAL: Record<string, PhoneCountry> = { "39": "IT", "34": "ES", "44": "GB" };

function looksFake(n: string) {
  if (/(\d)\1{6,}/.test(n)) return true; // 3333333
  const up = "0123456789012";
  const down = "9876543210987";
  for (let i = 0; i + 7 <= n.length; i++) {
    const run = n.slice(i, i + 7);
    if (up.includes(run) || down.includes(run)) return true; // 1234567
  }
  return false;
}

// n = national significant number (digits after the country code).
function checkNational(country: PhoneCountry, n: string): PhoneReason | "" {
  if (country === "IT") {
    if (/^0/.test(n)) return "landline";
    if (!/^3/.test(n)) return "invalid";
    if (n.length < 9) return "short";
    if (n.length > 10) return "long";
  } else if (country === "ES") {
    if (/^[89]/.test(n)) return "landline";
    if (!/^(6|7[1-9])/.test(n)) return "invalid";
    if (n.length < 9) return "short";
    if (n.length > 9) return "long";
  } else {
    if (/^[123]/.test(n)) return "landline";
    if (!/^7/.test(n)) return "invalid";
    if (n.length < 10) return "short";
    if (n.length > 10) return "long";
    if (/^76/.test(n) && !/^7624/.test(n)) return "invalid"; // pagers
    if (/^7700900/.test(n)) return "invalid"; // Ofcom TV/film range
  }
  return looksFake(n) ? "invalid" : "";
}

export function checkPhone(raw: string, defaultCountry: PhoneCountry): PhoneResult {
  const s = raw.trim();
  if (/[A-Za-z]/.test(s)) return { ok: false, reason: "letters" };
  let plus = s.startsWith("+");
  let digits = s.replace(/\D/g, "");
  if (!digits) return { ok: false, reason: "short" };
  if (!plus && digits.startsWith("00")) {
    plus = true;
    digits = digits.slice(2);
  }

  let country: PhoneCountry;
  let n: string;
  if (plus) {
    const fromDial = BY_DIAL[digits.slice(0, 2)];
    if (!fromDial) return { ok: false, reason: "country" };
    country = fromDial;
    n = digits.slice(2);
  } else {
    country = defaultCountry;
    n = digits;
    // "39 312 345 6789" typed without the +
    const cc = DIAL_CODES[country];
    if (
      n.startsWith(cc) &&
      checkNational(country, n.slice(cc.length)) === "" &&
      checkNational(country, n) !== ""
    ) {
      n = n.slice(cc.length);
    }
  }
  if (country === "GB" && n.startsWith("0")) n = n.slice(1); // 07700 → 7700

  const reason = checkNational(country, n);
  if (reason) return { ok: false, reason };
  return { ok: true, e164: `+${DIAL_CODES[country]}${n}`, country };
}
