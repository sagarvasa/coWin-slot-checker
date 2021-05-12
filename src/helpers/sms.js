const { sendPremiumGupshupMsg, sendEnterpriseGupshupMsg } = require('../datasources/sms')
const logger = require('../utilities/winston')(__filename);
const config = require('../config/config');
const constants = require('../utilities/constants');

const gupshupConfig = config.gupshupConfig;

exports.send_sms = ({ mobileNo, message, mask }) => {
    let countryCode = constants.COUNTRY_CODE_INDIA;
    let dialingCode = constants.IND_DIALING_CODE;
    let sms_mask = mask ? mask : gupshupConfig.mask;
    mobileNo = dialingCode.substr(1) + mobileNo;

    const msgConfig = {
        mobileNo,
        mask: sms_mask,
        message,
    };
    const providerConfig = {
        host: gupshupConfig.gupshupTrans.host,
        url: gupshupConfig.gupshupTrans.url,
        userId: gupshupConfig.gupshupTrans.premiumUserId,
        password: gupshupConfig.gupshupTrans.premiumPassword,
    };
    sendPremiumGupshupMsg(msgConfig, providerConfig)
        .then(data => {
            logger.info(`[cowin-slot-checker][helpers][sms][sendPremiumGupshupMsg][data] ${data}`);
        })
        .catch(err => {
            logger.error('[cowin-slot-checker][helpers][sms][sendPremiumGupshupMsg][error] ' + err.message);
        });

}
