/**
 * Dashboard API API Routes
 * REST endpoints for dashboard data
 * 
 * RESTful CRUD endpoints
 */

import { Router, Request, Response } from 'express';
import { dashboardapiService } from '../services/dashboard-api';

const router = Router();

/**
 * GET /dashboard-api
 * List all dashboard-api with pagination
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      dashboardapiService.findAll({ skip, take: limit }),
      dashboardapiService.count(),
    ]);

    res.json({
      data: items,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching dashboard-api:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard-api' });
  }
});

/**
 * GET /dashboard-api/:id
 * Get a single dashboard-api by ID
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const item = await dashboardapiService.findById(req.params.id);
    
    if (!item) {
      return res.status(404).json({ error: 'DashboardAPI not found' });
    }
    
    res.json({ data: item });
  } catch (error) {
    console.error('Error fetching dashboard-api:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard-api' });
  }
});

/**
 * POST /dashboard-api
 * Create a new dashboard-api
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    const item = await dashboardapiService.create(req.body);
    res.status(201).json({ data: item, message: 'DashboardAPI created successfully' });
  } catch (error) {
    console.error('Error creating dashboard-api:', error);
    res.status(500).json({ error: 'Failed to create dashboard-api' });
  }
});

/**
 * PUT /dashboard-api/:id
 * Update an existing dashboard-api
 */
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const item = await dashboardapiService.update(req.params.id, req.body);
    res.json({ data: item, message: 'DashboardAPI updated successfully' });
  } catch (error) {
    console.error('Error updating dashboard-api:', error);
    res.status(500).json({ error: 'Failed to update dashboard-api' });
  }
});

/**
 * PATCH /dashboard-api/:id
 * Partially update an existing dashboard-api
 */
router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const item = await dashboardapiService.update(req.params.id, req.body);
    res.json({ data: item, message: 'DashboardAPI updated successfully' });
  } catch (error) {
    console.error('Error updating dashboard-api:', error);
    res.status(500).json({ error: 'Failed to update dashboard-api' });
  }
});

/**
 * DELETE /dashboard-api/:id
 * Delete a dashboard-api
 */
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await dashboardapiService.delete(req.params.id);
    res.json({ message: 'DashboardAPI deleted successfully' });
  } catch (error) {
    console.error('Error deleting dashboard-api:', error);
    res.status(500).json({ error: 'Failed to delete dashboard-api' });
  }
});

export default router;
