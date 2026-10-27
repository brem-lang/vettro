import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { LanguageSwitcher } from "@/components/language-switcher";
import { SiteFooter } from "@/components/site-footer";
import { useLang, type Lang } from "@/lib/i18n";

const COPY = {
  it: { home: "Torna alla home", kicker: "INFORMAZIONI LEGALI", updated: "Ultimo aggiornamento: 2 ottobre 2026" },
  es: { home: "Volver al inicio", kicker: "INFORMACIÓN LEGAL", updated: "Última actualización: 2 de octubre de 2026" },
  en: { home: "Back to home", kicker: "LEGAL INFORMATION", updated: "Last updated: 2 October 2026" },
} satisfies Record<Lang, Record<string, string>>;

export type LegalContent = { title: string; intro: string; body: ReactNode };

export function LegalPage({ content }: { content: Record<Lang, LegalContent> }) {
  const lang = useLang();
  const c = COPY[lang];
  const { title, intro, body } = content[lang];
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-6 sm:px-8 lg:px-10">
          <Link to="/" className="flex items-center gap-2 text-lg font-semibold" aria-label="Vettro, home">
            <span className="grid size-7 place-items-center rounded-full bg-brand/20 ring-1 ring-brand/40"><span className="size-2 rounded-full bg-brand" /></span>
            Vettro
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/" className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              <ArrowLeft className="size-4" aria-hidden="true" />
              {c.home}
            </Link>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
        <p className="font-mono text-xs font-medium text-brand">{c.kicker}</p>
        <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">{intro}</p>
        <p className="mt-5 text-xs text-muted-foreground">{c.updated}</p>
        <div className="mt-12 space-y-10 text-base leading-7 text-foreground/85 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-foreground [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2 [&_a]:font-medium [&_a]:text-brand [&_a]:underline [&_a]:underline-offset-4">
          {body}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}