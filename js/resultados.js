// -------------------------------------------------------------
// RESULTADOS.JS (VERSÃO AVANÇADA COM MODO FINANCEIRO/OPERACIONAL)
// -------------------------------------------------------------

// Firestore já inicializado em firebase-config.js

// -------------------------------------------------------------
// ESTADO GLOBAL
// -------------------------------------------------------------

let reservas = [];                 // Todas as reservas carregadas
let modoAtual = "financeiro";      // "financeiro" ou "operacional"

// Agregações separadas por modo
let agregadosFinanceirosMensais = {};
let agregadosFinanceirosAnuais = {};

let agregadosOperacionaisMensais = {};
let agregadosOperacionaisAnuais = {};

// Gráficos
let graficoReceita, graficoOcupacao, graficoCustos, graficoComparacao;

// Meses
const NOMES_MESES = [
    "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
    "Jul", "Ago", "Set", "Out", "Nov", "Dez"
];

// -------------------------------------------------------------
// UTILITÁRIOS
// -------------------------------------------------------------

function parseDataDDMMYYYY(str) {
    if (!str) return null;
    const [dia, mes, ano] = str.split("/");
    return new Date(Number(ano), Number(mes) - 1, Number(dia));
}

function calcularNoitesPorMes(reserva) {
    const mapa = {};
    const checkin = parseDataDDMMYYYY(reserva.checkin);
    const checkout = parseDataDDMMYYYY(reserva.checkout);
    if (!checkin || !checkout) return mapa;

    const numAps = Array.isArray(reserva.apartamentos)
        ? reserva.apartamentos.length
        : 1;

    let atual = new Date(checkin.getTime());
    while (atual < checkout) {
        const ano = atual.getFullYear();
        const mes = atual.getMonth() + 1;
        const chave = `${ano}-${mes}`;
        if (!mapa[chave]) mapa[chave] = 0;
        mapa[chave] += numAps;  // ✔ CORREÇÃO AQUI
        atual.setDate(atual.getDate() + 1);
    }
    return mapa;
}


function diasNoMes(mes, ano) {
    return new Date(ano, mes, 0).getDate();
}

function formatarEuro(v) {
    if (isNaN(v)) return "0 €";
    return v.toLocaleString("pt-PT", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 2
    });
}

function formatarPercent(v) {
    if (isNaN(v)) return "0%";
    return `${v.toFixed(1)} %`;
}

// -------------------------------------------------------------
// CARREGAR RESERVAS
// -------------------------------------------------------------

function carregarReservas() {
    db.collection("reservas")
        .get()
        .then(snapshot => {
            reservas = snapshot.docs.map(doc => doc.data());
            processarReservas();
        })
        .catch(err => console.error("Erro ao carregar reservas:", err));
}

// -------------------------------------------------------------
// PROCESSAR RESERVAS (FINANCEIRO + OPERACIONAL)
// -------------------------------------------------------------

