console.log("JS DA LISTAGEM A CORRER — VERSÃO FINAL");

function calcularLimpeza(checkout) {
const mes = new Date(checkout).getMonth() + 1; // 1–12
const mesesAlta = [6, 7, 8, 9]; // junho, julho, agosto, setembro
return mesesAlta.includes(mes) ? 40 : 35;
}

// 👉 FUNÇÃO PARA A CONTAGEM DAS NOITES DAREM SEMPRE NUMEROS INTEIROS
function calcularNoites(checkin, checkout) {
    const dt1 = new Date(checkin + "T00:00:00");
    const dt2 = new Date(checkout + "T00:00:00");

    const diffMs = dt2 - dt1;
    const noites = diffMs / (1000 * 60 * 60 * 24);

    return Math.round(noites);
}

// -------------------------------------------------------------
// 0) ESTADO GLOBAL
// -------------------------------------------------------------
let reservas = [];
let reservaAtual = null;

const APARTAMENTOS_FIXOS = ["2301", "2203", "2204"];
const DIAS_SEGURANCA_REALOCA = 5;

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
}   //  👈 ESTA CHAVETA ESTAVA A FALTAR

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
    let lista = [...reservas];

    lista.sort((a, b) => {
        let v1 = a[coluna];
        let v2 = b[coluna];

        // Valor/Noite (€)
        if (coluna === "precoNoite") {
            v1 = a.precoNoite !== undefined ? Number(a.precoNoite) : 0;
            v2 = b.precoNoite !== undefined ? Number(b.precoNoite) : 0;
        }

        // Apartamentos (array → string)
        if (coluna === "apartamentos") {
            v1 = (a.apartamentos || []).join(", ");
            v2 = (b.apartamentos || []).join(", ");
        }

        // Datas
        if (coluna === "checkin" || coluna === "checkout") {
            v1 = parseDataPt(v1);
            v2 = parseDataPt(v2);
        }

        // Números genéricos
        if (!isNaN(v1) && !isNaN(v2)) {
            v1 = Number(v1);
            v2 = Number(v2);
        }

        // Comparação final
        if (v1 < v2) return ordem === "asc" ? -1 : 1;
        if (v1 > v2) return ordem === "asc" ? 1 : -1;
        return 0;
    });

    desenharTabela(lista);
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

    // 🔥 CORREÇÃO: garantir que todas as reservas têm bookingId
    reservas.forEach(r => {
        if (!r.bookingId) r.bookingId = "";
    });

    desenharTabela(reservas); // <-- IMPORTANTE
}
// -------------------------------------------------------------
// 5) DESENHAR TABELA
// -------------------------------------------------------------
function desenharTabela(lista = reservas) {
    const tbody = document.querySelector("#tabelaReservas tbody");
    tbody.innerHTML = "";

    lista.forEach(r => {
        const tr = document.createElement("tr");

        const quartos = r.quartos || (r.apartamentos ? r.apartamentos.length : 1);
        const apartamentosTexto = (r.apartamentos || []).join(", ");

       tr.innerHTML = `
    <td><input type="checkbox" class="selectReserva" data-id="${r.id}"></td>
    <td><span class="origem-badge origem-${(r.origem || "").toLowerCase()}">${r.origem || ""}</span></td>
    <td>${r.bookingId || ""}</td>
    <td>${r.cliente || ""}</td>
    <td>${quartos}</td>
    <td>${apartamentosTexto || (r.status === "sem_alocacao" ? "Sem alocacao" : "")}</td>
    <td>${r.checkin || ""}</td>
    <td>${r.checkout || ""}</td>
    <td>${(r.checkin && r.checkout) ? calcularNoites(r.checkin, r.checkout) : ""}</td>
    <td>${r.totalBruto !== undefined ? Number(r.totalBruto).toFixed(2) : ""}</td>
    <td>${r.comissao !== undefined ? Number(r.comissao).toFixed(2) : ""}</td>
    <td>${r.precoNoite !== undefined ? Number(r.precoNoite).toFixed(2) : ""}</td>
    <td>${r.berco ? "Sim" : "Não"}</td>

    <!-- AQUI ESTÁ A COLUNA QUE FALTAVA -->
    <td>${r.limpeza !== undefined ? Number(r.limpeza).toFixed(2) : ""}</td>

    <td><button onclick="editarReserva('${r.id}')">Editar</button></td>
`;


        tbody.appendChild(tr);
    });
}


