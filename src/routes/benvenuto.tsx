import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { getSignup } from "@/lib/signups.functions";
import { useLang, type Lang } from "@/lib/i18n";
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

const COPY = {
  it: {
    metaTitle: "Il tuo profilo — Vettro",
    metaDescription: "Consulta il riepilogo personalizzato del tuo profilo di trading Vettro.",
    ogDescription: "Il riepilogo delle risposte del tuo profilo di trading Vettro.",
    loading: "Preparazione del tuo profilo…",
    errorTitle: "Qualcosa è andato storto",
    errorText: "Non riusciamo a recuperare il tuo profilo. Riprova dalla home.",
    home: "Torna alla home",
    notFoundTitle: "Profilo non trovato",
    notFoundText: "Questo link non è valido o è scaduto. Puoi registrarti di nuovo dalla home.",
    saved: "Profilo salvato",
    welcome: "Benvenuto in Vettro,",
    intro: "Ecco un riepilogo orientativo basato sulle tue risposte. Non è una raccomandazione di investimento.",
    path: "Percorso da esplorare",
    experience: "Livello di esperienza",
    approach: "Approccio indicativo",
    goal: "Obiettivo",
    markets: "Mercati",
    risk: "Il trading comporta il rischio di perdere il capitale investito. Vettro non è un consulente finanziario.",
  },
  es: {
    metaTitle: "Tu perfil — Vettro",
    metaDescription: "Consulta el resumen personalizado de tu perfil de trading de Vettro.",
    ogDescription: "El resumen de las respuestas de tu perfil de trading de Vettro.",
    loading: "Preparando tu perfil…",
    errorTitle: "Algo ha salido mal",
    errorText: "No podemos recuperar tu perfil. Vuelve a intentarlo desde el inicio.",
    home: "Volver al inicio",
    notFoundTitle: "Perfil no encontrado",
    notFoundText: "Este enlace no es válido o ha caducado. Puedes registrarte de nuevo desde el inicio.",
    saved: "Perfil guardado",
    welcome: "¡Bienvenido a Vettro,",
    intro: "Aquí tienes un resumen orientativo basado en tus respuestas. No es una recomendación de inversión.",
    path: "Ruta para explorar",
    experience: "Nivel de experiencia",
    approach: "Enfoque orientativo",
    goal: "Objetivo",
    markets: "Mercados",
    risk: "El trading conlleva el riesgo de perder el capital invertido. Vettro no es un asesor financiero.",
  },
  en: {
    metaTitle: "Your profile — Vettro",
    metaDescription: "View the personalised summary of your Vettro trading profile.",
    ogDescription: "A summary of your Vettro trading profile answers.",
    loading: "Preparing your profile…",
    errorTitle: "Something went wrong",
    errorText: "We can't load your profile. Please try again from the home page.",
    home: "Back to home",
    notFoundTitle: "Profile not found",
    notFoundText: "This link is invalid or has expired. You can sign up again from the home page.",
    saved: "Profile saved",
    welcome: "Welcome to Vettro,",
    intro: "Here's an indicative summary based on your answers. It is not an investment recommendation.",
    path: "Path to explore",
    experience: "Experience level",
    approach: "Indicative approach",
    goal: "Goal",
    markets: "Markets",
    risk: "Trading carries the risk of losing the capital you invest. Vettro is not a financial adviser.",
  },
  de: {
    metaTitle: "Dein Profil — Vettro",
    metaDescription: "Sieh dir die persönliche Zusammenfassung deines Vettro-Tradingprofils an.",
    ogDescription: "Eine Zusammenfassung deiner Antworten zum Vettro-Tradingprofil.",
    loading: "Dein Profil wird vorbereitet…",
    errorTitle: "Etwas ist schiefgelaufen",
    errorText: "Wir können dein Profil nicht laden. Bitte versuche es erneut über die Startseite.",
    home: "Zur Startseite",
    notFoundTitle: "Profil nicht gefunden",
    notFoundText: "Dieser Link ist ungültig oder abgelaufen. Du kannst dich über die Startseite erneut registrieren.",
    saved: "Profil gespeichert",
    welcome: "Willkommen bei Vettro,",
    intro: "Hier ist eine unverbindliche Zusammenfassung auf Grundlage deiner Antworten. Sie ist keine Anlageempfehlung.",
    path: "Empfohlener Weg",
    experience: "Erfahrungsstufe",
    approach: "Unverbindlicher Ansatz",
    goal: "Ziel",
    markets: "Märkte",
    risk: "Trading birgt das Risiko, das investierte Kapital zu verlieren. Vettro ist kein Finanzberater.",
  },
  ar: {
    metaTitle: "ملفك — Vettro",
    metaDescription: "اطّلع على الملخص المخصّص لملف التداول الخاص بك في Vettro.",
    ogDescription: "ملخص لإجاباتك في ملف التداول على Vettro.",
    loading: "جارٍ إعداد ملفك…",
    errorTitle: "حدث خطأ ما",
    errorText: "تعذّر تحميل ملفك. يُرجى المحاولة مرة أخرى من الصفحة الرئيسية.",
    home: "العودة إلى الصفحة الرئيسية",
    notFoundTitle: "الملف غير موجود",
    notFoundText: "هذا الرابط غير صالح أو منتهي الصلاحية. يمكنك التسجيل مرة أخرى من الصفحة الرئيسية.",
    saved: "تم حفظ الملف",
    welcome: "مرحبًا بك في Vettro،",
    intro: "إليك ملخصًا استرشاديًا بناءً على إجاباتك. وهو ليس توصية استثمارية.",
    path: "المسار المقترح",
    experience: "مستوى الخبرة",
    approach: "النهج الاسترشادي",
    goal: "الهدف",
    markets: "الأسواق",
    risk: "ينطوي التداول على خطر خسارة رأس المال الذي تستثمره. Vettro ليس مستشارًا ماليًا.",
  },
} satisfies Record<Lang, Record<string, string>>;

