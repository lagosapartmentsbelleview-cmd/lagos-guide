async function carregarEntidadesDoFirestore() {
    const snap = await db.collection("entidades").get();
    entidadesCache = snap.docs.map(doc => doc.data());
}

async function carregarCategoriasDoFirestore() {
    const snap = await db.collection("categorias").get();
    categoriasCache = snap.docs.map(doc => doc.data());
}


// ======================================================
//  SISTEMA DE CACHE LOCAL + SINCRONIZAÇÃO FIREBASE
// ======================================================

// Caches em memória
let reservasCache = [];
let extrasCache = {};
let entidadesCache = [];
let categoriasCache = [];

// Guardar no localStorage
function guardarCache() {
    localStorage.setItem("reservasCache", JSON.stringify(reservasCache));
    localStorage.setItem("extrasCache", JSON.stringify(extrasCache));
    localStorage.setItem("entidadesCache", JSON.stringify(entidadesCache));
    localStorage.setItem("categoriasCache", JSON.stringify(categoriasCache));
    localStorage.setItem("ultimaSync", Date.now());
}

// Carregar do localStorage
function carregarCache() {
    reservasCache = JSON.parse(localStorage.getItem("reservasCache") || "[]");
    extrasCache = JSON.parse(localStorage.getItem("extrasCache") || "{}");
    entidadesCache = JSON.parse(localStorage.getItem("entidadesCache") || "[]");
    categoriasCache = JSON.parse(localStorage.getItem("categoriasCache") || "[]");
}

// ======================================================
//  SINCRONIZAR FIREBASE (1 leitura por coleção)
// ======================================================

async function sincronizarFirebase() {
    console.log("🔄 A sincronizar Firebase...");

    try {
        // 1) Reservas
        const reservasSnap = await db.collection("reservas").get();
        reservasCache = reservasSnap.docs.map(d => d.data());

        // 2) Entidades
        await carregarEntidadesDoFirestore();

        // 3) Categorias
        await carregarCategoriasDoFirestore();

        // 4) Extras (todos os meses)
        extrasCache = {};
        const custosSnap = await db.collection("custos_limpeza").get();
        for (const doc of custosSnap.docs) {
            const mesId = doc.id;
            const extrasSnap = await db.collection("custos_limpeza").doc(mesId).collection("extras").get();
            extrasCache[mesId] = extrasSnap.docs.map(d => ({ id: d.id, ...d.data() }));
        }

        guardarCache();

        console.log("✅ Sincronização concluída.");
        alert("Sincronização concluída com sucesso!");

        calcularPrevisao();
        carregarExtras();
        calcularCustoReal();
        gerarTabelaTotaisAnuais();

    } catch (err) {
        console.error("❌ Erro na sincronização:", err);
        alert("Erro ao sincronizar Firebase.");
    }
}


// ======================================================
//  SINCRONIZAÇÃO AUTOMÁTICA (11:00 e 23:00)
// ======================================================

function iniciarSyncAutomatica() {
    setInterval(() => {
        const agora = new Date();
        const hora = agora.getHours();
        const minuto = agora.getMinutes();

        if ((hora === 11 || hora === 23) && minuto === 0) {
            sincronizarFirebase();
        }
    }, 60000); // verifica a cada 1 minuto
}

// ======================================================
//  BOTÃO DE SINCRONIZAÇÃO
// ======================================================

const btn = document.getElementById("btnSyncFirebase");
if (btn) {
    btn.addEventListener("click", sincronizarFirebase);
    console.log("Botão Sincronizar ligado.");
} else {
    console.warn("Botão Sincronizar não encontrado.");
}


// ======================================================
//  INICIALIZADOR
// ======================================================

function initFinanceiro() {
    carregarCache();
    iniciarSyncAutomatica();

    const selectMes = document.getElementById("selectMes");
    const selectAno = document.getElementById("selectAno");

    if (!selectMes || !selectAno) {
        return setTimeout(initFinanceiro, 30);
    }

    for (let ano = 2020; ano <= 2050; ano++) {
        const opt = document.createElement("option");
        opt.value = ano;
        opt.textContent = ano;
        selectAno.appendChild(opt);
    }

    const hoje = new Date();
    selectMes.value = hoje.getMonth() + 1;
    selectAno.value = hoje.getFullYear();

    calcularPrevisao();
    carregarExtras();
    calcularCustoReal();
    gerarTabelaTotaisAnuais();

    console.log("Financeiro inicializado com cache.");
}

