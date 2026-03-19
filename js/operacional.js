let reservasOperacional = [];
let reservasFiltradas = [];

// -------------------------------------------------------------
// 1) CARREGAR RESERVAS (UMA VEZ)
// -------------------------------------------------------------
async function carregarOperacional() {
    const snap = await db.collection("reservas").orderBy("checkin").get();

    reservasOperacional = [];
    snap.forEach(doc => reservasOperacional.push({ id: doc.id, ...doc.data() }));

    aplicarFiltrosOperacional();
}

// -------------------------------------------------------------
// 2) FILTROS
// -------------------------------------------------------------
function aplicarFiltrosOperacional() {

    let lista = [...reservasOperacional];

    const txt = document.getElementById("filtroTexto").value.toLowerCase();
    const origem = document.getElementById("filtroOrigem").value;
    const pagamento = document.getElementById("filtroPagamento").value;
    const dtInicio = document.getElementById("filtroDataInicio").value;
    const dtFim = document.getElementById("filtroDataFim").value;

    lista = lista.filter(r => {

        if (txt && !(
            r.cliente?.toLowerCase().includes(txt) ||
            r.bookingId?.toLowerCase().includes(txt)
        )) return false;

        if (origem && r.origem !== origem) return false;

        if (pagamento && r.estadoPagamentoOperacional !== pagamento) return false;

        if (dtInicio) {
            const d1 = parseDataPt(r.checkin);
            if (d1 < new Date(dtInicio)) return false;
        }

        if (dtFim) {
            const d2 = parseDataPt(r.checkin);
            if (d2 > new Date(dtFim)) return false;
        }

        return true;
    });

    reservasFiltradas = lista;
    desenharTabelaOperacional();
}

// -------------------------------------------------------------
// 3) DESENHAR TABELA
// -------------------------------------------------------------
function desenharTabelaOperacional() {

    const tbody = document.getElementById("tbodyOperacional");
    tbody.innerHTML = "";

    reservasFiltradas.forEach(r => {

        // Cálculos financeiros
        const totalBruto = Number(r.totalBruto || 0);
        const antesIVA = totalBruto / 1.06;
        const valorIVA = totalBruto - antesIVA;

        const comissao = Number(r.comissao || 0);
        const comissaoExtra = Number(r.comissaoExtra || 0);
        const comissaoTotal = comissao + comissaoExtra;
        const limpeza = Number(r.limpeza || 0);

        const liquidoOTA = totalBruto - comissao - comissaoExtra;
        const liquidoOperacional = liquidoOTA - limpeza;
        const liquidoTotal = liquidoOperacional - valorIVA;

        // Linha
        const tr = document.createElement("tr");
        tr.classList.add("linha");

        // Cor por estado pagamento
        if (r.estadoPagamentoOperacional === "total") tr.classList.add("pago-total");
        if (r.estadoPagamentoOperacional === "parcial") tr.classList.add("pago-parcial");
        if (r.estadoPagamentoOperacional === "nao") tr.classList.add("pago-nao");

        tr.innerHTML = `
            <td>${r.origem || ""}</td>
            <td>${r.bookingId || ""}</td>
            <td>${r.cliente || ""}</td>
            <td>${r.quartos || ""}</td>
            <td>${(r.apartamentos || []).join(", ")}</td>
            <td>${r.hospedes || ""}</td>
            <td>${r.checkin}</td>
            <td>${r.checkout}</td>
            <td>${r.noites}</td>
            <td>${totalBruto.toFixed(2)}</td>
            <td>${(totalBruto / r.noites).toFixed(2)}</td>
            <td>${antesIVA.toFixed(2)}</td>
            <td>${valorIVA.toFixed(2)}</td>
            <td>${comissao.toFixed(2)}</td>
            <td>${comissaoExtra.toFixed(2)}</td>
            <td>${comissaoTotal.toFixed(2)}</td>
            <td>${limpeza.toFixed(2)}</td>
            <td>${liquidoOTA.toFixed(2)}</td>
            <td>${liquidoOperacional.toFixed(2)}</td>
            <td>${liquidoTotal.toFixed(2)}</td>

            <td><input type="text" class="inputFatura" data-id="${r.id}" value="${r.numeroFatura || ""}"></td>

            <td>
                <select class="selectPagamento" data-id="${r.id}">
                    <option value="">—</option>
                    <option value="total" ${r.estadoPagamentoOperacional === "total" ? "selected" : ""}>Pago totalmente</option>
                    <option value="parcial" ${r.estadoPagamentoOperacional === "parcial" ? "selected" : ""}>Pago parcialmente</option>
                    <option value="nao" ${r.estadoPagamentoOperacional === "nao" ? "selected" : ""}>Por pagar</option>
                </select>
            </td>

            <td>
                <button class="btnGravar" data-id="${r.id}">Gravar</button>
                <button class="btnApagar" data-id="${r.id}">Apagar</button>
            </td>
        `;
        r.comissaoTotal = comissaoTotal;
        r.estadoPagamentoOperacional = r.estadoPagamentoOperacional || "";


        tbody.appendChild(tr);
    });

    ligarEventosLinha();
}

