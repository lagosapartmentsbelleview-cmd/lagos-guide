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
// EVENTOS
// ---------------------------------------------------------------
numAptSelect.addEventListener("change", renderApartamentos);
renderApartamentos();

console.log("reservas.js carregado");

// ---------------------------------------------------------------
// BOTÃO VER DISPONIBILIDADE
// ---------------------------------------------------------------
const btn = document.getElementById("btnDisponibilidade");
const resultado = document.getElementById("resultadoDisponibilidade");

btn.addEventListener("click", () => {

    // Aqui colocas o texto ou resultado real
    resultado.textContent = "A verificar disponibilidade...";

    // ⭐ AQUI MESMO: ativa o estilo de cartão
    resultado.classList.add("has-result");
});

const btn = document.getElementById("btnDisponibilidade");
const resultado = document.getElementById("resultadoDisponibilidade");

btn.addEventListener("click", () => {
    resultado.textContent = "A verificar disponibilidade...";
    resultado.classList.add("has-result"); // ⭐ AQUI
});
