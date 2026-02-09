console.log("JS DA LISTAGEM A CORRER — VERSÃO FINAL");

// -------------------------------------------------------------
// 0) ESTADO GLOBAL
// -------------------------------------------------------------
let reservas = [];            // todas as reservas
let reservasFiltradas = [];   // reservas após filtro
let reservaAtual = null;

const APARTAMENTOS_FIXOS = ["2301", "2203", "2204"];
const DIAS_SEGURANCA_REALOCA = 5;

// ------------------------------------------------------------- 
//  FUNÇÃO PARA FORMATAR NOMES (primeira maiúscula) 
// -------------------------------------------------------------

function formatarNome(nome) {
    if (!nome) return "";

    return nome
        .toLowerCase()
        .split(" ")
        .filter(p => p.trim() !== "")
        .map(p => p.charAt(0).toUpperCase() + p.slice(1))
        .join(" ");
}

// -------------------------------------------------------------
// 1) HELPERS DE DATAS
// -------------------------------------------------------------
function parseDataPt(str) {
    if (!str) return null;

    // yyyy-mm-dd (input type="date")
    if (str.includes("-")) {
        const [a, m, d] = str.split("-").map(Number);
        return new Date(a, m - 1, d);
    }

    // dd/mm/yyyy
    if (str.includes("/")) {
        const [d, m, a] = str.split("/").map(Number);
        return new Date(a, m - 1, d);
    }

    // Caso venha algo inesperado
    return null;
}

function dataPtParaIso(str) {
    if (!str) return "";
    const [d, m, a] = str.split("/");
    return `${a}-${m}-${d}`;
}

