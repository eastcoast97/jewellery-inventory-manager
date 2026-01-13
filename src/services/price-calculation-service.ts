/**
 * Price Calculation Service Service
 * Business logic for price calculations
 * 
 * Acceptance Criteria:
 * - Calculate item price based on metal rate, making charges, wastage, and stone value
 * - Calculate GST
 */

import { prisma } from '../db/client';

export interface PriceCalculationServiceData {
  id?: string;
  [key: string]: unknown;
}

export class PriceCalculationServiceService {
  /**
   * Get all price-calculation-service records
   */
  async findAll(options?: { skip?: number; take?: number; where?: Record<string, unknown> }) {
    return prisma.pricecalculationservice.findMany({
      skip: options?.skip,
      take: options?.take ?? 50,
      where: options?.where,
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Get a single price-calculation-service by ID
   */
  async findById(id: string) {
    return prisma.pricecalculationservice.findUnique({
      where: { id },
    });
  }

  /**
   * Create a new price-calculation-service
   */
  async create(data: Omit<PriceCalculationServiceData, 'id'>) {
    return prisma.pricecalculationservice.create({
      data: data as never,
    });
  }

  /**
   * Update an existing price-calculation-service
   */
  async update(id: string, data: Partial<PriceCalculationServiceData>) {
    return prisma.pricecalculationservice.update({
      where: { id },
      data: data as never,
    });
  }

  /**
   * Delete a price-calculation-service
   */
  async delete(id: string) {
    return prisma.pricecalculationservice.delete({
      where: { id },
    });
  }

  /**
   * Count price-calculation-service records
   */
  async count(where?: Record<string, unknown>) {
    return prisma.pricecalculationservice.count({ where });
  }
}

export const pricecalculationserviceService = new PriceCalculationServiceService();
