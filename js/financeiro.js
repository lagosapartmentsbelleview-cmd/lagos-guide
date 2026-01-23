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
