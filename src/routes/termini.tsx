import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal-page";

export const Route = createFileRoute("/termini")({
  head: () => ({
    meta: [
      { title: "Termini e condizioni — Vettro" },
      { name: "description", content: "Condizioni di utilizzo del sito e dei contenuti informativi Vettro." },
      { property: "og:title", content: "Termini e condizioni — Vettro" },
      { property: "og:description", content: "Le regole che disciplinano l’utilizzo di Vettro." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://trade-bot-italia.lovable.app/termini" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "https://trade-bot-italia.lovable.app/termini" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <LegalPage title="Termini e condizioni" intro="Utilizzando Vettro accetti le condizioni riportate in questa pagina. Leggile attentamente prima di inviare i tuoi dati.">
      <section><h2>1. Ambito del servizio</h2><p>Vettro propone contenuti informativi e un questionario orientativo sull’analisi dei mercati e la gestione del rischio. Il servizio non costituisce consulenza finanziaria, fiscale, legale o di investimento e non sostituisce una valutazione professionale.</p></section>
      <section><h2>2. Nessuna garanzia di rendimento</h2><p>Mercati e strumenti finanziari possono generare perdite anche totali. Vettro non promette profitti, risultati, precisione delle previsioni o eliminazione del rischio. Esempi, profili e percorsi suggeriti hanno esclusivamente finalità illustrative.</p></section>
      <section><h2>3. Requisiti dell’utente</h2><p>Devi avere la capacità legale necessaria per utilizzare il sito nel tuo Paese. Sei responsabile dell’esattezza dei dati forniti e delle decisioni assunte sulla base delle informazioni consultate.</p></section>
      <section><h2>4. Uso consentito</h2><p>Non puoi utilizzare il sito per attività illegali, tentare di comprometterne sicurezza o disponibilità, raccogliere dati senza autorizzazione, impersonare altre persone o riprodurre i contenuti in modo ingannevole.</p></section>
      <section><h2>5. Proprietà intellettuale</h2><p>Marchio, testi, grafica e materiali di Vettro sono protetti dalle norme applicabili. È consentito l’uso personale del sito; ogni sfruttamento commerciale richiede autorizzazione scritta.</p></section>
      <section><h2>6. Disponibilità e responsabilità</h2><p>Il servizio può essere modificato, sospeso o interrotto. Nei limiti consentiti dalla legge, Vettro non risponde di perdite derivanti da decisioni finanziarie dell’utente, indisponibilità temporanee, dati di mercato incompleti o contenuti di terzi.</p></section>
      <section><h2>7. Collegamenti e servizi di terzi</h2><p>Eventuali servizi esterni operano secondo condizioni proprie. La presenza di un collegamento non implica approvazione, controllo o garanzia da parte di Vettro.</p></section>
      <section><h2>8. Modifiche</h2><p>Le condizioni possono essere aggiornate. Continuando a utilizzare il sito dopo la pubblicazione delle modifiche, accetti la versione aggiornata nei limiti consentiti dalla legge.</p></section>
      <section><h2>9. Legge applicabile</h2><p>Le condizioni sono interpretate secondo la normativa applicabile al gestore del servizio e senza limitare i diritti inderogabili riconosciuti ai consumatori. I dati completi del gestore e il foro competente devono essere inseriti prima dell’uso commerciale.</p></section>
    </LegalPage>
  );
}