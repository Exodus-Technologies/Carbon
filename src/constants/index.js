'use strict';

export const STATES = [
  'AL',
  'AK',
  'AS',
  'AZ',
  'AR',
  'CA',
  'CO',
  'CT',
  'DE',
  'DC',
  'FM',
  'FL',
  'GA',
  'GU',
  'HI',
  'ID',
  'IL',
  'IN',
  'IA',
  'KS',
  'KY',
  'LA',
  'ME',
  'MH',
  'MD',
  'MA',
  'MI',
  'MN',
  'MS',
  'MO',
  'MT',
  'NE',
  'NV',
  'NH',
  'NJ',
  'NM',
  'NY',
  'NC',
  'ND',
  'MP',
  'OH',
  'OK',
  'OR',
  'PW',
  'PA',
  'PR',
  'RI',
  'SC',
  'SD',
  'TN',
  'TX',
  'UT',
  'VT',
  'VI',
  'VA',
  'WA',
  'WV',
  'WI',
  'WY'
];

export const windowMs = 15 * 60 * 1000; // 15 minutes

export const TOKEN_EXPIRY = 15;

export const PASSWORD_RESET_REQUEST_SUBJECT = 'Password Reset Request';

export const PASSWORD_RESET_SUCCESS_SUBJECT = 'Password Reset Successfully';

export const STRONG_PASSWORD_VALIDATIONS_REGEX =
  '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-]).{8,}$';

export const PASSWORD_VALIDATION_MESSAGE =
  'Please enter a password at least 8 characters, at least one uppercase letter, one lowercase letter, and one special character.';
