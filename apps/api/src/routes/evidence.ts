import { FastifyInstance } from 'fastify';

// Evidence routes
export default async function evidenceRoutes(fastify: FastifyInstance) {
  // Get all evidence for a project
  fastify.get('/:projectId', async (request, reply) => {
    const { projectId } = request.params as { projectId: string };
    return {
      projectId,
      evidence: [
        {
          id: 'ev-1',
          type: 'system-card',
          title: 'AI System Card',
          description: 'Technical documentation of the AI system',
          status: 'ready',
          generatedAt: '2026-03-05T10:00:00Z',
          expiryDate: '2027-03-05T10:00:00Z'
        },
        {
          id: 'ev-2',
          type: 'subprocessor-register',
          title: 'Subprocessor Register',
          description: 'List of all subprocessors with DPA status',
          status: 'ready',
          generatedAt: '2026-03-04T14:30:00Z',
          expiryDate: '2027-03-04T14:30:00Z'
        },
        {
          id: 'ev-3',
          type: 'data-flow',
          title: 'Data Flow Diagram',
          description: 'Visual representation of data processing',
          status: 'incomplete',
          generatedAt: null,
          expiryDate: null
        },
        {
          id: 'ev-4',
          type: 'change-log',
          title: 'Change Log',
          description: 'Complete history of system changes',
          status: 'ready',
          generatedAt: '2026-03-07T09:15:00Z',
          expiryDate: null
        },
        {
          id: 'ev-5',
          type: 'incident-log',
          title: 'Incident Register',
          description: 'Log of all incidents and resolutions',
          status: 'ready',
          generatedAt: '2026-03-01T11:00:00Z',
          expiryDate: null
        },
        {
          id: 'ev-6',
          type: 'literacy-checklist',
          title: 'AI Literacy Checklist',
          description: 'User education and awareness documentation',
          status: 'needs-review',
          generatedAt: '2026-03-06T16:45:00Z',
          expiryDate: '2027-03-06T16:45:00Z'
        },
        {
          id: 'ev-7',
          type: 'disclosure',
          title: 'Transparency Disclosure',
          description: 'Public-facing transparency information',
          status: 'incomplete',
          generatedAt: null,
          expiryDate: null
        }
      ]
    };
  });

  // Get single evidence
  fastify.get('/:projectId/:evidenceId', async (request, reply) => {
    const { projectId, evidenceId } = request.params as { projectId: string; evidenceId: string };
    return {
      id: evidenceId,
      projectId,
      type: 'system-card',
      title: 'AI System Card',
      content: {
        systemName: 'Voice Agent - MedClinic',
        version: '1.2.0',
        purpose: 'Automated appointment scheduling via voice',
        capabilities: ['Natural language understanding', 'Appointment booking', 'FAQ handling'],
        limitations: ['Cannot handle emergency calls', 'Limited to business hours'],
        trainingData: 'Synthetic conversations, anonymized call transcripts',
        performance: '85% accuracy, <2s response time',
        humanOversight: 'Escalation to human agents available'
      },
      status: 'ready',
      generatedAt: '2026-03-05T10:00:00Z',
      generatedBy: 'system',
      approvedBy: 'Dr. Schmidt',
      approvedAt: '2026-03-06T14:00:00Z'
    };
  });

  // Generate evidence
  fastify.post('/:projectId/generate', async (request, reply) => {
    return {
      success: true,
      message: 'Evidence generated',
      evidenceId: 'ev-new',
      downloadUrl: '/api/v1/evidence/ev-new/download'
    };
  });

  // Update evidence
  fastify.put('/:projectId/:evidenceId', async (request, reply) => {
    return { success: true, message: 'Evidence updated' };
  });

  // Approve evidence
  fastify.post('/:projectId/:evidenceId/approve', async (request, reply) => {
    return { success: true, message: 'Evidence approved' };
  });

  // Download evidence
  fastify.get('/:projectId/:evidenceId/download', async (request, reply) => {
    return {
      downloadUrl: 'https://example.com/download/evidence.pdf',
      filename: 'ai-system-card-medclinic.pdf',
      expiresAt: '2026-03-08T08:00:00Z'
    };
  });
}
