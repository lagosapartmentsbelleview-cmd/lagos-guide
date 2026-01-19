import { ReservaUtils } from "../utils/ReservaUtils.js";
import { ReservaFinanceiro } from "../utils/ReservaFinanceiro.js";
import { ReservaModel } from "../models/ReservaModel.js";


// ---------------------------------------------------------
// BookingImportEngine
// Converte uma linha do Excel Booking → ReservaModel
// ---------------------------------------------------------

export const BookingImportEngine = {

    importarLinha(row) {

        // 1) Normalizar dados brutos da Booking
        const dados = ReservaUtils.normalizarLinhaBooking(row);

        // 2) Converter datas para ISO (sistema interno)
        const checkinISO = dados.checkin;
        const checkoutISO = dados.checkout;

        // 3) Calcular noites (caso o Excel falhe)
        const noites = ReservaUtils.calcularNoites(checkinISO, checkoutISO) || dados.noites;

        // 4) Percentagens de comissão
        // Booking → 1.4% pagamento + comissão de serviço já incluída no Excel
        const percentagemPagamento = 0.014;
        const percentagemServico = 0; // Booking já traz comissão no Excel

        // 5) Cálculos financeiros completos
        const financeiro = ReservaFinanceiro.calcularTudo({
            totalBruto: dados.totalBruto,
            percentagemServico,
            percentagemPagamento,
            limpeza: 0,
            noites,
            valorPagoParcial: 0,
            valorPagoFinal: 0
        });

        // 6) Construir objeto final para o modelo
        const reservaFinal = new ReservaModel({
            origem: "Booking",
            bookingId: dados.bookingId,

            // Hóspede
            cliente: dados.cliente,
            paisCliente: dados.paisCliente,
            telefone: dados.telefone,
            morada: dados.morada,

            // Hóspedes
            hospedes: dados.hospedes,
            adultos: dados.adultos,
            criancas: dados.criancas,
            idadesCriancas: dados.idadesCriancas,

            // Alojamento
            quartos: dados.quartos,
            apartamentos: [], // ainda não alocado

            // Datas
            checkin: checkinISO,
            checkout: checkoutISO,
            dataReserva: dados.dataReserva,

            // Financeiro
            totalBruto: dados.totalBruto,
            comissaoServico: financeiro.comissaoServico,
            percentagemPagamento,
            comissaoExtra: dados.comissaoExtra,
            comissaoTotal: financeiro.comissaoTotal,
            precoNoite: financeiro.precoNoite,
            limpeza: 0,
            liquido: financeiro.liquido,

            // Pagamento
            statusPagamento: financeiro.statusPagamento,
            valorPago: financeiro.valorPago,
            valorEmFalta: financeiro.valorEmFalta,

            // Extras Booking
            estadoPagamentoOrigem: dados.estadoPagamentoOrigem,
            comentarios: dados.comentarios,
            motivo: dados.motivo,
            dispositivo: dados.dispositivo,
            modoViagem: dados.modoViagem,
            tipoUnidade: dados.tipoUnidade,

            // Sistema
            noites,
            estadoReserva: dados.estadoReserva,
            criadoEm: new Date().toISOString()
        });

        return reservaFinal;
    }
};
