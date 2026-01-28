// ===============================
//  INICIALIZADOR ROBUSTO
// ===============================

function initFinanceiro() {
    const selectMes = document.getElementById("selectMes");
    const selectAno = document.getElementById("selectAno");

    // DOM ainda não existe → tenta de novo
    if (!selectMes || !selectAno) {
        return setTimeout(initFinanceiro, 30);
    }

    // ===============================
    //  CARREGAR ANOS (2020 → 2050)
    // ===============================

    for (let ano = 2020; ano <= 2050; ano++) {
        const opt = document.createElement("option");
        opt.value = ano;
        opt.textContent = ano;
        selectAno.appendChild(opt);
    }

    // Definir mês e ano atual
    const hoje = new Date();
    selectMes.value = hoje.getMonth() + 1;
    selectAno.value = hoje.getFullYear();

    // Chamadas principais
    calcularPrevisao();
    carregarExtras();
    calcularCustoReal();
    gerarTabelaTotaisAnuais();

    console.log("Financeiro inicializado");
}

initFinanceiro();


// ===============================
//  FUNÇÃO AUXILIAR — Data BR
// ===============================

function parseDataBR(dataStr) {
    const [dia, mes, ano] = dataStr.split("/").map(Number);
    return new Date(ano, mes - 1, dia);
}


// ===============================
//  PASSO 2 — Calcular PREVISÃO
// ===============================

async function calcularPrevisao() {
    const mes = Number(document.getElementById("selectMes").value);
    const ano = Number(document.getElementById("selectAno").value);

    const previsaoEl = document.getElementById("previsaoValor");

    const inicio = new Date(ano, mes - 1, 1);
    const fim = new Date(ano, mes, 1);

    let totalPrevisao = 0;

    try {
        const snapshot = await db.collection("reservas").get();

        snapshot.forEach(doc => {
            const r = doc.data();

            if (!r.checkout || r.limpeza == null) return;

            const checkoutDate = parseDataBR(r.checkout);

            if (checkoutDate >= inicio && checkoutDate < fim) {
                if (r.status !== "cancelado") {
                    totalPrevisao += Number(r.limpeza);
                }
            }
        });

        previsaoEl.textContent = totalPrevisao.toFixed(2) + " €";

    } catch (err) {
        console.error("Erro ao calcular previsão:", err);
        previsaoEl.textContent = "Erro";
    }
}


// ===============================
//  PASSO 3 — Carregar EXTRAS
// ===============================

async function carregarExtras() {
    const mes = Number(document.getElementById("selectMes").value);
    const ano = Number(document.getElementById("selectAno").value);

    const tabela = document.querySelector("#tabelaExtras tbody");
    tabela.innerHTML = "";

    const docId = `${ano}_${String(mes).padStart(2, "0")}`;

    try {
        const extrasRef = db
            .collection("custos_limpeza")
            .doc(docId)
            .collection("extras");

        const snapshot = await extrasRef.orderBy("data", "asc").get();

        snapshot.forEach(doc => {
            const extra = doc.data();

            const tr = document.createElement("tr");

            const data = extra.data.toDate().toLocaleDateString("pt-PT");
            const descricao = extra.descricao;
            const valor = extra.valor.toFixed(2) + " €";

            tr.innerHTML = `
                <td>${data}</td>
                <td>${descricao}</td>
                <td>${valor}</td>
                <td>
                    <button class="btnEditarExtra" data-id="${doc.id}">Editar</button>
                    <button class="btnApagarExtra" data-id="${doc.id}">Apagar</button>
                </td>
            `;

            tabela.appendChild(tr);
        });

        document.querySelectorAll(".btnEditarExtra").forEach(btn => {
            btn.addEventListener("click", () => editarExtra(btn.dataset.id));
        });

        document.querySelectorAll(".btnApagarExtra").forEach(btn => {
            btn.addEventListener("click", () => apagarExtra(btn.dataset.id));
        });

    } catch (err) {
        console.error("Erro ao carregar extras:", err);
    }
}


// ===============================
//  PASSO 4 — Calcular CUSTO REAL
// ===============================

