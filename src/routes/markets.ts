import { Router } from 'express';
import { marketsStore } from '../store/fileStore';

const router = Router();

router.get('/', async (_req, res) => {
  const list = await marketsStore.list();
  res.json(list);
});

export default router;
