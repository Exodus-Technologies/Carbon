'use strict';

import { AuthService } from '../services';

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const [statusCode, response] = await AuthService.validateLogin(
      email,
      password
    );
    res.status(statusCode).send(response);
  } catch (err) {
    console.log(`Error with login: `, err);
    next(err);
  }
};

// exports.changePassword = async (req, res, next) => {
//   try {
//     const { email, password, code } = req.body;
//     const [statusCode, response] = await AuthService.changePassword(
//       email,
//       password,
//       code
//     );
//     res.status(statusCode).send(response);
//   } catch (err) {
//     console.log(`Error with changing password: `, err);
//     next(err);
//   }
// };

// exports.requestPasswordReset = async (req, res, next) => {
//   try {
//     const { body } = req;
//     const [statusCode, response] = await AuthService.requestPasswordReset(body);
//     res.status(statusCode).send(response);
//   } catch (err) {
//     console.log(
//       `Error password reset requesting for user: ${req.body.email}: `,
//       err
//     );
//     next(err);
//   }
// };
