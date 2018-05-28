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
console.log(process.env.NODE_ENV);
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

if(process.env.NODE_ENV === 'development') {
	console.log(chalk.yellow.bold("=== WARNING: Development Mode ==="));
} else {
	console.log(chalk.green("Production Mode"));
}

// Database modules
const 	mongoose = require('mongoose')
;



// IRC modules
const 	irc = require('irc'),
		JusticarIRC = require('./irc/JusticarIRC')
;

//
// Load configs
let config = require("./config/config").getConfig();

// ***
//
// Database
//
// ***
mongoose.Promise = q.Promise;

// Set to debug mode if in dev mode (handled by .env file)
if(process.env.NODE_ENV === 'development') {
	mongoose.set("debug", true);
}

let dbConnectionPromise = mongoose.connect(config.db.uri, { useMongoClient: true }).then(
	function(db) {
		console.log(chalk.green("\nConnected to database @", config.db.uri));
		return true;
	},
	function(err) {
		console.error(chalk.red("\nDatabase connection error:", err));
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


let server = require('./server/server.js');

dbConnectionPromise.then(
	function() {
		let usePort = config.www.port || 3000;
		server.listen(usePort, function() {
			console.log(chalk.green.bold("\nWeb server ready on port", usePort));
		});

		JusticarIRC.bot.connect();
	},
	function(err) {
		console.error(err);
		console.log('%s MongoDB connection error. Exiting.');
		process.exit();
	}
).catch(
	function(err) {
		console.error(err);
		console.log('Error starting server. Exiting.');
		process.exit();
	}
);
