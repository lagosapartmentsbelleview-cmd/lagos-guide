// ===============================
// PARTE 1 – ESTRUTURA DO PARSER
// ===============================

// Botões
const btnImportar = document.getElementById("btnImportar");
const btnExportar = document.getElementById("btnExportar");

// Tabela
const tabelaBody = document.querySelector("#tabelaResultados tbody");

// Evento: Importar texto colado
btnImportar.addEventListener("click", () => {
    const texto = document.getElementById("inputConcorrencia").value;

    // TODO: implementar parser real
    const dados = parseTextoConcorrencia(texto);

    renderTabela(dados);
    guardarConcorrencia(dados);
    atualizarDataAtualizacao(); // <-- ESTA LINHA FAZ A DATA APARECER
});

// Evento: Exportar Excel
btnExportar.addEventListener("click", () => {
    // TODO: implementar exportação Excel
    alert("Exportação Excel será implementada na fase 2.");
});

// ===============================
// FUNÇÃO PRINCIPAL DO PARSER
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

        // Detectar dia (número)
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
                diaAtual = ""; // reset para evitar duplicações
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
// GUARDAR DADOS (JSON / FIRESTORE)
// ===============================

function guardarConcorrencia(dados) {
    // TODO: guardar em JSON local ou Firestore
    console.log("Dados prontos para guardar:", dados);
}

function atualizarDataAtualizacao() {
const info = document.getElementById("infoAtualizacao");
if (!info) return;

const agora = new Date();
const dataFormatada = agora.toLocaleString("pt-PT");

info.textContent = "Última atualização: " + dataFormatada;
}

// Botão Limpar Dados
document.getElementById("btnLimpar").addEventListener("click", function () {
    const confirmar = confirm("Tem a certeza que deseja limpar todos os dados?\nEsta ação não pode ser anulada.");

    if (!confirmar) {
        return; // se cancelar, não faz nada
    }

    // 1. Limpar o array global
    if (typeof dadosConcorrencia !== "undefined") {
        dadosConcorrencia = [];
    }

    // 2. Limpar a tabela
    const tabela = document.getElementById("tabelaPrecos");
    if (tabela) {
        tabela.innerHTML = "";
    }

    // 3. Limpar a data de atualização
    const info = document.getElementById("infoAtualizacao");
    if (info) {
        info.textContent = "Última atualização: —";
    }

    alert("Dados limpos com sucesso.");
});
