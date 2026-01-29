let modoEdicao = null; // null = adicionar, "123456789" = editar NIF

// ======================================================
//  LISTAR ENTIDADES (FIRESTORE)
// ======================================================
async function listarEntidades() {
    const snap = await db.collection("entidades").get();
    return snap.docs.map(doc => doc.data());
}

// ======================================================
//  OBTER ENTIDADE POR NIF (FIRESTORE)
// ======================================================
async function obterEntidadePorNIF(nif) {
    const doc = await db.collection("entidades").doc(nif).get();
    return doc.exists ? doc.data() : null;
}

// ======================================================
//  ADICIONAR OU EDITAR ENTIDADE (FIRESTORE)
// ======================================================
async function adicionarOuEditarEntidade(nif, nome, categoria) {
    await db.collection("entidades").doc(nif).set({
        nif,
        nome,
        categoria
    });

    alert("Entidade guardada com sucesso!");
}

// ======================================================
//  APAGAR ENTIDADE (FIRESTORE)
// ======================================================
async function apagarEntidade(nif) {
    if (!confirm("Tem a certeza que deseja apagar esta entidade?")) return;

    await db.collection("entidades").doc(nif).delete();

    alert("Entidade apagada.");
    atualizarTabela();
}

// ======================================================
//  ATUALIZAR TABELA (CARREGA DO FIRESTORE)
// ======================================================
async function atualizarTabela() {
    const tbody = document.querySelector("#tabelaEntidades tbody");
    tbody.innerHTML = "";

    const lista = await listarEntidades();

    lista.forEach(ent => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${ent.nif}</td>
            <td>${ent.nome}</td>
            <td>${ent.categoria}</td>
            <td>
                <button onclick="editarEntidade('${ent.nif}')">Editar</button>
                <button class="btn-delete" onclick="apagarEntidade('${ent.nif}')">Apagar</button>
            </td>
        `;

        tbody.appendChild(tr);
    });
}

// ======================================================
//  MODAL — ADICIONAR
// ======================================================
function abrirModalAdicionar() {
    modoEdicao = null;

    document.getElementById("tituloModal").innerText = "Adicionar Entidade";
    document.getElementById("inputNIF").value = "";
    document.getElementById("inputEntidade").value = "";
    document.getElementById("inputCategoria").value = "Outros";

    document.getElementById("modalEntidade").style.display = "flex";
}

// ======================================================
//  MODAL — EDITAR
// ======================================================
async function editarEntidade(nif) {
    modoEdicao = nif;

    const ent = await obterEntidadePorNIF(nif);

    if (!ent) {
        alert("Erro: entidade não encontrada.");
        return;
    }

    document.getElementById("tituloModal").innerText = "Editar Entidade";
    document.getElementById("inputNIF").value = ent.nif;
    document.getElementById("inputEntidade").value = ent.nome;
    document.getElementById("inputCategoria").value = ent.categoria;

    document.getElementById("modalEntidade").style.display = "flex";
}

// ======================================================
//  GUARDAR ENTIDADE (ADICIONAR OU EDITAR)
// ======================================================
async function guardarEntidade() {
    const nif = document.getElementById("inputNIF").value.trim();
    const nome = document.getElementById("inputEntidade").value.trim();
    const categoria = document.getElementById("inputCategoria").value;

    if (!nif || !nome) {
        alert("Preencha todos os campos.");
        return;
    }

    await adicionarOuEditarEntidade(nif, nome, categoria);

    fecharModal();
    atualizarTabela();
}

// ======================================================
//  FECHAR MODAL
// ======================================================
function fecharModal() {
    document.getElementById("modalEntidade").style.display = "none";
}

// ======================================================
//  INICIALIZAR TABELA AO CARREGAR A PÁGINA
// ======================================================
window.onload = atualizarTabela;

// ======================================================
//  NAVEGAÇÃO
// ======================================================
function voltarFinanceiro() {
    window.location.href = "financeiro.html#custos-iva";
}
