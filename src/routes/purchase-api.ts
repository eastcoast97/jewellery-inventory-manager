/**
 * Purchase API API Routes
 * REST endpoints for purchases
 * 
 * RESTful CRUD endpoints
 */

import { Router, Request, Response } from 'express';
import { purchaseapiService } from '../services/purchase-api';

const router = Router();

/**
 * GET /purchase-api
 * List all purchase-api with pagination
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      purchaseapiService.findAll({ skip, take: limit }),
      purchaseapiService.count(),
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
    console.error('Error fetching purchase-api:', error);
    res.status(500).json({ error: 'Failed to fetch purchase-api' });
  }
});

/**
 * GET /purchase-api/:id
 * Get a single purchase-api by ID
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const item = await purchaseapiService.findById(req.params.id);
    
    if (!item) {
      return res.status(404).json({ error: 'PurchaseAPI not found' });
    }
    
    res.json({ data: item });
  } catch (error) {
    console.error('Error fetching purchase-api:', error);
    res.status(500).json({ error: 'Failed to fetch purchase-api' });
  }
});

/**
 * POST /purchase-api
 * Create a new purchase-api
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    const item = await purchaseapiService.create(req.body);
    res.status(201).json({ data: item, message: 'PurchaseAPI created successfully' });
  } catch (error) {
    console.error('Error creating purchase-api:', error);
    res.status(500).json({ error: 'Failed to create purchase-api' });
  }
});

/**
 * PUT /purchase-api/:id
 * Update an existing purchase-api
 */
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const item = await purchaseapiService.update(req.params.id, req.body);
    res.json({ data: item, message: 'PurchaseAPI updated successfully' });
  } catch (error) {
    console.error('Error updating purchase-api:', error);
    res.status(500).json({ error: 'Failed to update purchase-api' });
  }
});

/**
 * PATCH /purchase-api/:id
 * Partially update an existing purchase-api
 */
router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const item = await purchaseapiService.update(req.params.id, req.body);
    res.json({ data: item, message: 'PurchaseAPI updated successfully' });
  } catch (error) {
    console.error('Error updating purchase-api:', error);
    res.status(500).json({ error: 'Failed to update purchase-api' });
  }
});

/**
 * DELETE /purchase-api/:id
 * Delete a purchase-api
 */
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await purchaseapiService.delete(req.params.id);
    res.json({ message: 'PurchaseAPI deleted successfully' });
  } catch (error) {
    console.error('Error deleting purchase-api:', error);
    res.status(500).json({ error: 'Failed to delete purchase-api' });
  }
});

export default router;