export const Route = createFileRoute("/benvenuto")({
  validateSearch: z.object({ id: z.string().uuid() }),
  head: ({ match }) => ({
    meta: [
      { title: COPY[match.context.lang].metaTitle },
      { name: "description", content: COPY[match.context.lang].metaDescription },
      { property: "og:title", content: COPY[match.context.lang].metaTitle },
      { property: "og:description", content: COPY[match.context.lang].ogDescription },
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
  const c = COPY[useLang()];

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
            <p className="text-sm text-muted-foreground">{c.loading}</p>
          )}

          {isError && (
            <div>
              <h1 className="text-2xl font-semibold">{c.errorTitle}</h1>
              <p className="text-sm text-muted-foreground mt-2">{c.errorText}</p>
              <Link
                to="/"
                className="mt-6 inline-block text-sm py-3 px-6 rounded-xl bg-brand text-background font-medium ring-1 ring-brand/60 hover:bg-brand/90 transition-colors"
              >
                {c.home}
              </Link>
            </div>
          )}

          {data === null && (
            <div>
              <h1 className="text-2xl font-semibold">{c.notFoundTitle}</h1>
              <p className="text-sm text-muted-foreground mt-2">{c.notFoundText}</p>
              <Link
                to="/"
                className="mt-6 inline-block text-sm py-3 px-6 rounded-xl bg-brand text-background font-medium ring-1 ring-brand/60 hover:bg-brand/90 transition-colors"
              >
                {c.home}
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
  const lang = useLang();
  const c = COPY[lang];
  const strategy = suggestedStrategy(goal, experience, lang);

  return (
    <div>
      <span className="inline-flex items-center gap-2 text-xs font-medium text-brand ring-1 ring-brand/30 bg-brand/5 rounded-full py-1.5 px-3 tracking-wide">
        <span className="size-1.5 rounded-full bg-brand"></span>
        {c.saved}
      </span>
      <h1 className="text-balance text-3xl lg:text-4xl font-semibold leading-tight mt-5">
        {c.welcome} {signup.name}
        {signup.last_name ? ` ${signup.last_name}` : ""}!
      </h1>
      <p className="text-pretty text-muted-foreground mt-3 max-w-[50ch]">
        {c.intro}
      </p>

      <div className="mt-8 rounded-2xl bg-gradient-to-br from-brand/15 via-skyglow/10 to-transparent ring-1 ring-border p-5">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">{c.path}</p>
        <p className="text-xl font-semibold mt-1">{strategy}</p>
      </div>

      <div className="mt-4 space-y-3">
        <div className="rounded-xl bg-muted ring-1 ring-border px-4 py-3 flex justify-between gap-4">
          <span className="text-sm text-muted-foreground">{c.experience}</span>
          <span className="text-sm font-medium text-end">
            {experienceLabels[lang][experience] ?? signup.experience}
          </span>
        </div>
        <div className="rounded-xl bg-muted ring-1 ring-border px-4 py-3 flex justify-between gap-4">
          <span className="text-sm text-muted-foreground">{c.approach}</span>
          <span className="text-sm font-medium text-end">{riskProfile(experience, lang)}</span>
        </div>
        <div className="rounded-xl bg-muted ring-1 ring-border px-4 py-3 flex justify-between gap-4">
          <span className="text-sm text-muted-foreground">{c.goal}</span>
          <span className="text-sm font-medium text-end">{goalLabels[lang][goal] ?? signup.goal}</span>
        </div>
        <div className="rounded-xl bg-muted ring-1 ring-border px-4 py-3 flex justify-between gap-4">
          <span className="text-sm text-muted-foreground">{c.markets}</span>
          <span className="text-sm font-medium text-end">
            {markets.map((m) => marketLabels[lang][m] ?? m).join(", ")}
          </span>
        </div>
      </div>

      <p className="text-xs text-muted-foreground mt-6">
        {c.risk}
      </p>

      <Link
        to="/"
        className="mt-6 inline-block text-sm py-3 px-6 rounded-xl ring-1 ring-border bg-muted text-foreground font-medium hover:bg-accent transition-colors"
      >
        ← {c.home}
      </Link>
    </div>
  );
}
