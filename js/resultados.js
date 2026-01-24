// js/resultados.js
console.log("JS RESULTADOS A CORRER");

async function carregarReservasNormalizadas() {
    const snap = await db.collection("reservas").orderBy("checkin").get();

    const lista = [];
    snap.forEach(doc => lista.push({ id: doc.id, ...doc.data() }));

    lista.forEach(r => {

        // Nome do cliente
        r.cliente = r.cliente || r.reservadoPor || "";

        // Pessoas
        r.adultos = Number(r.adultos || 0);
        r.criancas = Number(r.criancas || 0);
        r.hospedes = Number(r.hospedes || (r.adultos + r.criancas));

        // Idades
        r.idadesCriancas = r.idadesCriancas || "";

        // Berço
        r.berco = !!r.berco;

        // Comentários
        r.comentarios = r.comentarios || r.observacoes || "";

        // Apartamentos sempre array de strings
        if (!Array.isArray(r.apartamentos)) {
            if (r.apartamentos) {
                r.apartamentos = [String(r.apartamentos)];
            } else {
                r.apartamentos = [];
            }
        } else {
            r.apartamentos = r.apartamentos.map(a => String(a));
        }

        // Datas já vêm em dd/mm/yyyy → OK
    });

    return lista;
}


// -------------------------------------------------------------
// 0) ESTADO GLOBAL
// -------------------------------------------------------------
let reservasResultados = [];
let graficoReceita, graficoOcupacao, graficoCustos, graficoComparacao;

// assume os mesmos apartamentos fixos da listagem
const APARTAMENTOS_FIXOS = ["2301", "2203", "2204"];

// -------------------------------------------------------------
// 1) HELPERS DE DATAS E PERIODOS
// -------------------------------------------------------------
function parseDataPt(str) {
    if (!str) return null;
    const [d, m, a] = str.split("/").map(Number);
    return new Date(a, m - 1, d);
}

function getAnoMes(reserva) {
    const d = parseDataPt(reserva.checkin);
    if (!d) return { ano: null, mes: null };
    return { ano: d.getFullYear(), mes: d.getMonth() + 1 };
}

function nomeMes(m) {
    const nomes = [
        "", "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
        "Jul", "Ago", "Set", "Out", "Nov", "Dez"
    ];
    return nomes[m] || "";
}

function diasNoMes(ano, mes) {
    return new Date(ano, mes, 0).getDate();
}

function diasNoAno(ano) {
    return ((ano % 4 === 0 && ano % 100 !== 0) || ano % 400 === 0) ? 366 : 365;
}

// -------------------------------------------------------------
// 2) HELPERS FINANCEIROS
// -------------------------------------------------------------
function obterComissaoTotal(r) {
    const base = Number(r.comissao || 0);
    const extra = Number(r.comissaoExtra || 0);
    if (r.comissaoTotal !== undefined) return Number(r.comissaoTotal);
    return base + extra;
}

function obterLimpeza(r) {
    return Number(r.limpeza || 0);
}

function obterTotalBruto(r) {
    return Number(r.totalBruto || 0);
}

function obterNoites(r) {
    return Number(r.noites || 0);
}

function formatarEuro(valor) {
    return Number(valor || 0).toFixed(2) + " €";
}

function formatarPercent(valor) {
    return Number(valor || 0).toFixed(1) + " %";
}

// -------------------------------------------------------------
// 3) AGREGADORES (MENSAL / ANUAL)
// -------------------------------------------------------------
function agregarPorAno(reservas) {
    const mapa = {};

    reservas.forEach(r => {
        const { ano } = getAnoMes(r);
        if (!ano) return;

        if (!mapa[ano]) {
            mapa[ano] = {
                ano,
                receitaBruta: 0,
                custos: 0,
                receitaLiquida: 0,
                noitesOcupadas: 0,
                noitesDisponiveis: diasNoAno(ano) * APARTAMENTOS_FIXOS.length
            };
        }

        const bruto = obterTotalBruto(r);
        const comissaoTotal = obterComissaoTotal(r);
        const limpeza = obterLimpeza(r);
        const noites = obterNoites(r);

        mapa[ano].receitaBruta += bruto;
        mapa[ano].custos += comissaoTotal + limpeza;
        mapa[ano].noitesOcupadas += noites;
    });

    Object.values(mapa).forEach(a => {
        a.receitaLiquida = a.receitaBruta - a.custos;
        a.ocupacao = a.noitesDisponiveis > 0
            ? (a.noitesOcupadas / a.noitesDisponiveis) * 100
            : 0;
        a.precoMedio = a.noitesOcupadas > 0
            ? a.receitaBruta / a.noitesOcupadas
            : 0;
    });

    return mapa;
}

