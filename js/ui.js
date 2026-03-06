// ======================================================
// ABRIR E FECHAR MODAL
// ======================================================
const modal = document.getElementById("modal");
const btnFlutuante = document.getElementById("btnFlutuante");
const fecharModal = document.getElementById("fecharModal");

btnFlutuante.addEventListener("click", () => {
    modal.style.display = "flex";
    resetSteps();
});

fecharModal.addEventListener("click", () => {
    modal.style.display = "none";
});

modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
});

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
        msg.textContent = `Cada apartamento precisa de pelo menos 1 adulto.`;
        msg.classList.add("indisponivel");
        msg.style.display = "block";
        return false;
    }

    if (total > capacidadeMax) {
        msg.textContent = `Capacidade excedida: máximo ${capacidadeMax} hóspedes.`;
        msg.classList.add("indisponivel");
        msg.style.display = "block";
        return false;
    }

    return true;
}

// ======================================================
// STEP 1 — VERIFICAR DISPONIBILIDADE
// ======================================================
const btnVerificar = document.getElementById("btnVerificar");

btnVerificar.addEventListener("click", () => {

    const checkin = document.getElementById("checkin").value;
    const checkout = document.getElementById("checkout").value;
    const msg = document.getElementById("mensagemDisponibilidade");

    msg.textContent = "";
    msg.style.display = "none";
    msg.classList.remove("disponivel", "indisponivel");

    if (!checkin || !checkout) {
        msg.textContent = "Selecione as datas de check-in e check-out.";
        msg.classList.add("indisponivel");
        msg.style.display = "block";
        return;
    }

    const dataIn = new Date(checkin);
    const dataOut = new Date(checkout);
    const hoje = new Date();

    if (dataOut <= dataIn) {
        msg.textContent = "A data de check-out deve ser posterior ao check-in.";
        msg.classList.add("indisponivel");
        msg.style.display = "block";
        return;
    }

    const noites = (dataOut - dataIn) / (1000 * 60 * 60 * 24);
    if (noites < 3) {
        msg.textContent = "O período mínimo de reserva é de 3 noites.";
        msg.classList.add("indisponivel");
        msg.style.display = "block";
        return;
    }

    const diasAntecedencia = (dataIn - hoje) / (1000 * 60 * 60 * 24);
    if (diasAntecedencia < 3) {
        msg.textContent = "A reserva deve ser feita com pelo menos 3 dias de antecedência.";
        msg.classList.add("indisponivel");
        msg.style.display = "block";
        return;
    }

    if (!validarCapacidade()) return;

    // ======================================================
    // MOTOR REAL DE DISPONIBILIDADE
    // ======================================================
    const numApt = parseInt(document.getElementById("apartments").value);
    const r = verificarDisponibilidade(checkin, checkout, numApt);

    if (!r || !r.status) {
        msg.textContent = "Erro ao verificar disponibilidade.";
        msg.classList.add("indisponivel");
        msg.style.display = "block";
        return;
    }

    if (r.status === "erro") {
        msg.textContent = "Datas inválidas.";
        msg.classList.add("indisponivel");
        msg.style.display = "block";
        return;
    }

    if (r.status === "indisponivel") {
        msg.textContent = "Não existem apartamentos disponíveis para as datas selecionadas.";
        msg.classList.add("indisponivel");
        msg.style.display = "block";
        return;
    }

    if (r.status === "parcial") {
        const disponiveis = r.apartamentos ? r.apartamentos.length : 0;

        msg.innerHTML = `
            <strong>Disponibilidade parcial</strong><br>
            Apenas ${disponiveis} apartamento(s) disponível(is).
        `;
        msg.classList.add("indisponivel");
        msg.style.display = "block";
        return;
    }

    if (r.status === "disponivel") {
        msg.textContent = "Excelente notícia! O apartamento está disponível.";
        msg.classList.add("disponivel");
        msg.style.display = "block";

        abrirStep2();
    }
});

// ======================================================
// STEP 2 — ABRIR FORMULÁRIO DE COTAÇÃO
// ======================================================
function abrirStep2() {

    const checkin = document.getElementById("checkin").value;
    const checkout = document.getElementById("checkout").value;
    const total = document.getElementById("totalHospedes").textContent;
    const apt = document.getElementById("apartments").value;

    document.getElementById("step1").style.display = "none";
    document.getElementById("step2").style.display = "block";

    document.getElementById("step2Header").innerHTML = `
        <strong>Pedido de Cotação</strong><br>
        ${checkin} → ${checkout}<br>
        ${total} hóspedes • ${apt} apartamento(s)
    `;
}

// ======================================================
// STEP 2 — VOLTAR PARA STEP 1
// ======================================================
document.getElementById("btnVoltarStep1").addEventListener("click", () => {
    document.getElementById("step2").style.display = "none";
    document.getElementById("step1").style.display = "block";
});

// ======================================================
// STEP 2 — ENVIAR PEDIDO DE COTAÇÃO
// ======================================================
document.getElementById("btnEnviarCotacao").addEventListener("click", async () => {

    const nome = document.getElementById("nomeHospede").value.trim();
    const email = document.getElementById("emailHospede").value.trim();
    const telefone = document.getElementById("telefoneHospede").value.trim();
    const pais = document.getElementById("paisHospede").value.trim();
    const obs = document.getElementById("obsHospede").value.trim();

    if (!nome || !email || !telefone || !pais) {
        alert("Por favor preencha todos os campos obrigatórios.");
        return;
    }

    // Enviar via Web3Forms
    const formData = new FormData();
    formData.append("access_key", "AQUI_A_TUA_KEY");
    formData.append("subject", "Pedido de Cotação de Reserva");
    formData.append("name", nome);
    formData.append("email", email);
    formData.append("message", `
        Pedido de cotação de reserva:
        Nome: ${nome}
        Email: ${email}
        Telefone: ${telefone}
        País: ${pais}
        Observações: ${obs}
    `);

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
}

document.getElementById("btnFecharStep3").addEventListener("click", () => {
    modal.style.display = "none";
    resetSteps();
});

// ======================================================
// RESET TOTAL DO MODAL
// ======================================================
function resetSteps() {
    document.getElementById("step1").style.display = "block";
    document.getElementById("step2").style.display = "none";
    document.getElementById("step3").style.display = "none";

    document.getElementById("mensagemDisponibilidade").textContent = "";
    document.getElementById("mensagemDisponibilidade").style.display = "none";
}
