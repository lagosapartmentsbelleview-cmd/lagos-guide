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
   TÍTULO DA POLÍTICA DE PRIVACIDADE
============================================================ */
const privacyPolicyTitle = {
  pt: "Política de Privacidade",
  en: "Privacy Policy",
  es: "Política de Privacidad",
  fr: "Politique de Confidentialité",
  de: "Datenschutzrichtlinie",
  it: "Informativa sulla Privacy"
};

/* ============================================================
   TEXTO COMPLETO DA POLÍTICA DE PRIVACIDADE (PT + placeholders)
============================================================ */
const privacyPolicyTexts = {
  pt: `
    <h2>1. Introdução</h2>
    <p>A Apartments Belleview Lagos valoriza a privacidade e a proteção dos dados pessoais dos seus hóspedes, visitantes e utilizadores do website e do guia digital. A presente Política de Privacidade descreve como recolhemos, utilizamos, armazenamos e protegemos os dados pessoais, em conformidade com o Regulamento Geral sobre a Proteção de Dados (RGPD) e a legislação portuguesa aplicável.</p>

    <h2>2. Responsável pelo Tratamento</h2>
    <p>O responsável pelo tratamento dos dados é a Apartments Belleview Lagos. Para qualquer questão relacionada com privacidade ou proteção de dados, poderá contactar-nos através de: <a href="mailto:belleview@sapo.pt">belleview@sapo.pt</a>.</p>

    <h2>3. Dados Pessoais Recolhidos</h2>
    <p>Podemos recolher os seguintes dados pessoais:</p>
    <ul>
      <li><strong>Dados de identificação:</strong> nome completo, data de nascimento, nacionalidade, documento de identificação.</li>
      <li><strong>Dados de contacto:</strong> email, número de telefone.</li>
      <li><strong>Dados de reserva:</strong> datas de estadia, número de hóspedes, preferências de alojamento.</li>
      <li><strong>Dados obrigatórios para comunicação à AIMA (antigo SEF):</strong> conforme legislação portuguesa.</li>
      <li><strong>Dados técnicos:</strong> endereço IP, tipo de dispositivo, navegador, dados de utilização do website.</li>
    </ul>

    <h2>4. Finalidades do Tratamento</h2>
    <p>Os dados pessoais são tratados para as seguintes finalidades:</p>
    <ul>
      <li>Gestão de reservas e estadias.</li>
      <li>Cumprimento de obrigações legais, incluindo comunicação obrigatória à AIMA.</li>
      <li>Comunicação com o hóspede antes, durante e após a estadia.</li>
      <li>Melhoria dos serviços e experiência do utilizador.</li>
      <li>Gestão administrativa, contabilística e fiscal.</li>
    </ul>

    <h2>5. Base Legal para o Tratamento</h2>
    <p>O tratamento dos dados pessoais baseia-se em:</p>
    <ul>
      <li><strong>Execução de contrato:</strong> gestão da reserva e prestação do serviço de alojamento.</li>
      <li><strong>Obrigação legal:</strong> comunicação obrigatória à AIMA.</li>
      <li><strong>Interesse legítimo:</strong> melhoria dos serviços e segurança do alojamento.</li>
      <li><strong>Consentimento:</strong> quando aplicável (ex.: comunicações de marketing).</li>
    </ul>

    <h2>6. Partilha de Dados</h2>
    <p>Os dados pessoais podem ser partilhados com:</p>
    <ul>
      <li>Autoridades portuguesas, quando exigido por lei (ex.: AIMA).</li>
      <li>Plataformas de reserva (Booking.com, Airbnb, etc.), quando a reserva é efetuada através dessas plataformas.</li>
      <li>Prestadores de serviços essenciais (ex.: serviços de limpeza, manutenção), sempre sob acordo de confidencialidade.</li>
    </ul>

    <h2>7. Conservação dos Dados</h2>
    <p>Os dados pessoais são conservados apenas pelo período necessário para cumprir as finalidades para as quais foram recolhidos, respeitando os prazos legais aplicáveis. Dados relacionados com obrigações fiscais e legais podem ser conservados por períodos superiores.</p>

    <h2>8. Direitos dos Titulares dos Dados</h2>
    <p>O titular dos dados pode, a qualquer momento, exercer os seguintes direitos:</p>
    <ul>
      <li>Acesso aos seus dados pessoais.</li>
      <li>Retificação de dados incorretos ou incompletos.</li>
      <li>Apagamento dos dados (“direito a ser esquecido”), quando aplicável.</li>
      <li>Limitação do tratamento.</li>
      <li>Portabilidade dos dados.</li>
      <li>Oposição ao tratamento.</li>
    </ul>
    <p>Para exercer estes direitos, contacte: <a href="mailto:belleview@sapo.pt">belleview@sapo.pt</a>.</p>

    <h2>9. Segurança dos Dados</h2>
    <p>A Apartments Belleview Lagos implementa medidas técnicas e organizativas adequadas para proteger os dados pessoais contra perda, acesso não autorizado, alteração ou divulgação indevida.</p>

    <h2>10. Cookies e Tecnologias Semelhantes</h2>
    <p>O nosso website pode utilizar cookies para melhorar a experiência do utilizador. Para mais detalhes, consulte a nossa Política de Cookies.</p>

    <h2>11. Alterações a esta Política</h2>
    <p>A Apartments Belleview Lagos pode atualizar esta Política de Privacidade sempre que necessário. A versão mais recente estará sempre disponível no website e no guia digital.</p>

    <h2>12. Contacto</h2>
    <p>Para questões relacionadas com privacidade ou proteção de dados: <a href="mailto:belleview@sapo.pt">belleview@sapo.pt</a></p>

    <h2>13. Subcontratantes e Prestadores de Serviços</h2>
    <p>A Apartments Belleview Lagos pode recorrer a prestadores de serviços externos que atuam como subcontratantes no tratamento de dados pessoais, incluindo serviços de alojamento de website, motor de reservas, serviços de email, manutenção ou limpeza. Estes prestadores atuam exclusivamente segundo instruções documentadas, estão vinculados por obrigações de confidencialidade e apenas tratam os dados na medida estritamente necessária para a prestação dos respetivos serviços.</p>

    <h2>14. Dados Pessoais de Terceiros</h2>
    <p>Quando o utilizador fornece dados pessoais de terceiros (por exemplo, outros hóspedes incluídos na reserva), declara que tem legitimidade para o fazer e que informou esses titulares sobre as condições de tratamento dos seus dados pessoais nos termos da presente Política de Privacidade.</p>

    <h2>15. Transferências Internacionais de Dados</h2>
    <p>À data, a Apartments Belleview Lagos não transfere dados pessoais para países fora do Espaço Económico Europeu. Caso tal venha a ocorrer, serão adotadas as garantias adequadas previstas na legislação aplicável, assegurando um nível de proteção equivalente ao exigido pelo RGPD.</p>

    <h2>16. Direito de Reclamação junto da Autoridade de Controlo</h2>
    <p>O titular dos dados tem o direito de apresentar reclamação junto da Comissão Nacional de Proteção de Dados (CNPD), caso considere que o tratamento dos seus dados pessoais viola a legislação aplicável em matéria de proteção de dados.</p>
  `,

 en: `
    <h2>1. Introduction</h2>
    <p>Apartments Belleview Lagos values the privacy and protection of the personal data of its guests, visitors and users of the website and digital guide. This Privacy Policy describes how we collect, use, store and protect personal data, in accordance with the General Data Protection Regulation (GDPR) and applicable Portuguese legislation.</p>

    <h2>2. Data Controller</h2>
    <p>The data controller is Apartments Belleview Lagos. For any questions related to privacy or data protection, you may contact us at: <a href="mailto:belleview@sapo.pt">belleview@sapo.pt</a>.</p>

    <h2>3. Personal Data Collected</h2>
    <p>We may collect the following personal data:</p>
    <ul>
      <li><strong>Identification data:</strong> full name, date of birth, nationality, identification document.</li>
      <li><strong>Contact details:</strong> email address, phone number.</li>
      <li><strong>Booking information:</strong> stay dates, number of guests, accommodation preferences.</li>
      <li><strong>Mandatory data for AIMA reporting:</strong> as required by Portuguese law.</li>
      <li><strong>Technical data:</strong> IP address, device type, browser, website usage data.</li>
    </ul>

    <h2>4. Purposes of Processing</h2>
    <p>Personal data is processed for the following purposes:</p>
    <ul>
      <li>Managing bookings and stays.</li>
      <li>Complying with legal obligations, including mandatory reporting to AIMA.</li>
      <li>Communicating with the guest before, during and after the stay.</li>
      <li>Improving services and user experience.</li>
      <li>Administrative, accounting and tax management.</li>
    </ul>

    <h2>5. Legal Basis for Processing</h2>
    <p>The processing of personal data is based on:</p>
    <ul>
      <li><strong>Performance of a contract:</strong> managing the booking and providing accommodation services.</li>
      <li><strong>Legal obligation:</strong> mandatory reporting to AIMA.</li>
      <li><strong>Legitimate interest:</strong> improving services and ensuring the security of the accommodation.</li>
      <li><strong>Consent:</strong> when applicable (e.g., marketing communications).</li>
    </ul>

    <h2>6. Data Sharing</h2>
    <p>Personal data may be shared with:</p>
    <ul>
      <li>Portuguese authorities when required by law (e.g., AIMA).</li>
      <li>Booking platforms (Booking.com, Airbnb, etc.) when the reservation is made through those platforms.</li>
      <li>Essential service providers (e.g., cleaning, maintenance), always under confidentiality agreements.</li>
    </ul>

    <h2>7. Data Retention</h2>
    <p>Personal data is retained only for the period necessary to fulfil the purposes for which it was collected, in accordance with applicable legal requirements. Data related to legal or fiscal obligations may be retained for longer periods.</p>

    <h2>8. Rights of Data Subjects</h2>
    <p>Data subjects may exercise the following rights at any time:</p>
    <ul>
      <li>Access to their personal data.</li>
      <li>Rectification of inaccurate or incomplete data.</li>
      <li>Erasure of data (“right to be forgotten”), when applicable.</li>
      <li>Restriction of processing.</li>
      <li>Data portability.</li>
      <li>Objection to processing.</li>
    </ul>
    <p>To exercise these rights, please contact: <a href="mailto:belleview@sapo.pt">belleview@sapo.pt</a>.</p>

    <h2>9. Data Security</h2>
    <p>Apartments Belleview Lagos implements appropriate technical and organisational measures to protect personal data against loss, unauthorised access, alteration or improper disclosure.</p>

    <h2>10. Cookies and Similar Technologies</h2>
    <p>Our website may use cookies to improve the user experience. For more details, please refer to our Cookie Policy.</p>

    <h2>11. Changes to this Policy</h2>
    <p>Apartments Belleview Lagos may update this Privacy Policy whenever necessary. The most recent version will always be available on the website and in the digital guide.</p>

    <h2>12. Contact</h2>
    <p>For questions related to privacy or data protection: <a href="mailto:belleview@sapo.pt">belleview@sapo.pt</a></p>

    <h2>13. Subprocessors and Service Providers</h2>
    <p>Apartments Belleview Lagos may use external service providers acting as subprocessors in the processing of personal data, including website hosting services, booking engines, email services, maintenance or cleaning. These providers act strictly according to documented instructions, are bound by confidentiality obligations, and only process data to the extent necessary for the provision of their services.</p>

    <h2>14. Personal Data of Third Parties</h2>
    <p>When the user provides personal data of third parties (for example, other guests included in the booking), they declare that they are authorised to do so and that they have informed those individuals about the conditions under which their personal data will be processed in accordance with this Privacy Policy.</p>

    <h2>15. International Data Transfers</h2>
    <p>At present, Apartments Belleview Lagos does not transfer personal data to countries outside the European Economic Area. Should such transfers occur in the future, appropriate safeguards required by applicable legislation will be implemented to ensure an equivalent level of protection as required by the GDPR.</p>

    <h2>16. Right to Lodge a Complaint</h2>
    <p>Data subjects have the right to lodge a complaint with the Portuguese Data Protection Authority (CNPD) if they believe that the processing of their personal data violates applicable data protection legislation.</p>
  `,

  es: `<!-- TODO: inserir versão ES -->`,
  fr: `<!-- TODO: inserir versão FR -->`,
  de: `<!-- TODO: inserir versão DE -->`,
  it: `<!-- TODO: inserir versão IT -->`
};

/* ============================================================
   APLICAR TÍTULO E CONTEÚDO
============================================================ */
document.getElementById("policyTitle").textContent =
  privacyPolicyTitle[lang];

document.getElementById("policyContent").innerHTML =
  privacyPolicyTexts[lang];

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
