import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import config from '../config';

const { aws, notifications } = config.sources;
const { accessKeyId, secretAccessKey, region } = aws;
const { noReplyEmail } = notifications;

const sesClient = new SESClient({
  credentials: {
    accessKeyId,
    secretAccessKey,
    region
  }
});

export const sendSESNotification = (toEmail, content, subject) => {
  return new Promise(async (resolve, reject) => {
    const params = {
      Destination: {
        CcAddresses: [],
        ToAddresses: [toEmail]
      },
      Message: {
        Body: {
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
      ReplyToAddresses: []
    };

    try {
      await sesClient.send(new SendEmailCommand(params));
      resolve();
    } catch (err) {
      const { requestId, cfId, extendedRequestId } = err.$metadata;
      console.log({
        message: 'sendSESNotification',
        requestId,
        cfId,
        extendedRequestId
      });
      console.log(`Error send email to user: ${toEmail}`, err);
      reject(err);
    }
  });
};
