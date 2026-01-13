/**
 * Metal Rate Service Service
 * Business logic for metal rates
 * 
 * Acceptance Criteria:
 * - Update daily metal rates
 * - Get current metal rates
 */

import { prisma } from '../db/client';

export interface MetalRateServiceData {
  id?: string;
  [key: string]: unknown;
}

export class MetalRateServiceService {
  /**
   * Get all metal-rate-service records
   */
  async findAll(options?: { skip?: number; take?: number; where?: Record<string, unknown> }) {
    return prisma.metalrateservice.findMany({
      skip: options?.skip,
      take: options?.take ?? 50,
      where: options?.where,
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Get a single metal-rate-service by ID
   */
  async findById(id: string) {
    return prisma.metalrateservice.findUnique({
      where: { id },
    });
  }

  /**
   * Create a new metal-rate-service
   */
  async create(data: Omit<MetalRateServiceData, 'id'>) {
    return prisma.metalrateservice.create({
      data: data as never,
    });
  }

  /**
   * Update an existing metal-rate-service
   */
  async update(id: string, data: Partial<MetalRateServiceData>) {
    return prisma.metalrateservice.update({
      where: { id },
      data: data as never,
    });
  }

  /**
   * Delete a metal-rate-service
   */
  async delete(id: string) {
    return prisma.metalrateservice.delete({
      where: { id },
    });
  }

  /**
   * Count metal-rate-service records
   */
  async count(where?: Record<string, unknown>) {
    return prisma.metalrateservice.count({ where });
  }
}

export const metalrateserviceService = new MetalRateServiceService();
