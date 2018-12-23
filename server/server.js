// Express modules
const 	express = require('express'),
		passport = require('passport'),
		morgan = require('morgan'),
		cors = require('cors'),
		path = require('path'),
		bodyParser = require('body-parser'),
		errorhandler = require('errorhandler'),
		session = require('express-session')
;
require("./passport_functions.js");

let config = require("../config/config.js").getConfig();

// ***
//
// Initialize Express App
//
// ***
let server = express();

module.exports = server;

// set error handler

if(process.env.NODE_ENV === 'development') {
	server.use(function(err, req, res, next) {
		console.log(err.stack);

		res.status(err.status || 500);

		res.json({'errors': {
			message: r.message,
			stack: err.stack,
			error: err,
		}});
	});
} else {
	server.use(function(err, req, res, next) {
		res.status(err.status || 500);

		res.json({'errors': {
			message: err.message,
			error: {},
		}});
	});
}

// Allow cross-origin using CORS module
server.use(cors());

// Configure express
server.set('view engine', 'pug');
server.set('views', path.join(__dirname, 'views'));

server.use(morgan(':date - :method :url :status :res[content-length] - :response-time ms'));
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(require('method-override')());
server.use(passport.initialize());


// session config
server.use(session({ secret: "f493bd7f94854f1899fe3cbf77110568b", cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

server.use(express.static(__dirname + "/../public"));

/**
* Routes module handles all route rendering
*/
server.use(require("./routes"));
