/******************************************************
 * 0) ESTADO GLOBAL E CONFIGURAÇÃO INICIAL
 ******************************************************/

// Array principal onde todas as reservas serão armazenadas
let reservas = [];

// Guarda reservas filtradas (para renderização)
let reservasFiltradas = [];

// Guarda reservas desaparecidas após importação Excel
let reservasDesaparecidas = [];

// Referências globais a elementos do DOM
let listaReservasEl = null;
let selectAllEl = null;

// Flags de controlo
let listenerAtivo = false;   // evita múltiplos listeners Firestore
let modoEdicao = false;      // controla se modal está a editar ou criar
let reservaAtual = null;     // reserva selecionada no modal

// Datas úteis
const hoje = new Date();
const anoAtual = hoje.getFullYear();
const mesAtual = hoje.getMonth() + 1;


/******************************************************
 * 1) INICIALIZAÇÃO DA PÁGINA
 ******************************************************/
window.addEventListener("load", () => {

    // Capturar elementos essenciais
    listaReservasEl = document.getElementById("listaReservas");
    selectAllEl = document.getElementById("selectAll");

    // Preencher selects de ano/mês dos filtros
    preencherFiltrosAnoMes();

    // Ligar eventos dos filtros
    ligarEventosFiltros();

    // Ligar eventos dos botões principais
    ligarEventosPrincipais();

    // Carregar reservas do Firestore
    carregarReservas();

    console.log("✔ Sistema de reservas inicializado");
});


/******************************************************
 * 2) HELPERS BASE (FUNÇÕES UTILITÁRIAS)
 ******************************************************/

// Normaliza strings para comparação (remove acentos, espaços, lowercase)
function normalizar(str) {
    if (!str) return "";
    return str
        .toString()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim()
        .toLowerCase();
}

// Converte "dd/mm/yyyy" ou "yyyy-mm-dd" para Date
function parseData(str) {
    if (!str) return null;

    if (str.includes("-")) {
        const [a, m, d] = str.split("-").map(Number);
        return new Date(a, m - 1, d);
    }

    if (str.includes("/")) {
        const [d, m, a] = str.split("/").map(Number);
        return new Date(a, m - 1, d);
    }

    return null;
}

// Formata Date → "dd/mm/yyyy"
function formatarData(date) {
    if (!(date instanceof Date)) return "";
    return date.toLocaleDateString("pt-PT");
}

// Calcula número de noites entre check-in e check-out
function calcularNoites(checkin, checkout) {
    const d1 = parseData(checkin);
    const d2 = parseData(checkout);
    if (!d1 || !d2) return 0;

    const diff = d2 - d1;
    return Math.max(1, Math.round(diff / (1000 * 60 * 60 * 24)));
}

// Soma valores numéricos com segurança
function toNumber(v) {
    if (!v) return 0;
    return Number(v.toString().replace(",", ".").replace("€", "").trim()) || 0;
}

// Gera ID único local (usado antes de enviar ao Firestore)
function gerarIdLocal() {
    return "local_" + Math.random().toString(36).substring(2, 10);
}
/******************************************************
 * 3) HELPERS DE DATAS, VALORES E COMISSÕES
 ******************************************************/

/* ----------------------------------------------------
   Normaliza origem (Booking, Airbnb, etc.)
---------------------------------------------------- */
function normalizarOrigem(origem) {
    if (!origem) return "manual";
    return origem.toString().trim();
}

/* ----------------------------------------------------
   Converte string para número seguro
---------------------------------------------------- */
function numeroSeguro(v) {
    if (!v) return 0;
    return Number(v.toString().replace(",", ".").replace("€", "").trim()) || 0;
}

/* ----------------------------------------------------
   Calcula total pago (somatório de pagamentos parciais)
---------------------------------------------------- */
function calcularTotalPago(r) {
    if (!r.pagamentos || !Array.isArray(r.pagamentos)) return 0;
    return r.pagamentos.reduce((acc, p) => acc + numeroSeguro(p.valor), 0);
}

/* ----------------------------------------------------
   Determina estado de pagamento
   - total
   - parcial
   - pendente
---------------------------------------------------- */
function estadoPagamento(r) {
    const total = numeroSeguro(r.totalBruto);
    const pago = calcularTotalPago(r);

    if (pago >= total) return "total";
    if (pago > 0) return "parcial";
    return "pendente";
}

