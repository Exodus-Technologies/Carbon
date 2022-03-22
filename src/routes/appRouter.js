'use strict';

import express from 'express';

const { Router } = express;

const router = Router();

router.get('/auth-service/', (_, res) => {
  res.status(200).send({ message: 'Welcome to Carbon Auth Manager Service!' });
});

router.get('/auth-service/probeCheck', (_, res) => {
  res
    .status(200)
    .send({ message: 'Carbon Auth Manager service up and running!' });
});

export default router;
