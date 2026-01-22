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
    desenharCalendarioLimpeza(filtradas, dataInicio, dataFim);

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
// 7) CALENDÁRIO DE LIMPEZA (VERSÃO CORRIGIDA)
// -------------------------------------------------------------
function desenharCalendarioLimpeza(reservas, inicio, fim) {

    // 🔥 GARANTIR QUE AS DATAS SÃO OBJETOS DATE
    inicio = new Date(inicio);
    fim = new Date(fim);

    const container = document.getElementById("calendarioContainer");
    container.innerHTML = "";

    // 🔥 GERAR LISTA DE DIAS (AGORA FUNCIONA)
    const dias = [];
    let d = new Date(inicio);
    while (d <= fim) {
        dias.push(new Date(d));
        d.setDate(d.getDate() + 1);
    }

    // APARTAMENTOS FIXOS
    const apartamentos = ["2301", "2203", "2204"];

    // 🔥 CABEÇALHO COM DIAS
    let html = `<div id="calendarioWrapper"><table><thead><tr><th>Apt</th>`;
    dias.forEach(dia => html += `<th>${dia.getDate()}</th>`);
    html += `</tr></thead><tbody>`;

    // 🔥 LINHAS POR APARTAMENTO
    apartamentos.forEach(ap => {
        html += `<tr><td>${ap}</td>`;
        dias.forEach(dia => {
            const id = `cel-${ap}-${dia.getDate()}`;
            html += `<td class="dia-celula" id="${id}"></td>`;
        });
        html += `</tr>`;
    });

    html += `</tbody></table></div>`;
    container.innerHTML = html;

    // 🔥 DESENHAR BARRAS DE RESERVA
    reservas.forEach(r => {
        const ap = r.apartamentos?.[0];
        if (!ap) return;

        const ci = parseDataPt(r.checkin);
        const co = parseDataPt(r.checkout);
        if (!ci || !co) return;

        const totalDias = Math.floor((co - ci) / (1000 * 60 * 60 * 24)) + 1;

        for (let dt = new Date(ci); dt <= co; dt.setDate(dt.getDate() + 1)) {
            const dia = dt.getDate();
            const cel = document.getElementById(`cel-${ap}-${dia}`);
            if (!cel) continue;

            // Só desenha a barra no dia de check-in
            if (dt.getTime() === ci.getTime()) {
                const barra = document.createElement("div");
                barra.classList.add("reserva-master");
                barra.textContent = r.cliente;

                // Largura proporcional ao número de dias
                barra.style.width = `calc(${totalDias * 100}% + ${totalDias - 1}px)`;
                barra.style.left = "0";

                // Tooltip
                barra.setAttribute("data-info", `
${r.cliente}
Check-in: ${ci.toLocaleDateString("pt-PT")}
Check-out: ${co.toLocaleDateString("pt-PT")}
${r.hospedes} pessoas (${r.adultos}A + ${r.criancas}C)
Idades: ${r.idadesCriancas || "-"}
Berço: ${r.berco ? "Sim" : "Não"}
Obs: ${r.comentarios || "-"}
                `.trim());

                cel.appendChild(barra);
            }
        }
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
