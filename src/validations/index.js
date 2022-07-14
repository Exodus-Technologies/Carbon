'use strict';

/**
 * https://github.com/validatorjs/validator.js#validators
 */
import { query, body, validationResult, param } from 'express-validator';

import { GENDERS, STATES } from '../constants';

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
  query('gender').isString().optional().isLength({ min: 1 }),
  query('city').isString().optional(),
  query('state').isString().optional().isLength({ min: 2 }),
  query('zipCode').isString().optional().isLength({ min: 5 })
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
  body('dob').isString().withMessage('Must provide your date of birth'),
  body('gender')
    .isString()
    .custom(gender => {
      if (!GENDERS.includes(gender)) {
        throw new Error('Gender submitted is not allowed for this field.');
      }
      // Indicates the success of this synchronous custom validator
      return true;
    })
    .isLength({ min: 1 }),
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
    })
    .isLength({ min: 2 }),
  body('zipCode')
    .isString()
    .withMessage('Must provide your zip code.')
    .isLength({ min: 5 })
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
  body('fullName')
    .isString()
    .withMessage('Must provide your first and last name.')
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
    .isLength({ min: 1 })
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
  body('zipCode')
    .isString()
    .withMessage('Must provide your zip code.')
    .isLength({ min: 5 })
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

const changePasswordValidation = [
  body('email')
    .isString()
    .matches(/\S+@\S+\.\S+/)
    .withMessage('Must provide a existing and valid email.'),
  body('token').isString().withMessage('Must provide a token.'),
  body('password')
    .isString()
    .isLength({ min: 8 })
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/)
    .withMessage(
      'Please enter a password at least 8 character and contain at least one uppercase, least one lower case, and at least one special character.'
    )
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
  otpBodyValidation
};
