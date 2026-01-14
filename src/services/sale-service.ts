/**
 * Sale Service Service
 * Business logic for sales
 * 
 * Acceptance Criteria:
 * - Create sale
 * - Update sale
 * - View sale details
 */

import { prisma } from '../db/client';

export interface SaleData {
  id?: string;
  [key: string]: unknown;
}

export class SaleServiceService {
  /**
   * Get all sale records
   */
  async findAll(options?: { skip?: number; take?: number; where?: Record<string, unknown> }) {
    return prisma.sale.findMany({
      skip: options?.skip,
      take: options?.take ?? 50,
      where: options?.where,
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Get a single sale by ID
   */
  async findById(id: string) {
    return prisma.sale.findUnique({
      where: { id },
    });
  }

  /**
   * Create a new sale
   */
  async create(data: Omit<SaleData, 'id'>) {
    return prisma.sale.create({
      data: data as never,
    });
  }

  /**
   * Update an existing sale
   */
  async update(id: string, data: Partial<SaleData>) {
    return prisma.sale.update({
      where: { id },
      data: data as never,
    });
  }

  /**
   * Delete a sale
   */
  async delete(id: string) {
    return prisma.sale.delete({
      where: { id },
    });
  }

  /**
   * Count sale records
   */
  async count(where?: Record<string, unknown>) {
    return prisma.sale.count({ where });
  }
}

export const saleserviceService = new SaleServiceService();
