// ---------------------------------------------------------
// Serviço de Reservas — Firestore
// ---------------------------------------------------------

export const ReservaService = {

    colecao: "reservas",
    colecaoCalendario: "calendario",

    // -----------------------------------------------------
    // Buscar todas as reservas
    // -----------------------------------------------------
    async getAll() {
        const snap = await db.collection(this.colecao).get();
        return snap.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    },

    // -----------------------------------------------------
    // Buscar reserva por ID
    // -----------------------------------------------------
    async getById(id) {
        const doc = await db.collection(this.colecao).doc(id).get();
        if (!doc.exists) return null;
        return { id: doc.id, ...doc.data() };
    },

    // -----------------------------------------------------
    // Criar nova reserva
    // -----------------------------------------------------
    async add(reservaModel) {
        const data = reservaModel.toFirestore();
        const ref = await db.collection(this.colecao).add({
            ...data,
            criadoEm: new Date().toISOString()
        });
        return ref.id;
    },

    // -----------------------------------------------------
    // Atualizar reserva existente
    // -----------------------------------------------------
    async update(id, reservaModel) {
        const data = reservaModel.toFirestore();
        await db.collection(this.colecao).doc(id).update({
            ...data,
            atualizadoEm: new Date().toISOString()
        });
        return true;
    },

    // -----------------------------------------------------
    // Apagar reserva
    // -----------------------------------------------------
    async delete(id) {
        await db.collection(this.colecao).doc(id).delete();
        return true;
    },

    // -----------------------------------------------------
    // Buscar reservas por intervalo de datas
    // (para filtros e calendário)
    // -----------------------------------------------------
    async getByIntervalo(checkinISO, checkoutISO) {
        const snap = await db.collection(this.colecao)
            .where("checkin", ">=", checkinISO)
            .where("checkin", "<=", checkoutISO)
            .get();

        return snap.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    },

    // -----------------------------------------------------
    // Sincronizar com o calendário
    // -----------------------------------------------------
    async sincronizarCalendario(reservas) {

        const batch = db.batch();

        reservas.forEach(r => {
            const ref = db.collection(this.colecaoCalendario).doc(r.id);
            batch.set(ref, r);
        });

        await batch.commit();
        return true;
    },

    // -----------------------------------------------------
    // Limpar fantasmas do calendário
    // (reservas que estão no calendário mas não no Firestore)
    // -----------------------------------------------------
    async limparFantasmas() {

        const snapCalendario = await db.collection(this.colecaoCalendario).get();
        const snapReservas = await db.collection(this.colecao).get();

        const idsReservas = new Set(snapReservas.docs.map(d => d.id));

        const batch = db.batch();

        snapCalendario.docs.forEach(doc => {
            if (!idsReservas.has(doc.id)) {
                batch.delete(doc.ref);
            }
        });

        await batch.commit();
        return true;
    }
};