function processarReservas() {
    agregadosFinanceirosMensais = {};
    agregadosFinanceirosAnuais = {};

    agregadosOperacionaisMensais = {};
    agregadosOperacionaisAnuais = {};

    reservas.forEach(r => {
        const checkin = parseDataDDMMYYYY(r.checkin);
        const checkout = parseDataDDMMYYYY(r.checkout);
        if (!checkin || !checkout) return;

        const anoCheckin = checkin.getFullYear();
        const mesCheckin = checkin.getMonth() + 1;

        const totalBruto = Number(r.totalBruto || 0);
        const comissaoTotal = Number(r.comissaoTotal || r.comissao || 0);
        const limpezaBase = Number(r.limpeza || 0);
        const numAps = Array.isArray(r.apartamentos) ? r.apartamentos.length : 1;
        const limpezaTotal = limpezaBase * numAps;

        const noitesPorMes = calcularNoitesPorMes(r);

        // ---------------------------------------------------------
        // FINANCEIRO — receita e custos 100% no mês do check-in
        // ---------------------------------------------------------
        if (!agregadosFinanceirosMensais[anoCheckin])
            agregadosFinanceirosMensais[anoCheckin] = {};

        if (!agregadosFinanceirosMensais[anoCheckin][mesCheckin]) {
            agregadosFinanceirosMensais[anoCheckin][mesCheckin] = {
                bruto: 0,
                custos: 0,
                liquido: 0,
                noites: 0,
                ocupacao: 0,
                precoMedio: 0
            };
        }

        agregadosFinanceirosMensais[anoCheckin][mesCheckin].bruto += totalBruto;
        agregadosFinanceirosMensais[anoCheckin][mesCheckin].custos += (comissaoTotal + limpezaTotal);

        // Noites distribuídas (para ocupação e preço médio financeiro)
        Object.keys(noitesPorMes).forEach(chave => {
            const [anoStr, mesStr] = chave.split("-");
            const ano = Number(anoStr);
            const mes = Number(mesStr);
            const noites = noitesPorMes[chave];

            if (!agregadosFinanceirosMensais[ano])
                agregadosFinanceirosMensais[ano] = {};

            if (!agregadosFinanceirosMensais[ano][mes]) {
                agregadosFinanceirosMensais[ano][mes] = {
                    bruto: 0,
                    custos: 0,
                    liquido: 0,
                    noites: 0,
                    ocupacao: 0,
                    precoMedio: 0
                };
            }

            agregadosFinanceirosMensais[ano][mes].noites += noites;
        });

        // ---------------------------------------------------------
        // OPERACIONAL — receita proporcional às noites
        // ---------------------------------------------------------
        Object.keys(noitesPorMes).forEach(chave => {
            const [anoStr, mesStr] = chave.split("-");
            const ano = Number(anoStr);
            const mes = Number(mesStr);
            const noites = noitesPorMes[chave];

            if (!agregadosOperacionaisMensais[ano])
                agregadosOperacionaisMensais[ano] = {};

            if (!agregadosOperacionaisMensais[ano][mes]) {
                agregadosOperacionaisMensais[ano][mes] = {
                    bruto: 0,
                    custos: 0,
                    liquido: 0,
                    noites: 0,
                    ocupacao: 0,
                    precoMedio: 0,
                    revpar: 0
                };
            }

            const totalNoitesReserva = Object.values(noitesPorMes).reduce((a, b) => a + b, 0);
            const receitaProporcional = totalNoitesReserva > 0
                ? (totalBruto * (noites / totalNoitesReserva))
                : 0;

            const custosProporcionais = totalNoitesReserva > 0
                ? ((comissaoTotal + limpezaTotal) * (noites / totalNoitesReserva))
                : 0;

            agregadosOperacionaisMensais[ano][mes].bruto += receitaProporcional;
            agregadosOperacionaisMensais[ano][mes].custos += custosProporcionais;
            agregadosOperacionaisMensais[ano][mes].noites += noites;
        });
    });

    // Depois disto, vamos calcular totais, KPIs e preparar filtros
    finalizarAgregacoes();
}
// -------------------------------------------------------------
// FINALIZAR AGREGAÇÕES (FINANCEIRO + OPERACIONAL)
// -------------------------------------------------------------

