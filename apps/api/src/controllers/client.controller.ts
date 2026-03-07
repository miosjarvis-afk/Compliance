// Client Controller - HTTP request handling for Clients
import type { FastifyRequest, FastifyReply } from 'fastify';
import { clientService } from '../services/client.service.js';
import { createClientSchema, updateClientSchema } from '../types/schemas.js';

export class ClientController {
  async getAll(request: FastifyRequest<{ Querystring: { agencyId?: string } }>, reply: FastifyReply) {
    try {
      const { agencyId } = request.query;
      const clients = await clientService.findAll(agencyId);
      return reply.send({ data: clients });
    } catch (error) {
      request.log.error(error);
      return reply.status(500).send({ error: 'Failed to fetch clients' });
    }
  }

  async getById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const { id } = request.params;
      const client = await clientService.findById(id);
      
      if (!client) {
        return reply.status(404).send({ error: 'Client not found' });
      }
      
      return reply.send({ data: client });
    } catch (error) {
      request.log.error(error);
      return reply.status(500).send({ error: 'Failed to fetch client' });
    }
  }

  async getByAgency(request: FastifyRequest<{ Params: { agencyId: string } }>, reply: FastifyReply) {
    try {
      const { agencyId } = request.params;
      const clients = await clientService.findByAgency(agencyId);
      return reply.send({ data: clients });
    } catch (error) {
      request.log.error(error);
      return reply.status(500).send({ error: 'Failed to fetch agency clients' });
    }
  }

  async create(request: FastifyRequest<{ Body: any }>, reply: FastifyReply) {
    try {
      const validated = createClientSchema.parse(request.body);
      const client = await clientService.create(validated);
      return reply.status(201).send({ data: client });
    } catch (error: any) {
      request.log.error(error);
      if (error.name === 'ZodError') {
        return reply.status(400).send({ error: 'Validation failed', details: error.errors });
      }
      return reply.status(500).send({ error: 'Failed to create client' });
    }
  }

  async update(request: FastifyRequest<{ Params: { id: string }; Body: any }>, reply: FastifyReply) {
    try {
      const { id } = request.params;
      const validated = updateClientSchema.parse(request.body);
      const client = await clientService.update(id, validated);
      return reply.send({ data: client });
    } catch (error: any) {
      request.log.error(error);
      if (error.code === 'P2025') {
        return reply.status(404).send({ error: 'Client not found' });
      }
      if (error.name === 'ZodError') {
        return reply.status(400).send({ error: 'Validation failed', details: error.errors });
      }
      return reply.status(500).send({ error: 'Failed to update client' });
    }
  }

  async delete(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const { id } = request.params;
      await clientService.delete(id);
      return reply.status(204).send();
    } catch (error: any) {
      request.log.error(error);
      if (error.code === 'P2025') {
        return reply.status(404).send({ error: 'Client not found' });
      }
      return reply.status(500).send({ error: 'Failed to delete client' });
    }
  }

  async getStats(request: FastifyRequest<{ Params: { agencyId: string } }>, reply: FastifyReply) {
    try {
      const { agencyId } = request.params;
      const stats = await clientService.getStats(agencyId);
      return reply.send({ data: stats });
    } catch (error) {
      request.log.error(error);
      return reply.status(500).send({ error: 'Failed to fetch client stats' });
    }
  }
}

export const clientController = new ClientController();
