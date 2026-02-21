// js/aima.js

// ------------------------------
// TEXTOS POR IDIOMA
// ------------------------------
const texts = {
  pt: {
    subtitle: "Formulário obrigatório de Boletim de Alojamento (AIMA, antigo SEF).",
    legalHtml: `
      <p>Este formulário destina-se à recolha dos dados obrigatórios de todos os hóspedes,
      conforme exigido pela lei portuguesa para comunicação à AIMA (antigo SEF).</p>
      <p><strong>É obrigatório por lei</strong> que o alojamento recolha os dados de
      <strong>todos os hóspedes</strong>, incluindo crianças.</p>
      <p>Os dados são comunicados à AIMA exclusivamente para fins de controlo de fronteiras
      e segurança interna, ao abrigo da legislação portuguesa aplicável ao alojamento local.</p>
      <p>Para informação mais detalhada, consulte 
      <a href="https://www.sef.pt/pt/pages/conteudo-detalhe.aspx?nID=25" target="_blank">
      esta página sobre a obrigatoriedade legal e utilização dos dados</a>.
      </p>
    `,
    formTitle: "Boletim de Alojamento",
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
    subtitle: "Mandatory Guest Registration Form (AIMA, former SEF) required by Portuguese law.",
    legalHtml: `
      <p>This form is used to collect the mandatory data of all guests,
      as required by Portuguese law for communication to AIMA (former SEF).</p>
      <p><strong>By law</strong>, the accommodation must collect the data of
      <strong>all guests</strong>, including children.</p>
      <p>The data is sent to AIMA exclusively for border control and internal security
      purposes, under the applicable Portuguese legislation for local accommodation.</p>
      <p>For more detailed information, please see
      <a href="https://www.sef.pt/en/pages/conteudo-detalhe.aspx?nID=25" target="_blank">
      this page about the legal obligation and use of the data</a>.
      </p>
    `,
    formTitle: "Guest Registration Form",
    stayDataTitle: "Stay Details",
    checkinLabel: "Check-in Date:",
    checkoutLabel: "Check-out Date:",
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
    submit: "Submit Guest Registration"
  },

  es: {
    subtitle: "Formulario obligatorio de Boletín de Alojamiento (AIMA, antiguo SEF).",
    legalHtml: `
      <p>Este formulario se utiliza para recoger los datos obligatorios de todos los huéspedes,
      según exige la ley portuguesa para la comunicación a AIMA (antiguo SEF).</p>
      <p><strong>Es obligatorio por ley</strong> que el alojamiento recoja los datos de
      <strong>todos los huéspedes</strong>, incluidos los niños.</p>
      <p>Los datos se comunican a AIMA exclusivamente con fines de control de fronteras
      y seguridad interna, de acuerdo con la legislación portuguesa aplicable al alojamiento local.</p>
      <p>Para más información detallada, consulte
      <a href="https://www.sef.pt/pt/pages/conteudo-detalhe.aspx?nID=25" target="_blank">
      esta página sobre la obligatoriedad legal y el uso de los datos</a>.
      </p>
    `,
    formTitle: "Boletín de Alojamiento",
    stayDataTitle: "Datos de la Estancia",
    checkinLabel: "Fecha de Check-in:",
    checkoutLabel: "Fecha de Check-out:",
    adultsLabel: "Nº de Huéspedes Adultos:",
    childrenLabel: "Nº de Huéspedes Niños:",
    guestTitle: i => `Huésped ${i}`,
    fields: {
      fullName: "Nombre Completo:",
      birthDate: "Fecha de Nacimiento:",
      birthPlace: "Lugar de Nacimiento:",
      nationality: "Nacionalidad:",
      residencePlace: "Lugar de Residencia:",
      residenceCountry: "País de Residencia:",
      docNumber: "Número de Documento:",
      docType: "Tipo de Documento:",
      docTypePassport: "Pasaporte",
      docTypeID: "Documento de Identidad",
      docCountry: "País Emisor del Documento:"
    },
    submit: "Enviar Boletín de Alojamiento"
  },

  fr: {
    subtitle: "Formulaire obligatoire de Fiche d’Hébergement (AIMA, ex-SEF).",
    legalHtml: `
      <p>Ce formulaire sert à recueillir les données obligatoires de tous les hôtes,
      comme l’exige la loi portugaise pour la communication à l’AIMA (ancien SEF).</p>
      <p><strong>Il est obligatoire par la loi</strong> que l’hébergement collecte les données de
      <strong>tous les hôtes</strong>, y compris les enfants.</p>
      <p>Les données sont transmises à l’AIMA exclusivement à des fins de contrôle des frontières
      et de sécurité intérieure, conformément à la législation portugaise applicable à l’hébergement local.</p>
      <p>Pour plus d’informations détaillées, veuillez consulter
      <a href="https://www.sef.pt/pt/pages/conteudo-detalhe.aspx?nID=25" target="_blank">
      cette page sur l’obligation légale et l’utilisation des données</a>.
      </p>
    `,
    formTitle: "Fiche d’Hébergement",
    stayDataTitle: "Données du Séjour",
    checkinLabel: "Date d’arrivée :",
    checkoutLabel: "Date de départ :",
    adultsLabel: "Nombre d’adultes :",
    childrenLabel: "Nombre d’enfants :",
    guestTitle: i => `Hôte ${i}`,
    fields: {
      fullName: "Nom complet :",
      birthDate: "Date de naissance :",
      birthPlace: "Lieu de naissance :",
      nationality: "Nationalité :",
      residencePlace: "Lieu de résidence :",
      residenceCountry: "Pays de résidence :",
      docNumber: "Numéro du document :",
      docType: "Type de document :",
      docTypePassport: "Passeport",
      docTypeID: "Carte d’identité",
      docCountry: "Pays émetteur du document :"
    },
    submit: "Envoyer la fiche d’hébergement"
  },

  it: {
    subtitle: "Modulo obbligatorio di Scheda di Alloggio (AIMA, ex SEF).",
    legalHtml: `
      <p>Questo modulo viene utilizzato per raccogliere i dati obbligatori di tutti gli ospiti,
      come richiesto dalla legge portoghese per la comunicazione all’AIMA (ex SEF).</p>
      <p><strong>È obbligatorio per legge</strong> che la struttura raccolga i dati di
      <strong>tutti gli ospiti</strong>, inclusi i bambini.</p>
      <p>I dati vengono comunicati all’AIMA esclusivamente per finalità di controllo delle frontiere
      e sicurezza interna, in conformità con la legislazione portoghese applicabile agli alloggi locali.</p>
      <p>Per maggiori informazioni dettagliate, consultare
      <a href="https://www.sef.pt/pt/pages/conteudo-detalhe.aspx?nID=25" target="_blank">
      questa pagina sull’obbligo legale e l’utilizzo dei dati</a>.
      </p>
    `,
    formTitle: "Scheda di Alloggio",
    stayDataTitle: "Dati del Soggiorno",
    checkinLabel: "Data di Check-in:",
    checkoutLabel: "Data di Check-out:",
    adultsLabel: "Numero di Ospiti Adulti:",
    childrenLabel: "Numero di Ospiti Bambini:",
    guestTitle: i => `Ospite ${i}`,
    fields: {
      fullName: "Nome completo:",
      birthDate: "Data di nascita:",
      birthPlace: "Luogo di nascita:",
      nationality: "Nazionalità:",
      residencePlace: "Luogo di residenza:",
      residenceCountry: "Paese di residenza:",
      docNumber: "Numero del documento:",
      docType: "Tipo di documento:",
      docTypePassport: "Passaporto",
      docTypeID: "Carta d’identità",
      docCountry: "Paese emittente del documento:"
    },
    submit: "Invia scheda di alloggio"
  },

  de: {
    subtitle: "Pflichtformular für das Gästeblatt (AIMA, ehemals SEF).",
    legalHtml: `
      <p>Dieses Formular dient zur Erfassung der Pflichtdaten aller Gäste,
      wie nach portugiesischem Recht für die Meldung an AIMA (ehemals SEF) vorgeschrieben.</p>
      <p><strong>Es ist gesetzlich vorgeschrieben</strong>, dass die Unterkunft die Daten
      <strong>aller Gäste</strong> erfasst, einschließlich Kinder.</p>
      <p>Die Daten werden ausschließlich zu Zwecken der Grenzkontrolle und inneren Sicherheit
      an AIMA übermittelt, gemäß der geltenden portugiesischen Gesetzgebung für lokale Unterkünfte.</p>
      <p>Für detailliertere Informationen siehe
      <a href="https://www.sef.pt/pt/pages/conteudo-detalhe.aspx?nID=25" target="_blank">
      diese Seite über die gesetzliche Verpflichtung und Datennutzung</a>.
      </p>
    `,
    formTitle: "Gästeblatt",
    stayDataTitle: "Angaben zum Aufenthalt",
    checkinLabel: "Check-in-Datum:",
    checkoutLabel: "Check-out-Datum:",
    adultsLabel: "Anzahl erwachsener Gäste:",
    childrenLabel: "Anzahl Kinder:",
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
    submit: "Gästeblatt absenden"
  }
};

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
