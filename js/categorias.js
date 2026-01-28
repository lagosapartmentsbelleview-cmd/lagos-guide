// ===============================
//  CARREGAR CATEGORIAS AO INICIAR
// ===============================

document.addEventListener("DOMContentLoaded", () => {
    carregarCategorias();
});

let categoriaAtualID = null; // usado para edição


// ===============================
//  ABRIR MODAL (Adicionar ou Editar)
// ===============================

function abrirModalCategoria(id = null, nome = "") {
    categoriaAtualID = id;

    document.getElementById("inputNomeCategoria").value = nome;

    document.getElementById("tituloModalCategoria").textContent =
        id ? "Editar Categoria" : "Adicionar Categoria";

    document.getElementById("modalCategoria").style.display = "flex";
}

function fecharModalCategoria() {
    document.getElementById("modalCategoria").style.display = "none";
    categoriaAtualID = null;
}
