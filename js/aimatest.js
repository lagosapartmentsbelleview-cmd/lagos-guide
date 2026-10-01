// ============================================================
// 1. INICIALIZAÇÃO E MANIPULAÇÃO DO DOM
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  // Remover validações nativas do browser para permitir gestão customizada via JS
  document.querySelectorAll("[required]").forEach(el => el.removeAttribute("required"));

  // Fechar o modal de FAQ
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
// 2. LISTAS DE PAÍSES TRADUZIDAS E ORDENADAS
// ============================================================
const countryLists = {
  pt: [
    "Afeganistão","África do Sul","Albânia","Alemanha","Andorra","Angola","Antígua e Barbuda","Arábia Saudita","Argélia","Argentina","Arménia","Austrália","Áustria","Azerbaijão",
    "Bahamas","Bangladesh","Barbados","Barém","Bélgica","Belize","Benim","Bielorrússia","Bolívia","Bósnia e Herzegovina","Botsuana","Brasil","Brunei","Bulgária","Burquina Faso","Burundi","Butão",
    "Cabo Verde","Camarões","Camboja","Canadá","Catar","Cazaquistão","Chade","Chile","China","Chipre","Colômbia","Comores","Coreia do Norte","Coreia do Sul","Costa do Marfim","Costa Rica","Croácia","Cuba",
    "Dinamarca","Dominica",
    "Egipto","Emirados Árabes Unidos","Equador","Eritreia","Eslováquia","Eslovénia","Espanha","Estados Unidos","Estónia","Etiópia",
    "Fiji","Filipinas","Finlândia","França",
    "Gabão","Gâmbia","Gana","Geórgia","Granada","Grécia","Guatemala","Guiana","Guiné","Guiné-Bissau","Guiné Equatorial",
    "Haiti","Honduras","Hungria",
    "Iémen","Ilhas Marechal","Índia","Indonésia","Irão","Iraque","Irlanda","Islândia","Israel","Itália",
    "Jamaica","Japão","Jordânia",
    "Koweit",
    "Laos","Lesoto","Letónia","Líbano","Libéria","Líbia","Liechtenstein","Lituânia","Luxemburgo",
    "Macedónia do Norte","Madagáscar","Malásia","Malaui","Maldivas","Mali","Malta","Marrocos","Maurícia","Mauritânia","México","Micronésia","Moçambique","Moldávia","Mónaco","Mongólia","Montenegro","Mianmar",
    "Namíbia","Nauru","Nepal","Nicarágua","Níger","Nigéria","Noruega","Nova Zelândia",
    "Omã",
    "Países Baixos","Paquistão","Palau","Panamá","Papua-Nova Guiné","Paraguai","Peru","Polónia","Portugal",
    "Reino Unido","República Centro-Africana","República Checa","República Democrática do Congo","República do Congo","República Dominicana","Roménia","Ruanda","Rússia",
    "Samoa","Santa Lúcia","São Cristóvão e Neves","São Marino","São Tomé e Príncipe","São Vicente e Granadinas","Senegal","Serra Leoa","Sérvia","Seicheles","Singapura","Síria","Somália","Sri Lanka","Eswatini","Sudão","Sudão do Sul","Suécia","Suíça","Suriname",
    "Tailândia","Taiwan","Tajiquistão","Tanzânia","Timor-Leste","Togo","Tonga","Trinidad e Tobago","Tunísia","Turquemenistão","Turquia","Tuvalu",
    "Ucrânia","Uganda","Uruguai","Uzbequistão",
    "Vanuatu","Vaticano","Venezuela","Vietname",
    "Zâmbia","Zimbabué"
  ],

  en: [
    "Afghanistan","Albania","Algeria","Andorra","Angola","Antigua and Barbuda","Argentina","Armenia","Australia","Austria","Azerbaijan",
    "Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria","Burkina Faso","Burundi",
    "Cabo Verde","Cambodia","Cameroon","Canada","Central African Republic","Chad","Chile","China","Colombia","Comoros","Congo","Costa Rica","Croatia","Cuba","Cyprus","Czech Republic",
    "Democratic Republic of the Congo","Denmark","Djibouti","Dominica","Dominican Republic",
    "Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Eswatini","Ethiopia",
    "Fiji","Finland","France",
    "Gabon","Gambia","Georgia","Germany","Ghana","Greece","Grenada","Guatemala","Guinea","Guinea-Bissau","Guyana",
    "Haiti","Honduras","Hungary",
    "Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Ivory Coast",
    "Jamaica","Japan","Jordan",
    "Kazakhstan","Kenya","Kiribati","Kuwait","Kyrgyzstan",
    "Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg",
    "Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Morocco","Mozambique","Myanmar",
    "Namibia","Nauru","Nepal","Netherlands","New Zealand","Nicaragua","Niger","Nigeria","North Korea","North Macedonia","Norway",
    "Oman",
    "Pakistan","Palau","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal",
    "Qatar",
    "Romania","Russia","Rwanda",
    "Saint Kitts and Nevis","Saint Lucia","Saint Vincent and the Grenadines","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","Sudan","Suriname","Sweden","Switzerland","Syria",
    "Taiwan","Tajikistan","Tanzania","Thailand","Timor-Leste","Togo","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Tuvalu",
    "Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan",
    "Vanuatu","Vatican City","Venezuela","Vietnam",
    "Yemen",
    "Zambia","Zimbabwe"
  ],

  fr: [
    "Afghanistan","Afrique du Sud","Albanie","Algérie","Allemagne","Andorre","Angola","Antigua-et-Barbuda","Arabie Saoudite","Argentine","Arménie","Australie","Autriche","Azerbaïdjan",
    "Bahamas","Bahreïn","Bangladesh","Barbade","Belgique","Bélize","Bénin","Bhoutan","Biélorussie","Birmanie","Bolivie","Bosnie-Herzégovine","Botswana","Brésil","Brunei","Bulgarie","Burkina Faso","Burundi",
    "Cabo Verde","Cambodge","Cameroun","Canada","Qatar","Rép. Centrafricaine","Tchad","Chili","Chine","Chypre","Colombie","Comores","Corée du Nord","Corée du Sud","Costa Rica","Côte d'Ivoire","Croatie","Cuba",
    "Danemark","Dominique",
    "Égypte","Émirats Arabes Unis","Équateur","Érythrée","Espagne","Estonie","Eswatini","États-Unis","Éthiopie",
    "Fidji","Finlande","France",
    "Gabon","Gambie","Géorgie","Ghana","Grèce","Grenade","Guatemala","Guinée","Guinée-Bissau","Guinée Équatoriale","Guyana",
    "Haïti","Honduras","Hongrie",
    "Inde","Indonésie","Irak","Iran","Irlande","Islande","Israël","Italie",
    "Jamaïque","Japon","Jordanie",
    "Kazakhstan","Kényia","Kirghizistan","Kiribati","Koweït",
    "Laos","Lesotho","Lettonie","Liban","Libéria","Libye","Liechtenstein","Lituanie","Luxembourg",
    "Macédoine du Nord","Madagascar","Malaisie","Malawi","Maldives","Mali","Malte","Maroc","Maurice","Mauritanie","Mexique","Micronésie","Moldavie","Monaco","Mongolie","Monténégro","Mozambique",
    "Namibie","Nauru","Népal","Nicaragua","Niger","Nigéria","Norvège","Nouvelle-Zélande",
    "Oman","Ouganda","Ouzbékistan",
    "Pakistan","Palaos","Panama","Papouasie-Nouvelle-Guinée","Paraguay","Pays-Bas","Pérou","Philippines","Pologne","Portugal",
    "Rép. Dém. du Congo","République Tchèque","Roumanie","Royaume-Uni","Russie","Rwanda",
    "Saint-Kitts-et-Nevis","Sainte-Lucie","Saint-Marin","Saint-Vincent-et-les-Grenadines","Salomon","Samoa","São Tomé-et-Príncipe","Sénégal","Serbie","Seychelles","Sierra Leone","Singapour","Slovaquie","Slovénie","Somalie","Soudan","Soudan du Sud","Sri Lanka","Suède","Suisse","Suriname","Syrie",
    "Tadjikistan","Taïwan","Tanzanie","Thaïlande","Timor oriental","Togo","Tonga","Trinité-et-Tobago","Tunisie","Turkménistan","Turquie","Tuvalu",
    "Ukraine","Uruguay",
    "Vanuatu","Vatican","Venezuela","Viêt Nam",
    "Yémen",
    "Zambie","Zimbabwe"
  ],

  es: [
    "Afganistán","Albania","Alemania","Andorra","Angola","Antigua y Barbuda","Arabia Saudita","Argelia","Argentina","Armenia","Australia","Austria","Azerbaiyán",
    "Bahamas","Bangladés","Barbados","Baréin","Bélgica","Belice","Benín","Bielorrusia","Birmania","Bolivia","Bosnia y Herzegovina","Botsuana","Brasil","Brunéi","Bulgaria","Burkina Faso","Burundi","Bután",
    "Cabo Verde","Camboya","Camerún","Canadá","Catar","Chad","Chile","China","Chipre","Colombia","Comoras","Corea del Norte","Corea del Sur","Costa de Marfil","Costa Rica","Croacia","Cuba",
    "Dinamarca","Dominica",
    "Ecuador","Egipto","El Salvador","Emiratos Árabes Unidos","Eritrea","Eslovaquia","Eslovenia","España","Estados Unidos","Estonia","Eswatini","Etiopía",
    "Filipinas","Finlandia","Fiyi","Francia",
    "Gabón","Gambia","Georgia","Ghana","Granada","Grecia","Guatemala","Guyana","Guinea","Guinea-Bisáu","Guinea Ecuatorial",
    "Haití","Honduras","Hungría",
    "India","Indonesia","Irak","Irán","Irlanda","Islandia","Islas Marshall","Israel","Italia",
    "Jamaica","Japón","Jordania",
    "Kazajistán","Kenia","Kirguistán","Kiribati","Kuwait",
    "Laos","Lesoto","Letonia","Líbano","Liberia","Libia","Liechtenstein","Lituania","Luxemburgo",
    "Macedonia del Norte","Madagascar","Malasia","Malaui","Maldivas me","Malí","Malta","Marruecos","Mauricio","Mauritania","México","Micronesia","Moldavia","Mónaco","Mongolia","Montenegro","Mozambique",
    "Namibia","Nauru","Nepal","Nicaragua","Níger","Nigeria","Noruega","Nueva Zelanda",
    "Omán",
    "Países Bajos","Pakistán","Palaos","Panamá","Papúa Nueva Guinea","Paraguay","Perú","Polonia","Portugal",
    "Reino Unido","República Centroafricana","República Checa","República del Congo","República Democrática del Congo","República Dominicana","Ruanda","Rumanía","Rusia",
    "Samoa","San Cristóbal y Nieves","San Marino","San Vicente y las Granadinas","Santa Lucía","Santo Tomé y Príncipe","Senegal","Serbia","Seychelles","Sierra Leona","Singapur","Siria","Somalia","Sri Lanka","Sudáfrica","Sudán","Sudán del Sur","Suecia","Suiza","Surinam",
    "Tailandia","Taiwán","Tanzania","Tayikistán","Timor Oriental","Togo","Tonga","Trinidad y Tobago","Túnez","Turkmenistán","Turquía","Tuvalu",
    "Ucrânia","Uganda","Uruguay","Uzbekistán",
    "Vanuatu","Vaticano","Venezuela","Vietnam",
    "Yemen",
    "Yibuti","Zambia","Zimbabue"
  ],

  it: [
    "Afghanistan","Albania","Algeria","Andorra","Angola","Antigua e Barbuda","Arabia Saudita","Argentina","Armenia","Australia","Austria","Azerbaigian",
    "Bahamas","Bahrein","Bangladesh","Barbados","Belgio","Belize","Benin","Bhutan","Bielorussia","Birmania","Bolivia","Bosnia ed Erzegovina","Botswana","Brasile","Brunei","Bulgaria","Burkina Faso","Burundi",
    "Cabo Verde","Cambogia","Camerun","Canada","Ciad","Cile","Cina","Cipro","Città del Vaticano","Colombia","Comore","Corea del Nord","Corea del Sud","Costa d'Avorio","Costa Rica","Croazia","Cuba",
    "Danimarca","Dominica",
    "Ecuador","Egitto","El Salvador","Emirati Arabi Uniti","Eritrea","Estonia","Eswatini","Etiopia",
    "Figi","Filippine","Finlandia","Francia",
    "Gabon","Gambia","Georgia","Germania","Ghana","Giamaica","Giappone","Gibuti","Giordania","Grecia","Grenada","Guatemala","Guinea","Guinea-Bissau","Guinea Equatoriale","Guyana",
    "Haiti","Honduras",
    "India","Indonesia","Iran","Iraq","Irlanda","Islanda","Isole Marshall","Israele","Italia",
    "Kazakistan","Kenya","Kirghizistan","Kiribati","Kuwait",
    "Laos","Lesotho","Lettonia","Libano","Liberia","Libia","Liechtenstein","Lituania","Lussemburgo",
    "Macedonia del Nord","Madagascar","Malawi","Malesia","Maldive","Mali","Malta","Marocco","Mauritania","Mauritius","Messico","Micronesia","Moldavia","Monaco","Mongolia","Montenegro","Mozambico",
    "Namibia","Nauru","Nepal","Nicaragua","Niger","Nigeria","Norvegia","Nuova Zelanda",
    "Oman",
    "Paesi Bassi","Pakistan","Palau","Panama","Papua Nuova Guinea","Paraguay","Perù","Polonia","Portogallo",
    "Qatar",
    "Regno Unito","Repubblica Ceca","Repubblica Centrafricana","Repubblica del Congo","Repubblica Democratica del Congo","Repubblica Dominicana","Romania","Ruanda","Russia",
    "Saint Kitts e Nevis","Saint Lucia","Saint Vincent e Grenadine","Salomone","Samoa","San Marino","Sao Tomé e Principe","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Siria","Slovacchia","Slovenia","Somalia","Spagna","Sri Lanka","Stati Uniti","Sudafrica","Sudan","Sudan del Sud","Suriname","Svezia","Svizzera",
    "Tagikistan","Taiwan","Tanzania","Thailandia","Timor Est","Togo","Tonga","Trinidad e Tobago","Tunisia","Turchia","Turkmenistan","Tuvalu",
    "Ucraina","Uganda","Ungheria","Uruguay","Uzbekistan",
    "Vanuatu","Venezuela","Vietnam",
    "Yemen",
    "Zambia","Zimbabwe"
  ],

  de: [
    "Afghanistan","Ägypten","Albanien","Algerien","Andorra","Angola","Antigua und Barbuda","Äquatorialguinea","Argentinien","Armenien","Aserbaidschan","Äthiopien","Australien",
    "Bahamas","Bahrain","Bangladesch","Barbados","Belgien","Belize","Benin","Bhutan","Bolivien","Bosnien und Herzegowina","Botswana","Brasilien","Brunei","Bulgarien","Burkina Faso","Burundi",
    "Chile","China","Costa Rica",
    "Dänemark","Deutschland","Dominica","Dominikanische Republik","Dschibuti",
    "Ecuador","El Salvador","Eritrea","Estland","Eswatini",
    "Fidschi","Finnland","Frankreich",
    "Gabun","Gambia","Georgia","Ghana","Grenada","Griechenland","Guatemala","Guinea","Guinea-Bissau","Guyana",
    "Haiti","Honduras",
    "Indien","Indonesien","Irak","Iran","Irland","Island","Israel","Italien",
    "Jamaika","Japan","Jemen","Jordanien",
    "Kambodscha","Kamerun","Kanada","Kap Verde","Kasachstan","Katar","Kenia","Kirgisistan","Kiribati","Kolumbien","Komoren","Kongo","Kroatien","Kuba","Kuwait",
    "Laos","Lesotho","Lettland","Libanon","Liberia","Libyen","Liechtenstein","Litauen","Luxemburg",
    "Madagaskar","Malawi","Malaysia","Malediven","Mali","Malta","Marokko","Marshallinseln","Mauretanien","Mauritius","Mexiko","Mikronesien","Moldau","Monaco","Mongolei","Montenegro","Mosambik","Myanmar",
    "Namibia","Nauru","Nepal","Neuseeland","Nicaragua","Niederlande","Niger","Nigeria","Nordkorea","Nordmazedonien","Norwegen",
    "Oman","Österreich",
    "Pakistan","Palau","Panama","Papua-Neuguinea","Paraguay","Peru","Philippinen","Polen","Portugal",
    "Ruanda","Rumänien","Russland",
    "Salomonen","Sambia","Samoa","San Marino","São Tomé und Príncipe","Saudi-Arabien","Schweden","Schweiz","Senegal","Serbien","Seychellen","Sierra Leone","Simbabwe","Singapur","Slowakei","Slowenien","Somalia","Spanien","Sri Lanka","St. Kitts und Nevis","St. Lucia","St. Vincent und die Grenadinen","Südafrika","Sudan","Südkorea","Südsudan","Suriname","Syrien",
    "Tadschikistan","Taiwan","Tansania","Thailand","Osttimor","Togo","Tonga","Trinidad und Tobago","Tschad","Tschechien","Tunesien","Türkei","Turkmenistan","Tuvalu",
    "Uganda","Ukraine","Ungarn","Uruguay","Usbekistan",
    "Vanuatu","Vatikanstadt","Venezuela","Vereinigte Arabische Emirate","Vereinigte Staaten","Vereinigtes Königreich","Vietnam",
    "Weißrussland","Zentralafrikanische Republik","Zypern"
  ]
};


