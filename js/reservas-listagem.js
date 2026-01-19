// ---------------------------------------------------------
// IMPORTS (ES6 Modules)
// ---------------------------------------------------------
import { ReservaModel } from "./models/ReservaModel.js";
import { ReservaUtils } from "./utils/ReservaUtils.js";
import { ReservaFinanceiro } from "./utils/ReservaFinanceiro.js";
import { AlocacaoEngine } from "./utils/AlocacaoEngine.js";
import { BookingImportEngine } from "./importadores/BookingImportEngine.js";
import { ReservaService } from "./services/ReservaService.js";



// ---------------------------------------------------------
// ESTADO GLOBAL
// ---------------------------------------------------------

let reservas = [];          // todas as reservas do Firestore
let reservasFiltradas = []; // reservas após filtros
let reservaAtual = null;    // reserva em edição
let modoEdicao = false;     // false = criar, true = editar

// Lista fixa de apartamentos (podes alterar aqui)
const LISTA_APARTAMENTOS = [
    "2301", "2302", "2303",
    "2201", "2202", "2203", "2204",
    "2101", "2102", "2103"
];


// ---------------------------------------------------------
// INICIALIZAÇÃO DA PÁGINA
// ---------------------------------------------------------

document.addEventListener("DOMContentLoaded", async () => {

    // 1) Carregar reservas do Firestore
    await carregarReservas();

    // 2) Renderizar tabela
    renderTabela();

    // 3) Ligar eventos dos filtros
    ligarEventosFiltros();

    // 4) Ligar eventos do modal
    ligarEventosModal();

    // 5) Ligar eventos da importação Booking
    ligarEventosImportacao();

    // 6) Ligar botão Nova Reserva (se existir)
    const btnNova = document.querySelector("#btnNovaReserva");
    if (btnNova) {
        btnNova.addEventListener("click", abrirModalCriar);
    }

    // 7) Ligar botões de calendário (se existirem)
    const btnSync = document.querySelector("#btnSincronizarCalendario");
    if (btnSync) {
        btnSync.addEventListener("click", sincronizarCalendarioUI);
    }

    const btnFantasmas = document.querySelector("#btnLimparFantasmas");
    if (btnFantasmas) {
        btnFantasmas.addEventListener("click", limparFantasmasUI);
    }

    // 8) Botão alocação automática (se existir)
    const btnAlocar = document.querySelector("#btnAlocarAuto");
    if (btnAlocar) {
        btnAlocar.addEventListener("click", alocarAutomaticamenteModal);
    }

    console.log("Sistema de reservas carregado com sucesso.");
});


// ---------------------------------------------------------
// CARREGAR RESERVAS DO FIRESTORE
// ---------------------------------------------------------

async function carregarReservas() {
    reservas = await ReservaService.getAll();
    reservasFiltradas = [...reservas];
}


// ---------------------------------------------------------
// RENDERIZAR TABELA (VERSÃO PROFISSIONAL)
// ---------------------------------------------------------

