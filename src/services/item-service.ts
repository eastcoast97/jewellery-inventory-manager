/**
 * Item Service Service
 * Business logic for items
 * 
 * Acceptance Criteria:
 * - Create new item
 * - Update existing item
 * - Mark item as sold, reserved, or returned
 * - Get item details
 * - Get all items
 */

import { prisma } from '../db/client';

export interface ItemServiceData {
  id?: string;
  [key: string]: unknown;
}

export class ItemServiceService {
  /**
   * Get all item-service records
   */
  async findAll(options?: { skip?: number; take?: number; where?: Record<string, unknown> }) {
    return prisma.itemservice.findMany({
      skip: options?.skip,
      take: options?.take ?? 50,
      where: options?.where,
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Get a single item-service by ID
   */
  async findById(id: string) {
    return prisma.itemservice.findUnique({
      where: { id },
    });
  }

  /**
   * Create a new item-service
   */
  async create(data: Omit<ItemServiceData, 'id'>) {
    return prisma.itemservice.create({
      data: data as never,
    });
  }

  /**
   * Update an existing item-service
   */
  async update(id: string, data: Partial<ItemServiceData>) {
    return prisma.itemservice.update({
      where: { id },
      data: data as never,
    });
  }

  /**
   * Delete a item-service
   */
  async delete(id: string) {
    return prisma.itemservice.delete({
      where: { id },
    });
  }

  /**
   * Count item-service records
   */
  async count(where?: Record<string, unknown>) {
    return prisma.itemservice.count({ where });
  }
}

export const itemserviceService = new ItemServiceService();