// ============================================================
// 3. DICIONÁRIO DE TEXTOS E IDIOMAS (TEXTS)
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
      <p>A prestação destes dados é <strong>estritamente obrigatória por lei</strong>. A recusa em fornecer as informações necessárias impede legalmente a realização do check-in e implica a <strong>anulação imediata da reserva sem direito a reembolso</strong>, por incumprimento das normas legais aplicáveis.</p>
      <p>Para o proprietário do alojamento, a não comunicação destes dados constitui uma <strong>contraordenação grave</strong>, punível com coimas significativas.</p>
      <h4><strong>Privacidade e proteção dos seus dados</strong></h4>
      <p>Os dados recolhidos são utilizados exclusivamente para cumprimento desta obrigação legal e tratados em conformidade com o <strong>Regulamento Geral sobre a Proteção de Dados (RGPD)</strong>. Não são partilhados com terceiros para fins comerciais.</p>
      <h4><strong>Informação adicional e legislação</strong></h4>
      <p><a href="/docs/sef.pdf" target="_blank" class="pdf-link">Verificar a informação em PDF</a></p>
      <p><a id="openFaqModal" class="faq-link">Perguntas Frequentes (FAQ)</a></p>
      <p><a href="https://diariodarepublica.pt/dr/legislacao-consolidada/lei/2007-67564445" target="_blank" class="pdf-link">Lei n.º 23/2007 — Versão Consolidada (Diário da República)</a></p>
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
      birthPlace: "Local de Nascimento:",
      nationality: "Nacionalidade:",
      residencePlace: "Local de Residência:",
      residenceCountry: "País de Residência:",
      docNumber: "Número do Documento:",
      docType: "Tipo de Documento:",
      docTypePassport: "Passaporte",
      docTypeID: "Bilhete de Identidade / Cartão de Cidadão",
      docTypeOther: "Outro",
      docTypeOtherLabel: "Qual?",
      docCountry: "País Emissor do Documento:"
    },
    placeholder_checkin: "dd/mm/aaaa", 
    placeholder_checkout: "dd/mm/aaaa", 
    placeholder_select: "Selecione",
    subject: "Cópia do Registo de Hóspedes - AIMA",
    greeting: "Olá",
    confirmation: "Confirmamos com sucesso a receção do seu registo de hóspedes com os seguintes dados:",
    label_checkin: "Data de Check-in",
    label_checkout: "Data de Check-out",
    footer: "Desejamos-lhe uma excelente estadia!",
    submit: "Enviar Boletim de Alojamento",
    aima_success: "Formulário enviado com sucesso!"
  },

  en: {
    subtitle: "Mandatory Accommodation Registration Form (AIMA, formerly SEF).",
    legalHtml: `
      <h3><strong>Mandatory Legal Notice — Guest Registration (AIMA/SIBA)</strong></h3>
      <p>This form collects the mandatory identification data of all guests, as required by Portuguese law for communication to AIMA (Agency for Integration, Migration and Asylum) through the SIBA platform.</p>
      <h4><strong>Why is this information mandatory?</strong></h4>
      <p>Under <strong>Article 45 of Law 23/2007</strong>, all accommodation establishments are legally required to report the entry, stay and exit of foreign citizens in Portugal.</p>
      <p>This obligation applies to <strong>all guests without Portuguese nationality</strong>, including <strong>children and infants</strong>, without exception.</p>
      <h4><strong>What is this information used for?</strong></h4>
      <ul>
          <li><strong>National Security:</strong> Supports the prevention and investigation of serious crimes, terrorism and cross‑border networks.</li>
          <li><strong>Guest Protection:</strong> In case of accident, medical emergency, natural disaster or disappearance, it allows authorities and embassies to quickly identify and locate citizens.</li>
          <li><strong>Public Administration:</strong> Contributes to official statistics and migration/tourism policies.</li>
      </ul>
      <h4><strong>Obligation and consequences of refusal</strong></h4>
      <p>Providing this information is <strong>strictly mandatory by law</strong>. Refusing to provide the required data legally prevents check‑in and results in the <strong>immediate cancellation of the reservation without refund</strong>.</p>
      <p>For the accommodation owner, failure to report this data constitutes a <strong>serious administrative offence</strong>, punishable by significant fines.</p>
      <h4><strong>Privacy and data protection</strong></h4>
      <p>The collected data is used exclusively to comply with this legal obligation and is processed in accordance with the <strong>General Data Protection Regulation (GDPR)</strong>. It is not shared with third parties for commercial purposes.</p>
      <h4><strong>Additional information and legislation</strong></h4>
      <p><a href="/docs/sef.pdf" target="_blank" class="pdf-link">View information in PDF</a></p>
      <p><a id="openFaqModal" class="faq-link">Frequently Asked Questions (FAQ)</a></p>
      <p><a href="https://diariodarepublica.pt/dr/legislacao-consolidada/lei/2007-67564445" target="_blank" class="pdf-link">Law 23/2007 — Consolidated Version (Official Gazette)</a></p>
    `,
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
      birthPlace: "Place of Birth:",
      nationality: "Nationality:",
      residencePlace: "Place of Residence:",
      residenceCountry: "Country of Residence:",
      docNumber: "Document Number:",
      docType: "Document Type:",
      docTypePassport: "Passport",
      docTypeID: "Identity Card",
      docTypeOther: "Other",
      docTypeOtherLabel: "Which one?",
      docCountry: "Issuing Country:"
    },
    placeholder_checkin: "dd/mm/yyyy", 
    placeholder_checkout: "dd/mm/yyyy", 
    placeholder_select: "Select",
    subject: "Guest Registration Copy - AIMA",
    greeting: "Hello",
    confirmation: "We have successfully received your guest registration with the following details:",
    label_checkin: "Check-in Date",
    label_checkout: "Check-out Date",
    footer: "We wish you a pleasant stay!",
    submit: "Submit Accommodation Form",
    aima_success: "Form submitted successfully!"
  },

  es: {
    subtitle: "Formulario obligatorio de Registro de Alojamiento (AIMA, antiguo SEF).",
    legalHtml: `
      <h3><strong>Aviso Legal Obligatorio — Registro de Huéspedes (AIMA/SIBA)</strong></h3>
      <p>Este formulario recoge los datos obligatorios de identificación de todos los huéspedes, según lo exige la legislación portuguesa para su comunicación a AIMA (Agencia para la Integración, Migraciones y Asilo) a través de la plataforma SIBA.</p>
      <h4><strong>¿Por qué son obligatorios estos datos?</strong></h4>
      <p>Según el <strong>Artículo 45 de la Ley n.º 23/2007</strong>, todos los alojamientos están legalmente obligados a comunicar a las autoridades fronterizas la entrada, estancia y salida de ciudadanos extranjeros en territorio portugués.</p>
      <p>Esta obligación se aplica a <strong>todos los huéspedes sin nacionalidad portuguesa</strong>, incluidos <strong>niños y bebés</strong>, sin excepción.</p>
      <h4><strong>¿Para qué se utilizan estos datos?</strong></h4>
      <ul>
          <li><strong>Seguridad Nacional:</strong> Ayudan a prevenir e investigar delitos graves, terrorismo y redes transfronterizas.</li>
          <li><strong>Protección del Huésped:</strong> En caso de accidente, emergencia médica, catástrofe natural o desaparición, permiten a las autoridades y embajadas identificar y localizar rápidamente a los ciudadanos.</li>
          <li><strong>Gestión Pública:</strong> Contribuyen a estadísticas oficiales y políticas de migración y turismo.</li>
      </ul>
      <h4><strong>Obligatoriedad y consecuencias de la negativa</strong></h4>
      <p>La entrega de estos datos es <strong>estritamente obligatoria por ley</strong>. Negarse a proporcionar la información necesaria impide legalmente realizar el check‑in y puede implicar la <strong>cancelación inmediata de la reserva sin derecho a reembolso</strong>.</p>
      <p>Para el propietario del alojamiento, no comunicar estos datos constituye una <strong>infracción grave</strong>, sancionada con multas significativas.</p>
      <h4><strong>Privacidad y protección de datos</strong></h4>
      <p>Los datos recogidos se utilizan exclusivamente para cumplir esta obligación legal y se tratan conforme al <strong>Reglamento General de Protección de Datos (RGPD)</strong>. No se comparten con terceros con fines comerciales.</p>
      <h4><strong>Información adicional y legislación</strong></h4>
      <p><a href="/docs/sef.pdf" target="_blank" class="pdf-link">Ver información en PDF</a></p>
      <p><a id="openFaqModal" class="faq-link">Preguntas Frecuentes (FAQ)</a></p>
      <p><a href="https://diariodarepublica.pt/dr/legislacao-consolidada/lei/2007-67564445" target="_blank" class="pdf-link">Ley n.º 23/2007 — Versión Consolidada (Diario Oficial)</a></p>
    `,
    formTitle: "Registro de Alojamiento",
    requiredNotice: "Relleno y envío obligatorios de los datos de todos los huéspedes adultos y niños",
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
      birthPlace: "Lugar de Nacimiento:",
      nationality: "Nacionalidad:",
      residencePlace: "Lugar de Residencia:",
      residenceCountry: "País de Residencia:",
      docNumber: "Número del Documento:",
      docType: "Tipo de Documento:",
      docTypePassport: "Pasaporte",
      docTypeID: "Documento de Identidad",
      docTypeOther: "Otro",
      docTypeOtherLabel: "¿Cuál?",
      docCountry: "País Emisor del Documento:"
    },
    placeholder_checkin: "dd/mm/aaaa", 
    placeholder_checkout: "dd/mm/aaaa", 
    placeholder_select: "Seleccionar",
    subject: "Copia del Registro de Huéspedes - AIMA",
    greeting: "Hola",
    confirmation: "Hemos recibido con éxito su registro de huéspedes con los siguientes datos:",
    label_checkin: "Fecha de Check-in",
    label_checkout: "Fecha de Check-out",
    footer: "¡Le deseamos una excelente estancia!",
    submit: "Enviar Registro de Alojamiento",
    aima_success: "Formulario enviado con éxito!"
  },

  fr: {
    subtitle: "Formulaire obligatoire d’Enregistrement des Hébergements (AIMA, ancien SEF).",
    legalHtml: `
      <h3><strong>Avis Légal Obligatoire — Enregistrement des Hôtes (AIMA/SIBA)</strong></h3>
      <p>Ce formulaire recueille les données d’identification obligatoires de tous les hôtes, conformément à la législation portugaise pour la communication à l’AIMA (Agence pour l’Intégration, les Migrations et l’Asile) via la plateforme SIBA.</p>
      <h4><strong>Pourquoi ces informations sont-elles obligatoires ?</strong></h4>
      <p>Selon <strong>l’Article 45 de la Loi n.º 23/2007</strong>, tous les établissements d’hébergement sont légalement tenus de déclarer l’entrée, le séjour et la sortie des citoyens étrangers sur le territoire portugais.</p>
      <p>Cette obligation s’applique à <strong>tous les hôtes n’ayant pas la nationalité portugaise</strong>, y compris <strong>les enfants et les bébés</strong>, sans exception.</p>
      <h4><strong>À quoi servent ces données ?</strong></h4>
      <ul>
          <li><strong>Sécurité Nationale :</strong> Aident à prévenir et enquêter les crimes graves, le terrorisme et les réseaux transfrontaliers.</li>
          <li><strong>Protection de l’Hôte :</strong> En cas d’accident, d’urgence médicale, de catastrophe naturelle ou de disparition, elles permettent aux autorités et ambassades d’identifier et de localiser rapidement les citoyens.</li>
          <li><strong>Gestion Publique :</strong> Contribuent aux statistiques officielles et aux politiques de migration et de tourisme.</li>
      </ul>
      <h4><strong>Obligation et conséquences du refus</strong></h4>
      <p>La fourniture de ces données est <strong>strictement obligatoire par la loi</strong>. Le refus de fournir les informations nécessaires empêche légalement l’enregistrement (check‑in) et peut entraîner <strong>l’annulation immédiate de la réservation sans remboursement</strong>.</p>
      <p>Pour le propriétaire de l’hébergement, le non-respect de cette obligation constitue une <strong>infraction grave</strong>, passible d’amendes importantes.</p>
      <h4><strong>Confidentialité et protection des données</strong></h4>
      <p>Les données recueillies sont utilisées exclusivement pour respecter cette obligation légale et sont traitées conformément au <strong>Règlement Général sur la Protection des Données (RGPD)</strong>. Elles ne sont pas partagées avec des tiers à des fins commerciales.</p>
      <h4><strong>Informations supplémentaires et législation</strong></h4>
      <p><a href="/docs/sef.pdf" target="_blank" class="pdf-link">Consulter les informations en PDF</a></p>
      <p><a id="openFaqModal" class="faq-link">Foire aux Questions (FAQ)</a></p>
      <p><a href="https://diariodarepublica.pt/dr/legislacao-consolidada/lei/2007-67564445" target="_blank" class="pdf-link">Loi n.º 23/2007 — Version Consolidée (Journal Officiel)</a></p>
    `,
    formTitle: "Formulaire d’Enregistrement",
    requiredNotice: "Remplissage et envoi obligatoires des données de tous les hôtes, adultes et enfants",
    stayDataTitle: "Données du Séjour",
    checkinLabel: "Date d’Arrivée :",
    checkoutLabel: "Date de Départ :",
    adultsLabel: "Nombre d’Adultes :",
    childrenLabel: "Nombre d’Enfants :",
    wants_copy_title: "Souhaitez-vous recevoir une copie de ce formulaire par e-mail ?",
    radio_yes: "Oui",
    radio_no: "Non",
    email_label: "Votre E-mail :",
    guestTitle: i => `Hôte ${i}`,
    fields: {
      fullName: "Nom Complet :",
      birthDate: "Date de Naissance :",
      birthPlace: "Lieu de Naissance :",
      nationality: "Nationalité :",
      residencePlace: "Lieu de Résidence :",
      residenceCountry: "Pays de Résidence :",
      docNumber: "Numéro du Document :",
      docType: "Type de Document :",
      docTypePassport: "Passeport",
      docTypeID: "Carte d’Identité",
      docTypeOther: "Autre",
      docTypeOtherLabel: "Lequel ?",
      docCountry: "Pays Émetteur :"
    },
    placeholder_checkin: "jj/mm/aaaa", 
    placeholder_checkout: "jj/mm/aaaa", 
    placeholder_select: "Sélectionner",
    subject: "Copie de l'Enregistrement des Clients - AIMA",
    greeting: "Bonjour",
    confirmation: "Nous avons bien reçu votre enregistrement de client avec les détails suivants :",
    label_checkin: "Date d'arrivée",
    label_checkout: "Date de départ",
    footer: "Nous vous souhaitons un agréable séjour !",
    submit: "Envoyer le Formulaire",
    aima_success: "Formulaire envoyé avec succès!"
  },

  it: {
    subtitle: "Modulo obbligatorio di Registrazione degli Ospiti (AIMA, ex SEF).",
    legalHtml: `
      <h3><strong>Avviso Legale Obbligatorio — Registrazione degli Ospiti (AIMA/SIBA)</strong></h3>
      <p>Questo modulo raccoglie i dati identificativi obbligatori di tutti gli ospiti, come richiesto dalla legislazione portoghese per la comunicazione ad AIMA (Agenzia per l’Integrazione, le Migrazioni e l’Asilo) tramite la piattaforma SIBA.</p>
      <h4><strong>Perché questi dati sono obbligatori?</strong></h4>
      <p>Ai sensi dell’<strong>Articolo 45 della Legge n.º 23/2007</strong>, tutte le strutture ricettive sono legalmente obbligate a comunicare alle autorità di frontiera l’ingresso, il soggiorno e l’uscita dei cittadini stranieri in Portogallo.</p>
      <p>Questo obbligo si applica a <strong>tutti gli ospiti senza cittadinanza portoghese</strong>, inclusi <strong>bambini e neonati</strong>, senza eccezioni.</p>
      <h4><strong>A cosa servono questi dati?</strong></h4>
      <ul>
          <li><strong>Sicurezza Nazionale:</strong> Aiutano a prevenire e investigare reati gravi, terrorismo e reti transfrontaliere.</li>
          <li><strong>Protezione dell’Ospite:</strong> In caso di incidente, emergenza medica, catastrofe naturale o scomparsa, permettono alle autorità e alle ambasciate di identificare e localizzare rapidamente i cittadini.</li>
          <li><strong>Gestione Pubblica:</strong> Contribuiscono alle statistiche ufficiali e alle politiche di migrazione e turismo.</li>
      </ul>
      <h4><strong>Obbligatorietà e conseguenze del rifiuto</strong></h4>
      <p>Il conferimento di questi dati è <strong>strettamente obbligatorio per legge</strong>. Il rifiuto di fornire le informazioni necessarie impedisce legalmente il check‑in e può comportare <strong>l’annullamento immediato della prenotazione senza rimborso</strong>.</p>
      <p>Per il proprietario dell’alloggio, la mancata comunicazione di questi dati costituisce una <strong>infrazione grave</strong>, punibile con sanzioni significative.</p>
      <h4><strong>Privacy e protezione dei dati</strong></h4>
      <p>I dati raccolti vengono utilizzati esclusivamente per adempiere a questo obbligo legale e sono trattati in conformità al <strong>Regolamento Generale sulla Protezione dei Dati (GDPR)</strong>. Non vengono condivisi con terzi per scopi commerciali.</p>
      <h4><strong>Informazioni aggiuntive e legislazione</strong></h4>
      <p><a href="/docs/sef.pdf" target="_blank" class="pdf-link">Visualizza le informazioni in PDF</a></p>
      <p><a id="openFaqModal" class="faq-link">Domande Frequenti (FAQ)</a></p>
      <p><a href="https://diariodarepublica.pt/dr/legislacao-consolidada/lei/2007-67564445" target="_blank" class="pdf-link">Legge n.º 23/2007 — Versione Consolidata (Gazzetta Ufficiale)</a></p>
    `,
    formTitle: "Modulo di Registrazione",
    requiredNotice: "Compilazione e invio obbligatori dei dati di tutti gli ospiti adulti e bambini",
    stayDataTitle: "Dati del Soggiorno",
    checkinLabel: "Data di Check‑in:",
    checkoutLabel: "Data di Check‑out:",
    adultsLabel: "Numero di Ospiti Adulti:",
    childrenLabel: "Numero di Ospiti Bambini:",
    wants_copy_title: "Desideri una copia di questo modulo via e-mail?",
    radio_yes: "Sì",
    radio_no: "No",
    email_label: "La tua E-mail:",
    guestTitle: i => `Ospite ${i}`,
    fields: {
      fullName: "Nome Completo:",
      birthDate: "Data di Nascita:",
      birthPlace: "Luogo di Nascita:",
      nationality: "Nazionalità:",
      residencePlace: "Luogo di Residenza:",
      residenceCountry: "Paese di Residenza:",
      docNumber: "Numero del Documento:",
      docType: "Tipo di Documento:",
      docTypePassport: "Passaporto",
      docTypeID: "Carta d’Identità",
      docTypeOther: "Altro",
      docTypeOtherLabel: "Quale?",
      docCountry: "Paese di Emissione:"
    },
    placeholder_checkin: "gg/mm/aaaa", 
    placeholder_checkout: "gg/mm/aaaa", 
    placeholder_select: "Seleziona",
    subject: "Copia della Registrazione Ospiti - AIMA",
    greeting: "Ciao",
    confirmation: "Abbiamo ricevuto con successo la registrazione degli ospiti con i seguenti dettagli:",
    label_checkin: "Data di Check-in",
    label_checkout: "Data di Check-out",
    footer: "Vi auguriamo un piacevole soggiorno!",
    submit: "Invia Modulo di Registrazione",
    aima_success: "Modulo inviato con successo!"
  },

  de: {
    subtitle: "Pflichtformular zur Gästeanmeldung (AIMA, ehemals SEF).",
    legalHtml: `
      <h3><strong>Gesetzlich vorgeschriebener Hinweis — Gästeanmeldung (AIMA/SIBA)</strong></h3>
      <p>Dieses Formular erfasst die obligatorischen Identifikationsdaten aller Gäste, wie es das portugiesische Gesetz für die Meldung an AIMA (Agentur für Integration, Migration und Asyl) über die SIBA‑Plattform vorschreibt.</p>
      <h4><strong>Warum sind diese Daten verpflichtend?</strong></h4>
      <p>Gemäß <strong>Artikel 45 des Gesetzes Nr. 23/2007</strong> sind alle Beherbergungsbetriebe gesetzlich verpflichtet, den Eintritt, Aufenthalt und die Abreise ausländischer Staatsbürger in Portugal zu melden.</p>
      <p>Diese Verpflichtung gilt für <strong>alle Gäste ohne portugiesische Staatsangehörigkeit</strong>, einschließlich <strong>Kinder und Babys</strong>, ohne Ausnahme.</p>
      <h4><strong>Wofür werden diese Daten verwendet?</strong></h4>
      <ul>
          <li><strong>Nationale Sicherheit:</strong> Unterstützung bei der Verhinderung und Aufklärung schwerer Straftaten, Terrorismus und grenzüberschreitender Netzwerke.</li>
          <li><strong>Gästeschutz:</strong> Im Falle eines Unfalls, medizinischen Notfalls, einer Naturkatastrophe oder eines Verschwindens ermöglichen sie den Behörden und Botschaften eine schnelle Identifizierung und Lokalisierung.</li>
          <li><strong>Öffentliche Verwaltung:</strong> Beitrag zu offiziellen Statistiken sowie zu Migrations‑ und Tourismuspolitiken.</li>
      </ul>
      <h4><strong>Verpflichtung und Folgen einer Weigerung</strong></h4>
      <p>Die Bereitstellung dieser Daten ist <strong>gesetzlich zwingend vorgeschrieben</strong>. Eine Weigerung macht den Check‑in rechtlich unmöglich und kann zur <strong>sofortigen Stornierung der Reservierung ohne Erstattung</strong> führen.</p>
      <p>Für den Unterkunftsbetreiber stellt die Nichtmeldung dieser Daten eine <strong>schwere Ordnungswidrigkeit</strong> dar, die mit erheblichen Geldbußen geahndet werden kann.</p>
      <h4><strong>Datenschutz und Privatsphäre</strong></h4>
      <p>Die erhobenen Daten werden ausschließlich zur Erfüllung dieser gesetzlichen Verpflichtung verwendet und gemäß der <strong>Datenschutz‑Grundverordnung (DSGVO)</strong> verarbeitet. Sie werden nicht zu kommerziellen Zwecken an Dritte weitergegeben.</p>
      <h4><strong>Zusätzliche Informationen und Gesetzgebung</strong></h4>
      <p><a href="/docs/sef.pdf" target="_blank" class="pdf-link">Informationen als PDF ansehen</a></p>
      <p><a id="openFaqModal" class="faq-link">Häufig gestellte Fragen (FAQ)</a></p>
      <p><a href="https://diariodarepublica.pt/dr/legislacao-consolidada/lei/2007-67564445" target="_blank" class="pdf-link">Gesetz Nr. 23/2007 — Konsolidierte Fassung (Amtsblatt)</a></p>
    `,
    formTitle: "Gästeanmeldeformular",
    requiredNotice: "Pflichtangabe und Übermittlung der Daten aller erwachsenen Gäste und Kinder",
    stayDataTitle: "Angaben zum Aufenthalt",
    checkinLabel: "Check‑in‑Datum:",
    checkoutLabel: "Check‑out‑Datum:",
    adultsLabel: "Anzahl der erwachsenen Gäste:",
    childrenLabel: "Anzahl der Kinder:",
    wants_copy_title: "Möchten Sie eine Kopie dieses Formulars per E-Mail erhalten?",
    radio_yes: "Ja",
    radio_no: "Nein",
    email_label: "Ihre E-Mail-Adresse:",
    guestTitle: i => `Gast ${i}`,
    fields: {
      fullName: "Vollständiger Name:",
      birthDate: "Geburtsdatum:",
      birthPlace: "Geburtsort:",
      nationality: "Staatsangehörigkeit:",
      residencePlace: "Wohnort:",
      residenceCountry: "Wohnsitzland:",
      docNumber: "Dokumentnummer:",
      docType: "Dokumenttyp:",
      docTypePassport: "Reisepass",
      docTypeID: "Personalausweis",
      docTypeOther: "Sonstiges",
      docTypeOtherLabel: "Welche?",
      docCountry: "Ausstellungsland:"
    },
    placeholder_checkin: "TT/MM/JJJJ", 
    placeholder_checkout: "TT/MM/JJJJ", 
    placeholder_select: "Auswählen",
    subject: "Kopie der Gästeregistrierung - AIMA",
    greeting: "Hallo",
    confirmation: "Wir haben Ihre Gästeregistrierung mit folgenden Daten erfolgreich erhalten:",
    label_checkin: "Anreisedatum",
    label_checkout: "Abreisedatum",
    footer: "Wir wünschen Ihnen einen angenehmen Aufenthalt!",
    submit: "Formular absenden",
    aima_success: "Formular erfolgreich gesendet!"
  }
};


