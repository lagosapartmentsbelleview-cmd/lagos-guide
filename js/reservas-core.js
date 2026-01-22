// -------------------------------------------------------------
// FUNÇÕES CORE — usadas por listagem, limpeza e calendário
// -------------------------------------------------------------

function parseDataPt(str) {
    if (!str) return null;

    if (str.includes("-")) {
        const [a, m, d] = str.split("-").map(Number);
        return new Date(a, m - 1, d);
    }

    if (str.includes("/")) {
        const [d, m, a] = str.split("/").map(Number);
        return new Date(a, m - 1, d);
    }

    return null;
}

function normalizarDataParaPt(str) {
    if (!str) return "";
    const [a, m, d] = str.split("-");
    return `${d}/${m}/${a}`;
}

// -------------------------------------------------------------
// FUNÇÃO UNIVERSAL: DEVOLVE TODAS AS RESERVAS NORMALIZADAS
// -------------------------------------------------------------
async function carregarReservasNormalizadas() {
    const snap = await db.collection("reservas").orderBy("checkin").get();

    const lista = [];
    snap.forEach(doc => lista.push({ id: doc.id, ...doc.data() }));

    lista.forEach(r => {
        r.cliente = r.cliente || r.reservadoPor || "";
        r.adultos = Number(r.adultos || 0);
        r.criancas = Number(r.criancas || 0);
        r.hospedes = Number(r.hospedes || (r.adultos + r.criancas));
        r.idadesCriancas = r.idadesCriancas || "";
        r.berco = !!r.berco;
        r.comentarios = r.comentarios || r.observacoes || "";

        if (!Array.isArray(r.apartamentos)) {
            r.apartamentos = r.apartamentos ? [String(r.apartamentos)] : [];
        } else {
            r.apartamentos = r.apartamentos.map(a => String(a));
        }
    });

    return lista;
}
