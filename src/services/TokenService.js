'use strict';

import jwt from 'jsonwebtoken';
import config from '../config';

const { apiSecret } = config.sources.vonage;

exports.verifyToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, apiSecret);
    if (decodedToken) {
      return decodedToken;
    }
    return false;
  } catch (err) {
    console.log(`Error verifying token:${token} `, err);
  }
};

exports.generateToken = (payload) => {
  try {
    const token = jwt.sign(...payload, apiSecret);
    return token;
  } catch (err) {
    console.log(`Error creating token: `, err);
  }
};
