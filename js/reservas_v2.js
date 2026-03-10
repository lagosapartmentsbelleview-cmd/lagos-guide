auth.onAuthStateChanged(user => {
    if (!user) {
        window.location.href = "login.html";
    }
});

// ---------------------------------------------------------------
// RESERVAS (carregadas apenas quando necessário)
// ---------------------------------------------------------------
let reservas = [];

// ---------------------------------------------------------------
// CARREGAR RESERVAS DO FIREBASE (coleção CALENDARIO)
// ---------------------------------------------------------------
async function carregarReservasCalendario() {

    // 1) Tenta usar cache
    const cache = sessionStorage.getItem("reservasCache");
    const cacheTime = sessionStorage.getItem("reservasCacheTime");
    const agora = Date.now();
    const TTL = 5 * 60 * 1000; // 5 minutos

    if (cache && cacheTime && (agora - cacheTime < TTL)) {
        reservas = JSON.parse(cache);
        console.log("Reservas carregadas da cache:", reservas);
        return;
    }

    // 2) Ler Firebase apenas quando necessário
    const snap = await db.collection("calendario").orderBy("checkin").get();

    reservas = [];
    snap.forEach(doc => reservas.push({ id: doc.id, ...doc.data() }));

    console.log("Reservas carregadas do Firestore (calendario):", reservas);

    // 3) Guardar em cache
    sessionStorage.setItem("reservasCache", JSON.stringify(reservas));
    sessionStorage.setItem("reservasCacheTime", agora);
}

// ---------------------------------------------------------------
// FUNÇÕES DE DATA
// ---------------------------------------------------------------
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

// ---------------------------------------------------------------
// CONFLITOS E ALOCAÇÃO
// ---------------------------------------------------------------
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

// ---------------------------------------------------------------
// VERIFICAR DISPONIBILIDADE
// ---------------------------------------------------------------
async function verificarDisponibilidadeComFirebase(checkin, checkout, numApt) {

    // Garantir que temos reservas carregadas
    await carregarReservasCalendario();

    return verificarDisponibilidade(checkin, checkout, numApt);
}

function verificarDisponibilidade(checkin, checkout, numApt) {
    if (!checkin || !checkout) {
        return { status: "erro", mensagem: "Selecione datas válidas." };
    }

    if (!validarDatasCheckinCheckout(checkin, checkout)) {
        return { status: "erro", mensagem: "Checkout deve ser depois do check-in." };
    }

    const apartamentosLivres = alocarApartamentosInteligente(
        numApt,
        checkin,
        checkout,
        reservas
    );

    if (apartamentosLivres.length === 0) {
        return {
            status: "indisponivel",
            mensagem: "Não há apartamentos disponíveis neste intervalo."
        };
    }

    if (apartamentosLivres.length < numApt) {
        return {
            status: "parcial",
            mensagem: `Só ${apartamentosLivres.length} disponível(is).`,
            apartamentos: apartamentosLivres
        };
    }

    return {
        status: "disponivel",
        mensagem: "Datas disponíveis!",
        apartamentos: apartamentosLivres
    };
}

// ---------------------------------------------------------------
// BOTÃO VER DISPONIBILIDADE
// ---------------------------------------------------------------
const btn = document.getElementById("btnDisponibilidade");
const resultado = document.getElementById("resultadoDisponibilidade");

btn.addEventListener("click", async () => {

    const checkin = document.getElementById("checkin").value;
    const checkout = document.getElementById("checkout").value;
    const numApt = parseInt(document.getElementById("numApt").value);

    const t = translations[window.currentLang];

    // 🔥 Agora só aqui é que lemos Firebase
    const r = await verificarDisponibilidadeComFirebase(checkin, checkout, numApt);

    resultado.classList.remove("disponivel", "indisponivel");
    resultado.style.display = "none";

    if (r.status === "erro") {
        resultado.textContent = t.availability_error;
        resultado.classList.add("indisponivel");
        resultado.style.display = "block";
        return;
    }

    if (r.status === "indisponivel") {
        resultado.textContent = t.availability_none;
        resultado.classList.add("indisponivel");
        resultado.style.display = "block";
        return;
    }

    if (r.status === "parcial") {
        const msg = t.availability_partial_msg.replace("{X}", r.apartamentos.length);
        resultado.innerHTML = `
            ⚠️ <strong>${t.availability_partial_title}</strong><br>
            ${msg}<br>
            ${r.apartamentos.join(", ")}
        `;
        resultado.classList.add("disponivel");
        resultado.style.display = "block";
        return;
    }

    if (r.status === "disponivel") {
        const noites = calcularNoites(checkin, checkout);
        const msg = t.availability_ok_msg.replace("{N}", noites);

        resultado.innerHTML = `
            <strong>${t.availability_ok_title}</strong><br>
            ${msg}
        `;
        resultado.classList.add("disponivel");
        resultado.style.display = "block";
        return;
    }
});

function limparCard() {
    resultado.style.display = "none";
    resultado.classList.remove("disponivel", "indisponivel");
}

document.getElementById("checkin").addEventListener("change", limparCard);
document.getElementById("checkout").addEventListener("change", limparCard);
document.getElementById("numApt").addEventListener("change", limparCard);

// ---------------------------------------------------------------
// EVENTOS
// ---------------------------------------------------------------
numAptSelect.addEventListener("change", renderApartamentos);
renderApartamentos();

console.log("reservas_v2.js carregado");
