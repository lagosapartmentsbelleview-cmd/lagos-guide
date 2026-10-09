// ============================================================
// AIMASIBA.JS — GESTÃO SIBA / AIMA VIA CLOUDFLARE WORKER
// ============================================================

// ⚠️ ALTERE APENAS ESTA URL PARA A URL REAL DO SEU CLOUDFLARE WORKER
const CLOUDFLARE_WORKER_URL = "https://enviar-siba.lagosapartmentsbelleview.workers.dev/";

const SIBA_STORAGE_KEY = "belleview_boletins_siba";

// ============================================================
// 1. GUARDAR BOLETIM LOCALMENTE (Chamada do aimatest.js)
// ============================================================
function guardarBoletimPendente(dadosFormulario) {
  const lista = obterBoletinsSiba();
  
  const novoBoletim = {
    id: "BOL-" + Date.now(),
    dataRececao: new Date().toISOString(),
    estado: "PENDENTE", // PENDENTE, SUBMETIDO_WS, ERRO_WS, DESCARREGADO_XML
    apartamento: null,  // "2301", "2203", "2204" (ou "0", "1", "2")
    respostaWebService: null,
    dados: dadosFormulario
  };

  lista.push(novoBoletim);
  localStorage.setItem(SIBA_STORAGE_KEY, JSON.stringify(lista));
  return novoBoletim;
}

// ============================================================
// 2. ENVIAR VIA WEBSERVICE (CLOUDFLARE WORKER)
// ============================================================
async function enviarParaSibaWebService(idBoletim, aptNum) {
  const boletim = obterBoletimPorId(idBoletim);
  if (!boletim) {
    alert("Boletim não encontrado!");
    return;
  }

  const aptValido = String(aptNum).trim();
  if (!["2301", "2203", "2204", "0", "1", "2"].includes(aptValido)) {
    alert("Selecione um apartamento válido (2301, 2203 ou 2204).");
    return;
  }

  try {
    const response = await fetch(CLOUDFLARE_WORKER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        unidade: aptValido,
        boletim: boletim.dados
      })
    });

    const resultado = await response.json();

    if (response.ok && resultado.success) {
      atualizarEstadoBoletim(idBoletim, {
        estado: "SUBMETIDO_WS",
        apartamento: aptValido,
        respostaWebService: resultado.mensagem || resultado.respostaSibaRaw,
        ambiente: resultado.modo || "TESTE (bawsdev)"
      });
      alert(`[${resultado.modo || 'TESTE'}] Enviado com sucesso!\n\nResposta SIBA: ${resultado.mensagem}`);
    } else {
      const msgErro = resultado.mensagem || resultado.message || "Erro de validação no servidor do SIBA";
      atualizarEstadoBoletim(idBoletim, { 
        estado: "ERRO_WS", 
        respostaWebService: msgErro 
      });
      alert(`Erro na submissão ao SIBA (${response.status}):\n${msgErro}`);
    }
  } catch (error) {
    console.error("Erro na comunicação com o Cloudflare Worker:", error);
    alert("Falha de rede ao contactar o servidor Cloudflare Worker.");
  }
}

// ============================================================
// 3. DESCARREGAR XML MANUALMENTE (OPÇÃO DE BACKUP)
// ============================================================
function descarregarXmlSibaManual(idBoletim, aptNum) {
  const boletim = obterBoletimPorId(idBoletim);
  if (!boletim) {
    alert("Boletim não encontrado!");
    return;
  }

  const docTypes = { passport: "P", id: "I", other: "O" };

  let xml = `<?xml version="1.0" encoding="utf-8"?>\n<Boletins>\n`;
  (boletim.dados.hospedes || []).forEach((h) => {
    xml += `  <Boletim>\n`;
    xml += `    <Nome>${escapeXml(h.nome)}</Nome>\n`;
    xml += `    <DataNascimento>${h.dataNascimento}</DataNascimento>\n`;
    xml += `    <Nacionalidade>${escapeXml(h.nacionalidade)}</Nacionalidade>\n`;
    xml += `    <PaisResidencia>${escapeXml(h.paisResidencia)}</PaisResidencia>\n`;
    xml += `    <TipoDocumento>${docTypes[h.docTipo] || "O"}</TipoDocumento>\n`;
    xml += `    <NumeroDocumento>${escapeXml(h.docNumero)}</NumeroDocumento>\n`;
    xml += `    <PaisEmissor>${escapeXml(h.docPaisEmissor)}</PaisEmissor>\n`;
    xml += `    <DataEntrada>${boletim.dados.dataCheckin}</DataEntrada>\n`;
    xml += `    <DataSaida>${boletim.dados.dataCheckout}</DataSaida>\n`;
    xml += `  </Boletim>\n`;
  });
  xml += `</Boletins>`;

  atualizarEstadoBoletim(idBoletim, {
    estado: "DESCARREGADO_XML",
    apartamento: String(aptNum)
  });

  const blob = new Blob([xml], { type: "application/xml;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `BAL_Apto${aptNum}_${boletim.id}.xml`;
  a.click();
}

// ============================================================
// 4. AUXILIARES E LOCAL STORAGE
// ============================================================
function escapeXml(str) {
  return str ? String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;") : "";
}

function obterBoletinsSiba() {
  return JSON.parse(localStorage.getItem(SIBA_STORAGE_KEY) || "[]");
}

function obterBoletimPorId(id) {
  return obterBoletinsSiba().find(b => b.id === id);
}

function atualizarEstadoBoletim(id, alteracoes) {
  let lista = obterBoletinsSiba();
  const index = lista.findIndex(b => b.id === id);
  if (index !== -1) {
    lista[index] = { ...lista[index], ...alteracoes, dataAtualizacao: new Date().toISOString() };
    localStorage.setItem(SIBA_STORAGE_KEY, JSON.stringify(lista));
  }
}
