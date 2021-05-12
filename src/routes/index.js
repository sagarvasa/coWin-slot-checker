const express = require('express');
const validate = require('express-validation');
const router = express.Router();
const validators = require('../validators');
const controllers = require('../controllers');

router.route('/ping').get(validate(validators.ping.getPing), controllers.ping.getPing);


module.exports = router;