function renderTabela() {
    const tbody = document.querySelector("#tabelaReservas tbody");
    if (!tbody) return;

    tbody.innerHTML = "";

    reservasFiltradas.forEach(r => {

        const tr = document.createElement("tr");

        // Highlight se não está alocada
        if (!r.apartamentos || r.apartamentos.length === 0) {
            tr.classList.add("linha-nao-alocada");
        }

        // Highlight pagamento
        if (r.statusPagamento === "aguardar") {
            tr.classList.add("linha-pagamento-pendente");
        }
        if (r.statusPagamento === "parcial") {
            tr.classList.add("linha-pagamento-parcial");
        }

        // Badge de origem
        const origemBadge = `
            <span class="badge origem-${(r.origem || "outro").toLowerCase()}">
                ${r.origem || "Outro"}
            </span>
        `;

        // Bandeira
        const flag = r.paisCliente
            ? `<img src="flags/${r.paisCliente}.svg" class="flag">`
            : "";

        // Apartamentos
        const apt = r.apartamentos?.length
            ? r.apartamentos.join(", ")
            : `<span class="badge badge-nao-alocado">Não alocado</span>`;

        // Pessoas
        const pessoas = `${r.adultos}A + ${r.criancas}C`;

        tr.innerHTML = `
            <td><input type="checkbox" class="selectReserva" data-id="${r.id}"></td>

            <td>${origemBadge}</td>
            <td>${r.bookingId ?? ""}</td>
            <td>${r.cliente ?? ""}</td>

            <td>${r.quartos ?? ""}</td>
            <td>${apt}</td>

            <td>${pessoas}</td>

            <td>${r.checkin}</td>
            <td>${r.checkout}</td>
            <td>${r.noites}</td>

            <td>${r.totalBruto} €</td>
            <td>${r.comissaoServico} €</td>
            <td>${r.comissaoPagamento} €</td>
            <td>${r.comissaoTotal} €</td>
            <td>${r.precoNoite} €</td>
            <td>${r.berco ? "Sim" : "Não"}</td>
            <td>${r.limpeza} €</td>
            <td>${r.liquido} €</td>

            <td>
                <button class="btn-icon btnEditar" data-id="${r.id}">✏️</button>
                <button class="btn-icon btnApagar" data-id="${r.id}">🗑️</button>
            </td>
        `;

        tbody.appendChild(tr);
    });

    ligarEventosTabela();
}


// ---------------------------------------------------------
// EVENTOS DA TABELA
// ---------------------------------------------------------

function ligarEventosTabela() {

    // Botões Editar
    document.querySelectorAll(".btnEditar").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = btn.dataset.id;
            abrirModalEdicao(id);
        });
    });

    // Botões Apagar
    document.querySelectorAll(".btnApagar").forEach(btn => {
        btn.addEventListener("click", () => {
            apagarReserva(btn.dataset.id);
        });
    });
}


// ---------------------------------------------------------
// ABRIR MODAL PARA CRIAR NOVA RESERVA
// ---------------------------------------------------------

function abrirModalCriar() {
    modoEdicao = false;
    reservaAtual = null;

    limparModal();
    const titulo = document.querySelector("#modalReservaTitulo");
    if (titulo) titulo.textContent = "Nova Reserva";

    const modal = document.querySelector("#modalReserva");
    if (modal) modal.style.display = "block";

    const aviso = document.querySelector("#avisoConflitos");
    if (aviso) aviso.style.display = "none";
}


// ---------------------------------------------------------
// ABRIR MODAL PARA EDITAR RESERVA
// ---------------------------------------------------------

async function abrirModalEdicao(id) {
    modoEdicao = true;

    const dados = await ReservaService.getById(id);
    if (!dados) return;

    reservaAtual = new ReservaModel(dados);

    preencherModal(reservaAtual);

    const titulo = document.querySelector("#modalReservaTitulo");
    if (titulo) titulo.textContent = "Editar Reserva";

    const modal = document.querySelector("#modalReserva");
    if (modal) modal.style.display = "block";
}


// ---------------------------------------------------------
// LIMPAR MODAL
// ---------------------------------------------------------

function limparModal() {
    const form = document.querySelector("#formReserva");
    if (form) form.reset();

    const apt = document.querySelector("#apartamentos");
    if (apt) apt.value = "";

    const camposCalc = ["#valorEmFalta", "#statusPagamento", "#precoNoite", "#liquido"];
    camposCalc.forEach(sel => {
        const el = document.querySelector(sel);
        if (el) el.value = "";
    });
}


// ---------------------------------------------------------
// PREENCHER MODAL
// ---------------------------------------------------------

