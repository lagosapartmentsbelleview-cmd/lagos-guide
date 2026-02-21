// js/aima.js

// ------------------------------
// TEXTOS POR IDIOMA
// ------------------------------
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
    <a id="openFaqModal" class="faq-link">Perguntas Frequentes (FAQ)</a>
    <p><a href="https://files.dre.pt/1s/2007/07/13800/0446504498.pdf" target="_blank">
       Lei n.º 23/2007 — Diário da República (PDF)</a></p>
`,
    formTitle: "Boletim de Alojamento",
    requiredNotice: "Preenchimento e envio obrigatório",
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
    <a id="openFaqModal" class="faq-link">Frequently Asked Questions (FAQ)</a>
    <p><a href="https://files.dre.pt/1s/2007/07/13800/0446504498.pdf" target="_blank">
       Law 23/2007 — Official Gazette (PDF)</a></p>
  `,
  formTitle: "Accommodation Registration Form",
  requiredNotice: "Mandatory completion and submission",
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
    <a id="openFaqModal" class="faq-link">Preguntas Frecuentes (FAQ)</a>
    <p><a href="https://files.dre.pt/1s/2007/07/13800/0446504498.pdf" target="_blank">
       Ley n.º 23/2007 — Diario Oficial (PDF)</a></p>
  `,
  formTitle: "Registro de Alojamiento",
  requiredNotice: "Cumplimentación y envío obligatorios",
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
    <a id="openFaqModal" class="faq-link">Foire aux Questions (FAQ)</a>
    <p><a href="https://files.dre.pt/1s/2007/07/13800/0446504498.pdf" target="_blank">
       Loi n.º 23/2007 — Journal Officiel (PDF)</a></p>
  `,
  formTitle: "Formulaire d’Enregistrement",
  requiredNotice: "Remplissage et envoi obligatoires",
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
    <a id="openFaqModal" class="faq-link">Domande Frequenti (FAQ)</a>
    <p><a href="https://files.dre.pt/1s/2007/07/13800/0446504498.pdf" target="_blank">
       Legge n.º 23/2007 — Gazzetta Ufficiale (PDF)</a></p>
  `,
  formTitle: "Modulo di Registrazione",
  requiredNotice: "Compilazione e invio obbligatori",
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
    <a id="openFaqModal" class="faq-link">Häufig gestellte Fragen (FAQ)</a>
    <p><a href="https://files.dre.pt/1s/2007/07/13800/0446504498.pdf" target="_blank">
       Gesetz Nr. 23/2007 — Amtsblatt (PDF)</a></p>
  `,
  formTitle: "Gästeanmeldeformular",
  requiredNotice: "Pflicht zur Ausfüllung und Übermittlung",
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
  submit: "Formular absenden"
},

