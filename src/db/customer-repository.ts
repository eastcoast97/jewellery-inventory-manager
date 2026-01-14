/**
 * Customer Repository
 * Database operations for Customer model
 */

import { prisma } from './client';
import { Prisma } from '@prisma/client';

export const customerRepository = {
  async findMany(options?: {
    skip?: number;
    take?: number;
    where?: Prisma.CustomerWhereInput;
    orderBy?: Prisma.CustomerOrderByWithRelationInput;
  }) {
    return prisma.customer.findMany({
      skip: options?.skip,
      take: options?.take ?? 50,
      where: options?.where,
      orderBy: options?.orderBy ?? { createdAt: 'desc' },
    });
  },

  async findById(id: string) {
    return prisma.customer.findUnique({ where: { id } });
  },

  async findFirst(where: Prisma.CustomerWhereInput) {
    return prisma.customer.findFirst({ where });
  },

  async create(data: Prisma.CustomerCreateInput) {
    return prisma.customer.create({ data });
  },

  async update(id: string, data: Prisma.CustomerUpdateInput) {
    return prisma.customer.update({ where: { id }, data });
  },

  async delete(id: string) {
    return prisma.customer.delete({ where: { id } });
  },

  async count(where?: Prisma.CustomerWhereInput) {
    return prisma.customer.count({ where });
  },
};
