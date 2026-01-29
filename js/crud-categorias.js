// =======================================
//  REFERÊNCIA À COLEÇÃO NO FIRESTORE
// =======================================
const categoriasRef = db.collection("categorias");

let categoriaAtualID = null;


// =======================================
//  CARREGAR CATEGORIAS
// =======================================
function carregarCategorias() {
    const tbody = document.querySelector("#tabelaCategorias tbody");
    tbody.innerHTML = "";

    categoriasRef.orderBy("nome").get().then(snapshot => {
        snapshot.forEach(doc => {
            const dados = doc.data();
            const id = doc.id;

            const tr = document.createElement("tr");

            tr.innerHTML = `
                <td>${dados.nome}</td>
                <td>
                    <button class="btn-edit" onclick="abrirModalCategoria('${id}', '${dados.nome}')">Editar</button>
                    <button class="btn-delete" onclick="apagarCategoria('${id}')">Apagar</button>
                </td>
            `;

            tbody.appendChild(tr);
        });
    });
}


// =======================================
//  GUARDAR CATEGORIA (Adicionar ou Editar)
// =======================================
function guardarCategoria() {
    const nome = document.getElementById("inputNomeCategoria").value.trim();

    if (!nome) {
        alert("O nome da categoria não pode estar vazio.");
        return;
    }

    // EDITAR
    if (categoriaAtualID) {
        categoriasRef.doc(categoriaAtualID).update({ nome })
            .then(() => {
                fecharModalCategoria();
                carregarCategorias();
            });
        return;
    }

    // ADICIONAR
    categoriasRef.add({ nome })
        .then(() => {
            fecharModalCategoria();
            carregarCategorias();
        });
}


// =======================================
//  APAGAR CATEGORIA
// =======================================
function apagarCategoria(id) {
    if (!confirm("Tem a certeza que deseja apagar esta categoria?")) return;

    categoriasRef.doc(id).delete()
        .then(() => carregarCategorias());
}


// =======================================
//  MODAL
// =======================================
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
