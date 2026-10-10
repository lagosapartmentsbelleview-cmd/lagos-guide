// ============================================================
// 1. INICIALIZAÇÃO E MANIPULAÇÃO DO DOM & FAQ
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[required]").forEach(el => el.removeAttribute("required"));

  const faqModal = document.getElementById("faqModal");
  const closeFaqBtn = document.getElementById("closeFaqModal") || 
                      document.querySelector(".close-faq") || 
                      document.querySelector("#faqModal .close");

  if (closeFaqBtn) {
    closeFaqBtn.addEventListener("click", () => {
      if (faqModal) faqModal.style.display = "none";
    });
  }

  window.addEventListener("click", (e) => {
    if (faqModal && e.target === faqModal) {
      faqModal.style.display = "none";
    }
  });
});

// ============================================================
// 2. LISTAS DE PAÍSES TRADUZIDAS E ORDENADAS (6 IDIOMAS)
// ============================================================
const countryLists = {
  pt: [
    "Afeganistão","África do Sul","Albânia","Alemanha","Andorra","Angola","Antígua e Barbuda","Arábia Saudita","Argélia","Argentina","Arménia","Austrália","Áustria","Azerbaijão",
    "Bahamas","Bangladesh","Barbados","Barém","Bélgica","Belize","Benim","Bielorrússia","Bolívia","Bósnia e Herzegovina","Botsuana","Brasil","Brunei","Bulgária","Burquina Faso","Burundi","Butão",
    "Cabo Verde","Camarões","Camboja","Canadá","Catar","Cazaquistão","Chade","Chile","China","Chipre","Colômbia","Comores","Coreia do Norte","Coreia do Sul","Costa do Marfim","Costa Rica","Croácia","Cuba",
    "Dinamarca","Dominica","Egipto","Emirados Árabes Unidos","Equador","Eritreia","Eslováquia","Eslovénia","Espanha","Estados Unidos","Estónia","Etiópia",
    "Fiji","Filipinas","Finlândia","França","Gabão","Gâmbia","Gana","Geórgia","Granada","Grécia","Guatemala","Guiana","Guiné","Guiné-Bissau","Guiné Equatorial",
    "Haiti","Honduras","Hungria","Iémen","Ilhas Marechal","Índia","Indonésia","Irão","Iraque","Irlanda","Islândia","Israel","Itália","Jamaica","Japão","Jordânia",
    "Koweit","Laos","Lesoto","Letónia","Líbano","Libéria","Líbia","Liechtenstein","Lituânia","Luxemburgo",
    "Macedónia do Norte","Madagáscar","Malásia","Malaui","Maldivas","Mali","Malta","Marrocos","Maurícia","Mauritânia","México","Micronésia","Moçambique","Moldávia","Mónaco","Mongólia","Montenegro","Mianmar",
    "Namíbia","Nauru","Nepal","Nicarágua","Níger","Nigéria","Noruega","Nova Zelândia","Omã",
    "Países Baixos","Paquistão","Palau","Panamá","Papua-Nova Guiné","Paraguai","Peru","Polónia","Portugal",
    "Reino Unido","República Centro-Africana","República Checa","República Democrática do Congo","República do Congo","República Dominicana","Roménia","Ruanda","Rússia",
    "Samoa","Santa Lúcia","São Cristóvão e Neves","São Marino","São Tomé e Príncipe","São Vicente e Granadinas","Senegal","Serra Leoa","Sérvia","Seicheles","Singapura","Síria","Somália","Sri Lanka","Eswatini","Sudão","Sudão do Sul","Suécia","Suíça","Suriname",
    "Tailândia","Taiwan","Tajiquistão","Tanzânia","Timor-Leste","Togo","Tonga","Trinidad e Tobago","Tunísia","Turquemenistão","Turquia","Tuvalu",
    "Ucrânia","Uganda","Uruguai","Uzbequistão","Vanuatu","Vaticano","Venezuela","Vietname","Zâmbia","Zimbabué"
  ],
  en: ["Portugal","United Kingdom","Germany","France","Spain","Italy","Netherlands","Belgium","Switzerland","Ireland","Brazil","Canada","United States","Afghanistan","Albania","Algeria","Andorra","Angola","Argentina","Australia","Austria","Bolivia","Bhutan","China","Denmark","Egypt","Finland","Greece","India","Israel","Japan","Luxembourg","Mexico","Morocco","Norway","Poland","Romania","Russia","Sweden","Turkey","Ukraine"],
  fr: ["Portugal","France","Royaume-Uni","Allemagne","Espagne","Italie","Belgique","Suisse","Pays-Bas","Irlande","Brésil","Canada","États-Unis","Afghanistan","Algérie","Andorre","Angola","Argentine","Australie","Autriche","Bolivie","Bhoutan","Chine","Danemark","Finlande","Grèce","Luxembourg","Maroc","Norvège","Pologne","Suède"],
  es: ["Portugal","España","Reino Unido","Alemania","Francia","Italia","Países Bajos","Bélgica","Suiza","Irlanda","Brasil","Argentina","Canadá","Chile","Colombia","Estados Unidos","México","Uruguay","Venezuela","Afganistán","Andorra","Angola","Australia","Austria","Bolivia","Bután","Dinamarca","Ecuador","Grecia","Noruega","Perú","Polonia","Suecia"],
  it: ["Portogallo","Italia","Regno Unito","Germania","Francia","Spagna","Paesi Bassi","Belgio","Svizzera","Irlanda","Brasile","Canada","Stati Uniti","Afghanistan","Albania","Algeria","Andorra","Angola","Argentina","Australia","Austria","Bhutan","Bolivia","Cina","Danimarca","Giappone","Grecia","Lussemburgo","Marocco","Norvegia","Polonia","Svezia"],
  de: ["Portugal","Deutschland","Großbritannien","Frankreich","Spanien","Italien","Niederlande","Belgien","Schweiz","Österreich","Irland","Brasilien","Kanada","USA","Afghanistan","Ägypten","Albanien","Algerien","Andorra","Angola","Argentinien","Australien","Bhutan","Bolivien","Dänemark","Finnland","Griechenland","Luxemburg","Marokko","Norwegen","Polen","Schweden","Tschechien","Türkei"]
};

