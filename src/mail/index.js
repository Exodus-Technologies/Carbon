'use strict';

import config from '../config';
import { sendSESNotification } from '../aws';

const { CMS } = config;

export const sendMail = async (toEmail, subject, content) => {
  try {
    const notification = sendSESNotification(toEmail, content, subject);
    if (notification) return notification;
  } catch {
    return undefined;
  }
};

export const generateHtmlRequest = (user, otpCode) => {
  const { fullName, email, isAdmin } = user;
  let html = `<html>
      <head>
            <style>
            </style>
        </head>
        <body>
            <p>Hi ${fullName},</p>
            <p>You requested to reset your password.</p>
            <p> Please, click the link below to reset your password.</p>
            <a href="${CMS}/verifyOTP?otpCode=${otpCode}&email=${email}">Verify OTP</a>
        </body>
    </html>`;
  if (!isAdmin) {
    html = `<html>
      <head>
            <style>
            </style>
        </head>
        <body>
            <p>Hi ${fullName}</p>
            <p>You requested to reset your password.</p>
            <p> Please use OTP code: ${otpCode} to reset your password.</p>
        </body>
    </html>`;
  }
  return html;
};

export const generateHtmlReset = user => {
  const { fullName, isAdmin } = user;
  let html = `<html>
      <head>
            <style>
            </style>
        </head>
        <body>
            <p>Hi ${fullName},</p>
            <p>You request to reset your password was successful.</p>
            <p> Please, click the link below to log into CMS.</p>
            <a href="${CMS}/">Login</a>
        </body>
    </html>`;
  if (!isAdmin) {
    html = `<html>
      <head>
            <style>
            </style>
        </head>
        <body>
            <p>Hi ${fullName}</p>
            <p>You request to reset your password was successful.</p>
            <p> Please login into mobile application with your new password.</p>
        </body>
    </html>`;
  }
  return html;
};
