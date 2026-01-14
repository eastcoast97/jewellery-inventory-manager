/**
 * Customer Service Service
 * Business logic for customers
 * 
 * Acceptance Criteria:
 * - Create customer
 * - Update customer
 * - View customer details
 */

import { prisma } from '../db/client';

export interface CustomerData {
  id?: string;
  [key: string]: unknown;
}

export class CustomerServiceService {
  /**
   * Get all customer records
   */
  async findAll(options?: { skip?: number; take?: number; where?: Record<string, unknown> }) {
    return prisma.customer.findMany({
      skip: options?.skip,
      take: options?.take ?? 50,
      where: options?.where,
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Get a single customer by ID
   */
  async findById(id: string) {
    return prisma.customer.findUnique({
      where: { id },
    });
  }

  /**
   * Create a new customer
   */
  async create(data: Omit<CustomerData, 'id'>) {
    return prisma.customer.create({
      data: data as never,
    });
  }

  /**
   * Update an existing customer
   */
  async update(id: string, data: Partial<CustomerData>) {
    return prisma.customer.update({
      where: { id },
      data: data as never,
    });
  }

  /**
   * Delete a customer
   */
  async delete(id: string) {
    return prisma.customer.delete({
      where: { id },
    });
  }

  /**
   * Count customer records
   */
  async count(where?: Record<string, unknown>) {
    return prisma.customer.count({ where });
  }
}

export const customerserviceService = new CustomerServiceService();
