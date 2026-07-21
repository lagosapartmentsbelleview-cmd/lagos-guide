// ===============================
//  CONFIG / ESTADO
// ===============================

let faturasSistema = [];
let faturasAT = [];

// ===============================
//  ARRANQUE
// ===============================

document.addEventListener("DOMContentLoaded", async () => {

    // 🔥 1) CARREGAR TEXTO DA CACHE
    const cache = localStorage.getItem("textoAT_cache");
    if (cache) {
        document.getElementById("textoAT").value = cache;
    }

    // Garante que o user está autenticado (igual ao resto do sistema)
    firebase.auth().onAuthStateChanged(async user => {
        if (!user) {
            window.location.href = "login.html";
            return;
        }

        await carregarFaturasSistema();
    });
});


// ===============================
//  CARREGAR FATURAS DO SISTEMA
// ===============================

async function carregarFaturasSistema() {
    try {
        const snap = await firebase.firestore()
            .collection("faturas")
            .orderBy("dataISO")
            .get();

        faturasSistema = snap.docs.map(d => {
            const f = { id: d.id, ...d.data() };

            // Normalizar alguns campos
            f.dataISO = f.dataISO || "";
            f.nif = (f.nif || "").toString().trim();
            f.fornecedor = (f.fornecedor || "").toString().trim();
            f.numeroFatura = (f.numeroFatura || "").toString().trim();
            f.atcud = (f.atcud || "").toString().trim();
            f.valorBruto = Number(f.valorBruto || 0);
            f.valorIVA = Number(f.valorIVA || 0);

            return f;
        });

        console.log("Faturas do sistema carregadas:", faturasSistema.length);
    } catch (err) {
        console.error("Erro ao carregar faturas do sistema:", err);
        alert("Erro ao carregar faturas do sistema.");
    }
}

// ===============================
//  PROCESSAR TEXTO DA AT
// ===============================

function processarAT() {
    const textarea = document.getElementById("textoAT");
    const texto = (textarea.value || "").trim();

    if (!texto) {
        alert("Cole o texto exportado do Portal das Finanças.");
        return;
    }

    // 1) Parse do texto da AT
    faturasAT = parseTextoAT(texto);
    console.log("Faturas AT parseadas:", faturasAT);

    if (!faturasAT.length) {
        alert("Não foi possível extrair faturas do texto da AT.");
        return;
    }

   // 🔥 Ler intervalo escolhido pelo utilizador
const inicio = document.getElementById("dataInicio").value;
const fim = document.getElementById("dataFim").value;

if (!inicio || !fim) {
    alert("Escolha a data início e data fim para a reconciliação.");
    return;
}

// 🔥 Filtrar faturas do sistema pelo intervalo escolhido
const faturasSistemaFiltradas = faturasSistema.filter(f => {
    const d = (f.dataISO || "").substring(0,10);
    return d >= inicio && d <= fim;
});

// 🔥 Filtrar faturas AT pelo intervalo escolhido
const faturasATFiltradas = faturasAT.filter(f => {
    const d = (f.dataISO || "").substring(0,10);
    return d >= inicio && d <= fim;
});

// 🔥 Comparar apenas o intervalo selecionado
const resultado = compararATComSistema(faturasATFiltradas, faturasSistemaFiltradas);

// 🔥 Guardar também as listas completas para exportação
resultado.faturasAT = faturasATFiltradas;
resultado.faturasSistema = faturasSistemaFiltradas;

window.ultimoResultadoReconcil = resultado;


// 3) Renderizar resultados
renderizarResultados(resultado);
}

// ===============================
//  PARSER DO TEXTO DA AT
// ===============================
//
// NOTA: aqui assumo um formato genérico tipo CSV/TSV:
// Data;Fornecedor;NIF;Categoria;Bruto;IVA;Nº Fatura;ATCUD
// Ajustamos depois ao formato real do Portal se for diferente.
//

