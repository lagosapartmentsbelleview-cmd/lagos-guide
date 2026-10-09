// ============================================================
// AIMASIBA.JS — INTEGRAÇÃO INTEGRAL COM CLOUDFLARE WORKER & SIBA
// ============================================================

// 1. CONFIGURAÇÃO DA URL PÚBLICA DO CLOUDFLARE WORKER
const CLOUDFLARE_WORKER_URL = "https://enviar-siba.lagosapartmentsbelleview.workers.dev";

// ============================================================
// 2. DICIONÁRIO COMPLETO ISO-3 (ISO 3166-1 ALPHA-3)
// ============================================================
const iso3Map = {
  // A
  "afghanistan": "AFG", "afeganistão": "AFG",
  "albania": "ALB", "albânia": "ALB",
  "algeria": "DZA", "argélia": "DZA",
  "andorra": "AND",
  "angola": "AGO",
  "argentina": "ARG",
  "armenia": "ARM", "arménia": "ARM",
  "australia": "AUS", "austrália": "AUS",
  "austria": "AUT", "áustria": "AUT",
  // B
  "bahamas": "BHS", "bangladesh": "BGD", "barbados": "BRB",
  "belgium": "BEL", "bélgica": "BEL", "belgique": "BEL", "belgien": "BEL",
  "belize": "BLZ", "benin": "BEN", "benim": "BEN",
  "bhutan": "BTN", "butão": "BTN",
  "bolivia": "BOL", "bolívia": "BOL",
  "bosnia and herzegovina": "BIH", "bósnia e herzegovina": "BIH",
  "botswana": "BWA", "botsuana": "BWA",
  "brazil": "BRA", "brasil": "BRA", "brésil": "BRA", "brasilien": "BRA",
  "bulgaria": "BGR", "bulgária": "BGR",
  // C
  "canada": "CAN", "canadá": "CAN",
  "cape verde": "CPV", "cabo verde": "CPV",
  "chile": "CHL", "china": "CHN", "colombia": "COL", "colômbia": "COL",
  "costa rica": "CRI", "croatia": "HRV", "croácia": "HRV",
  "cuba": "CUB", "cyprus": "CYP", "chipre": "CYP",
  "czech republic": "CZE", "república checa": "CZE", "czechia": "CZE",
  // D
  "denmark": "DNK", "dinamarca": "DNK",
  "dominican republic": "DOM", "república dominicana": "DOM",
  // E
  "ecuador": "ECU", "equador": "ECU",
  "egypt": "EGY", "egipto": "EGY", "egito": "EGY",
  "estonia": "EST", "estónia": "EST",
  "ethiopia": "ETH", "etiópia": "ETH",
  // F
  "finland": "FIN", "finlândia": "FIN",
  "france": "FRA", "frança": "FRA", "francia": "FRA", "frankreich": "FRA",
  // G
  "georgia": "GEO", "geórgia": "GEO",
  "germany": "DEU", "alemanha": "DEU", "allemagne": "DEU", "deutschland": "DEU",
  "greece": "GRC", "grécia": "GRC", "guatemala": "GTM",
  // H
  "haiti": "HTI", "honduras": "HND", "hungary": "HUN", "hungria": "HUN",
  // I
  "iceland": "ISL", "islândia": "ISL",
  "india": "IND", "índia": "IND",
  "indonesia": "IDN", "indonésia": "IDN",
  "iran": "IRN", "irão": "IRN", "iraq": "IRQ", "iraque": "IRQ",
  "ireland": "IRL", "irlanda": "IRL", "israel": "ISR",
  "italy": "ITA", "itália": "ITA", "italie": "ITA", "italien": "ITA",
  "ivory coast": "CIV", "costa do marfim": "CIV",
  // J
  "jamaica": "JAM", "japan": "JPN", "japão": "JPN", "jordan": "JOR", "jordânia": "JOR",
  // K
  "kazakhstan": "KAZ", "cazaquistão": "KAZ", "kenya": "KEN", "quénia": "KEN",
  "kuwait": "KWT", "koweit": "KWT",
  // L
  "latvia": "LVA", "letónia": "LVA", "lebanon": "LBN", "líbano": "LBN",
  "lithuania": "LTU", "lituânia": "LTU", "luxembourg": "LUX", "luxemburgo": "LUX",
  // M
  "madagascar": "MDG", "madagáscar": "MDG", "malaysia": "MYS", "malásia": "MYS",
  "maldives": "MDV", "maldivas": "MDV", "malta": "MLT",
  "mexico": "MEX", "méxico": "MEX", "moldova": "MDA", "moldávia": "MDA",
  "monaco": "MCO", "mónaco": "MCO", "montenegro": "MNE",
  "morocco": "MAR", "marrocos": "MAR", "mozambique": "MOZ", "moçambique": "MOZ",
  // N
  "nepal": "NPL",
  "netherlands": "NLD", "países baixos": "NLD", "holanda": "NLD", "pays-bas": "NLD", "niederlande": "NLD",
  "new zealand": "NZL", "nova zelândia": "NZL", "nicaragua": "NIC", "nicarágua": "NIC",
  "nigeria": "NGA", "nigéria": "NGA", "north macedonia": "MKD", "macedónia do norte": "MKD",
  "norway": "NOR", "noruega": "NOR",
  // O
  "oman": "OMN", "omã": "OMN",
  // P
  "pakistan": "PAK", "paquistão": "PAK", "panama": "PAN", "panamá": "PAN",
  "paraguay": "PRY", "paraguai": "PRY", "peru": "PER", "philippines": "PHL", "filipinas": "PHL",
  "poland": "POL", "polónia": "POL", "pologne": "POL", "polonia": "POL", "polen": "POL",
  "portugal": "PRT", "portogallo": "PRT",
  // Q
  "qatar": "QAT", "catar": "QAT",
  // R
  "romania": "ROU", "roménia": "ROU", "russia": "RUS", "rússia": "RUS",
  // S
  "saudi arabia": "SAU", "arábia saudita": "SAU", "senegal": "SEN", "serbia": "SRB", "sérvia": "SRB",
  "singapore": "SGP", "singapura": "SGP", "slovakia": "SVK", "eslováquia": "SVK",
  "slovenia": "SVN", "eslovénia": "SVN", "south africa": "ZAF", "áfrica do sul": "ZAF",
  "south korea": "KOR", "coreia do sul": "KOR",
  "spain": "ESP", "espanha": "ESP", "españa": "ESP", "espagne": "ESP", "spanien": "ESP", "spagna": "ESP",
  "sri lanka": "LKA", "sweden": "SWE", "suécia": "SWE", "suède": "SWE", "suecia": "SWE", "schweden": "SWE",
  "switzerland": "CHE", "suíça": "CHE", "suisse": "CHE", "suiza": "CHE", "schweiz": "CHE",
  // T
  "taiwan": "TWN", "thailand": "THA", "tailândia": "THA", "tunisia": "TUN", "tunísia": "TUN",
  "turkey": "TUR", "turquia": "TUR",
  // U
  "ukraine": "UKR", "ucrânia": "UKR", "united arab emirates": "ARE", "emirados árabes unidos": "ARE",
  "united kingdom": "GBR", "reino unido": "GBR", "royaume-uni": "GBR", "regno unito": "GBR", "großbritannien": "GBR", "uk": "GBR",
  "united states": "USA", "estados unidos": "USA", "états-unis": "USA", "stati uniti": "USA", "usa": "USA", "us": "USA",
  "uruguay": "URY", "uruguai": "URY", "uzbekistan": "UZB", "uzbequistão": "UZB",
  // V
  "venezuela": "VEN", "vietnam": "VNM", "vietname": "VNM",
  // Z
  "zambia": "ZMB", "zâmbia": "ZMB", "zimbabwe": "ZWE", "zimbabué": "ZWE"
};

