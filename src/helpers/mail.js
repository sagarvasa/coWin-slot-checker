const { sendPepipostEmail } = require('../datasources/mail')
const logger = require('../utilities/winston')(__filename);
const config = require('../config/config');

const mailConfig = config.mailConfig;

const providerConfig = {
    url: mailConfig.pepipost.url,
    key: mailConfig.pepipost.key,
  };

exports.send_mail = ({ to, subject, content }) => {
    
    const mailConfiguration = {
        from: mailConfig.pepipost.from,
        to,
        subject,
        content: {
          html: content,
        },
      };
      sendPepipostEmail(mailConfiguration, providerConfig)
        .then(data => {
          logger.info(`[cowin-slot-checker][helpers][email][send_mail][data] ${JSON.stringify(data)}`);
        })
        .catch(err => {
          logger.error('[cowin-slot-checker][helpers][email][send_mail][error] ' + err.message);
        });
}
