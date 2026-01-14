/**
 * User Repository
 * Database operations for User model
 */

import { prisma } from './client';
import { Prisma } from '@prisma/client';

export const userRepository = {
  async findMany(options?: {
    skip?: number;
    take?: number;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }) {
    return prisma.user.findMany({
      skip: options?.skip,
      take: options?.take ?? 50,
      where: options?.where,
      orderBy: options?.orderBy ?? { createdAt: 'desc' },
    });
  },

  async findById(id: string) {
    return prisma.user.findUnique({ where: { id } });
  },

  async findFirst(where: Prisma.UserWhereInput) {
    return prisma.user.findFirst({ where });
  },

  async create(data: Prisma.UserCreateInput) {
    return prisma.user.create({ data });
  },

  async update(id: string, data: Prisma.UserUpdateInput) {
    return prisma.user.update({ where: { id }, data });
  },

  async delete(id: string) {
    return prisma.user.delete({ where: { id } });
  },

  async count(where?: Prisma.UserWhereInput) {
    return prisma.user.count({ where });
  },
};
