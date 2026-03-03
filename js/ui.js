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

    // Limpa mensagens anteriores
    msg.textContent = "";
    msg.style.display = "none";
    msg.classList.remove("disponivel", "indisponivel");

    if (total > capacidadeMax) {
        msg.textContent = "Número de hóspedes excede a capacidade máxima permitida.";
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

    // 1) Validar capacidade primeiro
    if (!validarCapacidade()) {
        return; // Se exceder, não continua
    }

    const checkin = document.getElementById("checkin").value;
    const checkout = document.getElementById("checkout").value;
    const numApt = parseInt(document.getElementById("apartments").value);
    const msg = document.getElementById("mensagemDisponibilidade");

    // Limpar mensagens anteriores
    msg.textContent = "";
    msg.style.display = "none";
    msg.classList.remove("disponivel", "indisponivel");

    // 2) Chamar o motor antigo
    const r = verificarDisponibilidade(checkin, checkout, numApt);

    // 3) Interpretar o resultado
    if (r.status === "erro") {
        msg.textContent = "Datas inválidas.";
        msg.classList.add("indisponivel");
        msg.style.display = "block";
        return;
    }

    if (r.status === "indisponivel") {
        msg.textContent = "Não há apartamentos disponíveis neste intervalo.";
        msg.classList.add("indisponivel");
        msg.style.display = "block";
        return;
    }

    if (r.status === "parcial") {
        msg.innerHTML = `
            <strong>Disponibilidade parcial</strong><br>
            Apenas ${r.apartamentos.length} disponível(is):<br>
            ${r.apartamentos.join(", ")}
        `;
        msg.classList.add("disponivel");
        msg.style.display = "block";
        return;
    }

    if (r.status === "disponivel") {
        msg.innerHTML = `
            <strong>Datas disponíveis!</strong><br>
            Apartamentos atribuídos:<br>
            ${r.apartamentos.join(", ")}
        `;
        msg.classList.add("disponivel");
        msg.style.display = "block";

        // Aqui no Passo 6 vamos ativar o botão "Continuar Reserva"
        return;
    }
});


