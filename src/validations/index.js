'use strict';

/**
 * https://github.com/validatorjs/validator.js#validators
 */
import { query, body, validationResult, param } from 'express-validator';

import { ROLES } from '../constants';

const userQueryValidation = [
  query('page')
    .isString()
    .not()
    .isEmpty()
    .withMessage('Must provide a page for users'),
  query('limit')
    .isString()
    .not()
    .isEmpty()
    .withMessage('Must provide a limit for users'),
  query('email')
    .isString()
    .matches(/\S+@\S+\.\S+/)
    .withMessage('Must provide a existing email')
    .optional(),
  query('firstName')
    .isString()
    .withMessage('Must provide your first name')
    .optional(),
  query('lastName')
    .isString()
    .withMessage('Must provide your last name')
    .optional(),
  body('role').isString().optional()
];

const userCreationValidation = [
  body('email')
    .isString()
    .matches(/\S+@\S+\.\S+/)
    .withMessage('Must provide a existing and valid email.'),
  body('password')
    .isString()
    .isLength({ min: 8 })
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/)
    .withMessage(
      'Please enter a password at least 8 character and contain at least one uppercase, least one lower case, and at least one special character.'
    ),
  body('firstName').isString().withMessage('Must provide your first name.'),
  body('lastName').isString().withMessage('Must provide your last name.'),
  body('role')
    .isString()
    .custom(role => {
      if (!ROLES.includes(role)) {
        throw new Error('Role submitted is not allowed for this field.');
      }
      // Indicates the success of this synchronous custom validator
      return true;
    })
    .optional()
];

const userUpdateValidation = [
  param('userId').isString().withMessage('Must provide a valid userId.'),
  body('password')
    .isString()
    .isLength({ min: 8 })
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/)
    .withMessage(
      'Please enter a password at least 8 character and contain at least one uppercase, least one lower case, and at least one special character.'
    )
    .optional(),
  body('firstName')
    .isString()
    .withMessage('Must provide your first name.')
    .optional(),
  body('lastName')
    .isString()
    .withMessage('Must provide your last name.')
    .optional(),
  body('role')
    .isString()
    .custom(role => {
      if (!ROLES.includes(role)) {
        throw new Error('Roles submitted is not allowed for this field.');
      }
      // Indicates the success of this synchronous custom validator
      return true;
    })
    .optional()
];

const userIdParamValidation = [
  param('userId').isString().withMessage('Must provide a existing user id.')
];

const loginValidation = [
  body('email')
    .isString()
    .matches(/\S+@\S+\.\S+/)
    .withMessage('Must provide a existing and valid email.'),
  body('password')
    .isString()
    .isLength({ min: 8 })
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/)
    .withMessage(
      'Please enter a password at least 8 character and contain at least one uppercase, least one lower case, and at least one special character.'
    )
];

export {
  userCreationValidation,
  userUpdateValidation,
  validationResult,
  userQueryValidation,
  loginValidation,
  userIdParamValidation
};
