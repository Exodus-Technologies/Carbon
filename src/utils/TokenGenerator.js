import { customAlphabet } from 'nanoid';
import config from '../config';

export const generateToken = (length = 6) => {
  const nanoid = customAlphabet(
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
    length
  );
  return nanoid();
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
