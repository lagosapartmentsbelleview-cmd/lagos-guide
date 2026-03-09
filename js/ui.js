// ======================================================
// ABRIR E FECHAR MODAL
// ======================================================
const modal = document.getElementById("modal");
const btnFlutuante = document.getElementById("btnFlutuante");
const fecharModal = document.getElementById("fecharModal");

btnFlutuante.addEventListener("click", () => {
    modal.style.display = "flex";
    btnFlutuante.classList.add("hidden"); // esconde o botão
    resetSteps();
});


fecharModal.addEventListener("click", () => {
    modal.style.display = "none";
    btnFlutuante.classList.remove("hidden"); // volta a mostrar o botão
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
const PAISES_INDICATIVOS = [
    { nome: "Portugal", codigo: "+351" },
    { nome: "Brasil", codigo: "+55" },
    { nome: "Espanha", codigo: "+34" },
    { nome: "França", codigo: "+33" },
    { nome: "Alemanha", codigo: "+49" },
    { nome: "Reino Unido", codigo: "+44" },
    { nome: "Irlanda", codigo: "+353" },
    { nome: "Itália", codigo: "+39" },
    { nome: "Suíça", codigo: "+41" },
    { nome: "Luxemburgo", codigo: "+352" },
    { nome: "Holanda", codigo: "+31" },
    { nome: "Bélgica", codigo: "+32" },
    { nome: "Áustria", codigo: "+43" },
    { nome: "Polónia", codigo: "+48" },
    { nome: "Roménia", codigo: "+40" },
    { nome: "Suécia", codigo: "+46" },
    { nome: "Noruega", codigo: "+47" },
    { nome: "Dinamarca", codigo: "+45" },
    { nome: "Finlândia", codigo: "+358" },
    { nome: "Estados Unidos", codigo: "+1" },
    { nome: "Canadá", codigo: "+1" },
    { nome: "México", codigo: "+52" },
    { nome: "Argentina", codigo: "+54" },
    { nome: "Chile", codigo: "+56" },
    { nome: "Uruguai", codigo: "+598" },
    { nome: "Angola", codigo: "+244" },
    { nome: "Moçambique", codigo: "+258" },
    { nome: "Cabo Verde", codigo: "+238" },
    { nome: "Guiné-Bissau", codigo: "+245" },
    { nome: "São Tomé e Príncipe", codigo: "+239" },
    { nome: "Timor-Leste", codigo: "+670" },
    { nome: "Emirados Árabes Unidos", codigo: "+971" },
    { nome: "Turquia", codigo: "+90" },
    { nome: "Grécia", codigo: "+30" },
    { nome: "Croácia", codigo: "+385" },
    { nome: "República Checa", codigo: "+420" },
    { nome: "Hungria", codigo: "+36" },
    { nome: "Bulgária", codigo: "+359" },
    { nome: "Islândia", codigo: "+354" },
    { nome: "Japão", codigo: "+81" },
    { nome: "China", codigo: "+86" },
    { nome: "Austrália", codigo: "+61" },
    { nome: "Nova Zelândia", codigo: "+64" },
    { nome: "África do Sul", codigo: "+27" },
    { nome: "Marrocos", codigo: "+212" },
    { nome: "Tunísia", codigo: "+216" },
    { nome: "Egito", codigo: "+20" }
];

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

    // MOTOR REAL DE DISPONIBILIDADE
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

    updateProgress(2);
}

// ======================================================
// STEP 2 — VOLTAR PARA STEP 1
// ======================================================
document.getElementById("btnVoltarStep1").addEventListener("click", () => {
    document.getElementById("step2").style.display = "none";
    document.getElementById("step1").style.display = "block";
    updateProgress(1);
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
    updateProgress(3);
}

document.getElementById("btnFecharStep3").addEventListener("click", () => {
    modal.style.display = "none";
    btnFlutuante.classList.remove("hidden");
    resetSteps();
});


// ======================================================
// BARRA DE PROGRESSO — ATUALIZAR
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
// POPULAR SELECTS DE PAÍS E INDICATIVO
// ======================================================
window.addEventListener("DOMContentLoaded", () => {
    const paisSelect = document.getElementById("paisHospede");
    const indicativoSelect = document.getElementById("indicativoHospede");

    if (!paisSelect || !indicativoSelect) return;

    paisSelect.innerHTML = `<option value="">Selecione o país</option>`;
    indicativoSelect.innerHTML = `<option value="">Indicativo</option>`;

    PAISES_INDICATIVOS.forEach(p => {
        const o1 = document.createElement("option");
        o1.value = p.nome;
        o1.textContent = p.nome;
        paisSelect.appendChild(o1);

        const o2 = document.createElement("option");
        o2.value = p.codigo;
        o2.textContent = `${p.codigo} (${p.nome})`;
        indicativoSelect.appendChild(o2);
    });
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

    updateProgress(1);
}
