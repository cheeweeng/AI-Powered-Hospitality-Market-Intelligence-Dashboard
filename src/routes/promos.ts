import { Router } from 'express';
import { promosStore } from '../store/fileStore';

const router = Router();

router.get('/', async (req, res) => {
  const market = req.query.market as string;
  const promos = await promosStore.list();

  if (market && market !== 'ALL') {
    return res.json(promos.filter((promo) => promo.market === market));
  }
  res.json(promos);
});

export default router;
