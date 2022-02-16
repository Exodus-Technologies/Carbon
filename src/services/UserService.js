'use strict';

import models from '../models';
import { badRequest } from '../codes';

const { User } = models;

exports.createUser = async payload => {
  const { email } = payload;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      const user = new User(payload);
      await user.save();
      return {
        statusCode: 200,
        message: 'User created with success'
      };
    } else {
      return badRequest('User already exists.');
    }
  } catch (err) {
    console.log(`Error creating user: `, err);
    return badImplementationRequest('Error creating user.');
  }
};

exports.updateUser = async payload => {
  //   try {
  //     const user = await User.findByIdAndUpdate(userId, payload, {
  //       new: true
  //     });
  //     return user;
  //   } catch (err) {
  //     console.log(`Error updating user: ${userId}: `, err);
  //   }
};
