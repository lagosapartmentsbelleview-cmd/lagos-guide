// reservas.js
import {
    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import { db } from "./firebase-config.js";

let reservas = [];
let reservaAtual = null;

// Mapeamento dos apartamentos
function mapearApartamento(num) {
    if (num === 1) return "2301 (Apt 1)";
    if (num === 2) return "2203 (Apt 2)";
    if (num === 3) return "2204 (Apt 3)";
    return "Desconhecido";
}

// Carregar reservas do Firestore
async function carregarReservas() {
    reservas = [];
    const querySnapshot = await getDocs(collection(db, "reservas"));
    querySnapshot.forEach(docSnap => {
        reservas.push({ id: docSnap.id, ...docSnap.data() });
    });
    desenharCalendario();
}
// ===============================
// PARTE 2 — CÁLCULOS AUTOMÁTICOS
// ===============================

function calcularAutomaticos() {
    const totalBrutoInput = document.getElementById("total_bruto");
    const comissaoInput   = document.getElementById("comissao_ota");
    const precoNoiteInput = document.getElementById("preco_noite");
    const liquidoInput    = document.getElementById("liquido");
    const checkinInput    = document.getElementById("checkin");
    const checkoutInput   = document.getElementById("checkout");

    const totalBruto = parseFloat(totalBrutoInput.value) || 0;
    const comissao   = parseFloat(comissaoInput.value) || 0;

    const checkin  = new Date(checkinInput.value);
    const checkout = new Date(checkoutInput.value);

    let noites = 0;
    if (!isNaN(checkin) && !isNaN(checkout) && checkout > checkin) {
        const diffMs = checkout - checkin;
        noites = diffMs / (1000 * 60 * 60 * 24);
    }

    // Preço por noite = total bruto / nº noites
    if (noites > 0 && totalBruto > 0) {
        precoNoiteInput.value = (totalBruto / noites).toFixed(2);
    }

    // Valor líquido = total bruto - comissão
    if (totalBruto > 0) {
        liquidoInput.value = (totalBruto - comissao).toFixed(2);
    }
}

// Ativar cálculos automáticos quando o utilizador escreve
document.addEventListener("DOMContentLoaded", () => {
    ["total_bruto", "comissao_ota", "checkin", "checkout"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener("input", calcularAutomaticos);
    });
});
// ===============================================
// PARTE 3 — ESCOLHER APARTAMENTO (AUTO + MANUAL)
// ===============================================

// Verifica se há conflito entre duas reservas
function haConflito(checkin, checkout, r) {
    // Converte datas
    const ci = new Date(checkin);
    const co = new Date(checkout);
    const rci = new Date(r.checkin);
    const rco = new Date(r.checkout);

    // Lógica correta:
    // Check-out = Check-in → NÃO é conflito
    // Check-out < Check-in → NÃO é conflito
    // Check-in > Check-out → NÃO é conflito
    // Qualquer sobreposição real → conflito

    return !(co <= rci || ci >= rco);
}

// Escolher apartamento automaticamente
function escolherApartamento(checkin, checkout) {
    for (let apt = 1; apt <= 3; apt++) {

        const conflito = reservas.some(r =>
            r.apartamento === apt && haConflito(checkin, checkout, r)
        );

        if (!conflito) return apt;
    }

    return null; // Nenhum disponível
}

// Escolher apartamento final (manual ou automático)
function obterApartamentoFinal(checkin, checkout) {
    const escolha = document.getElementById("apartamento_manual").value;

    if (escolha !== "auto") {
        // O utilizador escolheu manualmente
        return parseInt(escolha, 10);
    }

    // Automático
    return escolherApartamento(checkin, checkout);
}
// ===============================
// PARTE 4 — CRUD COMPLETO
// ===============================

// Abrir modal de nova reserva
document.getElementById("btnNovaReserva").onclick = () => {
    reservaAtual = null;
    document.getElementById("tituloModal").textContent = "Nova Reserva";

    // Limpar campos
    ["cliente","checkin","checkout","hospedes","total_bruto","comissao_ota","preco_noite","liquido"]
        .forEach(id => document.getElementById(id).value = "");

    document.getElementById("berco").value = "false";
    document.getElementById("apartamento_manual").value = "auto";

    document.getElementById("modalReserva").style.display = "flex";
};

// Fechar modal de nova reserva
document.getElementById("closeReserva").onclick = () => {
    document.getElementById("modalReserva").style.display = "none";
};

