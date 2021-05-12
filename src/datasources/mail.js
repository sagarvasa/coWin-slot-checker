const HTTPRequest = require('../utilities/http-request');
const httpRequest = new HTTPRequest();

async function sendPepipostEmail(mailConfig, mailProviderConfig) {
  const { url, key } = mailProviderConfig;
  const { from, to, subject, cc, content, attachments } = mailConfig;

  const { html } = content;

  const mailBody = {
    from: { email: from },
    subject: subject,
    content: [{ type: 'html', value: html }],
    personalizations: [{ to: [{ email: to }] }],
  };
  if (cc) {
    mailBody.personalizations = [
      {
        to: [{ email: to }],
        cc: [{ email: cc }],
      },
    ];
  }

  if (attachments && Array.isArray(attachments) && attachments.length > 0) {
    mailBody.attachments = attachments; //[{name: "attachment.pdf", content: "base64 encoded file content"}]
  }

  const options = {
    url,
    headers: {
      'content-type': 'application/json',
      api_key: key,
    },
    data: JSON.stringify(mailBody),
  };

  return httpRequest.post(options);
}

module.exports = { sendPepipostEmail };
