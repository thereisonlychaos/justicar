/******************************
    --[ Justicar WoD Bot ]--
     Made for Sanguinus.org

         _.mmmmmmmmm._
       dMMMY'~~~~~`YMMMb
     dMMMY'         `YMMMb
    dMMMY'           `YMMMb
    CMMM(             )MMMD
    YMMMb.           .dMMMY
     YMMMb.         .dMMMY
      `YMMMboo...oodMMMY'
    .    `"#MMMMMMM#"'    .
    Mb       `MMM'       dM
    MMMM.   .dMMMb.   .dMMM
    MMMMMMMMMMMMMMMMMMMMMMM
    MMMMMMMMMMMMMMMMMMMMMMM
    MMMM'   `YMMMY'   `YMMM
    MM'      )MMM(      `MM
    '       .MMMMM.       `
            dMMMMMb
           dMMMMMMMb
            """""""

          by Matt Webb
********************************/

/**
* @fileOverview Justicar IRC Bot, an IRC bot with a web interface meant for managing large IRC World of Darkness games.
* @author <a href="MatthewKyleWebb@gmail.com">Matthew Webb</a>
* @version 0.1
*/

// This sets environment variable based on .env file, must be done first
require('dotenv').config();

//
// Includes
//

// General modules
const 	chalk = require('chalk'),
		q = require('q')
;

//
// Edgy cool start up graphic. Cuz we rock it like its 1994 around here.
//
let introASCII = require('fs').readFileSync('art/ankh.txt', 'utf8');
console.log(chalk.red(introASCII));

// Database modules
const 	mongoose = require('mongoose')
;

// Express modules
const 	express = require('express'),
		passport = require('passport'),
		morgan = require('morgan'),
		cors = require('cors')
		bodyParser = require('body-parser'),
		errorhandler = require('errorhandler'),
		session = require('express-session')
;

// IRC modules
const 	irc = require('irc'),
		JusticarIRC = require('./irc/JusticarIRC')
;

//
// Load configs
let config = {};
let ircConfig = {};

if(process.env.NODE_ENV === 'development') {
	console.log(chalk.yellow.bold("=== WARNING: Development Mode ==="))
	config = require('./config/dev.json');
	mongoose.set("debug", true);
} else {	
	console.log(chalk.green("Production Mode"))
	config = require('./config/production.json');
}

// ***
//
// Database
//
// ***
mongoose.Promise = q.Promise;

let dbConnectionPromise = mongoose.connect(config.db.uri, { useMongoClient: true }).then(
	function(db) {
		console.log(chalk.green("\nConnected to database @", config.db.uri))
		return true;
	},
	function(err) {
		console.error(chalk.red("\nDatabase connection error:", err))
		process.exit();
	}
);

require("./database/models.js");


// ***
//
// Configure IRC bot client
//
// ***

if (config.irc && config.irc.server && config.irc.nick) {
	JusticarIRC.bot.client = new irc.Client(config.irc.server, config.irc.nick, Object.assign({}, config.irc.settings, {autoConnect:false}));

} else {
	console.error(chalk.red("!!!Invalid IRC configuration!!!"));
	process.exit();
}




// ***
//
// Initialize Express App
//
// ***
const app = express();

// set error handler

if(process.env.NODE_ENV === 'development') {
	app.use(function(err, req, res, next) {
		console.log(err.stack);

		res.status(err.status || 500);

		res.json({'errors': {
			message: err.message,
			stack: err.stack,
			error: err,
		}})
	})
} else {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);

		res.json({'errors': {
			message: err.message,
			error: {},
		}})
	})
}

// Allow cross-origin using CORS module
app.use(cors());

// Configure express
app.use(morgan(':date - :method :url :status :res[content-length] - :response-time ms'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require('method-override')());

// session config
app.use(session({ secret: "f493bd7f94854f1899fe3cbf77110568b", cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }))



const express_port = config.www.port || 3000;


// ***
//
// Starting
//
// ***

dbConnectionPromise.then(
	function() {
		const server = app.listen(express_port, function() {
			console.log(chalk.green.bold("\nWeb server ready on port", express_port));
			
			JusticarIRC.bot.connect();
		})
	}
)