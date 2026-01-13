/**
 * API API Routes
 * REST endpoints for services
 * 
 * RESTful CRUD endpoints
 */

import { Router, Request, Response } from 'express';
import { apiService } from '../services/api';

const router = Router();

/**
 * GET /api
 * List all api with pagination
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      apiService.findAll({ skip, take: limit }),
      apiService.count(),
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
    console.error('Error fetching api:', error);
    res.status(500).json({ error: 'Failed to fetch api' });
  }
});

/**
 * GET /api/:id
 * Get a single api by ID
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const item = await apiService.findById(req.params.id);
    
    if (!item) {
      return res.status(404).json({ error: 'API not found' });
    }
    
    res.json({ data: item });
  } catch (error) {
    console.error('Error fetching api:', error);
    res.status(500).json({ error: 'Failed to fetch api' });
  }
});

/**
 * POST /api
 * Create a new api
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    const item = await apiService.create(req.body);
    res.status(201).json({ data: item, message: 'API created successfully' });
  } catch (error) {
    console.error('Error creating api:', error);
    res.status(500).json({ error: 'Failed to create api' });
  }
});

/**
 * PUT /api/:id
 * Update an existing api
 */
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const item = await apiService.update(req.params.id, req.body);
    res.json({ data: item, message: 'API updated successfully' });
  } catch (error) {
    console.error('Error updating api:', error);
    res.status(500).json({ error: 'Failed to update api' });
  }
});

/**
 * PATCH /api/:id
 * Partially update an existing api
 */
router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const item = await apiService.update(req.params.id, req.body);
    res.json({ data: item, message: 'API updated successfully' });
  } catch (error) {
    console.error('Error updating api:', error);
    res.status(500).json({ error: 'Failed to update api' });
  }
});

/**
 * DELETE /api/:id
 * Delete a api
 */
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await apiService.delete(req.params.id);
    res.json({ message: 'API deleted successfully' });
  } catch (error) {
    console.error('Error deleting api:', error);
    res.status(500).json({ error: 'Failed to delete api' });
  }
});

export default router;
