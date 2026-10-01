// ============================================================
// AIMASIBA.JS — GESTÃO SIBA / AIMA (WEB SERVICE + XML + CRUD)
// ============================================================

// 1. CONFIGURAÇÃO DE AMBIENTE E APARTAMENTOS
const SIBA_CONFIG = {
  // Alterar para false quando passar para Produção
  modoTeste: true, 

  // URLs do Web Service SIBA
  endpoints: {
    teste: "https://ws.siba.sef.pt/testes/endpoint",    // Endpoint de Homologação/Testes
    producao: "https://ws.siba.sef.pt/producao/endpoint" // Endpoint Oficial de Produção
  },

  // Configuração dos 3 Registos AL (Apartamentos 0, 1 e 2)
  apartamentos: {
    "0": {
      nome: "Apartamento 0",
      al: "26313/AL",
      chaveTeste: "CHAVE_TESTE_APT0",
      chaveProducao: "CHAVE_PRODUCAO_APT0"
    },
    "1": {
      nome: "Apartamento 1",
      al: "116670/AL",
      chaveTeste: "CHAVE_TESTE_APT1",
      chaveProducao: "CHAVE_PRODUCAO_APT1"
    },
    "2": {
      nome: "Apartamento 2",
      al: "116671/AL",
      chaveTeste: "CHAVE_TESTE_APT2",
      chaveProducao: "CHAVE_PRODUCAO_APT2"
    }
  }
};

const SIBA_STORAGE_KEY = "belleview_boletins_siba";

// ============================================================
// 2. FUNÇÃO PARA GUARDAR COMO PENDENTE (Chamada do aimatest.js)
// ============================================================
function guardarBoletimPendente(dadosFormulario) {
  const lista = obterBoletinsSiba();
  
  const novoBoletim = {
    id: "BOL-" + Date.now(),
    dataRececao: new Date().toISOString(),
    estado: "PENDENTE", // PENDENTE, SUBMETIDO_WS, ERRO_WS, DESCARREGADO_XML
    apartamento: null,  // 0, 1 ou 2
    respostaWebService: null,
    dados: dadosFormulario
  };

  lista.push(novoBoletim);
  localStorage.setItem(SIBA_STORAGE_KEY, JSON.stringify(lista));
  return novoBoletim;
}

// ============================================================
// 3. OPERAÇÕES DE SUBMISSÃO (OPÇÃO A: WEB SERVICE | OPÇÃO B: XML)
// ============================================================

/**
 * OPÇÃO A: Enviar diretamente para o Web Service do SIBA
 */
async function enviarParaSibaWebService(idBoletim, aptNum) {
  const boletim = obterBoletimPorId(idBoletim);
  if (!validarSelecaoApartamento(boletim, aptNum)) return;

  const aptInfo = SIBA_CONFIG.apartamentos[String(aptNum)];
  const isTeste = SIBA_CONFIG.modoTeste;
  const endpoint = isTeste ? SIBA_CONFIG.endpoints.teste : SIBA_CONFIG.endpoints.producao;
  const chaveAcesso = isTeste ? aptInfo.chaveTeste : aptInfo.chaveProducao;

  const xmlContent = gerarXmlSiba(boletim.dados, aptInfo.al);

  try {
    // Chamada ao Web Service
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/xml",
        "Authorization": "Bearer " + chaveAcesso
      },
      body: xmlContent
    });

    const resultadoTexto = await response.text();

    if (response.ok) {
      atualizarEstadoBoletim(idBoletim, {
        estado: "SUBMETIDO_WS",
        apartamento: String(aptNum),
        respostaWebService: resultadoTexto,
        ambiente: isTeste ? "TESTE" : "PRODUCAO"
      });
      alert(`[${isTeste ? 'TESTE' : 'PRODUÇÃO'}] Boletim enviado com sucesso via Web Service para ${aptInfo.nome}!`);
    } else {
      atualizarEstadoBoletim(idBoletim, { estado: "ERRO_WS", respostaWebService: resultadoTexto });
      alert(`Erro no Web Service (${response.status}): ${resultadoTexto}`);
    }
  } catch (error) {
    console.error("Erro na comunicação com SIBA:", error);
    alert("Falha de rede ao contactar o Web Service do SIBA.");
  }
}

/**
 * OPÇÃO B: Descarregar apenas o ficheiro XML (Submissão Manual)
 */
function descarregarXmlSibaManual(idBoletim, aptNum) {
  const boletim = obterBoletimPorId(idBoletim);
  if (!validarSelecaoApartamento(boletim, aptNum)) return;

  const aptInfo = SIBA_CONFIG.apartamentos[String(aptNum)];
  const xmlContent = gerarXmlSiba(boletim.dados, aptInfo.al);

  atualizarEstadoBoletim(idBoletim, {
    estado: "DESCARREGADO_XML",
    apartamento: String(aptNum)
  });

  // Download do ficheiro
  const blob = new Blob([xmlContent], { type: "application/xml" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `SIBA_Apt${aptNum}_${aptInfo.al.replace('/','-')}_${boletim.id}.xml`;
  a.click();
}

// ============================================================
// 4. AUXILIARES E GERADOR XML
// ============================================================
function gerarXmlSiba(dados, registoAL) {
  const docTypes = { passport: "P", id: "I", other: "O" };

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<BoletinsAlojamento>\n`;
  xml += `  <Estabelecimento>${registoAL}</Estabelecimento>\n`;

  dados.hospedes.forEach((h) => {
    xml += `  <Boletim>\n`;
    xml += `    <Nome>${escapeXml(h.nome)}</Nome>\n`;
    xml += `    <DataNascimento>${h.dataNascimento}</DataNascimento>\n`;
    xml += `    <Nacionalidade>${escapeXml(h.nacionalidade)}</Nacionalidade>\n`;
    xml += `    <PaisResidencia>${escapeXml(h.paisResidencia)}</PaisResidencia>\n`;
    xml += `    <TipoDocumento>${docTypes[h.docTipo] || "O"}</TipoDocumento>\n`;
    xml += `    <NumeroDocumento>${escapeXml(h.docNumero)}</NumeroDocumento>\n`;
    xml += `    <PaisEmissor>${escapeXml(h.docPaisEmissor)}</PaisEmissor>\n`;
    xml += `    <DataEntrada>${dados.dataCheckin}</DataEntrada>\n`;
    xml += `    <DataSaida>${dados.dataCheckout}</DataSaida>\n`;
    xml += `  </Boletim>\n`;
  });

  xml += `</BoletinsAlojamento>`;
  return xml;
}

function escapeXml(str) {
  return str ? String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") : "";
}

function obterBoletinsSiba() {
  return JSON.parse(localStorage.getItem(SIBA_STORAGE_KEY) || "[]");
}

function obterBoletimPorId(id) {
  return obterBoletinsSiba().find(b => b.id === id);
}

function validarSelecaoApartamento(boletim, aptNum) {
  if (!boletim) { alert("Boletim não encontrado!"); return false; }
  if (!["0", "1", "2"].includes(String(aptNum))) {
    alert("Selecione um Apartamento válido (0, 1 ou 2).");
    return false;
  }
  return true;
}

function atualizarEstadoBoletim(id, alteracoes) {
  let lista = obterBoletinsSiba();
  const index = lista.findIndex(b => b.id === id);
  if (index !== -1) {
    lista[index] = { ...lista[index], ...alteracoes, dataAtualizacao: new Date().toISOString() };
    localStorage.setItem(SIBA_STORAGE_KEY, JSON.stringify(lista));
  }
}
