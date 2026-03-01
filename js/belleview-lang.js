/* ============================================================
   SISTEMA DE IDIOMAS — BELLEVIEW 2.0
============================================================ */

let currentLang = "pt";

/* Textos traduzidos */
const translations = {
  pt: {
    menu_alojamento: "Alojamento",
    menu_comodidades: "Comodidades",
    menu_localizacao: "Localização",
    menu_contactos: "Contactos",
    hero_local: "Lagos, Algarve, Portugal",
    hero_title: "O seu refúgio moderno no coração do Algarve",
    hero_sub: "Apartamentos luminosos e com piscinas, tranquilos, totalmente equipados a poucos minutos da Marina e da maravilhosa Meia‑Praia.",
    reserve_here: "Reserva aqui!",
    awards_title: "Prémios Booking.com",
     
award_year_2024: "2024",
     
award_year_2025: "2025",
     
award_year_2026: "2026",

reviews_title: "O que dizem os nossos hóspedes",

review_1_text: "Excelente localização e piscina muito agradável.",
review_1_author: "Ella — Reino Unido",

review_2_text: "Muito tranquilo e ideal para relaxar.",
review_2_author: "Miguel — Portugal",

review_3_text: "Limpeza impecável e staff muito simpático.",
review_3_author: "Sofia — Espanha",

review_4_text: "Apartamento confortável e bem equipado.",
review_4_author: "Jonas — Alemanha",

review_5_text: "Ótimo valor pelo dinheiro. Voltaremos!",
review_5_author: "Rhona — Reino Unido",

review_6_text: "Muito limpo e com estacionamento privado.",
review_6_author: "Carla — Portugal",

review_7_text: "Cama confortável e ambiente acolhedor.",
review_7_author: "Alessandro — Itália",

review_8_text: "Localização excelente para explorar Lagos.",
review_8_author: "Emma — Irlanda",

review_9_text: "Piscina fantástica e muita tranquilidade.",
review_9_author: "Lucas — Brasil",

review_10_text: "Staff muito prestável e simpático.",
review_10_author: "Ana — Portugal",

review_11_text: "Apartamento espaçoso e moderno.",
review_11_author: "David — França",

review_12_text: "Perfeito para férias em família.",
review_12_author: "Maria — Espanha",

review_13_text: "Tudo impecável. Recomendo muito.",
review_13_author: "Tom — Reino Unido",

review_14_text: "Ambiente muito calmo e relaxante.",
review_14_author: "Beatriz — Portugal",

review_15_text: "Ótima relação qualidade/preço.",
review_15_author: "Hugo — Bélgica",

review_16_text: "Muito confortável e bem localizado.",
review_16_author: "Laura — Alemanha",

review_17_text: "Anfitrião excelente e muito prestável.",
review_17_author: "Pedro — Portugal",

review_18_text: "Tudo muito limpo e organizado.",
review_18_author: "Sara — Portugal",

review_19_text: "Ideal para quem procura descanso.",
review_19_author: "Marco — Itália",

review_20_text: "Muito acolhedor e bem decorado.",
review_20_author: "Julia — Suécia"

  },
  en: {
    menu_alojamento: "Accommodation",
    menu_comodidades: "Amenities",
    menu_localizacao: "Location",
    menu_contactos: "Contacts",
    hero_local: "Lagos, Algarve, Portugal",
    hero_title: "Your modern retreat in the heart of the Algarve",
    hero_sub: "Bright apartments with pools, peaceful, fully equipped and just minutes from the Marina and the beautiful Meia‑Praia.",
    reserve_here: "Book now!",
   awards_title: "Booking.com Awards",
award_year_2024: "2024",
award_year_2025: "2025",
award_year_2026: "2026",

reviews_title: "What our guests say",

review_1_text: "Excellent location and a very pleasant pool.",
review_1_author: "Ella — United Kingdom",

review_2_text: "Very quiet and perfect for relaxing.",
review_2_author: "Miguel — Portugal",

review_3_text: "Spotless cleaning and very friendly staff.",
review_3_author: "Sofia — Spain",

review_4_text: "Comfortable and well‑equipped apartment.",
review_4_author: "Jonas — Germany",

review_5_text: "Great value for money. We will return!",
review_5_author: "Rhona — United Kingdom",

review_6_text: "Very clean and with private parking.",
review_6_author: "Carla — Portugal",

review_7_text: "Comfortable bed and cozy atmosphere.",
review_7_author: "Alessandro — Italy",

review_8_text: "Excellent location to explore Lagos.",
review_8_author: "Emma — Ireland",

review_9_text: "Fantastic pool and lots of tranquility.",
review_9_author: "Lucas — Brazil",

review_10_text: "Very helpful and friendly staff.",
review_10_author: "Ana — Portugal",

review_11_text: "Spacious and modern apartment.",
review_11_author: "David — France",

review_12_text: "Perfect for family holidays.",
review_12_author: "Maria — Spain",

review_13_text: "Everything impeccable. Highly recommended.",
review_13_author: "Tom — United Kingdom",

review_14_text: "Very calm and relaxing environment.",
review_14_author: "Beatriz — Portugal",

review_15_text: "Great value for money.",
review_15_author: "Hugo — Belgium",

review_16_text: "Very comfortable and well located.",
review_16_author: "Laura — Germany",

review_17_text: "Excellent and very helpful host.",
review_17_author: "Pedro — Portugal",

review_18_text: "Everything very clean and organized.",
review_18_author: "Sara — Portugal",

review_19_text: "Ideal for those seeking rest.",
review_19_author: "Marco — Italy",

review_20_text: "Very cozy and well decorated.",
review_20_author: "Julia — Sweden"

  },
  es: {
    menu_alojamento: "Alojamiento",
    menu_comodidades: "Comodidades",
    menu_localizacao: "Ubicación",
    menu_contactos: "Contactos",
    hero_local: "Lagos, Algarve, Portugal",
    hero_title: "Su refugio moderno en el corazón del Algarve",
    hero_sub: "Apartamentos luminosos con piscinas, tranquilos, totalmente equipados y a pocos minutos de la Marina y de la hermosa Meia‑Praia.",
    reserve_here: "Reserva aquí!",
   awards_title: "Premios Booking.com",
award_year_2024: "2024",
award_year_2025: "2025",
award_year_2026: "2026",

reviews_title: "Lo que dicen nuestros huéspedes",

review_1_text: "Excelente ubicación y piscina muy agradable.",
review_1_author: "Ella — Reino Unido",

review_2_text: "Muy tranquilo e ideal para relajarse.",
review_2_author: "Miguel — Portugal",

review_3_text: "Limpieza impecable y personal muy amable.",
review_3_author: "Sofia — España",

review_4_text: "Apartamento cómodo y bien equipado.",
review_4_author: "Jonas — Alemania",

review_5_text: "Gran relación calidad‑precio. ¡Volveremos!",
review_5_author: "Rhona — Reino Unido",

review_6_text: "Muy limpio y con aparcamiento privado.",
review_6_author: "Carla — Portugal",

review_7_text: "Cama cómoda y ambiente acogedor.",
review_7_author: "Alessandro — Italia",

review_8_text: "Excelente ubicación para explorar Lagos.",
review_8_author: "Emma — Irlanda",

review_9_text: "Piscina fantástica y mucha tranquilidad.",
review_9_author: "Lucas — Brasil",

review_10_text: "Personal muy atento y amable.",
review_10_author: "Ana — Portugal",

review_11_text: "Apartamento espacioso y moderno.",
review_11_author: "David — Francia",

review_12_text: "Perfecto para vacaciones en familia.",
review_12_author: "Maria — España",

review_13_text: "Todo impecable. Muy recomendable.",
review_13_author: "Tom — Reino Unido",

review_14_text: "Ambiente muy tranquilo y relajante.",
review_14_author: "Beatriz — Portugal",

review_15_text: "Excelente relación calidad‑precio.",
review_15_author: "Hugo — Bélgica",

review_16_text: "Muy cómodo y bien ubicado.",
review_16_author: "Laura — Alemania",

review_17_text: "Anfitrión excelente y muy servicial.",
review_17_author: "Pedro — Portugal",

review_18_text: "Todo muy limpio y organizado.",
review_18_author: "Sara — Portugal",

review_19_text: "Ideal para quienes buscan descanso.",
review_19_author: "Marco — Italia",

review_20_text: "Muy acogedor y bien decorado.",
review_20_author: "Julia — Suecia"

  },
  fr: {
    menu_alojamento: "Hébergement",
    menu_comodidades: "Commodités",
    menu_localizacao: "Localisation",
    menu_contactos: "Contacts",
    hero_local: "Lagos, Algarve, Portugal",
    hero_title: "Votre refuge moderne au cœur de l'Algarve",
    hero_sub: "Appartements lumineux avec piscines, calmes, entièrement équipés et à quelques minutes de la Marina et de la magnifique Meia‑Praia.",
    reserve_here: "Réservez ici!",
   awards_title: "Prix Booking.com",
award_year_2024: "2024",
award_year_2025: "2025",
award_year_2026: "2026",

reviews_title: "Ce que disent nos hôtes",

review_1_text: "Excellent emplacement et piscine très agréable.",
review_1_author: "Ella — Royaume‑Uni",

review_2_text: "Très calme et idéal pour se détendre.",
review_2_author: "Miguel — Portugal",

review_3_text: "Propreté impeccable et personnel très sympathique.",
review_3_author: "Sofia — Espagne",

review_4_text: "Appartement confortable et bien équipé.",
review_4_author: "Jonas — Allemagne",

review_5_text: "Excellent rapport qualité‑prix. Nous reviendrons !",
review_5_author: "Rhona — Royaume‑Uni",

review_6_text: "Très propre et avec parking privé.",
review_6_author: "Carla — Portugal",

review_7_text: "Lit confortable et ambiance chaleureuse.",
review_7_author: "Alessandro — Italie",

review_8_text: "Emplacement idéal pour explorer Lagos.",
review_8_author: "Emma — Irlande",

review_9_text: "Piscine fantastique et beaucoup de tranquillité.",
review_9_author: "Lucas — Brésil",

review_10_text: "Personnel très serviable et aimable.",
review_10_author: "Ana — Portugal",

review_11_text: "Appartement spacieux et moderne.",
review_11_author: "David — France",

review_12_text: "Parfait pour des vacances en famille.",
review_12_author: "Maria — Espagne",

review_13_text: "Tout impeccable. Je recommande vivement.",
review_13_author: "Tom — Royaume‑Uni",

review_14_text: "Environnement très calme et relaxant.",
review_14_author: "Beatriz — Portugal",

review_15_text: "Excellent rapport qualité‑prix.",
review_15_author: "Hugo — Belgique",

review_16_text: "Très confortable et bien situé.",
review_16_author: "Laura — Allemagne",

review_17_text: "Hôte excellent et très serviable.",
review_17_author: "Pedro — Portugal",

review_18_text: "Tout très propre et bien organisé.",
review_18_author: "Sara — Portugal",

review_19_text: "Idéal pour ceux qui recherchent le repos.",
review_19_author: "Marco — Italie",

review_20_text: "Très chaleureux et bien décoré.",
review_20_author: "Julia — Suède"

  },
  it: {
    menu_alojamento: "Alloggio",
    menu_comodidades: "Servizi",
    menu_localizacao: "Posizione",
    menu_contactos: "Contatti",
    hero_local: "Lagos, Algarve, Portugal",
    hero_title: "Il tuo rifugio moderno nel cuore dell'Algarve",
    hero_sub: "Appartamenti luminosi con piscine, tranquilli, completamente attrezzati e a pochi minuti dalla Marina e dalla splendida Meia‑Praia.",
    reserve_here: "Prenota qui!",
   awards_title: "Premi Booking.com",
award_year_2024: "2024",
award_year_2025: "2025",
award_year_2026: "2026",

reviews_title: "Cosa dicono i nostri ospiti",

review_1_text: "Ottima posizione e piscina molto piacevole.",
review_1_author: "Ella — Regno Unito",

review_2_text: "Molto tranquillo e ideale per rilassarsi.",
review_2_author: "Miguel — Portogallo",

review_3_text: "Pulizia impeccabile e staff molto gentile.",
review_3_author: "Sofia — Spagna",

review_4_text: "Appartamento confortevole e ben attrezzato.",
review_4_author: "Jonas — Germania",

review_5_text: "Ottimo rapporto qualità‑prezzo. Torneremo!",
review_5_author: "Rhona — Regno Unito",

review_6_text: "Molto pulito e con parcheggio privato.",
review_6_author: "Carla — Portogallo",

review_7_text: "Letto comodo e ambiente accogliente.",
review_7_author: "Alessandro — Italia",

review_8_text: "Ottima posizione per esplorare Lagos.",
review_8_author: "Emma — Irlanda",

review_9_text: "Piscina fantastica e tanta tranquillità.",
review_9_author: "Lucas — Brasile",

review_10_text: "Staff molto disponibile e gentile.",
review_10_author: "Ana — Portogallo",

review_11_text: "Appartamento spazioso e moderno.",
review_11_author: "David — Francia",

review_12_text: "Perfetto per vacanze in famiglia.",
review_12_author: "Maria — Spagna",

review_13_text: "Tutto impeccabile. Consigliatissimo.",
review_13_author: "Tom — Regno Unito",

review_14_text: "Ambiente molto calmo e rilassante.",
review_14_author: "Beatriz — Portogallo",

review_15_text: "Ottimo rapporto qualità‑prezzo.",
review_15_author: "Hugo — Belgio",

review_16_text: "Molto confortevole e ben posizionato.",
review_16_author: "Laura — Germania",

review_17_text: "Host eccellente e molto disponibile.",
review_17_author: "Pedro — Portogallo",

review_18_text: "Tutto molto pulito e organizzato.",
review_18_author: "Sara — Portogallo",

review_19_text: "Ideale per chi cerca riposo.",
review_19_author: "Marco — Italia",

review_20_text: "Molto accogliente e ben decorato.",
review_20_author: "Julia — Svezia"

  },
  de: {
    menu_alojamento: "Unterkunft",
    menu_comodidades: "Ausstattung",
    menu_localizacao: "Lage",
    menu_contactos: "Kontakt",
    hero_local: "Lagos, Algarve, Portugal",
    hero_title: "Ihr modernes Refugium im Herzen der Algarve",
    hero_sub: "Helle Apartments mit Pools, ruhig, komplett ausgestattet und nur wenige Minuten vom Yachthafen und dem wunderschönen Meia‑Praia entfernt.",
    reserve_here: "Jetzt buchen!",
   awards_title: "Booking.com Auszeichnungen",
award_year_2024: "2024",
award_year_2025: "2025",
award_year_2026: "2026",

reviews_title: "Was unsere Gäste sagen",

review_1_text: "Ausgezeichnete Lage und ein sehr angenehmer Pool.",
review_1_author: "Ella — Vereinigtes Königreich",

review_2_text: "Sehr ruhig und ideal zum Entspannen.",
review_2_author: "Miguel — Portugal",

review_3_text: "Makellose Sauberkeit und sehr freundliches Personal.",
review_3_author: "Sofia — Spanien",

review_4_text: "Komfortables und gut ausgestattetes Apartment.",
review_4_author: "Jonas — Deutschland",

review_5_text: "Tolles Preis‑Leistungs‑Verhältnis. Wir kommen wieder!",
review_5_author: "Rhona — Vereinigtes Königreich",

review_6_text: "Sehr sauber und mit privatem Parkplatz.",
review_6_author: "Carla — Portugal",

review_7_text: "Bequemes Bett und gemütliche Atmosphäre.",
review_7_author: "Alessandro — Italien",

review_8_text: "Ausgezeichnete Lage, um Lagos zu erkunden.",
review_8_author: "Emma — Irland",

review_9_text: "Fantastischer Pool und viel Ruhe.",
review_9_author: "Lucas — Brasilien",

review_10_text: "Sehr hilfsbereites und freundliches Personal.",
review_10_author: "Ana — Portugal",

review_11_text: "Geräumiges und modernes Apartment.",
review_11_author: "David — Frankreich",

review_12_text: "Perfekt für Familienurlaube.",
review_12_author: "Maria — Spanien",

review_13_text: "Alles tadellos. Sehr empfehlenswert.",
review_13_author: "Tom — Vereinigtes Königreich",

review_14_text: "Sehr ruhige und entspannende Umgebung.",
review_14_author: "Beatriz — Portugal",

review_15_text: "Tolles Preis‑Leistungs‑Verhältnis.",
review_15_author: "Hugo — Belgien",

review_16_text: "Sehr komfortabel und gut gelegen.",
review_16_author: "Laura — Deutschland",

review_17_text: "Ausgezeichneter und sehr hilfsbereiter Gastgeber.",
review_17_author: "Pedro — Portugal",

review_18_text: "Alles sehr sauber und gut organisiert.",
review_18_author: "Sara — Portugal",

review_19_text: "Ideal für alle, die Ruhe suchen.",
review_19_author: "Marco — Italien",

review_20_text: "Sehr gemütlich und schön dekoriert.",
review_20_author: "Julia — Schweden"

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
