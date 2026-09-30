// ============================================================
// 1. INICIALIZAÇÃO E REMOÇÃO DE VALIDAÇÃO NATIVA
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[required]").forEach(el => el.removeAttribute("required"));
});


// ============================================================
// 2. LISTAS DE PAÍSES TRADUZIDAS E ORDENADAS POR IDIOMA
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
      <p>A prestação destes dados é <strong>estritamente obrigatória por lei</strong>. A recusa em fornecer as informações necessárias impede legalmente a realização do check-in e implica a <strong>anulação imediata da reserva sem direito a reembolso</strong>.</p>
      <p>Para o proprietário do alojamento, a não comunicação destes dados constitui uma <strong>contraordenação grave</strong>, punível com coimas significativas.</p>
      <h4><strong>Privacidade e proteção dos seus dados</strong></h4>
      <p>Os dados recolhidos são utilizados exclusivamente para cumprimento desta obrigação legal e tratados em conformidade com o <strong>Regulamento Geral sobre a Proteção de Dados (RGPD)</strong>.</p>
      <p><a href="/docs/sef.pdf" target="_blank" class="pdf-link">Verificar a informação em PDF</a></p>
      <p><a id="openFaqModal" class="faq-link">Perguntas Frequentes (FAQ)</a></p>
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
      <p>This form collects the mandatory identification data of all guests, as required by Portuguese law for communication to AIMA through the SIBA platform.</p>
      <h4><strong>Why is this information mandatory?</strong></h4>
      <p>Under <strong>Article 45 of Law 23/2007</strong>, all accommodation establishments are legally required to report the entry, stay and exit of foreign citizens in Portugal.</p>
      <p>This obligation applies to <strong>all guests without Portuguese nationality</strong>, including <strong>children and infants</strong>, without exception.</p>
      <h4><strong>What is this information used for?</strong></h4>
      <ul>
          <li><strong>National Security:</strong> Supports the prevention and investigation of serious crimes and terrorism.</li>
          <li><strong>Guest Protection:</strong> In case of emergency or disaster, it allows authorities to locate citizens quickly.</li>
      </ul>
      <h4><strong>Obligation and consequences of refusal</strong></h4>
      <p>Providing this information is <strong>strictly mandatory by law</strong>. Refusing to provide data legally prevents check‑in and results in cancellation without refund.</p>
      <p><a href="/docs/sef.pdf" target="_blank" class="pdf-link">View information in PDF</a></p>
      <p><a id="openFaqModal" class="faq-link">Frequently Asked Questions (FAQ)</a></p>
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
      <p>Este formulario recoge los datos obligatorios de identificación de todos los huéspedes para su comunicación a AIMA a través de la plataforma SIBA.</p>
      <h4><strong>¿Por qué son obligatorios estos datos?</strong></h4>
      <p>Según el <strong>Artículo 45 de la Ley n.º 23/2007</strong>, todos los alojamientos están obligados a comunicar la estancia de ciudadanos extranjeros.</p>
      <p>Esta obligación se aplica a <strong>todos los huéspedes sin nacionalidad portuguesa</strong>, incluidos <strong>niños y bebés</strong>.</p>
      <p><a href="/docs/sef.pdf" target="_blank" class="pdf-link">Ver información en PDF</a></p>
      <p><a id="openFaqModal" class="faq-link">Preguntas Frecuentes (FAQ)</a></p>
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
      nationality: "Nacionalidad:",
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
      <p>Ce formulaire recueille les données d’identification obligatoires de tous les hôtes, conformément à la législation portugaise via la plateforme SIBA.</p>
      <h4><strong>Pourquoi ces informations sont-elles obligatoires ?</strong></h4>
      <p>Selon <strong>l’Article 45 de la Loi n.º 23/2007</strong>, tous les hébergements doivent déclarer le séjour des citoyens étrangers.</p>
      <p>Cette obligation s’applique à <strong>tous les hôtes n’ayant pas la nationalité portugaise</strong>, y compris <strong>les enfants et les bébés</strong>.</p>
      <p><a href="/docs/sef.pdf" target="_blank" class="pdf-link">Consulter les informations en PDF</a></p>
      <p><a id="openFaqModal" class="faq-link">Foire aux Questions (FAQ)</a></p>
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
      <p>Questo modulo raccoglie i dati identificativi obbligatori di tutti gli ospiti come richiesto dalla legge portoghese.</p>
      <p><a href="/docs/sef.pdf" target="_blank" class="pdf-link">Visualizza le informazioni in PDF</a></p>
      <p><a id="openFaqModal" class="faq-link">Domande Frequenti (FAQ)</a></p>
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
      <p>Dieses Formular erfasst die obligatorischen Identifikationsdaten aller Gäste gemäß portugiesischem Gesetz.</p>
      <p><a href="/docs/sef.pdf" target="_blank" class="pdf-link">Informationen als PDF ansehen</a></p>
      <p><a id="openFaqModal" class="faq-link">Häufig gestellte Fragen (FAQ)</a></p>
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
      nationality: "Staatsangehörigkeit:",
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
// 4. TRADUÇÕES DE E-MAIL
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
// 5. SELEÇÃO DE ELEMENTOS E CONTROLADOR DE IDIOMA
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

  // Gerar e traduzir os campos dos hóspedes com a lista de países correta do idioma ativo
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
}


