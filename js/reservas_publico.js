/* ======================================================
   RESERVAS — VERSÃO PÚBLICA (SEM ACESSO A RESERVAS)
   Lê apenas a coleção "disponibilidade"
   ====================================================== */

// Função principal chamada pelo ui.js
async function verificarDisponibilidade(checkin, checkout, numApt) {

    try {
        // Garantir que datas são válidas
        if (!checkin || !checkout) {
            return { status: "erro" };
        }

        const dataIn = new Date(checkin);
        const dataOut = new Date(checkout);

        if (dataOut <= dataIn) {
            return { status: "erro" };
        }

        // Converter datas para YYYY-MM-DD
        const dias = [];
        for (let d = new Date(dataIn); d < dataOut; d.setDate(d.getDate() + 1)) {
            dias.push(d.toISOString().split("T")[0]);
        }

        // Ler disponibilidade do Firestore
        const ref = db.collection("disponibilidade");
        let livresMinimo = Infinity;

        for (const dia of dias) {
            const doc = await ref.doc(dia).get();

            if (!doc.exists) {
                // Se não existir documento, assumimos 3 livres
                livresMinimo = Math.min(livresMinimo, 3);
                continue;
            }

            const dados = doc.data();
            livresMinimo = Math.min(livresMinimo, dados.livres);
        }

        // Agora decidimos o estado
        if (livresMinimo <= 0) {
            return { status: "indisponivel" };
        }

        if (livresMinimo < numApt) {
            return {
                status: "parcial",
                apartamentos: Array(livresMinimo).fill("livre")
            };
        }

        return {
            status: "disponivel",
            apartamentos: Array(numApt).fill("livre")
        };

    } catch (e) {
        console.error("Erro ao verificar disponibilidade:", e);
        return { status: "erro" };
    }
}

console.log("reservas_publico.js carregado com sucesso");
