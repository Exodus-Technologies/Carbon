'use strict';

import { customAlphabet } from 'nanoid';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import config from '../config';

const { sign } = jwt;
const { jwtSecret } = config;

export const generateToken = (length = 6) => {
  const nanoid = customAlphabet(
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
    length
  );
  return nanoid();
};

export const generateAuthJwtToken = user => {
  const { isAdmin, email, userId } = user;
  const expirationTime = moment().add(15, 'minutes').valueOf() / 1000;
  const payload = { isAdmin, email, userId };
  try {
    const token = sign(
      {
        exp: Math.ceil(expirationTime),
        data: payload
      },
      jwtSecret
    );
    return token;
  } catch {
    return undefined;
  }
};

export const generateAppleJwtToken = () => {
  const { issuer, keyId, privateKey } = config.subscription.apple;
  const expirationTime = moment().add(10, 'minutes').valueOf() / 1000;

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
};
