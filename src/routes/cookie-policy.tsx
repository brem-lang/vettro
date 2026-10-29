import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, type LegalContent } from "@/components/legal-page";
import type { Lang } from "@/lib/i18n";

const META = {
  it: { title: "Cookie Policy — Vettro", description: "Informazioni sui cookie e sulle tecnologie utilizzate dal sito Vettro.", og: "Come Vettro utilizza cookie e tecnologie analoghe." },
  es: { title: "Política de Cookies — Vettro", description: "Información sobre las cookies y las tecnologías que utiliza el sitio de Vettro.", og: "Cómo utiliza Vettro las cookies y tecnologías similares." },
  en: { title: "Cookie Policy — Vettro", description: "Information about the cookies and technologies used by the Vettro site.", og: "How Vettro uses cookies and similar technologies." },
  de: { title: "Cookie-Richtlinie — Vettro", description: "Informationen zu den Cookies und Technologien, die die Vettro-Website verwendet.", og: "Wie Vettro Cookies und ähnliche Technologien verwendet." },
  ar: { title: "سياسة ملفات تعريف الارتباط — Vettro", description: "معلومات حول ملفات تعريف الارتباط والتقنيات التي يستخدمها موقع Vettro.", og: "كيف يستخدم Vettro ملفات تعريف الارتباط والتقنيات المشابهة." },
} satisfies Record<Lang, Record<string, string>>;

export const Route = createFileRoute("/cookie-policy")({
  head: ({ match }) => {
    const m = META[match.context.lang];
    return {
      meta: [
        { title: m.title },
        { name: "description", content: m.description },
        { property: "og:title", content: m.title },
        { property: "og:description", content: m.og },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://trade-bot-italia.lovable.app/cookie-policy" },
        { name: "twitter:card", content: "summary" },
      ],
      links: [{ rel: "canonical", href: "https://trade-bot-italia.lovable.app/cookie-policy" }],
    };
  },
  component: CookiePage,
});

