const logger = require('../utilities/winston')(__filename);
const config = require('../config/config');
const HttpRequest = require('../utilities/http-request');
const httpRequest = new HttpRequest();

const registerURL = config.hosts.registerURL;
const coWin_headers = config.coWin_headers;

exports.getStates = async (req, res) => {
    try {
        return await httpRequest.get(
            {
                url: `${registerURL}/v2/admin/location/states`,
                headers: coWin_headers,
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
                headers: coWin_headers,
            },
            res,
        );
    } catch (err) {
        throwErrorHandler(err, '[getDistrictByState]', res, true);
    }
}

exports.findByPinCode = async (req, res) => {
    try {
        let pinCode = req.query.pinCode;
        let date = new Date(req.query.date);
        let formatted_date = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
        return await httpRequest.get(
            {
                url: `${registerURL}/v2/appointment/sessions/public/findByPin?pincode=${pinCode}&date=${formatted_date}`,
                headers: coWin_headers,
            },
            res,
        );
    } catch (err) {
        throwErrorHandler(err, '[findByPinCode]', res, true);
    }
}

exports.findByDistrict = async (req, res) => {
    try {
        let districtId = req.query.districtId;
        let date = new Date(req.query.date);
        let formatted_date = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
        return await httpRequest.get(
            {
                url: `${registerURL}/v2/appointment/sessions/public/findByDistrict?district_id=${districtId}&date=${formatted_date}`,
                headers: coWin_headers,
            },
            res,
        );
    } catch (err) {
        throwErrorHandler(err, '[findByDistrict]', res, true);
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