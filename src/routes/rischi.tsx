import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal-page";

export const Route = createFileRoute("/rischi")({
  head: () => ({
    meta: [
      { title: "Informativa sui rischi — Vettro" },
      { name: "description", content: "Rischi importanti da conoscere prima di assumere decisioni di trading o investimento." },
      { property: "og:title", content: "Informativa sui rischi — Vettro" },
      { property: "og:description", content: "Informazioni essenziali sui rischi del trading e sui limiti degli strumenti AI." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://trade-bot-italia.lovable.app/rischi" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "https://trade-bot-italia.lovable.app/rischi" }],
  }),
  component: RiskPage,
});

function RiskPage() {
  return (
    <LegalPage title="Informativa sui rischi" intro="Prima di fare trading è importante comprendere che ogni operazione comporta incertezza e che nessuno strumento può garantire un risultato.">
      <section><h2>1. Possibile perdita del capitale</h2><p>Il valore degli strumenti finanziari può aumentare o diminuire rapidamente. Puoi perdere una parte o la totalità del capitale investito. Non utilizzare denaro necessario per spese essenziali e valuta sempre la tua capacità di sostenere una perdita.</p></section>
      <section><h2>2. Leva e volatilità</h2><p>Prodotti con leva, valute, cripto-attività e derivati possono amplificare sia guadagni sia perdite. Variazioni ridotte del mercato possono produrre effetti rilevanti, richieste di margine o chiusure automatiche.</p></section>
      <section><h2>3. Limiti dell’intelligenza artificiale</h2><p>Un sistema AI può usare informazioni incomplete, datate o errate e può interpretare male condizioni eccezionali. I risultati dipendono dai dati e dalle ipotesi disponibili. L’AI non conosce necessariamente la tua situazione personale e non può prevedere il mercato con certezza.</p></section>
      <section><h2>4. Nessuna consulenza</h2><p>I contenuti, il questionario e il riepilogo di Vettro sono generali e informativi. Non rappresentano una raccomandazione personalizzata, un’offerta, una sollecitazione o un invito ad acquistare o vendere strumenti finanziari.</p></section>
      <section><h2>5. Rischi operativi</h2><p>Interruzioni di rete, ritardi, errori di prezzo, problemi tecnici, attacchi informatici o indisponibilità dei servizi di terzi possono impedire o alterare l’accesso alle informazioni.</p></section>
      <section><h2>6. Risultati passati e simulazioni</h2><p>I risultati passati non sono indicativi di quelli futuri. Simulazioni, esempi e dati ipotetici non riflettono necessariamente condizioni reali, costi, liquidità, fiscalità o comportamento dell’utente.</p></section>
      <section><h2>7. Responsabilità personale</h2><p>Sei responsabile delle tue decisioni. Prima di operare, informati sulle caratteristiche del prodotto, sui costi e sul trattamento fiscale; valuta di consultare un professionista autorizzato e indipendente.</p></section>
    </LegalPage>
  );
}