'use strict';

import models from '../models';
import { badImplementationRequest, badRequest } from '../codes';

const { User } = models;

const queryOps = { __v: 0, _id: 0, createdAt: 0, updatedAt: 0 };

exports.validateLogin = async (email, password) => {
  try {
    const user = await User.findOne({ email }, queryOps);
    if (user) {
      const validPassword = user.comparePassword(password);
      if (validPassword) {
        const { firstName, lastName, email, role } = user;
        return {
          statusCode: 200,
          message: 'Successful login',
          user: {
            email,
            role,
            firstName,
            lastName
          }
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