// ============================================================
// 3. MAPA DE CONVERSÃO PARA CÓDIGOS ISO-3 (SUPORTE SIBA)
// ============================================================
const paisesIso3Map = {
  "Afeganistão": "AFG", "África do Sul": "ZAF", "Albânia": "ALB", "Alemanha": "DEU", "Andorra": "AND", "Angola": "AGO", "Antígua e Barbuda": "ATG", "Arábia Saudita": "SAU", "Argélia": "DZA", "Argentina": "ARG", "Arménia": "ARM", "Austrália": "AUS", "Áustria": "AUT", "Azerbaijão": "AZE",
  "Bahamas": "BHS", "Bangladesh": "BGD", "Barbados": "BRB", "Barém": "BHR", "Bélgica": "BEL", "Belize": "BLZ", "Benim": "BEN", "Bielorrússia": "BLR", "Bolívia": "BOL", "Bósnia e Herzegovina": "BIH", "Botsuana": "BWA", "Brasil": "BRA", "Brunei": "BRN", "Bulgária": "BGR", "Burquina Faso": "BFA", "Burundi": "BDI", "Butão": "BTN",
  "Cabo Verde": "CPV", "Camarões": "CMR", "Camboja": "KHM", "Canadá": "CAN", "Catar": "QAT", "Cazaquistão": "KAZ", "Chade": "TCD", "Chile": "CHL", "China": "CHN", "Chipre": "CYP", "Colômbia": "COL", "Comores": "COM", "Coreia do Norte": "PRK", "Coreia do Sul": "KOR", "Costa do Marfim": "CIV", "Costa Rica": "CRI", "Croácia": "HRV", "Cuba": "CUB",
  "Dinamarca": "DNK", "Dominica": "DMA", "Egipto": "EGY", "Emirados Árabes Unidos": "ARE", "Equador": "ECU", "Eritreia": "ERI", "Eslováquia": "SVK", "Eslovénia": "SVN", "Espanha": "ESP", "Estados Unidos": "USA", "Estónia": "EST", "Etiópia": "ETH",
  "Fiji": "FJI", "Filipinas": "PHL", "Finlândia": "FIN", "França": "FRA", "Gabão": "GAB", "Gâmbia": "GMB", "Gana": "GHA", "Geórgia": "GEO", "Granada": "GRD", "Grécia": "GRC", "Guatemala": "GTM", "Guiana": "GUY", "Guiné": "GIN", "Guiné-Bissau": "GNB", "Guiné Equatorial": "GNQ",
  "Haiti": "HTI", "Honduras": "HND", "Hungria": "HUN", "Iémen": "YEM", "Ilhas Marechal": "MHL", "Índia": "IND", "Indonésia": "IDN", "Irão": "IRN", "Iraque": "IRQ", "Irlanda": "IRL", "Islândia": "ISL", "Israel": "ISR", "Itália": "ITA", "Jamaica": "JAM", "Japão": "JPN", "Jordânia": "JOR",
  "Koweit": "KWT", "Laos": "LAO", "Lesoto": "LSO", "Letónia": "LVA", "Líbano": "LBN", "Libéria": "LBR", "Líbia": "LBY", "Liechtenstein": "LIE", "Lituânia": "LTU", "Luxemburgo": "LUX",
  "Macedónia do Norte": "MKD", "Madagáscar": "MDG", "Malásia": "MYS", "Malaui": "MWI", "Maldivas": "MDV", "Mali": "MLI", "Malta": "MLT", "Marrocos": "MAR", "Maurícia": "MUS", "Mauritânia": "MRT", "México": "MEX", "Micronésia": "FSM", "Moçambique": "MOZ", "Moldávia": "MDA", "Mónaco": "MCO", "Mongólia": "MNG", "Montenegro": "MNE", "Mianmar": "MMR",
  "Namíbia": "NAM", "Nauru": "NRU", "Nepal": "NPL", "Nicarágua": "NIC", "Níger": "NER", "Nigéria": "NGA", "Noruega": "NOR", "Nova Zelândia": "NZL", "Omã": "OMN",
  "Países Baixos": "NLD", "Paquistão": "PAK", "Palau": "PLW", "Panamá": "PAN", "Papua-Nova Guiné": "PNG", "Paraguai": "PRY", "Peru": "PER", "Polónia": "POL", "Portugal": "PRT",
  "Reino Unido": "GBR", "República Centro-Africana": "CAF", "República Checa": "CZE", "República Democrática do Congo": "COD", "República do Congo": "COG", "República Dominicana": "DOM", "Roménia": "ROU", "Ruanda": "RWA", "Rússia": "RUS",
  "Samoa": "WSM", "Santa Lúcia": "LCA", "São Cristóvão e Neves": "KNA", "São Marino": "SMR", "São Tomé e Príncipe": "STP", "São Vicente e Granadinas": "VCT", "Senegal": "SEN", "Serra Leoa": "SLE", "Sérvia": "SRB", "Seicheles": "SYC", "Singapura": "SGP", "Síria": "SYR", "Somália": "SOM", "Sri Lanka": "LKA", "Eswatini": "SWZ", "Sudão": "SDN", "Sudão do Sul": "SSD", "Suécia": "SWE", "Suíça": "CHE", "Suriname": "SUR",
  "Tailândia": "THA", "Taiwan": "TWN", "Tajiquistão": "TJK", "Tanzânia": "TZA", "Timor-Leste": "TLS", "Togo": "TGO", "Tonga": "TON", "Trinidad e Tobago": "TTO", "Tunísia": "TUN", "Turquemenistão": "TKM", "Turquia": "TUR", "Tuvalu": "TUV",
  "Ucrânia": "UKR", "Uganda": "UGA", "Uruguai": "URY", "Uzbequistão": "UZB", "Vanuatu": "VUT", "Vaticano": "VAT", "Venezuela": "VEN", "Vietname": "VNM", "Zâmbia": "ZMB", "Zimbabué": "ZWE",
  "Spain": "ESP", "France": "FRA", "Germany": "DEU", "United Kingdom": "GBR", "Italy": "ITA", "Netherlands": "NLD", "Belgium": "BEL", "Switzerland": "CHE", "Ireland": "IRL", "Brazil": "BRA", "Canada": "CAN", "United States": "USA"
};

