// Tracking click id from the landing link (?click_id=...). Kept in
// sessionStorage so it survives visits to other pages before the form is sent.
const STORAGE_KEY = "vettro_click_id";

export function rememberClickId() {
  try {
    const value = new URLSearchParams(window.location.search).get("click_id");
    if (value) sessionStorage.setItem(STORAGE_KEY, value);
  } catch {
    // Storage can be blocked (private mode); the URL is still read at submit.
  }
}

export function getClickId() {
  const fromUrl = new URLSearchParams(window.location.search).get("click_id");
  if (fromUrl) return fromUrl;
  try {
    return sessionStorage.getItem(STORAGE_KEY) ?? "";
  } catch {
    return "";
  }
}