// Fechar modal de detalhes
document.getElementById("closeDetalhes").onclick = () => {
    document.getElementById("modalDetalhes").style.display = "none";
};


// ===============================
// GUARDAR (NOVO OU EDITAR)
// ===============================
async function guardarReserva() {
    const cliente   = document.getElementById("cliente").value;
    const checkin   = document.getElementById("checkin").value;
    const checkout  = document.getElementById("checkout").value;
    const hospedes  = document.getElementById("hospedes").value;
    const berco     = document.getElementById("berco").value === "true";
    const totalBruto= parseFloat(document.getElementById("total_bruto").value) || 0;
    const comissao  = parseFloat(document.getElementById("comissao_ota").value) || 0;
    const precoNoite= parseFloat(document.getElementById("preco_noite").value) || 0;
    const liquido   = parseFloat(document.getElementById("liquido").value) || 0;

    if (!cliente || !checkin || !checkout) {
        alert("Preenche pelo menos nome, check-in e check-out.");
        return;
    }

    // Escolher apartamento (manual ou automático)
    const apartamento = reservaAtual
        ? reservaAtual.apartamento
        : obterApartamentoFinal(checkin, checkout);

    if (!apartamento) {
        alert("Não há apartamentos disponíveis para estas datas.");
        return;
    }

    const dados = {
        cliente,
        checkin,
        checkout,
        hospedes,
        berco,
        totalBruto,
        comissao,
        precoNoite,
        liquido,
        apartamento
    };

    if (reservaAtual) {
        // EDITAR
        await updateDoc(doc(collection(db, "reservas"), reservaAtual.id), dados);
        alert("Reserva atualizada!");
    } else {
        // NOVA
        await addDoc(collection(db, "reservas"), dados);
        alert("Reserva criada!");
    }

    document.getElementById("modalReserva").style.display = "none";
    carregarReservas();
}

document.getElementById("guardarReserva").onclick = guardarReserva;


// ===============================
// ABRIR DETALHES
// ===============================
function abrirDetalhes(reserva) {
    reservaAtual = reserva;

    const div = document.getElementById("detalhesConteudo");
    div.innerHTML = `
        <p><strong>Hóspede:</strong> ${reserva.cliente}</p>
        <p><strong>Apartamento:</strong> ${mapearApartamento(reserva.apartamento)}</p>
        <p><strong>Check-in:</strong> ${reserva.checkin}</p>
        <p><strong>Check-out:</strong> ${reserva.checkout}</p>
        <p><strong>Total Bruto:</strong> € ${reserva.totalBruto}</p>
        <p><strong>Comissão:</strong> € ${reserva.comissao}</p>
        <p><strong>Líquido:</strong> € ${reserva.liquido}</p>

        <label>Alterar apartamento:</label>
        <select id="alterarApartamento">
            <option value="1" ${reserva.apartamento === 1 ? "selected" : ""}>2301 (Apt 1)</option>
            <option value="2" ${reserva.apartamento === 2 ? "selected" : ""}>2203 (Apt 2)</option>
            <option value="3" ${reserva.apartamento === 3 ? "selected" : ""}>2204 (Apt 3)</option>
        </select>

        <button id="btnEditar">Editar</button>
        <button id="btnGuardarAlteracoes">Guardar Alterações</button>
        <button id="btnApagar">Apagar</button>
        <button id="btnPartilhar">Partilhar</button>
        <button id="btnImprimir">Imprimir</button>
    `;

    document.getElementById("modalDetalhes").style.display = "flex";

    document.getElementById("btnEditar").onclick = () => editarReserva(reserva);
    document.getElementById("btnGuardarAlteracoes").onclick = () => alterarApartamento(reserva);
    document.getElementById("btnApagar").onclick = () => apagarReserva(reserva);
    document.getElementById("btnPartilhar").onclick = () => partilharReserva(reserva);
    document.getElementById("btnImprimir").onclick = () => imprimirReserva(reserva);
}


// ===============================
// EDITAR
// ===============================
function editarReserva(reserva) {
    document.getElementById("tituloModal").textContent = "Editar Reserva";

    document.getElementById("cliente").value      = reserva.cliente;
    document.getElementById("checkin").value      = reserva.checkin;
    document.getElementById("checkout").value     = reserva.checkout;
    document.getElementById("hospedes").value     = reserva.hospedes || "";
    document.getElementById("berco").value        = reserva.berco ? "true" : "false";
    document.getElementById("total_bruto").value  = reserva.totalBruto || "";
    document.getElementById("comissao_ota").value = reserva.comissao || "";
    document.getElementById("preco_noite").value  = reserva.precoNoite || "";
    document.getElementById("liquido").value      = reserva.liquido || "";

    document.getElementById("apartamento_manual").value = reserva.apartamento;

    document.getElementById("modalDetalhes").style.display = "none";
    document.getElementById("modalReserva").style.display = "flex";
}


