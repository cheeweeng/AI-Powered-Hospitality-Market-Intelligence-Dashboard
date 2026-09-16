import { Router } from 'express';
import { flightsStore } from '../store/fileStore';

const router = Router();

router.get('/', async (_req, res) => {
  res.json(await flightsStore.list());
});

export default router;
