/* ============================================================
   SISTEMA DE IDIOMAS — BELLEVIEW 2.0
============================================================ */

let currentLang = "pt";

/* Textos traduzidos */
const translations = {
  pt: {
    hero_local: "Lagos, Algarve, Portugal",
    hero_title: "O seu refúgio moderno no coração do Algarve",
    hero_sub: "Apartamentos luminosos e com piscinas, tranquilos, totalmente equipados a poucos minutos da Marina e da maravilhosa Meia‑Praia.",
    reserve_here: "Reserva aqui!"
  },
  en: {
    hero_local: "Lagos, Algarve, Portugal",
    hero_title: "Your modern retreat in the heart of the Algarve",
    hero_sub: "Bright apartments with pools, peaceful, fully equipped and just minutes from the Marina and the beautiful Meia‑Praia.",
    reserve_here: "Book now!"
  },
  es: {
    hero_local: "Lagos, Algarve, Portugal",
    hero_title: "Su refugio moderno en el corazón del Algarve",
    hero_sub: "Apartamentos luminosos con piscinas, tranquilos, totalmente equipados y a pocos minutos de la Marina y de la hermosa Meia‑Praia.",
    reserve_here: "Reserva aquí!"
  },
  fr: {
    hero_local: "Lagos, Algarve, Portugal",
    hero_title: "Votre refuge moderne au cœur de l'Algarve",
    hero_sub: "Appartements lumineux avec piscines, calmes, entièrement équipés et à quelques minutes de la Marina et de la magnifique Meia‑Praia.",
    reserve_here: "Réservez ici!"
  },
  it: {
    hero_local: "Lagos, Algarve, Portugal",
    hero_title: "Il tuo rifugio moderno nel cuore dell'Algarve",
    hero_sub: "Appartamenti luminosi con piscine, tranquilli, completamente attrezzati e a pochi minuti dalla Marina e dalla splendida Meia‑Praia.",
    reserve_here: "Prenota qui!"
  },
  de: {
    hero_local: "Lagos, Algarve, Portugal",
    hero_title: "Ihr modernes Refugium im Herzen der Algarve",
    hero_sub: "Helle Apartments mit Pools, ruhig, komplett ausgestattet und nur wenige Minuten vom Yachthafen und dem wunderschönen Meia‑Praia entfernt.",
    reserve_here: "Jetzt buchen!"
  }
};

/* Função principal */
function setLanguage(lang) {
  currentLang = lang;

  // Atualizar textos com data-i18n
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    el.textContent = translations[lang][key];
  });

  // Atualizar footer multilíngua
  if (typeof updateFooterLinksBelleview === "function") {
    updateFooterLinksBelleview();
  }
}

/* Listener das bandeiras */
document.querySelectorAll(".lang-switch img").forEach(flag => {
  flag.addEventListener("click", () => {
    const lang = flag.dataset.lang;
    setLanguage(lang);
  });
});
