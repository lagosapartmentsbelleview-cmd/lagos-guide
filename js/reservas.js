// =======================================
// 1) FIRESTORE – CARREGAR RESERVAS
// =======================================

let reservas = [];
let reservaAtual = null;

async function carregarReservas() {
    reservas = [];

    const snap = await db.collection("reservas").get();
    snap.forEach(doc => {
        reservas.push({ id: doc.id, ...doc.data() });
    });

    desenharCalendario();
}

// =======================================
// 2) GUARDAR / EDITAR / APAGAR RESERVAS
// =======================================

async function guardarReserva() {
    const cliente = document.getElementById("cliente").value;
    const checkin = document.getElementById("checkin").value;
    const checkout = document.getElementById("checkout").value;
    const precoNoite = Number(document.getElementById("precoNoite").value);
    const totalBruto = Number(document.getElementById("totalBruto").value);
    const comissao = Number(document.getElementById("comissao").value);
    const liquido = Number(document.getElementById("liquido").value);

    const apartamento = escolherApartamento(checkin, checkout);

    if (!apartamento) {
        alert("Nenhum apartamento disponível para estas datas.");
        return;
    }

    const dados = {
        cliente,
        checkin,
        checkout,
        precoNoite,
        totalBruto,
        comissao,
        liquido,
        apartamento
    };

    if (reservaAtual) {
        await db.collection("reservas").doc(reservaAtual.id).update(dados);
    } else {
        await db.collection("reservas").add(dados);
    }

    document.getElementById("modalReserva").style.display = "none";
    carregarReservas();
}

async function apagarReserva() {
    if (!reservaAtual) return;

    if (confirm("Tem a certeza que deseja apagar esta reserva?")) {
        await db.collection("reservas").doc(reservaAtual.id).delete();
        document.getElementById("modalDetalhes").style.display = "none";
        carregarReservas();
    }
}

// =======================================
// 3) LÓGICA DE ALOCAÇÃO AUTOMÁTICA
// =======================================

function haConflito(ci, co, r) {
    return !(co <= r.checkin || ci >= r.checkout);
}

function escolherApartamento(checkin, checkout) {
    const ci = new Date(checkin);
    const co = new Date(checkout);

    // 1) PRIORIDADE: back-to-back no mesmo apartamento
    for (let apt = 1; apt <= 3; apt++) {
        const reservasApt = reservas.filter(r => r.apartamento === apt);

        const temBackToBack = reservasApt.some(r => {
            const rco = new Date(r.checkout);
            return rco.getTime() === ci.getTime();
        });

        if (temBackToBack) {
            const conflito = reservasApt.some(r => haConflito(checkin, checkout, r));
            if (!conflito) return apt;
        }
    }

    // 2) Depois: qualquer apartamento livre
    for (let apt = 1; apt <= 3; apt++) {
        const conflito = reservas.some(r =>
            r.apartamento === apt && haConflito(checkin, checkout, r)
        );
        if (!conflito) return apt;
    }

    return null;
}

// =======================================
// 4) DESENHAR CALENDÁRIO (3 LINHAS POR APARTAMENTO)
// =======================================

function desenharCalendario() {
    const calendar = document.getElementById("calendar");
    calendar.innerHTML = "";

    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = hoje.getMonth();

    const primeiroDia = new Date(ano, mes, 1);
    const ultimoDia = new Date(ano, mes + 1, 0);
    const totalDias = ultimoDia.getDate();

    const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    diasSemana.forEach(d => {
        const div = document.createElement("div");
        div.textContent = d;
        div.style.fontWeight = "bold";
        div.style.textAlign = "center";
        calendar.appendChild(div);
    });

    for (let i = 0; i < primeiroDia.getDay(); i++) {
        const empty = document.createElement("div");
        calendar.appendChild(empty);
    }

    for (let dia = 1; dia <= totalDias; dia++) {
        const div = document.createElement("div");
        div.className = "day";

        const numero = document.createElement("div");
        numero.className = "day-number";
        numero.textContent = dia;
        div.appendChild(numero);

        const dataStr = `${ano}-${String(mes + 1).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;

        // Criar 3 linhas fixas
        const linha1 = document.createElement("div");
        linha1.className = "linha-apartamento apt1-linha";

        const linha2 = document.createElement("div");
        linha2.className = "linha-apartamento apt2-linha";

        const linha3 = document.createElement("div");
        linha3.className = "linha-apartamento apt3-linha";

        div.appendChild(linha1);
        div.appendChild(linha2);
        div.appendChild(linha3);

        // Reservas deste dia
        const reservasDia = reservas.filter(r =>
            dataStr >= r.checkin && dataStr <= r.checkout
        );

        // Processar por apartamento
        [1,2,3].forEach(apt => {
            const linha = div.querySelector(`.apt${apt}-linha`);
            const reservasApt = reservasDia.filter(r => r.apartamento === apt);

            if (reservasApt.length === 0) return;

            const temCheckin = reservasApt.some(r => r.checkin === dataStr);
            const temCheckout = reservasApt.some(r => r.checkout === dataStr);

            const dividir = temCheckin && temCheckout;

            if (dividir) linha.classList.add("dividido");

            reservasApt.forEach(r => {
                let tipo = "full";

                if (dividir) {
                    if (r.checkin === dataStr) tipo = "start";
                    if (r.checkout === dataStr) tipo = "end";
                }

                const resDiv = document.createElement("div");
                resDiv.className = `reserva reserva-${tipo} apt${apt}`;
                resDiv.textContent = r.cliente;

                resDiv.onclick = (e) => {
                    e.stopPropagation();
                    abrirDetalhes(r);
                };

                linha.appendChild(resDiv);
            });
        });

        div.onclick = () => {
            reservaAtual = null;
            document.getElementById("tituloModal").textContent = "Nova Reserva";
            document.getElementById("checkin").value = dataStr;
            document.getElementById("modalReserva").style.display = "flex";
        };

        calendar.appendChild(div);
    }
}

// =======================================
// INICIAR
// =======================================

document.addEventListener("DOMContentLoaded", carregarReservas);
