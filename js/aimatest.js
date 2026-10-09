// ============================================================
// AIMATEST.JS — GESTÃO DO FORMULÁRIO DE REGISTO DE HÓSPEDES
// ============================================================

// Reutilização segura de iso3Map sem conflitos de redeclaração
if (typeof window.iso3Map === 'undefined') {
  window.iso3Map = {
    "Portugal": "PRT", "Portogallo": "PRT",
    "Espanha": "ESP", "Spain": "ESP", "España": "ESP", "Espagne": "ESP", "Spagna": "ESP", "Spanien": "ESP",
    "França": "FRA", "France": "FRA", "Francia": "FRA", "Frankreich": "FRA",
    "Alemanha": "DEU", "Germany": "DEU", "Allemagne": "DEU", "Alemania": "DEU", "Germania": "DEU", "Deutschland": "DEU",
    "Reino Unido": "GBR", "United Kingdom": "GBR", "Royaume-Uni": "GBR", "Regno Unito": "GBR", "Großbritannien": "GBR",
    "Estados Unidos": "USA", "United States": "USA", "États-Unis": "USA", "Stati Uniti": "USA", "USA": "USA",
    "Itália": "ITA", "Italy": "ITA", "Italie": "ITA", "Italien": "ITA",
    "Países Baixos": "NLD", "Netherlands": "NLD", "Pays-Bas": "NLD", "Niederlande": "NLD",
    "Bélgica": "BEL", "Belgium": "BEL", "Belgique": "BEL", "Belgio": "BEL", "Belgien": "BEL",
    "Suíça": "CHE", "Switzerland": "CHE", "Suisse": "CHE", "Suiza": "CHE", "Svizzera": "CHE", "Schweiz": "CHE",
    "Irlanda": "IRL", "Ireland": "IRL", "Irlande": "IRL", "Irland": "IRL",
    "Brasil": "BRA", "Brazil": "BRA", "Brésil": "BRA", "Brasile": "BRA", "Brasilien": "BRA",
    "Canadá": "CAN", "Canada": "CAN", "Kanada": "CAN",
    "Polónia": "POL", "Poland": "POL", "Pologne": "POL", "Polonia": "POL", "Polen": "POL",
    "Áustria": "AUT", "Austria": "AUT", "Autriche": "AUT", "Österreich": "AUT",
    "Dinamarca": "DNK", "Denmark": "DNK", "Danemark": "DNK", "Dänemark": "DNK",
    "Suécia": "SWE", "Sweden": "SWE", "Suède": "SWE", "Suecia": "SWE", "Svezia": "SWE", "Schweden": "SWE",
    "Noruega": "NOR", "Norway": "NOR", "Norvège": "NOR", "Noruega": "NOR", "Norvegia": "NOR", "Norwegen": "NOR",
    "Finlândia": "FIN", "Finland": "FIN", "Finlande": "FIN", "Finlandia": "FIN", "Finnland": "FIN"
  };
}

function normalizarIso3(paisTexto) {
  if (!paisTexto) return "PRT";
  const p = String(paisTexto).trim();
  if (/^[A-Z]{3}$/.test(p)) return p;
  return window.iso3Map[p] || "PRT";
}

var docTypeMap = {
  passport: "P",
  id: "I",
  other: "O",
  P: "P",
  I: "I",
  O: "O"
};

