// ===============================
// FIREBASE – CARREGAR DADOS AO INICIAR
// ===============================

firebase.auth().onAuthStateChanged(user => {
    if (!user) {
        alert("Sessão expirada. Por favor faça login novamente.");
        window.location.href = "login.html"; // ajusta para o teu login
        return;
    }

    console.log("Utilizador autenticado:", user.email);
});


const tabelaBody = document.querySelector("#tabelaResultados tbody");

// Carregar dados guardados no Firebase ao abrir a página
db.collection("concorrencia").doc("dados").get().then(doc => {
    if (doc.exists) {
        const dados = doc.data().lista;
        renderTabela(dados);

        const data = doc.data().atualizadoEm;
        document.getElementById("infoAtualizacao").textContent =
            "Última atualização: " + new Date(data).toLocaleString("pt-PT");
    }
});

// ===============================
// BOTÕES
// ===============================

const btnImportar = document.getElementById("btnImportar");
const btnExportar = document.getElementById("btnExportar");

// ===============================
// IMPORTAR DADOS
// ===============================

btnImportar.addEventListener("click", () => {
    const texto = document.getElementById("inputConcorrencia").value;

    const dados = parseTextoConcorrencia(texto);

    renderTabela(dados);
    guardarConcorrencia(dados);
    atualizarDataAtualizacao();
});

// ===============================
// EXPORTAR (Fase 2)
// ===============================

btnExportar.addEventListener("click", () => {
    alert("Exportação Excel será implementada na fase 2.");
});

// ===============================
// PARSER PRINCIPAL
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

        // Detectar mês e ano
        for (const nomeMes in meses) {
            if (linha.includes(nomeMes)) {
                mesAtual = meses[nomeMes];
                const matchAno = linha.match(/\d{4}/);
                if (matchAno) anoAtual = matchAno[0];
                break;
            }
        }

        // Detectar dia
        if (/^\d{1,2}$/.test(linha)) {
            diaAtual = linha.padStart(2, "0");
        }

        // Detectar preço
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

function calcularDiaSemana(dataStr) {
    const dias = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
    const [ano, mes, dia] = dataStr.split("-");
    const date = new Date(`${ano}-${mes}-${dia}`);
    return dias[date.getDay()];
}

// ===============================
// RENDERIZAÇÃO DA TABELA
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

    // 1. Apagar do Firebase
    db.collection("concorrencia").doc("dados").delete();

    // 2. Limpar tabela
    tabelaBody.innerHTML = "";

    // 3. Limpar textarea
    document.getElementById("inputConcorrencia").value = "";

    // 4. Limpar data
    document.getElementById("infoAtualizacao").textContent = "Última atualização: —";

    alert("Dados limpos com sucesso.");
});
// ===============================
// GRELHA MENSAL – CARTÕES
// ===============================

// Feriados nacionais (fixos + móveis)
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

// Eventos (exemplo)
const eventos = [
    { nome: "Festival dos Descobrimentos", inicio: "2026-05-01", fim: "2026-05-05", local: "Lagos" },
    { nome: "MotoGP Portimão", inicio: "2026-03-20", fim: "2026-03-22", local: "Portimão" }
];

// Disponibilidade (placeholder)
function obterDisponibilidade(dataISO) {
    return 2; // depois ligamos ao teu sistema real
}

// Verifica se data está dentro de um evento
function eventosDoDia(dataISO) {
    return eventos.filter(ev => dataISO >= ev.inicio && dataISO <= ev.fim);
}

// Gera cartões ao mudar mês/ano
document.getElementById("selAno").addEventListener("change", gerarGrelha);
document.getElementById("selMes").addEventListener("change", gerarGrelha);

function gerarGrelha() {
    const ano = parseInt(document.getElementById("selAno").value);
    const mes = parseInt(document.getElementById("selMes").value);

    const grelha = document.getElementById("grelhaDias");
    grelha.innerHTML = "";

    const diasNoMes = new Date(ano, mes + 1, 0).getDate();

    for (let dia = 1; dia <= diasNoMes; dia++) {
        const diaStr = String(dia).padStart(2, "0");
        const mesStr = String(mes + 1).padStart(2, "0");
        const dataISO = `${ano}-${mesStr}-${diaStr}`;

        const dateObj = new Date(dataISO);
        const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
        const diaSemana = diasSemana[dateObj.getDay()];

        const fimDeSemana = (diaSemana === "Sáb" || diaSemana === "Dom");

        const feriadoNome = feriadosFixos[`${mesStr}-${diaStr}`] || null;

        const eventosHoje = eventosDoDia(dataISO);

        // Preço Vitasol
        const vitasol = obterPrecoVitasol(dataISO);

        // Disponibilidade
        const dispo = obterDisponibilidade(dataISO);

        // Se esgotado → cartão cinzento
        if (dispo === 0) {
            grelha.appendChild(criarCardEsgotado(dataISO, diaSemana));
            continue;
        }

        // Descontos
        const descontos = lerDescontosSelecionados();
        const margem = lerMargem();

        let finalDesejado = vitasol ? vitasol - margem : null;
        let baseBooking = finalDesejado ? calcularPrecoBase(finalDesejado, descontos) : null;

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
    }
}

// Busca preço Vitasol importado
function obterPrecoVitasol(dataISO) {
    if (!window.concorrenciaLista) return null;
    const item = window.concorrenciaLista.find(x => x.data === dataISO);
    return item ? item.preco : null;
}

// Guardar lista global ao carregar Firebase
db.collection("concorrencia").doc("dados").get().then(doc => {
    if (doc.exists) {
        window.concorrenciaLista = doc.data().lista;
    }
});

// Cria cartão normal
function criarCardDia(info) {
    const card = document.createElement("div");
    card.className = "card-dia";

    card.innerHTML = `
        <h4>📅 ${info.dataISO} (${info.diaSemana})</h4>

        ${info.fimDeSemana ? `<div class="tag fds">🔵 Fim de semana</div>` : ""}

        ${info.feriadoNome ? `<div class="tag feriado">🔴 ${info.feriadoNome}</div>` : ""}

        ${info.eventosHoje.length > 0 ? 
            info.eventosHoje.map(ev => `<div class="tag evento">🟠 ${ev.nome}</div>`).join("") 
            : ""}

        <div class="tag">💰 Vitasol: ${info.vitasol ? info.vitasol + " €" : "—"}</div>

        <div class="tag">🎯 Final: ${info.finalDesejado ? info.finalDesejado.toFixed(2) + " €" : "—"}</div>

        <div class="tag">🏷️ Base: ${info.baseBooking ? info.baseBooking.toFixed(2) + " €" : "—"}</div>

        <div class="tag dispo">🟢 Disponibilidade: ${info.dispo}/3</div>
    `;

    return card;
}

// Cartão esgotado
function criarCardEsgotado(dataISO, diaSemana) {
    const card = document.createElement("div");
    card.className = "card-dia card-esgotado";

    card.innerHTML = `
        <h4>📅 ${dataISO} (${diaSemana})</h4>
        <div class="tag">❌ Esgotado</div>
    `;

    return card;
}
