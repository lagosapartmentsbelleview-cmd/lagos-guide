// =======================================
// 1) ESTADO GLOBAL E FIRESTORE
// =======================================

let mesOffset = 0;
let reservas = [];
let reservaAtual = null;

// Carrega todas as reservas do Firestore para memória
async function carregarReservas() {
    reservas = [];

    const snap = await db.collection("reservas").get();
    snap.forEach(doc => {
        reservas.push({ id: doc.id, ...doc.data() });
    });

    desenharCalendario();
}

// =======================================
// 2) IMPORTAÇÃO EXCEL – BOTÕES E LEITURA
// =======================================

document.getElementById("btnImportarExcel").onclick = () => {
    document.getElementById("inputExcel").click();
};

document.getElementById("inputExcel").addEventListener("change", async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = async (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        let rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });

        // Ordenar por data de check-in (regra: processar por ordem cronológica)
        rows.sort((a, b) => {
            const ciA = formatarData(a["Check-in"]);
            const ciB = formatarData(b["Check-in"]);
            return ciA.localeCompare(ciB);
        });

        // Vamos guardar os IDs de reserva que vieram no ficheiro
        const bookingIdsImportados = new Set();

        const novasReservas = []; // para lógica de alocação incremental

        for (const row of rows) {
            try {
                const bookingId = (row["Número da reserva"] || "").toString().trim();
                if (!bookingId) {
                    console.warn("Linha sem Número da reserva, ignorada:", row);
                    continue;
                }

                bookingIdsImportados.add(bookingId);

                await importarReservaBooking(row, novasReservas);
            } catch (err) {
                console.error("Erro ao importar linha:", row, err);
            }
        }

        // Depois da importação, verificar reservas que existem no Firestore
        // mas não vieram no ficheiro (opção C: perguntar)
        await verificarReservasDesaparecidas(bookingIdsImportados);

        alert("Importação concluída!");
        carregarReservas();
    };

    reader.readAsArrayBuffer(file);
});

// =======================================
// 3) FUNÇÕES DE DATA E CÁLCULOS BÁSICOS
// =======================================

// Converte datas do Excel ou string para "YYYY-MM-DD"
function formatarData(d) {
    if (!d) return "";

    // Número (data Excel)
    if (typeof d === "number") {
        const excelEpoch = new Date(Date.UTC(1899, 11, 30));
        const jsDate = new Date(excelEpoch.getTime() + d * 86400000);
        return jsDate.toISOString().split("T")[0];
    }

    // String tipo "2026-03-01T00:00:00"
    if (typeof d === "string") {
        return d.split("T")[0];
    }

    return "";
}

// Calcula número de noites entre duas datas "YYYY-MM-DD"
function calcularNoites(ci, co) {
    if (!ci || !co) return 0;

    const [y1, m1, d1] = ci.split("-").map(Number);
    const [y2, m2, d2] = co.split("-").map(Number);

    const dt1 = Date.UTC(y1, m1 - 1, d1);
    const dt2 = Date.UTC(y2, m2 - 1, d2);

    const diff = (dt2 - dt1) / (1000 * 60 * 60 * 24);
    return diff > 0 ? diff : 0;
}

// Custo de limpeza em função do mês
function calcularLimpeza(checkin) {
    if (!checkin) return 0;
    const data = new Date(checkin);
    const mes = data.getMonth() + 1;

    if ([6, 7, 8, 9].includes(mes)) return 40;
    return 35;
}

// Verifica se há conflito entre [ci, co] e reserva r
function haConflito(ci, co, r) {
    // Aqui consideramos intervalo inclusivo para o calendário,
    // mas para ocupação é [checkin, checkout) → checkout não conta como noite
    return !(co <= r.checkin || ci >= r.checkout);
}
// =======================================
// 4) FUNÇÃO PRINCIPAL DE IMPORTAÇÃO
// =======================================

