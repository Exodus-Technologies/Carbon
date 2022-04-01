'use strict';

import config from '../config';
import models from '../models';

const { dbUser, dbPass, clusterName, dbName } = config.sources.database;

const queryOps = { __v: 0, _id: 0 };

export const generateDBUri = () => {
  return `mongodb+srv://${dbUser}:${dbPass}@${clusterName}.ybdno.mongodb.net/${dbName}?retryWrites=true&w=majority`;
};

export const getUsers = async query => {
  try {
    const { User } = models;
    const page = parseInt(query.page);
    const limit = parseInt(query.limit);
    const skipIndex = (page - 1) * limit;
    return await User.find({}, queryOps)
      .sort({ _id: 1 })
      .limit(limit)
      .skip(skipIndex)
      .exec();
  } catch (err) {
    console.log('Error getting user data to db: ', err);
  }
};

export const getUserById = async userId => {
  const { User } = models;
  const user = await User.findOne({ userId });
  return user;
};

export const saveUserRefToDB = async payload => {
  try {
    const { User } = models;
    const { email } = payload;
    let user = await User.findOne({ email });
    if (!user) {
      const { User } = models;
      const user = new User(payload);
      const createdUser = await user.save();
      return createdUser;
    }
  } catch (err) {
    console.log('Error saving user data to db: ', err);
  }
};

export const updateUser = async (userId, payload) => {
  try {
    const { User } = models;
    const filter = { userId };
    const options = { new: true };
    const update = { ...payload };
    const updatedUser = await User.findOneAndUpdate(filter, update, options);
    return updatedUser;
  } catch (err) {
    console.log('Error updating user data to db: ', err);
  }
};

export const deleteUserById = async userId => {
  const { User } = models;
  const deletedUser = await User.deleteOne({ userId });
  return deletedUser;
};