function normalizarDataParaPt(str) {
    if (!str) return "";
    const partes = str.split("-");
    if (partes.length !== 3) return str;
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

function diasEntre(hoje, data) {
    const h = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
    const d = new Date(data.getFullYear(), data.getMonth(), data.getDate());
    return (d - h) / (1000 * 60 * 60 * 24);
}

function calcularNoites(checkin, checkout) {
    const ini = parseDataPt(checkin);
    const fim = parseDataPt(checkout);
    if (!ini || !fim) return 0;

    ini.setHours(0, 0, 0, 0);
    fim.setHours(0, 0, 0, 0);

    const diff = fim - ini;
    return diff > 0 ? diff / (1000 * 60 * 60 * 24) : 0;
}

function datasSobrepoem(checkin1, checkout1, checkin2, checkout2) {
    const c1 = parseDataPt(checkin1);
    const o1 = parseDataPt(checkout1);
    const c2 = parseDataPt(checkin2);
    const o2 = parseDataPt(checkout2);

    // Sobrepõem se uma começa antes da outra terminar
    return c1 < o2 && c2 < o1;
}
    // Arredonda para casas decimais
function formatarEuro(valor) {
    return Number(valor).toFixed(2);
}

const DATA_CORTE_COMISSAO_EXTRA = "2025-01-01";

function podeAlterarComissaoExtra(reserva) {
    if (!reserva.checkin) return false;
    return new Date(reserva.checkin) >= new Date(DATA_CORTE_COMISSAO_EXTRA);
}

function calcularComissaoExtra(totalBruto, percentagemDecimal) {
    if (!totalBruto || !percentagemDecimal || percentagemDecimal <= 0) return 0;
    return Number((totalBruto * percentagemDecimal).toFixed(2));
}
function validarDatasCheckinCheckout(checkin, checkout) {
    // checkin e checkout no formato "dd/mm/aaaa"
    const [d1, m1, a1] = checkin.split("/");
    const [d2, m2, a2] = checkout.split("/");

    const dataCheckin = new Date(`${a1}-${m1}-${d1}`);
    const dataCheckout = new Date(`${a2}-${m2}-${d2}`);

    // checkout tem de ser estritamente maior que checkin
    return dataCheckout > dataCheckin;
}



// -------------------------------------------------------------
// FUNÇÃO ÚNICA E CORRETA PARA LIMPEZA
// Aceita "yyyy-mm-dd" (inputs) e "dd/mm/yyyy" (Firestore/Excel)
// Regra: meses 6,7,8,9 → 40€ | resto → 35€
// -------------------------------------------------------------
function calcularLimpeza(dataStr) {
    const data = parseDataPt(dataStr);
    if (!data) return 35;

    const mes = data.getMonth() + 1; // 1–12
    return [6, 7, 8, 9].includes(mes) ? 40 : 35;
}

// -------------------------------------------------------------
// ORDENAR POR COLUNA (tipo Excel) — COM SETAS NO TEXTO
// -------------------------------------------------------------
let ordemAtual = {}; // guarda asc/desc por coluna

// Guardar o texto original de cada th
const thsComColuna = document.querySelectorAll("#theadReservas th[data-col]");
thsComColuna.forEach(th => {
    th.dataset.labelOriginal = th.textContent.trim();
});

document.querySelector("#theadReservas").addEventListener("click", (e) => {
    const th = e.target.closest("th");

    // Ignorar colunas sem data-col
    if (!th || !th.dataset.col) return;

    const coluna = th.dataset.col;

    // Alternar ordem
    ordemAtual[coluna] = ordemAtual[coluna] === "asc" ? "desc" : "asc";

    // Limpar texto de todos os th
    thsComColuna.forEach(el => {
        el.textContent = el.dataset.labelOriginal;
    });

    // Adicionar seta ao th clicado
    const seta = ordemAtual[coluna] === "asc" ? " ▲" : " ▼";
    th.textContent = th.dataset.labelOriginal + seta;

    // Ordenar e redesenhar
    ordenarPorColuna(coluna, ordemAtual[coluna]);
});

function ordenarPorColuna(coluna, ordem) {

    // Se houver filtros aplicados, ordenamos o subset filtrado
    let lista = reservasFiltradas.length > 0 
        ? reservasFiltradas 
        : reservas;

    lista = [...lista]; // criar cópia para não mexer no original

    lista.sort((a, b) => {
        let v1 = a[coluna];
        let v2 = b[coluna];

        if (coluna === "precoNoite") {
            v1 = a.precoNoite !== undefined ? Number(a.precoNoite) : 0;
            v2 = b.precoNoite !== undefined ? Number(b.precoNoite) : 0;
        }

        if (coluna === "apartamentos") {
            v1 = (a.apartamentos || []).join(", ");
            v2 = (b.apartamentos || []).join(", ");
        }

        if (coluna === "checkin" || coluna === "checkout") {
            v1 = parseDataPt(v1);
            v2 = parseDataPt(v2);
        }

        if (!isNaN(v1) && !isNaN(v2)) {
            v1 = Number(v1);
            v2 = Number(v2);
        }

        if (v1 < v2) return ordem === "asc" ? -1 : 1;
        if (v1 > v2) return ordem === "asc" ? 1 : -1;
        return 0;
    });

    // Atualiza o subset filtrado ou o array completo
    if (reservasFiltradas.length > 0) {
        reservasFiltradas = lista;
        desenharTabela(reservasFiltradas);
    } else {
        reservas = lista;
        desenharTabela(reservas);
    }
}

// -------------------------------------------------------------
// 2) VERIFICAR CONFLITO (BACK‑TO‑BACK PERMITIDO)
// -------------------------------------------------------------
function temConflitoNoApartamento(reservaNova, apartamento, reservasExistentes) {
    const iniNova = parseDataPt(reservaNova.checkin);
    const fimNova = parseDataPt(reservaNova.checkout);

    for (const r of reservasExistentes) {
        if (!Array.isArray(r.apartamentos)) continue;
        if (!r.apartamentos.includes(apartamento)) continue;

        const iniExist = parseDataPt(r.checkin);
        const fimExist = parseDataPt(r.checkout);

        const backToBack1 = fimExist.getTime() === iniNova.getTime();
        const backToBack2 = fimNova.getTime() === iniExist.getTime();

        const sobrepoe = iniNova < fimExist && fimNova > iniExist;

        if (sobrepoe && !backToBack1 && !backToBack2) {
            return true;
        }
    }

    return false;
}

// -------------------------------------------------------------
// 3) ALOCADOR INTELIGENTE
// -------------------------------------------------------------
function alocarApartamentosInteligente(quartos, checkin, checkout, reservasExistentes) {
    const resultado = [];
    const reservaNova = { checkin, checkout };

    if (!quartos || quartos < 1) quartos = 1;
    if (quartos > APARTAMENTOS_FIXOS.length) quartos = APARTAMENTOS_FIXOS.length;

    const dataCheckin = parseDataPt(checkin);

    // PRIORIDADE 1 — BACK‑TO‑BACK
    const candidatosBackToBack = [];

    APARTAMENTOS_FIXOS.forEach(ap => {
        const existeCheckoutMesmoDia = reservasExistentes.some(r => {
            if (!Array.isArray(r.apartamentos)) return false;
            if (!r.apartamentos.includes(ap)) return false;
            const fim = parseDataPt(r.checkout);
            return fim.getTime() === dataCheckin.getTime();
        });

        if (existeCheckoutMesmoDia) {
            if (!temConflitoNoApartamento(reservaNova, ap, reservasExistentes)) {
                candidatosBackToBack.push(ap);
            }
        }
    });

    for (const ap of candidatosBackToBack) {
        if (resultado.length >= quartos) break;
        resultado.push(ap);
    }

    // PRIORIDADE 2 — APARTAMENTOS LIVRES
    for (const ap of APARTAMENTOS_FIXOS) {
        if (resultado.length >= quartos) break;
        if (resultado.includes(ap)) continue;

        const conflito = temConflitoNoApartamento(reservaNova, ap, reservasExistentes);
        if (!conflito) resultado.push(ap);
    }

    return resultado;
}

// -------------------------------------------------------------
// 4) CARREGAR RESERVAS DO FIRESTORE
// -------------------------------------------------------------
async function carregarReservas() {
    const snap = await db.collection("reservas").orderBy("checkin").get();

    reservas = [];
    snap.forEach(doc => reservas.push({ id: doc.id, ...doc.data() }));

    // garantir que todas as reservas têm bookingId
    reservas.forEach(r => {
        if (!r.bookingId) r.bookingId = "";
    });

    desenharTabela(reservas);
    aplicarFiltrosAvancados();

}

// -------------------------------------------------------------
// FUNÇÕES AUXILIARES PARA MOSTRAR ADULTOS / CRIANÇAS / IDADES
// -------------------------------------------------------------
function parseIdades(str) {
    // Nada → devolve vazio
    if (!str) return [];

    // Array → converte para números
    if (Array.isArray(str)) {
        return str
            .map(v => Number(v))
            .filter(v => !isNaN(v));
    }

    // Número → devolve como array
    if (typeof str === "number") {
        return [str];
    }

    // Objeto → tenta extrair valores
    if (typeof str === "object") {
        return Object.values(str)
            .map(v => Number(v))
            .filter(v => !isNaN(v));
    }

    // Qualquer coisa que não seja string → vazio
    if (typeof str !== "string") return [];

    // String → dividir por vírgulas
    return str
        .split(",")
        .map(s => Number(s.trim()))
        .filter(n => !isNaN(n));
}


function textoPessoas(r) {
    const adultos = r.adultos || 0;
    const criancas = r.criancas || 0;
    const idades = parseIdades(r.idadesCriancas);

    let txt = `👤 ${adultos}`;

    if (criancas > 0) {
        txt += `   👶 ${criancas}`;
        if (idades.length > 0) {
            txt += ` (${idades.join(", ")})`;
        }
    }

    return txt;
}

function tooltipPessoas(r) {
    const adultos = r.adultos || 0;
    const criancas = r.criancas || 0;
    const idades = parseIdades(r.idadesCriancas);
    const berco = r.berco ? "Sim" : "Não";
    const total = r.hospedes || (adultos + criancas);

    return `
${adultos} adulto(s)
${criancas} criança(s)
Idades: ${idades.length ? idades.join(", ") : "—"}
Berço: ${berco}
Total hóspedes: ${total}
`.trim();
}


// -------------------------------------------------------------
// 5) DESENHAR TABELA
// -------------------------------------------------------------
function desenharTabela(lista = reservas) {
    const tbody = document.querySelector("#tabelaReservas tbody");
    tbody.innerHTML = "";

    lista.forEach(r => {
        const tr = document.createElement("tr");

        // Número de quartos da reserva (apenas para mostrar na tabela)
        const quartos = r.quartos || 1;

        // Texto dos apartamentos
        const apartamentosTexto = (r.apartamentos || []).join(", ");

        // Número real de apartamentos
const numAps = Array.isArray(r.apartamentos) ? r.apartamentos.length : 1;

// Valor/noite por apartamento
const precoNoiteCorrigido = (Number(r.totalBruto) / numAps) / Number(r.noites);

// Limpeza total (por apartamento)
const limpezaCorrigida = Number(r.limpeza) * numAps;


        // 🔥 COR DA LINHA CONSOANTE O PAGAMENTO
        if (r.statusPagamento === "total") {
        tr.classList.add("pago-total");
        } else if (r.statusPagamento === "parcial") {
        tr.classList.add("pago-parcial");
    }


        tr.innerHTML = `
            <td><input type="checkbox" class="selectReserva" data-id="${r.id}"></td>
            <td><span class="origem-badge origem-${(r.origem || "").toLowerCase()}">${r.origem || ""}</span></td>
            <td>${r.bookingId || ""}</td>
            <td>${gerarIconePais(r.paisCliente)} ${r.cliente || ""}</td>
            <td>${quartos}</td>
            <td>${apartamentosTexto || (r.status === "sem_alocacao" ? "Sem alocacao" : "")}</td>

            
            <td class="pessoas" data-tooltip="${tooltipPessoas(r)}">
                ${textoPessoas(r)}
            </td>

            <td>${r.checkin || ""}</td>
            <td>${r.checkout || ""}</td>
            <td>${r.noites !== undefined ? Math.round(r.noites) : ""}</td>
            <td>${r.totalBruto !== undefined ? Number(r.totalBruto).toFixed(2) : ""}</td>
            <td>${r.comissao !== undefined ? Number(r.comissao).toFixed(2) : ""}</td>
            <td>${precoNoiteCorrigido.toFixed(2)}</td>
            <td>${r.berco ? "Sim" : "Não"}</td>
            <td>${limpezaCorrigida.toFixed(2)}</td>

           <td>
            <button class="btnDetalhe" onclick="detalheReserva('${r.id}')">🔍</button>
            <button class="btnEditar" onclick="editarReserva('${r.id}')">✏️</button>
            <button class="btnApagar" onclick="apagarReserva('${r.id}')">🗑️</button>
           </td>

        `;

        tbody.appendChild(tr);
    });
}

console.log("PARTE 1 carregada.");

// -------------------------------------------------------------
// FUNÇÃO: APAGAR RESERVA
// -------------------------------------------------------------
function apagarReserva(id) {
    if (!confirm("Tem a certeza que deseja apagar esta reserva?")) return;

    db.collection("reservas").doc(id).delete()
        .then(() => {
            alert("Reserva apagada com sucesso!");
            carregarReservas();
        })
        .catch(err => console.error("Erro ao apagar:", err));
}

// -------------------------------------------------------------
// ABRIR DETALHE DA RESERVA (MODAL DETALHES)
// -------------------------------------------------------------
function detalheReserva(id) {
    console.log("Abrir detalhe da reserva:", id);

    const reserva = reservas.find(r => r.id === id);
    if (!reserva) {
        alert("Reserva não encontrada.");
        return;
    }

    mostrarModalDetalhes(reserva);
}

// -------------------------------------------------------------
// MODAL DETALHES (COMISSÃO EXTRA, NOTA INTERNA, ETC.)
// -------------------------------------------------------------
function mostrarModalDetalhes(reserva) {

    // ===============================
    // 1. LER VALORES DO FIRESTORE
    // ===============================
    const comissaoBase = reserva.comissao || 0;
    const comissaoExtra = reserva.comissaoExtra || 0;
    const comissaoTotal = reserva.comissaoTotal || (comissaoBase + comissaoExtra);
    const totalLiquidoFinal = reserva.totalLiquidoFinal || (reserva.totalBruto - comissaoTotal);

    let percentagemExtraDecimal = reserva.percentagemComissaoExtra ?? null;

    if (percentagemExtraDecimal === null && comissaoExtra > 0 && reserva.totalBruto > 0) {
        percentagemExtraDecimal = comissaoExtra / reserva.totalBruto;
    }

    if (percentagemExtraDecimal === null) {
        percentagemExtraDecimal = 0;
    }

    function parseData(d) {
        const [dia, mes, ano] = d.split("/");
        return new Date(`${ano}-${mes}-${dia}`);
    }

    const dataCorte = new Date("2025-01-01");
    const dataReserva = reserva.checkin ? parseData(reserva.checkin) : null;
    const isAntiga = dataReserva && dataReserva < dataCorte;

    let temComissaoExtra = reserva.temComissaoExtra ?? (comissaoExtra > 0);

    if (isAntiga) {
        temComissaoExtra = false;
        percentagemExtraDecimal = 0;
    }

    // ===============================
    // 2. HTML DO DETALHE
    // ===============================
    const html = `
        <div class="modal-section-title">Origem & Identificação</div>
        <p><strong>Origem:</strong> ${reserva.origem || "-"}</p>
        <p><strong>Canal:</strong> ${reserva.canal || reserva.origem || "-"}</p>
        <p><strong>ID Origem:</strong> ${reserva.bookingId || "-"}</p>
        <p><strong>Estado Reserva:</strong> ${reserva.status || "OK"}</p>

        <div class="modal-section-title">Hóspede</div>
        <p><strong>Nome:</strong> ${reserva.cliente || "-"}</p>
        <p><strong>Hóspedes:</strong> ${reserva.hospedes || "-"}</p>
        <p><strong>Adultos:</strong> ${reserva.adultos || "-"}</p>
        <p><strong>Crianças:</strong> ${reserva.criancas || "-"}</p>
        <p><strong>Idades Crianças:</strong> ${reserva.idadesCriancas || "-"}</p>

        <div class="modal-section-title">Alojamento</div>
        <p><strong>Apartamentos:</strong> ${reserva.apartamentos ? reserva.apartamentos.join(", ") : "-"}</p>
        <p><strong>Quartos:</strong> ${reserva.quartos || "-"}</p>
        <p><strong>Check-in:</strong> ${reserva.checkin || "-"}</p>
        <p><strong>Check-out:</strong> ${reserva.checkout || "-"}</p>
        <p><strong>Noites:</strong> ${reserva.noites || "-"}</p>

        <div class="modal-section-title">Financeiro</div>
        <p><strong>Total Bruto:</strong> €${formatarEuro(reserva.totalBruto)}</p>
        <p><strong>Comissão Base:</strong> €${formatarEuro(comissaoBase)}</p>
        <p><strong>Comissão Extra:</strong> €<span id="valorComissaoExtraTexto">${formatarEuro(comissaoExtra)}</span></p>
        <p><strong>Comissão Total:</strong> €<span id="comissaoTotalTexto">${formatarEuro(comissaoTotal)}</span></p>
        <p><strong>Total Líquido Final:</strong> €<span id="totalLiquidoTexto">${formatarEuro(totalLiquidoFinal)}</span></p>

        <div class="modal-section-title">Comissão Extra</div>
        <p><strong>Aplicar comissão extra:</strong>
            <input type="checkbox" id="chkComissaoExtra" ${temComissaoExtra ? "checked" : ""} disabled>
        </p>

        <p><strong>Percentagem extra (%):</strong>
            <input type="number" id="percentagemExtra" step="0.1" value="${(percentagemExtraDecimal * 100).toFixed(1)}" disabled style="width:80px;">
        </p>

        <div class="modal-section-title">Pagamento</div>
        <p><strong>Status Pagamento:</strong> ${reserva.statusPagamento || "-"}</p>
        <p><strong>Valor Pago:</strong> €${formatarEuro(reserva.valorPago || 0)}</p>

        <div class="modal-section-title">Comentários Importados</div>
        <textarea id="comentariosImportados" rows="3" style="width:100%;" disabled>${reserva.comentarios || ""}</textarea>

        <div class="modal-section-title">Nota Interna</div>
        <textarea id="notaInterna" rows="3" style="width:100%;" disabled>${reserva.notaInterna || ""}</textarea>
    `;

    document.getElementById("conteudoDetalhes").innerHTML = html;

    // ===============================
    // 3. LÓGICA DE EDIÇÃO
    // ===============================
    const chk = document.getElementById("chkComissaoExtra");
    const inpPercentagem = document.getElementById("percentagemExtra");
    const spanValorExtra = document.getElementById("valorComissaoExtraTexto");
    const spanComissaoTotal = document.getElementById("comissaoTotalTexto");
    const spanTotalLiquido = document.getElementById("totalLiquidoTexto");
    const notaInterna = document.getElementById("notaInterna");

    if (isAntiga) {
        chk.checked = false;
        chk.disabled = true;

        inpPercentagem.value = "0.0";
        inpPercentagem.disabled = true;

        spanValorExtra.textContent = formatarEuro(0);
        spanComissaoTotal.textContent = formatarEuro(comissaoBase);
        spanTotalLiquido.textContent = formatarEuro(reserva.totalBruto - comissaoBase);
    }

    function atualizarComissaoExtra() {
        const aplicar = chk.checked;
        const percentagem = Number(inpPercentagem.value.replace(",", ".")) / 100;

        const valorExtra = aplicar ? reserva.totalBruto * percentagem : 0;
        const novaComissaoTotal = comissaoBase + valorExtra;
        const novoTotalLiquido = reserva.totalBruto - novaComissaoTotal;

        spanValorExtra.textContent = formatarEuro(valorExtra);
        spanComissaoTotal.textContent = formatarEuro(novaComissaoTotal);
        spanTotalLiquido.textContent = formatarEuro(novoTotalLiquido);
    }

    document.getElementById("btnEditarDetalhe").onclick = () => {
        chk.disabled = false;
        inpPercentagem.disabled = false;
        notaInterna.disabled = false;

        document.getElementById("btnGuardarDetalhe").style.display = "inline-block";
        document.getElementById("btnEditarDetalhe").style.display = "none";

        chk.addEventListener("change", atualizarComissaoExtra);
        inpPercentagem.addEventListener("input", atualizarComissaoExtra);
    };

    document.getElementById("btnGuardarDetalhe").onclick = async () => {
        const aplicar = chk.checked;
        const percentagem = Number(inpPercentagem.value.replace(",", ".")) / 100;

        const valorExtra = aplicar ? reserva.totalBruto * percentagem : 0;
        const novaComissaoTotal = comissaoBase + valorExtra;
        const novoTotalLiquido = reserva.totalBruto - novaComissaoTotal;

        await db.collection("reservas").doc(reserva.id).update({
            comissaoExtra: valorExtra,
            comissaoTotal: novaComissaoTotal,
            totalLiquidoFinal: novoTotalLiquido,
            percentagemComissaoExtra: percentagem,
            temComissaoExtra: aplicar,
            notaInterna: notaInterna.value,
            editadoEm: new Date().toISOString(),
            editadoPor: firebase.auth().currentUser.email
        });

        fecharModalDetalhes();
    };

    abrirModalDetalhes();
}

// -------------------------------------------------------------
// MODAL EDITAR (NOVA RESERVA)
// -------------------------------------------------------------
function mostrarDetalhesReserva(reserva) {

    reservaAtual = reserva;

    document.getElementById("modalNovaReserva").style.display = "flex";
    document.querySelector("#modalNovaReserva .modal-header h2").textContent = "Editar Reserva";

    document.getElementById("origem").value = reserva.origem || "";
    document.getElementById("bookingId").value = reserva.bookingId || "";
    document.getElementById("reservadoPor").value = reserva.reservadoPor || reserva.cliente || "";

    document.getElementById("cliente").value = reserva.cliente || "";
    document.getElementById("paisCliente").value = reserva.paisCliente || "";
    document.getElementById("morada").value = reserva.morada || "";
    document.getElementById("telefone").value = reserva.telefone || "";
    document.getElementById("email").value = reserva.email || "";

    document.getElementById("adultos").value = reserva.adultos || 0;
    document.getElementById("criancas").value = reserva.criancas || 0;
    document.getElementById("idadesCriancas").value = reserva.idadesCriancas || "";
    document.getElementById("hospedes").value = reserva.hospedes || (reserva.adultos + reserva.criancas);

    document.getElementById("modoViagem").value = reserva.modoViagem || "";

    document.getElementById("quartos").value = reserva.quartos || 1;
    document.getElementById("apartamentos").value = reserva.apartamentos ? reserva.apartamentos.join(", ") : "";

    document.getElementById("checkin").value = reserva.checkin ? reserva.checkin.split("/").reverse().join("-") : "";
    document.getElementById("checkout").value = reserva.checkout ? reserva.checkout.split("/").reverse().join("-") : "";

    document.getElementById("totalBruto").value = reserva.totalBruto || 0;
    document.getElementById("comissao").value = reserva.comissao || 0;
    document.getElementById("limpeza").value = reserva.limpeza || 0;
    document.getElementById("valorPago").value = reserva.valorPago || 0;

    document.getElementById("statusPagamento").value = reserva.statusPagamento || "aguardar";
    document.getElementById("berco").value = reserva.berco ? "true" : "false";

    document.getElementById("status").value = reserva.status || "alocado";
    document.getElementById("estadoPagamentoOrigem").value = reserva.estadoPagamentoOrigem || "";
    document.getElementById("dataCancelamento").value = reserva.dataCancelamento || "";

    document.getElementById("btnGuardar").onclick = guardarReserva;
}


// -------------------------------------------------------------
// FILTRO POR INTERVALO DE MESES/ANOS
// -------------------------------------------------------------
function aplicarFiltroIntervalo() {
    const anoInicio = Number(document.getElementById("filtroAnoInicio").value);
    const mesInicio = Number(document.getElementById("filtroMesInicio").value);
    const anoFim = Number(document.getElementById("filtroAnoFim").value);
    const mesFim = Number(document.getElementById("filtroMesFim").value);

    // Se faltar qualquer campo → mostra tudo
    if (!anoInicio || !mesInicio || !anoFim || !mesFim) {
        desenharTabela(reservas);
        return;
    }

    const dataInicio = new Date(anoInicio, mesInicio - 1, 1);
    const dataFim = new Date(anoFim, mesFim, 0); // último dia do mês fim

    const filtradas = reservas.filter(r => {
        const dt = parseDataPt(r.checkin);
        if (!dt) return false;
        return dt >= dataInicio && dt <= dataFim;
    });

    reservasFiltradas = filtradas;
    desenharTabela(reservasFiltradas);

    }


// -------------------------------------------------------------
// 6) ABRIR / FECHAR MODAIS
// -------------------------------------------------------------

function abrirModalNovaReserva() {
    document.getElementById("modalNovaReserva").style.display = "flex";
}

function fecharModalNovaReserva() {
    document.getElementById("modalNovaReserva").style.display = "none";
    reservaAtual = null;
}

// 🔵 AQUI COLOCAS AS NOVAS FUNÇÕES 🔵

function abrirModalDetalhes() {
    document.getElementById("modalDetalhes").style.display = "flex";
}

function fecharModalDetalhes() {
    document.getElementById("modalDetalhes").style.display = "none";
}


// -------------------------------------------------------------
// 7) NOVA RESERVA
// -------------------------------------------------------------
function novaReserva() {
    reservaAtual = null;
    limparFormularioReserva();
    abrirModalNovaReserva();
}

// -------------------------------------------------------------
// 8) EDITAR RESERVA EXISTENTE
// -------------------------------------------------------------
function editarReserva(id) {
    const r = reservas.find(x => x.id === id);
    if (!r) return;

    reservaAtual = r;
    preencherFormularioReserva(r);
    abrirModalNovaReserva();
}

// -------------------------------------------------------------
// 9) LIMPAR FORMULÁRIO
// -------------------------------------------------------------
function limparFormularioReserva() {
    document.getElementById("origem").value = "Manual";
    document.getElementById("bookingId").value = "";
    document.getElementById("cliente").value = "";
    document.getElementById("quartos").value = "1";
    document.getElementById("apartamentos").value = "";
    document.getElementById("checkin").value = "";
    document.getElementById("checkout").value = "";
    document.getElementById("hospedes").value = "";
    document.getElementById("adultos").value = "";
    document.getElementById("criancas").value = "";
    document.getElementById("idadesCriancas").value = "";
    document.getElementById("totalBruto").value = "";
    document.getElementById("comissao").value = "";
    document.getElementById("berco").value = "false";
    document.getElementById("limpeza").value = "";
}

// -------------------------------------------------------------
// 10) EVENTO PARA ATUALIZAR LIMPEZA AUTOMÁTICA (CHECK-IN)
// -------------------------------------------------------------
document.getElementById("checkin").addEventListener("change", () => {
    const checkin = document.getElementById("checkin").value; // yyyy-mm-dd
    if (checkin) {
        document.getElementById("limpeza").value = calcularLimpeza(checkin);
    }
});

// -------------------------------------------------------------
// 10) PREENCHER FORMULÁRIO
// -------------------------------------------------------------
function preencherFormularioReserva(r) {
    document.getElementById("origem").value = r.origem || "Manual";
    document.getElementById("bookingId").value = r.bookingId || "";
    document.getElementById("cliente").value = r.cliente || "";

    const quartos = r.quartos || (r.apartamentos ? r.apartamentos.length : 1);
    document.getElementById("quartos").value = quartos;

    document.getElementById("apartamentos").value =
        Array.isArray(r.apartamentos)
            ? r.apartamentos.join(", ")
            : (r.apartamentos || "");

    document.getElementById("checkin").value = r.checkin
        ? r.checkin.split("/").reverse().join("-")
        : "";

    document.getElementById("checkout").value = r.checkout
        ? r.checkout.split("/").reverse().join("-")
        : "";

    document.getElementById("hospedes").value = r.hospedes ?? "";
    document.getElementById("adultos").value = r.adultos ?? "";
    document.getElementById("criancas").value = r.criancas ?? "";
    document.getElementById("idadesCriancas").value = r.idadesCriancas ?? "";

    document.getElementById("totalBruto").value = r.totalBruto ?? "";
    document.getElementById("comissao").value = r.comissao ?? "";
    document.getElementById("berco").value = r.berco ? "true" : "false";
    document.getElementById("limpeza").value = r.limpeza ?? "";
        // 🔥 CAMPOS DE PAGAMENTO
    document.getElementById("statusPagamento").value = r.statusPagamento || "aguardar";
    document.getElementById("valorPago").value = r.valorPago ?? 0;

}
// -------------------------------------------------------------
// 11) GUARDAR RESERVA (NOVA OU EDITADA)
// -------------------------------------------------------------
async function guardarReserva() {

    // -----------------------------
    // 1) IDENTIFICAÇÃO
    // -----------------------------
    const origem = document.getElementById("origem").value;
    let bookingId = document.getElementById("bookingId").value.trim();
    const reservadoPor = document.getElementById("reservadoPor").value.trim();

    // Se não for Booking → gerar ID automático
    if (origem !== "Booking") {
        const random9 = Math.floor(100000000 + Math.random() * 900000000);
        bookingId = `P${random9}`;
    }

    // -----------------------------
    // 2) HÓSPEDE
    // -----------------------------
    const cliente = formatarNome(document.getElementById("cliente").value.trim());
    const paisCliente = document.getElementById("paisCliente").value.trim();
    const morada = document.getElementById("morada").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const email = document.getElementById("email").value.trim();

    const adultos = Number(document.getElementById("adultos").value || 0);
    const criancas = Number(document.getElementById("criancas").value || 0);
    const idadesCriancas = document.getElementById("idadesCriancas").value.trim();

    let hospedes = Number(document.getElementById("hospedes").value || 0);
    if (!hospedes) hospedes = adultos + criancas;

    const modoViagem = document.getElementById("modoViagem").value.trim();

    // -----------------------------
    // 3) ALOJAMENTO
    // -----------------------------
    const quartos = Number(document.getElementById("quartos").value || 1);

    const campoApartamentos = document.getElementById("apartamentos").value.trim();
    const modoAutomatico = campoApartamentos.length === 0;

    const apartamentosDigitados = modoAutomatico
        ? []
        : [...new Set(
            campoApartamentos
                .split(",")
                .map(x => x.trim())
                .filter(x => x.length > 0)
        )];

    const checkin = document.getElementById("checkin").value.trim();
    const checkout = document.getElementById("checkout").value.trim();

    if (!checkin || !checkout) {
        alert("Por favor preencha as datas de check-in e check-out.");
        return;
    }

    if (!validarDatasCheckinCheckout(checkin, checkout)) {
        alert("A data de check-out deve ser posterior à data de check-in.");
        return;
    }

    // -----------------------------
    // 4) FINANCEIRO
    // -----------------------------
    const totalBruto = Number(document.getElementById("totalBruto").value || 0);
    const comissao = Number(document.getElementById("comissao").value || 0); // comissão base (editável)
    const limpeza = Number(document.getElementById("limpeza").value || calcularLimpeza(checkin));
    const valorPago = Number(document.getElementById("valorPago").value || 0);
    const statusPagamento = document.getElementById("statusPagamento").value;
    const berco = document.getElementById("berco").value === "true";

    // -----------------------------
    // 5) SISTEMA
    // -----------------------------
    const status = document.getElementById("status").value;
    const estadoPagamentoOrigem = document.getElementById("estadoPagamentoOrigem").value.trim();
    const dataCancelamento = document.getElementById("dataCancelamento").value.trim() || null;

    // -----------------------------
    // 6) CÁLCULOS AUTOMÁTICOS
    // -----------------------------
    const noites = calcularNoites(checkin, checkout);
    const precoNoite = noites > 0 ? totalBruto / noites : 0;

    const comissaoExtra = 0; // só editável no modal detalhe
    const comissaoTotal = comissao + comissaoExtra;

    const liquido = totalBruto - comissaoTotal;
    const liquidoReal = liquido - limpeza;
    const totalLiquidoFinal = liquidoReal;

    const dataReserva = new Date().toLocaleDateString("pt-PT");
    const tipoUnidade = apartamentosDigitados.length > 0 ? `Apartamento ${apartamentosDigitados[0]}` : "";
    const dispositivo = "Web";

    // -----------------------------
    // 7) ALOCAÇÃO INTELIGENTE
    // -----------------------------
    const reservasSemAtual = reservas.filter(r => !reservaAtual || r.id !== reservaAtual.id);
    let apartamentos = [];

    // Modo manual
    if (!modoAutomatico) {
        apartamentos = apartamentosDigitados;

        if (apartamentos.length < quartos) {
            alert(`Foram indicados ${apartamentos.length} apartamento(s), mas a reserva exige ${quartos}.`);
            return;
        }

        for (const ap of apartamentos) {
            const conflito = temConflitoNoApartamento({ checkin, checkout }, ap, reservasSemAtual);
            if (conflito) {
                const reservaQueOcupa = reservasSemAtual.find(r =>
                    r.apartamentos?.includes(ap) &&
                    datasSobrepoem(r.checkin, r.checkout, checkin, checkout)
                );

                if (!confirm(`O apartamento ${ap} está ocupado pela reserva de ${reservaQueOcupa.cliente}.\n\nDeseja avançar?`)) {
                    return;
                }
            }
        }
    }

    // Modo automático
    if (modoAutomatico) {
        apartamentos = alocarApartamentosInteligente(quartos, checkin, checkout, reservasSemAtual);

        if (apartamentos.length < quartos) {
            alert(`Não existe disponibilidade para ${quartos} apartamento(s) nestas datas.`);
            return;
        }
    }

    // -----------------------------
    // 8) OBJETO FINAL PARA FIRESTORE
    // -----------------------------
    const dados = {
        origem,
        bookingId,
        reservadoPor,

        cliente,
        paisCliente,
        morada,
        telefone,
        email,
        adultos,
        criancas,
        idadesCriancas,
        hospedes,
        modoViagem,

        quartos,
        apartamentos,
        checkin: normalizarDataParaPt(checkin),
        checkout: normalizarDataParaPt(checkout),

        totalBruto,
        comissao,
        comissaoExtra,
        comissaoTotal,
        precoNoite,
        noites,
        liquido,
        liquidoReal,
        totalLiquidoFinal,
        limpeza,
        valorPago,
        statusPagamento,
        berco,

        status,
        estadoPagamentoOrigem,
        dataCancelamento,

        dataReserva,
        tipoUnidade,
        dispositivo
    };

    // -----------------------------
    // 9) GRAVAR NO FIRESTORE
    // -----------------------------
    if (!reservaAtual) {
        await db.collection("reservas").add(dados);
    } else {
        await db.collection("reservas").doc(reservaAtual.id).update(dados);
    }

    fecharModalNovaReserva();
    carregarReservas();
}


// -------------------------------------------------------------
// 12) APAGAR RESERVA (E APAGAR DO CALENDÁRIO TAMBÉM)
// -------------------------------------------------------------
async function apagarReservaConfirmar() {
    if (!reservaAtual) return;

    const confirmar = confirm("Tens a certeza que queres apagar esta reserva?");
    if (!confirmar) return;

    const id = reservaAtual.id;

    // 1) Apagar da coleção reservas
    await db.collection("reservas").doc(id).delete();

    // 2) Apagar entradas no calendário com o mesmo id
    const snap = await db.collection("calendario")
        .where("id", "==", id)
        .get();

    snap.forEach(doc => doc.ref.delete());

    fecharModal();
    carregarReservas();
}

console.log("PARTE 2 carregada.");

// -------------------------------------------------------------
// MAPA DE BANDEIRAS POR PAÍS (Booking → código ISO)
// -------------------------------------------------------------
const BANDEIRAS_POR_PAIS = {
    "Portugal": "pt",
    "Spain": "es",
    "France": "fr",
    "Germany": "de",
    "Belgium": "be",
    "Netherlands": "nl",
    "Switzerland": "ch",
    "Austria": "at",
    "Italy": "it",
    "United Kingdom": "gb",
    "Ireland": "ie",
    "Denmark": "dk",
    "Sweden": "se",
    "Norway": "no",
    "Finland": "fi",
    "Poland": "pl",
    "Czech Republic": "cz",
    "Hungary": "hu",
    "Greece": "gr",

    "United States": "us",
    "Canada": "ca",
    "Brazil": "br",
    "Argentina": "ar",
    "Mexico": "mx",
    "Chile": "cl",
    "Colombia": "co",
    "Peru": "pe",

    "Australia": "au",
    "New Zealand": "nz",

    "China": "cn",
    "Japan": "jp",
    "South Korea": "kr",
    "India": "in",
    "United Arab Emirates": "ae",
    "Saudi Arabia": "sa",
    "Israel": "il",
};

// URL base das bandeiras locais
const URL_BANDEIRA_BASE = "flags/";







// -------------------------------------------------------------
// FALLBACK PARA PAÍS DESCONHECIDO
// -------------------------------------------------------------

// Ícone do planeta (universal)
const ICON_PLANETA = "https://cdn-icons-png.flaticon.com/512/44/44948.png";

// Bandeira da cidade de Lagos (personalizada)
const ICON_LAGOS = "https://upload.wikimedia.org/wikipedia/commons/6/6a/LGS.png";

// Escolha do fallback (por agora usamos o planeta)
const ICON_FALLBACK = ICON_PLANETA;




// Se não houver país ou não estiver no mapa → usamos um ícone genérico
// (por agora vamos só deixar isto preparado; o HTML vem no passo seguinte)

function gerarIconePais(paisCliente) {
    console.log("PAÍS RECEBIDO:", JSON.stringify(paisCliente));

    if (!paisCliente) {
        return `<img src="${ICON_FALLBACK}" class="flag" title="País desconhecido">`;
    }

    let pais = paisCliente.trim();

// Se vier "pt", "PT", "Pt", etc.
if (pais.length === 2) {
    pais = pais.toLowerCase();
    return `<img src="${URL_BANDEIRA_BASE}${pais}.svg" class="flag" title="${paisCliente}">`;
}

// Caso contrário, usa o mapa normal
const codigo = BANDEIRAS_POR_PAIS[pais] || null;


    if (!codigo) {
        return `<img src="${ICON_FALLBACK}" class="flag" title="${paisCliente}">`;
    }

    const url = `${URL_BANDEIRA_BASE}${codigo}.svg`;
    return `<img src="${url}" class="flag" title="${paisCliente}">`;
}

// -------------------------------------------------------------
// FUNÇÕES DE NORMALIZAÇÃO (DATAS, VALORES, COMISSÕES)
// ------------------------------------------------------
function normalizarDataBooking(valor) {
    if (!valor) return "";

    if (typeof valor === "number") {
        const dt = XLSX.SSF.parse_date_code(valor);
        return `${String(dt.d).padStart(2, "0")}/${String(dt.m).padStart(2, "0")}/${dt.y}`;
    }

    valor = String(valor).trim();

    if (/^\d{4}-\d{2}-\d{2}$/.test(valor)) {
        const [y, m, d] = valor.split("-");
        return `${d}/${m}/${y}`;
    }

    if (/^\d{2}\/\d{2}\/\d{4}$/.test(valor)) return valor;

    if (/^\d{2}\.\d{2}\.\d{4}$/.test(valor)) {
        const [d, m, y] = valor.split(".");
        return `${d}/${m}/${y}`;
    }

    return "";
}

function normalizarValorBooking(valor) {
    if (!valor) return 0;

    valor = String(valor)
        .replace("EUR", "")
        .replace("€", "")
        .replace(/\s+/g, "")
        .replace(/\./g, "")
        .replace(",", ".");

    return Number(valor) || 0;
}

function calcularComissoesBooking(totalBruto, comissaoOriginal) {
    const comissaoExtra = totalBruto * 0.014;
    const comissaoTotal = comissaoOriginal + comissaoExtra;
    const liquidoReal = totalBruto - comissaoTotal;

    return { comissaoExtra, comissaoTotal, liquidoReal };
}


// -------------------------------------------------------------
// 13) IMPORTAÇÃO EXCEL BOOKING (COM ALOCAÇÃO INTELIGENTE + CAMPOS EXTRA)
// -------------------------------------------------------------
async function importarExcelBooking(event) {
    console.log("IMPORTAR EXCEL BOOKING — INÍCIO");

    const file = event.target.files[0];
    if (!file) return;

    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    // ⭐ VERSÃO SEGURA — evita erro "reading 's'"
    const linhas = XLSX.utils.sheet_to_json(sheet, {
        defval: "",
        raw: false,
        blankrows: false
    });

    const bookingIdsImportados = new Set();
    let reservasSimulacao = [...reservas];
    const hoje = new Date();


    for (const linha of linhas) {
        const bookingId = String(linha["Número da reserva"] || "").trim();
        if (!bookingId) continue;

        bookingIdsImportados.add(bookingId);

        // 🔹 Datas principais
        const checkin = normalizarDataBooking(linha["Check-in"]);
        const checkout = normalizarDataBooking(linha["Check-out"]);

        // 🔹 Data em que a reserva foi feita (para estatísticas por mês/ano de reserva)
        const dataReserva = normalizarDataBooking(linha["Reservado em"]);

        // 🔹 Data de cancelamento (se existir)
        const dataCancelamento = normalizarDataBooking(linha["Data de cancelamento"]);

        // 🔹 Valores (tratados, mesmo que venham com EUR, vírgulas, etc.)
        const totalBruto = normalizarValorBooking(linha["Preço"]);
        const comissaoOriginal = normalizarValorBooking(linha["Comissão"] || linha["Valor da comissão"]);

        // 🔹 Cálculo de comissões (inclui 1,4% extra)
        const { comissaoExtra, comissaoTotal, liquidoReal } =
            calcularComissoesBooking(totalBruto, comissaoOriginal);

        const noites = calcularNoites(checkin, checkout);
        const precoNoite = noites > 0 ? totalBruto / noites : 0;

        // 🔹 Liquido antigo (mantido por compatibilidade)
        const liquido = totalBruto - comissaoOriginal;

        // Limpeza calculada pelo CHECK-IN (regra correta)
        const limpeza = calcularLimpeza(checkin);
        const totalLiquidoFinal = liquido - limpeza;

        const quartos = Number(linha["Quartos"] || 1);

        const dtCheckin = parseDataPt(checkin);
        const reservaJaComecou = dtCheckin && dtCheckin <= hoje;
        const diasParaCheckin = dtCheckin ? diasEntre(new Date(), dtCheckin) : null;

        const existente = reservasSimulacao.find(r => r.bookingId === bookingId);

        let apartamentos = [];
        let status = "alocado";

        if (existente && existente.apartamentos?.length > 0) {
            if (reservaJaComecou || (diasParaCheckin !== null && diasParaCheckin <= DIAS_SEGURANCA_REALOCA)) {
                apartamentos = existente.apartamentos;
            } else {
                const reservasBase = reservasSimulacao.filter(r => r.id !== existente.id);
                apartamentos = alocarApartamentosInteligente(quartos, checkin, checkout, reservasBase);
                if (apartamentos.length === 0) status = "sem_alocacao";
            }
        } else {
            const reservasBase = existente
                ? reservasSimulacao.filter(r => r.id !== existente.id)
                : reservasSimulacao;

            apartamentos = alocarApartamentosInteligente(quartos, checkin, checkout, reservasBase);
            if (apartamentos.length === 0) status = "sem_alocacao";
        }

        // 🔹 Campos extra da Booking para estatísticas
        const paisCliente = String(linha["Booker country"] || "").trim();
        const modoViagem = String(linha["Modo de viagem"] || "").trim(); // Lazer / Negócios
        const metodoPagamento = String(linha["Método de pagamento (provedor de pagamento)"] || "").trim();
        const estadoPagamentoOrigem = String(linha["Estado do pagamento"] || "").trim();
        const comentarios = String(linha["Comentários"] || "").trim();

        // Se tiveres uma coluna que indica PC / Telemóvel, mapeia aqui:
        const dispositivo = String(linha["Dispositivo"] || linha["Canal"] || "").trim();

        const dados = {
    origem: "Booking",
    bookingId,

    // 🔹 Identificação do cliente
    cliente: formatarNome(linha["Nome do hóspede"] || "Hóspede"),
    reservadoPor: linha["Reservado por"] || "",
    estadoReservaOrigem: linha["Estado"] || "",
    tipoUnidade: linha["Tipo de unidade"] || "",
    morada: linha["Morada"] || "",
    telefone: linha["Telefone"] || "",

    // 🔹 Alojamento
    quartos,
    apartamentos,
    checkin,
    checkout,
    hospedes: Number(linha["Pessoas"] || 0),
    adultos: Number(linha["Adultos"] || 0),
    criancas: Number(linha["Crianças"] || 0),
    idadesCriancas: linha["Idade da(s) criança(s)"] || "",

    // 🔹 Valores originais
    totalBruto,
    comissao: comissaoOriginal,
    precoNoite,
    noites,
    liquido,
    limpeza,
    totalLiquidoFinal,

    // 🔹 Financeiro (com a tua comissão extra automática de 1,4%)
    comissaoExtra,
    comissaoTotal,
    liquidoReal,

    // 🔹 Datas e contexto
    dataReserva,
    dataCancelamento: dataCancelamento || null,
    paisCliente,
    modoViagem,
    metodoPagamento,
    estadoPagamentoOrigem,
    comentarios,
    dispositivo,

    // 🔹 Outros
    berco: false,
    status
};

        if (existente) {
            await db.collection("reservas").doc(existente.id).update(dados);
            const idx = reservasSimulacao.findIndex(r => r.id === existente.id);
            reservasSimulacao[idx] = { ...reservasSimulacao[idx], ...dados };
        } else {
            const docRef = await db.collection("reservas").add(dados);
            reservasSimulacao.push({ id: docRef.id, ...dados });
        }
    }

    // Apagar reservas Booking que desapareceram
    await verificarReservasBookingDesaparecidas(bookingIdsImportados);

    carregarReservas();
}

// -------------------------------------------------------------
// 14) APAGAR RESERVAS BOOKING QUE DESAPARECERAM DO EXCEL
// -------------------------------------------------------------
async function verificarReservasBookingDesaparecidas(bookingIdsImportados) {
    const snap = await db.collection("reservas").get();
    const atuais = [];
    snap.forEach(doc => atuais.push({ id: doc.id, ...doc.data() }));

    const desaparecidas = atuais.filter(r =>
        r.origem === "Booking" &&
        r.bookingId &&
        !bookingIdsImportados.has(r.bookingId)
    );

    if (desaparecidas.length === 0) return;

    // 👉 Agora usamos o modal personalizado
    abrirModalDesaparecidas(desaparecidas);
}


// -------------------------------------------------------------
// 15) FORMATAR DATA DO EXCEL
// -------------------------------------------------------------
function formatarDataExcel(valor) {
    if (!valor) return "";
    const dt = XLSX.SSF.parse_date_code(valor);
    return `${String(dt.d).padStart(2, "0")}/${String(dt.m).padStart(2, "0")}/${dt.y}`;
}
// -------------------------------------------------------------
// HELPER: Normalizar valor vindo do Excel Booking ("225,57 EUR", "225.57", etc.)
// -------------------------------------------------------------
function normalizarValorBooking(raw) {
    if (raw === undefined || raw === null) return 0;

    let txt = String(raw).trim();

    // Remove "EUR", "€" e espaços
    txt = txt.replace(/EUR/gi, "")
             .replace(/€/g, "")
             .replace(/\s+/g, "");

    // Troca vírgula por ponto
    txt = txt.replace(",", ".");

    const num = parseFloat(txt);
    return isNaN(num) ? 0 : num;
}

// -------------------------------------------------------------
// HELPER: Normalizar data Booking (aceita número Excel ou string)
// devolve sempre dd/mm/yyyy (compatível com o resto do sistema)
// -------------------------------------------------------------
function normalizarDataBooking(valor) {
    if (!valor) return "";

    // Se vier como número (serial Excel)
    if (typeof valor === "number") {
        const dt = XLSX.SSF.parse_date_code(valor);
        if (!dt) return "";
        const dia = String(dt.d).padStart(2, "0");
        const mes = String(dt.m).padStart(2, "0");
        const ano = dt.y;
        return `${dia}/${mes}/${ano}`;
    }

    // Se vier como string
    const txt = String(valor).trim();

    // Tentar formatos comuns
    // 2023-08-01
    if (/^\d{4}-\d{2}-\d{2}$/.test(txt)) {
        const [ano, mes, dia] = txt.split("-");
        return `${dia}/${mes}/${ano}`;
    }

    // 01/08/2023 ou 1/8/23
    if (/^\d{1,2}\/\d{1,2}\/\d{2,4}$/.test(txt)) {
        const [d, m, a] = txt.split("/");
        const dia = String(d).padStart(2, "0");
        const mes = String(m).padStart(2, "0");
        const ano = a.length === 2 ? `20${a}` : a;
        return `${dia}/${mes}/${ano}`;
    }

    // Se nada bater certo, devolve vazio para não estragar
    return "";
}

// -------------------------------------------------------------
// HELPER: Calcular comissões Booking (base + 1,4% extra)
// -------------------------------------------------------------
function calcularComissoesBooking(totalBruto, comissaoOriginal) {
    const comissaoExtra = totalBruto * 0.014; // 1,4%
    const comissaoTotal = comissaoOriginal + comissaoExtra;
    const liquidoReal = totalBruto - comissaoTotal;

    return { comissaoExtra, comissaoTotal, liquidoReal };
}

// -------------------------------------------------------------
// 16) SELECIONAR / APAGAR SELECIONADAS
// -------------------------------------------------------------
const selectAllCheckbox = document.getElementById("selectAll");

if (selectAllCheckbox) {
    selectAllCheckbox.addEventListener("change", function () {
        const checkboxes = document.querySelectorAll(".selectReserva");
        checkboxes.forEach(cb => cb.checked = this.checked);
    });
}

const btnApagarSelecionadas = document.getElementById("btnApagarSelecionadas");

if (btnApagarSelecionadas) {
    btnApagarSelecionadas.addEventListener("click", async () => {
        const selecionadas = [...document.querySelectorAll(".selectReserva:checked")];

        if (selecionadas.length === 0) {
            alert("Nenhuma reserva selecionada.");
            return;
        }

        if (!confirm(`Apagar ${selecionadas.length} reservas?`)) return;

        for (const cb of selecionadas) {
            const id = cb.dataset.id;

            await db.collection("reservas").doc(id).delete();

            const snapCal = await db.collection("calendario")
                .where("id", "==", id)
                .get();

            snapCal.forEach(doc => doc.ref.delete());
        }

        alert("Reservas apagadas.");
        carregarReservas();
    });
}

// -------------------------------------------------------------
// 17) ENVIAR PARA O CALENDÁRIO (MANUAL)
// -------------------------------------------------------------
const btnEnviarCalendarioEl = document.getElementById("btnEnviarCalendario");

if (btnEnviarCalendarioEl) {
    btnEnviarCalendarioEl.addEventListener("click", async () => {

        console.log("BOTÃO CLICADO");

        const selecionadas = [...document.querySelectorAll(".selectReserva:checked")];
        console.log("Selecionadas:", selecionadas.length);
        console.log("IDs selecionados:", selecionadas.map(x => x.dataset.id));

        if (selecionadas.length === 0) {
            alert("Nenhuma reserva selecionada.");
            return;
        }

        for (const cb of selecionadas) {
            const id = cb.dataset.id;
            console.log("A processar ID:", id);

            const doc = await db.collection("reservas").doc(id).get();
            if (!doc.exists) {
                console.log("Documento não existe:", id);
                continue;
            }

            const dados = doc.data();
            console.log("Dados da reserva:", dados);

            // Verificar se já existe no calendário
            const existenteCal = await db.collection("calendario")
                .where("id", "==", id)
                .get();

            if (!existenteCal.empty) {
                // Atualizar o documento existente
                const docRef = existenteCal.docs[0].ref;

                await docRef.update({
                    ...dados,
                    origem: dados.origem?.toLowerCase() || "",
                    checkin: dataPtParaIso(dados.checkin),
                    checkout: dataPtParaIso(dados.checkout),
                    enviadoParaCalendario: true,
                    atualizadoEm: new Date()
                });

                console.log("Reserva atualizada no calendário:", id);
                continue;
            }

            // Se não existir → adicionar
            await db.collection("calendario").add({
                ...dados,
                origem: dados.origem?.toLowerCase() || "",
                checkin: dataPtParaIso(dados.checkin),
                checkout: dataPtParaIso(dados.checkout),
                id: id,
                enviadoParaCalendario: true,
                criadoEm: new Date()
            });

            console.log("Reserva enviada para calendário:", id);
        }

        alert("Reservas enviadas para o calendário.");
    });
}

console.log("JS DA LISTAGEM — FICHEIRO COMPLETO");

// -------------------------------------------------------------
// 20) APAGAR RESERVAS FANTASMA DO CALENDÁRIO
// -------------------------------------------------------------

async function apagarReservasFantasmaDoCalendario() {
    const snapCal = await db.collection("calendario").get();
    const todasCalendario = [];
    snapCal.forEach(doc => todasCalendario.push({ idDoc: doc.id, ...doc.data() }));

    const snapRes = await db.collection("reservas").get();
    const todasReservas = [];
    snapRes.forEach(doc => todasReservas.push({ id: doc.id, ...doc.data() }));

    const idsReservas = new Set(todasReservas.map(r => r.id));
    const bookingIdsReservas = new Set(todasReservas.map(r => r.bookingId).filter(x => x));

    const fantasmas = todasCalendario.filter(c =>
        !idsReservas.has(c.id) &&
        (!c.bookingId || !bookingIdsReservas.has(c.bookingId))
    );

    if (fantasmas.length === 0) {
        alert("Não há reservas fantasma no calendário.");
        return;
    }

    let msg = "As seguintes reservas estão no calendário mas não existem na listagem:\n\n";
    fantasmas.forEach(f => {
        msg += `• ${f.bookingId || "(sem bookingId)"} — ${f.cliente || "?"} (${f.checkin} → ${f.checkout})\n`;
    });
    msg += "\nQueres apagá-las do calendário?";

    if (!confirm(msg)) return;

    for (const f of fantasmas) {
        if (!f.idDoc) {
            console.warn("Reserva fantasma sem idDoc:", f);
            continue;
        }

        try {
            await db.collection("calendario").doc(f.idDoc).delete();
            console.log("Apagado do calendário:", f.idDoc, f.cliente, f.bookingId);
        } catch (erro) {
            console.error("Erro ao apagar:", f.idDoc, erro);
        }
    }

    alert("Reservas fantasma apagadas do calendário.");
}

// -------------------------------------------------------------
// 18) LIGAR EVENTOS DA PÁGINA
// -------------------------------------------------------------
function ligarEventos() {

        // --- LIGAR FILTROS ---
 [
    "filtroTexto", "filtroOrigem", "filtroApartamento", "filtroEstado",
    "filtroPagamento", "filtroPais", "filtroNoitesMin", "filtroNoitesMax",
    "filtroValorMin", "filtroValorMax", "filtroHospedesMin", "filtroHospedesMax",
    "filtroDataInicio", "filtroDataFim"
].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("input", aplicarFiltrosAvancados);
});



    // Botão Nova Reserva
    const btnNova = document.getElementById("btnNovaReserva");
    if (btnNova) btnNova.addEventListener("click", novaReserva);

    // Botão Importar Excel
    const btnImportar = document.getElementById("btnImportarExcel");
    const inputExcel = document.getElementById("inputExcel");

    if (btnImportar && inputExcel) {
        btnImportar.addEventListener("click", () => inputExcel.click());
        inputExcel.addEventListener("change", importarExcelBooking);
    }

    // Botão Guardar
    const btnGuardar = document.getElementById("btnGuardar");
    if (btnGuardar) btnGuardar.addEventListener("click", guardarReserva);

    // Botão Apagar
    const btnApagar = document.getElementById("btnApagar");
    if (btnApagar) btnApagar.addEventListener("click", apagarReservaConfirmar);

    // Fechar modal
    const fechar = document.getElementById("fecharModal");
    if (fechar) fechar.addEventListener("click", fecharModal);


    // Ir para calendário
    const btnIrCalendario = document.getElementById("btnIrCalendario");
    if (btnIrCalendario) {
        btnIrCalendario.addEventListener("click", () => {
            window.location.href = "calendario.html";
        });
    }

    // Limpar fantasmas
    const btnLimparFantasmas = document.getElementById("btnLimparFantasmas");
    if (btnLimparFantasmas) {
    btnLimparFantasmas.addEventListener("click", apagarReservasFantasmaDoCalendario);
    }

    }   // <-- FECHA A FUNÇÃO ligarEventos() AQUI MESMO

