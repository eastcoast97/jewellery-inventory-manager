/**
 * Item API API Routes
 * REST endpoints for items
 * 
 * RESTful CRUD endpoints
 */

import { Router, Request, Response } from 'express';
import { itemapiService } from '../services/item-api';

const router = Router();

/**
 * GET /item-api
 * List all item-api with pagination
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      itemapiService.findAll({ skip, take: limit }),
      itemapiService.count(),
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
    console.error('Error fetching item-api:', error);
    res.status(500).json({ error: 'Failed to fetch item-api' });
  }
});

/**
 * GET /item-api/:id
 * Get a single item-api by ID
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const item = await itemapiService.findById(req.params.id);
    
    if (!item) {
      return res.status(404).json({ error: 'ItemAPI not found' });
    }
    
    res.json({ data: item });
  } catch (error) {
    console.error('Error fetching item-api:', error);
    res.status(500).json({ error: 'Failed to fetch item-api' });
  }
});

/**
 * POST /item-api
 * Create a new item-api
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    const item = await itemapiService.create(req.body);
    res.status(201).json({ data: item, message: 'ItemAPI created successfully' });
  } catch (error) {
    console.error('Error creating item-api:', error);
    res.status(500).json({ error: 'Failed to create item-api' });
  }
});

/**
 * PUT /item-api/:id
 * Update an existing item-api
 */
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const item = await itemapiService.update(req.params.id, req.body);
    res.json({ data: item, message: 'ItemAPI updated successfully' });
  } catch (error) {
    console.error('Error updating item-api:', error);
    res.status(500).json({ error: 'Failed to update item-api' });
  }
});

/**
 * PATCH /item-api/:id
 * Partially update an existing item-api
 */
router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const item = await itemapiService.update(req.params.id, req.body);
    res.json({ data: item, message: 'ItemAPI updated successfully' });
  } catch (error) {
    console.error('Error updating item-api:', error);
    res.status(500).json({ error: 'Failed to update item-api' });
  }
});

/**
 * DELETE /item-api/:id
 * Delete a item-api
 */
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await itemapiService.delete(req.params.id);
    res.json({ message: 'ItemAPI deleted successfully' });
  } catch (error) {
    console.error('Error deleting item-api:', error);
    res.status(500).json({ error: 'Failed to delete item-api' });
  }
});

export default router;
