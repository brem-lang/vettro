import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, type LegalContent } from "@/components/legal-page";
import type { Lang } from "@/lib/i18n";

const META = {
  it: { title: "Termini e condizioni — Vettro", description: "Condizioni di utilizzo del sito e dei contenuti informativi Vettro.", og: "Le regole che disciplinano l’utilizzo di Vettro." },
  es: { title: "Términos y condiciones — Vettro", description: "Condiciones de uso del sitio y de los contenidos informativos de Vettro.", og: "Las normas que regulan el uso de Vettro." },
  en: { title: "Terms and conditions — Vettro", description: "Terms of use for the Vettro site and its informational content.", og: "The rules that govern the use of Vettro." },
} satisfies Record<Lang, Record<string, string>>;

export const Route = createFileRoute("/termini")({
  head: ({ match }) => {
    const m = META[match.context.lang];
    return {
      meta: [
        { title: m.title },
        { name: "description", content: m.description },
        { property: "og:title", content: m.title },
        { property: "og:description", content: m.og },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://trade-bot-italia.lovable.app/termini" },
        { name: "twitter:card", content: "summary" },
      ],
      links: [{ rel: "canonical", href: "https://trade-bot-italia.lovable.app/termini" }],
    };
  },
  component: TermsPage,
});

const CONTENT: Record<Lang, LegalContent> = {
  it: {
    title: "Termini e condizioni",
    intro: "Utilizzando Vettro accetti le condizioni riportate in questa pagina. Leggile attentamente prima di inviare i tuoi dati.",
    body: (
      <>
        <section><h2>1. Ambito del servizio</h2><p>Vettro propone contenuti informativi e un questionario orientativo sull’analisi dei mercati e la gestione del rischio. Il servizio non costituisce consulenza finanziaria, fiscale, legale o di investimento e non sostituisce una valutazione professionale.</p></section>
        <section><h2>2. Nessuna garanzia di rendimento</h2><p>Mercati e strumenti finanziari possono generare perdite anche totali. Vettro non promette profitti, risultati, precisione delle previsioni o eliminazione del rischio. Esempi, profili e percorsi suggeriti hanno esclusivamente finalità illustrative.</p></section>
        <section><h2>3. Requisiti dell’utente</h2><p>Devi avere la capacità legale necessaria per utilizzare il sito nel tuo Paese. Sei responsabile dell’esattezza dei dati forniti e delle decisioni assunte sulla base delle informazioni consultate.</p></section>
        <section><h2>4. Uso consentito</h2><p>Non puoi utilizzare il sito per attività illegali, tentare di comprometterne sicurezza o disponibilità, raccogliere dati senza autorizzazione, impersonare altre persone o riprodurre i contenuti in modo ingannevole.</p></section>
        <section><h2>5. Proprietà intellettuale</h2><p>Marchio, testi, grafica e materiali di Vettro sono protetti dalle norme applicabili. È consentito l’uso personale del sito; ogni sfruttamento commerciale richiede autorizzazione scritta.</p></section>
        <section><h2>6. Disponibilità e responsabilità</h2><p>Il servizio può essere modificato, sospeso o interrotto. Nei limiti consentiti dalla legge, Vettro non risponde di perdite derivanti da decisioni finanziarie dell’utente, indisponibilità temporanee, dati di mercato incompleti o contenuti di terzi.</p></section>
        <section><h2>7. Collegamenti e servizi di terzi</h2><p>Eventuali servizi esterni operano secondo condizioni proprie. La presenza di un collegamento non implica approvazione, controllo o garanzia da parte di Vettro.</p></section>
        <section><h2>8. Modifiche</h2><p>Le condizioni possono essere aggiornate. Continuando a utilizzare il sito dopo la pubblicazione delle modifiche, accetti la versione aggiornata nei limiti consentiti dalla legge.</p></section>
        <section><h2>9. Legge applicabile</h2><p>Le condizioni sono interpretate secondo la normativa applicabile al gestore del servizio e senza limitare i diritti inderogabili riconosciuti ai consumatori. I dati completi del gestore e il foro competente devono essere inseriti prima dell’uso commerciale.</p></section>
      </>
    ),
  },
  es: {
    title: "Términos y condiciones",
    intro: "Al utilizar Vettro aceptas las condiciones de esta página. Léelas atentamente antes de enviar tus datos.",
    body: (
      <>
        <section><h2>1. Alcance del servicio</h2><p>Vettro ofrece contenidos informativos y un cuestionario orientativo sobre el análisis de los mercados y la gestión del riesgo. El servicio no constituye asesoramiento financiero, fiscal, jurídico ni de inversión y no sustituye una valoración profesional.</p></section>
        <section><h2>2. Sin garantía de rentabilidad</h2><p>Los mercados y los instrumentos financieros pueden generar pérdidas, incluso totales. Vettro no promete beneficios, resultados, precisión en las previsiones ni la eliminación del riesgo. Los ejemplos, perfiles y rutas sugeridas tienen fines exclusivamente ilustrativos.</p></section>
        <section><h2>3. Requisitos del usuario</h2><p>Debes tener la capacidad legal necesaria para utilizar el sitio en tu país. Eres responsable de la exactitud de los datos facilitados y de las decisiones tomadas a partir de la información consultada.</p></section>
        <section><h2>4. Uso permitido</h2><p>No puedes utilizar el sitio para actividades ilegales, intentar comprometer su seguridad o disponibilidad, recopilar datos sin autorización, suplantar a otras personas ni reproducir los contenidos de forma engañosa.</p></section>
        <section><h2>5. Propiedad intelectual</h2><p>La marca, los textos, el diseño gráfico y los materiales de Vettro están protegidos por las normas aplicables. Se permite el uso personal del sitio; cualquier explotación comercial requiere autorización por escrito.</p></section>
        <section><h2>6. Disponibilidad y responsabilidad</h2><p>El servicio puede modificarse, suspenderse o interrumpirse. En la medida en que lo permita la ley, Vettro no responde de pérdidas derivadas de decisiones financieras del usuario, indisponibilidades temporales, datos de mercado incompletos o contenidos de terceros.</p></section>
        <section><h2>7. Enlaces y servicios de terceros</h2><p>Los servicios externos funcionan según sus propias condiciones. La presencia de un enlace no implica aprobación, control ni garantía por parte de Vettro.</p></section>
        <section><h2>8. Modificaciones</h2><p>Las condiciones pueden actualizarse. Si sigues utilizando el sitio tras la publicación de los cambios, aceptas la versión actualizada en la medida en que lo permita la ley.</p></section>
        <section><h2>9. Ley aplicable</h2><p>Las condiciones se interpretan conforme a la normativa aplicable al gestor del servicio y sin limitar los derechos irrenunciables reconocidos a los consumidores. Los datos completos del gestor y el fuero competente deben incluirse antes del uso comercial.</p></section>
      </>
    ),
  },
  en: {
    title: "Terms and conditions",
    intro: "By using Vettro you accept the terms on this page. Please read them carefully before submitting your details.",
    body: (
      <>
        <section><h2>1. Scope of the service</h2><p>Vettro offers informational content and an indicative questionnaire on market analysis and risk management. The service does not constitute financial, tax, legal or investment advice and does not replace a professional assessment.</p></section>
        <section><h2>2. No guarantee of returns</h2><p>Markets and financial instruments can generate losses, including total losses. Vettro does not promise profits, results, accurate forecasts or the elimination of risk. Examples, profiles and suggested paths are for illustration only.</p></section>
        <section><h2>3. User requirements</h2><p>You must have the legal capacity required to use the site in your country. You are responsible for the accuracy of the data you provide and for decisions you make based on the information you consult.</p></section>
        <section><h2>4. Permitted use</h2><p>You may not use the site for illegal activities, attempt to compromise its security or availability, collect data without authorisation, impersonate others or reproduce content in a misleading way.</p></section>
        <section><h2>5. Intellectual property</h2><p>The Vettro brand, text, graphics and materials are protected by applicable law. Personal use of the site is allowed; any commercial use requires written permission.</p></section>
        <section><h2>6. Availability and liability</h2><p>The service may be changed, suspended or discontinued. To the extent permitted by law, Vettro is not liable for losses arising from users' financial decisions, temporary unavailability, incomplete market data or third-party content.</p></section>
        <section><h2>7. Third-party links and services</h2><p>External services operate under their own terms. A link does not imply approval, control or guarantee by Vettro.</p></section>
        <section><h2>8. Changes</h2><p>These terms may be updated. By continuing to use the site after changes are published, you accept the updated version to the extent permitted by law.</p></section>
        <section><h2>9. Governing law</h2><p>These terms are interpreted under the law applicable to the service operator, without limiting the mandatory rights granted to consumers. The operator's full details and the competent court must be added before commercial use.</p></section>
      </>
    ),
  },
};

function TermsPage() {
  return <LegalPage content={CONTENT} />;
}
