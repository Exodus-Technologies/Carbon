'use strict';

import config from '../config';
import models from '../models';
import { generateToken } from '../utils/token';

const { dbUser, dbPass, clusterName, dbName } = config.sources.database;

const queryOps = {
  __v: 0,
  _id: 0,
  password: 0,
  createdAt: 0,
  updatedAt: 0
};

export const generateDBUri = () => {
  return `mongodb+srv://${dbUser}:${dbPass}@${clusterName}.ybdno.mongodb.net/${dbName}?retryWrites=true&w=majority`;
};

export const getUsers = async query => {
  try {
    const { User } = models;
    const page = parseInt(query.page);
    const limit = parseInt(query.limit);
    const skipIndex = (page - 1) * limit;

    const filter = [];
    for (const [key, value] of Object.entries(query)) {
      if (
        key != 'page' &&
        key != 'limit' &&
        key != 'sort' &&
        key != 'isAdmin' &&
        key != 'userId'
      ) {
        filter.push({ [key]: { $regex: value, $options: 'i' } });
      }
      if (key == 'isAdmin' || key == 'userId') {
        filter.push({ [key]: value });
      }
    }

    let objectFilter = {};
    if (filter.length > 0) {
      objectFilter = {
        $and: filter
      };
    }

    let sortString = '-id';

    if (query.sort) {
      sortString = query.sort;
    }

    const users = await User.find(objectFilter, queryOps)
      .limit(limit)
      .skip(skipIndex)
      .sort(sortString)
      .lean()
      .exec();
    const total = await User.find(objectFilter, queryOps).count();
    const result = users.map(user => ({
      ...user,
      total,
      pages: Math.ceil(total / limit)
    }));
    return [null, result];
  } catch (err) {
    console.log('Error getting user data from db: ', err);
  }
};

export const getUserById = async userId => {
  try {
    const { User } = models;
    const user = await User.findOne({ userId });
    return [null, user];
  } catch (err) {
    console.log('Error getting user data to db: ', err);
  }
};

export const saveUserRefToDB = async payload => {
  try {
    const { User } = models;
    const { email } = payload;
    const user = await User.findOne({ email });
    if (!user) {
      const { User } = models;
      const user = new User(payload);
      const createdUser = await user.save();
      return [null, createdUser];
    }
    return [Error('User with email already exists.')];
  } catch (err) {
    console.log('Error saving user data to db: ', err);
  }
};

export const updateUser = async (userId, payload) => {
  try {
    const { User } = models;
    const { email } = payload;
    //TODO: Find a way to update emails
    if (email) {
      return [Error('Unable to change email.')];
    }
    const filter = { userId };
    const options = { new: true };
    const update = { ...payload };
    const updatedUser = await User.findOneAndUpdate(filter, update, options);
    if (updatedUser) {
      const { email, fullName, gender, city, state, zipCode, isAdmin } =
        updatedUser;
      const user = {
        email,
        fullName,
        gender,
        city,
        state,
        zipCode,
        isAdmin
      };
      return [null, user];
    } else {
      return [Error('Unable to update user details.')];
    }
  } catch (err) {
    console.log('Error updating user data to db: ', err);
  }
};

export const deleteUserById = async userId => {
  try {
    const { User } = models;
    const deletedUser = await User.deleteOne({ userId });
    return [null, deletedUser];
  } catch (err) {
    console.log('Error deleting user data from db: ', err);
  }
};

// export const updateUserResetPassword = async ({ email }) => {
//   try {
//     const { User } = models;
//     const user = await User.findOne({ email });
//     if (!user) throw new Error('User not found!');
//     user.requestResetPassword = {
//       code: generateToken(),
//       expiredAt: new Date(
//         new Date().getTime() +
//           Number(config.requestResetPasswordCodeExpireInMinutes) * 60 * 1000
//       )
//     };
//     await user.save();

//     return [null, user];
//   } catch (err) {
//     console.log('Error updating user data from db: ', err);
//   }
// };
