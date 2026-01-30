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
let faturasCache = [];


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
        gerarDetalheMes();


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

    selectMes.addEventListener("change", atualizarUI);
    selectAno.addEventListener("change", atualizarUI);

    for (let ano = 2020; ano <= 2050; ano++) {
    const opt = document.createElement("option");
    opt.value = ano;
    opt.textContent = ano;
    selectAno.appendChild(opt);
}

// 🔹 Preencher selectAnoTotais (Totais Financeiros)
const selectAnoTotais = document.getElementById("selectAnoTotais");
if (selectAnoTotais) {
    for (let ano = 2020; ano <= 2050; ano++) {
        const opt2 = document.createElement("option");
        opt2.value = ano;
        opt2.textContent = ano;
        selectAnoTotais.appendChild(opt2);
    }
}

    const hoje = new Date();
    selectMes.value = hoje.getMonth() + 1;
    selectAno.value = hoje.getFullYear();

    console.log("Financeiro inicializado com cache.");

    sincronizarFirebase(); // ← mover para aqui

    // 🔹 LIGAR BOTÃO ADICIONAR EXTRA AQUI
    const btnAddExtra = document.getElementById("btnAdicionarExtra");
    if (btnAddExtra) {
        btnAddExtra.addEventListener("click", adicionarExtra);
        console.log("Botão Adicionar Extra ligado em initFinanceiro.");
    } else {
        console.warn("Botão Adicionar Extra NÃO encontrado em initFinanceiro.");
    }
    carregarFaturas();
}

async function carregarFaturas() {
    try {
        const snap = await firebase.firestore()
            .collection("faturas")
            .orderBy("data")
            .get();

        faturasCache = snap.docs.map(d => ({
            id: d.id,
            ...d.data()
        }));

        renderizarTabelaFaturas();
    
    } catch (err) {
        console.error("Erro ao carregar faturas:", err);
    }
}

