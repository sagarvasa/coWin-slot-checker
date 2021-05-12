const Joi = require('joi');

module.exports = {
    getPing: {
        body: {
        },
        query: {
            "service": Joi.string().optional(),
        },
        param: {}
    },
};