function calcularTotaisReservas(lista) {
    let totalReservas = lista.length;
    let totalNoites = 0;
    let totalValor = 0;      
    let totalComissao = 0;   // agora vem do Firebase (comissaoTotal)
    let totalLimpeza = 0;

    let porOrigem = {};

    lista.forEach(r => {
        const bruto = Number(r.totalBruto || 0);
        const comissaoTotal = Number(r.comissaoTotal || 0); // 🔥 usar o valor do Firebase
        const limpeza = Number(r.limpeza || 0);

        totalNoites += Number(r.noites || 0);
        totalValor += bruto;
        totalComissao += comissaoTotal;
        totalLimpeza += limpeza;

        const origem = r.origem || "Desconhecido";

        if (!porOrigem[origem]) {
            porOrigem[origem] = { reservas: 0, valor: 0 };
        }

        porOrigem[origem].reservas++;
        porOrigem[origem].valor += bruto;
    });

    const totalLiquido = totalValor - totalComissao - totalLimpeza;

    return {
        totalReservas,
        totalNoites,
        totalValor,
        totalComissao,
        totalLimpeza,
        totalLiquido,
        porOrigem
    };
}



function renderizarTotaisReservas() {
    const el = document.getElementById("totais-reservas");
    if (!el) return;

    const t = calcularTotaisReservas(reservasFiltradas);

    const fmt = v => v.toFixed(2).replace(".", ",");

    let html = `
        <div class="total-card">
            Reservas
            <strong>${t.totalReservas}</strong>
        </div>

        <div class="total-card">
            Noites
            <strong>${fmt(t.totalNoites)}</strong>
        </div>

        <div class="total-card">
            Valor Bruto
            <strong>${fmt(t.totalValor)} €</strong>
        </div>

        <div class="total-card">
            Comissão
            <strong>${fmt(t.totalComissao)} €</strong>
        </div>

        <div class="total-card">
            Limpeza
            <strong>${fmt(t.totalLimpeza)} €</strong>
        </div>

        <div class="total-card">
            Total Líquido
            <strong>${fmt(t.totalLiquido)} €</strong>
        </div>
    `;

    // Totais por origem
    for (const origem in t.porOrigem) {
        const o = t.porOrigem[origem];
        html += `
            <div class="total-card">
                ${origem}
                <strong>${fmt(o.valor)} €</strong>
                <small>${o.reservas} reservas</small>
            </div>
        `;
    }

    el.innerHTML = html;
}


    // -------------------------------------------------------------
    //   Filtros
    // -------------------------------------------------------------
    function aplicarFiltrosAvancados() {

    let lista = [...reservas];

    const txt = document.getElementById("filtroTexto").value.toLowerCase();
    const origem = document.getElementById("filtroOrigem").value;
    const ap = document.getElementById("filtroApartamento").value;
    const estado = document.getElementById("filtroEstado").value;
    const pagamento = document.getElementById("filtroPagamento").value;
    const pais = document.getElementById("filtroPais").value.toLowerCase();

    const noitesMin = Number(document.getElementById("filtroNoitesMin").value || 0);
    const noitesMax = Number(document.getElementById("filtroNoitesMax").value || 9999);

    const valorMin = Number(document.getElementById("filtroValorMin").value || 0);
    const valorMax = Number(document.getElementById("filtroValorMax").value || 999999);

    const hospMin = Number(document.getElementById("filtroHospedesMin").value || 0);
    const hospMax = Number(document.getElementById("filtroHospedesMax").value || 999);

    const dtInicio = document.getElementById("filtroDataInicio").value;
    const dtFim = document.getElementById("filtroDataFim").value;

    lista = lista.filter(r => {

        if (txt && !(
            r.cliente.toLowerCase().includes(txt) ||
            r.bookingId?.toLowerCase().includes(txt) ||
            r.apartamentos?.join(", ").includes(txt) ||
            (r.paisCliente || "").toLowerCase().includes(txt) ||
            (r.comentarios || "").toLowerCase().includes(txt)
        )) return false;

        if (origem && r.origem !== origem) return false;

        if (ap && !r.apartamentos?.includes(ap)) return false;

        if (estado && r.status !== estado) return false;

        if (pagamento && r.statusPagamento !== pagamento) return false;

        if (pais && !(r.paisCliente || "").toLowerCase().includes(pais)) return false;

        if (r.noites < noitesMin || r.noites > noitesMax) return false;

        if (r.totalBruto < valorMin || r.totalBruto > valorMax) return false;

        if (r.hospedes < hospMin || r.hospedes > hospMax) return false;

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

    // 🔥 ESTA LINHA É O QUE FALTAVA
    reservasFiltradas = lista;

    desenharTabela(reservasFiltradas);

// 🔥 ADICIONAR ESTA LINHA 
    renderizarTotaisReservas();
}

// -------------------------------------------------------------
// 19) INICIAR SISTEMA (GARANTE QUE FIREBASE ESTÁ PRONTO)
// -------------------------------------------------------------
function iniciarSistema() {
    ligarEventos();
    carregarReservas();
}

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        if (typeof db !== "undefined") {
            iniciarSistema();
        } else {
            console.error("Firebase não inicializou a tempo. Tentando novamente...");
            setTimeout(iniciarSistema, 300);
        }
    }, 200);
});

