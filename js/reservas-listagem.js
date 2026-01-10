console.log("JS DA LISTAGEM ESTÁ A CORRER MESMO!");

/******************************************************
 * 0) ESTADO GLOBAL
 ******************************************************/
let reservas = [];
let reservaAtual = null; // reserva que está a ser editada

/******************************************************
 * 1) INICIALIZAÇÃO
 ******************************************************/
window.addEventListener("load", () => {
    carregarReservas();

    document.getElementById("btnNovaReserva").onclick = novaReserva;
    document.getElementById("btnImportarExcel").onclick = () =>
        document.getElementById("inputExcel").click();
    document.getElementById("btnIrCalendario").onclick = () => {
        window.location.href = "calendario.html";
    };

    document.getElementById("inputExcel").addEventListener("change", importarExcelBooking);

    document.getElementById("btnGuardar").onclick = guardarReserva;
    document.getElementById("btnApagar").onclick = apagarReservaConfirmar;
    document.getElementById("fecharModal").onclick = fecharModalReserva;

    document.getElementById("btnEnviarCalendario").onclick = enviarParaCalendario;
});

/******************************************************
 * 2) CARREGAR RESERVAS DO FIRESTORE
 ******************************************************/
async function carregarReservas() {
    const snap = await db.collection("reservas").orderBy("checkin").get();

    reservas = [];
    snap.forEach(doc => reservas.push({ id: doc.id, ...doc.data() }));

    desenharTabela();
}

/******************************************************
 * 3) DESENHAR TABELA DE RESERVAS
 ******************************************************/
function desenharTabela() {
    const tbody = document.querySelector("#tabelaReservas tbody");
    tbody.innerHTML = "";

    reservas.forEach(r => {
        const tr = document.createElement("tr");

        const quartos = r.quartos || (r.apartamentos ? r.apartamentos.length : 1);
        const apartamentosTexto = (r.apartamentos || []).join(", ");

        tr.innerHTML = `
            <td><input type="checkbox" class="selectReserva" data-id="${r.id}"></td>
            <td><span class="origem-badge origem-${(r.origem || "").toLowerCase()}">${r.origem || ""}</span></td>
            <td>${r.bookingId || ""}</td>
            <td>${r.cliente || ""}</td>
            <td>${quartos}</td>
            <td>${apartamentosTexto}</td>
            <td>${r.checkin || ""}</td>
            <td>${r.checkout || ""}</td>
            <td>${r.noites != null ? r.noites : ""}</td>
            <td>${r.totalBruto != null ? r.totalBruto.toFixed(2) : ""}</td>
            <td>${r.comissao != null ? r.comissao.toFixed(2) : ""}</td>
            <td>${r.precoNoite != null ? r.precoNoite.toFixed(2) : ""}</td>
            <td>${r.berco ? "Sim" : "Não"}</td>
            <td>
                <button onclick="editarReserva('${r.id}')">Editar</button>
            </td>
        `;

        tbody.appendChild(tr);
    });
}

/******************************************************
 * 4) ABRIR / FECHAR MODAL
 ******************************************************/
function abrirModalReserva() {
    document.getElementById("modalReserva").style.display = "flex";
}

function fecharModalReserva() {
    document.getElementById("modalReserva").style.display = "none";
}

/******************************************************
 * 5) NOVA RESERVA
 ******************************************************/
function novaReserva() {
    reservaAtual = null;
    limparFormularioReserva();
    abrirModalReserva();
}

/******************************************************
 * 6) EDITAR RESERVA
 ******************************************************/
function editarReserva(id) {
    const r = reservas.find(x => x.id === id);
    if (!r) return;

    reservaAtual = r;
    preencherFormularioReserva(r);
    abrirModalReserva();
}

/******************************************************
 * 7) LIMPAR FORMULÁRIO
 ******************************************************/
function limparFormularioReserva() {
    document.getElementById("formReserva").reset();
    document.getElementById("precoNoite").value = "";
}

/******************************************************
 * 8) PREENCHER FORMULÁRIO
 ******************************************************/
