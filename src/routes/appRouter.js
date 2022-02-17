'use strict';

import express from 'express';

const { Router } = express;

const router = Router();

router.get('/auth-service/', (_, res) => {
  res.json({
    statusCode: 200,
    message: 'Welcome to Carbon Auth Manager Service!'
  });
});

router.get('/auth-service/probeCheck', (_, res) => {
  res.json({
    statusCode: 200,
    message: 'Carbon Auth Manager service up and running!'
  });
});

export default router;
