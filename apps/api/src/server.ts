import Fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';

const server = Fastify({
  logger: true
});

// Plugins
await server.register(cors, {
  origin: true
});

await server.register(jwt, {
  secret: process.env.JWT_SECRET || 'supersecret'
});

// Swagger Docs
await server.register(swagger, {
  swagger: {
    info: {
      title: 'AI Trust Layer API',
      description: 'API for AI Trust Layer - Compliance management for AI agencies',
      version: '0.1.0'
    },
    host: 'localhost:3001',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json']
  }
});

await server.register(swaggerUi, {
  routePrefix: '/docs'
});

// Health Check
server.get('/health', async () => {
  return { status: 'ok', timestamp: new Date().toISOString() };
});

// Routes placeholder
server.get('/', async () => {
  return { 
    message: 'AI Trust Layer API',
    version: '0.1.0',
    docs: '/docs'
  };
});

// Start server
const start = async () => {
  try {
    await server.listen({ port: 3001, host: '0.0.0.0' });
    console.log('Server running at http://localhost:3001');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