function agregarPorMes(reservas) {
    const mapa = {};

    reservas.forEach(r => {
        const { ano, mes } = getAnoMes(r);
        if (!ano || !mes) return;

        const chave = `${ano}-${mes}`;
        if (!mapa[chave]) {
            mapa[chave] = {
                ano,
                mes,
                receitaBruta: 0,
                custos: 0,
                receitaLiquida: 0,
                noitesOcupadas: 0,
                noitesDisponiveis: diasNoMes(ano, mes) * APARTAMENTOS_FIXOS.length
            };
        }

        const bruto = obterTotalBruto(r);
        const comissaoTotal = obterComissaoTotal(r);
        const limpeza = obterLimpeza(r);
        const noites = obterNoites(r);

        mapa[chave].receitaBruta += bruto;
        mapa[chave].custos += comissaoTotal + limpeza;
        mapa[chave].noitesOcupadas += noites;
    });

    Object.values(mapa).forEach(m => {
        m.receitaLiquida = m.receitaBruta - m.custos;
        m.ocupacao = m.noitesDisponiveis > 0
            ? (m.noitesOcupadas / m.noitesDisponiveis) * 100
            : 0;
        m.precoMedio = m.noitesOcupadas > 0
            ? m.receitaBruta / m.noitesOcupadas
            : 0;
    });

    return mapa;
}

// -------------------------------------------------------------
// 4) FILTROS DO DASHBOARD
// -------------------------------------------------------------
function obterFiltroAnoMes() {
    const ano = Number(document.getElementById("filtroAno").value || 0);
    const mes = Number(document.getElementById("filtroMes").value || 0);
    return { ano: ano || null, mes: mes || null };
}

function filtrarReservasPorPeriodo(reservas, ano, mes) {
    if (!ano && !mes) return reservas;

    return reservas.filter(r => {
        const d = parseDataPt(r.checkin);
        if (!d) return false;

        if (ano && d.getFullYear() !== ano) return false;
        if (mes && (d.getMonth() + 1) !== mes) return false;

        return true;
    });
}

// -------------------------------------------------------------
// 5) ATUALIZAR KPIs
// -------------------------------------------------------------
function atualizarKPIs(reservas, ano, mes) {
    const filtradas = filtrarReservasPorPeriodo(reservas, ano, mes);

    let receitaBruta = 0;
    let custos = 0;
    let noitesOcupadas = 0;
    let noitesDisponiveis = 0;

    filtradas.forEach(r => {
        const bruto = obterTotalBruto(r);
        const comissaoTotal = obterComissaoTotal(r);
        const limpeza = obterLimpeza(r);
        const noites = obterNoites(r);

        receitaBruta += bruto;
        custos += comissaoTotal + limpeza;
        noitesOcupadas += noites;

        const d = parseDataPt(r.checkin);
        if (d) {
            const anoR = d.getFullYear();
            const mesR = d.getMonth() + 1;
            if (ano && mes) {
                noitesDisponiveis = diasNoMes(ano, mes) * APARTAMENTOS_FIXOS.length;
            } else if (ano && !mes) {
                noitesDisponiveis = diasNoAno(ano) * APARTAMENTOS_FIXOS.length;
            }
        }
    });

    if (!ano && !mes) {
        // período total
        const anos = new Set();
        reservas.forEach(r => {
            const d = parseDataPt(r.checkin);
            if (d) anos.add(d.getFullYear());
        });
        anos.forEach(a => {
            noitesDisponiveis += diasNoAno(a) * APARTAMENTOS_FIXOS.length;
        });
    }

    const receitaLiquida = receitaBruta - custos;
    const lucro = receitaLiquida; // por agora igual
    const ocupacao = noitesDisponiveis > 0
        ? (noitesOcupadas / noitesDisponiveis) * 100
        : 0;
    const precoMedio = noitesOcupadas > 0
        ? receitaBruta / noitesOcupadas
        : 0;

    document.getElementById("kpiReceitaBruta").textContent = formatarEuro(receitaBruta);
    document.getElementById("kpiReceitaLiquida").textContent = formatarEuro(receitaLiquida);
    document.getElementById("kpiOcupacao").textContent = formatarPercent(ocupacao);
    document.getElementById("kpiPrecoMedio").textContent = formatarEuro(precoMedio);
    document.getElementById("kpiLucro").textContent = formatarEuro(lucro);
}

