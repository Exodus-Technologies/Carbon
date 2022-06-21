'use strict';

import express from 'express';
import { cache } from '../middlewares';

const { Router } = express;
const { version } = require('../../package.json');

const router = Router();

router.get('/auth-service/', cache(), (_, res) => {
  res.status(200).send({ message: 'Welcome to Carbon Auth Manager Service!' });
});

router.get('/auth-service/probeCheck', (_, res) => {
  res.status(200).send({
    uptime: process.uptime(),
    date: new Date(),
    message: 'Carbon Auth Manager service up and running!',
    appVersion: version
  });
});

export default router;