// ============================================================
// 3. FUNÇÕES AUXILIARES DE NORMALIZAÇÃO
// ============================================================

// Normaliza nomes de país para códigos ISO-3 de 3 letras
function normalizarIso3(paisTexto) {
  if (!paisTexto) return "PRT";
  const p = String(paisTexto).trim();
  
  // Se já for um código ISO-3 válido de 3 letras maiúsculas
  if (/^[A-Z]{3}$/.test(p)) return p;
  
  const pLower = p.toLowerCase();
  if (iso3Map[pLower]) return iso3Map[pLower];

  // Tenta extrair código se estiver no formato "Portugal (PRT)" ou "PRT - Portugal"
  const match = p.match(/\b([A-Za-z]{3})\b/);
  if (match && match[1].toUpperCase() in Object.values(iso3Map)) {
    return match[1].toUpperCase();
  }

  return "PRT"; // Fallback por defeito
}

// Normaliza o Tipo de Documento para P, I ou O
function normalizarTipoDocumento(docTipo) {
  if (!docTipo) return "P";
  const str = String(docTipo).trim().toLowerCase();
  if (str.includes("pass") || str === "p" || str.includes("(p)")) return "P";
  if (str.includes("id") || str.includes("cidad") || str.includes("bi") || str === "i" || str.includes("(i)")) return "I";
  if (str.includes("outr") || str.includes("other") || str === "o" || str.includes("(o)")) return "O";
  return "P";
}

// Normaliza datas para o formato estrito AAAA-MM-DD
function normalizarDataIso(dataStr) {
  if (!dataStr) return "";
  const str = String(dataStr).trim();

  // Formato DD/MM/AAAA ou DD-MM-AAAA
  if (/^\d{2}[\/\-]\d{2}[\/\-]\d{4}$/.test(str)) {
    const parts = str.split(/[\/\-]/);
    return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
  }
  // Formato AAAA-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(str)) {
    return str;
  }
  // Tentar parse nativo
  const d = new Date(str);
  if (!isNaN(d.getTime())) {
    return d.toISOString().split("T")[0];
  }
  return str;
}