async function importarReservaBooking(row, novasReservas) {

    const bookingId = (row["Número da reserva"] || "").toString().trim();
    if (!bookingId) return;

    const cliente = row["Nome do hóspede"] || "Hóspede Booking";
    const checkin = formatarData(row["Check-in"]);
    const checkout = formatarData(row["Check-out"]);

    const hospedes = Number(row["Pessoas"] || 0);
    const adultos = Number(row["Adultos"] || 0);
    const criancas = Number(row["Crianças"] || 0);

    const idadesCriancas = (row["Idade da(s) criança(s)"] || "")
        .toString()
        .replace(/[^\d,]/g, "")
        .replace(/,+/g, ",")
        .replace(/^,|,$/g, "");

    const totalBruto = Number(row["Preço"] || 0);
    const comissao = Number(row["Valor da comissão"] || 0);
    const quartos = Number(row["Quartos"] || 1);

    // Verificar se esta reserva já existe no Firestore
    const snap = await db.collection("reservas")
        .where("bookingId", "==", bookingId)
        .get();

    let reservasExistentes = [];
    snap.forEach(doc => reservasExistentes.push({ id: doc.id, ...doc.data() }));

    // Se já existe, vamos APAGAR e recriar (mais simples e seguro)
    for (const r of reservasExistentes) {
        await db.collection("reservas").doc(r.id).delete();
    }

    // Criar as reservas (1 por quarto)
    for (let i = 0; i < quartos; i++) {

        // Lista completa de reservas até ao momento
        const reservasAtuais = [...reservas, ...novasReservas];

        // Escolher apartamento com lógica inteligente
        const apartamento = escolherApartamento(checkin, checkout, reservasAtuais);

        if (!apartamento) {
            console.warn("Sem apartamento disponível para:", cliente);
            continue;
        }

        const noites = calcularNoites(checkin, checkout);
        const totalBrutoQuarto = totalBruto / quartos;
        const comissaoQuarto = comissao / quartos;
        const precoNoite = noites > 0 ? totalBrutoQuarto / noites : 0;
        const liquido = totalBrutoQuarto - comissaoQuarto;
        const limpeza = calcularLimpeza(checkin);
        const totalLiquidoFinal = liquido - limpeza;

        const dados = {
            bookingId,
            cliente,
            hospedes,
            adultos,
            criancas,
            idadesCriancas,
            checkin,
            checkout,
            origem: "Booking",
            totalBruto: totalBrutoQuarto,
            comissao: comissaoQuarto,
            precoNoite,
            liquido,
            noites,
            limpeza,
            totalLiquidoFinal,
            apartamento
        };

        const docRef = await db.collection("reservas").add(dados);

        // Adicionar à lista de reservas criadas nesta importação
        novasReservas.push({
            id: docRef.id,
            apartamento,
            checkin,
            checkout
        });
    }
}

// =======================================
// 5) LÓGICA DE ALOCAÇÃO INTELIGENTE
// =======================================

function escolherApartamento(checkin, checkout, lista) {

    const apartamentos = [2301, 2203, 2204];

    // 1) PRIORIDADE: back-to-back
    for (const apt of apartamentos) {
        const reservasApt = lista.filter(r => r.apartamento === apt);

        const temBackToBack = reservasApt.some(r => r.checkout === checkin);

        if (temBackToBack) {
            const conflito = reservasApt.some(r => haConflito(checkin, checkout, r));
            if (!conflito) return apt;
        }
    }

    // 2) Depois: ordem fixa 2301 → 2203 → 2204
    for (const apt of apartamentos) {
        const conflito = lista.some(r =>
            r.apartamento === apt && haConflito(checkin, checkout, r)
        );
        if (!conflito) return apt;
    }

    return null;
}

// =======================================
// 6) VERIFICAR RESERVAS DESAPARECIDAS (OPÇÃO C)
// =======================================

async function verificarReservasDesaparecidas(bookingIdsImportados) {

    const snap = await db.collection("reservas").get();
    const reservasAtuais = [];
    snap.forEach(doc => reservasAtuais.push({ id: doc.id, ...doc.data() }));

    const desaparecidas = reservasAtuais.filter(r =>
        r.bookingId && !bookingIdsImportados.has(r.bookingId)
    );

    if (desaparecidas.length === 0) return;

    let msg = "As seguintes reservas existem no sistema mas não vieram no Excel:\n\n";
    desaparecidas.forEach(r => {
        msg += `• ${r.bookingId} — ${r.cliente} (${r.checkin} → ${r.checkout})\n`;
    });
    msg += "\nQueres apagá-las?";

    if (confirm(msg)) {
        for (const r of desaparecidas) {
            await db.collection("reservas").doc(r.id).delete();
        }
    }
}
// =======================================
// 8) REATRIBUIR RESERVAS FUTURAS APÓS EDIÇÃO
// =======================================