// ============================================================
// 6. GERAÇÃO DINÂMICA DOS CAMPOS COM PAÍSES TRADUZIDOS
// ============================================================
function generateGuestFields() {
  const t = texts[currentLang];
  const activeCountries = countryLists[currentLang] || countryLists.en;
  
  const adults = parseInt(adultsInput.value || "0", 10);
  const children = parseInt(childrenInput.value || "0", 10);
  const total = adults + children;

  const existingData = [];
  const currentCards = guestsContainerEl.querySelectorAll(".guest-card");
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
// CONSTRUTOR DO E-MAIL PROFISSIONAL (HTML INLINE COMPATÍVEL)
// ============================================================
function buildEmailSummaryHtml(boletim, lang) {
  const t = texts[lang] || texts.pt;
  
  // URL do seu logótipo (substitua pelo link real do seu logótipo)
  const logoUrl = "https://apartmentsbelleview.com/logo.png"; 
  
  let html = `
  <div style="background-color: #f4f6f9; padding: 20px 10px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #333333; margin: 0;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" align="center" style="max-width: 620px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.06); border: 1px solid #e2e8f0;">
      
      <!-- CABEÇALHO / LOGÓTIPO -->
      <tr>
        <td align="center" style="background-color: #0d233a; padding: 30px 20px; border-bottom: 3px solid #c5a059;">
          <img src="${logoUrl}" alt="Apartamentos Belleview" style="max-width: 200px; height: auto; display: block;" onerror="this.style.display='none'; document.getElementById('alt-logo-text').style.display='block';" />
          <h1 id="alt-logo-text" style="display:none; color: #ffffff; margin: 0; font-size: 24px; font-weight: 300; letter-spacing: 2px; text-transform: uppercase;">
            Apartamentos <span style="color: #c5a059; font-weight: 600;">Belleview</span>
          </h1>
        </td>
      </tr>

      <!-- MENSAGEM DE BOAS-VINDAS -->
      <tr>
        <td style="padding: 25px 30px 10px 30px;">
          <h2 style="color: #0d233a; margin-top: 0; font-size: 20px; font-weight: 600;">
            ${t.greeting} ${boletim.hospedes?.[0]?.nome || "Hóspede"},
          </h2>
          <p style="color: #555555; font-size: 15px; line-height: 1.6; margin: 0;">
            ${t.confirmation}
          </p>
        </td>
      </tr>

      <!-- CARTÃO: DADOS DA ESTADIA -->
      <tr>
        <td style="padding: 15px 30px;">
          <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 20px;">
            <h3 style="margin-top: 0; margin-bottom: 15px; color: #0d233a; font-size: 16px; border-bottom: 2px solid #c5a059; padding-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">
              📌 ${t.stayDataTitle}
            </h3>
            
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="font-size: 14px; color: #475569;">
              <tr>
                <td style="padding: 6px 0; width: 50%;"><strong>📅 ${t.checkinLabel}</strong></td>
                <td style="padding: 6px 0; color: #0d233a; font-weight: 600;">${boletim.dataCheckin}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0;"><strong>📅 ${t.checkoutLabel}</strong></td>
                <td style="padding: 6px 0; color: #0d233a; font-weight: 600;">${boletim.dataCheckout}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0;"><strong>👤 ${t.adultsLabel}</strong></td>
                <td style="padding: 6px 0; color: #0d233a; font-weight: 600;">${boletim.numAdultos}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0;"><strong>👶 ${t.childrenLabel}</strong></td>
                <td style="padding: 6px 0; color: #0d233a; font-weight: 600;">${boletim.numCriancas}</td>
              </tr>
            </table>
          </div>
        </td>
      </tr>

      <!-- SECÇÃO DE HÓSPEDES -->
      <tr>
        <td style="padding: 10px 30px 20px 30px;">
          <h3 style="color: #0d233a; font-size: 18px; margin-top: 10px; margin-bottom: 15px; font-weight: 600;">
            📄 ${t.formTitle}
          </h3>
  `;

  // CARTÃO DE CADA HÓSPEDE
  boletim.hospedes.forEach((h, idx) => {
    let docTypeLabel = h.docTipo;
    if (h.docTipo === "passport") docTypeLabel = t.fields.docTypePassport;
    else if (h.docTipo === "id") docTypeLabel = t.fields.docTypeID;
    else if (h.docTipo === "other") docTypeLabel = h.docOutroDesc || t.fields.docTypeOther;

    html += `
          <div style="background-color: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px; margin-bottom: 15px; overflow: hidden;">
            <div style="background-color: #f1f5f9; padding: 10px 15px; border-bottom: 1px solid #cbd5e1; color: #0d233a; font-weight: bold; font-size: 14px;">
              👥 ${t.guestTitle(idx + 1)} — ${h.nome}
            </div>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="font-size: 13px; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 8px 15px; color: #64748b; width: 40%;"><strong>${t.fields.fullName}</strong></td>
                <td style="padding: 8px 15px; color: #1e293b;">${h.nome}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9; background-color: #fafafa;">
                <td style="padding: 8px 15px; color: #64748b;"><strong>${t.fields.birthDate}</strong></td>
                <td style="padding: 8px 15px; color: #1e293b;">${h.dataNascimento}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 8px 15px; color: #64748b;"><strong>${t.fields.nationality}</strong></td>
                <td style="padding: 8px 15px; color: #1e293b;">${h.nacionalidade}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9; background-color: #fafafa;">
                <td style="padding: 8px 15px; color: #64748b;"><strong>${t.fields.residenceCountry}</strong></td>
                <td style="padding: 8px 15px; color: #1e293b;">${h.paisResidencia}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 8px 15px; color: #64748b;"><strong>${t.fields.docType}</strong></td>
                <td style="padding: 8px 15px; color: #1e293b;">${docTypeLabel}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9; background-color: #fafafa;">
                <td style="padding: 8px 15px; color: #64748b;"><strong>${t.fields.docNumber}</strong></td>
                <td style="padding: 8px 15px; color: #1e293b;">${h.docNumero}</td>
              </tr>
              <tr>
                <td style="padding: 8px 15px; color: #64748b;"><strong>${t.fields.docCountry}</strong></td>
                <td style="padding: 8px 15px; color: #1e293b;">${h.docPaisEmissor}</td>
              </tr>
            </table>
          </div>
    `;
  });

  // RODAPÉ INSTITUCIONAL
  html += `
        </td>
      </tr>

      <tr>
        <td align="center" style="background-color: #0d233a; padding: 25px 20px; color: #ffffff; font-size: 13px;">
          <p style="margin: 0 0 8px 0; font-size: 15px; font-weight: 500; color: #c5a059;">
            ${t.footer}
          </p>
          <p style="margin: 0 0 12px 0; color: #94a3b8;">
            Apartamentos Belleview — Lagos, Portugal
          </p>
          <p style="margin: 0; font-size: 12px;">
            <a href="https://apartmentsbelleview.com" target="_blank" style="color: #c5a059; text-decoration: none; margin: 0 8px;">www.apartmentsbelleview.com</a> | 
            <a href="mailto:lagosapartmentsbelleview@gmail.com" style="color: #c5a059; text-decoration: none; margin: 0 8px;">Contacto</a>
          </p>
        </td>
      </tr>

    </table>
  </div>
  `;

  return html;
}

// ============================================================
// 8. ENVIO DO FORMULÁRIO (FIRESTORE + EMAILJS)
// ============================================================
document.getElementById("aimaForm").addEventListener("submit", async function (e) {
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

  const adults = parseInt(adultsInput.value || "0", 10);
  const children = parseInt(childrenInput.value || "0", 10);
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
    // 1. Gravar no Firestore
    await db.collection("boletins").add(novoBoletim);

    // 2. Enviar via EmailJS se o utilizador preencheu o e-mail
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

    // 3. Popup de Sucesso
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


// Inicialização padrão em Português
setLanguage("pt");