function parseTextoAT(texto) {
    const linhas = texto
        .split(/\r?\n/)
        .map(l => l.trim())
        .filter(l => l.length > 0);

    const faturas = [];
    let i = 0;

    while (i < linhas.length) {

        // Tipo (Fatura / Fatura simplificada)
        const tipo = linhas[i];
        if (!tipo.toLowerCase().includes("fatura")) {
            i++;
            continue;
        }

        const identificacao = linhas[i+1] || "";
        const data = linhas[i+2] || "";
        const fornecedor = linhas[i+3] || "";
        const nif = linhas[i+4] || "";
        const valoresLinha = linhas[i+5] || "";

        // A linha 6 tem 4 valores separados por espaços ou tabs
        // Extrair apenas números com vírgula ou ponto
        const numeros = valoresLinha.match(/[\d.,]+/g) || [];

        // Base tributável
        const baseTrib = numeros[0] || "0";

        // IVA total
        const iva = numeros[1] || "0";

        // IVA dedutível
        const dedutivel = numeros[2] || "0";


        // Normalizar valores
        const brutoNum = parseFloat(baseTrib.replace("€","").replace(",","."));
        const ivaNum = parseFloat(iva.replace("€","").replace(",","."));
        const dedNum = parseFloat(dedutivel.replace("€","").replace(",","."));

        // Normalizar data
        const dataISO = normalizarData(data);

        faturas.push({
            tipo,
            identificacao,
            fornecedor,
            nif,
            dataISO,
            valorBruto: brutoNum + ivaNum,
            valorIVA: ivaNum,
            valorDedutivel: dedNum,
            valorIliquido: brutoNum,
            numeroFatura: identificacao,
            atcud: identificacao
        });

        i += 6; // avançar para o próximo bloco
    }

    return faturas;
}



function normalizarData(dataStr) {
    if (!dataStr) return "";

    dataStr = dataStr.trim();

    // YYYY-MM-DD ou YYYY/M/D
    if (/^\d{4}[-/]\d{1,2}[-/]\d{1,2}$/.test(dataStr)) {
        const [a, m, d] = dataStr.split(/[-/]/).map(Number);
        return `${a}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    }

    // DD/MM/YYYY
    if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dataStr)) {
        const [d, m, a] = dataStr.split("/").map(Number);
        return `${a}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    }

    return dataStr; // devolve como veio se não reconhecer
}

// ===============================
//  COMPARAÇÃO AT vs SISTEMA
// ===============================
function somarTotais(lista) {
    let totalBruto = 0;
    let totalIVA = 0;
    let totalLiquido = 0;

    let totalIVADedutivel = 0;
    let totalIVANaoDedutivel = 0;
    let totalIVAGasoleo = 0;

    // Detectar se é lista do sistema (tem categoria)
    const isSistema = lista.length && lista[0].hasOwnProperty("categoria");

    lista.forEach(f => {
        const bruto = Number(f.valorBruto || 0);
        const iva = Number(f.valorIVA || 0);
        const ivaDedAT = Number(f.valorDedutivel || 0);

        totalBruto += bruto;
        totalIVA += iva;
        totalLiquido += bruto - iva;

        if (isSistema) {
            // ============================
            // 🔥 SISTEMA
            // ============================

            const categoria = (f.categoria || "").toLowerCase();

            if (categoria.includes("combust")) {
                // Combustível → IVA dedutível = 50%
                const ivaDed = iva * 0.50;

                totalIVADedutivel += ivaDed;
                totalIVANaoDedutivel += iva - ivaDed;
                totalIVAGasoleo += ivaDed;

            } else {
                // Outras categorias → 100% dedutível
                totalIVADedutivel += iva;
                totalIVANaoDedutivel += 0;
            }

        } else {
            // ============================
            // 🔥 AT
            // ============================

            totalIVADedutivel += ivaDedAT;
            totalIVANaoDedutivel += iva - ivaDedAT;

            // AT não tem IVA gasóleo
            totalIVAGasoleo += 0;
        }
    });

    return {
        totalBruto,
        totalIVA,
        totalLiquido,
        totalIVADedutivel,
        totalIVANaoDedutivel,
        totalIVAGasoleo
    };
}