const CONTENT: Record<Lang, LegalContent> = {
  it: {
    title: "Cookie Policy",
    intro: "Questa pagina spiega cosa sono i cookie e quali tecnologie possono essere utilizzate durante la navigazione su Vettro.",
    body: (
      <>
        <section><h2>1. Cosa sono i cookie</h2><p>I cookie sono piccoli file salvati dal browser. Possono permettere il funzionamento di una pagina, mantenere una sessione, ricordare preferenze o raccogliere informazioni aggregate sull’utilizzo del sito.</p></section>
        <section><h2>2. Cookie strettamente necessari</h2><p>Vettro può utilizzare tecnologie indispensabili per sicurezza, instradamento delle richieste, prevenzione degli abusi e corretto funzionamento del modulo. Queste tecnologie non richiedono consenso quando sono strettamente necessarie. Tra queste rientra il cookie di sessione <code>site_lang_s</code>, che ricorda la lingua scelta fino alla chiusura del browser.</p></section>
        <section><h2>3. Analisi e marketing</h2><p>Al momento questa informativa non dichiara strumenti facoltativi di profilazione o pubblicità. Se verranno introdotti, saranno elencati qui e, quando richiesto, attivati soltanto dopo la scelta dell’utente tramite un sistema di consenso.</p></section>
        <section><h2>4. Gestione dal browser</h2><p>Puoi eliminare o bloccare i cookie dalle impostazioni del browser. Il blocco delle tecnologie necessarie può impedire ad alcune funzioni del sito di operare correttamente.</p></section>
        <section><h2>5. Durata</h2><p>I cookie di sessione scadono normalmente alla chiusura del browser; quelli persistenti rimangono per il periodo indicato dal relativo fornitore o finché non vengono rimossi. Le durate effettive dovranno essere aggiornate qualora siano aggiunti nuovi strumenti.</p></section>
        <section><h2>6. Aggiornamenti e contatti</h2><p>La presente Cookie Policy sarà aggiornata in caso di modifiche alle tecnologie usate. Le modalità di contatto ufficiali verranno pubblicate su questa pagina.</p></section>
      </>
    ),
  },
  es: {
    title: "Política de Cookies",
    intro: "Esta página explica qué son las cookies y qué tecnologías pueden utilizarse durante la navegación en Vettro.",
    body: (
      <>
        <section><h2>1. Qué son las cookies</h2><p>Las cookies son pequeños archivos que guarda el navegador. Pueden permitir el funcionamiento de una página, mantener una sesión, recordar preferencias o recopilar información agregada sobre el uso del sitio.</p></section>
        <section><h2>2. Cookies estrictamente necesarias</h2><p>Vettro puede utilizar tecnologías imprescindibles para la seguridad, el enrutamiento de las solicitudes, la prevención de abusos y el correcto funcionamiento del formulario. Estas tecnologías no requieren consentimiento cuando son estrictamente necesarias. Entre ellas está la cookie de sesión <code>site_lang_s</code>, que recuerda el idioma elegido hasta que se cierra el navegador.</p></section>
        <section><h2>3. Análisis y marketing</h2><p>Por ahora esta política no declara herramientas opcionales de elaboración de perfiles ni de publicidad. Si se introducen, se enumerarán aquí y, cuando sea necesario, solo se activarán tras la elección del usuario mediante un sistema de consentimiento.</p></section>
        <section><h2>4. Gestión desde el navegador</h2><p>Puedes eliminar o bloquear las cookies desde la configuración del navegador. Bloquear las tecnologías necesarias puede impedir que algunas funciones del sitio funcionen correctamente.</p></section>
        <section><h2>5. Duración</h2><p>Las cookies de sesión suelen caducar al cerrar el navegador; las persistentes permanecen durante el periodo indicado por el proveedor correspondiente o hasta que se eliminan. Las duraciones reales deberán actualizarse si se añaden nuevas herramientas.</p></section>
        <section><h2>6. Actualizaciones y contacto</h2><p>Esta Política de Cookies se actualizará si cambian las tecnologías utilizadas. Los medios de contacto oficiales se publicarán en esta página.</p></section>
      </>
    ),
  },
  en: {
    title: "Cookie Policy",
    intro: "This page explains what cookies are and which technologies may be used while you browse Vettro.",
    body: (
      <>
        <section><h2>1. What cookies are</h2><p>Cookies are small files saved by your browser. They can make a page work, keep a session open, remember preferences or collect aggregate information about how the site is used.</p></section>
        <section><h2>2. Strictly necessary cookies</h2><p>Vettro may use technologies essential for security, request routing, abuse prevention and the proper working of the form. These technologies do not require consent when they are strictly necessary. They include the <code>site_lang_s</code> session cookie, which remembers your chosen language until you close your browser.</p></section>
        <section><h2>3. Analytics and marketing</h2><p>This policy does not currently declare any optional profiling or advertising tools. If any are introduced, they will be listed here and, where required, only activated after the user chooses through a consent system.</p></section>
        <section><h2>4. Managing cookies in your browser</h2><p>You can delete or block cookies in your browser settings. Blocking necessary technologies may stop some site features from working properly.</p></section>
        <section><h2>5. Duration</h2><p>Session cookies normally expire when you close your browser; persistent cookies remain for the period set by the provider or until they are removed. Actual durations will need updating if new tools are added.</p></section>
        <section><h2>6. Updates and contact</h2><p>This Cookie Policy will be updated if the technologies used change. Official contact details will be published on this page.</p></section>
      </>
    ),
  },
  de: {
    title: "Cookie-Richtlinie",
    intro: "Diese Seite erklärt, was Cookies sind und welche Technologien beim Besuch von Vettro verwendet werden können.",
    body: (
      <>
        <section><h2>1. Was Cookies sind</h2><p>Cookies sind kleine Dateien, die dein Browser speichert. Sie können eine Seite funktionsfähig machen, eine Sitzung offen halten, Einstellungen speichern oder zusammengefasste Informationen über die Nutzung der Website erfassen.</p></section>
        <section><h2>2. Unbedingt erforderliche Cookies</h2><p>Vettro kann Technologien verwenden, die für Sicherheit, die Weiterleitung von Anfragen, die Missbrauchsverhinderung und das ordnungsgemäße Funktionieren des Formulars unerlässlich sind. Diese Technologien erfordern keine Einwilligung, wenn sie unbedingt erforderlich sind. Dazu gehört das Sitzungs-Cookie <code>site_lang_s</code>, das deine gewählte Sprache speichert, bis du den Browser schließt.</p></section>
        <section><h2>3. Analyse und Marketing</h2><p>Diese Richtlinie nennt derzeit keine optionalen Profiling- oder Werbewerkzeuge. Sollten solche eingeführt werden, werden sie hier aufgeführt und, sofern erforderlich, erst nach der Entscheidung des Nutzers über ein Einwilligungssystem aktiviert.</p></section>
        <section><h2>4. Cookies im Browser verwalten</h2><p>Du kannst Cookies in den Einstellungen deines Browsers löschen oder blockieren. Das Blockieren notwendiger Technologien kann dazu führen, dass einige Funktionen der Website nicht richtig funktionieren.</p></section>
        <section><h2>5. Speicherdauer</h2><p>Sitzungs-Cookies laufen in der Regel ab, wenn du den Browser schließt; dauerhafte Cookies bleiben für den vom Anbieter festgelegten Zeitraum oder bis zu ihrer Löschung bestehen. Die tatsächlichen Speicherdauern müssen aktualisiert werden, wenn neue Werkzeuge hinzukommen.</p></section>
        <section><h2>6. Aktualisierungen und Kontakt</h2><p>Diese Cookie-Richtlinie wird aktualisiert, wenn sich die verwendeten Technologien ändern. Offizielle Kontaktdaten werden auf dieser Seite veröffentlicht.</p></section>
      </>
    ),
  },
  ar: {
    title: "سياسة ملفات تعريف الارتباط",
    intro: "توضّح هذه الصفحة ماهية ملفات تعريف الارتباط والتقنيات التي قد تُستخدم أثناء تصفّحك لموقع Vettro.",
    body: (
      <>
        <section><h2>1. ما هي ملفات تعريف الارتباط</h2><p>ملفات تعريف الارتباط (الكوكيز) ملفات صغيرة يحفظها متصفّحك. يمكنها أن تجعل الصفحة تعمل، أو تُبقي الجلسة مفتوحة، أو تتذكّر تفضيلاتك، أو تجمع معلومات إجمالية عن كيفية استخدام الموقع.</p></section>
        <section><h2>2. ملفات تعريف الارتباط الضرورية للغاية</h2><p>قد يستخدم Vettro تقنيات ضرورية للأمان وتوجيه الطلبات ومنع إساءة الاستخدام وحسن عمل النموذج. ولا تتطلّب هذه التقنيات موافقة عندما تكون ضرورية للغاية. ومن بينها ملف الجلسة <code>site_lang_s</code> الذي يتذكّر اللغة التي اخترتها حتى تغلق المتصفّح.</p></section>
        <section><h2>3. التحليلات والتسويق</h2><p>لا تذكر هذه السياسة حاليًا أي أدوات اختيارية للتنميط أو الإعلان. وإذا أُضيفت أي أدوات من هذا النوع، فستُدرج هنا، ولن تُفعَّل، حيثما يلزم، إلا بعد أن يختار المستخدم عبر نظام للموافقة.</p></section>
        <section><h2>4. إدارة ملفات تعريف الارتباط في متصفّحك</h2><p>يمكنك حذف ملفات تعريف الارتباط أو حظرها من إعدادات متصفّحك. وقد يؤدي حظر التقنيات الضرورية إلى توقّف بعض ميزات الموقع عن العمل بشكل صحيح.</p></section>
        <section><h2>5. المدة</h2><p>تنتهي ملفات تعريف الارتباط الخاصة بالجلسة عادةً عند إغلاق المتصفّح؛ أما الملفات الدائمة فتبقى للمدة التي يحدّدها المزوّد أو حتى حذفها. وسيتعيّن تحديث المدد الفعلية إذا أُضيفت أدوات جديدة.</p></section>
        <section><h2>6. التحديثات والتواصل</h2><p>سيتم تحديث سياسة ملفات تعريف الارتباط هذه إذا تغيّرت التقنيات المستخدمة. وستُنشر بيانات التواصل الرسمية على هذه الصفحة.</p></section>
      </>
    ),
  },
};

function CookiePage() {
  return <LegalPage content={CONTENT} />;
}
