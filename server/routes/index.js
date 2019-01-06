const router = require('express').Router();
let srvConfig = require('../settings/config.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: srvConfig.page_title });
});

router.get('/partials/*?', function(req, res) {
  res.render('partials/' + req.params[0]);
});

router.use('/api', require('./api'));

module.exports = router;
