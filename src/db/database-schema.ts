/**
 * Database Schema Database Module
 * Prisma schema with Item, Supplier, Purchase, Sale, Customer, and User models
 * 
 * This module uses Prisma ORM for database operations.
 * Run 'npx prisma generate' after updating the schema.
 */

import { prisma } from './client';
import { Prisma } from '@prisma/client';

/**
 * DatabaseSchema Repository
 * Provides database operations for Database Schema
 */
export const databaseschemaRepository = {
  /**
   * Find all records with optional filtering and pagination
   */
  async findMany(options?: {
    skip?: number;
    take?: number;
    where?: Prisma.DatabaseSchemaWhereInput;
    orderBy?: Prisma.DatabaseSchemaOrderByWithRelationInput;
  }) {
    return prisma.databaseschema.findMany({
      skip: options?.skip,
      take: options?.take ?? 50,
      where: options?.where,
      orderBy: options?.orderBy ?? { createdAt: 'desc' },
    });
  },

  /**
   * Find a single record by ID
   */
  async findById(id: string) {
    return prisma.databaseschema.findUnique({
      where: { id },
    });
  },

  /**
   * Find a single record by unique field
   */
  async findFirst(where: Prisma.DatabaseSchemaWhereInput) {
    return prisma.databaseschema.findFirst({ where });
  },

  /**
   * Create a new record
   */
  async create(data: Prisma.DatabaseSchemaCreateInput) {
    return prisma.databaseschema.create({ data });
  },

  /**
   * Update an existing record
   */
  async update(id: string, data: Prisma.DatabaseSchemaUpdateInput) {
    return prisma.databaseschema.update({
      where: { id },
      data,
    });
  },

  /**
   * Delete a record
   */
  async delete(id: string) {
    return prisma.databaseschema.delete({
      where: { id },
    });
  },

  /**
   * Count records
   */
  async count(where?: Prisma.DatabaseSchemaWhereInput) {
    return prisma.databaseschema.count({ where });
  },

  /**
   * Check if a record exists
   */
  async exists(where: Prisma.DatabaseSchemaWhereInput) {
    const count = await prisma.databaseschema.count({ where });
    return count > 0;
  },
};
