import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Cafolio API',
      version: '1.0.0',
      description: 'Coffee portfolio management API',
    },
    tags: [
      {
        name: 'Storage',
        description: 'Image storage operations'
      }
    ],
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/features/**/*.controller.ts', './src/features/**/*.routes.ts'],
};

export const specs = swaggerJsdoc(options);