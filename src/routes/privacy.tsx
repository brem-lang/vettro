import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, type LegalContent } from "@/components/legal-page";
import type { Lang } from "@/lib/i18n";

const META = {
  it: { title: "Privacy Policy — Vettro", description: "Informazioni sul trattamento dei dati personali raccolti da Vettro.", og: "Come Vettro raccoglie, utilizza e protegge i dati personali." },
  es: { title: "Política de Privacidad — Vettro", description: "Información sobre el tratamiento de los datos personales recopilados por Vettro.", og: "Cómo Vettro recopila, utiliza y protege los datos personales." },
  en: { title: "Privacy Policy — Vettro", description: "Information about how Vettro processes the personal data it collects.", og: "How Vettro collects, uses and protects personal data." },
  de: { title: "Datenschutzerklärung — Vettro", description: "Informationen darüber, wie Vettro die erhobenen personenbezogenen Daten verarbeitet.", og: "Wie Vettro personenbezogene Daten erhebt, verwendet und schützt." },
  ar: { title: "سياسة الخصوصية — Vettro", description: "معلومات حول كيفية معالجة Vettro للبيانات الشخصية التي يجمعها.", og: "كيف يجمع Vettro البيانات الشخصية ويستخدمها ويحميها." },
} satisfies Record<Lang, Record<string, string>>;

export const Route = createFileRoute("/privacy")({
  head: ({ match }) => {
    const m = META[match.context.lang];
    return {
      meta: [
        { title: m.title },
        { name: "description", content: m.description },
        { property: "og:title", content: m.title },
        { property: "og:description", content: m.og },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://trade-bot-italia.lovable.app/privacy" },
        { name: "twitter:card", content: "summary" },
      ],
      links: [{ rel: "canonical", href: "https://trade-bot-italia.lovable.app/privacy" }],
    };
  },
  component: PrivacyPage,
});

