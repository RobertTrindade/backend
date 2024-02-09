export default {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Eco Chamados REST API Documentation',
      version: '1.0.0',
    },
    servers: [
      {
        url: `${process.env.URL}:${process.env.PORT}`,
        description: 'Development environment',
      },
      {
        url: `${process.env.URL}:${process.env.PORT}`,
        description: 'Testing environment',
      },
    ],
  },
  apis: ['docs/**/*.yml'],
};
