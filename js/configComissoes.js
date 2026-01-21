// Percentagens de comissão por origem
const COMISSOES_ORIGEM = {
  booking: 0.014,   // 1,4%
  airbnb: 0.03,     // exemplo
  manual: 0,        // reservas diretas
};

// Obter percentagem da origem
function obterPercentagemComissao(origem) {
  return COMISSOES_ORIGEM[origem] ?? 0;
}

// Formatar valores monetários como "1 234,12 €"
function formatarEuro(valor) {
  if (isNaN(valor)) return "0,00 €";

  return valor
    .toFixed(2)
    .replace(".", ",")
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " €";
}
