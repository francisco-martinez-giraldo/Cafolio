import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Cafolio API',
      version: '1.0.0',
      description: 'Coffee portfolio management API',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/features/**/*.controller.ts'],
};

export const specs = swaggerJsdoc(options);