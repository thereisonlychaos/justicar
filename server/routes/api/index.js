const router = require('express').Router();
const passport = require('passport');

router.use('/user', require('./user'));


module.exports = router;
