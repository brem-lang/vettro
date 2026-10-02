import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal-page";

export const Route = createFileRoute("/cookie-policy")({
  head: () => ({
    meta: [
      { title: "Cookie Policy — Vettro" },
      { name: "description", content: "Informazioni sui cookie e sulle tecnologie utilizzate dal sito Vettro." },
      { property: "og:title", content: "Cookie Policy — Vettro" },
      { property: "og:description", content: "Come Vettro utilizza cookie e tecnologie analoghe." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://trade-bot-italia.lovable.app/cookie-policy" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "https://trade-bot-italia.lovable.app/cookie-policy" }],
  }),
  component: CookiePage,
});

function CookiePage() {
  return (
    <LegalPage title="Cookie Policy" intro="Questa pagina spiega cosa sono i cookie e quali tecnologie possono essere utilizzate durante la navigazione su Vettro.">
      <section><h2>1. Cosa sono i cookie</h2><p>I cookie sono piccoli file salvati dal browser. Possono permettere il funzionamento di una pagina, mantenere una sessione, ricordare preferenze o raccogliere informazioni aggregate sull’utilizzo del sito.</p></section>
      <section><h2>2. Cookie strettamente necessari</h2><p>Vettro può utilizzare tecnologie indispensabili per sicurezza, instradamento delle richieste, prevenzione degli abusi e corretto funzionamento del modulo. Queste tecnologie non richiedono consenso quando sono strettamente necessarie.</p></section>
      <section><h2>3. Analisi e marketing</h2><p>Al momento questa informativa non dichiara strumenti facoltativi di profilazione o pubblicità. Se verranno introdotti, saranno elencati qui e, quando richiesto, attivati soltanto dopo la scelta dell’utente tramite un sistema di consenso.</p></section>
      <section><h2>4. Gestione dal browser</h2><p>Puoi eliminare o bloccare i cookie dalle impostazioni del browser. Il blocco delle tecnologie necessarie può impedire ad alcune funzioni del sito di operare correttamente.</p></section>
      <section><h2>5. Durata</h2><p>I cookie di sessione scadono normalmente alla chiusura del browser; quelli persistenti rimangono per il periodo indicato dal relativo fornitore o finché non vengono rimossi. Le durate effettive dovranno essere aggiornate qualora siano aggiunti nuovi strumenti.</p></section>
      <section><h2>6. Aggiornamenti e contatti</h2><p>La presente Cookie Policy sarà aggiornata in caso di modifiche alle tecnologie usate. Le modalità di contatto ufficiali verranno pubblicate su questa pagina.</p></section>
    </LegalPage>
  );
}