/* ----------------------------------------------------
   Calcula comissão da origem (se existir)
---------------------------------------------------- */
function calcularComissao(r) {
    const origem = normalizarOrigem(r.origem).toLowerCase();
    const total = numeroSeguro(r.totalBruto);

    const taxas = {
        booking: 0.15,
        airbnb: 0.14,
        vrbo: 0.10,
        expedia: 0.15,
        agoda: 0.15,
        hotels: 0.15,
        trip: 0.12
    };

    if (!taxas[origem]) return 0;

    return total * taxas[origem];
}

/* ----------------------------------------------------
   Calcula total líquido (total - comissão)
---------------------------------------------------- */
function calcularLiquido(r) {
    const total = numeroSeguro(r.totalBruto);
    const comissao = calcularComissao(r);
    return total - comissao;
}

/* ----------------------------------------------------
   Calcula número de noites
---------------------------------------------------- */
function calcularNoitesReserva(r) {
    return calcularNoites(r.checkin, r.checkout);
}

/* ----------------------------------------------------
   Verifica se reserva está dentro de um intervalo
---------------------------------------------------- */
function reservaDentroIntervalo(r, anoInicio, mesInicio, anoFim, mesFim) {
    const d1 = parseData(r.checkin);
    const d2 = parseData(r.checkout);
    if (!d1 || !d2) return false;

    const inicio = new Date(anoInicio, mesInicio - 1, 1);
    const fim = new Date(anoFim, mesFim, 0);

    return d1 <= fim && d2 >= inicio;
}

/* ----------------------------------------------------
   Formata país com bandeira
---------------------------------------------------- */
function formatarPais(pais) {
    if (!pais) return "";
    return `<img src="flags/${pais.toLowerCase()}.svg" class="flag"> ${pais}`;
}
/******************************************************
 * 4) CARREGAR RESERVAS DO FIRESTORE (TEMPO REAL)
 ******************************************************/
function carregarReservas() {
    if (listenerAtivo) return; // evita múltiplos listeners
    listenerAtivo = true;

    db.collection("reservas")
        .orderBy("checkin")
        .onSnapshot(snapshot => {
            reservas = [];
            snapshot.forEach(doc => reservas.push({ id: doc.id, ...doc.data() }));

            aplicarFiltros();
        });
}


/******************************************************
 * 5) FILTROS AVANÇADOS
 ******************************************************/

// Preenche selects de ano/mês dos filtros
function preencherFiltrosAnoMes() {
    const anos = document.querySelectorAll("#filtroAnoInicio, #filtroAnoFim");
    const meses = document.querySelectorAll("#filtroMesInicio, #filtroMesFim");

    const anoAtual = new Date().getFullYear();

    anos.forEach(sel => {
        sel.innerHTML = `<option value="">Ano</option>`;
        for (let a = anoAtual - 3; a <= anoAtual + 3; a++) {
            sel.innerHTML += `<option value="${a}">${a}</option>`;
        }
    });

    meses.forEach(sel => {
        sel.innerHTML = `<option value="">Mês</option>`;
        for (let m = 1; m <= 12; m++) {
            sel.innerHTML += `<option value="${m}">${m}</option>`;
        }
    });
}

// Liga eventos dos filtros
function ligarEventosFiltros() {
    const filtros = document.querySelectorAll(
        "#filtroOrigem, #filtroEstado, #filtroPagamento, #filtroApartamento, #filtroHospede, #filtroAnoInicio, #filtroMesInicio, #filtroAnoFim, #filtroMesFim"
    );

    filtros.forEach(f => f.addEventListener("change", aplicarFiltros));
    document.getElementById("filtroHospede").addEventListener("input", aplicarFiltros);

    document.getElementById("btnLimparFiltros").onclick = limparFiltros;
}

// Limpa todos os filtros
function limparFiltros() {
    document.querySelectorAll("#filtrosWrapper select, #filtrosWrapper input")
        .forEach(el => el.value = "");

    aplicarFiltros();
}

