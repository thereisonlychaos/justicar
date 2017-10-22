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
const 	fs = require('fs'),
		chalk = require('chalk')
;

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
const 	irc = require('irc')
;

// Local Modules
const 	ircInterface = require('./local_modules/ircInterface')
;


//
// Edgy cool start up graphic. Cuz we rock it like its 1994 around here.
//
let introASCII = fs.readFileSync('art/ankh.txt', 'utf8');
console.log(chalk.red(introASCII));


//
// Load configs
let config = {};
let ircConfig = {};

if(process.env.NODE_ENV === 'development') {
	console.log(chalk.yellow.bold("=== WARNING: Development Mode ==="))
	config = require('./config/dev.json');

} else {	
	console.log(chalk.green("Production Mode"))
	config = require('./config/production.json');
}


// ***
//
// Configure IRC bot client
//
// ***
let ircClient = null;

if (config.irc && config.irc.server && config.irc.nick) {
	console.log("Attempting IRC connection to", config.irc.server, "with nick", config.irc.nick);
	ircClient = new irc.Client(config.irc.server, config.irc.nick, config.irc.settings || {});

	ircInterface.init(ircClient, null, config);// @TODO add schemas here
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

// Allow cross-origin using CORS module
app.use(cors());

// Configure express
app.use(morgan(':date - :method :url :status :res[content-length] - :response-time ms'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


