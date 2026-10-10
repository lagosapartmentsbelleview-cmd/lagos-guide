// ============================================================
// AIMATEST.JS — FICHEIRO UNIFICADO PROFISSIONAL (AIMA + LANG + SIBA + FIREBASE)
// ============================================================

/* ============================================================
   1. LER PARÂMETROS DA QUERY STRING & IDIOMA
============================================================ */
function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

const supportedLangs = ["pt", "en", "es", "fr", "de", "it"];

let lang =
  (getQueryParam("lang") && supportedLangs.includes(getQueryParam("lang")))
    ? getQueryParam("lang")
    : "pt";

if (!supportedLangs.includes(lang)) lang = "pt";
let currentLang = lang;

/* ============================================================
   2. LINKS E TEXTOS FIXOS DO RODAPÉ (6 IDIOMAS)[cite: 3]
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

const footerTextsAIMA = {
  pt: { call: "(Chamada para a rede fixa nacional)", reg: "Nº de Registos AL", operator: "Entidade Exploradora", rights: "Todos os direitos reservados." },
  en: { call: "(Call to a national landline network)", reg: "AL Registration Numbers", operator: "Operating Entity", rights: "All rights reserved." },
  es: { call: "(Llamada a la red fija nacional)", reg: "Números de Registro AL", operator: "Entidad Operadora", rights: "Todos los derechos reservados." },
  fr: { call: "(Appel vers le réseau fixe national)", reg: "Numéros d’Enregistrement AL", operator: "Entité Exploitante", rights: "Tous droits réservés." },
  de: { call: "(Anruf ins nationale Festnetz)", reg: "AL‑Registrierungsnummern", operator: "Betreibende Einheit", rights: "Alle Rechte vorbehalten." },
  it: { call: "(Chiamata alla rete fissa nazionale)", reg: "Numeri di Registrazione AL", operator: "Entità Gestore", rights: "Tutti i diritti riservati." }
};

function updateFooterLinksAIMA() {
  const footerLinksContainer = document.querySelector(".footer-links");
  if (!footerLinksContainer) return;
  const links = footerLinks[currentLang] || footerLinks["pt"];
  footerLinksContainer.innerHTML = links
    .map(link => link.external ? `<a href="${link.href}" target="_blank" rel="noopener noreferrer">${link.label}</a>` : `<a href="${link.href}?lang=${currentLang}&from=aima">${link.label}</a>`)
    .join(" | ");
}

function updateFooterTextsAIMA() {
  if (document.getElementById("footer-call")) document.getElementById("footer-call").innerText = footerTextsAIMA[currentLang]?.call || "";
  if (document.getElementById("footer-reg")) document.getElementById("footer-reg").innerText = footerTextsAIMA[currentLang]?.reg || "";
  if (document.getElementById("footer-operator")) document.getElementById("footer-operator").innerText = footerTextsAIMA[currentLang]?.operator || "";
  if (document.getElementById("footer-rights")) document.getElementById("footer-rights").innerText = footerTextsAIMA[currentLang]?.rights || "";
}

// ============================================================
// 3. MAPA DE CONVERSÃO PARA CÓDIGOS ISO-3 (SUPORTE SIBA)
// ============================================================
const paisesIso3Map = {
  "Afghanistan": "AFG", "Albania": "ALB", "Algeria": "DZA", "Andorra": "AND", "Angola": "AGO", "Antigua and Barbuda": "ATG", "Argentina": "ARG", "Armenia": "ARM", "Australia": "AUS", "Austria": "AUT", "Azerbaijan": "AZE",
  "Bahamas": "BHS", "Bahrain": "BHR", "Bangladesh": "BGD", "Barbados": "BRB", "Belarus": "BLR", "Belgium": "BEL", "Belize": "BLZ", "Benin": "BEN", "Bhutan": "BTN", "Bolivia": "BOL", "Bosnia and Herzegovina": "BIH", "Botswana": "BWA", "Brazil": "BRA", "Brunei": "BRN", "Bulgaria": "BGR",
  "Burkina Faso": "BFA", "Burundi": "BDI", "Cabo Verde": "CPV", "Cambodia": "KHM", "Cameroon": "CMR", "Canada": "CAN", "Central African Republic": "CAF", "Chad": "TCD", "Chile": "CHL", "China": "CHN", "Colombia": "COL", "Comoros": "COM", "Congo (Congo-Brazzaville)": "COG", "Costa Rica": "CRI", "Croatia": "HRV", "Cuba": "CUB",
  "Cyprus": "CYP", "Czech Republic": "CZE", "Democratic Republic of the Congo": "COD", "Denmark": "DNK", "Djibouti": "DJI", "Dominica": "DMA", "Dominican Republic": "DOM", "Ecuador": "ECU", "Egypt": "EGY", "El Salvador": "SLV", "Equatorial Guinea": "GNQ", "Eritrea": "ERI", "Estonia": "EST", "Eswatini": "SWZ", "Ethiopia": "ETH",
  "Fiji": "FJI", "Finland": "FIN", "France": "FRA", "Gabon": "GAB", "Gambia": "GMB", "Georgia": "GEO", "Germany": "DEU", "Ghana": "GHA", "Greece": "GRC", "Grenada": "GRD", "Guatemala": "GTM", "Guinea": "GIN", "Guinea-Bissau": "GNB", "Guyana": "GUY", "Haiti": "HTI", "Honduras": "HND", "Hungary": "HUN",
  "Iceland": "ISL", "India": "IND", "Indonesia": "IDN", "Iran": "IRN", "Iraq": "IRQ", "Ireland": "IRL", "Israel": "ISR", "Italy": "ITA", "Jamaica": "JAM", "Japan": "JPN", "Jordan": "JOR", "Kazakhstan": "KAZ", "Kenya": "KEN", "Kiribati": "KIR", "Kuwait": "KWT", "Kyrgyzstan": "KGZ", "Laos": "LAO",
  "Latvia": "LVA", "Lebanon": "LBN", "Lesotho": "LSO", "Liberia": "LBR", "Libya": "LBY", "Liechtenstein": "LIE", "Lithuania": "LTU", "Luxembourg": "LUX", "Madagascar": "MDG", "Malawi": "MWI", "Malaysia": "MYS", "Maldives": "MDV", "Mali": "MLI", "Malta": "MLT", "Marshall Islands": "MHL", "Mauritania": "MRT", "Mauritius": "MUS",
  "Mexico": "MEX", "Micronesia": "FSM", "Moldova": "MDA", "Monaco": "MCO", "Mongolia": "MNG", "Montenegro": "MNE", "Morocco": "MAR", "Mozambique": "MOZ", "Myanmar": "MMR", "Namibia": "NAM", "Nauru": "NRU", "Nepal": "NPL", "Netherlands": "NLD", "New Zealand": "NZL", "Nicaragua": "NIC", "Niger": "NER", "Nigeria": "NGA",
  "North Korea": "PRK", "North Macedonia": "MKD", "Norway": "NOR", "Oman": "OMN", "Pakistan": "PAK", "Palau": "PLW", "Panama": "PAN", "Papua New Guinea": "PNG", "Paraguay": "PRY", "Peru": "PER", "Philippines": "PHL", "Poland": "POL", "Portugal": "PRT", "Qatar": "QAT", "Romania": "ROU", "Russia": "RUS", "Rwanda": "RWA",
  "Saint Kitts and Nevis": "KNA", "Saint Lucia": "LCA", "Saint Vincent and the Grenadines": "VCT", "Samoa": "WSM", "San Marino": "SMR", "Sao Tome and Principe": "STP", "Saudi Arabia": "SAU", "Senegal": "SEN", "Serbia": "SRB", "Seychelles": "SYC", "Sierra Leone": "SLE", "Singapore": "SGP", "Slovakia": "SVK", "Slovenia": "SVN", "Solomon Islands": "SLB",
  "Somalia": "SOM", "South Africa": "ZAF", "South Korea": "KOR", "South Sudan": "SSD", "Spain": "ESP", "Sri Lanka": "LKA", "Sudan": "SDN", "Suriname": "SUR", "Sweden": "SWE", "Switzerland": "CHE", "Syria": "SYR", "Taiwan": "TWN", "Tajikistan": "TJK", "Tanzania": "TZA", "Thailand": "THA", "Timor-Leste": "TLS", "Togo": "TGO",
  "Tonga": "TON", "Trinidad and Tobago": "TTO", "Tunisia": "TUN", "Turkey": "TUR", "Turkmenistan": "TKM", "Tuvalu": "TUV", "Uganda": "UGA", "Ukraine": "UKR", "United Arab Emirates": "ARE", "United Kingdom": "GBR", "United States": "USA", "Uruguay": "URY", "Uzbekistan": "UZB", "Vanuatu": "VUT", "Vatican City": "VAT", "Venezuela": "VEN", "Vietnam": "VNM", "Yemen": "YEM", "Zambia": "ZMB", "Zimbabwe": "ZWE",
  // Variações comuns em PT/ES/FR
  "Portugal": "PRT", "Espanha": "ESP", "España": "ESP", "França": "FRA", "Alemanha": "DEU", "Reino Unido": "GBR", "Itália": "ITA", "Países Baixos": "NLD", "Bélgica": "BEL", "Suíça": "CHE", "Irlanda": "IRL", "Brasil": "BRA", "Canadá": "CAN", "Polónia": "POL", "Áustria": "AUT", "Dinamarca": "DNK", "Suécia": "SWE", "Noruega": "NOR", "Finlândia": "FIN"
};

function converterParaIso3(nomePais) {
  if (!nomePais) return "PRT";
  const limpo = String(nomePais).trim();
  if (/^[A-Za-z]{3}$/.test(limpo)) return limpo.toUpperCase();
  return paisesIso3Map[limpo] || paisesIso3Map[limpo.toLowerCase()] || "PRT";
}

// ============================================================
// 4. DICIONÁRIO COMPLETO DE TEXTOS E IDIOMAS (TEXTS)[cite: 2]
// ============================================================
const texts = {
  pt: {
    subtitle: "Formulário obrigatório de Boletim de Alojamento (AIMA, antigo SEF).[cite: 2]",
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
    formTitle: "Boletim de Alojamento",[cite: 2]
    requiredNotice: "Preenchimento e envio obrigatório dos dados de todos os hóspedes adultos e crianças",[cite: 2]
    stayDataTitle: "Dados da Estadia",[cite: 2]
    checkinLabel: "Data de Check-in:",[cite: 2]
    checkoutLabel: "Data de Check-out:",[cite: 2]
    adultsLabel: "Nº de Hóspedes Adultos:",[cite: 2]
    childrenLabel: "Nº de Hóspedes Crianças:",[cite: 2]
    wants_copy_title: "Pretende cópia deste formulário no seu e-mail?",
    radio_yes: "Sim",
    radio_no: "Não",
    email_label: "O seu E-mail:",
    guestTitle: i => `Hóspede ${i}`,[cite: 2]
    fields: {
      fullName: "Nome Completo:",[cite: 2]
      birthDate: "Data de Nascimento:",[cite: 2]
      birthPlace: "Local de Nascimento:",[cite: 2]
      nationality: "Nacionalidade:",[cite: 2]
      residencePlace: "Local de Residência:",[cite: 2]
      residenceCountry: "País de Residência:",[cite: 2]
      docNumber: "Número do Documento:",[cite: 2]
      docType: "Tipo de Documento:",[cite: 2]
      docTypePassport: "Passaporte",[cite: 2]
      docTypeID: "Bilhete de Identidade / Cartão de Cidadão",[cite: 2]
      docCountry: "País Emissor do Documento:"[cite: 2]
    },
    placeholder_checkin: "dd/mm/aaaa",[cite: 2]
    placeholder_checkout: "dd/mm/aaaa",[cite: 2]
    placeholder_select: "Selecione",[cite: 2]
    submit: "Enviar Boletim de Alojamento",[cite: 2]
    aima_success: "Formulário enviado com sucesso!"[cite: 2]
  },
  en: {
    subtitle: "Mandatory Accommodation Registration Form (AIMA, formerly SEF).[cite: 2]",
    legalHtml: `
    <h3><strong>Mandatory Legal Notice — Guest Registration (AIMA/SIBA)</strong></h3>
    <p>This form collects the mandatory identification data of all guests, as required by Portuguese law for communication to AIMA through the SIBA platform.</p>
    <h4><strong>Why is this information mandatory?</strong></h4>
    <p>Under <strong>Article 45 of Law 23/2007</strong>, all accommodation establishments are legally required to report the entry, stay and exit of foreign citizens in Portugal.</p>
    <p>This obligation applies to <strong>all guests without Portuguese nationality</strong>, including <strong>children and infants</strong>, without exception.</p>
    <h4><strong>What is this information used for?</strong></h4>
    <ul>
        <li><strong>National Security:</strong> Supports the prevention and investigation of serious crimes, terrorism and cross‑border networks.</li>
        <li><strong>Guest Protection:</strong> In case of accident, emergency, natural disaster or disappearance, it allows authorities and embassies to quickly identify and locate citizens.</li>
        <li><strong>Public Administration:</strong> Contributes to official statistics and migration/tourism policies.</li>
    </ul>
    <h4><strong>Obligation and consequences of refusal</strong></h4>
    <p>Providing this information is <strong>strictly mandatory by law</strong>. Refusing to provide the required data legally prevents check‑in and results in the <strong>immediate cancellation of the reservation without refund</strong>.</p>
    <h4><strong>Privacy and data protection</strong></h4>
    <p>The collected data is used exclusively to comply with this legal obligation and is processed in accordance with the <strong>GDPR</strong>.</p>
    <h4><strong>Additional information and legislation</strong></h4>
    <p><a href="/docs/sef.pdf" target="_blank" class="pdf-link">View information in PDF</a></p>
    <p><a id="openFaqModal" class="faq-link">Frequently Asked Questions (FAQ)</a></p>
    <p><a href="https://diariodarepublica.pt/dr/legislacao-consolidada/lei/2007-67564445" target="_blank" class="pdf-link">Law 23/2007 — Consolidated Version</a></p>
    `,
    formTitle: "Accommodation Registration Form",[cite: 2]
    requiredNotice: "Mandatory completion and submission of all data for every adult and child guest",[cite: 2]
    stayDataTitle: "Stay Information",[cite: 2]
    checkinLabel: "Check‑in Date:",[cite: 2]
    checkoutLabel: "Check‑out Date:",[cite: 2]
    adultsLabel: "Number of Adult Guests:",[cite: 2]
    childrenLabel: "Number of Child Guests:",[cite: 2]
    wants_copy_title: "Would you like a copy of this form sent to your email?",
    radio_yes: "Yes",
    radio_no: "No",
    email_label: "Your Email:",
    guestTitle: i => `Guest ${i}`,[cite: 2]
    fields: {
      fullName: "Full Name:",[cite: 2]
      birthDate: "Date of Birth:",[cite: 2]
      birthPlace: "Place of Birth:",[cite: 2]
      nationality: "Nationality:",[cite: 2]
      residencePlace: "Place of Residence:",[cite: 2]
      residenceCountry: "Country of Residence:",[cite: 2]
      docNumber: "Document Number:",[cite: 2]
      docType: "Document Type:",[cite: 2]
      docTypePassport: "Passport",[cite: 2]
      docTypeID: "Identity Card",[cite: 2]
      docCountry: "Issuing Country:"[cite: 2]
    },
    placeholder_checkin: "dd/mm/yyyy",[cite: 2]
    placeholder_checkout: "dd/mm/yyyy",[cite: 2]
    placeholder_select: "Select",[cite: 2]
    submit: "Submit Accommodation Form",[cite: 2]
    aima_success: "Form submitted successfully!"[cite: 2]
  },
  es: {
    subtitle: "Formulario obligatorio de Registro de Alojamiento (AIMA, antiguo SEF).[cite: 2]",
    legalHtml: `
    <h3><strong>Aviso Legal Obligatorio — Registro de Huéspedes (AIMA/SIBA)</strong></h3>
    <p>Este formulario recoge los datos obligatorios de identificación de todos los huéspedes, según lo exige la legislación portuguesa para su comunicación a AIMA a través de la plataforma SIBA.</p>
    <h4><strong>¿Por qué son obligatorios estos datos?</strong></h4>
    <p>Según el <strong>Artículo 45 de la Ley n.º 23/2007</strong>, todos los alojamientos están legalmente obligados a comunicar a las autoridades fronterizas la entrada, estancia y salida de ciudadanos extranjeros.</p>
    <p>Esta obligación se aplica a <strong>todos los huéspedes sin nacionalidad portuguesa</strong>, incluidos <strong>niños y bebés</strong>, sin excepción.</p>
    <h4><strong>¿Para qué se utilizan estos datos?</strong></h4>
    <ul>
        <li><strong>Seguridad Nacional:</strong> Ayudan a prevenir e investigar delitos graves y terrorismo.</li>
        <li><strong>Protección del Huésped:</strong> En caso de emergencia, permiten localizar rápidamente a los ciudadanos.</li>
        <li><strong>Gestión Pública:</strong> Contribuyen a estadísticas oficiales de turismo.</li>
    </ul>
    <h4><strong>Obligatoriedad y consecuencias de la negativa</strong></h4>
    <p>La entrega de estos datos es <strong>estrictamente obligatoria por ley</strong>. Negarse impide legalmente realizar el check‑in e implica la <strong>cancelación inmediata de la reserva sin derecho a reembolso</strong>.</p>
    <h4><strong>Privacidad y protección de datos</strong></h4>
    <p>Tratados conforme al <strong>RGPD</strong>.</p>
    <h4><strong>Información adicional y legislación</strong></h4>
    <p><a href="/docs/sef.pdf" target="_blank" class="pdf-link">Ver información en PDF</a></p>
    <p><a id="openFaqModal" class="faq-link">Preguntas Frecuentes (FAQ)</a></p>
    <p><a href="https://diariodarepublica.pt/dr/legislacao-consolidada/lei/2007-67564445" target="_blank" class="pdf-link">Ley n.º 23/2007 — Versión Consolidada</a></p>
    `,
    formTitle: "Registro de Alojamiento",[cite: 2]
    requiredNotice: "Relleno y envío obligatorios de los datos de todos los huéspedes adultos y niños",[cite: 2]
    stayDataTitle: "Datos de la Estancia",[cite: 2]
    checkinLabel: "Fecha de Check‑in:",[cite: 2]
    checkoutLabel: "Fecha de Check‑out:",[cite: 2]
    adultsLabel: "Número de Huéspedes Adultos:",[cite: 2]
    childrenLabel: "Número de Huéspedes Niños:",[cite: 2]
    wants_copy_title: "¿Desea una copia de este formulario en su correo electrónico?",
    radio_yes: "Sí",
    radio_no: "No",
    email_label: "Su Correo Electrónico:",
    guestTitle: i => `Huésped ${i}`,[cite: 2]
    fields: {
      fullName: "Nombre Completo:",[cite: 2]
      birthDate: "Fecha de Nacimiento:",[cite: 2]
      birthPlace: "Lugar de Nacimiento:",[cite: 2]
      nationality: "Nacionalidad:",[cite: 2]
      residencePlace: "Lugar de Residencia:",[cite: 2]
      residenceCountry: "País de Residencia:",[cite: 2]
      docNumber: "Número del Documento:",[cite: 2]
      docType: "Tipo de Documento:",[cite: 2]
      docTypePassport: "Pasaporte",[cite: 2]
      docTypeID: "Documento de Identidad",[cite: 2]
      docCountry: "País Emisor del Documento:"[cite: 2]
    },
    placeholder_checkin: "dd/mm/aaaa",[cite: 2]
    placeholder_checkout: "dd/mm/aaaa",[cite: 2]
    placeholder_select: "Seleccionar",[cite: 2]
    submit: "Enviar Registro de Alojamiento",[cite: 2]
    aima_success: "¡Formulario enviado con éxito!"[cite: 2]
  },
  fr: {
    subtitle: "Formulaire obligatoire d’Enregistrement des Hébergements (AIMA).[cite: 2]",
    legalHtml: `
    <h3><strong>Avis Légal Obligatoire — Enregistrement des Hôtes (AIMA/SIBA)</strong></h3>
    <p>Ce formulaire recueille les données d’identification obligatoires de tous les hôtes, conformément à la législation portugaise via la plateforme SIBA.</p>
    <h4><strong>Pourquoi ces informations sont-elles obligatoires ?</strong></h4>
    <p>Selon <strong>l’Article 45 de la Loi n.º 23/2007</strong>, tous les hébergements sont tenus de déclarer l’entrée et la sortie des citoyens étrangers.</p>
    <p>Cette obligation s’applique à <strong>tous les hôtes n’ayant pas la nationalité portugaise</strong>, y compris <strong>les enfants</strong>.</p>
    <h4><strong>Confidentialité et protection des données</strong></h4>
    <p>Traitement conforme au <strong>RGPD</strong>.</p>
    <p><a href="/docs/sef.pdf" target="_blank" class="pdf-link">Consulter les informations en PDF</a></p>
    <p><a id="openFaqModal" class="faq-link">Foire aux Questions (FAQ)</a></p>
    <p><a href="https://diariodarepublica.pt/dr/legislacao-consolidada/lei/2007-67564445" target="_blank" class="pdf-link">Loi n.º 23/2007</a></p>
    `,
    formTitle: "Formulaire d’Enregistrement",[cite: 2]
    requiredNotice: "Remplissage et envoi obligatoires des données de tous les hôtes, adultes et enfants",[cite: 2]
    stayDataTitle: "Données du Séjour",[cite: 2]
    checkinLabel: "Date d’Arrivée :",[cite: 2]
    checkoutLabel: "Date de Départ :",[cite: 2]
    adultsLabel: "Nombre d’Adultes :",[cite: 2]
    childrenLabel: "Nombre d’Enfants :",[cite: 2]
    wants_copy_title: "Souhaitez-vous une copie de ce formulaire par e-mail ?",
    radio_yes: "Oui",
    radio_no: "Non",
    email_label: "Votre E-mail :",
    guestTitle: i => `Hôte ${i}`,[cite: 2]
    fields: {
      fullName: "Nom Complet :",[cite: 2]
      birthDate: "Date de Naissance :",[cite: 2]
      birthPlace: "Lieu de Naissance :",[cite: 2]
      nationality: "Nationalité :",[cite: 2]
      residencePlace: "Lieu de Résidence :",[cite: 2]
      residenceCountry: "Pays de Résidence :",[cite: 2]
      docNumber: "Numéro du Document :",[cite: 2]
      docType: "Type de Document :",[cite: 2]
      docTypePassport: "Passeport",[cite: 2]
      docTypeID: "Carte d’Identité",[cite: 2]
      docCountry: "Pays Émetteur :"[cite: 2]
    },
    placeholder_checkin: "jj/mm/aaaa",[cite: 2]
    placeholder_checkout: "jj/mm/aaaa",[cite: 2]
    placeholder_select: "Sélectionner",[cite: 2]
    submit: "Envoyer le Formulaire",[cite: 2]
    aima_success: "Formulaire envoyé avec succès !"[cite: 2]
  },
  it: {
    subtitle: "Modulo obbligatorio di Registrazione degli Ospiti (AIMA).[cite: 2]",
    legalHtml: `
    <h3><strong>Avviso Legale Obbligatorio — Registrazione degli Ospiti (AIMA/SIBA)</strong></h3>
    <p>Questo modulo raccoglie i dati identificativi obbligatori di tutti gli ospiti ai sensi della legge portoghese tramite la piattaforma SIBA.</p>
    <p><a href="/docs/sef.pdf" target="_blank" class="pdf-link">Visualizza le informazioni in PDF</a></p>
    <p><a id="openFaqModal" class="faq-link">Domande Frequenti (FAQ)</a></p>
    <p><a href="https://diariodarepublica.pt/dr/legislacao-consolidada/lei/2007-67564445" target="_blank" class="pdf-link">Legge n.º 23/2007</a></p>
    `,
    formTitle: "Modulo di Registrazione",[cite: 2]
    requiredNotice: "Compilazione e invio obbligatori dei dati di tutti gli ospiti adulti e bambini",[cite: 2]
    stayDataTitle: "Dati del Soggiorno",[cite: 2]
    checkinLabel: "Data di Check‑in:",[cite: 2]
    checkoutLabel: "Data di Check‑out:",[cite: 2]
    adultsLabel: "Numero di Ospiti Adulti:",[cite: 2]
    childrenLabel: "Numero di Ospiti Bambini:",[cite: 2]
    wants_copy_title: "Vuoi una copia di questo modulo nella tua email?",
    radio_yes: "Sì",
    radio_no: "No",
    email_label: "La tua Email:",
    guestTitle: i => `Ospite ${i}`,[cite: 2]
    fields: {
      fullName: "Nome Completo:",[cite: 2]
      birthDate: "Data di Nascita:",[cite: 2]
      birthPlace: "Luogo di Nascita:",[cite: 2]
      nationality: "Nazionalità:",[cite: 2]
      residencePlace: "Luogo di Residenza:",[cite: 2]
      residenceCountry: "Paese di Residenza:",[cite: 2]
      docNumber: "Numero del Documento:",[cite: 2]
      docType: "Tipo de Documento:",[cite: 2]
      docTypePassport: "Passaporto",[cite: 2]
      docTypeID: "Carta d’Identità",[cite: 2]
      docCountry: "Paese di Emissione:"[cite: 2]
    },
    placeholder_checkin: "gg/mm/aaaa",[cite: 2]
    placeholder_checkout: "gg/mm/aaaa",[cite: 2]
    placeholder_select: "Seleziona",[cite: 2]
    submit: "Invia Modulo di Registrazione",[cite: 2]
    aima_success: "Modulo inviato con successo!"[cite: 2]
  },
  de: {
    subtitle: "Pflichtformular zur Gästeanmeldung (AIMA).[cite: 2]",
    legalHtml: `
    <h3><strong>Gesetzlich vorgeschriebener Hinweis — Gästeanmeldung (AIMA/SIBA)</strong></h3>
    <p>Dieses Formular erfasst die obligatorischen Identifikationsdaten aller Gäste gemäß portugiesischem Recht über die SIBA-Plattform.</p>
    <p><a href="/docs/sef.pdf" target="_blank" class="pdf-link">Informationen als PDF ansehen</a></p>
    <p><a id="openFaqModal" class="faq-link">Häufig gestellte Fragen (FAQ)</a></p>
    <p><a href="https://diariodarepublica.pt/dr/legislacao-consolidada/lei/2007-67564445" target="_blank" class="pdf-link">Gesetz Nr. 23/2007</a></p>
    `,
    formTitle: "Gästeanmeldeformular",[cite: 2]
    requiredNotice: "Pflichtangabe und Übermittlung der Daten aller erwachsenen Gäste und Kinder",[cite: 2]
    stayDataTitle: "Angaben zum Aufenthalt",[cite: 2]
    checkinLabel: "Check‑in‑Datum:",[cite: 2]
    checkoutLabel: "Check‑out‑Datum:",[cite: 2]
    adultsLabel: "Anzahl der erwachsenen Gäste:",[cite: 2]
    childrenLabel: "Anzahl der Kinder:",[cite: 2]
    wants_copy_title: "Möchten Sie eine Kopie dieses Formulars per E-Mail?",
    radio_yes: "Ja",
    radio_no: "Nein",
    email_label: "Ihre E-Mail:",
    guestTitle: i => `Gast ${i}`,[cite: 2]
    fields: {
      fullName: "Vollständiger Name:",[cite: 2]
      birthDate: "Geburtsdatum:",[cite: 2]
      birthPlace: "Geburtsort:",[cite: 2]
      nationality: "Staatsangehörigkeit:",[cite: 2]
      residencePlace: "Wohnort:",[cite: 2]
      residenceCountry: "Wohnsitzland:",[cite: 2]
      docNumber: "Dokumentnummer:",[cite: 2]
      docType: "Dokumenttyp:",[cite: 2]
      docTypePassport: "Reisepass",[cite: 2]
      docTypeID: "Personalausweis",[cite: 2]
      docCountry: "Ausstellungsland:"[cite: 2]
    },
    placeholder_checkin: "TT/MM/JJJJ",[cite: 2]
    placeholder_checkout: "TT/MM/JJJJ",[cite: 2]
    placeholder_select: "Auswählen",[cite: 2]
    submit: "Formular absenden",[cite: 2]
    aima_success: "Formular erfolgreich gesendet!"[cite: 2]
  }
};

const faqTitles = {
  pt: "Perguntas Frequentes (FAQ)",[cite: 2]
  en: "Frequently Asked Questions (FAQ)",[cite: 2]
  es: "Preguntas Frecuentes (FAQ)",[cite: 2]
  fr: "Foire aux Questions (FAQ)",[cite: 2]
  it: "Domande Frequenti (FAQ)",[cite: 2]
  de: "Häufig gestellte Fragen (FAQ)"[cite: 2]
};

const faqTexts = {
  pt: `<h3>1. Obrigatoriedade e finalidade</h3><p><strong>Porque tenho de fornecer os meus dados ao alojamento?</strong><br>A lei portuguesa obriga todos os alojamentos a comunicar à AIMA a entrada e saída de cidadãos estrangeiros.</p>`,
  en: `<h3>1. Obligation and purpose</h3><p><strong>Why do I have to provide my personal data?</strong><br>Portuguese law requires all accommodations to report the entry and exit of foreign citizens to AIMA.</p>`,
  es: `<h3>1. Obligación y finalidad</h3><p><strong>¿Por qué debo proporcionar mis datos?</strong><br>La ley portuguesa exige que todos los alojamientos comuniquen a AIMA la entrada y salida de extranjeros.</p>`,
  fr: `<h3>1. Obligation et finalité</h3><p><strong>Pourquoi dois‑je fournir mes données ?</strong><br>La loi portugaise oblige tous les hébergements à communiquer à l’AIMA l’entrée et la sortie des citoyens.</p>`,
  it: `<h3>1. Obbligatorietà e finalità</h3><p><strong>Perché devo fornire i miei dati?</strong><br>La legge portoghese obbliga tutte le strutture ricettive a comunicare ad AIMA l’ingresso e l’uscita.</p>`,
  de: `<h3>1. Verpflichtung und Zweck</h3><p><strong>Warum muss ich meine Daten angeben?</strong><br>Das portugiesische Gesetz verpflichtet alle Unterkünfte, den Ein‑ und Ausstieg an AIMA zu melden.</p>`
};

function loadFaq() {
  const faqContentEl = document.getElementById("faqContent");
  if (faqContentEl) faqContentEl.innerHTML = faqTexts[currentLang];
}

const countries = [
  "Afghanistan","Albania","Algeria","Andorra","Angola","Antigua and Barbuda","Argentina","Armenia",
  "Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium",
  "Belize","Benin","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria",
  "Burkina Faso","Burundi","Cabo Verde","Cambodia","Cameroon","Canada","Central African Republic",
  "Chad","Chile","China","Colombia","Comoros","Congo (Congo-Brazzaville)","Costa Rica","Croatia","Cuba",
  "Cyprus","Czech Republic","Democratic Republic of the Congo","Denmark","Djibouti","Dominica",
  "Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Eswatini",
  "Ethiopia","Fiji","Finland","France","Gabon","Gambia","Georgia","Germany","Ghana","Greece","Grenada",
  "Guatemala","Guinea","Guinea-Bissau","Guyana","Haiti","Honduras","Hungary","Iceland","India",
  "Indonesia","Iran","Iraq","Ireland","Israel","Italy","Jamaica","Japan","Jordan","Kazakhstan","Kenya",
  "Kiribati","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein",
  "Lithuania","Luxembourg","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands",
  "Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Morocco",
  "Mozambique","Myanmar","Namibia","Nauru","Nepal","Netherlands","New Zealand","Nicaragua","Niger",
  "Nigeria","North Korea","North Macedonia","Norway","Oman","Pakistan","Palau","Panama","Papua New Guinea",
  "Paraguay","Peru","Philippines","Poland","Portugal","Qatar","Romania","Russia","Rwanda","Saint Kitts and Nevis",
  "Saint Lucia","Saint Vincent and the Grenadines","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia",
  "Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia",
  "South Africa","South Korea","South Sudan","Spain","Sri Lanka","Sudan","Suriname","Sweden","Switzerland",
  "Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor-Leste","Togo","Tonga","Trinidad and Tobago",
  "Tunisia","Turkey","Turkmenistan","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom",
  "United States","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Yemen","Zambia","Zimbabwe"
];

// ============================================================
// 5. FUNÇÕES DE RENDERIZAÇÃO E GESTÃO DO IDIOMA
// ============================================================
function setLanguage(langCode) {
  currentLang = supportedLangs.includes(langCode) ? langCode : "pt";
  const t = texts[currentLang];
  document.documentElement.lang = currentLang;

  const subtitleEl = document.getElementById("subtitle-text");
  const legalInfoEl = document.getElementById("legalInfo");
  const formSectionEl = document.getElementById("aimaFormSection");
  const formTitleEl = document.getElementById("formTitle");
  const stayDataTitleEl = document.getElementById("stayDataTitle");
  const checkinLabelEl = document.getElementById("checkinLabel");
  const checkoutLabelEl = document.getElementById("checkoutLabel");
  const adultsLabelEl = document.getElementById("adultsLabel");
  const childrenLabelEl = document.getElementById("childrenLabel");
  const submitBtnEl = document.getElementById("submitLabel");

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

  const reqNotice = document.getElementById("requiredNotice");
  if (reqNotice) reqNotice.textContent = t.requiredNotice;

  const checkinInput = document.getElementById("checkinDate");
  const checkoutInput = document.getElementById("checkoutDate");
  if (checkinInput) checkinInput.placeholder = t.placeholder_checkin;
  if (checkoutInput) checkoutInput.placeholder = t.placeholder_checkout;

  if (document.getElementById("labelWantsCopy")) document.getElementById("labelWantsCopy").textContent = t.wants_copy_title;
  if (document.getElementById("labelRadioYes")) document.getElementById("labelRadioYes").textContent = t.radio_yes;
  if (document.getElementById("labelRadioNo")) document.getElementById("labelRadioNo").textContent = t.radio_no;
  if (document.getElementById("labelClientEmail")) document.getElementById("labelClientEmail").textContent = t.email_label;

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

  updateFooterLinksAIMA();
  updateFooterTextsAIMA();

  setTimeout(() => {
    const openFaqBtn = document.getElementById("openFaqModal");
    const faqModal = document.getElementById("faqModal");
    if (openFaqBtn && faqModal) {
      openFaqBtn.onclick = () => {
        document.getElementById("faqTitle").textContent = faqTitles[currentLang];
        loadFaq();
        faqModal.style.display = "block";
      };
    }
  }, 0);
}

window.setLanguage = setLanguage;

// ============================================================
// 6. GERAÇÃO DINÂMICA DE HÓSPEDES
// ============================================================
function generateGuestFields() {
  const t = texts[currentLang];
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
        <input type="text" name="guest_${i}_birthDate" placeholder="${t.placeholder_checkin}" required>
      </div>

      <div class="form-row">
        <label>${t.fields.nationality}</label>
        <select name="guest_${i}_nationality" required>
          <option value="" disabled selected hidden>${t.placeholder_select}</option>
          ${countries.map(c => `<option value="${c}">${c}</option>`).join("")}
        </select>
      </div>

      <div class="form-row">
        <label>${t.fields.residenceCountry}</label>
        <select name="guest_${i}_residenceCountry" required>
          <option value="" disabled selected hidden>${t.placeholder_select}</option>
          ${countries.map(c => `<option value="${c}">${c}</option>`).join("")}
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
          <option value="other">${t.fields.docTypeOther || "Outro"}</option>
        </select>
      </div>

      <div class="form-row" id="otherDocField_${i}" style="display:none;">
        <label>${t.fields.docTypeOtherLabel || "Qual?"}</label>
        <input type="text" name="guest_${i}_docOther">
      </div>

      <div class="form-row">
        <label>${t.fields.docCountry}</label>
        <select name="guest_${i}_docCountry" required>
          <option value="" disabled selected hidden>${t.placeholder_select}</option>
          ${countries.map(c => `<option value="${c}">${c}</option>`).join("")}
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

    const birthInput = card.querySelector(`input[name="guest_${i}_birthDate"]`);
    if (birthInput) {
      birthInput.addEventListener("focus", () => birthInput.type = "date");
      birthInput.addEventListener("blur", () => {
        if (!birthInput.value) birthInput.type = "text";
      });
    }
  }
}

// ============================================================
// 7. SUBMISSÃO UNIFICADA (FIREBASE + SIBA ISO-3 + EMAILJS)
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[required]").forEach(el => el.removeAttribute("required"));

  const adultsInput = document.getElementById("adults");
  const childrenInput = document.getElementById("children");
  if (adultsInput) adultsInput.addEventListener("input", generateGuestFields);
  if (childrenInput) childrenInput.addEventListener("input", generateGuestFields);

  const faqModal = document.getElementById("faqModal");
  const closeFaqBtn = document.getElementById("closeFaqModal") || document.querySelector(".close-faq");
  if (closeFaqBtn && faqModal) {
    closeFaqBtn.addEventListener("click", () => faqModal.style.display = "none");
  }

  window.addEventListener("click", (e) => {
    if (faqModal && e.target === faqModal) faqModal.style.display = "none";
  });

  ["checkinDate", "checkoutDate"].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.type = "text";
      el.addEventListener("focus", () => el.type = "date");
      el.addEventListener("blur", () => { if (!el.value) el.type = "text"; });
    }
  });

  const form = document.getElementById("aimaForm");
  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      e.stopImmediatePropagation();

      const t = texts[currentLang];
      const checkin = document.getElementById("checkinDate")?.value;
      const checkout = document.getElementById("checkoutDate")?.value;

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

      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.textContent : "Enviar";
      if (submitBtn) {
        submitBtn.textContent = "A enviar...";
        submitBtn.disabled = true;
      }

      try {
        if (typeof db !== 'undefined') {
          await db.collection("boletins").add(novoBoletim);
        }

        if (typeof guardarBoletimPendente === "function") {
          guardarBoletimPendente({
            ...novoBoletim,
            criadoEm: new Date().toISOString()
          });
        }

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
                subject_text: "Cópia do Registo de Hóspedes - Apartments Belleview",
                guest_name: hospedes[0]?.nome || "Hóspede",
                checkin: checkin,
                checkout: checkout,
                message_body: mensagemCliente
              },
              "imhA9ilHaWGF1hxYz"
            ).catch(err => console.warn("Erro ao enviar cópia ao cliente:", err));
          }
        }

        const popup = document.getElementById("aimaSuccessPopup");
        if (popup) {
          const popupText = popup.querySelector(".success-popup-text");
          if (popupText) popupText.textContent = t.aima_success;
          popup.style.display = "flex";
          setTimeout(() => { popup.style.display = "none"; }, 3000);
        } else {
          alert(t.aima_success);
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

  setLanguage(currentLang);
});