// Aplica filtros à lista de reservas
function aplicarFiltros() {
    const origem = document.getElementById("filtroOrigem").value;
    const estado = document.getElementById("filtroEstado").value;
    const pagamento = document.getElementById("filtroPagamento").value;
    const apartamento = document.getElementById("filtroApartamento").value;
    const hospede = normalizar(document.getElementById("filtroHospede").value);

    const anoInicio = Number(document.getElementById("filtroAnoInicio").value);
    const mesInicio = Number(document.getElementById("filtroMesInicio").value);
    const anoFim = Number(document.getElementById("filtroAnoFim").value);
    const mesFim = Number(document.getElementById("filtroMesFim").value);

    reservasFiltradas = reservas.filter(r => {

        // Origem
        if (origem && r.origem !== origem) return false;

        // Estado (alocado / sem alocação)
        if (estado === "alocado" && (!r.apartamentos || r.apartamentos.length === 0)) return false;
        if (estado === "sem_alocacao" && r.apartamentos && r.apartamentos.length > 0) return false;

        // Pagamento
        if (pagamento && estadoPagamento(r) !== pagamento) return false;

        // Apartamento
        if (apartamento && (!r.apartamentos || !r.apartamentos.includes(apartamento))) return false;

        // Hóspede
        if (hospede && !normalizar(r.cliente).includes(hospede)) return false;

        // Intervalo de datas
        if (anoInicio && mesInicio && anoFim && mesFim) {
            if (!reservaDentroIntervalo(r, anoInicio, mesInicio, anoFim, mesFim)) return false;
        }

        return true;
    });

    ordenarReservas();
    renderizarTabela();
}


/******************************************************
 * 6) ORDENAÇÃO DAS RESERVAS
 ******************************************************/
function ordenarReservas() {
    reservasFiltradas.sort((a, b) => {
        const d1 = parseData(a.checkin);
        const d2 = parseData(b.checkin);
        return d1 - d2;
    });
}
/******************************************************
 * 7) RENDERIZAÇÃO DA TABELA DE RESERVAS
 ******************************************************/
function renderizarTabela() {
    if (!listaReservasEl) return;

    listaReservasEl.innerHTML = "";

    reservasFiltradas.forEach(r => {
        const tr = document.createElement("tr");

        // Estado de pagamento → cor da linha
        const estado = estadoPagamento(r);
        if (estado === "total") tr.classList.add("pago-total");
        if (estado === "parcial") tr.classList.add("pago-parcial");
        if (estado === "pendente") tr.classList.add("pago-a-vencer");

        tr.innerHTML = `
            <td><input type="checkbox" class="selectReserva" data-id="${r.id}"></td>

            <td>
                <span class="origem-badge origem-${normalizarOrigem(r.origem).toLowerCase()}">
                    ${r.origem || "Manual"}
                </span>
            </td>

            <td>${r.id}</td>

            <td>${r.cliente}</td>

            <td>${formatarPais(r.pais || "")}</td>

            <td>${(r.apartamentos || []).join(", ")}</td>

            <td>${calcularNoitesReserva(r)}</td>

            <td>${r.checkin}</td>
            <td>${r.checkout}</td>

            <td>${r.totalBruto || 0}€</td>

            <td>${calcularTotalPago(r)}€</td>

            <td>${estado.toUpperCase()}</td>

            <td>
                <button class="btnDetalhe" data-id="${r.id}">Detalhe</button>
                <button class="btnEditar" data-id="${r.id}">Editar</button>
                <button class="btnApagar" data-id="${r.id}">Apagar</button>
            </td>
        `;

        listaReservasEl.appendChild(tr);
    });

    ligarEventosTabela();
}


/******************************************************
 * 8) EVENTOS DA TABELA (DETALHE, EDITAR, APAGAR)
 ******************************************************/
function ligarEventosTabela() {

    // Botão Detalhe
    document.querySelectorAll(".btnDetalhe").forEach(btn => {
        btn.onclick = () => abrirModalDetalhe(btn.dataset.id);
    });

    // Botão Editar
    document.querySelectorAll(".btnEditar").forEach(btn => {
        btn.onclick = () => abrirModalEditar(btn.dataset.id);
    });

    // Botão Apagar
    document.querySelectorAll(".btnApagar").forEach(btn => {
        btn.onclick = () => apagarReserva(btn.dataset.id);
    });

    // Selecionar todas
    if (selectAllEl) {
        selectAllEl.onclick = () => {
            const marcado = selectAllEl.checked;
            document.querySelectorAll(".selectReserva").forEach(chk => chk.checked = marcado);
        };
    }
}


