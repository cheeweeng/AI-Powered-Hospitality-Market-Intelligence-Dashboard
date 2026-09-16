import { Router } from 'express';
import { auditsStore, pipelineStore } from '../store/fileStore';
import type { ManualAuditCheck, MarketId } from '../types/market';

const router = Router();

router.get('/', async (_req, res) => {
  res.json(await auditsStore.list());
});

router.post('/', async (req, res) => {
  const {
    auditor,
    propertyName,
    market,
    channel,
    systemRecordedRate,
    verifiedActualRate,
    notes,
  } = req.body;
  const variance = Math.abs(
    (verifiedActualRate - systemRecordedRate) / (systemRecordedRate || 1),
  ) * 100;

  const newAudit: ManualAuditCheck = {
    id: `aud-${Date.now()}`,
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
    auditor: auditor || 'Stakeholder Auditor',
    propertyName,
    market: market as MarketId,
    channel,
    systemRecordedRate: Number(systemRecordedRate),
    verifiedActualRate: Number(verifiedActualRate),
    variancePercentage: Number(variance.toFixed(2)),
    status:
      variance === 0
        ? 'ACCURATE'
        : variance <= 5
          ? 'ACCEPTABLE'
          : 'DISCREPANCY_FLAGGED',
    notes: notes || 'Manual verification audit recorded.',
  };

  await auditsStore.create(newAudit);

  const auditChecks = await auditsStore.list();
  const totalVariance = auditChecks.reduce(
    (acc, audit) => acc + audit.variancePercentage,
    0,
  );
  const pipelineHealth = await pipelineStore.get();
  pipelineHealth.accuracyErrorRate = Number(
    (totalVariance / auditChecks.length).toFixed(2),
  );
  await pipelineStore.set(pipelineHealth);

  res.json({
    success: true,
    audit: newAudit,
    updatedAccuracyErrorRate: pipelineHealth.accuracyErrorRate,
  });
});

export default router;
