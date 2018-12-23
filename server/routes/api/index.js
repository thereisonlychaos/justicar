const router = require('express').Router();
const passport = require('passport');


router.all('/*', passport.authenticate('local'));

router.use('/user', require('./user'));

module.exports = router;