async function calcularCustoReal() {
    const mes = Number(document.getElementById("selectMes").value);
    const ano = Number(document.getElementById("selectAno").value);

    const custoRealEl = document.getElementById("custoRealValor");

    const inicio = new Date(ano, mes - 1, 1);
    const fim = new Date(ano, mes, 1);

    let totalReal = 0;

    try {
        // 1. Somar limpezas reais
        const snapshot = await db.collection("reservas").get();

        snapshot.forEach(doc => {
            const r = doc.data();

            if (!r.checkout || r.limpeza == null) return;

            const checkoutDate = parseDataBR(r.checkout);

            if (checkoutDate >= inicio && checkoutDate < fim) {
                if (r.status !== "cancelado") {
                    totalReal += Number(r.limpeza);
                }
            }
        });

        // 2. Somar extras
        const docId = `${ano}_${String(mes).padStart(2, "0")}`;
        const extrasRef = db
            .collection("custos_limpeza")
            .doc(docId)
            .collection("extras");

        const extrasSnap = await extrasRef.get();

        extrasSnap.forEach(doc => {
            const extra = doc.data();
            totalReal += Number(extra.valor);
        });

        custoRealEl.textContent = totalReal.toFixed(2) + " €";

    } catch (err) {
        console.error("Erro ao calcular custo real:", err);
        custoRealEl.textContent = "Erro";
    }
}


// ===============================
//  PASSO 5 — Adicionar EXTRA
// ===============================

async function adicionarExtra() {
    const mes = Number(document.getElementById("selectMes").value);
    const ano = Number(document.getElementById("selectAno").value);

    const dataInput = document.getElementById("extraData").value;
    const valorInput = document.getElementById("extraValor").value;
    const descInput = document.getElementById("extraDescricao").value;

    if (!dataInput || !valorInput || !descInput) {
        alert("Preencha todos os campos.");
        return;
    }

const dataObj = new Date(dataInput);
if (isNaN(dataObj.getTime())) {
    alert("Data inválida.");
    return;
}


    const docId = `${ano}_${String(mes).padStart(2, "0")}`;

    try {
        await db
            .collection("custos_limpeza")
            .doc(docId)
            .collection("extras")
            .add({
                data: dataObj,
                valor: Number(valorInput),
                descricao: descInput
            });

        document.getElementById("extraData").value = "";
        document.getElementById("extraValor").value = "";
        document.getElementById("extraDescricao").value = "";

        await carregarExtras();
        await calcularCustoReal();

    } catch (err) {
        console.error("Erro ao adicionar extra:", err);
    }
}


// ===============================
//  PASSO 6 — Editar EXTRA
// ===============================

async function editarExtra(id) {
    const mes = Number(document.getElementById("selectMes").value);
    const ano = Number(document.getElementById("selectAno").value);

    const novoValor = prompt("Novo valor (€):");
    if (novoValor === null) return;

    const novaDesc = prompt("Nova descrição:");
    if (novaDesc === null) return;

    const docId = `${ano}_${String(mes).padStart(2, "0")}`;

    try {
        await db
            .collection("custos_limpeza")
            .doc(docId)
            .collection("extras")
            .doc(id)
            .update({
                valor: Number(novoValor),
                descricao: novaDesc
            });

        await carregarExtras();
        await calcularCustoReal();

    } catch (err) {
        console.error("Erro ao editar extra:", err);
    }
}


// ===============================
//  PASSO 7 — Apagar EXTRA
// ===============================

async function apagarExtra(id) {
    const mes = Number(document.getElementById("selectMes").value);
    const ano = Number(document.getElementById("selectAno").value);

    const docId = `${ano}_${String(mes).padStart(2, "0")}`;

    if (!confirm("Tem a certeza que deseja apagar este extra?")) return;

    try {
        await db
            .collection("custos_limpeza")
            .doc(docId)
            .collection("extras")
            .doc(id)
            .delete();

        await carregarExtras();
        await calcularCustoReal();

    } catch (err) {
        console.error("Erro ao apagar extra:", err);
    }
}

// ===============================
//  FUNÇÃO BASE — Calcular total de um mês
// ===============================

