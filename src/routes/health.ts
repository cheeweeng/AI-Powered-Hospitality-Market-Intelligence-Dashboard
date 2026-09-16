import { Router } from 'express';

const router = Router();

router.get('/', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'ACCOMY Market Intelligence API',
    openrouterConfigured: !!process.env.OPENROUTER_API_KEY,
    timestamp: new Date().toISOString(),
  });
});

export default router;
