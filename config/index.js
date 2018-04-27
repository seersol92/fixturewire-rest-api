// get configs from environment
const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 3000;
const MONGO_HOST = process.env.MONGO_HOST || 'mongodb://mean_dev:hadi9292@ds253918.mlab.com:53918/mean_dev_db';
const SECRET = process.env.SECRET || 'supersecretalltheway';
const ROOT = process.env.ROOT || '';

// init config obj containing the app settings
const config = {
  env: NODE_ENV,
  root: ROOT,
  server: {
    port: 443
  },
  mongo: {
    host: MONGO_HOST,
    options: {
      server: {
        reconnectTries: Number.MAX_VALUE
      }
    }
  },
  secret: SECRET
};


module.exports = config;
