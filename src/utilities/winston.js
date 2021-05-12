const path = require('path');
const { format, transports, createLogger } = require('winston');
const { combine, timestamp, colorize, label, printf, uncolorize } = format;
const constants = require('./constants');
const { ServerResponse } = require('http');
require('winston-daily-rotate-file');

const colors = {
	trace: 'white',
	debug: 'blue',
	info: 'green',
	warn: 'yellow',
	crit: 'red',
	fatal: 'red',
};

const options = (prefix) => ({
	level: 'debug',
	format: combine(
		label({
			label: path.basename(prefix)
		}),
		colorize({
			all: true
		}),
		timestamp({
			format: 'YYYY-MM-DD HH:mm:ss'
		}),
		printf(function(info) {
            let msg = `${info.timestamp} [Worker - ${process.pid}][${info.level}][${info.label}] : ${info.message}`
            const splatArgs = info[Symbol.for('splat')] || [];
            if(splatArgs[0] instanceof ServerResponse) {
                msg = `${info.timestamp} [Request : ${splatArgs[0].get(constants.CORR_ID)}][Worker - ${process.pid}][${info.level}][${info.label}] : ${info.message}`
            }
            return msg
        }),
	),
	transports: [
		new transports.Console(),
        new transports.DailyRotateFile({
			filename: 'logs/server/%DATE%/combined.log',
			datePattern: 'DD-MMM-YYYY',
			level: 'debug',
			format: combine(uncolorize()),
		}),
		new transports.DailyRotateFile({
			filename: 'logs/server/%DATE%/errors.log',
			datePattern: 'DD-MMM-YYYY',
			level: 'error',
			format: combine(uncolorize()),
		}),
	],
});

const logger = (prefix) => createLogger(options(prefix));

module.exports = logger;