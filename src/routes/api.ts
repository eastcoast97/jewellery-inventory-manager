/**
 * API API Routes
 * REST endpoints for the application
 */

import { Router, Request, Response } from 'express';

const router = Router();

// GET /api
router.get('/', async (req: Request, res: Response) => {
  res.json({ message: 'API endpoint' });
});

// POST /api
router.post('/', async (req: Request, res: Response) => {
  res.json({ message: 'API created' });
});

export default router;
