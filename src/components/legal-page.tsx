import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";

export function LegalPage({ title, intro, children }: { title: string; intro: string; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-6 sm:px-8 lg:px-10">
          <Link to="/" className="flex items-center gap-2 text-lg font-semibold" aria-label="Vettro, home">
            <span className="grid size-7 place-items-center rounded-full bg-brand/20 ring-1 ring-brand/40"><span className="size-2 rounded-full bg-brand" /></span>
            Vettro
          </Link>
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="size-4" aria-hidden="true" />
            Torna alla home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
        <p className="font-mono text-xs font-medium text-brand">INFORMAZIONI LEGALI</p>
        <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">{intro}</p>
        <p className="mt-5 text-xs text-muted-foreground">Ultimo aggiornamento: 2 ottobre 2026</p>
        <div className="mt-12 space-y-10 text-base leading-7 text-foreground/85 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-foreground [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2 [&_a]:font-medium [&_a]:text-brand [&_a]:underline [&_a]:underline-offset-4">
          {children}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}