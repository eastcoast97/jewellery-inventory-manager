/**
 * Supplier Service Service
 * Business logic for suppliers
 * 
 * Acceptance Criteria:
 * - Create supplier
 * - Update supplier
 * - View supplier details
 */

import { prisma } from '../db/client';

export interface SupplierData {
  id?: string;
  [key: string]: unknown;
}

export class SupplierServiceService {
  /**
   * Get all supplier records
   */
  async findAll(options?: { skip?: number; take?: number; where?: Record<string, unknown> }) {
    return prisma.supplier.findMany({
      skip: options?.skip,
      take: options?.take ?? 50,
      where: options?.where,
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Get a single supplier by ID
   */
  async findById(id: string) {
    return prisma.supplier.findUnique({
      where: { id },
    });
  }

  /**
   * Create a new supplier
   */
  async create(data: Omit<SupplierData, 'id'>) {
    return prisma.supplier.create({
      data: data as never,
    });
  }

  /**
   * Update an existing supplier
   */
  async update(id: string, data: Partial<SupplierData>) {
    return prisma.supplier.update({
      where: { id },
      data: data as never,
    });
  }

  /**
   * Delete a supplier
   */
  async delete(id: string) {
    return prisma.supplier.delete({
      where: { id },
    });
  }

  /**
   * Count supplier records
   */
  async count(where?: Record<string, unknown>) {
    return prisma.supplier.count({ where });
  }
}

export const supplierserviceService = new SupplierServiceService();