// -------------------------------------------------------------
// 6) TABELAS MENSAL / ANUAL
// -------------------------------------------------------------
function preencherTabelaMensal(mapaMensal) {
    const tbody = document.querySelector("#tabelaMensal tbody");
    tbody.innerHTML = "";

    const linhas = Object.values(mapaMensal).sort((a, b) => {
        if (a.ano !== b.ano) return a.ano - b.ano;
        return a.mes - b.mes;
    });

    linhas.forEach(m => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${nomeMes(m.mes)} ${m.ano}</td>
            <td>${formatarEuro(m.receitaBruta)}</td>
            <td>${formatarEuro(m.custos)}</td>
            <td>${formatarEuro(m.receitaLiquida)}</td>
            <td>${formatarPercent(m.ocupacao)}</td>
            <td>${formatarEuro(m.precoMedio)}</td>
        `;
        tbody.appendChild(tr);
    });
}

function preencherTabelaAnual(mapaAnual) {
    const tbody = document.querySelector("#tabelaAnual tbody");
    tbody.innerHTML = "";

    const linhas = Object.values(mapaAnual).sort((a, b) => a.ano - b.ano);

    linhas.forEach(a => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${a.ano}</td>
            <td>${formatarEuro(a.receitaBruta)}</td>
            <td>${formatarEuro(a.custos)}</td>
            <td>${formatarEuro(a.receitaLiquida)}</td>
            <td>${formatarPercent(a.ocupacao)}</td>
            <td>${formatarEuro(a.precoMedio)}</td>
        `;
        tbody.appendChild(tr);
    });
}

// -------------------------------------------------------------
// 7) GRÁFICOS
// -------------------------------------------------------------
function criarOuAtualizarGrafico(ctx, tipo, dados, opcoes, instanciaAtual) {
    if (instanciaAtual) instanciaAtual.destroy();
    return new Chart(ctx, {
        type: tipo,
        data: dados,
        options: opcoes
    });
}