const CONTENT: Record<Lang, LegalContent> = {
  it: {
    title: "Privacy Policy",
    intro: "Questa informativa descrive quali dati raccogliamo attraverso Vettro, perché li utilizziamo e quali scelte puoi esercitare.",
    body: (
      <>
        <section><h2>1. Titolare e contatti</h2><p>Il servizio è presentato con il marchio Vettro. I dati identificativi completi del titolare del trattamento e il recapito privacy ufficiale verranno pubblicati prima dell’uso commerciale del sito.</p></section>
        <section><h2>2. Dati raccolti</h2><p>Quando completi il questionario raccogliamo nome, cognome, indirizzo email, numero di telefono e le risposte relative a esperienza, mercati di interesse e obiettivo. Possiamo inoltre ricevere dati tecnici essenziali alla sicurezza e al funzionamento del sito.</p></section>
        <section><h2>3. Finalità del trattamento</h2><ul><li>registrare la richiesta e mostrare il riepilogo personalizzato;</li><li>rispondere alle richieste dell’utente;</li><li>proteggere il sito da abusi e malfunzionamenti;</li><li>adempiere a obblighi di legge.</li></ul><p>Eventuali comunicazioni promozionali richiedono un consenso separato quando previsto dalla legge.</p></section>
        <section><h2>4. Base giuridica</h2><p>Il trattamento è fondato sull’esecuzione della richiesta dell’utente, sul consenso ove richiesto, sugli obblighi legali e sul legittimo interesse alla sicurezza del servizio.</p></section>
        <section><h2>5. Conservazione e condivisione</h2><p>I dati sono conservati per il tempo necessario alle finalità dichiarate e agli obblighi applicabili. Possono essere trattati da fornitori tecnici incaricati, esclusivamente per erogare e proteggere il servizio, oppure comunicati quando richiesto dalla legge. Non vendiamo i dati personali.</p></section>
        <section><h2>6. Trasferimenti</h2><p>Qualora un fornitore tratti dati fuori dallo Spazio Economico Europeo, saranno utilizzate le garanzie previste dalla normativa applicabile, incluse ove necessarie le clausole contrattuali standard.</p></section>
        <section><h2>7. I tuoi diritti</h2><p>Puoi chiedere accesso, rettifica, cancellazione, limitazione, portabilità o opposizione al trattamento, e revocare un consenso senza pregiudicare i trattamenti già svolti. Puoi inoltre presentare reclamo al Garante per la protezione dei dati personali.</p></section>
        <section><h2>8. Minori</h2><p>Vettro non è destinato a minori e non raccoglie consapevolmente dati di persone che non possono utilizzare legalmente servizi finanziari o di trading.</p></section>
        <section><h2>9. Aggiornamenti</h2><p>Questa informativa può essere aggiornata per riflettere modifiche del servizio o della normativa. La data più recente è indicata in cima alla pagina.</p></section>
      </>
    ),
  },
  es: {
    title: "Política de Privacidad",
    intro: "Esta política describe qué datos recopilamos a través de Vettro, por qué los utilizamos y qué opciones puedes ejercer.",
    body: (
      <>
        <section><h2>1. Responsable y contacto</h2><p>El servicio se presenta bajo la marca Vettro. Los datos identificativos completos del responsable del tratamiento y el contacto oficial de privacidad se publicarán antes del uso comercial del sitio.</p></section>
        <section><h2>2. Datos recopilados</h2><p>Cuando completas el cuestionario recopilamos nombre, apellido, correo electrónico, número de teléfono y las respuestas sobre experiencia, mercados de interés y objetivo. También podemos recibir datos técnicos esenciales para la seguridad y el funcionamiento del sitio.</p></section>
        <section><h2>3. Finalidades del tratamiento</h2><ul><li>registrar la solicitud y mostrar el resumen personalizado;</li><li>responder a las solicitudes del usuario;</li><li>proteger el sitio frente a abusos y fallos;</li><li>cumplir obligaciones legales.</li></ul><p>Las posibles comunicaciones promocionales requieren un consentimiento separado cuando así lo exija la ley.</p></section>
        <section><h2>4. Base jurídica</h2><p>El tratamiento se basa en la ejecución de la solicitud del usuario, en el consentimiento cuando sea necesario, en las obligaciones legales y en el interés legítimo en la seguridad del servicio.</p></section>
        <section><h2>5. Conservación y comunicación</h2><p>Los datos se conservan durante el tiempo necesario para las finalidades declaradas y las obligaciones aplicables. Pueden ser tratados por proveedores técnicos designados, exclusivamente para prestar y proteger el servicio, o comunicarse cuando lo exija la ley. No vendemos datos personales.</p></section>
        <section><h2>6. Transferencias</h2><p>Si un proveedor trata datos fuera del Espacio Económico Europeo, se utilizarán las garantías previstas por la normativa aplicable, incluidas, cuando sea necesario, las cláusulas contractuales tipo.</p></section>
        <section><h2>7. Tus derechos</h2><p>Puedes solicitar el acceso, la rectificación, la supresión, la limitación, la portabilidad o la oposición al tratamiento, y retirar un consentimiento sin que ello afecte a los tratamientos ya realizados. También puedes presentar una reclamación ante la autoridad de protección de datos competente.</p></section>
        <section><h2>8. Menores</h2><p>Vettro no está destinado a menores y no recopila conscientemente datos de personas que no puedan utilizar legalmente servicios financieros o de trading.</p></section>
        <section><h2>9. Actualizaciones</h2><p>Esta política puede actualizarse para reflejar cambios en el servicio o en la normativa. La fecha más reciente se indica al principio de la página.</p></section>
      </>
    ),
  },
  en: {
    title: "Privacy Policy",
    intro: "This policy describes what data we collect through Vettro, why we use it and the choices you can make.",
    body: (
      <>
        <section><h2>1. Controller and contact</h2><p>The service is presented under the Vettro brand. The full identifying details of the data controller and the official privacy contact will be published before the site is used commercially.</p></section>
        <section><h2>2. Data collected</h2><p>When you complete the questionnaire we collect your first name, last name, email address, phone number and your answers about experience, markets of interest and goal. We may also receive technical data essential to the site's security and operation.</p></section>
        <section><h2>3. Purposes of processing</h2><ul><li>to record your request and show your personalised summary;</li><li>to respond to user requests;</li><li>to protect the site from abuse and malfunctions;</li><li>to meet legal obligations.</li></ul><p>Any promotional communications require separate consent where the law requires it.</p></section>
        <section><h2>4. Legal basis</h2><p>Processing is based on carrying out the user's request, consent where required, legal obligations and the legitimate interest in keeping the service secure.</p></section>
        <section><h2>5. Retention and sharing</h2><p>Data is kept for as long as needed for the stated purposes and applicable obligations. It may be processed by appointed technical providers solely to deliver and protect the service, or disclosed where required by law. We do not sell personal data.</p></section>
        <section><h2>6. Transfers</h2><p>If a provider processes data outside the European Economic Area, the safeguards required by applicable law will be used, including standard contractual clauses where necessary.</p></section>
        <section><h2>7. Your rights</h2><p>You can request access, rectification, erasure, restriction, portability or object to processing, and withdraw consent without affecting processing already carried out. You can also lodge a complaint with the competent data protection authority.</p></section>
        <section><h2>8. Minors</h2><p>Vettro is not intended for minors and does not knowingly collect data from people who cannot legally use financial or trading services.</p></section>
        <section><h2>9. Updates</h2><p>This policy may be updated to reflect changes to the service or the law. The latest date is shown at the top of the page.</p></section>
      </>
    ),
  },
  de: {
    title: "Datenschutzerklärung",
    intro: "Diese Erklärung beschreibt, welche Daten wir über Vettro erheben, warum wir sie verwenden und welche Wahlmöglichkeiten du hast.",
    body: (
      <>
        <section><h2>1. Verantwortlicher und Kontakt</h2><p>Der Dienst wird unter der Marke Vettro angeboten. Die vollständigen Angaben zum Verantwortlichen und die offizielle Datenschutz-Kontaktadresse werden veröffentlicht, bevor die Website kommerziell genutzt wird.</p></section>
        <section><h2>2. Erhobene Daten</h2><p>Wenn du den Fragebogen ausfüllst, erheben wir deinen Vornamen, Nachnamen, deine E-Mail-Adresse, Telefonnummer sowie deine Antworten zu Erfahrung, interessierenden Märkten und Ziel. Wir können außerdem technische Daten erhalten, die für die Sicherheit und den Betrieb der Website unerlässlich sind.</p></section>
        <section><h2>3. Zwecke der Verarbeitung</h2><ul><li>um deine Anfrage zu erfassen und deine persönliche Zusammenfassung anzuzeigen;</li><li>um auf Anfragen der Nutzer zu antworten;</li><li>um die Website vor Missbrauch und Fehlfunktionen zu schützen;</li><li>um gesetzliche Pflichten zu erfüllen.</li></ul><p>Werbliche Mitteilungen erfordern eine gesonderte Einwilligung, sofern das Gesetz dies vorschreibt.</p></section>
        <section><h2>4. Rechtsgrundlage</h2><p>Die Verarbeitung beruht auf der Durchführung der Anfrage des Nutzers, auf der Einwilligung, sofern erforderlich, auf gesetzlichen Pflichten und auf dem berechtigten Interesse an der Sicherheit des Dienstes.</p></section>
        <section><h2>5. Speicherung und Weitergabe</h2><p>Die Daten werden so lange gespeichert, wie es für die genannten Zwecke und die geltenden Pflichten erforderlich ist. Sie können von beauftragten technischen Dienstleistern ausschließlich zur Bereitstellung und zum Schutz des Dienstes verarbeitet oder offengelegt werden, wenn das Gesetz es verlangt. Wir verkaufen keine personenbezogenen Daten.</p></section>
        <section><h2>6. Übermittlungen</h2><p>Verarbeitet ein Dienstleister Daten außerhalb des Europäischen Wirtschaftsraums, werden die nach geltendem Recht erforderlichen Garantien angewendet, bei Bedarf einschließlich Standardvertragsklauseln.</p></section>
        <section><h2>7. Deine Rechte</h2><p>Du kannst Auskunft, Berichtigung, Löschung, Einschränkung und Datenübertragbarkeit verlangen oder der Verarbeitung widersprechen sowie deine Einwilligung widerrufen, ohne dass die bereits erfolgte Verarbeitung berührt wird. Du kannst außerdem Beschwerde bei der zuständigen Datenschutzbehörde einlegen.</p></section>
        <section><h2>8. Minderjährige</h2><p>Vettro richtet sich nicht an Minderjährige und erhebt wissentlich keine Daten von Personen, die Finanz- oder Tradingdienste rechtlich nicht nutzen dürfen.</p></section>
        <section><h2>9. Aktualisierungen</h2><p>Diese Erklärung kann aktualisiert werden, um Änderungen des Dienstes oder der Rechtslage widerzuspiegeln. Das aktuelle Datum steht oben auf der Seite.</p></section>
      </>
    ),
  },
  ar: {
    title: "سياسة الخصوصية",
    intro: "توضّح هذه السياسة البيانات التي نجمعها عبر Vettro، وسبب استخدامنا لها، والخيارات المتاحة لك.",
    body: (
      <>
        <section><h2>1. المسؤول عن البيانات وجهة التواصل</h2><p>تُقدَّم الخدمة تحت علامة Vettro. وستُنشر البيانات التعريفية الكاملة للمسؤول عن معالجة البيانات وجهة التواصل الرسمية الخاصة بالخصوصية قبل استخدام الموقع تجاريًا.</p></section>
        <section><h2>2. البيانات التي نجمعها</h2><p>عند إكمال الاستبيان نجمع اسمك الأول واسم العائلة وعنوان بريدك الإلكتروني ورقم هاتفك وإجاباتك حول الخبرة والأسواق التي تهمّك والهدف. وقد نتلقّى أيضًا بيانات تقنية ضرورية لأمان الموقع وتشغيله.</p></section>
        <section><h2>3. أغراض المعالجة</h2><ul><li>تسجيل طلبك وعرض ملخصك المخصّص؛</li><li>الردّ على طلبات المستخدمين؛</li><li>حماية الموقع من إساءة الاستخدام والأعطال؛</li><li>الوفاء بالالتزامات القانونية.</li></ul><p>تتطلّب أي رسائل ترويجية موافقة منفصلة حيثما يشترط القانون ذلك.</p></section>
        <section><h2>4. الأساس القانوني</h2><p>تستند المعالجة إلى تنفيذ طلب المستخدم، والموافقة حيثما تلزم، والالتزامات القانونية، والمصلحة المشروعة في الحفاظ على أمان الخدمة.</p></section>
        <section><h2>5. الاحتفاظ والمشاركة</h2><p>تُحفظ البيانات طوال المدة اللازمة للأغراض المذكورة والالتزامات المعمول بها. وقد يعالجها مزوّدون تقنيون معيّنون لغرض تقديم الخدمة وحمايتها فقط، أو يُفصح عنها حيثما يقتضي القانون ذلك. نحن لا نبيع البيانات الشخصية.</p></section>
        <section><h2>6. نقل البيانات</h2><p>إذا عالج أحد المزوّدين البيانات خارج المنطقة الاقتصادية الأوروبية، فستُطبَّق الضمانات التي يشترطها القانون المعمول به، بما في ذلك البنود التعاقدية القياسية عند الضرورة.</p></section>
        <section><h2>7. حقوقك</h2><p>يمكنك طلب الوصول إلى بياناتك أو تصحيحها أو حذفها أو تقييد معالجتها أو نقلها، أو الاعتراض على المعالجة، وسحب موافقتك دون التأثير على المعالجة التي تمّت بالفعل. كما يمكنك تقديم شكوى إلى سلطة حماية البيانات المختصة.</p></section>
        <section><h2>8. القاصرون</h2><p>Vettro غير موجّه للقاصرين، ولا يجمع عن قصد بيانات من أشخاص لا يحق لهم قانونًا استخدام الخدمات المالية أو خدمات التداول.</p></section>
        <section><h2>9. التحديثات</h2><p>قد يتم تحديث هذه السياسة لتعكس التغييرات في الخدمة أو في القانون. ويظهر أحدث تاريخ في أعلى الصفحة.</p></section>
      </>
    ),
  },
};

function PrivacyPage() {
  return <LegalPage content={CONTENT} />;
}
