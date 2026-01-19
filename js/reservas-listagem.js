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
// RENDERIZAR TABELA
// ---------------------------------------------------------

function renderTabela() {
    const tbody = document.querySelector("#tabelaReservas tbody");
    tbody.innerHTML = "";

    reservasFiltradas.forEach(r => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td><input type="checkbox" class="selectReserva" data-id="${r.id}"></td>
            <td>${r.origem ?? ""}</td>
            <td>${r.bookingId ?? ""}</td>
            <td>${r.cliente ?? ""}</td>
            <td>${r.paisCliente ? `<img src="flags/${r.paisCliente}.svg" class="flag">` : ""}</td>
            <td>${r.checkin}</td>
            <td>${r.checkout}</td>
            <td>${r.hospedes}</td>
            <td>${r.totalBruto} €</td>
            <td>
                <button class="btnEditar" data-id="${r.id}">Editar</button>
                <button class="btnApagar" data-id="${r.id}">Apagar</button>
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
        btn.addEventListener("click", async () => {
            const id = btn.dataset.id;
            if (confirm("Tem a certeza que quer apagar esta reserva")) {
                await ReservaService.delete(id);
                await carregarReservas();
                renderTabela();
            }
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
    document.querySelector("#modalReservaTitulo").textContent = "Nova Reserva";

    const modal = document.querySelector("#modalReserva");
    modal.style.display = "block";
}
// ---------------------------------------------------------
// ABRIR MODAL PARA EDITAR RESERVA
// ---------------------------------------------------------

async function abrirModalEdicao(id) {
    modoEdicao = true;

    const dados = await ReservaService.getById(id);
    reservaAtual = new ReservaModel(dados);

    preencherModal(reservaAtual);

    document.querySelector("#modalReservaTitulo").textContent = "Editar Reserva";

    const modal = document.querySelector("#modalReserva");
    modal.style.display = "block";
}
// ---------------------------------------------------------
// LIMPAR MODAL
// ---------------------------------------------------------

function limparModal() {
    document.querySelector("#formReserva").reset();
    document.querySelector("#apartamentos").value = "";
}
// ---------------------------------------------------------
// PREENCHER MODAL
// ---------------------------------------------------------

function preencherModal(r) {

    document.querySelector("#cliente").value = r.cliente;
    document.querySelector("#paisCliente").value = r.paisCliente;
    document.querySelector("#telefone").value = r.telefone;
    document.querySelector("#morada").value = r.morada;

    document.querySelector("#adultos").value = r.adultos;
    document.querySelector("#criancas").value = r.criancas;
    document.querySelector("#idadesCriancas").value = r.idadesCriancas;

    document.querySelector("#checkin").value = r.checkin;
    document.querySelector("#checkout").value = r.checkout;

    document.querySelector("#totalBruto").value = r.totalBruto;
    document.querySelector("#limpeza").value = r.limpeza;

    document.querySelector("#valorPagoParcial").value = r.valorPagoParcial;
    document.querySelector("#valorPagoFinal").value = r.valorPagoFinal;

    document.querySelector("#apartamentos").value = r.apartamentos.join(", ");
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
        percentagemServico: reserva.comissaoServico,
        percentagemPagamento: reserva.percentagemPagamento,
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

    // Criar ou editar
    if (modoEdicao) {
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

        adultos: Number(document.querySelector("#adultos").value),
        criancas: Number(document.querySelector("#criancas").value),
        idadesCriancas: document.querySelector("#idadesCriancas").value,

        checkin: document.querySelector("#checkin").value,
        checkout: document.querySelector("#checkout").value,

        totalBruto: Number(document.querySelector("#totalBruto").value),
        limpeza: Number(document.querySelector("#limpeza").value),

        valorPagoParcial: Number(document.querySelector("#valorPagoParcial").value),
        valorPagoFinal: Number(document.querySelector("#valorPagoFinal").value),

        apartamentos: ReservaUtils.parseApartamentos(
            document.querySelector("#apartamentos").value
        )
    };
}
function fecharModal() {
    document.querySelector("#modalReserva").style.display = "none";
}
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
        document.querySelector(sel).addEventListener("input", atualizarFinanceiroModal);
    });

    // Botão guardar
    document.querySelector("#btnGuardarReserva").addEventListener("click", guardarReserva);

    // Botão fechar
    document.querySelector("#btnFecharModal").addEventListener("click", fecharModal);
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
        percentagemServico: reservaTemp.comissaoServico,
        percentagemPagamento: reservaTemp.percentagemPagamento,
        limpeza: reservaTemp.limpeza,
        noites: reservaTemp.noites,
        valorPagoParcial: reservaTemp.valorPagoParcial,
        valorPagoFinal: reservaTemp.valorPagoFinal
    });

    // Atualizar campos no modal
    document.querySelector("#valorEmFalta").value = financeiro.valorEmFalta.toFixed(2);
    document.querySelector("#statusPagamento").value = financeiro.statusPagamento;
    document.querySelector("#precoNoite").value = financeiro.precoNoite.toFixed(2);
    document.querySelector("#liquido").value = financeiro.liquido.toFixed(2);
}
<input id="valorEmFalta" readonly>
<input id="statusPagamento" readonly>
<input id="precoNoite" readonly>
<input id="liquido" readonly>
function ligarEventosImportacao() {
    document.querySelector("#inputExcelBooking")
        .addEventListener("change", importarExcelBooking);
}
// ---------------------------------------------------------
// IMPORTAR EXCEL BOOKING
// ---------------------------------------------------------

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
<input type="file" id="inputExcelBooking" accept=".xlsx,.xls">
<button id="btnAlocarAuto" type="button">Alocar Automaticamente</button>
document.querySelector("#btnAlocarAuto")
    .addEventListener("click", alocarAutomaticamenteModal);
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
    document.querySelector("#apartamentos").value = apt.join(", ");

    alert("Apartamento alocado automaticamente.");
}
function verificarConflitosEdicao(reserva) {

    const conflitos = AlocacaoEngine.encontrarConflitos(reserva, reservas);

    const aviso = document.querySelector("#avisoConflitos");

    if (conflitos.length === 0) {
        aviso.style.display = "none";
        return;
    }

    aviso.style.display = "block";
    aviso.textContent = `⚠ Conflito com ${conflitos.length} reserva(s).`;
}
<div id="avisoConflitos" style="display:none; color:#c62828; font-weight:bold;"></div>
verificarConflitosEdicao(r);
const conflitos = AlocacaoEngine.encontrarConflitos(reserva, reservas);

