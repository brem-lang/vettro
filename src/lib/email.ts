// Email check for the lead form. Runs in the browser for instant feedback and
// again on the server. Same rules and lists as the static sites'
// email-check.js / email-check.php — keep in sync.

export type EmailReason = "format" | "typo" | "disposable" | "fake" | "domain";
export type EmailResult =
  | { ok: true; email: string }
  | { ok: false; reason: Exclude<EmailReason, "domain">; suggestion: string };

// Common providers for IT / ES / GB visitors: typos are matched against these.
const KNOWN: readonly string[] = [
  "gmail.com",
  "googlemail.com",
  "hotmail.com",
  "hotmail.it",
  "hotmail.es",
  "hotmail.co.uk",
  "outlook.com",
  "outlook.it",
  "outlook.es",
  "live.com",
  "live.it",
  "live.co.uk",
  "msn.com",
  "yahoo.com",
  "yahoo.it",
  "yahoo.es",
  "yahoo.co.uk",
  "ymail.com",
  "icloud.com",
  "me.com",
  "mac.com",
  "libero.it",
  "virgilio.it",
  "alice.it",
  "tim.it",
  "tin.it",
  "tiscali.it",
  "fastwebnet.it",
  "email.it",
  "inwind.it",
  "iol.it",
  "aruba.it",
  "pec.it",
  "legalmail.it",
  "gmx.com",
  "gmx.es",
  "gmx.it",
  "aol.com",
  "protonmail.com",
  "proton.me",
  "telefonica.net",
  "movistar.es",
  "btinternet.com",
  "sky.com",
  "virginmedia.com",
  "talktalk.net",
  "ntlworld.com",
  "mail.com",
  "email.com",
  "gmail.it",
  "hotmail.fr",
  "outlook.fr",
  "live.fr",
  "yahoo.fr",
  "orange.fr",
  "free.fr",
  "web.de",
  "gmx.de",
  "gmx.net",
  "zoho.com",
  "yandex.com",
  "mail.ru",
  "tutanota.com",
  "tuta.io",
  "hey.com",
  "fastmail.com",
  "outlook.co.uk",
  "blueyonder.co.uk",
  "virgin.net",
  "plus.net",
  "aol.co.uk",
  "terra.es",
  "ono.com",
  "jazztel.es",
  "vodafone.it",
  "vodafone.es",
];
const TLD_TYPOS: Record<string, string> = {
  con: "com",
  cmo: "com",
  ocm: "com",
  vom: "com",
  xom: "com",
  comm: "com",
  coom: "com",
  cpm: "com",
  clm: "com",
  om: "com",
  iy: "it",
  ti: "it",
  itt: "it",
  ir: "it",
  ess: "es",
  se: "es",
  "co.ik": "co.uk",
  "co.uj": "co.uk",
  "co.ul": "co.uk",
  "co.ukk": "co.uk",
  couk: "co.uk",
};
const DISPOSABLE: readonly string[] = [
  "mailinator.com",
  "yopmail.com",
  "yopmail.fr",
  "yopmail.net",
  "guerrillamail.com",
  "guerrillamail.net",
  "guerrillamail.org",
  "guerrillamailblock.com",
  "sharklasers.com",
  "grr.la",
  "pokemail.net",
  "spam4.me",
  "10minutemail.com",
  "10minutemail.net",
  "10minutemail.co.uk",
  "20minutemail.com",
  "temp-mail.org",
  "temp-mail.io",
  "tempmail.com",
  "tempmail.net",
  "tempmailo.com",
  "tempail.com",
  "tempr.email",
  "emailondeck.com",
  "throwawaymail.com",
  "trashmail.com",
  "trashmail.de",
  "trashmail.net",
  "mytrashmail.com",
  "getnada.com",
  "nada.email",
  "maildrop.cc",
  "mailnesia.com",
  "mintemail.com",
  "mohmal.com",
  "dispostable.com",
  "fakeinbox.com",
  "fakemail.net",
  "mailcatch.com",
  "mailpoof.com",
  "moakt.com",
  "mvrht.com",
  "dropmail.me",
  "spambox.us",
  "spamgourmet.com",
  "jetable.org",
  "discard.email",
  "discardmail.com",
  "getairmail.com",
  "burnermail.io",
  "inboxkitten.com",
  "emailfake.com",
  "fake-mail.net",
  "tmail.ws",
  "tmpmail.org",
  "tmpmail.net",
  "luxusmail.org",
  "mail.tm",
  "mailtemp.net",
  "1secmail.com",
  "1secmail.org",
  "1secmail.net",
  "harakirimail.com",
  "mailforspam.com",
  "spamfree24.org",
  "trash-mail.com",
  "wegwerfmail.de",
  "einrot.com",
  "crazymailing.com",
  "mailsac.com",
  "tempinbox.com",
  "emailtemporanea.net",
  "emailtemporanea.com",
  "mailtemporanea.com",
  "correotemporal.org",
  "guerrillamail.info",
  "mailnull.com",
  "trbvm.com",
  "kurzepost.de",
  "byom.de",
  "tempmailaddress.com",
  "boun.cr",
  "mailinator.net",
  "mailinator2.com",
  "notmailinator.com",
  "tempmail.plus",
];
const FAKE_DOMAINS: readonly string[] = [
  "test.com",
  "test.it",
  "test.es",
  "test.co.uk",
  "example.com",
  "example.org",
  "example.net",
  "example.it",
  "example.es",
  "domain.com",
  "dominio.it",
  "dominio.com",
  "prova.it",
  "prova.com",
  "fake.com",
  "nomail.com",
  "noemail.com",
  "nessuna.it",
  "asd.com",
  "asdf.com",
  "qwerty.com",
  "abc.com",
  "xxx.com",
  "aaa.com",
];
const MASH = /^(?:asd|asdf|asdasd|qwe|qwerty|zxc|zxcv|aaa+|xxx+|abc|test|prova|fake|nome|name)\d*$/;

