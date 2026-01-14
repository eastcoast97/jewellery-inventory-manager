/**
 * Item Repository
 * Database operations for Item model
 */

import { prisma } from './client';
import { Prisma } from '@prisma/client';

export const itemRepository = {
  async findMany(options?: {
    skip?: number;
    take?: number;
    where?: Prisma.ItemWhereInput;
    orderBy?: Prisma.ItemOrderByWithRelationInput;
  }) {
    return prisma.item.findMany({
      skip: options?.skip,
      take: options?.take ?? 50,
      where: options?.where,
      orderBy: options?.orderBy ?? { createdAt: 'desc' },
    });
  },

  async findById(id: string) {
    return prisma.item.findUnique({ where: { id } });
  },

  async findFirst(where: Prisma.ItemWhereInput) {
    return prisma.item.findFirst({ where });
  },

  async create(data: Prisma.ItemCreateInput) {
    return prisma.item.create({ data });
  },

  async update(id: string, data: Prisma.ItemUpdateInput) {
    return prisma.item.update({ where: { id }, data });
  },

  async delete(id: string) {
    return prisma.item.delete({ where: { id } });
  },

  async count(where?: Prisma.ItemWhereInput) {
    return prisma.item.count({ where });
  },
};
