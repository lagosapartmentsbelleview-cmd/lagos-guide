/******************************************************
 * 0) ESTADO GLOBAL
 ******************************************************/
let reservas = [];
let mesOffset = 0;

// Lista fixa de apartamentos
const apartamentos = ["2301", "2203", "2204"];

// Guardar referência global aos selects
let selectMes, selectAno;

/******************************************************
 * 1) INICIALIZAÇÃO
 ******************************************************/
window.addEventListener("load", () => {
    carregarReservas();

    // Preencher dropdown de meses
    const meses = [
        "Janeiro","Fevereiro","Março","Abril","Maio","Junho",
        "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"
    ];

    selectMes = document.getElementById("selectMes");
    meses.forEach((nome, index) => {
        const opt = document.createElement("option");
        opt.value = index;
        opt.textContent = nome;
        selectMes.appendChild(opt);
    });

    // Preencher dropdown de anos
    selectAno = document.getElementById("selectAno");
    const anoAtual = new Date().getFullYear();
    for (let a = anoAtual - 5; a <= anoAtual + 10; a++) {
        const opt = document.createElement("option");
        opt.value = a;
        opt.textContent = a;
        if (a === anoAtual) opt.selected = true;
        selectAno.appendChild(opt);
    }

    // Atualizar mês/ano quando o utilizador muda
    selectMes.onchange = () => atualizarMesAno();
    selectAno.onchange = () => atualizarMesAno();

    function atualizarMesAno() {
        const mesEscolhido = Number(selectMes.value);
        const anoEscolhido = Number(selectAno.value);

        const anoBase = new Date().getFullYear();
        const mesBase = new Date().getMonth();

        mesOffset = (anoEscolhido - anoBase) * 12 + (mesEscolhido - mesBase);
        desenharCalendario();
    }

    // Botão Hoje
    document.getElementById("btnHoje").onclick = () => {
        mesOffset = 0;
        selectMes.value = new Date().getMonth();
        selectAno.value = new Date().getFullYear();
        desenharCalendario();
    };

    // Botão Mês Atual
    document.getElementById("btnMesAtual").onclick = () => {
        mesOffset = 0;
        selectMes.value = new Date().getMonth();
        selectAno.value = new Date().getFullYear();
        desenharCalendario();
    };

    const btnMesAnterior = document.getElementById("btnMesAnterior");
    const btnMesSeguinte = document.getElementById("btnMesSeguinte");

    if (btnMesAnterior) {
        btnMesAnterior.onclick = () => {
            mesOffset--;
            desenharCalendario();
        };
    }

    if (btnMesSeguinte) {
        btnMesSeguinte.onclick = () => {
            mesOffset++;
            desenharCalendario();
        };
    }
});

/******************************************************
 * 2) FUNÇÃO AUXILIAR: PARSE DE DATAS
 ******************************************************/
function parseDataReserva(str) {
    if (!str) return null;

    // yyyy-mm-dd (ISO)
    if (str.includes("-")) {
        const [a, m, d] = str.split("-").map(Number);
        return new Date(a, m - 1, d);
    }

    // dd/mm/yyyy (PT)
    if (str.includes("/")) {
        const [d, m, a] = str.split("/").map(Number);
        return new Date(a, m - 1, d);
    }

    return null;
}

/******************************************************
 * 3) CARREGAR RESERVAS DO FIRESTORE
 ******************************************************/
function carregarReservas() {
    db.collection("calendario")
        .orderBy("checkin")
        .onSnapshot(snapshot => {
            reservas = [];
            snapshot.forEach(doc => reservas.push({ id: doc.id, ...doc.data() }));
            desenharCalendario();
        });
}

/******************************************************
 * 4) DESENHAR CALENDÁRIO
 ******************************************************/
function desenharCalendario() {

    const tabela = document.getElementById("tabelaCalendario");
    const tituloMesEl = document.getElementById("tituloMes");

    if (!tabela || !tituloMesEl) {
        console.error("Elementos do calendário em falta (tabelaCalendario ou tituloMes).");
        return;
    }

    tabela.innerHTML = "";

    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = hoje.getMonth() + mesOffset;

    const dataBase = new Date(ano, mes, 1);
    const mesAtual = dataBase.getMonth();
    const anoAtual = dataBase.getFullYear();

    const nomeMes = dataBase.toLocaleString("pt-PT", { month: "long" });

    // Sincronizar dropdowns com o calendário (agora com variáveis globais)
    if (selectMes && selectAno) {
        selectMes.value = mesAtual;
        selectAno.value = anoAtual;
    }

    tituloMesEl.textContent = `${nomeMes.toUpperCase()} ${anoAtual}`;

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
 * 5) DESENHAR RESERVAS NO CALENDÁRIO
 ******************************************************/
function desenharReservas(mes, anoAtual) {

    reservas.forEach(r => {

        const listaAps = Array.isArray(r.apartamentos) ? r.apartamentos : [];

        const dataInicio = parseDataReserva(r.checkin);
        const dataFim = parseDataReserva(r.checkout);

        if (!dataInicio || !dataFim) return;

        listaAps.forEach(ap => {

            for (let dt = new Date(dataInicio); dt <= dataFim; dt.setDate(dt.getDate() + 1)) {

                if (dt.getMonth() !== mes || dt.getFullYear() !== anoAtual) continue;

                const dia = dt.getDate();
                const cel = document.getElementById(`cel-${ap}-${dia}`);
                if (!cel) continue;

                const div = document.createElement("div");
                div.classList.add("reserva");

                const dataStr = `${String(dia).padStart(2, "0")}/${String(mes + 1).padStart(2, "0")}/${anoAtual}`;

                const checkinPt = dataInicio.toLocaleDateString("pt-PT");
                const checkoutPt = dataFim.toLocaleDateString("pt-PT");

                const isCheckin = dataStr === checkinPt;
                const isCheckout = dataStr === checkoutPt;

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
    });
}

/******************************************************
 * 6) COR POR ORIGEM
 ******************************************************/
function corPorOrigem(origem) {
    switch ((origem || "").toLowerCase()) {
        case "booking":     return "#1E88E5";
        case "airbnb":      return "#EC407A";
        case "vrbo":        return "#8E24AA";
        case "particular":  return "#43A047";
        case "expedia":     return "#F57C00";
        case "agoda":       return "#009688";
        case "hotels":      return "#D32F2F";
        case "trip":        return "#0277BD";
        case "manual":      return "#757575";
        default:            return "#757575";
    }
}
