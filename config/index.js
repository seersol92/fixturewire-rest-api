// get configs from environment
const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 3000;
const MONGO_HOST = process.env.MONGO_HOST || 'mongodb://quote-app-db:Devel0per@ds111430.mlab.com:11430/quote-app-db';
const SECRET = process.env.SECRET || 'supersecretalltheway';
const ROOT = process.env.ROOT || '';

// init config obj containing the app settings
const config = {
  env: NODE_ENV,
  root: ROOT,
  server: {
    port: 3000
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
