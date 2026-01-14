/**
 * Purchase Service Service
 * Business logic for purchases
 * 
 * Acceptance Criteria:
 * - Create purchase
 * - Update purchase
 * - View purchase details
 */

import { prisma } from '../db/client';

export interface PurchaseData {
  id?: string;
  [key: string]: unknown;
}

export class PurchaseServiceService {
  /**
   * Get all purchase records
   */
  async findAll(options?: { skip?: number; take?: number; where?: Record<string, unknown> }) {
    return prisma.purchase.findMany({
      skip: options?.skip,
      take: options?.take ?? 50,
      where: options?.where,
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Get a single purchase by ID
   */
  async findById(id: string) {
    return prisma.purchase.findUnique({
      where: { id },
    });
  }

  /**
   * Create a new purchase
   */
  async create(data: Omit<PurchaseData, 'id'>) {
    return prisma.purchase.create({
      data: data as never,
    });
  }

  /**
   * Update an existing purchase
   */
  async update(id: string, data: Partial<PurchaseData>) {
    return prisma.purchase.update({
      where: { id },
      data: data as never,
    });
  }

  /**
   * Delete a purchase
   */
  async delete(id: string) {
    return prisma.purchase.delete({
      where: { id },
    });
  }

  /**
   * Count purchase records
   */
  async count(where?: Record<string, unknown>) {
    return prisma.purchase.count({ where });
  }
}

export const purchaseserviceService = new PurchaseServiceService();
