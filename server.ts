import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import healthRouter from './src/routes/health';
import marketsRouter from './src/routes/markets';
import hotelsRouter from './src/routes/hotels';
import flightsRouter from './src/routes/flights';
import promosRouter from './src/routes/promos';
import signalsRouter from './src/routes/signals';
import pipelineRouter from './src/routes/pipeline';
import auditsRouter from './src/routes/audits';
import aiSummaryRouter from './src/routes/aiSummary';
import {
  hotelsStore,
  marketsStore,
  flightsStore,
  promosStore,
  signalsStore,
  pipelineStore,
} from './src/store/fileStore';
import type { MarketSummary, HotelPropertyRate } from './src/types/market';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/api/health', healthRouter);
app.use('/api/markets', marketsRouter);
app.use('/api/hotels', hotelsRouter);
app.use('/api/flights', flightsRouter);
app.use('/api/promos', promosRouter);
app.use('/api/signals', signalsRouter);
app.use('/api/pipeline', pipelineRouter);
app.use('/api/audits', auditsRouter);
app.use('/api/ai-summary', aiSummaryRouter);

// 2. Overview & Success Metrics
app.get('/api/overview', async (req: Request, res: Response) => {
  const [markets, hotels, signals, promos, flights, pipelineHealth] =
    await Promise.all([
      marketsStore.list(),
      hotelsStore.list(),
      signalsStore.list(),
      promosStore.list(),
      flightsStore.list(),
      pipelineStore.get(),
    ]);

  const activeCriticalSignals = signals.filter(
    (signal) => signal.severity === 'CRITICAL' && signal.status === 'NEW',
  ).length;
  const parityViolations = hotels.filter(
    (hotel) =>
      hotel.rateParityStatus === 'CRITICAL_DISPARITY' ||
      hotel.rateParityStatus === 'OTA_UNDERCUT',
  ).length;

  res.json({
    pipelineHealth,
    metrics: {
      dataCoverage: pipelineHealth.dataCoverageRate,
      freshnessHours: pipelineHealth.dataFreshnessHours,
      accuracyError: pipelineHealth.accuracyErrorRate,
      stakeholderRating: pipelineHealth.stakeholderUsabilityRating,
      insightQuality: pipelineHealth.insightQualityScore,
      uptimePercentage: pipelineHealth.systemUptimePercentage,
    },
    counts: {
      totalMonitoredHotels: hotels.length,
      totalMarkets: markets.length,
      activeSignals: signals.length,
      criticalSignalsCount: activeCriticalSignals,
      parityViolationCount: parityViolations,
      promosTracked: promos.length,
      flightCorridorsTracked: flights.length,
    },
    markets,
  });
});

// Integration with Vite
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[ACCOMY Intelligence Server] listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();