'use strict';

/**
 * https://github.com/validatorjs/validator.js#validators
 */
import { query, body, validationResult, param } from 'express-validator';

import {
  STATES,
  STRONG_PASSWORD_VALIDATIONS_REGEX,
  PASSWORD_VALIDATION_MESSAGE
} from '../constants';

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
  query('city').isString().optional(),
  query('state').isString().optional().isLength({ min: 2 })
];

const userIdParamValidation = [
  param('userId').isString().withMessage('Must provide a existing user id.')
];

const userCreationValidation = [
  body('email')
    .isString()
    .isEmail()
    .matches(/\S+@\S+\.\S+/)
    .withMessage('Must provide a existing and valid email.'),
  body('password')
    .isString()
    .matches(STRONG_PASSWORD_VALIDATIONS_REGEX)
    .withMessage(PASSWORD_VALIDATION_MESSAGE),
  body('fullName')
    .isString()
    .withMessage('Must provide your first and last name.'),
  body('dob').isString().optional(),
  body('city')
    .isString()
    .withMessage('Must provide the city in which you stay.')
    .optional(),
  body('state')
    .isString()
    .custom(state => {
      if (!STATES.includes(state)) {
        throw new Error('State submitted is not allowed for this field.');
      }
      // Indicates the success of this synchronous custom validator
      return true;
    })
    .isLength({ min: 2 })
    .optional(),
  body('zipCode').isString().isLength({ min: 5 }).optional()
];

const userUpdateValidation = [
  param('userId').isString().withMessage('Must provide a valid userId.'),
  body('email')
    .isString()
    .isEmail()
    .matches(/\S+@\S+\.\S+/)
    .withMessage('Must provide a existing and valid email.')
    .optional(),
  body('password')
    .isString()
    .matches(STRONG_PASSWORD_VALIDATIONS_REGEX)
    .withMessage(PASSWORD_VALIDATION_MESSAGE)
    .optional(),
  body('fullName')
    .isString()
    .withMessage('Must provide your first and last name.')
    .optional(),
  body('city')
    .isString()
    .withMessage('Must provide the city in which you stay.')
    .optional(),
  body('state')
    .isString()
    .custom(state => {
      if (!STATES.includes(state)) {
        throw new Error('State submitted is not allowed for this field.');
      }
      // Indicates the success of this synchronous custom validator
      return true;
    })
    .isLength({ min: 2 })
    .optional(),
  body('zipCode').isString().isLength({ min: 5 }).optional()
];

const loginValidation = [
  body('email')
    .isString()
    .isEmail()
    .matches(/\S+@\S+\.\S+/)
    .withMessage('Must provide a existing and valid email.'),
  body('password').isString().withMessage(PASSWORD_VALIDATION_MESSAGE)
];

const changePasswordValidation = [
  body('email')
    .isString()
    .isEmail()
    .matches(/\S+@\S+\.\S+/)
    .withMessage('Must provide a existing and valid email.'),
  body('token').isString().withMessage('Must provide a token.'),
  body('password')
    .isString()
    .isStrongPassword(STRONG_PASSWORD_VALIDATIONS_REGEX)
    .withMessage(PASSWORD_VALIDATION_MESSAGE)
];

const passwordRequestResetBodyValidation = [
  body('email')
    .isString()
    .isEmail()
    .matches(/\S+@\S+\.\S+/)
    .withMessage('Must provide a existing and valid email.')
];

const otpBodyValidation = [
  body('email')
    .isString()
    .isEmail()
    .matches(/\S+@\S+\.\S+/)
    .withMessage('Must provide a existing and valid email.'),
  body('otpCode').isString().withMessage('Must provide a otpCode.')
];

const platfromQueryValidation = [
  query('platform').isString().withMessage('Must provide a device platform.')
];

const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
  return `${location}[${param}]: ${msg}`;
};

export {
  userCreationValidation,
  userUpdateValidation,
  validationResult,
  userQueryValidation,
  loginValidation,
  userIdParamValidation,
  passwordRequestResetBodyValidation,
  changePasswordValidation,
  platfromQueryValidation,
  otpBodyValidation,
  errorFormatter
};