// ============================================================
// 4. FAQ MULTILÍNGUE (TITULOS E CONTEÚDOS)
// ============================================================
const faqTitles = {
  pt: "Perguntas Frequentes (FAQ)",
  en: "Frequently Asked Questions (FAQ)",
  es: "Preguntas Frecuentes (FAQ)",
  fr: "Foire aux Questions (FAQ)",
  it: "Domande Frequenti (FAQ)",
  de: "Häufig gestellte Fragen (FAQ)"
};

const faqTexts = {
  pt: `
<h3>1. Obrigatoriedade e finalidade</h3>
<p><strong>Porque tenho de fornecer os meus dados ao alojamento?</strong><br>
A lei portuguesa obriga todos os alojamentos a comunicar à AIMA a entrada e saída de cidadãos estrangeiros. É uma medida de segurança nacional e proteção do hóspede.</p>
<p><strong>O que é o SIBA?</strong><br>
O SIBA é o sistema oficial onde os alojamentos registam eletronicamente os dados dos hóspedes estrangeiros.</p>
<p><strong>Sou cidadão europeu. Também tenho de preencher o boletim?</strong><br>
Sim. A obrigação aplica-se a todos os cidadãos que não tenham nacionalidade portuguesa.</p>
<p><strong>Bebés e crianças também têm de ser comunicados?</strong><br>
Sim. A comunicação é obrigatória para todas as idades.</p>
<p><strong>O que acontece se eu me recusar a fornecer os meus dados?</strong><br>
O alojamento não pode legalmente realizar o check-in. A reserva pode ser anulada sem reembolso.</p>

<h3>2. Documentos de identificação</h3>
<p><strong>Que documentos são aceites?</strong><br>
Passaporte, Bilhete de Identidade/Cartão de Cidadão, título de residência, laissez-passer, documentos de tripulantes e boletim de nascimento (menores).</p>
<p><strong>Posso alojar-me sem documento?</strong><br>
Não. É obrigatório apresentar um documento válido.</p>
<p><strong>E se os meus filhos não tiverem documento?</strong><br>
Podem ser usados boletins de nascimento ou equivalentes.</p>
<p><strong>O alojamento pode ficar com o meu documento?</strong><br>
Só com o seu consentimento. Apenas autoridades policiais podem reter documentos sem consentimento.</p>
<p><strong>Quem assina o boletim no caso de menores?</strong><br>
O progenitor, o responsável do grupo ou um dos cônjuges.</p>

<h3>3. Privacidade e proteção de dados</h3>
<p><strong>Como são tratados os meus dados pessoais?</strong><br>
Com total confidencialidade e em conformidade com o RGPD.</p>
<p><strong>Os meus dados são partilhados?</strong><br>
Não. São enviados apenas para a AIMA.</p>
<p><strong>Durante quanto tempo ficam guardados?</strong><br>
Até 1 ano, salvo exceções legais.</p>
<p><strong>Os meus dados são usados para fins comerciais?</strong><br>
Nunca.</p>
<p><strong>O alojamento pode alterar os meus dados depois de enviados?</strong><br>
Não. Apenas pode visualizar o que foi submetido.</p>

<h3>4. Situações especiais</h3>
<p><strong>Ficar em casa de amigos ou familiares também obriga a comunicação?</strong><br>
Não, desde que a estadia seja gratuita.</p>
<p><strong>Posso alojar-me se estiver em situação irregular?</strong><br>
Sim. Mas a comunicação é sempre obrigatória.</p>
<p><strong>Se fizer parte de um grupo, basta um preencher?</strong><br>
Não. Todos os hóspedes estrangeiros devem ser comunicados individualmente.</p>
<p><strong>Se o alojamento for oferecido, também é obrigatório comunicar?</strong><br>
Sim.</p>

<h3>5. Questões práticas</h3>
<p><strong>O que acontece se um hóspede sair sem pagar?</strong><br>
O alojamento deve apresentar queixa à PSP ou GNR.</p>
<p><strong>Quem é responsável pela comunicação?</strong><br>
O alojamento. O hóspede apenas fornece os dados.</p>
<p><strong>O que acontece se houver um erro nos meus dados?</strong><br>
Pode ser corrigido antes do envio. Depois, só a AIMA pode intervir.</p>

<h3>6. Informação adicional</h3>
<p>Informação oficial completa: <a href="https://siba.ssi.gov.pt/" target="_blank">https://siba.ssi.gov.pt/</a></p>
`,

  en: `
<h3>1. Obligation and purpose</h3>
<p><strong>Why do I have to provide my personal data?</strong><br>
Portuguese law requires all accommodations to report the entry and exit of foreign citizens to AIMA. This is a national security and guest‑protection measure.</p>
<p><strong>What is SIBA?</strong><br>
SIBA is the official platform where accommodations register guest information electronically.</p>
<p><strong>I am an EU citizen. Do I still need to fill this form?</strong><br>
Yes. The obligation applies to all non‑Portuguese citizens.</p>
<p><strong>Are babies and children also reported?</strong><br>
Yes. Reporting is mandatory for all ages.</p>
<p><strong>What happens if I refuse to provide my data?</strong><br>
The accommodation cannot legally complete your check‑in. The reservation may be cancelled without refund.</p>

<h3>2. Identification documents</h3>
<p><strong>Which documents are accepted?</strong><br>
Passport, ID card, residence permit, laissez‑passer, crew documents and birth certificates (minors).</p>
<p><strong>Can I stay without a valid document?</strong><br>
No. A valid identification document is required.</p>
<p><strong>What if my children do not have documents?</strong><br>
Birth certificates or equivalent documents may be used.</p>
<p><strong>Can the accommodation keep my document?</strong><br>
Only with your consent. Only police authorities may retain documents without consent.</p>
<p><strong>Who signs the form for minors?</strong><br>
A parent, group leader or one of the spouses.</p>

<h3>3. Privacy and data protection</h3>
<p><strong>How is my data handled?</strong><br>
With full confidentiality and in compliance with GDPR.</p>
<p><strong>Is my data shared?</strong><br>
No. It is sent only to AIMA.</p>
<p><strong>How long is my data stored?</strong><br>
Up to 1 year, except in specific legal situations.</p>
<p><strong>Is my data used for commercial purposes?</strong><br>
Never.</p>
<p><strong>Can the accommodation change my data after submission?</strong><br>
No. They can only view what was submitted.</p>

<h3>4. Special situations</h3>
<p><strong>Do I need to be reported if I stay with friends or family?</strong><br>
No, as long as the stay is free of charge.</p>
<p><strong>Can I stay if I am in an irregular situation?</strong><br>
Yes, but reporting is still mandatory.</p>
<p><strong>If I am part of a group, does only one person need to fill the form?</strong><br>
No. Each foreign guest must be reported individually.</p>
<p><strong>If the stay is offered, is reporting still required?</strong><br>
Yes.</p>

<h3>5. Practical questions</h3>
<p><strong>What happens if a guest leaves without paying?</strong><br>
The accommodation must report it to the police (PSP or GNR).</p>
<p><strong>Who is responsible for reporting?</strong><br>
The accommodation. The guest only provides the data.</p>
<p><strong>What if there is an error in my data?</strong><br>
It can be corrected before submission. After that, only AIMA can intervene.</p>

<h3>6. Additional information</h3>
<p>Official information: <a href="https://siba.ssi.gov.pt/" target="_blank">https://siba.ssi.gov.pt/</a></p>
`,

  es: `
<h3>1. Obligación y finalidad</h3>
<p><strong>¿Por qué debo proporcionar mis datos?</strong><br>
La ley portuguesa exige que todos los alojamientos comuniquen a AIMA la entrada y salida de ciudadanos extranjeros. Es una medida de seguridad nacional y protección del huésped.</p>
<p><strong>¿Qué es SIBA?</strong><br>
SIBA es la plataforma oficial donde los alojamientos registran electrónicamente los datos de los huéspedes extranjeros.</p>
<p><strong>Soy ciudadano de la UE. ¿También debo rellenar el formulario?</strong><br>
Sí. La obligación se aplica a todos los ciudadanos sin nacionalidad portuguesa.</p>
<p><strong>¿Los bebés y niños también deben ser comunicados?</strong><br>
Sí. La comunicación es obligatoria para todas las edades.</p>
<p><strong>¿Qué ocurre si me niego a proporcionar mis datos?</strong><br>
El alojamiento no puede legalmente realizar el check‑in. La reserva puede ser cancelada sin reembolso.</p>

<h3>2. Documentos de identificación</h3>
<p><strong>¿Qué documentos se aceptan?</strong><br>
Pasaporte, DNI, permiso de residencia, laissez‑passer, documentos de tripulación y certificados de nacimiento (menores).</p>
<p><strong>¿Puedo alojarme sin documento válido?</strong><br>
No. Es obligatorio presentar un documento válido.</p>
<p><strong>¿Y si mis hijos no tienen documentos?</strong><br>
Pueden utilizarse certificados de nacimiento o equivalentes.</p>
<p><strong>¿El alojamiento puede quedarse con mi documento?</strong><br>
Solo con su consentimiento. Solo la policía puede retener documentos sin consentimiento.</p>
<p><strong>¿Quién firma el formulario en caso de menores?</strong><br>
Un progenitor, el responsable del grupo o uno de los cónyuges.</p>

<h3>3. Privacidad y protección de datos</h3>
<p><strong>¿Cómo se tratan mis datos personales?</strong><br>
Con total confidencialidad y conforme al RGPD.</p>
<p><strong>¿Se comparten mis datos?</strong><br>
No. Solo se envían a AIMA.</p>
<p><strong>¿Durante cuánto tiempo se almacenan?</strong><br>
Hasta 1 año, salvo excepciones legales.</p>
<p><strong>¿Se utilizan mis datos con fines comerciales?</strong><br>
Nunca.</p>
<p><strong>¿El alojamiento puede modificar mis datos después del envío?</strong><br>
No. Solo puede visualizar lo enviado.</p>

<h3>4. Situaciones especiales</h3>
<p><strong>¿Alojamiento en casa de amigos o familiares también debe comunicarse?</strong><br>
No, siempre que la estancia sea gratuita.</p>
<p><strong>¿Puedo alojarme si estoy en situación irregular?</strong><br>
Sí, pero la comunicación sigue siendo obligatoria.</p>
<p><strong>¿Si viajo en grupo, basta con que uno rellene el formulario?</strong><br>
No. Cada huésped extranjero debe ser comunicado individualmente.</p>
<p><strong>¿Si el alojamiento es gratuito, también es obligatorio comunicarlo?</strong><br>
Sí.</p>

<h3>5. Preguntas prácticas</h3>
<p><strong>¿Qué ocurre si un huésped se marcha sin pagar?</strong><br>
El alojamiento debe denunciarlo a la policía (PSP o GNR).</p>
<p><strong>¿Quién es responsable de la comunicación?</strong><br>
El alojamiento. El huésped solo proporciona los datos.</p>
<p><strong>¿Qué ocurre si hay un error en mis datos?</strong><br>
Puede corregirse antes del envío. Después, solo AIMA puede intervenir.</p>

<h3>6. Información adicional</h3>
<p>Información oficial: <a href="https://siba.ssi.gov.pt/" target="_blank">https://siba.ssi.gov.pt/</a></p>
`,

  fr: `
<h3>1. Obligation et finalité</h3>
<p><strong>Pourquoi dois‑je fournir mes données ?</strong><br>
La loi portugaise oblige tous les hébergements à communiquer à l’AIMA l’entrée et la sortie des citoyens étrangers. C’est une mesure de sécurité nationale et de protection des hôtes.</p>
<p><strong>Qu’est‑ce que le SIBA ?</strong><br>
Le SIBA est la plateforme officielle où les hébergements enregistrent les données des hôtes étrangers.</p>
<p><strong>Je suis citoyen de l’UE. Dois‑je remplir ce formulaire ?</strong><br>
Oui. L’obligation s’applique à toute personne n’ayant pas la nationalité portugaise.</p>
<p><strong>Les bébés et enfants doivent‑ils aussi être déclarés ?</strong><br>
Oui. La déclaration est obligatoire pour tous les âges.</p>
<p><strong>Que se passe‑t‑il si je refuse de fournir mes données ?</strong><br>
L’hébergement ne peut légalement pas effectuer votre check‑in. La réservation peut être annulée sans remboursement.</p>

<h3>2. Documents d’identification</h3>
<p><strong>Quels documents sont acceptés ?</strong><br>
Passeport, carte d’identité, titre de séjour, laissez‑passer, documents d’équipage et certificats de naissance (mineurs).</p>
<p><strong>Puis‑je séjourner sans document valide ?</strong><br>
Non. Un document d’identification valide est obligatoire.</p>
<p><strong>Et si mes enfants n’ont pas de documents ?</strong><br>
Les certificats de naissance ou équivalents peuvent être utilisés.</p>
<p><strong>L’hébergement peut‑il garder mon document ?</strong><br>
Seulement avec votre consentement. Seules les autorités policières peuvent retenir un document sans consentement.</p>
<p><strong>Qui signe pour les mineurs ?</strong><br>
Un parent, le responsable du groupe ou l’un des conjoints.</p>

<h3>3. Confidentialité et protection des données</h3>
<p><strong>Comment mes données sont‑elles traitées ?</strong><br>
Avec une confidentialité totale et conformément au RGPD.</p>
<p><strong>Mes données sont‑elles partagées ?</strong><br>
Non. Elles sont envoyées uniquement à l’AIMA.</p>
<p><strong>Combien de temps sont‑elles conservées ?</strong><br>
Jusqu’à 1 an, sauf exceptions légales.</p>
<p><strong>Mes données sont‑elles utilisées à des fins commerciales ?</strong><br>
Jamais.</p>
<p><strong>L’hébergement peut‑il modifier mes données après l’envoi ?</strong><br>
Non. Il ne peut que consulter les données soumises.</p>

<h3>4. Situations particulières</h3>
<p><strong>Un séjour chez des amis ou de la famille doit‑il être déclaré ?</strong><br>
Non, tant que le séjour est gratuit.</p>
<p><strong>Puis‑je séjourner si je suis en situation irrégulière ?</strong><br>
Oui, mais la déclaration reste obligatoire.</p>
<p><strong>Si je fais partie d’un groupe, une seule déclaration suffit‑elle ?</strong><br>
Non. Chaque hôte étranger doit être déclaré individuellement.</p>
<p><strong>Si le séjour est offert, la déclaration est‑elle obligatoire ?</strong><br>
Oui.</p>

<h3>5. Questions pratiques</h3>
<p><strong>Que se passe‑t‑il si un hôte part sans payer ?</strong><br>
L’hébergement doit le signaler à la police (PSP ou GNR).</p>
<p><strong>Qui est responsable de la déclaration ?</strong><br>
L’hébergement. L’hôte ne fait que fournir les données.</p>
<p><strong>Que faire en cas d’erreur dans mes données ?</strong><br>
Elles peuvent être corrigées avant l’envoi. Après, seule l’AIMA peut intervenir.</p>

<h3>6. Informations supplémentaires</h3>
<p>Informations officielles : <a href="https://siba.ssi.gov.pt/" target="_blank">https://siba.ssi.gov.pt/</a></p>
`,

  it: `
<h3>1. Obbligatorietà e finalità</h3>
<p><strong>Perché devo fornire i miei dati?</strong><br>
La legge portoghese obbliga tutte le strutture ricettive a comunicare ad AIMA l’ingresso e l’uscita dei cittadini stranieri. È una misura di sicurezza nazionale e di protezione degli ospiti.</p>
<p><strong>Che cos’è il SIBA?</strong><br>
SIBA è la piattaforma ufficiale in cui le strutture registrano elettronicamente i dati degli ospiti stranieri.</p>
<p><strong>Sono cittadino dell’UE. Devo comunque compilare il modulo?</strong><br>
Sì. L’obbligo si applica a tutti i cittadini che non hanno la nazionalità portoghese.</p>
<p><strong>Bambini e neonati devono essere comunicati?</strong><br>
Sì. La comunicazione è obbligatoria per tutte le età.</p>
<p><strong>Cosa succede se rifiuto di fornire i miei dati?</strong><br>
La struttura non può legalmente effettuare il check‑in. La prenotazione può essere annullata senza rimborso.</p>

<h3>2. Documenti di identificazione</h3>
<p><strong>Quali documenti sono accettati?</strong><br>
Passaporto, carta d’identità, permesso di soggiorno, laissez‑passer, documenti di equipaggio e certificati di nascita (minori).</p>
<p><strong>Posso soggiornare senza un documento valido?</strong><br>
No. È obbligatorio presentare un documento valido.</p>
<p><strong>E se i miei figli non hanno documenti?</strong><br>
Si possono usare certificati di nascita o documenti equivalenti.</p>
<p><strong>La struttura può trattenere il mio documento?</strong><br>
Solo con il tuo consenso. Solo le autorità di polizia possono trattenere documenti senza consenso.</p>
<p><strong>Chi firma il modulo per i minori?</strong><br>
Un genitore, il responsabile del gruppo o uno dei coniugi.</p>

<h3>3. Privacy e protezione dei dati</h3>
<p><strong>Come vengono trattati i miei dati personali?</strong><br>
Con totale riservatezza e in conformità al GDPR.</p>
<p><strong>I miei dati vengono condivisi?</strong><br>
No. Sono inviati esclusivamente ad AIMA.</p>
<p><strong>Per quanto tempo vengono conservati?</strong><br>
Fino a 1 anno, salvo eccezioni previste dalla legge.</p>
<p><strong>I miei dati vengono utilizzati per fini commerciali?</strong><br>
Mai.</p>
<p><strong>La struttura può modificare i miei dati dopo l’invio?</strong><br>
No. Può solo visualizzare ciò che è stato inviato.</p>

<h3>4. Situazioni speciali</h3>
<p><strong>Alloggiare presso amici o familiari deve essere comunicato?</strong><br>
No, purché il soggiorno sia gratuito.</p>
<p><strong>Posso soggiornare se sono in situazione irregolare?</strong><br>
Sì, ma la comunicazione è comunque obbligatoria.</p>
<p><strong>Se faccio parte di un gruppo, basta che uno compili il modulo?</strong><br>
No. Ogni ospite straniero deve essere comunicato individualmente.</p>
<p><strong>Se il soggiorno è offerto, è comunque obbligatorio comunicarlo?</strong><br>
Sì.</p>

<h3>5. Domande pratiche</h3>
<p><strong>Cosa succede se un ospite va via senza pagare?</strong><br>
La struttura deve segnalarlo alla polizia (PSP o GNR).</p>
<p><strong>Chi è responsabile della comunicazione?</strong><br>
La struttura. L’ospite fornisce solo i dati.</p>
<p><strong>Cosa succede se c’è un errore nei miei dati?</strong><br>
Può essere corretto prima dell’invio. Dopo, solo AIMA può intervenire.</p>

<h3>6. Informazioni aggiuntive</h3>
<p>Informazioni ufficiali: <a href="https://siba.ssi.gov.pt/" target="_blank">https://siba.ssi.gov.pt/</a></p>
`,

  de: `
<h3>1. Verpflichtung und Zweck</h3>
<p><strong>Warum muss ich meine Daten angeben?</strong><br>
Das portugiesische Gesetz verpflichtet alle Unterkünfte, den Ein‑ und Ausstieg ausländischer Staatsbürger an AIMA zu melden. Dies ist eine Maßnahme der nationalen Sicherheit und des Gästeschutzes.</p>
<p><strong>Was ist SIBA?</strong><br>
SIBA ist die offizielle Plattform, auf der Unterkünfte die Daten ausländischer Gäste elektronisch registrieren.</p>
<p><strong>Ich bin EU‑Bürger. Muss ich das Formular trotzdem ausfüllen?</strong><br>
Ja. Die Verpflichtung gilt für alle Personen ohne portugiesische Staatsangehörigkeit.</p>
<p><strong>Müssen auch Babys und Kinder gemeldet werden?</strong><br>
Ja. Die Meldung ist für alle Altersgruppen verpflichtend.</p>
<p><strong>Was passiert, wenn ich mich weigere, meine Daten anzugeben?</strong><br>
Die Unterkunft darf den Check‑in rechtlich nicht durchführen. Die Reservierung kann ohne Erstattung storniert werden.</p>

<h3>2. Ausweisdokumente</h3>
<p><strong>Welche Dokumente werden akzeptiert?</strong><br>
Reisepass, Personalausweis, Aufenthaltstitel, Laissez‑Passer, Crew‑Dokumente und Geburtsurkunden (Minderjährige).</p>
<p><strong>Kann ich ohne gültiges Dokument übernachten?</strong><br>
Nein. Ein gültiges Ausweisdokument ist erforderlich.</p>
<p><strong>Was ist, wenn meine Kinder keine Dokumente haben?</strong><br>
Geburtsurkunden oder gleichwertige Dokumente können verwendet werden.</p>
<p><strong>Darf die Unterkunft mein Dokument behalten?</strong><br>
Nur mit deiner Zustimmung. Nur die Polizei darf Dokumente ohne Zustimmung einbehalten.</p>
<p><strong>Wer unterschreibt das Formular für Minderjährige?</strong><br>
Ein Elternteil, der Gruppenverantwortliche oder einer der Ehepartner.</p>

<h3>3. Datenschutz</h3>
<p><strong>Wie werden meine Daten verarbeitet?</strong><br>
Mit vollständiger Vertraulichkeit und gemäß DSGVO.</p>
<p><strong>Werden meine Daten weitergegeben?</strong><br>
Nein. Sie werden ausschließlich an AIMA übermittelt.</p>
<p><strong>Wie lange werden meine Daten gespeichert?</strong><br>
Bis zu 1 Jahr, außer in gesetzlich vorgesehenen Fällen.</p>
<p><strong>Werden meine Daten zu kommerziellen Zwecken verwendet?</strong><br>
Niemals.</p>
<p><strong>Kann die Unterkunft meine Daten nach der Übermittlung ändern?</strong><br>
Nein. Sie kann nur einsehen, was übermittelt wurde.</p>

<h3>4. Besondere Situationen</h3>
<p><strong>Muss ein Aufenthalt bei Freunden oder Familie gemeldet werden?</strong><br>
Nein, solange der Aufenthalt kostenlos ist.</p>
<p><strong>Darf ich übernachten, wenn ich mich in einer irregulären Situation befinde?</strong><br>
Ja, aber die Meldung ist dennoch verpflichtend.</p>
<p><strong>Wenn ich Teil einer Gruppe bin, reicht eine Meldung?</strong><br>
Nein. Jeder ausländische Gast muss einzeln gemeldet werden.</p>
<p><strong>Muss ein kostenloser Aufenthalt ebenfalls gemeldet werden?</strong><br>
Ja.</p>

<h3>5. Praktische Fragen</h3>
<p><strong>Was passiert, wenn ein Gast abreist, ohne zu bezahlen?</strong><br>
Die Unterkunft muss dies der Polizei (PSP oder GNR) melden.</p>
<p><strong>Wer ist für die Meldung verantwortlich?</strong><br>
Die Unterkunft. Der Gast stellt lediglich die Daten bereit.</p>
<p><strong>Was passiert, wenn ein Fehler in meinen Daten vorliegt?</strong><br>
Er kann vor der Übermittlung korrigiert werden. Danach kann nur AIMA eingreifen.</p>

<h3>6. Weitere Informationen</h3>
<p>Offizielle Informationen: <a href="https://siba.ssi.gov.pt/" target="_blank">https://siba.ssi.gov.pt/</a></p>
`
};

