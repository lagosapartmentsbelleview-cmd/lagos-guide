// ===============================
//  INICIALIZADOR ROBUSTO
//  (funciona mesmo com script injetado depois do load)
// ===============================

function initFinanceiro() {
    const selectMes = document.getElementById("selectMes");
    const selectAno = document.getElementById("selectAno");

    // DOM ainda não existe → tenta de novo
    if (!selectMes || !selectAno) {
        return setTimeout(initFinanceiro, 30);
    }

    // ===============================
    //  PASSO 1 — Carregar meses/anos
    // ===============================

    const meses = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    meses.forEach((mes, index) => {
        const opt = document.createElement("option");
        opt.value = index + 1;
        opt.textContent = mes;
        selectMes.appendChild(opt);
    });

    for (let ano = 2023; ano <= 2050; ano++) {
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

    const dataParts = dataInput.split("/");
    if (dataParts.length !== 3) {
        alert("Data inválida. Use o formato DD/MM/AAAA.");
        return;
    }

    const dataObj = new Date(
        Number(dataParts[2]),
        Number(dataParts[1]) - 1,
        Number(dataParts[0])
    );

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
