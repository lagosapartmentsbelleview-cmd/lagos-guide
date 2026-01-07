// =======================================
// 1) FIRESTORE – CARREGAR RESERVAS
// =======================================
let mesOffset = 0;
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
    const totalBruto = Number(document.getElementById("total_bruto").value);
    const comissao = Number(document.getElementById("comissao_ota").value);
    const precoNoite = Number(document.getElementById("preco_noite").value);
    const liquido = Number(document.getElementById("liquido").value);

    const apartamentoManual = document.getElementById("apartamento_manual").value;

    let apartamento = null;
    if (apartamentoManual === "auto") {
        apartamento = escolherApartamento(checkin, checkout);
    } else {
        apartamento = Number(apartamentoManual);
    }

    if (!apartamento) {
        alert("Nenhum apartamento disponível para estas datas.");
        return;
    }

    const dados = {
        cliente,
        checkin,
        checkout,
        totalBruto,
        comissao,
        precoNoite,
        liquido,
        apartamento
    };

    if (reservaAtual && reservaAtual.id) {
        await db.collection("reservas").doc(reservaAtual.id).update(dados);
    } else {
        await db.collection("reservas").add(dados);
    }

    document.getElementById("modalReserva").style.display = "none";
    carregarReservas();
}

async function apagarReserva() {
    if (!reservaAtual || !reservaAtual.id) return;

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
    const mesData = new Date(hoje.getFullYear(), hoje.getMonth() + mesOffset, 1);
    const ano = mesData.getFullYear();
    const mes = mesData.getMonth();

    const nomeMeses = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
    document.getElementById("mesAtual").textContent = `${nomeMeses[mes]} ${ano}`;

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

        const linha1 = document.createElement("div");
        linha1.className = "linha-apartamento apt1-linha";

        const linha2 = document.createElement("div");
        linha2.className = "linha-apartamento apt2-linha";

        const linha3 = document.createElement("div");
        linha3.className = "linha-apartamento apt3-linha";

        div.appendChild(linha1);
        div.appendChild(linha2);
        div.appendChild(linha3);

        // checkout NÃO ocupa o dia
        const reservasDia = reservas.filter(r =>
            dataStr >= r.checkin && dataStr < r.checkout
        );

        const aptMap = { 1: "2301", 2: "2203", 3: "2204" };

        [1,2,3].forEach(apt => {
            const linha = div.querySelector(`.apt${apt}-linha`);
            const reservasApt = reservasDia.filter(r => r.apartamento === apt);

            if (reservasApt.length === 0) return;

            reservasApt.forEach(r => {
                let tipo = "full";

                if (r.checkin === dataStr && r.checkout === dataStr) {
                    tipo = "full";
                } else if (r.checkin === dataStr) {
                    tipo = "start";
                } else if (r.checkout === dataStr) {
                    tipo = "end";
                }

                const resDiv = document.createElement("div");
                resDiv.className = `reserva reserva-${tipo} apt${apt}`;

                const nomeApt = aptMap[r.apartamento];

                resDiv.setAttribute(
                    "data-tooltip",
                    `${r.cliente}\nApt ${nomeApt}\n${r.checkin} → ${r.checkout}\nLíquido: €${r.liquido}`
                );

                resDiv.onclick = (e) => {
                    e.stopPropagation();
                    abrirDetalhes(r);
                };

                linha.appendChild(resDiv);
            });
        }); // ← ESTE FECHO É O QUE FALTAVA

        div.onclick = () => {
            reservaAtual = null;
            document.getElementById("tituloModal").textContent = "Nova Reserva";
            document.getElementById("cliente").value = "";
            document.getElementById("checkin").value = dataStr;
            document.getElementById("checkout").value = "";
            document.getElementById("total_bruto").value = "";
            document.getElementById("comissao_ota").value = "";
            document.getElementById("preco_noite").value = "";
            document.getElementById("liquido").value = "";
            document.getElementById("apartamento_manual").value = "auto";
            document.getElementById("modalReserva").style.display = "flex";
        };

        calendar.appendChild(div);
    }
}

