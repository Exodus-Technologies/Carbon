'use strict';

import models from '../models';
import { badRequest, badImplementationRequest } from '../response-codes';

const { User } = models;

const queryOps = { __v: 0, _id: 0, password: 0 };

exports.getUsers = async query => {
  try {
    const users = await User.find(query, queryOps);
    if (users) {
      return [
        200,
        {
          statusCode: 200,
          items: users
        }
      ];
    } else {
      return badRequest(`No users found with selected query params.`);
    }
  } catch (err) {
    console.log('Error getting all users: ', err);
    return badImplementationRequest('Error getting users.');
  }
};

exports.createUser = async payload => {
  const { email } = payload;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      const user = new User(payload);
      await user.save();
      return [
        201,
        {
          message: 'User created with success.'
        }
      ];
    } else {
      return badRequest('User already exists.');
    }
  } catch (err) {
    console.log(`Error creating user: `, err);
    return badImplementationRequest('Error creating user.');
  }
};
