// Aqui vamos colocar:
// - cálculo de noites
// - cálculo de preço
// - verificação de disponibilidade
// - ligação ao Firebase

// ------------------------------
// PASSO 3 — GERAR APARTAMENTOS
// ------------------------------

const numAptSelect = document.getElementById("numApt");
const aptContainer = document.getElementById("apartamentosContainer");

// Função que cria os blocos de apartamentos
function renderApartamentos() {
    const num = parseInt(numAptSelect.value);
    aptContainer.innerHTML = ""; // limpa tudo

    for (let i = 1; i <= num; i++) {
        const bloco = document.createElement("div");
        bloco.className = "apartamento-bloco";

        const titulo = document.createElement("h3");
        titulo.textContent = `Apartamento ${i}`;
        bloco.appendChild(titulo);

// valores internos
let adultos = 0;
let criancas = 0;

// contador de adultos
const adultosContador = criarContador("Adultos", (v) => {
    adultos = v;
    validarLimite();
});
bloco.appendChild(adultosContador);

// contador de crianças
const criancasContador = criarContador("Crianças", (v) => {
    criancas = v;
    validarLimite();
    renderIdades();
});
bloco.appendChild(criancasContador);

// Área onde vão aparecer as idades das crianças
const idadesDiv = document.createElement("div");
bloco.appendChild(idadesDiv);

// Atualiza a lista de idades sempre que o nº de crianças muda
function renderIdades() {
    idadesDiv.innerHTML = ""; // limpa tudo

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

        // Mostrar berço apenas quando idade <= 2
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


// função que garante máximo 4 pessoas
function validarLimite() {
    if (adultos + criancas > 4) {
        // reduzir crianças automaticamente
        criancas = 4 - adultos;
        criancasContador.querySelector("span").textContent = criancas;
    }
}
        
// ------------------------------
// ADULTOS E CRIANÇAS (PASSO 4)
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
        if (v < 4) { // limite individual
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


        aptContainer.appendChild(bloco);
    }
}

// Atualiza quando o cliente muda o nº de apartamentos
numAptSelect.addEventListener("change", renderApartamentos);

// Render inicial (1 apartamento)
renderApartamentos();


console.log("reservas.js carregado");