console.log("PARTE 1 carregada.");
// -------------------------------------------------------------

// 6) ABRIR / FECHAR MODAL
// -------------------------------------------------------------
function abrirModalReserva() {
    document.getElementById("modalReserva").style.display = "flex";
}

function fecharModalReserva() {
    document.getElementById("modalReserva").style.display = "none";
    reservaAtual = null;
}

// -------------------------------------------------------------
// 7) NOVA RESERVA
// -------------------------------------------------------------
function novaReserva() {
    reservaAtual = null;
    limparFormularioReserva();
    abrirModalReserva();
}

// -------------------------------------------------------------
// 8) EDITAR RESERVA EXISTENTE
// -------------------------------------------------------------
function editarReserva(id) {
    const r = reservas.find(x => x.id === id);
    if (!r) return;

    reservaAtual = r;
    preencherFormularioReserva(r);
    abrirModalReserva();
}

// -------------------------------------------------------------
// FUNÇÃO PARA CALCULAR LIMPEZA COM BASE NO CHECK-OUT
// -------------------------------------------------------------
function calcularLimpeza(checkout) {
    const mes = new Date(checkout).getMonth() + 1; // 1–12
    const mesesAlta = [6, 7, 8, 9]; // junho, julho, agosto, setembro
    return mesesAlta.includes(mes) ? 40 : 35;
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
    document.getElementById("limpeza").value = ""; // <-- aqui
}

