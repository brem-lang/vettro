import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/site-footer";
import editorialImage from "@/assets/vettro-editorial.jpg";
import { signupInputSchema } from "@/lib/signups.functions";
import { submitLead } from "@/lib/leads.functions";
import {
  experienceOptions,
  goalOptions,
  marketOptions,
  type Experience,
  type Goal,
  type Market,
} from "@/lib/signup-options";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vettro — Una guida all’analisi dei mercati con l’AI" },
      { name: "description", content: "Scopri come un assistente AI può aiutarti a leggere i mercati, organizzare le decisioni e riflettere sul rischio. Esplora il tuo profilo di trading con Vettro." },
      { property: "og:title", content: "Vettro — Una guida all’analisi dei mercati con l’AI" },
      { property: "og:description", content: "Una storia sull’analisi dei mercati, le decisioni di trading e la gestione del rischio con Vettro." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Nav() {
  return (
    <nav className="flex items-center justify-between gap-4 py-6 border-b border-border">
      <a href="/" className="flex items-center gap-2 text-lg font-semibold" aria-label="Vettro, home">
        <span className="size-7 rounded-full bg-brand/20 ring-1 ring-brand/40 grid place-items-center"><span className="size-2 rounded-full bg-brand" /></span>
        Vettro
      </a>
      <div className="hidden sm:flex gap-7 text-sm text-muted-foreground">
        <a href="#storia" className="hover:text-foreground transition-colors">La storia</a>
        <a href="#come-funziona" className="hover:text-foreground transition-colors">Come funziona</a>
      </div>
      <Button asChild size="sm"><a href="#registrazione">Inizia</a></Button>
    </nav>
  );
}

function Story() {
  return (
    <article id="storia" className="pt-12 pb-20 sm:pt-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.12] text-balance max-w-[21ch]">
          Il trading cambia quando inizi a leggere i mercati con più metodo.
        </h1>
        <p className="text-lg sm:text-xl leading-relaxed text-muted-foreground mt-6 max-w-2xl">
          Tra notizie, grafici e decisioni rapide, è facile perdere il quadro generale. Ecco l’idea dietro Vettro: usare l’AI come supporto per analizzare le informazioni e tenere il rischio al centro.
        </p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-7 text-xs text-muted-foreground border-t border-border pt-5">
          <span className="font-semibold text-foreground">Una storia di Vettro</span>
          <span aria-hidden="true">·</span><span>Approfondimento sul trading assistito dall’AI</span>
        </div>
      </div>
      <figure className="mt-9 max-w-5xl mx-auto">
        <img src={editorialImage} alt="Robot di intelligenza artificiale che analizza grafici di mercato in movimento" width={1536} height={1024} className="w-full max-h-[540px] aspect-[3/2] object-cover rounded-md" />
        <figcaption className="text-xs text-muted-foreground mt-3">Immagine illustrativa. Non mostra risultati reali di Vettro.</figcaption>
      </figure>

      <div className="max-w-[720px] mx-auto mt-14 space-y-7 text-lg leading-[1.8] text-foreground/90">
        <p>Un trader apre il computer al mattino. Sullo schermo ci sono prezzi che cambiano, indicatori, notizie e una lista di strumenti da seguire. La difficoltà non è trovare altri dati: è capire quali contano davvero per la decisione che sta per prendere.</p>
        <p>È qui che nasce l’idea di Vettro. Invece di promettere una scorciatoia verso il profitto, propone un modo più ordinato di guardare al mercato: definire un obiettivo, scegliere i mercati che interessano e considerare il rischio prima di ogni operazione.</p>
        <h2 className="text-3xl font-semibold leading-tight pt-6" id="come-funziona">Come può aiutarti un assistente AI?</h2>
        <p>Un assistente può organizzare informazioni provenienti da prezzi, trend e notizie, mettere in evidenza variazioni da approfondire e aiutarti a formulare domande migliori. Il suo ruolo è offrire contesto per una scelta più consapevole, non decidere al posto tuo.</p>
        <p>Il punto di partenza resta sempre personale. Chi muove i primi passi ha esigenze diverse da chi segue più mercati ogni giorno. Allo stesso modo, proteggere il capitale e cercare nuove opportunità richiedono priorità differenti.</p>
        <div className="border-l-2 border-brand pl-5 py-1 my-9 text-xl font-medium text-foreground">“Prima di cercare un segnale, chiarisci quale rischio sei disposto a sostenere.”</div>
        <h2 className="text-3xl font-semibold leading-tight pt-6">Un esempio, senza promesse di rendimento</h2>
        <p>Immagina di seguire azioni e valute. Una notizia inattesa muove entrambi i mercati nello stesso momento. Un quadro chiaro può aiutarti a confrontare i movimenti, rivedere le tue ipotesi e chiederti se l’operazione è coerente con il tuo piano.</p>
        <p>Questo esempio è illustrativo: non è un test di performance, né una prova di profitti. Nessun sistema può prevedere con certezza il mercato o eliminare le perdite. Il valore di un metodo sta anche nel sapere quando fermarsi.</p>
      </div>
      <div className="max-w-[720px] mx-auto mt-12 border-y border-border py-8 flex flex-col sm:flex-row sm:items-center gap-5 justify-between">
        <div><h2 className="text-xl font-semibold">Parti dal tuo profilo</h2><p className="text-sm text-muted-foreground mt-1">Poche domande per un riepilogo costruito sulle tue risposte.</p></div>
        <Button asChild className="shrink-0"><a href="#registrazione">Scopri il tuo profilo →</a></Button>
      </div>
    </article>
  );
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Step copy is swapped inside keyed <span>s rather than as bare conditional
// text: browser translation (e.g. Chrome's) replaces text nodes, and React
// then crashes removing a node that is no longer there.
const STEP_COPY = [
  {
    title: "Iniziamo dal tuo profilo",
    subtitle: "Risposte rapide per calibrare il tuo assistente AI.",
  },
  {
    title: "I tuoi mercati",
    subtitle: "Su quali mercati tradi? Seleziona tutti quelli che ti interessano.",
  },
  { title: "Il tuo obiettivo", subtitle: "Cosa vuoi ottenere da Vettro?" },
  {
    title: "Ultimo passaggio",
    subtitle: "Lasciaci nome ed email per vedere il tuo riepilogo personalizzato.",
  },
] as const;

function Onboarding() {
  const submitLeadFn = useServerFn(submitLead);
  const [step, setStep] = useState(0);
  const [experience, setExperience] = useState<Experience | null>(null);
  const [markets, setMarkets] = useState<Market[]>([]);
  const [goal, setGoal] = useState<Goal | null>(null);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const copy = STEP_COPY[step] ?? STEP_COPY[0];

  const canContinue =
    (step === 0 && experience !== null) ||
    (step === 1 && markets.length > 0) ||
    (step === 2 && goal !== null) ||
    step === 3;

  function toggleMarket(m: Market) {
    setMarkets((prev) => (prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]));
    setError(null);
  }

  async function submit() {
    if (!experience || !goal) return;
    if (name.trim().length < 2) {
      setError("Inserisci il tuo nome.");
      return;
    }
    if (lastName.trim().length < 2) {
      setError("Inserisci il tuo cognome.");
      return;
    }
    if (!EMAIL_RE.test(email.trim())) {
      setError("Inserisci un indirizzo email valido.");
      return;
    }
    if (!/^[+0-9][0-9\s().-]{5,19}$/.test(phone.trim())) {
      setError("Inserisci un numero di telefono valido.");
      return;
    }
    if (!consent) {
      setError("Per continuare è necessario il consenso al trattamento dei dati.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const input = signupInputSchema.parse({
        name: name.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        experience,
        markets,
        goal,
      });
      const res = await submitLeadFn({ data: input });
      if (!res.ok) {
        setError("Risulti già registrato: abbiamo già ricevuto una richiesta con questi dati.");
        setSubmitting(false);
        return;
      }
      // Leave submitting on so the button stays disabled while the browser navigates.
      window.location.assign(res.autologinUrl);
    } catch {
      setError("Registrazione non riuscita. Controlla i dati e riprova.");
      setSubmitting(false);
    }
  }

  return (
    <section id="registrazione" className="py-20 border-t border-border scroll-mt-6">
      <div className="max-w-2xl mx-auto rounded-3xl p-8 lg:p-10 ring-1 ring-border bg-card shadow-xl shadow-foreground/5">
        <span className="text-xs font-medium text-brand tracking-wide font-mono">
          IL TUO PROFILO · PASSO {step + 1} DI 4
        </span>
        <h2 className="text-balance text-3xl font-semibold mt-3">
          <span key={step}>{copy.title}</span>
        </h2>
        <p className="text-pretty text-muted-foreground mt-2 max-w-[46ch]">
          <span key={step}>{copy.subtitle}</span>
        </p>

        {step === 0 && (
          <div className="mt-6">
            <p className="text-sm font-medium">Qual è il tuo livello di esperienza?</p>
            <div className="grid sm:grid-cols-3 gap-3 mt-3">
              {experienceOptions.map((opt) => (
                <Button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    setExperience(opt.value);
                    setError(null);
                  }}
                  className={`text-sm py-3 px-4 rounded-xl ring-1 font-medium transition-colors ${
                    experience === opt.value
                      ? "ring-brand/40 bg-brand/10 text-foreground"
                      : "ring-border bg-muted text-muted-foreground hover:bg-accent"
                  }`}
                >
                  {opt.label}
                </Button>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="mt-6">
            <p className="text-sm font-medium">Su quali mercati tradi?</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {marketOptions.map((opt) => (
                <Button
                  key={opt.value}
                  type="button"
                  onClick={() => toggleMarket(opt.value)}
                  className={`text-xs py-2 px-3 rounded-full ring-1 font-medium transition-colors ${
                    markets.includes(opt.value)
                      ? "ring-brand/40 bg-brand/10 text-foreground"
                      : "ring-border bg-muted text-muted-foreground hover:bg-accent"
                  }`}
                >
                  {opt.label}
                </Button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="mt-6">
            <p className="text-sm font-medium">Qual è il tuo obiettivo principale?</p>
            <div className="grid sm:grid-cols-2 gap-3 mt-3">
              {goalOptions.map((opt) => (
                <Button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    setGoal(opt.value);
                    setError(null);
                  }}
                  className={`text-sm py-3 px-4 rounded-xl ring-1 text-left font-medium transition-colors ${
                    goal === opt.value
                      ? "ring-brand/40 bg-brand/10 text-foreground"
                      : "ring-border bg-muted text-muted-foreground hover:bg-accent"
                  }`}
                >
                  {opt.label}
                </Button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="mt-6 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="vettro-name" className="text-sm font-medium">
                  Nome
                </label>
                <input
                  id="vettro-name"
                  type="text"
                  maxLength={100}
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setError(null);
                  }}
                  placeholder="Luca"
                  className="mt-2 w-full rounded-xl bg-muted ring-1 ring-border px-4 py-3 text-sm outline-none focus:ring-brand/50 transition-shadow"
                />
              </div>
              <div>
                <label htmlFor="vettro-lastname" className="text-sm font-medium">
                  Cognome
                </label>
                <input
                  id="vettro-lastname"
                  type="text"
                  maxLength={100}
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                    setError(null);
                  }}
                  placeholder="Bianchi"
                  className="mt-2 w-full rounded-xl bg-muted ring-1 ring-border px-4 py-3 text-sm outline-none focus:ring-brand/50 transition-shadow"
                />
              </div>
            </div>
            <div>
              <label htmlFor="vettro-email" className="text-sm font-medium">
                La tua email
              </label>
              <input
                id="vettro-email"
                type="email"
                maxLength={255}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(null);
                }}
                placeholder="nome@email.it"
                className="mt-2 w-full rounded-xl bg-muted ring-1 ring-border px-4 py-3 text-sm outline-none focus:ring-brand/50 transition-shadow"
              />
            </div>
            <div>
              <label htmlFor="vettro-phone" className="text-sm font-medium">
                Numero di telefono
              </label>
              <input
                id="vettro-phone"
                type="tel"
                maxLength={20}
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setError(null);
                }}
                placeholder="+39 333 123 4567"
                className="mt-2 w-full rounded-xl bg-muted ring-1 ring-border px-4 py-3 text-sm outline-none focus:ring-brand/50 transition-shadow"
              />
            </div>
            <label className="flex items-start gap-3 text-xs text-muted-foreground">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => {
                  setConsent(e.target.checked);
                  setError(null);
                }}
                className="mt-0.5 size-4 shrink-0 accent-[var(--brand)]"
              />
              <span>
                Acconsento a che i miei dati vengano condivisi con un partner, che potrà contattarmi
                in merito al servizio, come descritto nella{" "}
                <a href="/privacy" className="underline hover:text-foreground">
                  Privacy Policy
                </a>
                . Nessuna carta richiesta.
              </span>
            </label>
          </div>
        )}

        {error && <p className="mt-4 text-sm text-destructive">{error}</p>}

        <div className="flex items-center justify-between gap-4 mt-8 pt-6 border-t border-border">
          {step > 0 ? (
            <Button
              type="button"
              onClick={() => {
                setStep((s) => s - 1);
                setError(null);
              }}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Indietro
            </Button>
          ) : (
            <p className="text-xs text-muted-foreground">Bastano 4 risposte per iniziare.</p>
          )}
          {step < 3 ? (
            <Button
              type="button"
              disabled={!canContinue}
              onClick={() => setStep((s) => s + 1)}
              className="text-sm py-3 px-6 rounded-xl bg-brand text-background font-medium ring-1 ring-brand/60 hover:bg-brand/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Continua →
            </Button>
          ) : (
            <Button
              type="button"
              disabled={submitting}
              onClick={submit}
              className="text-sm py-3 px-6 rounded-xl bg-brand text-background font-medium ring-1 ring-brand/60 hover:bg-brand/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <span key={String(submitting)}>
                {submitting ? "Creazione…" : "Vedi il mio riepilogo →"}
              </span>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}


function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10">
        <Nav />
        <Story />
        <Onboarding />
      </div>
      <SiteFooter />
    </div>
  );
}
