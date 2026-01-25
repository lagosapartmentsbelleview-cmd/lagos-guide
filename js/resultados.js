// -------------------------------------------------------------
// RESULTADOS.JS
// Lógica de KPIs, tabelas e gráficos de resultados
// -------------------------------------------------------------

// Referência ao Firestore (firebase-config.js já inicializou firebase)

// Armazena todas as reservas carregadas
let reservas = [];

// Estruturas agregadas
let agregadosMensais = {}; // { ano: { mes: { ... } } }
let agregadosAnuais = {};  // { ano: { ... } }

// Gráficos Chart.js
let graficoReceita, graficoOcupacao, graficoCustos, graficoComparacao;

// Nomes dos meses
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

// Conta noites por (ano, mes) entre check-in e check-out
// Regra A: contagem simples por datas (diaAtual -> diaSeguinte)
function calcularNoitesPorMes(reserva) {
    const mapa = {}; // chave "ano-mes" -> noites

    const checkin = parseDataDDMMYYYY(reserva.checkin);
    const checkout = parseDataDDMMYYYY(reserva.checkout);
    if (!checkin || !checkout) return mapa;

    // Vamos iterar noite a noite: diaAtual -> diaSeguinte
    let atual = new Date(checkin.getTime());

    while (atual < checkout) {
        const ano = atual.getFullYear();
        const mes = atual.getMonth() + 1; // 1-12

        const chave = `${ano}-${mes}`;
        if (!mapa[chave]) mapa[chave] = 0;
        mapa[chave] += 1;

        // Avança um dia
        atual.setDate(atual.getDate() + 1);
    }

    return mapa;
}

// Número de dias num mês/ano
function diasNoMes(mes, ano) {
    return new Date(ano, mes, 0).getDate();
}

// Formatar número como moeda €
function formatarEuro(valor) {
    if (isNaN(valor)) return "0 €";
    return valor.toLocaleString("pt-PT", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 2
    });
}

// Formatar percentagem
function formatarPercent(valor) {
    if (isNaN(valor)) return "0%";
    return `${valor.toFixed(1)} %`;
}

// -------------------------------------------------------------
// CARREGAR RESERVAS DO FIRESTORE
// -------------------------------------------------------------

function carregarReservas() {
    db.collection("reservas")
        .get()
        .then(snapshot => {
            reservas = snapshot.docs.map(doc => doc.data());
            processarReservas();
        })
        .catch(err => {
            console.error("Erro ao carregar reservas:", err);
        });
}

// -------------------------------------------------------------
// PROCESSAR RESERVAS EM AGREGAÇÕES MENSAIS E ANUAIS
// -------------------------------------------------------------

