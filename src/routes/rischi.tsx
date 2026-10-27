import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, type LegalContent } from "@/components/legal-page";
import type { Lang } from "@/lib/i18n";

const META = {
  it: { title: "Informativa sui rischi — Vettro", description: "Rischi importanti da conoscere prima di assumere decisioni di trading o investimento.", og: "Informazioni essenziali sui rischi del trading e sui limiti degli strumenti AI." },
  es: { title: "Aviso de riesgos — Vettro", description: "Riesgos importantes que conviene conocer antes de tomar decisiones de trading o inversión.", og: "Información esencial sobre los riesgos del trading y los límites de las herramientas de IA." },
  en: { title: "Risk disclosure — Vettro", description: "Important risks to understand before making trading or investment decisions.", og: "Essential information on the risks of trading and the limits of AI tools." },
} satisfies Record<Lang, Record<string, string>>;

export const Route = createFileRoute("/rischi")({
  head: ({ match }) => {
    const m = META[match.context.lang];
    return {
      meta: [
        { title: m.title },
        { name: "description", content: m.description },
        { property: "og:title", content: m.title },
        { property: "og:description", content: m.og },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://trade-bot-italia.lovable.app/rischi" },
        { name: "twitter:card", content: "summary" },
      ],
      links: [{ rel: "canonical", href: "https://trade-bot-italia.lovable.app/rischi" }],
    };
  },
  component: RiskPage,
});

