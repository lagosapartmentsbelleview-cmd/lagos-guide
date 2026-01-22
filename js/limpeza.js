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

    const dias = [];
    let d = new Date(inicio);
    while (d <= fim) {
        dias.push(new Date(d));
        d.setDate(d.getDate() + 1);
    }

    const apartamentosSet = new Set();
    reservas.forEach(r => {
        if (r.apartamentos?.[0]) apartamentosSet.add(String(r.apartamentos[0]));
    });

    const ordemFixa = ["2301", "2203", "2204"];
    let apartamentos = Array.from(apartamentosSet);

    apartamentos.sort((a, b) => {
        const ia = ordemFixa.indexOf(a);
        const ib = ordemFixa.indexOf(b);
        if (ia === -1 && ib === -1) return a.localeCompare(b);
        if (ia === -1) return 1;
        if (ib === -1) return -1;
        return ia - ib;
    });

    if (apartamentos.length === 0) {
        container.innerHTML = "<p>Sem reservas neste período.</p>";
        return;
    }

    let html = `<table class="calendario"><thead><tr><th>Apt</th>`;

    dias.forEach(dia => {
        html += `<th>${dia.getDate()}</th>`;
    });

    html += `</tr></thead><tbody>`;

    apartamentos.forEach(ap => {
        html += `<tr><td><strong>${ap}</strong></td>`;

        dias.forEach(dia => {
            const reserva = reservas.find(r => {
                if (String(r.apartamentos?.[0]) !== ap) return false;

                const ci = parseDataPt(r.checkin);
                const co = parseDataPt(r.checkout);
                if (!ci || !co) return false;

                return ci <= dia && co >= dia;
            });

            if (reserva) {
                const tooltip = `
Apt ${ap}
${reserva.cliente}
${reserva.hospedes} pessoas (${reserva.adultos}A + ${reserva.criancas}C)
Idades: ${reserva.idadesCriancas || "-"}
Berço: ${reserva.berco ? "Sim" : "Não"}
Obs: ${reserva.comentarios || "-"}
                `.trim();

                html += `<td class="ocupado normal" title="${tooltip}">${reserva.cliente}</td>`;
            } else {
                html += `<td></td>`;
            }
        });

        html += `</tr>`;
    });

    html += `</tbody></table>`;

    container.innerHTML = html;
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
