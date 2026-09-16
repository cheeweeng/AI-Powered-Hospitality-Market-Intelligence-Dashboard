import { describe, expect, it, beforeAll, afterAll } from 'vitest';
import { marketsStore, hotelsStore, flightsStore, promosStore, signalsStore } from './fileStore';
import { INITIAL_MARKETS, INITIAL_HOTELS, INITIAL_FLIGHTS, INITIAL_COMPETITOR_PROMOS, INITIAL_SIGNALS, INITIAL_AUDIT_CHECKS } from '../data/mockMarketData';
import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { MarketSummary } from '../types/market';

const DATA_DIR = join(process.cwd(), 'data');

async function resetMarketsData(): Promise<void> {
  await writeFile(join(DATA_DIR, 'markets.json'), JSON.stringify(INITIAL_MARKETS, null, 2), 'utf8');
}

async function resetHotelsData(): Promise<void> {
  await writeFile(join(DATA_DIR, 'hotels.json'), JSON.stringify(INITIAL_HOTELS, null, 2), 'utf8');
}

async function resetAuditsData(): Promise<void> {
  await writeFile(join(DATA_DIR, 'audits.json'), JSON.stringify(INITIAL_AUDIT_CHECKS, null, 2), 'utf8');
}

describe('fileStore', () => {
  beforeAll(async () => {
    await resetMarketsData();
    await resetHotelsData();
    await resetAuditsData();
  });

  it('marketsStore.list() returns INITIAL_MARKETS data', async () => {
    const markets = await marketsStore.list();
    expect(markets.length).toBe(INITIAL_MARKETS.length);
    expect(markets[0].id).toBe('HK');
    expect(markets[0].name).toBe('Hong Kong SAR');
  });

  it('hotelsStore.list() returns INITIAL_HOTELS data', async () => {
    const hotels = await hotelsStore.list();
    expect(hotels.length).toBe(INITIAL_HOTELS.length);
    expect(hotels[0].id).toBe('hk-01');
    expect(hotels[0].name).toBe('The Upper House Hong Kong');
  });

  it('flightsStore.list() returns INITIAL_FLIGHTS data', async () => {
    const flights = await flightsStore.list();
    expect(flights.length).toBe(INITIAL_FLIGHTS.length);
    expect(flights[0].routeCode).toBe('HKG-SIN');
  });

  it('promosStore.list() returns INITIAL_COMPETITOR_PROMOS data', async () => {
    const promos = await promosStore.list();
    expect(promos.length).toBe(INITIAL_COMPETITOR_PROMOS.length);
    expect(promos[0].competitor).toContain('Trip.com');
  });

  it('signalsStore.list() returns INITIAL_SIGNALS data', async () => {
    const signals = await signalsStore.list();
    expect(signals.length).toBe(INITIAL_SIGNALS.length);
    expect(signals[0].id).toBe('sig-01');
  });

  it('marketsStore.replace() persists data and list() reflects changes', async () => {
    const updatedMarkets: MarketSummary[] = [{
      id: 'HK',
      name: 'Updated Hong Kong SAR',
      country: 'Hong Kong',
      flag: '🇭🇰',
      currency: 'HKD',
      fxRateToUSD: 7.78,
      averageADR: 2000,
      occupancyRate: 85,
      revPAR: 1700,
      adrGrowthYoY: 15,
      occupancyGrowthYoY: 10,
      monitoredPropertiesCount: 50,
      coverageRate: 96,
      lastUpdated: 'Just now',
      keyDrivers: ['Updated driver'],
    }];
    await marketsStore.replace(updatedMarkets);
    const markets = await marketsStore.list();
    expect(markets[0].id).toBe('HK');
    expect(markets[0].name).toBe('Updated Hong Kong SAR');
    // Reset data after test so other tests are not affected
    await resetMarketsData();
  });
});
