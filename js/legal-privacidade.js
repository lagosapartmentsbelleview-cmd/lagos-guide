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

  en: `<!-- TODO: inserir versão EN -->`,
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
