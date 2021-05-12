const logger = require('../utilities/winston')(__filename);
const { createMongoConnection, closeMongoConnection } = require('../datasources/mongodb');
const mongodbConfig = require('../config/mongodb');

class MongoConnectionHelper {
    constructor() {
        this.connectionObj = null;
    }

    async establishConnection() {
        try {
            const { host, port, database, username, password, poolSize } = mongodbConfig;
            const options = {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                useCreateIndex: true,
            };
            if (poolSize) {
                options['poolSize'] = poolSize;
            }
            this.connectionObj = await createMongoConnection({ host, port, database, username, password }, options);
            return this.connectionObj;
        } catch (error) {
            logger.error('[boilerplate] Establish connection error: ' + error.message);
            return Promise.reject(error);
        }
    }

    async getConnection() {
        try {
            if (!this.connectionObj) {
                throw new Error('Please establish connection first');
            }
            const db = this.connectionObj.db;
            return { client: this.connectionObj, db };
        } catch (err) {
            logger.error('[boilerplate] Get connection error: ' + err.message);
            throw err;
        }
    }

    async closeConnection() {
        try {
            if (connectionObj) {
                closeMongoConnection(connectionObj);
            }
        } catch (err) {
            logger.error('[boilerplate] Close connection error: ' + err.message);
        }
    }
}

module.exports = MongoConnectionHelper;