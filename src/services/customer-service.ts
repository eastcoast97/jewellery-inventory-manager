/**
 * Customer Service Service
 * Business logic for customers
 * 
 * Acceptance Criteria:
 * - Create new customer
 * - Update existing customer
 * - Get customer details
 * - Get all customers
 */

import { prisma } from '../db/client';

export interface CustomerServiceData {
  id?: string;
  [key: string]: unknown;
}

export class CustomerServiceService {
  /**
   * Get all customer-service records
   */
  async findAll(options?: { skip?: number; take?: number; where?: Record<string, unknown> }) {
    return prisma.customerservice.findMany({
      skip: options?.skip,
      take: options?.take ?? 50,
      where: options?.where,
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Get a single customer-service by ID
   */
  async findById(id: string) {
    return prisma.customerservice.findUnique({
      where: { id },
    });
  }

  /**
   * Create a new customer-service
   */
  async create(data: Omit<CustomerServiceData, 'id'>) {
    return prisma.customerservice.create({
      data: data as never,
    });
  }

  /**
   * Update an existing customer-service
   */
  async update(id: string, data: Partial<CustomerServiceData>) {
    return prisma.customerservice.update({
      where: { id },
      data: data as never,
    });
  }

  /**
   * Delete a customer-service
   */
  async delete(id: string) {
    return prisma.customerservice.delete({
      where: { id },
    });
  }

  /**
   * Count customer-service records
   */
  async count(where?: Record<string, unknown>) {
    return prisma.customerservice.count({ where });
  }
}

export const customerserviceService = new CustomerServiceService();
