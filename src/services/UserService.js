'use strict';

// import { google } from 'googleapis';

// const fetch = (...args) =>
//   import('node-fetch').then(({ default: fetch }) => fetch(...args));

import { badRequest, badImplementationRequest } from '../response-codes';
import {
  getUsers,
  saveUserRefToDB,
  getUserById,
  updateUser,
  deleteUserById
} from '../mongodb';
// import config from '../config';
// import { generateAppleJwtToken } from '../utils/token';

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
    const [error, user] = await getUserById(userId);
    if (user) {
      const { email, fullName, gender, city, state, zipCode, isAdmin, userId } =
        user;
      return [
        200,
        {
          message: 'User was successfully fetched.',
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

// exports.getSubscriptionProducts = async platform => {
//   let response = [];
//   if (platform === 'android') {
//     response = await getAvailableAndroidSubscriptions();
//   } else if (platform === 'ios') {
//     response = await getAvailableAppleSubscriptions();
//   }
//   return [200, response];
// };

// async function getAvailableAppleSubscriptions() {
//   const URL_APPLE_CONNECT_API = 'https://api.appstoreconnect.apple.com/v1';
//   const appleJwtToken = generateAppleJwtToken();
//   if (!appleJwtToken) {
//     return [];
//   }

//   const config = {
//     headers: {
//       Authorization: `Bearer ${appleJwtToken}`
//     }
//   };

//   const urlApps = `${URL_APPLE_CONNECT_API}/apps?filter[name]=Sheen Magazine`;
//   const response = await fetch(urlApps, config);
//   const data = await response.json();

//   if (data.length) {
//     const { id: appId } = data[0];

//     const urlInAppPurchaseProducts = `${URL_APPLE_CONNECT_API}/apps/${appId}/inAppPurchases?filter[inAppPurchaseType]=NON_CONSUMABLE`;

//     const response = await fetch(urlInAppPurchaseProducts, config);
//     const data = await response.json();

//     return data.map(({ id, attributes }) => ({
//       id,
//       type: attributes.productId
//     }));
//   }

//   return [];
// }

// async function getAvailableAndroidSubscriptions() {
//   const { packageName, clientEmail, privateKey } = config.subscription.apple;

//   const client = new google.auth.JWT(clientEmail, undefined, privateKey, [
//     'https://www.googleapis.com/auth/androidpublisher'
//   ]);

//   const androidApi = google.androidpublisher({ version: 'v3', auth: client });

//   await client.authorize();

//   const response = await androidApi.inappproducts.list({ packageName });

//   const result = response.data.inappproduct.map(({ sku }) => ({
//     id: sku || '',
//     type: sku || undefined
//   }));
//   return result || [];
// }
