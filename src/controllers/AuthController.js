'use strict';

import { AuthService } from '../services';

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const response = await AuthService.validateLogin(email, password);
    res.status(response.statusCode).send(response);
  } catch (err) {
    console.log(`Error with login: `, err);
    next(err);
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const response = await AuthService.changePassword(email, password);
    res.status(response.statusCode).send(response);
  } catch (err) {
    console.log(`Error with changing password: `, err);
    next(err);
  }
};
