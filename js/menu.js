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
