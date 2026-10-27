import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouteContext,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { readLang, type Lang } from "../lib/i18n";

const COPY = {
  it: {
    title: "Vettro — Assistente AI per il trading",
    description:
      "Vettro analizza i mercati in tempo reale, gestisce il rischio e ti aiuta a tradare con metodo. Registrati in pochi minuti.",
    notFound: "Pagina non trovata",
    notFoundText: "La pagina che cerchi non esiste o è stata spostata.",
    home: "Torna alla home",
    errorTitle: "Questa pagina non si è caricata",
    errorText: "Qualcosa è andato storto. Puoi riprovare o tornare alla home.",
    retry: "Riprova",
  },
  es: {
    title: "Vettro — Asistente de IA para el trading",
    description:
      "Vettro analiza los mercados en tiempo real, gestiona el riesgo y te ayuda a operar con método. Regístrate en pocos minutos.",
    notFound: "Página no encontrada",
    notFoundText: "La página que buscas no existe o se ha movido.",
    home: "Volver al inicio",
    errorTitle: "Esta página no se ha cargado",
    errorText: "Algo ha salido mal. Puedes volver a intentarlo o regresar al inicio.",
    retry: "Reintentar",
  },
  en: {
    title: "Vettro — AI assistant for trading",
    description:
      "Vettro analyses the markets in real time, manages risk and helps you trade with method. Sign up in a few minutes.",
    notFound: "Page not found",
    notFoundText: "The page you're looking for doesn't exist or has been moved.",
    home: "Back to home",
    errorTitle: "This page didn't load",
    errorText: "Something went wrong. You can try again or go back to the home page.",
    retry: "Try again",
  },
} satisfies Record<Lang, Record<string, string>>;

function NotFoundComponent() {
  const c = COPY[readLang()];
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">{c.notFound}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{c.notFoundText}</p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {c.home}
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  const normalizedError = error instanceof Error ? error : new Error(String(error));
  console.error(normalizedError);
  const router = useRouter();
  const c = COPY[readLang()];
  useEffect(() => {
    reportLovableError(normalizedError, { boundary: "tanstack_root_error_component" });
  }, [normalizedError]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">{c.errorTitle}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{c.errorText}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {c.retry}
          </button>
          <a
            href={import.meta.env.BASE_URL}
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            {c.home}
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  beforeLoad: () => ({ lang: readLang() }),
  head: ({ match }) => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: COPY[match.context.lang].title },
      { name: "description", content: COPY[match.context.lang].description },
      { property: "og:site_name", content: "Vettro" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  const lang = useRouteContext({ from: "__root__", select: (ctx) => ctx.lang });
  return (
    <html lang={lang}>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
