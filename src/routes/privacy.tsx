import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal-page";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Vettro" },
      { name: "description", content: "Informazioni sul trattamento dei dati personali raccolti da Vettro." },
      { property: "og:title", content: "Privacy Policy — Vettro" },
      { property: "og:description", content: "Come Vettro raccoglie, utilizza e protegge i dati personali." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://trade-bot-italia.lovable.app/privacy" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "https://trade-bot-italia.lovable.app/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" intro="Questa informativa descrive quali dati raccogliamo attraverso Vettro, perché li utilizziamo e quali scelte puoi esercitare.">
      <section><h2>1. Titolare e contatti</h2><p>Il servizio è presentato con il marchio Vettro. I dati identificativi completi del titolare del trattamento e il recapito privacy ufficiale verranno pubblicati prima dell’uso commerciale del sito.</p></section>
      <section><h2>2. Dati raccolti</h2><p>Quando completi il questionario raccogliamo nome, cognome, indirizzo email, numero di telefono e le risposte relative a esperienza, mercati di interesse e obiettivo. Possiamo inoltre ricevere dati tecnici essenziali alla sicurezza e al funzionamento del sito.</p></section>
      <section><h2>3. Finalità del trattamento</h2><ul><li>registrare la richiesta e mostrare il riepilogo personalizzato;</li><li>rispondere alle richieste dell’utente;</li><li>proteggere il sito da abusi e malfunzionamenti;</li><li>adempiere a obblighi di legge.</li></ul><p>Eventuali comunicazioni promozionali richiedono un consenso separato quando previsto dalla legge.</p></section>
      <section><h2>4. Base giuridica</h2><p>Il trattamento è fondato sull’esecuzione della richiesta dell’utente, sul consenso ove richiesto, sugli obblighi legali e sul legittimo interesse alla sicurezza del servizio.</p></section>
      <section><h2>5. Conservazione e condivisione</h2><p>I dati sono conservati per il tempo necessario alle finalità dichiarate e agli obblighi applicabili. Possono essere trattati da fornitori tecnici incaricati, esclusivamente per erogare e proteggere il servizio, oppure comunicati quando richiesto dalla legge. Non vendiamo i dati personali.</p></section>
      <section><h2>6. Trasferimenti</h2><p>Qualora un fornitore tratti dati fuori dallo Spazio Economico Europeo, saranno utilizzate le garanzie previste dalla normativa applicabile, incluse ove necessarie le clausole contrattuali standard.</p></section>
      <section><h2>7. I tuoi diritti</h2><p>Puoi chiedere accesso, rettifica, cancellazione, limitazione, portabilità o opposizione al trattamento, e revocare un consenso senza pregiudicare i trattamenti già svolti. Puoi inoltre presentare reclamo al Garante per la protezione dei dati personali.</p></section>
      <section><h2>8. Minori</h2><p>Vettro non è destinato a minori e non raccoglie consapevolmente dati di persone che non possono utilizzare legalmente servizi finanziari o di trading.</p></section>
      <section><h2>9. Aggiornamenti</h2><p>Questa informativa può essere aggiornata per riflettere modifiche del servizio o della normativa. La data più recente è indicata in cima alla pagina.</p></section>
    </LegalPage>
  );
}