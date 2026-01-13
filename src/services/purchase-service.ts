/**
 * Purchase Service Service
 * Business logic for purchases
 * 
 * Acceptance Criteria:
 * - Create new purchase
 * - Update existing purchase
 * - Get purchase details
 * - Get all purchases
 */

import { prisma } from '../db/client';

export interface PurchaseServiceData {
  id?: string;
  [key: string]: unknown;
}

export class PurchaseServiceService {
  /**
   * Get all purchase-service records
   */
  async findAll(options?: { skip?: number; take?: number; where?: Record<string, unknown> }) {
    return prisma.purchaseservice.findMany({
      skip: options?.skip,
      take: options?.take ?? 50,
      where: options?.where,
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Get a single purchase-service by ID
   */
  async findById(id: string) {
    return prisma.purchaseservice.findUnique({
      where: { id },
    });
  }

  /**
   * Create a new purchase-service
   */
  async create(data: Omit<PurchaseServiceData, 'id'>) {
    return prisma.purchaseservice.create({
      data: data as never,
    });
  }

  /**
   * Update an existing purchase-service
   */
  async update(id: string, data: Partial<PurchaseServiceData>) {
    return prisma.purchaseservice.update({
      where: { id },
      data: data as never,
    });
  }

  /**
   * Delete a purchase-service
   */
  async delete(id: string) {
    return prisma.purchaseservice.delete({
      where: { id },
    });
  }

  /**
   * Count purchase-service records
   */
  async count(where?: Record<string, unknown>) {
    return prisma.purchaseservice.count({ where });
  }
}

export const purchaseserviceService = new PurchaseServiceService();
