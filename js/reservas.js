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
