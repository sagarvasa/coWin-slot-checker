const env = process.env.NODE_ENV || 'local';

const local = {
    "hosts": {
        "registerURL": "https://cdn-api.co-vin.in/api"
    },
    "coWin_headers": {
        "host": "cdn-api.co-vin.in",
        "accept": "application/json",
        "accept-language": "hi_IN",
        'user-agent': 'sagar_macbook_pro_' + Math.random()
    },
    "gupshupConfig": {
        "gupshupTrans": {
            "mask": 'ABCDEF',
            "postUrl": "http://enterprise.smsgupshup.com/apps/apis/global/rest.php",
            "enterpriseUserId": "abcde",
            "host": "http://premium.smsgupshup.com",
            "enterprisePassword": "******",
            "premiumUserId": "1234566789",
            "premiumPassword": "passwordss",
            "url": "/GatewayAPI/rest?method=SendMessage&send_to=%%mobile_number%%&msg=%%message%%&msg_type=TEXT&userid=%%user_id%%&auth_scheme=plain&password=%%password%%&v=1.1&format=text&mask="
        }
    }
}

const staging = {
    "hosts": {
        "registerURL": "https://cdn-api.co-vin.in/api"
    },
    "coWin_headers": {
        "host": "cdn-api.co-vin.in",
        "accept": "application/json",
        "accept-language": "hi_IN",
        'user-agent': 'sagar_staging_macbook_pro_' + Math.random()
    },
    "gupshupConfig": {
        "gupshupTrans": {
            "mask": 'EATSRE',
            "postUrl": "http://enterprise.smsgupshup.com/apps/apis/global/rest.php",
            "enterpriseUserId": "abcde",
            "host": "http://premium.smsgupshup.com",
            "enterprisePassword": "******",
            "premiumUserId": "1234566789",
            "premiumPassword": "passwordss",
            "url": "/GatewayAPI/rest?method=SendMessage&send_to=%%mobile_number%%&msg=%%message%%&msg_type=TEXT&userid=%%user_id%%&auth_scheme=plain&password=%%password%%&v=1.1&format=text&mask="
        }
    }
}

const dev = {
    "hosts": {
        "registerURL": "https://cdn-api.co-vin.in/api"
    },
    "coWin_headers": {
        "host": "cdn-api.co-vin.in",
        "accept": "application/json",
        "accept-language": "hi_IN",
        'user-agent': 'sagar_dev_macbook_pro_' + Math.random()
    },
    "gupshupConfig": {
        "gupshupTrans": {
            "mask": 'EATSRE',
            "postUrl": "http://enterprise.smsgupshup.com/apps/apis/global/rest.php",
            "enterpriseUserId": "abcde",
            "host": "http://premium.smsgupshup.com",
            "enterprisePassword": "******",
            "premiumUserId": "1234566789",
            "premiumPassword": "passwordss",
            "url": "/GatewayAPI/rest?method=SendMessage&send_to=%%mobile_number%%&msg=%%message%%&msg_type=TEXT&userid=%%user_id%%&auth_scheme=plain&password=%%password%%&v=1.1&format=text&mask="
        }
    }
}

const production = {
    "hosts": {
        "registerURL": "https://cdn-api.co-vin.in/api"
    },
    "coWin_headers": {
        "host": "cdn-api.co-vin.in",
        "accept": "application/json",
        "accept-language": "hi_IN",
        'user-agent': 'sagar_prod_macbook_pro_' + Math.random()
    },
    "gupshupTrans": {
        "mask": 'EATSRE',
        "postUrl": "http://enterprise.smsgupshup.com/apps/apis/global/rest.php",
        "enterpriseUserId": "abcde",
        "host": "http://premium.smsgupshup.com",
        "enterprisePassword": "******",
        "premiumUserId": "1234566789",
        "premiumPassword": "passwordss",
        "url": "/GatewayAPI/rest?method=SendMessage&send_to=%%mobile_number%%&msg=%%message%%&msg_type=TEXT&userid=%%user_id%%&auth_scheme=plain&password=%%password%%&v=1.1&format=text&mask="
    }
    
}

const config = { local, staging, dev, production };

module.exports = config[env] || config['local'];