/******************************************************
 * 9) ABRIR MODAL — DETALHE
 ******************************************************/
function abrirModalDetalhe(id) {
    const r = reservas.find(x => x.id === id);
    if (!r) return;

    modoEdicao = false;
    reservaAtual = r;

    preencherModal(r);
    abrirModal();
}


/******************************************************
 * 10) ABRIR MODAL — EDITAR
 ******************************************************/
function abrirModalEditar(id) {
    const r = reservas.find(x => x.id === id);
    if (!r) return;

    modoEdicao = true;
    reservaAtual = r;

    preencherModal(r);
    abrirModal();
}


/******************************************************
 * 11) APAGAR RESERVA (INDIVIDUAL)
 ******************************************************/
function apagarReserva(id) {
    if (!confirm("Tem a certeza que deseja apagar esta reserva?")) return;

    db.collection("reservas").doc(id).delete()
        .then(() => console.log("✔ Reserva apagada:", id))
        .catch(err => console.error("Erro ao apagar:", err));
}
/******************************************************
 * 12) MODAL — ABRIR E FECHAR
 ******************************************************/
function abrirModal() {
    document.getElementById("modalReserva").style.display = "flex";
}

function fecharModal() {
    document.getElementById("modalReserva").style.display = "none";
    reservaAtual = null;
    modoEdicao = false;
}

document.getElementById("fecharModal").onclick = fecharModal;


/******************************************************
 * 13) PREENCHER MODAL COM DADOS DA RESERVA
 ******************************************************/
function preencherModal(r) {
    const form = document.getElementById("formReserva");

    form.innerHTML = `
        <label>Cliente</label>
        <input id="modalCliente" value="${r.cliente || ""}">

        <label>País</label>
        <input id="modalPais" value="${r.pais || ""}">

        <label>Origem</label>
        <select id="modalOrigem">
            <option ${r.origem==="Booking"?"selected":""}>Booking</option>
            <option ${r.origem==="Airbnb"?"selected":""}>Airbnb</option>
            <option ${r.origem==="Particular"?"selected":""}>Particular</option>
            <option ${r.origem==="VRBO"?"selected":""}>VRBO</option>
            <option ${r.origem==="Expedia"?"selected":""}>Expedia</option>
            <option ${r.origem==="Agoda"?"selected":""}>Agoda</option>
            <option ${r.origem==="Hotels"?"selected":""}>Hotels</option>
            <option ${r.origem==="Trip"?"selected":""}>Trip</option>
        </select>

        <label>Apartamentos (separar por vírgula)</label>
        <input id="modalAps" value="${(r.apartamentos || []).join(", ")}">

        <label>Check-in</label>
        <input id="modalCheckin" type="date" value="${converterParaISO(r.checkin)}">

        <label>Check-out</label>
        <input id="modalCheckout" type="date" value="${converterParaISO(r.checkout)}">

        <label>Total Bruto (€)</label>
        <input id="modalTotal" value="${r.totalBruto || 0}">

        <label>Pagamentos (valor por linha)</label>
        <textarea id="modalPagamentos">${formatarPagamentosTextarea(r.pagamentos)}</textarea>
    `;
}


/******************************************************
 * 14) CONVERTER DATA PARA ISO (para inputs type="date")
 ******************************************************/
function converterParaISO(str) {
    const d = parseData(str);
    if (!d) return "";
    return d.toISOString().split("T")[0];
}


/******************************************************
 * 15) FORMATAR PAGAMENTOS PARA TEXTAREA
 ******************************************************/
function formatarPagamentosTextarea(lista) {
    if (!lista || !Array.isArray(lista)) return "";
    return lista.map(p => p.valor + "€").join("\n");
}


/******************************************************
 * 16) LER DADOS DO MODAL → OBJETO RESERVA
 ******************************************************/