// ===============================
// ALTERAR APARTAMENTO
// ===============================
async function alterarApartamento(reserva) {
    const novoApt = parseInt(document.getElementById("alterarApartamento").value, 10);

    await updateDoc(doc(collection(db, "reservas"), reserva.id), {
        apartamento: novoApt
    });

    alert("Apartamento atualizado!");
    document.getElementById("modalDetalhes").style.display = "none";
    carregarReservas();
}


// ===============================
// APAGAR
// ===============================
async function apagarReserva(reserva) {
    if (!confirm("Tens a certeza que queres apagar esta reserva?")) return;

    await deleteDoc(doc(collection(db, "reservas"), reserva.id));
    alert("Reserva apagada.");

    document.getElementById("modalDetalhes").style.display = "none";
    carregarReservas();
}


// ===============================
// PARTILHAR (COPIAR PARA WHATSAPP)
// ===============================
function partilharReserva(reserva) {
    const texto = `
Reserva – Marina Park
Hóspede: ${reserva.cliente}
Apartamento: ${mapearApartamento(reserva.apartamento)}
Check-in: ${reserva.checkin}
Check-out: ${reserva.checkout}
Total: € ${reserva.totalBruto}
Líquido: € ${reserva.liquido}
    `.trim();

    navigator.clipboard.writeText(texto)
        .then(() => alert("Detalhes copiados! Já podes colar no WhatsApp."))
        .catch(() => alert("Não foi possível copiar automaticamente."));
}


// ===============================
// IMPRIMIR
// ===============================
function imprimirReserva(reserva) {
    const win = window.open("", "_blank");
    win.document.write(`<pre>${JSON.stringify(reserva, null, 2)}</pre>`);
    win.print();
    win.close();
}
// =======================================
// PARTE 5 — RENDERIZAÇÃO DO CALENDÁRIO
// =======================================

function desenharCalendario() {
    const calendar = document.getElementById("calendar");
    calendar.innerHTML = "";

    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = hoje.getMonth();

    const primeiroDia = new Date(ano, mes, 1);
    const ultimoDia = new Date(ano, mes + 1, 0);
    const totalDias = ultimoDia.getDate();

    // Criar 7 colunas (Dom → Sáb)
    const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    diasSemana.forEach(d => {
        const div = document.createElement("div");
        div.textContent = d;
        div.style.fontWeight = "bold";
        div.style.textAlign = "center";
        calendar.appendChild(div);
    });

    // Espaços vazios antes do dia 1
    for (let i = 0; i < primeiroDia.getDay(); i++) {
        const empty = document.createElement("div");
        calendar.appendChild(empty);
    }

    // Criar os dias do mês
    for (let dia = 1; dia <= totalDias; dia++) {
        const div = document.createElement("div");
        div.className = "day";

        const numero = document.createElement("div");
        numero.className = "day-number";
        numero.textContent = dia;
        div.appendChild(numero);

        const dataStr = `${ano}-${String(mes + 1).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;

        // Inserir reservas deste dia
        reservas.forEach(r => {
            let tipo = null;

if (dataStr === r.checkin) {
    tipo = "start"; // check-in → metade direita
} else if (dataStr === r.checkout) {
    tipo = "end";   // check-out → metade esquerda
} else if (dataStr > r.checkin && dataStr < r.checkout) {
    tipo = "full";  // dias completos
}

if (tipo) {
    const resDiv = document.createElement("div");
    resDiv.className = `reserva reserva-${tipo} apt${r.apartamento}`;
    resDiv.textContent = `${r.cliente} – ${mapearApartamento(r.apartamento)}`;

    resDiv.onclick = (e) => {
        e.stopPropagation();
        abrirDetalhes(r);
    };

    div.appendChild(resDiv);
}

        });

        // Clicar no dia → criar nova reserva
        div.onclick = () => {
            reservaAtual = null;
            document.getElementById("tituloModal").textContent = "Nova Reserva";
            document.getElementById("checkin").value = dataStr;
            document.getElementById("modalReserva").style.display = "flex";
        };

        calendar.appendChild(div);
    }
}

// Carregar reservas ao abrir a página
document.addEventListener("DOMContentLoaded", carregarReservas);
