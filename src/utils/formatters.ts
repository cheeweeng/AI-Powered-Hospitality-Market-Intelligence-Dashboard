export const FX_RATES: Record<string, number> = {
  USD: 1.0,
  HKD: 7.78,
  SGD: 1.34,
  MYR: 4.45,
  CNY: 7.23,
};

export function formatCurrency(amountUSD: number, targetCurrency: string = 'USD'): string {
  const rate = FX_RATES[targetCurrency] || 1.0;
  const converted = amountUSD * rate;
  
  const symbolMap: Record<string, string> = {
    USD: '$',
    HKD: 'HK$',
    SGD: 'S$',
    MYR: 'RM ',
    CNY: '¥',
  };

  const symbol = symbolMap[targetCurrency] || '$';

  return `${symbol}${converted.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
}

export function convertFromLocalToSelected(
  localAmount: number,
  localCurrency: string,
  targetCurrency: string
): string {
  const localToUsd = localAmount / (FX_RATES[localCurrency] || 1.0);
  return formatCurrency(localToUsd, targetCurrency);
}
