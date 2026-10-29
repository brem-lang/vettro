import { createFileRoute, Link, useRouteContext } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/language-switcher";
import { SiteFooter } from "@/components/site-footer";
import editorialImage from "@/assets/vettro-editorial.jpg";
import { signupInputSchema } from "@/lib/signups.functions";
import { submitLead } from "@/lib/leads.functions";
import { getClickId, rememberClickId } from "@/lib/click-id";
import { useLang, type Lang } from "@/lib/i18n";
import { PHONE_COUNTRIES, checkPhone, type PhoneCountry, type PhoneReason } from "@/lib/phone";
import { checkEmail, type EmailReason } from "@/lib/email";
import {
  experienceOptions,
  goalOptions,
  marketOptions,
  type Experience,
  type Goal,
  type Market,
} from "@/lib/signup-options";

const COPY = {
  it: {
    metaTitle: "Vettro — Una guida all’analisi dei mercati con l’AI",
    metaDescription: "Scopri come un assistente AI può aiutarti a leggere i mercati, organizzare le decisioni e riflettere sul rischio. Esplora il tuo profilo di trading con Vettro.",
    ogDescription: "Una storia sull’analisi dei mercati, le decisioni di trading e la gestione del rischio con Vettro.",
    navStory: "La storia",
    navHow: "Come funziona",
    navStart: "Inizia",
    h1: "Il trading cambia quando inizi a leggere i mercati con più metodo.",
    lead: "Tra notizie, grafici e decisioni rapide, è facile perdere il quadro generale. Ecco l’idea dietro Vettro: usare l’AI come supporto per analizzare le informazioni e tenere il rischio al centro.",
    byline: "Una storia di Vettro",
    kicker: "Approfondimento sul trading assistito dall’AI",
    imageAlt: "Robot di intelligenza artificiale che analizza grafici di mercato in movimento",
    imageCaption: "Immagine illustrativa. Non mostra risultati reali di Vettro.",
    p1: "Un trader apre il computer al mattino. Sullo schermo ci sono prezzi che cambiano, indicatori, notizie e una lista di strumenti da seguire. La difficoltà non è trovare altri dati: è capire quali contano davvero per la decisione che sta per prendere.",
    p2: "È qui che nasce l’idea di Vettro. Invece di promettere una scorciatoia verso il profitto, propone un modo più ordinato di guardare al mercato: definire un obiettivo, scegliere i mercati che interessano e considerare il rischio prima di ogni operazione.",
    h2How: "Come può aiutarti un assistente AI?",
    p3: "Un assistente può organizzare informazioni provenienti da prezzi, trend e notizie, mettere in evidenza variazioni da approfondire e aiutarti a formulare domande migliori. Il suo ruolo è offrire contesto per una scelta più consapevole, non decidere al posto tuo.",
    p4: "Il punto di partenza resta sempre personale. Chi muove i primi passi ha esigenze diverse da chi segue più mercati ogni giorno. Allo stesso modo, proteggere il capitale e cercare nuove opportunità richiedono priorità differenti.",
    quote: "“Prima di cercare un segnale, chiarisci quale rischio sei disposto a sostenere.”",
    h2Example: "Un esempio, senza promesse di rendimento",
    p5: "Immagina di seguire azioni e valute. Una notizia inattesa muove entrambi i mercati nello stesso momento. Un quadro chiaro può aiutarti a confrontare i movimenti, rivedere le tue ipotesi e chiederti se l’operazione è coerente con il tuo piano.",
    p6: "Questo esempio è illustrativo: non è un test di performance, né una prova di profitti. Nessun sistema può prevedere con certezza il mercato o eliminare le perdite. Il valore di un metodo sta anche nel sapere quando fermarsi.",
    ctaTitle: "Parti dal tuo profilo",
    ctaText: "Poche domande per un riepilogo costruito sulle tue risposte.",
    ctaButton: "Scopri il tuo profilo →",
  },
  es: {
    metaTitle: "Vettro — Una guía para analizar los mercados con IA",
    metaDescription: "Descubre cómo un asistente de IA puede ayudarte a leer los mercados, organizar tus decisiones y reflexionar sobre el riesgo. Explora tu perfil de trading con Vettro.",
    ogDescription: "Una historia sobre el análisis de los mercados, las decisiones de trading y la gestión del riesgo con Vettro.",
    navStory: "La historia",
    navHow: "Cómo funciona",
    navStart: "Empezar",
    h1: "El trading cambia cuando empiezas a leer los mercados con más método.",
    lead: "Entre noticias, gráficos y decisiones rápidas, es fácil perder la visión de conjunto. Esta es la idea detrás de Vettro: usar la IA como apoyo para analizar la información y mantener el riesgo en el centro.",
    byline: "Una historia de Vettro",
    kicker: "Análisis sobre el trading asistido por IA",
    imageAlt: "Robot de inteligencia artificial que analiza gráficos de mercado en movimiento",
    imageCaption: "Imagen ilustrativa. No muestra resultados reales de Vettro.",
    p1: "Un trader enciende el ordenador por la mañana. En la pantalla hay precios que cambian, indicadores, noticias y una lista de instrumentos que seguir. La dificultad no es encontrar más datos: es entender cuáles importan de verdad para la decisión que está a punto de tomar.",
    p2: "Aquí nace la idea de Vettro. En lugar de prometer un atajo hacia el beneficio, propone una forma más ordenada de mirar el mercado: definir un objetivo, elegir los mercados que interesan y tener en cuenta el riesgo antes de cada operación.",
    h2How: "¿Cómo puede ayudarte un asistente de IA?",
    p3: "Un asistente puede organizar información procedente de precios, tendencias y noticias, destacar variaciones que conviene analizar y ayudarte a formular mejores preguntas. Su papel es ofrecer contexto para una decisión más consciente, no decidir por ti.",
    p4: "El punto de partida siempre es personal. Quien da sus primeros pasos tiene necesidades distintas de quien sigue varios mercados cada día. Del mismo modo, proteger el capital y buscar nuevas oportunidades exigen prioridades diferentes.",
    quote: "«Antes de buscar una señal, aclara qué riesgo estás dispuesto a asumir.»",
    h2Example: "Un ejemplo, sin promesas de rentabilidad",
    p5: "Imagina que sigues acciones y divisas. Una noticia inesperada mueve ambos mercados al mismo tiempo. Una visión clara puede ayudarte a comparar los movimientos, revisar tus hipótesis y preguntarte si la operación es coherente con tu plan.",
    p6: "Este ejemplo es ilustrativo: no es una prueba de rendimiento ni una demostración de beneficios. Ningún sistema puede predecir el mercado con certeza ni eliminar las pérdidas. El valor de un método también está en saber cuándo parar.",
    ctaTitle: "Empieza por tu perfil",
    ctaText: "Unas pocas preguntas para un resumen basado en tus respuestas.",
    ctaButton: "Descubre tu perfil →",
  },
  en: {
    metaTitle: "Vettro — A guide to analysing the markets with AI",
    metaDescription: "Find out how an AI assistant can help you read the markets, organise your decisions and think about risk. Explore your trading profile with Vettro.",
    ogDescription: "A story about market analysis, trading decisions and risk management with Vettro.",
    navStory: "The story",
    navHow: "How it works",
    navStart: "Get started",
    h1: "Trading changes when you start reading the markets with more method.",
    lead: "Between news, charts and quick decisions, it's easy to lose sight of the big picture. That's the idea behind Vettro: using AI as support to analyse information while keeping risk front and centre.",
    byline: "A Vettro story",
    kicker: "A closer look at AI-assisted trading",
    imageAlt: "Artificial intelligence robot analysing moving market charts",
    imageCaption: "Illustrative image. It does not show real Vettro results.",
    p1: "A trader opens their computer in the morning. On screen there are changing prices, indicators, news and a list of instruments to follow. The hard part isn't finding more data: it's working out which data really matters for the decision they're about to make.",
    p2: "This is where the idea for Vettro comes from. Instead of promising a shortcut to profit, it offers a more orderly way of looking at the market: set a goal, choose the markets you care about and consider the risk before every trade.",
    h2How: "How can an AI assistant help you?",
    p3: "An assistant can organise information from prices, trends and news, highlight movements worth a closer look and help you ask better questions. Its role is to give you context for a more informed choice, not to decide for you.",
    p4: "The starting point is always personal. Someone taking their first steps has different needs from someone who follows several markets every day. Likewise, protecting capital and looking for new opportunities call for different priorities.",
    quote: "“Before you look for a signal, be clear about how much risk you're willing to take.”",
    h2Example: "An example, with no promise of returns",
    p5: "Imagine you follow stocks and currencies. An unexpected piece of news moves both markets at the same time. A clear picture can help you compare the moves, revisit your assumptions and ask whether the trade fits your plan.",
    p6: "This example is illustrative: it isn't a performance test or proof of profits. No system can predict the market with certainty or eliminate losses. Part of the value of a method is knowing when to stop.",
    ctaTitle: "Start with your profile",
    ctaText: "A few questions for a summary built on your answers.",
    ctaButton: "Discover your profile →",
  },
  de: {
    metaTitle: "Vettro — Ein Leitfaden zur Marktanalyse mit KI",
    metaDescription: "Erfahre, wie ein KI-Assistent dir helfen kann, die Märkte zu lesen, deine Entscheidungen zu ordnen und über Risiken nachzudenken. Entdecke dein Trading-Profil mit Vettro.",
    ogDescription: "Eine Geschichte über Marktanalyse, Trading-Entscheidungen und Risikomanagement mit Vettro.",
    navStory: "Die Geschichte",
    navHow: "So funktioniert es",
    navStart: "Loslegen",
    h1: "Trading verändert sich, wenn du beginnst, die Märkte mit mehr Methode zu lesen.",
    lead: "Zwischen Nachrichten, Charts und schnellen Entscheidungen verliert man leicht den Überblick. Das ist die Idee hinter Vettro: KI als Unterstützung zu nutzen, um Informationen zu analysieren, und dabei das Risiko immer im Blick zu behalten.",
    byline: "Eine Vettro-Geschichte",
    kicker: "Ein genauerer Blick auf KI-gestütztes Trading",
    imageAlt: "Roboter mit künstlicher Intelligenz analysiert bewegte Marktcharts",
    imageCaption: "Symbolbild. Es zeigt keine echten Ergebnisse von Vettro.",
    p1: "Ein Trader schaltet morgens seinen Computer ein. Auf dem Bildschirm sind sich ändernde Kurse, Indikatoren, Nachrichten und eine Liste von Instrumenten, die er verfolgen will. Das Schwierige ist nicht, mehr Daten zu finden, sondern herauszufinden, welche Daten für die anstehende Entscheidung wirklich zählen.",
    p2: "Daraus entstand die Idee für Vettro. Statt eine Abkürzung zum Gewinn zu versprechen, bietet es eine geordnetere Art, den Markt zu betrachten: ein Ziel festlegen, die Märkte wählen, die dich interessieren, und vor jedem Trade das Risiko abwägen.",
    h2How: "Wie kann dir ein KI-Assistent helfen?",
    p3: "Ein Assistent kann Informationen aus Kursen, Trends und Nachrichten ordnen, Bewegungen hervorheben, die einen genaueren Blick verdienen, und dir helfen, bessere Fragen zu stellen. Seine Aufgabe ist es, dir Kontext für eine bewusstere Entscheidung zu geben, nicht für dich zu entscheiden.",
    p4: "Der Ausgangspunkt ist immer persönlich. Wer gerade die ersten Schritte macht, hat andere Bedürfnisse als jemand, der täglich mehrere Märkte verfolgt. Ebenso erfordern Kapitalschutz und die Suche nach neuen Chancen unterschiedliche Prioritäten.",
    quote: "„Bevor du nach einem Signal suchst, sei dir im Klaren darüber, wie viel Risiko du eingehen willst.“",
    h2Example: "Ein Beispiel, ohne Renditeversprechen",
    p5: "Stell dir vor, du verfolgst Aktien und Währungen. Eine unerwartete Nachricht bewegt beide Märkte gleichzeitig. Ein klares Bild kann dir helfen, die Bewegungen zu vergleichen, deine Annahmen zu überprüfen und zu fragen, ob der Trade zu deinem Plan passt.",
    p6: "Dieses Beispiel dient nur der Veranschaulichung: Es ist weder ein Leistungstest noch ein Gewinnnachweis. Kein System kann den Markt mit Sicherheit vorhersagen oder Verluste ausschließen. Zum Wert einer Methode gehört auch, zu wissen, wann man aufhören sollte.",
    ctaTitle: "Beginne mit deinem Profil",
    ctaText: "Ein paar Fragen für eine Zusammenfassung auf Grundlage deiner Antworten.",
    ctaButton: "Entdecke dein Profil →",
  },
  ar: {
    metaTitle: "Vettro — دليل لتحليل الأسواق بالذكاء الاصطناعي",
    metaDescription: "اكتشف كيف يمكن لمساعد ذكاء اصطناعي أن يساعدك على قراءة الأسواق وتنظيم قراراتك والتفكير في المخاطر. استكشف ملف التداول الخاص بك مع Vettro.",
    ogDescription: "قصة عن تحليل الأسواق وقرارات التداول وإدارة المخاطر مع Vettro.",
    navStory: "القصة",
    navHow: "كيف يعمل",
    navStart: "ابدأ",
    h1: "يتغيّر التداول عندما تبدأ بقراءة الأسواق بمنهجية أكبر.",
    lead: "بين الأخبار والرسوم البيانية والقرارات السريعة، من السهل أن تغيب عنك الصورة الكاملة. وهذه هي الفكرة وراء Vettro: استخدام الذكاء الاصطناعي كأداة مساندة لتحليل المعلومات مع إبقاء المخاطر في صدارة الاهتمام.",
    byline: "قصة من Vettro",
    kicker: "نظرة أقرب على التداول بمساعدة الذكاء الاصطناعي",
    imageAlt: "روبوت ذكاء اصطناعي يحلّل رسومًا بيانية متحرّكة للأسواق",
    imageCaption: "صورة توضيحية. لا تُظهر نتائج حقيقية لـ Vettro.",
    p1: "يفتح أحد المتداولين حاسوبه في الصباح. على الشاشة أسعار متغيّرة ومؤشرات وأخبار وقائمة بالأدوات التي يتابعها. الصعوبة ليست في العثور على المزيد من البيانات، بل في معرفة أي البيانات تهمّ فعلًا للقرار الذي يوشك على اتخاذه.",
    p2: "من هنا جاءت فكرة Vettro. بدلًا من الوعد بطريق مختصر إلى الربح، يقدّم طريقة أكثر تنظيمًا للنظر إلى السوق: حدّد هدفًا، واختر الأسواق التي تهمّك، وفكّر في المخاطر قبل كل صفقة.",
    h2How: "كيف يمكن لمساعد ذكاء اصطناعي أن يساعدك؟",
    p3: "يمكن للمساعد تنظيم المعلومات المستمدة من الأسعار والاتجاهات والأخبار، وإبراز التحركات التي تستحق نظرة أقرب، ومساعدتك على طرح أسئلة أفضل. ودوره أن يمنحك سياقًا لاختيار أكثر وعيًا، لا أن يقرّر نيابةً عنك.",
    p4: "نقطة البداية شخصية دائمًا. فمن يخطو خطواته الأولى له احتياجات تختلف عن احتياجات من يتابع عدة أسواق يوميًا. وبالمثل، تتطلّب حماية رأس المال والبحث عن فرص جديدة أولويات مختلفة.",
    quote: "«قبل أن تبحث عن إشارة، كن واضحًا بشأن حجم المخاطرة التي أنت مستعد لتحمّلها.»",
    h2Example: "مثال، دون أي وعد بعوائد",
    p5: "تخيّل أنك تتابع الأسهم والعملات. خبر غير متوقّع يحرّك السوقين في الوقت نفسه. يمكن لصورة واضحة أن تساعدك على مقارنة التحركات، ومراجعة افتراضاتك، والتساؤل عمّا إذا كانت الصفقة تتوافق مع خطتك.",
    p6: "هذا المثال توضيحي: ليس اختبارًا للأداء ولا دليلًا على الأرباح. لا يمكن لأي نظام التنبؤ بالسوق بيقين أو إلغاء الخسائر. وجزء من قيمة المنهجية هو معرفة متى تتوقّف.",
    ctaTitle: "ابدأ بملفك",
    ctaText: "بضعة أسئلة للحصول على ملخص مبني على إجاباتك.",
    ctaButton: "اكتشف ملفك ←",
  },
} satisfies Record<Lang, Record<string, string>>;

