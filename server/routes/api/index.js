const router = require('express').Router();
const passport = require('passport');

router.use('/user', require('./user'));

/**
 * Game features, (channels, weather, etc.)
 */
router.use('/game/channel', require('./game/channel'));


module.exports = router;
