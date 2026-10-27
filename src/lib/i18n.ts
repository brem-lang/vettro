// Site language (IT / ES / EN). Order of precedence:
//   1. `?lang=xx` in the URL (e.g. for ad campaigns)
//   2. the visitor's own choice, kept in a `site_lang` cookie shared with the
//      static sites on this domain
//   3. the visitor's country from Cloudflare's CF-IPCountry header
//      (Italy → it, Spain → es, anything else or unknown → en)
// The server resolves this on first paint and writes the country into
// <html data-geo> so client-side navigation reaches the same answer.
import { useRouteContext, useRouter } from "@tanstack/react-router";
import { createIsomorphicFn } from "@tanstack/react-start";
import { getCookie, getRequestHeader, getRequestUrl } from "@tanstack/react-start/server";

export const LANGS = ["it", "es", "en"] as const;
export type Lang = (typeof LANGS)[number];

export const LANG_NAMES: Record<Lang, string> = { it: "Italiano", es: "Español", en: "English" };
export const LANG_LOCALES: Record<Lang, string> = { it: "it-IT", es: "es-ES", en: "en-GB" };

// Default phone prefix for numbers typed without one follows the page language.
export const LANG_DIAL_CODE: Record<Lang, string> = { it: "39", es: "34", en: "44" };

const COOKIE = "site_lang";

function isLang(value: unknown): value is Lang {
  return typeof value === "string" && (LANGS as readonly string[]).includes(value);
}

function langForCountry(country: string | undefined): Lang {
  if (country === "IT") return "it";
  if (country === "ES") return "es";
  return "en";
}

// Two-letter country code, or "" when unknown (no header, Tor "T1", unknown "XX").
export const readCountry = createIsomorphicFn()
  .server((): string => {
    const code = (getRequestHeader("cf-ipcountry") ?? "").toUpperCase();
    return /^[A-Z]{2}$/.test(code) && code !== "XX" ? code : "";
  })
  .client((): string => document.documentElement.dataset["geo"] ?? "");

export const readLang = createIsomorphicFn()
  .server((): Lang => {
    const fromUrl = getRequestUrl().searchParams.get("lang");
    if (isLang(fromUrl)) return fromUrl;
    const fromCookie = getCookie(COOKIE);
    if (isLang(fromCookie)) return fromCookie;
    return langForCountry(readCountry());
  })
  .client((): Lang => {
    const fromUrl = new URLSearchParams(window.location.search).get("lang");
    if (isLang(fromUrl)) return fromUrl;
    const match = document.cookie.match(/(?:^|;\s*)site_lang=([a-z]{2})/);
    if (match && isLang(match[1])) return match[1];
    try {
      const stored = localStorage.getItem(COOKIE);
      if (isLang(stored)) return stored;
    } catch {
      // Storage can be blocked (private mode); fall back to the country.
    }
    return langForCountry(readCountry());
  });

export function saveLang(lang: Lang) {
  document.cookie = `${COOKIE}=${lang}; path=/; max-age=31536000; SameSite=Lax`;
  try {
    localStorage.setItem(COOKIE, lang);
  } catch {
    // Cookie alone is enough.
  }
}

export function useLang(): Lang {
  return useRouteContext({ from: "__root__", select: (ctx) => ctx.lang });
}

export function useSetLang() {
  const router = useRouter();
  return (lang: Lang) => {
    saveLang(lang);
    // Drop a ?lang= override so it doesn't win over the new choice, then re-run
    // the root beforeLoad (new context.lang) and every route's head().
    const url = new URL(window.location.href);
    if (url.searchParams.has("lang")) {
      url.searchParams.delete("lang");
      window.history.replaceState(window.history.state, "", url);
    }
    document.documentElement.lang = lang;
    void router.invalidate();
  };
}
