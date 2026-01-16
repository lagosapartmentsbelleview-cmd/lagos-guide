// reservasModel.js

import { obterPercentagemComissao, formatarEuro } from './configComissoes.js';

export function normalizarReserva(dadosBrutos) {
  const origem = dadosBrutos.origem ?? 'manual';
  const pais = dadosBrutos.pais ?? 'pt';
  const preco = Number(dadosBrutos.preco ?? 0);

  // Se já vier comissão do Excel, respeitamos
  let comissaoPercentagem = dadosBrutos.comissao_percentagem;
  let comissaoValor = dadosBrutos.comissao_valor;

  // Se não vier percentagem, usamos a da origem
  if (comissaoPercentagem == null) {
    comissaoPercentagem = obterPercentagemComissao(origem);
  }

  // Se não vier valor, calculamos
  if (comissaoValor == null) {
    comissaoValor = preco * comissaoPercentagem;
  }

  // Formatar valores monetários
  const precoFormatado = formatarEuro(preco);
  const comissaoValorFormatado = formatarEuro(comissaoValor);

  return {
    ...dadosBrutos,
    origem,
    pais,
    preco,
    preco_formatado: precoFormatado,
    comissao_percentagem: comissaoPercentagem,
    comissao_valor: comissaoValor,
    comissao_valor_formatado: comissaoValorFormatado,
  };
}
