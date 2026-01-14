/**
 * Report API API Routes
 * REST endpoints for reports
 * 
 * RESTful CRUD endpoints
 */

import { Router, Request, Response } from 'express';
import { reportapiService } from '../services/report-api';

const router = Router();

/**
 * GET /report-api
 * List all report-api with pagination
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      reportapiService.findAll({ skip, take: limit }),
      reportapiService.count(),
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
    console.error('Error fetching report-api:', error);
    res.status(500).json({ error: 'Failed to fetch report-api' });
  }
});

/**
 * GET /report-api/:id
 * Get a single report-api by ID
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const item = await reportapiService.findById(req.params.id);
    
    if (!item) {
      return res.status(404).json({ error: 'ReportAPI not found' });
    }
    
    res.json({ data: item });
  } catch (error) {
    console.error('Error fetching report-api:', error);
    res.status(500).json({ error: 'Failed to fetch report-api' });
  }
});

/**
 * POST /report-api
 * Create a new report-api
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    const item = await reportapiService.create(req.body);
    res.status(201).json({ data: item, message: 'ReportAPI created successfully' });
  } catch (error) {
    console.error('Error creating report-api:', error);
    res.status(500).json({ error: 'Failed to create report-api' });
  }
});

/**
 * PUT /report-api/:id
 * Update an existing report-api
 */
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const item = await reportapiService.update(req.params.id, req.body);
    res.json({ data: item, message: 'ReportAPI updated successfully' });
  } catch (error) {
    console.error('Error updating report-api:', error);
    res.status(500).json({ error: 'Failed to update report-api' });
  }
});

/**
 * PATCH /report-api/:id
 * Partially update an existing report-api
 */
router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const item = await reportapiService.update(req.params.id, req.body);
    res.json({ data: item, message: 'ReportAPI updated successfully' });
  } catch (error) {
    console.error('Error updating report-api:', error);
    res.status(500).json({ error: 'Failed to update report-api' });
  }
});

/**
 * DELETE /report-api/:id
 * Delete a report-api
 */
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await reportapiService.delete(req.params.id);
    res.json({ message: 'ReportAPI deleted successfully' });
  } catch (error) {
    console.error('Error deleting report-api:', error);
    res.status(500).json({ error: 'Failed to delete report-api' });
  }
});

export default router;
