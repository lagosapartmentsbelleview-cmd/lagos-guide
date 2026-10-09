// ============================================================
// AIMASIBA.JS — GESTÃO SIBA / AIMA (WEB SERVICE WORKER + XML + CRUD)
// ============================================================

const CLOUDFLARE_WORKER_URL = "https://enviar-siba.lagosapartmentsbelleview.workers.dev";
const SIBA_STORAGE_KEY = "belleview_boletins_siba";

const SIBA_CONFIG = {
  modoTeste: true,
  apartamentos: {
    "0": { nome: "Apartamento 0", al: "26313/AL", codigoWorker: "2301" },
    "1": { nome: "Apartamento 1", al: "116670/AL", codigoWorker: "2203" },
    "2": { nome: "Apartamento 2", al: "116671/AL", codigoWorker: "2204" }
  }
};

// ============================================================
// DICIONÁRIO DE CONVERSÃO ISO-3 PARA AIMA/SIBA
// ============================================================
const iso3Lookup = {
  "portugal": "PRT", "portogallo": "PRT",
  "espanha": "ESP", "spain": "ESP", "españa": "ESP", "espagne": "ESP", "spagna": "ESP", "spanien": "ESP",
  "frança": "FRA", "france": "FRA", "francia": "FRA", "frankreich": "FRA",
  "alemanha": "DEU", "germany": "DEU", "allemagne": "DEU", "alemania": "DEU", "germania": "DEU", "deutschland": "DEU",
  "reino unido": "GBR", "united kingdom": "GBR", "royaume-uni": "GBR", "regno unito": "GBR", "großbritannien": "GBR", "uk": "GBR",
  "estados unidos": "USA", "united states": "USA", "états-unis": "USA", "stati uniti": "USA", "usa": "USA",
  "itália": "ITA", "italy": "ITA", "italie": "ITA", "italien": "ITA",
  "países baixos": "NLD", "netherlands": "NLD", "pays-bas": "NLD", "niederlande": "NLD", "holanda": "NLD",
  "bélgica": "BEL", "belgium": "BEL", "belgique": "BEL", "belgio": "BEL", "belgien": "BEL",
  "suíça": "CHE", "switzerland": "CHE", "suisse": "CHE", "suiza": "CHE", "svizzera": "CHE", "schweiz": "CHE",
  "irlanda": "IRL", "ireland": "IRL", "irlande": "IRL", "irland": "IRL",
  "brasil": "BRA", "brazil": "BRA", "brésil": "BRA", "brasile": "BRA", "brasilien": "BRA",
  "canadá": "CAN", "canada": "CAN", "kanada": "CAN",
  "polónia": "POL", "poland": "POL", "pologne": "POL", "polonia": "POL", "polen": "POL",
  "bhutan": "BTN", "bhoutan": "BTN", "butão": "BTN", "bután": "BTN",
  "bolivia": "BOL", "bolívia": "BOL", "bolivie": "BOL",
  "áustria": "AUT", "austria": "AUT", "autriche": "AUT", "österreich": "AUT",
  "dinamarca": "DNK", "denmark": "DNK", "danemark": "DNK", "dänemark": "DNK",
  "suécia": "SWE", "sweden": "SWE", "suède": "SWE", "suecia": "SWE", "svezia": "SWE", "schweden": "SWE",
  "noruega": "NOR", "norway": "NOR", "norvège": "NOR", "norvegia": "NOR", "norwegen": "NOR",
  "finlândia": "FIN", "finland": "FIN", "finlande": "FIN", "finlandia": "FIN", "finnland": "FIN"
};

function converterParaIso3(paisTexto) {
  if (!paisTexto) return "PRT";
  const p = String(paisTexto).trim();
  if (/^[A-Z]{3}$/.test(p)) return p;
  const pLower = p.toLowerCase();
  return iso3Lookup[pLower] || "PRT";
}

function converterTipoDoc(docTipo) {
  if (!docTipo) return "P";
  const d = String(docTipo).toLowerCase();
  if (d.includes("pass") || d === "p" || d === "passport") return "P";
  if (d.includes("id") || d.includes("cidad") || d.includes("bi") || d === "i") return "I";
  return "O";
}

function converterDataIso(dataStr) {
  if (!dataStr) return "";
  const str = String(dataStr).trim();
  if (/^\d{2}[\/\-]\d{2}[\/\-]\d{4}$/.test(str)) {
    const parts = str.split(/[\/\-]/);
    return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
  }
  return str;
}

