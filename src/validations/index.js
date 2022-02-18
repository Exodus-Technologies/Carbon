'use strict';

/**
 * https://github.com/validatorjs/validator.js#validators
 */
import { query, body, validationResult } from 'express-validator';

import { ROLES } from '../constants';

const userCreationValidation = [
  body('email')
    .isString()
    .matches(/\S+@\S+\.\S+/)
    .withMessage('Must provide a existing and valid email'),
  body('password')
    .isString()
    .isLength({ min: 8 })
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/)
    .withMessage(
      'Please enter a password at least 8 character and contain at least one uppercase, least one lower case, and at least one special character.'
    ),
  body('firstName').isString().withMessage('Must provide your first name'),
  body('lastName').isString().withMessage('Must provide your last name'),
  body('role')
    .isString()
    .custom(role => {
      if (!ROLES.includes(role)) {
        throw new Error('Role submitted is not allowed for this field');
      }
      // Indicates the success of this synchronous custom validator
      return true;
    })
];

const userUpdateValidation = [
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
    .withMessage('Must provide your first name')
    .optional(),
  body('lastName')
    .isString()
    .withMessage('Must provide your last name')
    .optional(),
  body('role')
    .isString()
    .custom(role => {
      if (!ROLES.includes(role)) {
        throw new Error('Roles submitted is not allowed for this field');
      }
      // Indicates the success of this synchronous custom validator
      return true;
    })
    .optional()
];

const userQueryValidation = [
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
  body('role')
    .isString()
    .custom(role => {
      if (!ROLES.includes(role)) {
        throw new Error('Role submitted is not allowed for this field');
      }
      // Indicates the success of this synchronous custom validator
      return true;
    })
    .optional()
];

const loginValidation = [
  body('email')
    .isString()
    .matches(/\S+@\S+\.\S+/)
    .withMessage('Must provide a existing and valid email'),
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
  loginValidation
};
