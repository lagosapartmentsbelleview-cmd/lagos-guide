// ------------------------------
// ABRIR E FECHAR MODAL
// ------------------------------
const modal = document.getElementById("modal");
const btnFlutuante = document.getElementById("btnFlutuante");
const fecharModal = document.getElementById("fecharModal");

// Abrir modal
btnFlutuante.addEventListener("click", () => {
    modal.style.display = "flex";
});

// Fechar modal
fecharModal.addEventListener("click", () => {
    modal.style.display = "none";
});

// Fechar ao clicar fora da caixa
modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

// ------------------------------
// TOTAL DE HÓSPEDES
// ------------------------------
function atualizarTotalHospedes() {
    const adultos = parseInt(document.getElementById("adults").value);
    const criancas = parseInt(document.getElementById("children").value);
    const bebes = parseInt(document.getElementById("babies").value);

    const total = adultos + criancas + bebes;

    document.getElementById("totalHospedes").textContent = total;

    return total;
}

// Atualizar sempre que o utilizador muda um valor
["adults", "children", "babies"].forEach(id => {
    document.getElementById(id).addEventListener("change", atualizarTotalHospedes);
});

// Atualizar ao abrir o modal
atualizarTotalHospedes();

// ------------------------------
// VALIDAÇÃO DA CAPACIDADE
// ------------------------------
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

    // Regra 1: Pelo menos 1 adulto por apartamento
    if (adultos < apartamentos) {
        msg.textContent = `Cada apartamento precisa de pelo menos 1 adulto. Para ${apartamentos} apartamento(s), são necessários ${apartamentos} adulto(s).`;
        msg.classList.add("indisponivel");
        msg.style.display = "block";
        return false;
    }

    // Regra 2: Capacidade máxima total
    if (total > capacidadeMax) {
        msg.textContent = `Capacidade excedida: máximo ${capacidadeMax} hóspedes para ${apartamentos} apartamento(s).`;
        msg.classList.add("indisponivel");
        msg.style.display = "block";
        return false;
    }

    return true;
}

// ------------------------------
// PASSO 5 — VERIFICAR DISPONIBILIDADE
// ------------------------------
document.getElementById("confirmarReserva").addEventListener("click", () => {

    const checkin = document.getElementById("checkin").value;
    const checkout = document.getElementById("checkout").value;
    const numApt = parseInt(document.getElementById("apartments").value);
    const msg = document.getElementById("mensagemDisponibilidade");

    // Limpar mensagens anteriores
    msg.textContent = "";
    msg.style.display = "none";
    msg.classList.remove("disponivel", "indisponivel");

    // Se faltar alguma data, nem continua
    if (!checkin || !checkout) {
        msg.textContent = "Selecione as datas de check-in e check-out.";
        msg.classList.add("indisponivel");
        msg.style.display = "block";
        return;
    }

    // Converter datas
    const dataIn = new Date(checkin);
    const dataOut = new Date(checkout);
    const hoje = new Date();

    // 1) Check-out > Check-in
    if (dataOut <= dataIn) {
        msg.textContent = "A data de check-out tem de ser posterior à data de check-in.";
        msg.classList.add("indisponivel");
        msg.style.display = "block";
        return;
    }

    // 2) Mínimo 3 noites
    const noites = (dataOut - dataIn) / (1000 * 60 * 60 * 24);
    if (noites < 3) {
        msg.textContent = "O período mínimo de reserva é de 3 noites.";
        msg.classList.add("indisponivel");
        msg.style.display = "block";
        return;
    }

    // 3) Antecedência mínima de 3 dias
    const diasAntecedencia = (dataIn - hoje) / (1000 * 60 * 60 * 24);
    if (diasAntecedencia < 3) {
        msg.textContent = "A reserva deve ser feita com pelo menos 3 dias de antecedência em relação ao check-in.";
        msg.classList.add("indisponivel");
        msg.style.display = "block";
        return;
    }

    // 4) Validar capacidade (adultos / crianças / bebés / apartamentos)
    if (!validarCapacidade()) {
        return; // Se exceder, não continua
    }

    // 5) Chamar o motor de disponibilidade
    const r = verificarDisponibilidade(checkin, checkout, numApt);

    // 6) Interpretar o resultado
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
        msg.innerHTML = `
            <strong>Disponibilidade parcial</strong><br>
            Apenas ${r.apartamentos.length} Apartamento disponível(is).
        `;
        msg.classList.add("indisponivel");
        msg.style.display = "block";
        return;
    }

    if (r.status === "disponivel") {
        msg.innerHTML = `
            <strong>Apartamento com datas disponíveis.</strong>
        `;
        msg.classList.add("disponivel");
        msg.style.display = "block";
        return;
    }

});




