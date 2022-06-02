'use strict';

import { badRequest, badImplementationRequest } from '../response-codes';
import {
  getUsers,
  saveUserRefToDB,
  getUserById,
  updateUser,
  deleteUserById
} from '../mongodb';
import { async } from 'regenerator-runtime';

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

exports.createUser = async payload => {
  try {
    const [error, user] = await saveUserRefToDB(payload);
    if (user) {
      return [
        201,
        {
          message: 'User created with success.'
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

exports.getSubscriptionProducts = async platform => {
  '-----BEGIN PRIVATE KEY-----\nMIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQg2W2Cw9vEeXogiVXX\nyPWyXfBwWtHJh5Dk7yfatNJ87WagCgYIKoZIzj0DAQehRANCAAQZUe0trZqDYx0/\nG2qv/Xx3SSumWvpDBVSMz1i79AYWiykswhz541NdYv9OTtChzKyO5OC1TYtl+xyN\nqWL87UCr\n-----END PRIVATE KEY-----';
};
