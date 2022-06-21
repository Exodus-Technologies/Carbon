'use strict';

import sgMail from '@sendgrid/mail';
import config from '../config';

const { sendGridKey } = config.twilio;

sgMail.setApiKey(sendGridKey);

const sendMail = (fromEmail, toEmails, subject, content) => {
  const msg = {
    to: toEmails,
    from: fromEmail,
    subject,
    html: content
  };

  return sgMail.send(msg);
};

export default { sendMail };
