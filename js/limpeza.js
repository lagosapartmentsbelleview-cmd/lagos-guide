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
//  Tooltip
// -------------------------------------------------------------

document.addEventListener("mousemove", e => {
    document.documentElement.style.setProperty("--mouse-x", e.clientX + "px");
    document.documentElement.style.setProperty("--mouse-y", e.clientY + "px");
});

// -------------------------------------------------------------
// 2) INICIAR INTERFACE
// -------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {

    const painelAdmin = document.getElementById("painelAdmin");
    const toggleAdmin = document.getElementById("toggleAdmin");
    const btnGerar = document.getElementById("btnGerar");

    // Se não existir painel admin, ignora esta parte
    if (painelAdmin && toggleAdmin) {
        painelAdmin.classList.add("aberto");

        toggleAdmin.addEventListener("click", () => {
            painelAdmin.classList.toggle("fechado");
            toggleAdmin.textContent = painelAdmin.classList.contains("fechado") ? "▶" : "▼";
        });
    }

    // Se existir botão gerar, ativa-o
    if (btnGerar) {
        btnGerar.addEventListener("click", gerarLimpeza);
    }
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
        const apartamentos = Array.isArray(r.apartamentos) ? r.apartamentos : [""];

        apartamentos.forEach(ap => {
            const tr = document.createElement("tr");

            tr.innerHTML = `
                <td>${r.cliente}</td>
                <td>${ap}</td>
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
    });
}


function desenharCalendarioLimpeza(reservas, inicio, fim) {

    inicio = new Date(inicio);
    fim = new Date(fim);

    const container = document.getElementById("calendarioContainer");
    container.innerHTML = "";

    // Gerar lista de dias
    const dias = [];
    let d = new Date(inicio);
    while (d <= fim) {
        dias.push(new Date(d));
        d.setDate(d.getDate() + 1);
    }

    const apartamentos = ["2301", "2203", "2204"];

    // Cabeçalho
    let html = `<div id="calendarioWrapper"><table class="calendario"><thead><tr><th>Apt</th>`;
    dias.forEach(dia => html += `<th>${dia.getDate()}</th>`);
    html += `</tr></thead><tbody>`;

    // Linhas por apartamento
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

    function nomeCurto(nome) {
        if (!nome) return "";
        const partes = nome.trim().split(" ");
        if (partes.length === 1) return partes[0];
        return partes[0] + " " + partes[partes.length - 1];
    }

    function normalizar(d) {
        return new Date(d.getFullYear(), d.getMonth(), d.getDate());
    }

    reservas.forEach(r => {

        const listaAps = Array.isArray(r.apartamentos) ? r.apartamentos : [];
        const dataInicio = parseDataPt(r.checkin);
        const dataFim = parseDataPt(r.checkout);
        if (!dataInicio || !dataFim) return;

        // corta a reserva ao intervalo visível
        const realInicio = normalizar(dataInicio);
        const realFim = normalizar(dataFim);
        const visInicio = realInicio < inicio ? normalizar(inicio) : realInicio;
        const visFim = realFim > fim ? normalizar(fim) : realFim;
        if (visInicio > visFim) return;

        const totalDiasVisiveis =
            Math.floor((visFim - visInicio) / (1000 * 60 * 60 * 24)) + 1;

        const tooltipTexto = `
${r.cliente}
Check-in: ${realInicio.toLocaleDateString("pt-PT")}
Check-out: ${realFim.toLocaleDateString("pt-PT")}
${r.hospedes} pessoas (${r.adultos}A + ${r.criancas}C)
Idades: ${r.idadesCriancas || "-"}
Berço: ${r.berco ? "Sim" : "Não"}
Obs: ${r.comentarios || "-"}
        `.trim();

listaAps.forEach(ap => {

    let masterCriada = false;

    // Seleciona apenas os dias que pertencem à reserva dentro do intervalo visível
    const diasVisiveis = dias.filter(d => {
        const dn = normalizar(d);
        return dn >= visInicio && dn <= visFim;
    });

    diasVisiveis.forEach((dtN, i) => {

        const dia = dtN.getDate();
        const cel = document.getElementById(`cel-${ap}-${dia}`);
        if (!cel) return;

        const isCheckinReal = dtN.getTime() === realInicio.getTime();
        const isCheckoutReal = dtN.getTime() === realFim.getTime();

        // MASTER no primeiro dia visível
        if (!masterCriada && i === 0) {
            const master = document.createElement("div");
            master.classList.add("reserva-master");
            master.textContent = nomeCurto(r.cliente);
            master.style.width = `calc(${diasVisiveis.length * 100}%)`;
            master.style.left = "0";
            master.setAttribute("data-info", tooltipTexto);
            cel.appendChild(master);
            masterCriada = true;
        }

        // Se só há 1 dia visível E é check-in e check-out reais → aplica classe single
if (diasVisiveis.length === 1 && isCheckinReal && isCheckoutReal) {
    const div = document.createElement("div");
    div.classList.add("reserva", "single");
    div.setAttribute("data-info", tooltipTexto);
    cel.appendChild(div);
    return;
}

        const div = document.createElement("div");
        div.classList.add("reserva");

       // Check-in e check-out no mesmo dia
if (isCheckinReal && isCheckoutReal) {
    div.classList.add("single");
}
// Apenas check-in
else if (isCheckinReal) {
    div.classList.add("in");
}
// Apenas check-out
else if (isCheckoutReal) {
    div.classList.add("out");
}
// Dias no meio
else {
    div.classList.add("middle");
}



        div.setAttribute("data-info", tooltipTexto);
        cel.appendChild(div);
    });
});

    });
}




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
