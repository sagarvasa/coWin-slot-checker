const logger = require('../utilities/winston')(__filename);
const config = require('../config/config');
const HttpRequest = require('../utilities/http-request');
const httpRequest = new HttpRequest();
const smsHelper = require('../helpers/sms');

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

exports.findForPincodes = async (req, res) => {
    try {
        let pincodes = req.body.pincodes;
        let date = new Date(req.body.date);
        let formatted_date = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
        let parallel_promise = [];
        pincodes.forEach((code) => {
            parallel_promise.push(
                httpRequest.get(
                {
                    url: `${registerURL}/v2/appointment/sessions/public/findByPin?pincode=${code}&date=${formatted_date}`,
                    headers: coWin_headers,
                },
                res,
            ))
        });

        let all_slots = await Promise.all(parallel_promise);
        let available_slots = [];
        all_slots.forEach((slot) => {
            available_slots = available_slots.concat(slot.sessions)
        })
        return available_slots;
        
    } catch (err) {
        throwErrorHandler(err, '[findForPincodes]', res, true);
    }
}

exports.findForDistricts = async (req, res) => {
    try {
        let districts = req.body.districts;
        let date = new Date(req.body.date);
        let formatted_date = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
        let parallel_promise = [];
        districts.forEach((districtId) => {
            parallel_promise.push(
                httpRequest.get(
                {
                    url: `${registerURL}/v2/appointment/sessions/public/findByDistrict?district_id=${districtId}&date=${formatted_date}`,
                    headers: coWin_headers,
                },
                res,
            ))
        });

        let all_slots = await Promise.all(parallel_promise);
        let available_slots = [];
        all_slots.forEach((slot) => {
            available_slots = available_slots.concat(slot.sessions)
        })
        return available_slots;
        
    } catch (err) {
        throwErrorHandler(err, '[findForDistricts]', res, true);
    }
}

exports.triggerNotification = async (data, req) => {
    try {
        if(Array.isArray(data) && req.body.mobile) {

        let mobile = req.body.mobile.slice(-10);
        let message = `finding vaccine for pins -- ${req.body.pincodes}`;

        return smsHelper.send_sms({mobileNo: mobile, message: message})

        } else {
            logger.warn(`[cowin-slot-checker][services][triggerNotification]Invalid data format or mobile`);
            return;
        }

    } catch(err) {
        throwErrorHandler(err, '[triggerNotification]', res, true);
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
    logger.error(`[cowin-slot-checker][services][rest]${method} err ${msg}`);
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