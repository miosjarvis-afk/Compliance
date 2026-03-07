// Client Service - Business logic for Client operations
import { PrismaClient } from '@prisma/client';
import type { CreateClientInput, UpdateClientInput } from '../types/schemas.js';

const prisma = new PrismaClient();

export class ClientService {
  async findAll(agencyId?: string) {
    const where = agencyId ? { agencyId } : {};
    return prisma.client.findMany({
      where,
      include: {
        _count: {
          select: { projects: true }
        }
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string) {
    return prisma.client.findUnique({
      where: { id },
      include: {
        projects: {
          include: {
            complianceSummary: true,
            _count: {
              select: { 
                evidenceItems: true,
                integrations: true,
                changeLogs: true
              }
            }
          }
        },
        agency: {
          select: { id: true, name: true }
        }
      },
    });
  }

  async findByAgency(agencyId: string) {
    return prisma.client.findMany({
      where: { agencyId },
      include: {
        _count: {
          select: { projects: true }
        }
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(data: CreateClientInput) {
    return prisma.client.create({
      data,
    });
  }

  async update(id: string, data: UpdateClientInput) {
    return prisma.client.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.client.delete({
      where: { id },
    });
  }

  async getStats(agencyId: string) {
    const [total, byRiskSensitivity] = await Promise.all([
      prisma.client.count({ where: { agencyId } }),
      prisma.client.groupBy({
        by: ['riskSensitivity'],
        where: { agencyId },
        _count: { id: true }
      })
    ]);

    return {
      total,
      byRiskSensitivity,
    };
  }
}

export const clientService = new ClientService();
