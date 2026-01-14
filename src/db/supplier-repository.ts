/**
 * Supplier Repository
 * Database operations for Supplier model
 */

import { prisma } from './client';
import { Prisma } from '@prisma/client';

export const supplierRepository = {
  async findMany(options?: {
    skip?: number;
    take?: number;
    where?: Prisma.SupplierWhereInput;
    orderBy?: Prisma.SupplierOrderByWithRelationInput;
  }) {
    return prisma.supplier.findMany({
      skip: options?.skip,
      take: options?.take ?? 50,
      where: options?.where,
      orderBy: options?.orderBy ?? { createdAt: 'desc' },
    });
  },

  async findById(id: string) {
    return prisma.supplier.findUnique({ where: { id } });
  },

  async findFirst(where: Prisma.SupplierWhereInput) {
    return prisma.supplier.findFirst({ where });
  },

  async create(data: Prisma.SupplierCreateInput) {
    return prisma.supplier.create({ data });
  },

  async update(id: string, data: Prisma.SupplierUpdateInput) {
    return prisma.supplier.update({ where: { id }, data });
  },

  async delete(id: string) {
    return prisma.supplier.delete({ where: { id } });
  },

  async count(where?: Prisma.SupplierWhereInput) {
    return prisma.supplier.count({ where });
  },
};
