// ---------------------------------------------------------
// Motor de Alocação de Reservas
// ---------------------------------------------------------

export const AlocacaoEngine = {

    // -----------------------------------------------------
    // Verifica se duas reservas se sobrepõem
    // -----------------------------------------------------
    intervalosSobrepostos(r1, r2) {
        const c1 = new Date(r1.checkin);
        const o1 = new Date(r1.checkout);
        const c2 = new Date(r2.checkin);
        const o2 = new Date(r2.checkout);

        // Sobreposição ocorre se:
        // c1 < o2  &&  c2 < o1
        return c1 < o2 && c2 < o1;
    },

    // -----------------------------------------------------
    // Verifica se duas reservas partilham apartamentos
    // -----------------------------------------------------
    apartamentosEmComum(r1, r2) {
        const a1 = r1.apartamentos || [];
        const a2 = r2.apartamentos || [];
        return a1.some(a => a2.includes(a));
    },

    // -----------------------------------------------------
    // Verifica conflito entre duas reservas
    // -----------------------------------------------------
    existeConflito(r1, r2) {
        if (!this.apartamentosEmComum(r1, r2)) return false;
        return this.intervalosSobrepostos(r1, r2);
    },

    // -----------------------------------------------------
    // Verifica conflitos entre uma reserva e TODAS as outras
    // -----------------------------------------------------
    encontrarConflitos(reserva, todasReservas) {
        return todasReservas.filter(r => 
            r.id !== reserva.id && this.existeConflito(reserva, r)
        );
    },

    // -----------------------------------------------------
    // Valida se a reserva tem datas válidas
    // -----------------------------------------------------
    validarDatas(reserva) {
        if (!reserva.checkin || !reserva.checkout) return false;
        return new Date(reserva.checkout) > new Date(reserva.checkin);
    },

    // -----------------------------------------------------
    // Valida se a reserva tem apartamentos válidos
    // -----------------------------------------------------
    validarApartamentos(reserva) {
        return Array.isArray(reserva.apartamentos) &&
               reserva.apartamentos.length > 0;
    },

    // -----------------------------------------------------
    // Alocação automática:
    // Escolhe o primeiro apartamento disponível
    // -----------------------------------------------------
    alocarAutomaticamente(reserva, todasReservas, listaApartamentos) {

        for (const apt of listaApartamentos) {

            const reservaTeste = {
                ...reserva,
                apartamentos: [apt]
            };

            const conflitos = this.encontrarConflitos(reservaTeste, todasReservas);

            if (conflitos.length === 0) {
                return [apt]; // apartamento encontrado
            }
        }

        return []; // nenhum disponível
    },

    // -----------------------------------------------------
    // Verifica se a reserva está alocada
    // -----------------------------------------------------
    estaAlocada(reserva) {
        return Array.isArray(reserva.apartamentos) &&
               reserva.apartamentos.length > 0;
    },

    // -----------------------------------------------------
    // Verifica se a reserva é um fantasma (no calendário mas não na listagem)
    // -----------------------------------------------------
    detectarFantasma(reserva, reservasFirestore) {
        return !reservasFirestore.some(r => r.id === reserva.id);
    }
};
