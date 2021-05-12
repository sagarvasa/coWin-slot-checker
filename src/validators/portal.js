const Joi = require('joi');

module.exports = {
    findByPinCode: {
        body: {
        },
        query: {
            "pincode": Joi.string().length(6).regex(/^[0-9]+$/).required(),
            "date": Joi.date().required()
        },
        param: {}
    },
    findByDistrict: {
        body: {
        },
        query: {
            "districtId": Joi.string().regex(/^[0-9]+$/).required(),
            "date": Joi.date().required()
        },
        param: {}
    },
};