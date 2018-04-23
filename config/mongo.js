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
    // mongodb connection open
    db.once('open', () => 
      log.log('mongo', `connected to db: "${config.mongo.host}"`)
    );
  };

// connect to mongo host, set retry on initial fail
const connectMongo = () => {
  mongoose.connect(config.mongo.host, {
    useMongoClient: true,
    promiseLibrary: global.Promise
  }).catch(err => {
    log.err('mongo', 'connection to db failed', err.message || err);
    setTimeout(connectMongo, 2000);
  });
}


module.exports = init;
