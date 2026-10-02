import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { getSignup } from "@/lib/signups.functions";
import {
  experienceLabels,
  goalLabels,
  marketLabels,
  riskProfile,
  suggestedStrategy,
  type Experience,
  type Goal,
  type Market,
} from "@/lib/signup-options";

export const Route = createFileRoute("/benvenuto")({
  validateSearch: z.object({ id: z.string().uuid() }),
  head: () => ({
    meta: [
      { title: "Il tuo profilo — Vettro" },
      { name: "description", content: "Consulta il riepilogo personalizzato del tuo profilo di trading Vettro." },
      { property: "og:title", content: "Il tuo profilo — Vettro" },
      { property: "og:description", content: "Il riepilogo delle risposte del tuo profilo di trading Vettro." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Benvenuto,
});

type SignupRow = {
  id: string;
  name: string;
  last_name: string | null;
  experience: string;
  markets: string[];
  goal: string;
};

function Benvenuto() {
  const { id } = Route.useSearch();
  const getSignupFn = useServerFn(getSignup);

  const { data, isPending, isError } = useQuery({
    queryKey: ["signup", id],
    queryFn: () => getSignupFn({ data: { id } }),
  });

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="animate-drift absolute -top-40 left-1/4 w-[38rem] h-[38rem] rounded-full bg-brand/15 blur-[130px]"></div>
        <div
          className="animate-drift absolute bottom-[-8rem] right-[-6rem] w-[34rem] h-[34rem] rounded-full bg-skyglow/10 blur-[130px]"
          style={{ animationDelay: "-8s" }}
        ></div>
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto px-6 py-16">
        <div className="rounded-3xl p-8 lg:p-10 ring-1 ring-border bg-card shadow-xl shadow-foreground/5">
          {isPending && (
            <p className="text-sm text-muted-foreground">Preparazione del tuo profilo…</p>
          )}

          {isError && (
            <div>
              <h1 className="text-2xl font-semibold">Qualcosa è andato storto</h1>
              <p className="text-sm text-muted-foreground mt-2">
                Non riusciamo a recuperare il tuo profilo. Riprova dalla home.
              </p>
              <Link
                to="/"
                className="mt-6 inline-block text-sm py-3 px-6 rounded-xl bg-brand text-background font-medium ring-1 ring-brand/60 hover:bg-brand/90 transition-colors"
              >
                Torna alla home
              </Link>
            </div>
          )}

          {data === null && (
            <div>
              <h1 className="text-2xl font-semibold">Profilo non trovato</h1>
              <p className="text-sm text-muted-foreground mt-2">
                Questo link non è valido o è scaduto. Puoi registrarti di nuovo dalla home.
              </p>
              <Link
                to="/"
                className="mt-6 inline-block text-sm py-3 px-6 rounded-xl bg-brand text-background font-medium ring-1 ring-brand/60 hover:bg-brand/90 transition-colors"
              >
                Torna alla home
              </Link>
            </div>
          )}

          {data && data !== null && <SignupSummary signup={data as SignupRow} />}
        </div>
      </div>
    </div>
  );
}

function SignupSummary({ signup }: { signup: SignupRow }) {
  const experience = signup.experience as Experience;
  const goal = signup.goal as Goal;
  const markets = (signup.markets ?? []) as Market[];
  const strategy = suggestedStrategy(goal, experience);

  return (
    <div>
      <span className="inline-flex items-center gap-2 text-xs font-medium text-brand ring-1 ring-brand/30 bg-brand/5 rounded-full py-1.5 px-3 tracking-wide">
        <span className="size-1.5 rounded-full bg-brand"></span>
        Profilo salvato
      </span>
      <h1 className="text-balance text-3xl lg:text-4xl font-semibold leading-tight mt-5">
        Benvenuto in Vettro, {signup.name}
        {signup.last_name ? ` ${signup.last_name}` : ""}!
      </h1>
      <p className="text-pretty text-muted-foreground mt-3 max-w-[50ch]">
        Ecco un riepilogo orientativo basato sulle tue risposte. Non è una raccomandazione di investimento.
      </p>

      <div className="mt-8 rounded-2xl bg-gradient-to-br from-brand/15 via-skyglow/10 to-transparent ring-1 ring-border p-5">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">Percorso da esplorare</p>
        <p className="text-xl font-semibold mt-1">{strategy}</p>
      </div>

      <div className="mt-4 space-y-3">
        <div className="rounded-xl bg-muted ring-1 ring-border px-4 py-3 flex justify-between gap-4">
          <span className="text-sm text-muted-foreground">Livello di esperienza</span>
          <span className="text-sm font-medium text-right">
            {experienceLabels[experience] ?? signup.experience}
          </span>
        </div>
        <div className="rounded-xl bg-muted ring-1 ring-border px-4 py-3 flex justify-between gap-4">
          <span className="text-sm text-muted-foreground">Approccio indicativo</span>
          <span className="text-sm font-medium text-right">{riskProfile(experience)}</span>
        </div>
        <div className="rounded-xl bg-muted ring-1 ring-border px-4 py-3 flex justify-between gap-4">
          <span className="text-sm text-muted-foreground">Obiettivo</span>
          <span className="text-sm font-medium text-right">{goalLabels[goal] ?? signup.goal}</span>
        </div>
        <div className="rounded-xl bg-muted ring-1 ring-border px-4 py-3 flex justify-between gap-4">
          <span className="text-sm text-muted-foreground">Mercati</span>
          <span className="text-sm font-medium text-right">
            {markets.map((m) => marketLabels[m] ?? m).join(", ")}
          </span>
        </div>
      </div>

      <p className="text-xs text-muted-foreground mt-6">
        Il trading comporta il rischio di perdere il capitale investito. Vettro non è un consulente finanziario.
      </p>

      <Link
        to="/"
        className="mt-6 inline-block text-sm py-3 px-6 rounded-xl ring-1 ring-border bg-muted text-foreground font-medium hover:bg-accent transition-colors"
      >
        ← Torna alla home
      </Link>
    </div>
  );
}
