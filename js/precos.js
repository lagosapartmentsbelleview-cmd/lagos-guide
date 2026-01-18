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
    // TODO: lógica real de parsing
    // Por agora devolve um exemplo estático

    return [
        { data: "2026-01-19", dia: "Domingo", preco: 63 },
        { data: "2026-01-20", dia: "Segunda", preco: 63 }
    ];
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
