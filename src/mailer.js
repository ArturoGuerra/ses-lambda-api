const AWS = require('aws-sdk');

AWS.config.update({ region: process.env.REGION });

const SES = new AWS.SES();

exports.sendTextEmail = async (subject, message, recipients, source) => {
  try {
    const sendPromise = await SES.sendEmail(
      {
        Destination: {
          ToAddresses: recipients
        },
        Message: {
          Body: {
            Text: {
              Charset: 'UTF-8',
              Data: message
            }
          },
          Subject: {
            Charset: 'UTF-8',
            Data: subject
          }
        },
        Source: source
      }
    ).promise()
    return sendPromise
  } catch (e) {
    return e
  }
}