function converterParaIso3(nomePais) {
  if (!nomePais) return "PRT";
  const limpo = String(nomePais).trim();
  if (/^[A-Za-z]{3}$/.test(limpo)) return limpo.toUpperCase();
  return paisesIso3Map[limpo] || "PRT";
}

// ============================================================
// 4. DICIONÁRIO DE TEXTOS E IDIOMAS (TEXTS)
// ============================================================
const texts = {
  pt: {
    subtitle: "Formulário obrigatório de Boletim de Alojamento (AIMA, antigo SEF).",
    legalHtml: `
      <h3><strong>Aviso Legal Obrigatório — Registo de Hóspedes (AIMA/SIBA)</strong></h3>
      <p>Este formulário recolhe os dados obrigatórios de identificação de todos os hóspedes, conforme exigido pela legislação portuguesa para comunicação à AIMA (Agência para a Integração, Migrações e Asilo), através da plataforma SIBA.</p>
      <h4><strong>Por que motivo os seus dados são obrigatórios?</strong></h4>
      <p>Nos termos do <strong>Artigo 45.º da Lei n.º 23/2007</strong>, todos os estabelecimentos de Alojamento Local são legalmente obrigados a comunicar às autoridades de fronteira a entrada, permanência e saída de cidadãos estrangeiros no território nacional.</p>
      <p>Esta obrigação aplica-se a <strong>todos os hóspedes sem nacionalidade portuguesa</strong>, incluindo <strong>crianças e bebés</strong>, sem exceção.</p>
      <h4><strong>Para que servem estes dados?</strong></h4>
      <ul>
          <li><strong>Segurança Nacional:</strong> Apoiam a prevenção e investigação de crimes graves, terrorismo e redes transfronteiriças.</li>
          <li><strong>Proteção do Hóspede:</strong> Em caso de acidente, emergência médica, catástrofe natural ou desaparecimento, permitem às autoridades e embaixadas identificar e localizar rapidamente os cidadãos.</li>
          <li><strong>Gestão Pública:</strong> Contribuem para estatísticas oficiais e políticas de migração e turismo.</li>
      </ul>
      <h4><strong>Obrigatoriedade e consequências da recusa</strong></h4>
      <p>A prestação destes dados é <strong>estritamente obrigatória por lei</strong>. A recusa em fornecer as informações necessárias impede legalmente a realização do check-in e implica a <strong>anulação imediata da reserva sem direito a reembolso</strong>.</p>
      <h4><strong>Privacidade e proteção dos seus dados</strong></h4>
      <p>Os dados recolhidos são utilizados exclusivamente para cumprimento desta obrigação legal e tratados em conformidade com o <strong>Regulamento Geral sobre a Proteção de Dados (RGPD)</strong>.</p>
      <p><a href="/docs/sef.pdf" target="_blank" class="pdf-link">Verificar a informação em PDF</a> | <a id="openFaqModal" class="faq-link">Perguntas Frequentes (FAQ)</a></p>
    `,
    formTitle: "Boletim de Alojamento",
    requiredNotice: "Preenchimento e envio obrigatório dos dados de todos os hóspedes adultos e crianças",
    stayDataTitle: "Dados da Estadia",
    checkinLabel: "Data de Check-in:",
    checkoutLabel: "Data de Check-out:",
    adultsLabel: "Nº de Hóspedes Adultos:",
    childrenLabel: "Nº de Hóspedes Crianças:",
    wants_copy_title: "Pretende cópia deste formulário no seu e-mail?",
    radio_yes: "Sim",
    radio_no: "Não",
    email_label: "O seu E-mail:",
    guestTitle: i => `Hóspede ${i}`,
    fields: {
      fullName: "Nome Completo:",
      birthDate: "Data de Nascimento:",
      nationality: "Nacionalidade:",
      residenceCountry: "País de Residência:",
      docNumber: "Número do Documento:",
      docType: "Tipo de Documento:",
      docTypePassport: "Passaporte",
      docTypeID: "Bilhete de Identidade / Cartão de Cidadão",
      docTypeOther: "Outro",
      docTypeOtherLabel: "Qual?",
      docCountry: "País Emissor do Documento:"
    },
    placeholder_select: "Selecione",
    subject: "Cópia do Registo de Hóspedes - AIMA",
    aima_success: "Formulário enviado com sucesso!"
  },
  en: {
    subtitle: "Mandatory Accommodation Registration Form (AIMA, formerly SEF).",
    legalHtml: `<h3><strong>Mandatory Legal Notice — Guest Registration (AIMA/SIBA)</strong></h3><p>Portuguese law requires all non-Portuguese guests to register.</p>`,
    formTitle: "Accommodation Registration Form",
    requiredNotice: "Mandatory completion and submission of all data for every adult and child guest",
    stayDataTitle: "Stay Information",
    checkinLabel: "Check‑in Date:",
    checkoutLabel: "Check‑out Date:",
    adultsLabel: "Number of Adult Guests:",
    childrenLabel: "Number of Child Guests:",
    wants_copy_title: "Would you like a copy of this form sent to your email?",
    radio_yes: "Yes",
    radio_no: "No",
    email_label: "Your Email:",
    guestTitle: i => `Guest ${i}`,
    fields: {
      fullName: "Full Name:",
      birthDate: "Date of Birth:",
      nationality: "Nationality:",
      residenceCountry: "Country of Residence:",
      docNumber: "Document Number:",
      docType: "Document Type:",
      docTypePassport: "Passport",
      docTypeID: "Identity Card",
      docTypeOther: "Other",
      docTypeOtherLabel: "Which one?",
      docCountry: "Issuing Country:"
    },
    placeholder_select: "Select",
    subject: "Guest Registration Copy - AIMA",
    aima_success: "Form submitted successfully!"
  },
  es: {
    subtitle: "Formulario obligatorio de Registro de Alojamiento (AIMA, antiguo SEF).",
    legalHtml: `<h3><strong>Aviso Legal Obligatorio — Registro de Huéspedes (AIMA/SIBA)</strong></h3>`,
    formTitle: "Registro de Alojamiento",
    requiredNotice: "Relleno y envío obligatorios de los datos de todos los huéspedes",
    stayDataTitle: "Datos de la Estancia",
    checkinLabel: "Fecha de Check‑in:",
    checkoutLabel: "Fecha de Check‑out:",
    adultsLabel: "Número de Huéspedes Adultos:",
    childrenLabel: "Número de Huéspedes Niños:",
    wants_copy_title: "¿Desea una copia de este formulario en su correo electrónico?",
    radio_yes: "Sí",
    radio_no: "No",
    email_label: "Su Correo Electrónico:",
    guestTitle: i => `Huésped ${i}`,
    fields: {
      fullName: "Nombre Completo:",
      birthDate: "Fecha de Nacimiento:",
      nationality: "Nacionalidad:",
      residenceCountry: "País de Residencia:",
      docNumber: "Número del Documento:",
      docType: "Tipo de Documento:",
      docTypePassport: "Pasaporte",
      docTypeID: "Documento de Identidad",
      docTypeOther: "Otro",
      docTypeOtherLabel: "¿Cuál?",
      docCountry: "País Emisor:"
    },
    placeholder_select: "Seleccionar",
    subject: "Copia de Registro de Huéspedes - AIMA",
    aima_success: "¡Formulario enviado com éxito!"
  },
  fr: {
    subtitle: "Formulaire obligatoire d’Enregistrement des Hébergements (AIMA).",
    legalHtml: `<h3><strong>Avis Légal Obligatoire — Enregistrement des Hôtes (AIMA/SIBA)</strong></h3>`,
    formTitle: "Formulaire d’Enregistrement",
    requiredNotice: "Remplissage et envoi obligatoires des données",
    stayDataTitle: "Données du Séjour",
    checkinLabel: "Date d’Arrivée :",
    checkoutLabel: "Date de Départ :",
    adultsLabel: "Nombre d’Adultes :",
    childrenLabel: "Nombre d’Enfants :",
    wants_copy_title: "Souhaitez-vous une copie de ce formulaire par e-mail ?",
    radio_yes: "Oui",
    radio_no: "Non",
    email_label: "Votre E-mail :",
    guestTitle: i => `Hôte ${i}`,
    fields: {
      fullName: "Nom Complet :",
      birthDate: "Date de Naissance :",
      nationality: "Nationalité :",
      residenceCountry: "Pays de Résidence :",
      docNumber: "Numéro du Document :",
      docType: "Type de Document :",
      docTypePassport: "Passeport",
      docTypeID: "Carte d’Identité",
      docTypeOther: "Autre",
      docTypeOtherLabel: "Lequel ?",
      docCountry: "Pays Émetteur :"
    },
    placeholder_select: "Sélectionner",
    subject: "Copie d’Enregistrement - AIMA",
    aima_success: "Formulaire envoyé avec succès !"
  },
  it: {
    subtitle: "Modulo obbligatorio di Registrazione degli Ospiti (AIMA).",
    legalHtml: `<h3><strong>Avviso Legale Obbligatorio — Registrazione degli Ospiti (AIMA/SIBA)</strong></h3>`,
    formTitle: "Modulo di Registrazione",
    requiredNotice: "Compilazione e invio obbligatori dei dati",
    stayDataTitle: "Dati del Soggiorno",
    checkinLabel: "Data di Check‑in:",
    checkoutLabel: "Data di Check‑out:",
    adultsLabel: "Numero di Ospiti Adulti:",
    childrenLabel: "Numero di Ospiti Bambini:",
    wants_copy_title: "Vuoi una copia di questo modulo nella tua email?",
    radio_yes: "Sì",
    radio_no: "No",
    email_label: "La tua Email:",
    guestTitle: i => `Ospite ${i}`,
    fields: {
      fullName: "Nome Completo:",
      birthDate: "Data di Nascita:",
      nationality: "Nazionalità:",
      residenceCountry: "Paese di Residenza:",
      docNumber: "Numero del Documento:",
      docType: "Tipo di Documento:",
      docTypePassport: "Passaporto",
      docTypeID: "Carta d’Identità",
      docTypeOther: "Altro",
      docTypeOtherLabel: "Quale?",
      docCountry: "Paese di Emissione:"
    },
    placeholder_select: "Seleziona",
    subject: "Copia di Registrazione - AIMA",
    aima_success: "Modulo inviato con successo!"
  },
  de: {
    subtitle: "Pflichtformular zur Gästeanmeldung (AIMA).",
    legalHtml: `<h3><strong>Gesetzlich vorgeschriebener Hinweis — Gästeanmeldung (AIMA/SIBA)</strong></h3>`,
    formTitle: "Gästeanmeldeformular",
    requiredNotice: "Pflichtangabe und Übermittlung aller Daten",
    stayDataTitle: "Angaben zum Aufenthalt",
    checkinLabel: "Check‑in‑Datum:",
    checkoutLabel: "Check‑out‑Datum:",
    adultsLabel: "Anzahl der erwachsenen Gäste:",
    childrenLabel: "Anzahl der Kinder:",
    wants_copy_title: "Möchten Sie eine Kopie dieses Formulars per E-Mail?",
    radio_yes: "Ja",
    radio_no: "Nein",
    email_label: "Ihre E-Mail:",
    guestTitle: i => `Gast ${i}`,
    fields: {
      fullName: "Vollständiger Name:",
      birthDate: "Geburtsdatum:",
      nationality: "Staatsangehörigkeit:",
      residenceCountry: "Wohnsitzland:",
      docNumber: "Dokumentnummer:",
      docType: "Dokumenttyp:",
      docTypePassport: "Reisepass",
      docTypeID: "Personalausweis",
      docTypeOther: "Andere",
      docTypeOtherLabel: "Welche?",
      docCountry: "Ausstellungsland:"
    },
    placeholder_select: "Auswählen",
    subject: "Gästeanmeldung Kopie - AIMA",
    aima_success: "Formular erfolgreich gesendet!"
  }
};

