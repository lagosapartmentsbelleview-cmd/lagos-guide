// ============================================================
// JS/AIMATEST.JS — INTERCEÇÃO LIMPA (MANTÉM O AIMA.JS INTACTO)
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  // 1. Capturar parâmetro de apartamento/unidade do URL (ex: ?apt=2204 ou ?unidade=2203)
  const urlParams = new URLSearchParams(window.location.search);
  const aptParam = urlParams.get("apt") || urlParams.get("unidade") || "2203";
  const hiddenUnidade = document.getElementById("hiddenUnidade");
  if (hiddenUnidade) hiddenUnidade.value = aptParam;

  const form = document.getElementById("aimaForm");
  if (!form) return;

  // 2. Intercetar o submit na fase de captura (true) para parar o Web3Forms original do aima.js
  // Sem clonar o form, mantemos todas as funções de calendário e geração de hóspedes do aima.js intactas.
  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    e.stopImmediatePropagation(); // Impede o aima.js de executar o envio antigo

    const checkin = document.getElementById("checkinDate").value;
    const checkout = document.getElementById("checkoutDate").value;

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

    // Recolher todos os hóspedes gerados dinamicamente pelo aima.js
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

    // Verificar opção de cópia por e-mail[cite: 13]
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
      // A. Gravar no Firestore do Firebase (visível no siba.html)
      if (typeof db !== 'undefined') {
        await db.collection("boletins").add(novoBoletim);
      }

      // B. Enviar cópia por EmailJS se o cliente pediu e preencheu e-mail[cite: 13]
      if (wantsCopy && emailDigitado && typeof emailjs !== 'undefined') {
        await emailjs.send(
          "service_funp519",
          "template_0oqqqy3",
          {
            to_email: emailDigitado,
            subject_text: "Cópia do Registo de Hóspedes - AIMA",
            guest_name: hospedes[0]?.nome || "Hóspede",
            checkin: checkin,
            checkout: checkin
          },
          "imhA9ilHaWGF1hxYz"
        );
      }

      // C. Guardar no armazenamento local (aimasiba.js)
      if (typeof guardarBoletimPendente === "function") {
        guardarBoletimPendente({
          ...novoBoletim,
          criadoEm: new Date().toISOString()
        });
      }

      // D. Mostrar Popup de Sucesso original
      const popup = document.getElementById("aimaSuccessPopup");
      if (popup) {
        popup.style.display = "flex";
        setTimeout(() => { popup.style.display = "none"; }, 3000);
      } else {
        alert("Formulário submetido com sucesso!");
      }

      this.reset();
      if (typeof generateGuestFields === "function") {
        generateGuestFields();
      }

    } catch (error) {
      console.error("Erro ao processar boletim:", error);
      alert("Erro ao submeter o formulário. Por favor tente novamente.");
    } finally {
      if (submitBtn) {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    }
  }, true); // O 'true' ativa a fase de captura para intersetar antes do aima.js
});
