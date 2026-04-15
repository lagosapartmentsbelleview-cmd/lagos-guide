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
    desenharCalendarioLimpeza(filtradas, dataInicio, dataFim);

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
// 7) CALENDÁRIO DE LIMPEZA — VERSÃO FINAL (SEM MASTER)
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

    let html = `<div id="calendarioWrapper"><table class="calendario"><thead><tr><th>Apt</th>`;
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

            const indicesCelulas = [];

            diasVisiveis.forEach(dtN => {

                const index = dias.findIndex(x => x.getTime() === dtN.getTime());
                if (index === -1) return;

                const cel = document.getElementById(`cel-${ap}-${index}`);
                if (!cel) return;

                const isCheckinVisivel  = dtN.getTime() === visInicio.getTime();
                const isCheckoutVisivel = dtN.getTime() === visFim.getTime();

                const div = document.createElement("div");
                div.classList.add("reserva");

                // detectar truncamentos
                const truncadoNoInicio = realInicio < inicio;
                const truncadoNoFim    = realFim > fim;

                // decidir forma da barra
                if (isCheckinVisivel && isCheckoutVisivel) {

                    if (!truncadoNoInicio && truncadoNoFim) {
                        // começa aqui e continua para o mês seguinte → "("
                        div.classList.add("reserva-inicio-metade");

                    } else if (truncadoNoInicio && !truncadoNoFim) {
                        // vem de antes e termina aqui → ")"
                        div.classList.add("reserva-fim-metade");

                    } else {
                        // reserva realmente de 1 dia
                        div.classList.add("reserva-meio");
                    }

                } else if (isCheckinVisivel) {
                    div.classList.add("reserva-inicio-metade");

                } else if (isCheckoutVisivel) {
                    div.classList.add("reserva-fim-metade");

                } else {
                    div.classList.add("reserva-meio");
                }

                div.setAttribute("data-info", tooltipTexto);
                cel.appendChild(div);

                // marcar célula como tendo reserva (para o CSS da grelha)
                cel.classList.add("dia-com-reserva");

                // guardar índice desta célula para depois pôr o nome no meio
                indicesCelulas.push(index);
            });

            // depois de desenhar todas as células desta reserva neste apartamento,
            // colocamos o nome na célula do meio
            if (indicesCelulas.length > 0) {
                const meioIndex = indicesCelulas[Math.floor(indicesCelulas.length / 2)];
                const celMeio = document.getElementById(`cel-${ap}-${meioIndex}`);
                if (celMeio) {
                    const nome = document.createElement("div");
                    nome.classList.add("reserva-nome");
                    nome.textContent = nomeCurto(r.cliente);
                    celMeio.appendChild(nome);
                }
            }

        });

    });
}

// -------------------------------------------------------------
// 8) TOTAIS ADMIN
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
