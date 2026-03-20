// ============================================================
// 0) VARIÁVEIS GLOBAIS
// ============================================================
let reservasOperacional = [];
let reservasFiltradas = [];
let ordemAtual = {}; // para ordenação


// ============================================================
// 1) FILTROS PERSISTENTES
// ============================================================
function inicializarFiltrosPersistentes() {
    const elementosFiltro = document.querySelectorAll('#filtros input, #filtros select');

    elementosFiltro.forEach(el => {
        const chave = 'operacional_filtro_' + el.id;

        // Restaurar valor guardado
        const valorGuardado = localStorage.getItem(chave);
        if (valorGuardado !== null) {
            el.value = valorGuardado;
        }

        // Guardar sempre que muda
        el.addEventListener('change', () => {
            localStorage.setItem(chave, el.value);

            if (typeof aplicarFiltrosOperacional === 'function') {
                aplicarFiltrosOperacional();
            }
        });
    });
}


// ============================================================
// 2) CARREGAR RESERVAS (APENAS 1 VEZ)
// ============================================================
async function carregarOperacional() {
    const snap = await db.collection("reservas").orderBy("checkin").get();

    reservasOperacional = [];
    snap.forEach(doc => reservasOperacional.push({ id: doc.id, ...doc.data() }));

    aplicarFiltrosOperacional();

    // RESTAURAR ORDENACAO
    const col = localStorage.getItem("operacional_ordem_coluna");
    const dir = localStorage.getItem("operacional_ordem_direcao");

    if (col && dir) {
        ordemAtual[col] = dir;
        ordenarPorColuna(col, dir);
    }
}



// ============================================================
// 3) FILTRAR (SEM LER FIREBASE)
// ============================================================
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

        if (pagamento && r.statusPagamento !== pagamento) return false;

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


// ============================================================
// 4) DESENHAR TABELA (SEM LER FIREBASE)
// ============================================================
function desenharTabelaOperacional() {

    const tbody = document.getElementById("tbodyOperacional");
    tbody.innerHTML = "";

    reservasFiltradas.forEach(r => {

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

        const tr = document.createElement("tr");
        tr.classList.add("linha");

        if (r.statusPagamento === "total") tr.classList.add("pago-total");
        if (r.statusPagamento === "parcial") tr.classList.add("pago-parcial");
        if (r.statusPagamento === "aguardar") tr.classList.add("pago-nao");

        tr.innerHTML = `
            <td>${r.origem || ""}</td>
            <td>${r.bookingId || ""}</td>
            <td>${r.cliente || ""}</td>
            <td>${r.quartos || ""}</td>
            <td>${(r.apartamentos || []).join(", ")}</td>
            <td>${r.hospedes || ""}</td>
            <td>${r.checkin}</td>
            <td>${r.checkout}</td>
            <td>${Math.round(r.noites)}</td>
            <td>${totalBruto.toFixed(2)}</td>

            <!-- NOVO CÁLCULO CORRETO -->
            <td>${(totalBruto / r.noites / r.quartos).toFixed(2)}</td>

            <td>${antesIVA.toFixed(2)}</td>
            <td>${valorIVA.toFixed(2)}</td>
            <td>${comissao.toFixed(2)}</td>
            <td>${comissaoExtra.toFixed(2)}</td>
            <td>${comissaoTotal.toFixed(2)}</td>
            <td>${limpeza.toFixed(2)}</td>
            <td>${liquidoOTA.toFixed(2)}</td>
            <td>${liquidoOperacional.toFixed(2)}</td>
            <td>${liquidoTotal.toFixed(2)}</td>

            <td>
                <input type="date" class="inputDataPagamento" data-id="${r.id}" 
                       value="${r.dataPagamento || ""}">
            </td>

            <td>
                <input type="text" class="inputFatura" data-id="${r.id}" 
                       value="${r.numeroFatura || ""}">
            </td>

            <td>
                <select class="selectPagamento" data-id="${r.id}">
                    <option value="">—</option>
                    <option value="total" ${r.statusPagamento === "total" ? "selected" : ""}>Pago totalmente</option>
                    <option value="parcial" ${r.statusPagamento === "parcial" ? "selected" : ""}>Pago parcialmente</option>
                    <option value="aguardar" ${r.statusPagamento === "aguardar" ? "selected" : ""}>Por pagar</option>
                </select>
            </td>

            <td>
                <button class="btnGravar" data-id="${r.id}">Gravar</button>
                <button class="btnApagar" data-id="${r.id}">Apagar</button>
            </td>
        `;

        tbody.appendChild(tr);
    });

    ligarEventosLinha();
}