function processarReservas() {
    agregadosMensais = {};
    agregadosAnuais = {};

    reservas.forEach(r => {
        const checkinDate = parseDataDDMMYYYY(r.checkin);
        const checkoutDate = parseDataDDMMYYYY(r.checkout);
        if (!checkinDate || !checkoutDate) return;

        const anoCheckin = checkinDate.getFullYear();
        const mesCheckin = checkinDate.getMonth() + 1; // 1-12

        const totalBruto = Number(r.totalBruto || 0);
        const comissaoTotal = Number(r.comissaoTotal || r.comissao || 0);
        const limpezaBase = Number(r.limpeza || 0);
        const numAps = Array.isArray(r.apartamentos) ? r.apartamentos.length : 1;
        const limpezaTotal = limpezaBase * numAps;

        // Noites por mês (para ocupação e preço médio)
        const noitesPorMes = calcularNoitesPorMes(r);

        // -------------------------------------------------
        // 1) AGREGAR MENSAL
        // -------------------------------------------------
        if (!agregadosMensais[anoCheckin]) agregadosMensais[anoCheckin] = {};

        // Garantir que todos os 12 meses existem
        for (let m = 1; m <= 12; m++) {
            if (!agregadosMensais[anoCheckin][m]) {
                agregadosMensais[anoCheckin][m] = {
                    bruto: 0,
                    custos: 0,
                    liquido: 0,
                    noites: 0,
                    ocupacao: 0,
                    precoMedio: 0
                };
            }
        }

        // Receita e custos: 100% no mês do check-in
        const mesObj = agregadosMensais[anoCheckin][mesCheckin];
        mesObj.bruto += totalBruto;
        mesObj.custos += (comissaoTotal + limpezaTotal);

        // Noites: distribuídas pelos meses reais
        Object.keys(noitesPorMes).forEach(chave => {
            const [anoStr, mesStr] = chave.split("-");
            const ano = Number(anoStr);
            const mes = Number(mesStr);
            const noitesMes = noitesPorMes[chave];

            if (!agregadosMensais[ano]) agregadosMensais[ano] = {};
            if (!agregadosMensais[ano][mes]) {
                agregadosMensais[ano][mes] = {
                    bruto: 0,
                    custos: 0,
                    liquido: 0,
                    noites: 0,
                    ocupacao: 0,
                    precoMedio: 0
                };
            }

            agregadosMensais[ano][mes].noites += noitesMes;
        });
    });

    // -------------------------------------------------
    // 2) CALCULAR LÍQUIDO, OCUPAÇÃO, PREÇO MÉDIO
    // -------------------------------------------------
    Object.keys(agregadosMensais).forEach(anoStr => {
        const ano = Number(anoStr);
        const meses = agregadosMensais[ano];

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

            // Receita líquida
            mesObj.liquido = mesObj.bruto - mesObj.custos;

            // Ocupação = noites / (diasDoMes * 3 apartamentos)
            const dias = diasNoMes(m, ano);
            const noitesDisponiveis = dias * 3;
            mesObj.ocupacao = noitesDisponiveis > 0
                ? (mesObj.noites / noitesDisponiveis) * 100
                : 0;

            // Preço médio = receita bruta do mês / noites do mês
            mesObj.precoMedio = mesObj.noites > 0
                ? mesObj.bruto / mesObj.noites
                : 0;
        }
    });

    // -------------------------------------------------
    // 3) AGREGAR ANUAL
    // -------------------------------------------------
    agregadosAnuais = {};

    Object.keys(agregadosMensais).forEach(anoStr => {
        const ano = Number(anoStr);
        const meses = agregadosMensais[ano];

        let brutoTotal = 0;
        let custosTotal = 0;
        let liquidoTotal = 0;
        let noitesTotal = 0;
        let noitesDisponiveisTotal = 0;

        for (let m = 1; m <= 12; m++) {
            const mesObj = meses[m];
            brutoTotal += mesObj.bruto;
            custosTotal += mesObj.custos;
            liquidoTotal += mesObj.liquido;
            noitesTotal += mesObj.noites;

            const dias = diasNoMes(m, ano);
            noitesDisponiveisTotal += dias * 3;
        }

        const ocupacaoAnual = noitesDisponiveisTotal > 0
            ? (noitesTotal / noitesDisponiveisTotal) * 100
            : 0;

        const precoMedioAnual = noitesTotal > 0
            ? brutoTotal / noitesTotal
            : 0;

        agregadosAnuais[ano] = {
            bruto: brutoTotal,
            custos: custosTotal,
            liquido: liquidoTotal,
            ocupacao: ocupacaoAnual,
            precoMedio: precoMedioAnual
        };
    });

    // Depois de processar tudo, inicializar filtros, KPIs, tabelas e gráficos
    inicializarFiltros();
    atualizarTudo();
}

// -------------------------------------------------------------
// FILTROS (ANO, MÊS, TIPO COMPARAÇÃO)
// -------------------------------------------------------------

function inicializarFiltros() {
    const filtroAno = document.getElementById("filtroAno");
    filtroAno.innerHTML = "";

    const anos = Object.keys(agregadosMensais)
        .map(a => Number(a))
        .sort((a, b) => a - b);

    anos.forEach(ano => {
        const opt = document.createElement("option");
        opt.value = ano;
        opt.textContent = ano;
        filtroAno.appendChild(opt);
    });

    // Selecionar último ano por defeito
    if (anos.length > 0) {
        filtroAno.value = anos[anos.length - 1];
    }

    const btn = document.getElementById("btnAplicarFiltros");
    btn.onclick = atualizarTudo;
}

// -------------------------------------------------------------
// ATUALIZAR TUDO (KPIs, TABELAS, GRÁFICOS)
// -------------------------------------------------------------

