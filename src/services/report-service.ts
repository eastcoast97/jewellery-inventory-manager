/**
 * Report Service Service
 * Business logic for reports
 * 
 * Acceptance Criteria:
 * - Generate daily sales report
 * - Generate stock summary report
 * - Generate low-stock alert report
 * - Generate profit margin report
 * - Generate GST-ready summary report
 */

import { prisma } from '../db/client';

export interface ReportData {
  id?: string;
  [key: string]: unknown;
}

export class ReportServiceService {
  /**
   * Get all report records
   */
  async findAll(options?: { skip?: number; take?: number; where?: Record<string, unknown> }) {
    return prisma.report.findMany({
      skip: options?.skip,
      take: options?.take ?? 50,
      where: options?.where,
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Get a single report by ID
   */
  async findById(id: string) {
    return prisma.report.findUnique({
      where: { id },
    });
  }

  /**
   * Create a new report
   */
  async create(data: Omit<ReportData, 'id'>) {
    return prisma.report.create({
      data: data as never,
    });
  }

  /**
   * Update an existing report
   */
  async update(id: string, data: Partial<ReportData>) {
    return prisma.report.update({
      where: { id },
      data: data as never,
    });
  }

  /**
   * Delete a report
   */
  async delete(id: string) {
    return prisma.report.delete({
      where: { id },
    });
  }

  /**
   * Count report records
   */
  async count(where?: Record<string, unknown>) {
    return prisma.report.count({ where });
  }
}

export const reportserviceService = new ReportServiceService();
