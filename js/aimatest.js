/* ============================================================
   AIMATEST.JS — Boletim de Alojamento (versão unificada)
   ------------------------------------------------------------
   • Mesmo conteúdo do aima.js: 6 línguas, aviso legal completo, FAQ
   • Lista completa de países (193+), traduzida pelo browser (Intl),
     guardando o código ISO-3 que o SIBA exige (já não há "PRT" por defeito)
   • Pergunta Sim/Não para cópia por e-mail (traduzida nas 6 línguas)
   • Gravação no Firestore (fonte de verdade do painel siba.html)
   • Cópia ao cliente via EmailJS + aviso a si via Web3Forms
   • Validação própria e traduzida; trocar de língua NÃO apaga dados
   ============================================================ */
(function () {
  "use strict";

  /* ----------------------------------------------------------
     CONFIGURAÇÃO
  ---------------------------------------------------------- */
  const CONFIG = {
    maxGuests: 20,

    emailjs: {
      service: "service_funp519",
      template: "template_0oqqqy3",
      publicKey: "imhA9ilHaWGF1hxYz"
    },

    // Aviso para si (substitui o e-mail que o antigo aima.js enviava via Web3Forms)
    ownerEmail: {
      enabled: true,
      endpoint: "https://api.web3forms.com/submit",
      accessKey: "950b90bc-37f4-4f5b-9d69-3e56389a054d",
      // false = o e-mail só avisa (sem nº de documento). Os dados completos vão
      //         por e-mail apenas se a gravação no Firestore falhar (salvaguarda).
      // true  = todos os e-mails levam os dados completos (como no sistema antigo).
      fullDataAlways: false
    }
  };

  /* ----------------------------------------------------------
     PAÍSES: [ISO2 : ISO3]. O valor guardado é o ISO3 (exigido pelo SIBA);
     o nome mostrado é gerado na língua do cliente com Intl.DisplayNames.
  ---------------------------------------------------------- */
  const COUNTRY_CODES = (
    "AF:AFG AL:ALB DZ:DZA AD:AND AO:AGO AG:ATG AR:ARG AM:ARM AU:AUS AT:AUT AZ:AZE BS:BHS BH:BHR BD:BGD " +
    "BB:BRB BY:BLR BE:BEL BZ:BLZ BJ:BEN BT:BTN BO:BOL BA:BIH BW:BWA BR:BRA BN:BRN BG:BGR BF:BFA BI:BDI " +
    "CV:CPV KH:KHM CM:CMR CA:CAN CF:CAF TD:TCD CL:CHL CN:CHN CO:COL KM:COM CG:COG CD:COD CR:CRI CI:CIV " +
    "HR:HRV CU:CUB CY:CYP CZ:CZE DK:DNK DJ:DJI DM:DMA DO:DOM EC:ECU EG:EGY SV:SLV GQ:GNQ ER:ERI EE:EST " +
    "SZ:SWZ ET:ETH FJ:FJI FI:FIN FR:FRA GA:GAB GM:GMB GE:GEO DE:DEU GH:GHA GR:GRC GD:GRD GT:GTM GN:GIN " +
    "GW:GNB GY:GUY HT:HTI HN:HND HU:HUN IS:ISL IN:IND ID:IDN IR:IRN IQ:IRQ IE:IRL IL:ISR IT:ITA JM:JAM " +
    "JP:JPN JO:JOR KZ:KAZ KE:KEN KI:KIR KW:KWT KG:KGZ LA:LAO LV:LVA LB:LBN LS:LSO LR:LBR LY:LBY LI:LIE " +
    "LT:LTU LU:LUX MG:MDG MW:MWI MY:MYS MV:MDV ML:MLI MT:MLT MH:MHL MR:MRT MU:MUS MX:MEX FM:FSM MD:MDA " +
    "MC:MCO MN:MNG ME:MNE MA:MAR MZ:MOZ MM:MMR NA:NAM NR:NRU NP:NPL NL:NLD NZ:NZL NI:NIC NE:NER NG:NGA " +
    "KP:PRK MK:MKD NO:NOR OM:OMN PK:PAK PW:PLW PA:PAN PG:PNG PY:PRY PE:PER PH:PHL PL:POL PT:PRT QA:QAT " +
    "RO:ROU RU:RUS RW:RWA KN:KNA LC:LCA VC:VCT WS:WSM SM:SMR ST:STP SA:SAU SN:SEN RS:SRB SC:SYC SL:SLE " +
    "SG:SGP SK:SVK SI:SVN SB:SLB SO:SOM ZA:ZAF KR:KOR SS:SSD ES:ESP LK:LKA SD:SDN SR:SUR SE:SWE CH:CHE " +
    "SY:SYR TW:TWN TJ:TJK TZ:TZA TH:THA TL:TLS TG:TGO TO:TON TT:TTO TN:TUN TR:TUR TM:TKM TV:TUV UG:UGA " +
    "UA:UKR AE:ARE GB:GBR US:USA UY:URY UZ:UZB VU:VUT VA:VAT VE:VEN VN:VNM YE:YEM ZM:ZMB ZW:ZWE " +
    "HK:HKG MO:MAC PS:PSE XK:XKX"
  ).split(" ").map(p => { const [iso2, iso3] = p.split(":"); return { iso2, iso3 }; });

  const ISO3_TO_ISO2 = Object.fromEntries(COUNTRY_CODES.map(c => [c.iso3, c.iso2]));
  const COUNTRY_FALLBACK_NAMES = { XK: "Kosovo" };
  const displayNamesCache = {};
  const countryOptionsCache = {};

  function regionName(iso2, lng) {
    try {
      if (!displayNamesCache[lng]) {
        displayNamesCache[lng] = new Intl.DisplayNames([lng], { type: "region" });
      }
      const n = displayNamesCache[lng].of(iso2);
      if (n && n !== iso2) return n;
    } catch (e) { /* browser sem Intl.DisplayNames */ }
    return COUNTRY_FALLBACK_NAMES[iso2] || iso2;
  }

  function countryName(iso3, lng) {
    const iso2 = ISO3_TO_ISO2[iso3];
    return iso2 ? regionName(iso2, lng) : (iso3 || "");
  }

  function countryOptionsHtml(lng) {
    if (!countryOptionsCache[lng]) {
      countryOptionsCache[lng] = COUNTRY_CODES
        .map(c => ({ code: c.iso3, name: regionName(c.iso2, lng) }))
        .sort((a, b) => a.name.localeCompare(b.name, lng))
        .map(c => `<option value="${c.code}">${escapeHtml(c.name)}</option>`)
        .join("");
    }
    return countryOptionsCache[lng];
  }

  /* ----------------------------------------------------------
     UTILITÁRIOS
  ---------------------------------------------------------- */
  const $ = id => document.getElementById(id);

  function escapeHtml(v) {
    return String(v == null ? "" : v)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  function fmtDate(iso) {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || "");
    return m ? `${m[3]}/${m[2]}/${m[1]}` : (iso || "");
  }

  function todayIso() {
    const d = new Date();
    const p = n => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
  }

  /* ----------------------------------------------------------
     TEXTOS (copiados do aima.js: aviso legal, FAQ, rótulos, 6 línguas)
  ---------------------------------------------------------- */
const texts = {
 pt: {
    subtitle: "Formulário obrigatório de Boletim de Alojamento (AIMA, antigo SEF).",
    legalHtml: `
    <h3><strong>Aviso Legal Obrigatório — Registo de Hóspedes (AIMA/SIBA)</strong></h3>

    <p>Este formulário recolhe os dados obrigatórios de identificação de todos os hóspedes,
    conforme exigido pela legislação portuguesa para comunicação à AIMA (Agência para a
    Integração, Migrações e Asilo), através da plataforma SIBA.</p>

    <h4><strong>Por que motivo os seus dados são obrigatórios?</strong></h4>
    <p>Nos termos do <strong>Artigo 45.º da Lei n.º 23/2007</strong>, todos os estabelecimentos
    de Alojamento Local são legalmente obrigados a comunicar às autoridades de fronteira
    a entrada, permanência e saída de cidadãos estrangeiros no território nacional.</p>

    <p>Esta obrigação aplica-se a <strong>todos os hóspedes sem nacionalidade portuguesa</strong>,
    incluindo <strong>crianças e bebés</strong>, sem exceção.</p>

    <h4><strong>Para que servem estes dados?</strong></h4>
    <ul>
        <li><strong>Segurança Nacional:</strong> Apoiam a prevenção e investigação de crimes
        graves, terrorismo e redes transfronteiriças.</li>

        <li><strong>Proteção do Hóspede:</strong> Em caso de acidente, emergência médica,
        catástrofe natural ou desaparecimento, permitem às autoridades e embaixadas
        identificar e localizar rapidamente os cidadãos.</li>

        <li><strong>Gestão Pública:</strong> Contribuem para estatísticas oficiais e políticas
        de migração e turismo.</li>
    </ul>

    <h4><strong>Obrigatoriedade e consequências da recusa</strong></h4>
    <p>A prestação destes dados é <strong>estritamente obrigatória por lei</strong>. A recusa
    em fornecer as informações necessárias impede legalmente a realização do check-in e
    implica a <strong>anulação imediata da reserva sem direito a reembolso</strong>, por
    incumprimento das normas legais aplicáveis.</p>

    <p>Para o proprietário do alojamento, a não comunicação destes dados constitui uma
    <strong>contraordenação grave</strong>, punível com coimas significativas.</p>

    <h4><strong>Privacidade e proteção dos seus dados</strong></h4>
    <p>Os dados recolhidos são utilizados exclusivamente para cumprimento desta obrigação
    legal e tratados em conformidade com o <strong>Regulamento Geral sobre a Proteção de
    Dados (RGPD)</strong>. Não são partilhados com terceiros para fins comerciais.</p>

    <h4><strong>Informação adicional e legislação</strong></h4>

<p>
  <a href="/docs/sef.pdf" target="_blank" class="pdf-link">
    Verificar a informação em PDF
  </a>
</p>

<p>
  <a id="openFaqModal" class="faq-link">Perguntas Frequentes (FAQ)</a>
</p>

<p>
  <a href="https://diariodarepublica.pt/dr/legislacao-consolidada/lei/2007-67564445"
     target="_blank" class="pdf-link">
     Lei n.º 23/2007 — Versão Consolidada (Diário da República)
  </a>
</p>


`,
    formTitle: "Boletim de Alojamento",
    requiredNotice: "Preenchimento e envio obrigatório dos dados de todos os hóspedes adultos e crianças",
    stayDataTitle: "Dados da Estadia",
    checkinLabel: "Data de Check-in:",
    checkoutLabel: "Data de Check-out:",
    adultsLabel: "Nº de Hóspedes Adultos:",
    childrenLabel: "Nº de Hóspedes Crianças:",
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
      docCountry: "País Emissor do Documento:"
    },

   // Placeholders PT 
   placeholder_checkin: "dd/mm/aaaa", 
   placeholder_checkout: "dd/mm/aaaa", 
   placeholder_select: "Selecione",
     
    submit: "Enviar Boletim de Alojamento"
},
  en: {
  subtitle: "Mandatory Accommodation Registration Form (AIMA, formerly SEF).",
  legalHtml: `
    <h3><strong>Mandatory Legal Notice — Guest Registration (AIMA/SIBA)</strong></h3>

    <p>This form collects the mandatory identification data of all guests,
    as required by Portuguese law for communication to AIMA (Agency for
    Integration, Migration and Asylum) through the SIBA platform.</p>

    <h4><strong>Why is this information mandatory?</strong></h4>
    <p>Under <strong>Article 45 of Law 23/2007</strong>, all accommodation
    establishments are legally required to report the entry, stay and exit
    of foreign citizens in Portugal.</p>

    <p>This obligation applies to <strong>all guests without Portuguese nationality</strong>,
    including <strong>children and infants</strong>, without exception.</p>

    <h4><strong>What is this information used for?</strong></h4>
    <ul>
        <li><strong>National Security:</strong> Supports the prevention and investigation
        of serious crimes, terrorism and cross‑border networks.</li>

        <li><strong>Guest Protection:</strong> In case of accident, medical emergency,
        natural disaster or disappearance, it allows authorities and embassies
        to quickly identify and locate citizens.</li>

        <li><strong>Public Administration:</strong> Contributes to official statistics
        and migration/tourism policies.</li>
    </ul>

    <h4><strong>Obligation and consequences of refusal</strong></h4>
    <p>Providing this information is <strong>strictly mandatory by law</strong>. Refusing
    to provide the required data legally prevents check‑in and results in the
    <strong>immediate cancellation of the reservation without refund</strong>.</p>

    <p>For the accommodation owner, failure to report this data constitutes a
    <strong>serious administrative offence</strong>, punishable by significant fines.</p>

    <h4><strong>Privacy and data protection</strong></h4>
    <p>The collected data is used exclusively to comply with this legal obligation
    and is processed in accordance with the <strong>General Data Protection Regulation (GDPR)</strong>.
    It is not shared with third parties for commercial purposes.</p>

    <h4><strong>Additional information and legislation</strong></h4>

<p>
  <a href="/docs/sef.pdf" target="_blank" class="pdf-link">
    View information in PDF
  </a>
</p>

<p>
  <a id="openFaqModal" class="faq-link">Frequently Asked Questions (FAQ)</a>
</p>

<p>
  <a href="https://diariodarepublica.pt/dr/legislacao-consolidada/lei/2007-67564445"
     target="_blank" class="pdf-link">
     Law 23/2007 — Consolidated Version (Official Gazette)
  </a>
</p>


  `,
  formTitle: "Accommodation Registration Form",
  requiredNotice: "Mandatory completion and submission of all data for every adult and child guest",
  stayDataTitle: "Stay Information",
  checkinLabel: "Check‑in Date:",
  checkoutLabel: "Check‑out Date:",
  adultsLabel: "Number of Adult Guests:",
  childrenLabel: "Number of Child Guests:",
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
    docCountry: "Issuing Country:"
  },

  placeholder_checkin: "dd/mm/yyyy", 
  placeholder_checkout: "dd/mm/yyyy", 
  placeholder_select: "Select",
    
  submit: "Submit Accommodation Form"
},

  es: {
  subtitle: "Formulario obligatorio de Registro de Alojamiento (AIMA, antiguo SEF).",
  legalHtml: `
    <h3><strong>Aviso Legal Obligatorio — Registro de Huéspedes (AIMA/SIBA)</strong></h3>

    <p>Este formulario recoge los datos obligatorios de identificación de todos los huéspedes,
    según lo exige la legislación portuguesa para su comunicación a AIMA (Agencia para la
    Integración, Migraciones y Asilo) a través de la plataforma SIBA.</p>

    <h4><strong>¿Por qué son obligatorios estos datos?</strong></h4>
    <p>Según el <strong>Artículo 45 de la Ley n.º 23/2007</strong>, todos los alojamientos
    están legalmente obligados a comunicar a las autoridades fronterizas la entrada,
    estancia y salida de ciudadanos extranjeros en territorio portugués.</p>

    <p>Esta obligación se aplica a <strong>todos los huéspedes sin nacionalidad portuguesa</strong>,
    incluidos <strong>niños y bebés</strong>, sin excepción.</p>

    <h4><strong>¿Para qué se utilizan estos datos?</strong></h4>
    <ul>
        <li><strong>Seguridad Nacional:</strong> Ayudan a prevenir e investigar delitos graves,
        terrorismo y redes transfronterizas.</li>

        <li><strong>Protección del Huésped:</strong> En caso de accidente, emergencia médica,
        catástrofe natural o desaparición, permiten a las autoridades y embajadas identificar
        y localizar rápidamente a los ciudadanos.</li>

        <li><strong>Gestión Pública:</strong> Contribuyen a estadísticas oficiales y políticas
        de migración y turismo.</li>
    </ul>

    <h4><strong>Obligatoriedad y consecuencias de la negativa</strong></h4>
    <p>La entrega de estos datos es <strong>estrictamente obligatoria por ley</strong>. Negarse
    a proporcionar la información necesaria impide legalmente realizar el check‑in y puede
    implicar la <strong>cancelación inmediata de la reserva sin derecho a reembolso</strong>.</p>

    <p>Para el propietario del alojamiento, no comunicar estos datos constituye una
    <strong>infracción grave</strong>, sancionada con multas significativas.</p>

    <h4><strong>Privacidad y protección de datos</strong></h4>
    <p>Los datos recogidos se utilizan exclusivamente para cumplir esta obligación legal y se
    tratan conforme al <strong>Reglamento General de Protección de Datos (RGPD)</strong>.
    No se comparten con terceros con fines comerciales.</p>

    <h4><strong>Información adicional y legislación</strong></h4>

<p>
  <a href="/docs/sef.pdf" target="_blank" class="pdf-link">
    Ver información en PDF
  </a>
</p>

<p>
  <a id="openFaqModal" class="faq-link">Preguntas Frecuentes (FAQ)</a>
</p>

<p>
  <a href="https://diariodarepublica.pt/dr/legislacao-consolidada/lei/2007-67564445"
     target="_blank" class="pdf-link">
     Ley n.º 23/2007 — Versión Consolidada (Diario Oficial)
  </a>
</p>


  `,
  formTitle: "Registro de Alojamiento",
  requiredNotice: "Relleno y envío obligatorios de los datos de todos los huéspedes adultos y niños",
  stayDataTitle: "Datos de la Estancia",
  checkinLabel: "Fecha de Check‑in:",
  checkoutLabel: "Fecha de Check‑out:",
  adultsLabel: "Número de Huéspedes Adultos:",
  childrenLabel: "Número de Huéspedes Niños:",
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
    docCountry: "País Emisor del Documento:"
  },

  placeholder_checkin: "dd/mm/aaaa", 
  placeholder_checkout: "dd/mm/aaaa", 
  placeholder_select: "Seleccionar",
    
  submit: "Enviar Registro de Alojamiento"
},

  fr: {
  subtitle: "Formulaire obligatoire d’Enregistrement des Hébergements (AIMA, ancien SEF).",
  legalHtml: `
    <h3><strong>Avis Légal Obligatoire — Enregistrement des Hôtes (AIMA/SIBA)</strong></h3>

    <p>Ce formulaire recueille les données d’identification obligatoires de tous les hôtes,
    conformément à la législation portugaise pour la communication à l’AIMA (Agence pour
    l’Intégration, les Migrations et l’Asile) via la plateforme SIBA.</p>

    <h4><strong>Pourquoi ces informations sont-elles obligatoires ?</strong></h4>
    <p>Selon <strong>l’Article 45 de la Loi n.º 23/2007</strong>, tous les établissements
    d’hébergement sont légalement tenus de déclarer l’entrée, le séjour et la sortie
    des citoyens étrangers sur le territoire portugais.</p>

    <p>Cette obligation s’applique à <strong>tous les hôtes n’ayant pas la nationalité portugaise</strong>,
    y compris <strong>les enfants et les bébés</strong>, sans exception.</p>

    <h4><strong>À quoi servent ces données ?</strong></h4>
    <ul>
        <li><strong>Sécurité Nationale :</strong> Aident à prévenir et enquêter les crimes graves,
        le terrorisme et les réseaux transfrontaliers.</li>

        <li><strong>Protection de l’Hôte :</strong> En cas d’accident, d’urgence médicale,
        de catastrophe naturelle ou de disparition, elles permettent aux autorités et
        ambassades d’identifier et de localiser rapidement les citoyens.</li>

        <li><strong>Gestion Publique :</strong> Contribuent aux statistiques officielles et aux
        politiques de migration et de tourisme.</li>
    </ul>

    <h4><strong>Obligation et conséquences du refus</strong></h4>
    <p>La fourniture de ces données est <strong>strictement obligatoire par la loi</strong>.
    Le refus de fournir les informations nécessaires empêche légalement l’enregistrement
    (check‑in) et peut entraîner <strong>l’annulation immédiate de la réservation sans remboursement</strong>.</p>

    <p>Pour le propriétaire de l’hébergement, le non-respect de cette obligation constitue
    une <strong>infraction grave</strong>, passible d’amendes importantes.</p>

    <h4><strong>Confidentialité et protection des données</strong></h4>
    <p>Les données recueillies sont utilisées exclusivement pour respecter cette obligation
    légale et sont traitées conformément au <strong>Règlement Général sur la Protection des
    Données (RGPD)</strong>. Elles ne sont pas partagées avec des tiers à des fins commerciales.</p>

    <h4><strong>Informations supplémentaires et législation</strong></h4>

<p>
  <a href="/docs/sef.pdf" target="_blank" class="pdf-link">
    Consulter les informations en PDF
  </a>
</p>

<p>
  <a id="openFaqModal" class="faq-link">Foire aux Questions (FAQ)</a>
</p>

<p>
  <a href="https://diariodarepublica.pt/dr/legislacao-consolidada/lei/2007-67564445"
     target="_blank" class="pdf-link">
     Loi n.º 23/2007 — Version Consolidée (Journal Officiel)
  </a>
</p>


  `,
  formTitle: "Formulaire d’Enregistrement",
  requiredNotice: "Remplissage et envoi obligatoires des données de tous les hôtes, adultes et enfants",
  stayDataTitle: "Données du Séjour",
  checkinLabel: "Date d’Arrivée :",
  checkoutLabel: "Date de Départ :",
  adultsLabel: "Nombre d’Adultes :",
  childrenLabel: "Nombre d’Enfants :",
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
    docCountry: "Pays Émetteur :"
  },

  placeholder_checkin: "jj/mm/aaaa", 
  placeholder_checkout: "jj/mm/aaaa", 
  placeholder_select: "Sélectionner",
    
  submit: "Envoyer le Formulaire"
},

  it: {
  subtitle: "Modulo obbligatorio di Registrazione degli Ospiti (AIMA, ex SEF).",
  legalHtml: `
    <h3><strong>Avviso Legale Obbligatorio — Registrazione degli Ospiti (AIMA/SIBA)</strong></h3>

    <p>Questo modulo raccoglie i dati identificativi obbligatori di tutti gli ospiti,
    come richiesto dalla legislazione portoghese per la comunicazione ad AIMA
    (Agenzia per l’Integrazione, le Migrazioni e l’Asilo) tramite la piattaforma SIBA.</p>

    <h4><strong>Perché questi dati sono obbligatori?</strong></h4>
    <p>Ai sensi dell’<strong>Articolo 45 della Legge n.º 23/2007</strong>, tutte le strutture
    ricettive sono legalmente obbligate a comunicare alle autorità di frontiera
    l’ingresso, il soggiorno e l’uscita dei cittadini stranieri in Portogallo.</p>

    <p>Questo obbligo si applica a <strong>tutti gli ospiti senza cittadinanza portoghese</strong>,
    inclusi <strong>bambini e neonati</strong>, senza eccezioni.</p>

    <h4><strong>A cosa servono questi dati?</strong></h4>
    <ul>
        <li><strong>Sicurezza Nazionale:</strong> Aiutano a prevenire e investigare reati gravi,
        terrorismo e reti transfrontaliere.</li>

        <li><strong>Protezione dell’Ospite:</strong> In caso di incidente, emergenza medica,
        catastrofe naturale o scomparsa, permettono alle autorità e alle ambasciate
        di identificare e localizzare rapidamente i cittadini.</li>

        <li><strong>Gestione Pubblica:</strong> Contribuiscono alle statistiche ufficiali e alle
        politiche di migrazione e turismo.</li>
    </ul>

    <h4><strong>Obbligatorietà e conseguenze del rifiuto</strong></h4>
    <p>Il conferimento di questi dati è <strong>strettamente obbligatorio per legge</strong>.
    Il rifiuto di fornire le informazioni necessarie impedisce legalmente il check‑in
    e può comportare <strong>l’annullamento immediato della prenotazione senza rimborso</strong>.</p>

    <p>Per il proprietario dell’alloggio, la mancata comunicazione di questi dati costituisce
    una <strong>infrazione grave</strong>, punibile con sanzioni significative.</p>

    <h4><strong>Privacy e protezione dei dati</strong></h4>
    <p>I dati raccolti vengono utilizzati esclusivamente per adempiere a questo obbligo legale
    e sono trattati in conformità al <strong>Regolamento Generale sulla Protezione dei Dati (GDPR)</strong>.
    Non vengono condivisi con terzi per scopi commerciali.</p>

   <h4><strong>Informazioni aggiuntive e legislazione</strong></h4>

<p>
  <a href="/docs/sef.pdf" target="_blank" class="pdf-link">
    Visualizza le informazioni in PDF
  </a>
</p>

<p>
  <a id="openFaqModal" class="faq-link">Domande Frequenti (FAQ)</a>
</p>

<p>
  <a href="https://diariodarepublica.pt/dr/legislacao-consolidada/lei/2007-67564445"
     target="_blank" class="pdf-link">
     Legge n.º 23/2007 — Versione Consolidata (Gazzetta Ufficiale)
  </a>
</p>


  `,
  formTitle: "Modulo di Registrazione",
  requiredNotice: "Compilazione e invio obbligatori dei dati di tutti gli ospiti adulti e bambini",
  stayDataTitle: "Dati del Soggiorno",
  checkinLabel: "Data di Check‑in:",
  checkoutLabel: "Data di Check‑out:",
  adultsLabel: "Numero di Ospiti Adulti:",
  childrenLabel: "Numero di Ospiti Bambini:",
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
    docCountry: "Paese di Emissione:"
  },

  placeholder_checkin: "gg/mm/aaaa", 
  placeholder_checkout: "gg/mm/aaaa", 
  placeholder_select: "Seleziona",
  
  submit: "Invia Modulo di Registrazione"
},

  de: {
  subtitle: "Pflichtformular zur Gästeanmeldung (AIMA, ehemals SEF).",
  legalHtml: `
    <h3><strong>Gesetzlich vorgeschriebener Hinweis — Gästeanmeldung (AIMA/SIBA)</strong></h3>

    <p>Dieses Formular erfasst die obligatorischen Identifikationsdaten aller Gäste,
    wie es das portugiesische Gesetz für die Meldung an AIMA (Agentur für Integration,
    Migration und Asyl) über die SIBA‑Plattform vorschreibt.</p>

    <h4><strong>Warum sind diese Daten verpflichtend?</strong></h4>
    <p>Gemäß <strong>Artikel 45 des Gesetzes Nr. 23/2007</strong> sind alle
    Beherbergungsbetriebe gesetzlich verpflichtet, den Eintritt, Aufenthalt und
    die Abreise ausländischer Staatsbürger in Portugal zu melden.</p>

    <p>Diese Verpflichtung gilt für <strong>alle Gäste ohne portugiesische Staatsangehörigkeit</strong>,
    einschließlich <strong>Kinder und Babys</strong>, ohne Ausnahme.</p>

    <h4><strong>Wofür werden diese Daten verwendet?</strong></h4>
    <ul>
        <li><strong>Nationale Sicherheit:</strong> Unterstützung bei der Verhinderung und
        Aufklärung schwerer Straftaten, Terrorismus und grenzüberschreitender Netzwerke.</li>

        <li><strong>Gästeschutz:</strong> Im Falle eines Unfalls, medizinischen Notfalls,
        einer Naturkatastrophe oder eines Verschwindens ermöglichen sie den Behörden
        und Botschaften eine schnelle Identifizierung und Lokalisierung.</li>

        <li><strong>Öffentliche Verwaltung:</strong> Beitrag zu offiziellen Statistiken
        sowie zu Migrations‑ und Tourismuspolitiken.</li>
    </ul>

    <h4><strong>Verpflichtung und Folgen einer Weigerung</strong></h4>
    <p>Die Bereitstellung dieser Daten ist <strong>gesetzlich zwingend vorgeschrieben</strong>.
    Eine Weigerung macht den Check‑in rechtlich unmöglich und kann zur
    <strong>sofortigen Stornierung der Reservierung ohne Erstattung</strong> führen.</p>

    <p>Für den Unterkunftsbetreiber stellt die Nichtmeldung dieser Daten eine
    <strong>schwere Ordnungswidrigkeit</strong> dar, die mit erheblichen Geldbußen
    geahndet werden kann.</p>

    <h4><strong>Datenschutz und Privatsphäre</strong></h4>
    <p>Die erhobenen Daten werden ausschließlich zur Erfüllung dieser gesetzlichen
    Verpflichtung verwendet und gemäß der <strong>Datenschutz‑Grundverordnung (DSGVO)</strong>
    verarbeitet. Sie werden nicht zu kommerziellen Zwecken an Dritte weitergegeben.</p>

    <h4><strong>Zusätzliche Informationen und Gesetzgebung</strong></h4>

<p>
  <a href="/docs/sef.pdf" target="_blank" class="pdf-link">
    Informationen als PDF ansehen
  </a>
</p>

<p>
  <a id="openFaqModal" class="faq-link">Häufig gestellte Fragen (FAQ)</a>
</p>

<p>
  <a href="https://diariodarepublica.pt/dr/legislacao-consolidada/lei/2007-67564445"
     target="_blank" class="pdf-link">
     Gesetz Nr. 23/2007 — Konsolidierte Fassung (Amtsblatt)
  </a>
</p>


  `,
  formTitle: "Gästeanmeldeformular",
  requiredNotice: "Pflichtangabe und Übermittlung der Daten aller erwachsenen Gäste und Kinder",
  stayDataTitle: "Angaben zum Aufenthalt",
  checkinLabel: "Check‑in‑Datum:",
  checkoutLabel: "Check‑out‑Datum:",
  adultsLabel: "Anzahl der erwachsenen Gäste:",
  childrenLabel: "Anzahl der Kinder:",
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
    docCountry: "Ausstellungsland:"
  },

    placeholder_checkin: "TT/MM/JJJJ", 
    placeholder_checkout: "TT/MM/JJJJ", 
    placeholder_select: "Auswählen",
    
    submit: "Formular absenden"
}
};
 
