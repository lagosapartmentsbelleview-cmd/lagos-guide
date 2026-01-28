let modoEdicao = null; // null = adicionar, "123456789" = editar NIF

// Atualiza a tabela com todas as entidades
function atualizarTabela() {
    const tbody = document.querySelector("#tabelaEntidades tbody");
    tbody.innerHTML = "";

    listarEntidades().forEach(ent => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${ent.nif}</td>
            <td>${ent.nome}</td>
            <td>${ent.categoria}</td>
            <td>
                <button class="btn-edit" onclick="editarEntidade('${ent.nif}')">Editar</button>
                <button class="btn-delete" onclick="apagarEntidade('${ent.nif}')">Apagar</button>
            </td>
        `;

        tbody.appendChild(tr);
    });
}

// Abre modal para adicionar nova entidade
function abrirModalAdicionar() {
    modoEdicao = null;

    document.getElementById("tituloModal").innerText = "Adicionar Entidade";
    document.getElementById("inputNIF").value = "";
    document.getElementById("inputNome").value = "";
    document.getElementById("inputCategoria").value = "Outros";

    document.getElementById("modalEntidade").style.display = "flex";
}

// Abre modal para editar entidade existente
function editarEntidade(nif) {
    modoEdicao = nif;
    const ent = obterEntidadePorNIF(nif);

    document.getElementById("tituloModal").innerText = "Editar Entidade";
    document.getElementById("inputNIF").value = nif;
    document.getElementById("inputNome").value = ent.nome;
    document.getElementById("inputCategoria").value = ent.categoria;

    document.getElementById("modalEntidade").style.display = "flex";
}

// Guarda entidade (nova ou editada)
function guardarEntidade() {
    const nif = document.getElementById("inputNIF").value.trim();
    const nome = document.getElementById("inputNome").value.trim();
    const categoria = document.getElementById("inputCategoria").value;

    if (!nif || !nome) {
        alert("Preencha todos os campos.");
        return;
    }

    adicionarOuEditarEntidade(nif, nome, categoria);

    fecharModal();
    atualizarTabela();
}

// Apagar entidade
function apagarEntidade(nif) {
    if (confirm("Tem a certeza que deseja apagar esta entidade?")) {
        delete entidadesPorNIF[nif];
        atualizarTabela();
    }
}

// Fecha modal
function fecharModal() {
    document.getElementById("modalEntidade").style.display = "none";
}

// Inicializa tabela ao carregar página
window.onload = atualizarTabela;