// Damerau-Levenshtein (optimal string alignment)
function distance(a: string, b: string): number {
  const d: number[][] = [];
  for (let i = 0; i <= a.length; i++) d[i] = [i];
  for (let j = 0; j <= b.length; j++) d[0]![j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      const row = d[i]!;
      row[j] = Math.min(d[i - 1]![j]! + 1, row[j - 1]! + 1, d[i - 1]![j - 1]! + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        row[j] = Math.min(row[j]!, d[i - 2]![j - 2]! + 1);
      }
    }
  }
  return d[a.length]![b.length]!;
}

function suggestDomain(domain: string): string {
  if (KNOWN.includes(domain)) return "";
  let best = "";
  let bestD = 99;
  for (const k of KNOWN) {
    const dd = distance(domain, k);
    if (dd < bestD) {
      bestD = dd;
      best = k;
    }
  }
  if (bestD === 1 && domain.length >= 6) return best;
  if (bestD === 2 && domain.length >= 9) return best;
  // Ending typo on any domain: mario@libero.iy → libero.it
  for (const [bad, good] of Object.entries(TLD_TYPOS)) {
    if (domain.endsWith("." + bad)) {
      const fixed = domain.slice(0, -bad.length) + good;
      return KNOWN.includes(fixed) ? fixed : suggestDomain(fixed) || fixed;
    }
  }
  return "";
}

export function checkEmail(raw: string): EmailResult {
  const fail = (reason: Exclude<EmailReason, "domain">, suggestion = ""): EmailResult => ({
    ok: false,
    reason,
    suggestion,
  });
  const email = raw.trim().toLowerCase();
  const at = email.lastIndexOf("@");
  if (email.length > 254 || at < 1 || email.indexOf("@") !== at) return fail("format");
  const local = email.slice(0, at);
  const domain = email.slice(at + 1);
  if (local.length > 64 || !/^[a-z0-9._%+'-]+$/.test(local) || /^\.|\.$|\.\./.test(local)) {
    return fail("format");
  }
  const labels = domain.split(".");
  if (labels.length < 2) return fail("format");
  for (const label of labels) {
    if (!/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(label)) return fail("format");
  }
  if (!/^[a-z]{2,24}$/.test(labels[labels.length - 1]!)) return fail("format");

  if (DISPOSABLE.includes(domain)) return fail("disposable");
  if (FAKE_DOMAINS.includes(domain) || (MASH.test(local) && MASH.test(labels[0]!))) {
    return fail("fake");
  }
  const fix = suggestDomain(domain);
  if (fix) return fail("typo", `${local}@${fix}`);
  return { ok: true, email };
}
