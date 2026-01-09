/******************************************************
 * 0) ESTADO GLOBAL
 ******************************************************/
let reservas = [];
let mesOffset = 0;

const apartamentos = ["2301", "2203", "2204"];


/******************************************************
 * 1) INICIALIZAÇÃO
 ******************************************************/
window.addEventListener("load", () => {
    carregarReservas();

    document.getElementById("btnIrListagem").onclick = () => {
    window.location.href = "listagem-reservas.html";
};


    document.getElementById("btnMesAnterior").onclick = () => {
        mesOffset--;
        desenharCalendario();
    };

    document.getElementById("btnMesSeguinte").onclick = () => {
        mesOffset++;
        desenharCalendario();
    };
});


/******************************************************
 * 2) CARREGAR RESERVAS DO FIRESTORE
 ******************************************************/
async function carregarReservas() {
    const snap = await db.collection("reservas").get();

    reservas = [];
    snap.forEach(doc => reservas.push({ id: doc.id, ...doc.data() }));

    desenharCalendario();
}


/******************************************************
 * 3) DESENHAR CALENDÁRIO
 ******************************************************/
function desenharCalendario() {

    const tabela = document.getElementById("tabelaCalendario");
    tabela.innerHTML = "";

    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = hoje.getMonth() + mesOffset;

    const dataBase = new Date(ano, mes, 1);
    const mesAtual = dataBase.getMonth();
    const anoAtual = dataBase.getFullYear();

    const nomeMes = dataBase.toLocaleString("pt-PT", { month: "long" });
    document.getElementById("tituloMes").textContent =
        `${nomeMes.toUpperCase()} ${anoAtual}`;

    const diasNoMes = new Date(anoAtual, mesAtual + 1, 0).getDate();

    // Cabeçalho
    let thead = "<tr><th>Apt</th>";
    for (let d = 1; d <= diasNoMes; d++) {
        thead += `<th>${d}</th>`;
    }
    thead += "</tr>";
    tabela.innerHTML += thead;

    // Linhas dos apartamentos
    apartamentos.forEach(ap => {
        let tr = `<tr><td>${ap}</td>`;

        for (let dia = 1; dia <= diasNoMes; dia++) {
            tr += `<td class="dia-celula" id="cel-${ap}-${dia}"></td>`;
        }

        tr += "</tr>";
        tabela.innerHTML += tr;
    });

    desenharReservas(mesAtual, anoAtual);
}


/******************************************************
 * 4) DESENHAR RESERVAS NO CALENDÁRIO
 ******************************************************/
function desenharReservas(mes, ano) {

    reservas.forEach(r => {

        const [d1, m1, a1] = r.checkin.split("/").map(Number);
        const [d2, m2, a2] = r.checkout.split("/").map(Number);

        if (m1 - 1 !== mes && m2 - 1 !== mes) return;

        const inicio = new Date(a1, m1 - 1, d1);
        const fim = new Date(a2, m2 - 1, d2);

        for (let dt = new Date(inicio); dt <= fim; dt.setDate(dt.getDate() + 1)) {

            if (dt.getMonth() !== mes) continue;

            const dia = dt.getDate();
            const cel = document.getElementById(`cel-${r.apartamento}-${dia}`);
            if (!cel) continue;

            const div = document.createElement("div");
            div.classList.add("reserva");

            const dataStr = `${String(dia).padStart(2, "0")}/${String(mes + 1).padStart(2, "0")}/${ano}`;

            const isCheckin = dataStr === r.checkin;
            const isCheckout = dataStr === r.checkout;

            if (isCheckin && isCheckout) div.classList.add("reserva-unica");
            else if (isCheckin) div.classList.add("reserva-inicio");
            else if (isCheckout) div.classList.add("reserva-fim");
            else div.classList.add("reserva-meio");

            div.style.backgroundColor = corPorOrigem(r.origem);
            div.textContent = r.cliente;

            div.onclick = () => {
                window.location.href = "listagem-reservas.html?id=" + r.id;
            };

            cel.appendChild(div);
        }
    });
}


/******************************************************
 * 5) COR POR ORIGEM
 ******************************************************/
function corPorOrigem(origem) {
    switch ((origem || "").toLowerCase()) {
        case "booking": return "#1E88E5";
        case "airbnb": return "#EC407A";
        case "vrbo": return "#8E24AA";
        case "particular": return "#43A047";
        default: return "#757575";
    }
}

