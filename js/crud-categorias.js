// =======================================
//  REFERÊNCIAS FIRESTORE
// =======================================
const categoriasRef = db.collection("categorias");
const entidadesRef = db.collection("entidades");

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
                    <button class="btn-delete" onclick="apagarCategoria('${id}', '${dados.nome}')">Apagar</button>
                </td>
            `;

            tbody.appendChild(tr);
        });
    });
}

// ======================================================
//  FILTRAR CATEGORIAS (PESQUISA)
// ======================================================
async function filtrarCategorias() {
    const termo = document.getElementById("pesquisaCategorias").value.toLowerCase();
    const tbody = document.querySelector("#tabelaCategorias tbody");
    tbody.innerHTML = "";

    const snap = await categoriasRef.orderBy("nome").get();

    snap.forEach(doc => {
        const dados = doc.data();
        if (!dados.nome.toLowerCase().includes(termo)) return;

        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${dados.nome}</td>
            <td>
                <button class="btn-edit" onclick="abrirModalCategoria('${doc.id}', '${dados.nome}')">Editar</button>
                <button class="btn-delete" onclick="apagarCategoria('${doc.id}', '${dados.nome}')">Apagar</button>
            </td>
        `;

        tbody.appendChild(tr);
    });
}


// =======================================
//  GUARDAR CATEGORIA (Adicionar ou Editar)
// =======================================
async function guardarCategoria() {
    const nome = document.getElementById("inputNomeCategoria").value.trim();

    if (!nome) {
        alert("O nome da categoria não pode estar vazio.");
        return;
    }

    // Verificar duplicados
    const dup = await categoriasRef.where("nome", "==", nome).get();
    if (!categoriaAtualID && !dup.empty) {
        alert("Já existe uma categoria com este nome.");
        return;
    }

    // EDITAR
    if (categoriaAtualID) {
        await categoriasRef.doc(categoriaAtualID).update({ nome });
        fecharModalCategoria();
        carregarCategorias();
        return;
    }

    // ADICIONAR
    await categoriasRef.add({ nome });
    fecharModalCategoria();
    carregarCategorias();
}


// =======================================
//  APAGAR CATEGORIA (com proteção)
// =======================================
async function apagarCategoria(id, nome) {

    // Verificar se alguma entidade usa esta categoria
    const usadas = await entidadesRef.where("categoria", "==", nome).get();

    if (!usadas.empty) {
        alert("Não é possível apagar esta categoria porque está a ser usada por entidades.");
        return;
    }

    if (!confirm("Tem a certeza que deseja apagar esta categoria?")) return;

    await categoriasRef.doc(id).delete();
    carregarCategorias();
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
