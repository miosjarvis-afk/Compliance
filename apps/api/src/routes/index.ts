import { FastifyInstance } from 'fastify';
import clientRoutes from './clients.js';
import projectRoutes from './projects.js';
import intakeRoutes from './intake.js';
import evidenceRoutes from './evidence.js';
import passportRoutes from './passport.js';
import integrationRoutes from './integrations.js';

export async function registerRoutes(server: FastifyInstance) {
  // Health check
  server.get('/health', async () => {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      version: '0.1.0',
      uptime: process.uptime()
    };
  });

  // Root
  server.get('/', async () => {
    return {
      message: 'AI Trust Layer API',
      version: '0.1.0',
      docs: '/docs',
      health: '/health'
    };
  });

  // API Routes
  await server.register(clientRoutes, { prefix: '/clients' });
  await server.register(projectRoutes, { prefix: '/projects' });
  await server.register(intakeRoutes, { prefix: '/intake' });
  await server.register(evidenceRoutes, { prefix: '/evidence' });
  await server.register(passportRoutes, { prefix: '/passports' });
  await server.register(integrationRoutes, { prefix: '/integrations' });
}
