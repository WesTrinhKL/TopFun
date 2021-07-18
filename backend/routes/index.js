// backend/routes/index.js
const express = require('express');
const router = express.Router();

//@/testing routes
const testingRouter = require('./testing');
router.use('/testing',testingRouter )
router.get('/hello/world', function(req, res) {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  res.send('Hello World!');
});


//@/api routes
const apiRouter = require('./api');
router.use('/api', apiRouter);

//@---provide CSRF production---
//@static route, serving build files in production
if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  // Serve the frontend's index.html file build at the root route
  router.get('/', (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    return res.sendFile(
      path.resolve(__dirname, '../../frontend', 'build', 'index.html')
    );
  });
  // Serve the static assets in the frontend's build folder
  router.use(express.static(path.resolve("../frontend/build")));
  // Serve the frontend's index.html file at all other routes NOT starting with /api
  router.get(/^(?!\/?api).*/, (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    return res.sendFile(
      path.resolve(__dirname, '../../frontend', 'build', 'index.html')
    );
  });
}

//@---provide CSRF development---
// Add a XSRF-TOKEN cookie to allow making requests only in development
if (process.env.NODE_ENV !== 'production') {
  router.get('/api/csrf/restore', (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    return res.json({});
  });
}


module.exports = router;
