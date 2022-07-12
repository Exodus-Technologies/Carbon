'use strict';

import express from 'express';
import { AuthController, UserController } from '../controllers';
import {
  loginValidation,
  userCreationValidation,
  passwordRequestResetBodyValidation,
  changePasswordValidation,
  otpBodyValidation
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
  passwordRequestResetBodyValidation,
  validationHandler,
  AuthController.requestPasswordReset
);

router.post(
  '/auth-service/verifyOTP',
  otpBodyValidation,
  validationHandler,
  AuthController.verifyOTP
);

router.put(
  '/auth-service/changePassword',
  changePasswordValidation,
  validationHandler,
  AuthController.changePassword
);

export default router;