// ------------------------------
// FAQ EM PORTUGUÊS — CONTEÚDO HTML
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
`
};

function loadFaq() {
  faqContent.innerHTML = faqTexts[currentLang];
}


// ------------------------------
// LISTA SIMPLES DE PAÍSES (PODE SER EXPANDIDA)
// ------------------------------
const countries = [
  "Portugal", "Spain", "France", "Italy", "Germany", "United Kingdom",
  "Ireland", "Netherlands", "Belgium", "Switzerland", "Austria",
  "Brazil", "United States", "Canada"
];

// ------------------------------
// ELEMENTOS DO DOM
// ------------------------------
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

// ------------------------------
// FUNÇÃO PARA DEFINIR IDIOMA
// ------------------------------
function setLanguage(lang) {
  currentLang = lang;
  const t = texts[lang];

  subtitleEl.textContent = t.subtitle;
  legalInfoEl.innerHTML = t.legalHtml;
  formSectionEl.style.display = "block";

  formTitleEl.textContent = t.formTitle;

  document.getElementById("requiredNotice").textContent = t.requiredNotice;
 
  stayDataTitleEl.textContent = t.stayDataTitle;
  checkinLabelEl.textContent = t.checkinLabel;
  checkoutLabelEl.textContent = t.checkoutLabel;
  adultsLabelEl.textContent = t.adultsLabel;
  childrenLabelEl.textContent = t.childrenLabel;
  submitBtnEl.textContent = t.submit;

  generateGuestFields();
}

// ------------------------------
// GERAR CAMPOS PARA HÓSPEDES
// ------------------------------
function generateGuestFields() {
  const t = texts[currentLang];
  const adults = parseInt(adultsInput.value || "0", 10);
  const children = parseInt(childrenInput.value || "0", 10);
  const total = adults + children;

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
        <label>${t.fields.birthPlace}</label>
        <input type="text" name="guest_${i}_birthPlace" required>
      </div>

      <div class="form-row">
        <label>${t.fields.nationality}</label>
        <input type="text" name="guest_${i}_nationality" required>
      </div>

      <div class="form-row">
        <label>${t.fields.residencePlace}</label>
        <input type="text" name="guest_${i}_residencePlace" required>
      </div>

      <div class="form-row">
        <label>${t.fields.residenceCountry}</label>
        <select name="guest_${i}_residenceCountry" required>
          ${countries.map(c => `<option value="${c}">${c}</option>`).join("")}
        </select>
      </div>

      <div class="form-row">
        <label>${t.fields.docNumber}</label>
        <input type="text" name="guest_${i}_docNumber" required>
      </div>

      <div class="form-row">
        <label>${t.fields.docType}</label>
        <select name="guest_${i}_docType" required>
          <option value="passport">${t.fields.docTypePassport}</option>
          <option value="id">${t.fields.docTypeID}</option>
        </select>
      </div>

      <div class="form-row">
        <label>${t.fields.docCountry}</label>
        <select name="guest_${i}_docCountry" required>
          ${countries.map(c => `<option value="${c}">${c}</option>`).join("")}
        </select>
      </div>
    `;

    guestsContainerEl.appendChild(card);
  }
}

// ------------------------------
// EVENTOS PARA ATUALIZAR HÓSPEDES
// ------------------------------
adultsInput.addEventListener("input", generateGuestFields);
childrenInput.addEventListener("input", generateGuestFields);

// ------------------------------
// SUBMISSÃO DO FORMULÁRIO
// ------------------------------
document.getElementById("aimaForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const data = Object.fromEntries(formData.entries());
  data.lang = currentLang;
  data.timestamp = new Date().toISOString();

  console.log("Boletim AIMA:", data);

  // ------------------------------
  // AQUI ENTRA O FIREBASE (FIRESTORE/REALTIME DB)
  // Exemplo (pseudo-código):
  //
  // import { initializeApp } from "firebase/app";
  // import { getFirestore, collection, addDoc } from "firebase/firestore";
  //
  // const app = initializeApp(firebaseConfig);
  // const db = getFirestore(app);
  //
  // await addDoc(collection(db, "aima_boletins"), data);
  //
  // ------------------------------

  alert(texts[currentLang].submit);
  this.reset();
  generateGuestFields();
});

// ------------------------------
// IDIOMA INICIAL
// ------------------------------
setLanguage("pt");

// ------------------------------
// MODAL FAQ — ABRIR E FECHAR
// ------------------------------
const faqModal = document.getElementById("faqModal");
const faqContent = document.getElementById("faqContent");
const openFaqBtn = document.getElementById("openFaqModal");
const closeFaqBtn = document.getElementById("closeFaqModal");

// Abrir modal
openFaqBtn.addEventListener("click", () => {
  loadFaq(); // ← carrega a FAQ do idioma atual
  faqModal.style.display = "block";
});


// Fechar modal (botão X)
closeFaqBtn.addEventListener("click", () => {
  faqModal.style.display = "none";
});

// Fechar modal ao clicar fora da caixa
window.addEventListener("click", (e) => {
  if (e.target === faqModal) {
    faqModal.style.display = "none";
  }
});
