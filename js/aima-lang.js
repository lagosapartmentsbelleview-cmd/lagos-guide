// Lê parâmetro da query string
function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

// Determina idioma (fallback: pt)
// Se estiver no AIMA e existir window.currentLang, usa-o
const supportedLangs = ["pt", "en", "es", "fr", "de", "it"];

let lang =
  (window.currentLang && supportedLangs.includes(window.currentLang))
    ? window.currentLang
    : (getQueryParam("lang") || "pt");

if (!supportedLangs.includes(lang)) lang = "pt";

// Títulos por idioma
const policyTitle = {
  pt: "Política de Reservas",
  en: "Reservation Policy",
  es: "Política de Reservas",
  fr: "Politique de Réservation",
  de: "Reservierungsrichtlinie",
  it: "Politica di Prenotazione"
};

// Texto do botão Voltar
const backButtonText = {
  pt: "Voltar",
  en: "Back",
  es: "Volver",
  fr: "Retour",
  de: "Zurück",
  it: "Indietro"
};

// Conteúdo legal por idioma (formal, fiel)
const reservationPolicyTexts = {
  pt: `... TODO O TEXTO PT ...`,
  en: `... TODO O TEXTO EN ...`,
  es: `... TODO O TEXTO ES ...`,
  fr: `... TODO O TEXTO FR ...`,
  de: `... TODO O TEXTO DE ...`,
  it: `... TODO O TEXTO IT ...`
};

// Links de rodapé por idioma
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

// Aplica título, botão e conteúdo
const titleEl = document.getElementById("policyTitle");
if (titleEl) titleEl.textContent = policyTitle[lang];

const backBtn = document.getElementById("btnBack");
if (backBtn) backBtn.textContent = backButtonText[lang];

const contentEl = document.getElementById("policyContent");
if (contentEl) contentEl.innerHTML = reservationPolicyTexts[lang];

// Constrói rodapé multilíngua
function updateFooterLinksAIMA() {
  const footerLinksContainer = document.querySelector(".footer-links");
  if (!footerLinksContainer) return;

  const links = footerLinks[lang] || footerLinks["pt"];
  footerLinksContainer.innerHTML = links
    .map(link => {
      if (link.external) {
        return `<a href="${link.href}" target="_blank" rel="noopener noreferrer">${link.label}</a>`;
      }
      return `<a href="${link.href}?lang=${lang}&from=aima">${link.label}</a>`;
    })
    .join(" | ");
}

// Atualiza rodapé ao carregar
updateFooterLinksAIMA();

// Lógica do botão Voltar
if (backBtn) {
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
}