function preencherFormularioReserva(r) {
    document.getElementById("origem").value = r.origem || "Booking";
    document.getElementById("bookingId").value = r.bookingId || "";
    document.getElementById("cliente").value = r.cliente || "";

    const quartos = r.quartos || (r.apartamentos ? r.apartamentos.length : 1);
    document.getElementById("quartos").value = quartos;

    document.getElementById("apartamentos").value = (r.apartamentos || []).join(", ");

    document.getElementById("checkin").value = r.checkin || "";
    document.getElementById("checkout").value = r.checkout || "";

    document.getElementById("hospedes").value = r.hospedes != null ? r.hospedes : "";
    document.getElementById("adultos").value = r.adultos != null ? r.adultos : "";
    document.getElementById("criancas").value = r.criancas != null ? r.criancas : "";
    document.getElementById("idadesCriancas").value = r.idadesCriancas || "";

    document.getElementById("totalBruto").value = r.totalBruto != null ? r.totalBruto : "";
    document.getElementById("comissao").value = r.comissao != null ? r.comissao : "";
    document.getElementById("precoNoite").value = r.precoNoite != null ? r.precoNoite : "";

    document.getElementById("berco").value = r.berco ? "true" : "false";
}

/******************************************************
 * 9) GUARDAR RESERVA (NOVA OU EDITADA)
 ******************************************************/
async function guardarReserva() {
    // 1. Ler campos
    const origem = document.getElementById("origem").value;
    const bookingId = document.getElementById("bookingId").value.trim();
    const cliente = document.getElementById("cliente").value.trim();

    const quartos = Number(document.getElementById("quartos").value || 1);

    const apartamentos = document.getElementById("apartamentos").value
        .split(",")
        .map(x => x.trim())
        .filter(x => x !== "");

    const checkin = document.getElementById("checkin").value.trim();
    const checkout = document.getElementById("checkout").value.trim();

    const hospedes = Number(document.getElementById("hospedes").value || 0);
    const adultos = Number(document.getElementById("adultos").value || 0);
    const criancas = Number(document.getElementById("criancas").value || 0);
    const idadesCriancas = document.getElementById("idadesCriancas").value.trim();

    const totalBruto = Number(document.getElementById("totalBruto").value || 0);
    const comissao = Number(document.getElementById("comissao").value || 0);

    const berco = document.getElementById("berco").value === "true";

    // 2. Cálculos automáticos
    const noites = calcularNoites(checkin, checkout);
    const precoNoite = noites > 0 ? totalBruto / noites : 0;
    const liquido = totalBruto - comissao;
    const limpeza = calcularLimpeza(checkin);
    const totalLiquidoFinal = liquido - limpeza;

    // 3. Dados finais
    const dados = {
        origem,
        bookingId: bookingId || null,
        cliente,
        quartos,
        apartamentos,
        checkin,
        checkout,
        hospedes,
        adultos,
        criancas,
        idadesCriancas,
        totalBruto,
        comissao,
        precoNoite,
        noites,
        liquido,
        limpeza,
        totalLiquidoFinal,
        berco
    };

    // 4. NOVA RESERVA
    if (!reservaAtual) {
        await db.collection("reservas").add(dados);
    }
    // 5. EDITAR RESERVA
    else {
        await db.collection("reservas").doc(reservaAtual.id).update(dados);
    }

    fecharModalReserva();
    carregarReservas();
}

/******************************************************
 * 10) APAGAR RESERVA (NO MODAL)
 ******************************************************/
async function apagarReservaConfirmar() {
    if (!reservaAtual) return;

    if (!confirm("Tens a certeza que queres apagar esta reserva?")) return;

    await db.collection("reservas").doc(reservaAtual.id).delete();

    fecharModalReserva();
    carregarReservas();
}

/******************************************************
 * 11) CÁLCULO DE NOITES
 ******************************************************/
function calcularNoites(checkin, checkout) {
    if (!checkin || !checkout) return 0;

    const [d1, m1, a1] = checkin.split("/").map(Number);
    const [d2, m2, a2] = checkout.split("/").map(Number);

    const dt1 = new Date(a1, m1 - 1, d1);
    const dt2 = new Date(a2, m2 - 1, d2);

    const diff = dt2 - dt1;
    return diff > 0 ? diff / (1000 * 60 * 60 * 24) : 0;
}

/******************************************************
 * 12) CÁLCULO DE LIMPEZA
 ******************************************************/
function calcularLimpeza(checkin) {
    if (!checkin) return 35;
    const mes = Number(checkin.split("/")[1]);
    return [6, 7, 8, 9].includes(mes) ? 40 : 35;
}

/******************************************************
 * 13) IMPORTAÇÃO EXCEL BOOKING
 ******************************************************/
