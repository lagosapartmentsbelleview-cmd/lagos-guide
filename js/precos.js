// ===============================
// FIREBASE – AUTENTICAÇÃO
// ===============================

firebase.auth().onAuthStateChanged(user => {
    if (!user) {
        alert("Sessão expirada. Por favor faça login novamente.");
        window.location.href = "login.html";
        return;
    }
    console.log("Utilizador autenticado:", user.email);
});

// ===============================
// ELEMENTOS BASE
// ===============================

const tabelaBody = document.querySelector("#tabelaResultados tbody");
window.concorrenciaLista = [];   // lista de preços Vitasol
window.filtrosGuardados = null;  // filtros aplicados

// ===============================
// CARREGAR DADOS VITASOL AO ABRIR
// ===============================

db.collection("concorrencia").doc("dados").get().then(doc => {
    if (doc.exists) {
        const dados = doc.data().lista || [];
        window.concorrenciaLista = dados;
        renderTabela(dados);

        const data = doc.data().atualizadoEm;
        document.getElementById("infoAtualizacao").textContent =
            "Última atualização: " + new Date(data).toLocaleString("pt-PT");
    } else {
        console.warn("Nenhum dado Vitasol encontrado no Firebase.");
    }
});

// ===============================
// BOTÕES PRINCIPAIS
// ===============================

const btnImportar = document.getElementById("btnImportar");
const btnExportar = document.getElementById("btnExportar");

// ===============================
// IMPORTAR DADOS VITASOL
// ===============================

btnImportar.addEventListener("click", () => {
    const texto = document.getElementById("inputConcorrencia").value.trim();
    if (!texto) {
        alert("Cole os dados do Booking ou Vitasol antes de importar.");
        return;
    }

    const dados = parseTextoConcorrencia(texto);

    renderTabela(dados);
    guardarConcorrencia(dados);
    atualizarDataAtualizacao();

    window.concorrenciaLista = dados;
});

// ===============================
// EXPORTAR (placeholder)
// ===============================

btnExportar.addEventListener("click", () => {
    alert("Exportação Excel será implementada na fase 2.");
});

// ===============================
// PARSER DE TEXTO (BOOKING / VITASOL)
// ===============================

function parseTextoConcorrencia(texto) {
    const linhas = texto.split(/\r?\n/);
    const meses = {
        "janeiro": "01", "fevereiro": "02", "março": "03", "abril": "04",
        "maio": "05", "junho": "06", "julho": "07", "agosto": "08",
        "setembro": "09", "outubro": "10", "novembro": "11", "dezembro": "12"
    };

    let anoAtual = "";
    let mesAtual = "";
    let diaAtual = "";
    const resultados = [];

    for (let i = 0; i < linhas.length; i++) {
        const linha = linhas[i].trim().toLowerCase();

        // Mês + ano
        for (const nomeMes in meses) {
            if (linha.includes(nomeMes)) {
                mesAtual = meses[nomeMes];
                const matchAno = linha.match(/\d{4}/);
                if (matchAno) anoAtual = matchAno[0];
                break;
            }
        }

        // Dia isolado
        if (/^\d{1,2}$/.test(linha)) {
            diaAtual = linha.padStart(2, "0");
        }

        // Preço
        if (linha.startsWith("€")) {
            const preco = parseFloat(linha.replace(/[^\d,]/g, "").replace(",", "."));
            if (diaAtual && mesAtual && anoAtual) {
                const data = `${anoAtual}-${mesAtual}-${diaAtual}`;
                const diaSemana = calcularDiaSemana(data);
                resultados.push({ data, dia: diaSemana, preco });
                diaAtual = "";
            }
        }
    }

    return resultados;
}

// ===============================
// RENDERIZAÇÃO DA TABELA IMPORTADA
// ===============================

