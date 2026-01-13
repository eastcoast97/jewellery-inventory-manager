/**
 * Sale API API Routes
 * REST endpoints for sales
 */

import { Router, Request, Response } from 'express';

const router = Router();

// GET /sale-api
router.get('/', async (req: Request, res: Response) => {
  res.json({ message: 'Sale API endpoint' });
});

// POST /sale-api
router.post('/', async (req: Request, res: Response) => {
  res.json({ message: 'Sale API created' });
});

export default router;
