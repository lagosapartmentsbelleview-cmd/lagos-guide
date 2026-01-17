/******************************************************
 * 0) ESTADO GLOBAL
 ******************************************************/
let reservas = [];
let mesOffset = 0;

// Lista fixa de apartamentos
const apartamentos = ["2301", "2203", "2204"];

// Referências globais
let selectMes, selectAno;

// Capturar posição do rato para tooltip flutuante
document.addEventListener("mousemove", e => {
    document.documentElement.style.setProperty("--mouse-x", e.clientX + "px");
    document.documentElement.style.setProperty("--mouse-y", e.clientY + "px");
});


/******************************************************
 * 1) INICIALIZAÇÃO
 ******************************************************/
window.addEventListener("load", () => {

    carregarReservas();
    inicializarDropdowns();
    ligarEventosNavegacao();

    console.log("✔ Calendário inicializado");
});


/******************************************************
 * 2) DROPDOWNS DE MÊS E ANO
 ******************************************************/
function inicializarDropdowns() {

    const meses = [
        "Janeiro","Fevereiro","Março","Abril","Maio","Junho",
        "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"
    ];

    selectMes = document.getElementById("selectMes");
    selectAno = document.getElementById("selectAno");

    // Preencher meses
    meses.forEach((nome, index) => {
        const opt = document.createElement("option");
        opt.value = index;
        opt.textContent = nome;
        selectMes.appendChild(opt);
    });

    // Preencher anos
    const anoAtual = new Date().getFullYear();
    for (let a = anoAtual - 5; a <= anoAtual + 10; a++) {
        const opt = document.createElement("option");
        opt.value = a;
        opt.textContent = a;
        if (a === anoAtual) opt.selected = true;
        selectAno.appendChild(opt);
    }

    // Eventos
    selectMes.onchange = atualizarMesAno;
    selectAno.onchange = atualizarMesAno;
}

function atualizarMesAno() {
    const mesEscolhido = Number(selectMes.value);
    const anoEscolhido = Number(selectAno.value);

    const anoBase = new Date().getFullYear();
    const mesBase = new Date().getMonth();

    mesOffset = (anoEscolhido - anoBase) * 12 + (mesEscolhido - mesBase);
    desenharCalendario();
}


/******************************************************
 * 3) EVENTOS DE NAVEGAÇÃO
 ******************************************************/
function ligarEventosNavegacao() {

    document.getElementById("btnHoje").onclick = () => {
        mesOffset = 0;
        selectMes.value = new Date().getMonth();
        selectAno.value = new Date().getFullYear();
        desenharCalendario();
    };

    document.getElementById("btnMesAtual").onclick = () => {
        mesOffset = 0;
        selectMes.value = new Date().getMonth();
        selectAno.value = new Date().getFullYear();
        desenharCalendario();
    };

    const btnMesAnterior = document.getElementById("btnMesAnterior");
    const btnMesSeguinte = document.getElementById("btnMesSeguinte");

    btnMesAnterior.onclick = () => {
        mesOffset--;
        desenharCalendario();
    };

    btnMesSeguinte.onclick = () => {
        mesOffset++;
        desenharCalendario();
    };
}


/******************************************************
 * 4) PARSE DE DATAS
 ******************************************************/
function parseDataReserva(str) {
    if (!str) return null;

    if (str.includes("-")) {
        const [a, m, d] = str.split("-").map(Number);
        return new Date(a, m - 1, d);
    }

    if (str.includes("/")) {
        const [d, m, a] = str.split("/").map(Number);
        return new Date(a, m - 1, d);
    }

    return null;
}


/******************************************************
 * 5) CARREGAR RESERVAS DO FIRESTORE
 ******************************************************/
let listenerAtivo = false;

function carregarReservas() {
    if (listenerAtivo) return;
    listenerAtivo = true;

    db.collection("calendario")
        .orderBy("checkin")
        .onSnapshot(snapshot => {
            reservas = [];
            snapshot.forEach(doc => reservas.push({ id: doc.id, ...doc.data() }));
            desenharCalendario();
        });
}


/******************************************************
 * 6) DESENHAR CALENDÁRIO
 ******************************************************/
function desenharCalendario() {

    const tabela = document.getElementById("tabelaCalendario");
    const tituloMesEl = document.getElementById("tituloMes");

    tabela.innerHTML = "";

    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = hoje.getMonth() + mesOffset;

    const dataBase = new Date(ano, mes, 1);
    const mesAtual = dataBase.getMonth();
    const anoAtual = dataBase.getFullYear();

    const nomeMes = dataBase.toLocaleString("pt-PT", { month: "long" });

    // Sincronizar dropdowns
    selectMes.value = mesAtual;
    selectAno.value = anoAtual;

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
 * 7) NOME CURTO DO CLIENTE
 ******************************************************/
function nomeCurto(nome) {
    if (!nome) return "";
    const partes = nome.trim().split(" ");
    if (partes.length === 1) return partes[0];
    return partes[0] + " " + partes[partes.length - 1];
}


/******************************************************
 * 8) DESENHAR RESERVAS NO CALENDÁRIO
 ******************************************************/
function desenharReservas(mes, anoAtual) {

    reservas.forEach(r => {

        const listaAps = Array.isArray(r.apartamentos) ? r.apartamentos : [];
        const dataInicio = parseDataReserva(r.checkin);
        const dataFim = parseDataReserva(r.checkout);
        if (!dataInicio || !dataFim) return;

        const totalDias = Math.floor((dataFim - dataInicio) / 86400000) + 1;

        listaAps.forEach((ap, indexApto) => {

            const isPrimeiroApartamento = indexApto === 0;

            for (let dt = new Date(dataInicio); dt <= dataFim; dt.setDate(dt.getDate() + 1)) {

                if (dt.getMonth() !== mes || dt.getFullYear() !== anoAtual) continue;

                const dia = dt.getDate();
                const cel = document.getElementById(`cel-${ap}-${dia}`);
                if (!cel) continue;

                const isCheckin = dt.getTime() === dataInicio.getTime();
                const isCheckout = dt.getTime() === dataFim.getTime();

                // Barra MASTER (apenas no check-in do primeiro apartamento)
                if (isCheckin && isPrimeiroApartamento) {

                    const master = document.createElement("div");
                    master.classList.add("reserva-master");
                    master.classList.add("origem-" + (r.origem || "manual").toLowerCase());

                    master.textContent = nomeCurto(r.cliente);

                    master.style.width = `calc(${totalDias * 100}%)`;
                    master.style.left = "0";

                    const checkinPt = dataInicio.toLocaleDateString("pt-PT");
                    const checkoutPt = dataFim.toLocaleDateString("pt-PT");

                    master.setAttribute("data-info",
                        `${nomeCurto(r.cliente)} | ${r.origem}
Check-in: ${checkinPt}
Check-out: ${checkoutPt}
Total: ${r.totalBruto || 0}€`
                    );

                    master.onclick = () => {
                        window.location.href = "reservas.html?id=" + r.id;
                    };

                    cel.appendChild(master);
                }

                // Reserva de 1 dia → só master
                if (isCheckin && isCheckout) continue;

                // Metades e dias completos
                const div = document.createElement("div");
                div.classList.add("reserva");
                div.classList.add("origem-" + (r.origem || "manual").toLowerCase());

                if (isCheckin) {
                    div.classList.add("reserva-inicio-metade");
                } else if (isCheckout) {
                    div.classList.add("reserva-fim-metade");
                } else {
                    div.classList.add("reserva-meio");
                }

                cel.appendChild(div);
            }
        });
    });
}