function finalizarAgregacoes() {

    // ---------------------------------------------------------
    // 1) COMPLETAR FINANCEIRO (líquido, ocupação, preço médio)
    // ---------------------------------------------------------
    Object.keys(agregadosFinanceirosMensais).forEach(anoStr => {
        const ano = Number(anoStr);
        const meses = agregadosFinanceirosMensais[ano];

        for (let m = 1; m <= 12; m++) {
            if (!meses[m]) {
                meses[m] = {
                    bruto: 0,
                    custos: 0,
                    liquido: 0,
                    noites: 0,
                    ocupacao: 0,
                    precoMedio: 0
                };
            }

            const mesObj = meses[m];

            mesObj.liquido = mesObj.bruto - mesObj.custos;

            const dias = diasNoMes(m, ano);
            const noitesDisp = dias * 3;

            mesObj.ocupacao = noitesDisp > 0
                ? (mesObj.noites / noitesDisp) * 100
                : 0;

           mesObj.precoMedio = mesObj.noites > 0
    ? mesObj.bruto / mesObj.noites
    : 0;


        }
    });

    // ---------------------------------------------------------
    // 2) COMPLETAR OPERACIONAL (líquido, ocupação, preço médio, RevPAR)
    // ---------------------------------------------------------
    Object.keys(agregadosOperacionaisMensais).forEach(anoStr => {
        const ano = Number(anoStr);
        const meses = agregadosOperacionaisMensais[ano];

        for (let m = 1; m <= 12; m++) {
            if (!meses[m]) {
                meses[m] = {
                    bruto: 0,
                    custos: 0,
                    liquido: 0,
                    noites: 0,
                    ocupacao: 0,
                    precoMedio: 0,
                    revpar: 0
                };
            }

            const mesObj = meses[m];

            mesObj.liquido = mesObj.bruto - mesObj.custos;

            const dias = diasNoMes(m, ano);
            const noitesDisp = dias * 3;

            mesObj.ocupacao = noitesDisp > 0
                ? (mesObj.noites / noitesDisp) * 100
                : 0;

            mesObj.precoMedio = mesObj.noites > 0
                ? mesObj.bruto / mesObj.noites
                : 0;

            mesObj.revpar = noitesDisp > 0
                ? mesObj.bruto / noitesDisp
                : 0;
        }
    });

    // ---------------------------------------------------------
    // 3) AGREGAR ANUAL — FINANCEIRO
    // ---------------------------------------------------------
    agregadosFinanceirosAnuais = {};

    Object.keys(agregadosFinanceirosMensais).forEach(anoStr => {
        const ano = Number(anoStr);
        const meses = agregadosFinanceirosMensais[ano];

        let bruto = 0, custos = 0, liquido = 0;
        let noites = 0, noitesDisp = 0;

        for (let m = 1; m <= 12; m++) {
            const mesObj = meses[m];
            bruto += mesObj.bruto;
            custos += mesObj.custos;
            liquido += mesObj.liquido;
            noites += mesObj.noites;

            noitesDisp += diasNoMes(m, ano) * 3;
        }

        agregadosFinanceirosAnuais[ano] = {
            bruto,
            custos,
            liquido,
            ocupacao: noitesDisp > 0 ? (noites / noitesDisp) * 100 : 0,
            precoMedio: noites > 0 ? bruto / noites : 0
        };
    });

    // ---------------------------------------------------------
    // 4) AGREGAR ANUAL — OPERACIONAL
    // ---------------------------------------------------------
    agregadosOperacionaisAnuais = {};

    Object.keys(agregadosOperacionaisMensais).forEach(anoStr => {
        const ano = Number(anoStr);
        const meses = agregadosOperacionaisMensais[ano];

        let bruto = 0, custos = 0, liquido = 0;
        let noites = 0, noitesDisp = 0;

        for (let m = 1; m <= 12; m++) {
            const mesObj = meses[m];
            bruto += mesObj.bruto;
            custos += mesObj.custos;
            liquido += mesObj.liquido;
            noites += mesObj.noites;

            noitesDisp += diasNoMes(m, ano) * 3;
        }

        agregadosOperacionaisAnuais[ano] = {
            bruto,
            custos,
            liquido,
            ocupacao: noitesDisp > 0 ? (noites / noitesDisp) * 100 : 0,
            precoMedio: noites > 0 ? bruto / noites : 0,
            revpar: noitesDisp > 0 ? bruto / noitesDisp : 0
        };
    });

    // ---------------------------------------------------------
    // 5) PREPARAR FILTROS (2020–2050)
    // ---------------------------------------------------------
    inicializarFiltros();

    // ---------------------------------------------------------
    // 6) ATUALIZAR TUDO
    // ---------------------------------------------------------
    atualizarTudo();
}
// -------------------------------------------------------------
// ALTERAR MODO (FINANCEIRO / OPERACIONAL)
// -------------------------------------------------------------

function ativarModo(modo) {
    modoAtual = modo;

    // Atualizar botões
    document.getElementById("btnFinanceiro").classList.toggle("ativo", modo === "financeiro");
    document.getElementById("btnOperacional").classList.toggle("ativo", modo === "operacional");

    // Atualizar classes no <body> para o CSS saber qual coluna mostrar
    if (modo === "operacional") {
        document.body.classList.add("modo-operacional");
        document.body.classList.remove("modo-financeiro");
    } else {
        document.body.classList.add("modo-financeiro");
        document.body.classList.remove("modo-operacional");
    }

    atualizarTudo();
}


// -------------------------------------------------------------
// ATUALIZAR TUDO (KPIs, Tabelas, Gráficos)
// -------------------------------------------------------------

function atualizarTudo() {
    const anoSelecionado = Number(document.getElementById("filtroAno").value || 0);
    const mesSelecionado = document.getElementById("filtroMes").value; // "" ou "1".."12"

    atualizarKPIs(anoSelecionado, mesSelecionado);
    atualizarTabelas(anoSelecionado);
    atualizarGraficos(anoSelecionado);
}

