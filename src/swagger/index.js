'use strict';

import path from 'path';
import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const { Router } = express;

const router = Router();

const { version } = require('../../package.json');

const swaggerDefinition = {
  openapi: '3.0.3',
  info: {
    version,
    title: 'Authentication Manager Microservice API Definition',
    description: 'API Definition for the Authentication Manager Microservice',
    contact: {
      name: 'Exodus Technologies, LLC',
      email: 'drobinson@exodustechnologiesllc.com'
    }
  }
};

const options = {
  swaggerDefinition,
  apis: [path.join(__dirname, './definitions/*.yml')]
};

const openApiSpecification = swaggerJsdoc(options);

router.use(
  '/auth-service/swagger/docs',
  swaggerUi.serve,
  swaggerUi.setup(openApiSpecification, { explorer: true })
);

router.get('/auth-service/swagger/swagger.json', (_, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(openApiSpecification);
});

export default router;