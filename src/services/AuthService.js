'use strict';

import { badImplementationRequest, badRequest } from '../response-codes';
import {
  generateAuthJwtToken,
  generateTransactionId,
  generateOTPCode,
  verifyJwtToken
} from '../utils/token';
import { sendMail, generateHtmlRequest, generateHtmlReset } from '../mail';
import {
  getCodeByUserId,
  getUserByEmail,
  saveCodeRefToDB,
  deleteCode,
  saveTransaction,
  verifyOptCode
} from '../mongodb';

exports.validateLogin = async (email, password) => {
  try {
    const user = await getUserByEmail(email);
    if (user) {
      const validPassword = user.comparePassword(password);
      if (validPassword) {
        const {
          email,
          fullName,
          gender,
          city,
          state,
          zipCode,
          isAdmin,
          userId
        } = user;
        const token = generateAuthJwtToken(user);
        return [
          200,
          {
            message: 'Successful login',
            user: {
              email,
              fullName,
              gender,
              city,
              state,
              zipCode,
              userId,
              isAdmin
            },
            token
          }
        ];
      }
      return badRequest('Incorrect credentials used for login.');
    }
    return badRequest('Unable to find user with email provided.');
  } catch (err) {
    console.log(`Error logging with credentials: `, err);
    return badImplementationRequest('Error logging with credentials.');
  }
};

exports.requestPasswordReset = async email => {
  try {
    const user = await getUserByEmail(email);
    const transactionId = generateTransactionId();
    if (!user) {
      const transaction = {
        transactionId,
        response: 'ERROR',
        email,
        reason: 'Email supplied is not registered to any user.'
      };
      saveTransaction(transaction);
      return badRequest('Unable to find user with email provided.');
    }

    const { userId } = user;

    const token = await getCodeByUserId(userId);

    if (token) {
      await deleteCode(userId);
    }

    const otpCode = generateOTPCode();

    await saveCodeRefToDB({
      userId,
      email,
      otpCode,
      createdAt: Date.now()
    });

    const html = generateHtmlRequest(user, otpCode);

    await sendMail(email, 'Password Reset Request', html);

    const transaction = {
      transactionId,
      userId,
      email,
      response: 'SUCCESS',
      reason: 'Email was sent to user successfully for password request.',
      content: html
    };
    saveTransaction(transaction);
    return [
      200,
      {
        message: `Password reset success! An email with instructions has been sent to your email.`
      }
    ];
  } catch (err) {
    console.log(`Error password reset requesting: `, err);
    const transaction = {
      transactionId,
      response: 'ERROR',
      reason: `Email was not sent to user successfully due to: ${err.message}`
    };
    saveTransaction(transaction);
    return badImplementationRequest('Error password reset requesting.');
  }
};

exports.verifyOTP = async (email, otpCode) => {
  try {
    const [error, isVerified] = await verifyOptCode(email, otpCode);
    if (isVerified) {
      const user = await getUserByEmail(email);
      const token = generateAuthJwtToken(user);
      return [200, { message: 'Code was verified successfully.', token }];
    }
    return badRequest(error.message);
  } catch (err) {
    console.log('Error verifing code: ', err);
    return badImplementationRequest('Error verifing code.');
  }
};

exports.changePassword = async (email, token, password) => {
  try {
    const transactionId = generateTransactionId();
    const user = await getUserByEmail(email);

    if (!user) {
      const transaction = {
        transactionId,
        response: 'ERROR',
        email,
        reason: 'Email supplied is not registered to any user.'
      };
      saveTransaction(transaction);
      return badRequest('No user found associated with email provided.');
    }

    const isVerified = verifyJwtToken(token);
    if (isVerified) {
      user.password = password;
      const updatedUser = await user.save();
      if (updatedUser) {
        const { userId } = updatedUser;
        const html = generateHtmlReset(user);
        await sendMail(email, 'Password Reset Successfully', html);
        const transaction = {
          transactionId,
          userId,
          email,
          response: 'SUCCESS',
          reason: 'Email was sent to user successfully for password reset.',
          content: html
        };
        saveTransaction(transaction);
        await deleteCode(updatedUser.userId);
        return [
          200,
          {
            message: 'Password reset successful.'
          }
        ];
      }
    }
    return badRequest('Token provided does not match what the system has.');
  } catch (err) {
    console.log(`Error updating password: `, err);
    const transaction = {
      transactionId,
      response: 'ERROR',
      reason: `Email was not sent to user successfully due to: ${err.message}`
    };
    saveTransaction(transaction);
    return badImplementationRequest('Error updating password.');
  }
};