function preencherModal(r) {

    document.querySelector("#cliente").value = r.cliente ?? "";
    document.querySelector("#paisCliente").value = r.paisCliente ?? "";
    document.querySelector("#telefone").value = r.telefone ?? "";
    document.querySelector("#morada").value = r.morada ?? "";

    document.querySelector("#adultos").value = r.adultos ?? 0;
    document.querySelector("#criancas").value = r.criancas ?? 0;
    document.querySelector("#idadesCriancas").value = r.idadesCriancas ?? "";

    document.querySelector("#checkin").value = r.checkin ?? "";
    document.querySelector("#checkout").value = r.checkout ?? "";

    document.querySelector("#totalBruto").value = r.totalBruto ?? 0;
    document.querySelector("#limpeza").value = r.limpeza ?? 0;

    document.querySelector("#valorPagoParcial").value = r.valorPagoParcial ?? 0;
    document.querySelector("#valorPagoFinal").value = r.valorPagoFinal ?? 0;

    document.querySelector("#apartamentos").value = Array.isArray(r.apartamentos)
        ? r.apartamentos.join(", ")
        : "";

    // Atualizar financeiro no modal
    atualizarFinanceiroModal();

    // Verificar conflitos
    verificarConflitosEdicao(r);
}


// ---------------------------------------------------------
// GUARDAR RESERVA (CRIAR OU EDITAR)
// ---------------------------------------------------------

async function guardarReserva() {

    const form = obterDadosFormulario();

    // Criar modelo
    let reserva = new ReservaModel(form);

    // Calcular noites
    reserva.noites = ReservaUtils.calcularNoites(reserva.checkin, reserva.checkout);

    // Calcular financeiro
    const financeiro = ReservaFinanceiro.calcularTudo({
        totalBruto: reserva.totalBruto,
        percentagemServico: 0,        // Booking já traz comissão
        percentagemPagamento: 0.014,  // 1.4%
        limpeza: reserva.limpeza,
        noites: reserva.noites,
        valorPagoParcial: reserva.valorPagoParcial,
        valorPagoFinal: reserva.valorPagoFinal
    });

    Object.assign(reserva, financeiro);

    // Validar datas
    if (!AlocacaoEngine.validarDatas(reserva)) {
        alert("As datas são inválidas.");
        return;
    }

    // Validar apartamentos
    if (!AlocacaoEngine.validarApartamentos(reserva)) {
        alert("Selecione pelo menos um apartamento.");
        return;
    }

    // Verificar conflitos
    const conflitos = AlocacaoEngine.encontrarConflitos(reserva, reservas);
    if (conflitos.length > 0) {
        if (!confirm("Existem conflitos com outras reservas. Deseja continuar?")) {
            return;
        }
    }

    // Criar ou editar
    if (modoEdicao && reservaAtual?.id) {
        await ReservaService.update(reservaAtual.id, reserva);
    } else {
        await ReservaService.add(reserva);
    }

    // Fechar modal
    fecharModal();

    // Atualizar tabela
    await carregarReservas();
    renderTabela();
}


// ---------------------------------------------------------
// OBTER DADOS DO FORMULÁRIO
// ---------------------------------------------------------

function obterDadosFormulario() {

    return {
        cliente: document.querySelector("#cliente").value,
        paisCliente: document.querySelector("#paisCliente").value,
        telefone: document.querySelector("#telefone").value,
        morada: document.querySelector("#morada").value,

        adultos: Number(document.querySelector("#adultos").value || 0),
        criancas: Number(document.querySelector("#criancas").value || 0),
        idadesCriancas: document.querySelector("#idadesCriancas").value,

        checkin: document.querySelector("#checkin").value,
        checkout: document.querySelector("#checkout").value,

        totalBruto: Number(document.querySelector("#totalBruto").value || 0),
        limpeza: Number(document.querySelector("#limpeza").value || 0),

        valorPagoParcial: Number(document.querySelector("#valorPagoParcial").value || 0),
        valorPagoFinal: Number(document.querySelector("#valorPagoFinal").value || 0),

        apartamentos: ReservaUtils.parseApartamentos(
            document.querySelector("#apartamentos").value
        )
    };
}


// ---------------------------------------------------------
// FECHAR MODAL
// ---------------------------------------------------------

function fecharModal() {
    const modal = document.querySelector("#modalReserva");
    if (modal) modal.style.display = "none";
}


