// Project Service - Business logic for Project operations
import { PrismaClient, RiskLevel, ProjectStatus } from '@prisma/client';
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
        trustPassport: true,
      },
    });
  }

  async create(data: CreateProjectInput) {
    // Get agency from client
    const client = await prisma.client.findUnique({
      where: { id: data.clientId },
      select: { agencyId: true }
    });
    
    if (!client) {
      throw new Error('Client not found');
    }
    
    // Create project with initial compliance summary
    const project = await prisma.project.create({
      data: {
        name: data.name,
        clientId: data.clientId,
        agencyId: client.agencyId,
        description: data.description,
        owner: data.owner || '',
        type: data.type.toUpperCase().replace('-', '_') as any,
        status: (data.status || 'DRAFT').toUpperCase() as any,
        complianceSummary: {
          create: {
            trustScore: 0,
            riskLevel: RiskLevel.GREEN,
            transparencyRequired: false,
            personalDataInvolved: false,
            sensitiveDataInvolved: false,
            humanOversightDefined: false,
            subprocessorCount: 0,
            missingItems: [],
          }
        },
        trustPassport: {
          create: {
            publicToken: `portal-${Date.now()}`,
            isPublic: true,
            content: '{}',
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
    const updateData: any = {};
    if (data.name) updateData.name = data.name;
    if (data.description) updateData.description = data.description;
    if (data.owner) updateData.owner = data.owner;
    if (data.type) updateData.type = data.type.toUpperCase().replace('-', '_') as any;
    if (data.status) updateData.status = data.status.toUpperCase() as any;
    
    return prisma.project.update({
      where: { id },
      data: updateData,
    });
  }

  async delete(id: string) {
    return prisma.project.delete({
      where: { id },
    });
  }

  async updateTrustScore(id: string) {
    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        evidenceItems: true,
        complianceSummary: true,
      }
    });
    if (!project) return null;

    // Calculate trust score based on various factors
    let score = 0;
    const evidence = project.evidenceItems || [];
    const readyEvidence = evidence.filter(e => e.status === 'READY').length;
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
    const updated = await prisma.complianceSummary.update({
      where: { projectId: id },
      data: { 
        trustScore: Math.min(score, 100),
      },
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
    const existing = await prisma.intakeAnswer.findUnique({
      where: {
        projectId_section_questionKey: {
          projectId: data.projectId,
          section: data.section,
          questionKey: data.questionKey,
        }
      }
    });
    
    if (existing) {
      return prisma.intakeAnswer.update({
        where: { id: existing.id },
        data: {
          answerValue: JSON.stringify(data.answer),
        },
      });
    }
    
    return prisma.intakeAnswer.create({
      data: {
        projectId: data.projectId,
        section: data.section,
        questionKey: data.questionKey,
        answerValue: JSON.stringify(data.answer),
        answerType: 'STRING',
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
      prisma.changeLog.findMany({
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
