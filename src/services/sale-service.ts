/**
 * Sale Service Service
 * Business logic for sales
 * 
 * Acceptance Criteria:
 * - Create new sale
 * - Update existing sale
 * - Get sale details
 * - Get all sales
 */

import { prisma } from '../db/client';

export interface SaleServiceData {
  id?: string;
  [key: string]: unknown;
}

export class SaleServiceService {
  /**
   * Get all sale-service records
   */
  async findAll(options?: { skip?: number; take?: number; where?: Record<string, unknown> }) {
    return prisma.saleservice.findMany({
      skip: options?.skip,
      take: options?.take ?? 50,
      where: options?.where,
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Get a single sale-service by ID
   */
  async findById(id: string) {
    return prisma.saleservice.findUnique({
      where: { id },
    });
  }

  /**
   * Create a new sale-service
   */
  async create(data: Omit<SaleServiceData, 'id'>) {
    return prisma.saleservice.create({
      data: data as never,
    });
  }

  /**
   * Update an existing sale-service
   */
  async update(id: string, data: Partial<SaleServiceData>) {
    return prisma.saleservice.update({
      where: { id },
      data: data as never,
    });
  }

  /**
   * Delete a sale-service
   */
  async delete(id: string) {
    return prisma.saleservice.delete({
      where: { id },
    });
  }

  /**
   * Count sale-service records
   */
  async count(where?: Record<string, unknown>) {
    return prisma.saleservice.count({ where });
  }
}

export const saleserviceService = new SaleServiceService();