// -------------------------------------------------------------
// ATUALIZAR KPIs (FINANCEIRO OU OPERACIONAL)
// -------------------------------------------------------------

function atualizarKPIs(ano, mesStr) {

    const kpiBruto = document.getElementById("kpiReceitaBruta");
    const kpiLiquido = document.getElementById("kpiReceitaLiquida");
    const kpiOcupacao = document.getElementById("kpiOcupacao");
    const kpiPrecoMedio = document.getElementById("kpiPrecoMedio");
    const kpiLucro = document.getElementById("kpiLucro");
    const kpiRevpar = document.getElementById("kpiRevpar"); // NOVO KPI

    let fonteMensal = modoAtual === "financeiro"
        ? agregadosFinanceirosMensais
        : agregadosOperacionaisMensais;

    if (!fonteMensal[ano]) {
        kpiBruto.textContent = "0 €";
        kpiLiquido.textContent = "0 €";
        kpiOcupacao.textContent = "0%";
        kpiPrecoMedio.textContent = "0 €";
        kpiLucro.textContent = "0 €";
        if (kpiRevpar) kpiRevpar.textContent = "0 €";
        return;
    }

    const meses = fonteMensal[ano];

    let brutoTotal = 0;
    let custosTotal = 0;
    let liquidoTotal = 0;
    let noitesTotal = 0;
    let noitesDispTotal = 0;

    for (let m = 1; m <= 12; m++) {
        if (mesStr && Number(mesStr) !== m) continue;

        const mesObj = meses[m];
        const dias = diasNoMes(m, ano);
        const noitesDisp = dias * 3;

        brutoTotal += mesObj.bruto;
        custosTotal += mesObj.custos;
        liquidoTotal += mesObj.liquido;
        noitesTotal += mesObj.noites;
        noitesDispTotal += noitesDisp;
    }

    const ocupacao = noitesDispTotal > 0
        ? (noitesTotal / noitesDispTotal) * 100
        : 0;

    const precoMedio = noitesTotal > 0
        ? brutoTotal / noitesTotal
        : 0;

    const lucro = liquidoTotal;

    // RevPAR só existe no modo operacional
    const revpar = modoAtual === "operacional"
        ? (noitesDispTotal > 0 ? brutoTotal / noitesDispTotal : 0)
        : 0;

    // Atualizar KPIs
    kpiBruto.textContent = formatarEuro(brutoTotal);
    kpiLiquido.textContent = formatarEuro(liquidoTotal);
    kpiOcupacao.textContent = formatarPercent(ocupacao);
    kpiPrecoMedio.textContent = formatarEuro(precoMedio);
    kpiLucro.textContent = formatarEuro(lucro);

    if (kpiRevpar) {
        kpiRevpar.style.display = modoAtual === "operacional" ? "block" : "none";
        kpiRevpar.textContent = formatarEuro(revpar);
    }
}

// -------------------------------------------------------------
// ATUALIZAR TABELAS (FINANCEIRO OU OPERACIONAL)
// -------------------------------------------------------------

function atualizarTabelas(ano) {

    if (modoAtual === "financeiro") {
        atualizarTabelaMensalFinanceiro(ano);
        atualizarTabelaAnualFinanceiro();
        document.getElementById("cardEvolucaoPrecoMedio").style.display = "none";
        document.getElementById("btnMostrarMais").style.display = "none";
        document.getElementById("cardTabelaCustos").style.display = "none";
        document.getElementById("cardTabelaAnualOperacional").style.display = "none";
    }

    if (modoAtual === "operacional") {
        atualizarTabelaMensalOperacional(ano);
        atualizarTabelaEvolucaoPrecoMedio();
        document.getElementById("cardEvolucaoPrecoMedio").style.display = "block";

        // Mostrar mais (tabelas escondidas)
        document.getElementById("btnMostrarMais").style.display = "block";
    }
}
// -------------------------------------------------------------
// TABELAS — FINANCEIRO
// -------------------------------------------------------------

