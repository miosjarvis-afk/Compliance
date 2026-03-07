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
    const slug = data.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    return prisma.agency.create({
      data: {
        name: data.name,
        slug,
        industryFocus: data.industryFocus,
        plan: data.plan.toUpperCase() as any,
      },
    });
  }

  async update(id: string, data: UpdateAgencyInput) {
    const updateData: any = {};
    if (data.name) updateData.name = data.name;
    if (data.industryFocus) updateData.industryFocus = data.industryFocus;
    if (data.plan) updateData.plan = data.plan.toUpperCase() as any;
    
    return prisma.agency.update({
      where: { id },
      data: updateData,
    });
  }

  async delete(id: string) {
    return prisma.agency.delete({
      where: { id },
    });
  }
}

export const agencyService = new AgencyService();
