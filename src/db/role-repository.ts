/**
 * Role Repository
 * Database operations for Role model
 */

import { prisma } from './client';
import { Prisma } from '@prisma/client';

export const roleRepository = {
  async findMany(options?: {
    skip?: number;
    take?: number;
    where?: Prisma.RoleWhereInput;
    orderBy?: Prisma.RoleOrderByWithRelationInput;
  }) {
    return prisma.role.findMany({
      skip: options?.skip,
      take: options?.take ?? 50,
      where: options?.where,
      orderBy: options?.orderBy ?? { createdAt: 'desc' },
    });
  },

  async findById(id: string) {
    return prisma.role.findUnique({ where: { id } });
  },

  async findFirst(where: Prisma.RoleWhereInput) {
    return prisma.role.findFirst({ where });
  },

  async create(data: Prisma.RoleCreateInput) {
    return prisma.role.create({ data });
  },

  async update(id: string, data: Prisma.RoleUpdateInput) {
    return prisma.role.update({ where: { id }, data });
  },

  async delete(id: string) {
    return prisma.role.delete({ where: { id } });
  },

  async count(where?: Prisma.RoleWhereInput) {
    return prisma.role.count({ where });
  },
};