// -------------------------------------------------------------
// 4) EVENTOS INLINE
// -------------------------------------------------------------
function ligarEventosLinha() {

    document.querySelectorAll(".btnGravar").forEach(btn => {
        btn.addEventListener("click", async () => {
            const id = btn.dataset.id;

            const numeroFatura = document.querySelector(`.inputFatura[data-id="${id}"]`).value;
            const estadoPagamento = document.querySelector(`.selectPagamento[data-id="${id}"]`).value;

            await db.collection("reservas").doc(id).update({
                numeroFatura,
                estadoPagamentoOperacional: estadoPagamento
            });

            alert("Atualizado.");
            carregarOperacional();
        });
    });

    document.querySelectorAll(".btnApagar").forEach(btn => {
        btn.addEventListener("click", async () => {
            const id = btn.dataset.id;

            if (!confirm("Apagar reserva?")) return;

            await db.collection("reservas").doc(id).delete();

            const snapCal = await db.collection("calendario").where("id", "==", id).get();
            snapCal.forEach(doc => doc.ref.delete());

            carregarOperacional();
        });
    });
}

function parseDataPt(data) {
    if (!data) return null;
    const [dia, mes, ano] = data.split("/");
    return new Date(`${ano}-${mes}-${dia}`);
}

// LIGAR FILTROS
document.getElementById("filtroTexto").addEventListener("input", aplicarFiltrosOperacional);
document.getElementById("filtroOrigem").addEventListener("change", aplicarFiltrosOperacional);
document.getElementById("filtroPagamento").addEventListener("change", aplicarFiltrosOperacional);
document.getElementById("filtroDataInicio").addEventListener("change", aplicarFiltrosOperacional);
document.getElementById("filtroDataFim").addEventListener("change", aplicarFiltrosOperacional);

document.getElementById("btnLimparFiltros").addEventListener("click", () => {
    document.getElementById("filtroTexto").value = "";
    document.getElementById("filtroOrigem").value = "";
    document.getElementById("filtroPagamento").value = "";
    document.getElementById("filtroDataInicio").value = "";
    document.getElementById("filtroDataFim").value = "";
    aplicarFiltrosOperacional();
});

// -------------------------------------------------------------
// 5) ORDENAR POR COLUNA (clicar no cabeçalho)
// -------------------------------------------------------------
let ordemAtual = {}; // guarda estado de cada coluna

document.querySelectorAll("#tabelaOperacional th[data-col]").forEach(th => {
    th.addEventListener("click", () => {
        const coluna = th.dataset.col;

        // alternar ordem
        ordemAtual[coluna] = ordemAtual[coluna] === "asc" ? "desc" : "asc";

        ordenarPorColuna(coluna, ordemAtual[coluna]);
    });
});

function ordenarPorColuna(coluna, ordem) {

    reservasFiltradas.sort((a, b) => {
        let v1 = a[coluna];
        let v2 = b[coluna];

        // converter números
        if (!isNaN(v1) && !isNaN(v2)) {
            v1 = Number(v1);
            v2 = Number(v2);
        }

        // converter datas PT
        if (coluna === "checkin" || coluna === "checkout") {
            v1 = parseDataPt(v1);
            v2 = parseDataPt(v2);
        }

        if (v1 < v2) return ordem === "asc" ? -1 : 1;
        if (v1 > v2) return ordem === "asc" ? 1 : -1;
        return 0;
    });

    desenharTabelaOperacional();
}


// INICIAR
document.addEventListener("DOMContentLoaded", carregarOperacional);

