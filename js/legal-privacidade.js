// Detecta idioma
function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

const supportedLangs = ["pt", "en", "es", "fr", "de", "it"];
let lang = getQueryParam("lang") || "pt";
if (!supportedLangs.includes(lang)) lang = "pt";

// Título da Política de Privacidade
const privacyPolicyTitle = {
  pt: "Política de Privacidade",
  en: "Privacy Policy",
  es: "Política de Privacidad",
  fr: "Politique de Confidentialité",
  de: "Datenschutzrichtlinie",
  it: "Informativa sulla Privacy"
};

// Textos da Política de Privacidade (PT completo + traduções)
const privacyPolicyTexts = {
  pt: `
    ... AQUI VAI O TEXTO COMPLETO PT (já validado) ...
  `,
  en: `
    ... versão EN ...
  `,
  es: `
    ... versão ES ...
  `,
  fr: `
    ... versão FR ...
  `,
  de: `
    ... versão DE ...
  `,
  it: `
    ... versão IT ...
  `
};

// Aplica título
document.getElementById("policyTitle").textContent =
  privacyPolicyTitle[lang];

// Aplica conteúdo
document.getElementById("policyContent").innerHTML =
  privacyPolicyTexts[lang];

// Botão voltar
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

// Rodapé multilíngua
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
