import accounting from "accounting"

export const transformToMoney = (value: string, symbol = 'R$', precision = 2, thousand = '.', decimal = ',') => {
  const valueNumeric = parseFloat(value || "0")
  return accounting.formatMoney(valueNumeric, symbol, precision, thousand, decimal)
}

export const transformToValueAmerican = (value: string): string => {
  // pega o valor que tem R$, pontos e virgulas virgulas e 
  // transforma pra uma string, mas formato americano
  // Remove tudo que não for número
  const rawValue = value.replace(/\D/g, "");
  // Divide por 100 para manter duas casas decimais
  const numericValue: string = (Number(rawValue) / 100).toString();
  return numericValue
}