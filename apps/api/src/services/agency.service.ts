// Agency Service - Business logic for Agency operations
import { PrismaClient } from '@prisma/client';
import type { CreateAgencyInput, UpdateAgencyInput } from '../types/schemas.js';

const prisma = new PrismaClient();

export class AgencyService {
  async findAll() {
    return prisma.agency.findMany({
      include: {
        _count: {
          select: { clients: true, users: true }
        }
      }
    });
  }

  async findById(id: string) {
    return prisma.agency.findUnique({
      where: { id },
      include: {
        clients: {
          include: {
            _count: {
              select: { projects: true }
            }
          }
        },
        users: true,
      },
    });
  }

  async create(data: CreateAgencyInput) {
    return prisma.agency.create({
      data,
    });
  }

  async update(id: string, data: UpdateAgencyInput) {
    return prisma.agency.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.agency.delete({
      where: { id },
    });
  }
}

export const agencyService = new AgencyService();
