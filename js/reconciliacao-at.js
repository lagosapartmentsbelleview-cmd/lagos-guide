// ===============================
//  CONFIG / ESTADO
// ===============================

let faturasSistema = [];
let faturasAT = [];

// ===============================
//  ARRANQUE
// ===============================

document.addEventListener("DOMContentLoaded", async () => {
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

    // 2) Comparar com o sistema
    const resultado = compararATComSistema(faturasAT, faturasSistema);

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

        // Ignorar cabeçalhos
        if (["Documento", "Identificação", "Data Emissão", "Base Tributável", "IVA", "Valor Deduzido", "Percentagem Deduzida"].includes(linhas[i])) {
            i++;
            continue;
        }

        // Bloco de 9 linhas
        const tipo = linhas[i] || "";
        const identificacao = linhas[i+1] || "";
        const fornecedor = linhas[i+2] || "";
        const nif = linhas[i+3] || "";
        const data = linhas[i+4] || "";
        const baseTrib = linhas[i+5] || "";
        const iva = linhas[i+6] || "";
        const valorDeduzido = linhas[i+7] || "";
        const percentagem = linhas[i+8] || "";

        // Validar bloco
        if (!identificacao || !nif || !data) {
            i++;
            continue;
        }

        // Normalizar valores
        const bruto = parseFloat(baseTrib.replace("€","").replace(",",".").trim()) || 0;
        const ivaNum = parseFloat(iva.replace("€","").replace(",",".").trim()) || 0;

        // Normalizar data
        const dataISO = normalizarData(data);

        // Criar fatura
        faturas.push({
            tipo,
            identificacao,
            fornecedor,
            nif,
            dataISO,
            valorBruto: bruto,
            valorIVA: ivaNum,
            numeroFatura: identificacao,
            atcud: identificacao
        });

        i += 9; // avançar para o próximo bloco
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

function compararATComSistema(listaAT, listaSistema) {
    const emFaltaNoSistema = [];
    const emFaltaNaAT = [];
    const divergentes = [];

    // Índices rápidos por ATCUD e Nº Fatura
    const mapaSistemaPorATCUD = new Map();
    const mapaSistemaPorNumero = new Map();

    listaSistema.forEach(f => {
        if (f.atcud) mapaSistemaPorATCUD.set(f.atcud, f);
        if (f.numeroFatura) mapaSistemaPorNumero.set(f.numeroFatura, f);
    });

    const mapaATPorATCUD = new Map();
    const mapaATPorNumero = new Map();

    listaAT.forEach(f => {
        if (f.atcud) mapaATPorATCUD.set(f.atcud, f);
        if (f.numeroFatura) mapaATPorNumero.set(f.numeroFatura, f);
    });

    // 1) Faturas que estão na AT mas não no sistema
    listaAT.forEach(fAT => {
        let fS = null;

        if (fAT.atcud && mapaSistemaPorATCUD.has(fAT.atcud)) {
            fS = mapaSistemaPorATCUD.get(fAT.atcud);
        } else if (fAT.numeroFatura && mapaSistemaPorNumero.has(fAT.numeroFatura)) {
            fS = mapaSistemaPorNumero.get(fAT.numeroFatura);
        }

        if (!fS) {
            emFaltaNoSistema.push(fAT);
            return;
        }

        // Se existe nos dois, verificar divergências
        const difs = [];

        if (Math.round(fS.valorBruto * 100) !== Math.round(fAT.valorBruto * 100)) {
            difs.push("Valor Bruto");
        }
        if (Math.round(fS.valorIVA * 100) !== Math.round(fAT.valorIVA * 100)) {
            difs.push("IVA");
        }
        if ((fS.dataISO || "").substring(0, 10) !== (fAT.dataISO || "").substring(0, 10)) {
            difs.push("Data");
        }
        if ((fS.nif || "") !== (fAT.nif || "")) {
            difs.push("NIF");
        }

        if (difs.length) {
            divergentes.push({
                sistema: fS,
                at: fAT,
                camposDiferentes: difs
            });
        }
    });

    // 2) Faturas que estão no sistema mas não na AT
    listaSistema.forEach(fS => {
        let fAT = null;

        if (fS.atcud && mapaATPorATCUD.has(fS.atcud)) {
            fAT = mapaATPorATCUD.get(fS.atcud);
        } else if (fS.numeroFatura && mapaATPorNumero.has(fS.numeroFatura)) {
            fAT = mapaATPorNumero.get(fS.numeroFatura);
        }

        if (!fAT) {
            emFaltaNaAT.push(fS);
        }
    });

    return { emFaltaNoSistema, emFaltaNaAT, divergentes };
}

// ===============================
//  RENDERIZAÇÃO DOS RESULTADOS
// ===============================

function renderizarResultados({ emFaltaNoSistema, emFaltaNaAT, divergentes }) {
    const div = document.getElementById("resultados");
    div.innerHTML = "";

    const partes = [];

    partes.push(`<h2>Resultados da Reconciliação</h2>`);

    partes.push(`<p><strong>Faturas AT:</strong> ${faturasAT.length}</p>`);
    partes.push(`<p><strong>Faturas Sistema:</strong> ${faturasSistema.length}</p>`);

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
