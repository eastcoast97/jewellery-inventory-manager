/**
 * Purchase Repository
 * Database operations for Purchase model
 */

import { prisma } from './client';
import { Prisma } from '@prisma/client';

export const purchaseRepository = {
  async findMany(options?: {
    skip?: number;
    take?: number;
    where?: Prisma.PurchaseWhereInput;
    orderBy?: Prisma.PurchaseOrderByWithRelationInput;
  }) {
    return prisma.purchase.findMany({
      skip: options?.skip,
      take: options?.take ?? 50,
      where: options?.where,
      orderBy: options?.orderBy ?? { createdAt: 'desc' },
    });
  },

  async findById(id: string) {
    return prisma.purchase.findUnique({ where: { id } });
  },

  async findFirst(where: Prisma.PurchaseWhereInput) {
    return prisma.purchase.findFirst({ where });
  },

  async create(data: Prisma.PurchaseCreateInput) {
    return prisma.purchase.create({ data });
  },

  async update(id: string, data: Prisma.PurchaseUpdateInput) {
    return prisma.purchase.update({ where: { id }, data });
  },

  async delete(id: string) {
    return prisma.purchase.delete({ where: { id } });
  },

  async count(where?: Prisma.PurchaseWhereInput) {
    return prisma.purchase.count({ where });
  },
};
