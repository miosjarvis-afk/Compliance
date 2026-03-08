import { FastifyInstance } from 'fastify';

// Intake routes
export default async function intakeRoutes(fastify: FastifyInstance) {
  // Get intake questions for a project
  fastify.get('/:projectId/questions', async (request, reply) => {
    const { projectId } = request.params as { projectId: string };
    return {
      steps: [
        {
          id: 'purpose',
          label: 'System Purpose',
          questions: [
            { key: 'systemName', question: 'What is the system called?', type: 'text', required: true },
            { key: 'mainPurpose', question: 'What is its main purpose?', type: 'textarea', required: true },
            { key: 'customerFacing', question: 'Is it customer-facing or internal?', type: 'select', options: ['customer-facing', 'internal'], required: true },
            { key: 'businessOutcome', question: 'What business outcome does it support?', type: 'textarea', required: true }
          ]
        },
        {
          id: 'users',
          label: 'Users & Interaction',
          questions: [
            { key: 'humanInteraction', question: 'Do humans interact directly with the system?', type: 'boolean', required: true },
            { key: 'aiAwareness', question: 'Are users aware they are interacting with AI?', type: 'boolean', required: true },
            { key: 'generatesContent', question: 'Does the system generate content, recommendations, or decisions?', type: 'select', options: ['content', 'recommendations', 'decisions', 'none'], required: true },
            { key: 'businessArea', question: 'In which business area is it used?', type: 'select', options: ['customer-service', 'sales', 'hr', 'legal', 'finance', 'operations', 'other'], required: true }
          ]
        },
        {
          id: 'data',
          label: 'Data & Privacy',
          questions: [
            { key: 'personalData', question: 'Does it process personal data?', type: 'boolean', required: true },
            { key: 'sensitiveData', question: 'Sensitive categories?', type: 'multiselect', options: ['none', 'health', 'biometric', 'financial', 'criminal', 'political', 'religious'], required: false },
            { key: 'affectedGroups', question: 'Which user groups are affected?', type: 'multiselect', options: ['employees', 'customers', 'candidates', 'patients', 'children', 'vulnerable'], required: true },
            { key: 'dataTypes', question: 'What types of data enter the system?', type: 'multiselect', options: ['text', 'voice', 'images', 'documents', 'structured-data', 'biometric'], required: true },
            { key: 'dataRetention', question: 'Is data retained anywhere?', type: 'boolean', required: true }
          ]
        },
        {
          id: 'tools',
          label: 'Tools & Models',
          questions: [
            { key: 'llmProvider', question: 'Which LLM provider is used?', type: 'select', options: ['openai', 'anthropic', 'google', 'azure', 'local', 'other'], required: true },
            { key: 'voiceProvider', question: 'Which voice provider is used (if any)?', type: 'select', options: ['none', 'retell', 'vapi', 'bland', 'twilio', 'other'], required: false },
            { key: 'automationTools', question: 'Which automation tools are connected?', type: 'multiselect', options: ['n8n', 'zapier', 'make', 'none'], required: false },
            { key: 'connectedSystems', question: 'Which CRM/helpdesk/databases are connected?', type: 'multiselect', options: ['salesforce', 'hubspot', 'zendesk', 'postgres', 'mongodb', 'none'], required: false }
          ]
        },
        {
          id: 'decisions',
          label: 'Decisions & Risk',
          questions: [
            { key: 'makesDecisions', question: 'Does the system rank, score, filter, recommend, or decide?', type: 'multiselect', options: ['rank', 'score', 'filter', 'recommend', 'decide', 'none'], required: true },
            { key: 'impactAreas', question: 'Could outputs affect employment, health, finance, access, support quality?', type: 'multiselect', options: ['employment', 'health', 'finance', 'access', 'support', 'none'], required: true },
            { key: 'materialHarm', question: 'Could errors create material harm?', type: 'boolean', required: true },
            { key: 'humanReview', question: 'Is human review mandatory before high-impact action?', type: 'boolean', required: true }
          ]
        },
        {
          id: 'oversight',
          label: 'Human Oversight',
          questions: [
            { key: 'systemOwner', question: 'Who owns the system?', type: 'text', required: true },
            { key: 'canIntervene', question: 'Who can intervene?', type: 'text', required: true },
            { key: 'escalationTrigger', question: 'When must escalation happen?', type: 'textarea', required: true },
            { key: 'fallbackPlan', question: 'What is the fallback if AI fails?', type: 'textarea', required: true }
          ]
        }
      ]
    };
  });

  // Get existing answers
  fastify.get('/:projectId/answers', async (request, reply) => {
    return {
      answers: [
        { questionKey: 'systemName', answer: 'Voice Agent', section: 'purpose' },
        { questionKey: 'mainPurpose', answer: 'Automated appointment scheduling', section: 'purpose' },
        { questionKey: 'customerFacing', answer: true, section: 'purpose' },
        { questionKey: 'businessOutcome', answer: 'Reduce call center load by 40%', section: 'purpose' }
      ]
    };
  });

  // Save answers
  fastify.post('/:projectId/answers', async (request, reply) => {
    return { success: true, message: 'Answers saved' };
  });

  // Calculate risk score
  fastify.post('/:projectId/calculate', async (request, reply) => {
    return {
      trustScore: 85,
      riskLevel: 'green',
      missingItems: [],
      recommendations: ['Add data retention policy', 'Document fallback procedures']
    };
  });

  // Generate passport
  fastify.post('/:projectId/generate-passport', async (request, reply) => {
    return {
      success: true,
      passportId: 'passport-1',
      publicUrl: 'https://trustlayer.io/p/passport-1',
      status: 'generated'
    };
  });
}
