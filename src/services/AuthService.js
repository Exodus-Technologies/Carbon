'use strict';

import bcrypt from 'bcrypt';
import crypto from 'crypto';
import config from '../config';
import { badImplementationRequest, badRequest } from '../response-codes';
import { generateAuthJwtToken, generateToken } from '../utils/token';
import { sendMail } from '../mail';
import {
  getTokenByUserId,
  getUserByEmail,
  saveTokenRefToDB,
  deleteToken,
  saveTransaction
} from '../mongodb';
import { oneHourAgo } from '../utils/time';

const { HASH_SALT, CMS } = config;

exports.validateLogin = async (email, password) => {
  try {
    const [error, user] = await getUserByEmail(email);
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
    return badRequest(error.message);
  } catch (err) {
    console.log(`Error logging with credentials: `, err);
    return badImplementationRequest('Error logging with credentials.');
  }
};

exports.requestPasswordReset = async email => {
  try {
    const [error, user] = await getUserByEmail(email);
    const transactionId = generateToken();
    if (!user) {
      const transaction = {
        transactionId,
        response: 'ERROR',
        email,
        reason: 'Email supplied is not registered to any user.'
      };
      saveTransaction(transaction);
      return badRequest(error.message);
    }

    const { userId } = user;

    const token = await getTokenByUserId(userId);

    if (token) {
      await deleteToken(userId);
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const hash = await bcrypt.hash(resetToken, HASH_SALT);

    await new Token({
      userId: user._id,
      token: hash,
      createdAt: Date.now()
    }).save();

    const html = `<html>
      <head>
            <style>
            </style>
        </head>
        <body>
            <p>Hi ${user.fullName},</p>
            <p>You requested to reset your password.</p>
            <p> Please, click the link below to reset your password</p>
            <a href="${CMS}/resetPassword?email=${email}&token=${resetToken}">Reset Password</a>
        </body>
    </html>`;

    await sendMail(email, 'Password Reset Request', html);
    const transaction = {
      transactionId,
      userId,
      email,
      response: 'SUCCESS',
      reason: 'Email was sent to user successfully.',
      content: html
    };
    saveTransaction(transaction);
    return [
      200,
      {
        message: `Password reset success, an email with instructions has been sent to your email.`
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

exports.resetPassword = async (token, email, password) => {
  try {
    const [error, user] = await getUserByEmail(email);
    if (!user) {
      return badRequest(error.message);
    }
    const passwordResetToken = await getTokenByUserId(user.userId);
    if (!passwordResetToken) {
      return badRequest('Invalid or expired password reset token');
    }

    const isValid = await bcrypt.compare(token, passwordResetToken.token);

    if (!isValid) {
      return badRequest('Invalid or expired password reset token');
    }

    if (user) {
      user.password = password;
      const updatedUser = await user.save();
      if (updatedUser) {
        const html = `<html>
      <head>
            <style>
            </style>
        </head>
        <body>
            <p>Hi ${updatedUser.fullName},</p>
            <p>You request to reset your password was successful.</p>
            <p> Please, click the link below to login with your new password</p>
            <a href="${CMS}/login">Login</a>
        </body>
    </html>`;

        await sendMail(email, 'Password Reset Successfully', html);
        await deleteToken(user.userId);
        return [
          200,
          {
            message: 'Password reset successful.'
          }
        ];
      }
    }
    return badRequest('Error updating password.');
  } catch (err) {
    console.log(`Error updating password: `, err);
    return badImplementationRequest('Error updating password.');
  }
};
