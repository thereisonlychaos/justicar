var stringArgv = require('string-argv');
var chalk = require('chalk');

// modules

var commandHandlers = {};
commandHandlers["Dice"] = require('./commandsDice');

var replier = null;
var schemas = null;

var commandDictionary = {};

module.exports.init = function(r, s) {
	console.log(chalk.blue("Initializing commands"));
	replier = r;
	schemas = s;

	for (var key in commandHandlers) {
		// does the command handler have a proper command object? If not, warning.
		if (!commandHandlers[key].init) {
			console.log(chalk.yellow("WARNING:"), "Command Handler", key, "does not init function defined. Will not have replier or schemas set properly.")
		} else {
			commandHandlers[key].init(replier, schemas);
		}

		if (!commandHandlers[key].commands) {
			console.log(chalk.yellow("WARNING:"), "Command Handler", key, "does not have a command object defined. It will not create any bot commands.")
		} else {
			// load command into dictionary
			let handler = commandHandlers[key];
			for (var command in handler.commands) {
				if (command[0] !== "!") {
					console.log(chalk.yellow("WARNING:"), "Command Handler", key, "has invalid command", command, " - All commands must start with !");
				} else if (commandDictionary[command]) {
					console.warn("Command", command, "is already defined.")
				} else {					
					console.log(command, "command created");
					commandDictionary[command] = handler.commands[command];
				}
			}
		}
	}
}

module.exports.isCommand = function(strMessage) {
	if (typeof strMessage === 'string') {
		if(strMessage.slice(0,1) === "!") {
			return true;
		} else {
			return false;
		}
	} else {
		console.log("Non-string message passed into isCommand", strMessage);
		return false;
	}
}

module.exports.handleCommandMessage = function(from, to, message) {
	let args = stringArgv(message);
	console.log("Command message received:", message);

	let command = args[0];
	args.splice(0, 1);
	console.log("Command:", command);
	console.log("Args:", args);

	if (commandDictionary.hasOwnProperty(command)) {
		commandDictionary[command].apply({}, [from, to].concat(args));
	}
}