// -------------------------------------------------------------
// MARCAR VÁRIAS RESERVAS COMO PAGAS TOTALMENTE
// -------------------------------------------------------------
document.getElementById("btnMarcarPagas").addEventListener("click", async () => {
    const selecionadas = [...document.querySelectorAll(".selectReserva:checked")];

    if (selecionadas.length === 0) {
        alert("Nenhuma reserva selecionada.");
        return;
    }

    if (!confirm(`Marcar ${selecionadas.length} reserva(s) como pagas totalmente?`)) {
        return;
    }

    for (const checkbox of selecionadas) {
        const id = checkbox.dataset.id;
        const r = reservas.find(x => x.id === id);
        if (!r) continue;

        const totalBruto = Number(r.totalBruto || 0);
        const comissao = Number(r.comissao || 0);
        const valorPago = totalBruto - comissao;

        await db.collection("reservas").doc(id).update({
            statusPagamento: "total",
            valorPago: valorPago
        });
    }

    alert("Reservas atualizadas com sucesso.");
    carregarReservas();
});

let reservasDesaparecidasTemp = [];

function abrirModalDesaparecidas(lista) {
    reservasDesaparecidasTemp = lista;

    const div = document.getElementById("listaDesaparecidas");
    div.innerHTML = "";

    lista.forEach(r => {
        const p = document.createElement("p");
        p.textContent = `${r.bookingId} — ${r.cliente} (${r.checkin} → ${r.checkout})`;
        div.appendChild(p);
    });

    document.getElementById("modalDesaparecidas").style.display = "flex";
}