function lerDadosModal() {
    const cliente = document.getElementById("modalCliente").value.trim();
    const pais = document.getElementById("modalPais").value.trim();
    const origem = document.getElementById("modalOrigem").value.trim();
    const aps = document.getElementById("modalAps").value.split(",").map(a => a.trim()).filter(a => a);
    const checkin = document.getElementById("modalCheckin").value;
    const checkout = document.getElementById("modalCheckout").value;
    const total = numeroSeguro(document.getElementById("modalTotal").value);

    const pagamentosRaw = document.getElementById("modalPagamentos").value.trim().split("\n");
    const pagamentos = pagamentosRaw
        .filter(l => l.trim() !== "")
        .map(l => ({ valor: numeroSeguro(l) }));

    return {
        cliente,
        pais,
        origem,
        apartamentos: aps,
        checkin,
        checkout,
        totalBruto: total,
        pagamentos
    };
}


/******************************************************
 * 17) VALIDAR RESERVA
 ******************************************************/
function validarReserva(r) {
    if (!r.cliente) return "Cliente é obrigatório.";
    if (!r.checkin) return "Check-in é obrigatório.";
    if (!r.checkout) return "Check-out é obrigatório.";

    const d1 = parseData(r.checkin);
    const d2 = parseData(r.checkout);

    if (d2 < d1) return "Check-out não pode ser antes do check-in.";

    return null;
}


/******************************************************
 * 18) GUARDAR RESERVA (CRIAR OU EDITAR)
 ******************************************************/
document.getElementById("btnGuardar").onclick = () => {
    const dados = lerDadosModal();
    const erro = validarReserva(dados);

    if (erro) {
        alert(erro);
        return;
    }

    if (modoEdicao && reservaAtual) {
        atualizarReserva(reservaAtual.id, dados);
    } else {
        criarReserva(dados);
    }
};


/******************************************************
 * 19) CRIAR RESERVA NO FIRESTORE
 ******************************************************/
function criarReserva(r) {
    db.collection("reservas")
        .add(r)
        .then(() => {
            fecharModal();
            console.log("✔ Reserva criada");
        })
        .catch(err => console.error("Erro ao criar:", err));
}


/******************************************************
 * 20) ATUALIZAR RESERVA NO FIRESTORE
 ******************************************************/
function atualizarReserva(id, r) {
    db.collection("reservas").doc(id)
        .update(r)
        .then(() => {
            fecharModal();
            console.log("✔ Reserva atualizada");
        })
        .catch(err => console.error("Erro ao atualizar:", err));
}


/******************************************************
 * 21) APAGAR RESERVA A PARTIR DO MODAL
 ******************************************************/
document.getElementById("btnApagar").onclick = () => {
    if (!reservaAtual) return;

    if (!confirm("Tem a certeza que deseja apagar esta reserva?")) return;

    db.collection("reservas").doc(reservaAtual.id)
        .delete()
        .then(() => {
            fecharModal();
            console.log("✔ Reserva apagada");
        })
        .catch(err => console.error("Erro ao apagar:", err));
};
/******************************************************
 * 22) EVENTOS PRINCIPAIS (IMPORTAR EXCEL, NOVA RESERVA)
 ******************************************************/
function ligarEventosPrincipais() {

    // Botão Nova Reserva
    document.getElementById("btnNovaReserva").onclick = () => {
        modoEdicao = false;
        reservaAtual = null;

        preencherModal({
            cliente: "",
            pais: "",
            origem: "Particular",
            apartamentos: [],
            checkin: "",
            checkout: "",
            totalBruto: 0,
            pagamentos: []
        });

        abrirModal();
    };

    // Botão Importar Excel
    document.getElementById("btnImportarExcel").onclick = () => {
        document.getElementById("inputExcel").click();
    };

    // Input Excel
    document.getElementById("inputExcel").onchange = importarExcel;

    // Ir para calendário
    document.getElementById("btnIrCalendario").onclick = () => {
        window.location.href = "calendario.html";
    };
}


/******************************************************
 * 23) IMPORTAR EXCEL
 ******************************************************/
async function importarExcel(event) {
    const file = event.target.files[0];
    if (!file) return;

    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);

    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const linhas = XLSX.utils.sheet_to_json(sheet);

    processarExcel(linhas);
}


