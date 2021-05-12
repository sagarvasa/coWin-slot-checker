const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('shortid');
const constants = require('./utilities/constants');
const errorConst = require('./utilities/errors');

class ServerApplication {

    constructor(restConfig) {
        this.app = express();
        this.port = restConfig.rest.port;
    }

    async init() {
        // Dynamically Import loggers
        this.logger = await this.configureLoggingImport();

        // Initialize Default Middlewares needed for application
        this.initializeDefaultMiddlewares();

        // Parse Request URL to check valid format
        this.parseRequestURL();

        // Set Headers on Response, register process exception events
        this.setResponseHeader();

        // Log incoming requests
        this.logRequest();

        // Initialize Database
        this.initializeDatabase();

        // Serve incoming routes
        this.serveRequest();
    }

    listen() {
        this.app.listen(this.port);
    }

    async configureLoggingImport() {
        const logger = require('./utilities/winston')(__filename);
        return logger;
    }

    async initializeDatabase() {
        try {
            const MongoConnectionHelper = require('./helpers/mongo-connection');
            const mongoHelper = new MongoConnectionHelper();
            await mongoHelper.establishConnection();
        } catch (e) {
            this.logger.error('[boilerplate] Error in connecting database:: [error]: ' + e.message);
        }
    }

    initializeDefaultMiddlewares() {
        this.app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
        this.app.use(bodyParser.json({ limit: '50mb' }));
    }

    parseRequestURL() {
        this.app.use((req, res, next) => {
            const parsedArray = req.url.match('\b*(?:json)');
            if (Array.isArray(parsedArray) && parsedArray.length && parsedArray[0] !== '') {
                req.url = req.url.replace('.' + parsedArray[0], '');
                req.query.format = parsedArray[0];
                next();
            } else {
                return res.status(errorConst.BAD_REQUEST).send({ message: errorConst.INVALID_URI_FORMAT });
            }
        });
    }

    setResponseHeader() {
        this.app.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Credentials', 'true');
            res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
            res.setHeader(
                'Access-Control-Allow-Headers',
                'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
            );
            res.setHeader('Cache-Control', 'no-cache');

            res.setHeader(constants.INIT_TIME, Date.now());
            res.setHeader(constants.CORR_ID, req.get(constants.CORR_ID) ? req.get(constants.CORR_ID) : uuid.generate());

            // Assigning res to custom object on process to use it unhandledRejection
            Object.assign(process, { currentRes: res });

            // Node Process Exception handlers
            this.handleNodeExceptions(res);

            next();
        });
    }

    logRequest() {
        this.app.use((req, res, next) => {
            if (req.originalUrl === '/ping') {
                next();
            }

            if (req.body && Object.keys(req.body).length) {
                this.logger.info('[boilerplate][URL]: ' + req.path + ' [Body] : ' + JSON.stringify(req.body), res);
            }
            if (req.headers && Object.keys(req.headers).length) {
                this.logger.info('[boilerplate][URL]: ' + req.path + ' [Headers]: ' + JSON.stringify(req.headers), res);
            }
            if (req.query && Object.keys(req.query).length) {
                this.logger.info('[boilerplate][URL]: ' + req.path + ' [Query] : ' + JSON.stringify(req.query), res);
            }
            if (req.params && Object.keys(req.params).length) {
                this.logger.info('[boilerplate][URL]: ' + req.path + ' [Params] : ' + JSON.stringify(req.params), res);
            }

            next();
        });
    }

    serveRequest() {

        const routes = require('./routes');
        this.app.use('/', routes);

        // Not Found Route
        this.app.use(function (req, res, next) {
            const err = new Error(errorConst.HANDLER_NOT_FOUND);
            const error = err;
            error.status = errorConst.NOT_FOUND;
            next(error);
        });

        // Default Error Handler route
        this.app.use((error, req, res, next) => {
            this.logger.info('[boilerplate][app][error] ' + error.message, res, true, error);
            return res.status(error.status || 500).jsonp({
                message: error.message,
                code: error.status,
                CRID: res.get(constants.CORR_ID),
                errors: error.errors,
                timestamp: new Date().toISOString(),
                ip: req.ip,
                url: req.originalUrl
            });
        });
    }

    handleNodeExceptions(res) {
        process.on('uncaughtException', error => {
            if (process.currentRes) {
                error.message = `${error.message} CRID : ` + process.currentRes.get(constants.CORR_ID);
            }
            this.logger.info('[boilerplate][uncaughtException][reason] ' + error.message);
        });

        process.on('unhandledRejection', (reason, promise) => {
            let error = new Error(`reason:: ${reason}`);
            if (reason instanceof Error) {
                error = reason;
            }
            if (process.currentRes) {
                error.message = `${error.message} CRID : ` + process.currentRes.get(constants.CORR_ID);
            }
            this.logger.info('[boilerplate][unhandledRejection][reason] ' + error.message);
            return res.status(500).send({ message: errorConst.GENERAL_ERROR_MSG });
        });
    }
}

module.exports = ServerApplication;
