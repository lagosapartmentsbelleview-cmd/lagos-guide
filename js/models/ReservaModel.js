export class ReservaModel {

    constructor(data = {}) {

        // Identificação
        this.id = data.id ?? null;
        this.bookingId = data.bookingId ?? "";

        // Origem
        this.origem = data.origem ?? "Particular";

        // Hóspede
        this.cliente = data.cliente ?? "";
        this.paisCliente = data.paisCliente ?? "pt";
        this.telefone = data.telefone ?? "";
        this.morada = data.morada ?? "";

        // Hóspedes
        this.hospedes = Number(data.hospedes ?? 0);
        this.adultos = Number(data.adultos ?? 0);
        this.criancas = Number(data.criancas ?? 0);
        this.idadesCriancas = data.idadesCriancas ?? "";

        // Alojamento
        this.quartos = Number(data.quartos ?? 1);
        this.apartamentos = Array.isArray(data.apartamentos)
            ? data.apartamentos
            : (data.apartamentos ? String(data.apartamentos).split(",").map(x => x.trim()) : []);

        // Datas (sempre em PT)
        this.checkin = data.checkin ?? "";
        this.checkout = data.checkout ?? "";
        this.dataReserva = data.dataReserva ?? "";
        this.dataCancelamento = data.dataCancelamento ?? null;

        // Financeiro
        this.totalBruto = Number(data.totalBruto ?? 0);
        this.comissaoServico = Number(data.comissaoServico ?? 0);
        this.percentagemPagamento = Number(data.percentagemPagamento ?? 0);
        this.comissaoExtra = Number(data.comissaoExtra ?? 0);
        this.comissaoTotal = Number(data.comissaoTotal ?? 0);
        this.precoNoite = Number(data.precoNoite ?? 0);
        this.limpeza = Number(data.limpeza ?? 0);
        this.liquido = Number(data.liquido ?? 0);
        this.liquidoReal = Number(data.liquidoReal ?? 0);
        this.totalLiquidoFinal = Number(data.totalLiquidoFinal ?? 0);

        // Pagamento
        this.statusPagamento = data.statusPagamento ?? "aguardar";
        this.valorPago = Number(data.valorPago ?? 0);

        // Pagamento parcial
        this.valorPagoParcial = Number(data.valorPagoParcial ?? 0);
        this.dataPagamentoParcial = data.dataPagamentoParcial ?? "";
        this.valorEmFalta = Number(data.valorEmFalta ?? 0);
        this.dataVencimento = data.dataVencimento ?? "";
        this.valorPagoFinal = Number(data.valorPagoFinal ?? 0);
        this.dataPagamentoFinal = data.dataPagamentoFinal ?? "";

        // Estado da reserva
        this.estadoReserva = data.estadoReserva ?? "ok";
        this.status = data.status ?? "alocado";

        // Extras Booking
        this.estadoPagamentoOrigem = data.estadoPagamentoOrigem ?? "";
        this.comentarios = data.comentarios ?? "";
        this.motivo = data.motivo ?? "";
        this.dispositivo = data.dispositivo ?? "";
        this.modoViagem = data.modoViagem ?? "";
        this.tipoUnidade = data.tipoUnidade ?? "Apartment";

        // Sistema
        this.noites = Number(data.noites ?? 0);
        this.criadoEm = data.criadoEm ?? null;
        this.atualizadoEm = data.atualizadoEm ?? null;
    }

    // ---------------------------------------------------------
    // Criar a partir de Firestore
    // ---------------------------------------------------------
    static fromFirestore(doc) {
        return new ReservaModel({
            id: doc.id,
            ...doc.data()
        });
    }

    // ---------------------------------------------------------
    // Criar a partir do formulário
    // ---------------------------------------------------------
    static fromForm(form) {
        return new ReservaModel(form);
    }

    // ---------------------------------------------------------
    // Criar a partir do Excel Booking
    // (BookingImportEngine vai preparar os dados)
    // ---------------------------------------------------------
    static fromBookingExcel(data) {
        return new ReservaModel(data);
    }

    // ---------------------------------------------------------
    // Converter para Firestore
    // ---------------------------------------------------------
    toFirestore() {
        const obj = { ...this };
        delete obj.id;
        return obj;
    }
}