var countryLists = {
  pt: [
    "Portugal","Alemanha","Espanha","França","Reino Unido","Itália","Países Baixos","Bélgica","Suíça","Irlanda","Brasil","Canadá","Estados Unidos",
    "Afeganistão","África do Sul","Albânia","Andorra","Angola","Antígua e Barbuda","Arábia Saudita","Argélia","Argentina","Arménia","Austrália","Áustria","Azerbaijão",
    "Bahamas","Bangladesh","Barbados","Barém","Belize","Benim","Bielorrússia","Bolívia","Bósnia e Herzegovina","Botsuana","Brunei","Bulgária","Burquina Faso","Burundi","Butão",
    "Cabo Verde","Camarões","Camboja","Catar","Cazaquistão","Chade","Chile","China","Chipre","Colômbia","Comores","Coreia do Norte","Coreia do Sul","Costa do Marfim","Costa Rica","Croácia","Cuba",
    "Dinamarca","Dominica","Egipto","Emirados Árabes Unidos","Equador","Eritreia","Eslováquia","Eslovénia","Estónia","Etiópia",
    "Fiji","Filipinas","Finlândia","Gabão","Gâmbia","Gana","Geórgia","Granada","Grécia","Guatemala","Guiana","Guiné","Guiné-Bissau","Guiné Equatorial",
    "Haiti","Honduras","Hungria","Iémen","Ilhas Marechal","Índia","Indonésia","Irão","Iraque","Islândia","Israel",
    "Jamaica","Japão","Jordânia","Koweit","Laos","Lesoto","Letónia","Líbano","Libéria","Líbia","Liechtenstein","Lituânia","Luxemburgo",
    "Macedónia do Norte","Madagáscar","Malásia","Malaui","Maldivas","Mali","Malta","Marrocos","Maurícia","Mauritânia","México","Micronésia","Moçambique","Moldávia","Mónaco","Mongólia","Montenegro","Mianmar",
    "Namíbia","Nauru","Nepal","Nicarágua","Níger","Nigéria","Noruega","Nova Zelândia","Omã","Paquistão","Palau","Panamá","Papua-Nova Guiné","Paraguai","Peru","Polónia",
    "República Centro-Africana","República Checa","República Democrática do Congo","República do Congo","República Dominicana","Roménia","Ruanda","Rússia",
    "Samoa","Santa Lúcia","São Cristóvão e Neves","São Marino","São Tomé e Príncipe","São Vicente e Granadinas","Senegal","Serra Leoa","Sérvia","Seicheles","Singapura","Síria","Somália","Sri Lanka","Eswatini","Sudão","Sudão do Sul","Suécia","Suriname",
    "Tailândia","Taiwan","Tajiquistão","Tanzânia","Timor-Leste","Togo","Tonga","Trinidad e Tobago","Tunísia","Turquemenistão","Turquia","Tuvalu",
    "Ucrânia","Uganda","Uruguai","Uzbequistão","Vanuatu","Vaticano","Venezuela","Vietname","Zâmbia","Zimbabué"
  ],
  en: ["Portugal","United Kingdom","Germany","France","Spain","Italy","Netherlands","Belgium","Switzerland","Ireland","Brazil","Canada","United States","Afghanistan","Albania","Algeria","Andorra","Angola","Argentina","Australia","Austria","China","Denmark","Egypt","Finland","Greece","India","Israel","Japan","Luxembourg","Mexico","Morocco","Norway","Poland","Romania","Russia","Sweden","Turkey","Ukraine"],
  fr: ["Portugal","France","Royaume-Uni","Allemagne","Espagne","Italie","Belgique","Suisse","Pays-Bas","Irlande","Brésil","Canada","États-Unis","Afghanistan","Algérie","Andorre","Angola","Argentine","Australie","Autriche","Chine","Danemark","Finlande","Grèce","Luxembourg","Maroc","Norvège","Pologne","Suède"],
  es: ["Portugal","España","Reino Unido","Alemania","Francia","Italia","Países Bajos","Bélgica","Suiza","Irlanda","Brasil","Argentina","Canadá","Chile","Colombia","Estados Unidos","México","Uruguay","Venezuela","Afganistán","Andorra","Angola","Australia","Austria","Dinamarca","Ecuador","Grecia","Noruega","Perú","Polonia","Suecia"],
  it: ["Portogallo","Italia","Regno Unito","Germania","Francia","Spagna","Paesi Bassi","Belgio","Svizzera","Irlanda","Brasile","Canada","Stati Uniti","Afghanistan","Albania","Algeria","Andorra","Angola","Argentina","Australia","Austria","Cina","Danimarca","Giappone","Grecia","Lussemburgo","Marocco","Norvegia","Polonia","Svezia"],
  de: ["Portugal","Deutschland","Großbritannien","Frankreich","Spanien","Italien","Niederlande","Belgien","Schweiz","Österreich","Irland","Brasilien","Kanada","USA","Afghanistan","Ägypten","Albanien","Algerien","Andorra","Angola","Argentinien","Australien","Dänemark","Finnland","Griechenland","Luxemburg","Marokko","Norwegen","Polen","Schweden","Tschechien","Türkei"]
};

