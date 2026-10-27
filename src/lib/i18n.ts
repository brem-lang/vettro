// Site language (IT / ES / EN). The choice lives in a `site_lang` cookie so the
// server renders the right language on first paint; the static sites on the same
// domain write the same cookie, so one choice carries across all of them.
// `?lang=xx` in the URL overrides it (e.g. for ad campaigns).
import { useRouteContext, useRouter } from "@tanstack/react-router";
import { createIsomorphicFn } from "@tanstack/react-start";
import { getCookie, getRequestUrl } from "@tanstack/react-start/server";

export const LANGS = ["it", "es", "en"] as const;
export type Lang = (typeof LANGS)[number];

export const LANG_NAMES: Record<Lang, string> = { it: "Italiano", es: "Español", en: "English" };
export const LANG_LOCALES: Record<Lang, string> = { it: "it-IT", es: "es-ES", en: "en-GB" };

const COOKIE = "site_lang";

function isLang(value: unknown): value is Lang {
  return typeof value === "string" && (LANGS as readonly string[]).includes(value);
}

export const readLang = createIsomorphicFn()
  .server((): Lang => {
    const fromUrl = getRequestUrl().searchParams.get("lang");
    if (isLang(fromUrl)) return fromUrl;
    const fromCookie = getCookie(COOKIE);
    return isLang(fromCookie) ? fromCookie : "it";
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
      // Storage can be blocked (private mode); fall back to Italian.
    }
    return "it";
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
