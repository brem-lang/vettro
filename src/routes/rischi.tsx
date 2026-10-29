import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, type LegalContent } from "@/components/legal-page";
import type { Lang } from "@/lib/i18n";

const META = {
  it: { title: "Informativa sui rischi — Vettro", description: "Rischi importanti da conoscere prima di assumere decisioni di trading o investimento.", og: "Informazioni essenziali sui rischi del trading e sui limiti degli strumenti AI." },
  es: { title: "Aviso de riesgos — Vettro", description: "Riesgos importantes que conviene conocer antes de tomar decisiones de trading o inversión.", og: "Información esencial sobre los riesgos del trading y los límites de las herramientas de IA." },
  en: { title: "Risk disclosure — Vettro", description: "Important risks to understand before making trading or investment decisions.", og: "Essential information on the risks of trading and the limits of AI tools." },
  de: { title: "Risikohinweis — Vettro", description: "Wichtige Risiken, die du kennen solltest, bevor du Trading- oder Anlageentscheidungen triffst.", og: "Wesentliche Informationen zu den Risiken des Tradings und den Grenzen von KI-Werkzeugen." },
  ar: { title: "بيان المخاطر — Vettro", description: "مخاطر مهمة يجب معرفتها قبل اتخاذ قرارات التداول أو الاستثمار.", og: "معلومات أساسية حول مخاطر التداول وحدود أدوات الذكاء الاصطناعي." },
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
  de: {
    title: "Risikohinweis",
    intro: "Bevor du tradest, ist es wichtig zu verstehen, dass jede Transaktion mit Unsicherheit verbunden ist und kein Werkzeug ein Ergebnis garantieren kann.",
    body: (
      <>
        <section><h2>1. Möglicher Kapitalverlust</h2><p>Der Wert von Finanzinstrumenten kann schnell steigen oder fallen. Du kannst einen Teil oder das gesamte investierte Kapital verlieren. Verwende kein Geld, das du für notwendige Ausgaben brauchst, und prüfe stets, ob du einen Verlust tragen kannst.</p></section>
        <section><h2>2. Hebel und Volatilität</h2><p>Gehebelte Produkte, Währungen, Krypto-Assets und Derivate können sowohl Gewinne als auch Verluste verstärken. Kleine Marktbewegungen können erhebliche Auswirkungen, Nachschussforderungen oder automatische Schließungen auslösen.</p></section>
        <section><h2>3. Grenzen der künstlichen Intelligenz</h2><p>Ein KI-System kann unvollständige, veraltete oder fehlerhafte Informationen verwenden und außergewöhnliche Bedingungen falsch einschätzen. Die Ergebnisse hängen von den verfügbaren Daten und Annahmen ab. Die KI kennt deine persönliche Situation nicht unbedingt und kann den Markt nicht mit Sicherheit vorhersagen.</p></section>
        <section><h2>4. Keine Beratung</h2><p>Die Inhalte, der Fragebogen und die Zusammenfassung von Vettro sind allgemein und informativ. Sie stellen keine persönliche Empfehlung, kein Angebot, keine Aufforderung und keine Einladung zum Kauf oder Verkauf von Finanzinstrumenten dar.</p></section>
        <section><h2>5. Operative Risiken</h2><p>Netzwerkausfälle, Verzögerungen, Preisfehler, technische Probleme, Cyberangriffe oder nicht verfügbare Dienste Dritter können den Zugang zu Informationen verhindern oder verfälschen.</p></section>
        <section><h2>6. Frühere Ergebnisse und Simulationen</h2><p>Frühere Ergebnisse sind kein Hinweis auf zukünftige Ergebnisse. Simulationen, Beispiele und hypothetische Daten spiegeln nicht unbedingt reale Bedingungen, Kosten, Liquidität, Besteuerung oder das Verhalten der Nutzer wider.</p></section>
        <section><h2>7. Eigenverantwortung</h2><p>Du bist für deine Entscheidungen verantwortlich. Informiere dich vor dem Handel über die Merkmale, Kosten und steuerliche Behandlung des Produkts und ziehe in Betracht, eine zugelassene, unabhängige Fachperson zu konsultieren.</p></section>
      </>
    ),
  },
  ar: {
    title: "بيان المخاطر",
    intro: "قبل التداول، من المهم أن تدرك أن كل صفقة تنطوي على عدم يقين وأنه لا توجد أداة يمكنها ضمان نتيجة.",
    body: (
      <>
        <section><h2>1. احتمال خسارة رأس المال</h2><p>يمكن أن ترتفع قيمة الأدوات المالية أو تنخفض بسرعة. قد تخسر جزءًا من رأس المال المستثمر أو كله. لا تستخدم أموالًا تحتاجها للنفقات الأساسية، وقيّم دائمًا قدرتك على تحمّل الخسارة.</p></section>
        <section><h2>2. الرافعة المالية والتقلّب</h2><p>يمكن للمنتجات ذات الرافعة المالية والعملات والأصول المشفّرة والمشتقات أن تضخّم الأرباح والخسائر على حدّ سواء. وقد تؤدي تحركات السوق الصغيرة إلى آثار كبيرة أو طلبات تغطية للهامش أو إغلاقات تلقائية.</p></section>
        <section><h2>3. حدود الذكاء الاصطناعي</h2><p>قد يستخدم نظام الذكاء الاصطناعي معلومات ناقصة أو قديمة أو خاطئة، وقد يسيء تفسير الظروف الاستثنائية. تعتمد النتائج على البيانات والافتراضات المتاحة. ولا يعرف الذكاء الاصطناعي بالضرورة وضعك الشخصي، ولا يمكنه التنبؤ بالسوق بيقين.</p></section>
        <section><h2>4. لا استشارات</h2><p>محتوى Vettro والاستبيان والملخص عامة وذات طابع معلوماتي. ولا تمثّل توصية شخصية أو عرضًا أو التماسًا أو دعوة لشراء الأدوات المالية أو بيعها.</p></section>
        <section><h2>5. المخاطر التشغيلية</h2><p>قد تؤدي انقطاعات الشبكة أو التأخيرات أو أخطاء الأسعار أو المشكلات التقنية أو الهجمات الإلكترونية أو عدم توفّر خدمات الأطراف الثالثة إلى منع الوصول إلى المعلومات أو تشويهه.</p></section>
        <section><h2>6. النتائج السابقة والمحاكاة</h2><p>النتائج السابقة ليست مؤشرًا على النتائج المستقبلية. ولا تعكس المحاكاة والأمثلة والبيانات الافتراضية بالضرورة الظروف الحقيقية أو التكاليف أو السيولة أو الضرائب أو سلوك المستخدم.</p></section>
        <section><h2>7. المسؤولية الشخصية</h2><p>أنت مسؤول عن قراراتك. قبل التداول، اطّلع على خصائص المنتج وتكاليفه ومعاملته الضريبية، وفكّر في استشارة مختص مرخّص ومستقل.</p></section>
      </>
    ),
  },
};

function RiskPage() {
  return <LegalPage content={CONTENT} />;
}
