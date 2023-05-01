'use strict';

import sgMail from '@sendgrid/mail';
import config from '../config';

const { sendGridAPIKey } = config.sources.twilio;
const { noReplyEmail } = config.sources.notifications;

sgMail.setApiKey(sendGridAPIKey);

export const sendEmailNotification = (toEmail, content, subject) => {
  return new Promise(async (resolve, reject) => {
    const params = {
      to: toEmail,
      from: noReplyEmail, // Use the email address or domain you verified above
      subject,
      html: content
    };

    try {
      const emailReceipt = await sgMail.send(params);
      resolve(emailReceipt);
    } catch (err) {
      console.log(`Error send email to user: ${toEmail}`, err);
      reject(err);
    }
  });
};