function renderizarTabelaFaturas() {
    const tbody = document.querySelector("#tabelaCustosIVA tbody");
    if (!tbody) return;

    tbody.innerHTML = "";

    const filtroNIF = document.getElementById("filtroNIF")?.value.trim().toLowerCase() || "";
    const filtroEnt = document.getElementById("filtroEntidade")?.value.trim().toLowerCase() || "";
    const filtroCat = document.getElementById("filtroCategoria")?.value || "";
    const filtroMesAno = document.getElementById("filtroMesAno")?.value || ""; // yyyy-mm

    let lista = [...faturasCache];

    lista = lista.filter(f => {
        if (filtroNIF && !String(f.nif || "").toLowerCase().includes(filtroNIF)) return false;
        if (filtroEnt && !String(f.fornecedor || "").toLowerCase().includes(filtroEnt)) return false;
        if (filtroCat && f.categoria !== filtroCat) return false;
        if (filtroMesAno && f.data?.substring(0,7) !== filtroMesAno) return false;
        return true;
    });

    lista.forEach(f => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${f.dataDisplay || f.data || ""}</td>
            <td>${f.fornecedor || ""}</td>
            <td>${f.categoria || ""}</td>
            <td>${(f.valorBruto || 0).toFixed(2)} €</td>
            <td>${(f.valorIVA || 0).toFixed(2)} €</td>
            <td>${f.numeroFatura || ""}</td>
            <td>${f.atcud || ""}</td>
        `;
        tbody.appendChild(tr);
    });
}



// ======================================================
//  TOTAIS FINANCEIROS — QUALQUER MÊS / TRIMESTRE / ANO
// ======================================================

function totalPorMes(ano, mes) {
    let bruto = 0;
    let iva = 0;

    faturasCache.forEach(f => {
        if (!f.data) return;
        const [a, m] = f.data.split("-").map(Number);
        if (a === ano && m === mes) {
            bruto += Number(f.valorBruto || 0);
            iva += Number(f.valorIVA || 0);
        }
    });

    return { bruto, iva, semIVA: bruto - iva };
}

function totalPorTrimestre(ano, trimestre) {
    const inicio = (trimestre - 1) * 3 + 1;
    const fim = inicio + 2;

    let bruto = 0;
    let iva = 0;

    faturasCache.forEach(f => {
        if (!f.data) return;
        const [a, m] = f.data.split("-").map(Number);
        if (a === ano && m >= inicio && m <= fim) {
            bruto += Number(f.valorBruto || 0);
            iva += Number(f.valorIVA || 0);
        }
    });

    return { bruto, iva, semIVA: bruto - iva };
}

function totalPorAno(ano) {
    let bruto = 0;
    let iva = 0;

    faturasCache.forEach(f => {
        if (!f.data) return;
        const [a] = f.data.split("-").map(Number);
        if (a === ano) {
            bruto += Number(f.valorBruto || 0);
            iva += Number(f.valorIVA || 0);
        }
    });

    return { bruto, iva, semIVA: bruto - iva };
}

function calcularTaxaIVA(bruto, iva) {
    if (bruto <= 0) return 0;
    const liquido = bruto - iva;
    if (liquido <= 0) return 0;
    return Math.round((iva / liquido) * 100);
}

// ======================================================
//  ATUALIZAR CARDS CONFORME ESCOLHA DO UTILIZADOR
// ======================================================

function atualizarTotaisEscolhidos() {
    const ano = Number(document.getElementById("selectAnoTotais").value);
    const mes = Number(document.getElementById("selectMesTotais").value);
    const trim = Number(document.getElementById("selectTrimTotais").value);

    let totMes = { bruto: 0, iva: 0, semIVA: 0 };
    let totTrim = { bruto: 0, iva: 0, semIVA: 0 };
    let totAno = { bruto: 0, iva: 0, semIVA: 0 };

    if (ano && mes) totMes = totalPorMes(ano, mes);
    if (ano && trim) totTrim = totalPorTrimestre(ano, trim);
    if (ano) totAno = totalPorAno(ano);

    // Mês
    document.getElementById("mesBruto").textContent = totMes.bruto.toFixed(2) + " €";
    document.getElementById("mesIVA").textContent = totMes.iva.toFixed(2) + " €";
    document.getElementById("mesLiquido").textContent = totMes.semIVA.toFixed(2) + " €";
    document.getElementById("mesTaxa").textContent = calcularTaxaIVA(totMes.bruto, totMes.iva) + "%";

    // Trimestre
    document.getElementById("trimBruto").textContent = totTrim.bruto.toFixed(2) + " €";
    document.getElementById("trimIVA").textContent = totTrim.iva.toFixed(2) + " €";
    document.getElementById("trimLiquido").textContent = totTrim.semIVA.toFixed(2) + " €";
    document.getElementById("trimTaxa").textContent = calcularTaxaIVA(totTrim.bruto, totTrim.iva) + "%";

    // Ano
    document.getElementById("anoBruto").textContent = totAno.bruto.toFixed(2) + " €";
    document.getElementById("anoIVA").textContent = totAno.iva.toFixed(2) + " €";
    document.getElementById("anoLiquido").textContent = totAno.semIVA.toFixed(2) + " €";
    document.getElementById("anoTaxa").textContent = calcularTaxaIVA(totAno.bruto, totAno.iva) + "%";
}


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
            const qtdAptos = Array.isArray(r.apartamentos) ? r.apartamentos.length : 1;
            totalPrevisao += Number(r.limpeza) * qtdAptos;

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
            const qtdAptos = Array.isArray(r.apartamentos) ? r.apartamentos.length : 1;
            totalReal += Number(r.limpeza) * qtdAptos;

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

function atualizarUI() {
    calcularPrevisao();
    carregarExtras();
    calcularCustoReal();
    gerarTabelaTotaisAnuais();
    gerarDetalheMes();

}

function gerarDetalheMes() {
    const mes = Number(document.getElementById("selectMes").value);
    const ano = Number(document.getElementById("selectAno").value);

    const tbody = document.querySelector("#tabelaDetalheMes tbody");
    tbody.innerHTML = "";

    const inicio = new Date(ano, mes - 1, 1);
    const fim = new Date(ano, mes, 1);

    let totalMes = 0;

    // 🔹 1) Reservas que contribuem para o mês
    reservasCache.forEach(r => {
        if (!r.checkout || r.limpeza == null) return;

        const checkoutDate = parseDataBR(r.checkout);

        if (checkoutDate >= inicio && checkoutDate < fim && r.status !== "cancelado") {
            const cliente = r.cliente || "";
            const apartamentos = Array.isArray(r.apartamentos) ? r.apartamentos : [];

            apartamentos.forEach(apto => {
                const valor = Number(r.limpeza);
                totalMes += valor;

                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>${apto}</td>
                    <td>${cliente}</td>
                    <td>${r.checkin || ""}</td>
                    <td>${r.checkout || ""}</td>
                    <td>${valor.toFixed(2)} €</td>
                `;
                tbody.appendChild(tr);
            });
        }
    });

    // 🔹 2) Extras do mês
    const docId = `${ano}_${String(mes).padStart(2, "0")}`;
    const extras = extrasCache[docId] || [];

    extras.forEach(extra => {
        const valor = Number(extra.valor);
        totalMes += valor;

        const data = extra.data.toDate
            ? extra.data.toDate().toLocaleDateString("pt-PT")
            : new Date(extra.data).toLocaleDateString("pt-PT");

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>—</td>
            <td>Extra</td>
            <td>${data}</td>
            <td>—</td>
            <td>${valor.toFixed(2)} €</td>
        `;
        tbody.appendChild(tr);
    });

    // 🔹 3) Linha final TOTAL
    const trTotal = document.createElement("tr");
    trTotal.style.fontWeight = "bold";
    trTotal.style.background = "#e3f0ff";

    trTotal.innerHTML = `
        <td colspan="4" style="text-align:right;">TOTAL DO MÊS:</td>
        <td>${totalMes.toFixed(2)} €</td>
    `;
    tbody.appendChild(trTotal);
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
        const docRef = db.collection("custos_limpeza").doc(docId);

        // 🔥 GARANTIR QUE O DOCUMENTO EXISTE
        await docRef.set({}, { merge: true });

        // 🔥 AGORA SIM, ADICIONAR EXTRA
        const ref = await docRef.collection("extras").add({
            data: dataObj,
            valor: Number(valorInput),
            descricao: descInput
        });

        // 🔥 ATUALIZAR CACHE LOCAL
        if (!extrasCache[docId]) extrasCache[docId] = [];
        extrasCache[docId].push({
            id: ref.id,
            data: dataObj,
            valor: Number(valorInput),
            descricao: descInput
        });

        guardarCache();

        // 🔥 ATUALIZAR UI
        carregarExtras();
        calcularCustoReal();
        gerarDetalheMes();
        gerarTabelaTotaisAnuais();

        // 🔥 LIMPAR FORMULÁRIO
        document.getElementById("extraData").value = "";
        document.getElementById("extraValor").value = "";
        document.getElementById("extraDescricao").value = "";

    } catch (err) {
        console.error("❌ Erro ao adicionar extra:", err);
        alert("Erro ao gravar extra no Firebase.");
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

    // Extrair pares chave:valor do QR Code
    partes.forEach(p => {
        const [chave, valor] = p.split(":");
        dados[chave] = valor;
    });

    // Campos AT
    const nif = dados["A"];
    const numero = dados["G"]?.replace(/\s+/g, "");
    const dataAT = dados["F"]; // AAAAMMDD
    const total = parseFloat(dados["O"]);
    const iva = parseFloat(dados["N"]);
    const atcud = dados["H"]?.trim();

    // Normalizar NIF
    const nifLimpo = String(nif).trim().replace(/\D/g, "");

    // Procurar entidade
    const entidade = await obterEntidadePorNIF(nifLimpo);

    let fornecedor = entidade ? entidade.nome : "Fornecedor Desconhecido";
    let categoria = entidade ? entidade.categoria : "Outros";

    // Se não existir, abrir modal para criar
    if (!entidade && typeof abrirModalAdicionar === "function") {
        abrirModalAdicionar(nif);
    }

    // Converter data AT → ISO (para filtros)
    const dataISO = `${dataAT.substring(0,4)}-${dataAT.substring(4,6)}-${dataAT.substring(6,8)}`;

    // Converter data AT → PT (para mostrar)
    const dataDisplay = `${dataAT.substring(6,8)}/${dataAT.substring(4,6)}/${dataAT.substring(0,4)}`;

    // Calcular valor sem IVA
    const valorSemIVA = total - iva;

    // Calcular taxa IVA
    const taxaIVA = valorSemIVA > 0 ? Math.round((iva / valorSemIVA) * 100) : null;

    // Objeto final da fatura
    const entrada = {
        data: dataISO,
        dataDisplay,
        nif: nifLimpo,
        fornecedor,
        categoria,
        valorBruto: total,
        valorIVA: iva,
        valorSemIVA,
        taxaIVA,
        numeroFatura: numero,
        atcud,
        origem: "QR",
        criadoEm: firebase.firestore.FieldValue.serverTimestamp()
    };

    // Guardar no Firestore (coleção própria)
    await guardarFaturaFirestore(entrada);

    // Atualizar cache local
    faturasCache.push(entrada);

    // Atualizar tabela e totais
    renderizarTabelaFaturas();
    
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
        .collection("faturas")
        .add(f);
}


function irParaEntidades() {
    window.location.href = "entidades.html";
}

function irParaCategorias() {
    window.location.href = "categorias.html";
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

document.getElementById("btnExportPDF").addEventListener("click", () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: "landscape" });

    doc.setFontSize(16);
    doc.text("Detalhe do Mês - Limpeza", 14, 15);

    doc.autoTable({
        html: "#tabelaDetalheMes",
        startY: 25,
        theme: "grid",
        headStyles: {
            fillColor: [25, 118, 210], // azul do sistema
            textColor: 255,
            fontSize: 12,
            halign: "left"
        },
        bodyStyles: {
            fontSize: 11
        },
        styles: {
            cellPadding: 3
        }
    });

    doc.save("detalhe_mes.pdf");
});

document.getElementById("btnExportExcel").addEventListener("click", () => {
    const tabela = document.getElementById("tabelaDetalheMes");
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.table_to_sheet(tabela);

    // Auto-ajustar colunas
    const colWidths = [];
    const range = XLSX.utils.decode_range(ws['!ref']);

    for (let C = range.s.c; C <= range.e.c; ++C) {
        let maxWidth = 10;
        for (let R = range.s.r; R <= range.e.r; ++R) {
            const cell = ws[XLSX.utils.encode_cell({ r: R, c: C })];
            if (cell && cell.v) {
                maxWidth = Math.max(maxWidth, cell.v.toString().length);
            }
        }
        colWidths.push({ wch: maxWidth + 2 });
    }

    ws['!cols'] = colWidths;

    XLSX.utils.book_append_sheet(wb, ws, "Detalhe do Mês");
    XLSX.writeFile(wb, "detalhe_mes.xlsx");
});

document.addEventListener("DOMContentLoaded", () => {
    ["filtroNIF","filtroEntidade","filtroCategoria","filtroMesAno"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener("input", renderizarTabelaFaturas);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    ["selectAnoTotais", "selectMesTotais", "selectTrimTotais"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener("change", atualizarTotaisEscolhidos);
    });
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
