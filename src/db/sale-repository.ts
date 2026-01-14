/**
 * Sale Repository
 * Database operations for Sale model
 */

import { prisma } from './client';
import { Prisma } from '@prisma/client';

export const saleRepository = {
  async findMany(options?: {
    skip?: number;
    take?: number;
    where?: Prisma.SaleWhereInput;
    orderBy?: Prisma.SaleOrderByWithRelationInput;
  }) {
    return prisma.sale.findMany({
      skip: options?.skip,
      take: options?.take ?? 50,
      where: options?.where,
      orderBy: options?.orderBy ?? { createdAt: 'desc' },
    });
  },

  async findById(id: string) {
    return prisma.sale.findUnique({ where: { id } });
  },

  async findFirst(where: Prisma.SaleWhereInput) {
    return prisma.sale.findFirst({ where });
  },

  async create(data: Prisma.SaleCreateInput) {
    return prisma.sale.create({ data });
  },

  async update(id: string, data: Prisma.SaleUpdateInput) {
    return prisma.sale.update({ where: { id }, data });
  },

  async delete(id: string) {
    return prisma.sale.delete({ where: { id } });
  },

  async count(where?: Prisma.SaleWhereInput) {
    return prisma.sale.count({ where });
  },
};
