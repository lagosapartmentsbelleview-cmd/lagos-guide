// Lê parâmetro da query string
function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

// Idiomas suportados
const supportedLangs = ["pt", "en", "es", "fr", "de", "it"];

// Determina idioma atual (fallback: pt)
let lang = getQueryParam("lang") || "pt";
if (!supportedLangs.includes(lang)) lang = "pt";

// Traduções multilíngua do rodapé (apenas links)
const footerLinksAIMA = {
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

// Substitui o bloco .footer-links no AIMA
document.addEventListener("DOMContentLoaded", () => {
  const footerLinksContainer = document.querySelector(".footer-links");
  if (!footerLinksContainer) return;

  const links = footerLinksAIMA[lang] || footerLinksAIMA["pt"];

  footerLinksContainer.innerHTML = links
    .map(link => {
      if (link.external) {
        return `<a href="${link.href}" target="_blank" rel="noopener noreferrer">${link.label}</a>`;
      }
      return `<a href="${link.href}?lang=${lang}&from=aima">${link.label}</a>`;
    })
    .join(" | ");
});
