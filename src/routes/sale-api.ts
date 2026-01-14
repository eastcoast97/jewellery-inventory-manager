/**
 * Sale API API Routes
 * REST endpoints for sales
 * 
 * RESTful CRUD endpoints
 */

import { Router, Request, Response } from 'express';
import { saleapiService } from '../services/sale-api';

const router = Router();

/**
 * GET /sale-api
 * List all sale-api with pagination
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      saleapiService.findAll({ skip, take: limit }),
      saleapiService.count(),
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
    console.error('Error fetching sale-api:', error);
    res.status(500).json({ error: 'Failed to fetch sale-api' });
  }
});

/**
 * GET /sale-api/:id
 * Get a single sale-api by ID
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const item = await saleapiService.findById(req.params.id);
    
    if (!item) {
      return res.status(404).json({ error: 'SaleAPI not found' });
    }
    
    res.json({ data: item });
  } catch (error) {
    console.error('Error fetching sale-api:', error);
    res.status(500).json({ error: 'Failed to fetch sale-api' });
  }
});

/**
 * POST /sale-api
 * Create a new sale-api
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    const item = await saleapiService.create(req.body);
    res.status(201).json({ data: item, message: 'SaleAPI created successfully' });
  } catch (error) {
    console.error('Error creating sale-api:', error);
    res.status(500).json({ error: 'Failed to create sale-api' });
  }
});

/**
 * PUT /sale-api/:id
 * Update an existing sale-api
 */
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const item = await saleapiService.update(req.params.id, req.body);
    res.json({ data: item, message: 'SaleAPI updated successfully' });
  } catch (error) {
    console.error('Error updating sale-api:', error);
    res.status(500).json({ error: 'Failed to update sale-api' });
  }
});

/**
 * PATCH /sale-api/:id
 * Partially update an existing sale-api
 */
router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const item = await saleapiService.update(req.params.id, req.body);
    res.json({ data: item, message: 'SaleAPI updated successfully' });
  } catch (error) {
    console.error('Error updating sale-api:', error);
    res.status(500).json({ error: 'Failed to update sale-api' });
  }
});

/**
 * DELETE /sale-api/:id
 * Delete a sale-api
 */
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await saleapiService.delete(req.params.id);
    res.json({ message: 'SaleAPI deleted successfully' });
  } catch (error) {
    console.error('Error deleting sale-api:', error);
    res.status(500).json({ error: 'Failed to delete sale-api' });
  }
});

export default router;
