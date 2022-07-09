'use strict';

import { sendSESNotification } from '../aws';

export const sendMail = async (toEmail, subject, content) => {
  try {
    const notification = sendSESNotification(toEmail, content, subject);
    if (notification) return notification;
  } catch {
    return undefined;
  }
};