var texts = {
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
      <p>Os dados recolhidos são utilizados exclusivamente para cumprimento desta obrigação legal (RGPD).</p>
      <p><a href="/docs/sef.pdf" target="_blank" class="pdf-link">Verificar informação em PDF</a> | <a id="openFaqModal" class="faq-link">Perguntas Frequentes (FAQ)</a></p>
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
    guestTitle: function(i) { return "Hóspede " + i; },
    fields: {
      fullName: "Nome Completo:",
      birthDate: "Data de Nascimento:",
      nationality: "Nacionalidade:",
      residenceCountry: "País de Residência:",
      docNumber: "Número do Documento:",
      docType: "Tipo de Documento:",
      docTypePassport: "Passaporte",
      docTypeID: "Cartão de Cidadão / BI",
      docTypeOther: "Outro",
      docTypeOtherLabel: "Qual?",
      docCountry: "País Emissor do Documento:"
    },
    placeholder_select: "Selecione",
    submit: "Enviar Boletim de Alojamento",
    aima_success: "Formulário enviado com sucesso!"
  },
  en: {
    subtitle: "Mandatory Accommodation Registration Form (AIMA, formerly SEF).",
    legalHtml: `<h3><strong>Mandatory Legal Notice — Guest Registration (AIMA/SIBA)</strong></h3><p>Portuguese law requires all non-Portuguese guests to register.</p>`,
    formTitle: "Accommodation Registration Form",
    requiredNotice: "Mandatory completion for all adult and child guests",
    stayDataTitle: "Stay Information",
    checkinLabel: "Check-in Date:",
    checkoutLabel: "Check-out Date:",
    adultsLabel: "Adult Guests:",
    childrenLabel: "Child Guests:",
    wants_copy_title: "Would you like a copy sent to your email?",
    radio_yes: "Yes",
    radio_no: "No",
    email_label: "Your Email:",
    guestTitle: function(i) { return "Guest " + i; },
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
      docTypeOtherLabel: "Which?",
      docCountry: "Issuing Country:"
    },
    placeholder_select: "Select",
    submit: "Submit Form",
    aima_success: "Form submitted successfully!"
  }
};

var currentLang = "pt";

function setLanguage(lang) {
  currentLang = texts[lang] ? lang : "pt";
  var t = texts[currentLang];
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

  if (document.getElementById("labelWantsCopy")) document.getElementById("labelWantsCopy").textContent = t.wants_copy_title;
  if (document.getElementById("labelRadioYes")) document.getElementById("labelRadioYes").textContent = t.radio_yes;
  if (document.getElementById("labelRadioNo")) document.getElementById("labelRadioNo").textContent = t.radio_no;
  if (document.getElementById("labelClientEmail")) document.getElementById("labelClientEmail").textContent = t.email_label;

  generateGuestFields();
}

function generateGuestFields() {
  var t = texts[currentLang] || texts.pt;
  var activeCountries = countryLists[currentLang] || countryLists.pt;
  
  var adultsInput = document.getElementById("adults");
  var childrenInput = document.getElementById("children");
  var guestsContainerEl = document.getElementById("guestsContainer");

  var adults = parseInt(adultsInput ? adultsInput.value : "1", 10) || 1;
  var children = parseInt(childrenInput ? childrenInput.value : "0", 10) || 0;
  var total = adults + children;

  if (!guestsContainerEl) return;
  guestsContainerEl.innerHTML = "";

  for (var i = 1; i <= total; i++) {
    var card = document.createElement("div");
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

    (function(index) {
      var docTypeSelect = card.querySelector('#docType_' + index);
      var otherField = card.querySelector('#otherDocField_' + index);
      if (docTypeSelect && otherField) {
        docTypeSelect.addEventListener("change", function() {
          otherField.style.display = docTypeSelect.value === "other" ? "block" : "none";
        });
      }
    })(i);
  }
}

