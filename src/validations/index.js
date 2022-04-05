'use strict';

/**
 * https://github.com/validatorjs/validator.js#validators
 */
import { query, body, validationResult, param } from 'express-validator';

import { GENDERS, ROLES, STATES } from '../constants';

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
  query('role').isString().optional(),
  query('gender').isString().optional(),
  query('city').isString().optional(),
  query('state').isString().optional(),
  query('zipCode').isString().optional()
];

const userCreationValidation = [
  body('email')
    .isString()
    .isEmail()
    .matches(/\S+@\S+\.\S+/)
    .withMessage('Must provide a existing and valid email.'),
  body('password')
    .isString()
    .isLength({ min: 8 })
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/)
    .withMessage(
      'Please enter a password at least 8 character and contain at least one uppercase, least one lower case, and at least one special character.'
    ),
  body('fullName')
    .isString()
    .withMessage('Must provide your first and last name.'),
  body('role')
    .isString()
    .custom(role => {
      if (!ROLES.includes(role)) {
        throw new Error('Role submitted is not allowed for this field.');
      }
      // Indicates the success of this synchronous custom validator
      return true;
    })
    .optional(),
  body('gender')
    .isString()
    .custom(gender => {
      if (!GENDERS.includes(gender)) {
        throw new Error('Gender submitted is not allowed for this field.');
      }
      // Indicates the success of this synchronous custom validator
      return true;
    }),
  body('city')
    .isString()
    .withMessage('Must provide the city in which you stay.'),
  body('state')
    .isString()
    .custom(state => {
      if (!STATES.includes(state)) {
        throw new Error('State submitted is not allowed for this field.');
      }
      // Indicates the success of this synchronous custom validator
      return true;
    }),
  body('zipCode').isString().withMessage('Must provide your zip code.')
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
    .isLength({ min: 8 })
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/)
    .withMessage(
      'Please enter a password at least 8 character and contain at least one uppercase, least one lower case, and at least one special character.'
    )
    .optional(),
  body('fullName')
    .isString()
    .withMessage('Must provide your first and last name.')
    .optional(),
  body('role')
    .isString()
    .custom(role => {
      if (!ROLES.includes(role)) {
        throw new Error('Role submitted is not allowed for this field.');
      }
      // Indicates the success of this synchronous custom validator
      return true;
    })
    .optional(),
  body('gender')
    .isString()
    .custom(gender => {
      if (!GENDERS.includes(gender)) {
        throw new Error('Gender submitted is not allowed for this field.');
      }
      // Indicates the success of this synchronous custom validator
      return true;
    })
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
    .optional(),
  body('zipCode')
    .isString()
    .withMessage('Must provide your zip code.')
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
