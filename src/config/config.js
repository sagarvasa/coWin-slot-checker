const env = process.env.NODE_ENV || 'local';

const local = {
    "hosts": {
        "registerURL": "https://cdn-api.co-vin.in/api"
    },
    "headers": {
        "host": "cdn-api.co-vin.in",
        "accept": "application/json",
        "accept-language": "hi_IN",
        'user-agent': 'sagar_macbook_pro_' + Math.random()
    },
}

const staging = {
    "hosts": {
        "registerURL": "https://cdn-api.co-vin.in/api"
    },
    "headers": {
        "host": "cdn-api.co-vin.in",
        "accept": "application/json",
        "accept-language": "hi_IN",
        'user-agent': 'sagar_macbook_pro_' + Math.random()
    },
}

const dev = {
    "hosts": {
        "registerURL": "https://cdn-api.co-vin.in/api"
    },
    "headers": {
        "host": "cdn-api.co-vin.in",
        "accept": "application/json",
        "accept-language": "hi_IN",
        'user-agent': 'sagar_macbook_pro_' + Math.random()
    },
}

const production = {
    "hosts": {
        "registerURL": "https://cdn-api.co-vin.in/api"
    },
    "headers": {
        "host": "cdn-api.co-vin.in",
        "accept": "application/json",
        "accept-language": "hi_IN",
        'user-agent': 'sagar_macbook_pro_' + Math.random()
    },
}

const config = { local, staging, dev, production };

module.exports = config[env] || config['local'];