function loadFaq() {
  const faqContent = document.getElementById("faqContent");
  if (faqContent) {
    faqContent.innerHTML = faqTexts[currentLang] || faqTexts.pt;
  }
}


// ============================================================
// 5. TRADUÇÕES DE E-MAIL
// ============================================================
const emailTranslations = {
  pt: { subject: texts.pt.subject, greeting: texts.pt.greeting, confirmation: texts.pt.confirmation, footer: texts.pt.footer },
  en: { subject: texts.en.subject, greeting: texts.en.greeting, confirmation: texts.en.confirmation, footer: texts.en.footer },
  es: { subject: texts.es.subject, greeting: texts.es.greeting, confirmation: texts.es.confirmation, footer: texts.es.footer },
  fr: { subject: texts.fr.subject, greeting: texts.fr.greeting, confirmation: texts.fr.confirmation, footer: texts.fr.footer },
  it: { subject: texts.it.subject, greeting: texts.it.greeting, confirmation: texts.it.confirmation, footer: texts.it.footer },
  de: { subject: texts.de.subject, greeting: texts.de.greeting, confirmation: texts.de.confirmation, footer: texts.de.footer }
};


// ============================================================
// 6. SELEÇÃO DE ELEMENTOS E CONTROLADOR DE IDIOMA
// ============================================================
let currentLang = "pt";