function atualizarTabelaMensalFinanceiro(ano) {
    const tbody = document.querySelector("#tabelaMensal tbody");
    tbody.innerHTML = "";

    const meses = agregadosFinanceirosMensais[ano];
    if (!meses) return;

    for (let m = 1; m <= 12; m++) {
        const mesObj = meses[m];

        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${NOMES_MESES[m - 1]} ${ano}</td>
            <td>${formatarEuro(mesObj.bruto)}</td>
            <td>${formatarEuro(mesObj.custos)}</td>
            <td>${formatarEuro(mesObj.liquido)}</td>
            <td>${formatarPercent(mesObj.ocupacao)}</td>
            <td>${formatarEuro(mesObj.precoMedio)}</td>
        `;

        tbody.appendChild(tr);
    }
}

function atualizarTabelaAnualFinanceiro() {
    const tabela = document.getElementById("tabelaAnual");
    const thead = tabela.querySelector("thead");
    const tbody = tabela.querySelector("tbody");

    tbody.innerHTML = "";

    const anos = [];
    for (let a = 2020; a <= 2050; a++) anos.push(a);

    // Cabeçalho
    let header = "<tr><th>Mês</th>";
    anos.forEach(a => header += `<th>${a}</th>`);
    header += "</tr>";
    thead.innerHTML = header;

    // Linhas
    for (let m = 1; m <= 12; m++) {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${NOMES_MESES[m - 1]}</td>`;

        anos.forEach(ano => {
            const mesesAno = agregadosFinanceirosMensais[ano] || {};
            const mesObj = mesesAno[m] || {
                bruto: 0, custos: 0, liquido: 0, ocupacao: 0, precoMedio: 0
            };

            tr.innerHTML += `
                <td>
                    <table class="mini-tabela">
                        <tr><td>Bruto:</td><td>${formatarEuro(mesObj.bruto)}</td></tr>
                        <tr><td>Custos:</td><td>${formatarEuro(mesObj.custos)}</td></tr>
                        <tr><td>Líquido:</td><td>${formatarEuro(mesObj.liquido)}</td></tr>
                        <tr><td>Ocupação:</td><td>${formatarPercent(mesObj.ocupacao)}</td></tr>
                        <tr><td>Preço Médio:</td><td>${formatarEuro(mesObj.precoMedio)}</td></tr>
                    </table>
                </td>
            `;
        });

        tbody.appendChild(tr);
    }
}

// -------------------------------------------------------------
// TABELAS — OPERACIONAL
// -------------------------------------------------------------

function atualizarTabelaMensalOperacional(ano) {
    const tbody = document.querySelector("#tabelaMensal tbody");
    tbody.innerHTML = "";

    const meses = agregadosOperacionaisMensais[ano];
    if (!meses) return;

    for (let m = 1; m <= 12; m++) {
        const mesObj = meses[m];

        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${NOMES_MESES[m - 1]} ${ano}</td>
            <td>${formatarEuro(mesObj.bruto)}</td>
            <td>${formatarEuro(mesObj.custos)}</td>
            <td>${formatarEuro(mesObj.liquido)}</td>
            <td>${formatarPercent(mesObj.ocupacao)}</td>
            <td>${formatarEuro(mesObj.precoMedio)}</td>
            <td>${formatarEuro(mesObj.revpar)}</td>
        `;

        tbody.appendChild(tr);
    }
}

// -------------------------------------------------------------
// TABELA ANUAL OPERACIONAL (fica escondida até clicar "Mostrar mais")
// -------------------------------------------------------------

function atualizarTabelaAnualOperacional() {
    const tabela = document.getElementById("tabelaAnualOperacional");
    const thead = tabela.querySelector("thead");
    const tbody = tabela.querySelector("tbody");

    tbody.innerHTML = "";

    const anos = [];
    for (let a = 2020; a <= 2050; a++) anos.push(a);

    // Cabeçalho
    let header = "<tr><th>Mês</th>";
    anos.forEach(a => header += `<th>${a}</th>`);
    header += "</tr>";
    thead.innerHTML = header;

    // Linhas
    for (let m = 1; m <= 12; m++) {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${NOMES_MESES[m - 1]}</td>`;

        anos.forEach(ano => {
            const mesesAno = agregadosOperacionaisMensais[ano] || {};
            const mesObj = mesesAno[m] || {
                bruto: 0, custos: 0, liquido: 0, ocupacao: 0, precoMedio: 0, revpar: 0
            };

            tr.innerHTML += `
                <td>
                    <table class="mini-tabela">
                        <tr><td>Bruto:</td><td>${formatarEuro(mesObj.bruto)}</td></tr>
                        <tr><td>Custos:</td><td>${formatarEuro(mesObj.custos)}</td></tr>
                        <tr><td>Líquido:</td><td>${formatarEuro(mesObj.liquido)}</td></tr>
                        <tr><td>Ocupação:</td><td>${formatarPercent(mesObj.ocupacao)}</td></tr>
                        <tr><td>Preço Médio:</td><td>${formatarEuro(mesObj.precoMedio)}</td></tr>
                        <tr><td>RevPAR:</td><td>${formatarEuro(mesObj.revpar)}</td></tr>
                    </table>
                </td>
            `;
        });

        tbody.appendChild(tr);
    }
}
// -------------------------------------------------------------
// TABELA — EVOLUÇÃO DO PREÇO MÉDIO (OPERACIONAL)
// -------------------------------------------------------------

