// API Routes - Main route definitions
import type { FastifyInstance } from 'fastify';
import { agencyController } from '../controllers/agency.controller.js';
import { clientController } from '../controllers/client.controller.js';
import { projectController } from '../controllers/project.controller.js';

export async function registerRoutes(server: FastifyInstance) {
  // Health check
  server.get('/health', async () => ({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '0.1.0'
  }));

  // ========== AGENCY ROUTES ==========
  server.get('/agencies', agencyController.getAll.bind(agencyController));
  server.get('/agencies/:id', agencyController.getById.bind(agencyController));
  server.post('/agencies', agencyController.create.bind(agencyController));
  server.patch('/agencies/:id', agencyController.update.bind(agencyController));
  server.delete('/agencies/:id', agencyController.delete.bind(agencyController));

  // ========== CLIENT ROUTES ==========
  server.get('/clients', clientController.getAll.bind(clientController));
  server.get('/clients/:id', clientController.getById.bind(clientController));
  server.get('/agencies/:agencyId/clients', clientController.getByAgency.bind(clientController));
  server.get('/agencies/:agencyId/clients/stats', clientController.getStats.bind(clientController));
  server.post('/clients', clientController.create.bind(clientController));
  server.patch('/clients/:id', clientController.update.bind(clientController));
  server.delete('/clients/:id', clientController.delete.bind(clientController));

  // ========== PROJECT ROUTES ==========
  server.get('/projects', projectController.getAll.bind(projectController));
  server.get('/projects/:id', projectController.getById.bind(projectController));
  server.post('/projects', projectController.create.bind(projectController));
  server.patch('/projects/:id', projectController.update.bind(projectController));
  server.delete('/projects/:id', projectController.delete.bind(projectController));
  
  // Project actions
  server.post('/projects/:id/recalculate', projectController.recalculateTrustScore.bind(projectController));
  
  // Intake routes
  server.get('/projects/:id/intake', projectController.getIntake.bind(projectController));
  server.post('/projects/:id/intake', projectController.saveIntakeAnswer.bind(projectController));
  
  // Evidence routes
  server.get('/projects/:id/evidence', projectController.getEvidence.bind(projectController));
  
  // Dashboard
  server.get('/agencies/:agencyId/dashboard', projectController.getDashboardStats.bind(projectController));

  // Root
  server.get('/', async () => ({
    name: 'AI Trust Layer API',
    version: '0.1.0',
    docs: '/docs',
    health: '/health',
    endpoints: {
      agencies: '/agencies',
      clients: '/clients',
      projects: '/projects',
    }
  }));
}