const subtitleEl = document.getElementById("subtitle-text");
const legalInfoEl = document.getElementById("legalInfo");
const formSectionEl = document.getElementById("aimaFormSection");
const formTitleEl = document.getElementById("formTitle");
const stayDataTitleEl = document.getElementById("stayDataTitle");
const checkinLabelEl = document.getElementById("checkinLabel");
const checkoutLabelEl = document.getElementById("checkoutLabel");
const adultsLabelEl = document.getElementById("adultsLabel");
const childrenLabelEl = document.getElementById("childrenLabel");
const guestsContainerEl = document.getElementById("guestsContainer");
const submitBtnEl = document.getElementById("submitLabel");
const adultsInput = document.getElementById("adults");
const childrenInput = document.getElementById("children");

function setLanguage(lang) {
  currentLang = lang;
  const t = texts[lang];
  document.documentElement.lang = lang;

  if (subtitleEl) subtitleEl.textContent = t.subtitle;
  if (legalInfoEl) legalInfoEl.innerHTML = t.legalHtml;
  if (formSectionEl) formSectionEl.style.display = "block";
  if (formTitleEl) formTitleEl.textContent = t.formTitle;
  if (stayDataTitleEl) stayDataTitleEl.textContent = t.stayDataTitle;
  if (checkinLabelEl) checkinLabelEl.textContent = t.checkinLabel;
  if (checkoutLabelEl) checkoutLabelEl.textContent = t.checkoutLabel;
  if (adultsLabelEl) adultsLabelEl.textContent = t.adultsLabel;
  if (childrenLabelEl) childrenLabelEl.textContent = t.childrenLabel;
  if (submitBtnEl) submitBtnEl.textContent = t.submit;

  const reqNoticeEl = document.getElementById("requiredNotice");
  if (reqNoticeEl) reqNoticeEl.textContent = t.requiredNotice;

  const checkinInputEl = document.getElementById("checkinDate");
  const checkoutInputEl = document.getElementById("checkoutDate");
  if (checkinInputEl) checkinInputEl.placeholder = t.placeholder_checkin;
  if (checkoutInputEl) checkoutInputEl.placeholder = t.placeholder_checkout;

  if (document.getElementById("labelWantsCopy")) document.getElementById("labelWantsCopy").textContent = t.wants_copy_title;
  if (document.getElementById("labelRadioYes")) document.getElementById("labelRadioYes").textContent = t.radio_yes;
  if (document.getElementById("labelRadioNo")) document.getElementById("labelRadioNo").textContent = t.radio_no;
  if (document.getElementById("labelClientEmail")) document.getElementById("labelClientEmail").textContent = t.email_label;

  // Gerar e traduzir os campos dos hóspedes com a lista de países do idioma ativo
  generateGuestFields();

  document.querySelectorAll("select").forEach(sel => {
    const firstOption = sel.querySelector("option[value='']");
    if (firstOption) {
      firstOption.textContent = t.placeholder_select;
      firstOption.disabled = true;
      firstOption.hidden = true;
      firstOption.selected = true;
    }
  });

  // Reaplicar evento do modal FAQ após renderizar o HTML do aviso legal
  setTimeout(() => {
    const openFaqBtn = document.getElementById("openFaqModal");
    if (openFaqBtn) {
      openFaqBtn.onclick = (e) => {
        e.preventDefault();
        const faqTitle = document.getElementById("faqTitle");
        if (faqTitle) faqTitle.textContent = faqTitles[currentLang] || faqTitles.pt;
        loadFaq();
        const faqModal = document.getElementById("faqModal");
        if (faqModal) faqModal.style.display = "block";
      };
    }
  }, 0);
}


