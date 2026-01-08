// =======================================
// 1) FIRESTORE – CARREGAR RESERVAS
// =======================================
let mesOffset = 0;
let reservas = [];
let reservaAtual = null;

async function carregarReservas() {
    reservas = [];

    const snap = await db.collection("reservas").get();
    snap.forEach(doc => {
        reservas.push({ id: doc.id, ...doc.data() });
    });

    desenharCalendario();
}

// =======================================
// IMPORTAR EXCEL BOOKING (.xlsx)
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

        const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });

        for (const row of rows) {
            try {
                await importarReservaBooking(row);
            } catch (err) {
                console.error("Erro ao importar linha:", row, err);
            }
        }

        alert("Importação concluída!");
        carregarReservas();
    };

    reader.readAsArrayBuffer(file);
});

// =======================================
// FUNÇÃO ÚNICA DE DATA
// =======================================

function formatarData(d) {
    if (!d) return "";

    if (typeof d === "number") {
        const excelEpoch = new Date(Date.UTC(1899, 11, 30));
        const jsDate = new Date(excelEpoch.getTime() + d * 86400000);
        return jsDate.toISOString().split("T")[0];
    }

    if (typeof d === "string") {
        return d.split("T")[0];
    }

    return "";
}

// =======================================
// Converter linha do Excel → Reserva Firestore
// =======================================

async function importarReservaBooking(row) {

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

    const apartamento = escolherApartamento(checkin, checkout);

    if (!apartamento) {
        console.warn("Não há apartamentos disponíveis para:", cliente);
        return;
    }

    const noites = calcularNoites(checkin, checkout);
    const precoNoite = noites > 0 ? totalBruto / noites : 0;
    const liquido = totalBruto - comissao;
    const limpeza = calcularLimpeza(checkin);
    const totalLiquidoFinal = liquido - limpeza;

    const dados = {
        cliente,
        hospedes,
        adultos,
        criancas,
        idadesCriancas,
        checkin,
        checkout,
        origem: "Booking",
        totalBruto,
        comissao,
        precoNoite,
        liquido,
        noites,
        limpeza,
        totalLiquidoFinal,
        apartamento
    };

    await db.collection("reservas").add(dados);
}

// =======================================
// Funções auxiliares
// =======================================

function calcularNoites(ci, co) {
    const [y1, m1, d1] = ci.split("-").map(Number);
    const [y2, m2, d2] = co.split("-").map(Number);

    const dt1 = Date.UTC(y1, m1 - 1, d1);
    const dt2 = Date.UTC(y2, m2 - 1, d2);

    const diff = (dt2 - dt1) / (1000 * 60 * 60 * 24);
    return diff > 0 ? diff : 0;
}

// =======================================
// 2) GUARDAR / EDITAR / APAGAR RESERVAS
// =======================================

async function guardarReserva() {
    const cliente = document.getElementById("cliente").value;
    const hospedes = Number(document.getElementById("hospedes").value || 0);
    const berco = document.getElementById("berco").value === "true";

    const checkin = document.getElementById("checkin").value;
    const checkout = document.getElementById("checkout").value;

    const origemSelect = document.getElementById("origem").value;
    const origemOutro = document.getElementById("origem_outro").value.trim();
    const origem = origemSelect === "Outro" ? origemOutro || "Outro" : origemSelect;

    const totalBruto = Number(document.getElementById("total_bruto").value || 0);
    const comissao = Number(document.getElementById("comissao_ota").value || 0);
    const precoNoite = Number(document.getElementById("preco_noite").value || 0);
    const liquido = Number(document.getElementById("liquido").value || 0);
    const noites = Number(document.getElementById("noites").value || 0);
    const limpeza = Number(document.getElementById("limpeza").value || 0);
    const totalLiquidoFinal = Number(document.getElementById("total_liquido_final").value || 0);

    const apartamentoManual = document.getElementById("apartamento_manual").value;

    let apartamento = null;
    if (apartamentoManual === "auto") {
        apartamento = escolherApartamento(checkin, checkout);
    } else {
        apartamento = Number(apartamentoManual);
    }

    if (!apartamento) {
        alert("Nenhum apartamento disponível para estas datas.");
        return;
    }

    const dados = {
        cliente,
        hospedes,
        berco,
        checkin,
        checkout,
        origem,
        totalBruto,
        comissao,
        precoNoite,
        liquido,
        noites,
        limpeza,
        totalLiquidoFinal,
        apartamento
    };

    if (reservaAtual && reservaAtual.id) {
        await db.collection("reservas").doc(reservaAtual.id).update(dados);
    } else {
        await db.collection("reservas").add(dados);
    }

    document.getElementById("modalReserva").style.display = "none";
    carregarReservas();
}

