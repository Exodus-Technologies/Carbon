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

exports.requestPasswordReset = async (req, res, next) => {
  try {
    const { email } = req.body;
    const { isMobile } = req.useragent;
    const [statusCode, response] = await AuthService.requestPasswordReset(
      email,
      isMobile
    );
    res.status(statusCode).send(response);
  } catch (err) {
    console.log(`Error password reset requesting for user: ${email}: `, err);
    next(err);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { email, token, password } = req.body;
    const [statusCode, response] = await AuthService.resetPassword(
      email,
      token,
      password
    );
    res.status(statusCode).send(response);
  } catch (err) {
    console.log(`Error with changing password: `, err);
    next(err);
  }
};
