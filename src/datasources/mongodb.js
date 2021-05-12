const mongoose = require('mongoose')
const logger = require('../utilities/winston')(__filename);

async function createMongoConnection({ host, port, database, username, password }, options) {
  const url = 'mongodb://' + username + ':' + password + '@' + host + ':' + port + '/' + database;
  let connection = null;
  try {
    await mongoose.connect(url, options);
    connection = mongoose.connection;
    return connection;
  } catch (e) {
    logger.error('[boilerplate] db connection error: ' + e.message);
    throw e;
  }
}

function closeMongoConnection(connection) {
  connection
    .close()
    .then(() => {})
    .catch(() => {});
}

module.exports = { createMongoConnection, closeMongoConnection };