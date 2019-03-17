
const chalk = require('chalk');
const EventEmitter = require('events');
var Bot = require('./classes/Bot');

class MyEmitter extends EventEmitter {}

module.exports.events = new MyEmitter();

// Load configs
module.exports.config = require("../config/config").getConfig();

let bot = new Bot();

module.exports.bot = bot;

let modules = require('./settings/modules');
let commandHandlers = require('./settings/commandHandlers');

/**
 * All commandsd to be registered with the command handler
 */
console.log(">>>Registering Commands<<<");

for(let key in commandHandlers) {
	modules["commands"].registerCommands(key, commandHandlers[key]);
}


/**
 * Initialize modules
 */

module.exports.initializeModules = function() {
	console.log(">>>Initializing Modules<<<");
	for(let key in modules) {
		if(typeof modules[key].init === "function" && modules.hasOwnProperty(key)) {
			console.log("Initializing module:", key);
			modules[key].init();
		}
	}
};
