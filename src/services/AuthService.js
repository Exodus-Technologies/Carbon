'use strict';

import models from '../models';
import { badImplementationRequest, badRequest } from '../codes';

const { User } = models;

exports.validateLogin = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (user) {
      const validPassword = user.comparePassword(password);
      if (validPassword) {
        return {
          statusCode: 200,
          message: 'Successful login'
        };
      }
      return badRequest('Incorrect credentials used for login.');
    }
    return badRequest('User does not exist.');
  } catch (err) {
    console.log(`Error logging with credentials: `, err);
    return badImplementationRequest('Error logging with credentials.');
  }
};