function atualizarTudo() {
    const anoSelecionado = Number(document.getElementById("filtroAno").value || 0);
    const mesSelecionado = document.getElementById("filtroMes").value; // "" ou "1".."12"

    atualizarKPIs(anoSelecionado, mesSelecionado);
    atualizarTabelaMensal(anoSelecionado);
    atualizarTabelaAnualComparativa();
    atualizarGraficos(anoSelecionado);
}

// -------------------------------------------------------------
// ATUALIZAR KPIs
// -------------------------------------------------------------

function atualizarKPIs(ano, mesStr) {
    const kpiBruto = document.getElementById("kpiReceitaBruta");
    const kpiLiquido = document.getElementById("kpiReceitaLiquida");
    const kpiOcupacao = document.getElementById("kpiOcupacao");
    const kpiPrecoMedio = document.getElementById("kpiPrecoMedio");
    const kpiLucro = document.getElementById("kpiLucro");

    if (!agregadosMensais[ano]) {
        kpiBruto.textContent = "0 €";
        kpiLiquido.textContent = "0 €";
        kpiOcupacao.textContent = "0%";
        kpiPrecoMedio.textContent = "0 €";
        kpiLucro.textContent = "0 €";
        return;
    }

    const meses = agregadosMensais[ano];

    let brutoTotal = 0;
    let custosTotal = 0;
    let liquidoTotal = 0;
    let noitesTotal = 0;
    let noitesDisponiveisTotal = 0;

    for (let m = 1; m <= 12; m++) {
        const mesObj = meses[m];
        const dias = diasNoMes(m, ano);
        const noitesDisp = dias * 3;

        // Se tiver mês selecionado, só conta esse
        if (mesStr && Number(mesStr) !== m) continue;

        brutoTotal += mesObj.bruto;
        custosTotal += mesObj.custos;
        liquidoTotal += mesObj.liquido;
        noitesTotal += mesObj.noites;
        noitesDisponiveisTotal += noitesDisp;
    }

    const ocupacao = noitesDisponiveisTotal > 0
        ? (noitesTotal / noitesDisponiveisTotal) * 100
        : 0;

    const precoMedio = noitesTotal > 0
        ? brutoTotal / noitesTotal
        : 0;

    const lucro = liquidoTotal; // aqui podes depois subtrair outros custos fixos se quiseres

    kpiBruto.textContent = formatarEuro(brutoTotal);
    kpiLiquido.textContent = formatarEuro(liquidoTotal);
    kpiOcupacao.textContent = formatarPercent(ocupacao);
    kpiPrecoMedio.textContent = formatarEuro(precoMedio);
    kpiLucro.textContent = formatarEuro(lucro);
}

// -------------------------------------------------------------
// TABELA MENSAL (já existe no HTML)
// -------------------------------------------------------------

function atualizarTabelaMensal(ano) {
    const tbody = document.querySelector("#tabelaMensal tbody");
    tbody.innerHTML = "";

    if (!agregadosMensais[ano]) return;

    const meses = agregadosMensais[ano];

    for (let m = 1; m <= 12; m++) {
        const mesObj = meses[m];

        const tr = document.createElement("tr");

        const tdMes = document.createElement("td");
        tdMes.textContent = `${NOMES_MESES[m - 1]} ${ano}`;
        tr.appendChild(tdMes);

        const tdBruto = document.createElement("td");
        tdBruto.textContent = formatarEuro(mesObj.bruto);
        tr.appendChild(tdBruto);

        const tdCustos = document.createElement("td");
        tdCustos.textContent = formatarEuro(mesObj.custos);
        tr.appendChild(tdCustos);

        const tdLiquido = document.createElement("td");
        tdLiquido.textContent = formatarEuro(mesObj.liquido);
        tr.appendChild(tdLiquido);

        const tdOcupacao = document.createElement("td");
        tdOcupacao.textContent = formatarPercent(mesObj.ocupacao);
        tr.appendChild(tdOcupacao);

        const tdPrecoMedio = document.createElement("td");
        tdPrecoMedio.textContent = formatarEuro(mesObj.precoMedio);
        tr.appendChild(tdPrecoMedio);

        tbody.appendChild(tr);
    }
}

// -------------------------------------------------------------
// TABELA ANUAL COMPARATIVA (Formato 3: mini-tabela em cada célula)
// -------------------------------------------------------------