async function importarExcelBooking(event) {
    console.log("FUNÇÃO IMPORTAR EXCEL FOI CHAMADA!");
    const file = event.target.files[0];
    if (!file) return;

    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const linhas = XLSX.utils.sheet_to_json(sheet);

    const bookingIdsImportados = new Set();

    for (const linha of linhas) {
        const bookingId = String(linha["Número da reserva"] || "").trim();
        if (!bookingId) continue;

        bookingIdsImportados.add(bookingId);

        const checkin = formatarDataExcel(linha["Check-in"]);
        const checkout = formatarDataExcel(linha["Check-out"]);

        const totalBruto = Number(linha["Preço"] || 0);
        const comissao = Number(linha["Valor da comissão"] || 0);

        const noites = calcularNoites(checkin, checkout);
        const precoNoite = noites > 0 ? totalBruto / noites : 0;
        const liquido = totalBruto - comissao;
        const limpeza = calcularLimpeza(checkin);
        const totalLiquidoFinal = liquido - limpeza;

        const quartos = Number(linha["Quartos"] || 1);

        // Regra simples: 2301 → 2203 → 2204
        const baseApts = ["2301", "2203", "2204"];
        const apartamentos = [];
        for (let i = 0; i < quartos && i < baseApts.length; i++) {
            apartamentos.push(baseApts[i]);
        }

        const dados = {
            origem: "Booking",
            bookingId,
            cliente: linha["Nome do hóspede"] || "Hóspede",
            quartos,
            apartamentos,
            checkin,
            checkout,
            hospedes: Number(linha["Pessoas"] || 0),
            adultos: Number(linha["Adultos"] || 0),
            criancas: Number(linha["Crianças"] || 0),
            idadesCriancas: linha["Idade da(s) criança(s)"] || "",
            totalBruto,
            comissao,
            precoNoite,
            noites,
            liquido,
            limpeza,
            totalLiquidoFinal,
            berco: false
        };

        // Verificar se já existe
        const existente = reservas.find(r => r.bookingId === bookingId);

        if (existente) {
            await db.collection("reservas").doc(existente.id).update(dados);
        } else {
            await db.collection("reservas").add(dados);
        }
    }

    // Apagar apenas reservas Booking que desapareceram
    await verificarReservasBookingDesaparecidas(bookingIdsImportados);

    carregarReservas();
}

/******************************************************
 * 14) APAGAR RESERVAS BOOKING QUE DESAPARECERAM DO EXCEL
 ******************************************************/
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

    let msg = "As seguintes reservas Booking não vieram no Excel:\n\n";
    desaparecidas.forEach(r => {
        msg += `• ${r.bookingId} — ${r.cliente} (${r.checkin} → ${r.checkout})\n`;
    });
    msg += "\nQueres apagá-las?";

    if (!confirm(msg)) return;

    for (const r of desaparecidas) {
        await db.collection("reservas").doc(r.id).delete();
    }
}

/******************************************************
 * 15) FORMATAR DATA DO EXCEL PARA dd/mm/aaaa
 ******************************************************/
function formatarDataExcel(valor) {
    if (!valor) return "";

    const dt = XLSX.SSF.parse_date_code(valor);
    return `${String(dt.d).padStart(2, "0")}/${String(dt.m).padStart(2, "0")}/${dt.y}`;
}

/******************************************************
 * 16) SELECIONAR / APAGAR SELECIONADAS
 ******************************************************/
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
        }

        alert("Reservas apagadas com sucesso.");
        carregarReservas();
    });
}

/******************************************************
 * 17) ENVIAR SELECIONADAS PARA O CALENDÁRIO
 ******************************************************/
const btnEnviarCalendarioEl = document.getElementById("btnEnviarCalendario");

if (btnEnviarCalendarioEl) {
    btnEnviarCalendarioEl.addEventListener("click", async () => {
        const selecionadas = [...document.querySelectorAll(".selectReserva:checked")];

        if (selecionadas.length === 0) {
            alert("Nenhuma reserva selecionada.");
            return;
        }

        for (const cb of selecionadas) {
            const id = cb.dataset.id;

            const doc = await db.collection("reservas").doc(id).get();
            if (!doc.exists) continue;

            const dados = doc.data();

            await db.collection("calendario").add({
                ...dados,
                enviadoParaCalendario: true,
                criadoEm: new Date()
            });
        }

        alert("Reservas enviadas para o calendário.");
    });
}

console.log("JS da listagem carregado mesmo!");

function enviarParaCalendario() {
    const selecionadas = [...document.querySelectorAll(".selectReserva:checked")];

    if (selecionadas.length === 0) {
        alert("Nenhuma reserva selecionada.");
        return;
    }

    selecionadas.forEach(chk => {
        const id = chk.dataset.id;
        const reserva = reservas.find(r => r.id === id);

        if (reserva) {
            db.collection("calendario").add(reserva);
        }
    });

    alert("Reservas enviadas para o calendário!");
}