// ============================================================
// 2. FUNÇÃO PARA GUARDAR COMO PENDENTE (Chamada do aimatest.js)
// ============================================================
function guardarBoletimPendente(dadosFormulario) {
  const lista = obterBoletinsSiba();
  
  const novoBoletim = {
    id: "BOL-" + Date.now(),
    dataRececao: new Date().toISOString(),
    estado: "PENDENTE",
    apartamento: null,
    respostaWebService: null,
    dados: dadosFormulario
  };

  lista.push(novoBoletim);
  localStorage.setItem(SIBA_STORAGE_KEY, JSON.stringify(lista));
  return novoBoletim;
}

// ============================================================
// 3. OPERAÇÕES DE SUBMISSÃO (WEB SERVICE WORKER + XML MANUAL)
// ============================================================

async function enviarParaSibaWebService(idBoletim, aptNum) {
  const boletim = obterBoletimPorId(idBoletim);
  if (!validarSelecaoApartamento(boletim, aptNum)) return;

  const aptInfo = SIBA_CONFIG.apartamentos[String(aptNum)];
  const aptCodigo = aptInfo ? aptInfo.codigoWorker : "2301";

  // Prepara e normaliza os dados especificamente para o WebService da AIMA
  const hospedesNormalizados = (boletim.dados.hospedes || []).map(h => ({
    nome: h.nome || "",
    dataNascimento: converterDataIso(h.dataNascimento),
    nacionalidade: converterParaIso3(h.nacionalidade),
    paisResidencia: converterParaIso3(h.paisResidencia),
    docTipo: converterTipoDoc(h.docTipo),
    docNumero: h.docNumero || "",
    docOutroDesc: h.docOutroDesc || "",
    docPaisEmissor: converterParaIso3(h.docPaisEmissor)
  }));

  const payload = {
    apartamento: aptCodigo,
    dataCheckin: converterDataIso(boletim.dados.dataCheckin),
    dataCheckout: converterDataIso(boletim.dados.dataCheckout),
    numAdultos: parseInt(boletim.dados.numAdultos || 1, 10),
    numCriancas: parseInt(boletim.dados.numCriancas || 0, 10),
    emailCliente: boletim.dados.emailCliente || "",
    hospedes: hospedesNormalizados
  };

  console.log("A enviar para o Cloudflare Worker:", payload);

  try {
    const response = await fetch(CLOUDFLARE_WORKER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const resultado = await response.json();
    console.log("Resposta SIBA/Worker:", resultado);

    if (resultado.success) {
      atualizarEstadoBoletim(idBoletim, {
        estado: "SUBMETIDO_WS",
        apartamento: String(aptNum),
        respostaWebService: JSON.stringify(resultado),
        ambiente: resultado.modo || "TESTE"
      });
      alert(`[${resultado.modo || 'TESTE'}] Boletim enviado com sucesso via Web Service para ${aptInfo.nome}!`);
    } else {
      atualizarEstadoBoletim(idBoletim, { estado: "ERRO_WS", respostaWebService: JSON.stringify(resultado) });
      alert(`Erro no SIBA: ${resultado.mensagem || "Erro no envio"}`);
    }
  } catch (error) {
    console.error("Erro na comunicação com o Worker:", error);
    alert("Falha de rede ao contactar o servidor do SIBA via Worker.");
  }
}

function descarregarXmlSibaManual(idBoletim, aptNum) {
  const boletim = obterBoletimPorId(idBoletim);
  if (!validarSelecaoApartamento(boletim, aptNum)) return;

  const aptInfo = SIBA_CONFIG.apartamentos[String(aptNum)];
  const xmlContent = gerarXmlSiba(boletim.dados, aptInfo.al);

  atualizarEstadoBoletim(idBoletim, {
    estado: "DESCARREGADO_XML",
    apartamento: String(aptNum)
  });

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
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<BoletinsAlojamento>\n`;
  xml += `  <Estabelecimento>${registoAL}</Estabelecimento>\n`;

  (dados.hospedes || []).forEach((h) => {
    xml += `  <Boletim>\n`;
    xml += `    <Nome>${escapeXml(h.nome)}</Nome>\n`;
    xml += `    <DataNascimento>${converterDataIso(h.dataNascimento)}</DataNascimento>\n`;
    xml += `    <Nacionalidade>${converterParaIso3(h.nacionalidade)}</Nacionalidade>\n`;
    xml += `    <PaisResidencia>${converterParaIso3(h.paisResidencia)}</PaisResidencia>\n`;
    xml += `    <TipoDocumento>${converterTipoDoc(h.docTipo)}</TipoDocumento>\n`;
    xml += `    <NumeroDocumento>${escapeXml(h.docNumero)}</NumeroDocumento>\n`;
    xml += `    <PaisEmissor>${converterParaIso3(h.docPaisEmissor)}</PaisEmissor>\n`;
    xml += `    <DataEntrada>${converterDataIso(dados.dataCheckin)}</DataEntrada>\n`;
    xml += `    <DataSaida>${converterDataIso(dados.dataCheckout)}</DataSaida>\n`;
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
