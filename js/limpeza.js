document.addEventListener("DOMContentLoaded", () => {

    const painelAdmin = document.getElementById("painelAdmin");
    const toggleAdmin = document.getElementById("toggleAdmin");

    // ABRIR AUTOMATICAMENTE PARA ADMIN
    painelAdmin.classList.add("aberto");

    toggleAdmin.addEventListener("click", () => {
        painelAdmin.classList.toggle("fechado");
        toggleAdmin.textContent = painelAdmin.classList.contains("fechado") ? "▶" : "▼";
    });

    document.getElementById("btnGerar").addEventListener("click", gerarLimpeza);

});

function gerarLimpeza() {
    // Aqui vamos buscar dados do Firestore
    // Filtrar por datas
    // Preencher lista
    // Preencher calendário
    // Calcular totais (apenas admin)
}
