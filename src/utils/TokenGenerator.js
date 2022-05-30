import { customAlphabet } from 'nanoid';

export const generateToken = (length = 6) => {
  const nanoid = customAlphabet(
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
    length
  );
  return nanoid();
};
