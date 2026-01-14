/**
 * Supplier API API Routes
 * REST endpoints for suppliers
 * 
 * RESTful CRUD endpoints
 */

import { Router, Request, Response } from 'express';
import { supplierapiService } from '../services/supplier-api';

const router = Router();

/**
 * GET /supplier-api
 * List all supplier-api with pagination
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      supplierapiService.findAll({ skip, take: limit }),
      supplierapiService.count(),
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
    console.error('Error fetching supplier-api:', error);
    res.status(500).json({ error: 'Failed to fetch supplier-api' });
  }
});

/**
 * GET /supplier-api/:id
 * Get a single supplier-api by ID
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const item = await supplierapiService.findById(req.params.id);
    
    if (!item) {
      return res.status(404).json({ error: 'SupplierAPI not found' });
    }
    
    res.json({ data: item });
  } catch (error) {
    console.error('Error fetching supplier-api:', error);
    res.status(500).json({ error: 'Failed to fetch supplier-api' });
  }
});

/**
 * POST /supplier-api
 * Create a new supplier-api
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    const item = await supplierapiService.create(req.body);
    res.status(201).json({ data: item, message: 'SupplierAPI created successfully' });
  } catch (error) {
    console.error('Error creating supplier-api:', error);
    res.status(500).json({ error: 'Failed to create supplier-api' });
  }
});

/**
 * PUT /supplier-api/:id
 * Update an existing supplier-api
 */
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const item = await supplierapiService.update(req.params.id, req.body);
    res.json({ data: item, message: 'SupplierAPI updated successfully' });
  } catch (error) {
    console.error('Error updating supplier-api:', error);
    res.status(500).json({ error: 'Failed to update supplier-api' });
  }
});

/**
 * PATCH /supplier-api/:id
 * Partially update an existing supplier-api
 */
router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const item = await supplierapiService.update(req.params.id, req.body);
    res.json({ data: item, message: 'SupplierAPI updated successfully' });
  } catch (error) {
    console.error('Error updating supplier-api:', error);
    res.status(500).json({ error: 'Failed to update supplier-api' });
  }
});

/**
 * DELETE /supplier-api/:id
 * Delete a supplier-api
 */
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await supplierapiService.delete(req.params.id);
    res.json({ message: 'SupplierAPI deleted successfully' });
  } catch (error) {
    console.error('Error deleting supplier-api:', error);
    res.status(500).json({ error: 'Failed to delete supplier-api' });
  }
});

export default router;
