'use strict';

import { TokenService } from '../services';

exports.verifyToken = async (req, res, next) => {
  try {
    const token = req.headers['authorization'];
    const response = TokenService.verifyToken(token);
    res.send(response);
  } catch (err) {
    console.log(`Error verifying token: `, err);
    next(err);
  }
};
