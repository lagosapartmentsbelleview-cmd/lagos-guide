// ---------------------------------------------------------
// Funções utilitárias para reservas
// ---------------------------------------------------------

export const ReservaUtils = {

    // -----------------------------------------------------
    // Datas
    // -----------------------------------------------------

    // Converte "2026-03-15" → "15/03/2026"
    formatarDataPT(dataISO) {
        if (!dataISO) return "";
        const [ano, mes, dia] = dataISO.split("-");
        return `${dia}/${mes}/${ano}`;
    },

    // Converte "15/03/2026" → "2026-03-15"
    formatarDataISO(dataPT) {
        if (!dataPT) return "";
        const [dia, mes, ano] = dataPT.split("/");
        return `${ano}-${mes}-${dia}`;
    },

    // Calcula noites entre duas datas ISO
    calcularNoites(checkinISO, checkoutISO) {
        if (!checkinISO || !checkoutISO) return 0;
        const d1 = new Date(checkinISO);
        const d2 = new Date(checkoutISO);
        const diff = d2 - d1;
        return Math.max(0, Math.round(diff / (1000 * 60 * 60 * 24)));
    },

    // -----------------------------------------------------
    // Valores numéricos
    // -----------------------------------------------------

    // Remove "EU", "€", espaços, vírgulas, etc.
    normalizarValorBooking(valor) {
        if (!valor) return 0;
        return Number(
            String(valor)
                .replace(/[^\d.,-]/g, "")
                .replace(",", ".")
        ) || 0;
    },

    // Formata número → "1 234,56 €"
    formatarEuro(valor) {
        if (isNaN(valor)) return "0,00 €";
        return valor
            .toFixed(2)
            .replace(".", ",")
            .replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " €";
    },

    // -----------------------------------------------------
    // Strings e arrays
    // -----------------------------------------------------

    limparString(str) {
        return str ? String(str).trim() : "";
    },

    // "2301, 2203, 2204" → ["2301","2203","2204"]
    parseApartamentos(str) {
        if (!str) return [];
        return String(str)
            .split(",")
            .map(s => s.trim())
            .filter(s => s.length > 0);
    },

    // "2,3,0" → [2,3,0]
    parseIdadesCriancas(str) {
        if (!str) return [];
        return String(str)
            .split(",")
            .map(x => Number(x.trim()))
            .filter(n => !isNaN(n));
    },

    // -----------------------------------------------------
    // Países
    // -----------------------------------------------------

    // Converte "Spain" → "es", "Germany" → "de"
    normalizarPaisBooking(nomePais) {
        if (!nomePais) return "pt";

        const mapa = {
            "Portugal": "pt",
            "Spain": "es",
            "Germany": "de",
            "France": "fr",
            "United States": "us",
            "United Kingdom": "gb",
            "Brazil": "br",
            "Italy": "it",
            "Netherlands": "nl",
            "Belgium": "be",
            "Switzerland": "ch",
            "Austria": "at",
            "Poland": "pl",
            "Czech Republic": "cz",
            "Romania": "ro",
            "Hungary": "hu",
            "Sweden": "se",
            "Norway": "no",
            "Denmark": "dk",
            "Finland": "fi"
        };

        return mapa[nomePais] ?? "pt";
    },

    // -----------------------------------------------------
    // Hóspedes
    // -----------------------------------------------------

    calcularTotalHospedes(adultos, criancas) {
        return Number(adultos || 0) + Number(criancas || 0);
    },

    // -----------------------------------------------------
    // Booking → Sistema
    // -----------------------------------------------------

    normalizarLinhaBooking(row) {
        return {
            bookingId: row["Número do Reservado por"] ?? "",
            cliente: row["Nome do hóspede"] ?? "",
            checkin: row["Check-in"] ?? "",
            checkout: row["Check-out"] ?? "",
            dataReserva: row["Reservado em"] ?? "",
            estadoReserva: row["Estado"] ?? "ok",

            quartos: Number(row["Quartos"] ?? 1),
            hospedes: Number(row["Pessoas"] ?? 0),
            adultos: Number(row["Adultos"] ?? 0),
            criancas: Number(row["Crianças"] ?? 0),
            idadesCriancas: row["Idade das crianças"] ?? "",

            totalBruto: this.normalizarValorBooking(row["Preço"]),
            comissaoServico: this.normalizarValorBooking(row["Comissão"]),
            comissaoExtra: this.normalizarValorBooking(row["Valor da comissão"]),

            estadoPagamentoOrigem: row["Estado de Método de Pagamento"] ?? "",
            comentarios: row["Comentário"] ?? "",
            modoViagem: row["Grupo de Booker"] ?? "",
            motivo: row["Motivo da viagem"] ?? "",
            dispositivo: row["Dispositivo"] ?? "",
            tipoUnidade: row["Tipo de unidade"] ?? "Apartment",

            noites: Number(row["Duração (dias)"] ?? 0),

            morada: row["Morada"] ?? "",
            telefone: row["Número de telefone"] ?? "",

            paisCliente: this.normalizarPaisBooking(row["País"] ?? "")
        };
    }
};
