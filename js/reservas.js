import { db } from "./firebase-config.js";
import {
    collection,
    addDoc,
    getDocs,
    query,
    where
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// -------------------------------
// VARIÁVEIS GLOBAIS
// -------------------------------
let reservas = [];
let mesAtual = new Date().getMonth();
let anoAtual = new Date().getFullYear();

// -------------------------------
// INICIAR SISTEMA
// -------------------------------
document.addEventListener("DOMContentLoaded", () => {
    carregarReservas();
    configurarEventos();
});

// -------------------------------
// CARREGAR RESERVAS DO FIREBASE
// -------------------------------
async function carregarReservas() {
    reservas = [];
    const querySnapshot = await getDocs(collection(db, "reservas"));
    querySnapshot.forEach((doc) => {
        reservas.push({ id: doc.id, ...doc.data() });
    });

    desenharCalendario();
}

// -------------------------------
// DESENHAR CALENDÁRIO
// -------------------------------
function desenharCalendario() {
    const calendar = document.getElementById("calendar");
    calendar.innerHTML = "";

    const primeiroDia = new Date(anoAtual, mesAtual, 1);
    const ultimoDia = new Date(anoAtual, mesAtual + 1, 0);

    const diasNoMes = ultimoDia.getDate();
    const diaSemanaInicio = primeiroDia.getDay();

    // Ajuste para começar na segunda-feira
    const offset = diaSemanaInicio === 0 ? 6 : diaSemanaInicio - 1;

    // Dias vazios antes do dia 1
    for (let i = 0; i < offset; i++) {
        const empty = document.createElement("div");
        empty.classList.add("day");
        empty.style.background = "transparent";
        empty.style.border = "none";
        calendar.appendChild(empty);
    }

    // Dias do mês
    for (let dia = 1; dia <= diasNoMes; dia++) {
        const div = document.createElement("div");
        div.classList.add("day");

        const numero = document.createElement("div");
        numero.classList.add("day-number");
        numero.textContent = dia;
        div.appendChild(numero);

        const dataStr = formatarData(anoAtual, mesAtual, dia);

        // Mostrar reservas deste dia
        reservas.forEach(res => {
            if (dataStr >= res.checkin && dataStr < res.checkout) {
                const r = document.createElement("div");
                r.classList.add("reserva", `apt${res.apartamento}`);
                r.textContent = res.cliente;
                r.onclick = () => abrirDetalhes(res);
                div.appendChild(r);
            }
        });

        calendar.appendChild(div);
    }
}

// -------------------------------
// FORMATAR DATA YYYY-MM-DD
// -------------------------------
function formatarData(ano, mes, dia) {
    return `${ano}-${String(mes + 1).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;
}

// -------------------------------
// EVENTOS DOS BOTÕES E MODAIS
// -------------------------------
function configurarEventos() {
    document.getElementById("btnNovaReserva").onclick = () =>
        document.getElementById("modalReserva").style.display = "flex";

    document.getElementById("closeReserva").onclick = () =>
        document.getElementById("modalReserva").style.display = "none";

    document.getElementById("closeDetalhes").onclick = () =>
        document.getElementById("modalDetalhes").style.display = "none";

    document.getElementById("guardarReserva").onclick = guardarReserva;

    // Navegação entre meses
    adicionarNavegacaoMes();
}

// -------------------------------
// NAVEGAÇÃO ENTRE MESES
// -------------------------------
function adicionarNavegacaoMes() {
    const titulo = document.createElement("h2");
    titulo.id = "tituloMes";
    titulo.style.textAlign = "center";
    titulo.style.marginTop = "10px";

    const container = document.querySelector("body");
    container.insertBefore(titulo, container.children[1]);

    const btns = document.createElement("div");
    btns.style.textAlign = "center";
    btns.style.marginBottom = "10px";

    btns.innerHTML = `
        <button id="mesAnterior">← Mês Anterior</button>
        <button id="mesSeguinte">Mês Seguinte →</button>
    `;

    container.insertBefore(btns, container.children[2]);

    atualizarTituloMes();

    document.getElementById("mesAnterior").onclick = () => {
        mesAtual--;
        if (mesAtual < 0) {
            mesAtual = 11;
            anoAtual--;
        }
        atualizarTituloMes();
        desenharCalendario();
    };

    document.getElementById("mesSeguinte").onclick = () => {
        mesAtual++;
        if (mesAtual > 11) {
            mesAtual = 0;
            anoAtual++;
        }
        atualizarTituloMes();
        desenharCalendario();
    };
}

function atualizarTituloMes() {
    const meses = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
    document.getElementById("tituloMes").textContent =
        `${meses[mesAtual]} ${anoAtual}`;
}

// -------------------------------
// GUARDAR NOVA RESERVA
// -------------------------------
async function guardarReserva() {
    const cliente = document.getElementById("cliente").value;
    const checkin = document.getElementById("checkin").value;
    const checkout = document.getElementById("checkout").value;
    const hospedes = document.getElementById("hospedes").value;
    const berco = document.getElementById("berco").value === "true";
    const preco_noite = Number(document.getElementById("preco_noite").value);
    const total_bruto = Number(document.getElementById("total_bruto").value);
    const comissao_ota = Number(document.getElementById("comissao_ota").value);
    const liquido = Number(document.getElementById("liquido").value);

    const apartamento = escolherApartamento(checkin, checkout);

    if (!apartamento) {
        alert("Não há apartamentos disponíveis para estas datas.");
        return;
    }

    await addDoc(collection(db, "reservas"), {
        cliente,
        checkin,
        checkout,
        hospedes,
        berco,
        preco_noite,
        total_bruto,
        comissao_ota,
        liquido,
        apartamento
    });

    document.getElementById("modalReserva").style.display = "none";

    carregarReservas();
}

// -------------------------------
// ESCOLHER APARTAMENTO DISPONÍVEL
// -------------------------------
function escolherApartamento(checkin, checkout) {
    for (let apt = 1; apt <= 3; apt++) {

        const conflito = reservas.some(r =>
            r.apartamento === apt &&
            !(
                checkout <= r.checkin ||   // checkout antes do checkin da outra
                checkin >= r.checkout      // checkin depois do checkout da outra
            )
        );

        if (!conflito) return apt;
    }
    return null;

}

// -------------------------------
// ABRIR DETALHES DA RESERVA
// -------------------------------
function abrirDetalhes(res) {
    const div = document.getElementById("detalhesConteudo");

    div.innerHTML = `
        <p><strong>Hóspede:</strong> ${res.cliente}</p>
        <p><strong>Check-in:</strong> ${res.checkin}</p>
        <p><strong>Check-out:</strong> ${res.checkout}</p>
        <p><strong>Nº Hóspedes:</strong> ${res.hospedes}</p>
        <p><strong>Berço:</strong> ${res.berco ? "Sim" : "Não"}</p>
        <p><strong>Preço/noite:</strong> €${res.preco_noite}</p>
        <p><strong>Total Bruto:</strong> €${res.total_bruto}</p>
        <p><strong>Comissão OTA:</strong> €${res.comissao_ota}</p>
        <p><strong>Valor Líquido:</strong> €${res.liquido}</p>
        <p><strong>Apartamento:</strong> ${res.apartamento}</p>
    `;

    document.getElementById("modalDetalhes").style.display = "flex";
}