function atualizarTabelaAnualComparativa() {
    const tabela = document.getElementById("tabelaAnual");
    const thead = tabela.querySelector("thead");
    const tbody = tabela.querySelector("tbody");

    tbody.innerHTML = "";

    const anos = Object.keys(agregadosMensais)
        .map(a => Number(a))
        .sort((a, b) => a - b);

    if (anos.length === 0) {
        thead.innerHTML = `
            <tr>
                <th>Mês</th>
            </tr>
        `;
        return;
    }

    // Cabeçalho dinâmico: Mês + 1 coluna por ano
    let headerHtml = "<tr><th>Mês</th>";
    anos.forEach(ano => {
        headerHtml += `<th>${ano}</th>`;
    });
    headerHtml += "</tr>";
    thead.innerHTML = headerHtml;

    // Linhas: 12 meses
    for (let m = 1; m <= 12; m++) {
        const tr = document.createElement("tr");

        const tdMes = document.createElement("td");
        tdMes.textContent = NOMES_MESES[m - 1];
        tr.appendChild(tdMes);

        anos.forEach(ano => {
            const tdAno = document.createElement("td");

            const mesesAno = agregadosMensais[ano] || {};
            const mesObj = mesesAno[m] || {
                bruto: 0,
                custos: 0,
                liquido: 0,
                ocupacao: 0,
                precoMedio: 0
            };

            // Mini-tabela dentro da célula (Formato 3)
            tdAno.innerHTML = `
                <table class="mini-tabela">
                    <tr><td>Bruto:</td><td>${formatarEuro(mesObj.bruto)}</td></tr>
                    <tr><td>Custos:</td><td>${formatarEuro(mesObj.custos)}</td></tr>
                    <tr><td>Líquido:</td><td>${formatarEuro(mesObj.liquido)}</td></tr>
                    <tr><td>Ocupação:</td><td>${formatarPercent(mesObj.ocupacao)}</td></tr>
                    <tr><td>Preço Médio:</td><td>${formatarEuro(mesObj.precoMedio)}</td></tr>
                </table>
            `;

            tr.appendChild(tdAno);
        });

        tbody.appendChild(tr);
    }
}

// -------------------------------------------------------------
// GRÁFICOS (Chart.js) - versão simples mas funcional
// -------------------------------------------------------------

function atualizarGraficos(ano) {
    const meses = agregadosMensais[ano];
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

    // Receita Mensal
    const ctxReceita = document.getElementById("graficoReceita").getContext("2d");
    if (graficoReceita) graficoReceita.destroy();
    graficoReceita = new Chart(ctxReceita, {
        type: "bar",
        data: {
            labels,
            datasets: [{
                label: "Receita Bruta",
                data: dadosBruto,
                backgroundColor: "rgba(75, 192, 192, 0.6)"
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: true }
            }
        }
    });

    // Ocupação Mensal
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
            plugins: {
                legend: { display: true }
            },
            scales: {
                y: {
                    ticks: {
                        callback: value => `${value}%`
                    }
                }
            }
        }
    });

    // Distribuição de Custos
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
        options: {
            responsive: true,
            plugins: {
                legend: { display: true }
            }
        }
    });

    // Comparação Entre Anos (bruto ou líquido)
    const tipoComparacao = document.getElementById("tipoComparacao").value; // "bruto" ou "liquido"
    const ctxComparacao = document.getElementById("graficoComparacao").getContext("2d");
    if (graficoComparacao) graficoComparacao.destroy();

    const anos = Object.keys(agregadosAnuais)
        .map(a => Number(a))
        .sort((a, b) => a - b);

    const dadosComparacao = anos.map(a => {
        const obj = agregadosAnuais[a];
        return tipoComparacao === "bruto" ? obj.bruto : obj.liquido;
    });

    graficoComparacao = new Chart(ctxComparacao, {
        type: "bar",
        data: {
            labels: anos.map(a => a.toString()),
            datasets: [{
                label: tipoComparacao === "bruto" ? "Receita Bruta Anual" : "Receita Líquida Anual",
                data: dadosComparacao,
                backgroundColor: "rgba(54, 162, 235, 0.6)"
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: true }
            }
        }
    });
}

// -------------------------------------------------------------
// INICIALIZAÇÃO
// -------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
    carregarReservas();
});
