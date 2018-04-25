const mongoose = require('mongoose');
const Promise = require('bluebird');
const config = require('./index');
const log = require('../log');


mongoose.Promise = Promise; // plug-in bluebird as mongoose Promise

// to export: init mongo connection, set logging
const init = () => {
  connectMongo();
    const db = mongoose.connection;
    // mongodb error
    db.on('error',  err => log.err('mongo', 'error', err.message || err));
  };

// connect to mongo host, set retry on initial fail
const connectMongo = () => {
  var options = {
    useMongoClient: true,
    autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0
  };

  mongoose.connect(config.mongo.host, options).then(
    () => log.log('mongo', `connected to db: "${config.mongo.host}"`),
    err => log.err('mongo', 'error', err.message || err)
  );
}


module.exports = init;
