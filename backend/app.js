//@require packages
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { ValidationError } = require('sequelize'); //sequelize validation error handler
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

//@use routes
app.use(routes); // Connect all the routes

app.use(// Set the _csrf token and create req.csrfToken method
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true,
    },
  })
);




//@error handlers
app.use((_req, _res, next) => {// Catch unhandled requests (resource not found 404)
  //^if 'err' isn't passed then this error handler will be called rather than the ones below
  //^one of the final calls towards the end
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = ["The requested resource couldn't be found."];
  err.status = 404;
  next(err);
});
app.use((err, _req, _res, next) => {// Process sequelize errors
  // check if error is a Sequelize error:
  if (err instanceof ValidationError) {
    err.errors = err.errors.map((e) => e.message);
    err.title = 'Validation error';
  }
  next(err);
})
app.use((err, _req, res, _next) => { // Error formatter before response
  res.status(err.status || 500);
  console.error(err);
  res.json({
    title: err.title || 'Server Error',
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack,
  });
});




//@export our app to be used bin/www
module.exports = app;
