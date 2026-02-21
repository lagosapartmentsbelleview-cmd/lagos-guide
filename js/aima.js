// Azul sistema: #005c99

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
      <a href="#" target="_blank">esta página sobre a obrigatoriedade legal e utilização dos dados</a>.
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
  // en, es, fr, it, de: replicar estrutura com traduções
};

const countries = [
  "Portugal", "Spain", "France", "Italy", "Germany", "United Kingdom",
  "United States", "Brazil", "Netherlands", "Belgium", "Switzerland"
  // depois podes substituir por lista completa
];

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

document.querySelectorAll("#langButtons button").forEach(btn => {
  btn.addEventListener("click", () => {
    const lang = btn.dataset.lang;
    setLanguage(lang);
  });
});

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

document.getElementById("adults").addEventListener("input", generateGuestFields);
document.getElementById("children").addEventListener("input", generateGuestFields);

function generateGuestFields() {
  const t = texts[currentLang];
  const adults = parseInt(document.getElementById("adults").value || "0", 10);
  const children = parseInt(document.getElementById("children").value || "0", 10);
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

// SUBMISSÃO (placeholder para Firebase)
document.getElementById("aimaForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const data = Object.fromEntries(formData.entries());
  data.lang = currentLang;

  console.log("Boletim AIMA:", data);

  // Aqui depois ligamos ao Firebase (Firestore ou Realtime DB)
  // e opcionalmente trigger de email/WhatsApp via Cloud Functions.

  alert("Boletim de alojamento enviado com sucesso. Obrigado!");
});

// idioma default
setLanguage("pt");