if (conflitos.length > 0) {
    if (!confirm("Existem conflitos com outras reservas. Deseja continuar?")) {
        return;
    }
}
<td>
    ${r.apartamentos?.length > 0 
        ? r.apartamentos.join(", ") 
        : "<span style='color:#c62828;font-weight:bold'>Não alocado</span>"
    }
</td>
<button id="btnSincronizarCalendario">Sincronizar Calendário</button>
<button id="btnLimparFantasmas">Limpar Fantasmas</button>
document.querySelector("#btnSincronizarCalendario")
    .addEventListener("click", sincronizarCalendarioUI);

document.querySelector("#btnLimparFantasmas")
    .addEventListener("click", limparFantasmasUI);
// ---------------------------------------------------------
// ENVIAR RESERVAS PARA O CALENDÁRIO
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
// ---------------------------------------------------------
// LIMPAR RESERVAS FANTASMA DO CALENDÁRIO
// ---------------------------------------------------------

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
btn.addEventListener("click", async () => {
    const id = btn.dataset.id;
    if (confirm("Tem a certeza que quer apagar esta reserva")) {
        await ReservaService.delete(id);
        await carregarReservas();
        renderTabela();
    }
});
btn.addEventListener("click", () => {
    apagarReserva(btn.dataset.id);
});