// ---------------------------------------------------------
// LIGAR EVENTOS DO MODAL
// ---------------------------------------------------------

function ligarEventosModal() {

    // Recalcular financeiro quando valores mudam
    const camposFinanceiros = [
        "#totalBruto",
        "#limpeza",
        "#valorPagoParcial",
        "#valorPagoFinal",
        "#checkin",
        "#checkout"
    ];

    camposFinanceiros.forEach(sel => {
        const el = document.querySelector(sel);
        if (el) {
            el.addEventListener("input", atualizarFinanceiroModal);
        }
    });

    // Botão guardar
    const btnGuardar = document.querySelector("#btnGuardarReserva");
    if (btnGuardar) {
        btnGuardar.addEventListener("click", guardarReserva);
    }

    // Botão fechar
    const btnFechar = document.querySelector("#btnFecharModal");
    if (btnFechar) {
        btnFechar.addEventListener("click", fecharModal);
    }
}


// ---------------------------------------------------------
// ATUALIZAR FINANCEIRO EM TEMPO REAL NO MODAL
// ---------------------------------------------------------

function atualizarFinanceiroModal() {

    const form = obterDadosFormulario();

    // Criar modelo temporário
    let reservaTemp = new ReservaModel(form);

    // Calcular noites
    reservaTemp.noites = ReservaUtils.calcularNoites(reservaTemp.checkin, reservaTemp.checkout);

    // Calcular financeiro
    const financeiro = ReservaFinanceiro.calcularTudo({
        totalBruto: reservaTemp.totalBruto,
        percentagemServico: 0,
        percentagemPagamento: 0.014,
        limpeza: reservaTemp.limpeza,
        noites: reservaTemp.noites,
        valorPagoParcial: reservaTemp.valorPagoParcial,
        valorPagoFinal: reservaTemp.valorPagoFinal
    });

    // Atualizar campos no modal
    const campoFalta = document.querySelector("#valorEmFalta");
    if (campoFalta) campoFalta.value = financeiro.valorEmFalta.toFixed(2);

    const campoStatus = document.querySelector("#statusPagamento");
    if (campoStatus) campoStatus.value = financeiro.statusPagamento;

    const campoPrecoNoite = document.querySelector("#precoNoite");
    if (campoPrecoNoite) campoPrecoNoite.value = financeiro.precoNoite.toFixed(2);

    const campoLiquido = document.querySelector("#liquido");
    if (campoLiquido) campoLiquido.value = financeiro.liquido.toFixed(2);
}


// ---------------------------------------------------------
// IMPORTAÇÃO BOOKING
// ---------------------------------------------------------

function ligarEventosImportacao() {
    const input = document.querySelector("#inputExcelBooking");
    if (!input) return;

    input.addEventListener("change", importarExcelBooking);
}


// IMPORTAR EXCEL BOOKING
async function importarExcelBooking(event) {

    const ficheiro = event.target.files[0];
    if (!ficheiro) return;

    const reader = new FileReader();

    reader.onload = async (e) => {

        const dados = XLSX.read(e.target.result, { type: "binary" });
        const primeiraFolha = dados.SheetNames[0];
        const linhas = XLSX.utils.sheet_to_json(dados.Sheets[primeiraFolha]);

        let reservasImportadas = [];

        for (const row of linhas) {

            // 1) Converter linha → ReservaModel
            const reserva = BookingImportEngine.importarLinha(row);

            // 2) Validar datas
            if (!AlocacaoEngine.validarDatas(reserva)) {
                console.warn("Reserva ignorada (datas inválidas):", reserva);
                continue;
            }

            // 3) Alocação automática (opcional)
            const apt = AlocacaoEngine.alocarAutomaticamente(
                reserva,
                reservas,
                LISTA_APARTAMENTOS
            );

            reserva.apartamentos = apt;

            // 4) Guardar no Firestore
            const id = await ReservaService.add(reserva);
            reserva.id = id;

            reservasImportadas.push(reserva);
        }

        // 5) Atualizar tabela
        await carregarReservas();
        renderTabela();

        alert(`${reservasImportadas.length} reservas importadas com sucesso.`);
    };

    reader.readAsBinaryString(ficheiro);
}


