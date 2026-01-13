/**
 * Dashboard API API Routes
 * REST endpoints for dashboard data
 */

import { Router, Request, Response } from 'express';

const router = Router();

// GET /dashboard-api
router.get('/', async (req: Request, res: Response) => {
  res.json({ message: 'Dashboard API endpoint' });
});

// POST /dashboard-api
router.post('/', async (req: Request, res: Response) => {
  res.json({ message: 'Dashboard API created' });
});

export default router;
