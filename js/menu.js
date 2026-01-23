function toggleMenu() {
    const menu = document.getElementById("dropdown-menu");
    menu.style.display = menu.style.display === "flex" ? "none" : "flex";
}

document.addEventListener("click", function(e) {
    const menu = document.getElementById("dropdown-menu");
    const button = document.querySelector(".menu-button");

    // Se clicou fora do menu e fora do botão → fecha
    if (!menu.contains(e.target) && !button.contains(e.target)) {
        menu.style.display = "none";
    }
});
// Guardar automaticamente o filtro
document.addEventListener("DOMContentLoaded", () => {
    const inicio = document.getElementById("inicio");
    const fim = document.getElementById("fim");

    // Restaurar valores guardados
    if (localStorage.getItem("filtro_inicio")) {
        inicio.value = localStorage.getItem("filtro_inicio");
    }
    if (localStorage.getItem("filtro_fim")) {
        fim.value = localStorage.getItem("filtro_fim");
    }

    // Guardar sempre que o utilizador escreve
    inicio.addEventListener("input", () => {
        localStorage.setItem("filtro_inicio", inicio.value);
    });

    fim.addEventListener("input", () => {
        localStorage.setItem("filtro_fim", fim.value);
    });
});

