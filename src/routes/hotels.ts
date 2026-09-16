import { Router } from 'express';
import { hotelsStore } from '../store/fileStore';

const router = Router();

router.get('/', async (req, res) => {
  const market = req.query.market as string;
  const tier = req.query.tier as string;

  let filtered = await hotelsStore.list();
  if (market && market !== 'ALL') {
    filtered = filtered.filter((hotel) => hotel.market === market);
  }
  if (tier && tier !== 'ALL') {
    filtered = filtered.filter((hotel) => hotel.tier === tier);
  }

  res.json(filtered);
});

export default router;
