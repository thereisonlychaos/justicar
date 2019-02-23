const router = require('express').Router();
const passport = require('passport');


router.use('/user', require('./user'));

/**
 * Game features, (channels, weather, etc.)
 */
router.use('/game/channel', require('./game/channel'));
router.use('/game/weather', require('./game/weather'));


module.exports = router;
