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
import moment from 'moment';
import { sign } from 'jsonwebtoken';
import { google } from 'googleapis';
import { async } from 'regenerator-runtime';
import axios from 'axios';

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
  let response;
  switch (platform) {
    case 'android':
      response = await AndroidGetAvailableSubscription();
      break;
    case 'ios':
      response = await AppleGetAvailableSubscriptions();
      break;
    default:
      response = [];
      break;
  }
  return [200, response];
};

function ReturnPromiseResult(response) {
  return new Promise((resolve, reject) => {
    resolve(response.data);
  });
}

function AppleJwtToken(callback = encoded => null) {
  const {
    subscription: {
      apple: { issuer, keyId, privateKey }
    }
  } = config;

  const expirationTime = moment().add(10, 'minute').valueOf() / 1000;
  try {
    const token = sign(
      {
        exp: Math.ceil(expirationTime)
      },
      privateKey,
      {
        issuer,
        audience: 'appstoreconnect-v1',
        algorithm: 'ES256',
        header: {
          alg: 'ES256',
          kid: keyId,
          typ: 'JWT'
        }
      }
    );
    return token;
  } catch {
    return undefined;
  }
}

async function AppleGetAvailableSubscriptions() {
  const URL_APPLE_CONNECT_API = 'https://api.appstoreconnect.apple.com/v1';
  let jwtToken = AppleJwtToken(encoded => (jwtToken = encoded));
  if (!jwtToken) {
    return [];
  }

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${jwtToken}`
    }
  };
  const urlApps = `${URL_APPLE_CONNECT_API}/apps?filter[name]=Sheen Magazine`;
  const subscriptionAppleApps = await axios
    .get(urlApps, axiosConfig)
    .then(ReturnPromiseResult);
  if (subscriptionAppleApps.data.length) {
    const appId = subscriptionAppleApps.data[0].id;

    const urlInAppPurchaseProducts = `${URL_APPLE_CONNECT_API}/apps/${appId}/inAppPurchases?filter[inAppPurchaseType]=NON_CONSUMABLE`;

    const subscriptionAppleInAppPurchaseProducts = await axios
      .get(urlInAppPurchaseProducts, axiosConfig)
      .then(ReturnPromiseResult);
    return subscriptionAppleInAppPurchaseProducts.data.map(
      ({ id, attributes }) => ({ id, type: attributes?.productId })
    );
  }
  return [];
}

async function AndroidGetAvailableSubscription() {
  const {
    subscription: {
      android: { packageName, clientEmail, privateKey }
    }
  } = config;
  let client = new google.auth.JWT(clientEmail, undefined, privateKey, [
    'https://www.googleapis.com/auth/androidpublisher'
  ]);
  const androidApi = google.androidpublisher({ version: 'v3', auth: client });
  await client.authorize();
  let response = await androidApi.inappproducts.list({ packageName });
  let result = response.data.inappproduct?.map(({ sku }) => ({
    id: sku ?? '',
    type: sku || undefined
  }));
  return result || [];
}
