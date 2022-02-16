'use strict';

import { AuthService } from '../services';

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const response = await AuthService.validateLogin(email, password);
    res.send(response);
  } catch (err) {
    console.log(`Error with login: `, err);
    next(err);
  }
};