function atualizarTabelaEvolucaoPrecoMedio() {
    const tabela = document.getElementById("tabelaEvolucaoPrecoMedio");
    const thead = tabela.querySelector("thead");
    const tbody = tabela.querySelector("tbody");

    tbody.innerHTML = "";

    // Anos fixos 2020–2050
    const anos = [];
    for (let a = 2020; a <= 2050; a++) anos.push(a);

    // Cabeçalho
    let header = "<tr><th>Mês</th>";
    anos.forEach(a => header += `<th>${a}</th>`);
    header += "<th>Evolução Anual</th><th>Evolução Acumulada</th></tr>";
    thead.innerHTML = header;

    // Primeiro ano com dados (para evolução acumulada)
    const anosComDados = Object.keys(agregadosOperacionaisMensais)
        .map(a => Number(a))
        .sort((a, b) => a - b);

    const primeiroAno = anosComDados.length > 0 ? anosComDados[0] : null;

    // Linhas
    for (let m = 1; m <= 12; m++) {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${NOMES_MESES[m - 1]}</td>`;

        let precoAnoAnterior = null;
        let precoPrimeiroAno = null;

        anos.forEach(ano => {
            const mesesAno = agregadosOperacionaisMensais[ano] || {};
            const mesObj = mesesAno[m] || { precoMedio: 0 };

            const preco = mesObj.precoMedio;

            if (ano === primeiroAno) precoPrimeiroAno = preco;

            tr.innerHTML += `<td>${formatarEuro(preco)}</td>`;

            // Guardar para evolução anual
            if (preco > 0) precoAnoAnterior = preco;
        });

        // Evolução anual (ano atual vs ano anterior)
        let evolucaoAnual = 0;
        let evolucaoAcumulada = 0;

        const anoAtual = Number(document.getElementById("filtroAno").value);

        const mesesAnoAtual = agregadosOperacionaisMensais[anoAtual] || {};
        const precoAtual = mesesAnoAtual[m] ? mesesAnoAtual[m].precoMedio : 0;

        const precoAnoAnteriorReal = agregadosOperacionaisMensais[anoAtual - 1]
            ? (agregadosOperacionaisMensais[anoAtual - 1][m]
                ? agregadosOperacionaisMensais[anoAtual - 1][m].precoMedio
                : 0)
            : 0;

        if (precoAnoAnteriorReal > 0) {
            evolucaoAnual = ((precoAtual - precoAnoAnteriorReal) / precoAnoAnteriorReal) * 100;
        }

        if (precoPrimeiroAno > 0) {
            evolucaoAcumulada = ((precoAtual - precoPrimeiroAno) / precoPrimeiroAno) * 100;
        }

        tr.innerHTML += `
            <td>${formatarPercent(evolucaoAnual)}</td>
            <td>${formatarPercent(evolucaoAcumulada)}</td>
        `;

        tbody.appendChild(tr);
    }
}

// -------------------------------------------------------------
// TABELA — CUSTOS (OPERACIONAL) — escondida até clicar "Mostrar mais"
// -------------------------------------------------------------

function atualizarTabelaCustos() {
    const tabela = document.getElementById("tabelaCustos");
    const thead = tabela.querySelector("thead");
    const tbody = tabela.querySelector("tbody");

    tbody.innerHTML = "";

    const anos = [];
    for (let a = 2020; a <= 2050; a++) anos.push(a);

    // Cabeçalho
    let header = "<tr><th>Mês</th>";
    anos.forEach(a => header += `<th>${a}</th>`);
    header += "</tr>";
    thead.innerHTML = header;

    // Linhas
    for (let m = 1; m <= 12; m++) {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${NOMES_MESES[m - 1]}</td>`;

        anos.forEach(ano => {
            const mesesAno = agregadosOperacionaisMensais[ano] || {};
            const mesObj = mesesAno[m] || { custos: 0, bruto: 0 };

            const percent = mesObj.bruto > 0
                ? (mesObj.custos / mesObj.bruto) * 100
                : 0;

            tr.innerHTML += `
                <td>
                    <table class="mini-tabela">
                        <tr><td>Custos:</td><td>${formatarEuro(mesObj.custos)}</td></tr>
                        <tr><td>% Receita:</td><td>${formatarPercent(percent)}</td></tr>
                    </table>
                </td>
            `;
        });

        tbody.appendChild(tr);
    }
}