// ============================================================
// 7. GERAÇÃO DINÂMICA DOS CAMPOS COM PAÍSES TRADUZIDOS
// ============================================================
function generateGuestFields() {
  const t = texts[currentLang];
  const activeCountries = countryLists[currentLang] || countryLists.en;
  
  const adults = parseInt(adultsInput?.value || "0", 10);
  const children = parseInt(childrenInput?.value || "0", 10);
  const total = adults + children;

  const existingData = [];
  const currentCards = guestsContainerEl ? guestsContainerEl.querySelectorAll(".guest-card") : [];
  currentCards.forEach((card, index) => {
    const idx = index + 1;
    existingData.push({
      fullName: card.querySelector(`[name="guest_${idx}_fullName"]`)?.value || "",
      birthDate: card.querySelector(`[name="guest_${idx}_birthDate"]`)?.value || "",
      nationality: card.querySelector(`[name="guest_${idx}_nationality"]`)?.value || "",
      residenceCountry: card.querySelector(`[name="guest_${idx}_residenceCountry"]`)?.value || "",
      docNumber: card.querySelector(`[name="guest_${idx}_docNumber"]`)?.value || "",
      docType: card.querySelector(`[name="guest_${idx}_docType"]`)?.value || "",
      docOther: card.querySelector(`[name="guest_${idx}_docOther"]`)?.value || "",
      docCountry: card.querySelector(`[name="guest_${idx}_docCountry"]`)?.value || ""
    });
  });

  if (!guestsContainerEl) return;
  guestsContainerEl.innerHTML = "";

  for (let i = 1; i <= total; i++) {
    const card = document.createElement("div");
    card.className = "form-card guest-card";
    const saved = existingData[i - 1] || {};

    card.innerHTML = `
      <h4>${t.guestTitle(i)}</h4>

      <div class="form-row">
        <label>${t.fields.fullName}</label>
        <input type="text" name="guest_${i}_fullName" value="${saved.fullName || ''}" required>
      </div>

      <div class="form-row">
        <label>${t.fields.birthDate}</label>
        <input type="date" name="guest_${i}_birthDate" value="${saved.birthDate || ''}" required>
      </div>

      <div class="form-row">
        <label>${t.fields.nationality}</label>
        <select name="guest_${i}_nationality" required>
          <option value="" disabled hidden ${!saved.nationality ? 'selected' : ''}>${t.placeholder_select}</option>
          ${activeCountries.map(c => `<option value="${c}" ${saved.nationality === c ? 'selected' : ''}>${c}</option>`).join("")}
        </select>
      </div>

      <div class="form-row">
        <label>${t.fields.residenceCountry}</label>
        <select name="guest_${i}_residenceCountry" required>
          <option value="" disabled hidden ${!saved.residenceCountry ? 'selected' : ''}>${t.placeholder_select}</option>
          ${activeCountries.map(c => `<option value="${c}" ${saved.residenceCountry === c ? 'selected' : ''}>${c}</option>`).join("")}
        </select>
      </div>

      <div class="form-row">
        <label>${t.fields.docNumber}</label>
        <input type="text" name="guest_${i}_docNumber" value="${saved.docNumber || ''}" required>
      </div>

      <div class="form-row">
        <label>${t.fields.docType}</label>
        <select name="guest_${i}_docType" id="docType_${i}" required>
          <option value="" disabled hidden ${!saved.docType ? 'selected' : ''}>${t.placeholder_select}</option>
          <option value="passport" ${saved.docType === 'passport' ? 'selected' : ''}>${t.fields.docTypePassport}</option>
          <option value="id" ${saved.docType === 'id' ? 'selected' : ''}>${t.fields.docTypeID}</option>
          <option value="other" ${saved.docType === 'other' ? 'selected' : ''}>${t.fields.docTypeOther}</option>
        </select>
      </div>

      <div class="form-row" id="otherDocField_${i}" style="display: ${saved.docType === 'other' ? 'block' : 'none'};">
        <label>${t.fields.docTypeOtherLabel}</label>
        <input type="text" name="guest_${i}_docOther" value="${saved.docOther || ''}" ${saved.docType === 'other' ? 'required' : ''}>
      </div>

      <div class="form-row">
        <label>${t.fields.docCountry}</label>
        <select name="guest_${i}_docCountry" required>
          <option value="" disabled hidden ${!saved.docCountry ? 'selected' : ''}>${t.placeholder_select}</option>
          ${activeCountries.map(c => `<option value="${c}" ${saved.docCountry === c ? 'selected' : ''}>${c}</option>`).join("")}
        </select>
      </div>
    `;

    guestsContainerEl.appendChild(card);

    const docTypeSelect = card.querySelector(`#docType_${i}`);
    const otherField = card.querySelector(`#otherDocField_${i}`);
    const otherInput = otherField.querySelector("input");

    docTypeSelect.addEventListener("change", () => {
      const isOther = docTypeSelect.value === "other";
      otherField.style.display = isOther ? "block" : "none";
      if (isOther) {
        otherInput.setAttribute("required", "required");
      } else {
        otherInput.removeAttribute("required");
        otherInput.value = "";
      }
    });
  }
}

