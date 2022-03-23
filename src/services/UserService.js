'use strict';

import { badRequest, badImplementationRequest } from '../response-codes';
import {
  getUsers,
  saveUserRefToDB,
  getUserById,
  updateUser,
  deleteUserById
} from '../mongodb';

exports.getUsers = async query => {
  try {
    const users = await getUsers(query);
    if (users) {
      return [
        200,
        {
          message: 'Fetcing of users action was successful.',
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
  try {
    const user = await saveUserRefToDB(payload);
    if (user) {
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

exports.updateUser = async (userId, payload) => {
  try {
    console.log(userId, payload);
    const updatedUser = await updateUser(userId, payload);
    console.log(updateUser);
    if (updatedUser) {
      return [
        200,
        { message: 'User was successfully updated.', user: updatedUser }
      ];
    }
    return badRequest(`No users found to update.`);
  } catch (err) {
    console.log('Error updating views on user: ', err);
    return badImplementationRequest('Error updating user.');
  }
};

exports.deleteUser = async userId => {
  try {
    const user = await getUserById(userId);
    if (user) {
      const deletedUser = await deleteUserById(userId);
      if (deletedUser) {
        return [204];
      }
    }
    return badRequest(`No user found with id provided.`);
  } catch (err) {
    console.log('Error deleting user by id: ', err);
    return badImplementationRequest('Error deleting user by id.');
  }
};