// ---------------------------------------------------------
// ALOCAR AUTOMATICAMENTE NO MODAL
// ---------------------------------------------------------

function alocarAutomaticamenteModal() {

    const form = obterDadosFormulario();
    let reservaTemp = new ReservaModel(form);

    // Validar datas
    if (!AlocacaoEngine.validarDatas(reservaTemp)) {
        alert("As datas são inválidas.");
        return;
    }

    // Calcular noites
    reservaTemp.noites = ReservaUtils.calcularNoites(reservaTemp.checkin, reservaTemp.checkout);

    // Procurar apartamento disponível
    const apt = AlocacaoEngine.alocarAutomaticamente(
        reservaTemp,
        reservas,
        LISTA_APARTAMENTOS
    );

    if (apt.length === 0) {
        alert("Nenhum apartamento disponível para estas datas.");
        return;
    }

    // Atualizar campo no modal
    const campoApt = document.querySelector("#apartamentos");
    if (campoApt) campoApt.value = apt.join(", ");

    alert("Apartamento alocado automaticamente.");
}


// ---------------------------------------------------------
// VERIFICAR CONFLITOS EM EDIÇÃO
// ---------------------------------------------------------

function verificarConflitosEdicao(reserva) {

    const conflitos = AlocacaoEngine.encontrarConflitos(reserva, reservas);

    const aviso = document.querySelector("#avisoConflitos");

    if (!aviso) return;

    if (conflitos.length === 0) {
        aviso.style.display = "none";
        aviso.textContent = "";
        return;
    }

    aviso.style.display = "block";
    aviso.textContent = `⚠ Conflito com ${conflitos.length} reserva(s).`;
}


// ---------------------------------------------------------
// SINCRONIZAÇÃO COM CALENDÁRIO
// ---------------------------------------------------------

async function sincronizarCalendarioUI() {

    if (!confirm("Deseja sincronizar todas as reservas com o calendário")) {
        return;
    }

    // Garantir que temos a versão mais recente
    await carregarReservas();

    // Enviar para o calendário
    await ReservaService.sincronizarCalendario(reservas);

    alert("Calendário sincronizado com sucesso.");
}


// LIMPAR RESERVAS FANTASMA DO CALENDÁRIO
async function limparFantasmasUI() {

    if (!confirm("Deseja remover reservas que estão no calendário mas não existem no sistema")) {
        return;
    }

    await ReservaService.limparFantasmas();

    alert("Fantasmas removidos com sucesso.");
}


// ---------------------------------------------------------
// APAGAR RESERVA (FIRESTORE + CALENDÁRIO)
// ---------------------------------------------------------

async function apagarReserva(id) {

    if (!confirm("Tem a certeza que quer apagar esta reserva")) {
        return;
    }

    // 1) Apagar da coleção principal
    await ReservaService.delete(id);

    // 2) Apagar do calendário (se existir)
    await db.collection("calendario").doc(id).delete().catch(() => {});

    // 3) Atualizar tabela
    await carregarReservas();
    renderTabela();

    alert("Reserva apagada com sucesso.");
}


// ---------------------------------------------------------
// FILTROS (VERSÃO BÁSICA — PODES EVOLUIR DEPOIS)
// ---------------------------------------------------------

function ligarEventosFiltros() {
    const inputBusca = document.querySelector("#filtroTexto");
    if (!inputBusca) return;

    inputBusca.addEventListener("input", () => {
        const termo = inputBusca.value.toLowerCase();

        reservasFiltradas = reservas.filter(r => {
            return (
                (r.cliente ?? "").toLowerCase().includes(termo) ||
                (r.bookingId ?? "").toLowerCase().includes(termo) ||
                (r.telefone ?? "").toLowerCase().includes(termo)
            );
        });

        renderTabela();
    });
}
