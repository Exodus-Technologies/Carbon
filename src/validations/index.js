'use strict';

/**
 * https://github.com/validatorjs/validator.js#validators
 */
const { header, body, validationResult } = require('express-validator');

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
      'Please enter a password at least 8 character and contain At least one uppercase.At least one lower case.At least one special character. '
    ),
  body('firstName').isString().withMessage('Must provide your first name'),
  body('lastName').isString().withMessage('Must provide your last name')
];

const userUpdateValidation = [
  body('password')
    .isString()
    .isLength({ min: 8 })
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/)
    .withMessage(
      'Please enter a password at least 8 character and contain At least one uppercase.At least one lower case.At least one special character. '
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
  body('bio').isString().optional(),
  body('image').isString().optional()
];

const authorizationHeaderValidation = [
  header('Authorization')
    .isString()
    .withMessage('Must provide a valid authorization token.')
];

export {
  userCreationValidation,
  userUpdateValidation,
  validationResult,
  authorizationHeaderValidation
};
