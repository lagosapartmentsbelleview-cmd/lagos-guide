// =====================================
//  IMPORTAÇÃO TEMPORÁRIA DE ENTIDADES ANTIGAS
//  (apenas para migração para Firestore)
// =====================================

const entidadesAntigas = {
    "505170876": { nome: "Município de Lagos", categoria: "Água" },
    "500294308": { nome: "Veiga & Seabra S A", categoria: "Combustível" },
    "516222201": { nome: "Digi Portugal, Lda", categoria: "Telecomunicações" },
    "514702214": { nome: "Petromonserrate Sociedade Unipessoal Lda", categoria: "Combustível" },
    "510359612": { nome: "Brico Depot Portugal S A", categoria: "Bricolage" },
    "506848558": { nome: "BCM Bricolage S A", categoria: "Bricolage" },
    "503603300": { nome: "Worten", categoria: "Equipamentos" },
    "503504564": { nome: "EDP Comercial", categoria: "Energia" },
    "502544180": { nome: "Vodafone Portugal", categoria: "Telecomunicações" },
    "500892378": { nome: "Pingo Doce", categoria: "Alimentação" },
    "503738301": { nome: "Airoferragens", categoria: "Ferragens" },
    "504290789": { nome: "Evag Materiais de Construção", categoria: "Construção" },
    "505416654": { nome: "IKEA Portugal", categoria: "Mobiliário" },
    "509689014": { nome: "Esfera Vaidosa", categoria: "Cosmética" },
    "500417091": { nome: "Representações Belta", categoria: "Comércio Geral" },
    "503062081": { nome: "NOWO Communications", categoria: "Telecomunicações" },
    "513972357": { nome: "JYSK", categoria: "Mobiliário" },
    "507854551": { nome: "Espaço Casa", categoria: "Decoração" },
    "507875225": { nome: "PRIO Energy", categoria: "Combustível" },
    "514819200": { nome: "VPA Sociedade de Advogados", categoria: "Serviços" },
    "512667979": { nome: "ARM Combustíveis", categoria: "Combustível" },
    "508798481": { nome: "Bocca Lupo", categoria: "Restauração" },
    "503107086": { nome: "Município de Lagos", categoria: "Água" },
    "503320030": { nome: "Worten", categoria: "Equipamentos" },
    "503769995": { nome: "Gespost", categoria: "Combustível" },
    "503471144": { nome: "Manuel Afonso & Gomes", categoria: "Construção" },
    "510929400": { nome: "Simple Home", categoria: "Decoração" },
    "513240258": { nome: "Afonso & Zambujo", categoria: "Construção" },
    "512422408": { nome: "Afonso & Zambujo", categoria: "Construção" },
    "514881887": { nome: "La Casa de Las Carcasas", categoria: "Acessórios" },
    "503504549": { nome: "Petrosalsa", categoria: "Combustível" }
};

async function importarEntidadesAntigas() {
    console.log("🚀 A iniciar importação de entidades antigas...");

    let contador = 0;

    for (const [nif, dados] of Object.entries(entidadesAntigas)) {
        const nifLimpo = String(nif).trim().replace(/\D/g, "");

        await db.collection("entidades").doc(nifLimpo).set({
            nif: nifLimpo,
            nome: dados.nome,
            categoria: dados.categoria
        });

        console.log(`✅ Gravado: ${nifLimpo} — ${dados.nome}`);
        contador++;
    }

    console.log(`🎉 Importação concluída. Total: ${contador} entidades.`);
    alert(`Importação concluída. Foram gravadas ${contador} entidades no Firestore.`);
}


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
