import { FastifyInstance } from 'fastify';

// Project routes
export default async function projectRoutes(fastify: FastifyInstance) {
  // Get all projects
  fastify.get('/', async (request, reply) => {
    return {
      projects: [
        {
          id: 'proj-1',
          name: 'Voice Agent - Terminbuchung',
          clientId: 'client-1',
          clientName: 'MedClinic AG',
          type: 'voice-agent',
          status: 'live',
          trustScore: 85,
          riskLevel: 'green',
          updatedAt: '2026-03-07T10:00:00Z'
        },
        {
          id: 'proj-2',
          name: 'Chatbot - FAQ',
          clientId: 'client-1',
          clientName: 'MedClinic AG',
          type: 'chatbot',
          status: 'review-needed',
          trustScore: 62,
          riskLevel: 'yellow',
          updatedAt: '2026-03-06T14:30:00Z'
        },
        {
          id: 'proj-3',
          name: 'Screening Bot',
          clientId: 'client-2',
          clientName: 'TalentFlow GmbH',
          type: 'chatbot',
          status: 'trust-ready',
          trustScore: 78,
          riskLevel: 'green',
          updatedAt: '2026-03-05T09:15:00Z'
        },
        {
          id: 'proj-4',
          name: 'Support Chatbot',
          clientId: 'client-3',
          clientName: 'HomeFix Services',
          type: 'chatbot',
          status: 'intake-in-progress',
          trustScore: 45,
          riskLevel: 'yellow',
          updatedAt: '2026-03-07T16:45:00Z'
        },
        {
          id: 'proj-5',
          name: 'Internal Copilot',
          clientId: 'client-2',
          clientName: 'TalentFlow GmbH',
          type: 'internal-copilot',
          status: 'draft',
          trustScore: 30,
          riskLevel: 'red',
          updatedAt: '2026-03-04T11:20:00Z'
        }
      ]
    };
  });

  // Get single project
  fastify.get('/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    return {
      id,
      name: 'Voice Agent - Terminbuchung',
      clientId: 'client-1',
      clientName: 'MedClinic AG',
      type: 'voice-agent',
      status: 'live',
      description: 'AI-powered voice agent for appointment scheduling',
      owner: 'Sarah Mueller',
      trustScore: 85,
      riskLevel: 'green',
      transparencyRequired: true,
      personalDataInvolved: true,
      sensitiveDataInvolved: false,
      humanOversightDefined: true,
      subprocessorCount: 3,
      missingItems: [],
      updatedAt: '2026-03-07T10:00:00Z',
      createdAt: '2026-02-15T08:30:00Z'
    };
  });

  // Create project
  fastify.post('/', async (request, reply) => {
    return { success: true, message: 'Project created', id: 'proj-new' };
  });

  // Update project
  fastify.put('/:id', async (request, reply) => {
    return { success: true, message: 'Project updated' };
  });

  // Delete project
  fastify.delete('/:id', async (request, reply) => {
    return { success: true, message: 'Project deleted' };
  });

  // Get project stats
  fastify.get('/:id/stats', async (request, reply) => {
    return {
      totalProjects: 5,
      liveProjects: 1,
      reviewNeeded: 1,
      trustReady: 1,
      activeIntegrations: 3
    };
  });
}