// -------------------------------------------------------------
// BOTÃO "MOSTRAR MAIS" — revela tabelas adicionais
// -------------------------------------------------------------

document.getElementById("btnMostrarMais").addEventListener("click", () => {
    const cardAnual = document.getElementById("cardTabelaAnualOperacional");
    const cardCustos = document.getElementById("cardTabelaCustos");

    const visivel = cardAnual.style.display === "block";

    if (visivel) {
        cardAnual.style.display = "none";
        cardCustos.style.display = "none";
        document.getElementById("btnMostrarMais").textContent = "Mostrar mais estatísticas operacionais";
    } else {
        atualizarTabelaAnualOperacional();
        atualizarTabelaCustos();
        cardAnual.style.display = "block";
        cardCustos.style.display = "block";
        document.getElementById("btnMostrarMais").textContent = "Ocultar estatísticas operacionais";
    }
});

// -------------------------------------------------------------
// GRÁFICO — COMPARAÇÃO MENSAL (ANO ATUAL vs 2 ANOS ANTERIORES)
// -------------------------------------------------------------
function atualizarGraficoComparacaoMensal(anoBase) {

    const ctx = document.getElementById("graficoComparacaoMensal");
    if (!ctx) return;

    const fonteMensal = modoAtual === "financeiro"
        ? agregadosFinanceirosMensais
        : agregadosOperacionaisMensais;

    const anos = [anoBase - 2, anoBase - 1, anoBase];

    const cores = [
        "rgba(54, 162, 235, 0.6)",
        "rgba(255, 159, 64, 0.6)",
        "rgba(75, 192, 192, 0.8)"
    ];

    const datasets = anos.map((ano, idx) => {
        const mesesAno = fonteMensal[ano] || {};
        const valores = [];

        for (let m = 1; m <= 12; m++) {
            const mesObj = mesesAno[m] || { bruto: 0 };
            valores.push(mesObj.bruto);
        }

        return {
            label: ano.toString(),
            data: valores,
            backgroundColor: cores[idx],
            borderWidth: 1
        };
    });

    if (window.graficoComparacaoMensal) {
        window.graficoComparacaoMensal.destroy();
    }

    window.graficoComparacaoMensal = new Chart(ctx, {
        type: "bar",
        data: {
            labels: NOMES_MESES,
            datasets
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: `Comparação Mensal — ${anos[0]}, ${anos[1]}, ${anos[2]}`
                },
                tooltip: {
                    callbacks: {
                        label: ctx => {
                            const v = ctx.raw || 0;
                            return `${ctx.dataset.label}: ${v.toLocaleString("pt-PT", {
                                style: "currency",
                                currency: "EUR"
                            })}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: v => v.toLocaleString("pt-PT") + " €"
                    }
                }
            }
        }
    });
}


// -------------------------------------------------------------
// GRÁFICOS (FINANCEIRO OU OPERACIONAL)
// -------------------------------------------------------------

function atualizarGraficos(ano) {

    const fonteMensal = modoAtual === "financeiro"
        ? agregadosFinanceirosMensais
        : agregadosOperacionaisMensais;

    const meses = fonteMensal[ano];
    if (!meses) return;

    const labels = NOMES_MESES;
    const dadosBruto = [];
    const dadosOcupacao = [];
    const dadosCustos = [];

    for (let m = 1; m <= 12; m++) {
        const mesObj = meses[m];
        dadosBruto.push(mesObj.bruto);
        dadosOcupacao.push(mesObj.ocupacao);
        dadosCustos.push(mesObj.custos);
    }

    // ---------------------------------------------------------
    // GRÁFICO — RECEITA
    // ---------------------------------------------------------
    const ctxReceita = document.getElementById("graficoReceita").getContext("2d");
    if (graficoReceita) graficoReceita.destroy();

    graficoReceita = new Chart(ctxReceita, {
        type: "bar",
        data: {
            labels,
            datasets: [{
                label: modoAtual === "financeiro" ? "Receita Bruta (Financeiro)" : "Receita Bruta (Operacional)",
                data: dadosBruto,
                backgroundColor: "rgba(75, 192, 192, 0.6)"
            }]
        },
        options: { responsive: true }
    });

    // ---------------------------------------------------------
    // GRÁFICO — COMPARAÇÃO MENSAL (NOVO)
    // ---------------------------------------------------------
    atualizarGraficoComparacaoMensal(ano);

    // ---------------------------------------------------------
    // GRÁFICO — OCUPAÇÃO
    // ---------------------------------------------------------
    const ctxOcupacao = document.getElementById("graficoOcupacao").getContext("2d");
    if (graficoOcupacao) graficoOcupacao.destroy();

    graficoOcupacao = new Chart(ctxOcupacao, {
        type: "line",
        data: {
            labels,
            datasets: [{
                label: "Ocupação (%)",
                data: dadosOcupacao,
                borderColor: "rgba(255, 159, 64, 1)",
                backgroundColor: "rgba(255, 159, 64, 0.2)",
                fill: true
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { ticks: { callback: v => `${v}%` } }
            }
        }
    });

    // ---------------------------------------------------------
    // GRÁFICO — CUSTOS
    // ---------------------------------------------------------
    const ctxCustos = document.getElementById("graficoCustos").getContext("2d");
    if (graficoCustos) graficoCustos.destroy();

    graficoCustos = new Chart(ctxCustos, {
        type: "bar",
        data: {
            labels,
            datasets: [{
                label: "Custos",
                data: dadosCustos,
                backgroundColor: "rgba(255, 99, 132, 0.6)"
            }]
        },
        options: { responsive: true }
    });

    // ---------------------------------------------------------
    // GRÁFICO — COMPARAÇÃO ENTRE ANOS (ANUAL)
    // ---------------------------------------------------------
    const ctxComparacao = document.getElementById("graficoComparacao").getContext("2d");
    if (graficoComparacao) graficoComparacao.destroy();

    const anos = [];
    for (let a = 2020; a <= 2050; a++) anos.push(a);

    const tipoComparacao = document.getElementById("tipoComparacao").value;

    const dadosComparacao = anos.map(a => {
        const fonte = modoAtual === "financeiro"
            ? agregadosFinanceirosAnuais[a]
            : agregadosOperacionaisAnuais[a];

        if (!fonte) return 0;
        return tipoComparacao === "bruto" ? fonte.bruto : fonte.liquido;
    });

    graficoComparacao = new Chart(ctxComparacao, {
        type: "bar",
        data: {
            labels: anos.map(a => a.toString()),
            datasets: [{
                label: tipoComparacao === "bruto"
                    ? "Receita Bruta Anual"
                    : "Receita Líquida Anual",
                data: dadosComparacao,
                backgroundColor: "rgba(54, 162, 235, 0.6)"
            }]
        },
        options: { responsive: true }
    });
}

// -------------------------------------------------------------
// INICIALIZAR FILTROS (2020–2050)
// -------------------------------------------------------------

function inicializarFiltros() {
    const filtroAno = document.getElementById("filtroAno");
    filtroAno.innerHTML = "";

    for (let ano = 2020; ano <= 2050; ano++) {
        const opt = document.createElement("option");
        opt.value = ano;
        opt.textContent = ano;
        filtroAno.appendChild(opt);
    }

    filtroAno.value = new Date().getFullYear();

    document.getElementById("btnAplicarFiltros").onclick = atualizarTudo;
}

// -------------------------------------------------------------
// INICIALIZAÇÃO FINAL
// -------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {

    // Botões de modo
    document.getElementById("btnFinanceiro").onclick = () => ativarModo("financeiro");
    document.getElementById("btnOperacional").onclick = () => ativarModo("operacional");

    // Firebase Auth
    firebase.auth().onAuthStateChanged(user => {
        if (!user) {
            window.location.href = "login.html";
            return;
        }

        carregarReservas();
    });
});

