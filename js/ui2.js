// ======================================================
// ABRIR E FECHAR MODAL
// ======================================================
const modal = document.getElementById("modal");
const btnFlutuante = document.getElementById("btnFlutuante");
const fecharModal = document.getElementById("fecharModal");

btnFlutuante.addEventListener("click", () => {
    modal.style.display = "flex";
    btnFlutuante.classList.add("hidden");
    resetSteps();
});

fecharModal.addEventListener("click", () => {
    modal.style.display = "none";
    btnFlutuante.classList.remove("hidden");
});

modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
        btnFlutuante.classList.remove("hidden");
    }
});

// ======================================================
// LISTA DE PAÍSES + INDICATIVOS
// ======================================================
const PAISES_INDICATIVOS = [...MESMA_LISTA_QUE_JÁ_TINHAS...];

// ======================================================
// TOTAL DE HÓSPEDES
// ======================================================
function atualizarTotalHospedes() {
    const adultos = parseInt(document.getElementById("adults").value);
    const criancas = parseInt(document.getElementById("children").value);
    const bebes = parseInt(document.getElementById("babies").value);

    const total = adultos + criancas + bebes;
    document.getElementById("totalHospedes").textContent = total;

    return total;
}

["adults", "children", "babies"].forEach(id => {
    document.getElementById(id).addEventListener("change", atualizarTotalHospedes);
});

atualizarTotalHospedes();

// ======================================================
// VALIDAÇÃO DE CAPACIDADE
// ======================================================
function validarCapacidade() {
    const adultos = parseInt(document.getElementById("adults").value);
    const criancas = parseInt(document.getElementById("children").value);
    const bebes = parseInt(document.getElementById("babies").value);
    const apartamentos = parseInt(document.getElementById("apartments").value);

    const total = adultos + criancas + bebes;
    const capacidadeMax = apartamentos * 4;

    const msg = document.getElementById("mensagemDisponibilidade");
    msg.textContent = "";
    msg.style.display = "none";
    msg.classList.remove("disponivel", "indisponivel");

    if (adultos < apartamentos) {
        msg.textContent = translations[currentLang].rules_one_adult;
        msg.classList.add("indisponivel");
        msg.style.display = "block";
        return false;
    }

    if (total > capacidadeMax) {
        msg.textContent = translations[currentLang].rules_capacity_exceeded.replace("{MAX}", capacidadeMax);
        msg.classList.add("indisponivel");
        msg.style.display = "block";
        return false;
    }

    return true;
}

// ======================================================
// STEP 1 — VALIDAR E AVANÇAR (SEM DISPONIBILIDADE)
// ======================================================
const btnAvancar = document.getElementById("btnAvancarStep2");
const btnVerificar = document.getElementById("btnVerificar");

// Esconde o botão antigo
btnVerificar.style.display = "none";

// Mostra o botão continuar sempre
btnAvancar.style.display = "block";

btnAvancar.addEventListener("click", () => {

    const checkin = document.getElementById("checkin").value;
    const checkout = document.getElementById("checkout").value;
    const msg = document.getElementById("mensagemDisponibilidade");

    msg.textContent = "";
    msg.style.display = "none";
    msg.classList.remove("indisponivel");

    if (!checkin || !checkout) {
        msg.textContent = translations[currentLang].rules_select_dates;
        msg.classList.add("indisponivel");
        msg.style.display = "block";
        return;
    }

    const dataIn = new Date(checkin);
    const dataOut = new Date(checkout);
    const hoje = new Date();

    if (dataOut <= dataIn) {
        msg.textContent = translations[currentLang].rules_checkout_after_checkin;
        msg.classList.add("indisponivel");
        msg.style.display = "block";
        return;
    }

    const noites = (dataOut - dataIn) / (1000 * 60 * 60 * 24);
    if (noites < 3) {
        msg.textContent = translations[currentLang].rules_min_nights;
        msg.classList.add("indisponivel");
        msg.style.display = "block";
        return;
    }

    const diasAntecedencia = (dataIn - hoje) / (1000 * 60 * 60 * 24);
    if (diasAntecedencia < 3) {
        msg.textContent = translations[currentLang].rules_min_days;
        msg.classList.add("indisponivel");
        msg.style.display = "block";
        return;
    }

    if (!validarCapacidade()) return;

    abrirStep2();
});

// ======================================================
// STEP 2 — ABRIR FORMULÁRIO DE COTAÇÃO
// ======================================================
function abrirStep2() {
    const checkin = document.getElementById("checkin").value;
    const checkout = document.getElementById("checkout").value;
    const total = document.getElementById("totalHospedes").textContent;
    const apt = document.getElementById("apartments").value;

    const lang = translations[currentLang];

    document.getElementById("step1").style.display = "none";
    document.getElementById("step2").style.display = "block";

    const oldInfo = document.querySelector(".step2-info");
    if (oldInfo) oldInfo.remove();

    const header = document.getElementById("step2Header");
    header.textContent = lang.quote_request;

    header.insertAdjacentHTML(
        "afterend",
        `
        <div class="step2-info">
            <p class="step2-dates">
                ${lang.step2_dates.replace("{CHECKIN}", checkin).replace("{CHECKOUT}", checkout)}
            </p>

            <p class="step2-summary">
                ${lang.step2_summary.replace("{GUESTS}", total).replace("{APTS}", apt)}
            </p>
        </div>
        `
    );

    updateProgress(2);
}