// ============================================================
// MENSAGEM DE SUCESSO MULTILINGUE PARA O POPUP AIMA
// ============================================================
texts.pt.aima_success = "Formulário enviado com sucesso!";
texts.en.aima_success = "Form submitted successfully!";
texts.es.aima_success = "Formulario enviado con éxito!";
texts.fr.aima_success = "Formulaire envoyé avec succès!";
texts.it.aima_success = "Modulo inviato con successo!";
texts.de.aima_success = "Formular erfolgreich gesendet!";


// ------------------------------
// FAQ TITULO DO MODAL POR IDIOMA
// ------------------------------

const faqTitles = {
  pt: "Perguntas Frequentes (FAQ)",
  en: "Frequently Asked Questions (FAQ)",
  es: "Preguntas Frecuentes (FAQ)",
  fr: "Foire aux Questions (FAQ)",
  it: "Domande Frequenti (FAQ)",
  de: "Häufig gestellte Fragen (FAQ)"
};

// ------------------------------
// FAQ POR IDIOMA — CONTEÚDO HTML
// ------------------------------
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
Solo con il suo consenso. Solo le autorità di polizia possono trattenere documenti senza consenso.</p>

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
Das portugiesische Gesetz verpflichtet alle Unterkünfte, den Ein‑ und Ausreise ausländischer Staatsbürger an AIMA zu melden. Dies ist eine Maßnahme der nationalen Sicherheit und des Gästeschutzes.</p>

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
Nur mit Ihrer Zustimmung. Nur die Polizei darf Dokumente ohne Zustimmung einbehalten.</p>

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
`,
};


  /* ----------------------------------------------------------
     TEXTOS ADICIONAIS (cópia por e-mail, validação, e-mail de cópia)
  ---------------------------------------------------------- */
  const EXTRA = {
    pt: {
      wants_copy_title: "Pretende receber uma cópia deste formulário no seu e-mail?",
      radio_yes: "Sim", radio_no: "Não", email_label: "O seu E-mail:",
      fields: { docTypeOther: "Outro", docTypeOtherLabel: "Qual?" },
      sending: "A enviar...",
      err_required: "Por favor preencha todos os campos obrigatórios (assinalados a vermelho).",
      err_dates: "A data de check-out deve ser posterior à data de check-in.",
      err_birth: "Verifique a data de nascimento (não pode ser futura nem anterior a 1900).",
      err_email: "Indique um e-mail válido para receber a cópia.",
      err_save: "Não foi possível enviar o formulário. Por favor tente novamente ou contacte-nos por telefone/WhatsApp.",
      mail_subject: "Cópia do Registo de Hóspedes - AIMA",
      mail_greeting: "Olá",
      mail_confirmation: "Confirmamos a receção do seu registo de hóspedes com os seguintes dados:",
      mail_footer: "Desejamos-lhe uma excelente estadia!"
    },
    en: {
      wants_copy_title: "Would you like to receive a copy of this form by email?",
      radio_yes: "Yes", radio_no: "No", email_label: "Your Email:",
      fields: { docTypeOther: "Other", docTypeOtherLabel: "Which one?" },
      sending: "Sending...",
      err_required: "Please fill in all required fields (highlighted in red).",
      err_dates: "Check-out date must be after the check-in date.",
      err_birth: "Please check the date of birth (it cannot be in the future or before 1900).",
      err_email: "Please enter a valid email address to receive the copy.",
      err_save: "We could not submit the form. Please try again or contact us by phone/WhatsApp.",
      mail_subject: "Guest Registration Copy - AIMA",
      mail_greeting: "Hello",
      mail_confirmation: "We confirm receipt of your guest registration with the following details:",
      mail_footer: "We wish you a pleasant stay!"
    },
    es: {
      wants_copy_title: "¿Desea recibir una copia de este formulario en su correo electrónico?",
      radio_yes: "Sí", radio_no: "No", email_label: "Su correo electrónico:",
      fields: { docTypeOther: "Otro", docTypeOtherLabel: "¿Cuál?" },
      sending: "Enviando...",
      err_required: "Por favor, rellene todos los campos obligatorios (marcados en rojo).",
      err_dates: "La fecha de check-out debe ser posterior a la de check-in.",
      err_birth: "Compruebe la fecha de nacimiento (no puede ser futura ni anterior a 1900).",
      err_email: "Introduzca un correo electrónico válido para recibir la copia.",
      err_save: "No se pudo enviar el formulario. Inténtelo de nuevo o contáctenos por teléfono/WhatsApp.",
      mail_subject: "Copia del Registro de Huéspedes - AIMA",
      mail_greeting: "Hola",
      mail_confirmation: "Confirmamos la recepción de su registro de huéspedes con los siguientes datos:",
      mail_footer: "¡Le deseamos una excelente estancia!"
    },
    fr: {
      wants_copy_title: "Souhaitez-vous recevoir une copie de ce formulaire par e-mail ?",
      radio_yes: "Oui", radio_no: "Non", email_label: "Votre e-mail :",
      fields: { docTypeOther: "Autre", docTypeOtherLabel: "Lequel ?" },
      sending: "Envoi en cours...",
      err_required: "Veuillez remplir tous les champs obligatoires (en rouge).",
      err_dates: "La date de départ doit être postérieure à la date d’arrivée.",
      err_birth: "Vérifiez la date de naissance (elle ne peut être ni future ni antérieure à 1900).",
      err_email: "Veuillez saisir une adresse e-mail valide pour recevoir la copie.",
      err_save: "Impossible d’envoyer le formulaire. Veuillez réessayer ou nous contacter par téléphone/WhatsApp.",
      mail_subject: "Copie de l’Enregistrement des Hôtes - AIMA",
      mail_greeting: "Bonjour",
      mail_confirmation: "Nous confirmons la réception de votre enregistrement avec les données suivantes :",
      mail_footer: "Nous vous souhaitons un excellent séjour !"
    },
    it: {
      wants_copy_title: "Desidera ricevere una copia di questo modulo via e-mail?",
      radio_yes: "Sì", radio_no: "No", email_label: "La sua e-mail:",
      fields: { docTypeOther: "Altro", docTypeOtherLabel: "Quale?" },
      sending: "Invio in corso...",
      err_required: "Compili tutti i campi obbligatori (evidenziati in rosso).",
      err_dates: "La data di check-out deve essere successiva a quella di check-in.",
      err_birth: "Verifichi la data di nascita (non può essere futura né anteriore al 1900).",
      err_email: "Inserisca un indirizzo e-mail valido per ricevere la copia.",
      err_save: "Impossibile inviare il modulo. Riprovi o ci contatti per telefono/WhatsApp.",
      mail_subject: "Copia della Registrazione degli Ospiti - AIMA",
      mail_greeting: "Buongiorno",
      mail_confirmation: "Confermiamo la ricezione della sua registrazione con i seguenti dati:",
      mail_footer: "Le auguriamo un ottimo soggiorno!"
    },
    de: {
      wants_copy_title: "Möchten Sie eine Kopie dieses Formulars per E-Mail erhalten?",
      radio_yes: "Ja", radio_no: "Nein", email_label: "Ihre E-Mail:",
      fields: { docTypeOther: "Sonstiges", docTypeOtherLabel: "Welches?" },
      sending: "Wird gesendet...",
      err_required: "Bitte füllen Sie alle Pflichtfelder aus (rot markiert).",
      err_dates: "Das Check-out-Datum muss nach dem Check-in-Datum liegen.",
      err_birth: "Bitte prüfen Sie das Geburtsdatum (nicht in der Zukunft und nicht vor 1900).",
      err_email: "Bitte geben Sie eine gültige E-Mail-Adresse für die Kopie an.",
      err_save: "Das Formular konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder kontaktieren Sie uns per Telefon/WhatsApp.",
      mail_subject: "Kopie der Gästeanmeldung - AIMA",
      mail_greeting: "Guten Tag",
      mail_confirmation: "Wir bestätigen den Eingang Ihrer Gästeanmeldung mit folgenden Daten:",
      mail_footer: "Wir wünschen Ihnen einen angenehmen Aufenthalt!"
    }
  };

  Object.keys(EXTRA).forEach(l => {
    const { fields, ...rest } = EXTRA[l];
    Object.assign(texts[l], rest);
    Object.assign(texts[l].fields, fields);
  });

  /* ----------------------------------------------------------
     ESTADO E ELEMENTOS
  ---------------------------------------------------------- */
  let currentLang = "pt";
  let form = null;
  let busy = false;

  function detectLang() {
    const q = new URLSearchParams(window.location.search).get("lang");
    if (q && texts[q]) return q;
    const nav = String(navigator.language || "pt").slice(0, 2).toLowerCase();
    return texts[nav] ? nav : "pt";
  }

  /* ----------------------------------------------------------
     IDIOMA
  ---------------------------------------------------------- */
  function setText(id, value) { const el = $(id); if (el) el.textContent = value; }

  function setLanguage(newLang) {
    currentLang = texts[newLang] ? newLang : "pt";
    window.currentLang = currentLang;              // usado pelo aima-lang.js (rodapé)
    const t = texts[currentLang];
    document.documentElement.lang = currentLang;

    setText("subtitle-text", t.subtitle);
    const legal = $("legalInfo"); if (legal) legal.innerHTML = t.legalHtml;
    const sec = $("aimaFormSection"); if (sec) sec.style.display = "block";

    setText("formTitle", t.formTitle);
    setText("requiredNotice", t.requiredNotice);
    setText("stayDataTitle", t.stayDataTitle);
    setText("checkinLabel", t.checkinLabel);
    setText("checkoutLabel", t.checkoutLabel);
    setText("adultsLabel", t.adultsLabel);
    setText("childrenLabel", t.childrenLabel);
    setText("labelWantsCopy", t.wants_copy_title);
    setText("labelRadioYes", t.radio_yes);
    setText("labelRadioNo", t.radio_no);
    setText("labelClientEmail", t.email_label);
    if (!busy) setText("submitLabel", t.submit);

    clearError();
    generateGuestFields();   // preserva o que o cliente já escreveu
  }
  window.setLanguage = setLanguage;

  /* ----------------------------------------------------------
     HÓSPEDES
  ---------------------------------------------------------- */
  function getCounts() {
    let a = parseInt($("adults").value, 10); if (!(a >= 1)) a = 1;
    a = Math.min(a, CONFIG.maxGuests);
    let c = parseInt($("children").value, 10); if (!(c >= 0)) c = 0;
    c = Math.min(c, CONFIG.maxGuests - a);
    return { adults: a, children: c };
  }

  function snapshotGuests(container) {
    const snap = {};
    container.querySelectorAll("input[name], select[name]").forEach(el => { snap[el.name] = el.value; });
    return snap;
  }

  function syncDocOther(card) {
    const sel = card.querySelector("select[name$='_docType']");
    const row = card.querySelector("[data-other-row]");
    if (sel && row) row.style.display = sel.value === "other" ? "" : "none";
  }

  function generateGuestFields() {
    const container = $("guestsContainer");
    if (!container) return;

    const t = texts[currentLang];
    const options = countryOptionsHtml(currentLang);
    const placeholder = `<option value="" disabled selected hidden>${escapeHtml(t.placeholder_select)}</option>`;
    const { adults, children } = getCounts();
    const total = adults + children;
    const snap = snapshotGuests(container);
    const maxBirth = todayIso();

    container.innerHTML = "";

    for (let i = 1; i <= total; i++) {
      const card = document.createElement("div");
      card.className = "form-card guest-card";
      card.innerHTML = `
        <h4>${escapeHtml(t.guestTitle(i))}</h4>

        <div class="form-row">
          <label for="g${i}_name">${t.fields.fullName}</label>
          <input type="text" id="g${i}_name" name="guest_${i}_fullName" maxlength="120" autocomplete="off" required>
        </div>

        <div class="form-row">
          <label for="g${i}_birth">${t.fields.birthDate}</label>
          <input type="date" id="g${i}_birth" name="guest_${i}_birthDate" min="1900-01-01" max="${maxBirth}" required>
        </div>

        <div class="form-row">
          <label for="g${i}_nat">${t.fields.nationality}</label>
          <select id="g${i}_nat" name="guest_${i}_nationality" required>${placeholder}${options}</select>
        </div>

        <div class="form-row">
          <label for="g${i}_res">${t.fields.residenceCountry}</label>
          <select id="g${i}_res" name="guest_${i}_residenceCountry" required>${placeholder}${options}</select>
        </div>

        <div class="form-row">
          <label for="g${i}_docnum">${t.fields.docNumber}</label>
          <input type="text" id="g${i}_docnum" name="guest_${i}_docNumber" maxlength="40" autocomplete="off" required>
        </div>

        <div class="form-row">
          <label for="g${i}_doctype">${t.fields.docType}</label>
          <select id="g${i}_doctype" name="guest_${i}_docType" required>
            ${placeholder}
            <option value="passport">${t.fields.docTypePassport}</option>
            <option value="id">${t.fields.docTypeID}</option>
            <option value="other">${t.fields.docTypeOther}</option>
          </select>
        </div>

        <div class="form-row" data-other-row style="display:none;">
          <label for="g${i}_docother">${t.fields.docTypeOtherLabel}</label>
          <input type="text" id="g${i}_docother" name="guest_${i}_docOther" maxlength="60">
        </div>

        <div class="form-row">
          <label for="g${i}_doccountry">${t.fields.docCountry}</label>
          <select id="g${i}_doccountry" name="guest_${i}_docCountry" required>${placeholder}${options}</select>
        </div>
      `;
      container.appendChild(card);

      // Restaurar o que já estava preenchido (ex.: depois de mudar de língua)
      card.querySelectorAll("input[name], select[name]").forEach(el => {
        if (snap[el.name]) el.value = snap[el.name];
      });
      syncDocOther(card);
      card.querySelector("select[name$='_docType']")
          .addEventListener("change", () => syncDocOther(card));
    }
  }

  /* ----------------------------------------------------------
     CÓPIA POR E-MAIL (Sim / Não)
  ---------------------------------------------------------- */
  function wantsCopyValue() {
    const r = document.querySelector('input[name="wantsCopyRadio"]:checked');
    return r ? r.value : "";
  }

  function toggleEmail() {
    const box = $("emailCopyContainer");
    const input = $("clientEmail");
    const yes = wantsCopyValue() === "sim";
    if (box) box.style.display = yes ? "" : "none";
    if (input) { input.required = yes; if (!yes) input.value = ""; }
  }

  /* ----------------------------------------------------------
     VALIDAÇÃO (traduzida; substitui o hack de remover "required")
  ---------------------------------------------------------- */
  function clearInvalid() {
    form.querySelectorAll(".field-invalid").forEach(el => el.classList.remove("field-invalid"));
  }

  function validate(t) {
    clearInvalid();
    const bad = [];
    const messages = new Set();
    const flag = (el, msg) => { if (el) { el.classList.add("field-invalid"); bad.push(el); } messages.add(msg); };
    const empty = el => !el || !String(el.value || "").trim();

    // Estadia
    const cin = $("checkinDate"), cout = $("checkoutDate");
    if (empty(cin)) flag(cin, t.err_required);
    if (empty(cout)) flag(cout, t.err_required);
    if (!empty(cin) && !empty(cout) && cout.value <= cin.value) flag(cout, t.err_dates);

    const a = parseInt($("adults").value, 10), c = parseInt($("children").value, 10);
    if (!(a >= 1)) flag($("adults"), t.err_required);
    if (!(c >= 0)) flag($("children"), t.err_required);

    // Hóspedes
    const { adults, children } = getCounts();
    const maxBirth = todayIso();
    for (let i = 1; i <= adults + children; i++) {
      const f = n => form.querySelector(`[name="guest_${i}_${n}"]`);
      ["fullName", "birthDate", "nationality", "residenceCountry", "docNumber", "docType", "docCountry"]
        .forEach(n => { if (empty(f(n))) flag(f(n), t.err_required); });
      if (f("docType") && f("docType").value === "other" && empty(f("docOther"))) flag(f("docOther"), t.err_required);
      const b = f("birthDate");
      if (b && b.value && (b.value > maxBirth || b.value < "1900-01-01")) flag(b, t.err_birth);
    }

    // Cópia por e-mail
    const choice = wantsCopyValue();
    if (!choice) {
      flag($("copyChoice"), t.err_required);
    } else if (choice === "sim") {
      const em = $("clientEmail");
      if (empty(em)) flag(em, t.err_email);
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(em.value.trim())) flag(em, t.err_email);
    }

    return { ok: bad.length === 0, messages: [...messages], first: bad[0] || null };
  }

  function showError(msg) {
    const box = $("formError");
    if (!box) { alert(msg); return; }
    box.textContent = msg;
    box.style.display = "block";
  }
  function clearError() {
    const box = $("formError");
    if (box) { box.textContent = ""; box.style.display = "none"; }
  }

  /* ----------------------------------------------------------
     RECOLHA DE DADOS
  ---------------------------------------------------------- */
  function collectBoletim() {
    const { adults, children } = getCounts();
    const val = n => (form.querySelector(`[name="${n}"]`)?.value || "").trim();

    const hospedes = [];
    for (let i = 1; i <= adults + children; i++) {
      hospedes.push({
        nome: val(`guest_${i}_fullName`),
        dataNascimento: val(`guest_${i}_birthDate`),          // AAAA-MM-DD
        nacionalidade: val(`guest_${i}_nationality`),         // ISO-3
        paisResidencia: val(`guest_${i}_residenceCountry`),   // ISO-3
        docTipo: val(`guest_${i}_docType`),                   // passport | id | other
        docNumero: val(`guest_${i}_docNumber`),
        docOutroDesc: val(`guest_${i}_docOther`),
        docPaisEmissor: val(`guest_${i}_docCountry`)          // ISO-3
      });
    }

    const pediuCopia = wantsCopyValue() === "sim";
    return {
      criadoEm: new Date().toISOString(),
      dataCheckin: $("checkinDate").value,
      dataCheckout: $("checkoutDate").value,
      numAdultos: adults,
      numCriancas: children,
      emailCliente: pediuCopia ? $("clientEmail").value.trim() : "",
      pediuCopia,
      hospedes,
      alojamentoId: null,
      status: "PENDENTE_ATRIBUICAO",
      idioma: currentLang
    };
  }

  /* ----------------------------------------------------------
     RESUMO (texto + HTML) — usado nos e-mails
  ---------------------------------------------------------- */
  function docTypeLabel(h, t) {
    if (h.docTipo === "passport") return t.fields.docTypePassport;
    if (h.docTipo === "id") return t.fields.docTypeID;
    return t.fields.docTypeOther + (h.docOutroDesc ? ` (${h.docOutroDesc})` : "");
  }

  function buildSummary(b, t, lng) {
    const text = [], html = [];
    const row = (label, value) => {
      text.push(`${label} ${value}`);
      html.push(`<p style="margin:2px 0;"><strong>${escapeHtml(label)}</strong> ${escapeHtml(value)}</p>`);
    };
    const heading = s => {
      text.push("", `--- ${s} ---`);
      html.push(`<h4 style="margin:14px 0 4px;">${escapeHtml(s)}</h4>`);
    };
    const country = code => `${countryName(code, lng)} (${code})`;

    row(t.checkinLabel, fmtDate(b.dataCheckin));
    row(t.checkoutLabel, fmtDate(b.dataCheckout));
    row(t.adultsLabel, String(b.numAdultos));
    row(t.childrenLabel, String(b.numCriancas));

    b.hospedes.forEach((h, i) => {
      heading(t.guestTitle(i + 1));
      row(t.fields.fullName, h.nome);
      row(t.fields.birthDate, fmtDate(h.dataNascimento));
      row(t.fields.nationality, country(h.nacionalidade));
      row(t.fields.residenceCountry, country(h.paisResidencia));
      row(t.fields.docType, docTypeLabel(h, t));
      row(t.fields.docNumber, h.docNumero);
      row(t.fields.docCountry, country(h.docPaisEmissor));
    });

    return { text: text.join("\n"), html: html.join("") };
  }

  /* ----------------------------------------------------------
     ENVIOS
  ---------------------------------------------------------- */
  async function saveToFirestore(b) {
    if (typeof db === "undefined") throw new Error("Firestore indisponível");
    await db.collection("boletins").add({
      ...b,
      criadoEm: firebase.firestore.FieldValue.serverTimestamp()
    });
  }

  async function notifyOwner(b, opts) {
    const cfg = CONFIG.ownerEmail;
    if (!cfg.enabled) return false;

    const nome = b.hospedes[0]?.nome || "Hóspede";
    let message;
    if (opts.full) {
      message = buildSummary(b, texts.pt, "pt").text;
    } else {
      message = [
        "Novo boletim de alojamento recebido e gravado no painel SIBA.",
        `Hóspede principal: ${nome}`,
        `Check-in: ${fmtDate(b.dataCheckin)}   Check-out: ${fmtDate(b.dataCheckout)}`,
        `Nº de hóspedes: ${b.hospedes.length} (${b.numAdultos} adultos, ${b.numCriancas} crianças)`,
        `Língua do formulário: ${b.idioma}`,
        "",
        "Abra o painel SIBA para processar."
      ].join("\n");
    }

    const payload = {
      access_key: cfg.accessKey,
      subject: (opts.saved ? "" : "[ATENÇÃO — NÃO GRAVADO NO PAINEL] ") + `Novo Formulário AIMA Recebido de ${nome}`,
      from_name: "Belleview — Boletim AIMA",
      message,
      botcheck: ""
    };
    if (b.emailCliente) payload.replyto = b.emailCliente;

    const res = await fetch(cfg.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || data.success === false) throw new Error(data.message || "Web3Forms falhou");
    return true;
  }

  async function sendGuestCopy(b, t) {
    if (typeof emailjs === "undefined") throw new Error("EmailJS indisponível");
    const s = buildSummary(b, t, currentLang);
    const c = CONFIG.emailjs;
    await emailjs.send(c.service, c.template, {
      // variáveis já existentes no seu template
      to_email: b.emailCliente,
      subject_text: t.mail_subject,
      guest_name: b.hospedes[0]?.nome || "",
      checkin: fmtDate(b.dataCheckin),
      checkout: fmtDate(b.dataCheckout),
      // variáveis novas (adicione {{{summary_html}}} ao template para a cópia completa)
      greeting: t.mail_greeting,
      confirmation: t.mail_confirmation,
      footer_text: t.mail_footer,
      adults: b.numAdultos,
      children: b.numCriancas,
      summary_html: s.html,
      summary_text: s.text
    }, c.publicKey);
  }

  /* ----------------------------------------------------------
     SUBMISSÃO
  ---------------------------------------------------------- */
  function setBusy(on) {
    busy = on;
    const btn = $("submitLabel");
    if (!btn) return;
    btn.disabled = on;
    btn.textContent = on ? texts[currentLang].sending : texts[currentLang].submit;
  }

  function showSuccess(t) {
    const popup = $("aimaSuccessPopup");
    if (!popup) { alert(t.aima_success); return; }
    const txt = popup.querySelector(".success-popup-text");
    if (txt) txt.textContent = t.aima_success;
    popup.style.display = "flex";
    setTimeout(() => { popup.style.display = "none"; }, 3500);
  }

  function resetForm() {
    form.reset();
    $("guestsContainer").innerHTML = "";
    toggleEmail();
    generateGuestFields();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (busy) return;

    const t = texts[currentLang];
    clearError();

    const v = validate(t);
    if (!v.ok) {
      showError(v.messages.join("\n"));
      if (v.first) {
        v.first.scrollIntoView({ behavior: "smooth", block: "center" });
        if (typeof v.first.focus === "function") v.first.focus({ preventScroll: true });
      }
      return;
    }

    // Anti-spam: campo invisível que só os robôs preenchem
    const trap = $("website");
    if (trap && trap.value) { showSuccess(t); resetForm(); return; }

    const boletim = collectBoletim();
    setBusy(true);

    try {
      // 1) Fonte de verdade: Firestore (é daqui que o siba.html lê)
      let saved = false;
      try { await saveToFirestore(boletim); saved = true; }
      catch (err) { console.error("Erro Firestore:", err); }

      // 2) Aviso para si. Se o Firestore falhou, vai com dados completos (salvaguarda)
      let ownerOk = false;
      try {
        ownerOk = await notifyOwner(boletim, { full: CONFIG.ownerEmail.fullDataAlways || !saved, saved });
      } catch (err) { console.error("Erro aviso ao proprietário:", err); }

      if (!saved && !ownerOk) throw new Error("Nenhum destino recebeu o boletim");

      // 3) Cópia ao cliente (não bloqueia nem invalida o registo)
      if (boletim.pediuCopia && boletim.emailCliente) {
        sendGuestCopy(boletim, t).catch(err => console.warn("Cópia por e-mail falhou:", err));
      }

      showSuccess(t);
      resetForm();
    } catch (err) {
      console.error("Erro ao processar:", err);
      showError(t.err_save);        // o formulário mantém-se preenchido para nova tentativa
    } finally {
      setBusy(false);
    }
  }

  /* ----------------------------------------------------------
     FAQ (modal)
  ---------------------------------------------------------- */
  function openFaq() {
    const modal = $("faqModal");
    if (!modal) return;
    setText("faqTitle", faqTitles[currentLang]);
    const c = $("faqContent"); if (c) c.innerHTML = faqTexts[currentLang];
    modal.style.display = "block";
  }
  function closeFaq() { const m = $("faqModal"); if (m) m.style.display = "none"; }

  /* ----------------------------------------------------------
     ARRANQUE
  ---------------------------------------------------------- */
  function init() {
    form = $("aimaForm");
    if (!form) return;
    form.noValidate = true;

    form.addEventListener("submit", onSubmit);
    form.addEventListener("input", ev => ev.target.classList && ev.target.classList.remove("field-invalid"));
    form.addEventListener("change", ev => {
      if (ev.target.name === "wantsCopyRadio") $("copyChoice")?.classList.remove("field-invalid");
    });

    document.querySelectorAll('input[name="wantsCopyRadio"]').forEach(r => r.addEventListener("change", toggleEmail));

    // Só reconstrói os cartões se o nº de hóspedes mudou (evita perder foco/dados)
    const syncGuestCount = () => {
      const { adults, children } = getCounts();
      if ($("guestsContainer").children.length !== adults + children) generateGuestFields();
    };
    ["adults", "children"].forEach(id => {
      const el = $(id);
      el.addEventListener("input", syncGuestCount);
      el.addEventListener("change", () => {
        const { adults, children } = getCounts();
        $("adults").value = adults;
        $("children").value = children;
        syncGuestCount();
      });
    });

    $("checkinDate").addEventListener("change", e => { $("checkoutDate").min = e.target.value || ""; });

    // Link do FAQ vive dentro do texto legal (que é re-renderizado a cada língua)
    $("legalInfo").addEventListener("click", ev => {
      if (ev.target.closest("#openFaqModal")) { ev.preventDefault(); openFaq(); }
    });
    $("closeFaqModal")?.addEventListener("click", closeFaq);
    $("faqModal")?.addEventListener("click", ev => { if (ev.target === $("faqModal")) closeFaq(); });
    document.addEventListener("keydown", ev => { if (ev.key === "Escape") closeFaq(); });

    toggleEmail();
    window.setLanguage(detectLang());   // passa pelo wrapper do aima-lang.js (rodapé)
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
