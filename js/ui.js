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
// FUNÇÃO PARA CALCULAR PREÇO DO SITE
// ------------------------------
async function obterPrecoSite(checkin, checkout) {
    const dataIn = new Date(checkin);
    const dataOut = new Date(checkout);

    const dias = [];
    let atual = new Date(dataIn);

    while (atual < dataOut) {
        const ano = atual.getFullYear();
        const mes = String(atual.getMonth() + 1).padStart(2, "0");
        const dia = String(atual.getDate()).padStart(2, "0");
        dias.push(`${ano}-${mes}-${dia}`);
        atual.setDate(atual.getDate() + 1);
    }

    let total = 0;
    let noites = dias.length;

    for (const dataISO of dias) {
        const doc = await db.collection("precos_site").doc(dataISO).get();

        if (!doc.exists) {
            return {
                status: "erro",
                mensagem: `Não existe preço definido para ${dataISO}.`
            };
        }

        const d = doc.data();

        if (!d.aberto) {
            return {
                status: "fechado",
                mensagem: `O dia ${dataISO} está fechado para reservas.`
            };
        }

        if (d.precoSite === null || d.precoSite === undefined) {
            return {
                status: "erro",
                mensagem: `O dia ${dataISO} não tem preço definido.`
            };
        }

        total += Number(d.precoSite);
    }

    return {
        status: "ok",
        total,
        noites,
        precoNoite: total / noites
    };
}

// ------------------------------
// PASSO 5 — VERIFICAR DISPONIBILIDADE
// ------------------------------
const btnConfirmar = document.getElementById("confirmarReserva");

if (btnConfirmar) {
    btnConfirmar.addEventListener("click", async () => {

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

        // 4) Validar capacidade
        if (!validarCapacidade()) {
            return;
        }

        // 5) Motor de disponibilidade
        const r = verificarDisponibilidade(checkin, checkout, numApt);

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

// 7) Calcular preço do site
const preco = await obterPrecoSite(checkin, checkout);

if (preco.status !== "ok") {
    msg.textContent = preco.mensagem;
    msg.classList.add("indisponivel");
    msg.style.display = "block";

    // Esconder formulário se houver erro
    document.getElementById("formReserva").style.display = "none";
    return;
}

// Multiplicar pelo número de apartamentos
const totalFinal = preco.total * numApt;

// Mostrar preço ao utilizador
msg.innerHTML = `
    <strong>Datas disponíveis.</strong><br>
    Noites: ${preco.noites}<br>
    Apartamentos: ${numApt}<br>
    Preço por apartamento: ${preco.total.toFixed(2)} €<br>
    <strong>Preço total: ${totalFinal.toFixed(2)} €</strong>
`;

msg.classList.add("disponivel");
msg.style.display = "block";

// 👉 PASSO 6: Mostrar formulário de dados do hóspede
document.getElementById("formReserva").style.display = "block";

return;
    });
}   // fecha o if(btnConfirmar)

// PASSO 6 — LIGAR BOTÃO "FINALIZAR RESERVA"
const btnFinalizar = document.getElementById("btnFinalizarReserva");

if (btnFinalizar) {
    btnFinalizar.addEventListener("click", () => {

        const nome = document.getElementById("nomeHospede").value.trim();
        const email = document.getElementById("emailHospede").value.trim();
        const telefone = document.getElementById("telefoneHospede").value.trim();
        const pais = document.getElementById("paisHospede").value.trim();
        const obs = document.getElementById("obsHospede").value.trim();

        if (!nome || !email || !telefone || !pais) {
            alert("Por favor preencha todos os campos obrigatórios.");
            return;
        }

        console.log("Dados do hóspede:", { nome, email, telefone, pais, obs });

        // 👉 PASSO 7: Aqui vamos gravar no Firestore
    });
}

