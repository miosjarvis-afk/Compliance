// Project Service - Business logic for Project operations
import { PrismaClient, RiskLevel } from '@prisma/client';
import type { CreateProjectInput, UpdateProjectInput, CreateIntakeAnswerInput } from '../types/schemas.js';

const prisma = new PrismaClient();

export class ProjectService {
  async findAll(clientId?: string) {
    const where = clientId ? { clientId } : {};
    return prisma.project.findMany({
      where,
      include: {
        client: {
          select: { id: true, name: true, industry: true }
        },
        complianceSummary: true,
        _count: {
          select: { 
            evidenceItems: true,
            integrations: true,
            changeLogs: true
          }
        }
      },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async findById(id: string) {
    return prisma.project.findUnique({
      where: { id },
      include: {
        client: {
          include: {
            agency: { select: { id: true, name: true } }
          }
        },
        complianceSummary: true,
        evidenceItems: {
          orderBy: { updatedAt: 'desc' }
        },
        integrations: {
          orderBy: { updatedAt: 'desc' }
        },
        changeLogs: {
          orderBy: { createdAt: 'desc' },
          take: 10
        },
        trustPortal: true,
      },
    });
  }

  async create(data: CreateProjectInput) {
    // Create project with initial compliance summary
    const project = await prisma.project.create({
      data: {
        ...data,
        complianceSummary: {
          create: {
            trustScore: 0,
            riskLevel: RiskLevel.green,
            transparencyRequired: false,
            personalDataInvolved: false,
            sensitiveDataInvolved: false,
            humanOversightDefined: false,
            subprocessorCount: 0,
            missingItems: [],
          }
        },
        trustPortal: {
          create: {
            token: `portal-${Date.now()}`,
            isActive: true,
          }
        }
      },
      include: {
        complianceSummary: true,
      }
    });

    return project;
  }

  async update(id: string, data: UpdateProjectInput) {
    return prisma.project.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.project.delete({
      where: { id },
    });
  }

  async updateTrustScore(id: string) {
    const project = await this.findById(id);
    if (!project) return null;

    // Calculate trust score based on various factors
    let score = 0;
    const evidence = project.evidenceItems || [];
    const readyEvidence = evidence.filter(e => e.status === 'ready').length;
    const totalEvidence = evidence.length;
    
    if (totalEvidence > 0) {
      score += Math.round((readyEvidence / totalEvidence) * 50);
    }

    // Check compliance items
    const compliance = project.complianceSummary;
    if (compliance) {
      if (compliance.humanOversightDefined) score += 15;
      if (compliance.transparencyRequired) score += 10;
      if (compliance.personalDataInvolved) score += 10;
      if (compliance.missingItems?.length === 0) score += 15;
    }

    // Update the score
    const updated = await prisma.project.update({
      where: { id },
      data: { 
        trustScore: Math.min(score, 100),
        completionPercentage: totalEvidence > 0 ? Math.round((readyEvidence / totalEvidence) * 100) : 0
      },
      include: { complianceSummary: true }
    });

    return updated;
  }

  // Intake operations
  async getIntakeAnswers(projectId: string) {
    return prisma.intakeAnswer.findMany({
      where: { projectId },
      orderBy: { section: 'asc' },
    });
  }

  async saveIntakeAnswer(data: CreateIntakeAnswerInput) {
    return prisma.intakeAnswer.upsert({
      where: {
        projectId_questionKey: {
          projectId: data.projectId,
          questionKey: data.questionKey,
        }
      },
      update: {
        answer: JSON.stringify(data.answer),
        section: data.section,
      },
      create: {
        projectId: data.projectId,
        section: data.section,
        questionKey: data.questionKey,
        answer: JSON.stringify(data.answer),
      },
    });
  }

  // Evidence operations
  async getEvidence(projectId: string) {
    return prisma.evidenceItem.findMany({
      where: { projectId },
      orderBy: { updatedAt: 'desc' },
    });
  }

  // Dashboard stats
  async getDashboardStats(agencyId: string) {
    const clients = await prisma.client.findMany({
      where: { agencyId },
      select: { id: true }
    });

    const clientIds = clients.map(c => c.id);

    const [
      totalProjects,
      projectsByStatus,
      avgTrustScore,
      evidenceStats,
      recentActivity
    ] = await Promise.all([
      prisma.project.count({
        where: { clientId: { in: clientIds } }
      }),
      prisma.project.groupBy({
        by: ['status'],
        where: { clientId: { in: clientIds } },
        _count: { id: true }
      }),
      prisma.complianceSummary.aggregate({
        where: { 
          project: { clientId: { in: clientIds } }
        },
        _avg: { trustScore: true }
      }),
      prisma.evidenceItem.groupBy({
        by: ['status'],
        where: {
          project: { clientId: { in: clientIds } }
        },
        _count: { id: true }
      }),
      prisma.changeLogItem.findMany({
        where: {
          project: { clientId: { in: clientIds } }
        },
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: {
          project: { select: { name: true } }
        }
      })
    ]);

    return {
      totalProjects,
      projectsByStatus,
      avgTrustScore: avgTrustScore._avg.trustScore || 0,
      evidenceStats,
      recentActivity
    };
  }
}

export const projectService = new ProjectService();
