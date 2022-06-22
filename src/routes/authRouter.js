'use strict';

import express from 'express';
import { AuthController, UserController } from '../controllers';
import {
  loginValidation,
  userCreationValidation,
  changePasswordValidation
  // userEmailParamValidation
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

router.put(
  '/auth-service/changePassword',
  changePasswordValidation,
  validationHandler,
  AuthController.changePassword
);

// router.post(
//   '/auth-service/requestPasswordReset',
//   userEmailParamValidation,
//   validationHandler,
//   AuthController.requestPasswordReset
// );

export default router;
