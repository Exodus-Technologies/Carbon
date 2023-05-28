'use strict';

import { badRequest, badImplementationRequest } from '../response-codes';
import {
  getUsers,
  saveUserRefToDB,
  getUserById,
  updateUser,
  deleteUserById
} from '../mongodb';
import config from '../config';
import SubscriptionService from './SubscriptionService';

const { purgeSubscriptions } = config;

exports.getUsers = async query => {
  try {
    const users = await getUsers(query);
    if (users) {
      return [
        200,
        {
          message: 'Fetcing of users action was successful.',
          users
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

exports.getUser = async userId => {
  try {
    const user = await getUserById(userId);
    if (user) {
      return [
        200,
        {
          message: 'User was successfully fetched.',
          user
        }
      ];
    }
    return badRequest(error.message);
  } catch (err) {
    console.log('Error getting user: ', err);
    return badImplementationRequest('Error getting user.');
  }
};

exports.createUser = async payload => {
  try {
    const [error, user] = await saveUserRefToDB(payload);
    if (user) {
      return [
        201,
        {
          message: 'User created with success.',
          user
        }
      ];
    } else {
      return badRequest(error.message);
    }
  } catch (err) {
    console.log(`Error creating user: `, err);
    return badImplementationRequest('Error creating user.');
  }
};

exports.updateUser = async (userId, payload) => {
  try {
    const [error, updatedUser] = await updateUser(userId, payload);
    if (updatedUser) {
      return [
        200,
        { message: 'User was successfully updated.', user: updatedUser }
      ];
    }
    return badRequest(error.message);
  } catch (err) {
    console.log('Error updating views on user: ', err);
    return badImplementationRequest('Error updating user.');
  }
};

exports.deleteUser = async userId => {
  try {
    const user = await getUserById(userId);
    if (user) {
      if (purgeSubscriptions) {
        SubscriptionService.deleteSubscriptions(userId);
      }
      const [error, deletedUser] = await deleteUserById(userId);
      if (deletedUser) {
        return [204];
      }
      return badRequest(error.message);
    }
    return badRequest('User does not exist.');
  } catch (err) {
    console.log('Error deleting user by id: ', err);
    return badImplementationRequest('Error deleting user by id.');
  }
};