function fecharModalDesaparecidas() {
    document.getElementById("modalDesaparecidas").style.display = "none";
    reservasDesaparecidasTemp = [];
}

async function confirmarApagarDesaparecidas() {
    for (const r of reservasDesaparecidasTemp) {
        await db.collection("reservas").doc(r.id).delete();

        const snapCal = await db.collection("calendario")
            .where("id", "==", r.id)
            .get();

        snapCal.forEach(doc => doc.ref.delete());
    }

    fecharModalDesaparecidas();
    carregarReservas();
    alert("Reservas apagadas.");
}

// -------------------------------------------------------------
// FUNÇÃO UNIVERSAL: DEVOLVE TODAS AS RESERVAS NORMALIZADAS
// -------------------------------------------------------------
async function carregarReservasNormalizadas() {
    const snap = await db.collection("reservas").orderBy("checkin").get();

    const lista = [];
    snap.forEach(doc => lista.push({ id: doc.id, ...doc.data() }));

    lista.forEach(r => {

        // Nome do cliente
        r.cliente = r.cliente || r.reservadoPor || "";

        // Pessoas
        r.adultos = Number(r.adultos || 0);
        r.criancas = Number(r.criancas || 0);
        r.hospedes = Number(r.hospedes || (r.adultos + r.criancas));

        // Idades
        r.idadesCriancas = r.idadesCriancas || "";

        // Berço
        r.berco = !!r.berco;

        // Comentários
        r.comentarios = r.comentarios || r.observacoes || "";

        // Apartamentos sempre array de strings
        if (!Array.isArray(r.apartamentos)) {
            if (r.apartamentos) {
                r.apartamentos = [String(r.apartamentos)];
            } else {
                r.apartamentos = [];
            }
        } else {
            r.apartamentos = r.apartamentos.map(a => String(a));
        }

        // Datas já vêm em dd/mm/yyyy → OK
    });

    return lista;
}