// Normaliza o código de apartamento
function normalizarApartamento(apt) {
  if (!apt) return "2301";
  const str = String(apt).trim().toUpperCase();
  if (str.includes("2301") || str.includes("0BELLEVIEW") || str === "1") return "2301";
  if (str.includes("2203") || str.includes("1BELLEVIEW") || str === "2") return "2203";
  if (str.includes("2204") || str.includes("2BELLEVIEW") || str === "3") return "2204";
  return apt;
}

// ============================================================
// 4. GESTÃO DO LOCALSTORAGE
// ============================================================
function obterBoletinsSiba() {
  try {
    const dados = localStorage.getItem("boletinsSiba");
    return dados ? JSON.parse(dados) : [];
  } catch (e) {
    console.error("Erro ao ler LocalStorage:", e);
    return [];
  }
}

function guardarBoletinsSiba(boletins) {
  try {
    localStorage.setItem("boletinsSiba", JSON.stringify(boletins));
  } catch (e) {
    console.error("Erro ao guardar LocalStorage:", e);
  }
}

function guardarBoletimPendente(boletim) {
  const boletins = obterBoletinsSiba();
  if (!boletim.id) {
    boletim.id = "BOL-" + Date.now();
  }
  boletins.unshift(boletim);
  guardarBoletinsSiba(boletins);
  return boletim;
}

// ============================================================
// 5. ENVIO PRINCIPAL PARA O CLOUDFLARE WORKER & AIMA SIBA
// ============================================================
async function enviarParaSibaWebService(idOuBoletim, apartamentoInput) {
  let boletim = null;
  let boletins = obterBoletinsSiba();

  if (typeof idOuBoletim === "object" && idOuBoletim !== null) {
    boletim = idOuBoletim;
  } else if (typeof idOuBoletim === "string") {
    boletim = boletins.find(b => b.id === idOuBoletim || b.idBoletim === idOuBoletim || String(b.criadoEm) === idOuBoletim);
  }

  // Se não encontrou por ID, assume o primeiro pendente
  if (!boletim && boletins.length > 0) {
    boletim = boletins[0];
  }

  if (!boletim) {
    alert("⚠️ Nenhum boletim encontrado para enviar.");
    return { success: false, mensagem: "Boletim não encontrado" };
  }

  // Código do apartamento
  const aptoCodigo = normalizarApartamento(apartamentoInput || boletim.apartamento || boletim.alojamento || "2301");

  // Normalizar todos os hóspedes estritamente para as regras AIMA/SIBA
  const hospedesNormalizados = (boletim.hospedes || []).map(h => ({
    nome: String(h.nome || h.fullName || "").trim(),
    dataNascimento: normalizarDataIso(h.dataNascimento || h.birthDate),
    nacionalidade: normalizarIso3(h.nacionalidade || h.nationality),
    paisResidencia: normalizarIso3(h.paisResidencia || h.residenceCountry),
    docTipo: normalizarTipoDocumento(h.docTipo || h.docType),
    docNumero: String(h.docNumero || h.docNumber || "").trim(),
    docOutroDesc: String(h.docOutroDesc || h.docOther || "").trim(),
    docPaisEmissor: normalizarIso3(h.docPaisEmissor || h.docCountry)
  }));

  const payload = {
    apartamento: aptoCodigo,
    dataCheckin: normalizarDataIso(boletim.dataCheckin),
    dataCheckout: normalizarDataIso(boletim.dataCheckout),
    numAdultos: parseInt(boletim.numAdultos || 1, 10),
    numCriancas: parseInt(boletim.numCriancas || 0, 10),
    emailCliente: boletim.emailCliente || "",
    hospedes: hospedesNormalizados
  };

  console.log("A enviar payload normalizado para Cloudflare Worker:", payload);

  try {
    const response = await fetch(CLOUDFLARE_WORKER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    console.log("Resposta do Cloudflare Worker / SIBA:", result);

    if (result.success) {
      boletim.status = "ENVIADO";
      boletim.enviadoEm = new Date().toISOString();
      guardarBoletinsSiba(boletins);

      alert(`[${result.modo}] Enviado com sucesso para a AIMA/SIBA!\nEstabelecimento: ${result.estabelecimento || aptoCodigo}`);
      return result;
    } else {
      let msgErro = result.mensagem || "Erro de processamento no SIBA";
      if (result.respostaSibaRaw && result.respostaSibaRaw.includes("faultstring")) {
        const match = result.respostaSibaRaw.match(/<faultstring>(.*?)<\/faultstring>/);
        if (match) msgErro += `:\n${match[1]}`;
      }
      alert(`⚠️ Erro devolvido pelo SIBA:\n${msgErro}`);
      return result;
    }
  } catch (err) {
    console.error("Erro na comunicação com o Worker:", err);
    alert("⚠️ Erro ao contactar o Cloudflare Worker. Verifique a ligação ou a URL do Worker.");
    return { success: false, mensagem: err.message };
  }
}

// Garantir compatibilidade com qualquer chamada no siba.html
const enviarBoletimParaSIBA = enviarParaSibaWebService;
