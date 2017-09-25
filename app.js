require('dotenv').config();

// includes
var fs = require('fs');
var chalk = require('chalk');
var stringArgv = require('string-argv');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var irc = require('irc');

// config

var introASCII = fs.readFileSync('art/ankh.txt', 'utf8');
console.log(chalk.red(introASCII));

var config = {};
var ircConfig = {};

if(process.env.NODE_ENV === 'development') {
	console.log(chalk.yellow.bold("=== WARNING: Development Mode ==="))
	config = require('./config/dev.json');
} else {	
	console.log(chalk.green("Production Mode"))
	config = require('./config/production.json');
}


var index = require('./routes/index');
var users = require('./routes/users');

var app = express();


// local modules
var ircInterface = require('./local_modules/ircInterface')


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


if (config.irc && config.irc.server && config.irc.nick) {
	console.log("Attempting IRC connection to", config.irc.server, "with nick", config.irc.nick);
	var ircClient = new irc.Client(config.irc.server, config.irc.nick, config.irc.settings || {});
} else {
	console.error(chalk.red("!!!Invalid IRC configuration!!!"));
	process.exit();
}


ircClient.addListener('connect', function() {
	console.log("\n", chalk.bold.green(">>> Justicar has connected <<<"), "\n");


})

ircClient.addListener('message', function(from, to, message) {
	console.log(from, ' => ', to, ' : ', message);
	if (ircInterface.isCommand(message)) {
		ircInterface.handleCommandMessage(message);
	}
})