async function reatribuirReservasFuturas(idReservaEditada) {

    const reservaEditada = reservas.find(r => r.id === idReservaEditada);
    if (!reservaEditada) return;

    const hoje = new Date().toISOString().split("T")[0];

    // Não mexer em reservas que já começaram ou começam hoje
    const reservasProtegidas = reservas.filter(r =>
        r.checkin <= hoje
    );

    // Reservas futuras (apenas depois da reserva editada)
    let futuras = reservas.filter(r =>
        r.checkin > reservaEditada.checkin
    );

    // Ordenar futuras por data de check-in
    futuras.sort((a, b) => a.checkin.localeCompare(b.checkin));

    // Vamos reconstruir as reservas futuras com base na lógica de alocação
    const novasAlocacoes = [];

    // Base de comparação: reservas protegidas + reserva editada
    let base = [...reservasProtegidas, reservaEditada];

    for (const r of futuras) {

        // Usar base + novasAlocacoes para decidir apartamento
        const lista = [...base, ...novasAlocacoes];

        const novoApt = escolherApartamento(r.checkin, r.checkout, lista);

        if (!novoApt) {
            console.warn("Sem apartamento disponível ao reatribuir:", r);
            // Mantém como está se não houver solução melhor
            novasAlocacoes.push(r);
            continue;
        }

        // Se o apartamento mudou, atualiza no Firestore
        if (novoApt !== r.apartamento) {
            await db.collection("reservas").doc(r.id).update({
                apartamento: novoApt
            });
            r.apartamento = novoApt;
        }

        novasAlocacoes.push(r);
        base.push(r);
    }

    // Recarregar tudo no fim
    await carregarReservas();
}
// =======================================
// 9) DESENHAR CALENDÁRIO
// =======================================

function desenharCalendario() {

    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mesBase = hoje.getMonth() + mesOffset; // permite navegar meses

    const dataRef = new Date(ano, mesBase, 1);
    const mes = dataRef.getMonth();
    const anoRef = dataRef.getFullYear();

    const primeiroDiaSemana = new Date(anoRef, mes, 1).getDay(); // 0=Dom
    const diasNoMes = new Date(anoRef, mes + 1, 0).getDate();

    const tabela = document.getElementById("calendario");
    tabela.innerHTML = "";

    // Cabeçalho com nome do mês
    const nomeMes = dataRef.toLocaleString("pt-PT", { month: "long", year: "numeric" });
    document.getElementById("tituloMes").textContent = nomeMes.charAt(0).toUpperCase() + nomeMes.slice(1);

    // Linha de cabeçalho: dias
    const thead = document.createElement("thead");
    const trHead = document.createElement("tr");

    const thApt = document.createElement("th");
    thApt.textContent = "Apartamento";
    trHead.appendChild(thApt);

    for (let d = 1; d <= diasNoMes; d++) {
        const th = document.createElement("th");
        th.textContent = d;
        trHead.appendChild(th);
    }

    thead.appendChild(trHead);
    tabela.appendChild(thead);

    const tbody = document.createElement("tbody");

    // Ordem fixa dos apartamentos
    const apartamentos = [2301, 2203, 2204];

    for (const apt of apartamentos) {
        const tr = document.createElement("tr");

        const tdApt = document.createElement("td");
        tdApt.textContent = apt;
        tr.appendChild(tdApt);

        for (let dia = 1; dia <= diasNoMes; dia++) {
            const td = document.createElement("td");
            td.classList.add("dia-celula");

            const dataDia = new Date(anoRef, mes, dia);
            const dataStr = dataDia.toISOString().split("T")[0];

            // Encontrar reservas que tocam este dia neste apartamento
            const reservasAptDia = reservas.filter(r =>
                r.apartamento === apt &&
                diaPertenceAReserva(dataStr, r.checkin, r.checkout)
            );

            if (reservasAptDia.length > 0) {
                // Para já assumimos no máximo 1 reserva por dia/apt (porque evitamos conflitos)
                const r = reservasAptDia[0];

                const div = document.createElement("div");
                div.classList.add("reserva");

                // Ver se é check-in, check-out ou dia intermédio
                const isCheckin = dataStr === r.checkin;
                const isCheckout = dataStr === r.checkout;

                if (isCheckin && isCheckout) {
                    // Caso raro: 1 noite só
                    div.classList.add("reserva-unica");
                } else if (isCheckin) {
                    div.classList.add("reserva-inicio");
                } else if (isCheckout) {
                    div.classList.add("reserva-fim");
                } else {
                    div.classList.add("reserva-meio");
                }

                div.textContent = r.cliente || r.bookingId || "Reserva";

                div.onclick = () => editarReserva(r.id);

                td.appendChild(div);
            }

            tr.appendChild(td);
        }

        tbody.appendChild(tr);
    }

    tabela.appendChild(tbody);
}

