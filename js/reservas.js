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

        // Aqui depois vamos inserir:
        // - Adultos
        // - Crianças
        // - Idades
        // - Berço
        // (mas só no próximo passo)

        aptContainer.appendChild(bloco);
    }
}

// Atualiza quando o cliente muda o nº de apartamentos
numAptSelect.addEventListener("change", renderApartamentos);

// Render inicial (1 apartamento)
renderApartamentos();


console.log("reservas.js carregado");
