// -------------------------------------------------------------
// 0) ESTADO
// -------------------------------------------------------------
let isAdmin = false;

// -------------------------------------------------------------
// 1) VERIFICAR ADMIN
// -------------------------------------------------------------
firebase.auth().onAuthStateChanged(user => {
    if (user && user.email === "miguel@teuemail.com") {
        isAdmin = true;
        document.getElementById("painelAdmin").style.display = "block";
    } else {
        document.getElementById("painelAdmin").style.display = "none";
    }
});

// -------------------------------------------------------------
// 2) INICIAR INTERFACE
// -------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {

    const painelAdmin = document.getElementById("painelAdmin");
    const toggleAdmin = document.getElementById("toggleAdmin");

    painelAdmin.classList.add("aberto");

    toggleAdmin.addEventListener("click", () => {
        painelAdmin.classList.toggle("fechado");
        toggleAdmin.textContent = painelAdmin.classList.contains("fechado") ? "▶" : "▼";
    });

    document.getElementById("btnGerar").addEventListener("click", gerarLimpeza);
});

// -------------------------------------------------------------
// 3) FORMATAR DATA (dd/mm/yyyy)
// -------------------------------------------------------------
function formatarData(str) {
    if (!str) return "";
    if (str.includes("/")) return str;
    const d = parseDataPt(str);
    return d ? d.toLocaleDateString("pt-PT") : "";
}

// -------------------------------------------------------------
// 4) GERAR LIMPEZA
// -------------------------------------------------------------
async function gerarLimpeza() {
    const inicio = document.getElementById("dataInicio").value;
    const fim = document.getElementById("dataFim").value;

    if (!inicio || !fim) {
        alert("Escolhe as duas datas.");
        return;
    }

    const dataInicio = parseDataPt(inicio);
    const dataFim = parseDataPt(fim);

    if (!dataInicio || !dataFim) {
        alert("Datas inválidas.");
        return;
    }

    // 🔥 AQUI ESTÁ A MÁGICA: usar a função universal
    const reservas = await carregarReservasNormalizadas();

    const filtradas = filtrarPorDatas(reservas, dataInicio, dataFim);

    preencherLista(filtradas);
    preencherCalendario(filtradas, dataInicio, dataFim);

    if (isAdmin) calcularTotais(filtradas, dataInicio, dataFim);
}

// -------------------------------------------------------------
// 5) FILTRAR POR INTERSEÇÃO DE DATAS
// -------------------------------------------------------------
function filtrarPorDatas(reservas, inicio, fim) {
    return reservas.filter(r => {
        if (!r.checkin || !r.checkout) return false;

        const ci = parseDataPt(r.checkin);
        const co = parseDataPt(r.checkout);
        if (!ci || !co) return false;

        const intersecta = ci <= fim && co >= inicio;
        const ativa = r.status !== "cancelada";

        return intersecta && ativa;
    });
}

// -------------------------------------------------------------
// 6) LISTA DE LIMPEZA
// -------------------------------------------------------------
function preencherLista(reservas) {
    const tbody = document.querySelector("#tabelaLimpeza tbody");
    tbody.innerHTML = "";

    reservas.forEach(r => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${r.cliente}</td>
            <td>${r.apartamentos?.[0] || ""}</td>
            <td>${formatarData(r.checkin)}</td>
            <td>${formatarData(r.checkout)}</td>
            <td>${r.hospedes}</td>
            <td>${r.adultos}</td>
            <td>${r.criancas}</td>
            <td>${r.idadesCriancas}</td>
            <td>${r.berco ? "Sim" : "Não"}</td>
            <td>${r.comentarios || ""}</td>
        `;

        tbody.appendChild(tr);
    });
}

// -------------------------------------------------------------
// 7) CALENDÁRIO DE LIMPEZA
// -------------------------------------------------------------
function preencherCalendario(reservas, inicio, fim) {
    const container = document.getElementById("calendarioContainer");
    container.innerHTML = "";

    // 1) Gerar a grelha base do calendário (função do calendario.js)
    const dias = gerarDiasIntervalo(inicio, fim); 
    const apartamentos = obterApartamentosOrdenados(reservas);

    let html = gerarTabelaCalendario(dias, apartamentos); 
    container.innerHTML = html;

    // 2) Preencher com reservas (tooltip específico da limpeza)
    reservas.forEach(r => {
        const ap = r.apartamentos?.[0];
        if (!ap) return;

        const ci = parseDataPt(r.checkin);
        const co = parseDataPt(r.checkout);

        dias.forEach(dia => {
            if (ci <= dia && co >= dia) {
                const cellId = `cell-${ap}-${dia.toISOString().slice(0,10)}`;
                const cell = document.getElementById(cellId);
                if (!cell) return;

                const tooltip = `
${r.cliente}
${r.hospedes} pessoas (${r.adultos}A + ${r.criancas}C)
Idades: ${r.idadesCriancas || "-"}
Berço: ${r.berco ? "Sim" : "Não"}
Obs: ${r.comentarios || "-"}
                `.trim();

                cell.classList.add("ocupado");
                cell.title = tooltip;
                cell.textContent = r.cliente;
            }
        });
    });
}

// -------------------------------------------------------------
// 8) TOTAIS (APENAS ADMIN)
// -------------------------------------------------------------
function calcularTotais(reservas) {
    let totalBase = 0;
    let totalExtras = 0;

    reservas.forEach(r => {
        totalBase += Number(r.limpeza || 0);
        totalExtras += Number(r.limpezaExtra || 0);
    });

    document.getElementById("totalCheckouts").textContent = reservas.length;
    document.getElementById("totalBase").textContent = totalBase.toFixed(2);
    document.getElementById("totalExtras").textContent = totalExtras.toFixed(2);
    document.getElementById("totalGeral").textContent = (totalBase + totalExtras).toFixed(2);
}