export const Route = createFileRoute("/")({
  head: ({ match }) => {
    const c = COPY[match.context.lang];
    return {
      meta: [
        { title: c.metaTitle },
        { name: "description", content: c.metaDescription },
        { property: "og:title", content: c.metaTitle },
        { property: "og:description", content: c.ogDescription },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: Index,
});

function Nav() {
  const c = COPY[useLang()];
  return (
    <nav className="flex items-center justify-between gap-4 py-6 border-b border-border">
      <a href={import.meta.env.BASE_URL} className="flex items-center gap-2 text-lg font-semibold" aria-label="Vettro, home">
        <span className="size-7 rounded-full bg-brand/20 ring-1 ring-brand/40 grid place-items-center"><span className="size-2 rounded-full bg-brand" /></span>
        Vettro
      </a>
      <div className="hidden sm:flex gap-7 text-sm text-muted-foreground">
        <a href="#storia" className="hover:text-foreground transition-colors">{c.navStory}</a>
        <a href="#come-funziona" className="hover:text-foreground transition-colors">{c.navHow}</a>
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        <LanguageSwitcher />
        <Button asChild size="sm"><a href="#registrazione">{c.navStart}</a></Button>
      </div>
    </nav>
  );
}

function Story() {
  const c = COPY[useLang()];
  return (
    <article id="storia" className="pt-12 pb-20 sm:pt-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.12] text-balance max-w-[21ch]">
          {c.h1}
        </h1>
        <p className="text-lg sm:text-xl leading-relaxed text-muted-foreground mt-6 max-w-2xl">
          {c.lead}
        </p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-7 text-xs text-muted-foreground border-t border-border pt-5">
          <span className="font-semibold text-foreground">{c.byline}</span>
          <span aria-hidden="true">·</span><span>{c.kicker}</span>
        </div>
      </div>
      <figure className="mt-9 max-w-5xl mx-auto">
        <img src={editorialImage} alt={c.imageAlt} width={1536} height={1024} className="w-full max-h-[540px] aspect-[3/2] object-cover rounded-md" />
        <figcaption className="text-xs text-muted-foreground mt-3">{c.imageCaption}</figcaption>
      </figure>

      <div className="max-w-[720px] mx-auto mt-14 space-y-7 text-lg leading-[1.8] text-foreground/90">
        <p>{c.p1}</p>
        <p>{c.p2}</p>
        <h2 className="text-3xl font-semibold leading-tight pt-6" id="come-funziona">{c.h2How}</h2>
        <p>{c.p3}</p>
        <p>{c.p4}</p>
        <div className="border-s-2 border-brand ps-5 py-1 my-9 text-xl font-medium text-foreground">{c.quote}</div>
        <h2 className="text-3xl font-semibold leading-tight pt-6">{c.h2Example}</h2>
        <p>{c.p5}</p>
        <p>{c.p6}</p>
      </div>
      <div className="max-w-[720px] mx-auto mt-12 border-y border-border py-8 flex flex-col sm:flex-row sm:items-center gap-5 justify-between">
        <div><h2 className="text-xl font-semibold">{c.ctaTitle}</h2><p className="text-sm text-muted-foreground mt-1">{c.ctaText}</p></div>
        <Button asChild className="shrink-0"><a href="#registrazione">{c.ctaButton}</a></Button>
      </div>
    </article>
  );
}

// Errors are kept as keys so a visible message follows a language switch.
type FormError =
  | "errName"
  | "errLastName"
  | "errEmail"
  | "errEmailTypo"
  | "errEmailDisposable"
  | "errEmailFake"
  | "errEmailDomain"
  | "errPhone"
  | "errPhoneLetters"
  | "errPhoneCountry"
  | "errPhoneShort"
  | "errPhoneLong"
  | "errPhoneLandline"
  | "errConsent"
  | "errDuplicate"
  | "errGeneric";

const PHONE_ERROR: Record<PhoneReason, FormError> = {
  letters: "errPhoneLetters",
  country: "errPhoneCountry",
  short: "errPhoneShort",
  long: "errPhoneLong",
  landline: "errPhoneLandline",
  invalid: "errPhone",
};

const PHONE_LABELS: Record<PhoneCountry, string> = {
  IT: "IT +39",
  ES: "ES +34",
  GB: "UK +44",
  DE: "DE +49",
  SA: "SA +966",
};
// Example number per prefix (format hint only).
const PHONE_PLACEHOLDERS: Record<PhoneCountry, string> = {
  IT: "347 812 9054",
  ES: "612 905 384",
  GB: "07911 123456",
  DE: "0151 23456789",
  SA: "050 123 4567",
};

const LANG_PHONE_COUNTRY: Record<Lang, PhoneCountry> = { it: "IT", es: "ES", en: "GB", de: "DE", ar: "SA" };

// Prefix shown first: the visitor's country if it has one in the list,
// otherwise the page language's.
function defaultPhoneCountry(country: string, lang: Lang): PhoneCountry {
  if ((PHONE_COUNTRIES as readonly string[]).includes(country)) return country as PhoneCountry;
  return LANG_PHONE_COUNTRY[lang];
}

const PRIVACY_TITLE: Record<Lang, string> = {
  it: "Privacy Policy",
  es: "Política de Privacidad",
  en: "Privacy Policy",
  de: "Datenschutzerklärung",
  ar: "سياسة الخصوصية",
};

const EMAIL_ERROR: Record<EmailReason, FormError> = {
  format: "errEmail",
  typo: "errEmailTypo",
  disposable: "errEmailDisposable",
  fake: "errEmailFake",
  domain: "errEmailDomain",
};

// Step copy is swapped inside keyed <span>s rather than as bare conditional
// text: browser translation (e.g. Chrome's) replaces text nodes, and React
// then crashes removing a node that is no longer there.
type StepCopy = { title: string; subtitle: string };

const STEP_COPY: Record<Lang, readonly [StepCopy, StepCopy, StepCopy, StepCopy]> = {
  it: [
    { title: "Iniziamo dal tuo profilo", subtitle: "Risposte rapide per calibrare il tuo assistente AI." },
    { title: "I tuoi mercati", subtitle: "Su quali mercati tradi? Seleziona tutti quelli che ti interessano." },
    { title: "Il tuo obiettivo", subtitle: "Cosa vuoi ottenere da Vettro?" },
    { title: "Ultimo passaggio", subtitle: "Lasciaci nome ed email per vedere il tuo riepilogo personalizzato." },
  ],
  es: [
    { title: "Empecemos por tu perfil", subtitle: "Respuestas rápidas para ajustar tu asistente de IA." },
    { title: "Tus mercados", subtitle: "¿En qué mercados operas? Selecciona todos los que te interesen." },
    { title: "Tu objetivo", subtitle: "¿Qué quieres conseguir con Vettro?" },
    { title: "Último paso", subtitle: "Déjanos tu nombre y correo para ver tu resumen personalizado." },
  ],
  en: [
    { title: "Let's start with your profile", subtitle: "Quick answers to fine-tune your AI assistant." },
    { title: "Your markets", subtitle: "Which markets do you trade? Select all that interest you." },
    { title: "Your goal", subtitle: "What do you want to achieve with Vettro?" },
    { title: "Last step", subtitle: "Leave your name and email to see your personalised summary." },
  ],
  de: [
    { title: "Beginnen wir mit deinem Profil", subtitle: "Kurze Antworten, um deinen KI-Assistenten abzustimmen." },
    { title: "Deine Märkte", subtitle: "Auf welchen Märkten tradest du? Wähle alle aus, die dich interessieren." },
    { title: "Dein Ziel", subtitle: "Was möchtest du mit Vettro erreichen?" },
    { title: "Letzter Schritt", subtitle: "Hinterlasse uns Namen und E-Mail, um deine persönliche Zusammenfassung zu sehen." },
  ],
  ar: [
    { title: "لنبدأ بملفك", subtitle: "إجابات سريعة لضبط مساعدك بالذكاء الاصطناعي." },
    { title: "أسواقك", subtitle: "في أي الأسواق تتداول؟ اختر كل ما يهمّك." },
    { title: "هدفك", subtitle: "ما الذي تريد تحقيقه مع Vettro؟" },
    { title: "الخطوة الأخيرة", subtitle: "اترك لنا اسمك وبريدك الإلكتروني لترى ملخصك المخصّص." },
  ],
};

const FORM_COPY = {
  it: {
    errName: "Inserisci il tuo nome.",
    errLastName: "Inserisci il tuo cognome.",
    errEmail: "Inserisci un indirizzo e-mail valido.",
    errEmailTypo: "Intendevi {email}?",
    errEmailDisposable: "Gli indirizzi e-mail temporanei non sono accettati: usa la tua e-mail personale.",
    errEmailFake: "Inserisci il tuo vero indirizzo e-mail.",
    errEmailDomain: "Questo dominio e-mail non esiste: controlla l'indirizzo.",
    errPhone: "Inserisci un numero di cellulare valido.",
    errPhoneLetters: "Il numero di telefono può contenere solo cifre.",
    errPhoneCountry: "Sono accettati solo numeri italiani (+39), spagnoli (+34), britannici (+44), tedeschi (+49) o sauditi (+966).",
    errPhoneShort: "Il numero di telefono è troppo corto.",
    errPhoneLong: "Il numero di telefono è troppo lungo.",
    errPhoneLandline: "Sembra un numero fisso: inserisci un numero di cellulare.",
    errConsent: "Per continuare è necessario il consenso al trattamento dei dati.",
    errDuplicate: "Risulti già registrato: abbiamo già ricevuto una richiesta con questi dati.",
    errGeneric: "Registrazione non riuscita. Controlla i dati e riprova.",
    stepLabel: (n: number) => `IL TUO PROFILO · PASSO ${n} DI 4`,
    qExperience: "Qual è il tuo livello di esperienza?",
    qMarkets: "Su quali mercati tradi?",
    qGoal: "Qual è il tuo obiettivo principale?",
    name: "Nome",
    lastName: "Cognome",
    email: "La tua email",
    phone: "Numero di cellulare",
    phoneCountry: "Prefisso",
    phName: "Luca",
    phLastName: "Bianchi",
    phEmail: "nome@email.it",
    consentBefore: "Acconsento a che i miei dati vengano condivisi con un partner, che potrà contattarmi in merito al servizio, come descritto nella",
    consentAfter: ". Nessuna carta richiesta.",
    back: "← Indietro",
    fourAnswers: "Bastano 4 risposte per iniziare.",
    next: "Continua →",
    submitting: "Creazione…",
    submit: "Vedi il mio riepilogo →",
  },
  es: {
    errName: "Introduce tu nombre.",
    errLastName: "Introduce tu apellido.",
    errEmail: "Introduce un correo electrónico válido.",
    errEmailTypo: "¿Querías decir {email}?",
    errEmailDisposable: "No se aceptan direcciones de correo temporales: usa tu correo personal.",
    errEmailFake: "Introduce tu dirección de correo real.",
    errEmailDomain: "Este dominio de correo no existe: revisa la dirección.",
    errPhone: "Introduce un número de móvil válido.",
    errPhoneLetters: "El número de teléfono solo puede contener cifras.",
    errPhoneCountry: "Solo se aceptan números italianos (+39), españoles (+34), británicos (+44), alemanes (+49) o saudíes (+966).",
    errPhoneShort: "El número de teléfono es demasiado corto.",
    errPhoneLong: "El número de teléfono es demasiado largo.",
    errPhoneLandline: "Parece un número fijo: introduce un número de móvil.",
    errConsent: "Para continuar es necesario el consentimiento para el tratamiento de los datos.",
    errDuplicate: "Ya estás registrado: hemos recibido una solicitud con estos datos.",
    errGeneric: "No se ha podido completar el registro. Revisa los datos e inténtalo de nuevo.",
    stepLabel: (n: number) => `TU PERFIL · PASO ${n} DE 4`,
    qExperience: "¿Cuál es tu nivel de experiencia?",
    qMarkets: "¿En qué mercados operas?",
    qGoal: "¿Cuál es tu objetivo principal?",
    name: "Nombre",
    lastName: "Apellido",
    email: "Tu correo electrónico",
    phone: "Número de móvil",
    phoneCountry: "Prefijo",
    phName: "Carlos",
    phLastName: "García",
    phEmail: "nombre@email.es",
    consentBefore: "Acepto que mis datos se compartan con un socio, que podrá contactarme en relación con el servicio, tal como se describe en la",
    consentAfter: ". No se requiere tarjeta.",
    back: "← Atrás",
    fourAnswers: "Bastan 4 respuestas para empezar.",
    next: "Continuar →",
    submitting: "Creando…",
    submit: "Ver mi resumen →",
  },
  en: {
    errName: "Please enter your first name.",
    errLastName: "Please enter your last name.",
    errEmail: "Please enter a valid email address.",
    errEmailTypo: "Did you mean {email}?",
    errEmailDisposable: "Temporary email addresses aren't accepted: please use your personal email.",
    errEmailFake: "Please enter your real email address.",
    errEmailDomain: "This email domain doesn't exist: please check the address.",
    errPhone: "Please enter a valid mobile number.",
    errPhoneLetters: "The phone number can only contain digits.",
    errPhoneCountry: "Only Italian (+39), Spanish (+34), UK (+44), German (+49) or Saudi (+966) numbers are accepted.",
    errPhoneShort: "The phone number is too short.",
    errPhoneLong: "The phone number is too long.",
    errPhoneLandline: "This looks like a landline: please enter a mobile number.",
    errConsent: "To continue, please consent to the processing of your data.",
    errDuplicate: "You're already registered: we've already received a request with these details.",
    errGeneric: "Registration failed. Please check your details and try again.",
    stepLabel: (n: number) => `YOUR PROFILE · STEP ${n} OF 4`,
    qExperience: "What's your level of experience?",
    qMarkets: "Which markets do you trade?",
    qGoal: "What's your main goal?",
    name: "First name",
    lastName: "Last name",
    email: "Your email",
    phone: "Mobile number",
    phoneCountry: "Country code",
    phName: "John",
    phLastName: "Smith",
    phEmail: "name@email.com",
    consentBefore: "I agree that my data may be shared with a partner, who may contact me about the service, as described in the",
    consentAfter: ". No card required.",
    back: "← Back",
    fourAnswers: "Just 4 answers to get started.",
    next: "Continue →",
    submitting: "Creating…",
    submit: "See my summary →",
  },
  de: {
    errName: "Bitte gib deinen Vornamen ein.",
    errLastName: "Bitte gib deinen Nachnamen ein.",
    errEmail: "Bitte gib eine gültige E-Mail-Adresse ein.",
    errEmailTypo: "Meintest du {email}?",
    errEmailDisposable: "Temporäre E-Mail-Adressen werden nicht akzeptiert: Bitte verwende deine persönliche E-Mail-Adresse.",
    errEmailFake: "Bitte gib deine echte E-Mail-Adresse ein.",
    errEmailDomain: "Diese E-Mail-Domain existiert nicht: Bitte überprüfe die Adresse.",
    errPhone: "Bitte gib eine gültige Mobilnummer ein.",
    errPhoneLetters: "Die Telefonnummer darf nur Ziffern enthalten.",
    errPhoneCountry: "Es werden nur italienische (+39), spanische (+34), britische (+44), deutsche (+49) oder saudische (+966) Nummern akzeptiert.",
    errPhoneShort: "Die Telefonnummer ist zu kurz.",
    errPhoneLong: "Die Telefonnummer ist zu lang.",
    errPhoneLandline: "Das sieht nach einer Festnetznummer aus: Bitte gib eine Mobilnummer ein.",
    errConsent: "Um fortzufahren, stimme bitte der Verarbeitung deiner Daten zu.",
    errDuplicate: "Du bist bereits registriert: Wir haben bereits eine Anfrage mit diesen Daten erhalten.",
    errGeneric: "Die Registrierung ist fehlgeschlagen. Bitte überprüfe deine Angaben und versuche es erneut.",
    stepLabel: (n: number) => `DEIN PROFIL · SCHRITT ${n} VON 4`,
    qExperience: "Wie viel Erfahrung hast du?",
    qMarkets: "Auf welchen Märkten tradest du?",
    qGoal: "Was ist dein Hauptziel?",
    name: "Vorname",
    lastName: "Nachname",
    email: "Deine E-Mail",
    phone: "Mobilnummer",
    phoneCountry: "Ländervorwahl",
    phName: "Max",
    phLastName: "Mustermann",
    phEmail: "name@email.com",
    consentBefore: "Ich bin damit einverstanden, dass meine Daten an einen Partner weitergegeben werden, der mich bezüglich des Dienstes kontaktieren kann, wie beschrieben in der",
    consentAfter: ". Keine Kreditkarte erforderlich.",
    back: "← Zurück",
    fourAnswers: "Nur 4 Antworten, um loszulegen.",
    next: "Weiter →",
    submitting: "Wird erstellt…",
    submit: "Meine Zusammenfassung ansehen →",
  },
  ar: {
    errName: "يُرجى إدخال اسمك الأول.",
    errLastName: "يُرجى إدخال اسم العائلة.",
    errEmail: "يُرجى إدخال عنوان بريد إلكتروني صالح.",
    errEmailTypo: "هل تقصد {email}؟",
    errEmailDisposable: "لا تُقبل عناوين البريد الإلكتروني المؤقتة: يُرجى استخدام بريدك الإلكتروني الشخصي.",
    errEmailFake: "يُرجى إدخال عنوان بريدك الإلكتروني الحقيقي.",
    errEmailDomain: "نطاق البريد الإلكتروني هذا غير موجود: يُرجى التحقق من العنوان.",
    errPhone: "يُرجى إدخال رقم جوال صالح.",
    errPhoneLetters: "يجب أن يحتوي رقم الهاتف على أرقام فقط.",
    errPhoneCountry: "تُقبل فقط الأرقام الإيطالية (+39) أو الإسبانية (+34) أو البريطانية (+44) أو الألمانية (+49) أو السعودية (+966).",
    errPhoneShort: "رقم الهاتف قصير جدًا.",
    errPhoneLong: "رقم الهاتف طويل جدًا.",
    errPhoneLandline: "يبدو هذا رقمًا أرضيًا: يُرجى إدخال رقم جوال.",
    errConsent: "للمتابعة، يُرجى الموافقة على معالجة بياناتك.",
    errDuplicate: "أنت مسجّل بالفعل: لقد تلقّينا طلبًا بهذه البيانات مسبقًا.",
    errGeneric: "تعذّر التسجيل. يُرجى التحقق من بياناتك والمحاولة مرة أخرى.",
    stepLabel: (n: number) => `ملفك · الخطوة ${n} من 4`,
    qExperience: "ما مستوى خبرتك؟",
    qMarkets: "في أي الأسواق تتداول؟",
    qGoal: "ما هدفك الرئيسي؟",
    name: "الاسم الأول",
    lastName: "اسم العائلة",
    email: "بريدك الإلكتروني",
    phone: "رقم الجوال",
    phoneCountry: "رمز الدولة",
    phName: "محمد",
    phLastName: "العتيبي",
    phEmail: "name@email.com",
    consentBefore: "أوافق على مشاركة بياناتي مع شريك قد يتواصل معي بشأن الخدمة، كما هو موضّح في",
    consentAfter: ". لا حاجة إلى بطاقة.",
    back: "→ رجوع",
    fourAnswers: "4 إجابات فقط للبدء.",
    next: "متابعة ←",
    submitting: "جارٍ الإنشاء…",
    submit: "اعرض ملخصي ←",
  },
};

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
  const [emailSuggestion, setEmailSuggestion] = useState("");
  const [typoShownFor, setTypoShownFor] = useState("");
  const country = useRouteContext({ from: "__root__", select: (ctx) => ctx.country });
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState<FormError | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const lang = useLang();
  const f = FORM_COPY[lang];
  const [phoneCountry, setPhoneCountry] = useState<PhoneCountry>(() =>
    defaultPhoneCountry(country, lang),
  );
  const [phoneCountryTouched, setPhoneCountryTouched] = useState(false);
  // Follow a language switch until the visitor picks a prefix themselves.
  useEffect(() => {
    if (!phoneCountryTouched) setPhoneCountry(defaultPhoneCountry(country, lang));
  }, [country, lang, phoneCountryTouched]);
  const copy = STEP_COPY[lang][step] ?? STEP_COPY[lang][0];

  useEffect(() => {
    rememberClickId();
  }, []);

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
      setError("errName");
      return;
    }
    if (lastName.trim().length < 2) {
      setError("errLastName");
      return;
    }
    const emailCheck = checkEmail(email);
    // A suggested typo fix is shown once; submitting the same address again keeps it.
    if (!emailCheck.ok && !(emailCheck.reason === "typo" && typoShownFor === email.trim())) {
      if (emailCheck.reason === "typo") {
        setTypoShownFor(email.trim());
        setEmailSuggestion(emailCheck.suggestion);
      }
      setError(EMAIL_ERROR[emailCheck.reason]);
      return;
    }
    const phoneCheck = checkPhone(phone, phoneCountry);
    if (!phoneCheck.ok) {
      setError(PHONE_ERROR[phoneCheck.reason]);
      return;
    }
    if (!consent) {
      setError("errConsent");
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
      const res = await submitLeadFn({ data: { ...input, clickId: getClickId(), phoneCountry } });
      if (!res.ok) {
        setError(
          res.reason === "phone"
            ? PHONE_ERROR[res.phoneReason]
            : res.reason === "email"
              ? EMAIL_ERROR[res.emailReason]
              : "errDuplicate",
        );
        setSubmitting(false);
        return;
      }
      // Leave submitting on so the button stays disabled while the browser navigates.
      window.location.assign(res.autologinUrl);
    } catch {
      setError("errGeneric");
      setSubmitting(false);
    }
  }

  return (
    <section id="registrazione" className="py-20 border-t border-border scroll-mt-6">
      <div className="max-w-2xl mx-auto rounded-3xl p-8 lg:p-10 ring-1 ring-border bg-card shadow-xl shadow-foreground/5">
        <span className="text-xs font-medium text-brand tracking-wide font-mono">
          {f.stepLabel(step + 1)}
        </span>
        <h2 className="text-balance text-3xl font-semibold mt-3">
          <span key={step}>{copy.title}</span>
        </h2>
        <p className="text-pretty text-muted-foreground mt-2 max-w-[46ch]">
          <span key={step}>{copy.subtitle}</span>
        </p>

        {step === 0 && (
          <div className="mt-6">
            <p className="text-sm font-medium">{f.qExperience}</p>
            <div className="grid sm:grid-cols-3 gap-3 mt-3">
              {experienceOptions(lang).map((opt) => (
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
            <p className="text-sm font-medium">{f.qMarkets}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {marketOptions(lang).map((opt) => (
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
            <p className="text-sm font-medium">{f.qGoal}</p>
            <div className="grid sm:grid-cols-2 gap-3 mt-3">
              {goalOptions(lang).map((opt) => (
                <Button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    setGoal(opt.value);
                    setError(null);
                  }}
                  className={`text-sm py-3 px-4 rounded-xl ring-1 text-start font-medium transition-colors ${
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
                  {f.name}
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
                  placeholder={f.phName}
                  className="mt-2 w-full rounded-xl bg-muted ring-1 ring-border px-4 py-3 text-sm outline-none focus:ring-brand/50 transition-shadow"
                />
              </div>
              <div>
                <label htmlFor="vettro-lastname" className="text-sm font-medium">
                  {f.lastName}
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
                  placeholder={f.phLastName}
                  className="mt-2 w-full rounded-xl bg-muted ring-1 ring-border px-4 py-3 text-sm outline-none focus:ring-brand/50 transition-shadow"
                />
              </div>
            </div>
            <div>
              <label htmlFor="vettro-email" className="text-sm font-medium">
                {f.email}
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
                placeholder={f.phEmail}
                className="mt-2 w-full rounded-xl bg-muted ring-1 ring-border px-4 py-3 text-sm outline-none focus:ring-brand/50 transition-shadow"
              />
            </div>
            <div>
              <label htmlFor="vettro-phone" className="text-sm font-medium">
                {f.phone}
              </label>
              <div className="mt-2 flex gap-2">
                <select
                  aria-label={f.phoneCountry}
                  dir="ltr"
                  value={phoneCountry}
                  onChange={(e) => {
                    setPhoneCountry(e.target.value as PhoneCountry);
                    setPhoneCountryTouched(true);
                    setError(null);
                  }}
                  className="shrink-0 rounded-xl bg-muted ring-1 ring-border px-3 py-3 text-sm outline-none focus:ring-brand/50 transition-shadow"
                >
                  {PHONE_COUNTRIES.map((c) => (
                    <option key={c} value={c}>
                      {PHONE_LABELS[c]}
                    </option>
                  ))}
                </select>
                <input
                  id="vettro-phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel-national"
                  maxLength={20}
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    setError(null);
                  }}
                  placeholder={PHONE_PLACEHOLDERS[phoneCountry]}
                  dir="ltr"
                  className="min-w-0 flex-1 rounded-xl bg-muted ring-1 ring-border px-4 py-3 text-sm outline-none focus:ring-brand/50 transition-shadow"
                />
              </div>
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
                {f.consentBefore}{" "}
                <Link to="/privacy" className="underline hover:text-foreground">
                  {PRIVACY_TITLE[lang]}
                </Link>
                {f.consentAfter}
              </span>
            </label>
          </div>
        )}

        {error === "errEmailTypo" ? (
          <p className="mt-4 text-sm text-destructive">
            {f.errEmailTypo.split("{email}")[0]}
            <button
              type="button"
              className="font-semibold underline"
              onClick={() => {
                setEmail(emailSuggestion);
                setError(null);
              }}
            >
              {emailSuggestion}
            </button>
            {f.errEmailTypo.split("{email}")[1]}
          </p>
        ) : (
          error && <p className="mt-4 text-sm text-destructive">{f[error]}</p>
        )}

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
              {f.back}
            </Button>
          ) : (
            <p className="text-xs text-muted-foreground">{f.fourAnswers}</p>
          )}
          {step < 3 ? (
            <Button
              type="button"
              disabled={!canContinue}
              onClick={() => setStep((s) => s + 1)}
              className="text-sm py-3 px-6 rounded-xl bg-brand text-background font-medium ring-1 ring-brand/60 hover:bg-brand/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {f.next}
            </Button>
          ) : (
            <Button
              type="button"
              disabled={submitting}
              onClick={submit}
              className="text-sm py-3 px-6 rounded-xl bg-brand text-background font-medium ring-1 ring-brand/60 hover:bg-brand/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <span key={String(submitting)}>
                {submitting ? f.submitting : f.submit}
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
