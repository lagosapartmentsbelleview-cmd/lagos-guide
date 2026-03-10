// ======================================================
// VARIÁVEIS GLOBAIS
// ======================================================
let reservas = [];
let reservasCarregadas = false;

// ======================================================
// CARREGAR RESERVAS DO FIREBASE (coleção "reservas")
// ======================================================
async function carregarReservas() {

    // 1) Tenta usar cache
    const cache = sessionStorage.getItem("reservasCache");
    const cacheTime = sessionStorage.getItem("reservasCacheTime");
    const agora = Date.now();
    const TTL = 5 * 60 * 1000; // 5 minutos

    if (cache && cacheTime && (agora - cacheTime < TTL)) {
        reservas = JSON.parse(cache);
        reservasCarregadas = true;
        console.log("Reservas carregadas da cache:", reservas);
        return;
    }

    // 2) Ler Firebase
    const snap = await db.collection("reservas").orderBy("checkin").get();

    reservas = [];
    snap.forEach(doc => reservas.push({ id: doc.id, ...doc.data() }));

    reservasCarregadas = true;
    console.log("Reservas carregadas do Firestore:", reservas);

    // 3) Guardar em cache
    sessionStorage.setItem("reservasCache", JSON.stringify(reservas));
    sessionStorage.setItem("reservasCacheTime", agora);
}

// ======================================================
// CARREGAR RESERVAS AUTOMATICAMENTE QUANDO O MODAL ABRE
// ======================================================
document.getElementById("btnFlutuante").addEventListener("click", async () => {
    if (!reservasCarregadas) {
        console.log("A carregar reservas antes de abrir o modal...");
        await carregarReservas();
    }
});

// ======================================================
// FUNÇÕES DE DATA
// ======================================================
function parseDataPt(str) {
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

function calcularNoites(checkin, checkout) {
    const d1 = parseDataPt(checkin);
    const d2 = parseDataPt(checkout);
    const diff = d2.getTime() - d1.getTime();
    return Math.round(diff / (1000 * 60 * 60 * 24));
}

function validarDatasCheckinCheckout(checkin, checkout) {
    const [d1, m1, a1] = checkin.split("/");
    const [d2, m2, a2] = checkout.split("/");

    const dataCheckin = new Date(`${a1}-${m1}-${d1}`);
    const dataCheckout = new Date(`${a2}-${m2}-${d2}`);

    return dataCheckout > dataCheckin;
}

// ======================================================
// CONFLITOS E ALOCAÇÃO
// ======================================================
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

const APARTAMENTOS_FIXOS = ["2301", "2203", "2204"];

function alocarApartamentosInteligente(quartos, checkin, checkout, reservasExistentes) {
    const resultado = [];
    const reservaNova = { checkin, checkout };

    if (!quartos || quartos < 1) quartos = 1;
    if (quartos > APARTAMENTOS_FIXOS.length) quartos = APARTAMENTOS_FIXOS.length;

    const dataCheckin = parseDataPt(checkin);

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

    for (const ap of APARTAMENTOS_FIXOS) {
        if (resultado.length >= quartos) break;
        if (resultado.includes(ap)) continue;

        const conflito = temConflitoNoApartamento(reservaNova, ap, reservasExistentes);
        if (!conflito) resultado.push(ap);
    }

    return resultado;
}

// ======================================================
// FUNÇÃO PRINCIPAL — SINCRONA PARA O UI
// ======================================================
function verificarDisponibilidade(checkin, checkout, numApt) {

    if (!reservasCarregadas) {
        console.warn("⚠️ Reservas ainda não carregadas — devolvendo indisponível por segurança.");
        return { status: "erro" };
    }

    if (!checkin || !checkout) {
        return { status: "erro" };
    }

    if (!validarDatasCheckinCheckout(checkin, checkout)) {
        return { status: "erro" };
    }

    const apartamentosLivres = alocarApartamentosInteligente(
        numApt,
        checkin,
        checkout,
        reservas
    );

    if (apartamentosLivres.length === 0) {
        return { status: "indisponivel" };
    }

    if (apartamentosLivres.length < numApt) {
        return {
            status: "parcial",
            apartamentos: apartamentosLivres
        };
    }

    return {
        status: "disponivel",
        apartamentos: apartamentosLivres
    };
}

console.log("reservas_v2.js carregado");