document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll("[required]").forEach(function(el) { el.removeAttribute("required"); });

  var faqModal = document.getElementById("faqModal");
  var closeFaqBtn = document.getElementById("closeFaqModal") || 
                      document.querySelector(".close-faq") || 
                      document.querySelector("#faqModal .close");

  if (closeFaqBtn) {
    closeFaqBtn.addEventListener("click", function() {
      if (faqModal) faqModal.style.display = "none";
    });
  }

  window.addEventListener("click", function(e) {
    if (faqModal && e.target === faqModal) {
      faqModal.style.display = "none";
    }
  });

  var adultsEl = document.getElementById("adults");
  var childrenEl = document.getElementById("children");
  if (adultsEl) adultsEl.addEventListener("input", generateGuestFields);
  if (childrenEl) childrenEl.addEventListener("input", generateGuestFields);

  var aimaFormEl = document.getElementById("aimaForm");
  if (aimaFormEl) {
    aimaFormEl.addEventListener("submit", async function (e) {
      e.preventDefault();

      var checkin = document.getElementById("checkinDate") ? document.getElementById("checkinDate").value : "";
      var checkout = document.getElementById("checkoutDate") ? document.getElementById("checkoutDate").value : "";

      if (!checkin || !checkout) {
        alert("Por favor selecione as datas de Check-in e Check-out.");
        return;
      }

      if (new Date(checkin) >= new Date(checkout)) {
        alert("Check-out deve ser posterior ao Check-in.");
        return;
      }

      var adults = parseInt(document.getElementById("adults") ? document.getElementById("adults").value : "1", 10) || 1;
      var children = parseInt(document.getElementById("children") ? document.getElementById("children").value : "0", 10) || 0;
      var totalGuests = adults + children;

      var hospedes = [];
      for (var i = 1; i <= totalGuests; i++) {
        var nacBruta = document.querySelector('[name="guest_' + i + '_nationality"]') ? document.querySelector('[name="guest_' + i + '_nationality"]').value : "";
        var resBruta = document.querySelector('[name="guest_' + i + '_residenceCountry"]') ? document.querySelector('[name="guest_' + i + '_residenceCountry"]').value : "";
        var docPaisBruto = document.querySelector('[name="guest_' + i + '_docCountry"]') ? document.querySelector('[name="guest_' + i + '_docCountry"]').value : "";
        var docTipoRaw = document.querySelector('[name="guest_' + i + '_docType"]') ? document.querySelector('[name="guest_' + i + '_docType"]').value : "passport";

        hospedes.push({
          nome: document.querySelector('[name="guest_' + i + '_fullName"]') ? document.querySelector('[name="guest_' + i + '_fullName"]').value.trim() : "",
          dataNascimento: document.querySelector('[name="guest_' + i + '_birthDate"]') ? document.querySelector('[name="guest_' + i + '_birthDate"]').value : "",
          nacionalidade: normalizarIso3(nacBruta),
          paisResidencia: normalizarIso3(resBruta),
          docTipo: docTypeMap[docTipoRaw] || "P",
          docNumero: document.querySelector('[name="guest_' + i + '_docNumber"]') ? document.querySelector('[name="guest_' + i + '_docNumber"]').value.trim() : "",
          docOutroDesc: document.querySelector('[name="guest_' + i + '_docOther"]') ? document.querySelector('[name="guest_' + i + '_docOther"]').value.trim() : "",
          docPaisEmissor: normalizarIso3(docPaisBruto)
        });
      }

      var emailDigitado = (document.getElementById("clientEmail") ? document.getElementById("clientEmail").value.trim() : "") || 
                            (document.getElementById("email") ? document.getElementById("email").value.trim() : "");

      var novoBoletim = {
        criadoEm: new Date().toISOString(),
        dataCheckin: checkin,
        dataCheckout: checkout,
        numAdultos: adults,
        numCriancas: children,
        emailCliente: emailDigitado,
        hospedes: hospedes,
        status: "PENDENTE"
      };

      var submitBtn = document.getElementById("submitLabel") || this.querySelector('button[type="submit"]');
      var originalText = submitBtn ? submitBtn.textContent : "Enviar";
      if (submitBtn) {
        submitBtn.textContent = "A enviar...";
        submitBtn.disabled = true;
      }

      try {
        if (typeof guardarBoletimPendente === "function") {
          guardarBoletimPendente(novoBoletim);
        }

        var popup = document.getElementById("aimaSuccessPopup");
        if (popup) {
          popup.style.display = "flex";
          setTimeout(function() { popup.style.display = "none"; }, 3000);
        } else {
          alert(texts[currentLang] ? texts[currentLang].aima_success : "Boletim guardado com sucesso!");
        }

        this.reset();
        generateGuestFields();

      } catch (error) {
        console.error("Erro ao processar o formulário:", error);
        alert("Erro ao guardar os dados. Por favor tente novamente.");
      } finally {
        if (submitBtn) {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }
      }
    });
  }

  // Inicializar o idioma em Português
  setLanguage("pt");
});
