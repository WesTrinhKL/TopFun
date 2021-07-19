// backend/routes/api/index.js
const express = require('express')
const router = express.Router();

//@require routes exported from files
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');

//@use routes exported from files
router.use('/session', sessionRouter);
router.use('/users', usersRouter);


module.exports = router;
