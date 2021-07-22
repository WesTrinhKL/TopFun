// api/...
const express = require('express')
const router = express.Router();

//@require routes exported from files
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const listsRouter = require('./lists.js');

//@use routes exported from files
router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/lists', listsRouter);


module.exports = router;