function compararATComSistema(listaAT, listaSistema) {

    const emFaltaNoSistema = [];
    const emFaltaNaAT = [];
    const divergentes = [];

    // Normalizar chaves
    function chave(f) {
        if (!f) return "";
        return (f.identificacao || f.numeroFatura || f.atcud || "")
            .toString()
            .toUpperCase()
            .replace(/\s+/g, "")
            .replace(/\./g, "")
            .replace(/-/g, "")
            .trim();
    }

    // Fallback: comparar por NIF + Data + Valor
    function matchFallback(fAT, fS) {
        return (
            fAT.nif === fS.nif &&
            (fAT.dataISO || "").substring(0,10) === (fS.dataISO || "").substring(0,10) &&
            Math.abs(fAT.valorBruto - fS.valorBruto) < 0.01
        );
    }

    // 1) Faturas AT → procurar no sistema
    listaAT.forEach(fAT => {

        const chaveAT = chave(fAT);

        let fS = listaSistema.find(f => chave(f) === chaveAT);

        if (!fS) {
            // tentar fallback
            fS = listaSistema.find(f => matchFallback(fAT, f));
        }

        if (!fS) {
            emFaltaNoSistema.push(fAT);
            return;
        }

        // verificar divergências
        const difs = [];

        // 🔥 Ignorar diferenças até 5 cêntimos
        if (Math.abs(fAT.valorBruto - fS.valorBruto) > 0.05) difs.push("Valor Bruto");
        if (Math.abs(fAT.valorIVA - fS.valorIVA) > 0.05) difs.push("IVA");

        if ((fAT.dataISO || "").substring(0,10) !== (fS.dataISO || "").substring(0,10)) difs.push("Data");
        if (fAT.nif !== fS.nif) difs.push("NIF");

        if (difs.length) {
            divergentes.push({
                sistema: fS,
                at: fAT,
                camposDiferentes: difs
            });
        }
    });

    // 2) Faturas Sistema → procurar na AT
    listaSistema.forEach(fS => {

        const chaveS = chave(fS);

        let fAT = listaAT.find(f => chave(f) === chaveS);

        if (!fAT) {
            // fallback
            fAT = listaAT.find(f => matchFallback(f, fS));
        }

        if (!fAT) {
            emFaltaNaAT.push(fS);
        }
    });

    const totaisAT = somarTotais(listaAT);
    const totaisSistema = somarTotais(listaSistema);

return { 
    emFaltaNoSistema, 
    emFaltaNaAT, 
    divergentes,
    totaisAT,
    totaisSistema
};

}

// ===============================
//  RENDERIZAÇÃO DOS RESULTADOS
// ===============================

function renderizarResultados({ emFaltaNoSistema, emFaltaNaAT, divergentes, totaisAT, totaisSistema }) {

    const div = document.getElementById("resultados");
    div.innerHTML = "";

    const partes = [];

    partes.push(`<h2>Resultados da Reconciliação</h2>`);

    partes.push(`
    <div class="secao">
        <h3>Resumo Financeiro do Período</h3>

        <table class="tabela-resumo">
    <thead>
        <tr>
            <th></th>
            <th>Valor (€)</th>
            <th>IVA (€)</th>
            <th>IVA Dedutível (€)</th>
            <th>IVA Não Dedutível (€)</th>
            <th>IVA Gasóleo (€)</th>
            <th>Líquido (€)</th>
        </tr>
    </thead>

            <tbody>
                <tr>
    <td><strong>AT</strong></td>
    <td>${totaisAT.totalBruto.toFixed(2)}</td>
    <td>${totaisAT.totalIVA.toFixed(2)}</td>
    <td>${totaisAT.totalIVADedutivel.toFixed(2)}</td>
    <td>${totaisAT.totalIVANaoDedutivel.toFixed(2)}</td>
    <td>${totaisAT.totalIVAGasoleo.toFixed(2)}</td>
    <td>${totaisAT.totalLiquido.toFixed(2)}</td>
</tr>


                <tr>
    <td><strong>Sistema</strong></td>
    <td>${totaisSistema.totalBruto.toFixed(2)}</td>
    <td>${totaisSistema.totalIVA.toFixed(2)}</td>
    <td>${totaisSistema.totalIVADedutivel.toFixed(2)}</td>
    <td>${totaisSistema.totalIVANaoDedutivel.toFixed(2)}</td>
    <td>${totaisSistema.totalIVAGasoleo.toFixed(2)}</td>
    <td>${totaisSistema.totalLiquido.toFixed(2)}</td>
</tr>

                <tr>
    <td><strong>Diferença</strong></td>
    <td>${(totaisAT.totalBruto - totaisSistema.totalBruto).toFixed(2)}</td>
    <td>${(totaisAT.totalIVA - totaisSistema.totalIVA).toFixed(2)}</td>
    <td>${(totaisAT.totalIVADedutivel - totaisSistema.totalIVADedutivel).toFixed(2)}</td>
    <td>${(totaisAT.totalIVANaoDedutivel - totaisSistema.totalIVANaoDedutivel).toFixed(2)}</td>
    <td>${(totaisAT.totalIVAGasoleo - totaisSistema.totalIVAGasoleo).toFixed(2)}</td>
    <td>${(totaisAT.totalLiquido - totaisSistema.totalLiquido).toFixed(2)}</td>
</tr>

            </tbody>
        </table>
    </div>
`);


    partes.push(`<p><strong>Faturas AT:</strong> ${window.ultimoResultadoReconcil.faturasAT.length}</p>`);
    partes.push(`<p><strong>Faturas Sistema:</strong> ${window.ultimoResultadoReconcil.faturasSistema.length}</p>`);


    // 1) Em falta no sistema
    partes.push(`<div class="secao">`);
    partes.push(`<h3>Faturas que estão na AT mas não estão no sistema (${emFaltaNoSistema.length})</h3>`);
    partes.push(gerarTabelaFaturasSimples(emFaltaNoSistema));
    partes.push(`</div>`);

    // 2) Em falta na AT
    partes.push(`<div class="secao">`);
    partes.push(`<h3>Faturas que estão no sistema mas não aparecem na AT (${emFaltaNaAT.length})</h3>`);
    partes.push(gerarTabelaFaturasSimples(emFaltaNaAT));
    partes.push(`</div>`);

    // 3) Divergentes
    partes.push(`<div class="secao">`);
    partes.push(`<h3>Faturas com divergências (${divergentes.length})</h3>`);
    partes.push(gerarTabelaDivergentes(divergentes));
    partes.push(`</div>`);

    div.innerHTML = partes.join("\n");
}

