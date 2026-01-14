/**
 * Customer API API Routes
 * REST endpoints for customers
 * 
 * RESTful CRUD endpoints
 */

import { Router, Request, Response } from 'express';
import { customerapiService } from '../services/customer-api';

const router = Router();

/**
 * GET /customer-api
 * List all customer-api with pagination
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      customerapiService.findAll({ skip, take: limit }),
      customerapiService.count(),
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
    console.error('Error fetching customer-api:', error);
    res.status(500).json({ error: 'Failed to fetch customer-api' });
  }
});

/**
 * GET /customer-api/:id
 * Get a single customer-api by ID
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const item = await customerapiService.findById(req.params.id);
    
    if (!item) {
      return res.status(404).json({ error: 'CustomerAPI not found' });
    }
    
    res.json({ data: item });
  } catch (error) {
    console.error('Error fetching customer-api:', error);
    res.status(500).json({ error: 'Failed to fetch customer-api' });
  }
});

/**
 * POST /customer-api
 * Create a new customer-api
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    const item = await customerapiService.create(req.body);
    res.status(201).json({ data: item, message: 'CustomerAPI created successfully' });
  } catch (error) {
    console.error('Error creating customer-api:', error);
    res.status(500).json({ error: 'Failed to create customer-api' });
  }
});

/**
 * PUT /customer-api/:id
 * Update an existing customer-api
 */
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const item = await customerapiService.update(req.params.id, req.body);
    res.json({ data: item, message: 'CustomerAPI updated successfully' });
  } catch (error) {
    console.error('Error updating customer-api:', error);
    res.status(500).json({ error: 'Failed to update customer-api' });
  }
});

/**
 * PATCH /customer-api/:id
 * Partially update an existing customer-api
 */
router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const item = await customerapiService.update(req.params.id, req.body);
    res.json({ data: item, message: 'CustomerAPI updated successfully' });
  } catch (error) {
    console.error('Error updating customer-api:', error);
    res.status(500).json({ error: 'Failed to update customer-api' });
  }
});

/**
 * DELETE /customer-api/:id
 * Delete a customer-api
 */
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await customerapiService.delete(req.params.id);
    res.json({ message: 'CustomerAPI deleted successfully' });
  } catch (error) {
    console.error('Error deleting customer-api:', error);
    res.status(500).json({ error: 'Failed to delete customer-api' });
  }
});

export default router;
