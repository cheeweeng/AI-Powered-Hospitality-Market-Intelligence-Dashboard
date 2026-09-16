import { describe, expect, it } from 'vitest';
import { formatCurrency, convertFromLocalToSelected, FX_RATES } from './formatters';

describe('formatCurrency', () => {
  it('formats USD correctly', () => {
    expect(formatCurrency(1234.5)).toBe('$1,235');
  });

  it('formats USD with zero decimals', () => {
    expect(formatCurrency(100)).toBe('$100');
  });

  it('formats CNY with correct symbol', () => {
    // 100 USD * 7.23 = 723 CNY
    expect(formatCurrency(100, 'CNY')).toBe('¥723');
  });

  it('formats HKD with correct symbol', () => {
    // 100 USD * 7.78 = 778 HKD
    expect(formatCurrency(100, 'HKD')).toBe('HK$778');
  });

  it('formats SGD with correct symbol', () => {
    // 100 USD * 1.34 = 134 SGD
    expect(formatCurrency(100, 'SGD')).toBe('S$134');
  });

  it('formats MYR with correct symbol', () => {
    // 100 USD * 4.45 = 445 MYR
    expect(formatCurrency(100, 'MYR')).toBe('RM 445');
  });
});

describe('convertFromLocalToSelected', () => {
  it('converts HKD to USD using FX_RATES', () => {
    const localAmt = 1000; // HKD
    const selected = 'USD';
    const result = convertFromLocalToSelected(localAmt, 'HKD', selected);
    const numeric = Number(result.replace(/[^\d.-]/g, ''));
    expect(numeric).toBeCloseTo(1000 / FX_RATES.HKD, 0);
  });

  it('converts CNY to USD using FX_RATES', () => {
    const localAmt = 1000; // CNY
    const selected = 'USD';
    const result = convertFromLocalToSelected(localAmt, 'CNY', selected);
    const numeric = Number(result.replace(/[^\d.-]/g, ''));
    expect(numeric).toBeCloseTo(1000 / FX_RATES.CNY, 0);
  });

  it('returns same value when converting USD to USD', () => {
    const result = convertFromLocalToSelected(100, 'USD', 'USD');
    expect(result).toBe('$100');
  });
});
