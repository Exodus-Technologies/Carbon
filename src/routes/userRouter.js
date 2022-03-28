'use strict';

import express from 'express';
import { UserController } from '../controllers';
import {
  userCreationValidation,
  userIdParamValidation,
  userQueryValidation,
  userUpdateValidation
} from '../validations';
import { validationHandler, cache } from '../middlewares';

const { Router } = express;
const router = Router();

router.get(
  '/auth-service/getUsers',
  userQueryValidation,
  validationHandler,
  cache(),
  UserController.getUsers
);

router.post(
  '/auth-service/createUser',
  userCreationValidation,
  validationHandler,
  UserController.createUser
);

router.put(
  '/auth-service/updateUser/:userId',
  userUpdateValidation,
  validationHandler,
  UserController.updateUser
);

router.delete(
  '/auth-service/deleteUser/:userId',
  userIdParamValidation,
  validationHandler,
  UserController.deleteUser
);

export default router;
