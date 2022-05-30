'use strict';

import models from '../models';
import { badImplementationRequest, badRequest } from '../response-codes';
import { updateUserResetPassword } from '../mongodb';
import config from '../config';
import EmailHelper from '../utils/EmailHelper';

const { User } = models;

const queryOps = { __v: 0, _id: 0, createdAt: 0, updatedAt: 0 };

exports.validateLogin = async (email, password) => {
  try {
    const user = await User.findOne({ email }, queryOps);
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
            }
          }
        ];
      }
      return badRequest('Incorrect credentials used for login.');
    }
    return badRequest('User does not exist.');
  } catch (err) {
    console.log(`Error logging with credentials: `, err);
    return badImplementationRequest('Error logging with credentials.');
  }
};

exports.changePassword = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.password = password;
      const updatedUser = await user.save();
      if (updatedUser) {
        return [
          200,
          {
            message: 'Successful password update.'
          }
        ];
      }
      return badRequest('Error updating password.');
    }
    return badRequest('User does not exist.');
  } catch (err) {
    console.log(`Error updating password: `, err);
    return badImplementationRequest('Error updating password.');
  }
};

exports.requestPasswordReset = async payload => {
  try {
    const [error, user] = await updateUserResetPassword(payload);

    const html = `
    <div>
      Dear ${user.fullName},<br><br>
      Your reset password code is: <b>${user.requestResetPassword.code}</b>. The code is only valid for ${config.requestResetPasswordCodeExpireInMinutes} minutes.
    </div>
  `;

    await EmailHelper.sendMail(
      config.noreplyEmail,
      user.email,
      'Carbon password reset',
      html
    );

    if (user) {
      return [
        200,
        {
          message: `Password reset success, an email has been sent to your email with the code to reset your password. The code is only valid for ${config.requestResetPasswordCodeExpireInMinutes} minutes.`
        }
      ];
    } else {
      return badRequest(error.message);
    }
  } catch (err) {
    console.log(`Error password reset requesting: `, err);
    return badImplementationRequest('Error password reset requesting.');
  }
};
