// =====================================
//  BASE DE DADOS LOCAL: ENTIDADES POR NIF
// =====================================

const entidadesPorNIF = {
    "505170876": { nome: "Município de Lagos", categoria: "Água" },
    "500294308": { nome: "Veiga & Seabra S A", categoria: "Combustível" },

    // Exemplos já processados
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

// =====================================
//  FUNÇÕES PRINCIPAIS
// =====================================

// Obter entidade por NIF
function obterEntidadePorNIF(nif) {
    const entidade = entidadesPorNIF[nif];
    if (!entidade) {
        return { nome: "Fornecedor Desconhecido", categoria: "Outros" };
    }
    return entidade;
}

// Adicionar ou editar entidade
function adicionarOuEditarEntidade(nif, nome, categoria) {
    entidadesPorNIF[nif] = { nome, categoria };
}

// Listar entidades (para o CRUD)
function listarEntidades() {
    return Object.entries(entidadesPorNIF).map(([nif, dados]) => ({
        nif,
        nome: dados.nome,
        categoria: dados.categoria
    }));
}

carregarEntidades();

function carregarEntidades() {
    // TODO: carregar tabela de entidades
}

function formatarNIF(nif) {
    return nif; // placeholder
}


// Navegação
function voltarFinanceiro() {
    window.location.href = "financeiro.html#custos-iva";
}