// ============================================================
// 5) EVENTOS (SEM LER FIREBASE)
// ============================================================
function ligarEventosLinha() {

    // GRAVAR
    document.querySelectorAll(".btnGravar").forEach(btn => {
        btn.addEventListener("click", async () => {

            const id = btn.dataset.id;

            const numeroFatura = document.querySelector(`.inputFatura[data-id="${id}"]`).value;
            const estadoPagamento = document.querySelector(`.selectPagamento[data-id="${id}"]`).value;
            const dataPagamento = document.querySelector(`.inputDataPagamento[data-id="${id}"]`).value;

            await db.collection("reservas").doc(id).update({
                numeroFatura,
                statusPagamento: estadoPagamento,
                dataPagamento
            });

            // Atualizar apenas a reserva em memória
            const r = reservasOperacional.find(x => x.id === id);
            if (r) {
                r.numeroFatura = numeroFatura;
                r.statusPagamento = estadoPagamento;
                r.dataPagamento = dataPagamento;
            }

            aplicarFiltrosOperacional();
        });
    });

    // APAGAR
    document.querySelectorAll(".btnApagar").forEach(btn => {
        btn.addEventListener("click", async () => {

            const id = btn.dataset.id;
            if (!confirm("Apagar reserva?")) return;

            await db.collection("reservas").doc(id).delete();

            reservasOperacional = reservasOperacional.filter(r => r.id !== id);

            aplicarFiltrosOperacional();
        });
    });
}


// ============================================================
// 6) ORDENAR (SEM LER FIREBASE)
// ============================================================
document.querySelectorAll("#tabelaOperacional th[data-col]").forEach(th => {
    th.addEventListener("click", () => {
        const coluna = th.dataset.col;

        ordemAtual[coluna] = ordemAtual[coluna] === "asc" ? "desc" : "asc";

        // GUARDAR NO LOCALSTORAGE
        localStorage.setItem("operacional_ordem_coluna", coluna);
        localStorage.setItem("operacional_ordem_direcao", ordemAtual[coluna]);

        ordenarPorColuna(coluna, ordemAtual[coluna]);
    });
});


function ordenarPorColuna(coluna, ordem) {

    reservasFiltradas.sort((a, b) => {
        let v1 = a[coluna];
        let v2 = b[coluna];

        if (!isNaN(v1) && !isNaN(v2)) {
            v1 = Number(v1);
            v2 = Number(v2);
        }

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


// ============================================================
// 7) PARSE DATA
// ============================================================
function parseDataPt(data) {
    if (!data) return null;
    const [dia, mes, ano] = data.split("/");
    return new Date(`${ano}-${mes}-${dia}`);
}


// ============================================================
// 8) INICIAR
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
    inicializarFiltrosPersistentes();
    carregarOperacional(); // única leitura Firebase

    // LIGAR BOTÃO LIMPAR
    const btnLimpar = document.getElementById("btnLimparFiltros");
    if (btnLimpar) {
        btnLimpar.addEventListener("click", () => {

            // limpar filtros visuais
            document.getElementById("filtroTexto").value = "";
            document.getElementById("filtroOrigem").value = "";
            document.getElementById("filtroPagamento").value = "";
            document.getElementById("filtroDataInicio").value = "";
            document.getElementById("filtroDataFim").value = "";

            // limpar filtros persistentes
            ["filtroTexto","filtroOrigem","filtroPagamento","filtroDataInicio","filtroDataFim"].forEach(id => {
                localStorage.removeItem("operacional_filtro_" + id);
            });

            // limpar ordenação persistente
            localStorage.removeItem("operacional_ordem_coluna");
            localStorage.removeItem("operacional_ordem_direcao");

            // limpar ordenação em memória
            ordemAtual = {};

            // aplicar tabela sem filtros nem ordenação
            aplicarFiltrosOperacional();
        });
    }
});

