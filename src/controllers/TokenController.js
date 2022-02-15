'use strict';

import { TokenService } from '../services';

exports.verifyToken = async (req, res, next) => {
  try {
    const token = req.headers['authorization'];
    const response = await TokenService.verifyToken(token);
    res.send(response);
  } catch (err) {
    console.log(`Error verifying token: `, err);
    next(err);
  }
};
