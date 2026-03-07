// Agency Controller - HTTP request handling for Agencies
import type { FastifyRequest, FastifyReply } from 'fastify';
import { agencyService } from '../services/agency.service.js';
import { createAgencySchema, updateAgencySchema } from '../types/schemas.js';

export class AgencyController {
  async getAll(request: FastifyRequest, reply: FastifyReply) {
    try {
      const agencies = await agencyService.findAll();
      return reply.send({ data: agencies });
    } catch (error) {
      request.log.error(error);
      return reply.status(500).send({ error: 'Failed to fetch agencies' });
    }
  }

  async getById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const { id } = request.params;
      const agency = await agencyService.findById(id);
      
      if (!agency) {
        return reply.status(404).send({ error: 'Agency not found' });
      }
      
      return reply.send({ data: agency });
    } catch (error) {
      request.log.error(error);
      return reply.status(500).send({ error: 'Failed to fetch agency' });
    }
  }

  async create(request: FastifyRequest<{ Body: any }>, reply: FastifyReply) {
    try {
      const validated = createAgencySchema.parse(request.body);
      const agency = await agencyService.create(validated);
      return reply.status(201).send({ data: agency });
    } catch (error: any) {
      request.log.error(error);
      if (error.name === 'ZodError') {
        return reply.status(400).send({ error: 'Validation failed', details: error.errors });
      }
      return reply.status(500).send({ error: 'Failed to create agency' });
    }
  }

  async update(request: FastifyRequest<{ Params: { id: string }; Body: any }>, reply: FastifyReply) {
    try {
      const { id } = request.params;
      const validated = updateAgencySchema.parse(request.body);
      const agency = await agencyService.update(id, validated);
      return reply.send({ data: agency });
    } catch (error: any) {
      request.log.error(error);
      if (error.code === 'P2025') {
        return reply.status(404).send({ error: 'Agency not found' });
      }
      if (error.name === 'ZodError') {
        return reply.status(400).send({ error: 'Validation failed', details: error.errors });
      }
      return reply.status(500).send({ error: 'Failed to update agency' });
    }
  }

  async delete(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const { id } = request.params;
      await agencyService.delete(id);
      return reply.status(204).send();
    } catch (error: any) {
      request.log.error(error);
      if (error.code === 'P2025') {
        return reply.status(404).send({ error: 'Agency not found' });
      }
      return reply.status(500).send({ error: 'Failed to delete agency' });
    }
  }
}

export const agencyController = new AgencyController();
