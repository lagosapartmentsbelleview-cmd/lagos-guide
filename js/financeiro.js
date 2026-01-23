// ===============================
//  PASSO 1 — Carregar meses/anos
// ===============================

document.addEventListener("DOMContentLoaded", () => {
    const selectMes = document.getElementById("selectMes");
    const selectAno = document.getElementById("selectAno");

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
});

// ===============================
//  PASSO 2 — Calcular PREVISÃO
// ===============================

function parseDataBR(dataStr) {
    const [dia, mes, ano] = dataStr.split("/").map(Number);
    return new Date(ano, mes - 1, dia);
}

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

// Recalcular quando muda mês/ano
document.getElementById("selectMes").addEventListener("change", () => {
    calcularPrevisao();
    carregarExtras();
});
document.getElementById("selectAno").addEventListener("change", () => {
    calcularPrevisao();
    carregarExtras();
});

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
                    <button class="btnApagarExtra" data-id="${doc.id}">Apagar</button>
                </td>
            `;

            tabela.appendChild(tr);
        });

        document.querySelectorAll(".btnApagarExtra").forEach(btn => {
            btn.addEventListener("click", () => apagarExtra(btn.dataset.id));
        });

    } catch (err) {
        console.error("Erro ao carregar extras:", err);
    }
}