// Verifica se um dia pertence à reserva para efeitos de calendário
function diaPertenceAReserva(diaStr, checkin, checkout) {
    // Aqui queremos incluir o dia de check-in, dias intermédios
    // e o dia de check-out (para mostrar a meia célula)
    return diaStr >= checkin && diaStr <= checkout;
}

// =======================================
// 7) CRUD DE RESERVAS (CRIAR / EDITAR / APAGAR)
// =======================================

// Abrir modal para nova reserva
function novaReserva() {
    reservaAtual = null;
    limparFormularioReserva();
    abrirModalReserva();
}

// Abrir modal para editar reserva existente
function editarReserva(id) {
    const r = reservas.find(res => res.id === id);
    if (!r) return;

    reservaAtual = r;
    preencherFormularioReserva(r);
    abrirModalReserva();
}

// Apagar reserva
async function apagarReserva(id) {
    if (!confirm("Tens a certeza que queres apagar esta reserva?")) return;

    await db.collection("reservas").doc(id).delete();
    await carregarReservas();
}

// Guardar reserva (nova ou editada)
async function guardarReserva() {

    const form = document.getElementById("formReserva");

    const bookingId = form.bookingId.value.trim();
    const cliente = form.cliente.value.trim() || "Hóspede";
    const checkin = form.checkin.value;
    const checkout = form.checkout.value;
    const apartamento = Number(form.apartamento.value);

    const hospedes = Number(form.hospedes.value || 0);
    const adultos = Number(form.adultos.value || 0);
    const criancas = Number(form.criancas.value || 0);
    const idadesCriancas = form.idadesCriancas.value.trim();

    const totalBruto = Number(form.totalBruto.value || 0);
    const comissao = Number(form.comissao.value || 0);

    const noites = calcularNoites(checkin, checkout);
    const precoNoite = noites > 0 ? totalBruto / noites : 0;
    const liquido = totalBruto - comissao;
    const limpeza = calcularLimpeza(checkin);
    const totalLiquidoFinal = liquido - limpeza;

    const dados = {
        bookingId: bookingId || null,
        cliente,
        hospedes,
        adultos,
        criancas,
        idadesCriancas,
        checkin,
        checkout,
        origem: "Manual",
        totalBruto,
        comissao,
        precoNoite,
        liquido,
        noites,
        limpeza,
        totalLiquidoFinal,
        apartamento
    };

    // NOVA RESERVA
    if (!reservaAtual) {
        const conflito = reservas.some(r =>
            r.apartamento === apartamento && haConflito(checkin, checkout, r)
        );
        if (conflito) {
            alert("Já existe uma reserva neste apartamento para estas datas.");
            return;
        }

        await db.collection("reservas").add(dados);
        await carregarReservas();
        fecharModalReserva();
        return;
    }

    // EDITAR RESERVA EXISTENTE
    const id = reservaAtual.id;

    await db.collection("reservas").doc(id).update(dados);

    await carregarReservas();

    await reatribuirReservasFuturas(id);

    fecharModalReserva();
}

// Limpar formulário
function limparFormularioReserva() {
    const form = document.getElementById("formReserva");
    form.reset();
}

// Preencher formulário com dados de uma reserva
function preencherFormularioReserva(r) {
    const form = document.getElementById("formReserva");

    form.bookingId.value = r.bookingId || "";
    form.cliente.value = r.cliente || "";
    form.checkin.value = r.checkin || "";
    form.checkout.value = r.checkout || "";
    form.apartamento.value = r.apartamento || "";

    form.hospedes.value = r.hospedes || "";
    form.adultos.value = r.adultos || "";
    form.criancas.value = r.criancas || "";
    form.idadesCriancas.value = r.idadesCriancas || "";

    form.totalBruto.value = r.totalBruto || "";
    form.comissao.value = r.comissao || "";
}

// Abrir/fechar modal
function abrirModalReserva() {
    document.getElementById("modalReserva").style.display = "flex";
}
function fecharModalReserva() {
    document.getElementById("modalReserva").style.display = "none";
}


// =======================================
// 10) INICIALIZAÇÃO
// =======================================

window.novaReserva = novaReserva;
window.editarReserva = editarReserva;
window.guardarReserva = guardarReserva;


window.addEventListener("load", () => {
    carregarReservas();

    document.getElementById("btnMesAnterior").onclick = () => {
        mesOffset--;
        desenharCalendario();
    };

    document.getElementById("btnMesSeguinte").onclick = () => {
        mesOffset++;
        desenharCalendario();
    };

    document.getElementById("btnNovaReserva").onclick = novaReserva;
});
