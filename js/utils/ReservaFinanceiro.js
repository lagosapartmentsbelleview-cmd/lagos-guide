// ---------------------------------------------------------
// Cálculos financeiros de reservas
// ---------------------------------------------------------

export const ReservaFinanceiro = {

    // -----------------------------------------------------
    // Comissão de serviço (Booking, Airbnb, etc.)
    // -----------------------------------------------------
    calcularComissaoServico(totalBruto, percentagem) {
        const valor = Number(totalBruto) * Number(percentagem);
        return isNaN(valor) ? 0 : valor;
    },

    // -----------------------------------------------------
    // Comissão de pagamento (cartão, Booking, etc.)
    // percentagemPagamento = 0.014 → 1.4%
    // -----------------------------------------------------
    calcularComissaoPagamento(totalBruto, percentagemPagamento) {
        const valor = Number(totalBruto) * Number(percentagemPagamento);
        return isNaN(valor) ? 0 : valor;
    },

    // -----------------------------------------------------
    // Comissão total
    // -----------------------------------------------------
    calcularComissaoTotal(comissaoServico, comissaoPagamento) {
        return Number(comissaoServico) + Number(comissaoPagamento);
    },

    // -----------------------------------------------------
    // Preço por noite
    // -----------------------------------------------------
    calcularPrecoNoite(totalBruto, noites) {
        if (!noites || noites <= 0) return 0;
        return Number(totalBruto) / Number(noites);
    },

    // -----------------------------------------------------
    // Líquido (antes de pagamentos)
    // -----------------------------------------------------
    calcularLiquido(totalBruto, comissaoTotal, limpeza) {
        return Number(totalBruto) - Number(comissaoTotal) - Number(limpeza || 0);
    },

    // -----------------------------------------------------
    // Pagamento parcial
    // -----------------------------------------------------
    calcularValorEmFalta(totalBruto, valorPagoParcial) {
        const falta = Number(totalBruto) - Number(valorPagoParcial);
        return falta < 0 ? 0 : falta;
    },

    // -----------------------------------------------------
    // Pagamento final (2ª prestação)
    // -----------------------------------------------------
    calcularValorPagoFinal(valorPagoParcial, valorPagoFinal) {
        return Number(valorPagoParcial) + Number(valorPagoFinal);
    },

    // -----------------------------------------------------
    // Estado do pagamento
    // -----------------------------------------------------
    determinarStatusPagamento(totalBruto, valorPago) {

        if (Number(valorPago) >= Number(totalBruto)) {
            return "total";
        }

        if (Number(valorPago) > 0 && Number(valorPago) < Number(totalBruto)) {
            return "parcial";
        }

        return "aguardar";
    },

    // -----------------------------------------------------
    // Cálculo completo (usado no modal e na importação)
    // -----------------------------------------------------
    calcularTudo({
        totalBruto = 0,
        percentagemServico = 0,
        percentagemPagamento = 0,
        limpeza = 0,
        noites = 0,
        valorPagoParcial = 0,
        valorPagoFinal = 0
    }) {

        const comissaoServico = this.calcularComissaoServico(totalBruto, percentagemServico);
        const comissaoPagamento = this.calcularComissaoPagamento(totalBruto, percentagemPagamento);
        const comissaoTotal = this.calcularComissaoTotal(comissaoServico, comissaoPagamento);

        const precoNoite = this.calcularPrecoNoite(totalBruto, noites);
        const liquido = this.calcularLiquido(totalBruto, comissaoTotal, limpeza);

        const valorPago = this.calcularValorPagoFinal(valorPagoParcial, valorPagoFinal);
        const valorEmFalta = this.calcularValorEmFalta(totalBruto, valorPago);

        const statusPagamento = this.determinarStatusPagamento(totalBruto, valorPago);

        return {
            comissaoServico,
            comissaoPagamento,
            comissaoTotal,
            precoNoite,
            liquido,
            valorPago,
            valorEmFalta,
            statusPagamento
        };
    }
};
