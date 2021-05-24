const Joi = require('joi');

module.exports = {
    findByPinCode: {
        body: {
        },
        query: {
            "pinCode": Joi.string().length(6).regex(/^[0-9]+$/).required(),
            "date": Joi.date().required()
        },
        param: {}
    },
    findByDistrict: {
        body: {
        },
        query: {
            "districtId": Joi.string().min(1).max(10).regex(/^[0-9]+$/).required(),
            "date": Joi.date().required()
        },
        param: {}
    },
    notifyForPincodes: {
        body: {
            "pincodes": Joi.array().items(Joi.string().length(6).regex(/^[0-9]+$/).required()).required(),
            "mobile": Joi.string().regex(/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/).required(),
            "date": Joi.date().required(),
            "email": Joi.string().email().optional()
        },
        query: {
            "age_group": Joi.string().min(1).max(3).regex(/^[0-9]+$/).optional().valid(['18', '45'])
        },
        param: {}
    },
    notifyForDistricts: {
        body: {
            "districts": Joi.array().items(Joi.string().min(1).max(10).regex(/^[0-9]+$/).required()).required(),
            "mobile": Joi.string().regex(/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/).required(),
            "date": Joi.date().required(),
            "email": Joi.string().email().optional()
        },
        query: {
            "age_group": Joi.string().min(1).max(3).regex(/^[0-9]+$/).optional().valid(['18', '45'])
        },
        param: {}
    },

};