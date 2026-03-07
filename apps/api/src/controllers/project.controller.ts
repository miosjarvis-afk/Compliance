// Project Controller - HTTP request handling for Projects
import type { FastifyRequest, FastifyReply } from 'fastify';
import { projectService } from '../services/project.service.js';
import { createProjectSchema, updateProjectSchema, createIntakeAnswerSchema } from '../types/schemas.js';

export class ProjectController {
  async getAll(request: FastifyRequest<{ Querystring: { clientId?: string } }>, reply: FastifyReply) {
    try {
      const { clientId } = request.query;
      const projects = await projectService.findAll(clientId);
      return reply.send({ data: projects });
    } catch (error) {
      request.log.error(error);
      return reply.status(500).send({ error: 'Failed to fetch projects' });
    }
  }

  async getById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const { id } = request.params;
      const project = await projectService.findById(id);
      
      if (!project) {
        return reply.status(404).send({ error: 'Project not found' });
      }
      
      return reply.send({ data: project });
    } catch (error) {
      request.log.error(error);
      return reply.status(500).send({ error: 'Failed to fetch project' });
    }
  }

  async create(request: FastifyRequest<{ Body: any }>, reply: FastifyReply) {
    try {
      const validated = createProjectSchema.parse(request.body);
      const project = await projectService.create(validated);
      return reply.status(201).send({ data: project });
    } catch (error: any) {
      request.log.error(error);
      if (error.name === 'ZodError') {
        return reply.status(400).send({ error: 'Validation failed', details: error.errors });
      }
      return reply.status(500).send({ error: 'Failed to create project' });
    }
  }

  async update(request: FastifyRequest<{ Params: { id: string }; Body: any }>, reply: FastifyReply) {
    try {
      const { id } = request.params;
      const validated = updateProjectSchema.parse(request.body);
      const project = await projectService.update(id, validated);
      return reply.send({ data: project });
    } catch (error: any) {
      request.log.error(error);
      if (error.code === 'P2025') {
        return reply.status(404).send({ error: 'Project not found' });
      }
      if (error.name === 'ZodError') {
        return reply.status(400).send({ error: 'Validation failed', details: error.errors });
      }
      return reply.status(500).send({ error: 'Failed to update project' });
    }
  }

  async delete(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const { id } = request.params;
      await projectService.delete(id);
      return reply.status(204).send();
    } catch (error: any) {
      request.log.error(error);
      if (error.code === 'P2025') {
        return reply.status(404).send({ error: 'Project not found' });
      }
      return reply.status(500).send({ error: 'Failed to delete project' });
    }
  }

  async recalculateTrustScore(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const { id } = request.params;
      const project = await projectService.updateTrustScore(id);
      
      if (!project) {
        return reply.status(404).send({ error: 'Project not found' });
      }
      
      return reply.send({ data: project });
    } catch (error) {
      request.log.error(error);
      return reply.status(500).send({ error: 'Failed to recalculate trust score' });
    }
  }

  // Intake routes
  async getIntake(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const { id } = request.params;
      const answers = await projectService.getIntakeAnswers(id);
      return reply.send({ data: answers });
    } catch (error) {
      request.log.error(error);
      return reply.status(500).send({ error: 'Failed to fetch intake answers' });
    }
  }

  async saveIntakeAnswer(request: FastifyRequest<{ Params: { id: string }; Body: any }>, reply: FastifyReply) {
    try {
      const { id } = request.params;
      const data = { ...request.body, projectId: id };
      const validated = createIntakeAnswerSchema.parse(data);
      const answer = await projectService.saveIntakeAnswer(validated);
      return reply.send({ data: answer });
    } catch (error: any) {
      request.log.error(error);
      if (error.name === 'ZodError') {
        return reply.status(400).send({ error: 'Validation failed', details: error.errors });
      }
      return reply.status(500).send({ error: 'Failed to save intake answer' });
    }
  }

  // Evidence routes
  async getEvidence(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const { id } = request.params;
      const evidence = await projectService.getEvidence(id);
      return reply.send({ data: evidence });
    } catch (error) {
      request.log.error(error);
      return reply.status(500).send({ error: 'Failed to fetch evidence' });
    }
  }

  // Dashboard
  async getDashboardStats(request: FastifyRequest<{ Params: { agencyId: string } }>, reply: FastifyReply) {
    try {
      const { agencyId } = request.params;
      const stats = await projectService.getDashboardStats(agencyId);
      return reply.send({ data: stats });
    } catch (error) {
      request.log.error(error);
      return reply.status(500).send({ error: 'Failed to fetch dashboard stats' });
    }
  }
}

export const projectController = new ProjectController();