if (adultsInput) adultsInput.addEventListener("input", generateGuestFields);
if (childrenInput) childrenInput.addEventListener("input", generateGuestFields);


// ============================================================
// 8. CONSTRUTOR DO E-MAIL OFICIAL — APARTMENTS BELLEVIEW LAGOS
// ============================================================
function buildEmailSummaryHtml(boletim, lang) {
  const t = texts[lang] || texts.pt;
  
  const primaryBlue = "#0070ba";   // Azul da marca
  const darkNavy    = "#0a2540";   // Azul escuro institucional
  const lightBg     = "#f4f7fa";   // Fundo do e-mail

  let html = `
  <div style="background-color: ${lightBg}; padding: 25px 10px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #2d3748; margin: 0;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" align="center" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.06); border: 1px solid #e2e8f0;">
      
      <!-- CABEÇALHO COM A MARCA -->
      <tr>
        <td align="center" style="background-color: #ffffff; padding: 28px 20px; border-bottom: 3px solid ${primaryBlue};">
          <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: ${darkNavy}; letter-spacing: -0.3px; font-family: inherit;">
            Apartments Belleview <span style="color: ${primaryBlue};">Lagos</span>
          </h1>
        </td>
      </tr>

      <!-- MENSAGEM DE BOAS-VINDAS -->
      <tr>
        <td style="padding: 25px 30px 10px 30px;">
          <h2 style="color: ${darkNavy}; margin-top: 0; font-size: 18px; font-weight: 600;">
            ${t.greeting} ${boletim.hospedes?.[0]?.nome || "Hóspede"},
          </h2>
          <p style="color: #4a5568; font-size: 14px; line-height: 1.6; margin: 0;">
            ${t.confirmation}
          </p>
        </td>
      </tr>

      <!-- DADOS DA ESTADIA -->
      <tr>
        <td style="padding: 15px 30px;">
          <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid ${primaryBlue}; border-radius: 8px; padding: 18px;">
            <h3 style="margin-top: 0; margin-bottom: 12px; color: ${primaryBlue}; font-size: 13px; text-transform: uppercase; letter-spacing: 0.8px; font-weight: 700;">
              📌 ${t.stayDataTitle}
            </h3>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="font-size: 14px; color: #334155;">
              <tr>
                <td style="padding: 6px 0; width: 45%;"><strong>📅 ${t.checkinLabel}:</strong></td>
                <td style="padding: 6px 0; color: ${darkNavy}; font-weight: 600;">${boletim.dataCheckin}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0;"><strong>📅 ${t.checkoutLabel}:</strong></td>
                <td style="padding: 6px 0; color: ${darkNavy}; font-weight: 600;">${boletim.dataCheckout}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0;"><strong>👤 ${t.adultsLabel}:</strong></td>
                <td style="padding: 6px 0; color: ${darkNavy}; font-weight: 600;">${boletim.numAdultos}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0;"><strong>👶 ${t.childrenLabel}:</strong></td>
                <td style="padding: 6px 0; color: ${darkNavy}; font-weight: 600;">${boletim.numCriancas}</td>
              </tr>
            </table>
          </div>
        </td>
      </tr>

      <!-- DETALHES DOS HÓSPEDES -->
      <tr>
        <td style="padding: 10px 30px 20px 30px;">
          <h3 style="color: ${darkNavy}; font-size: 16px; margin-top: 10px; margin-bottom: 15px; font-weight: 600;">
            📄 ${t.formTitle}
          </h3>
  `;

  // CARTÃO INDIVIDUAL DE CADA HÓSPEDE
  boletim.hospedes.forEach((h, idx) => {
    let docTypeLabel = h.docTipo;
    if (h.docTipo === "passport") docTypeLabel = t.fields.docTypePassport;
    else if (h.docTipo === "id") docTypeLabel = t.fields.docTypeID;
    else if (h.docTipo === "other") docTypeLabel = h.docOutroDesc || t.fields.docTypeOther;

    html += `
          <div style="background-color: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px; margin-bottom: 15px; overflow: hidden;">
            <div style="background-color: #f1f5f9; border-bottom: 1px solid #cbd5e1; padding: 10px 15px; color: ${darkNavy}; font-weight: 600; font-size: 13px;">
              👤 ${t.guestTitle(idx + 1)} — ${h.nome}
            </div>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="font-size: 13px; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 8px 15px; color: #64748b; width: 42%;"><strong>${t.fields.fullName}</strong></td>
                <td style="padding: 8px 15px; color: #0f172a;">${h.nome}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9; background-color: #f8fafc;">
                <td style="padding: 8px 15px; color: #64748b;"><strong>${t.fields.birthDate}</strong></td>
                <td style="padding: 8px 15px; color: #0f172a;">${h.dataNascimento}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 8px 15px; color: #64748b;"><strong>${t.fields.nationality}</strong></td>
                <td style="padding: 8px 15px; color: #0f172a;">${h.nacionalidade}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9; background-color: #f8fafc;">
                <td style="padding: 8px 15px; color: #64748b;"><strong>${t.fields.residenceCountry}</strong></td>
                <td style="padding: 8px 15px; color: #0f172a;">${h.paisResidencia}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 8px 15px; color: #64748b;"><strong>${t.fields.docType}</strong></td>
                <td style="padding: 8px 15px; color: #0f172a;">${docTypeLabel}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9; background-color: #f8fafc;">
                <td style="padding: 8px 15px; color: #64748b;"><strong>${t.fields.docNumber}</strong></td>
                <td style="padding: 8px 15px; color: #0f172a;">${h.docNumero}</td>
              </tr>
              <tr>
                <td style="padding: 8px 15px; color: #64748b;"><strong>${t.fields.docCountry}</strong></td>
                <td style="padding: 8px 15px; color: #0f172a;">${h.docPaisEmissor}</td>
              </tr>
            </table>
          </div>
    `;
  });

  // RODAPÉ INSTITUCIONAL SIMPLIFICADO E NEUTRO COM SITE EM LINHA PRÓPRIA
  html += `
        </td>
      </tr>

      <!-- RODAPÉ SIMPLIFICADO -->
      <tr>
        <td align="center" style="background-color: ${darkNavy}; padding: 25px 20px; color: #ffffff; font-size: 12px; line-height: 1.6; text-align: center;">
          <p style="margin: 0 0 10px 0; font-size: 15px; font-weight: 700; color: #ffffff;">
            Apartments Belleview Lagos
          </p>

          <p style="margin: 0 0 10px 0; color: #cbd5e1; font-size: 12px;">
            Rua Quinta do Landeiro Lote 22, 23<br>
            Urbanização Marina Park<br>
            8600-302 Lagos, Algarve - Portugal
          </p>

          <p style="margin: 0 0 12px 0; color: #cbd5e1; font-size: 12px;">
            <strong>Tel:</strong> <a href="tel:+351910051588" style="color: #60a5fa; text-decoration: none;">+351 910 051 588</a><br>
            <strong>WhatsApp:</strong> <a href="https://wa.me/351910051588" style="color: #60a5fa; text-decoration: none;">+351 910 051 588</a><br>
            <strong>Email:</strong> <a href="mailto:belleview@sapo.pt" style="color: #60a5fa; text-decoration: none;">belleview@sapo.pt</a><br>
            <strong>Web:</strong> <a href="https://www.apartmentsbelleview.com" target="_blank" style="color: #60a5fa; text-decoration: none;">www.apartmentsbelleview.com</a>
          </p>

          <p style="margin: 0 0 12px 0; color: #94a3b8; font-size: 11px; border-top: 1px solid #1e293b; padding-top: 10px;">
            <strong>AL:</strong> 26313/AL, 116670/AL, 116671/AL
          </p>

          <p style="margin: 0; color: #64748b; font-size: 11px;">
            © 2026 Apartments Belleview Lagos
          </p>
        </td>
      </tr>

    </table>
  </div>
  `;

  return html;
}
// ============================================================
// 9. ENVIO DO FORMULÁRIO (FIRESTORE + EMAILJS + SIBA)
// ============================================================
const aimaFormEl = document.getElementById("aimaForm");
if (aimaFormEl) {
  aimaFormEl.addEventListener("submit", async function (e) {
    e.preventDefault();

    const t = texts[currentLang];

    if (!this.checkValidity()) {
      this.reportValidity();
      return;
    }

    const checkin = document.getElementById("checkinDate").value;
    const checkout = document.getElementById("checkoutDate").value;

    if (new Date(checkin) >= new Date(checkout)) {
      alert("Check-out deve ser posterior ao Check-in.");
      return;
    }

    const adults = parseInt(adultsInput?.value || "0", 10);
    const children = parseInt(childrenInput?.value || "0", 10);
    const totalGuests = adults + children;

    const hospedes = [];
    for (let i = 1; i <= totalGuests; i++) {
      hospedes.push({
        nome: document.querySelector(`[name="guest_${i}_fullName"]`)?.value.trim() || "",
        dataNascimento: document.querySelector(`[name="guest_${i}_birthDate"]`)?.value || "",
        nacionalidade: document.querySelector(`[name="guest_${i}_nationality"]`)?.value || "",
        paisResidencia: document.querySelector(`[name="guest_${i}_residenceCountry"]`)?.value || "",
        docTipo: document.querySelector(`[name="guest_${i}_docType"]`)?.value || "",
        docNumero: document.querySelector(`[name="guest_${i}_docNumber"]`)?.value.trim() || "",
        docOutroDesc: document.querySelector(`[name="guest_${i}_docOther"]`)?.value.trim() || "",
        docPaisEmissor: document.querySelector(`[name="guest_${i}_docCountry"]`)?.value || ""
      });
    }

    const selectedCopy = document.querySelector('input[name="wantsCopyRadio"]:checked')?.value;
    const wantsCopy = selectedCopy === "sim";
    
    const emailDigitado = document.getElementById("clientEmail")?.value.trim() || 
                          document.getElementById("email")?.value.trim() || "";

    const novoBoletim = {
      criadoEm: firebase.firestore.FieldValue.serverTimestamp(),
      dataCheckin: checkin,
      dataCheckout: checkout,
      numAdultos: adults,
      numCriancas: children,
      emailCliente: emailDigitado,
      pediuCopia: wantsCopy,
      hospedes: hospedes,
      alojamentoId: null,
      status: "PENDENTE_ATRIBUICAO"
    };

    const submitBtn = document.getElementById("submitLabel") || this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    submitBtn.textContent = "A enviar...";
    submitBtn.disabled = true;

    try {
      // 1. Gravar na BD (Firestore)
      await db.collection("boletins").add(novoBoletim);

      // 2. Enviar via EmailJS se o cliente indicou e-mail
      if (emailDigitado) {
        const tEmail = emailTranslations[currentLang] || emailTranslations["en"];
        const guestsDetailsHtml = buildEmailSummaryHtml(novoBoletim, currentLang);

        await emailjs.send(
          "service_funp519",
          "template_0oqqqy3",
          {
            to_email: emailDigitado,
            subject_text: tEmail.subject,
            greeting: tEmail.greeting,
            guest_name: novoBoletim.hospedes?.[0]?.nome || "Hóspede",
            confirmation_text: tEmail.confirmation,
            label_checkin: tEmail.label_checkin,
            checkin: novoBoletim.dataCheckin || "",
            label_checkout: tEmail.label_checkout,
            checkout: novoBoletim.dataCheckout || "",
            guests_details: guestsDetailsHtml,
            footer_text: tEmail.footer
          },
          "imhA9ilHaWGF1hxYz"
        );
      }

      // 3. GUARDAR NO PAINEL SIBA (aimasiba.js)
      if (typeof guardarBoletimPendente === "function") {
        guardarBoletimPendente(novoBoletim);
      }

      // 4. Apresentar Popup de Sucesso
      const popup = document.getElementById("aimaSuccessPopup");
      if (popup) {
        const popupText = popup.querySelector(".success-popup-text");
        if (popupText) popupText.textContent = t.aima_success;
        popup.style.display = "flex";

        setTimeout(() => {
          popup.style.display = "none";
        }, 3000);
      }

      this.reset();
      generateGuestFields();

    } catch (error) {
      console.error("Erro ao processar:", error);
      alert("Erro ao guardar dados. Tente novamente.");
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}


// ============================================================
// 10. INICIALIZAÇÃO EM PORTUGUÊS
// ============================================================
setLanguage("pt");
