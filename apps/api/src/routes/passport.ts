import { FastifyInstance } from 'fastify';

// Passport routes
export default async function passportRoutes(fastify: FastifyInstance) {
  // Get passport for a project
  fastify.get('/:projectId', async (request, reply) => {
    const { projectId } = request.params as { projectId: string };
    return {
      id: `passport-${projectId}`,
      projectId,
      publicSlug: `trust-${projectId}`,
      isPublic: true,
      visibility: 'public',
      sections: {
        systemOverview: {
          name: 'Voice Agent - Terminbuchung',
          purpose: 'Automated appointment scheduling via natural language voice interface',
          scope: 'Patient appointment booking and FAQ handling',
          limitations: ['Emergency calls require human intervention', 'Business hours only'],
          goLiveDate: '2026-02-15',
          owner: 'Dr. Sarah Mueller',
          status: 'live'
        },
        trustProfile: {
          riskLevel: 'low',
          riskScore: 85,
          transparencyRequired: true,
          humanOversightDefined: true,
          sensitiveDataInvolved: false,
          aiLiteracyReady: true
        },
        technicalStack: {
          llmProvider: 'OpenAI GPT-4',
          voiceProvider: 'Retell AI',
          automationTools: ['n8n'],
          connectedSystems: ['Salesforce', 'Zendesk'],
          hosting: 'AWS Frankfurt',
          monitoring: 'Datadog'
        },
        dataProcessing: {
          categories: ['Personal data', 'Health data (limited)'],
          legalBasis: 'Art. 6(1)(b) GDPR - Contract fulfillment',
          retentionPeriod: '7 years (medical records)',
          dataSubjects: 'Patients',
          recipients: ['Medical staff', 'Billing system']
        },
        subprocessors: [
          { name: 'OpenAI', purpose: 'LLM processing', location: 'EU/US', dpaStatus: 'signed' },
          { name: 'Retell AI', purpose: 'Voice synthesis', location: 'US', dpaStatus: 'signed' },
          { name: 'AWS', purpose: 'Hosting', location: 'EU', dpaStatus: 'signed' }
        ],
        humanOversight: {
          systemOwner: 'Dr. Sarah Mueller',
          canIntervene: 'Medical staff on duty',
          escalationTrigger: 'Emergency keywords, repeated failures, patient request',
          fallbackPlan: 'Automatic transfer to human reception'
        },
        transparency: {
          userInformed: true,
          aiDisclosure: 'Patients informed they speak to AI',
          optOutAvailable: true,
          lastUpdated: '2026-03-07T10:00:00Z'
        },
        compliance: {
          gdprStatus: 'compliant',
          aiActTier: 'limited-risk',
          lastAudit: '2026-02-28',
          nextReviewDue: '2026-05-28'
        }
      },
      generatedAt: '2026-03-05T14:00:00Z',
      updatedAt: '2026-03-07T10:00:00Z',
      viewCount: 142,
      lastViewed: '2026-03-07T18:30:00Z'
    };
  });

  // Get public passport by slug
  fastify.get('/public/:slug', async (request, reply) => {
    const { slug } = request.params as { slug: string };
    return {
      slug,
      isPublic: true,
      systemName: 'Voice Agent - Terminbuchung',
      agencyName: 'MedClinic AG',
      trustStatus: 'verified',
      overview: {
        purpose: 'Automated appointment scheduling',
        scope: 'Patient booking and FAQ',
        limitations: ['Emergency calls require human', 'Business hours only']
      },
      trustIndicators: [
        { label: 'GDPR Compliant', status: 'verified' },
        { label: 'Human Oversight', status: 'defined' },
        { label: 'Data Protection', status: 'active' }
      ],
      transparency: {
        aiDisclosure: 'This system uses AI to assist with scheduling',
        dataCategories: ['Contact info', 'Appointment data'],
        retention: '7 years',
        lastUpdated: '2026-03-07'
      },
      contact: {
        agency: 'MedClinic AG',
        email: 'datenschutz@medclinic.example',
        phone: '+49 123 456789'
      }
    };
  });

  // Generate/regenerate passport
  fastify.post('/:projectId/generate', async (request, reply) => {
    return {
      success: true,
      passportId: 'passport-new',
      publicUrl: 'https://trustlayer.io/p/trust-proj-1',
      generatedAt: '2026-03-08T02:46:00Z'
    };
  });

  // Update passport visibility
  fastify.put('/:projectId/visibility', async (request, reply) => {
    return { success: true, message: 'Visibility updated' };
  });

  // Export passport as PDF
  fastify.get('/:projectId/export/pdf', async (request, reply) => {
    return {
      downloadUrl: 'https://example.com/download/passport.pdf',
      filename: 'trust-passport-medclinic.pdf',
      expiresAt: '2026-03-08T08:46:00Z'
    };
  });

  // Get embed code
  fastify.get('/:projectId/embed', async (request, reply) => {
    return {
      embedCode: '<iframe src="https://trustlayer.io/p/trust-proj-1/embed" width="100%" height="600"></iframe>',
      qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://trustlayer.io/p/trust-proj-1'
    };
  });
}