initFinanceiro();

// ======================================================
//  FUNÇÃO AUXILIAR — Data BR
// ======================================================

function parseDataBR(dataStr) {
    const [dia, mes, ano] = dataStr.split("/").map(Number);
    return new Date(ano, mes - 1, dia);
}

// ======================================================
//  CALCULAR PREVISÃO (USANDO CACHE)
// ======================================================

function calcularPrevisao() {
    const mes = Number(document.getElementById("selectMes").value);
    const ano = Number(document.getElementById("selectAno").value);

    const previsaoEl = document.getElementById("previsaoValor");

    const inicio = new Date(ano, mes - 1, 1);
    const fim = new Date(ano, mes, 1);

    let totalPrevisao = 0;

    reservasCache.forEach(r => {
        if (!r.checkout || r.limpeza == null) return;

        const checkoutDate = parseDataBR(r.checkout);

        if (checkoutDate >= inicio && checkoutDate < fim && r.status !== "cancelado") {
            totalPrevisao += Number(r.limpeza);
        }
    });

    previsaoEl.textContent = totalPrevisao.toFixed(2) + " €";
}

// ======================================================
//  CARREGAR EXTRAS (USANDO CACHE)
// ======================================================

function carregarExtras() {
    const mes = Number(document.getElementById("selectMes").value);
    const ano = Number(document.getElementById("selectAno").value);

    const tabela = document.querySelector("#tabelaExtras tbody");
    tabela.innerHTML = "";

    const docId = `${ano}_${String(mes).padStart(2, "0")}`;
    const lista = extrasCache[docId] || [];

    lista.forEach(extra => {
        const tr = document.createElement("tr");

        const data = extra.data.toDate ? extra.data.toDate().toLocaleDateString("pt-PT") : 
                                         new Date(extra.data).toLocaleDateString("pt-PT");

        tr.innerHTML = `
            <td>${data}</td>
            <td>${extra.descricao}</td>
            <td>${extra.valor.toFixed(2)} €</td>
            <td>
                <button class="btnEditarExtra" data-id="${extra.id}">Editar</button>
                <button class="btnApagarExtra" data-id="${extra.id}">Apagar</button>
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
}

// ======================================================
//  CALCULAR CUSTO REAL (USANDO CACHE)
// ======================================================

function calcularCustoReal() {
    const mes = Number(document.getElementById("selectMes").value);
    const ano = Number(document.getElementById("selectAno").value);

    const custoRealEl = document.getElementById("custoRealValor");

    const inicio = new Date(ano, mes - 1, 1);
    const fim = new Date(ano, mes, 1);

    let totalReal = 0;

    // 1) Limpezas
    reservasCache.forEach(r => {
        if (!r.checkout || r.limpeza == null) return;

        const checkoutDate = parseDataBR(r.checkout);

        if (checkoutDate >= inicio && checkoutDate < fim && r.status !== "cancelado") {
            totalReal += Number(r.limpeza);
        }
    });

    // 2) Extras
    const docId = `${ano}_${String(mes).padStart(2, "0")}`;
    const lista = extrasCache[docId] || [];

    lista.forEach(extra => {
        totalReal += Number(extra.valor);
    });

    custoRealEl.textContent = totalReal.toFixed(2) + " €";
}

// ======================================================
//  ADICIONAR EXTRA (ATUALIZA FIREBASE + CACHE)
// ======================================================

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
        // 1) Guardar no Firebase
        const ref = await db
            .collection("custos_limpeza")
            .doc(docId)
            .collection("extras")
            .add({
                data: dataObj,
                valor: Number(valorInput),
                descricao: descInput
            });

        // 2) Atualizar cache local
        if (!extrasCache[docId]) extrasCache[docId] = [];
        extrasCache[docId].push({
            id: ref.id,
            data: dataObj,
            valor: Number(valorInput),
            descricao: descInput
        });

        guardarCache();

        // 3) Atualizar UI
        carregarExtras();
        calcularCustoReal();

        document.getElementById("extraData").value = "";
        document.getElementById("extraValor").value = "";
        document.getElementById("extraDescricao").value = "";

    } catch (err) {
        console.error("Erro ao adicionar extra:", err);
    }
}

// ======================================================
//  EDITAR EXTRA (ATUALIZA FIREBASE + CACHE)
// ======================================================

async function editarExtra(id) {
    const mes = Number(document.getElementById("selectMes").value);
    const ano = Number(document.getElementById("selectAno").value);
    const docId = `${ano}_${String(mes).padStart(2, "0")}`;

    const novoValor = prompt("Novo valor (€):");
    if (novoValor === null) return;

    const novaDesc = prompt("Nova descrição:");
    if (novaDesc === null) return;

    try {
        // 1) Atualizar Firebase
        await db
            .collection("custos_limpeza")
            .doc(docId)
            .collection("extras")
            .doc(id)
            .update({
                valor: Number(novoValor),
                descricao: novaDesc
            });

        // 2) Atualizar cache
        const lista = extrasCache[docId] || [];
        const item = lista.find(e => e.id === id);
        if (item) {
            item.valor = Number(novoValor);
            item.descricao = novaDesc;
        }

        guardarCache();

        // 3) Atualizar UI
        carregarExtras();
        calcularCustoReal();

    } catch (err) {
        console.error("Erro ao editar extra:", err);
    }
}

// ======================================================
//  APAGAR EXTRA (ATUALIZA FIREBASE + CACHE)
// ======================================================

async function apagarExtra(id) {
    const mes = Number(document.getElementById("selectMes").value);
    const ano = Number(document.getElementById("selectAno").value);
    const docId = `${ano}_${String(mes).padStart(2, "0")}`;

    if (!confirm("Tem a certeza que deseja apagar este extra?")) return;

    try {
        // 1) Apagar no Firebase
        await db
            .collection("custos_limpeza")
            .doc(docId)
            .collection("extras")
            .doc(id)
            .delete();

        // 2) Atualizar cache
        extrasCache[docId] = (extrasCache[docId] || []).filter(e => e.id !== id);

        guardarCache();

        // 3) Atualizar UI
        carregarExtras();
        calcularCustoReal();

    } catch (err) {
        console.error("Erro ao apagar extra:", err);
    }
}

// ======================================================
//  CALCULAR TOTAL DE UM MÊS (USANDO CACHE)
// ======================================================

function calcularTotalMes(ano, mes) {
    const inicio = new Date(ano, mes - 1, 1);
    const fim = new Date(ano, mes, 1);

    let totalLimpezas = 0;
    let totalExtras = 0;

    // Limpezas
    reservasCache.forEach(r => {
        if (!r.checkout || r.limpeza == null) return;

        const checkoutDate = parseDataBR(r.checkout);

        if (checkoutDate >= inicio && checkoutDate < fim && r.status !== "cancelado") {
            totalLimpezas += Number(r.limpeza);
        }
    });

    // Extras
    const docId = `${ano}_${String(mes).padStart(2, "0")}`;
    const lista = extrasCache[docId] || [];

    lista.forEach(extra => {
        totalExtras += Number(extra.valor);
    });

    return {
        totalLimpezas,
        totalExtras,
        totalMes: totalLimpezas + totalExtras
    };
}

// ======================================================
//  CALCULAR TOTAL ANUAL (SEM FIRESTORE)
// ======================================================

function calcularTotaisAno(ano) {
    let totalLimpezasAno = 0;
    let totalExtrasAno = 0;

    const hoje = new Date();
    const mesLimite = (ano === hoje.getFullYear()) ? hoje.getMonth() + 1 : 12;

    for (let mes = 1; mes <= mesLimite; mes++) {
        const dadosMes = calcularTotalMes(ano, mes);
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

// ======================================================
//  CALCULAR ACUMULADO DO ANO ATUAL (SEM FIRESTORE)
// ======================================================

function calcularAcumuladoAno(ano) {
    const hoje = new Date();
    const mesAtual = hoje.getMonth() + 1;

    let acumulado = 0;

    for (let mes = 1; mes <= mesAtual; mes++) {
        const dadosMes = calcularTotalMes(ano, mes);
        acumulado += dadosMes.totalMes;
    }

    return acumulado;
}

// ======================================================
//  GERAR TABELA DE TOTAIS ANUAIS (SEM FIRESTORE)
// ======================================================

function gerarTabelaTotaisAnuais() {
    const tabela = document.querySelector("#tabelaTotaisAno tbody");
    tabela.innerHTML = "";

    const anoAtual = new Date().getFullYear();

    for (let ano = 2020; ano <= anoAtual; ano++) {
        const dadosAno = calcularTotaisAno(ano);

        let acumulado = "—";
        if (ano === anoAtual) {
            acumulado = calcularAcumuladoAno(ano).toFixed(2) + " €";
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
// ======================================================
//  OBTER ENTIDADE POR NIF (CACHE + FIREBASE FALLBACK)
// ======================================================

async function obterEntidadePorNIF(nif) {
    if (!nif) return null;

    // Normalizar NIF
    nif = String(nif).trim().replace(/\D/g, "");

    // 1) Procurar na cache local
    const local = entidadesCache.find(e => String(e.nif) === nif);
    if (local) return local;

    // 2) Procurar no Firebase (fallback)
    try {
        const snap = await firebase.firestore()
            .collection("entidades")
            .where("nif", "==", nif)
            .limit(1)
            .get();

        if (snap.empty) return null;

        const entidade = snap.docs[0].data();

        entidadesCache.push(entidade);
        guardarCache();

        return entidade;

    } catch (err) {
        console.error("Erro ao procurar entidade:", err);
        return null;
    }
}

function formatarDataAT(yyyymmdd) {
    if (!yyyymmdd || yyyymmdd.length !== 8) return "";
    return `${yyyymmdd.substring(6,8)}/${yyyymmdd.substring(4,6)}/${yyyymmdd.substring(0,4)}`;
}


async function interpretarFatura(texto) {
    const partes = texto.split("*");
    const dados = {};

    partes.forEach(p => {
        const [chave, valor] = p.split(":");
        dados[chave] = valor;
    });

    const nif = dados["A"];
    const numero = dados["G"];
    const data = dados["F"];
    const total = parseFloat(dados["O"]);
    const iva = parseFloat(dados["N"]);
    const atcud = dados["H"];

    // Procurar entidade (cache + fallback)
    const nifLimpo = String(nif).trim().replace(/\D/g, "");
    const entidade = await obterEntidadePorNIF(nifLimpo);

    let fornecedor = entidade ? entidade.nome : "Fornecedor Desconhecido";
    let categoria = entidade ? entidade.categoria : "Outros";

    if (!entidade && typeof abrirModalAdicionar === "function") {
        abrirModalAdicionar(nif);
    }

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

document.querySelectorAll(".tab").forEach(botao => {
    botao.addEventListener("click", () => {
        const alvo = botao.dataset.tab;

        document.querySelectorAll(".tab").forEach(b => b.classList.remove("active"));
        document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));

        botao.classList.add("active");

        const conteudo = document.getElementById("tab-" + alvo);
        if (conteudo) conteudo.classList.add("active");
    });
});

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

document.addEventListener("DOMContentLoaded", () => {
    const btnSync = document.getElementById("btnSyncFirebase");
    if (btnSync) {
        btnSync.addEventListener("click", () => {
            if (typeof sincronizarFirebase === "function") {
                sincronizarFirebase();
            } else {
                alert("Função de sincronização não disponível nesta página.");
            }
        });
    }
});


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

                await qrReader.stop();
                document.getElementById("qr-reader").innerHTML = "";

                await interpretarFatura(qrCodeMessage);

            },
            errorMessage => {}
        );
    });

    console.log("Botão QR ligado com sucesso!");
}, 300);
