import { FastifyInstance } from 'fastify';

// Integration routes
export default async function integrationRoutes(fastify: FastifyInstance) {
  // Get all integrations for a project
  fastify.get('/:projectId', async (request, reply) => {
    const { projectId } = request.params as { projectId: string };
    return {
      projectId,
      integrations: [
        {
          id: 'int-1',
          provider: 'n8n',
          name: 'n8n Automation',
          status: 'connected',
          lastSync: '2026-03-07T18:30:00Z',
          config: {
            webhookUrl: 'https://n8n.example.com/webhook/trustlayer',
            apiKey: 'n8n_••••••••••••••••',
            syncEvents: ['project.updated', 'passport.generated']
          },
          syncStats: {
            totalEvents: 342,
            last24h: 12,
            errors: 0
          }
        },
        {
          id: 'int-2',
          provider: 'retell',
          name: 'Retell AI',
          status: 'connected',
          lastSync: '2026-03-07T19:45:00Z',
          config: {
            apiKey: 'retell_••••••••••••••••',
            syncEvents: ['call.completed', 'config.changed']
          },
          syncStats: {
            totalEvents: 1256,
            last24h: 48,
            errors: 2
          }
        },
        {
          id: 'int-3',
          provider: 'zapier',
          name: 'Zapier',
          status: 'sync-needed',
          lastSync: '2026-03-05T14:20:00Z',
          config: {
            webhookUrl: 'https://hooks.zapier.com/hooks/catch/...',
            apiKey: 'zapier_••••••••••••••••'
          },
          syncStats: {
            totalEvents: 89,
            last24h: 0,
            errors: 5
          }
        },
        {
          id: 'int-4',
          provider: 'openai',
          name: 'OpenAI',
          status: 'not-connected',
          lastSync: null,
          config: null,
          syncStats: null
        },
        {
          id: 'int-5',
          provider: 'vapi',
          name: 'Vapi',
          status: 'not-connected',
          lastSync: null,
          config: null,
          syncStats: null
        }
      ]
    };
  });

  // Get available integrations
  fastify.get('/available', async (request, reply) => {
    return {
      integrations: [
        { provider: 'n8n', name: 'n8n', description: 'Workflow automation', icon: 'n8n.svg' },
        { provider: 'zapier', name: 'Zapier', description: 'No-code automation', icon: 'zapier.svg' },
        { provider: 'make', name: 'Make', description: 'Visual automation', icon: 'make.svg' },
        { provider: 'retell', name: 'Retell AI', description: 'Voice AI platform', icon: 'retell.svg' },
        { provider: 'vapi', name: 'Vapi', description: 'Voice AI infrastructure', icon: 'vapi.svg' },
        { provider: 'openai', name: 'OpenAI', description: 'GPT models', icon: 'openai.svg' },
        { provider: 'anthropic', name: 'Anthropic', description: 'Claude models', icon: 'anthropic.svg' },
        { provider: 'custom-webhook', name: 'Custom Webhook', description: 'Generic webhook endpoint', icon: 'webhook.svg' }
      ]
    };
  });

  // Connect integration
  fastify.post('/:projectId/connect', async (request, reply) => {
    return {
      success: true,
      integrationId: 'int-new',
      status: 'connected',
      webhookUrl: 'https://api.trustlayer.io/webhooks/int-new',
      message: 'Integration connected successfully'
    };
  });

  // Disconnect integration
  fastify.delete('/:projectId/:integrationId', async (request, reply) => {
    return { success: true, message: 'Integration disconnected' };
  });

  // Sync integration
  fastify.post('/:projectId/:integrationId/sync', async (request, reply) => {
    return {
      success: true,
      message: 'Sync triggered',
      syncId: 'sync-123',
      status: 'in-progress'
    };
  });

  // Get sync history
  fastify.get('/:projectId/:integrationId/history', async (request, reply) => {
    return {
      syncs: [
        { id: 'sync-1', status: 'success', startedAt: '2026-03-07T18:30:00Z', completedAt: '2026-03-07T18:31:00Z', events: 12 },
        { id: 'sync-2', status: 'success', startedAt: '2026-03-07T12:00:00Z', completedAt: '2026-03-07T12:01:00Z', events: 8 },
        { id: 'sync-3', status: 'error', startedAt: '2026-03-07T06:00:00Z', completedAt: null, events: 0, error: 'Connection timeout' }
      ]
    };
  });
}