const CONTENT: Record<Lang, LegalContent> = {
  it: {
    title: "Informativa sui rischi",
    intro: "Prima di fare trading è importante comprendere che ogni operazione comporta incertezza e che nessuno strumento può garantire un risultato.",
    body: (
      <>
        <section><h2>1. Possibile perdita del capitale</h2><p>Il valore degli strumenti finanziari può aumentare o diminuire rapidamente. Puoi perdere una parte o la totalità del capitale investito. Non utilizzare denaro necessario per spese essenziali e valuta sempre la tua capacità di sostenere una perdita.</p></section>
        <section><h2>2. Leva e volatilità</h2><p>Prodotti con leva, valute, cripto-attività e derivati possono amplificare sia guadagni sia perdite. Variazioni ridotte del mercato possono produrre effetti rilevanti, richieste di margine o chiusure automatiche.</p></section>
        <section><h2>3. Limiti dell’intelligenza artificiale</h2><p>Un sistema AI può usare informazioni incomplete, datate o errate e può interpretare male condizioni eccezionali. I risultati dipendono dai dati e dalle ipotesi disponibili. L’AI non conosce necessariamente la tua situazione personale e non può prevedere il mercato con certezza.</p></section>
        <section><h2>4. Nessuna consulenza</h2><p>I contenuti, il questionario e il riepilogo di Vettro sono generali e informativi. Non rappresentano una raccomandazione personalizzata, un’offerta, una sollecitazione o un invito ad acquistare o vendere strumenti finanziari.</p></section>
        <section><h2>5. Rischi operativi</h2><p>Interruzioni di rete, ritardi, errori di prezzo, problemi tecnici, attacchi informatici o indisponibilità dei servizi di terzi possono impedire o alterare l’accesso alle informazioni.</p></section>
        <section><h2>6. Risultati passati e simulazioni</h2><p>I risultati passati non sono indicativi di quelli futuri. Simulazioni, esempi e dati ipotetici non riflettono necessariamente condizioni reali, costi, liquidità, fiscalità o comportamento dell’utente.</p></section>
        <section><h2>7. Responsabilità personale</h2><p>Sei responsabile delle tue decisioni. Prima di operare, informati sulle caratteristiche del prodotto, sui costi e sul trattamento fiscale; valuta di consultare un professionista autorizzato e indipendente.</p></section>
      </>
    ),
  },
  es: {
    title: "Aviso de riesgos",
    intro: "Antes de operar es importante entender que cada operación conlleva incertidumbre y que ninguna herramienta puede garantizar un resultado.",
    body: (
      <>
        <section><h2>1. Posible pérdida del capital</h2><p>El valor de los instrumentos financieros puede subir o bajar rápidamente. Puedes perder una parte o la totalidad del capital invertido. No utilices dinero necesario para gastos esenciales y valora siempre tu capacidad de asumir una pérdida.</p></section>
        <section><h2>2. Apalancamiento y volatilidad</h2><p>Los productos apalancados, las divisas, los criptoactivos y los derivados pueden amplificar tanto las ganancias como las pérdidas. Pequeñas variaciones del mercado pueden tener efectos importantes, provocar llamadas de margen o cierres automáticos.</p></section>
        <section><h2>3. Límites de la inteligencia artificial</h2><p>Un sistema de IA puede usar información incompleta, desactualizada o errónea y puede interpretar mal condiciones excepcionales. Los resultados dependen de los datos y las hipótesis disponibles. La IA no conoce necesariamente tu situación personal y no puede predecir el mercado con certeza.</p></section>
        <section><h2>4. Sin asesoramiento</h2><p>Los contenidos, el cuestionario y el resumen de Vettro son generales e informativos. No constituyen una recomendación personalizada, una oferta, una solicitud ni una invitación a comprar o vender instrumentos financieros.</p></section>
        <section><h2>5. Riesgos operativos</h2><p>Las interrupciones de red, los retrasos, los errores de precio, los problemas técnicos, los ciberataques o la indisponibilidad de servicios de terceros pueden impedir o alterar el acceso a la información.</p></section>
        <section><h2>6. Resultados pasados y simulaciones</h2><p>Los resultados pasados no son indicativos de los futuros. Las simulaciones, los ejemplos y los datos hipotéticos no reflejan necesariamente condiciones reales, costes, liquidez, fiscalidad ni el comportamiento del usuario.</p></section>
        <section><h2>7. Responsabilidad personal</h2><p>Eres responsable de tus decisiones. Antes de operar, infórmate sobre las características del producto, los costes y el tratamiento fiscal; plantéate consultar a un profesional autorizado e independiente.</p></section>
      </>
    ),
  },
  en: {
    title: "Risk disclosure",
    intro: "Before trading, it's important to understand that every trade involves uncertainty and that no tool can guarantee an outcome.",
    body: (
      <>
        <section><h2>1. Possible loss of capital</h2><p>The value of financial instruments can rise or fall quickly. You can lose part or all of the capital you invest. Don't use money you need for essential expenses, and always consider your ability to bear a loss.</p></section>
        <section><h2>2. Leverage and volatility</h2><p>Leveraged products, currencies, crypto-assets and derivatives can amplify both gains and losses. Small market moves can have significant effects, margin calls or automatic close-outs.</p></section>
        <section><h2>3. Limits of artificial intelligence</h2><p>An AI system may use incomplete, outdated or incorrect information and may misread exceptional conditions. Results depend on the data and assumptions available. AI does not necessarily know your personal situation and cannot predict the market with certainty.</p></section>
        <section><h2>4. No advice</h2><p>Vettro's content, questionnaire and summary are general and informational. They are not a personal recommendation, an offer, a solicitation or an invitation to buy or sell financial instruments.</p></section>
        <section><h2>5. Operational risks</h2><p>Network outages, delays, pricing errors, technical problems, cyberattacks or unavailable third-party services can prevent or distort access to information.</p></section>
        <section><h2>6. Past results and simulations</h2><p>Past results are not indicative of future results. Simulations, examples and hypothetical data do not necessarily reflect real conditions, costs, liquidity, taxation or user behaviour.</p></section>
        <section><h2>7. Personal responsibility</h2><p>You are responsible for your decisions. Before trading, learn about the product's features, costs and tax treatment, and consider consulting an authorised, independent professional.</p></section>
      </>
    ),
  },
};

function RiskPage() {
  return <LegalPage content={CONTENT} />;
}
