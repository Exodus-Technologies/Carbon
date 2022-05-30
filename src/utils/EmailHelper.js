import sgMail from '@sendgrid/mail';
import config from '../config';

sgMail.setApiKey(config.sendgridKey);

const sendMail = (fromEmail, toEmails, subject, content) => {
  const msg = {
    to: toEmails,
    from: fromEmail,
    subject,
    html: content
  };

  return new Promise((res, rej) => {
    sgMail
      .send(msg)
      .then(() => {
        res();
      })
      .catch(error => {
        rej(error);
      });
  });
};

export default { sendMail };
