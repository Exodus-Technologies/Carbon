'use strict';

import express from 'express';
import { UserController } from '../controllers';
import {
  userCreationValidation,
  userIdParamValidation,
  userQueryValidation,
  userUpdateValidation
} from '../validations';
import { validationHandler } from '../middlewares';

const { Router } = express;
const router = Router();

router.get(
  '/auth-service/getUsers',
  userQueryValidation,
  validationHandler,
  UserController.getUsers
);

router.get(
  '/auth-service/getUser/:userId',
  userIdParamValidation,
  validationHandler,
  UserController.getUser
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
