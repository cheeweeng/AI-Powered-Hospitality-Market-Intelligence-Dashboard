import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import {
  INITIAL_AUDIT_CHECKS,
  INITIAL_COMPETITOR_PROMOS,
  INITIAL_FLIGHTS,
  INITIAL_HOTELS,
  INITIAL_MARKETS,
  INITIAL_PIPELINE_HEALTH,
  INITIAL_SIGNALS,
} from '../data/mockMarketData';
import type {
  CompetitorPromo,
  FlightCorridor,
  HotelPropertyRate,
  ManualAuditCheck,
  MarketSummary,
  PipelineHealth,
  PricingSignal,
} from '../types/market';

const DATA_DIR = join(process.cwd(), 'data');

async function ensureDataDir(): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
}

async function loadResource<T>(filename: string, defaultValue: T): Promise<T> {
  await ensureDataDir();
  const filePath = join(DATA_DIR, filename);

  try {
    const raw = await readFile(filePath, 'utf8');
    return JSON.parse(raw) as T;
  } catch {
    await writeFile(filePath, JSON.stringify(defaultValue, null, 2), 'utf8');
    return defaultValue;
  }
}

async function saveResource<T>(filename: string, data: T): Promise<void> {
  await ensureDataDir();
  const filePath = join(DATA_DIR, filename);
  await writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
}

export const marketsStore = {
  list: () => loadResource<MarketSummary[]>('markets.json', INITIAL_MARKETS),
  replace: (list: MarketSummary[]) => saveResource('markets.json', list),
};

export const hotelsStore = {
  list: () => loadResource<HotelPropertyRate[]>('hotels.json', INITIAL_HOTELS),
  replace: (list: HotelPropertyRate[]) => saveResource('hotels.json', list),
};

export const flightsStore = {
  list: () => loadResource<FlightCorridor[]>('flights.json', INITIAL_FLIGHTS),
  replace: (list: FlightCorridor[]) => saveResource('flights.json', list),
};

export const promosStore = {
  list: () => loadResource<CompetitorPromo[]>('promos.json', INITIAL_COMPETITOR_PROMOS),
  replace: (list: CompetitorPromo[]) => saveResource('promos.json', list),
};

export const signalsStore = {
  list: () => loadResource<PricingSignal[]>('signals.json', INITIAL_SIGNALS),
  replace: (list: PricingSignal[]) => saveResource('signals.json', list),
};

export const pipelineStore = {
  get: () => loadResource<PipelineHealth>('pipeline.json', INITIAL_PIPELINE_HEALTH),
  set: (health: PipelineHealth) => saveResource('pipeline.json', health),
};

export const auditsStore = {
  list: () => loadResource<ManualAuditCheck[]>('audits.json', INITIAL_AUDIT_CHECKS),
  create: async (audit: ManualAuditCheck): Promise<ManualAuditCheck> => {
    const current = await auditsStore.list();
    const updated = [audit, ...current];
    await saveResource('audits.json', updated);
    return audit;
  },
};
