import type { Lang } from "@/lib/i18n";

export type Experience = "principiante" | "intermedio" | "avanzato";
export type Market = "azioni" | "forex" | "cripto" | "materie_prime" | "indici";
export type Goal = "profitti" | "protezione" | "apprendimento" | "automazione";

// Values are stored with the lead, so they stay Italian; only labels are translated.
export const experienceLabels: Record<Lang, Record<Experience, string>> = {
  it: { principiante: "Principiante", intermedio: "Intermedio", avanzato: "Avanzato" },
  es: { principiante: "Principiante", intermedio: "Intermedio", avanzato: "Avanzado" },
  en: { principiante: "Beginner", intermedio: "Intermediate", avanzato: "Advanced" },
  de: { principiante: "Anfänger", intermedio: "Fortgeschritten", avanzato: "Experte" },
  ar: { principiante: "مبتدئ", intermedio: "متوسط", avanzato: "متقدّم" },
};

export const marketLabels: Record<Lang, Record<Market, string>> = {
  it: {
    azioni: "Azioni",
    forex: "Forex",
    cripto: "Cripto",
    materie_prime: "Materie prime",
    indici: "Indici",
  },
  es: {
    azioni: "Acciones",
    forex: "Forex",
    cripto: "Cripto",
    materie_prime: "Materias primas",
    indici: "Índices",
  },
  en: {
    azioni: "Stocks",
    forex: "Forex",
    cripto: "Crypto",
    materie_prime: "Commodities",
    indici: "Indices",
  },
  de: {
    azioni: "Aktien",
    forex: "Forex",
    cripto: "Krypto",
    materie_prime: "Rohstoffe",
    indici: "Indizes",
  },
  ar: {
    azioni: "الأسهم",
    forex: "الفوركس",
    cripto: "العملات المشفّرة",
    materie_prime: "السلع",
    indici: "المؤشرات",
  },
};

export const goalLabels: Record<Lang, Record<Goal, string>> = {
  it: {
    profitti: "Massimizzare i profitti",
    protezione: "Proteggere il capitale",
    apprendimento: "Apprendere e migliorare",
    automazione: "Automatizzare le operazioni",
  },
  es: {
    profitti: "Maximizar los beneficios",
    protezione: "Proteger el capital",
    apprendimento: "Aprender y mejorar",
    automazione: "Automatizar las operaciones",
  },
  en: {
    profitti: "Maximise profits",
    protezione: "Protect my capital",
    apprendimento: "Learn and improve",
    automazione: "Automate my trades",
  },
  de: {
    profitti: "Gewinne maximieren",
    protezione: "Kapital schützen",
    apprendimento: "Lernen und besser werden",
    automazione: "Trades automatisieren",
  },
  ar: {
    profitti: "تعظيم الأرباح",
    protezione: "حماية رأس المال",
    apprendimento: "التعلّم والتحسّن",
    automazione: "أتمتة صفقاتي",
  },
};

const options = <T extends string>(labels: Record<T, string>) =>
  (Object.keys(labels) as T[]).map((value) => ({ value, label: labels[value] }));

export const experienceOptions = (lang: Lang) => options(experienceLabels[lang]);
export const marketOptions = (lang: Lang) => options(marketLabels[lang]);
export const goalOptions = (lang: Lang) => options(goalLabels[lang]);

type Strategy = "aggressive" | "balanced" | "guided" | "protect" | "academy" | "assisted" | "full";

const STRATEGIES: Record<Lang, Record<Strategy, string>> = {
  it: {
    aggressive: "Swing AI aggressivo",
    balanced: "Swing AI bilanciato",
    guided: "Swing AI guidato",
    protect: "Capitale Protetto AI",
    academy: "Percorso Accademia Vettro",
    assisted: "Automazione assistita",
    full: "Automazione completa AI",
  },
  es: {
    aggressive: "Swing IA agresivo",
    balanced: "Swing IA equilibrado",
    guided: "Swing IA guiado",
    protect: "Capital Protegido IA",
    academy: "Ruta Academia Vettro",
    assisted: "Automatización asistida",
    full: "Automatización completa IA",
  },
  en: {
    aggressive: "Aggressive AI Swing",
    balanced: "Balanced AI Swing",
    guided: "Guided AI Swing",
    protect: "AI Capital Protection",
    academy: "Vettro Academy Path",
    assisted: "Assisted automation",
    full: "Full AI automation",
  },
  de: {
    aggressive: "Aggressives KI-Swing",
    balanced: "Ausgewogenes KI-Swing",
    guided: "Geführtes KI-Swing",
    protect: "KI-Kapitalschutz",
    academy: "Vettro-Akademie-Pfad",
    assisted: "Assistierte Automatisierung",
    full: "Vollständige KI-Automatisierung",
  },
  ar: {
    aggressive: "سوينغ بالذكاء الاصطناعي – جريء",
    balanced: "سوينغ بالذكاء الاصطناعي – متوازن",
    guided: "سوينغ بالذكاء الاصطناعي – موجَّه",
    protect: "حماية رأس المال بالذكاء الاصطناعي",
    academy: "مسار أكاديمية Vettro",
    assisted: "أتمتة مُساعَدة",
    full: "أتمتة كاملة بالذكاء الاصطناعي",
  },
};

export function suggestedStrategy(goal: Goal, experience: Experience, lang: Lang): string {
  const s = STRATEGIES[lang];
  if (goal === "profitti") {
    if (experience === "avanzato") return s.aggressive;
    if (experience === "intermedio") return s.balanced;
    return s.guided;
  }
  if (goal === "protezione") return s.protect;
  if (goal === "apprendimento") return s.academy;
  return experience === "principiante" ? s.assisted : s.full;
}

const RISK: Record<Lang, Record<Experience, string>> = {
  it: { principiante: "Prudente", intermedio: "Media", avanzato: "Alta" },
  es: { principiante: "Prudente", intermedio: "Moderado", avanzato: "Alto" },
  en: { principiante: "Cautious", intermedio: "Moderate", avanzato: "High" },
  de: { principiante: "Vorsichtig", intermedio: "Mittel", avanzato: "Hoch" },
  ar: { principiante: "حذِر", intermedio: "متوسط", avanzato: "مرتفع" },
};

export function riskProfile(experience: Experience, lang: Lang): string {
  return RISK[lang][experience];
}
