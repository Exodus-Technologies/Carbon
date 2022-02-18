'use strict';

import express from 'express';
import { UserController } from '../controllers';
import { userCreationValidation, userQueryValidation } from '../validations';
import { validationHandler } from '../utils';

const { Router } = express;
const router = Router();

router.get(
  '/auth-service/getUsers',
  userQueryValidation,
  validationHandler,
  UserController.getUsers
);

router.post(
  '/auth-service/createUser',
  userCreationValidation,
  validationHandler,
  UserController.createUser
);

export default router;
