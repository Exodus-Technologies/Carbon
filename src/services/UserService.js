'use strict';

import { User } from '../models';

const queryOps = { __v: 0, _id: 0 };

exports.getUsers = async (query) => {
  try {
    const users = await User.find(query, queryOps);
    return users;
  } catch (err) {
    console.log('Error getting all users: ', err);
  }
};

exports.getUserById = async (email) => {
  //   try {
  //     const user = await User.findById(userId, queryOps);
  //     return user;
  //   } catch (err) {
  //     console.log(`Error getting user: ${userId}: `, err);
  //   }
};

exports.createUser = async (payload) => {
  try {
    const user = new User(payload);
    const createdUser = await user.save();
    return createdUser;
  } catch (err) {
    console.log(`Error creating user: `, err);
  }
};

exports.updateUser = async (payload) => {
  //   try {
  //     const user = await User.findByIdAndUpdate(userId, payload, {
  //       new: true
  //     });
  //     return user;
  //   } catch (err) {
  //     console.log(`Error updating user: ${userId}: `, err);
  //   }
};
