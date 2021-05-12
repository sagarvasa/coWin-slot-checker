const HTTPRequest = require('../utilities/http-request');
const httpRequest = new HTTPRequest();


async function sendPremiumGupshupMsg(messageConfig, providerConfig) {
    const { host, userId, password } = providerConfig;
    let uri = providerConfig.url;
    const { mobileNo, message, mask } = messageConfig;

    uri = uri.replace(/%%mobile_number%%/g, mobileNo);
    uri = uri.replace(/%%message%%/g, encodeURIComponent(message));
    uri = uri.replace(/%%user_id%%/g, userId);
    uri = uri.replace(/%%password%%/g, password);

    uri = uri + mask;

    return httpRequest.get({ url: host + uri });
}

async function sendEnterpriseGupshupMsg(messageConfig, providerConfig) {
    const { url, userId, password } = providerConfig;
    const { mobileNo, message, mask } = messageConfig;

    const formData = new FormData();
    formData.append('method', 'sendMessage');
    formData.append('send_to', mobileNo);
    formData.append('msg', encodeURIComponent(message));
    formData.append('msg_type', 'TEXT');
    formData.append('userid', userId);
    formData.append('auth_scheme', 'PLAIN');
    formData.append('password', password);
    formData.append('format', 'JSON');
    formData.append('mask', mask);
    formData.append('v', '1.1');

    const options = {
        url: url,
        form: formData,
    };

    return httpRequest.postForm(options);
}

module.exports = { sendPremiumGupshupMsg, sendEnterpriseGupshupMsg };