function gerarTabelaFaturasSimples(lista) {
    if (!lista.length) {
        return `<p>Sem registos.</p>`;
    }

    let html = `<table>
        <thead>
            <tr>
                <th>Data</th>
                <th>Fornecedor</th>
                <th>NIF</th>
                <th>Categoria</th>
                <th>Bruto (€)</th>
                <th>IVA (€)</th>
                <th>Nº Fatura</th>
                <th>ATCUD</th>
            </tr>
        </thead>
        <tbody>
    `;

    lista.forEach(f => {
        html += `
            <tr>
                <td>${(f.dataISO || "").substring(0,10)}</td>
                <td>${f.fornecedor || ""}</td>
                <td>${f.nif || ""}</td>
                <td>${f.categoria || ""}</td>
                <td>${Number(f.valorBruto || 0).toFixed(2)}</td>
                <td>${Number(f.valorIVA || 0).toFixed(2)}</td>
                <td>${f.numeroFatura || ""}</td>
                <td>${f.atcud || ""}</td>
            </tr>
        `;
    });

    html += `</tbody></table>`;
    return html;
}

function gerarTabelaDivergentes(lista) {
    if (!lista.length) {
        return `<p>Sem divergências.</p>`;
    }

    let html = `<table>
        <thead>
            <tr>
                <th>Campo</th>
                <th>Valor AT</th>
                <th>Valor Sistema</th>
                <th>Identificação</th>
            </tr>
        </thead>
        <tbody>
    `;

        lista.forEach(item => {
        const { sistema: s, at, camposDiferentes } = item;

        camposDiferentes.forEach(campo => {
            let valorAT = "";
            let valorS = "";

            if (campo === "Valor Bruto") {
                valorAT = at.valorBruto.toFixed(2);
                valorS = s.valorBruto.toFixed(2);
            } else if (campo === "IVA") {
                valorAT = at.valorIVA.toFixed(2);
                valorS = s.valorIVA.toFixed(2);
            } else if (campo === "Data") {
                valorAT = (at.dataISO || "").substring(0,10);
                valorS = (s.dataISO || "").substring(0,10);
            } else if (campo === "NIF") {
                valorAT = at.nif || "";
                valorS = s.nif || "";
            }

            const id = at.atcud || at.numeroFatura || s.atcud || s.numeroFatura || "(sem id)";

            html += `
                <tr>
                    <td>${campo}</td>
                    <td>${valorAT}</td>
                    <td>${valorS}</td>
                    <td>${id}</td>
                </tr>
            `;
        });
    });




    html += `</tbody></table>`;
    return html;
}