// -------------------------------------------------------------
// 10) EVENTO PARA ATUALIZAR LIMPEZA AUTOMÁTICA
// -------------------------------------------------------------
document.getElementById("checkout").addEventListener("change", () => {
    const checkout = document.getElementById("checkout").value;
    if (checkout) {
        document.getElementById("limpeza").value = calcularLimpeza(checkout);
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
}

// -------------------------------------------------------------
// 11) GUARDAR RESERVA (NOVA OU EDITADA)
// -------------------------------------------------------------
async function guardarReserva() {
    const origem = document.getElementById("origem").value;
    let bookingId = document.getElementById("bookingId").value.trim();

// Se não for Booking → gerar ID automático
if (origem !== "Booking") {
    // Gera um ID manual no formato P + 9 dígitos
    const random9 = Math.floor(100000000 + Math.random() * 900000000);
    bookingId = `P${random9}`;
}


    const cliente = document.getElementById("cliente").value.trim();

    let quartos = Number(document.getElementById("quartos").value || 1);

    let apartamentosDigitados = document.getElementById("apartamentos").value
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

    // Cálculos automáticos
    const noites = calcularNoites(checkin, checkout);
    const precoNoite = noites > 0 ? totalBruto / noites : 0;
    const liquido = totalBruto - comissao;

    // Limpeza: usa manual se existir, senão calcula pelo CHECK-OUT
    let limpeza = document.getElementById("limpeza").value.trim();

    if (limpeza === "" || isNaN(limpeza)) {
    limpeza = calcularLimpeza(checkout); // <-- mês da saída
    } else {
    limpeza = Number(limpeza);
    }

    const totalLiquidoFinal = liquido - limpeza;




    // ---------------------------------------------------------
    // ALOCAÇÃO INTELIGENTE (RESPEITA 5 DIAS E RESERVAS A DECORRER)
    // ---------------------------------------------------------
    let apartamentos = [];
    let status = "alocado";

    const hoje = new Date();
    const dtCheckin = parseDataPt(checkin);
    const reservaJaComecou = dtCheckin && dtCheckin <= hoje;
    const diasParaCheckin = dtCheckin ? diasEntre(new Date(), dtCheckin) : null;

    if (apartamentosDigitados.length > 0) {
        // Utilizador escolheu manualmente
        apartamentos = apartamentosDigitados;
    } else {
        // Sem escolha manual → alocação automática
        if (reservaAtual && reservaJaComecou && reservaAtual.apartamentos?.length > 0) {
            // Não mexer em reservas já iniciadas
            apartamentos = reservaAtual.apartamentos;
        } else if (diasParaCheckin !== null && diasParaCheckin <= DIAS_SEGURANCA_REALOCA) {
            // Dentro da janela de segurança → perguntar
            const confirmar = confirm(
                `Faltam ${diasParaCheckin} dias para o check-in.\n` +
                `Queres tentar realocar automaticamente?`
            );

            if (confirmar) {
                const reservasBase = reservas.filter(r => !reservaAtual || r.id !== reservaAtual.id);
                apartamentos = alocarApartamentosInteligente(quartos, checkin, checkout, reservasBase);
                if (apartamentos.length === 0) status = "sem_alocacao";
            } else {
                apartamentos = reservaAtual?.apartamentos || [];
            }
        } else {
            // Reserva futura → alocação normal
            const reservasBase = reservas.filter(r => !reservaAtual || r.id !== reservaAtual.id);
            apartamentos = alocarApartamentosInteligente(quartos, checkin, checkout, reservasBase);
            if (apartamentos.length === 0) status = "sem_alocacao";
        }
    }

    // ---------------------------------------------------------
    // DADOS FINAIS
    // ---------------------------------------------------------
    const dados = {
        origem,
        bookingId: bookingId || null,
        cliente,
        quartos,
        apartamentos,
        checkin: normalizarDataParaPt(checkin),
        checkout: normalizarDataParaPt(checkout),
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
        berco,
        status
    };

    // ---------------------------------------------------------
    // GUARDAR NO FIRESTORE
    // ---------------------------------------------------------
    if (!reservaAtual) {
        await db.collection("reservas").add(dados);
    } else {
        await db.collection("reservas").doc(reservaAtual.id).update(dados);
    }

    fecharModalReserva();
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

    fecharModalReserva();
    carregarReservas();
}

console.log("PARTE 2 carregada.");

// -------------------------------------------------------------
// 13) IMPORTAÇÃO EXCEL BOOKING (COM ALOCAÇÃO INTELIGENTE)
// -------------------------------------------------------------
async function importarExcelBooking(event) {
    console.log("IMPORTAR EXCEL BOOKING — INÍCIO");

    const file = event.target.files[0];
    if (!file) return;

    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const linhas = XLSX.utils.sheet_to_json(sheet);

    const bookingIdsImportados = new Set();

    // Usamos uma cópia das reservas atuais para simular alocações
    let reservasSimulacao = [...reservas];

    const hoje = new Date();

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
        const limpeza = calcularLimpeza(checkout);
        const totalLiquidoFinal = liquido - limpeza;

        const quartos = Number(linha["Quartos"] || 1);

        const dtCheckin = parseDataPt(checkin);
        const reservaJaComecou = dtCheckin && dtCheckin <= hoje;
        const diasParaCheckin = dtCheckin ? diasEntre(new Date(), dtCheckin) : null;

        // Verificar se já existe
        const existente = reservasSimulacao.find(r => r.bookingId === bookingId);

        let apartamentos = [];
        let status = "alocado";

        if (existente && existente.apartamentos?.length > 0) {
            // Já existe alocação anterior
            if (reservaJaComecou || (diasParaCheckin !== null && diasParaCheckin <= DIAS_SEGURANCA_REALOCA)) {
                apartamentos = existente.apartamentos;
            } else {
                const reservasBase = reservasSimulacao.filter(r => r.id !== existente.id);
                apartamentos = alocarApartamentosInteligente(quartos, checkin, checkout, reservasBase);
                if (apartamentos.length === 0) status = "sem_alocacao";
            }
        } else {
            // Nova reserva Booking
            const reservasBase = existente
                ? reservasSimulacao.filter(r => r.id !== existente.id)
                : reservasSimulacao;

            apartamentos = alocarApartamentosInteligente(quartos, checkin, checkout, reservasBase);
            if (apartamentos.length === 0) status = "sem_alocacao";
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

    let msg = "As seguintes reservas Booking não vieram no Excel:\n\n";
    desaparecidas.forEach(r => {
        msg += `• ${r.bookingId} — ${r.cliente} (${r.checkin} → ${r.checkout})\n`;
    });
    msg += "\nQueres apagá-las?";

    if (!confirm(msg)) return;

    for (const r of desaparecidas) {
        await db.collection("reservas").doc(r.id).delete();

        // Também apagar do calendário
        const snapCal = await db.collection("calendario")
            .where("id", "==", r.id)
            .get();

        snapCal.forEach(doc => doc.ref.delete());
    }
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

            await db.collection("calendario").add({
                ...dados,
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
    if (fechar) fechar.addEventListener("click", fecharModalReserva);

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


