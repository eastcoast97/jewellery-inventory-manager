/**
 * Supplier API API Routes
 * REST endpoints for suppliers
 */

import { Router, Request, Response } from 'express';

const router = Router();

// GET /supplier-api
router.get('/', async (req: Request, res: Response) => {
  res.json({ message: 'Supplier API endpoint' });
});

// POST /supplier-api
router.post('/', async (req: Request, res: Response) => {
  res.json({ message: 'Supplier API created' });
});

export default router;
