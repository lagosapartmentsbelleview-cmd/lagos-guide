/* ============================================================
   DETEÇÃO DE IDIOMA
============================================================ */
function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

const supportedLangs = ["pt", "en", "es", "fr", "de", "it"];
let lang = getQueryParam("lang") || "pt";
if (!supportedLangs.includes(lang)) lang = "pt";

/* ============================================================
   TÍTULO DA POLÍTICA DE COOKIES
============================================================ */
const cookiePolicyTitle = {
  pt: "Política de Cookies",
  en: "Cookie Policy",
  es: "Política de Cookies",
  fr: "Politique de Cookies",
  de: "Cookie-Richtlinie",
  it: "Politica sui Cookie"
};

/* ============================================================
   TEXTO COMPLETO DA POLÍTICA DE COOKIES (PT + placeholders)
============================================================ */
const cookiePolicyTexts = {
  pt: `
    <h2>1. Introdução</h2>
    <p>Esta Política de Cookies explica o que são cookies, que tipos utilizamos no website e no guia digital da Apartments Belleview Lagos, para que finalidades são utilizados e como o utilizador pode gerir as suas preferências. Esta política deve ser lida em conjunto com a nossa Política de Privacidade.</p>

    <h2>2. O que são Cookies?</h2>
    <p>Cookies são pequenos ficheiros de texto armazenados no dispositivo do utilizador (computador, tablet, smartphone) quando visita um website. Os cookies permitem que o website reconheça o dispositivo do utilizador e recorde determinadas informações sobre as suas preferências ou ações anteriores.</p>

    <h2>3. Tipos de Cookies Utilizados</h2>
    <p>Podemos utilizar os seguintes tipos de cookies:</p>
    <ul>
      <li><strong>Cookies estritamente necessários:</strong> essenciais para o funcionamento do website e para permitir funcionalidades básicas, como a navegação e o acesso a áreas seguras. Sem estes cookies, o website pode não funcionar corretamente.</li>
      <li><strong>Cookies funcionais:</strong> permitem recordar as preferências do utilizador (por exemplo, idioma selecionado), proporcionando uma experiência mais personalizada.</li>
      <li><strong>Cookies analíticos/de desempenho:</strong> recolhem informações sobre a forma como o website é utilizado (por exemplo, páginas mais visitadas, tempo de permanência, erros), ajudando-nos a melhorar o desempenho e a usabilidade.</li>
      <li><strong>Cookies de terceiros:</strong> podem ser definidos por serviços externos integrados no nosso website (por exemplo, mapas, conteúdos incorporados, ferramentas de análise). Estes cookies estão sujeitos às políticas de privacidade dos respetivos terceiros.</li>
    </ul>

    <h2>4. Finalidades dos Cookies</h2>
    <p>Os cookies utilizados no nosso website e guia digital podem ter as seguintes finalidades:</p>
    <ul>
      <li>Garantir o funcionamento técnico e a segurança do website.</li>
      <li>Memorizar o idioma selecionado pelo utilizador.</li>
      <li>Analisar a utilização do website para melhorar conteúdos, navegação e desempenho.</li>
      <li>Permitir a integração de serviços externos (por exemplo, mapas, conteúdos de terceiros).</li>
    </ul>

    <h2>5. Base Legal para a Utilização de Cookies</h2>
    <p>A utilização de cookies estritamente necessários baseia-se no nosso interesse legítimo em assegurar o funcionamento adequado e seguro do website.</p>
    <p>A utilização de cookies funcionais, analíticos ou de terceiros pode depender do consentimento do utilizador, quando exigido pela legislação aplicável. Sempre que necessário, será apresentado um banner ou mecanismo de consentimento que permita ao utilizador aceitar ou recusar determinadas categorias de cookies.</p>

    <h2>6. Cookies de Terceiros</h2>
    <p>Alguns cookies podem ser definidos por terceiros, por exemplo:</p>
    <ul>
      <li>Serviços de análise de tráfego e desempenho.</li>
      <li>Serviços de mapas ou conteúdos incorporados.</li>
      <li>Plataformas de reserva ou widgets externos.</li>
    </ul>
    <p>Estes terceiros são responsáveis pelas informações tratadas através dos respetivos cookies. Recomendamos que o utilizador consulte as políticas de privacidade e de cookies desses terceiros para obter mais detalhes.</p>

    <h2>7. Duração dos Cookies</h2>
    <p>Os cookies podem ser:</p>
    <ul>
      <li><strong>Cookies de sessão:</strong> são temporários e permanecem no dispositivo do utilizador apenas enquanto este navega no website, sendo eliminados ao fechar o navegador.</li>
      <li><strong>Cookies persistentes:</strong> permanecem armazenados no dispositivo por um período mais longo ou até serem apagados pelo utilizador.</li>
    </ul>

    <h2>8. Gestão de Cookies pelo Utilizador</h2>
    <p>O utilizador pode, a qualquer momento, configurar o seu navegador para:</p>
    <ul>
      <li>Bloquear todos os cookies.</li>
      <li>Aceitar apenas alguns cookies.</li>
      <li>Apagar cookies já armazenados no dispositivo.</li>
    </ul>
    <p>No entanto, o bloqueio ou eliminação de determinados cookies pode afetar o funcionamento do website e a qualidade da experiência de navegação.</p>

    <h2>9. Como Configurar Cookies no Navegador</h2>
    <p>As definições de cookies podem ser geridas diretamente no navegador utilizado. Em geral, o utilizador pode encontrar estas opções no menu “Opções”, “Preferências” ou “Definições” do navegador. Para mais informações, consulte a secção de ajuda do seu navegador.</p>

    <h2>10. Relação com a Política de Privacidade</h2>
    <p>As informações recolhidas através de cookies podem, em alguns casos, constituir dados pessoais. Nesses casos, aplicam-se igualmente as regras descritas na nossa Política de Privacidade, nomeadamente no que respeita às finalidades do tratamento, base legal, direitos dos titulares e medidas de segurança.</p>

    <h2>11. Atualizações a esta Política de Cookies</h2>
    <p>A Apartments Belleview Lagos pode atualizar a presente Política de Cookies sempre que necessário, nomeadamente para refletir alterações legais, tecnológicas ou na utilização de cookies. A versão mais recente estará sempre disponível no nosso website e no guia digital.</p>

    <h2>12. Contacto</h2>
    <p>Para questões relacionadas com esta Política de Cookies ou com a utilização de cookies no nosso website, poderá contactar-nos através de: <a href="mailto:belleview@sapo.pt">belleview@sapo.pt</a></p>
  `,

  en: `
    <h2>1. Introduction</h2>
    <p>This Cookie Policy explains what cookies are, which types we use on the Apartments Belleview Lagos website and digital guide, the purposes for which they are used, and how users can manage their preferences. This policy should be read together with our Privacy Policy.</p>

    <h2>2. What Are Cookies?</h2>
    <p>Cookies are small text files stored on the user’s device (computer, tablet, smartphone) when visiting a website. Cookies allow the website to recognise the user’s device and remember certain information about their preferences or past actions.</p>

    <h2>3. Types of Cookies We Use</h2>
    <p>We may use the following types of cookies:</p>
    <ul>
      <li><strong>Strictly necessary cookies:</strong> essential for the operation of the website and for enabling basic functions such as navigation and access to secure areas. Without these cookies, the website may not function properly.</li>
      <li><strong>Functional cookies:</strong> allow the website to remember user preferences (e.g., selected language), providing a more personalised experience.</li>
      <li><strong>Analytical/performance cookies:</strong> collect information about how the website is used (e.g., most visited pages, time spent, errors), helping us improve performance and usability.</li>
      <li><strong>Third‑party cookies:</strong> may be set by external services integrated into our website (e.g., maps, embedded content, analytics tools). These cookies are subject to the privacy and cookie policies of the respective third parties.</li>
    </ul>

    <h2>4. Purposes of Cookies</h2>
    <p>The cookies used on our website and digital guide may serve the following purposes:</p>
    <ul>
      <li>Ensuring the technical operation and security of the website.</li>
      <li>Remembering the user’s selected language.</li>
      <li>Analysing website usage to improve content, navigation, and performance.</li>
      <li>Enabling the integration of external services (e.g., maps, third‑party content).</li>
    </ul>

    <h2>5. Legal Basis for Using Cookies</h2>
    <p>The use of strictly necessary cookies is based on our legitimate interest in ensuring the proper and secure functioning of the website.</p>
    <p>The use of functional, analytical, or third‑party cookies may depend on the user’s consent, when required by applicable law. Whenever necessary, a cookie banner or consent mechanism will be displayed, allowing the user to accept or reject specific categories of cookies.</p>

    <h2>6. Third‑Party Cookies</h2>
    <p>Some cookies may be set by third parties, such as:</p>
    <ul>
      <li>Traffic and performance analytics services.</li>
      <li>Map services or embedded content.</li>
      <li>Booking platforms or external widgets.</li>
    </ul>
    <p>These third parties are responsible for the information processed through their cookies. We recommend that users consult the privacy and cookie policies of these third parties for more details.</p>

    <h2>7. Cookie Duration</h2>
    <p>Cookies may be:</p>
    <ul>
      <li><strong>Session cookies:</strong> temporary cookies that remain on the user’s device only while browsing the website and are deleted when the browser is closed.</li>
      <li><strong>Persistent cookies:</strong> remain stored on the device for a longer period or until manually deleted by the user.</li>
    </ul>

    <h2>8. Managing Cookies</h2>
    <p>Users may configure their browser at any time to:</p>
    <ul>
      <li>Block all cookies.</li>
      <li>Accept only certain cookies.</li>
      <li>Delete cookies already stored on the device.</li>
    </ul>
    <p>However, blocking or deleting certain cookies may affect the functioning of the website and the quality of the browsing experience.</p>

    <h2>9. How to Configure Cookies in Your Browser</h2>
    <p>Cookie settings can be managed directly in the user’s browser. In general, these options can be found in the “Options”, “Preferences”, or “Settings” menu. For more information, please refer to your browser’s help section.</p>

    <h2>10. Relationship with the Privacy Policy</h2>
    <p>Information collected through cookies may, in some cases, constitute personal data. In such cases, the rules described in our Privacy Policy also apply, particularly regarding processing purposes, legal basis, data subject rights, and security measures.</p>

    <h2>11. Updates to This Cookie Policy</h2>
    <p>Apartments Belleview Lagos may update this Cookie Policy whenever necessary, particularly to reflect legal, technological, or cookie‑usage changes. The most recent version will always be available on our website and digital guide.</p>

    <h2>12. Contact</h2>
    <p>For questions related to this Cookie Policy or the use of cookies on our website, you may contact us at: <a href="mailto:belleview@sapo.pt">belleview@sapo.pt</a></p>
  `,

  es: `
    <h2>1. Introducción</h2>
    <p>La presente Política de Cookies explica qué son las cookies, qué tipos utilizamos en el sitio web y en la guía digital de Apartments Belleview Lagos, con qué finalidades se utilizan y cómo el usuario puede gestionar sus preferencias. Esta política debe leerse junto con nuestra Política de Privacidad.</p>

    <h2>2. ¿Qué son las Cookies?</h2>
    <p>Las cookies son pequeños archivos de texto que se almacenan en el dispositivo del usuario (ordenador, tablet, smartphone) cuando visita un sitio web. Las cookies permiten que el sitio web reconozca el dispositivo del usuario y recuerde cierta información sobre sus preferencias o acciones anteriores.</p>

    <h2>3. Tipos de Cookies que Utilizamos</h2>
    <p>Podemos utilizar los siguientes tipos de cookies:</p>
    <ul>
      <li><strong>Cookies estrictamente necesarias:</strong> esenciales para el funcionamiento del sitio web y para permitir funciones básicas, como la navegación y el acceso a áreas seguras. Sin estas cookies, el sitio web puede no funcionar correctamente.</li>
      <li><strong>Cookies funcionales:</strong> permiten recordar las preferencias del usuario (por ejemplo, el idioma seleccionado), proporcionando una experiencia más personalizada.</li>
      <li><strong>Cookies analíticas/de rendimiento:</strong> recopilan información sobre cómo se utiliza el sitio web (por ejemplo, páginas más visitadas, tiempo de permanencia, errores), ayudándonos a mejorar el rendimiento y la usabilidad.</li>
      <li><strong>Cookies de terceros:</strong> pueden ser instaladas por servicios externos integrados en nuestro sitio web (por ejemplo, mapas, contenido incrustado, herramientas de análisis). Estas cookies están sujetas a las políticas de privacidad y cookies de los terceros correspondientes.</li>
    </ul>

    <h2>4. Finalidades de las Cookies</h2>
    <p>Las cookies utilizadas en nuestro sitio web y guía digital pueden tener las siguientes finalidades:</p>
    <ul>
      <li>Garantizar el funcionamiento técnico y la seguridad del sitio web.</li>
      <li>Recordar el idioma seleccionado por el usuario.</li>
      <li>Analizar el uso del sitio web para mejorar el contenido, la navegación y el rendimiento.</li>
      <li>Permitir la integración de servicios externos (por ejemplo, mapas, contenido de terceros).</li>
    </ul>

    <h2>5. Base Legal para el Uso de Cookies</h2>
    <p>El uso de cookies estrictamente necesarias se basa en nuestro interés legítimo en garantizar el correcto y seguro funcionamiento del sitio web.</p>
    <p>El uso de cookies funcionales, analíticas o de terceros puede depender del consentimiento del usuario, cuando así lo exija la legislación aplicable. Cuando sea necesario, se mostrará un banner o mecanismo de consentimiento que permita al usuario aceptar o rechazar determinadas categorías de cookies.</p>

    <h2>6. Cookies de Terceros</h2>
    <p>Algunas cookies pueden ser instaladas por terceros, tales como:</p>
    <ul>
      <li>Servicios de análisis de tráfico y rendimiento.</li>
      <li>Servicios de mapas o contenido incrustado.</li>
      <li>Plataformas de reserva o widgets externos.</li>
    </ul>
    <p>Estos terceros son responsables de la información tratada a través de sus cookies. Recomendamos que el usuario consulte las políticas de privacidad y cookies de dichos terceros para obtener más detalles.</p>

    <h2>7. Duración de las Cookies</h2>
    <p>Las cookies pueden ser:</p>
    <ul>
      <li><strong>Cookies de sesión:</strong> temporales, permanecen en el dispositivo del usuario solo mientras navega por el sitio web y se eliminan al cerrar el navegador.</li>
      <li><strong>Cookies persistentes:</strong> permanecen almacenadas en el dispositivo durante un período más largo o hasta que el usuario las elimine manualmente.</li>
    </ul>

    <h2>8. Gestión de Cookies por parte del Usuario</h2>
    <p>El usuario puede configurar su navegador en cualquier momento para:</p>
    <ul>
      <li>Bloquear todas las cookies.</li>
      <li>Aceptar solo determinadas cookies.</li>
      <li>Eliminar cookies ya almacenadas en el dispositivo.</li>
    </ul>
    <p>No obstante, el bloqueo o eliminación de determinadas cookies puede afectar al funcionamiento del sitio web y a la calidad de la experiencia de navegación.</p>

    <h2>9. Cómo Configurar las Cookies en su Navegador</h2>
    <p>La configuración de cookies puede gestionarse directamente en el navegador del usuario. En general, estas opciones se encuentran en los menús “Opciones”, “Preferencias” o “Configuración”. Para más información, consulte la sección de ayuda de su navegador.</p>

    <h2>10. Relación con la Política de Privacidad</h2>
    <p>La información recopilada a través de cookies puede, en algunos casos, constituir datos personales. En tales casos, también se aplican las normas descritas en nuestra Política de Privacidad, especialmente en lo relativo a las finalidades del tratamiento, la base legal, los derechos del titular y las medidas de seguridad.</p>

    <h2>11. Actualizaciones de esta Política de Cookies</h2>
    <p>Apartments Belleview Lagos puede actualizar esta Política de Cookies siempre que sea necesario, especialmente para reflejar cambios legales, tecnológicos o en el uso de cookies. La versión más reciente estará siempre disponible en nuestro sitio web y guía digital.</p>

    <h2>12. Contacto</h2>
    <p>Para consultas relacionadas con esta Política de Cookies o con el uso de cookies en nuestro sitio web, puede contactarnos en: <a href="mailto:belleview@sapo.pt">belleview@sapo.pt</a></p>
  `,

  fr: `
    <h2>1. Introduction</h2>
    <p>La présente Politique de Cookies explique ce que sont les cookies, quels types nous utilisons sur le site web et le guide numérique d’Apartments Belleview Lagos, à quelles fins ils sont utilisés et comment l’utilisateur peut gérer ses préférences. Cette politique doit être lue conjointement avec notre Politique de Confidentialité.</p>

    <h2>2. Que sont les Cookies ?</h2>
    <p>Les cookies sont de petits fichiers texte stockés sur l’appareil de l’utilisateur (ordinateur, tablette, smartphone) lorsqu’il visite un site web. Ils permettent au site de reconnaître l’appareil de l’utilisateur et de mémoriser certaines informations concernant ses préférences ou actions antérieures.</p>

    <h2>3. Types de Cookies Utilisés</h2>
    <p>Nous pouvons utiliser les types de cookies suivants :</p>
    <ul>
      <li><strong>Cookies strictement nécessaires :</strong> essentiels au fonctionnement du site web et permettant des fonctionnalités de base telles que la navigation et l’accès aux zones sécurisées. Sans ces cookies, le site peut ne pas fonctionner correctement.</li>
      <li><strong>Cookies fonctionnels :</strong> permettent de mémoriser les préférences de l’utilisateur (par exemple, la langue sélectionnée) afin d’offrir une expérience plus personnalisée.</li>
      <li><strong>Cookies analytiques/de performance :</strong> collectent des informations sur l’utilisation du site (par exemple, pages les plus visitées, durée de visite, erreurs), nous aidant à améliorer les performances et l’ergonomie.</li>
      <li><strong>Cookies tiers :</strong> peuvent être installés par des services externes intégrés à notre site (par exemple, cartes, contenus intégrés, outils d’analyse). Ces cookies sont soumis aux politiques de confidentialité des tiers concernés.</li>
    </ul>

    <h2>4. Finalités des Cookies</h2>
    <p>Les cookies utilisés sur notre site web et notre guide numérique peuvent avoir les finalités suivantes :</p>
    <ul>
      <li>Assurer le fonctionnement technique et la sécurité du site web.</li>
      <li>Mémoriser la langue sélectionnée par l’utilisateur.</li>
      <li>Analyser l’utilisation du site afin d’améliorer le contenu, la navigation et les performances.</li>
      <li>Permettre l’intégration de services externes (par exemple, cartes, contenus tiers).</li>
    </ul>

    <h2>5. Base Légale de l’Utilisation des Cookies</h2>
    <p>L’utilisation de cookies strictement nécessaires repose sur notre intérêt légitime à garantir le bon fonctionnement et la sécurité du site web.</p>
    <p>L’utilisation de cookies fonctionnels, analytiques ou tiers peut dépendre du consentement de l’utilisateur, lorsque la législation applicable l’exige. Le cas échéant, une bannière ou un mécanisme de consentement sera affiché pour permettre à l’utilisateur d’accepter ou de refuser certaines catégories de cookies.</p>

    <h2>6. Cookies de Tiers</h2>
    <p>Certains cookies peuvent être installés par des tiers, tels que :</p>
    <ul>
      <li>Services d’analyse du trafic et des performances.</li>
      <li>Services de cartographie ou contenus intégrés.</li>
      <li>Plateformes de réservation ou widgets externes.</li>
    </ul>
    <p>Ces tiers sont responsables des informations traitées via leurs cookies. Nous recommandons aux utilisateurs de consulter les politiques de confidentialité et de cookies de ces tiers pour plus de détails.</p>

    <h2>7. Durée de Conservation des Cookies</h2>
    <p>Les cookies peuvent être :</p>
    <ul>
      <li><strong>Cookies de session :</strong> temporaires, ils restent sur l’appareil de l’utilisateur uniquement pendant la navigation et sont supprimés à la fermeture du navigateur.</li>
      <li><strong>Cookies persistants :</strong> restent stockés sur l’appareil pendant une période plus longue ou jusqu’à leur suppression manuelle par l’utilisateur.</li>
    </ul>

    <h2>8. Gestion des Cookies par l’Utilisateur</h2>
    <p>L’utilisateur peut configurer son navigateur à tout moment pour :</p>
    <ul>
      <li>Bloquer tous les cookies.</li>
      <li>N’accepter que certains cookies.</li>
      <li>Supprimer les cookies déjà stockés sur l’appareil.</li>
    </ul>
    <p>Cependant, le blocage ou la suppression de certains cookies peut affecter le fonctionnement du site et la qualité de l’expérience de navigation.</p>

    <h2>9. Comment Configurer les Cookies dans le Navigateur</h2>
    <p>Les paramètres de cookies peuvent être gérés directement dans le navigateur de l’utilisateur. En général, ces options se trouvent dans les menus « Options », « Préférences » ou « Paramètres ». Pour plus d’informations, consultez la section d’aide de votre navigateur.</p>

    <h2>10. Relation avec la Politique de Confidentialité</h2>
    <p>Les informations collectées via les cookies peuvent, dans certains cas, constituer des données personnelles. Dans ce cas, les règles décrites dans notre Politique de Confidentialité s’appliquent également, notamment en ce qui concerne les finalités du traitement, la base légale, les droits des personnes concernées et les mesures de sécurité.</p>

    <h2>11. Mises à Jour de cette Politique de Cookies</h2>
    <p>Apartments Belleview Lagos peut mettre à jour la présente Politique de Cookies lorsque cela est nécessaire, notamment pour refléter des changements légaux, technologiques ou liés à l’utilisation des cookies. La version la plus récente sera toujours disponible sur notre site web et notre guide numérique.</p>

    <h2>12. Contact</h2>
    <p>Pour toute question concernant cette Politique de Cookies ou l’utilisation des cookies sur notre site web, vous pouvez nous contacter à : <a href="mailto:belleview@sapo.pt">belleview@sapo.pt</a></p>
  `,

  de: `
    <h2>1. Einleitung</h2>
    <p>Diese Cookie-Richtlinie erklärt, was Cookies sind, welche Arten wir auf der Website und im digitalen Guide von Apartments Belleview Lagos verwenden, zu welchen Zwecken sie eingesetzt werden und wie der Nutzer seine Präferenzen verwalten kann. Diese Richtlinie ist zusammen mit unserer Datenschutzrichtlinie zu lesen.</p>

    <h2>2. Was sind Cookies?</h2>
    <p>Cookies sind kleine Textdateien, die auf dem Gerät des Nutzers (Computer, Tablet, Smartphone) gespeichert werden, wenn er eine Website besucht. Cookies ermöglichen es der Website, das Gerät des Nutzers zu erkennen und bestimmte Informationen über seine Präferenzen oder früheren Aktionen zu speichern.</p>

    <h2>3. Arten von Cookies, die wir verwenden</h2>
    <p>Wir können die folgenden Arten von Cookies verwenden:</p>
    <ul>
      <li><strong>Unbedingt erforderliche Cookies:</strong> wesentlich für den Betrieb der Website und zur Aktivierung grundlegender Funktionen wie Navigation und Zugriff auf sichere Bereiche. Ohne diese Cookies kann die Website möglicherweise nicht richtig funktionieren.</li>
      <li><strong>Funktionale Cookies:</strong> ermöglichen es der Website, Nutzerpräferenzen zu speichern (z. B. die ausgewählte Sprache), um eine personalisierte Erfahrung zu bieten.</li>
      <li><strong>Analyse-/Leistungs-Cookies:</strong> sammeln Informationen darüber, wie die Website genutzt wird (z. B. meistbesuchte Seiten, Verweildauer, Fehler), und helfen uns, Leistung und Benutzerfreundlichkeit zu verbessern.</li>
      <li><strong>Drittanbieter-Cookies:</strong> können von externen Diensten gesetzt werden, die in unsere Website integriert sind (z. B. Karten, eingebettete Inhalte, Analysetools). Diese Cookies unterliegen den Datenschutzrichtlinien der jeweiligen Drittanbieter.</li>
    </ul>

    <h2>4. Zwecke der Cookies</h2>
    <p>Die auf unserer Website und im digitalen Guide verwendeten Cookies können folgende Zwecke erfüllen:</p>
    <ul>
      <li>Sicherstellung des technischen Betriebs und der Sicherheit der Website.</li>
      <li>Speicherung der vom Nutzer ausgewählten Sprache.</li>
      <li>Analyse der Website-Nutzung zur Verbesserung von Inhalten, Navigation und Leistung.</li>
      <li>Aktivierung der Integration externer Dienste (z. B. Karten, Inhalte von Drittanbietern).</li>
    </ul>

    <h2>5. Rechtsgrundlage für die Verwendung von Cookies</h2>
    <p>Die Verwendung unbedingt erforderlicher Cookies basiert auf unserem berechtigten Interesse, den ordnungsgemäßen und sicheren Betrieb der Website zu gewährleisten.</p>
    <p>Die Verwendung funktionaler, analytischer oder Drittanbieter-Cookies kann von der Einwilligung des Nutzers abhängen, wenn dies gesetzlich vorgeschrieben ist. Falls erforderlich, wird ein Cookie-Banner oder Einwilligungsmechanismus angezeigt, der es dem Nutzer ermöglicht, bestimmte Kategorien von Cookies zu akzeptieren oder abzulehnen.</p>

    <h2>6. Cookies von Drittanbietern</h2>
    <p>Einige Cookies können von Drittanbietern gesetzt werden, wie zum Beispiel:</p>
    <ul>
      <li>Dienste zur Analyse von Verkehr und Leistung.</li>
      <li>Kartendienste oder eingebettete Inhalte.</li>
      <li>Buchungsplattformen oder externe Widgets.</li>
    </ul>
    <p>Diese Drittanbieter sind für die über ihre Cookies verarbeiteten Informationen verantwortlich. Wir empfehlen den Nutzern, die Datenschutz- und Cookie-Richtlinien dieser Drittanbieter zu konsultieren.</p>

    <h2>7. Dauer der Cookies</h2>
    <p>Cookies können sein:</p>
    <ul>
      <li><strong>Sitzungscookies:</strong> temporäre Cookies, die nur während der Nutzung der Website auf dem Gerät des Nutzers verbleiben und beim Schließen des Browsers gelöscht werden.</li>
      <li><strong>Permanente Cookies:</strong> bleiben länger auf dem Gerät gespeichert oder bis sie vom Nutzer manuell gelöscht werden.</li>
    </ul>

    <h2>8. Verwaltung von Cookies durch den Nutzer</h2>
    <p>Der Nutzer kann seinen Browser jederzeit so konfigurieren, dass er:</p>
    <ul>
      <li>alle Cookies blockiert,</li>
      <li>nur bestimmte Cookies akzeptiert,</li>
      <li>bereits gespeicherte Cookies löscht.</li>
    </ul>
    <p>Das Blockieren oder Löschen bestimmter Cookies kann jedoch die Funktionalität der Website und die Qualität der Benutzererfahrung beeinträchtigen.</p>

    <h2>9. Wie man Cookies im Browser konfiguriert</h2>
    <p>Die Cookie-Einstellungen können direkt im Browser des Nutzers verwaltet werden. In der Regel befinden sich diese Optionen in den Menüs „Optionen“, „Einstellungen“ oder „Präferenzen“. Weitere Informationen finden Sie im Hilfebereich Ihres Browsers.</p>

    <h2>10. Beziehung zur Datenschutzrichtlinie</h2>
    <p>Die durch Cookies gesammelten Informationen können in einigen Fällen personenbezogene Daten darstellen. In solchen Fällen gelten auch die in unserer Datenschutzrichtlinie beschriebenen Regeln, insbesondere hinsichtlich der Zwecke der Verarbeitung, der Rechtsgrundlage, der Rechte der betroffenen Personen und der Sicherheitsmaßnahmen.</p>

    <h2>11. Aktualisierungen dieser Cookie-Richtlinie</h2>
    <p>Apartments Belleview Lagos kann diese Cookie-Richtlinie bei Bedarf aktualisieren, insbesondere um gesetzliche, technologische oder nutzungsbezogene Änderungen zu berücksichtigen. Die aktuellste Version ist stets auf unserer Website und im digitalen Guide verfügbar.</p>

    <h2>12. Kontakt</h2>
    <p>Für Fragen zu dieser Cookie-Richtlinie oder zur Verwendung von Cookies auf unserer Website können Sie uns kontaktieren unter: <a href="mailto:belleview@sapo.pt">belleview@sapo.pt</a></p>
  `,

  it: `
    <h2>1. Introduzione</h2>
    <p>La presente Politica sui Cookie spiega cosa sono i cookie, quali tipi utilizziamo sul sito web e nella guida digitale di Apartments Belleview Lagos, per quali finalità vengono utilizzati e come l’utente può gestire le proprie preferenze. Questa politica deve essere letta insieme alla nostra Informativa sulla Privacy.</p>

    <h2>2. Cosa sono i Cookie?</h2>
    <p>I cookie sono piccoli file di testo memorizzati sul dispositivo dell’utente (computer, tablet, smartphone) quando visita un sito web. I cookie consentono al sito di riconoscere il dispositivo dell’utente e di ricordare determinate informazioni relative alle sue preferenze o azioni precedenti.</p>

    <h2>3. Tipi di Cookie Utilizzati</h2>
    <p>Possiamo utilizzare i seguenti tipi di cookie:</p>
    <ul>
      <li><strong>Cookie strettamente necessari:</strong> essenziali per il funzionamento del sito web e per abilitare funzioni di base come la navigazione e l’accesso alle aree protette. Senza questi cookie, il sito potrebbe non funzionare correttamente.</li>
      <li><strong>Cookie funzionali:</strong> consentono al sito di ricordare le preferenze dell’utente (ad esempio, la lingua selezionata), offrendo un’esperienza più personalizzata.</li>
      <li><strong>Cookie analitici/di prestazione:</strong> raccolgono informazioni su come viene utilizzato il sito (ad esempio, pagine più visitate, tempo di permanenza, errori), aiutandoci a migliorare prestazioni e usabilità.</li>
      <li><strong>Cookie di terze parti:</strong> possono essere installati da servizi esterni integrati nel nostro sito (ad esempio, mappe, contenuti incorporati, strumenti di analisi). Questi cookie sono soggetti alle politiche sulla privacy dei rispettivi fornitori.</li>
    </ul>

    <h2>4. Finalità dei Cookie</h2>
    <p>I cookie utilizzati sul nostro sito web e nella guida digitale possono avere le seguenti finalità:</p>
    <ul>
      <li>Garantire il funzionamento tecnico e la sicurezza del sito web.</li>
      <li>Memorizzare la lingua selezionata dall’utente.</li>
      <li>Analizzare l’utilizzo del sito per migliorare contenuti, navigazione e prestazioni.</li>
      <li>Consentire l’integrazione di servizi esterni (ad esempio, mappe, contenuti di terze parti).</li>
    </ul>

    <h2>5. Base Giuridica per l’Uso dei Cookie</h2>
    <p>L’uso dei cookie strettamente necessari si basa sul nostro legittimo interesse a garantire il corretto e sicuro funzionamento del sito web.</p>
    <p>L’uso di cookie funzionali, analitici o di terze parti può dipendere dal consenso dell’utente, quando richiesto dalla normativa applicabile. Quando necessario, verrà mostrato un banner o un meccanismo di consenso che permetterà all’utente di accettare o rifiutare determinate categorie di cookie.</p>

    <h2>6. Cookie di Terze Parti</h2>
    <p>Alcuni cookie possono essere installati da terze parti, come ad esempio:</p>
    <ul>
      <li>Servizi di analisi del traffico e delle prestazioni.</li>
      <li>Servizi di mappe o contenuti incorporati.</li>
      <li>Piattaforme di prenotazione o widget esterni.</li>
    </ul>
    <p>Queste terze parti sono responsabili delle informazioni trattate tramite i loro cookie. Si consiglia agli utenti di consultare le politiche sulla privacy e sui cookie di tali fornitori per maggiori dettagli.</p>

    <h2>7. Durata dei Cookie</h2>
    <p>I cookie possono essere:</p>
    <ul>
      <li><strong>Cookie di sessione:</strong> temporanei, rimangono sul dispositivo dell’utente solo durante la navigazione e vengono eliminati alla chiusura del browser.</li>
      <li><strong>Cookie persistenti:</strong> rimangono memorizzati sul dispositivo per un periodo più lungo o fino alla loro eliminazione manuale da parte dell’utente.</li>
    </ul>

    <h2>8. Gestione dei Cookie da Parte dell’Utente</h2>
    <p>L’utente può configurare il proprio browser in qualsiasi momento per:</p>
    <ul>
      <li>Bloccare tutti i cookie.</li>
      <li>Accettare solo determinati cookie.</li>
      <li>Eliminare i cookie già memorizzati sul dispositivo.</li>
    </ul>
    <p>Tuttavia, il blocco o l’eliminazione di alcuni cookie può influire sul funzionamento del sito e sulla qualità dell’esperienza di navigazione.</p>

    <h2>9. Come Configurare i Cookie nel Browser</h2>
    <p>Le impostazioni dei cookie possono essere gestite direttamente nel browser dell’utente. In genere, queste opzioni si trovano nei menu “Opzioni”, “Preferenze” o “Impostazioni”. Per maggiori informazioni, consultare la sezione di aiuto del proprio browser.</p>

    <h2>10. Relazione con l’Informativa sulla Privacy</h2>
    <p>Le informazioni raccolte tramite i cookie possono, in alcuni casi, costituire dati personali. In tali casi, si applicano anche le regole descritte nella nostra Informativa sulla Privacy, in particolare per quanto riguarda le finalità del trattamento, la base giuridica, i diritti degli interessati e le misure di sicurezza.</p>

    <h2>11. Aggiornamenti di Questa Politica sui Cookie</h2>
    <p>Apartments Belleview Lagos può aggiornare la presente Politica sui Cookie ogni volta che necessario, in particolare per riflettere modifiche legali, tecnologiche o relative all’uso dei cookie. La versione più recente sarà sempre disponibile sul nostro sito web e nella guida digitale.</p>

    <h2>12. Contatto</h2>
    <p>Per domande relative a questa Politica sui Cookie o all’uso dei cookie sul nostro sito web, è possibile contattarci all’indirizzo: <a href="mailto:belleview@sapo.pt">belleview@sapo.pt</a></p>
  `,

};

