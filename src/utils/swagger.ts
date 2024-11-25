import swaggerJsdoc from "swagger-jsdoc"

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TypeScript Backend API',
      version: '1.0.0',
      description: 'Advanced TypeScript Backend with Express',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);