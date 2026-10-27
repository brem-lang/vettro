import { Link } from "@tanstack/react-router";
import { Mail, ShieldCheck } from "lucide-react";

import { useLang, type Lang } from "@/lib/i18n";

const COPY = {
  it: {
    nav: ["La storia", "Come funziona", "Scopri il tuo profilo"],
    legal: ["Privacy Policy", "Termini e condizioni", "Cookie Policy", "Informativa sui rischi"],
    tagline: "Uno strumento informativo per organizzare l’analisi dei mercati, riflettere sul rischio e costruire decisioni più consapevoli.",
    contact: "recapito: in aggiornamento",
    explore: "Esplora",
    legalTitle: "Informazioni legali",
    riskTitle: "Avvertenza sul rischio",
    risk: "Il trading e gli investimenti comportano un rischio elevato, inclusa la possibile perdita totale del capitale. Vettro non fornisce consulenza finanziaria, fiscale o legale, non esegue operazioni per conto degli utenti e non garantisce risultati o rendimenti. Le informazioni pubblicate hanno finalità esclusivamente informative ed educative. Valuta la tua situazione e, se necessario, consulta un professionista autorizzato prima di assumere decisioni finanziarie.",
    rights: "© 2026 Vettro. Tutti i diritti riservati.",
    promo: "Contenuto promozionale di Vettro. Non è una testata giornalistica.",
  },
  es: {
    nav: ["La historia", "Cómo funciona", "Descubre tu perfil"],
    legal: ["Política de Privacidad", "Términos y condiciones", "Política de Cookies", "Aviso de riesgos"],
    tagline: "Una herramienta informativa para organizar el análisis de los mercados, reflexionar sobre el riesgo y tomar decisiones más conscientes.",
    contact: "contacto: en actualización",
    explore: "Explorar",
    legalTitle: "Información legal",
    riskTitle: "Advertencia de riesgo",
    risk: "El trading y las inversiones conllevan un riesgo elevado, incluida la posible pérdida total del capital. Vettro no presta asesoramiento financiero, fiscal ni jurídico, no ejecuta operaciones por cuenta de los usuarios y no garantiza resultados ni rendimientos. La información publicada tiene fines exclusivamente informativos y educativos. Valora tu situación y, si es necesario, consulta a un profesional autorizado antes de tomar decisiones financieras.",
    rights: "© 2026 Vettro. Todos los derechos reservados.",
    promo: "Contenido promocional de Vettro. No es un medio de comunicación.",
  },
  en: {
    nav: ["The story", "How it works", "Discover your profile"],
    legal: ["Privacy Policy", "Terms and conditions", "Cookie Policy", "Risk disclosure"],
    tagline: "An information tool to organise your market analysis, think about risk and make more informed decisions.",
    contact: "contact: being updated",
    explore: "Explore",
    legalTitle: "Legal information",
    riskTitle: "Risk warning",
    risk: "Trading and investing carry a high level of risk, including the possible total loss of capital. Vettro does not provide financial, tax or legal advice, does not trade on users' behalf and does not guarantee results or returns. The information published is for information and educational purposes only. Consider your own situation and, if necessary, consult an authorised professional before making financial decisions.",
    rights: "© 2026 Vettro. All rights reserved.",
    promo: "Promotional content from Vettro. Not a news publication.",
  },
} satisfies Record<Lang, { nav: string[]; legal: string[]; [key: string]: string | string[] }>;

const navigation = [
  `${import.meta.env.BASE_URL}#storia`,
  `${import.meta.env.BASE_URL}#come-funziona`,
  `${import.meta.env.BASE_URL}#registrazione`,
];

const legalLinks = ["/privacy", "/termini", "/cookie-policy", "/rischi"] as const;

export function SiteFooter() {
  const c = COPY[useLang()];
  return (
    <footer className="border-t border-border bg-foreground text-background">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16 lg:px-10">
        <div className="grid gap-12 border-b border-background/15 pb-12 md:grid-cols-[1.4fr_0.7fr_0.9fr]">
          <div className="max-w-md">
            <Link to="/" className="inline-flex items-center gap-3 text-xl font-semibold" aria-label="Vettro, home">
              <span className="grid size-8 place-items-center rounded-full bg-brand/20 ring-1 ring-brand/50">
                <span className="size-2 rounded-full bg-brand" />
              </span>
              Vettro
            </Link>
            <p className="mt-5 text-sm leading-6 text-background/70">
              {c.tagline}
            </p>
            <p className="mt-6 inline-flex items-center gap-2 text-sm text-background/70">
              <Mail className="size-4" aria-hidden="true" />
              {c.contact}
            </p>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase text-background/50">{c.explore}</h2>
            <ul className="mt-5 space-y-3">
              {navigation.map((href, i) => (
                <li key={href}>
                  <a href={href} className="text-sm text-background/75 transition-colors hover:text-brand">
                    {c.nav[i]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase text-background/50">{c.legalTitle}</h2>
            <ul className="mt-5 space-y-3">
              {legalLinks.map((to, i) => (
                <li key={to}>
                  <Link to={to} className="text-sm text-background/75 transition-colors hover:text-brand">
                    {c.legal[i]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 grid gap-7 lg:grid-cols-[auto_1fr] lg:items-start">
          <div className="inline-flex w-fit items-center gap-2 rounded-md bg-background/10 px-3 py-2 text-xs font-semibold">
            <ShieldCheck className="size-4 text-brand" aria-hidden="true" />
            {c.riskTitle}
          </div>
          <p className="max-w-4xl text-xs leading-5 text-background/60">
            {c.risk}
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-background/15 pt-6 text-xs text-background/45 sm:flex-row sm:items-center sm:justify-between">
          <p>{c.rights}</p>
          <p>{c.promo}</p>
        </div>
      </div>
    </footer>
  );
}