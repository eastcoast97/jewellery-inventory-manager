/**
 * Purchase API API Routes
 * REST endpoints for purchases
 */

import { Router, Request, Response } from 'express';

const router = Router();

// GET /purchase-api
router.get('/', async (req: Request, res: Response) => {
  res.json({ message: 'Purchase API endpoint' });
});

// POST /purchase-api
router.post('/', async (req: Request, res: Response) => {
  res.json({ message: 'Purchase API created' });
});

export default router;