let currentLang = "pt";

function setLanguage(lang) {
  currentLang = texts[lang] ? lang : "pt";
  const t = texts[currentLang];
  document.documentElement.lang = currentLang;

  if (document.getElementById("subtitle-text")) document.getElementById("subtitle-text").textContent = t.subtitle;
  if (document.getElementById("legalInfo")) document.getElementById("legalInfo").innerHTML = t.legalHtml;
  if (document.getElementById("aimaFormSection")) document.getElementById("aimaFormSection").style.display = "block";
  if (document.getElementById("formTitle")) document.getElementById("formTitle").textContent = t.formTitle;
  if (document.getElementById("stayDataTitle")) document.getElementById("stayDataTitle").textContent = t.stayDataTitle;
  if (document.getElementById("checkinLabel")) document.getElementById("checkinLabel").textContent = t.checkinLabel;
  if (document.getElementById("checkoutLabel")) document.getElementById("checkoutLabel").textContent = t.checkoutLabel;
  if (document.getElementById("adultsLabel")) document.getElementById("adultsLabel").textContent = t.adultsLabel;
  if (document.getElementById("childrenLabel")) document.getElementById("childrenLabel").textContent = t.childrenLabel;
  if (document.getElementById("submitLabel")) document.getElementById("submitLabel").textContent = t.submit || "Enviar Boletim de Alojamento";
  if (document.getElementById("requiredNotice")) document.getElementById("requiredNotice").textContent = t.requiredNotice;

  if (document.getElementById("labelWantsCopy")) document.getElementById("labelWantsCopy").textContent = t.wants_copy_title;
  if (document.getElementById("labelRadioYes")) document.getElementById("labelRadioYes").textContent = t.radio_yes;
  if (document.getElementById("labelRadioNo")) document.getElementById("labelRadioNo").textContent = t.radio_no;
  if (document.getElementById("labelClientEmail")) document.getElementById("labelClientEmail").textContent = t.email_label;

  generateGuestFields();
}

