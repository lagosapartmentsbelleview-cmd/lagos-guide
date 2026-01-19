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
