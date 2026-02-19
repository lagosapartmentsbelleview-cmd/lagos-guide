/* -----------------------------------------
   IMPORTA OS TEUS OBJETOS AQUI
   (rules, emergency, beaches, restaurants...)
--------------------------------------------*/

// Exemplo:
// const rules = { pt:"...", en:"...", ... };
// cola aqui TODOS os objetos que já tens


/* -----------------------------------------
   DICIONÁRIO DE CONTEÚDOS
--------------------------------------------*/
const contents = {
  rules,
  emergency,
  beaches,
  restaurants,
  historicalSites,
  museums,
  nightlife,
  supermarkets,
  transport,
  health,
  atms,
  trails,
  boatTours,
  golf
};


/* -----------------------------------------
   TEXTOS DOS BOTÕES
--------------------------------------------*/
const buttonTexts = {
  back: { pt:"⬅️ Voltar", en:"⬅️ Back", es:"⬅️ Volver", fr:"⬅️ Retour", it:"⬅️ Indietro", de:"⬅️ Zurück" },
  print: { pt:"🖨️ Imprimir / Guardar PDF", en:"🖨️ Print / Save PDF", es:"🖨️ Imprimir / Guardar PDF", fr:"🖨️ Imprimer / Enregistrer PDF", it:"🖨️ Stampa / Salva PDF", de:"🖨️ Drucken / PDF speichern" },
  share: { pt:"🔗 Partilhar", en:"🔗 Share", es:"🔗 Compartir", fr:"🔗 Partager", it:"🔗 Condividi", de:"🔗 Teilen" }
};


/* -----------------------------------------
   CATEGORIAS POR IDIOMA
--------------------------------------------*/
const categories = {
  pt: ["📞 Emergência","📋 Regras do Alojamento","🏖️ Praias","🍽️ Restaurantes","🏛️ Locais Históricos","🎨 Museus","🍸 Bares e Vida Noturna","🛒 Supermercados","🚌 Transportes","🏥 Saúde e Farmácias","🏧 ATMs e Bancos","🥾 Trilhos e Caminhadas","⛵ Passeios de Barco","⛳ Campos de Golfe"],
  en: ["📞 Emergency","📋 House Rules","🏖️ Beaches","🍽️ Restaurants","🏛️ Historical Sites","🎨 Museums","🍸 Bars & Nightlife","🛒 Supermarkets","🚌 Transport","🏥 Health & Pharmacies","🏧 ATMs & Banks","🥾 Hiking Trails","⛵ Boat Tours","⛳ Golf Courses"],
  es: ["📞 Emergencia","📋 Reglas del Alojamiento","🏖️ Playas","🍽️ Restaurantes","🏛️ Lugares Históricos","🎨 Museos","🍸 Bares y Vida Nocturna","🛒 Supermercados","🚌 Transportes","🏥 Salud y Farmacias","🏧 Cajeros y Bancos","🥾 Senderos y Caminatas","⛵ Paseos en Barco","⛳ Campos de Golf"],
  fr: ["📞 Urgences","📋 Règles du Logement","🏖️ Plages","🍽️ Restaurants","🏛️ Sites Historiques","🎨 Musées","🍸 Bars & Vie Nocturne","🛒 Supermarchés","🚌 Transports","🏥 Santé & Pharmacies","🏧 Distributeurs & Banques","🥾 Randonnées","⛵ Excursions en Bateau","⛳ Terrains de Golf"],
  it: ["📞 Emergenza","📋 Regole dell'Alloggio","🏖️ Spiagge","🍽️ Ristoranti","🏛️ Siti Storici","🎨 Musei","🍸 Bar & Vita Notturna","🛒 Supermercati","🚌 Trasporti","🏥 Salute & Farmacie","🏧 Bancomat & Banche","🥾 Sentieri e Passeggiate","⛵ Gite in Barca","⛳ Campi da Golf"],
  de: ["📞 Notfall","📋 Hausregeln","🏖️ Strände","🍽️ Restaurants","🏛️ Historische Orte","🎨 Museen","🍸 Bars & Nachtleben","🛒 Supermärkte","🚌 Transport","🏥 Gesundheit & Apotheken","🏧 Geldautomaten & Banken","🥾 Wanderwege","⛵ Bootstouren","⛳ Golfplätze"]
};