async function calcularTotalMes(ano, mes) {
    const inicio = new Date(ano, mes - 1, 1);
    const fim = new Date(ano, mes, 1);

    let totalLimpezas = 0;
    let totalExtras = 0;

    // Somar limpezas reais
    const reservasSnap = await db.collection("reservas").get();

    reservasSnap.forEach(doc => {
        const r = doc.data();
        if (!r.checkout || r.limpeza == null) return;

        const checkoutDate = parseDataBR(r.checkout);

        if (checkoutDate >= inicio && checkoutDate < fim && r.status !== "cancelado") {
            totalLimpezas += Number(r.limpeza);
        }
    });

    // Somar extras
    const docId = `${ano}_${String(mes).padStart(2, "0")}`;
    const extrasSnap = await db
        .collection("custos_limpeza")
        .doc(docId)
        .collection("extras")
        .get();

    extrasSnap.forEach(doc => {
        const extra = doc.data();
        totalExtras += Number(extra.valor);
    });

    return {
        totalLimpezas,
        totalExtras,
        totalMes: totalLimpezas + totalExtras
    };
}

// ===============================
//  PASSO 3 — Calcular total anual
// ===============================

async function calcularTotaisAno(ano) {
    let totalLimpezasAno = 0;
    let totalExtrasAno = 0;

    const hoje = new Date();
    const mesLimite = (ano === hoje.getFullYear()) ? hoje.getMonth() + 1 : 12;

    for (let mes = 1; mes <= mesLimite; mes++) {
        const dadosMes = await calcularTotalMes(ano, mes);
        totalLimpezasAno += dadosMes.totalLimpezas;
        totalExtrasAno += dadosMes.totalExtras;
    }

    return {
        ano,
        totalLimpezasAno,
        totalExtrasAno,
        totalAno: totalLimpezasAno + totalExtrasAno
    };
}

// ===============================
//  PASSO 4 — Calcular acumulado do ano atual
// ===============================

async function calcularAcumuladoAno(ano) {
    const hoje = new Date();
    const mesAtual = hoje.getMonth() + 1;

    let acumulado = 0;

    for (let mes = 1; mes <= mesAtual; mes++) {
        const dadosMes = await calcularTotalMes(ano, mes);
        acumulado += dadosMes.totalMes;
    }

    return acumulado;
}

// ===============================
//  PASSO 5 — Gerar tabela de totais anuais
// ===============================

