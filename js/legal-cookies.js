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

  en: `<!-- TODO: EN -->`,
  es: `<!-- TODO: ES -->`,
  fr: `<!-- TODO: FR -->`,
  de: `<!-- TODO: DE -->`,
  it: `<!-- TODO: IT -->`
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