// =======================================
// 5) DETALHES / EDITAR / CRUD
// =======================================

function abrirDetalhes(r) {
    reservaAtual = r;

    const aptMap = { 1: "2301", 2: "2203", 3: "2204" };

    const html = `
        <p><strong>Hóspede:</strong> ${r.cliente}</p>
        <p><strong>Check-in:</strong> ${r.checkin}</p>
        <p><strong>Check-out:</strong> ${r.checkout}</p>
        <p><strong>Apartamento:</strong> ${aptMap[r.apartamento]}</p>
        <p><strong>Total Bruto:</strong> €${r.totalBruto}</p>
        <p><strong>Comissão:</strong> €${r.comissao}</p>
        <p><strong>Preço/noite:</strong> €${r.precoNoite}</p>
        <p><strong>Líquido:</strong> €${r.liquido}</p>
        <button onclick="editarReserva()">Editar</button>
        <button onclick="apagarReserva()">Apagar</button>
    `;

    document.getElementById("detalhesConteudo").innerHTML = html;
    document.getElementById("modalDetalhes").style.display = "flex";
}

function editarReserva() {
    const r = reservaAtual;
    if (!r) return;

    document.getElementById("cliente").value = r.cliente;
    document.getElementById("checkin").value = r.checkin;
    document.getElementById("checkout").value = r.checkout;
    document.getElementById("total_bruto").value = r.totalBruto;
    document.getElementById("comissao_ota").value = r.comissao;
    document.getElementById("preco_noite").value = r.precoNoite;
    document.getElementById("liquido").value = r.liquido;

    document.getElementById("modalDetalhes").style.display = "none";
    document.getElementById("modalReserva").style.display = "flex";
}

// =======================================
// 6) CÁLCULOS AUTOMÁTICOS
// =======================================

function calcularValores() {
    const checkin = document.getElementById("checkin").value;
    const checkout = document.getElementById("checkout").value;
    const totalBruto = Number(document.getElementById("total_bruto").value);
    const comissao = Number(document.getElementById("comissao_ota").value);

    let noites = 0;
    if (checkin && checkout) {
        const ci = new Date(checkin);
        const co = new Date(checkout);
        noites = (co - ci) / (1000 * 60 * 60 * 24);
        if (noites < 0) noites = 0;
    }

    let precoNoite = 0;
    if (noites > 0 && totalBruto > 0) {
        precoNoite = totalBruto / noites;
    }

    const liquido = totalBruto - comissao;

    document.getElementById("preco_noite").value = precoNoite ? precoNoite.toFixed(2) : "";
    document.getElementById("liquido").value = liquido ? liquido.toFixed(2) : "";
}

document.getElementById("checkin").addEventListener("change", calcularValores);
document.getElementById("checkout").addEventListener("change", calcularValores);
document.getElementById("total_bruto").addEventListener("input", calcularValores);
document.getElementById("comissao_ota").addEventListener("input", calcularValores);

// =======================================
// 7) EVENTOS DE INTERFACE
// =======================================

document.addEventListener("DOMContentLoaded", carregarReservas);

document.getElementById("btnNovaReserva").onclick = () => {
    reservaAtual = null;
    document.getElementById("tituloModal").textContent = "Nova Reserva";
    document.getElementById("cliente").value = "";
    document.getElementById("checkin").value = "";
    document.getElementById("checkout").value = "";
    document.getElementById("total_bruto").value = "";
    document.getElementById("comissao_ota").value = "";
    document.getElementById("preco_noite").value = "";
    document.getElementById("liquido").value = "";
    document.getElementById("apartamento_manual").value = "auto";
    document.getElementById("modalReserva").style.display = "flex";
};

document.getElementById("closeReserva").onclick = () => {
    document.getElementById("modalReserva").style.display = "none";
};

document.getElementById("closeDetalhes").onclick = () => {
    document.getElementById("modalDetalhes").style.display = "none";
};

function mudarMes(delta) {
    mesOffset += delta;
    desenharCalendario();
}

document.getElementById("guardarReserva").onclick = guardarReserva;