async function apagarReserva() {
    if (!reservaAtual || !reservaAtual.id) return;

    if (confirm("Tem a certeza que deseja apagar esta reserva?")) {
        await db.collection("reservas").doc(reservaAtual.id).delete();
        document.getElementById("modalDetalhes").style.display = "none";
        carregarReservas();
    }
}

// =======================================
// 3) LÓGICA DE ALOCAÇÃO AUTOMÁTICA
// =======================================

function haConflito(ci, co, r) {
    return !(co <= r.checkin || ci >= r.checkout);
}

function escolherApartamento(checkin, checkout) {
    // 1) PRIORIDADE: back-to-back
    for (let apt = 1; apt <= 3; apt++) {
        const reservasApt = reservas.filter(r => r.apartamento === apt);

        const temBackToBack = reservasApt.some(r =>
            r.checkout === checkin
        );

        if (temBackToBack) {
            const conflito = reservasApt.some(r => haConflito(checkin, checkout, r));
            if (!conflito) return apt;
        }
    }

    // 2) Depois: qualquer livre
    for (let apt = 1; apt <= 3; apt++) {
        const conflito = reservas.some(r =>
            r.apartamento === apt && haConflito(checkin, checkout, r)
        );
        if (!conflito) return apt;
    }

    return null;
}

// =======================================
// 4) DESENHAR CALENDÁRIO
// =======================================

