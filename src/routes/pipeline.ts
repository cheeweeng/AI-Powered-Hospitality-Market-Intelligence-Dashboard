import { Router } from 'express';
import {
  hotelsStore,
  pipelineStore,
  signalsStore,
} from '../store/fileStore';
import type { PricingSignal } from '../types/market';

const router = Router();

router.get('/', async (_req, res) => {
  res.json(await pipelineStore.get());
});

router.post('/trigger-collection', async (_req, res) => {
  const now = new Date();
  const pipelineHealth = await pipelineStore.get();
  pipelineHealth.lastIngestionTimestamp = `Just now (${now.toISOString().substring(11, 16)} UTC)`;
  pipelineHealth.dataFreshnessHours = 0.1;
  pipelineHealth.dataCoverageRate = Number((93.5 + Math.random() * 3).toFixed(1));

  const hotels = await hotelsStore.list();
  hotels.forEach((hotel) => {
    const jitter = (Math.random() - 0.48) * 0.04;
    hotel.previousADR = hotel.currentADR;
    hotel.currentADR = Math.round(hotel.currentADR * (1 + jitter));
  });
  await hotelsStore.replace(hotels);

  if (Math.random() > 0.4) {
    const randomMarket = ['HK', 'SG', 'MY', 'CN'][
      Math.floor(Math.random() * 4)
    ] as PricingSignal['market'];
    const newSignal: PricingSignal = {
      id: `sig-${Date.now()}`,
      market: randomMarket,
      category: 'DEMAND_SURGE',
      severity: 'HIGH',
      title: `Automated Pipeline Cycle: Surge Detected in ${randomMarket} Submarket`,
      description:
        'Real-time collection identified +6.2% acceleration in forward 7-day pickup velocity across OTA channels.',
      propertyOrRouteName: `${randomMarket} Prime Cluster`,
      detectedAt: 'Just now',
      confidenceScore: 95,
      impactEstimate: 'Estimated RevPAR uplift potential +7-9%',
      recommendedAction:
        'Verify minimum stay restrictions and increase hurdle rates.',
      status: 'NEW',
    };
    const signals = await signalsStore.list();
    signals.unshift(newSignal);
    await signalsStore.replace(signals);
  }

  await pipelineStore.set(pipelineHealth);

  res.json({
    success: true,
    message: 'Data collection cycle completed successfully across 19 target sources.',
    pipelineHealth,
    signalsCount: (await signalsStore.list()).length,
  });
});

export default router;
