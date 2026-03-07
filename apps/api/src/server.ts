// AI Trust Layer API - Fastify Server
import Fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { registerRoutes } from './routes/index.js';

const server = Fastify({
  logger: {
    level: 'info',
    transport: process.env.NODE_ENV === 'development' ? {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      }
    } : undefined
  }
});

// CORS
await server.register(cors, {
  origin: process.env.CORS_ORIGIN || true,
  credentials: true,
});

// JWT
await server.register(jwt, {
  secret: process.env.JWT_SECRET || 'supersecret-change-in-production',
});

// Swagger Docs
await server.register(swagger, {
  swagger: {
    info: {
      title: 'AI Trust Layer API',
      description: 'Backend API for AI Trust Layer - Compliance management platform for AI agencies',
      version: '0.1.0',
      contact: {
        name: 'AI Trust Layer Support',
        email: 'support@trustlayer.io'
      }
    },
    host: process.env.API_HOST || 'localhost:3001',
    schemes: process.env.NODE_ENV === 'production' ? ['https'] : ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
      { name: 'Agencies', description: 'Agency management' },
      { name: 'Clients', description: 'Client management' },
      { name: 'Projects', description: 'AI project management' },
      { name: 'Intake', description: 'Compliance intake flow' },
      { name: 'Evidence', description: 'Evidence management' },
    ]
  }
});

await server.register(swaggerUi, {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'list',
    deepLinking: false
  }
});

// Register API routes
await registerRoutes(server);

// Error handler
server.setErrorHandler((error, request, reply) => {
  server.log.error(error);
  
  if (error.validation) {
    return reply.status(400).send({
      error: 'Validation Error',
      message: error.message
    });
  }
  
  return reply.status(500).send({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

// Not found handler
server.setNotFoundHandler((request, reply) => {
  reply.status(404).send({
    error: 'Not Found',
    message: `Route ${request.method} ${request.url} not found`
  });
});

// Start server
const start = async () => {
  try {
    const port = parseInt(process.env.PORT || '3001');
    const host = process.env.HOST || '0.0.0.0';
    
    await server.listen({ port, host });
    server.log.info(`🚀 Server running at http://${host}:${port}`);
    server.log.info(`📚 API Docs at http://${host}:${port}/docs`);
    server.log.info(`💓 Health check at http://${host}:${port}/health`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
