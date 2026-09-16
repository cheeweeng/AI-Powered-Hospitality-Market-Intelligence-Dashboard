import { Router } from 'express';
import { signalsStore } from '../store/fileStore';

const router = Router();

router.get('/', async (_req, res) => {
  res.json(await signalsStore.list());
});

router.post('/:id/action', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const signals = await signalsStore.list();
  const signal = signals.find((item) => item.id === id);

  if (!signal) {
    return res.status(404).json({ error: 'Signal not found' });
  }

  signal.status = status;
  await signalsStore.replace(signals);
  res.json({ success: true, signal });
});

export default router;
