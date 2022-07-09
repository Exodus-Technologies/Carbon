'use strict';

import express from 'express';
import { AuthController, UserController } from '../controllers';
import {
  loginValidation,
  userCreationValidation,
  userEmailBodyValidation,
  changePasswordValidation
} from '../validations';
import { validationHandler } from '../middlewares';

const { Router } = express;
const router = Router();

router.post(
  '/auth-service/login',
  loginValidation,
  validationHandler,
  AuthController.login
);

router.post(
  '/auth-service/signUp',
  userCreationValidation,
  validationHandler,
  UserController.createUser
);

router.post(
  '/auth-service/requestPasswordReset',
  userEmailBodyValidation,
  validationHandler,
  AuthController.requestPasswordReset
);

router.put(
  '/auth-service/resetPassword',
  changePasswordValidation,
  validationHandler,
  AuthController.resetPassword
);

export default router;