function atualizarGraficos(mapaMensal, mapaAnual, anoFiltro) {
    const ctxReceita = document.getElementById("graficoReceita").getContext("2d");
    const ctxOcupacao = document.getElementById("graficoOcupacao").getContext("2d");
    const ctxCustos = document.getElementById("graficoCustos").getContext("2d");
    const ctxComparacao = document.getElementById("graficoComparacao").getContext("2d");

    // --- Receita Mensal (barras) ---
    const mesesOrdenados = Object.values(mapaMensal)
        .filter(m => !anoFiltro || m.ano === anoFiltro)
        .sort((a, b) => (a.ano - b.ano) || (a.mes - b.mes));

    const labelsMes = mesesOrdenados.map(m => `${nomeMes(m.mes)} ${m.ano}`);
    const dadosBrutoMes = mesesOrdenados.map(m => m.receitaBruta);
    const dadosLiquidoMes = mesesOrdenados.map(m => m.receitaLiquida);

    graficoReceita = criarOuAtualizarGrafico(
        ctxReceita,
        "bar",
        {
            labels: labelsMes,
            datasets: [
                {
                    label: "Receita Bruta",
                    data: dadosBrutoMes,
                    backgroundColor: "rgba(25, 118, 210, 0.7)"
                },
                {
                    label: "Receita Líquida",
                    data: dadosLiquidoMes,
                    backgroundColor: "rgba(13, 71, 161, 0.7)"
                }
            ]
        },
        {
            responsive: true,
            plugins: { legend: { position: "top" } },
            scales: { y: { beginAtZero: true } }
        },
        graficoReceita
    );

    // --- Ocupação Mensal (linha) ---
    const dadosOcupacaoMes = mesesOrdenados.map(m => m.ocupacao);

    graficoOcupacao = criarOuAtualizarGrafico(
        ctxOcupacao,
        "line",
        {
            labels: labelsMes,
            datasets: [
                {
                    label: "Ocupação (%)",
                    data: dadosOcupacaoMes,
                    borderColor: "rgba(25, 118, 210, 1)",
                    backgroundColor: "rgba(25, 118, 210, 0.2)",
                    tension: 0.2
                }
            ]
        },
        {
            responsive: true,
            plugins: { legend: { position: "top" } },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        },
        graficoOcupacao
    );

    // --- Distribuição de Custos (pizza) ---
    let totalComissoes = 0;
    let totalLimpezas = 0;

    reservasResultados.forEach(r => {
        totalComissoes += obterComissaoTotal(r);
        totalLimpezas += obterLimpeza(r);
    });

    graficoCustos = criarOuAtualizarGrafico(
        ctxCustos,
        "pie",
        {
            labels: ["Comissões", "Limpezas"],
            datasets: [
                {
                    data: [totalComissoes, totalLimpezas],
                    backgroundColor: [
                        "rgba(25, 118, 210, 0.8)",
                        "rgba(13, 71, 161, 0.8)"
                    ]
                }
            ]
        },
        {
            responsive: true,
            plugins: { legend: { position: "bottom" } }
        },
        graficoCustos
    );

    // --- Comparação Anual (barras lado a lado) ---
    const anosOrdenados = Object.values(mapaAnual).sort((a, b) => a.ano - b.ano);
    const labelsAno = anosOrdenados.map(a => a.ano);
    const dadosBrutoAno = anosOrdenados.map(a => a.receitaBruta);
    const dadosLiquidoAno = anosOrdenados.map(a => a.receitaLiquida);

    graficoComparacao = criarOuAtualizarGrafico(
        ctxComparacao,
        "bar",
        {
            labels: labelsAno,
            datasets: [
                {
                    label: "Receita Bruta",
                    data: dadosBrutoAno,
                    backgroundColor: "rgba(25, 118, 210, 0.7)"
                },
                {
                    label: "Receita Líquida",
                    data: dadosLiquidoAno,
                    backgroundColor: "rgba(13, 71, 161, 0.7)"
                }
            ]
        },
        {
            responsive: true,
            plugins: { legend: { position: "top" } },
            scales: { y: { beginAtZero: true } }
        },
        graficoComparacao
    );
}

// -------------------------------------------------------------
// 8) POPULAR SELECT DE ANOS
// -------------------------------------------------------------
function popularAnos(reservas) {
    const selectAno = document.getElementById("filtroAno");
    selectAno.innerHTML = "";

    const anos = new Set();
    reservas.forEach(r => {
        const d = parseDataPt(r.checkin);
        if (d) anos.add(d.getFullYear());
    });

    const anosOrdenados = Array.from(anos).sort((a, b) => a - b);

    const optTodos = document.createElement("option");
    optTodos.value = "";
    optTodos.textContent = "Todos";
    selectAno.appendChild(optTodos);

    anosOrdenados.forEach(a => {
        const opt = document.createElement("option");
        opt.value = a;
        opt.textContent = a;
        selectAno.appendChild(opt);
    });
}

// -------------------------------------------------------------
// 9) APLICAR FILTROS DO DASHBOARD
// -------------------------------------------------------------
function aplicarFiltrosResultados() {
    const { ano, mes } = obterFiltroAnoMes();
    const mapaMensal = agregarPorMes(reservasResultados);
    const mapaAnual = agregarPorAno(reservasResultados);

    atualizarKPIs(reservasResultados, ano, mes);
    preencherTabelaMensal(mapaMensal);
    preencherTabelaAnual(mapaAnual);
    atualizarGraficos(mapaMensal, mapaAnual, ano);
}

// -------------------------------------------------------------
// 10) INICIAR RESULTADOS
// -------------------------------------------------------------
async function iniciarResultados() {
    reservasResultados = await carregarReservasNormalizadas();
    popularAnos(reservasResultados);

    document.getElementById("btnAplicarFiltros").addEventListener("click", aplicarFiltrosResultados);

    aplicarFiltrosResultados();
}

// Esperar Firebase
firebase.auth().onAuthStateChanged(user => {
    if (!user) {
        window.location.href = "login.html";
        return;
    }

    iniciarResultados();
});

