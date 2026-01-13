/**
 * Customer API API Routes
 * REST endpoints for customers
 */

import { Router, Request, Response } from 'express';

const router = Router();

// GET /customer-api
router.get('/', async (req: Request, res: Response) => {
  res.json({ message: 'Customer API endpoint' });
});

// POST /customer-api
router.post('/', async (req: Request, res: Response) => {
  res.json({ message: 'Customer API created' });
});

export default router;