/* ============================================================
   APLICAR TÍTULO E CONTEÚDO
============================================================ */
document.getElementById("policyTitle").textContent =
  cookiePolicyTitle[lang];

document.getElementById("policyContent").innerHTML =
  cookiePolicyTexts[lang];

/* ============================================================
   BOTÃO VOLTAR
============================================================ */
const backBtn = document.getElementById("btnBack");
backBtn.textContent = {
  pt: "Voltar",
  en: "Back",
  es: "Volver",
  fr: "Retour",
  de: "Zurück",
  it: "Indietro"
}[lang];

backBtn.addEventListener("click", () => {
  const from = getQueryParam("from");

  if (from === "guide") {
    window.location.href = "/guide?lang=" + lang;
    return;
  }

  if (from === "aima") {
    window.location.href = "/aima?lang=" + lang;
    return;
  }

  window.location.href = "/?lang=" + lang;
});

/* ============================================================
   RODAPÉ MULTILÍNGUA
============================================================ */
const footerLinks = {
  pt: [
    { href: "/legal/politica-de-reservas.html", label: "Política de Reservas" },
    { href: "/legal/politica-de-privacidade.html", label: "Política de Privacidade" },
    { href: "/legal/politica-de-cookies.html", label: "Política de Cookies" },
    { href: "/legal/termos-e-condicoes.html", label: "Termos e Condições" },
    { href: "https://www.livroreclamacoes.pt/INICIO/", label: "Livro de Reclamações Online", external: true }
  ],
  en: [
    { href: "/legal/politica-de-reservas.html", label: "Reservation Policy" },
    { href: "/legal/politica-de-privacidade.html", label: "Privacy Policy" },
    { href: "/legal/politica-de-cookies.html", label: "Cookie Policy" },
    { href: "/legal/termos-e-condicoes.html", label: "Terms & Conditions" },
    { href: "https://www.livroreclamacoes.pt/INICIO/", label: "Online Complaints Book", external: true }
  ],
  es: [
    { href: "/legal/politica-de-reservas.html", label: "Política de Reservas" },
    { href: "/legal/politica-de-privacidade.html", label: "Política de Privacidad" },
    { href: "/legal/politica-de-cookies.html", label: "Política de Cookies" },
    { href: "/legal/termos-e-condicoes.html", label: "Términos y Condiciones" },
    { href: "https://www.livroreclamacoes.pt/INICIO/", label: "Libro de Reclamaciones Online", external: true }
  ],
  fr: [
    { href: "/legal/politica-de-reservas.html", label: "Politique de Réservation" },
    { href: "/legal/politica-de-privacidade.html", label: "Politique de Confidentialité" },
    { href: "/legal/politica-de-cookies.html", label: "Politique de Cookies" },
    { href: "/legal/termos-e-condicoes.html", label: "Conditions Générales" },
    { href: "https://www.livroreclamacoes.pt/INICIO/", label: "Livre de Réclamations en Ligne", external: true }
  ],
  de: [
    { href: "/legal/politica-de-reservas.html", label: "Reservierungsrichtlinie" },
    { href: "/legal/politica-de-privacidade.html", label: "Datenschutzrichtlinie" },
    { href: "/legal/politica-de-cookies.html", label: "Cookie-Richtlinie" },
    { href: "/legal/termos-e-condicoes.html", label: "Allgemeine Geschäftsbedingungen" },
    { href: "https://www.livroreclamacoes.pt/INICIO/", label: "Online-Beschwerdebuch", external: true }
  ],
  it: [
    { href: "/legal/politica-de-reservas.html", label: "Politica di Prenotazione" },
    { href: "/legal/politica-de-privacidade.html", label: "Informativa sulla Privacy" },
    { href: "/legal/politica-de-cookies.html", label: "Politica sui Cookie" },
    { href: "/legal/termos-e-condicoes.html", label: "Termini e Condizioni" },
    { href: "https://www.livroreclamacoes.pt/INICIO/", label: "Libro dei Reclami Online", external: true }
  ]
};

const footerLinksContainer = document.querySelector(".footer-links");
if (footerLinksContainer) {
  const links = footerLinks[lang] || footerLinks["pt"];
  footerLinksContainer.innerHTML = links
    .map(link => {
      if (link.external) {
        return `<a href="${link.href}" target="_blank" rel="noopener noreferrer">${link.label}</a>`;
      }
      return `<a href="${link.href}?lang=${lang}">${link.label}</a>`;
    })
    .join(" | ");
}
