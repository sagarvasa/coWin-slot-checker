const logger = require('../utilities/winston')(__filename);
const config = require('../config/config');
const HttpRequest = require('../utilities/http-request');
const httpRequest = new HttpRequest();

const registerURL = config.hosts.registerURL;
const headers = config.headers;

exports.getStates = async (req, res) => {
    try {
        return await httpRequest.get(
            {
                url: `${registerURL}/v2/admin/location/states`,
                headers: headers,
            },
            res,
        );
    } catch (err) {
        throwErrorHandler(err, '[getStates]', res, true);
    }
}


exports.getDistrictByState = async (req, res) => {
    try {
        let state_id = req.params.state_id;
        return await httpRequest.get(
            {
                url: `${registerURL}/v2/admin/location/districts/${state_id}`,
                headers: headers,
            },
            res,
        );
    } catch (err) {
        throwErrorHandler(err, '[getDistrictByState]', res, true);
    }
}

function throwErrorHandler(err, method) {
    let msg = err.message;
    if (!msg) {
        msg = getValueByProperty(err, 'message');
    }
    const status = getValueByProperty(err, 'statusCode');

    const error = err;
    error.message = msg;
    error.status = status;
    logger.info(`[cowin-slot-checker][services][rest]${method} err ${msg}`);
    throw error;
}

function getValueByProperty(obj, prop) {
    for (const key in obj) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            const value = this.getValueByProperty(obj[key], prop);
            if (value) {
                return value;
            }
        } else if (key === prop) {
            return obj[key];
        }
    }

    return '';
}