document.getElementById("btnExportExcel").addEventListener("click", function () {

    const tabelaOriginal = document.getElementById("tabelaReservas");

    // Criar cópia invisível da tabela
    const tabelaClone = tabelaOriginal.cloneNode(true);
    tabelaClone.style.display = "none";
    document.body.appendChild(tabelaClone);

    // 1) Remover ícones (mas NÃO remover células)
    tabelaClone.querySelectorAll("i, svg, button").forEach(el => el.remove());

    // 2) Limpar coluna Pessoas (remover emojis)
    tabelaClone.querySelectorAll("td:nth-child(7)").forEach(td => {
        td.textContent = td.textContent
            .replace(/👤/g, "")
            .replace(/👶/g, "")
            .trim();
    });

    // 3) Converter valores numéricos com ponto → vírgula
    tabelaClone.querySelectorAll("td").forEach(td => {
        const txt = td.textContent.trim();
        if (/^\d+\.\d+$/.test(txt)) {
            td.textContent = txt.replace(".", ",");
        }
    });

    // Criar sheet a partir da tabela limpa
    const ws = XLSX.utils.table_to_sheet(tabelaClone, { raw: true });

    // 4) Remover coluna Ações **no Excel**, não no DOM
    const range = XLSX.utils.decode_range(ws['!ref']);
    const lastCol = range.e.c;

    for (let R = range.s.r; R <= range.e.r; R++) {
        const cellRef = XLSX.utils.encode_cell({ r: R, c: lastCol });
        delete ws[cellRef];
    }

    range.e.c--;
    ws['!ref'] = XLSX.utils.encode_range(range);

    // Filtros automáticos
    ws['!autofilter'] = { ref: XLSX.utils.encode_range(ws['!ref']) };

    // Ajustar colunas
    ws['!cols'] = Array(range.e.c + 1).fill({ wch: 20 });

    // Criar workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Reservas");

    tabelaClone.remove();

    XLSX.writeFile(wb, "reservas.xlsx");
});

// -------------------------------------------------------------
// EXPORTAR PARA PDF
// -------------------------------------------------------------
document.getElementById("btnExportPDF").addEventListener("click", function () {
    window.print();
});