function desenharCalendario() {
    const calendar = document.getElementById("calendar");
    calendar.innerHTML = "";

    const hoje = new Date();
    const mesData = new Date(Date.UTC(hoje.getFullYear(), hoje.getMonth() + mesOffset, 1));
    const ano = mesData.getUTCFullYear();
    const mes = mesData.getUTCMonth();

    const nomeMeses = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
    document.getElementById("mesAtual").textContent = `${nomeMeses[mes]} ${ano}`;

    const primeiroDia = new Date(ano, mes, 1);
    const ultimoDia = new Date(ano, mes + 1, 0);
    const totalDias = ultimoDia.getDate();

    const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    diasSemana.forEach(d => {
        const div = document.createElement("div");
        div.textContent = d;
        div.style.fontWeight = "bold";
        div.style.textAlign = "center";
        calendar.appendChild(div);
    });

    for (let i = 0; i < primeiroDia.getDay(); i++) {
        const empty = document.createElement("div");
        calendar.appendChild(empty);
    }

    for (let dia = 1; dia <= totalDias; dia++) {
        const div = document.createElement("div");
        div.className = "day";

        const numero = document.createElement("div");
        numero.className = "day-number";
        numero.textContent = dia;
        div.appendChild(numero);

        const dataStr = `${ano}-${String(mes + 1).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;

        const linha1 = document.createElement("div");
        linha1.className = "linha-apartamento apt1-linha";

        const linha2 = document.createElement("div");
        linha2.className = "linha-apartamento apt2-linha";

        const linha3 = document.createElement("div");
        linha3.className = "linha-apartamento apt3-linha";

        div.appendChild(linha1);
        div.appendChild(linha2);
        div.appendChild(linha3);

        const reservasDia = reservas.filter(r => {
            const d = dataStr;
            const ci = r.checkin;
            const co = r.checkout;

            return d >= ci && d <= co;
        });

        const aptMap = { 1: "2301", 2: "2203", 3: "2204" };

        [1,2,3].forEach(apt => {
            const linha = div.querySelector(`.apt${apt}-linha`);
            const reservasApt = reservasDia.filter(r => r.apartamento === apt);

            if (reservasApt.length === 0) return;

            reservasApt.forEach(r => {
                let tipo = "full";

                if (dataStr === r.checkin && dataStr === r.checkout) {
                    tipo = "full";
                }
                else if (dataStr === r.checkin) {
                    tipo = "start";
                }
                else if (dataStr === r.checkout) {
                    tipo = "end";
                }
                else {
                    tipo = "full";
                }

                const resDiv = document.createElement("div");
                resDiv.className = `reserva reserva-${tipo} apt${apt}`;
                resDiv.textContent = `${r.cliente} – ${aptMap[r.apartamento]}`;

                resDiv.onclick = (e) => {
                    e.stopPropagation();
                    abrirDetalhes(r);
                };

                linha.appendChild(resDiv);
            });
        });

        div.addEventListener("click", (e) => {
            if (e.target.classList.contains("reserva")) return;

            reservaAtual = null;
            document.getElementById("tituloModal").textContent = "Nova Reserva";
            document.getElementById("cliente").value = "";
            document.getElementById("hospedes").value = "";
            document.getElementById("berco").value = "false";
            document.getElementById("origem").value = "Booking";
            document.getElementById("origem_outro").value = "";
            document.getElementById("origem_outro").style.display = "none";

            document.getElementById("checkin").value = dataStr;
            document.getElementById("checkout").value = "";
            document.getElementById("noites").value = "";
            document.getElementById("total_bruto").value = "";
            document.getElementById("comissao_ota").value = "";
            document.getElementById("preco_noite").value = "";
            document.getElementById("liquido").value = "";
            document.getElementById("limpeza").value = "";
            document.getElementById("total_liquido_final").value = "";
            document.getElementById("apartamento_manual").value = "auto";

            document.getElementById("modalReserva").style.display = "flex";

            calcularValores();
        });

        calendar.appendChild(div);
    }
}

// =======================================
// 5) DETALHES / EDITAR / CRUD
// =======================================

function abrirDetalhes(r) {
    reservaAtual = r;

    const aptMap = { 1: "2301", 2: "2203", 3: "2204" };

    const html = `
        <p><strong>Hóspede:</strong> ${r.cliente}</p>
        <p><strong>Nº Hóspedes:</strong> ${r.hospedes || 0}</p>
        <p><strong>Berço:</strong> ${r.berco ? "Sim" : "Não"}</p>
        <p><strong>Origem:</strong> ${r.origem || "-"}</p>
        <p><strong>Check-in:</strong> ${r.checkin}</p>
        <p><strong>Check-out:</strong> ${r.checkout}</p>
        <p><strong>Noites:</strong> ${r.noites || "-"}</p>
        <p><strong>Apartamento:</strong> ${aptMap[r.apartamento]}</p>
        <p><strong>Total Bruto:</strong> €${r.totalBruto?.toFixed ? r.totalBruto.toFixed(2) : r.totalBruto}</p>
        <p><strong>Comissão:</strong> €${r.comissao?.toFixed ? r.comissao.toFixed(2) : r.comissao}</p>
        <p><strong>Preço/noite:</strong> €${r.precoNoite?.toFixed ? r.precoNoite.toFixed(2) : r.precoNoite}</p>
        <p><strong>Líquido:</strong> €${r.liquido?.toFixed ? r.liquido.toFixed(2) : r.liquido}</p>
        <p><strong>Limpeza (custo interno):</strong> €${r.limpeza?.toFixed ? r.limpeza.toFixed(2) : r.limpeza}</p>
        <p><strong>Total Líquido Final:</strong> €${r.totalLiquidoFinal?.toFixed ? r.totalLiquidoFinal.toFixed(2) : r.totalLiquidoFinal}</p>
        <button onclick="editarReserva()">Editar</button>
        <button onclick="apagarReserva()">Apagar</button>
    `;

    document.getElementById("detalhesConteudo").innerHTML = html;
    document.getElementById("modalDetalhes").style.display = "flex";
}

function editarReserva() {
    const r = reservaAtual;
    if (!r) return;

    document.getElementById("cliente").value = r.cliente || "";
    document.getElementById("hospedes").value = r.hospedes || "";
    document.getElementById("berco").value = r.berco ? "true" : "false";

    const origemBase = ["Booking","Airbnb","VRBO","Particular"];
    if (origemBase.includes(r.origem)) {
        document.getElementById("origem").value = r.origem;
        document.getElementById("origem_outro").value = "";
        document.getElementById("origem_outro").style.display = "none";
    } else {
        document.getElementById("origem").value = "Outro";
        document.getElementById("origem_outro").value = r.origem || "";
        document.getElementById("origem_outro").style.display = "block";
    }

    document.getElementById("checkin").value = r.checkin || "";
    document.getElementById("checkout").value = r.checkout || "";
    document.getElementById("noites").value = r.noites || "";

    document.getElementById("total_bruto").value = r.totalBruto || "";
    document.getElementById("comissao_ota").value = r.comissao || "";
    document.getElementById("preco_noite").value = r.precoNoite || "";
    document.getElementById("liquido").value = r.liquido || "";
    document.getElementById("limpeza").value = r.limpeza || "";
    document.getElementById("total_liquido_final").value = r.totalLiquidoFinal || "";

    document.getElementById("apartamento_manual").value = r.apartamento?.toString() || "auto";

    document.getElementById("modalDetalhes").style.display = "none";
    document.getElementById("modalReserva").style.display = "flex";

    calcularValores();
}

// =======================================
// 6) CÁLCULOS AUTOMÁTICOS
// =======================================

function calcularLimpeza(checkin) {
    if (!checkin) return 0;
    const data = new Date(checkin);
    const mes = data.getMonth() + 1;

    if ([6,7,8,9].includes(mes)) return 40;
    return 35;
}

function calcularValores() {
    const checkin = document.getElementById("checkin").value;
    const checkout = document.getElementById("checkout").value;
    const totalBruto = Number(document.getElementById("total_bruto").value || 0);
    const comissao = Number(document.getElementById("comissao_ota").value || 0);

    let noites = 0;
    if (checkin && checkout) {
        const ci = new Date(checkin);
        const co = new Date(checkout);
        noites = (co - ci) / (1000 * 60 * 60 * 24);
        if (noites < 0) noites = 0;
    }

    const precoNoite = noites > 0 ? totalBruto / noites : 0;
    const liquido = totalBruto - comissao;
    const limpeza = calcularLimpeza(checkin);
    const totalLiquidoFinal = liquido - limpeza;

    document.getElementById("noites").value = noites || "";
    document.getElementById("preco_noite").value = precoNoite ? precoNoite.toFixed(2) : "";
    document.getElementById("liquido").value = liquido ? liquido.toFixed(2) : "";
    document.getElementById("limpeza").value = limpeza ? limpeza.toFixed(2) : "";
    document.getElementById("total_liquido_final").value = totalLiquidoFinal ? totalLiquidoFinal.toFixed(2) : "";
}

document.getElementById("checkin").addEventListener("change", calcularValores);
document.getElementById("checkout").addEventListener("change", calcularValores);
document.getElementById("total_bruto").addEventListener("input", calcularValores);
document.getElementById("comissao_ota").addEventListener("input", calcularValores);

// =======================================
// 7) EVENTOS DE INTERFACE
// =======================================

document.addEventListener("DOMContentLoaded", carregarReservas);

document.getElementById("btnNovaReserva").onclick = () => {
    reservaAtual = null;
    document.getElementById("tituloModal").textContent = "Nova Reserva";
    document.getElementById("cliente").value = "";
    document.getElementById("hospedes").value = "";
    document.getElementById("berco").value = "false";
    document.getElementById("origem").value = "Booking";
    document.getElementById("origem_outro").value = "";
    document.getElementById("origem_outro").style.display = "none";

    document.getElementById("checkin").value = "";
    document.getElementById("checkout").value = "";
    document.getElementById("noites").value = "";
    document.getElementById("total_bruto").value = "";
    document.getElementById("comissao_ota").value = "";
    document.getElementById("preco_noite").value = "";
    document.getElementById("liquido").value = "";
    document.getElementById("limpeza").value = "";
    document.getElementById("total_liquido_final").value = "";
    document.getElementById("apartamento_manual").value = "auto";

    document.getElementById("modalReserva").style.display = "flex";

    calcularValores();
};

document.getElementById("closeReserva").onclick = () => {
    document.getElementById("modalReserva").style.display = "none";
};

document.getElementById("closeDetalhes").onclick = () => {
    document.getElementById("modalDetalhes").style.display = "none";
};

function mudarMes(delta) {
    mesOffset += delta;
    desenharCalendario();
}

document.getElementById("guardarReserva").onclick = guardarReserva;
