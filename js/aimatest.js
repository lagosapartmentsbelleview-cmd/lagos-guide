// ============================================================
// 1. INICIALIZAÇÃO E MANIPULAÇÃO DO DOM
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[required]").forEach(el => el.removeAttribute("required"));

  // Capturar parâmetro de apartamento/unidade do URL (ex: ?apt=1 ou ?unidade=2204)
  const urlParams = new URLSearchParams(window.location.search);
  const aptParam = urlParams.get("apt") || urlParams.get("unidade") || "2203";
  const hiddenUnidade = document.getElementById("hiddenUnidade");
  if (hiddenUnidade) hiddenUnidade.value = aptParam;

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
// 3. DICIONÁRIO DE TEXTOS E LEGAL COMPLETO (6 IDIOMAS)
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
      <p><a href="/docs/sef.pdf" target="_blank" class="pdf-link">Verificar a informação em PDF</a> | <a id="openFaqModal" class="faq-link">Perguntas Frequentes (FAQ)</a> | <a href="https://diariodarepublica.pt/dr/legislacao-consolidada/lei/2007-34546475" target="_blank" class="pdf-link">Lei n.º 23/2007 — Versão Consolidada (Diário da República)</a></p>
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
    submit: "Enviar Boletim de Alojamento",
    aima_success: "Formulário enviado com sucesso!"
  },
  en: {
    subtitle: "Mandatory Accommodation Registration Form (AIMA, formerly SEF).",
    legalHtml: `
      <h3><strong>Mandatory Legal Notice — Guest Registration (AIMA/SIBA)</strong></h3>
      <p>This form collects mandatory identification data for all guests, as required by Portuguese law for reporting to AIMA (Agency for Integration, Migration and Asylum) via the SIBA platform.</p>
      <h4><strong>Why is your data mandatory?</strong></h4>
      <p>Under <strong>Article 45 of Law no. 23/2007</strong>, all local accommodation establishments are legally required to report the entry, stay, and departure of foreign citizens in national territory to border authorities.</p>
      <p>This obligation applies to <strong>all guests without Portuguese nationality</strong>, including <strong>children and babies</strong>, without exception.</p>
      <h4><strong>What are these data used for?</strong></h4>
      <ul>
          <li><strong>National Security:</strong> Support the prevention and investigation of serious crimes, terrorism, and cross-border networks.</li>
          <li><strong>Guest Protection:</strong> In case of accident, medical emergency, natural disaster, or disappearance, they allow authorities and embassies to quickly identify and locate citizens.</li>
          <li><strong>Public Management:</strong> Contribute to official statistics and migration and tourism policies.</li>
      </ul>
      <h4><strong>Mandatory nature and consequences of refusal</strong></h4>
      <p>Providing this data is <strong>strictly mandatory by law</strong>. Refusal to provide the necessary information legally prevents check-in and implies the <strong>immediate cancellation of the reservation without right to a refund</strong>.</p>
      <p>For the accommodation owner, failure to report this data constitutes a <strong>serious administrative offence</strong>, punishable by significant fines.</p>
      <h4><strong>Privacy and data protection</strong></h4>
      <p>The collected data is used exclusively to comply with this legal obligation and is processed in accordance with the <strong>General Data Protection Regulation (GDPR)</strong>. It is not shared with third parties for commercial purposes.</p>
      <h4><strong>Additional information and legislation</strong></h4>
      <p><a href="/docs/sef.pdf" target="_blank" class="pdf-link">View information in PDF</a> | <a id="openFaqModal" class="faq-link">Frequently Asked Questions (FAQ)</a> | <a href="https://diariodarepublica.pt/dr/legislacao-consolidada/lei/2007-34546475" target="_blank" class="pdf-link">Law no. 23/2007 — Consolidated Version (Official Gazette)</a></p>
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
    placeholder_select: "Select",
    subject: "Guest Registration Copy - AIMA",
    submit: "Submit Accommodation Form",
    aima_success: "Form submitted successfully!"
  },
  es: {
    subtitle: "Formulario obligatorio de Registro de Alojamiento (AIMA, antiguo SEF).",
    legalHtml: `
      <h3><strong>Aviso Legal Obligatorio — Registro de Huéspedes (AIMA/SIBA)</strong></h3>
      <p>Este formulario recopila los datos obligatorios de identificación de todos los huéspedes, según lo exige la legislación portuguesa para la comunicación a AIMA a través de la plataforma SIBA.</p>
      <h4><strong>¿Por qué son obligatorios sus datos?</strong></h4>
      <p>En los términos del <strong>Artículo 45 de la Ley n.º 23/2007</strong>, todos los establecimientos de Alojamiento Local están legalmente obligados a comunicar a las autoridades fronterizas la entrada, permanencia y salida de ciudadanos extranjeros en el territorio nacional.</p>
      <p>Esta obligación se aplica a <strong>todos los huéspedes sin nacionalidad portuguesa</strong>, incluidos <strong>niños y bebés</strong>, sin excepción.</p>
      <h4><strong>¿Para qué se utilizan estos datos?</strong></h4>
      <ul>
          <li><strong>Seguridad Nacional:</strong> Apoyan la prevención e investigación de delitos graves, terrorismo y redes transfronterizas.</li>
          <li><strong>Protección del Huésped:</strong> En caso de accidente, emergencia médica, catástrofe natural o desaparición, permiten a las autoridades y embajadas identificar y localizar rápidamente a los ciudadanos.</li>
          <li><strong>Gestión Pública:</strong> Contribuyen a las estadísticas oficiales y a las políticas de migración y turismo.</li>
      </ul>
      <h4><strong>Obligatoriedad y consecuencias de la negativa</strong></h4>
      <p>La provisión de estos datos es <strong>estrictamente obligatoria por ley</strong>. La negativa a proporcionar la información necesaria impide legalmente realizar el check-in e implica la <strong>anulación inmediata de la reserva sin derecho a reembolso</strong>.</p>
      <p>Para el propietario del alojamiento, la no comunicación de estos datos constituye una <strong>infracción grave</strong>, sancionada con multas significativas.</p>
      <h4><strong>Privacidad y protección de sus datos</strong></h4>
      <p>Los datos recopilados se utilizan exclusivamente para cumplir con esta obligación legal y se tratan conforme al <strong>Reglamento General de Protección de Datos (RGPD)</strong>. No se comparten con terceros para fines comerciales.</p>
      <h4><strong>Información adicional y legislación</strong></h4>
      <p><a href="/docs/sef.pdf" target="_blank" class="pdf-link">Ver información en PDF</a> | <a id="openFaqModal" class="faq-link">Preguntas Frecuentes (FAQ)</a> | <a href="https://diariodarepublica.pt/dr/legislacao-consolidada/lei/2007-34546475" target="_blank" class="pdf-link">Ley n.º 23/2007 — Versión Consolidada (Diario de la República)</a></p>
    `,
    formTitle: "Registro de Alojamiento",
    requiredNotice: "Relleno y envío obligatorios de los datos de todos los huéspedes adultos y niños",
    stayDataTitle: "Datos de la Estancia",
    checkinLabel: "Fecha de Check‑in:",
    checkoutLabel: "Fecha de Check‑out:",
    adultsLabel: "Número de Huéspedes Adultos:",
    childrenLabel: "Número de Huéspedes Niños:",
    wants_copy_title: "¿Pretende copia de este formulario en su correo?",
    radio_yes: "Sí",
    radio_no: "No",
    email_label: "Su E-mail:",
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
    placeholder_select: "Seleccionar",
    subject: "Copia de Registro - AIMA",
    submit: "Enviar Registro de Alojamiento",
    aima_success: "¡Formulario enviado con éxito!"
  },
  fr: {
    subtitle: "Formulaire obligatoire d’Enregistrement des Hébergements (AIMA, ancien SEF).",
    legalHtml: `
      <h3><strong>Avis Légal Obligatoire — Enregistrement des Hôtes (AIMA/SIBA)</strong></h3>
      <p>Ce formulaire recueille les données d'identification obligatoires pour tous les hôtes, conformément à la législation portugaise pour la communication à l'AIMA via la plateforme SIBA.</p>
      <h4><strong>Pourquoi vos données sont-elles obligatoires ?</strong></h4>
      <p>Aux termes de l'<strong>article 45 de la loi n° 23/2007</strong>, tous les établissements d'hébergement local sont légalement tenus de déclarer l'entrée, le séjour et la sortie des citoyens étrangers sur le territoire national.</p>
      <p>Cette obligation s'applique à <strong>tous les hôtes n'ayant pas la nationalité portugaise</strong>, y compris les <strong>enfants et les bébés</strong>, sans exception.</p>
      <h4><strong>À quoi servent ces données ?</strong></h4>
      <ul>
          <li><strong>Sécurité Nationale :</strong> Aident à prévenir et enquêter sur les crimes graves, le terrorisme et les réseaux transfrontaliers.</li>
          <li><strong>Protection de l'Hôte :</strong> En cas d'accident, d'urgence médicale, de catastrophe naturelle ou de disparition, elles permettent aux autorités et aux ambassades d'identifier et de localiser rapidement les citoyens.</li>
          <li><strong>Gestion Publique :</strong> Contribuent aux statistiques officielles et aux politiques de migration et de tourisme.</li>
      </ul>
      <h4><strong>Caractère obligatoire et conséquences du refus</strong></h4>
      <p>La fourniture de ces données est <strong>strictement obligatoire par la loi</strong>. Le refus de fournir les informations nécessaires empêche légalement l'enregistrement (check-in) et entraîne l'<strong>annulation immédiate de la réservation sans remboursement</strong>.</p>
      <h4><strong>Confidentialité et protection de vos données</strong></h4>
      <p>Les données recueillies sont utilisées exclusivement pour respecter cette obligation légale et sont traitées conformément au <strong>Règlement Général sur la Protection des Données (RGPD)</strong>.</p>
      <h4><strong>Informations supplémentaires et législation</strong></h4>
      <p><a href="/docs/sef.pdf" target="_blank" class="pdf-link">Consulter les informations en PDF</a> | <a id="openFaqModal" class="faq-link">Foire aux Questions (FAQ)</a> | <a href="https://diariodarepublica.pt/dr/legislacao-consolidada/lei/2007-34546475" target="_blank" class="pdf-link">Loi n° 23/2007 — Version Consolidée (Journal Officiel)</a></p>
    `,
    formTitle: "Formulaire d’Enregistrement",
    requiredNotice: "Remplissage et envoi obligatoires",
    stayDataTitle: "Données du Séjour",
    checkinLabel: "Date d’Arrivée :",
    checkoutLabel: "Date de Départ :",
    adultsLabel: "Nombre d’Adultes :",
    childrenLabel: "Nombre d’Enfants :",
    wants_copy_title: "Souhaitez-vous une copie par e-mail ?",
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
      docTypeOtherLabel: "Lequel?",
      docCountry: "Pays Émetteur :"
    },
    placeholder_select: "Sélectionner",
    subject: "Copie d'enregistrement - AIMA",
    submit: "Envoyer le Formulaire",
    aima_success: "Formulaire envoyé avec succès !"
  },
  it: {
    subtitle: "Modulo obbligatorio di Registrazione degli Ospiti (AIMA, ex SEF).",
    legalHtml: `
      <h3><strong>Avviso Legale Obbligatorio — Registrazione degli Ospiti (AIMA/SIBA)</strong></h3>
      <p>Questo modulo raccoglie i dati di identificazione obbligatori per tutti gli ospiti, come richiesto dalla legislazione portoghese per la comunicazione ad AIMA tramite la piattaforma SIBA.</p>
      <h4><strong>Perché i tuoi dati sono obbligatori?</strong></h4>
      <p>Ai sensi dell'<strong>articolo 45 della legge n. 23/2007</strong>, tutte le strutture ricettive sono legalmente obbligate a comunicare l'ingresso, il soggiorno e l'uscita dei cittadini stranieri alle autorità di frontiera.</p>
      <p>Questo obbligo si applica a <strong>tutti gli ospiti senza cittadinanza portoghese</strong>, inclusi <strong>bambini e neonati</strong>, senza eccezioni.</p>
      <h4><strong>A cosa servono questi dati?</strong></h4>
      <ul>
          <li><strong>Sicurezza Nazionale:</strong> Supportano la prevenzione e l'investigazione di crimini gravi, terrorismo e reti transfrontaliere.</li>
          <li><strong>Protezione dell'Ospite:</strong> In caso di incidente, emergenza medica, disastro naturale o scomparsa, consentono alle autorità e alle ambasciate di identificare e localizzare rapidamente i cittadini.</li>
          <li><strong>Gestione Pubblica:</strong> Contribuiscono alle statistiche ufficiali e alle politiche di migrazione e turismo.</li>
      </ul>
      <h4><strong>Obbligatorietà e conseguenze del rifiuto</strong></h4>
      <p>La fornitura di questi dati è <strong>strettamente obbligatoria per legge</strong>. Il rifiuto di fornire le informazioni necessarie impedisce legalmente il check-in e comporta l'<strong>annullamento immediato della prenotazione senza diritto al rimborso</strong>.</p>
      <h4><strong>Privacy e protezione dei tuoi dati</strong></h4>
      <p>I dati raccolti vengono utilizzati esclusivamente per adempiere a questo obbligo legale e sono trattati in conformità con il <strong>Regolamento Generale sulla Protezione dei Dati (GDPR)</strong>.</p>
      <h4><strong>Informazioni aggiuntive e legislazione</strong></h4>
      <p><a href="/docs/sef.pdf" target="_blank" class="pdf-link">Visualizza le informazioni in PDF</a> | <a id="openFaqModal" class="faq-link">Domande Frequenti (FAQ)</a> | <a href="https://diariodarepublica.pt/dr/legislacao-consolidada/lei/2007-34546475" target="_blank" class="pdf-link">Legge n. 23/2007 — Versione Consolidata (Gazzetta Ufficiale)</a></p>
    `,
    formTitle: "Modulo di Registrazione",
    requiredNotice: "Compilazione e invio obbligatori",
    stayDataTitle: "Dati del Soggiorno",
    checkinLabel: "Data di Check‑in:",
    checkoutLabel: "Data di Check‑out:",
    adultsLabel: "Numero di Ospiti Adulti:",
    childrenLabel: "Numero di Ospiti Bambini:",
    wants_copy_title: "Desideri una copia via e-mail?",
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
    placeholder_select: "Seleziona",
    subject: "Copia registrazione - AIMA",
    submit: "Invia Modulo di Registrazione",
    aima_success: "Modulo inviato con successo!"
  },
  de: {
    subtitle: "Pflichtformular zur Gästeanmeldung (AIMA, ehemals SEF).",
    legalHtml: `
      <h3><strong>Gesetzlich vorgeschriebener Hinweis — Gästeanmeldung (AIMA/SIBA)</strong></h3>
      <p>Dieses Formular erfasst die obligatorischen Identifikationsdaten aller Gäste gemäß den portugiesischen Rechtsvorschriften zur Meldung an AIMA über die SIBA-Plattform.</p>
      <h4><strong>Warum sind Ihre Daten obligatorisch?</strong></h4>
      <p>Gemäß <strong>Artikel 45 des Gesetzes Nr. 23/2007</strong> sind alle Beherbergungsbetriebe gesetzlich verpflichtet, den Ein-, Auf- und Austritt ausländischer Staatsbürger den Grenzbehörden zu melden.</p>
      <p>Diese Verpflichtung gilt für <strong>alle Gäste ohne portugiesische Staatsbürgerschaft</strong>, einschließlich <strong>Kinder und Babys</strong>, ausnahmslos.</p>
      <h4><strong>Wofür werden diese Daten verwendet?</strong></h4>
      <ul>
          <li><strong>Nationale Sicherheit:</strong> Unterstützung bei der Prävention und Aufklärung schwerer Straftaten, des Terrorismus und grenzüberschreitender Netze.</li>
          <li><strong>GästeSchutz:</strong> Im Falle eines Unfalls, medizinischer Notfälle, einer Naturkatastrophe oder eines Verschwindens ermöglichen sie Behörden und Botschaften die schnelle Identifizierung und Lokalisierung.</li>
          <li><strong>Öffentliche Verwaltung:</strong> Beitrag zu offiziellen Statistiken sowie Migrations- und Tourismuspolitiken.</li>
      </ul>
      <h4><strong>Verpflichtung und Folgen einer Verweigerung</strong></h4>
      <p>Die Bereitstellung dieser Daten ist <strong>gesetzlich vorgeschrieben</strong>. Die Weigerung macht den Check-in rechtlich unmöglich und kann zur <strong>sofortigen Stornierung der Reservierung ohne Erstattung</strong> führen.</p>
      <h4><strong>Datenschutz und Privatsphäre</strong></h4>
      <p>Die erhobenen Daten werden ausschließlich zur Erfüllung dieser gesetzlichen Verpflichtung verwendet und gemäß der <strong>Datenschutz-Grundverordnung (DSGVO)</strong> verarbeitet.</p>
      <h4><strong>Zusätzliche Informationen und Gesetzgebung</strong></h4>
      <p><a href="/docs/sef.pdf" target="_blank" class="pdf-link">Informationen als PDF ansehen</a> | <a id="openFaqModal" class="faq-link">Häufig gestellte Fragen (FAQ)</a> | <a href="https://diariodarepublica.pt/dr/legislacao-consolidada/lei/2007-34546475" target="_blank" class="pdf-link">Gesetz Nr. 23/2007 — Konsolidierte Fassung (Amtsblatt)</a></p>
    `,
    formTitle: "Gästeanmeldeformular",
    requiredNotice: "Pflichtangabe",
    stayDataTitle: "Angaben zum Aufenthalt",
    checkinLabel: "Check‑in‑Datum:",
    checkoutLabel: "Check‑out‑Datum:",
    adultsLabel: "Anzahl der erwachsenen Gäste:",
    childrenLabel: "Anzahl der Kinder:",
    wants_copy_title: "Möchten Sie eine Kopie per E-Mail?",
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
    subject: "Registrierungskopie - AIMA",
    submit: "Formular absenden",
    aima_success: "Formular erfolgreich gesendet!"
  }
};

const faqTitles = {
  pt: "Perguntas Frequentes",
  en: "Frequently Asked Questions",
  es: "Preguntas Frecuentes",
  fr: "Foire aux Questions",
  it: "Domande Frequenti",
  de: "Häufig gestellte Fragen"
};

const faqTexts = {
  pt: "<p>A lei portuguesa obriga todos os alojamentos a comunicar à AIMA a entrada e permanência de cidadãos estrangeiros para efeitos de controlo e segurança nacional.</p>",
  en: "<p>Portuguese law requires all accommodations to report the entry and stay of foreign citizens to AIMA for national security and control purposes.</p>",
  es: "<p>La ley portuguesa exige que todos los alojamientos comuniquen la entrada y estancia de ciudadanos extranjeros a AIMA.</p>",
  fr: "<p>La loi portugaise exige que tous les hébergements signalent l'entrée et le séjour des citoyens étrangers à l'AIMA.</p>",
  it: "<p>La legge portoghese richiede a tutte le strutture ricettive di segnalare l'ingresso e il soggiorno dei cittadini stranieri ad AIMA.</p>",
  de: "<p>Das portugiesische Gesetz verlangt von allen Unterkünften, die Einreise und den Aufenthalt ausländischer Staatsbürger bei AIMA zu melden.</p>"
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
  if (document.getElementById("submitLabel")) document.getElementById("submitLabel").textContent = t.submit;
  if (document.getElementById("requiredNotice")) document.getElementById("requiredNotice").textContent = t.requiredNotice;

  // Atualizar labels de cópia por e-mail
  if (document.getElementById("labelWantsCopy")) document.getElementById("labelWantsCopy").textContent = t.wants_copy_title;
  if (document.getElementById("labelRadioYes")) document.getElementById("labelRadioYes").textContent = t.radio_yes;
  if (document.getElementById("labelRadioNo")) document.getElementById("labelRadioNo").textContent = t.radio_no;
  if (document.getElementById("labelClientEmail")) document.getElementById("labelClientEmail").textContent = t.email_label;

  generateGuestFields();

  setTimeout(() => {
    const openFaqBtn = document.getElementById("openFaqModal");
    if (openFaqBtn) {
      openFaqBtn.onclick = () => {
        document.getElementById("faqTitle").textContent = faqTitles[currentLang];
        document.getElementById("faqContent").innerHTML = faqTexts[currentLang];
        document.getElementById("faqModal").style.display = "block";
      };
    }
  }, 100);
}

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
      <h4>${t.guestTitle(i)}</h4>

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

// Ouvintes para recalcular hóspedes ao mexer nos inputs numéricos
document.getElementById("adults")?.addEventListener("input", generateGuestFields);
document.getElementById("children")?.addEventListener("input", generateGuestFields);

// ============================================================
// 9. ENVIO DO FORMULÁRIO (FIRESTORE + EMAILJS + SIBA PENDENTE)
// ============================================================
const aimaFormEl = document.getElementById("aimaForm");
if (aimaFormEl) {
  aimaFormEl.addEventListener("submit", async function (e) {
    e.preventDefault();

    const t = texts[currentLang] || texts.pt;

    const checkin = document.getElementById("checkinDate").value;
    const checkout = document.getElementById("checkoutDate").value;

    if (new Date(checkin) >= new Date(checkout)) {
      alert("Check-out deve ser posterior ao Check-in.");
      return;
    }

    const adults = parseInt(document.getElementById("adults")?.value || "1", 10);
    const children = parseInt(document.getElementById("children")?.value || "0", 10);
    const totalGuests = adults + children;
    const unidadeSelecionada = document.getElementById("hiddenUnidade")?.value || "2203";

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
    const originalText = submitBtn.textContent;

    submitBtn.textContent = "A enviar...";
    submitBtn.disabled = true;

    try {
      // 1. Gravar na BD oficial (Firestore) como PENDENTE
      if (typeof db !== 'undefined') {
        await db.collection("boletins").add(novoBoletim);
      }

      // 2. Enviar cópia por EmailJS se o cliente solicitou e preencheu e-mail
      if (wantsCopy && emailDigitado && typeof emailjs !== 'undefined') {
        await emailjs.send(
          "service_funp519",
          "template_0oqqqy3",
          {
            to_email: emailDigitado,
            subject_text: t.subject,
            guest_name: novoBoletim.hospedes?.[0]?.nome || "Hóspede",
            checkin: novoBoletim.dataCheckin,
            checkout: novoBoletim.dataCheckout
          },
          "imhA9ilHaWGF1hxYz"
        );
      }

      // 3. GUARDAR NO PAINEL LOCAL SIBA (aimasiba.js)
      if (typeof guardarBoletimPendente === "function") {
        const boletimParaSiba = {
          ...novoBoletim,
          criadoEm: new Date().toISOString()
        };
        guardarBoletimPendente(boletimParaSiba);
      }

      // 4. Apresentar Popup de Sucesso
      const popup = document.getElementById("aimaSuccessPopup");
      if (popup) {
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
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}

// Inicializar idioma padrão
setLanguage("pt");
