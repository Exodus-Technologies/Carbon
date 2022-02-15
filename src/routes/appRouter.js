'use strict';

import express from 'express';

const { Router } = express;

const router = Router();

router.get('/auth-service/', (_, res) => {
  res.send('Welcome to Carbon Auth Manager Service!').status(200);
});

router.get('/auth-service/probeCheck', (_, res) => {
  res.send('Carbon Auth Manager service up and running!').status(200);
});

export default router;
