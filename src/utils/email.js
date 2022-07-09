'use strict';

import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import config from '../config';

const { aws } = config.sources;
const { notifications } = config.sources;
const { accessKeyId, secretAccessKey, region } = aws;
const { noReplyEmail } = notifications;

const sesClient = new SESClient({
  credentials: {
    accessKeyId,
    secretAccessKey,
    region
  }
});

export const sendMail = async (toEmail, subject, content) => {
  const params = {
    Destination: {
      /* required */
      CcAddresses: [
        /* more items */
      ],
      ToAddresses: [toEmail]
    },
    Message: {
      /* required */
      Body: {
        /* required */
        Html: {
          Charset: 'UTF-8',
          Data: content
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: subject
      }
    },
    Source: noReplyEmail, // SENDER_ADDRESS
    ReplyToAddresses: [
      /* more items */
    ]
  };

  try {
    const data = await sesClient.send(new SendEmailCommand(params));
    console.log('Success', data);
    return data; // For unit tests.
  } catch (err) {
    console.log('Error', err);
  }
};
