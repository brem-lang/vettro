export type Experience = "principiante" | "intermedio" | "avanzato";
export type Market = "azioni" | "forex" | "cripto" | "materie_prime" | "indici";
export type Goal = "profitti" | "protezione" | "apprendimento" | "automazione";

export const experienceOptions: { value: Experience; label: string }[] = [
  { value: "principiante", label: "Principiante" },
  { value: "intermedio", label: "Intermedio" },
  { value: "avanzato", label: "Avanzato" },
];

export const marketOptions: { value: Market; label: string }[] = [
  { value: "azioni", label: "Azioni" },
  { value: "forex", label: "Forex" },
  { value: "cripto", label: "Cripto" },
  { value: "materie_prime", label: "Materie prime" },
  { value: "indici", label: "Indici" },
];

export const goalOptions: { value: Goal; label: string }[] = [
  { value: "profitti", label: "Massimizzare i profitti" },
  { value: "protezione", label: "Proteggere il capitale" },
  { value: "apprendimento", label: "Apprendere e migliorare" },
  { value: "automazione", label: "Automatizzare le operazioni" },
];

export const experienceLabels: Record<Experience, string> = {
  principiante: "Principiante",
  intermedio: "Intermedio",
  avanzato: "Avanzato",
};

export const marketLabels: Record<Market, string> = {
  azioni: "Azioni",
  forex: "Forex",
  cripto: "Cripto",
  materie_prime: "Materie prime",
  indici: "Indici",
};

export const goalLabels: Record<Goal, string> = {
  profitti: "Massimizzare i profitti",
  protezione: "Proteggere il capitale",
  apprendimento: "Apprendere e migliorare",
  automazione: "Automatizzare le operazioni",
};

export function suggestedStrategy(goal: Goal, experience: Experience): string {
  if (goal === "profitti") {
    if (experience === "avanzato") return "Swing AI aggressivo";
    if (experience === "intermedio") return "Swing AI bilanciato";
    return "Swing AI guidato";
  }
  if (goal === "protezione") return "Capitale Protetto AI";
  if (goal === "apprendimento") return "Percorso Accademia Vettro";
  return experience === "principiante" ? "Automazione assistita" : "Automazione completa AI";
}

export function riskProfile(experience: Experience): string {
  if (experience === "principiante") return "Prudente";
  if (experience === "intermedio") return "Media";
  return "Alta";
}
