'use strict';

import models from '../models';
import { badImplementationRequest, badRequest } from '../response-codes';

const { User } = models;

const queryOps = { __v: 0, _id: 0, createdAt: 0, updatedAt: 0 };

exports.validateLogin = async (email, password) => {
  try {
    const user = await User.findOne({ email }, queryOps);
    if (user) {
      const validPassword = user.comparePassword(password);
      if (validPassword) {
        const {
          email,
          fullName,
          gender,
          city,
          state,
          zipCode,
          isAdmin,
          userId
        } = user;
        return [
          200,
          {
            message: 'Successful login',
            user: {
              email,
              fullName,
              gender,
              city,
              state,
              zipCode,
              userId,
              isAdmin
            }
          }
        ];
      }
      return badRequest('Incorrect credentials used for login.');
    }
    return badRequest('User does not exist.');
  } catch (err) {
    console.log(`Error logging with credentials: `, err);
    return badImplementationRequest('Error logging with credentials.');
  }
};

exports.changePassword = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.password = password;
      const updatedUser = await user.save();
      if (updatedUser) {
        return [
          200,
          {
            message: 'Successful password update.'
          }
        ];
      }
      return badRequest('Error updating password.');
    }
    return badRequest('User does not exist.');
  } catch (err) {
    console.log(`Error updating password: `, err);
    return badImplementationRequest('Error updating password.');
  }
};
