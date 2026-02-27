/* ============================================================
   LER PARÂMETROS DA QUERY STRING
============================================================ */
function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

/* ============================================================
   DETERMINAR IDIOMA ATUAL
============================================================ */
const supportedLangs = ["pt", "en", "es", "fr", "de", "it"];

let lang =
  (getQueryParam("lang") && supportedLangs.includes(getQueryParam("lang")))
    ? getQueryParam("lang")
    : (window.currentLang || "pt");

if (!supportedLangs.includes(lang)) lang = "pt";

/* ============================================================
   LINKS DE RODAPÉ MULTILÍNGUA
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

/* ============================================================
   TEXTOS FIXOS DO FOOTER — MULTILÍNGUA
============================================================ */
const footerTextsAIMA = {
  pt: {
    call: "(Chamada para a rede fixa nacional)",
    reg: "Nº de Registos AL",
    operator: "Entidade Exploradora",
    rights: "Todos os direitos reservados."
  },
  en: {
    call: "(Call to a national landline network)",
    reg: "AL Registration Numbers",
    operator: "Operating Entity",
    rights: "All rights reserved."
  },
  es: {
    call: "(Llamada a la red fija nacional)",
    reg: "Números de Registro AL",
    operator: "Entidad Operadora",
    rights: "Todos los derechos reservados."
  },
  fr: {
    call: "(Appel vers le réseau fixe national)",
    reg: "Numéros d’Enregistrement AL",
    operator: "Entité Exploitante",
    rights: "Tous droits réservés."
  },
  de: {
    call: "(Anruf ins nationale Festnetz)",
    reg: "AL‑Registrierungsnummern",
    operator: "Betreibende Einheit",
    rights: "Alle Rechte vorbehalten."
  },
  it: {
    call: "(Chiamata alla rete fissa nazionale)",
    reg: "Numeri di Registrazione AL",
    operator: "Entità Gestore",
    rights: "Tutti i diritti riservati."
  }
};

/* ============================================================
   RENDERIZAR LINKS DO FOOTER
============================================================ */
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

/* ============================================================
   RENDERIZAR FRASES FIXAS DO FOOTER
============================================================ */
function updateFooterTextsAIMA() {
  if (document.getElementById("footer-call"))
    document.getElementById("footer-call").innerText = footerTextsAIMA[lang].call;

  if (document.getElementById("footer-reg"))
    document.getElementById("footer-reg").innerText = footerTextsAIMA[lang].reg;

  if (document.getElementById("footer-operator"))
    document.getElementById("footer-operator").innerText = footerTextsAIMA[lang].operator;

  if (document.getElementById("footer-rights"))
    document.getElementById("footer-rights").innerText = footerTextsAIMA[lang].rights;
}

/* ============================================================
   ATUALIZAR AO CARREGAR A PÁGINA
============================================================ */
updateFooterLinksAIMA();
updateFooterTextsAIMA();

/* ============================================================
   INTERCEPTAR setLanguage() DO AIMA
============================================================ */
if (typeof setLanguage === "function") {
  const originalSetLanguage = setLanguage;

  setLanguage = function(newLang) {
    originalSetLanguage(newLang);

    window.currentLang = newLang;
    lang = newLang;

    updateFooterLinksAIMA();
    updateFooterTextsAIMA();
  };
}