async function gerarTabelaTotaisAnuais() {
    const tabela = document.querySelector("#tabelaTotaisAno tbody");
    tabela.innerHTML = "";

    const anoAtual = new Date().getFullYear();

    for (let ano = 2020; ano <= anoAtual; ano++) {
        const dadosAno = await calcularTotaisAno(ano);

        let acumulado = "—";
        if (ano === anoAtual) {
            acumulado = await calcularAcumuladoAno(ano);
            acumulado = acumulado.toFixed(2) + " €";
        }

        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${ano}</td>
            <td>${dadosAno.totalLimpezasAno.toFixed(2)} €</td>
            <td>${dadosAno.totalExtrasAno.toFixed(2)} €</td>
            <td>${dadosAno.totalAno.toFixed(2)} €</td>
            <td>${acumulado}</td>
        `;

        tabela.appendChild(tr);
    }
}


// ===============================
//  LISTENERS
// ===============================

document.addEventListener("change", e => {
    if (e.target.id === "selectMes" || e.target.id === "selectAno") {
        calcularPrevisao();
        carregarExtras();
        calcularCustoReal();
    }
});

const btnAdicionarExtra = document.getElementById("btnAdicionarExtra");
if (btnAdicionarExtra) {
    btnAdicionarExtra.addEventListener("click", adicionarExtra);
}

// ======================================================
//  SISTEMA DE ABAS DO FINANCEIRO
// ======================================================

document.querySelectorAll(".tab").forEach(botao => {
    botao.addEventListener("click", () => {
        const alvo = botao.dataset.tab; // ex: "custos-iva"

        // Remover active de todos os botões
        document.querySelectorAll(".tab").forEach(b => b.classList.remove("active"));

        // Remover active de todos os conteúdos
        document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));

        // Ativar o botão clicado
        botao.classList.add("active");

        // Ativar o conteúdo correspondente
        const conteudo = document.getElementById("tab-" + alvo);
        if (conteudo) conteudo.classList.add("active");
    });
});


async function interpretarFatura(texto) {
    const partes = texto.split("*");
    const dados = {};

    partes.forEach(p => {
        const [chave, valor] = p.split(":");
        dados[chave] = valor;
    });

    // Campos AT relevantes
    const nif = dados["A"];                // NIF do emissor
    const numero = dados["G"];             // Nº da fatura
    const data = dados["F"];               // AAAAMMDD
    const total = parseFloat(dados["O"]);  // Total com IVA
    const iva = parseFloat(dados["N"]);    // IVA total
    const atcud = dados["H"];              // ATCUD

    // 👉 NOVO: ir buscar o nome do fornecedor pela web
    const fornecedorWeb = await obterNomePorNIF(nif);

    // Se a web falhar, cai no mapa local
    const fornecedorLocal = obterFornecedorPorNIF(nif);
    const fornecedor = fornecedorWeb !== "Fornecedor Desconhecido"
        ? fornecedorWeb
        : fornecedorLocal;

    const categoria = inferirCategoria(nif);

    const entrada = {
        data: formatarDataAT(data),
        fornecedor,
        categoria,
        valor: total,
        iva: iva,
        numero,
        atcud
    };

    adicionarLinhaCustosIVA(entrada);
    await guardarFaturaFirestore(entrada);
}

async function obterNomePorNIF(nif) {
    if (!nif) return "Fornecedor Desconhecido";

    const url = `https://www.nif.pt/?json=1&q=${nif}`;

    try {
        const resposta = await fetch(url);

        if (!resposta.ok) {
            console.warn("Falha ao consultar NIF:", resposta.status);
            return "Fornecedor Desconhecido";
        }

        const dados = await resposta.json();

        if (dados.result && dados.result.name) {
            return dados.result.name;
        }

        return "Fornecedor Desconhecido";

    } catch (e) {
        console.error("Erro ao consultar NIF:", e);
        return "Fornecedor Desconhecido";
    }
}


function formatarDataAT(yyyymmdd) {
    if (!yyyymmdd || yyyymmdd.length !== 8) return "";
    return `${yyyymmdd.substring(6,8)}/${yyyymmdd.substring(4,6)}/${yyyymmdd.substring(0,4)}`;
}

function adicionarLinhaCustosIVA(f) {
    const tbody = document.querySelector("#tabelaCustosIVA tbody");
    const tr = document.createElement("tr");

    tr.innerHTML = `
        <td>${f.data}</td>
        <td>${f.fornecedor}</td>
        <td>${f.categoria}</td>
        <td>${f.valor.toFixed(2)} €</td>
        <td>${f.iva.toFixed(2)} €</td>
        <td>${f.numero}</td>
        <td>${f.atcud}</td>
    `;

    tbody.appendChild(tr);
}

async function guardarFaturaFirestore(f) {
    await firebase.firestore()
        .collection("financeiro")
        .doc("custos")
        .collection("faturas")
        .add(f);
}

function obterFornecedorPorNIF(nif) {
    const mapa = {
        "500906840": "EDP",
        "503219795": "Águas do Algarve",
        "500077568": "NOS",
        "504615947": "MEO",
        "503933813": "Leroy Merlin"
    };
    return mapa[nif] || "Fornecedor Desconhecido";
}

function inferirCategoria(nif) {
    const categorias = {
        "500906840": "Luz",
        "503219795": "Água",
        "500077568": "Telecomunicações",
        "504615947": "Telecomunicações",
        "503933813": "Equipamentos"
    };
    return categorias[nif] || "Outros";
}

setTimeout(() => {
    const btnScanQR = document.getElementById("btnScanQR");

    if (!btnScanQR) {
        console.warn("Botão QR ainda não existe, tentando de novo...");
        return;
    }

    btnScanQR.addEventListener("click", () => {
        const qrReader = new Html5Qrcode("qr-reader");

        qrReader.start(
            { facingMode: "environment" },
            { fps: 10, qrbox: 250 },
            async qrCodeMessage => {

                console.log("QR Code lido:", qrCodeMessage);

                // PARAR O LEITOR IMEDIATAMENTE
                await qrReader.stop();
                document.getElementById("qr-reader").innerHTML = "";

                await interpretarFatura(qrCodeMessage);

            },
            errorMessage => {
                // IGNORAR erros normais de leitura
            }
        );
    });

    console.log("Botão QR ligado com sucesso!");
}, 300);


      