/******************************************************
 * 24) PROCESSAR DADOS DO EXCEL
 ******************************************************/
function processarExcel(linhas) {
    const novas = [];
    const idsExcel = new Set();

    linhas.forEach(l => {
        const id = l["ID"] || gerarIdLocal();
        idsExcel.add(id);

        const reserva = {
            id,
            cliente: l["Cliente"] || "",
            pais: l["País"] || "",
            origem: l["Origem"] || "Particular",
            apartamentos: (l["Apartamento"] || "").toString().split(",").map(a => a.trim()).filter(a => a),
            checkin: l["Check-in"] || "",
            checkout: l["Check-out"] || "",
            totalBruto: numeroSeguro(l["Total"]),
            pagamentos: extrairPagamentosExcel(l)
        };

        novas.push(reserva);
    });

    sincronizarExcelFirestore(novas, idsExcel);
}


/******************************************************
 * 25) EXTRAIR PAGAMENTOS DO EXCEL
 ******************************************************/
function extrairPagamentosExcel(linha) {
    const pagamentos = [];

    Object.keys(linha).forEach(k => {
        if (k.toLowerCase().includes("pagamento")) {
            const valor = numeroSeguro(linha[k]);
            if (valor > 0) pagamentos.push({ valor });
        }
    });

    return pagamentos;
}


/******************************************************
 * 26) SINCRONIZAR EXCEL ↔ FIRESTORE
 ******************************************************/
function sincronizarExcelFirestore(novas, idsExcel) {

    const existentes = [...reservas];
    const desaparecidas = [];

    // Identificar reservas removidas do Excel
    existentes.forEach(r => {
        if (!idsExcel.has(r.id)) {
            desaparecidas.push(r);
        }
    });

    reservasDesaparecidas = desaparecidas;

    if (desaparecidas.length > 0) {
        abrirModalDesaparecidas();
    }

    // Criar ou atualizar reservas
    novas.forEach(r => {
        const existente = existentes.find(x => x.id === r.id);

        if (!existente) {
            // Criar nova
            db.collection("reservas").doc(r.id).set(r);
        } else {
            // Atualizar existente
            db.collection("reservas").doc(r.id).update(r);
        }
    });

    console.log("✔ Sincronização Excel concluída");
}


/******************************************************
 * 27) MODAL DE RESERVAS DESAPARECIDAS
 ******************************************************/
function abrirModalDesaparecidas() {
    const modal = document.getElementById("modalDesaparecidas");
    const lista = document.getElementById("listaDesaparecidas");

    lista.innerHTML = reservasDesaparecidas.map(r => `
        <label>
            <input type="checkbox" class="chkDesaparecida" data-id="${r.id}">
            ${r.cliente} (${r.checkin} → ${r.checkout})
        </label><br>
    `).join("");

    modal.style.display = "flex";
}

function fecharModalDesaparecidas() {
    document.getElementById("modalDesaparecidas").style.display = "none";
}

function confirmarApagarDesaparecidas() {
    const selecionadas = [...document.querySelectorAll(".chkDesaparecida:checked")]
        .map(chk => chk.dataset.id);

    selecionadas.forEach(id => {
        db.collection("reservas").doc(id).delete();
    });

    fecharModalDesaparecidas();
}


/******************************************************
 * 28) ALOCAÇÃO INTELIGENTE DE APARTAMENTOS
 ******************************************************/
function alocarAutomaticamente(r) {
    const aps = ["2301", "2203", "2204"];

    for (const ap of aps) {
        if (!existeConflito(r, ap)) {
            return [ap];
        }
    }

    return []; // sem alocação possível
}

function existeConflito(r, ap) {
    const d1 = parseData(r.checkin);
    const d2 = parseData(r.checkout);

    return reservas.some(x => {
        if (!x.apartamentos || !x.apartamentos.includes(ap)) return false;

        const x1 = parseData(x.checkin);
        const x2 = parseData(x.checkout);

        return d1 <= x2 && d2 >= x1;
    });
}
/******************************************************
 * 29) ENVIAR RESERVAS SELECIONADAS PARA O CALENDÁRIO
 ******************************************************/
