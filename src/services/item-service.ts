/**
 * Item Service Service
 * Business logic for items
 * 
 * Acceptance Criteria:
 * - Create item
 * - Update item
 * - Mark item as sold, reserved, or returned
 * - Calculate item price based on daily metal rates, making charges, wastage, GST, and stone value
 */

import { prisma } from '../db/client';

export interface ItemData {
  id?: string;
  [key: string]: unknown;
}

export class ItemServiceService {
  /**
   * Get all item records
   */
  async findAll(options?: { skip?: number; take?: number; where?: Record<string, unknown> }) {
    return prisma.item.findMany({
      skip: options?.skip,
      take: options?.take ?? 50,
      where: options?.where,
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Get a single item by ID
   */
  async findById(id: string) {
    return prisma.item.findUnique({
      where: { id },
    });
  }

  /**
   * Create a new item
   */
  async create(data: Omit<ItemData, 'id'>) {
    return prisma.item.create({
      data: data as never,
    });
  }

  /**
   * Update an existing item
   */
  async update(id: string, data: Partial<ItemData>) {
    return prisma.item.update({
      where: { id },
      data: data as never,
    });
  }

  /**
   * Delete a item
   */
  async delete(id: string) {
    return prisma.item.delete({
      where: { id },
    });
  }

  /**
   * Count item records
   */
  async count(where?: Record<string, unknown>) {
    return prisma.item.count({ where });
  }
}

export const itemserviceService = new ItemServiceService();
