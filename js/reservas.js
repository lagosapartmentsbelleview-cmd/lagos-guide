auth.onAuthStateChanged(user => {
    if (!user) {
        window.location.href = "login.html";
    }
});

let reservas = [];

async function carregarReservasPublico() {
    const snap = await db.collection("reservas").orderBy("checkin").get();

    reservas = [];
    snap.forEach(doc => reservas.push({ id: doc.id, ...doc.data() }));

    console.log("Reservas carregadas no site público:", reservas);
}

carregarReservasPublico();

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

function validarDatasCheckinCheckout(checkin, checkout) {
    const [d1, m1, a1] = checkin.split("/");
    const [d2, m2, a2] = checkout.split("/");

    const dataCheckin = new Date(`${a1}-${m1}-${d1}`);
    const dataCheckout = new Date(`${a2}-${m2}-${d2}`);

    return dataCheckout > dataCheckin;
}

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



// ------------------------------
// ADULTOS E CRIANÇAS 
// ------------------------------
function criarContador(label, callback) {
    const div = document.createElement("div");
    div.className = "contador";

    const labelEl = document.createElement("label");
    labelEl.textContent = label;

    const menos = document.createElement("button");
    menos.textContent = "-";

    const mais = document.createElement("button");
    mais.textContent = "+";

    const valor = document.createElement("span");
    valor.textContent = "0";

    menos.onclick = () => {
        let v = parseInt(valor.textContent);
        if (v > 0) {
            valor.textContent = v - 1;
            callback(v - 1);
        }
    };

    mais.onclick = () => {
        let v = parseInt(valor.textContent);
        if (v < 4) {
            valor.textContent = v + 1;
            callback(v + 1);
        }
    };

    div.appendChild(labelEl);
    div.appendChild(menos);
    div.appendChild(valor);
    div.appendChild(mais);

    return div;
}

// ---------------------------------------------------------------
// VARIÁVEIS PRINCIPAIS
// ---------------------------------------------------------------
const numAptSelect = document.getElementById("numApt");
const aptContainer = document.getElementById("apartamentosContainer");

const checkinInput = document.getElementById("checkin");
const extraCampos = document.getElementById("extraCampos");

checkinInput.addEventListener("focus", () => {
    extraCampos.classList.remove("hidden");
});

document.getElementById("checkout").addEventListener("focus", () => {
    extraCampos.classList.remove("hidden");
});


// ------------------------------
// GERAR APARTAMENTOS
// ------------------------------
function renderApartamentos() {
    const num = parseInt(numAptSelect.value);
    aptContainer.innerHTML = "";

    for (let i = 1; i <= num; i++) {

        const bloco = document.createElement("div");
        bloco.className = "apartamento-bloco";

        const titulo = document.createElement("h3");
        titulo.textContent = `${translations[window.currentLang].apartment_label} ${i}`;
        bloco.appendChild(titulo);

        let adultos = 0;
        let criancas = 0;

        const idadesDiv = document.createElement("div");
        bloco.appendChild(idadesDiv);

        function renderIdades() {
            idadesDiv.innerHTML = "";

            for (let c = 1; c <= criancas; c++) {
                const idadeBox = document.createElement("div");
                idadeBox.className = "idade-crianca";

                idadeBox.innerHTML = `
                    <label>Idade da criança ${c}</label>
                    <select class="idadeSelect">
                        ${Array.from({ length: 18 }, (_, i) => `<option value="${i}">${i} anos</option>`).join("")}
                    </select>
                `;

                const select = idadeBox.querySelector(".idadeSelect");

                select.addEventListener("change", () => {
                    const idade = parseInt(select.value);
                    let berco = idadeBox.querySelector(".berco");

                    if (idade <= 2) {
                        if (!berco) {
                            berco = document.createElement("div");
                            berco.className = "berco";
                            berco.innerHTML = `
                                <label>
                                    <input type="checkbox" class="bercoCheck">
                                    Necessita de berço
                                </label>
                            `;
                            idadeBox.appendChild(berco);
                        }
                    } else {
                        if (berco) berco.remove();
                    }
                });

                idadesDiv.appendChild(idadeBox);
            }
        }

        function validarLimite() {
            if (adultos + criancas > 4) {

                if (adultos > 4 - criancas) {
                    adultos = 4 - criancas;
                    adultosSpan.textContent = adultos;
                }

                if (criancas > 4 - adultos) {
                    criancas = 4 - adultos;
                    criancasSpan.textContent = criancas;
                    renderIdades();
                }
            }
        }

        const adultosContador = criarContador(translations[window.currentLang].adults, (v) => {
            adultos = v;
            adultosSpan.textContent = v;
            validarLimite();
        });
        const adultosSpan = adultosContador.querySelector("span");
        bloco.appendChild(adultosContador);

        const criancasContador = criarContador(translations[window.currentLang].children, (v) => {
            criancas = v;
            criancasSpan.textContent = v;
            validarLimite();
            renderIdades();
        });
        const criancasSpan = criancasContador.querySelector("span");
        bloco.appendChild(criancasContador);

        aptContainer.appendChild(bloco);
    }
}

// ---------------------------------------------------------------
// BOTÃO VER DISPONIBILIDADE
// ---------------------------------------------------------------
const btn = document.getElementById("btnDisponibilidade");
const resultado = document.getElementById("resultadoDisponibilidade");

btn.addEventListener("click", () => {
    resultado.textContent = "A verificar disponibilidade...";
    resultado.classList.add("has-result");
});

// ---------------------------------------------------------------
// EVENTOS
// ---------------------------------------------------------------
numAptSelect.addEventListener("change", renderApartamentos);
renderApartamentos();

console.log("reservas.js carregado");