/* -----------------------------------------
   FUNÇÃO PARA DEFINIR IDIOMA
--------------------------------------------*/
function setLanguage(lang) {
  const titles = {
    pt: "Guia Belleview Apartments",
    en: "Belleview Apartments Guide",
    es: "Guía de Apartamentos Belleview",
    fr: "Guide des Appartements Belleview",
    it: "Guida Appartamenti Belleview",
    de: "Belleview Apartments Führer"
  };

  document.getElementById("title").innerText = titles[lang];
  document.getElementById("categoriesTitle").innerText =
    "📂 " + (
      lang==="pt" ? "Categorias" :
      lang==="en" ? "Categories" :
      lang==="es" ? "Categorías" :
      lang==="fr" ? "Catégories" :
      lang==="it" ? "Categorie" :
      "Kategorien"
    );

  const list = document.getElementById("categoriesList");
  list.innerHTML = "";
  categories[lang].forEach(cat => {
    const li = document.createElement("li");
    li.innerText = cat;
    li.onclick = () => {
      let key = "";

      if (cat.includes("Regras") || cat.includes("House Rules") || cat.includes("Reglas") || cat.includes("Règles") || cat.includes("Regole") || cat.includes("Hausregeln")) key = "rules";
      else if (cat.includes("Emerg") || cat.includes("Urgenc") || cat.includes("Notfall")) key = "emergency";
      else if (cat.includes("Praias") || cat.includes("Beaches") || cat.includes("Playas") || cat.includes("Plages") || cat.includes("Spiagge") || cat.includes("Strände")) key = "beaches";
      else if (cat.includes("Restaurantes") || cat.includes("Restaurants") || cat.includes("Ristoranti")) key = "restaurants";
      else if (cat.includes("Histó") || cat.includes("Historical") || cat.includes("Historiques") || cat.includes("Storici") || cat.includes("Historische")) key = "historicalSites";
      else if (cat.includes("Museus") || cat.includes("Museums") || cat.includes("Museos") || cat.includes("Musées") || cat.includes("Musei") || cat.includes("Museen")) key = "museums";
      else if (cat.includes("Vida") || cat.includes("Nightlife") || cat.includes("Nachtleben")) key = "nightlife";
      else if (cat.includes("Supermerc") || cat.includes("Superm")) key = "supermarkets";
      else if (cat.includes("Transport") || cat.includes("Transports") || cat.includes("Trasporti")) key = "transport";
      else if (cat.includes("Saúde") || cat.includes("Health") || cat.includes("Salud") || cat.includes("Santé") || cat.includes("Salute") || cat.includes("Gesundheit")) key = "health";
      else if (cat.includes("ATM") || cat.includes("Banco") || cat.includes("Banks") || cat.includes("Bancomat") || cat.includes("Geldautomaten")) key = "atms";
      else if (cat.includes("Trilhos") || cat.includes("Hiking") || cat.includes("Senderos") || cat.includes("Randonnées") || cat.includes("Sentieri") || cat.includes("Wanderwege")) key = "trails";
      else if (cat.includes("Passeios") || cat.includes("Boat") || cat.includes("Barco") || cat.includes("Bateau") || cat.includes("Barca") || cat.includes("Boot")) key = "boatTours";
      else if (cat.includes("Golf")) key = "golf";

      showCategory(lang, key, cat);
    };
    list.appendChild(li);
  });

  document.getElementById("languageMenu").style.display="none";
  document.getElementById("choose").style.display="none";
  document.getElementById("categories").style.display="block";

  document.getElementById("catBackTop").innerText = buttonTexts.back[lang];
  document.getElementById("catPrintTop").innerText = buttonTexts.print[lang];
  document.getElementById("catShareTop").innerText = buttonTexts.share[lang];
  document.getElementById("catBackBottom").innerText = buttonTexts.back[lang];
}


/* -----------------------------------------
   MOSTRAR CATEGORIA
--------------------------------------------*/
function showCategory(lang, key, catName) {
  document.getElementById("categories").style.display="none";
  document.getElementById("categoryContent").style.display="block";
  document.getElementById("categoryTitle").innerText = catName;

  if (contents[key]) {
    document.getElementById("categoryText").innerHTML = contents[key][lang];
  } else {
    document.getElementById("categoryText").innerHTML = "<p>Conteúdo desta categoria ainda em desenvolvimento.</p>";
  }

  document.getElementById("catBackTopContent").innerText = buttonTexts.back[lang];
  document.getElementById("catPrintContent").innerText = buttonTexts.print[lang];
  document.getElementById("catShareContent").innerText = buttonTexts.share[lang];
  document.getElementById("catBackBottomContent").innerText = buttonTexts.back[lang];
}


/* -----------------------------------------
   VOLTAR À LISTA
--------------------------------------------*/
function showCategories() {
  document.getElementById("categoryContent").style.display="none";
  document.getElementById("categories").style.display="block";
}


/* -----------------------------------------
   PARTILHAR GUIA
--------------------------------------------*/
function shareGuide() {
  const url = window.location.href;
  const text = "Guia Belleview Apartments - veja aqui: " + url;

  if (navigator.share) {
    navigator.share({ title: "Guia Belleview Apartments", text, url });
  } else {
    const whatsappUrl = "https://wa.me/?text=" + encodeURIComponent(text);
    const mailUrl = "mailto:?subject=Guia Belleview Apartments&body=" + encodeURIComponent(text);
    const choice = prompt("Escolha como partilhar:\n1 - WhatsApp\n2 - Email\n3 - Copiar link");

    if (choice === "1") window.open(whatsappUrl, "_blank");
    else if (choice === "2") window.location.href = mailUrl;
    else if (choice === "3") {
      navigator.clipboard.writeText(url);
      alert("Link copiado!");
    }
  }
}
