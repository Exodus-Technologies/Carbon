'use strict';

import bcrypt from 'bcrypt';
import crypto from 'crypto';
import config from '../config';
import { badImplementationRequest, badRequest } from '../response-codes';
import { generateAuthJwtToken } from '../utils/token';
import { sendMail } from '../utils/email';
import {
  getTokenByUserId,
  getUserByEmail,
  saveTokenRefToDB,
  deleteToken
} from '../mongodb';

const { HASH_SALT } = config;

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

exports.resetPassword = async (userId, token, password) => {
  try {
    const passwordResetToken = await getTokenByUserId(userId);
    if (!passwordResetToken) {
      return badRequest('Invalid or expired password reset token');
    }

    const isValid = await bcrypt.compare(token, passwordResetToken.token);
    if (!isValid) {
      return badRequest('Invalid or expired password reset token');
    }

    const [error, user] = await getUserByEmail(email);

    if (!user) {
      return badRequest(error.message);
    }
    if (user) {
      user.password = password;
      const updatedUser = await user.save();
      if (updatedUser) {
        //sendEmail
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

exports.requestPasswordReset = async email => {
  try {
    const [error, user] = await getUserByEmail(email);
    if (!user) {
      return badRequest(error.message);
    }

    const { userId } = user;

    const token = await getTokenByUserId(userId);
    if (token) {
      await deleteToken(userId);
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const hash = await bcrypt.hash(resetToken, HASH_SALT);

    await saveTokenRefToDB({
      userId,
      token: hash,
      createdAt: Date.now()
    });

    const html = `<html>
      <head>
            <style>
            </style>
        </head>
        <body>
            <p>Hi ${user.fullName},</p>
            <p>You requested to reset your password.</p>
            <p> Please, click the link below to reset your password</p>
            <a href="http://sheenmagazinecms.us-east-1.elasticbeanstalk.com/resetPassword?token=${resetToken}&id=${userId}">Reset Password</a>
        </body>
    </html>`;

    await sendMail(email, 'Password Reset Request', html);

    return [
      200,
      {
        message: `Password reset success, an email with instructions has been sent to your email.`
      }
    ];
  } catch (err) {
    console.log(`Error password reset requesting: `, err);
    return badImplementationRequest('Error password reset requesting.');
  }
};
