// ============================================================
//  DISPONIBILIDADE — BACKOFFICE (SEM CLOUD FUNCTIONS)
// ============================================================

const TOTAL_APARTAMENTOS = 3;

// Gera lista de dias entre checkin e checkout (checkout excluído)
function gerarDiasEntre(checkin, checkout) {
    const dias = [];
    const ini = new Date(checkin);
    const fim = new Date(checkout);

    let d = new Date(ini);
    while (d < fim) {
        const iso = d.toISOString().split("T")[0];
        dias.push(iso);
        d.setDate(d.getDate() + 1);
    }
    return dias;
}

// ------------------------------------------------------------
// ADICIONAR RESERVA À DISPONIBILIDADE
// ------------------------------------------------------------
async function adicionarReservaNaDisponibilidade(reserva) {
    if (!reserva || !reserva.checkin || !reserva.checkout) return;

    const dias = gerarDiasEntre(reserva.checkin, reserva.checkout);

    for (const dia of dias) {
        const ref = db.collection("disponibilidade").doc(dia);
        const doc = await ref.get();

        const ocupados = reserva.quartos || 1;

        if (!doc.exists) {
            await ref.set({
                data: dia,
                ocupados: ocupados,
                livres: TOTAL_APARTAMENTOS - ocupados
            });
        } else {
            const atual = doc.data().ocupados || 0;
            const novo = atual + ocupados;

            await ref.update({
                ocupados: novo,
                livres: TOTAL_APARTAMENTOS - novo
            });
        }
    }
}

// ------------------------------------------------------------
// REMOVER RESERVA DA DISPONIBILIDADE
// ------------------------------------------------------------
async function removerReservaDaDisponibilidade(reserva) {
    if (!reserva || !reserva.checkin || !reserva.checkout) return;

    const dias = gerarDiasEntre(reserva.checkin, reserva.checkout);

    for (const dia of dias) {
        const ref = db.collection("disponibilidade").doc(dia);
        const doc = await ref.get();
        if (!doc.exists) continue;

        const ocupados = reserva.quartos || 1;
        const atual = doc.data().ocupados || 0;
        const novo = Math.max(0, atual - ocupados);

        await ref.update({
            ocupados: novo,
            livres: TOTAL_APARTAMENTOS - novo
        });
    }
}

// ------------------------------------------------------------
// ATUALIZAR RESERVA NA DISPONIBILIDADE
// ------------------------------------------------------------
async function atualizarReservaNaDisponibilidade(antiga, nova) {
    if (!antiga || !nova) return;

    await removerReservaDaDisponibilidade(antiga);
    await adicionarReservaNaDisponibilidade(nova);
}