function exportarExcel() {
    if (!window.ultimoResultadoReconcil) {
        alert("Primeiro execute a reconciliação.");
        return;
    }

    const { emFaltaNoSistema, emFaltaNaAT, divergentes } = window.ultimoResultadoReconcil;

    // Criar workbook
    const wb = XLSX.utils.book_new();

    // ============================
    // 1) FALTAS NO SISTEMA
    // ============================
    const dadosFaltaSistema = [
        ["Data", "Fornecedor", "NIF", "Bruto", "IVA", "Nº Fatura", "ATCUD"]
    ];

    emFaltaNoSistema.forEach(f => {
        dadosFaltaSistema.push([
            (f.dataISO || "").substring(0,10),
            f.fornecedor || "",
            f.nif || "",
            Number(f.valorBruto || 0),
            Number(f.valorIVA || 0),
            f.numeroFatura || "",
            f.atcud || ""
        ]);
    });

    const ws1 = XLSX.utils.aoa_to_sheet(dadosFaltaSistema);
    ajustarColunas(ws1, dadosFaltaSistema);
    ws1["!autofilter"] = { ref: "A1:G" + dadosFaltaSistema.length };
    XLSX.utils.book_append_sheet(wb, ws1, "Faltas no Sistema");

    // ============================
    // 2) FALTAS NA AT
    // ============================
    const dadosFaltaAT = [
        ["Data", "Fornecedor", "NIF", "Bruto", "IVA", "Nº Fatura", "ATCUD"]
    ];

    emFaltaNaAT.forEach(f => {
        dadosFaltaAT.push([
            (f.dataISO || "").substring(0,10),
            f.fornecedor || "",
            f.nif || "",
            Number(f.valorBruto || 0),
            Number(f.valorIVA || 0),
            f.numeroFatura || "",
            f.atcud || ""
        ]);
    });

    const ws2 = XLSX.utils.aoa_to_sheet(dadosFaltaAT);
    ajustarColunas(ws2, dadosFaltaAT);
    ws2["!autofilter"] = { ref: "A1:G" + dadosFaltaAT.length };
    XLSX.utils.book_append_sheet(wb, ws2, "Faltas na AT");

    // ============================
    // 3) DIVERGÊNCIAS
    // ============================
    const dadosDivergencias = [
        ["Campo", "Valor AT", "Valor Sistema", "Identificação"]
    ];

    divergentes.forEach(item => {
        const { sistema: s, at, camposDiferentes } = item;

        camposDiferentes.forEach(campo => {
            let valorAT = "";
            let valorS = "";

            if (campo === "Valor Bruto") {
                valorAT = Number(at.valorBruto);
                valorS = Number(s.valorBruto);
            } else if (campo === "IVA") {
                valorAT = Number(at.valorIVA);
                valorS = Number(s.valorIVA);
            } else if (campo === "Data") {
                valorAT = (at.dataISO || "").substring(0,10);
                valorS = (s.dataISO || "").substring(0,10);
            } else if (campo === "NIF") {
                valorAT = at.nif;
                valorS = s.nif;
            }

            const id = at.atcud || at.numeroFatura || s.atcud || s.numeroFatura || "(sem id)";

            dadosDivergencias.push([campo, valorAT, valorS, id]);
        });
    });

    const ws3 = XLSX.utils.aoa_to_sheet(dadosDivergencias);
    ajustarColunas(ws3, dadosDivergencias);
    ws3["!autofilter"] = { ref: "A1:D" + dadosDivergencias.length };
    XLSX.utils.book_append_sheet(wb, ws3, "Divergências");

// ============================
// 4) LISTA COMPLETA DE FATURAS AT
// ============================
const faturasAT = window.ultimoResultadoReconcil.faturasAT;

const dadosAT = [
    ["Identificação", "Fornecedor", "NIF", "Data", "Base Tributável", "IVA", "IVA Dedutível", "Total"]
];

faturasAT.forEach(f => {
    dadosAT.push([
        f.identificacao || "",
        f.fornecedor || "",
        f.nif || "",
        (f.dataISO || "").substring(0,10),
        (Number(f.valorBruto) - Number(f.valorIVA)).toFixed(2),
        Number(f.valorIVA).toFixed(2),
        Number(f.valorDedutivel).toFixed(2),
        Number(f.valorBruto).toFixed(2)
    ]);
});

const wsAT = XLSX.utils.aoa_to_sheet(dadosAT);
ajustarColunas(wsAT, dadosAT);
wsAT["!autofilter"] = { ref: "A1:H" + dadosAT.length };
XLSX.utils.book_append_sheet(wb, wsAT, "Faturas AT");

    
// ============================
// 4) RESUMO FINANCEIRO
// ============================
const { totaisAT, totaisSistema } = window.ultimoResultadoReconcil;

const dadosResumo = [
    ["Campo", "AT (€)", "Sistema (€)", "Diferença (€)"],
    ["Valor Total", totaisAT.totalBruto, totaisSistema.totalBruto, totaisAT.totalBruto - totaisSistema.totalBruto],
    ["IVA Total", totaisAT.totalIVA, totaisSistema.totalIVA, totaisAT.totalIVA - totaisSistema.totalIVA],
    ["IVA Dedutível", totaisAT.totalIVADedutivel, totaisSistema.totalIVADedutivel, totaisAT.totalIVADedutivel - totaisSistema.totalIVADedutivel],
    ["IVA Não Dedutível", totaisAT.totalIVANaoDedutivel, totaisSistema.totalIVANaoDedutivel, totaisAT.totalIVANaoDedutivel - totaisSistema.totalIVANaoDedutivel],
    ["IVA Gasóleo", totaisAT.totalIVAGasoleo, totaisSistema.totalIVAGasoleo, totaisAT.totalIVAGasoleo - totaisSistema.totalIVAGasoleo],
    ["Líquido", totaisAT.totalLiquido, totaisSistema.totalLiquido, totaisAT.totalLiquido - totaisSistema.totalLiquido]
];

const wsResumo = XLSX.utils.aoa_to_sheet(dadosResumo);
ajustarColunas(wsResumo, dadosResumo);
wsResumo["!autofilter"] = { ref: "A1:D" + dadosResumo.length };
XLSX.utils.book_append_sheet(wb, wsResumo, "Resumo");

    
    // ============================
    // DOWNLOAD FINAL
    // ============================
    XLSX.writeFile(wb, "reconciliacao_AT.xlsx");
}


