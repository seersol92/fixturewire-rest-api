const express = require('express');
const router = express.Router();

const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
const errorMiddleware = require('./middleware/error');
const config = require('./config');
const expressValidator = require('express-validator');

// import routes
const authentication = require('./routes/authentication')(router);
const cargoQuote = require('./routes/cargo_quote');  //Import routes for "cargo_quote" area of site
const cargoRegister = require('./routes/cargo_register');  //Import routes for "cargo_register" area of site
const companyRegister = require('./routes/company_register');  //Import routes for "cargo_register" area of site
const vesselRegister = require('./routes/vessel_register');  //Import routes for "vesselRegister" area of site
const inquiryContent = require('./routes/inquiry_content');  //Import routes for "inquiry_content" area of site
const inquiryQuote = require('./routes/inquiry_quote');  //Import routes for "inquiry_quote" area of site
const user = require('./routes/user');
const messageRoutes = require('./routes/message');


// initialize the app
const app = express();

// middleware
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
require('./config/passport')(passport);

// static folder
app.use(express.static(path.join(__dirname, 'public')));

// set routes
// TODO: change to '/user' and '/message'
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST","PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.use(expressValidator());
app.use('/authentication', authentication);
app.use('/cargo-quote', cargoQuote);
app.use('/cargo-register', cargoRegister);
app.use('/company-register', companyRegister);
app.use('/vessel-register', vesselRegister);
app.use('/content', inquiryContent);
app.use('/inquiry-quote', inquiryQuote);
app.use('/user', user);
app.use('/messages', messageRoutes);

// set error handling middleware
app.use(errorMiddleware);

app.get('/', (req, res) => {
  res.send("Invalid Endpoint");
});


module.exports = app;
