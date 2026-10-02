import { Link } from "@tanstack/react-router";
import { Mail, ShieldCheck } from "lucide-react";

const navigation = [
  { label: "La storia", href: "/#storia" },
  { label: "Come funziona", href: "/#come-funziona" },
  { label: "Scopri il tuo profilo", href: "/#registrazione" },
] as const;

const legalLinks = [
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Termini e condizioni", to: "/termini" },
  { label: "Cookie Policy", to: "/cookie-policy" },
  { label: "Informativa sui rischi", to: "/rischi" },
] as const;

export function SiteFooter() {
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
              Uno strumento informativo per organizzare l’analisi dei mercati, riflettere sul rischio e costruire decisioni più consapevoli.
            </p>
            <p className="mt-6 inline-flex items-center gap-2 text-sm text-background/70">
              <Mail className="size-4" aria-hidden="true" />
              recapito: in aggiornamento
            </p>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase text-background/50">Esplora</h2>
            <ul className="mt-5 space-y-3">
              {navigation.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-sm text-background/75 transition-colors hover:text-brand">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase text-background/50">Informazioni legali</h2>
            <ul className="mt-5 space-y-3">
              {legalLinks.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-sm text-background/75 transition-colors hover:text-brand">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 grid gap-7 lg:grid-cols-[auto_1fr] lg:items-start">
          <div className="inline-flex w-fit items-center gap-2 rounded-md bg-background/10 px-3 py-2 text-xs font-semibold">
            <ShieldCheck className="size-4 text-brand" aria-hidden="true" />
            Avvertenza sul rischio
          </div>
          <p className="max-w-4xl text-xs leading-5 text-background/60">
            Il trading e gli investimenti comportano un rischio elevato, inclusa la possibile perdita totale del capitale. Vettro non fornisce consulenza finanziaria, fiscale o legale, non esegue operazioni per conto degli utenti e non garantisce risultati o rendimenti. Le informazioni pubblicate hanno finalità esclusivamente informative ed educative. Valuta la tua situazione e, se necessario, consulta un professionista autorizzato prima di assumere decisioni finanziarie.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-background/15 pt-6 text-xs text-background/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Vettro. Tutti i diritti riservati.</p>
          <p>Contenuto promozionale di Vettro. Non è una testata giornalistica.</p>
        </div>
      </div>
    </footer>
  );
}