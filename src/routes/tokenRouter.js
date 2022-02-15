'use strict';

'use strict';

import express from 'express';
import { authorizationHeaderValidation } from '../validations';
import { validationHandler } from '../utils';
import { TokenController } from '../controllers';

const { Router } = express;

const router = Router();

router.post(
  '/auth-service/verify',
  authorizationHeaderValidation,
  validationHandler,
  TokenController.verifyToken
);

export default router;