function renderTabela(lista) {
    tabelaBody.innerHTML = "";

    lista.forEach(item => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${item.data}</td>
            <td>${item.dia}</td>
            <td>${item.preco}</td>
        `;

        tabelaBody.appendChild(tr);
    });
}

// ===============================
// GUARDAR NO FIREBASE
// ===============================

function guardarConcorrencia(dados) {
    db.collection("concorrencia").doc("dados").set({
        lista: dados,
        atualizadoEm: new Date().toISOString()
    })
    .then(() => console.log("✔ Dados guardados no Firebase"))
    .catch(err => console.error("Erro ao guardar no Firebase:", err));
}

// ===============================
// ATUALIZAR DATA
// ===============================

function atualizarDataAtualizacao() {
    const agora = new Date();
    const dataFormatada = agora.toLocaleString("pt-PT");

    document.getElementById("infoAtualizacao").textContent =
        "Última atualização: " + dataFormatada;
}

// ===============================
// LIMPAR DADOS
// ===============================

document.getElementById("btnLimpar").addEventListener("click", function () {
    const confirmar = confirm("Tem a certeza que deseja limpar todos os dados?\nEsta ação não pode ser anulada.");

    if (!confirmar) return;

    db.collection("concorrencia").doc("dados").delete();
    tabelaBody.innerHTML = "";
    document.getElementById("inputConcorrencia").value = "";
    document.getElementById("infoAtualizacao").textContent = "Última atualização: —";

    window.concorrenciaLista = [];

    alert("Dados limpos com sucesso.");
});

// ===============================
// FILTROS PERSISTENTES (GUARDAR + CARREGAR + APLICAR)
// ===============================

// Botões
document.getElementById("btnGuardarFiltros").addEventListener("click", guardarFiltros);
document.getElementById("btnAplicarFiltros").addEventListener("click", aplicarFiltros);

// Estado global dos filtros aplicados
window.filtrosGuardados = null;

// ===============================
// GUARDAR FILTROS NO FIREBASE
// ===============================

function guardarFiltros() {
    const filtros = {
        dataInicio: document.getElementById("dataInicio").value || "",
        dataFim: document.getElementById("dataFim").value || "",
        dataMargem: document.getElementById("dataMargem").value || "",
        margem: parseFloat(document.getElementById("inpMargem").value) || 0,

        genius: parseFloat(document.getElementById("selGenius").value) || 0,
        telemovel: document.getElementById("chkTelemovel").checked,
        pais: parseFloat(document.getElementById("inpPais").value) || 0,
        campanha: parseFloat(document.getElementById("inpCampanha").value) || 0,
        ofertaBasica: parseFloat(document.getElementById("inpOfertaBasica").value) || 0,
        ultimaHora: parseFloat(document.getElementById("inpOfertaUltimaHora").value) || 0,
        antecipada: parseFloat(document.getElementById("inpOfertaAntecipada").value) || 0,
        tempoLimitado: parseFloat(document.getElementById("inpTempoLimitado").value) || 0
    };

    db.collection("configuracao").doc("precos").set({
        filtros,
        atualizadoEm: new Date().toISOString()
    }).then(() => {
        alert("Filtros guardados com sucesso.");
    });
}

// ===============================
// CARREGAR FILTROS AO ABRIR A PÁGINA
// ===============================

db.collection("configuracao").doc("precos").get().then(doc => {
    if (!doc.exists) {
        console.warn("Nenhum filtro guardado encontrado.");
        return;
    }

    const filtros = doc.data().filtros;
    if (!filtros) return;

    // Preencher inputs
    document.getElementById("dataInicio").value = filtros.dataInicio || "";
    document.getElementById("dataFim").value = filtros.dataFim || "";
    document.getElementById("dataMargem").value = filtros.dataMargem || "";
    document.getElementById("inpMargem").value = filtros.margem ?? 1;

    document.getElementById("selGenius").value = filtros.genius ?? 0;
    document.getElementById("chkTelemovel").checked = filtros.telemovel ?? false;
    document.getElementById("inpPais").value = filtros.pais ?? 0;
    document.getElementById("inpCampanha").value = filtros.campanha ?? 0;
    document.getElementById("inpOfertaBasica").value = filtros.ofertaBasica ?? 0;
    document.getElementById("inpOfertaUltimaHora").value = filtros.ultimaHora ?? 0;
    document.getElementById("inpOfertaAntecipada").value = filtros.antecipada ?? 0;
    document.getElementById("inpTempoLimitado").value = filtros.tempoLimitado ?? 0;

    // Aplicar automaticamente
    aplicarFiltros();
});

// ===============================
// APLICAR FILTROS (SEM GUARDAR)
// ===============================

function aplicarFiltros() {
    const margem = parseFloat(document.getElementById("inpMargem").value) || 0;

    window.filtrosGuardados = {
        genius: parseFloat(document.getElementById("selGenius").value) || 0,
        telemovel: document.getElementById("chkTelemovel").checked ? 0.10 : 0,
        pais: (parseFloat(document.getElementById("inpPais").value) || 0) / 100,
        campanha: (parseFloat(document.getElementById("inpCampanha").value) || 0) / 100,
        ofertaBasica: (parseFloat(document.getElementById("inpOfertaBasica").value) || 0) / 100,
        ultimaHora: (parseFloat(document.getElementById("inpOfertaUltimaHora").value) || 0) / 100,
        antecipada: (parseFloat(document.getElementById("inpOfertaAntecipada").value) || 0) / 100,
        tempoLimitado: (parseFloat(document.getElementById("inpTempoLimitado").value) || 0) / 100,
        margem
    };

    // Gerar grelha e tabela automaticamente
    gerarGrelha();
    gerarTabelaNova();
    preencherTabelaNova();
}

// ===============================
// FERIADOS FIXOS
// ===============================

const feriadosFixos = {
    "01-01": "Ano Novo",
    "04-25": "25 de Abril",
    "05-01": "Dia do Trabalhador",
    "06-10": "Dia de Portugal",
    "08-15": "Assunção de Maria",
    "10-05": "Implantação da República",
    "11-01": "Dia de Todos os Santos",
    "12-01": "Restauração da Independência",
    "12-08": "Imaculada Conceição",
    "12-25": "Natal"
};

// ===============================
// EVENTOS
// ===============================

const eventos = [
    { nome: "Festival dos Descobrimentos", inicio: "2026-05-01", fim: "2026-05-05", local: "Lagos" },
    { nome: "MotoGP Portimão", inicio: "2026-03-20", fim: "2026-03-22", local: "Portimão" }
];

function eventosDoDia(dataISO) {
    return eventos.filter(ev => dataISO >= ev.inicio && dataISO <= ev.fim);
}

// ===============================
// DISPONIBILIDADE (placeholder)
// ===============================

function obterDisponibilidade(dataISO) {
    return 2; // 0 = esgotado, 1–3 = disponível
}

// ===============================
// LEITURA DA MARGEM
// ===============================

function lerMargem() {
    const m = parseFloat(document.getElementById("inpMargem").value);
    return isNaN(m) ? 0 : m;
}

// ===============================
// CÁLCULO DO PREÇO BASE SEGMENTADO
// ===============================

function calcularPrecoBaseSegmentado(precoFinal, d) {

    // 1) Ofertas especiais anulam tudo
    const ofertaEspecial = Math.max(
        d.tempoLimitado || 0
    );
    if (ofertaEspecial > 0) {
        return precoFinal / (1 - ofertaEspecial);
    }

    let preco = precoFinal;

    // 2) Genius
    if (d.genius > 0) {
        preco = preco / (1 - d.genius);
    }

    // 3) Segmentação (só se não houver campanha)
    const seg = Math.max(
        d.telemovel || 0,
        d.pais || 0
    );

    const campanha = d.campanha || 0;

    if (seg > 0 && campanha === 0) {
        preco = preco / (1 - seg);
    }

    // 4) Campanha
    if (campanha > 0) {
        preco = preco / (1 - campanha);
    }

    // 5) Portefólio
    const portefolio = Math.max(
        d.ofertaBasica || 0,
        d.ultimaHora || 0,
        d.antecipada || 0
    );

    if (portefolio > 0) {
        preco = preco / (1 - portefolio);
    }

    return preco;
}

// ===============================
// BUSCAR PREÇO VITASOL
// ===============================

function obterPrecoVitasol(dataISO) {
    if (!window.concorrenciaLista) return null;
    const item = window.concorrenciaLista.find(x => x.data === dataISO);
    return item ? item.preco : null;
}

// ===============================
// GERAÇÃO DA GRELHA
// ===============================

function gerarGrelha() {
    const dataInicio = document.getElementById("dataInicio").value;
    const dataFim = document.getElementById("dataFim").value;

    if (!dataInicio || !dataFim) {
        console.warn("Datas de início ou fim em falta.");
        return;
    }

    const listaDatas = gerarIntervaloDatas(dataInicio, dataFim);

    const grelha = document.getElementById("grelhaDias");
    grelha.innerHTML = "";

    listaDatas.forEach(dataISO => {
        const dateObj = new Date(dataISO);
        const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
        const diaSemana = diasSemana[dateObj.getDay()];

        const mesStr = dataISO.split("-")[1];
        const diaStr = dataISO.split("-")[2];

        const fimDeSemana = (diaSemana === "Sáb" || diaSemana === "Dom");
        const feriadoNome = feriadosFixos[`${mesStr}-${diaStr}`] || null;
        const eventosHoje = eventosDoDia(dataISO);

        const vitasol = obterPrecoVitasol(dataISO);
        const dispo = obterDisponibilidade(dataISO);

        if (dispo === 0) {
            grelha.appendChild(criarCardEsgotado(dataISO, diaSemana));
            return;
        }

        const descontos = window.filtrosGuardados || {};
        const margem = lerMargem();

        const finalDesejado = vitasol ? vitasol - margem : null;
        const baseBooking = finalDesejado ? calcularPrecoBaseSegmentado(finalDesejado, descontos) : null;

        grelha.appendChild(
            criarCardDia({
                dataISO,
                diaSemana,
                fimDeSemana,
                feriadoNome,
                eventosHoje,
                vitasol,
                finalDesejado,
                baseBooking,
                dispo
            })
        );
    });
}

// ===============================
// CARTÕES
// ===============================

function criarCardDia(info) {
    const card = document.createElement("div");
    card.className = "card-dia";

    card.innerHTML = `
        <h4>📅 ${info.dataISO} (${info.diaSemana})</h4>

        ${info.fimDeSemana ? `<div class="tag fds">🔵 Fim de semana</div>` : ""}
        ${info.feriadoNome ? `<div class="tag feriado">🔴 ${info.feriadoNome}</div>` : ""}
        ${info.eventosHoje.length > 0 ? info.eventosHoje.map(ev => `<div class="tag evento">🟠 ${ev.nome}</div>`).join("") : ""}

        <div class="tag">💰 Vitasol: ${info.vitasol ? info.vitasol + " €" : "—"}</div>
        <div class="tag">🎯 Final: ${info.finalDesejado ? info.finalDesejado.toFixed(2) + " €" : "—"}</div>
        <div class="tag">🏷️ Base: ${info.baseBooking ? info.baseBooking.toFixed(2) + " €" : "—"}</div>
        <div class="tag dispo">🟢 Disponibilidade: ${info.dispo}/3</div>
    `;

    return card;
}

function criarCardEsgotado(dataISO, diaSemana) {
    const card = document.createElement("div");
    card.className = "card-dia card-esgotado";

    card.innerHTML = `
        <h4>📅 ${dataISO} (${diaSemana})</h4>
        <div class="tag">❌ Esgotado</div>
    `;

    return card;
}

// ===============================
// INTERVALO DE DATAS
// ===============================

function gerarIntervaloDatas(inicioISO, fimISO) {
    const datas = [];
    let atual = new Date(inicioISO);
    const fim = new Date(fimISO);

    while (atual <= fim) {
        const ano = atual.getFullYear();
        const mes = String(atual.getMonth() + 1).padStart(2, "0");
        const dia = String(atual.getDate()).padStart(2, "0");
        datas.push(`${ano}-${mes}-${dia}`);
        atual.setDate(atual.getDate() + 1);
    }

    return datas;
}

// ===============================
// TABELA NOVA (INTERVALO COMPLETO)
// ===============================

function gerarTabelaNova() {
    const dataInicio = document.getElementById("dataInicio").value;
    const dataFim = document.getElementById("dataFim").value;

    if (!dataInicio || !dataFim) {
        console.warn("Datas de início ou fim em falta.");
        return;
    }

    const listaDatas = gerarIntervaloDatas(dataInicio, dataFim);

    let html = `<table id="tabelaNova"><thead><tr><th>Categoria</th>`;

    listaDatas.forEach(dataISO => {
        const dia = dataISO.split("-")[2];
        html += `<th>${dia}</th>`;
    });

    html += `</tr></thead><tbody>`;

    const categorias = [
        "Preço Vitasol",
        "Dia da Semana",
        "Feriado",
        "Evento",
        "Preço Final",
        "Preço Base",
        "Disponibilidade"
    ];

    categorias.forEach(cat => {
        html += `<tr><td><strong>${cat}</strong></td>`;

        listaDatas.forEach(dataISO => {
            html += `<td data-dia="${dataISO}" data-cat="${cat}">—</td>`;
        });

        html += `</tr>`;
    });

    html += `</tbody></table>`;

    document.getElementById("tabelaNovaContainer").innerHTML = html;
}

// ===============================
// PREENCHER TABELA NOVA
// ===============================

function preencherTabelaNova() {
    const descontos = window.filtrosGuardados || {};
    const margem = lerMargem();

    document.querySelectorAll("#tabelaNova td[data-dia]").forEach(td => {
        const dataISO = td.getAttribute("data-dia");
        const categoria = td.getAttribute("data-cat");

        let valor = "—";

        switch (categoria) {

            case "Preço Vitasol":
                const vitasol = obterPrecoVitasol(dataISO);
                valor = vitasol ? vitasol + " €" : "—";
                break;

            case "Dia da Semana":
                valor = calcularDiaSemana(dataISO);
                break;

            case "Feriado":
                const [ano, mes, dia] = dataISO.split("-");
                const feriado = feriadosFixos[`${mes}-${dia}`];
                valor = feriado || "—";
                break;

            case "Evento":
                const evs = eventosDoDia(dataISO);
                valor = evs.length > 0 ? evs.map(e => e.nome).join(", ") : "—";
                break;

            case "Preço Final":
                const precoVit = obterPrecoVitasol(dataISO);
                valor = precoVit ? (precoVit - margem).toFixed(2) + " €" : "—";
                break;

            case "Preço Base":
                const vit = obterPrecoVitasol(dataISO);
                if (vit) {
                    const final = vit - margem;
                    const base = calcularPrecoBaseSegmentado(final, descontos);
                    valor = base ? base.toFixed(2) + " €" : "—";
                }
                break;

            case "Disponibilidade":
                const dispo = obterDisponibilidade(dataISO);
                valor = dispo ? dispo + "/3" : "—";
                break;
        }

        td.textContent = valor;
    });
}

// ===============================
// FUNÇÕES AUXILIARES
// ===============================

// Dia da semana (texto)
function calcularDiaSemana(dataISO) {
    const dias = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    const d = new Date(dataISO);
    return dias[d.getDay()];
}

// Converter YYYY-MM-DD → objeto Date
function parseISO(dataISO) {
    const [ano, mes, dia] = dataISO.split("-").map(Number);
    return new Date(ano, mes - 1, dia);
}

// Verifica se data está dentro de intervalo
function dentroIntervalo(dataISO, inicioISO, fimISO) {
    const d = parseISO(dataISO);
    return d >= parseISO(inicioISO) && d <= parseISO(fimISO);
}

// Adicionar dias a uma data
function adicionarDias(dataISO, dias) {
    const d = parseISO(dataISO);
    d.setDate(d.getDate() + dias);
    const ano = d.getFullYear();
    const mes = String(d.getMonth() + 1).padStart(2, "0");
    const dia = String(d.getDate()).padStart(2, "0");
    return `${ano}-${mes}-${dia}`;
}

// Formatar data DD/MM
function formatarDDMM(dataISO) {
    const [ano, mes, dia] = dataISO.split("-");
    return `${dia}/${mes}`;
}

// ===============================
// DEBUG (opcional)
// ===============================

function debug(...args) {
    console.log("[DEBUG]", ...args);
}

// ===============================
// FINAL
// ===============================

console.log("✔ precos.js carregado com sucesso.");

