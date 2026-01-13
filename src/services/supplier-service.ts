/**
 * Supplier Service Service
 * Business logic for suppliers
 * 
 * Acceptance Criteria:
 * - Create new supplier
 * - Update existing supplier
 * - Get supplier details
 * - Get all suppliers
 */

import { prisma } from '../db/client';

export interface SupplierServiceData {
  id?: string;
  [key: string]: unknown;
}

export class SupplierServiceService {
  /**
   * Get all supplier-service records
   */
  async findAll(options?: { skip?: number; take?: number; where?: Record<string, unknown> }) {
    return prisma.supplierservice.findMany({
      skip: options?.skip,
      take: options?.take ?? 50,
      where: options?.where,
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Get a single supplier-service by ID
   */
  async findById(id: string) {
    return prisma.supplierservice.findUnique({
      where: { id },
    });
  }

  /**
   * Create a new supplier-service
   */
  async create(data: Omit<SupplierServiceData, 'id'>) {
    return prisma.supplierservice.create({
      data: data as never,
    });
  }

  /**
   * Update an existing supplier-service
   */
  async update(id: string, data: Partial<SupplierServiceData>) {
    return prisma.supplierservice.update({
      where: { id },
      data: data as never,
    });
  }

  /**
   * Delete a supplier-service
   */
  async delete(id: string) {
    return prisma.supplierservice.delete({
      where: { id },
    });
  }

  /**
   * Count supplier-service records
   */
  async count(where?: Record<string, unknown>) {
    return prisma.supplierservice.count({ where });
  }
}

export const supplierserviceService = new SupplierServiceService();