document.getElementById("btnEnviarCalendario").onclick = () => {
    const selecionadas = obterSelecionadas();

    if (selecionadas.length === 0) {
        alert("Nenhuma reserva selecionada.");
        return;
    }

    if (!confirm("Enviar reservas selecionadas para o calendário?")) return;

    selecionadas.forEach(id => {
        const r = reservas.find(x => x.id === id);
        if (!r) return;

        const dadosCalendario = {
            cliente: r.cliente,
            origem: r.origem,
            apartamentos: r.apartamentos || [],
            checkin: r.checkin,
            checkout: r.checkout,
            totalBruto: r.totalBruto || 0
        };

        db.collection("calendario").doc(id).set(dadosCalendario)
            .then(() => console.log("✔ Enviado para calendário:", id))
            .catch(err => console.error("Erro ao enviar:", err));
    });

    alert("Reservas enviadas para o calendário.");
};


/******************************************************
 * 30) APAGAR RESERVAS SELECIONADAS
 ******************************************************/
document.getElementById("btnApagarSelecionadas").onclick = () => {
    const selecionadas = obterSelecionadas();

    if (selecionadas.length === 0) {
        alert("Nenhuma reserva selecionada.");
        return;
    }

    if (!confirm("Tem a certeza que deseja apagar as reservas selecionadas?")) return;

    selecionadas.forEach(id => {
        db.collection("reservas").doc(id).delete()
            .then(() => console.log("✔ Reserva apagada:", id))
            .catch(err => console.error("Erro ao apagar:", err));
    });
};


/******************************************************
 * 31) MARCAR RESERVAS SELECIONADAS COMO PAGAS
 ******************************************************/
document.getElementById("btnMarcarPagas").onclick = () => {
    const selecionadas = obterSelecionadas();

    if (selecionadas.length === 0) {
        alert("Nenhuma reserva selecionada.");
        return;
    }

    if (!confirm("Marcar reservas selecionadas como pagas?")) return;

    selecionadas.forEach(id => {
        const r = reservas.find(x => x.id === id);
        if (!r) return;

        const total = numeroSeguro(r.totalBruto);

        db.collection("reservas").doc(id).update({
            pagamentos: [{ valor: total }]
        });
    });

    alert("Reservas marcadas como pagas.");
};


/******************************************************
 * 32) OBTER IDS DAS RESERVAS SELECIONADAS
 ******************************************************/
function obterSelecionadas() {
    return [...document.querySelectorAll(".selectReserva:checked")]
        .map(chk => chk.dataset.id);
}
/******************************************************
 * 33) EVENTOS DO MODAL (FECHAR AO CLICAR FORA)
 ******************************************************/
window.addEventListener("click", e => {
    const modal = document.getElementById("modalReserva");
    if (e.target === modal) fecharModal();

    const modal2 = document.getElementById("modalDesaparecidas");
    if (e.target === modal2) fecharModalDesaparecidas();
});


/******************************************************
 * 34) PREVENIR ERROS DE INPUT (NÚMEROS)
 ******************************************************/
document.addEventListener("input", e => {
    if (e.target.id === "modalTotal") {
        e.target.value = e.target.value.replace(/[^\d.,]/g, "");
    }
});


/******************************************************
 * 35) LOGS DE DIAGNÓSTICO (APENAS PARA DESENVOLVIMENTO)
 ******************************************************/
function debugReserva(r) {
    console.log("------ DEBUG RESERVA ------");
    console.log("Cliente:", r.cliente);
    console.log("Origem:", r.origem);
    console.log("Check-in:", r.checkin);
    console.log("Check-out:", r.checkout);
    console.log("Aps:", r.apartamentos);
    console.log("Total:", r.totalBruto);
    console.log("Pagamentos:", r.pagamentos);
    console.log("---------------------------");
}


/******************************************************
 * 36) FUNÇÃO EXTRA — EXPORTAR RESERVAS (FUTURO)
 * (Mantida para compatibilidade, mas vazia)
 ******************************************************/
function exportarReservas() {
    console.log("Função exportarReservas() reservada para futuro.");
}


/******************************************************
 * 37) INICIALIZAÇÃO FINAL
 ******************************************************/
console.log("✔ reservas-listagem.js carregado com sucesso");

