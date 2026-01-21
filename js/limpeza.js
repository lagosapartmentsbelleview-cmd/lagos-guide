// ===============================
// 1) FIREBASE + FIRESTORE
// ===============================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// A tua config Firebase
const firebaseConfig = {
    apiKey: "AQUI",
    authDomain: "AQUI",
    projectId: "AQUI",
    storageBucket: "AQUI",
    messagingSenderId: "AQUI",
    appId: "AQUI"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);


// ===============================
// 2) VERIFICAR ADMIN
// ===============================

let isAdmin = false;

onAuthStateChanged(auth, (user) => {
    if (user && user.email === "miguel@teuemail.com") {
        isAdmin = true;
        document.getElementById("painelAdmin").style.display = "block";
    } else {
        document.getElementById("painelAdmin").style.display = "none";
    }
});


// ===============================
// 3) DOMContentLoaded — O TEU BLOCO
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    const painelAdmin = document.getElementById("painelAdmin");
    const toggleAdmin = document.getElementById("toggleAdmin");

    // ABRIR AUTOMATICAMENTE PARA ADMIN
    painelAdmin.classList.add("aberto");

    toggleAdmin.addEventListener("click", () => {
        painelAdmin.classList.toggle("fechado");
        toggleAdmin.textContent = painelAdmin.classList.contains("fechado") ? "▶" : "▼";
    });

    document.getElementById("btnGerar").addEventListener("click", gerarLimpeza);

});


// ===============================
// 4) FUNÇÃO PRINCIPAL
// ===============================

async function gerarLimpeza() {

    const inicio = document.getElementById("dataInicio").value;
    const fim = document.getElementById("dataFim").value;

    if (!inicio || !fim) {
        alert("Escolhe as duas datas.");
        return;
    }

    const dataInicio = new Date(inicio);
    const dataFim = new Date(fim);

    // Buscar reservas
    const reservas = await carregarReservas();

    // Filtrar
    const filtradas = filtrarPorDatas(reservas, dataInicio, dataFim);

    // Lista
    preencherLista(filtradas);

    // Calendário
    preencherCalendario(filtradas, dataInicio, dataFim);

    // Totais (apenas admin)
    if (isAdmin) {
        calcularTotais(filtradas, dataInicio, dataFim);
    }
}


// ===============================
// 5) BUSCAR RESERVAS DO FIRESTORE
// ===============================

async function carregarReservas() {
    const reservasRef = collection(db, "reservas");
    const snapshot = await getDocs(reservasRef);

    const lista = [];
    snapshot.forEach(doc => {
        lista.push({ id: doc.id, ...doc.data() });
    });

    return lista;
}


// ===============================
// 6) FILTRAR POR INTERVALO
// ===============================

function filtrarPorDatas(reservas, inicio, fim) {
    return reservas.filter(r => {
        if (!r.checkout) return false;

        const co = new Date(r.checkout);

        return co >= inicio && co <= fim && r.status !== "cancelada";
    });
}


// ===============================
// 7) LISTA DE LIMPEZA
// ===============================

function preencherLista(reservas) {
    const tbody = document.querySelector("#tabelaLimpeza tbody");
    tbody.innerHTML = "";

    reservas.forEach(r => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${r.hospede || ""}</td>
            <td>${r.apartamento || ""}</td>
            <td>${r.checkin || ""}</td>
            <td>${r.checkout || ""}</td>
            <td>${r.pessoas || ""}</td>
            <td>${r.adultos || ""}</td>
            <td>${r.criancas || ""}</td>
            <td>${r.idades || ""}</td>
            <td>${r.berco ? "Sim" : "Não"}</td>
            <td>${r.observacoes || ""}</td>
        `;

        tbody.appendChild(tr);
    });
}


// ===============================
// 8) CALENDÁRIO COMPLETO
// ===============================

function preencherCalendario(reservas, inicio, fim) {

    const container = document.getElementById("calendarioContainer");
    container.innerHTML = "";

    const dias = [];
    let d = new Date(inicio);

    while (d <= fim) {
        dias.push(new Date(d));
        d.setDate(d.getDate() + 1);
    }

    const apartamentos = ["2301", "2203", "2204"];

    let html = `<table class="calendario"><thead><tr><th>Apt</th>`;

    dias.forEach(dia => {
        html += `<th>${dia.getDate()}</th>`;
    });

    html += `</tr></thead><tbody>`;

    apartamentos.forEach(ap => {
        html += `<tr><td><strong>${ap}</strong></td>`;

        dias.forEach(dia => {
            const reserva = reservas.find(r =>
                r.apartamento == ap &&
                new Date(r.checkin) <= dia &&
                new Date(r.checkout) >= dia
            );

            if (reserva) {

                const tooltip = `
Apt ${ap}
${reserva.hospede}
${reserva.pessoas} pessoas (${reserva.adultos}A + ${reserva.criancas}C)
Idades: ${reserva.idades || "-"}
Berço: ${reserva.berco ? "Sim" : "Não"}
Obs: ${reserva.observacoes || "-"}
                `.trim();

                html += `<td class="ocupado normal" title="${tooltip}">${reserva.hospede}</td>`;
            } else {
                html += `<td></td>`;
            }
        });

        html += `</tr>`;
    });

    html += `</tbody></table>`;

    container.innerHTML = html;
}


// ===============================
// 9) TOTAIS (APENAS ADMIN)
// ===============================

function calcularTotais(reservas, inicio, fim) {
    let totalBase = 0;
    let totalExtras = 0;

    reservas.forEach(r => {
        totalBase += Number(r.limpeza || 0);
        totalExtras += Number(r.limpezaExtra || 0);
    });

    document.getElementById("totalCheckouts").textContent = reservas.length;
    document.getElementById("totalBase").textContent = totalBase;
    document.getElementById("totalExtras").textContent = totalExtras;
    document.getElementById("totalGeral").textContent = totalBase + totalExtras;

    const pagamento = new Date(fim);
    pagamento.setMonth(pagamento.getMonth() + 1);
    pagamento.setDate(1);

    document.getElementById("dataPagamento").textContent =
        pagamento.toLocaleDateString("pt-PT");
}
