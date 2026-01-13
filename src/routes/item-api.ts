/**
 * Item API API Routes
 * REST endpoints for items
 */

import { Router, Request, Response } from 'express';

const router = Router();

// GET /item-api
router.get('/', async (req: Request, res: Response) => {
  res.json({ message: 'Item API endpoint' });
});

// POST /item-api
router.post('/', async (req: Request, res: Response) => {
  res.json({ message: 'Item API created' });
});

export default router;