// ======================================================
// STEP 2 — VOLTAR
// ======================================================
document.getElementById("btnVoltarStep1").addEventListener("click", () => {
    document.getElementById("step2").style.display = "none";
    document.getElementById("step1").style.display = "block";
    updateProgress(1);
});

// ======================================================
// STEP 2 — ENVIAR VIA WEB3FORMS
// ======================================================
document.getElementById("btnEnviarCotacao").addEventListener("click", async () => {

    const nome = document.getElementById("nomeHospede").value.trim();
    const email = document.getElementById("emailHospede").value.trim();
    const telefone = document.getElementById("telefoneHospede").value.trim();
    const pais = document.getElementById("paisHospede").value.trim();
    const obs = document.getElementById("obsHospede").value.trim();

    if (!nome || !email || !telefone || !pais) {
        alert(translations[currentLang].rules_required_fields);
        return;
    }

    const checkin = document.getElementById("checkin").value;
    const checkout = document.getElementById("checkout").value;
    const adultos = document.getElementById("adults").value;
    const criancas = document.getElementById("children").value;
    const bebes = document.getElementById("babies").value;
    const apartamentos = document.getElementById("apartments").value;
    const totalHospedes = document.getElementById("totalHospedes").textContent;

    const noites = (new Date(checkout) - new Date(checkin)) / (1000 * 60 * 60 * 24);

    const textMessage = `
Pedido de Cotação - Belleview Lagos

DADOS DA RESERVA
Check-in: ${checkin}
Check-out: ${checkout}
Noites: ${noites}
Adultos: ${adultos}
Crianças: ${criancas}
Bebés: ${bebes}
Total de Hóspedes: ${totalHospedes}
Apartamentos: ${apartamentos}

DADOS DO HÓSPEDE
Nome: ${nome}
Email: ${email}
Telefone: ${telefone}
País: ${pais}
Observações: ${obs || "—"}

INFORMAÇÃO TÉCNICA
Idioma do Pedido: ${currentLang.toUpperCase()}
    `;

    const formData = new FormData();
    formData.append("access_key", "950b90bc-37f4-4f5b-9d69-3e56389a054d");
    formData.append("subject", "Pedido de Cotação - Belleview Lagos");
    formData.append("message", textMessage);

    await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
    });

    abrirStep3();
});

// ======================================================
// STEP 3 — SUCESSO
// ======================================================
function abrirStep3() {
    document.getElementById("step2").style.display = "none";
    document.getElementById("step3").style.display = "block";
    updateProgress(3);
}

document.getElementById("btnFecharStep3").addEventListener("click", () => {
    modal.style.display = "none";
    btnFlutuante.classList.remove("hidden");
    resetSteps();
});

// ======================================================
// BARRA DE PROGRESSO
// ======================================================
function updateProgress(step) {
    const s1 = document.getElementById("progressStep1");
    const s2 = document.getElementById("progressStep2");
    const s3 = document.getElementById("progressStep3");

    [s1, s2, s3].forEach(s => s.classList.remove("active"));

    if (step >= 1) s1.classList.add("active");
    if (step >= 2) s2.classList.add("active");
    if (step >= 3) s3.classList.add("active");
}

// ======================================================
// POPULAR SELECTS
// ======================================================
window.addEventListener("DOMContentLoaded", () => {
    const paisSelect = document.getElementById("paisHospede");
    const indicativoSelect = document.getElementById("indicativoHospede");

    paisSelect.innerHTML = `<option value=""></option>`;
    indicativoSelect.innerHTML = `<option value=""></option>`;

    PAISES_INDICATIVOS.forEach(p => {
        const optCountry = document.createElement("option");
        optCountry.value = p.name;
        optCountry.textContent = p.name;
        paisSelect.appendChild(optCountry);

        const optPrefix = document.createElement("option");
        optPrefix.value = p.code;
        optPrefix.textContent = `${p.code} (${p.name})`;
        indicativoSelect.appendChild(optPrefix);
    });
});

// ======================================================
// RESET TOTAL DO MODAL
// ======================================================
function resetSteps() {
    document.getElementById("step1").style.display = "block";
    document.getElementById("step2").style.display = "none";
    document.getElementById("step3").style.display = "none";

    const msg = document.getElementById("mensagemDisponibilidade");
    msg.textContent = "";
    msg.style.display = "none";

    updateProgress(1);
}
