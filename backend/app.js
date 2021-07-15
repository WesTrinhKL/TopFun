//@require packages
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
//backend/app.js
const routes = require('./routes');

//@set development environment
const { environment } = require('./config');
const isProduction = environment === 'production';

//@intialize express app and middlewares
const app = express();
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

if (!isProduction) {// Security Middleware
  // enable cors only in development
  app.use(cors());
}
app.use(helmet({ // helmet helps set a variety of headers to better secure your app
  contentSecurityPolicy: false
}));
app.use(// Set the _csrf token and create req.csrfToken method
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true,
    },
  })
);

//@use routes
app.use(routes); // Connect all the routes


//@export our app to be used bin/www
module.exports = app;
