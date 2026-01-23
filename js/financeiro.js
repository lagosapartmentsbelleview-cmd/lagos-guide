// ===============================
//  PASSO 1 — Carregar meses/anos
// ===============================

document.addEventListener("DOMContentLoaded", () => {
    const selectMes = document.getElementById("selectMes");
    const selectAno = document.getElementById("selectAno");

    // Meses por extenso
    const meses = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    // Preencher meses
    meses.forEach((mes, index) => {
        const opt = document.createElement("option");
        opt.value = index + 1; // 1 a 12
        opt.textContent = mes;
        selectMes.appendChild(opt);
    });

    // Preencher anos (2023 → 2030)
    for (let ano = 2023; ano <= 2050; ano++) {
        const opt = document.createElement("option");
        opt.value = ano;
        opt.textContent = ano;
        selectAno.appendChild(opt);
    }

    // Selecionar mês/ano atual
    const hoje = new Date();
    selectMes.value = hoje.getMonth() + 1;
    selectAno.value = hoje.getFullYear();
});

// ===============================
//  PASSO 2 — Calcular PREVISÃO
// ===============================

const db = firebase.firestore();

// Converter "DD/MM/YYYY" → Date()
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
document.getElementById("selectMes").addEventListener("change", calcularPrevisao);
document.getElementById("selectAno").addEventListener("change", calcularPrevisao);