// Função auxiliar para ajustar colunas
function ajustarColunas(ws, dados) {
    const colWidths = dados[0].map((_, colIndex) => {
        const maxLen = Math.max(...dados.map(row => (row[colIndex] + "").length));
        return { wch: maxLen + 2 };
    });
    ws["!cols"] = colWidths;
}

function exportarATExcel() {
    if (!window.ultimoResultadoReconcil || !window.ultimoResultadoReconcil.faturasAT) {
        alert("Ainda não carregaste dados da AT.");
        return;
    }

    const faturas = window.ultimoResultadoReconcil.faturasAT;

    const dados = [
        ["Identificação", "Fornecedor", "NIF", "Data", "Base Tributável", "IVA", "IVA Dedutível", "Total"]
    ];

    faturas.forEach(f => {
        dados.push([
            f.identificacao || "",
            f.fornecedor || "",
            f.nif || "",
            (f.dataISO || "").substring(0,10),
            (Number(f.valorBruto) - Number(f.valorIVA)).toFixed(2),
            Number(f.valorIVA).toFixed(2),
            Number(f.valorDedutivel).toFixed(2),
            Number(f.valorBruto).toFixed(2)
        ]);
    });

    const ws = XLSX.utils.aoa_to_sheet(dados);
    ajustarColunas(ws, dados);

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Faturas AT");

    XLSX.writeFile(wb, "AT_faturas.xlsx");
}

    
    // 🔥 2) GUARDAR TEXTO SEMPRE QUE O UTILIZADOR ESCREVE
document.getElementById("textoAT").addEventListener("input", () => {
    localStorage.setItem("textoAT_cache", document.getElementById("textoAT").value);
});