// ============================================================
// 5. GERAÇÃO DINÂMICA DE HÓSPEDES
// ============================================================
function generateGuestFields() {
  const t = texts[currentLang] || texts.pt;
  const activeCountries = countryLists[currentLang] || countryLists.pt;
  
  const adultsInput = document.getElementById("adults");
  const childrenInput = document.getElementById("children");
  const guestsContainerEl = document.getElementById("guestsContainer");

  const adults = parseInt(adultsInput?.value || "1", 10);
  const children = parseInt(childrenInput?.value || "0", 10);
  const total = adults + children;

  if (!guestsContainerEl) return;
  guestsContainerEl.innerHTML = "";

  for (let i = 1; i <= total; i++) {
    const card = document.createElement("div");
    card.className = "form-card guest-card";

    card.innerHTML = `
      <h4>${typeof t.guestTitle === 'function' ? t.guestTitle(i) : 'Hóspede ' + i}</h4>

      <div class="form-row">
        <label>${t.fields.fullName}</label>
        <input type="text" name="guest_${i}_fullName" required>
      </div>

      <div class="form-row">
        <label>${t.fields.birthDate}</label>
        <input type="date" name="guest_${i}_birthDate" required>
      </div>

      <div class="form-row">
        <label>${t.fields.nationality}</label>
        <select name="guest_${i}_nationality" required>
          <option value="" disabled selected hidden>${t.placeholder_select}</option>
          ${activeCountries.map(c => `<option value="${c}">${c}</option>`).join("")}
        </select>
      </div>

      <div class="form-row">
        <label>${t.fields.residenceCountry}</label>
        <select name="guest_${i}_residenceCountry" required>
          <option value="" disabled selected hidden>${t.placeholder_select}</option>
          ${activeCountries.map(c => `<option value="${c}">${c}</option>`).join("")}
        </select>
      </div>

      <div class="form-row">
        <label>${t.fields.docNumber}</label>
        <input type="text" name="guest_${i}_docNumber" required>
      </div>

      <div class="form-row">
        <label>${t.fields.docType}</label>
        <select name="guest_${i}_docType" id="docType_${i}" required>
          <option value="" disabled selected hidden>${t.placeholder_select}</option>
          <option value="passport">${t.fields.docTypePassport}</option>
          <option value="id">${t.fields.docTypeID}</option>
          <option value="other">${t.fields.docTypeOther}</option>
        </select>
      </div>

      <div class="form-row" id="otherDocField_${i}" style="display: none;">
        <label>${t.fields.docTypeOtherLabel}</label>
        <input type="text" name="guest_${i}_docOther">
      </div>

      <div class="form-row">
        <label>${t.fields.docCountry}</label>
        <select name="guest_${i}_docCountry" required>
          <option value="" disabled selected hidden>${t.placeholder_select}</option>
          ${activeCountries.map(c => `<option value="${c}">${c}</option>`).join("")}
        </select>
      </div>
    `;

    guestsContainerEl.appendChild(card);

    const docTypeSelect = card.querySelector(`#docType_${i}`);
    const otherField = card.querySelector(`#otherDocField_${i}`);
    if (docTypeSelect && otherField) {
      docTypeSelect.addEventListener("change", () => {
        otherField.style.display = docTypeSelect.value === "other" ? "block" : "none";
      });
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const adultsInput = document.getElementById("adults");
  const childrenInput = document.getElementById("children");

  if (adultsInput) adultsInput.addEventListener("input", generateGuestFields);
  if (childrenInput) childrenInput.addEventListener("input", generateGuestFields);
});

// ============================================================
// 6. SUBMISSÃO DO FORMULÁRIO (FIREBASE + EMAILJS + SIBA)
// ============================================================
const aimaFormEl = document.getElementById("aimaForm");
if (aimaFormEl) {
  aimaFormEl.addEventListener("submit", async function (e) {
    e.preventDefault();

    const t = texts[currentLang] || texts.pt;
    const checkin = document.getElementById("checkinDate").value;
    const checkout = document.getElementById("checkoutDate").value;

    if (!checkin || !checkout) {
      alert("Por favor preencha as datas de check-in e check-out.");
      return;
    }

    if (new Date(checkin) >= new Date(checkout)) {
      alert("A data de check-out deve ser posterior à data de check-in.");
      return;
    }

    const adults = parseInt(document.getElementById("adults")?.value || "1", 10);
    const children = parseInt(document.getElementById("children")?.value || "0", 10);
    const totalGuests = adults + children;
    const unidadeSelecionada = document.getElementById("hiddenUnidade")?.value || "2203";

    const hospedes = [];
    let resumoHospedesTexto = "";

    for (let i = 1; i <= totalGuests; i++) {
      const nome = document.querySelector(`[name="guest_${i}_fullName"]`)?.value.trim() || "";
      const nascimento = document.querySelector(`[name="guest_${i}_birthDate"]`)?.value || "";
      const nacBruta = document.querySelector(`[name="guest_${i}_nationality"]`)?.value || "";
      const resBruta = document.querySelector(`[name="guest_${i}_residenceCountry"]`)?.value || "";
      const docTipo = document.querySelector(`[name="guest_${i}_docType"]`)?.value || "";
      const docNumero = document.querySelector(`[name="guest_${i}_docNumber"]`)?.value.trim() || "";
      const docOutro = document.querySelector(`[name="guest_${i}_docOther"]`)?.value.trim() || "";
      const docPaisBruto = document.querySelector(`[name="guest_${i}_docCountry"]`)?.value || "";

      // Conversão automática para códigos ISO-3 para o painel SIBA funcionar perfeitamente
      const nacIso = converterParaIso3(nacBruta);
      const resIso = converterParaIso3(resBruta);
      const docPaisIso = converterParaIso3(docPaisBruto);

      hospedes.push({
        nome: nome,
        dataNascimento: nascimento,
        nacionalidade: nacIso,
        paisResidencia: resIso,
        docTipo: docTipo,
        docNumero: docNumero,
        docOutroDesc: docOutro,
        docPaisEmissor: docPaisIso
      });

      resumoHospedesTexto += `\n- Hóspede ${i}: ${nome} | Nasc: ${nascimento} | Nac: ${nacIso} | Doc: ${docTipo.toUpperCase()} ${docNumero} (${docPaisIso})`;
    }

    const selectedCopy = document.querySelector('input[name="wantsCopyRadio"]:checked')?.value;
    const wantsCopy = selectedCopy === "sim";
    const emailDigitado = document.getElementById("clientEmail")?.value.trim() || "";

    const novoBoletim = {
      criadoEm: typeof firebase !== 'undefined' ? firebase.firestore.FieldValue.serverTimestamp() : new Date().toISOString(),
      dataCheckin: checkin,
      dataCheckout: checkout,
      numAdultos: adults,
      numCriancas: children,
      emailCliente: emailDigitado,
      pediuCopia: wantsCopy,
      hospedes: hospedes,
      unidade: unidadeSelecionada,
      apartamento: unidadeSelecionada,
      status: "PENDENTE"
    };

    const submitBtn = document.getElementById("submitLabel") || this.querySelector('button[type="submit"]');
    const originalText = submitBtn ? submitBtn.textContent : "Enviar";

    if (submitBtn) {
      submitBtn.textContent = "A enviar...";
      submitBtn.disabled = true;
    }

    try {
      // 1. Gravar no Firestore do Firebase
      if (typeof db !== 'undefined') {
        await db.collection("boletins").add(novoBoletim);
      }

      // 2. Guardar no armazenamento local do painel SIBA (aimasiba.js)
      if (typeof guardarBoletimPendente === "function") {
        guardarBoletimPendente({
          ...novoBoletim,
          criadoEm: new Date().toISOString()
        });
      }

      // 3. Enviar notificações via EmailJS (Proprietário + Cliente)
      if (typeof emailjs !== 'undefined') {
        const mensagemAdmin = `Novo boletim de alojamento submetido (Apt ${unidadeSelecionada}):\n` +
          `Check-in: ${checkin} | Check-out: ${checkout}\n` +
          `E-mail de Contacto: ${emailDigitado || 'Não fornecido'}` +
          resumoHospedesTexto;

        await emailjs.send(
          "service_funp519",
          "template_0oqqqy3",
          {
            to_email: "belleview@sapo.pt",
            subject_text: `[NOVO BOLETIM] Apt ${unidadeSelecionada} - ${hospedes[0]?.nome || 'Hóspede'}`,
            guest_name: hospedes[0]?.nome || "Hóspede",
            checkin: checkin,
            checkout: checkout,
            message_body: mensagemAdmin
          },
          "imhA9ilHaWGF1hxYz"
        ).catch(err => console.warn("Erro ao notificar proprietário:", err));

        if (wantsCopy && emailDigitado) {
          const mensagemCliente = `Olá,\nConfirmamos a receção do seu registo de hóspedes.\n` +
            `Dados da Estadia: Check-in a ${checkin} e Check-out a ${checkout}\n` +
            `Detalhes dos Hóspedes registados:` +
            resumoHospedesTexto + 
            `\nDesejamos-lhe uma excelente estadia nos Apartments Belleview Lagos!`;

          await emailjs.send(
            "service_funp519",
            "template_0oqqqy3",
            {
              to_email: emailDigitado,
              subject_text: t.subject || "Cópia do Registo de Hóspedes - AIMA",
              guest_name: hospedes[0]?.nome || "Hóspede",
              checkin: checkin,
              checkout: checkout,
              message_body: mensagemCliente
            },
            "imhA9ilHaWGF1hxYz"
          ).catch(err => console.warn("Erro ao enviar cópia ao cliente:", err));
        }
      }

      // 4. Mostrar Popup de Sucesso original
      const popup = document.getElementById("aimaSuccessPopup");
      if (popup) {
        popup.style.display = "flex";
        setTimeout(() => { popup.style.display = "none"; }, 3000);
      } else {
        alert(t.aima_success || "Formulário enviado com sucesso!");
      }

      this.reset();
      generateGuestFields();

    } catch (error) {
      console.error("Erro ao processar:", error);
      alert("Erro ao guardar os dados. Por favor tente novamente.");
    } finally {
      if (submitBtn) {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    }
  });
}

// Inicializar idioma padrão
setLanguage("pt");
