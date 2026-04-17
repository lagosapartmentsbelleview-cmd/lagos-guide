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
//  Tooltip (para data-info)
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

    if (painelAdmin && toggleAdmin) {
        painelAdmin.classList.add("aberto");

        toggleAdmin.addEventListener("click", () => {
            painelAdmin.classList.toggle("fechado");
            toggleAdmin.textContent = painelAdmin.classList.contains("fechado") ? "▶" : "▼";
        });
    }

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

    const reservas = await carregarReservasNormalizadas();
    const filtradas = filtrarPorDatas(reservas, dataInicio, dataFim);

    preencherLista(filtradas);
    desenharCalendarioLimpeza(filtradas, dataInicio, dataFim); // WEB + clone A1

    if (isAdmin) calcularTotais(filtradas);

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

// -------------------------------------------------------------
// 7) CALENDÁRIO DE LIMPEZA — VERSÃO WEB (mantido)
// -------------------------------------------------------------
function desenharCalendarioLimpeza(reservas, inicio, fim) {

    inicio = new Date(inicio.getFullYear(), inicio.getMonth(), inicio.getDate());
    fim    = new Date(fim.getFullYear(),    fim.getMonth(),    fim.getDate());

    const container = document.getElementById("calendarioContainer");
    container.innerHTML = "";

    const dias = [];
    let d = new Date(inicio);
    while (d <= fim) {
        dias.push(new Date(d));
        d.setDate(d.getDate() + 1);
    }

    const apartamentos = ["2301", "2203", "2204"];

    // tabela
    let html = `<div id="calendarioWrapper" style="position:relative;">
                    <table class="calendario">
                        <thead><tr><th>Apt</th>`;
    dias.forEach(dia => html += `<th>${dia.getDate()}</th>`);
    html += `</tr></thead><tbody>`;

    apartamentos.forEach(ap => {
        html += `<tr><td>${ap}</td>`;
        dias.forEach((_, i) => {
            html += `<td class="dia-celula" id="cel-${ap}-${i}"></td>`;
        });
        html += `</tr>`;
    });

    html += `</tbody></table></div>`;
    container.innerHTML = html;

    // overlay global para nomes (WEB)
    const overlay = document.createElement("div");
    overlay.classList.add("overlay-nomes");
    document.getElementById("calendarioWrapper").appendChild(overlay);

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

        const realInicio = normalizar(dataInicio);
        const realFim = normalizar(dataFim);

        const visInicio = realInicio < inicio ? normalizar(inicio) : realInicio;
        const visFim = realFim > fim ? normalizar(fim) : realFim;
        if (visInicio > visFim) return;

        const diasVisiveis = [];
        let dt = new Date(visInicio);
        while (dt <= visFim) {
            diasVisiveis.push(new Date(dt));
            dt.setDate(dt.getDate() + 1);
        }

        const tooltipTexto = (
`${r.cliente}
Check-in: ${realInicio.toLocaleDateString("pt-PT")}
Check-out: ${realFim.toLocaleDateString("pt-PT")}
${r.hospedes} pessoas (${r.adultos}A + ${r.criancas}C)
Idades: ${r.idadesCriancas || "-"}
Berço: ${r.berco ? "Sim" : "Não"}
Obs: ${r.comentarios || "-"}`
        ).trim();

        listaAps.forEach(ap => {

            const indicesCelulas = [];

            diasVisiveis.forEach(dtN => {

                const index = dias.findIndex(x => x.getTime() === dtN.getTime());
                if (index === -1) return;

                const cel = document.getElementById(`cel-${ap}-${index}`);
                if (!cel) return;

                const truncadoNoInicio = realInicio < inicio;
                const truncadoNoFim    = realFim > fim;

                const isCheckinVisivel  = !truncadoNoInicio && dtN.getTime() === visInicio.getTime();
                const isCheckoutVisivel = !truncadoNoFim    && dtN.getTime() === visFim.getTime();

                const div = document.createElement("div");
                div.classList.add("reserva");

                if (isCheckinVisivel && isCheckoutVisivel) {

                    if (!truncadoNoInicio && truncadoNoFim) {
                        div.classList.add("reserva-inicio-metade");
                        cel.dataset.tipo = "inicio";

                    } else if (truncadoNoInicio && !truncadoNoFim) {
                        div.classList.add("reserva-fim-metade");
                        cel.dataset.tipo = "fim";

                    } else {
                        div.classList.add("reserva-meio");
                        cel.dataset.tipo = "meio";
                    }

                } else if (isCheckinVisivel) {
                    div.classList.add("reserva-inicio-metade");
                    cel.dataset.tipo = "inicio";

                } else if (isCheckoutVisivel) {
                    div.classList.add("reserva-fim-metade");
                    cel.dataset.tipo = "fim";

                } else {
                    div.classList.add("reserva-meio");
                    cel.dataset.tipo = "meio";
                }

                cel.setAttribute("data-info", tooltipTexto);
                cel.appendChild(div);
                cel.classList.add("dia-com-reserva");

                indicesCelulas.push(index);
            });

            // ---------------------------------------------------------
            // NOME — OVERLAY (WEB)
            // ---------------------------------------------------------
            if (indicesCelulas.length > 0) {

                const idxPrimeira = indicesCelulas[0];
                const idxUltima = indicesCelulas[indicesCelulas.length - 1];

                const celPrimeira = document.getElementById(`cel-${ap}-${idxPrimeira}`);
                const celUltima = document.getElementById(`cel-${ap}-${idxUltima}`);

                const rectPrimeira = celPrimeira.getBoundingClientRect();
                const rectUltima = celUltima.getBoundingClientRect();
                const wrapperRect = document.getElementById("calendarioWrapper").getBoundingClientRect();

                const nome = document.createElement("div");
                nome.classList.add("overlay-nome");
                nome.textContent = nomeCurto(r.cliente);

                nome.style.top = (rectPrimeira.top - wrapperRect.top + rectPrimeira.height / 2) + "px";

                const centro = (rectPrimeira.left + rectUltima.right) / 2;
                nome.style.left = (centro - wrapperRect.left) + "px";

                overlay.appendChild(nome);
            }

        });

    });

    // ⭐ NOVO: gerar clone A1 automaticamente
    gerarCloneCalendarioA1(reservas, inicio, fim);
}
// -------------------------------------------------------------
// 7B) CALENDÁRIO WEB — CLONE A1 (para PDF e CTRL+P)
// -------------------------------------------------------------
function gerarCloneCalendarioA1(reservas, inicio, fim) {

    const cloneContainer = document.getElementById("calendarioWebPrintClone");
    cloneContainer.innerHTML = "";

    inicio = new Date(inicio.getFullYear(), inicio.getMonth(), inicio.getDate());
    fim    = new Date(fim.getFullYear(),    fim.getMonth(),    fim.getDate());

    const dias = [];
    let d = new Date(inicio);
    while (d <= fim) {
        dias.push(new Date(d));
        d.setDate(d.getDate() + 1);
    }

    const apartamentos = ["2301", "2203", "2204"];

    let html = `<table class="calendario-web-print">
                    <thead><tr><th>Apt</th>`;
    dias.forEach(dia => html += `<th>${dia.getDate()}</th>`);
    html += `</tr></thead><tbody>`;

    apartamentos.forEach(ap => {
        html += `<tr><td>${ap}</td>`;
        dias.forEach((dia, i) => {
            html += `<td id="clone-${ap}-${i}"></td>`;
        });
        html += `</tr>`;
    });

    html += `</tbody></table>`;
    cloneContainer.innerHTML = html;

    function nomeCurto(nome) {
        if (!nome) return "";
        const partes = nome.trim().split(" ");
        return partes.length === 1 ? partes[0] : partes[0] + " " + partes[partes.length - 1];
    }

    reservas.forEach(r => {

        const listaAps = Array.isArray(r.apartamentos) ? r.apartamentos : [];
        const ci = parseDataPt(r.checkin);
        const co = parseDataPt(r.checkout);
        if (!ci || !co) return;

        listaAps.forEach(ap => {

            dias.forEach((dia, i) => {

                if (dia >= ci && dia <= co) {

                    const cel = document.getElementById(`clone-${ap}-${i}`);
                    if (!cel) return;

                    const totalDias = Math.round((co - ci) / 86400000) + 1;
                    const meioReal = (totalDias - 1) / 2; // centro geométrico real
                    const pos = Math.round((dia - ci) / 86400000);

                    let tipo = "meio";
                    if (pos === 0) tipo = "inicio";
                    if (pos === totalDias - 1) tipo = "fim";

                    // célula mais próxima do centro geométrico
                    const posCentro = Math.round(meioReal);

                    cel.innerHTML = `
                        <div class="reserva-print ${tipo}">
                            ${pos === posCentro ? nomeCurto(r.cliente) : ""}
                        </div>
                    `;
                }
            });
        });
    });
}
// -------------------------------------------------------------
// 8) EXPORTAR PDF — Screenshot da Lista + Screenshot do Calendário
// -------------------------------------------------------------
window.exportarPDF = async function () {

    const { jsPDF } = window.jspdf;

    // 1) Capturar LISTA
    const lista = document.querySelectorAll(".secao")[0];
    const listaCanvas = await html2canvas(lista, { scale: 3 });
    const listaImg = listaCanvas.toDataURL("image/png");

    // 2) Capturar CALENDÁRIO
    const calendario = document.getElementById("calendarioWebPrintClone");
    const calendarioCanvas = await html2canvas(calendario, { scale: 3 });
    const calendarioImg = calendarioCanvas.toDataURL("image/png");

    // 3) Criar PDF
    const pdf = new jsPDF("landscape", "mm", "a4");

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // Página 1 — Lista
    pdf.addImage(listaImg, "PNG", 0, 0, pageWidth, pageHeight);

    // Página 2 — Calendário
    pdf.addPage();
    pdf.addImage(calendarioImg, "PNG", 0, 0, pageWidth, pageHeight);

    // 4) Guardar
    pdf.save("limpeza.pdf");
};


window.exportarEEnviarWhatsApp = async function () {
    await window.exportarPDF();
    setTimeout(() => {
        window.open("https://chat.whatsapp.com/D98y5fnPZ7A7IeYZuNjlt1", "_blank");
    }, 1500);
};

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
