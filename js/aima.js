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
}
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
`,
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
